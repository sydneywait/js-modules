// exports a function that makes an individual review

const reviewBuilder = (review) =>{


return `<div><img src = ${review.stars} width ="150px"></img>
<p>${review.text}</p>

</div>`

}

export default reviewBuilder;