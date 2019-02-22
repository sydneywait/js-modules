// this module should import from apiManager (get employees) and loop through and option to print one or all
//export an object with methods (print all, print single)

import contactManager from "./contactCollection.js"
import contactBuilder from "./contact.js"
import userManager from "./userCollection.js";
import contactForms from "./contactForm.js";

const printContacts = {

printAllContacts:()=>{
document.querySelector("#contact-list").innerHTML=""

contactManager.getAllContacts()
.then((parsedContacts)=>{
console.log(parsedContacts)
parsedContacts.forEach(singleContactObject=> {
    const contactHTMLString = contactBuilder.buildContact(singleContactObject)
    document.querySelector("#contact-list").innerHTML+=contactBuilder.buildContact(singleContactObject)

})

})
},
printUserContacts:()=>{
    contactForms.removeContactList();
    const userId = sessionStorage.getItem("userId")

    userManager.getSingleUser("id", userId)
    .then((user)=>{
        console.log("get single user", user)
        document.querySelector("#contact-header").innerHTML=`${user[0].firstName} ${user[0].lastName}'s contacts`
    })
    contactManager.getUserContacts(userId)
    .then((parsedContacts)=>{
    console.log(parsedContacts)

    parsedContacts.forEach(singleContactObject=> {
        const contactHTMLString = contactBuilder.buildContact(singleContactObject)
        document.querySelector("#contact-list").innerHTML+=contactBuilder.buildContact(singleContactObject)

    })

    })
    }

}



export default printContacts;