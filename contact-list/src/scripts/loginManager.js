import userForms from "./userForms.js"
import contactForms from "./contactForm.js"
import printContacts from "./contactList.js"


const loginManager ={

    verifyPassword: (user, password)=>{
        if(password===user[0].password)
        {
            console.log("password matched")
            userForms.makeLogoutForm();
            userForms.removeRegisterForm();
            contactForms.makeContactForm();
            sessionStorage.setItem("userId", user[0].id)
            printContacts.printUserContacts(user[0].id)

            console.log("user logged in", user[0])
        }
        else{
            console.log("password did not match")
            window.alert("Password is incorrect!!  Try again")
        }


    },

    confirmPassword: (password1, password2)=>{
        if(password1===password2){
            singleId=sessionStorage.getItem("userId")
        userManager.updatePassword(password1, singleId);
        }


    },

    verifyUserName: (user, userName)=>{


    }


}

export default loginManager;
