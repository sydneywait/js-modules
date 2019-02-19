//creates HTML string for a single employee

const buildContact = (singleContact) =>{

    return `<div>
    <h3>${singleContact.firstName} ${singleContact.lastName}</h3>
    <p>${singleContact.phoneNumber}</p>
    <p>${singleContact.address}</p>
    </div>`

}

export default buildContact;
