const slider = document.querySelector(".main__article-slider");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

// Initialize variables to keep track of the current image index and store image URLs
let currentIndex = 0;
let powerAmplifiers = [];

// Function to fetch JSON data for products
function fetchproducts() {
    // Use the fetch API to retrieve data from a specified URL 
    fetch('http://localhost:3000/products')
        .then((response) => {
            // Check if the response status is OK (status code 200)
            if (!response.ok) {
                // If not OK, throw an error to handle it in the catch block
                throw new Error('Failed to fetch data');
            }
            // Parse the response as JSON
            return response.json();
        })
        .then((data) => {
            // Extract image URLs from the JSON data and store them in the powerAmplifiers array
            powerAmplifiers = data.map((element) => element.image);
            // Display the first image when data is successfully fetched
            showImage(currentIndex);
        })
        .catch((error) => {
            // Handle errors by logging them to the console
            console.error('Error:', error);
        });
}

// Function to display an image at a given index
function showImage(index) {
    // Ensure the index wraps around to the first or last image if it goes out of bounds
    if (index < 0) {
        currentIndex = powerAmplifiers.length - 1;
    } else if (index >= powerAmplifiers.length) {
        currentIndex = 0;
    }
    // Create a new img element
    const img = document.createElement('img');
    // Set the source attribute of the img element to the current image URL
    img.src = powerAmplifiers[currentIndex];

    // Remove any existing image in the slider
    slider.innerHTML = '';

    // Append the new image to the slider to display it
    slider.appendChild(img);
}

// Event listener for the previous button
prevBtn.addEventListener('click', () => {
    // Decrement the current index and update the displayed image
    currentIndex--;
    showImage(currentIndex);
});

// Event listener for the next button
nextBtn.addEventListener('click', () => {
    // Increment the current index and update the displayed image
    currentIndex++;
    showImage(currentIndex);
});

// Fetch power amplifiers data when the page loads
fetchproducts();