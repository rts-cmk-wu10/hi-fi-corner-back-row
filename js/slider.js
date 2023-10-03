const slider = document.querySelector(".main__article-slider");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

// Initialize variables
let currentIndex = 0;
let powerAmplifiers = [];

// Function to fetch JSON data and handle errors
function fetchPowerAmplifiers() {
    fetch('http://localhost:3000/products')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then((data) => {
            powerAmplifiers = data.map((element) => element.image);
            showImage(currentIndex);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Function to display an image at a given index
function showImage(index) {
    if (index < 0) {
        currentIndex = powerAmplifiers.length - 1;
    } else if (index >= powerAmplifiers.length) {
        currentIndex = 0;
    }

    // Create a new img element
    const img = document.createElement('img');
    img.src = powerAmplifiers[currentIndex];

    // Remove any existing image in the slider
    slider.innerHTML = '';

    // Append the new image to the slider
    slider.appendChild(img);
}

// Event listener for the previous button
prevBtn.addEventListener('click', () => {
    currentIndex--;
    showImage(currentIndex);
});

// Event listener for the next button
nextBtn.addEventListener('click', () => {
    currentIndex++;
    showImage(currentIndex);
});

// Fetch power amplifiers data when the page loads
fetchPowerAmplifiers();