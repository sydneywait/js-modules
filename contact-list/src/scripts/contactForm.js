const contactForms = {

    makeContactForm: () => {
        document.querySelector("#form-container").innerHTML = `
        <legend>Create a New Contact</legend>
        <input type="text" name = "firstName" id="first-name" placeholder="First Name"><br>
        <input type="text" name="lastName" id="last-name" placeholder="Last Name"><br>
        <input type="text" name ="phoneNumber", id="phone-number" placeholder="Phone Number"><br>
        <input type="text" name="address" id="address" placeholder="Address"><br>
        <button type = "submit", id="submit-btn">Submit</button>`

    },

    removeContactForm: () => {
        document.querySelector("#form-container").innerHTML = ""
    },
    removeContactList: ()=>{
        document.querySelector("#contact-list").innerHTML = ""
    },
    makeEditContactForm:(userId, contactId, singleContact)=>{
        document.querySelector(`#user-${userId}-contact-${contactId}`).innerHTML=
        `<legend>Edit Your Contact</legend>
        <input type="text" name = "firstName" id="edit-first-name" value="${singleContact.firstName}"><br>
        <input type="text" name="lastName" id="edit-last-name" value="${singleContact.lastName}"><br>
        <input type="text" name ="phoneNumber", id="edit-phone-number" value="${singleContact.phoneNumber}"><br>
        <input type="text" name="address" id="edit-address" value="${singleContact.address}"><br>
        <button type = "submit", id="submit-edit-${contactId}">Submit</button>
        <button type = "submit", id="cancel-edit-${contactId}">Cancel</button>`


    }
}
export default contactForms;