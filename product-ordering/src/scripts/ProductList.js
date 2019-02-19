// imports from productData and product
import products from "./ProductData.js"
import makeProductCard from "./Product.js"

const listProducts = () =>{
products.forEach(product => {
    document.querySelector("#product-list").innerHTML+=makeProductCard(product)
})};

export default listProducts;