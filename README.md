# 🎯 TubeFilter Pro - Dev/Student Mode

**A powerful Chrome extension to eliminate YouTube distractions and curate a focused learning experience.**

---

## 📌 About

TubeFilter Pro is a Chrome extension designed for **developers, students, and focused learners** who want to eliminate distractions and curate a productive YouTube feed. Block entertainment content, hide irrelevant categories, and see only educational programming content that matters to you.

**⚠️ Note:** This extension is distributed as source code only. You'll need to install it manually using Chrome's "Load Unpacked" feature (instructions below).

---

## ✨ Features

### 🎛️ Smart Filter Chip Management
- **Hide Unwanted Categories**: Remove filter chips like "Gaming", "Music", "Live", "Entertainment", etc.
- **Show Only Mode**: Display ONLY the chips you want to see (hide everything else)
- **Custom Chips**: Add ANY YouTube filter chip name to your blocklist
- **Quick Presets**: One-click to add common distraction categories

### 🎬 Intelligent Video Filtering
- **Block by Keywords**: Hide videos containing specific words in titles (e.g., "shorts", "prank", "vlog")
- **Whitelist Mode**: Show ONLY videos with relevant keywords (e.g., "tutorial", "programming", "python", "javascript")
- **Real-time Filtering**: Automatically filters content as you browse YouTube

### 💾 Smart Settings
- **Sync Across Devices**: Your settings sync via Chrome Sync
- **Persistent Preferences**: Settings saved automatically
- **Quick Toggle**: Easy enable/disable functionality
- **No Account Required**: Works immediately after installation

---

## 🎓 Perfect For

- **Programmers** who want to see only coding tutorials and tech content
- **Students** focused on educational material and lectures
- **Professionals** avoiding entertainment distractions during work
- **Anyone** wanting a cleaner, more focused YouTube experience

---

## 📦 Installation (Manual - Load Unpacked)

Since this extension is not published on the Chrome Web Store, you need to install it manually:

### Step-by-Step Guide

**1. Download the Extension**
```bash
# Option 1: Clone the repository
git clone https://github.com/utk-code/tubefilter-pro.git
cd tubefilter-pro

# Option 2: Download as ZIP
# Click the green "Code" button → Download ZIP
# Extract the ZIP file to a folder
```

**2. Open Chrome Extensions Page**
- Type `chrome://extensions/` in your address bar
- OR click the three dots (⋮) in Chrome → More tools → Extensions

**3. Enable Developer Mode**
- Toggle the **"Developer mode"** switch in the top-right corner
- This enables the "Load unpacked" button

**4. Load the Extension**
- Click the **"Load unpacked"** button that appears
- Navigate to and select the `tubefilter-pro` folder you downloaded
- The extension should now appear in your extensions list

**5. Pin the Extension (Optional but Recommended)**
- Click the puzzle piece icon (🧩) in Chrome's toolbar
- Find "TubeFilter Pro" in the list
- Click the pin icon next to it

**6. Verify Installation**
- You should see the TubeFilter Pro icon in your Chrome toolbar
- Click it to open the settings panel
- If you see the settings interface, installation was successful!

### Troubleshooting

**"Could not load extension" error?**
- Make sure you selected the folder containing `manifest.json`
- Check that all files (`manifest.json`, `popup.html`, `popup.js`, `content.js`) are present
- Ensure files are saved with UTF-8 encoding

**Extension not working?**
- Go to `chrome://extensions/`
- Find TubeFilter Pro
- Click the refresh/reload icon
- Refresh your YouTube tab

**Can't find "Load unpacked"?**
- Make sure Developer Mode is toggled ON (top-right of extensions page)

---

## 🚀 Usage Guide

### Initial Setup

**1. Open the Extension**
- Click the TubeFilter Pro icon in your Chrome toolbar

**2. Choose Your Filter Mode**
- **Hide Selected**: Hide specific chips you don't want (default)
- **Show Only Selected**: Show ONLY selected chips (hide everything else)

**3. Select Chips to Hide**
- Click preset chips (Music, Gaming, Live, Comedy, etc.)
- Add custom chips by typing a name and pressing Enter
- Click the ✕ on custom chips to remove them

**4. Configure Video Filtering**
- **Block Keywords**: Add words to hide videos (separate with commas)
  - Example: `shorts, vlog, prank, music video, reaction`
- **Whitelist Keywords** (Optional): Add words to ONLY show videos
  - Example: `tutorial, programming, python, javascript, study`

**5. Save Settings**
- Click the **"Save Settings"** button
- You'll see a confirmation message
- Refresh YouTube to apply changes

### Recommended Settings for Developers/Students

**Filter Mode**: Hide Selected

**Chips to Hide:**
```
✓ Music
✓ Gaming
✓ Live
✓ Comedy
✓ Entertainment
✓ Sports
✓ Fashion
✓ Beauty
```

**Block Keywords:**
```
shorts, vlog, prank, music video, reaction, gameplay, live stream, compilation, funny moments
```

**Whitelist Keywords** (Optional - for strict focus):
```
tutorial, programming, python, javascript, coding, study, lecture, course, project, web development, computer science, algorithm, data structure, software engineering, full stack, frontend, backend
```

### Example Use Cases

