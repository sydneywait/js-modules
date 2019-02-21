(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//creates HTML string for a single employee, or an object when there is a new inputfrom the form
const contactBuilder = {
  buildContact: singleContact => {
    return `<div>
        <h3>${singleContact.firstName} ${singleContact.lastName}</h3>
        <p>${singleContact.phoneNumber}</p>
        <p>${singleContact.address}</p>
        </div>`;
  },
  buildContactObject: (firstName, lastName, phone, address) => {
    const contactObject = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phone,
      address: address,
      userId: sessionStorage.getItem("userId")
    };
    return contactObject;
  }
};
var _default = contactBuilder;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// this module will call api to get all contacts, and to add another contact
const contactManager = {
  getAllContacts: () => {
    return fetch("http://localhost:8088/contacts").then(contacts => contacts.json());
  },
  addContact: contactObject => {
    return fetch("http://localhost:8088/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactObject)
    });
  },
  getUserContacts: userId => {
    return fetch(`http://localhost:8088/contacts?userId=${userId}`).then(contacts => contacts.json());
  }
};
var _default = contactManager;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const contactForms = {
  makeContactForm: () => {
    document.querySelector("#form-container").innerHTML = `
        <legend>Create a New Contact</legend>
        <input type="text" name = "firstName" id="first-name" placeholder="First Name"><br>
        <input type="text" name="lastName" id="last-name" placeholder="Last Name"><br>
        <input type="text" name ="phoneNumber", id="phone-number" placeholder="Phone Number"><br>
        <input type="text" name="address" id="address" placeholder="Address"><br>
        <button type = "submit", id="submit-btn">Submit</button>`;
  },
  removeContactForm: () => {
    document.querySelector("#form-container").innerHTML = "";
  }
};
var _default = contactForms;
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactCollection = _interopRequireDefault(require("./contactCollection.js"));

var _contact = _interopRequireDefault(require("./contact.js"));

