//creates HTML string for a single employee, or an object when there is a new inputfrom the form


const userBuilder ={
    buildUser: (singleUser) =>{

        return `<div>
        <h3>${singleUser.firstName} ${singleUser.lastName}</h3>
        <p>${singleUser.userName}</p>
        <p>${singleUser.password}</p>
        </div>`

    },

    buildUserObject: (firstName, lastName, userName, password) => {
        const userObject = {

            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: password
        }

        return userObject;
    }

}
export default userBuilder;