**Case 1: Computer Science Student**
- Hide: Music, Gaming, Entertainment, Sports
- Block: shorts, vlog, prank
- Whitelist: lecture, tutorial, computer science, algorithm, data structure

**Case 2: Web Developer**
- Hide: Gaming, Live, Comedy, Fashion
- Block: shorts, music video, reaction
- Whitelist: javascript, react, node, web development, tutorial, coding

**Case 3: Casual Learner**
- Hide: Gaming, Live
- Block: shorts, prank
- Whitelist: (leave empty to see all except blocked)

---

## 🛠️ Technical Details

### Project Structure
```
tubefilter-pro/
├── manifest.json      # Extension configuration (Manifest V3)
├── popup.html         # Settings user interface
├── popup.js          # Settings logic and user interactions
├── content.js        # YouTube page filtering logic
└── README.md         # Documentation
```

### How It Works

1. **Filter Chips**: The extension uses `MutationObserver` to detect YouTube's filter chips and hides/shows them based on your preferences

2. **Video Filtering**: Scans video titles and channel names for keywords, hiding videos that match your block list or don't match your whitelist

3. **Dynamic Content**: YouTube is a Single Page Application (SPA), so the extension watches for page changes and re-applies filters automatically

4. **Storage**: Uses Chrome's `storage.sync` API to save preferences across devices

### Technologies Used
- **Manifest V3**: Latest Chrome extension platform
- **Vanilla JavaScript**: No frameworks, lightweight and fast
- **Chrome Storage API**: Persistent, synced settings
- **MutationObserver**: Real-time DOM monitoring

---

## 🔧 Development

### Local Development
1. Clone the repository
2. Load as unpacked extension (see Installation)
3. Make changes to files
4. Click the refresh icon on `chrome://extensions/` to reload
5. Refresh YouTube to see changes

### Debugging
- **Extension Errors**: Go to `chrome://extensions/` → Click "Errors" on TubeFilter Pro
- **Console Logs**: Right-click YouTube → Inspect → Console tab
- **Network Issues**: Check Chrome DevTools → Network tab

### Updating the Extension
When you modify the code:
1. Save your changes
2. Go to `chrome://extensions/`
3. Click the refresh icon on TubeFilter Pro
4. Refresh your YouTube tab

---

## 📝 Configuration Reference

| Setting | Type | Description | Example |
|---------|------|-------------|---------|
| `filterMode` | string | 'hide' or 'showOnly' | `"hide"` |
| `hiddenChips` | array | List of chip names to hide/show | `["Music", "Gaming"]` |
| `blockedKeywords` | array | Keywords to block in video titles | `["shorts", "vlog"]` |
| `whitelistKeywords` | array | Keywords to exclusively show | `["tutorial", "python"]` |

---

## 🐛 Known Issues & Limitations

1. **YouTube Updates**: YouTube frequently changes its interface. If filters stop working, update the extension.

2. **Performance**: On very slow connections, some videos might appear before being filtered. Refresh the page if this happens.

3. **Mobile**: This extension only works on Chrome desktop browser, not mobile.

4. **Other Browsers**: Currently only supports Chrome and Chromium-based browsers (Edge, Brave, etc. may work but not tested).

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Issues
- Found a bug? [Open an issue](https://github.com/YOUR_USERNAME/tubefilter-pro/issues)
- Include:
  - Steps to reproduce
  - Expected vs actual behavior
  - Screenshots (if applicable)
  - Your Chrome version

### Feature Requests
- Have an idea? [Open an issue](https://github.com/YOUR_USERNAME/tubefilter-pro/issues)
- Describe the feature and why it would be useful

### Code Contributions
1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

---

## 📄 License

MIT License

Copyright (c) 2024 TubeFilter Pro

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## 📅 Changelog

### Version 1.0.0 (2024)
- ✨ Initial release
- 🎛️ Filter chip management (hide/show modes)
- 🎬 Video keyword filtering (block and whitelist)
- 💾 Chrome Sync support
- 🎨 Modern dark UI with preset chips
- ⚡ Real-time filtering with MutationObserver
- 🔧 Custom chip addition

---

## 🙏 Acknowledgments

- Built for the developer and student community
- Inspired by the need for distraction-free learning
- Thanks to all users who provide feedback and suggestions

---

## 📧 Support & Contact

**Need help?**
- 📖 Check this README first
- 🐛 Open an issue for bugs
- 💡 Open an issue for feature requests

**FAQ:**

**Q: Will this slow down YouTube?**
A: No, the extension is lightweight and uses efficient DOM observation.

**Q: Does this collect any data?**
A: No. The extension only stores your preferences locally and syncs them via Chrome Sync. No data is sent to external servers.

**Q: Can I use this on Firefox/Safari?**
A: This version is built for Chrome. Firefox and Safari require different extension formats.

**Q: Why isn't this on the Chrome Web Store?**
A: To keep it free, open-source, and avoid Google's review process. Manual installation gives you full transparency.

---

## ⭐ Show Your Support

If TubeFilter Pro helps you stay focused and productive:

1. **Star this repository** ⭐ (top right corner)
2. **Share with friends** who need to focus on learning
3. **Contribute** by reporting bugs or suggesting features

---

**Made with ❤️ for focused learning and productivity**

*Stay focused, keep learning, and build amazing things!* 🚀
