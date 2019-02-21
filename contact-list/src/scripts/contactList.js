// this module should import from apiManager (get employees) and loop through and option to print one or all
//export an object with methods (print all, print single)

import contactManager from "./contactCollection.js"
import contactBuilder from "./contact.js"

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
    document.querySelector("#contact-list").innerHTML=""
    const userId = sessionStorage.getItem("userId")
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