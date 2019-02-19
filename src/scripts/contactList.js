// this module should import from apiManager (get employees) and loop through and option to print one or all
//export an object with methods (print all, print single)

import getAllContacts from "./contactCollection.js"
import buildContact from "./contact.js"

const printAllContacts =()=>{
getAllContacts()
.then((parsedContacts)=>{
console.log(parsedContacts)
parsedContacts.forEach(singleContactObject=> {
    const contactHTMLString = buildContact(singleContactObject)
    console.log(contactHTMLString);
    document.querySelector("#contact-list").innerHTML+=buildContact(singleContactObject)

});

})
}

export default printAllContacts;