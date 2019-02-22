const contactForms = {

    makeContactForm: () => {
        document.querySelector("#form-container").innerHTML = `
        <h1>Create a New Contact</h1>
        <input class="make-contact" type="text" name = "firstName" id="first-name" placeholder="First Name"><br>
        <input class="make-contact" type="text" name="lastName" id="last-name" placeholder="Last Name"><br>
        <input class="make-contact" type="text" name ="phoneNumber", id="phone-number" placeholder="Phone Number"><br>
        <input class="make-contact" type="text" name="address" id="address" placeholder="Address"><br>
        <button class = "big-btn green-btn" type = "submit", id="submit-btn">Submit</button>`

    },

    removeContactForm: () => {
        document.querySelector("#form-container").innerHTML = ""
    },
    removeContactList: ()=>{
        document.querySelector("#contact-header").innerHTML = ""
        document.querySelector("#contact-list").innerHTML = ""
    },
    makeEditContactForm:(userId, contactId, singleContact)=>{
        document.querySelector(`#user-${userId}-contact-${contactId}`).innerHTML=
        `<h4 class = "edit-contact-label" >Edit your Contact<h4>
        <input type="text" name = "firstName" id="edit-first-name" value="${singleContact.firstName}"><br>
        <input type="text" name="lastName" id="edit-last-name" value="${singleContact.lastName}"><br>
        <input type="text" name ="phoneNumber", id="edit-phone-number" value="${singleContact.phoneNumber}"><br>
        <input type="text" name="address" id="edit-address" value="${singleContact.address}"><br>
        <button class = "sm-btn green-btn" type = "submit", id="submit-edit-${contactId}">Submit</button>
        <button class = "sm-btn red-btn" type = "submit", id="cancel-edit-${contactId}">Cancel</button>`


    }
}
export default contactForms;