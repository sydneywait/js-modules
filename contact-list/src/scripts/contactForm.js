const makeContactForm = () =>{
document.querySelector("#form-container").innerHTML =`
<legend>Create a New Contact</legend>
<input type="text" name = "firstName" id="first-name" placeholder="First Name"><br>
<input type="text" name="lastName" id="last-name" placeholder="Last Name"><br>
<input type="text" name ="phoneNumber", id="phone-number" placeholder="Phone Number"><br>
<input type="text" name="address" id="address" placeholder="Address"><br>
<button type = "submit", id="submit-btn">Submit</button>`

}

export default makeContactForm;