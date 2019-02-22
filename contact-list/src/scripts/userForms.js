const userForms = {

    makeRegisterForm: () => {
        document.querySelector("#register-container").innerHTML = `<h1>Please Register:</h1>
        <input class="register-input" type="text" name="userFirstName" id="user-first-name" placeholder="First Name"></input> <br>
        <input class="register-input" type="text" name="userLastName" id="user-last-name" placeholder="Last Name"><br>
        <input class="register-input" type="text" name="userName" id="user-name" placeholder="Username"><br>
        <input class="register-input" type="password" name="password" id="user-password" placeholder="Password"><br>
        <button type="register" class = "big-btn green-btn" id="register-btn">register</button>`
    },
    makeLoginForm: () => {
        document.querySelector("#login-container").innerHTML = `<h1>Welcome!</h1>
        <input type="text" name="userName" id="user-login-name" placeholder="Enter Username"><br>
        <input type="password" name="password" id="user-login-password" placeholder="Enter Password"><br>
        <button class = "big-btn green-btn" type="submit" id="login-btn">login</button>
        <button class = "big-btn green-btn" type="submit" id="show-register-btn">register</button>`
    },
    removeLoginForm:()=>{
        document.querySelector("#login-container").innerHTML =""
    },
    makeLogoutForm: () => {

        document.querySelector("#login-container").innerHTML =
        `<button class = "big-btn green-btn" type="submit" id="logout-btn">logout</button>
        <button class = "big-btn blue-btn" type="submit" id="update-btn">change password</button>`

    },
    removeRegisterForm:()=>{
        document.querySelector("#register-container").innerHTML=""
    },
    makePasswordChangeForm:(userName)=>{

        document.querySelector("#login-container").innerHTML=
        `<h1>Change Your Password</h1>
        <input type="text" name="userName" id="user-change-name" value="${userName}"><br>
        <input type="text" name="password" id="user-change-password1" placeholder="Enter Password"><br>
        <input type="text" name="password" id="user-change-password2" placeholder="Enter Password Again"><br>
        <button class = "big-btn green-btn" type="submit" id="change-password-btn">submit</button>
        `
    }

}
export default userForms;

