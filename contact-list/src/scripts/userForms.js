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

        document.querySelector("#login-container").innerHTML = `<button type="submit" id="logout-btn">logout</button>`

    },
    removeRegisterForm:()=>{
        document.querySelector("#register-container").innerHTML=""
    }

}
export default userForms;

