# 🧞 BrowserGenie - AI Browser Agent Extension

**The Open-Source Agentic Browser Extension**

Transform any Chrome browser into an AI-powered browsing experience with intelligent agents, automation, and privacy-first design.

---

## ✨ Features

### 🤖 AI-Native Browsing
- **Chat Mode** - Natural conversation with AI about web content
- **Agent Mode** - AI autonomously navigates and completes tasks
- **Multi-Model Support** - OpenAI, Claude, Gemini, Ollama, and more
- **Context-Aware** - AI understands current page and browsing history

### 🚀 Browser Automation
- **Smart Navigation** - AI clicks, types, and navigates websites
- **Form Filling** - Automatically fill forms with AI assistance
- **Data Extraction** - Extract structured data from any website
- **Screenshot Analysis** - AI can see and understand page visuals

### 🔒 Privacy First
- **Local Processing** - Use Ollama for 100% local AI
- **No Tracking** - Your data stays with you
- **Open Source** - Fully transparent and auditable

### 🎨 Beautiful UI
- **Side Panel** - Clean, modern interface
- **Dark Mode** - Easy on the eyes
- **Keyboard Shortcuts** - `Ctrl+E` to toggle panel
- **Custom New Tab** - AI-powered start page

---

## 🚀 Quick Start

### Installation

1. **Run BrowserGenie:**
   ```powershell
   .\START-BROWSERGENIE.ps1
   ```

2. **Pin Extension:**
   - Click puzzle icon (🧩) in Chrome toolbar
   - Find "BrowserGenie AI Agent"
   - Click pin icon (📌)

3. **Open Side Panel:**
   - Click BrowserGenie icon
   - Or press `Ctrl+E`

### AI Setup

#### Option 1: Ollama (FREE - Recommended)
```bash
# Install Ollama from https://ollama.ai/

# Download a model
ollama pull llama2

# Start Ollama
ollama serve
```

Then in BrowserGenie:
- Open Settings (⚙️)
- LLM Providers → Ollama
- URL: `http://localhost:11434`
- Model: `llama2`
- Save

#### Option 2: OpenAI (Paid)
- Get API key: https://platform.openai.com/api-keys
- Settings → LLM Providers → OpenAI
- Paste API key
- Model: `gpt-4` or `gpt-3.5-turbo`
- Save

#### Option 3: Claude (Paid)
- Get API key: https://console.anthropic.com/
- Settings → LLM Providers → Claude
- Paste API key
- Model: `claude-3-sonnet`
- Save

---

## 💡 Usage Examples

### Chat with AI
```
You: "Summarize this article"
AI: [Reads page and provides summary]

You: "Find the best deals on this page"
AI: [Analyzes and highlights deals]
```

### Agent Mode
```
You: "Book a flight from NYC to LA"
AI: [Opens travel site, searches, shows options]

You: "Fill out this contact form"
AI: [Automatically fills form fields]
```

### Data Extraction
```
You: "Extract all product prices"
AI: [Returns structured data]

You: "Get contact information from this page"
AI: [Finds and formats contacts]
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+E` | Toggle side panel |
| `Ctrl+Shift+E` | New chat |
| `/help` | Show help |
| `/clear` | Clear chat |

---

## 🛠️ Development

### Build Extension
```powershell
cd packages/browsergenie-agent
yarn install
yarn build
```

### Development Mode
```powershell
yarn dev:watch
```

### Run Tests
```powershell
yarn test
```

---

## 📦 Project Structure

```
BrowserGenie/
├── packages/
│   └── browsergenie-agent/     # Main extension
│       ├── src/
│       │   ├── background/     # Background service worker
│       │   ├── sidepanel/      # AI chat interface
│       │   ├── content/        # Page interaction
│       │   ├── options/        # Settings page
│       │   ├── newtab/         # New tab page
│       │   └── lib/            # Core AI logic
│       ├── dist/               # Built extension
│       └── manifest.json       # Extension config
├── START-BROWSERGENIE.ps1      # Quick launcher
└── README-EXTENSION.md         # This file
```

---

## 🎯 Use Cases

### For Developers
- Automate testing workflows
- Extract data for analysis
- Debug web applications
- Generate code snippets

### For Researchers
- Gather information quickly
- Summarize articles
- Extract citations
- Compare sources

### For Business
- Automate data entry
- Monitor competitors
- Generate reports
- Lead generation

### For Everyone
- Shop smarter
- Research faster
- Learn efficiently
- Save time

---

## 🔧 Configuration

### Settings Location
- Click BrowserGenie icon → Settings (⚙️)
- Or: `chrome://extensions/` → BrowserGenie → Options

### Available Settings
- **LLM Providers** - Configure AI models
- **MCP Servers** - Model Context Protocol
- **Search Providers** - Default search engine
- **Preferences** - UI customization

---

## 🚀 Monetization Ready

### Features for SaaS
- ✅ User authentication ready
- ✅ API key management
- ✅ Usage tracking
- ✅ Premium features toggle
- ✅ Subscription model support

### Potential Revenue Streams
1. **Freemium Model** - Free with Ollama, paid for cloud AI
2. **Pro Features** - Advanced automation, team features
3. **API Access** - Sell API access to automation
4. **White Label** - License to enterprises
5. **Marketplace** - Custom agents and workflows

---

## 📊 Demo Ready

### What Works
✅ Full AI chat interface
✅ Browser automation
✅ Multi-model support
✅ Beautiful UI
✅ All features functional
✅ Production ready

### Demo Script
1. Open BrowserGenie
2. Show chat with AI
3. Demonstrate agent mode
4. Extract data from website
5. Show settings and customization
6. Highlight privacy features

---

## 🤝 Contributing

This is a complete, working extension ready for:
- Demo presentations
- Client pitches
- Product launches
- Further development
- Monetization

---

## 📝 License

MIT License - Free to use, modify, and monetize

---

## 🎉 Ready to Use!

```powershell
# Start BrowserGenie now
.\START-BROWSERGENIE.ps1
```

**Your AI browser agent is ready to demo and monetize!** 🚀

---

## 📞 Support

- Documentation: See README.md
- Issues: GitHub Issues
- Updates: Check releases

**Built with ❤️ for the future of browsing**
