//để tạm vì jquery ko bind event vào event dc

var attachClickOnToggleBtn = function () {
    $('#navheader').on('click', '.toggle-button', function () {
        // Find the closest parent with class 'menu-init' and add the class 'js-open'
        $(this).closest('.menu-init').addClass('js-open');
    });
};

var attachClickOnCloseSpan = function () {
    $('#navheader').on('click', '.menu-init .ah-close', function () {
        // Find the closest parent with class 'menu-init' and remove the class 'js-open'
        $(this).closest('.menu-init').removeClass('js-open');
    });
};

var attachClickOnUnderneathSpan = function () {
    var underneathSpanToggle = $('.has-dropdown .js-menu-toggle')
    underneathSpanToggle.on('click',function () {
        $(this).toggleClass('js-toggle-mark');
        // Show delay duration = 0 , slide toggle duration = 300
        $(this).next().stop(true,true).slideToggle(300);
    });
};

var loadDynamicContent = function () {
    var targetElement = document.getElementById('navheader'); // Element to load the external content into

    fetch('navheader.html')
        .then(function(response) {
            return response.text();
        })
        .then(function(html) {
            var tempElement = document.createElement('div');
            tempElement.innerHTML = html;
            while (tempElement.firstChild) {
                targetElement.appendChild(tempElement.firstChild);
            }

            // Reinitialize Bootstrap tooltips for the new content
            $('[data-toggle="tooltip"]').tooltip();

            // Attach click event on the toggle button
            attachClickOnToggleBtn();
            attachClickOnCloseSpan();
            attachClickOnUnderneathSpan();
        })
        .catch(function(error) {
            console.error('Error:', error);
        });
};

// Call the loadDynamicContent function after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    loadDynamicContent();
});
