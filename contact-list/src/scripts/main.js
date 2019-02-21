import makeContactForm from "./contactForm"
import printContacts from "./contactList.js"
import contactManager from "./contactCollection.js"
import contactBuilder from "./contact.js"
import userForms from "./userForms.js";
import userManager from "./userCollection.js"
import userBuilder from "./user.js"

printContacts.printAllContacts();
makeContactForm();
userForms.makeRegisterForm();
userForms.makeLoginForm();

//Add event listener on the contact button to save a contact and post to JSON

document.querySelector("#submit-btn").addEventListener("click", () => {

        const firstName = document.querySelector("#first-name").value
        const lastName = document.querySelector("#last-name").value
        const address = document.querySelector("#address").value
        const phone = document.querySelector("#phone-number").value

        const contactObject = contactBuilder.buildContactObject(firstName, lastName, phone, address)

        contactManager.addContact(contactObject)
                .then(printContacts.printUserContacts)
})
//Add event listener on the register button to register a new user

document.querySelector("#register-btn").addEventListener("click", () => {

        const firstName = document.querySelector("#user-first-name").value
        const lastName = document.querySelector("#user-last-name").value
        const userName = document.querySelector("#user-name").value
        const password = document.querySelector("#user-password").value

        const userObject = userBuilder.buildUserObject(firstName, lastName, userName, password)

        userManager.addUser(userObject)
                .then(user => user.json())
                .then((user) => {
                        console.log("you just added a user!", user)
                        sessionStorage.setItem("userId", user.id)
                })
})

//add event listener on the login button to log in a user and store their userID in the session
document.querySelector("#login-btn").addEventListener("click", () => {

        const userName = document.querySelector("#user-login-name").value
        const password = document.querySelector("#user-login-password").value

        userManager.getSingleUser("userName", userName)
                .then((singleUser) => {
                        console.log(singleUser)
                        sessionStorage.setItem("userId", singleUser[0].id)
                        printContacts.printUserContacts(singleUser[0].id)

                })



})

//add event listener on the logout button to remove a userID from session storage and clear contacts
document.querySelector("#logout-btn").addEventListener("click", ()=>{

        sessionStorage.clear("userId")
        console.log("user id cleared")
})





