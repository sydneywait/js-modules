// this module will call api to get all employees

const getAllContacts = () => {

    return fetch("http://localhost:8088/contacts")
        .then(contacts => contacts.json())
}


const addContact = (contactObject) => {
    return fetch("http://localhost:8088/contacts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactObject)
    })
}

const contactManager = {
    "getAllContacts": getAllContacts(),
    "addContact": addContact(contactObject)

}

export default getAllContacts;
