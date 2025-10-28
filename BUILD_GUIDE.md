# 🔨 BrowserGenie Build Guide

## Method 1: Quick Rebrand (Recommended - 30 minutes)

### Step 1: Download Pre-built Chromium
1. Go to: https://download-chromium.appspot.com/
2. Download latest Windows build (~160MB)
3. Extract to a folder

### Step 2: Rebrand Chromium
1. Replace icons with BrowserGenie icons
2. Modify chrome.dll resources
3. Update manifest files
4. Add BrowserGenie extension

### Step 3: Create Installer
Use tools like:
- **Inno Setup** (Windows): https://jrsoftware.org/isinfo.php
- **NSIS**: https://nsis.sourceforge.io/

---

## Method 2: Build from Source (Advanced - 2-3 days)

### Requirements:
- **100GB free space** (Chromium source)
- **16GB+ RAM**
- **Visual Studio 2022** with C++ tools
- **Python 3.11+**
- **depot_tools**

### Step 1: Install depot_tools
```bash
git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
# Add to PATH
```

### Step 2: Get Chromium Source
```bash
mkdir chromium
cd chromium
fetch chromium
cd src
```

### Step 3: Check out specific version
```bash
# Check BrowserGenie's Chromium version
cat D:\browser-warrior\BrowserGenie\packages\browsergenie\CHROMIUM_VERSION

# Checkout that version
git checkout <version>
gclient sync
```

### Step 4: Apply BrowserGenie Patches
```bash
cd D:\browser-warrior\BrowserGenie\packages\browsergenie
python build/build.py --chromium-src C:\chromium\src --build
```

### Step 5: Build
```bash
# This takes 3-5 hours first time
autoninja -C out\Release chrome
```

---

## Method 3: Use GitHub Actions (Cloud Build - Free)

I've already created the workflow file. Just:

1. Push BrowserGenie to GitHub
2. GitHub Actions will build automatically
3. Download the built .exe from Releases

**Advantages:**
- ✅ No local setup needed
- ✅ Builds on GitHub servers
- ✅ Free for public repos
- ✅ Automatic releases

---

## Recommended Approach

**For fastest results:**
1. Download pre-built Chromium (160MB)
2. Rebrand it with BrowserGenie assets
3. Add BrowserGenie extension
4. Create installer with Inno Setup

**This gives you a working BrowserGenie browser in 30 minutes!**

---

## Tools You'll Need

### For Rebranding:
- **Resource Hacker**: https://www.angusj.com/resourcehacker/
- **Icon Editor**: https://www.greenfish.com/
- **Inno Setup**: https://jrsoftware.org/isinfo.php

### For Building from Source:
- **Visual Studio 2022**: https://visualstudio.microsoft.com/
- **Python 3.11**: https://www.python.org/downloads/
- **Git**: https://git-scm.com/

---

## Quick Links

- **Chromium Snapshots**: https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html
- **Latest Chromium**: https://download-chromium.appspot.com/
- **Chromium Build Guide**: https://www.chromium.org/developers/how-tos/get-the-code/
- **BrowserOS Build System**: Already in `packages/browsergenie/build/`

---

## What I Recommend

**Start with Method 1** (Quick Rebrand):
1. Download Chromium
2. I'll help you rebrand it
3. Add BrowserGenie extension
4. Create installer

This is what most browser forks do! Arc, Brave, Edge - they all start with Chromium binaries.

Want me to guide you through Method 1? 🚀
