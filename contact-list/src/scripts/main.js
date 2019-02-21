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


document.querySelector("#submit-btn").addEventListener("click", () => {

        const firstName = document.querySelector("#first-name").value
        const lastName = document.querySelector("#last-name").value
        const address = document.querySelector("#address").value
        const phone = document.querySelector("#phone-number").value

        const contactObject = contactBuilder.buildContactObject(firstName, lastName, phone, address)

        contactManager.addContact(contactObject)
                .then(printAllContacts)
})

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
                        sessionStorage.setItem("userId", user.id, )
                })
})

document.querySelector("#login-btn").addEventListener("click", () => {

        const userName = document.querySelector("#user-login-name").value
        const password = document.querySelector("#user-password-name").value

        getSingleUser(userName)
.then((singleUser)=>{
        sessionStorage.setItem("userId", singleUser[userId])
        printContacts.printUserContacts(singleUser[userId])

})



})





