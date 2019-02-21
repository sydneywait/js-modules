const userForms = {

    makeRegisterForm: () => {
        document.querySelector("#register-container").innerHTML = `<fieldset><legend>Register</legend>
        <input type="text" name="userFirstName" id="user-first-name" placeholder="First Name"></input> <br>
        <input type="text" name="userLastName" id="user-last-name" placeholder="Last Name"><br>
        <input type="text" name="userName" id="user-name" placeholder="Enter Username"><br>
        <input type="password" name="password" id="user-password" placeholder="Enter Password"><br>
        <button type="register" id="register-btn">register</button></fieldset>`
    },
    makeLoginForm: () => {
        document.querySelector("#login-container").innerHTML = `<fieldset><legend>Login</legend>
        <input type="text" name="userName" id="user-login-name" placeholder="Enter Username"><br>
        <input type="password" name="password" id="user-login-password" placeholder="Enter Password"><br>
        <button type="submit" id="login-btn">login</button>
        </fieldset>`
    },
    makeLogoutForm: () => {

        document.querySelector("#login-container").innerHTML =
        `<button type="submit" id="logout-btn">logout</button>
        <button type="submit" id="update-btn">Change Password</button>`

    },
    removeRegisterForm:()=>{
        document.querySelector("#register-container").innerHTML=""
    },
    makePasswordChangeForm:(userName)=>{

        document.querySelector("#login-container").innerHTML=
        `<fieldset><legend>Change Your Password</legend>
        <input type="text" name="userName" id="user-change-name" value="${userName}"><br>
        <input type="text" name="password" id="user-change-password" placeholder="Enter Password"><br>
        <input type="text" name="password" id="user-change-password" placeholder="Enter Password Again"><br>
        <button type="submit" id="change-btn">submit</button>
        </fieldset>`
    }

}
export default userForms;

