/**
 * Movie Search Application using OMDb API
 * Features: Search movies, display results, show detailed information
 */

// Configuration - Replace with your actual OMDb API key
const API_KEY = '27e45a4f'; // Get from http://www.omdbapi.com/apikey.aspx
const BASE_URL = 'https://www.omdbapi.com/';

// DOM Elements
const searchInput = document.getElementById('query');
const searchButton = document.getElementById('searchBtn');
const moviesContainer = document.getElementById('movies');
const errorMessage = document.getElementById('errorMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const searchStats = document.getElementById('searchStats');
const movieModal = document.getElementById('movieModal');
const modalClose = document.querySelector('.modal-close');
const movieDetails = document.getElementById('movieDetails');

// Application State
let currentSearchTerm = '';
let isLoading = false;

/**
 * Initialize the application
 * Sets up event listeners and handles initial state
 */
function initializeApp() {
    // Check if API key is configured
    if (API_KEY === 'YOUR_API_KEY_HERE') {
        showError('Please configure your OMDb API key in app.js. Get your free key at http://www.omdbapi.com/apikey.aspx');
        return;
    }

    // Event Listeners
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', handleKeyPress);
    searchInput.addEventListener('input', handleInputChange);
    modalClose.addEventListener('click', closeModal);
    movieModal.addEventListener('click', handleModalBackgroundClick);
    
    // Close modal on Escape key
    document.addEventListener('keydown', handleEscapeKey);
    
    console.log('Movie Search App initialized successfully');
}

/**
 * Handle search button click
 * Validates input and initiates search
 */
function handleSearch() {
    const query = searchInput.value.trim();
    
    if (!query) {
        showError('Please enter a movie title to search');
        searchInput.focus();
        return;
    }
    
    if (query.length < 2) {
        showError('Please enter at least 2 characters');
        return;
    }
    
    searchMovies(query);
}

/**
 * Handle Enter key press in search input
 * @param {KeyboardEvent} event - The keyboard event
 */
function handleKeyPress(event) {
    if (event.key === 'Enter' && !isLoading) {
        handleSearch();
    }
}

/**
 * Handle input change for real-time validation
 * @param {InputEvent} event - The input event
 */
function handleInputChange(event) {
    const query = event.target.value.trim();
    
    // Clear previous errors when user starts typing
    if (query && errorMessage.style.display !== 'none') {
        hideError();
    }
    
    // Update button state based on input
    updateSearchButtonState(query);
}

/**
 * Handle Escape key to close modal
 * @param {KeyboardEvent} event - The keyboard event
 */
function handleEscapeKey(event) {
    if (event.key === 'Escape' && movieModal.style.display !== 'none') {
        closeModal();
    }
}

/**
 * Handle modal background click to close
 * @param {MouseEvent} event - The mouse event
 */
function handleModalBackgroundClick(event) {
    if (event.target === movieModal) {
        closeModal();
    }
}

/**
 * Update search button state based on input
 * @param {string} query - The current search query
 */
function updateSearchButtonState(query) {
    searchButton.disabled = isLoading || !query.trim();
}

/**
 * Search for movies using the OMDb API
 * @param {string} query - The search term
 */
async function searchMovies(query) {
    if (isLoading) return;
    
    try {
        setLoadingState(true);
        hideError();
        currentSearchTerm = query;
        
        const searchUrl = `${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`;
        console.log('Searching for:', query);
        
        const response = await fetch(searchUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Search results:', data);
        
        handleSearchResponse(data, query);
        
    } catch (error) {
        console.error('Search error:', error);
        handleSearchError(error);
    } finally {
        setLoadingState(false);
    }
}

/**
 * Handle the search API response
 * @param {Object} data - The API response data
 * @param {string} query - The search query
 */
function handleSearchResponse(data, query) {
    if (data.Response === 'True') {
        displayMovies(data.Search);
        updateSearchStats(data.Search.length, query);
    } else {
        handleApiError(data.Error, query);
    }
}

/**
 * Handle API-specific errors
 * @param {string} errorMsg - The error message from API
 * @param {string} query - The search query that failed
 */
function handleApiError(errorMsg, query) {
    console.log('API Error:', errorMsg);
    
    if (errorMsg === 'Movie not found!') {
        showError(`No movies found for "${query}". Try a different search term.`);
        displayMovies([]); // Clear previous results
    } else if (errorMsg.includes('Invalid API key')) {
        showError('Invalid API key. Please check your OMDb API key configuration.');
    } else {
        showError(`Search error: ${errorMsg}`);
    }
    
    updateSearchStats(0, query);
}

/**
 * Handle network and other errors
 * @param {Error} error - The error object
 */
function handleSearchError(error) {
    let errorMsg = 'Unable to search movies. ';
    
    if (!navigator.onLine) {
        errorMsg += 'Please check your internet connection.';
    } else if (error.message.includes('Failed to fetch')) {
        errorMsg += 'Network error. Please try again.';
    } else {
        errorMsg += 'Please try again later.';
    }
    
    showError(errorMsg);
    console.error('Detailed error:', error);
}

/**
 * Display movies in the grid layout
 * @param {Array} movies - Array of movie objects from API
 */
function displayMovies(movies) {
    if (!movies || movies.length === 0) {
        moviesContainer.innerHTML = '';
        return;
    }
    
    const moviesHTML = movies.map(movie => createMovieCard(movie)).join('');
    moviesContainer.innerHTML = moviesHTML;
    
    // Add click event listeners to movie cards
    addMovieCardListeners();
    
    console.log('Displayed', movies.length, 'movies');
}

/**
 * Create HTML for a single movie card
 * @param {Object} movie - Movie data object
 * @returns {string} HTML string for the movie card
 */
function createMovieCard(movie) {
    const poster = movie.Poster !== 'N/A' ? movie.Poster :"/public/images/cinema.webp";
   const posterHTML = poster 
  ? `<img 
      src="${poster}" 
      alt="${movie.Title} poster" 
      class="movie-poster" 
      loading="lazy" 
      onerror="this.onerror=null; this.src='/public/images/cinema.webp';"
    >`
  : `<div class="poster-placeholder">🎬<br>No Image</div>`;

    return `
        <div class="movie-card" data-imdb-id="${movie.imdbID}" tabindex="0" role="button" aria-label="View details for ${movie.Title}">
            <div class="movie-poster-container">
                ${posterHTML}
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${escapeHtml(movie.Title)}</h3>
                <p class="movie-year">${movie.Year}</p>
                <span class="movie-type">${movie.Type}</span>
            </div>
        </div>
    `;
}

/**
 * Add event listeners to movie cards for detailed view
 */
function addMovieCardListeners() {
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
        card.addEventListener('click', () => {
            const imdbID = card.dataset.imdbId;
            if (imdbID) {
                fetchMovieDetails(imdbID);
            }
        });
        
        // Handle keyboard navigation
        card.addEventListener('keypress', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const imdbID = card.dataset.imdbId;
                if (imdbID) {
                    fetchMovieDetails(imdbID);
                }
            }
        });
    });
}

