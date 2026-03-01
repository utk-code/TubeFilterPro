let filterMode = 'hide';
let hiddenChips = [];
let blockedKeywords = [];
let whitelistKeywords = [];

function loadAndApplySettings() {
  chrome.storage.sync.get(['filterMode', 'hiddenChips', 'blockedKeywords', 'whitelistKeywords'], (result) => {
    filterMode = result.filterMode || 'hide';
    hiddenChips = result.hiddenChips || [];
    blockedKeywords = result.blockedKeywords ? result.blockedKeywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k) : [];
    whitelistKeywords = result.whitelistKeywords ? result.whitelistKeywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k) : [];
    
    applyChipFilters();
    applyVideoFilters();
  });
}

function applyChipFilters() {
  const chips = document.querySelectorAll('ytd-chip-cloud-renderer chip-button');
  
  chips.forEach(chip => {
    const chipText = chip.textContent.trim();
    
    if (filterMode === 'hide') {
      // Hide mode: hide chips in the list
      if (hiddenChips.includes(chipText)) {
        chip.style.display = 'none';
      } else {
        chip.style.display = '';
      }
    } else if (filterMode === 'showOnly') {
      // Show only mode: hide chips NOT in the list
      if (hiddenChips.length > 0 && !hiddenChips.includes(chipText)) {
        chip.style.display = 'none';
      } else {
        chip.style.display = '';
      }
    }
  });
}

function applyVideoFilters() {
  const videos = document.querySelectorAll('ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-compact-video-renderer, ytd-video-renderer');
  
  videos.forEach(video => {
    const titleElement = video.querySelector('#video-title');
    if (titleElement) {
      const title = titleElement.textContent.toLowerCase();
      const channelElement = video.querySelector('#channel-name #text');
      const channel = channelElement ? channelElement.textContent.toLowerCase() : '';
      
      let shouldHide = false;
      let reason = '';
      
      // Check blocked keywords
      if (blockedKeywords.some(keyword => title.includes(keyword))) {
        shouldHide = true;
        reason = 'blocked';
      }
      
      // Check whitelist (if enabled)
      if (whitelistKeywords.length > 0 && !shouldHide) {
        const matchesWhitelist = whitelistKeywords.some(keyword => 
          title.includes(keyword) || channel.includes(keyword)
        );
        if (!matchesWhitelist) {
          shouldHide = true;
          reason = 'not in whitelist';
        }
      }
      
      if (shouldHide) {
        video.style.display = 'none';
        video.setAttribute('data-tubefilter-hidden', reason);
      } else {
        video.style.display = '';
        video.removeAttribute('data-tubefilter-hidden');
      }
    }
  });
}

// MutationObserver for dynamic content
const observer = new MutationObserver((mutations) => {
  let shouldApply = false;
  
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      shouldApply = true;
    }
  });

  if (shouldApply) {
    applyChipFilters();
    applyVideoFilters();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "refreshFilters") {
    loadAndApplySettings();
  }
});

// Initial run
loadAndApplySettings();

// Also run on navigation (YouTube SPA)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(loadAndApplySettings, 500);
  }
}).observe(document, {subtree: true, childList: true});