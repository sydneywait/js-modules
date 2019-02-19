// build a single product card

const makeProductCard = (product)=>{

return `<div class="card" style="width: 200px;">
<img class="card-img-top" src="${product.image}" width ="200px" alt="Card image cap">
<div class="card-body">
  <h4 class="card-title">${product.name}</h4>
  <p class="card-text">${product.desc}</p>
  <h5>Quantity: ${product.quantity},     Price: ${product.price}</h5>
</div>
</div>`
}


export default makeProductCard;
