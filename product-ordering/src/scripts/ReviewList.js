// imports from ReviewData and Review, creates a list of the reviews and posts to DOM?
import reviews from "./ReviewData.js"
import reviewBuilder from "./Review.js"

const listReviews =()=>{

reviews.forEach(review =>{

    document.querySelector("#review-list").innerHTML+=reviewBuilder(review);

})
}

export default listReviews;