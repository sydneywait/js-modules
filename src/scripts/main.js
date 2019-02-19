import printAllContacts from "./contactList.js"
import contactManager from "./contactCollection.js"
import contactBuilder from "./contact.js"


printAllContacts()

document.querySelector("#submit-btn").addEventListener("click", ()=>{

const firstName = document.querySelector("#first-name").value
const lastName = document.querySelector("#last-name").value
const address = document.querySelector("#address").value
const phone = document.querySelector("#phone-number").value

const contactObject = contactBuilder.buildContactObject(firstName, lastName, phone, address)

// const contactObject = {

//             "firstName": firstName,
//             "lastName": lastName,
//             "phoneNumber": phone,
//             "address": address
//         }
        contactManager.addContact(contactObject)
        .then(printAllContacts)
})




