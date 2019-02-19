//creates HTML string for a single employee, or an object when there is a new inputfrom the form


const contactBuilder ={
    buildContact: (singleContact) =>{

        return `<div>
        <h3>${singleContact.firstName} ${singleContact.lastName}</h3>
        <p>${singleContact.phoneNumber}</p>
        <p>${singleContact.address}</p>
        </div>`

    },

    buildContactObject: (firstName, lastName, phone, address) => {
        const contactObject = {

            firstName: firstName,
            lastName: lastName,
            phoneNumber: phone,
            address: address
        }

        return contactObject;
    }

}
export default contactBuilder;