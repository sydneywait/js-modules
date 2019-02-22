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
    getSingleUser:(userKey, userValue)=>{
        return fetch(`http://localhost:8088/users?${userKey}=${userValue}`)
            .then(users => users.json())
    },
    updatePassword:(patchObject, id)=>{
            return fetch(`http://localhost:8088/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(patchObject)
            })
        },

    }



export default userManager;

