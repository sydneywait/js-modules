//creates HTML string for a single employee, or an object when there is a new inputfrom the form


const contactBuilder ={
    buildContact: (singleContact) =>{
        const userId = sessionStorage.getItem("userId")
        return `<div id="user-${userId}-contact-${singleContact.id}">
        <h3>${singleContact.firstName} ${singleContact.lastName}</h3>
        <p>${singleContact.phoneNumber}</p>
        <p>${singleContact.address}</p>
        <button type = "submit" id ="edit-contact-${singleContact.id}">edit</button>
        <button type = "submit" id ="delete-contact-${singleContact.id}" >delete</button>
        </div>`

    },

    buildContactObject: (firstName, lastName, phone, address) => {
        const contactObject = {

            firstName: firstName,
            lastName: lastName,
            phoneNumber: phone,
            address: address,
            userId: sessionStorage.getItem("userId")
        }

        return contactObject;
    }

}
export default contactBuilder;