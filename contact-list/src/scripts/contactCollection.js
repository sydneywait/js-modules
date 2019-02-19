// this module will call api to get all contacts, and to add another contact

const contactManager = {
    getAllContacts: () => {

        return fetch("http://localhost:8088/contacts")
            .then(contacts => contacts.json())
    },
    addContact: (contactObject) => {
        return fetch("http://localhost:8088/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactObject)
        })
    }
}

export default contactManager;
