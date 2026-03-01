// Common chips that programmers/students might want to hide
const commonChips = [
  "Music", "Gaming", "Live", "Recently uploaded", "Watched", 
  "New to you", "Comedy", "Entertainment", "Sports", "Fashion",
  "Beauty", "Travel", "Food", "Pranks", "Vlogs"
];

let filterMode = 'hide'; // 'hide' or 'showOnly'
let hiddenChips = [];
let blockedKeywords = [];
let whitelistKeywords = [];

document.addEventListener('DOMContentLoaded', () => {
  const presetChipsContainer = document.getElementById('presetChips');
  const customChipInput = document.getElementById('customChipInput');
  const customChipsList = document.getElementById('customChipsList');
  const blockKeywordsInput = document.getElementById('blockKeywords');
  const whitelistKeywordsInput = document.getElementById('whitelistKeywords');
  const saveBtn = document.getElementById('saveBtn');
  const statusDiv = document.getElementById('status');
  const modeHideBtn = document.getElementById('modeHide');
  const modeShowBtn = document.getElementById('modeShow');
  const modeHint = document.getElementById('modeHint');

  // Create preset chip buttons
  commonChips.forEach(chip => {
    const chipBtn = document.createElement('div');
    chipBtn.className = 'preset-chip';
    chipBtn.textContent = chip;
    chipBtn.dataset.chip = chip;
    chipBtn.addEventListener('click', () => togglePresetChip(chip, chipBtn));
    presetChipsContainer.appendChild(chipBtn);
  });

  // Mode selector
  modeHideBtn.addEventListener('click', () => {
    filterMode = 'hide';
    modeHideBtn.classList.add('active');
    modeShowBtn.classList.remove('active');
    modeHint.textContent = 'Hide the chips you select below';
  });

  modeShowBtn.addEventListener('click', () => {
    filterMode = 'showOnly';
    modeShowBtn.classList.add('active');
    modeHideBtn.classList.remove('active');
    modeHint.textContent = 'Show ONLY the chips you select below (hide everything else)';
  });

  // Add custom chip on Enter key
  customChipInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && customChipInput.value.trim()) {
      addCustomChip(customChipInput.value.trim());
      customChipInput.value = '';
    }
  });

  // Load saved settings
  chrome.storage.sync.get(['filterMode', 'hiddenChips', 'blockedKeywords', 'whitelistKeywords'], (result) => {
    filterMode = result.filterMode || 'hide';
    hiddenChips = result.hiddenChips || [];
    blockedKeywords = result.blockedKeywords || [];
    whitelistKeywords = result.whitelistKeywords || [];

    // Set mode
    if (filterMode === 'showOnly') {
      modeShowBtn.classList.add('active');
      modeHideBtn.classList.remove('active');
      modeHint.textContent = 'Show ONLY the chips you select below (hide everything else)';
    }

    // Update preset chips UI
    hiddenChips.forEach(chip => {
      const presetBtn = document.querySelector(`.preset-chip[data-chip="${chip}"]`);
      if (presetBtn) {
        presetBtn.classList.add('added');
      }
    });

    // Render custom chips
    renderCustomChips();

    // Fill inputs
    blockKeywordsInput.value = blockedKeywords.join(', ');
    whitelistKeywordsInput.value = whitelistKeywords.join(', ');
  });

  // Save button
  saveBtn.addEventListener('click', () => {
    chrome.storage.sync.set({
      filterMode: filterMode,
      hiddenChips: hiddenChips,
      blockedKeywords: blockedKeywords,
      whitelistKeywords: whitelistKeywords
    }, () => {
      statusDiv.style.display = 'block';
      setTimeout(() => statusDiv.style.display = 'none', 3000);
      
      // Notify content script
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "refreshFilters"});
        }
      });
    });
  });

  function togglePresetChip(chip, btnElement) {
    if (hiddenChips.includes(chip)) {
      hiddenChips = hiddenChips.filter(c => c !== chip);
      btnElement.classList.remove('added');
    } else {
      hiddenChips.push(chip);
      btnElement.classList.add('added');
    }
  }

  function addCustomChip(chipName) {
    if (!hiddenChips.includes(chipName)) {
      hiddenChips.push(chipName);
      renderCustomChips();
    }
  }

  function removeCustomChip(chipName) {
    hiddenChips = hiddenChips.filter(c => c !== chipName);
    renderCustomChips();
    
    // Also remove from preset if exists
    const presetBtn = document.querySelector(`.preset-chip[data-chip="${chipName}"]`);
    if (presetBtn) {
      presetBtn.classList.remove('added');
    }
  }

  function renderCustomChips() {
    customChipsList.innerHTML = '';
    hiddenChips.forEach(chip => {
      if (!commonChips.includes(chip)) {
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.innerHTML = `
          ${chip}
          <button onclick="removeChip('${chip}')">&times;</button>
        `;
        customChipsList.appendChild(tag);
      }
    });
  }

  // Make removeChip available globally
  window.removeChip = removeCustomChip;
});