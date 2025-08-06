# Movie Search App - OMDb Explorer

A responsive web application for searching and exploring movies using the OMDb (Open Movie Database) API. Built with vanilla HTML, CSS, and JavaScript.

## 🎬 Overview

This application provides an intuitive interface for movie discovery, featuring:
- **Search Functionality**: Search movies by title using the OMDb API
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Detailed Information**: Click any movie card to view comprehensive details
- **Professional UI**: Modern dark theme with smooth animations and micro-interactions

### OMDb API Endpoints Used

1. **Search Endpoint**: `https://www.omdbapi.com/?s={SEARCH_TERM}&apikey={API_KEY}`
   - **Purpose**: Retrieve a list of movies matching the user's search term
   - **Returns**: Array of movies with basic information (title, year, poster, type)

2. **Detail Endpoint**: `https://www.omdbapi.com/?i={IMDB_ID}&apikey={API_KEY}`
   - **Purpose**: Fetch comprehensive details for a specific movie by IMDb ID
   - **Returns**: Complete movie information including plot, cast, ratings, and technical details

## 🚀 Setup Instructions

### 1. Get Your OMDb API Key
1. Visit [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)
2. Sign up for a free API key
3. Check your email for the API key activation link

### 2. Configure the Application
1. Clone or download this repository
2. Open `app.js` in your preferred text editor
3. Replace `'YOUR_API_KEY_HERE'` with your actual OMDb API key:
   ```javascript
   const API_KEY = 'your-actual-api-key-here';
   ```

### 3. Run the Application
1. **Option A - Local File Server**:
   - Open `index.html` directly in a modern web browser
   - Note: Some browsers may restrict API calls from file:// protocol

2. **Option B - HTTP Server (Recommended)**:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using Live Server in VS Code
   # Install Live Server extension and click "Go Live"
   ```
3. Navigate to `http://localhost:8000` in your browser

## 📱 Usage Instructions

### Searching for Movies
1. Enter a movie title in the search input field
2. Click the "Search" button or press Enter
3. Results will display in a responsive grid layout
4. Use the search stats to see how many results were found

### Viewing Movie Details
1. Click on any movie card to open the detailed view
2. The modal will display comprehensive information including:
   - High-resolution poster
   - Plot summary
   - Cast and crew
   - Technical specifications
   - Ratings and awards
3. Close the modal by clicking the X button, clicking outside the modal, or pressing Escape

### Responsive Design
- **Mobile (< 768px)**: Single column layout
- **Tablet (768px - 1024px)**: Two-column grid
- **Desktop (> 1024px)**: Three-column grid

## 🧪 Testing

The application has been tested in:
- ✅ Google Chrome (latest)
- ✅ Mozilla Firefox (latest)
- ✅ Safari (latest)
- ✅ Microsoft Edge (latest)

### Test Scenarios
1. **Basic Search**: Try searching for popular movies like "The Dark Knight", "Inception"
2. **Error Handling**: Search for non-existent movies or invalid terms
3. **Network Issues**: Test with network disconnected
4. **Responsive Design**: Test on different screen sizes
5. **Accessibility**: Navigate using keyboard only

## 🛠 Technical Implementation

### Architecture
- **Vanilla JavaScript**: No external frameworks or libraries
- **Modular Functions**: Clean separation of concerns
- **Error Handling**: Comprehensive error management for API and network issues
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

### Key Features
- **Fetch API**: Modern asynchronous HTTP requests
- **CSS Grid/Flexbox**: Responsive layout system
- **CSS Custom Properties**: Consistent design system
- **Progressive Enhancement**: Works without JavaScript (basic HTML structure)
- **Performance Optimization**: Image lazy loading and efficient DOM manipulation

### File Structure
```
/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and responsive design
├── app.js             # JavaScript functionality and API integration
└── README.md          # Documentation (this file)
```

## 🎨 Design System

### Color Palette
- **Primary Background**: `#1a1a2e` (Dark navy)
- **Secondary Background**: `#16213e` (Darker navy)
- **Accent Color**: `#0f4c75` (Professional blue)
- **Success**: `#27ae60` (Green)
- **Warning**: `#f39c12` (Orange)
- **Error**: `#e74c3c` (Red)

### Typography
- **Font Family**: Segoe UI system font stack
- **Body Text**: 150% line height for optimal readability
- **Headings**: 120% line height for better hierarchy
- **Font Weights**: 400 (regular), 600 (semi-bold), 700 (bold)

### Spacing System
Based on 8px grid system for consistent spacing and alignment.

## 🚧 Challenges and Solutions

### 1. API Key Management
**Challenge**: Securely handling API keys in client-side code
**Solution**: Clear documentation for users to add their own keys, avoiding hardcoded credentials

### 2. Image Loading
**Challenge**: Handling missing or broken movie poster images
**Solution**: Implemented placeholder system with fallback UI for "N/A" poster responses

### 3. Responsive Grid Layout
**Challenge**: Creating fluid layouts that work across all device sizes
**Solution**: CSS Grid with responsive breakpoints and flexible column counts

### 4. Error Handling
**Challenge**: Providing meaningful feedback for various error states
**Solution**: Comprehensive error handling for network issues, API errors, and invalid searches

### 5. Performance Optimization
**Challenge**: Smooth user experience during API calls
**Solution**: Loading states, image lazy loading, and debounced search functionality

### 6. Accessibility
**Challenge**: Ensuring keyboard navigation and screen reader compatibility
**Solution**: Proper ARIA labels, focus management, and semantic HTML structure

## 🔧 Browser Compatibility

- **Chrome**: 60+ ✅
- **Firefox**: 55+ ✅
- **Safari**: 12+ ✅
- **Edge**: 79+ ✅

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Note**: This application requires an active internet connection and a valid OMDb API key to function properly.