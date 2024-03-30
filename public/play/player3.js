// Function to parse URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Get the type and ID from the URL
var type = getUrlParameter('type');
var id = getUrlParameter('id');

// API URL
var apiKey = '9b9243db9e1283068ea9874cb17d1ac1';
var apiUrl = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`;

// Fetch data from API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Set page title based on data from API
        var pageTitle = data.name || data.title || 'Shensuu Movie';
        document.title = pageTitle + " | Shensuu Movie";

        // Construct the proxy URL
        var proxyUrl = "https://player.movie.8888008.xyz/#/media/tmdb-" + type + "-" + id;

        // Create an iframe element to embed the content
        var iframe = document.querySelector('iframe');
        iframe.setAttribute('src', proxyUrl);
    })
    .catch(error => {
        console.error('Error fetching data from API:', error);
    });

// Append the logo to the video-container div
var logoContainer = document.createElement('div');
logoContainer.classList.add('logo-container');

var logoImg = document.createElement('img');
logoImg.setAttribute('src', '/movix-logo.svg'); 
logoImg.setAttribute('alt', 'Shensuu Movie');

logoImg.addEventListener('click', function() {
    window.location.href = '/' + type + '/' + id;
});

logoContainer.appendChild(logoImg);
document.getElementById('video-container').appendChild(logoContainer);
