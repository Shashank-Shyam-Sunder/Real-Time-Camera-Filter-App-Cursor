# Real-Time Camera Filter App

> **Developed with Cursor AI and Vibe Coding** 🚀

A modern web-based real-time camera filter application that applies Instagram-style filters to your camera feed directly in the browser. This project showcases the power of AI-assisted development using Cursor IDE with vibe coding techniques for rapid prototyping and intuitive user interface creation.

## 🎯 Features

- **Real-time camera feed processing** with instant filter application
- **11 unique filter effects**: Normal, Mirror, Grayscale, Sepia, Invert, Vibrant, Blur, Brightness, High Contrast, Pixelate, and Halftone
- **Photo capture functionality** with customizable filename and format options (PNG, JPEG, WebP)
- **Responsive design** that works seamlessly across desktop and mobile devices
- **Privacy-first approach** - all processing happens locally in your browser
- **No external dependencies** - pure HTML5, CSS3, and JavaScript implementation

## 🔧 .cursor Folder & Cursor Files

This project was developed using **Cursor IDE** with AI-assisted coding and includes comprehensive configuration files that enhance the development experience:

### `.cursor/rules/` Directory Structure
```
.cursor/
├── rules/
│   ├── class-standards.mdc          # Class definition standards
│   ├── coding-standards.mdc         # Python coding standards and style guide
│   ├── function-standards.mdc       # Function definition standards
│   ├── python-src-location.mdc      # Source code organization rules
│   ├── rule-standards.mdc          # Meta-rules for rule creation
│   ├── rule-visibility.mdc         # Rule transparency and visibility
│   └── rules-location.mdc          # Rule file organization
└── .cursorrules                    # Main Cursor configuration file
```

### Importance of Cursor Configuration Files

1. **`.cursorrules`** - The main configuration file that:
   - Enforces mandatory rule fetching before any AI responses
   - Ensures consistency across all AI-assisted coding sessions
   - Provides guidelines for different rule types and applications

2. **Rule Files (`.mdc`)** - Markdown-based configuration files that:
   - **coding-standards.mdc**: Enforces PEP 8 compliance, naming conventions, and code structure
   - **class-standards.mdc**: Ensures proper class documentation and learner attribution
   - **function-standards.mdc**: Maintains consistent function documentation standards
   - **rule-visibility.mdc**: Provides transparency by listing applied rules in AI responses
   - **python-src-location.mdc**: Organizes Python files in the src directory structure
   - **rule-standards.mdc**: Meta-rules ensuring new rules follow established patterns

3. **Benefits for Development**:
   - **Consistency**: Maintains uniform code style across the entire project
   - **Quality Assurance**: Automatically applies best practices and coding standards
   - **Transparency**: Shows which rules are active during development
   - **Scalability**: Easy to add new rules as the project grows
   - **Collaboration**: Ensures all team members follow the same standards

### Cursor Setup Script
The `initialize_cursor_rules.ps1` PowerShell script automatically:
- Creates the `.cursor/rules` directory structure
- Generates all rule files with predefined standards
- Sets up the main `.cursorrules` configuration
- Enables immediate productivity with Cursor IDE

## 🚀 How to Run the Project

### Method 1: Direct Browser Access (Simplest)
1. **Clone the repository**:
   ```bash
   git clone <your-repository-url>
   cd Real-Time-Camera-Filter-App-Cursor
   ```

2. **Open in browser**:
   - Double-click `index.html` or
   - Right-click `index.html` → "Open with" → your preferred browser

3. **Grant camera permissions** when prompted

### Method 2: Local HTTP Server (Recommended for all browsers)

#### Using Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Using Node.js:
```bash
npx http-server -p 8000
```

#### Using PHP:
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Method 3: Live Server Extension (VS Code/Cursor IDE)
1. Install the "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## 🎮 How to Use

1. **Camera Access**: Allow camera permissions when prompted by your browser
2. **Select Filters**: Click any filter button to apply real-time effects
3. **Capture Photos**: Use the 📸 "Capture Photo" button to take a snapshot
4. **Customize Save Options**: 
   - Set custom filename
   - Choose format (PNG/JPEG/WebP)
   - Click 💾 "Save Photo" to download
5. **Special Features**:
   - **Pixelate Filter**: Adjust pixel size with the slider control
   - **Mirror Filter**: Creates horizontal flip effect
   - **Halftone Filter**: Vintage newspaper-style dot pattern

## 🌐 Browser Compatibility

**Fully Supported:**
- Google Chrome 53+
- Mozilla Firefox 36+
- Safari 11+
- Microsoft Edge 12+

**Requirements:**
- MediaDevices API support
- Canvas API support
- JavaScript enabled
- Camera access permissions

## 🔒 Privacy & Security

- **100% Client-Side Processing**: All camera data remains in your browser
- **No Data Transmission**: No images or video streams are sent to any server
- **No Storage**: Photos are only saved when you explicitly download them
- **Temporary Processing**: All filters are applied in real-time without storing intermediate data

## 🛠 Development with Cursor IDE

This project demonstrates effective use of Cursor IDE features:

### Vibe Coding Techniques Used:
- **AI-Assisted Filter Development**: Used natural language prompts to create complex filter algorithms
- **Rapid UI Prototyping**: Leveraged AI suggestions for responsive CSS design
- **Code Optimization**: AI-powered refactoring for better performance
- **Documentation Generation**: Automated comment and documentation creation

### Cursor-Specific Features:
- **Rule-Based Development**: Consistent coding standards across all files
- **AI Code Review**: Automatic compliance checking against established rules
- **Intelligent Suggestions**: Context-aware code completions
- **Multi-File Awareness**: AI understands project structure for better suggestions

## 📁 Project Structure

```
Real-Time-Camera-Filter-App-Cursor/
├── index.html                      # Main application file
├── styles.css                      # Comprehensive styling
├── script.js                       # Core functionality and filters
├── requirements.txt                # Project requirements and browser info
├── initialize_cursor_rules.ps1     # Cursor setup automation
├── README.md                       # This documentation
├── .cursorrules                    # Main Cursor configuration
└── .cursor/
    └── rules/                      # Cursor rule definitions
        ├── *.mdc                   # Individual rule files
        └── ...
```

## 🤝 Contributing

Contributions are welcome! This project benefits from:

1. **Cursor IDE Setup**: Run `initialize_cursor_rules.ps1` to set up development environment
2. **Rule Compliance**: All contributions automatically checked against project rules
3. **AI-Assisted Reviews**: Leverage Cursor's AI for code quality assurance

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Additional Resources

- [Cursor IDE Official Website](https://cursor.sh/)
- [Vibe Coding Documentation](https://docs.cursor.sh/)
- [MediaDevices API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)

---

**Built with ❤️ using Cursor IDE and AI-powered development**
                                
                            
                        