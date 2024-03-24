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

// Construct the proxy URL
var proxyUrl = "https://shensuumovie.8888008.xyz/#/media/tmdb-" + type + "-" + id;

// Create an iframe element to embed the content
var iframe = document.querySelector('iframe');
iframe.setAttribute('src', proxyUrl);

// Append the logo to the video-container div
var logoContainer = document.createElement('div');
logoContainer.classList.add('logo-container');

var logoImg = document.createElement('img');
logoImg.setAttribute('src', '/movix-logo.svg'); 
logoImg.setAttribute('alt', 'Shensuu Movie');

logoImg.addEventListener('click', function() {
    window.location.href = 'https://movie.8888008.xyz/' + type + '/' + id;
});

logoContainer.appendChild(logoImg);
document.getElementById('video-container').appendChild(logoContainer);
