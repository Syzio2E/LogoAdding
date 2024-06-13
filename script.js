document.addEventListener('DOMContentLoaded', function() {
    const circles = document.querySelectorAll('.circle');
    const umbrellaImage = document.getElementById('umbrella-image');
    const uploadButton = document.getElementById('upload-button');
    const fileInput = document.getElementById('file-input');
    const loader = document.getElementById('loader');
    const logoContainer = document.getElementById('logo-container');
    const uploadedLogo = document.getElementById('uploaded-logo');

    const umbrellaImages = {
        blue: 'images/blue-umbrella.png',
        yellow: 'images/yellow-umbrella.png',
        pink: 'images/pink-umbrella.png'
    };

    const backgroundColors = {
        blue: '#add8e6',  
        yellow: '#fffacd', 
        pink: '#ffb6c1'   
    };

    const buttonColors = {
        blue: '#87ceeb',  
        yellow: '#ffd700', 
        pink: '#ff69b4'   
    };

    const loaderColors = {
        blue: '#87ceeb',  
        yellow: '#ffd700', 
        pink: '#ff69b4'    
    };

    let currentColor = 'blue';
    umbrellaImage.src = umbrellaImages.blue;
    umbrellaImage.alt = 'Blue Umbrella';
    document.body.style.backgroundColor = backgroundColors.blue;
    uploadButton.style.backgroundColor = buttonColors.blue;
    loader.style.fill = loaderColors.blue;

    circles.forEach(circle => {
        circle.addEventListener('click', function() {
            const color = circle.id;
            if (color !== currentColor) {
                switchUmbrella(color);
            }
        });
    });

    uploadButton.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedLogo.src = e.target.result;
                uploadedLogo.style.display = 'block';
                uploadedLogo.alt = 'Uploaded Logo';
            };
            reader.readAsDataURL(file);
        } else {
            uploadedLogo.src = '';
            uploadedLogo.alt = '';
            uploadedLogo.style.display = 'none';
        }
    });

    function switchUmbrella(color) {
        showLoader(color);

        umbrellaImage.style.visibility = 'hidden';
        uploadedLogo.style.display = 'none';

        setTimeout(() => {
           
            umbrellaImage.src = umbrellaImages[color];
            umbrellaImage.alt = `${color.charAt(0).toUpperCase() + color.slice(1)} Umbrella`;
            document.body.style.backgroundColor = backgroundColors[color];
            uploadButton.style.backgroundColor = buttonColors[color];
            loader.style.fill = loaderColors[color];

            umbrellaImage.style.visibility = 'visible';
            if (uploadedLogo.src !== '' && uploadedLogo.src !== '#') {
                uploadedLogo.style.display = 'block';
            }

            currentColor = color;

            
            hideLoader();
        }, 2000); 
    }

    function showLoader(color) {
        loader.style.display = 'block';
        loader.style.fill = loaderColors[color];
        loader.classList.add('rotate'); 
    }

    function hideLoader() {
        loader.classList.remove('rotate');
        loader.style.display = 'none';
    }
});
