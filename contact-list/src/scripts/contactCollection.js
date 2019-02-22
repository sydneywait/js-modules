// this module will call api to get all contacts, and to add another contact

const contactManager = {
    getAllContacts: () => {

        return fetch("http://localhost:8088/contacts")
            .then(contacts => contacts.json())
    },
    getSingleContact: (contactId) => {

        return fetch(`http://localhost:8088/contacts/${contactId}`)
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
    },

    getUserContacts: (userId) => {
        return fetch(`http://localhost:8088/contacts?userId=${userId}`)
            .then(contacts => contacts.json())
    },

    deleteContact: (id)=>{
        return fetch(`http://localhost:8088/contacts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }

        })
    },

    editSingleContact: (contactObject, id)=>{
        return fetch(`http://localhost:8088/contacts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactObject)
        })
    }
}


export default contactManager;
