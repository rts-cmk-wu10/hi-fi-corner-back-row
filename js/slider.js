const slider = document.querySelector(".main__article-slider");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

// Initialize variables
let currentIndex = 0;
let powerAmplifiers = [];

// Function to convert category names to lowercase with underscores
function convertCategory(category) {
    return category.toLowerCase().replace(" ", "_");
}

// Function to fetch JSON data
async function fetchPowerAmplifiers() {
    try {
        const response = await fetch('http://localhost:3000/products');
        if (response.status === 200) {
            const data = await response.json();
            // Filter products for "amplifiers" subcategory
            powerAmplifiers = data.filter(product => (
                product.categories.subcategory === "Amplifiers"
            ));
            // Show the initial image
            showImage(currentIndex);
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}

// Function to display an image at a given index
function showImage(index) {
    if (index < 0) {
        currentIndex = powerAmplifiers.length - 1;
    } else if (index >= powerAmplifiers.length) {
        currentIndex = 0;
    }

    // Get the URL of the current image and set it as the background
    const Urlimage = powerAmplifiers[currentIndex].image;
    const img = document.createElement('img')
    img.src = Urlimage;
    slider.replaceChildren(img)
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