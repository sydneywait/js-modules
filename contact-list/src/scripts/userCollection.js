// This module will manage the user database

const userManager = {
    getAllUsers: () => {

        return fetch("http://localhost:8088/users")
            .then(users => users.json())
    },
    addUser: (userObject) => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObject)
        })
    },
    getSingleUser:(userName)=>{
        return fetch(`http://localhost:8088/users?userName=${userName}`)
            .then(users => users.json())
    },


    }


export default userManager;