/**
 * Fetch detailed movie information by IMDb ID
 * @param {string} imdbID - The IMDb ID of the movie
 */
async function fetchMovieDetails(imdbID) {
    try {
        console.log('Fetching details for IMDb ID:', imdbID);
        
        const detailUrl = `${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`;
        const response = await fetch(detailUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const movieData = await response.json();
        console.log('Movie details:', movieData);
        
        if (movieData.Response === 'True') {
            displayMovieDetails(movieData);
        } else {
            showError('Unable to load movie details. Please try again.');
        }
        
    } catch (error) {
        console.error('Error fetching movie details:', error);
        showError('Unable to load movie details. Please check your connection.');
    }
}

/**
 * Display detailed movie information in modal
 * @param {Object} movie - Detailed movie data from API
 */
function displayMovieDetails(movie) {
    const poster = movie.Poster !== 'N/A' ? movie.Poster : "/public/images/cinema.webp";
    const posterHTML = poster 
        ? `<img src="${poster || '/public/images/cinema.webp'}"   
        alt="${movie.Title} poster" class="detail-poster
          onerror="this.onerror=null; this.src='/public/images/cinema.webp'">`
        : `<div class="poster-placeholder" style="width: 300px; height: 400px; font-size: 3rem;">🎬<br>No Image</div>`;
    
    const detailsHTML = `
        <div class="detail-grid">
            <div class="detail-poster-container">
                ${posterHTML}
            </div>
            <div class="detail-info">
                <h2>${escapeHtml(movie.Title)}</h2>
                <div class="detail-meta">
                    <span class="meta-item">${movie.Year}</span>
                    <span class="meta-item">${movie.Rated}</span>
                    <span class="meta-item">${movie.Runtime}</span>
                    <span class="meta-item">⭐ ${movie.imdbRating}/10</span>
                </div>
                <p class="detail-plot">${escapeHtml(movie.Plot)}</p>
                <div class="detail-specs">
                    ${createSpecRow('Genre', movie.Genre)}
                    ${createSpecRow('Director', movie.Director)}
                    ${createSpecRow('Writer', movie.Writer)}
                    ${createSpecRow('Actors', movie.Actors)}
                    ${createSpecRow('Language', movie.Language)}
                    ${createSpecRow('Country', movie.Country)}
                    ${createSpecRow('Awards', movie.Awards)}
                    ${createSpecRow('Box Office', movie.BoxOffice)}
                </div>
            </div>
        </div>
    `;
    
    movieDetails.innerHTML = detailsHTML;
    showModal();
}

/**
 * Create a specification row for movie details
 * @param {string} label - The label for the specification
 * @param {string} value - The value for the specification
 * @returns {string} HTML string for the spec row
 */
function createSpecRow(label, value) {
    if (!value || value === 'N/A') return '';
    
    return `
        <div class="spec-row">
            <div class="spec-label">${label}:</div>
            <div class="spec-value">${escapeHtml(value)}</div>
        </div>
    `;
}

/**
 * Show the movie details modal
 */
function showModal() {
    movieModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    modalClose.focus();
}

/**
 * Close the movie details modal
 */
function closeModal() {
    movieModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Return focus to the search input
    searchInput.focus();
}

/**
 * Update search statistics display
 * @param {number} count - Number of results found
 * @param {string} query - The search term used
 */
function updateSearchStats(count, query) {
    if (count > 0) {
        searchStats.textContent = `Found ${count} result${count !== 1 ? 's' : ''} for "${query}"`;
    } else {
        searchStats.textContent = '';
    }
}

/**
 * Set loading state for the application
 * @param {boolean} loading - Whether the app is in loading state
 */
function setLoadingState(loading) {
    isLoading = loading;
    
    if (loading) {
        loadingSpinner.style.display = 'block';
        searchButton.querySelector('.btn-text').style.display = 'none';
        searchButton.querySelector('.btn-loading').style.display = 'inline-flex';
        searchButton.disabled = true;
    } else {
        loadingSpinner.style.display = 'none';
        searchButton.querySelector('.btn-text').style.display = 'inline';
        searchButton.querySelector('.btn-loading').style.display = 'none';
        updateSearchButtonState(searchInput.value.trim());
    }
}

/**
 * Show error message to user
 * @param {string} message - The error message to display
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    // Auto-hide error after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

/**
 * Hide error message
 */
function hideError() {
    errorMessage.style.display = 'none';
}

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} unsafe - Unsafe HTML string
 * @returns {string} Safe HTML string
 */
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Handle visibility change to pause/resume functionality
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('App hidden - pausing functionality');
    } else {
        console.log('App visible - resuming functionality');
    }
});
