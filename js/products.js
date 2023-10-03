// Define an array to store product data
const PRODUCTS = [];
// Define an array to store category data
const CATEGORIES = [];
const DATALIST = document.querySelector("#products");
const PRODUCTS_CONTAINER = document.querySelector(".products__list");

// Function to convert category names to lowercase with underscores
function convertCategory(category) {
    return category.toLowerCase().replace(" ", "_");
}

// Async function to fetch categories and products from a local server
async function fetchCategoriesAndProducts() {
    try {
        // Fetch categories and products concurrently
        const [categoriesResponse, productsResponse] = await Promise.all([
            fetch("http://localhost:3000/categories"),
            fetch("http://localhost:3000/products")
        ]);

        // Check if the categories fetch was successful
        if (categoriesResponse.status === 200) {
            // Parse the response and add categories to the CATEGORIES array
            CATEGORIES.push(...await categoriesResponse.json());
        } else {
            // Throw an error if the fetch was not successful
            throw new Error("Failed to fetch categories");
        }

        // Check if the products fetch was successful
        if (productsResponse.status === 200) {
            // Parse the response and add products to the PRODUCTS array
            PRODUCTS.push(...await productsResponse.json());
        } else {
            // Throw an error if the fetch was not successful
            throw new Error("Failed to fetch products");
        }
    } catch (error) {
        // Handle errors by logging to the console and displaying an error message on the page
        console.error("An error occurred:", error);
        document.body.innerText += "Oops, something went wrong";
    }
    console.log(PRODUCTS)
}

// Async function to render products on the page
async function renderProducts() {
    try {
        // Fetch categories and products
        await fetchCategoriesAndProducts();

        // Populate the datalist with product titles
        PRODUCTS.forEach(function (product) {
            DATALIST.innerHTML += `<option>${product.title}</option>`;
        });

        // Get query parameters from the URL
        const params = new URLSearchParams(location.search);
        const search = params.get("search");
        const categoryIndex = params.get("category");
        const CATEGORY = CATEGORIES[categoryIndex];

        if (!CATEGORY) {
            // Handle the case where the category does not exist (e.g., show an error on the page)
        } else {
            // Get a reference to an HTML element with the class "category__title"
            const CATEGORY_TITLE_EL = document.querySelector(".category__title");
            // Set the category title on the page
            CATEGORY_TITLE_EL.innerHTML = CATEGORY.category;
        }

        // Filter products based on search or category
        const filteredProducts = search
            ? PRODUCTS.filter(product => product.title === search)
            : PRODUCTS.filter(product => product.categories.category !== convertCategory(CATEGORY.category));

        // Iterate through filtered products and create product elements
        filteredProducts.forEach(product => {
            const ELEMENT = document.createElement("div");
            ELEMENT.classList.add("products__list-product");
            ELEMENT.innerHTML = `
                <span class="imagePlaceholder">
                    <img src="${product.image}">
                </span>
                `;
            // Append the product element to the products container
            PRODUCTS_CONTAINER.appendChild(ELEMENT);
            
        });
        
        



    } catch (error) {
        // Handle errors by logging to the console
        console.error("An error occurred:", error);
    }
}
// Call the renderProducts function to start rendering products
renderProducts();