var _userCollection = _interopRequireDefault(require("./userCollection.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this module should import from apiManager (get employees) and loop through and option to print one or all
//export an object with methods (print all, print single)
const printContacts = {
  printAllContacts: () => {
    document.querySelector("#contact-list").innerHTML = "";

    _contactCollection.default.getAllContacts().then(parsedContacts => {
      console.log(parsedContacts);
      parsedContacts.forEach(singleContactObject => {
        const contactHTMLString = _contact.default.buildContact(singleContactObject);

        document.querySelector("#contact-list").innerHTML += _contact.default.buildContact(singleContactObject);
      });
    });
  },
  printUserContacts: () => {
    document.querySelector("#contact-list").innerHTML = "";
    const userId = sessionStorage.getItem("userId");

    _userCollection.default.getSingleUser("id", userId).then(user => {
      console.log("get single user", user);
      document.querySelector("#contact-list").innerHTML = `<h1>${user[0].firstName} ${user[0].lastName}'s Contacts</h1>`;
    });

    _contactCollection.default.getUserContacts(userId).then(parsedContacts => {
      console.log(parsedContacts);
      parsedContacts.forEach(singleContactObject => {
        const contactHTMLString = _contact.default.buildContact(singleContactObject);

        document.querySelector("#contact-list").innerHTML += _contact.default.buildContact(singleContactObject);
      });
    });
  }
};
var _default = printContacts;
exports.default = _default;

},{"./contact.js":1,"./contactCollection.js":2,"./userCollection.js":8}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _userForms = _interopRequireDefault(require("./userForms.js"));

var _contactForm = _interopRequireDefault(require("./contactForm.js"));

var _contactList = _interopRequireDefault(require("./contactList.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const loginManager = {
  verifyPassword: (user, password) => {
    if (password === user[0].password) {
      console.log("password matched");

      _userForms.default.makeLogoutForm();

      _userForms.default.removeRegisterForm();

      _contactForm.default.makeContactForm();

      sessionStorage.setItem("userId", user[0].id);

      _contactList.default.printUserContacts(user[0].id);

      console.log("user logged in", user[0]);
    } else {
      console.log("password did not match");
      window.alert("Password is incorrect!!  Try again");
    }
  },
  confirmPassword: password => {},
  verifyUserName: (user, userName) => {}
};
var _default = loginManager;
exports.default = _default;

},{"./contactForm.js":3,"./contactList.js":4,"./userForms.js":9}],6:[function(require,module,exports){
"use strict";

var _contactForm = _interopRequireDefault(require("./contactForm"));

var _contactList = _interopRequireDefault(require("./contactList.js"));

var _contactCollection = _interopRequireDefault(require("./contactCollection.js"));

var _contact = _interopRequireDefault(require("./contact.js"));

var _userForms = _interopRequireDefault(require("./userForms.js"));

var _userCollection = _interopRequireDefault(require("./userCollection.js"));

var _user = _interopRequireDefault(require("./user.js"));

var _loginManager = _interopRequireDefault(require("./loginManager.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// printContacts.printAllContacts();
_userForms.default.makeRegisterForm();

_userForms.default.makeLoginForm(); //Add event listener on the contact button to save a contact and post to JSON


document.querySelector("#form-container").addEventListener("click", () => {
  if (event.target.id === "submit-btn") {
    const firstName = document.querySelector("#first-name").value;
    const lastName = document.querySelector("#last-name").value;
    const address = document.querySelector("#address").value;
    const phone = document.querySelector("#phone-number").value;

    const contactObject = _contact.default.buildContactObject(firstName, lastName, phone, address);

    _contactCollection.default.addContact(contactObject).then(_contactList.default.printUserContacts);
  }
}); //Add event listener on the register button to register a new user

document.querySelector("#register-btn").addEventListener("click", () => {
  const firstName = document.querySelector("#user-first-name").value;
  const lastName = document.querySelector("#user-last-name").value;
  const userName = document.querySelector("#user-name").value;
  const password = document.querySelector("#user-password").value;

  _userCollection.default.getSingleUser("userName", userName).then(singleUser => {
    if (singleUser.length === 0) {
      //Build an object to represent the user
      const userObject = _user.default.buildUserObject(firstName, lastName, userName, password); //Make API call and add user to database


      _userCollection.default.addUser(userObject).then(user => user.json()).then(user => {
        console.log("you just added a user!", user);
        sessionStorage.setItem("userId", user.id);

        _contactForm.default.makeContactForm();

        _userForms.default.makeLogoutForm();

        document.querySelector("#contact-list").innerHTML = "";

        _userForms.default.removeRegisterForm();
      });
    } //If username is already in the database, window alert.
    else {
        window.alert("The username has already been assigned");
      }
  });
}); //add event listener on the login button to log in a user and store their userID in the session

document.querySelector("#login-container").addEventListener("click", () => {
  if (event.target.id === "login-btn") {
    const userName = document.querySelector("#user-login-name").value;
    const password = document.querySelector("#user-login-password").value;
    console.log(_userCollection.default.getSingleUser("userName", userName)); //Check to see if user exists in the database

    _userCollection.default.getSingleUser("userName", userName).then(singleUser => {
      if (singleUser.length === 1) {
        console.log("The username of", userName, "was verified"); //If username exists, move on to verifying the password

        _loginManager.default.verifyPassword(singleUser, password);
      } else {
        //If username does not exist, give alert
        window.alert("that username does not exist in the database");
      }
    });
  }
}); //add event listener on the logout button to remove a userID from session storage and clear contacts

document.querySelector("#login-container").addEventListener("click", () => {
  if (event.target.id === "logout-btn") {
    sessionStorage.clear("userId");
    console.log("user id cleared");

    _userForms.default.makeRegisterForm();

    _userForms.default.makeLoginForm();

    document.querySelector("#contact-list").innerHTML = "";
    document.querySelector("#form-container").innerHTML = "";
  }
});

},{"./contact.js":1,"./contactCollection.js":2,"./contactForm":3,"./contactList.js":4,"./loginManager.js":5,"./user.js":7,"./userCollection.js":8,"./userForms.js":9}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//creates HTML string for a single employee, or an object when there is a new inputfrom the form
const userBuilder = {
  buildUser: singleUser => {
    return `<div>
        <h3>${singleUser.firstName} ${singleUser.lastName}</h3>
        <p>${singleUser.userName}</p>
        <p>${singleUser.password}</p>
        </div>`;
  },
  buildUserObject: (firstName, lastName, userName, password) => {
    const userObject = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      password: password
    };
    return userObject;
  }
};
var _default = userBuilder;
exports.default = _default;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// This module will manage the user database
const userManager = {
  getAllUsers: () => {
    return fetch("http://localhost:8088/users").then(users => users.json());
  },
  addUser: userObject => {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userObject)
    });
  },
  getSingleUser: (userKey, userValue) => {
    return fetch(`http://localhost:8088/users?${userKey}=${userValue}`).then(users => users.json());
  }
};
var _default = userManager;
exports.default = _default;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const userForms = {
  makeRegisterForm: () => {
    document.querySelector("#register-container").innerHTML = `<fieldset><legend>Register</legend>
        <input type="text" name="userFirstName" id="user-first-name" placeholder="First Name"></input> <br>
        <input type="text" name="userLastName" id="user-last-name" placeholder="Last Name"><br>
        <input type="text" name="userName" id="user-name" placeholder="Enter Username"><br>
        <input type="password" name="password" id="user-password" placeholder="Enter Password"><br>
        <button type="register" id="register-btn">register</button></fieldset>`;
  },
  makeLoginForm: () => {
    document.querySelector("#login-container").innerHTML = `<fieldset><legend>Login</legend>
        <input type="text" name="userName" id="user-login-name" placeholder="Enter Username"><br>
        <input type="password" name="password" id="user-login-password" placeholder="Enter Password"><br>
        <button type="submit" id="login-btn">login</button>
        </fieldset>`;
  },
  makeLogoutForm: () => {
    document.querySelector("#login-container").innerHTML = `<button type="submit" id="logout-btn">logout</button>`;
  },
  removeRegisterForm: () => {
    document.querySelector("#register-container").innerHTML = "";
  }
};
var _default = userForms;
exports.default = _default;

},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL2xvZ2luTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvdXNlci5qcyIsIi4uL3NjcmlwdHMvdXNlckNvbGxlY3Rpb24uanMiLCIuLi9zY3JpcHRzL3VzZXJGb3Jtcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBR0EsTUFBTSxjQUFjLEdBQUU7QUFDbEIsRUFBQSxZQUFZLEVBQUcsYUFBRCxJQUFrQjtBQUU1QixXQUFRO2NBQ0YsYUFBYSxDQUFDLFNBQVUsSUFBRyxhQUFhLENBQUMsUUFBUzthQUNuRCxhQUFhLENBQUMsV0FBWTthQUMxQixhQUFhLENBQUMsT0FBUTtlQUgzQjtBQU1ILEdBVGlCO0FBV2xCLEVBQUEsa0JBQWtCLEVBQUUsQ0FBQyxTQUFELEVBQVksUUFBWixFQUFzQixLQUF0QixFQUE2QixPQUE3QixLQUF5QztBQUN6RCxVQUFNLGFBQWEsR0FBRztBQUVsQixNQUFBLFNBQVMsRUFBRSxTQUZPO0FBR2xCLE1BQUEsUUFBUSxFQUFFLFFBSFE7QUFJbEIsTUFBQSxXQUFXLEVBQUUsS0FKSztBQUtsQixNQUFBLE9BQU8sRUFBRSxPQUxTO0FBTWxCLE1BQUEsTUFBTSxFQUFFLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCO0FBTlUsS0FBdEI7QUFTQSxXQUFPLGFBQVA7QUFDSDtBQXRCaUIsQ0FBdEI7ZUF5QmUsYzs7Ozs7Ozs7OztBQzVCZjtBQUVBLE1BQU0sY0FBYyxHQUFHO0FBQ25CLEVBQUEsY0FBYyxFQUFFLE1BQU07QUFFbEIsV0FBTyxLQUFLLENBQUMsZ0NBQUQsQ0FBTCxD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QUFFbEIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixrQkFBdkIsRUFBMkMsU0FBM0MsR0FBd0QsdURBQXhEO0FBRUgsR0FyQmE7QUFzQmQsRUFBQSxrQkFBa0IsRUFBQyxNQUFJO0FBQ25CLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIscUJBQXZCLEVBQThDLFNBQTlDLEdBQXdELEVBQXhEO0FBQ0g7QUF4QmEsQ0FBbEI7ZUEyQmUsUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vY3JlYXRlcyBIVE1MIHN0cmluZyBmb3IgYSBzaW5nbGUgZW1wbG95ZWUsIG9yIGFuIG9iamVjdCB3aGVuIHRoZXJlIGlzIGEgbmV3IGlucHV0ZnJvbSB0aGUgZm9ybVxyXG5cclxuXHJcbmNvbnN0IGNvbnRhY3RCdWlsZGVyID17XHJcbiAgICBidWlsZENvbnRhY3Q6IChzaW5nbGVDb250YWN0KSA9PntcclxuXHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2PlxyXG4gICAgICAgIDxoMz4ke3NpbmdsZUNvbnRhY3QuZmlyc3ROYW1lfSAke3NpbmdsZUNvbnRhY3QubGFzdE5hbWV9PC9oMz5cclxuICAgICAgICA8cD4ke3NpbmdsZUNvbnRhY3QucGhvbmVOdW1iZXJ9PC9wPlxyXG4gICAgICAgIDxwPiR7c2luZ2xlQ29udGFjdC5hZGRyZXNzfTwvcD5cclxuICAgICAgICA8L2Rpdj5gXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBidWlsZENvbnRhY3RPYmplY3Q6IChmaXJzdE5hbWUsIGxhc3ROYW1lLCBwaG9uZSwgYWRkcmVzcykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RPYmplY3QgPSB7XHJcblxyXG4gICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSxcclxuICAgICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lLFxyXG4gICAgICAgICAgICBwaG9uZU51bWJlcjogcGhvbmUsXHJcbiAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MsXHJcbiAgICAgICAgICAgIHVzZXJJZDogc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhY3RPYmplY3Q7XHJcbiAgICB9XHJcblxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNvbnRhY3RCdWlsZGVyOyIsIi8vIHRoaXMgbW9kdWxlIHdpbGwgY2FsbCBhcGkgdG8gZ2V0IGFsbCBjb250YWN0cywgYW5kIHRvIGFkZCBhbm90aGVyIGNvbnRhY3RcclxuXHJcbmNvbnN0IGNvbnRhY3RNYW5hZ2VyID0ge1xyXG4gICAgZ2V0QWxsQ29udGFjdHM6ICgpID0+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKGNvbnRhY3RzID0+IGNvbnRhY3RzLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBhZGRDb250YWN0OiAoY29udGFjdE9iamVjdCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0c1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbnRhY3RPYmplY3QpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0VXNlckNvbnRhY3RzOiAodXNlcklkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHM/dXNlcklkPSR7dXNlcklkfWApXHJcbiAgICAgICAgICAgIC50aGVuKGNvbnRhY3RzID0+IGNvbnRhY3RzLmpzb24oKSlcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29udGFjdE1hbmFnZXI7XHJcbiIsImNvbnN0IGNvbnRhY3RGb3JtcyA9IHtcclxuXHJcbiAgICBtYWtlQ29udGFjdEZvcm06ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm0tY29udGFpbmVyXCIpLmlubmVySFRNTCA9IGBcclxuICAgICAgICA8bGVnZW5kPkNyZWF0ZSBhIE5ldyBDb250YWN0PC9sZWdlbmQ+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZSA9IFwiZmlyc3ROYW1lXCIgaWQ9XCJmaXJzdC1uYW1lXCIgcGxhY2Vob2xkZXI9XCJGaXJzdCBOYW1lXCI+PGJyPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJsYXN0TmFtZVwiIGlkPVwibGFzdC1uYW1lXCIgcGxhY2Vob2xkZXI9XCJMYXN0IE5hbWVcIj48YnI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZSA9XCJwaG9uZU51bWJlclwiLCBpZD1cInBob25lLW51bWJlclwiIHBsYWNlaG9sZGVyPVwiUGhvbmUgTnVtYmVyXCI+PGJyPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJhZGRyZXNzXCIgaWQ9XCJhZGRyZXNzXCIgcGxhY2Vob2xkZXI9XCJBZGRyZXNzXCI+PGJyPlxyXG4gICAgICAgIDxidXR0b24gdHlwZSA9IFwic3VibWl0XCIsIGlkPVwic3VibWl0LWJ0blwiPlN1Ym1pdDwvYnV0dG9uPmBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZUNvbnRhY3RGb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtLWNvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY29udGFjdEZvcm1zOyIsIi8vIHRoaXMgbW9kdWxlIHNob3VsZCBpbXBvcnQgZnJvbSBhcGlNYW5hZ2VyIChnZXQgZW1wbG95ZWVzKSBhbmQgbG9vcCB0aHJvdWdoIGFuZCBvcHRpb24gdG8gcHJpbnQgb25lIG9yIGFsbFxyXG4vL2V4cG9ydCBhbiBvYmplY3Qgd2l0aCBtZXRob2RzIChwcmludCBhbGwsIHByaW50IHNpbmdsZSlcclxuXHJcbmltcG9ydCBjb250YWN0TWFuYWdlciBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvbi5qc1wiXHJcbmltcG9ydCBjb250YWN0QnVpbGRlciBmcm9tIFwiLi9jb250YWN0LmpzXCJcclxuaW1wb3J0IHVzZXJNYW5hZ2VyIGZyb20gXCIuL3VzZXJDb2xsZWN0aW9uLmpzXCI7XHJcblxyXG5jb25zdCBwcmludENvbnRhY3RzID0ge1xyXG5cclxucHJpbnRBbGxDb250YWN0czooKT0+e1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtbGlzdFwiKS5pbm5lckhUTUw9XCJcIlxyXG5cclxuY29udGFjdE1hbmFnZXIuZ2V0QWxsQ29udGFjdHMoKVxyXG4udGhlbigocGFyc2VkQ29udGFjdHMpPT57XHJcbmNvbnNvbGUubG9nKHBhcnNlZENvbnRhY3RzKVxyXG5wYXJzZWRDb250YWN0cy5mb3JFYWNoKHNpbmdsZUNvbnRhY3RPYmplY3Q9PiB7XHJcbiAgICBjb25zdCBjb250YWN0SFRNTFN0cmluZyA9IGNvbnRhY3RCdWlsZGVyLmJ1aWxkQ29udGFjdChzaW5nbGVDb250YWN0T2JqZWN0KVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWxpc3RcIikuaW5uZXJIVE1MKz1jb250YWN0QnVpbGRlci5idWlsZENvbnRhY3Qoc2luZ2xlQ29udGFjdE9iamVjdClcclxuXHJcbn0pXHJcblxyXG59KVxyXG59LFxyXG5wcmludFVzZXJDb250YWN0czooKT0+e1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWxpc3RcIikuaW5uZXJIVE1MPVwiXCJcclxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuXHJcbiAgICB1c2VyTWFuYWdlci5nZXRTaW5nbGVVc2VyKFwiaWRcIiwgdXNlcklkKVxyXG4gICAgLnRoZW4oKHVzZXIpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnZXQgc2luZ2xlIHVzZXJcIiwgdXNlcilcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtbGlzdFwiKS5pbm5lckhUTUw9YDxoMT4ke3VzZXJbMF0uZmlyc3ROYW1lfSAke3VzZXJbMF0ubGFzdE5hbWV9J3MgQ29udGFjdHM8L2gxPmBcclxuICAgIH0pXHJcbiAgICBjb250YWN0TWFuYWdlci5nZXRVc2VyQ29udGFjdHModXNlcklkKVxyXG4gICAgLnRoZW4oKHBhcnNlZENvbnRhY3RzKT0+e1xyXG4gICAgY29uc29sZS5sb2cocGFyc2VkQ29udGFjdHMpXHJcblxyXG4gICAgcGFyc2VkQ29udGFjdHMuZm9yRWFjaChzaW5nbGVDb250YWN0T2JqZWN0PT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RIVE1MU3RyaW5nID0gY29udGFjdEJ1aWxkZXIuYnVpbGRDb250YWN0KHNpbmdsZUNvbnRhY3RPYmplY3QpXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWxpc3RcIikuaW5uZXJIVE1MKz1jb250YWN0QnVpbGRlci5idWlsZENvbnRhY3Qoc2luZ2xlQ29udGFjdE9iamVjdClcclxuXHJcbiAgICB9KVxyXG5cclxuICAgIH0pXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByaW50Q29udGFjdHM7IiwiaW1wb3J0IHVzZXJGb3JtcyBmcm9tIFwiLi91c2VyRm9ybXMuanNcIlxyXG5pbXBvcnQgY29udGFjdEZvcm1zIGZyb20gXCIuL2NvbnRhY3RGb3JtLmpzXCJcclxuaW1wb3J0IHByaW50Q29udGFjdHMgZnJvbSBcIi4vY29udGFjdExpc3QuanNcIlxyXG5cclxuXHJcbmNvbnN0IGxvZ2luTWFuYWdlciA9e1xyXG5cclxuICAgIHZlcmlmeVBhc3N3b3JkOiAodXNlciwgcGFzc3dvcmQpPT57XHJcbiAgICAgICAgaWYocGFzc3dvcmQ9PT11c2VyWzBdLnBhc3N3b3JkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwYXNzd29yZCBtYXRjaGVkXCIpXHJcbiAgICAgICAgICAgIHVzZXJGb3Jtcy5tYWtlTG9nb3V0Rm9ybSgpO1xyXG4gICAgICAgICAgICB1c2VyRm9ybXMucmVtb3ZlUmVnaXN0ZXJGb3JtKCk7XHJcbiAgICAgICAgICAgIGNvbnRhY3RGb3Jtcy5tYWtlQ29udGFjdEZvcm0oKTtcclxuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInVzZXJJZFwiLCB1c2VyWzBdLmlkKVxyXG4gICAgICAgICAgICBwcmludENvbnRhY3RzLnByaW50VXNlckNvbnRhY3RzKHVzZXJbMF0uaWQpXHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXIgbG9nZ2VkIGluXCIsIHVzZXJbMF0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGFzc3dvcmQgZGlkIG5vdCBtYXRjaFwiKVxyXG4gICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJQYXNzd29yZCBpcyBpbmNvcnJlY3QhISAgVHJ5IGFnYWluXCIpXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbmZpcm1QYXNzd29yZDogKHBhc3N3b3JkKT0+e1xyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHZlcmlmeVVzZXJOYW1lOiAodXNlciwgdXNlck5hbWUpPT57XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsb2dpbk1hbmFnZXI7XHJcbiIsImltcG9ydCBjb250YWN0Rm9ybXMgZnJvbSBcIi4vY29udGFjdEZvcm1cIlxyXG5pbXBvcnQgcHJpbnRDb250YWN0cyBmcm9tIFwiLi9jb250YWN0TGlzdC5qc1wiXHJcbmltcG9ydCBjb250YWN0TWFuYWdlciBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvbi5qc1wiXHJcbmltcG9ydCBjb250YWN0QnVpbGRlciBmcm9tIFwiLi9jb250YWN0LmpzXCJcclxuaW1wb3J0IHVzZXJGb3JtcyBmcm9tIFwiLi91c2VyRm9ybXMuanNcIjtcclxuaW1wb3J0IHVzZXJNYW5hZ2VyIGZyb20gXCIuL3VzZXJDb2xsZWN0aW9uLmpzXCJcclxuaW1wb3J0IHVzZXJCdWlsZGVyIGZyb20gXCIuL3VzZXIuanNcIlxyXG5pbXBvcnQgbG9naW5NYW5hZ2VyIGZyb20gXCIuL2xvZ2luTWFuYWdlci5qc1wiXHJcblxyXG4vLyBwcmludENvbnRhY3RzLnByaW50QWxsQ29udGFjdHMoKTtcclxuXHJcbnVzZXJGb3Jtcy5tYWtlUmVnaXN0ZXJGb3JtKCk7XHJcbnVzZXJGb3Jtcy5tYWtlTG9naW5Gb3JtKCk7XHJcblxyXG4vL0FkZCBldmVudCBsaXN0ZW5lciBvbiB0aGUgY29udGFjdCBidXR0b24gdG8gc2F2ZSBhIGNvbnRhY3QgYW5kIHBvc3QgdG8gSlNPTlxyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtLWNvbnRhaW5lclwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwic3VibWl0LWJ0blwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaXJzdC1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFzdC1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBhZGRyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGRyZXNzXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwaG9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGhvbmUtbnVtYmVyXCIpLnZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFjdE9iamVjdCA9IGNvbnRhY3RCdWlsZGVyLmJ1aWxkQ29udGFjdE9iamVjdChmaXJzdE5hbWUsIGxhc3ROYW1lLCBwaG9uZSwgYWRkcmVzcylcclxuXHJcbiAgICAgICAgICAgICAgICBjb250YWN0TWFuYWdlci5hZGRDb250YWN0KGNvbnRhY3RPYmplY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHByaW50Q29udGFjdHMucHJpbnRVc2VyQ29udGFjdHMpXHJcbiAgICAgICAgfVxyXG59KVxyXG4vL0FkZCBldmVudCBsaXN0ZW5lciBvbiB0aGUgcmVnaXN0ZXIgYnV0dG9uIHRvIHJlZ2lzdGVyIGEgbmV3IHVzZXJcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXItYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGZpcnN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1maXJzdC1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgY29uc3QgbGFzdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXItbGFzdC1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgY29uc3QgdXNlck5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXItbmFtZVwiKS52YWx1ZVxyXG4gICAgICAgIGNvbnN0IHBhc3N3b3JkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyLXBhc3N3b3JkXCIpLnZhbHVlXHJcbiAgICAgICAgdXNlck1hbmFnZXIuZ2V0U2luZ2xlVXNlcihcInVzZXJOYW1lXCIsIHVzZXJOYW1lKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHNpbmdsZVVzZXIpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaW5nbGVVc2VyLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy9CdWlsZCBhbiBvYmplY3QgdG8gcmVwcmVzZW50IHRoZSB1c2VyXHJcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VyT2JqZWN0ID0gdXNlckJ1aWxkZXIuYnVpbGRVc2VyT2JqZWN0KGZpcnN0TmFtZSwgbGFzdE5hbWUsIHVzZXJOYW1lLCBwYXNzd29yZClcclxuICAgICAgICAgICAgICAgIC8vTWFrZSBBUEkgY2FsbCBhbmQgYWRkIHVzZXIgdG8gZGF0YWJhc2VcclxuICAgICAgICAgICAgICAgIHVzZXJNYW5hZ2VyLmFkZFVzZXIodXNlck9iamVjdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odXNlciA9PiB1c2VyLmpzb24oKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHVzZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBqdXN0IGFkZGVkIGEgdXNlciFcIiwgdXNlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwidXNlcklkXCIsIHVzZXIuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdEZvcm1zLm1ha2VDb250YWN0Rm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJGb3Jtcy5tYWtlTG9nb3V0Rm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdC1saXN0XCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyRm9ybXMucmVtb3ZlUmVnaXN0ZXJGb3JtKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0lmIHVzZXJuYW1lIGlzIGFscmVhZHkgaW4gdGhlIGRhdGFiYXNlLCB3aW5kb3cgYWxlcnQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChcIlRoZSB1c2VybmFtZSBoYXMgYWxyZWFkeSBiZWVuIGFzc2lnbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG59KVxyXG5cclxuLy9hZGQgZXZlbnQgbGlzdGVuZXIgb24gdGhlIGxvZ2luIGJ1dHRvbiB0byBsb2cgaW4gYSB1c2VyIGFuZCBzdG9yZSB0aGVpciB1c2VySUQgaW4gdGhlIHNlc3Npb25cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1jb250YWluZXJcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcImxvZ2luLWJ0blwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1sb2dpbi1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXNzd29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1sb2dpbi1wYXNzd29yZFwiKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codXNlck1hbmFnZXIuZ2V0U2luZ2xlVXNlcihcInVzZXJOYW1lXCIsIHVzZXJOYW1lKSlcclxuICAgICAgICAgICAgICAgIC8vQ2hlY2sgdG8gc2VlIGlmIHVzZXIgZXhpc3RzIGluIHRoZSBkYXRhYmFzZVxyXG4gICAgICAgICAgICAgICAgdXNlck1hbmFnZXIuZ2V0U2luZ2xlVXNlcihcInVzZXJOYW1lXCIsIHVzZXJOYW1lKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHNpbmdsZVVzZXIpPT57XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2luZ2xlVXNlci5sZW5ndGg9PT0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIHVzZXJuYW1lIG9mXCIsIHVzZXJOYW1lLCBcIndhcyB2ZXJpZmllZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0lmIHVzZXJuYW1lIGV4aXN0cywgbW92ZSBvbiB0byB2ZXJpZnlpbmcgdGhlIHBhc3N3b3JkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2luTWFuYWdlci52ZXJpZnlQYXNzd29yZChzaW5nbGVVc2VyLCBwYXNzd29yZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0lmIHVzZXJuYW1lIGRvZXMgbm90IGV4aXN0LCBnaXZlIGFsZXJ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChcInRoYXQgdXNlcm5hbWUgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGRhdGFiYXNlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG59KVxyXG5cclxuLy9hZGQgZXZlbnQgbGlzdGVuZXIgb24gdGhlIGxvZ291dCBidXR0b24gdG8gcmVtb3ZlIGEgdXNlcklEIGZyb20gc2Vzc2lvbiBzdG9yYWdlIGFuZCBjbGVhciBjb250YWN0c1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRhaW5lclwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwibG9nb3V0LWJ0blwiKSB7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcihcInVzZXJJZFwiKVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyIGlkIGNsZWFyZWRcIilcclxuICAgICAgICAgICAgICAgIHVzZXJGb3Jtcy5tYWtlUmVnaXN0ZXJGb3JtKClcclxuICAgICAgICAgICAgICAgIHVzZXJGb3Jtcy5tYWtlTG9naW5Gb3JtKClcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdC1saXN0XCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1jb250YWluZXJcIikuaW5uZXJIVE1MID0gXCJcIlxyXG5cclxuICAgICAgICB9XHJcbn0pXHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwiLy9jcmVhdGVzIEhUTUwgc3RyaW5nIGZvciBhIHNpbmdsZSBlbXBsb3llZSwgb3IgYW4gb2JqZWN0IHdoZW4gdGhlcmUgaXMgYSBuZXcgaW5wdXRmcm9tIHRoZSBmb3JtXHJcblxyXG5cclxuY29uc3QgdXNlckJ1aWxkZXIgPXtcclxuICAgIGJ1aWxkVXNlcjogKHNpbmdsZVVzZXIpID0+e1xyXG5cclxuICAgICAgICByZXR1cm4gYDxkaXY+XHJcbiAgICAgICAgPGgzPiR7c2luZ2xlVXNlci5maXJzdE5hbWV9ICR7c2luZ2xlVXNlci5sYXN0TmFtZX08L2gzPlxyXG4gICAgICAgIDxwPiR7c2luZ2xlVXNlci51c2VyTmFtZX08L3A+XHJcbiAgICAgICAgPHA+JHtzaW5nbGVVc2VyLnBhc3N3b3JkfTwvcD5cclxuICAgICAgICA8L2Rpdj5gXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBidWlsZFVzZXJPYmplY3Q6IChmaXJzdE5hbWUsIGxhc3ROYW1lLCB1c2VyTmFtZSwgcGFzc3dvcmQpID0+IHtcclxuICAgICAgICBjb25zdCB1c2VyT2JqZWN0ID0ge1xyXG5cclxuICAgICAgICAgICAgZmlyc3ROYW1lOiBmaXJzdE5hbWUsXHJcbiAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZSxcclxuICAgICAgICAgICAgdXNlck5hbWU6IHVzZXJOYW1lLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB1c2VyT2JqZWN0O1xyXG4gICAgfVxyXG5cclxufVxyXG5leHBvcnQgZGVmYXVsdCB1c2VyQnVpbGRlcjsiLCIvLyBUaGlzIG1vZHVsZSB3aWxsIG1hbmFnZSB0aGUgdXNlciBkYXRhYmFzZVxyXG5cclxuY29uc3QgdXNlck1hbmFnZXIgPSB7XHJcbiAgICBnZXRBbGxVc2VyczogKCkgPT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIilcclxuICAgICAgICAgICAgLnRoZW4odXNlcnMgPT4gdXNlcnMuanNvbigpKVxyXG4gICAgfSxcclxuICAgIGFkZFVzZXI6ICh1c2VyT2JqZWN0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXNlck9iamVjdClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGdldFNpbmdsZVVzZXI6KHVzZXJLZXksIHVzZXJWYWx1ZSk9PntcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vycz8ke3VzZXJLZXl9PSR7dXNlclZhbHVlfWApXHJcbiAgICAgICAgICAgIC50aGVuKHVzZXJzID0+IHVzZXJzLmpzb24oKSlcclxuICAgIH0sXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXNlck1hbmFnZXI7IiwiY29uc3QgdXNlckZvcm1zID0ge1xyXG5cclxuICAgIG1ha2VSZWdpc3RlckZvcm06ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyLWNvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBgPGZpZWxkc2V0PjxsZWdlbmQ+UmVnaXN0ZXI8L2xlZ2VuZD5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidXNlckZpcnN0TmFtZVwiIGlkPVwidXNlci1maXJzdC1uYW1lXCIgcGxhY2Vob2xkZXI9XCJGaXJzdCBOYW1lXCI+PC9pbnB1dD4gPGJyPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ1c2VyTGFzdE5hbWVcIiBpZD1cInVzZXItbGFzdC1uYW1lXCIgcGxhY2Vob2xkZXI9XCJMYXN0IE5hbWVcIj48YnI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInVzZXJOYW1lXCIgaWQ9XCJ1c2VyLW5hbWVcIiBwbGFjZWhvbGRlcj1cIkVudGVyIFVzZXJuYW1lXCI+PGJyPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIiBpZD1cInVzZXItcGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIkVudGVyIFBhc3N3b3JkXCI+PGJyPlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cInJlZ2lzdGVyXCIgaWQ9XCJyZWdpc3Rlci1idG5cIj5yZWdpc3RlcjwvYnV0dG9uPjwvZmllbGRzZXQ+YFxyXG4gICAgfSxcclxuICAgIG1ha2VMb2dpbkZvcm06ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBgPGZpZWxkc2V0PjxsZWdlbmQ+TG9naW48L2xlZ2VuZD5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidXNlck5hbWVcIiBpZD1cInVzZXItbG9naW4tbmFtZVwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgVXNlcm5hbWVcIj48YnI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIGlkPVwidXNlci1sb2dpbi1wYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgUGFzc3dvcmRcIj48YnI+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgaWQ9XCJsb2dpbi1idG5cIj5sb2dpbjwvYnV0dG9uPlxyXG4gICAgICAgIDwvZmllbGRzZXQ+YFxyXG4gICAgfSxcclxuICAgIG1ha2VMb2dvdXRGb3JtOiAoKSA9PiB7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tY29udGFpbmVyXCIpLmlubmVySFRNTCA9IGA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBpZD1cImxvZ291dC1idG5cIj5sb2dvdXQ8L2J1dHRvbj5gXHJcblxyXG4gICAgfSxcclxuICAgIHJlbW92ZVJlZ2lzdGVyRm9ybTooKT0+e1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXItY29udGFpbmVyXCIpLmlubmVySFRNTD1cIlwiXHJcbiAgICB9XHJcblxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHVzZXJGb3JtcztcclxuXHJcbiJdfQ==
