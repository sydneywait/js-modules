// build a single product card

const makeProductCard = (product)=>{

return `<div class="card" style="width: 200px;">
<img class="card-img-top" src="${product.image}" width ="200px" alt="Card image cap">
<div class="card-body">
  <h4 class="card-title">${product.name}</h4>
  <h5>quantity: ${product.quantity}, price: ${product.price}</h5>

  <p class="card-text">${product.desc}</p>
  <a href="#" class="btn btn-primary">Go somewhere</a>
</div>
</div>`
}


export default makeProductCard;
