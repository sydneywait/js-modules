const makeNavBar = () => {
    const navString = `<span>BETSY</span>  <a class="navbar-item" href="#">Categories</a>
    <a class="navbar-item" href="#">Orders</a>
    <a class="navbar-item" href="#">Log Out</a>`

    document.querySelector("#nav-bar").innerHTML=navString
}

export default makeNavBar;