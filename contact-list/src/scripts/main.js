import contactForms from "./contactForm"
import printContacts from "./contactList.js"
import contactManager from "./contactCollection.js"
import contactBuilder from "./contact.js"
import userForms from "./userForms.js";
import userManager from "./userCollection.js"
import userBuilder from "./user.js"
import loginManager from "./loginManager.js"

// printContacts.printAllContacts();

userForms.makeRegisterForm();
userForms.makeLoginForm();

//Add event listener on the contact button to save a contact and post to JSON

document.querySelector("#form-container").addEventListener("click", () => {
        if (event.target.id === "submit-btn") {

                const firstName = document.querySelector("#first-name").value
                const lastName = document.querySelector("#last-name").value
                const address = document.querySelector("#address").value
                const phone = document.querySelector("#phone-number").value

                const contactObject = contactBuilder.buildContactObject(firstName, lastName, phone, address)

                contactManager.addContact(contactObject)
                        .then(printContacts.printUserContacts)
        }
})
//Add event listener on the register button to register a new user
document.querySelector("#register-container").addEventListener("click", () => {
        if (event.target.id === "register-btn") {

                const firstName = document.querySelector("#user-first-name").value
                const lastName = document.querySelector("#user-last-name").value
                const userName = document.querySelector("#user-name").value
                const password = document.querySelector("#user-password").value
                userManager.getSingleUser("userName", userName)
                        .then((singleUser) => {
                                if (singleUser.length === 0) {
                                        //Build an object to represent the user
                                        const userObject = userBuilder.buildUserObject(firstName, lastName, userName, password)
                                        //Make API call and add user to database
                                        userManager.addUser(userObject)
                                                .then(user => user.json())
                                                .then((user) => {
                                                        console.log("you just added a user!", user)
                                                        sessionStorage.setItem("userId", user.id)
                                                        contactForms.makeContactForm();
                                                        userForms.makeLogoutForm();
                                                        document.querySelector("#contact-list").innerHTML = ""
                                                        userForms.removeRegisterForm()
                                                })
                                }
                                //If username is already in the database, window alert.
                                else {
                                        window.alert("The username has already been assigned")
                                }
                        })

        }
})
//Event listener on the login container
document.querySelector("#login-container").addEventListener("click", () => {
        //add event listener on the login button to log in a user and store their userID in the session
        if (event.target.id === "login-btn") {
                const userName = document.querySelector("#user-login-name").value
                const password = document.querySelector("#user-login-password").value
                console.log(userManager.getSingleUser("userName", userName))
                //Check to see if user exists in the database
                userManager.getSingleUser("userName", userName)
                        .then((singleUser) => {

                                if (singleUser.length === 1) {
                                        console.log("The username of", userName, "was verified")
                                        //If username exists, move on to verifying the password
                                        loginManager.verifyPassword(singleUser, password)
                                        userForms.makeLogoutForm();
                                        userForms.removeRegisterForm();
                                        contactForms.makeContactForm();
                                }
                                else {
                                        //If username does not exist, give alert
                                        window.alert("that username does not exist in the database")
                                }
                        })
        }
        //event listener on the logout button to remove a userID from session storage and clear contacts
        if (event.target.id === "logout-btn") {
                sessionStorage.clear("userId")
                console.log("user id cleared")
                userForms.makeRegisterForm()
                userForms.makeLoginForm()
                contactForms.removeContactList();
                contactForms.removeContactForm();

        }
        if (event.target.id === "update-btn") {
                let userId = sessionStorage.getItem("userId")
                console.log("you clicked the update button")
                userManager.getSingleUser("id", userId)
                        .then((singleUser) => {
                                console.log("single user inside update", singleUser)
                                userForms.makePasswordChangeForm(singleUser[0].userName)
                                contactForms.removeContactForm();
                                contactForms.removeContactList();
                        })
        }
        if (event.target.id === "change-password-btn") {
                console.log("you clicked the button to change your password")
                const userId = sessionStorage.getItem("userId")
                const password1 = document.querySelector("#user-change-password1").value
                const password2 = document.querySelector("#user-change-password2").value
                if (password1 === password2) {
                        const patchObject = {
                                password: password1
                        }

                        userManager.updatePassword(patchObject, userId)
                        window.alert("Your password was successfully changed")
                        userForms.makeLogoutForm();
                        contactForms.makeContactForm();
                        printContacts.printUserContacts(userId)
                }
                else {
                        window.alert("The passwords do not match")

                }



        }
        document.querySelector("#contact-list").addEventListener("click",()=>{
        const target = event.target.id.split("-")[0]
        const contactId = event.target.id.split("-")[2]

        console.log("you clicked the button")


        })
})






