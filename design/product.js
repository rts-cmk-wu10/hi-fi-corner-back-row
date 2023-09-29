const api = "http://localhost:3000/products/1"

fetch (api)
.then (response=>response.json())
.then (data => {
    console.log(data)
    head.innerHTML = data.title
    picture.src = "../" + data.image
    price.innerHTML = data.price
   

})

const head = document.querySelector (".overskrift")
const picture = document.querySelector (".cd")

const price = document.querySelector (".underskrift")





 

/* 
    () funktion
    = tilføje
    {} objeckt inhold i en funktion
    . Hvis noget tilhøre noget andet
    "" tekst

*/