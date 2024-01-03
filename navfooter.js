window.addEventListener('DOMContentLoaded', function() {
  var targetElement = document.getElementById('navfooter'); // Element to load the external content into

  fetch('navfooter.html')
    .then(function(response) {
      return response.text();
    })
    .then(function(html) {
      targetElement.innerHTML = html;
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
});