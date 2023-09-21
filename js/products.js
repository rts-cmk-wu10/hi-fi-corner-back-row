//  const PRODUCTS = []
//  const CATEGORIES = []
//  const DATALIST = document.querySelector("#products")
//  const PRODUCTS_CONTAINER = document.querySelector(".products__list")

//  function convertCategory(category){
//      return category.toLowerCase().replace(" ", "_") 
//  }

//  fetch(`http://localhost:3000/categories`)
//      .then(async function (response) {
//          if (response.status === 200) {
//              // response.json() returns a promise so we must await this to use it
//              CATEGORIES.push(...await response.json())
//          } else {
//              document.body.innerText += "ups, noget gik galt"
//          }
//      }).then(async function () {
//          // wait for fetch response
//          await fetch(`http://localhost:3000/products`)
//            .then(async function (response) {
//                  if (response.status === 200) {
//                      PRODUCTS.push(...await response.json())
//                  } else {
//                      document.body.innerText += "ups, noget gik galt"
//                  }
//              })
//      }).then(function () {
//          PRODUCTS.forEach(function (product) {
//              DATALIST.innerHTML += `<option>${product.title}</option>`
//          })
//          const PARAMS = new URLSearchParams(location.search)
//          const SEARCH = PARAMS.get("search")
//          const CATEGORY = CATEGORIES[PARAMS.get('category')]
//          if (!CATEGORY) {
//              // TODO: handle non-existent category (e.g. show an error on the page)
//          } else {
//              const CATEGORY_TITLE_EL = document.querySelector('.category__title')
//              CATEGORY_TITLE_EL.innerHTML = CATEGORY.category
//          }

//          let filteredProducts
//          if (SEARCH) {
//              filteredProducts = PRODUCTS.filter(product => product.title === SEARCH) 
//          } else {
//              filteredProducts = PRODUCTS.filter(product => {
//                  console.debug(`${product.categories.category} !== ${convertCategory(CATEGORY.category)}`, product.categories.category !== convertCategory(CATEGORY.category))
//                  if (product.categories.category !== convertCategory(CATEGORY.category)) return false
//                  return true
//              })
//          }
//          console.debug(filteredProducts)
//          filteredProducts.forEach(product => {
//              const ELEMENT = document.createElement("div")
//              ELEMENT.classList.add("products__list-product")
//              ELEMENT.innerHTML = `
//              <span class="imagePlaceholder">
//              <img src="${product.image}">
//              </span>
    
//              <div class="info-container">
           
//              </div>`
//              PRODUCTS_CONTAINER.appendChild(ELEMENT)

//             
//          })
//      })


 const PRODUCTS = [];
 const CATEGORIES = [];
 const DATALIST = document.querySelector("#products");
 const PRODUCTS_CONTAINER = document.querySelector(".products__list");

 function convertCategory(category) {
     return category.toLowerCase().replace(" ", "_");
 }

 async function fetchCategoriesAndProducts() {
     try {
         const [categoriesResponse, productsResponse] = await Promise.all([
             fetch("http://localhost:3000/categories"),
             fetch("http://localhost:3000/products")
         ]);

         if (categoriesResponse.status === 200) {
             CATEGORIES.push(...await categoriesResponse.json());
         } else {
             throw new Error("Failed to fetch categories");
         }

         if (productsResponse.status === 200) {
             PRODUCTS.push(...await productsResponse.json());
         } else {
             throw new Error("Failed to fetch products");
         }
     } catch (error) {
         console.error("An error occurred:", error);
         document.body.innerText += "Oops, something went wrong";
     }
 }

 async function renderProducts() {
     try {
         await fetchCategoriesAndProducts();

         PRODUCTS.forEach(function (product) {
             DATALIST.innerHTML += `<option>${product.title}</option>`;
         });

         const params = new URLSearchParams(location.search);
         const search = params.get("search");
         const categoryIndex = params.get('category');
         const CATEGORY = CATEGORIES[categoryIndex];

         if (!CATEGORY) {
             // TODO: Handle non-existent category (e.g., show an error on the page)
         } else {
             const CATEGORY_TITLE_EL = document.querySelector('.category__title');
             CATEGORY_TITLE_EL.innerHTML = CATEGORY.category;
         }

         const filteredProducts = search
             ? PRODUCTS.filter(product => product.title === search)
             : PRODUCTS.filter(product => product.categories.category !== convertCategory(CATEGORY.category));

         filteredProducts.forEach(product => {
             const ELEMENT = document.createElement("div");
             ELEMENT.classList.add("products__list-product");
             ELEMENT.innerHTML = `
             <span class="imagePlaceholder">
             <img src="${product.image}">
             </span>
    
             <div class="info-container">
           
             </div>`;
             PRODUCTS_CONTAINER.appendChild(ELEMENT);
         });
     } catch (error) {
         console.error("An error occurred:", error);
     }
 }

 // Call the renderProducts function to start rendering products
 renderProducts()