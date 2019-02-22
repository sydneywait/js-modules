(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//creates HTML string for a single employee, or an object when there is a new inputfrom the form
const contactBuilder = {
  buildContact: singleContact => {
    const userId = sessionStorage.getItem("userId");
    return `<div id="user-${userId}-contact-${singleContact.id}">
        <h3>${singleContact.firstName} ${singleContact.lastName}</h3>
        <p>${singleContact.phoneNumber}</p>
        <p>${singleContact.address}</p>
        <button type = "submit" id ="edit-contact-${singleContact.id}">edit</button>
        <button type = "submit" id ="delete-contact-${singleContact.id}" >delete</button>
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
  getSingleContact: contactId => {
    return fetch(`http://localhost:8088/contacts/${contactId}`).then(contacts => contacts.json());
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
  },
  deleteContact: id => {
    return fetch(`http://localhost:8088/contacts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  editSingleContact: (contactObject, id) => {
    return fetch(`http://localhost:8088/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactObject)
    });
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
  },
  removeContactList: () => {
    document.querySelector("#contact-list").innerHTML = "";
  },
  makeEditContactForm: (userId, contactId, singleContact) => {
    document.querySelector(`#user-${userId}-contact-${contactId}`).innerHTML = `<legend>Edit Your Contact</legend>
        <input type="text" name = "firstName" id="edit-first-name" value="${singleContact.firstName}"><br>
        <input type="text" name="lastName" id="edit-last-name" value="${singleContact.lastName}"><br>
        <input type="text" name ="phoneNumber", id="edit-phone-number" value="${singleContact.phoneNumber}"><br>
        <input type="text" name="address" id="edit-address" value="${singleContact.address}"><br>
        <button type = "submit", id="submit-edit-${contactId}">Submit</button>
        <button type = "submit", id="cancel-edit-${contactId}">Cancel</button>`;
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
  confirmPassword: (password1, password2) => {
    if (password1 === password2) {
      singleId = sessionStorage.getItem("userId");
      userManager.updatePassword(password1, singleId);
    }
  },
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

document.querySelector("#register-container").addEventListener("click", () => {
  if (event.target.id === "register-btn") {
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
  }
}); //Event listener on the login container

document.querySelector("#login-container").addEventListener("click", () => {
  //add event listener on the login button to log in a user and store their userID in the session
  if (event.target.id === "show-register-btn") {
    _userForms.default.makeRegisterForm();

    _userForms.default.removeLoginForm();
  }

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
  } //event listener on the logout button to remove a userID from session storage and clear contacts


  if (event.target.id === "logout-btn") {
    sessionStorage.clear("userId");
    console.log("user id cleared");

    _userForms.default.makeLoginForm();

    _contactForm.default.removeContactList();

    _contactForm.default.removeContactForm();
  }

  if (event.target.id === "update-btn") {
    let userId = sessionStorage.getItem("userId");
    console.log("you clicked the update button");

    _userCollection.default.getSingleUser("id", userId).then(singleUser => {
      console.log("single user inside update", singleUser);

      _userForms.default.makePasswordChangeForm(singleUser[0].userName);

      _contactForm.default.removeContactForm();

      _contactForm.default.removeContactList();
    });
  }

  if (event.target.id === "change-password-btn") {
    console.log("you clicked the button to change your password");
    const userId = sessionStorage.getItem("userId");
    const password1 = document.querySelector("#user-change-password1").value;
    const password2 = document.querySelector("#user-change-password2").value;

    if (password1 === password2) {
      const patchObject = {
        password: password1
      };

      _userCollection.default.updatePassword(patchObject, userId);

      window.alert("Your password was successfully changed");

      _userForms.default.makeLogoutForm();

      _contactForm.default.makeContactForm();

      _contactList.default.printUserContacts(userId);
    } else {
      window.alert("The passwords do not match");
    }
  }
});
document.querySelector("#contact-list").addEventListener("click", () => {
  const target = event.target.id.split("-");
  const userId = sessionStorage.getItem("userId");

  if (target[0] === "delete") {
    const contactId = target[2];
    console.log("you clicked the", target, "button");

    _contactCollection.default.deleteContact(contactId).then(_contactList.default.printUserContacts);
  }

  if (target[0] === "edit") {
    const contactId = target[2];
    console.log("you clicked the", target, "button");

    _contactCollection.default.getSingleContact(contactId).then(singleContact => {
      _contactForm.default.makeEditContactForm(userId, contactId, singleContact);
    });
  }

  if (target[0] === "submit") {
    const contactId = target[2];
    console.log("you clicked the", target, "button");
    const firstName = document.querySelector("#edit-first-name").value;
    const lastName = document.querySelector("#edit-last-name").value;
    const phone = document.querySelector("#edit-phone-number").value;
    const address = document.querySelector("#edit-address").value;

    const contactObject = _contact.default.buildContactObject(firstName, lastName, phone, address);

    _contactCollection.default.editSingleContact(contactObject, contactId).then(_contactList.default.printUserContacts);
  }

  if (target[0] === "cancel") {
    console.log("you clicked the", target, "button");

    _contactList.default.printUserContacts();
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
  },
  updatePassword: (patchObject, id) => {
    return fetch(`http://localhost:8088/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(patchObject)
    });
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
        <button type="submit" id="show-register-btn">Register</button>
        </fieldset>`;
  },
  removeLoginForm: () => {
    document.querySelector("#login-container").innerHTML = "";
  },
  makeLogoutForm: () => {
    document.querySelector("#login-container").innerHTML = `<button type="submit" id="logout-btn">logout</button>
        <button type="submit" id="update-btn">Change Password</button>`;
  },
  removeRegisterForm: () => {
    document.querySelector("#register-container").innerHTML = "";
  },
  makePasswordChangeForm: userName => {
    document.querySelector("#login-container").innerHTML = `<fieldset><legend>Change Your Password</legend>
        <input type="text" name="userName" id="user-change-name" value="${userName}"><br>
        <input type="text" name="password" id="user-change-password1" placeholder="Enter Password"><br>
        <input type="text" name="password" id="user-change-password2" placeholder="Enter Password Again"><br>
        <button type="submit" id="change-password-btn">submit</button>
        </fieldset>`;
  }
};
var _default = userForms;
exports.default = _default;

},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL2xvZ2luTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvdXNlci5qcyIsIi4uL3NjcmlwdHMvdXNlckNvbGxlY3Rpb24uanMiLCIuLi9zY3JpcHRzL3VzZXJGb3Jtcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBR0EsTUFBTSxjQUFjLEdBQUU7QUFDbEIsRUFBQSxZQUFZLEVBQUcsYUFBRCxJQUFrQjtBQUM1QixVQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QixDQUFmO0FBQ0EsV0FBUSxpQkFBZ0IsTUFBTyxZQUFXLGFBQWEsQ0FBQyxFQUFHO2NBQ3JELGFBQWEsQ0FBQyxTQUFVLElBQUcsYUFBYSxDQUFDLFFBQVM7YUFDbkQsYUFBYSxDQUFDLFdBQVk7YUFDMUIsYUFBYSxDQUFDLE9BQVE7b0RBQ2lCLGFBQWEsQ0FBQyxFQUFHO3NEQUNmLGFBQWEsQ0FBQyxFQUFHO2VBTC9EO0FBUUgsR0FYaUI7QUFhbEIsRUFBQSxrQkFBa0IsRUFBRSxDQUFDLFNBQUQsRUFBWSxRQUFaLEVBQXNCLEtBQXRCLEVBQTZCLE9BQTdCLEtBQXlDO0FBQ3pELFVBQU0sYUFBYSxHQUFHO0FBRWxCLE1BQUEsU0FBUyxFQUFFLFNBRk87QUFHbEIsTUFBQSxRQUFRLEVBQUUsUUFIUTtBQUlsQixNQUFBLFdBQVcsRUFBRSxLQUpLO0FBS2xCLE1BQUEsT0FBTyxFQUFFLE9BTFM7QUFNbEIsTUFBQSxNQUFNLEVBQUUsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7QUFOVSxLQUF0QjtBQVNBLFdBQU8sYUFBUDtBQUNIO0FBeEJpQixDQUF0QjtlQTJCZSxjOzs7Ozs7Ozs7O0FDOUJmO0FBRUEsTUFBTSxjQUFjLEdBQUc7QUFDbkIsRUFBQSxjQUFjLEVBQUUsTUFBTTtBQUVsQixXQUFPLEtBQUssQ0FBQyxnQ0FBRCxDQUFMLENBQ0YsSUFERSxDQUNHLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURmLENBQVA7QUFFSCxHQUxrQjtBQU1uQixFQUFBLGdCQUFnQixFQUFHLFNBQUQsSUFBZTtBQUU3QixXQUFPLEtBQUssQ0FBRSxrQ0FBaUMsU0FBVSxFQUE3QyxDQUFMLENBQ0YsSUFERSxDQUNHLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURmLENBQVA7QUFFSCxHQVZrQjtBQVluQixFQUFBLFVBQVUsRUFBRyxhQUFELElBQW1CO0FBQzNCLFdBQU8sS0FBSyxDQUFDLGdDQUFELEVBQW1DO0FBQzNDLE1BQUEsTUFBTSxFQUFFLE1BRG1DO0FBRTNDLE1BQUEsT0FBTyxFQUFFO0FBQ0wsd0JBQWdCO0FBRFgsT0FGa0M7QUFLM0MsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxhQUFmO0FBTHFDLEtBQW5DLENBQVo7QUFPSCxHQXBCa0I7QUFzQm5CLEVBQUEsZUFBZSxFQUFHLE1BQUQsSUFBWTtBQUN6QixXQUFPLEtBQUssQ0FBRSx5Q0FBd0MsTUFBTyxFQUFqRCxDQUFMLENBQ0YsSUFERSxDQUNHLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURmLENBQVA7QUFFSCxHQXpCa0I7QUEyQm5CLEVBQUEsYUFBYSxFQUFHLEVBQUQsSUFBTTtBQUNqQixXQUFPLEtBQUssQ0FBRSxrQ0FBaUMsRUFBRyxFQUF0QyxFQUF5QztBQUNqRCxNQUFBLE1BQU0sRUFBRSxRQUR5QztBQUVqRCxNQUFBLE9BQU8sRUFBRTtBQUNMLHdCQUFnQjtBQURYO0FBRndDLEtBQXpDLENBQVo7QUFPSCxHQW5Da0I7QUFxQ25CLEVBQUEsaUJBQWlCLEVBQUUsQ0FBQyxhQUFELEVBQWdCLEVBQWhCLEtBQXFCO0FBQ3BDLFdBQU8sS0FBSyxDQUFFLGtDQUFpQyxFQUFHLEVBQXRDLEVBQXlDO0FBQ2pELE1BQUEsTUFBTSxFQUFFLEtBRHlDO0FBRWpELE1BQUEsT0FBTyxFQUFFO0FBQ0wsd0JBQWdCO0FBRFgsT0FGd0M7QUFLakQsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxhQUFmO0FBTDJDLEtBQXpDLENBQVo7QUFPSDtBQTdDa0IsQ0FBdkI7ZUFpRGUsYzs7Ozs7Ozs7OztBQ25EZixNQUFNLFlBQVksR0FBRztBQUVqQixFQUFBLGVBQWUsRUFBRSxNQUFNO0FBQ25CLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsaUJBQXZCLEVBQTBDLFNBQTFDLEdBQXVEOzs7Ozs7aUVBQXZEO0FBUUgsR0FYZ0I7QUFhakIsRUFBQSxpQkFBaUIsRUFBRSxNQUFNO0FBQ3JCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsaUJBQXZCLEVBQTBDLFNBQTFDLEdBQXNELEVBQXREO0FBQ0gsR0FmZ0I7QUFnQmpCLEVBQUEsaUJBQWlCLEVBQUUsTUFBSTtBQUNuQixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLFNBQXhDLEdBQW9ELEVBQXBEO0FBQ0gsR0FsQmdCO0FBbUJqQixFQUFBLG1CQUFtQixFQUFDLENBQUMsTUFBRCxFQUFTLFNBQVQsRUFBb0IsYUFBcEIsS0FBb0M7QUFDcEQsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF3QixTQUFRLE1BQU8sWUFBVyxTQUFVLEVBQTVELEVBQStELFNBQS9ELEdBQ0M7NEVBQ21FLGFBQWEsQ0FBQyxTQUFVO3dFQUM1QixhQUFhLENBQUMsUUFBUztnRkFDZixhQUFhLENBQUMsV0FBWTtxRUFDckMsYUFBYSxDQUFDLE9BQVE7bURBQ3hDLFNBQVU7bURBQ1YsU0FBVSxtQkFQckQ7QUFVSDtBQTlCZ0IsQ0FBckI7ZUFnQ2UsWTs7Ozs7Ozs7Ozs7QUM3QmY7O0FBQ0E7O0FBQ0E7Ozs7QUFMQTtBQUNBO0FBTUEsTUFBTSxhQUFhLEdBQUc7QUFFdEIsRUFBQSxnQkFBZ0IsRUFBQyxNQUFJO0FBQ3JCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZUFBdkIsRUFBd0MsU0FBeEMsR0FBa0QsRUFBbEQ7O0FBRUEsK0JBQWUsY0FBZixHQUNDLElBREQsQ0FDTyxjQUFELElBQWtCO0FBQ3hCLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxjQUFaO0FBQ0EsTUFBQSxjQUFjLENBQUMsT0FBZixDQUF1QixtQkFBbUIsSUFBRztBQUN6QyxjQUFNLGlCQUFpQixHQUFHLGlCQUFlLFlBQWYsQ0FBNEIsbUJBQTVCLENBQTFCOztBQUNBLFFBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZUFBdkIsRUFBd0MsU0FBeEMsSUFBbUQsaUJBQWUsWUFBZixDQUE0QixtQkFBNUIsQ0FBbkQ7QUFFSCxPQUpEO0FBTUMsS0FURDtBQVVDLEdBZnFCO0FBZ0J0QixFQUFBLGlCQUFpQixFQUFDLE1BQUk7QUFDbEIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixlQUF2QixFQUF3QyxTQUF4QyxHQUFrRCxFQUFsRDtBQUNBLFVBQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLENBQWY7O0FBRUEsNEJBQVksYUFBWixDQUEwQixJQUExQixFQUFnQyxNQUFoQyxFQUNDLElBREQsQ0FDTyxJQUFELElBQVE7QUFDVixNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksaUJBQVosRUFBK0IsSUFBL0I7QUFDQSxNQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLFNBQXhDLEdBQW1ELE9BQU0sSUFBSSxDQUFDLENBQUQsQ0FBSixDQUFRLFNBQVUsSUFBRyxJQUFJLENBQUMsQ0FBRCxDQUFKLENBQVEsUUFBUyxrQkFBL0Y7QUFDSCxLQUpEOztBQUtBLCtCQUFlLGVBQWYsQ0FBK0IsTUFBL0IsRUFDQyxJQURELENBQ08sY0FBRCxJQUFrQjtBQUN4QixNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksY0FBWjtBQUVBLE1BQUEsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsbUJBQW1CLElBQUc7QUFDekMsY0FBTSxpQkFBaUIsR0FBRyxpQkFBZSxZQUFmLENBQTRCLG1CQUE1QixDQUExQjs7QUFDQSxRQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLFNBQXhDLElBQW1ELGlCQUFlLFlBQWYsQ0FBNEIsbUJBQTVCLENBQW5EO0FBRUgsT0FKRDtBQU1DLEtBVkQ7QUFXQztBQXBDaUIsQ0FBdEI7ZUEwQ2UsYTs7Ozs7Ozs7Ozs7QUNqRGY7O0FBQ0E7O0FBQ0E7Ozs7QUFHQSxNQUFNLFlBQVksR0FBRTtBQUVoQixFQUFBLGNBQWMsRUFBRSxDQUFDLElBQUQsRUFBTyxRQUFQLEtBQWtCO0FBQzlCLFFBQUcsUUFBUSxLQUFHLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUSxRQUF0QixFQUNBO0FBQ0ksTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGtCQUFaOztBQUNBLHlCQUFVLGNBQVY7O0FBQ0EseUJBQVUsa0JBQVY7O0FBQ0EsMkJBQWEsZUFBYjs7QUFDQSxNQUFBLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLEVBQWlDLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUSxFQUF6Qzs7QUFDQSwyQkFBYyxpQkFBZCxDQUFnQyxJQUFJLENBQUMsQ0FBRCxDQUFKLENBQVEsRUFBeEM7O0FBRUEsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGdCQUFaLEVBQThCLElBQUksQ0FBQyxDQUFELENBQWxDO0FBQ0gsS0FWRCxNQVdJO0FBQ0EsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLHdCQUFaO0FBQ0EsTUFBQSxNQUFNLENBQUMsS0FBUCxDQUFhLG9DQUFiO0FBQ0g7QUFHSixHQXBCZTtBQXNCaEIsRUFBQSxlQUFlLEVBQUUsQ0FBQyxTQUFELEVBQVksU0FBWixLQUF3QjtBQUNyQyxRQUFHLFNBQVMsS0FBRyxTQUFmLEVBQXlCO0FBQ3JCLE1BQUEsUUFBUSxHQUFDLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLENBQVQ7QUFDSixNQUFBLFdBQVcsQ0FBQyxjQUFaLENBQTJCLFNBQTNCLEVBQXNDLFFBQXRDO0FBQ0M7QUFHSixHQTdCZTtBQStCaEIsRUFBQSxjQUFjLEVBQUUsQ0FBQyxJQUFELEVBQU8sUUFBUCxLQUFrQixDQUdqQztBQWxDZSxDQUFwQjtlQXVDZSxZOzs7Ozs7QUM1Q2Y7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTtBQUdBLG1CQUFVLGFBQVYsRyxDQUVBOzs7QUFFQSxRQUFRLENBQUMsYUFBVCxDQUF1QixpQkFBdkIsRUFBMEMsZ0JBQTFDLENBQTJELE9BQTNELEVBQW9FLE1BQU07QUFDbEUsTUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsS0FBb0IsWUFBeEIsRUFBc0M7QUFFOUIsVUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsS0FBeEQ7QUFDQSxVQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixZQUF2QixFQUFxQyxLQUF0RDtBQUNBLFVBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFVBQXZCLEVBQW1DLEtBQW5EO0FBQ0EsVUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZUFBdkIsRUFBd0MsS0FBdEQ7O0FBRUEsVUFBTSxhQUFhLEdBQUcsaUJBQWUsa0JBQWYsQ0FBa0MsU0FBbEMsRUFBNkMsUUFBN0MsRUFBdUQsS0FBdkQsRUFBOEQsT0FBOUQsQ0FBdEI7O0FBRUEsK0JBQWUsVUFBZixDQUEwQixhQUExQixFQUNTLElBRFQsQ0FDYyxxQkFBYyxpQkFENUI7QUFFUDtBQUNSLENBYkQsRSxDQWNBOztBQUNBLFFBQVEsQ0FBQyxhQUFULENBQXVCLHFCQUF2QixFQUE4QyxnQkFBOUMsQ0FBK0QsT0FBL0QsRUFBd0UsTUFBTTtBQUN0RSxNQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixLQUFvQixjQUF4QixFQUF3QztBQUVoQyxVQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixrQkFBdkIsRUFBMkMsS0FBN0Q7QUFDQSxVQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixpQkFBdkIsRUFBMEMsS0FBM0Q7QUFDQSxVQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixZQUF2QixFQUFxQyxLQUF0RDtBQUNBLFVBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGdCQUF2QixFQUF5QyxLQUExRDs7QUFDQSw0QkFBWSxhQUFaLENBQTBCLFVBQTFCLEVBQXNDLFFBQXRDLEVBQ1MsSUFEVCxDQUNlLFVBQUQsSUFBZ0I7QUFDZCxVQUFJLFVBQVUsQ0FBQyxNQUFYLEtBQXNCLENBQTFCLEVBQTZCO0FBQ3JCO0FBQ0EsY0FBTSxVQUFVLEdBQUcsY0FBWSxlQUFaLENBQTRCLFNBQTVCLEVBQXVDLFFBQXZDLEVBQWlELFFBQWpELEVBQTJELFFBQTNELENBQW5CLENBRnFCLENBR3JCOzs7QUFDQSxnQ0FBWSxPQUFaLENBQW9CLFVBQXBCLEVBQ1MsSUFEVCxDQUNjLElBQUksSUFBSSxJQUFJLENBQUMsSUFBTCxFQUR0QixFQUVTLElBRlQsQ0FFZSxJQUFELElBQVU7QUFDUixVQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksd0JBQVosRUFBc0MsSUFBdEM7QUFDQSxVQUFBLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLEVBQWlDLElBQUksQ0FBQyxFQUF0Qzs7QUFDQSwrQkFBYSxlQUFiOztBQUNBLDZCQUFVLGNBQVY7O0FBQ0EsVUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixlQUF2QixFQUF3QyxTQUF4QyxHQUFvRCxFQUFwRDs7QUFDQSw2QkFBVSxrQkFBVjtBQUNQLFNBVFQ7QUFVUCxPQWRELENBZUE7QUFmQSxXQWdCSztBQUNHLFVBQUEsTUFBTSxDQUFDLEtBQVAsQ0FBYSx3Q0FBYjtBQUNQO0FBQ1IsS0FyQlQ7QUF1QlA7QUFDUixDQS9CRCxFLENBZ0NBOztBQUNBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGtCQUF2QixFQUEyQyxnQkFBM0MsQ0FBNEQsT0FBNUQsRUFBcUUsTUFBTTtBQUNuRTtBQUNBLE1BQUksS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiLEtBQW9CLG1CQUF4QixFQUE2QztBQUNyQyx1QkFBVSxnQkFBVjs7QUFDQSx1QkFBVSxlQUFWO0FBQ1A7O0FBRUQsTUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsS0FBb0IsV0FBeEIsRUFBcUM7QUFDN0IsVUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsa0JBQXZCLEVBQTJDLEtBQTVEO0FBQ0EsVUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsc0JBQXZCLEVBQStDLEtBQWhFO0FBQ0EsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLHdCQUFZLGFBQVosQ0FBMEIsVUFBMUIsRUFBc0MsUUFBdEMsQ0FBWixFQUg2QixDQUk3Qjs7QUFDQSw0QkFBWSxhQUFaLENBQTBCLFVBQTFCLEVBQXNDLFFBQXRDLEVBQ1MsSUFEVCxDQUNlLFVBQUQsSUFBZ0I7QUFFZCxVQUFJLFVBQVUsQ0FBQyxNQUFYLEtBQXNCLENBQTFCLEVBQTZCO0FBQ3JCLFFBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxpQkFBWixFQUErQixRQUEvQixFQUF5QyxjQUF6QyxFQURxQixDQUVyQjs7QUFDQSw4QkFBYSxjQUFiLENBQTRCLFVBQTVCLEVBQXdDLFFBQXhDO0FBRVAsT0FMRCxNQU1LO0FBQ0c7QUFDQSxRQUFBLE1BQU0sQ0FBQyxLQUFQLENBQWEsOENBQWI7QUFDUDtBQUNSLEtBYlQ7QUFjUCxHQTFCa0UsQ0EyQm5FOzs7QUFDQSxNQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixLQUFvQixZQUF4QixFQUFzQztBQUM5QixJQUFBLGNBQWMsQ0FBQyxLQUFmLENBQXFCLFFBQXJCO0FBQ0EsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGlCQUFaOztBQUNBLHVCQUFVLGFBQVY7O0FBQ0EseUJBQWEsaUJBQWI7O0FBQ0EseUJBQWEsaUJBQWI7QUFFUDs7QUFDRCxNQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixLQUFvQixZQUF4QixFQUFzQztBQUM5QixRQUFJLE1BQU0sR0FBRyxjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QixDQUFiO0FBQ0EsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLCtCQUFaOztBQUNBLDRCQUFZLGFBQVosQ0FBMEIsSUFBMUIsRUFBZ0MsTUFBaEMsRUFDUyxJQURULENBQ2UsVUFBRCxJQUFnQjtBQUNkLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSwyQkFBWixFQUF5QyxVQUF6Qzs7QUFDQSx5QkFBVSxzQkFBVixDQUFpQyxVQUFVLENBQUMsQ0FBRCxDQUFWLENBQWMsUUFBL0M7O0FBQ0EsMkJBQWEsaUJBQWI7O0FBQ0EsMkJBQWEsaUJBQWI7QUFDUCxLQU5UO0FBT1A7O0FBQ0QsTUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsS0FBb0IscUJBQXhCLEVBQStDO0FBQ3ZDLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxnREFBWjtBQUNBLFVBQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLENBQWY7QUFDQSxVQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1Qix3QkFBdkIsRUFBaUQsS0FBbkU7QUFDQSxVQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1Qix3QkFBdkIsRUFBaUQsS0FBbkU7O0FBQ0EsUUFBSSxTQUFTLEtBQUssU0FBbEIsRUFBNkI7QUFDckIsWUFBTSxXQUFXLEdBQUc7QUFDWixRQUFBLFFBQVEsRUFBRTtBQURFLE9BQXBCOztBQUlBLDhCQUFZLGNBQVosQ0FBMkIsV0FBM0IsRUFBd0MsTUFBeEM7O0FBQ0EsTUFBQSxNQUFNLENBQUMsS0FBUCxDQUFhLHdDQUFiOztBQUNBLHlCQUFVLGNBQVY7O0FBQ0EsMkJBQWEsZUFBYjs7QUFDQSwyQkFBYyxpQkFBZCxDQUFnQyxNQUFoQztBQUNQLEtBVkQsTUFXSztBQUNHLE1BQUEsTUFBTSxDQUFDLEtBQVAsQ0FBYSw0QkFBYjtBQUVQO0FBSVI7QUFFUixDQXhFRDtBQTBFQSxRQUFRLENBQUMsYUFBVCxDQUF1QixlQUF2QixFQUF3QyxnQkFBeEMsQ0FBeUQsT0FBekQsRUFBa0UsTUFBTTtBQUNoRSxRQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsQ0FBZ0IsS0FBaEIsQ0FBc0IsR0FBdEIsQ0FBZjtBQUNBLFFBQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLENBQWY7O0FBRUEsTUFBSSxNQUFNLENBQUMsQ0FBRCxDQUFOLEtBQWMsUUFBbEIsRUFBNEI7QUFDcEIsVUFBTSxTQUFTLEdBQUMsTUFBTSxDQUFDLENBQUQsQ0FBdEI7QUFDQSxJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksaUJBQVosRUFBK0IsTUFBL0IsRUFBdUMsUUFBdkM7O0FBQ0EsK0JBQWUsYUFBZixDQUE2QixTQUE3QixFQUNDLElBREQsQ0FDTyxxQkFBYyxpQkFEckI7QUFLUDs7QUFDRCxNQUFJLE1BQU0sQ0FBQyxDQUFELENBQU4sS0FBYyxNQUFsQixFQUF5QjtBQUNqQixVQUFNLFNBQVMsR0FBQyxNQUFNLENBQUMsQ0FBRCxDQUF0QjtBQUNBLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxpQkFBWixFQUErQixNQUEvQixFQUF1QyxRQUF2Qzs7QUFFQSwrQkFBZSxnQkFBZixDQUFnQyxTQUFoQyxFQUNDLElBREQsQ0FDTyxhQUFELElBQWlCO0FBRWYsMkJBQWEsbUJBQWIsQ0FBaUMsTUFBakMsRUFBeUMsU0FBekMsRUFBb0QsYUFBcEQ7QUFDUCxLQUpEO0FBTVA7O0FBQ0QsTUFBSSxNQUFNLENBQUMsQ0FBRCxDQUFOLEtBQWMsUUFBbEIsRUFBNEI7QUFDcEIsVUFBTSxTQUFTLEdBQUMsTUFBTSxDQUFDLENBQUQsQ0FBdEI7QUFDQSxJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksaUJBQVosRUFBK0IsTUFBL0IsRUFBdUMsUUFBdkM7QUFDQSxVQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixrQkFBdkIsRUFBMkMsS0FBN0Q7QUFDQSxVQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixpQkFBdkIsRUFBMEMsS0FBM0Q7QUFDQSxVQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixvQkFBdkIsRUFBNkMsS0FBM0Q7QUFDQSxVQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixlQUF2QixFQUF3QyxLQUF4RDs7QUFFQSxVQUFNLGFBQWEsR0FBQyxpQkFBZSxrQkFBZixDQUFrQyxTQUFsQyxFQUE2QyxRQUE3QyxFQUF1RCxLQUF2RCxFQUE4RCxPQUE5RCxDQUFwQjs7QUFFQSwrQkFBZSxpQkFBZixDQUFpQyxhQUFqQyxFQUFnRCxTQUFoRCxFQUNDLElBREQsQ0FDTSxxQkFBYyxpQkFEcEI7QUFHUDs7QUFDRCxNQUFJLE1BQU0sQ0FBQyxDQUFELENBQU4sS0FBYyxRQUFsQixFQUE0QjtBQUNwQixJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksaUJBQVosRUFBK0IsTUFBL0IsRUFBdUMsUUFBdkM7O0FBQ0EseUJBQWMsaUJBQWQ7QUFDQztBQUloQixDQTdDRDs7Ozs7Ozs7O0FDMUlBO0FBR0EsTUFBTSxXQUFXLEdBQUU7QUFDZixFQUFBLFNBQVMsRUFBRyxVQUFELElBQWU7QUFFdEIsV0FBUTtjQUNGLFVBQVUsQ0FBQyxTQUFVLElBQUcsVUFBVSxDQUFDLFFBQVM7YUFDN0MsVUFBVSxDQUFDLFFBQVM7YUFDcEIsVUFBVSxDQUFDLFFBQVM7ZUFIekI7QUFNSCxHQVRjO0FBV2YsRUFBQSxlQUFlLEVBQUUsQ0FBQyxTQUFELEVBQVksUUFBWixFQUFzQixRQUF0QixFQUFnQyxRQUFoQyxLQUE2QztBQUMxRCxVQUFNLFVBQVUsR0FBRztBQUVmLE1BQUEsU0FBUyxFQUFFLFNBRkk7QUFHZixNQUFBLFFBQVEsRUFBRSxRQUhLO0FBSWYsTUFBQSxRQUFRLEVBQUUsUUFKSztBQUtmLE1BQUEsUUFBUSxFQUFFO0FBTEssS0FBbkI7QUFRQSxXQUFPLFVBQVA7QUFDSDtBQXJCYyxDQUFuQjtlQXdCZSxXOzs7Ozs7Ozs7O0FDM0JmO0FBRUEsTUFBTSxXQUFXLEdBQUc7QUFDaEIsRUFBQSxXQUFXLEVBQUUsTUFBTTtBQUVmLFdBQU8sS0FBSyxDQUFDLDZCQUFELENBQUwsQ0FDRixJQURFLENBQ0csS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFOLEVBRFosQ0FBUDtBQUVILEdBTGU7QUFNaEIsRUFBQSxPQUFPLEVBQUcsVUFBRCxJQUFnQjtBQUNyQixXQUFPLEtBQUssQ0FBQyw2QkFBRCxFQUFnQztBQUN4QyxNQUFBLE1BQU0sRUFBRSxNQURnQztBQUV4QyxNQUFBLE9BQU8sRUFBRTtBQUNMLHdCQUFnQjtBQURYLE9BRitCO0FBS3hDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsVUFBZjtBQUxrQyxLQUFoQyxDQUFaO0FBT0gsR0FkZTtBQWVoQixFQUFBLGFBQWEsRUFBQyxDQUFDLE9BQUQsRUFBVSxTQUFWLEtBQXNCO0FBQ2hDLFdBQU8sS0FBSyxDQUFFLCtCQUE4QixPQUFRLElBQUcsU0FBVSxFQUFyRCxDQUFMLENBQ0YsSUFERSxDQUNHLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBTixFQURaLENBQVA7QUFFSCxHQWxCZTtBQW1CaEIsRUFBQSxjQUFjLEVBQUMsQ0FBQyxXQUFELEVBQWMsRUFBZCxLQUFtQjtBQUMxQixXQUFPLEtBQUssQ0FBRSwrQkFBOEIsRUFBRyxFQUFuQyxFQUFzQztBQUM5QyxNQUFBLE1BQU0sRUFBRSxPQURzQztBQUU5QyxNQUFBLE9BQU8sRUFBRTtBQUNMLHdCQUFnQjtBQURYLE9BRnFDO0FBSzlDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsV0FBZjtBQUx3QyxLQUF0QyxDQUFaO0FBT0g7QUEzQlcsQ0FBcEI7ZUFpQ2UsVzs7Ozs7Ozs7OztBQ25DZixNQUFNLFNBQVMsR0FBRztBQUVkLEVBQUEsZ0JBQWdCLEVBQUUsTUFBTTtBQUNwQixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLHFCQUF2QixFQUE4QyxTQUE5QyxHQUEyRDs7Ozs7K0VBQTNEO0FBTUgsR0FUYTtBQVVkLEVBQUEsYUFBYSxFQUFFLE1BQU07QUFDakIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixrQkFBdkIsRUFBMkMsU0FBM0MsR0FBd0Q7Ozs7O29CQUF4RDtBQU1ILEdBakJhO0FBa0JkLEVBQUEsZUFBZSxFQUFDLE1BQUk7QUFDaEIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixrQkFBdkIsRUFBMkMsU0FBM0MsR0FBc0QsRUFBdEQ7QUFDSCxHQXBCYTtBQXFCZCxFQUFBLGNBQWMsRUFBRSxNQUFNO0FBRWxCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsa0JBQXZCLEVBQTJDLFNBQTNDLEdBQ0M7dUVBREQ7QUFJSCxHQTNCYTtBQTRCZCxFQUFBLGtCQUFrQixFQUFDLE1BQUk7QUFDbkIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixxQkFBdkIsRUFBOEMsU0FBOUMsR0FBd0QsRUFBeEQ7QUFDSCxHQTlCYTtBQStCZCxFQUFBLHNCQUFzQixFQUFFLFFBQUQsSUFBWTtBQUUvQixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGtCQUF2QixFQUEyQyxTQUEzQyxHQUNDOzBFQUNpRSxRQUFTOzs7O29CQUYzRTtBQU9IO0FBeENhLENBQWxCO2VBMkNlLFMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvL2NyZWF0ZXMgSFRNTCBzdHJpbmcgZm9yIGEgc2luZ2xlIGVtcGxveWVlLCBvciBhbiBvYmplY3Qgd2hlbiB0aGVyZSBpcyBhIG5ldyBpbnB1dGZyb20gdGhlIGZvcm1cclxuXHJcblxyXG5jb25zdCBjb250YWN0QnVpbGRlciA9e1xyXG4gICAgYnVpbGRDb250YWN0OiAoc2luZ2xlQ29udGFjdCkgPT57XHJcbiAgICAgICAgY29uc3QgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKVxyXG4gICAgICAgIHJldHVybiBgPGRpdiBpZD1cInVzZXItJHt1c2VySWR9LWNvbnRhY3QtJHtzaW5nbGVDb250YWN0LmlkfVwiPlxyXG4gICAgICAgIDxoMz4ke3NpbmdsZUNvbnRhY3QuZmlyc3ROYW1lfSAke3NpbmdsZUNvbnRhY3QubGFzdE5hbWV9PC9oMz5cclxuICAgICAgICA8cD4ke3NpbmdsZUNvbnRhY3QucGhvbmVOdW1iZXJ9PC9wPlxyXG4gICAgICAgIDxwPiR7c2luZ2xlQ29udGFjdC5hZGRyZXNzfTwvcD5cclxuICAgICAgICA8YnV0dG9uIHR5cGUgPSBcInN1Ym1pdFwiIGlkID1cImVkaXQtY29udGFjdC0ke3NpbmdsZUNvbnRhY3QuaWR9XCI+ZWRpdDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gdHlwZSA9IFwic3VibWl0XCIgaWQgPVwiZGVsZXRlLWNvbnRhY3QtJHtzaW5nbGVDb250YWN0LmlkfVwiID5kZWxldGU8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5gXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBidWlsZENvbnRhY3RPYmplY3Q6IChmaXJzdE5hbWUsIGxhc3ROYW1lLCBwaG9uZSwgYWRkcmVzcykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RPYmplY3QgPSB7XHJcblxyXG4gICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSxcclxuICAgICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lLFxyXG4gICAgICAgICAgICBwaG9uZU51bWJlcjogcGhvbmUsXHJcbiAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MsXHJcbiAgICAgICAgICAgIHVzZXJJZDogc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhY3RPYmplY3Q7XHJcbiAgICB9XHJcblxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNvbnRhY3RCdWlsZGVyOyIsIi8vIHRoaXMgbW9kdWxlIHdpbGwgY2FsbCBhcGkgdG8gZ2V0IGFsbCBjb250YWN0cywgYW5kIHRvIGFkZCBhbm90aGVyIGNvbnRhY3RcclxuXHJcbmNvbnN0IGNvbnRhY3RNYW5hZ2VyID0ge1xyXG4gICAgZ2V0QWxsQ29udGFjdHM6ICgpID0+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKGNvbnRhY3RzID0+IGNvbnRhY3RzLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBnZXRTaW5nbGVDb250YWN0OiAoY29udGFjdElkKSA9PiB7XHJcblxyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzLyR7Y29udGFjdElkfWApXHJcbiAgICAgICAgICAgIC50aGVuKGNvbnRhY3RzID0+IGNvbnRhY3RzLmpzb24oKSlcclxuICAgIH0sXHJcblxyXG4gICAgYWRkQ29udGFjdDogKGNvbnRhY3RPYmplY3QpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb250YWN0T2JqZWN0KVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGdldFVzZXJDb250YWN0czogKHVzZXJJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzP3VzZXJJZD0ke3VzZXJJZH1gKVxyXG4gICAgICAgICAgICAudGhlbihjb250YWN0cyA9PiBjb250YWN0cy5qc29uKCkpXHJcbiAgICB9LFxyXG5cclxuICAgIGRlbGV0ZUNvbnRhY3Q6IChpZCk9PntcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0cy8ke2lkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGVkaXRTaW5nbGVDb250YWN0OiAoY29udGFjdE9iamVjdCwgaWQpPT57XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHMvJHtpZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29udGFjdE9iamVjdClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29udGFjdE1hbmFnZXI7XHJcbiIsImNvbnN0IGNvbnRhY3RGb3JtcyA9IHtcclxuXHJcbiAgICBtYWtlQ29udGFjdEZvcm06ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm0tY29udGFpbmVyXCIpLmlubmVySFRNTCA9IGBcclxuICAgICAgICA8bGVnZW5kPkNyZWF0ZSBhIE5ldyBDb250YWN0PC9sZWdlbmQ+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZSA9IFwiZmlyc3ROYW1lXCIgaWQ9XCJmaXJzdC1uYW1lXCIgcGxhY2Vob2xkZXI9XCJGaXJzdCBOYW1lXCI+PGJyPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJsYXN0TmFtZVwiIGlkPVwibGFzdC1uYW1lXCIgcGxhY2Vob2xkZXI9XCJMYXN0IE5hbWVcIj48YnI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZSA9XCJwaG9uZU51bWJlclwiLCBpZD1cInBob25lLW51bWJlclwiIHBsYWNlaG9sZGVyPVwiUGhvbmUgTnVtYmVyXCI+PGJyPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJhZGRyZXNzXCIgaWQ9XCJhZGRyZXNzXCIgcGxhY2Vob2xkZXI9XCJBZGRyZXNzXCI+PGJyPlxyXG4gICAgICAgIDxidXR0b24gdHlwZSA9IFwic3VibWl0XCIsIGlkPVwic3VibWl0LWJ0blwiPlN1Ym1pdDwvYnV0dG9uPmBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZUNvbnRhY3RGb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtLWNvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlQ29udGFjdExpc3Q6ICgpPT57XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWxpc3RcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgfSxcclxuICAgIG1ha2VFZGl0Q29udGFjdEZvcm06KHVzZXJJZCwgY29udGFjdElkLCBzaW5nbGVDb250YWN0KT0+e1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCN1c2VyLSR7dXNlcklkfS1jb250YWN0LSR7Y29udGFjdElkfWApLmlubmVySFRNTD1cclxuICAgICAgICBgPGxlZ2VuZD5FZGl0IFlvdXIgQ29udGFjdDwvbGVnZW5kPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWUgPSBcImZpcnN0TmFtZVwiIGlkPVwiZWRpdC1maXJzdC1uYW1lXCIgdmFsdWU9XCIke3NpbmdsZUNvbnRhY3QuZmlyc3ROYW1lfVwiPjxicj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibGFzdE5hbWVcIiBpZD1cImVkaXQtbGFzdC1uYW1lXCIgdmFsdWU9XCIke3NpbmdsZUNvbnRhY3QubGFzdE5hbWV9XCI+PGJyPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWUgPVwicGhvbmVOdW1iZXJcIiwgaWQ9XCJlZGl0LXBob25lLW51bWJlclwiIHZhbHVlPVwiJHtzaW5nbGVDb250YWN0LnBob25lTnVtYmVyfVwiPjxicj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiYWRkcmVzc1wiIGlkPVwiZWRpdC1hZGRyZXNzXCIgdmFsdWU9XCIke3NpbmdsZUNvbnRhY3QuYWRkcmVzc31cIj48YnI+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlID0gXCJzdWJtaXRcIiwgaWQ9XCJzdWJtaXQtZWRpdC0ke2NvbnRhY3RJZH1cIj5TdWJtaXQ8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIHR5cGUgPSBcInN1Ym1pdFwiLCBpZD1cImNhbmNlbC1lZGl0LSR7Y29udGFjdElkfVwiPkNhbmNlbDwvYnV0dG9uPmBcclxuXHJcblxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNvbnRhY3RGb3JtczsiLCIvLyB0aGlzIG1vZHVsZSBzaG91bGQgaW1wb3J0IGZyb20gYXBpTWFuYWdlciAoZ2V0IGVtcGxveWVlcykgYW5kIGxvb3AgdGhyb3VnaCBhbmQgb3B0aW9uIHRvIHByaW50IG9uZSBvciBhbGxcclxuLy9leHBvcnQgYW4gb2JqZWN0IHdpdGggbWV0aG9kcyAocHJpbnQgYWxsLCBwcmludCBzaW5nbGUpXHJcblxyXG5pbXBvcnQgY29udGFjdE1hbmFnZXIgZnJvbSBcIi4vY29udGFjdENvbGxlY3Rpb24uanNcIlxyXG5pbXBvcnQgY29udGFjdEJ1aWxkZXIgZnJvbSBcIi4vY29udGFjdC5qc1wiXHJcbmltcG9ydCB1c2VyTWFuYWdlciBmcm9tIFwiLi91c2VyQ29sbGVjdGlvbi5qc1wiO1xyXG5cclxuY29uc3QgcHJpbnRDb250YWN0cyA9IHtcclxuXHJcbnByaW50QWxsQ29udGFjdHM6KCk9PntcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWxpc3RcIikuaW5uZXJIVE1MPVwiXCJcclxuXHJcbmNvbnRhY3RNYW5hZ2VyLmdldEFsbENvbnRhY3RzKClcclxuLnRoZW4oKHBhcnNlZENvbnRhY3RzKT0+e1xyXG5jb25zb2xlLmxvZyhwYXJzZWRDb250YWN0cylcclxucGFyc2VkQ29udGFjdHMuZm9yRWFjaChzaW5nbGVDb250YWN0T2JqZWN0PT4ge1xyXG4gICAgY29uc3QgY29udGFjdEhUTUxTdHJpbmcgPSBjb250YWN0QnVpbGRlci5idWlsZENvbnRhY3Qoc2luZ2xlQ29udGFjdE9iamVjdClcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdC1saXN0XCIpLmlubmVySFRNTCs9Y29udGFjdEJ1aWxkZXIuYnVpbGRDb250YWN0KHNpbmdsZUNvbnRhY3RPYmplY3QpXHJcblxyXG59KVxyXG5cclxufSlcclxufSxcclxucHJpbnRVc2VyQ29udGFjdHM6KCk9PntcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdC1saXN0XCIpLmlubmVySFRNTD1cIlwiXHJcbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpXHJcblxyXG4gICAgdXNlck1hbmFnZXIuZ2V0U2luZ2xlVXNlcihcImlkXCIsIHVzZXJJZClcclxuICAgIC50aGVuKCh1c2VyKT0+e1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0IHNpbmdsZSB1c2VyXCIsIHVzZXIpXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWxpc3RcIikuaW5uZXJIVE1MPWA8aDE+JHt1c2VyWzBdLmZpcnN0TmFtZX0gJHt1c2VyWzBdLmxhc3ROYW1lfSdzIENvbnRhY3RzPC9oMT5gXHJcbiAgICB9KVxyXG4gICAgY29udGFjdE1hbmFnZXIuZ2V0VXNlckNvbnRhY3RzKHVzZXJJZClcclxuICAgIC50aGVuKChwYXJzZWRDb250YWN0cyk9PntcclxuICAgIGNvbnNvbGUubG9nKHBhcnNlZENvbnRhY3RzKVxyXG5cclxuICAgIHBhcnNlZENvbnRhY3RzLmZvckVhY2goc2luZ2xlQ29udGFjdE9iamVjdD0+IHtcclxuICAgICAgICBjb25zdCBjb250YWN0SFRNTFN0cmluZyA9IGNvbnRhY3RCdWlsZGVyLmJ1aWxkQ29udGFjdChzaW5nbGVDb250YWN0T2JqZWN0KVxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdC1saXN0XCIpLmlubmVySFRNTCs9Y29udGFjdEJ1aWxkZXIuYnVpbGRDb250YWN0KHNpbmdsZUNvbnRhY3RPYmplY3QpXHJcblxyXG4gICAgfSlcclxuXHJcbiAgICB9KVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcmludENvbnRhY3RzOyIsImltcG9ydCB1c2VyRm9ybXMgZnJvbSBcIi4vdXNlckZvcm1zLmpzXCJcclxuaW1wb3J0IGNvbnRhY3RGb3JtcyBmcm9tIFwiLi9jb250YWN0Rm9ybS5qc1wiXHJcbmltcG9ydCBwcmludENvbnRhY3RzIGZyb20gXCIuL2NvbnRhY3RMaXN0LmpzXCJcclxuXHJcblxyXG5jb25zdCBsb2dpbk1hbmFnZXIgPXtcclxuXHJcbiAgICB2ZXJpZnlQYXNzd29yZDogKHVzZXIsIHBhc3N3b3JkKT0+e1xyXG4gICAgICAgIGlmKHBhc3N3b3JkPT09dXNlclswXS5wYXNzd29yZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGFzc3dvcmQgbWF0Y2hlZFwiKVxyXG4gICAgICAgICAgICB1c2VyRm9ybXMubWFrZUxvZ291dEZvcm0oKTtcclxuICAgICAgICAgICAgdXNlckZvcm1zLnJlbW92ZVJlZ2lzdGVyRm9ybSgpO1xyXG4gICAgICAgICAgICBjb250YWN0Rm9ybXMubWFrZUNvbnRhY3RGb3JtKCk7XHJcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgdXNlclswXS5pZClcclxuICAgICAgICAgICAgcHJpbnRDb250YWN0cy5wcmludFVzZXJDb250YWN0cyh1c2VyWzBdLmlkKVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyIGxvZ2dlZCBpblwiLCB1c2VyWzBdKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBhc3N3b3JkIGRpZCBub3QgbWF0Y2hcIilcclxuICAgICAgICAgICAgd2luZG93LmFsZXJ0KFwiUGFzc3dvcmQgaXMgaW5jb3JyZWN0ISEgIFRyeSBhZ2FpblwiKVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjb25maXJtUGFzc3dvcmQ6IChwYXNzd29yZDEsIHBhc3N3b3JkMik9PntcclxuICAgICAgICBpZihwYXNzd29yZDE9PT1wYXNzd29yZDIpe1xyXG4gICAgICAgICAgICBzaW5nbGVJZD1zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpXHJcbiAgICAgICAgdXNlck1hbmFnZXIudXBkYXRlUGFzc3dvcmQocGFzc3dvcmQxLCBzaW5nbGVJZCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHZlcmlmeVVzZXJOYW1lOiAodXNlciwgdXNlck5hbWUpPT57XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsb2dpbk1hbmFnZXI7XHJcbiIsImltcG9ydCBjb250YWN0Rm9ybXMgZnJvbSBcIi4vY29udGFjdEZvcm1cIlxyXG5pbXBvcnQgcHJpbnRDb250YWN0cyBmcm9tIFwiLi9jb250YWN0TGlzdC5qc1wiXHJcbmltcG9ydCBjb250YWN0TWFuYWdlciBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvbi5qc1wiXHJcbmltcG9ydCBjb250YWN0QnVpbGRlciBmcm9tIFwiLi9jb250YWN0LmpzXCJcclxuaW1wb3J0IHVzZXJGb3JtcyBmcm9tIFwiLi91c2VyRm9ybXMuanNcIjtcclxuaW1wb3J0IHVzZXJNYW5hZ2VyIGZyb20gXCIuL3VzZXJDb2xsZWN0aW9uLmpzXCJcclxuaW1wb3J0IHVzZXJCdWlsZGVyIGZyb20gXCIuL3VzZXIuanNcIlxyXG5pbXBvcnQgbG9naW5NYW5hZ2VyIGZyb20gXCIuL2xvZ2luTWFuYWdlci5qc1wiXHJcblxyXG4vLyBwcmludENvbnRhY3RzLnByaW50QWxsQ29udGFjdHMoKTtcclxuXHJcblxyXG51c2VyRm9ybXMubWFrZUxvZ2luRm9ybSgpO1xyXG5cclxuLy9BZGQgZXZlbnQgbGlzdGVuZXIgb24gdGhlIGNvbnRhY3QgYnV0dG9uIHRvIHNhdmUgYSBjb250YWN0IGFuZCBwb3N0IHRvIEpTT05cclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1jb250YWluZXJcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcInN1Ym1pdC1idG5cIikge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZmlyc3QtbmFtZVwiKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xhc3QtbmFtZVwiKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgYWRkcmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkcmVzc1wiKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGhvbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bob25lLW51bWJlclwiKS52YWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhY3RPYmplY3QgPSBjb250YWN0QnVpbGRlci5idWlsZENvbnRhY3RPYmplY3QoZmlyc3ROYW1lLCBsYXN0TmFtZSwgcGhvbmUsIGFkZHJlc3MpXHJcblxyXG4gICAgICAgICAgICAgICAgY29udGFjdE1hbmFnZXIuYWRkQ29udGFjdChjb250YWN0T2JqZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihwcmludENvbnRhY3RzLnByaW50VXNlckNvbnRhY3RzKVxyXG4gICAgICAgIH1cclxufSlcclxuLy9BZGQgZXZlbnQgbGlzdGVuZXIgb24gdGhlIHJlZ2lzdGVyIGJ1dHRvbiB0byByZWdpc3RlciBhIG5ldyB1c2VyXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXItY29udGFpbmVyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJyZWdpc3Rlci1idG5cIikge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1maXJzdC1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1sYXN0LW5hbWVcIikudmFsdWVcclxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyLW5hbWVcIikudmFsdWVcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhc3N3b3JkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyLXBhc3N3b3JkXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICB1c2VyTWFuYWdlci5nZXRTaW5nbGVVc2VyKFwidXNlck5hbWVcIiwgdXNlck5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChzaW5nbGVVc2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpbmdsZVVzZXIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0J1aWxkIGFuIG9iamVjdCB0byByZXByZXNlbnQgdGhlIHVzZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJPYmplY3QgPSB1c2VyQnVpbGRlci5idWlsZFVzZXJPYmplY3QoZmlyc3ROYW1lLCBsYXN0TmFtZSwgdXNlck5hbWUsIHBhc3N3b3JkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9NYWtlIEFQSSBjYWxsIGFuZCBhZGQgdXNlciB0byBkYXRhYmFzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlck1hbmFnZXIuYWRkVXNlcih1c2VyT2JqZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbih1c2VyID0+IHVzZXIuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigodXNlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGp1c3QgYWRkZWQgYSB1c2VyIVwiLCB1c2VyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgdXNlci5pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0Rm9ybXMubWFrZUNvbnRhY3RGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlckZvcm1zLm1ha2VMb2dvdXRGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWxpc3RcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJGb3Jtcy5yZW1vdmVSZWdpc3RlckZvcm0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0lmIHVzZXJuYW1lIGlzIGFscmVhZHkgaW4gdGhlIGRhdGFiYXNlLCB3aW5kb3cgYWxlcnQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJUaGUgdXNlcm5hbWUgaGFzIGFscmVhZHkgYmVlbiBhc3NpZ25lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG59KVxyXG4vL0V2ZW50IGxpc3RlbmVyIG9uIHRoZSBsb2dpbiBjb250YWluZXJcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1jb250YWluZXJcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAvL2FkZCBldmVudCBsaXN0ZW5lciBvbiB0aGUgbG9naW4gYnV0dG9uIHRvIGxvZyBpbiBhIHVzZXIgYW5kIHN0b3JlIHRoZWlyIHVzZXJJRCBpbiB0aGUgc2Vzc2lvblxyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwic2hvdy1yZWdpc3Rlci1idG5cIikge1xyXG4gICAgICAgICAgICAgICAgdXNlckZvcm1zLm1ha2VSZWdpc3RlckZvcm0oKTtcclxuICAgICAgICAgICAgICAgIHVzZXJGb3Jtcy5yZW1vdmVMb2dpbkZvcm0oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwibG9naW4tYnRuXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyLWxvZ2luLW5hbWVcIikudmFsdWVcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhc3N3b3JkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyLWxvZ2luLXBhc3N3b3JkXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VyTWFuYWdlci5nZXRTaW5nbGVVc2VyKFwidXNlck5hbWVcIiwgdXNlck5hbWUpKVxyXG4gICAgICAgICAgICAgICAgLy9DaGVjayB0byBzZWUgaWYgdXNlciBleGlzdHMgaW4gdGhlIGRhdGFiYXNlXHJcbiAgICAgICAgICAgICAgICB1c2VyTWFuYWdlci5nZXRTaW5nbGVVc2VyKFwidXNlck5hbWVcIiwgdXNlck5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChzaW5nbGVVc2VyKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaW5nbGVVc2VyLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgdXNlcm5hbWUgb2ZcIiwgdXNlck5hbWUsIFwid2FzIHZlcmlmaWVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0lmIHVzZXJuYW1lIGV4aXN0cywgbW92ZSBvbiB0byB2ZXJpZnlpbmcgdGhlIHBhc3N3b3JkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dpbk1hbmFnZXIudmVyaWZ5UGFzc3dvcmQoc2luZ2xlVXNlciwgcGFzc3dvcmQpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSWYgdXNlcm5hbWUgZG9lcyBub3QgZXhpc3QsIGdpdmUgYWxlcnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChcInRoYXQgdXNlcm5hbWUgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGRhdGFiYXNlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2V2ZW50IGxpc3RlbmVyIG9uIHRoZSBsb2dvdXQgYnV0dG9uIHRvIHJlbW92ZSBhIHVzZXJJRCBmcm9tIHNlc3Npb24gc3RvcmFnZSBhbmQgY2xlYXIgY29udGFjdHNcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcImxvZ291dC1idG5cIikge1xyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoXCJ1c2VySWRcIilcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXNlciBpZCBjbGVhcmVkXCIpXHJcbiAgICAgICAgICAgICAgICB1c2VyRm9ybXMubWFrZUxvZ2luRm9ybSgpXHJcbiAgICAgICAgICAgICAgICBjb250YWN0Rm9ybXMucmVtb3ZlQ29udGFjdExpc3QoKTtcclxuICAgICAgICAgICAgICAgIGNvbnRhY3RGb3Jtcy5yZW1vdmVDb250YWN0Rm9ybSgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJ1cGRhdGUtYnRuXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCB1c2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBjbGlja2VkIHRoZSB1cGRhdGUgYnV0dG9uXCIpXHJcbiAgICAgICAgICAgICAgICB1c2VyTWFuYWdlci5nZXRTaW5nbGVVc2VyKFwiaWRcIiwgdXNlcklkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoc2luZ2xlVXNlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2luZ2xlIHVzZXIgaW5zaWRlIHVwZGF0ZVwiLCBzaW5nbGVVc2VyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJGb3Jtcy5tYWtlUGFzc3dvcmRDaGFuZ2VGb3JtKHNpbmdsZVVzZXJbMF0udXNlck5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdEZvcm1zLnJlbW92ZUNvbnRhY3RGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdEZvcm1zLnJlbW92ZUNvbnRhY3RMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwiY2hhbmdlLXBhc3N3b3JkLWJ0blwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBjbGlja2VkIHRoZSBidXR0b24gdG8gY2hhbmdlIHlvdXIgcGFzc3dvcmRcIilcclxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhc3N3b3JkMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1jaGFuZ2UtcGFzc3dvcmQxXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXNzd29yZDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXItY2hhbmdlLXBhc3N3b3JkMlwiKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgaWYgKHBhc3N3b3JkMSA9PT0gcGFzc3dvcmQyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhdGNoT2JqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlck1hbmFnZXIudXBkYXRlUGFzc3dvcmQocGF0Y2hPYmplY3QsIHVzZXJJZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KFwiWW91ciBwYXNzd29yZCB3YXMgc3VjY2Vzc2Z1bGx5IGNoYW5nZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlckZvcm1zLm1ha2VMb2dvdXRGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3RGb3Jtcy5tYWtlQ29udGFjdEZvcm0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnRDb250YWN0cy5wcmludFVzZXJDb250YWN0cyh1c2VySWQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KFwiVGhlIHBhc3N3b3JkcyBkbyBub3QgbWF0Y2hcIilcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxufSlcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdC1saXN0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVxyXG4gICAgICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuXHJcbiAgICAgICAgaWYgKHRhcmdldFswXSA9PT0gXCJkZWxldGVcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFjdElkPXRhcmdldFsyXVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgY2xpY2tlZCB0aGVcIiwgdGFyZ2V0LCBcImJ1dHRvblwiKVxyXG4gICAgICAgICAgICAgICAgY29udGFjdE1hbmFnZXIuZGVsZXRlQ29udGFjdChjb250YWN0SWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocHJpbnRDb250YWN0cy5wcmludFVzZXJDb250YWN0cykpXHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0YXJnZXRbMF0gPT09IFwiZWRpdFwiKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhY3RJZD10YXJnZXRbMl1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGNsaWNrZWQgdGhlXCIsIHRhcmdldCwgXCJidXR0b25cIilcclxuXHJcbiAgICAgICAgICAgICAgICBjb250YWN0TWFuYWdlci5nZXRTaW5nbGVDb250YWN0KGNvbnRhY3RJZClcclxuICAgICAgICAgICAgICAgIC50aGVuKChzaW5nbGVDb250YWN0KT0+e1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdEZvcm1zLm1ha2VFZGl0Q29udGFjdEZvcm0odXNlcklkLCBjb250YWN0SWQsIHNpbmdsZUNvbnRhY3QpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRhcmdldFswXSA9PT0gXCJzdWJtaXRcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFjdElkPXRhcmdldFsyXVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgY2xpY2tlZCB0aGVcIiwgdGFyZ2V0LCBcImJ1dHRvblwiKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LWZpcnN0LW5hbWVcIikudmFsdWVcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LWxhc3QtbmFtZVwiKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGhvbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtcGhvbmUtbnVtYmVyXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBhZGRyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LWFkZHJlc3NcIikudmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250YWN0T2JqZWN0PWNvbnRhY3RCdWlsZGVyLmJ1aWxkQ29udGFjdE9iamVjdChmaXJzdE5hbWUsIGxhc3ROYW1lLCBwaG9uZSwgYWRkcmVzcylcclxuXHJcbiAgICAgICAgICAgICAgICBjb250YWN0TWFuYWdlci5lZGl0U2luZ2xlQ29udGFjdChjb250YWN0T2JqZWN0LCBjb250YWN0SWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbihwcmludENvbnRhY3RzLnByaW50VXNlckNvbnRhY3RzKVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRhcmdldFswXSA9PT0gXCJjYW5jZWxcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgY2xpY2tlZCB0aGVcIiwgdGFyZ2V0LCBcImJ1dHRvblwiKVxyXG4gICAgICAgICAgICAgICAgcHJpbnRDb250YWN0cy5wcmludFVzZXJDb250YWN0cygpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbn0pXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsIi8vY3JlYXRlcyBIVE1MIHN0cmluZyBmb3IgYSBzaW5nbGUgZW1wbG95ZWUsIG9yIGFuIG9iamVjdCB3aGVuIHRoZXJlIGlzIGEgbmV3IGlucHV0ZnJvbSB0aGUgZm9ybVxyXG5cclxuXHJcbmNvbnN0IHVzZXJCdWlsZGVyID17XHJcbiAgICBidWlsZFVzZXI6IChzaW5nbGVVc2VyKSA9PntcclxuXHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2PlxyXG4gICAgICAgIDxoMz4ke3NpbmdsZVVzZXIuZmlyc3ROYW1lfSAke3NpbmdsZVVzZXIubGFzdE5hbWV9PC9oMz5cclxuICAgICAgICA8cD4ke3NpbmdsZVVzZXIudXNlck5hbWV9PC9wPlxyXG4gICAgICAgIDxwPiR7c2luZ2xlVXNlci5wYXNzd29yZH08L3A+XHJcbiAgICAgICAgPC9kaXY+YFxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYnVpbGRVc2VyT2JqZWN0OiAoZmlyc3ROYW1lLCBsYXN0TmFtZSwgdXNlck5hbWUsIHBhc3N3b3JkKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdXNlck9iamVjdCA9IHtcclxuXHJcbiAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lLFxyXG4gICAgICAgICAgICBsYXN0TmFtZTogbGFzdE5hbWUsXHJcbiAgICAgICAgICAgIHVzZXJOYW1lOiB1c2VyTmFtZSxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdXNlck9iamVjdDtcclxuICAgIH1cclxuXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgdXNlckJ1aWxkZXI7IiwiLy8gVGhpcyBtb2R1bGUgd2lsbCBtYW5hZ2UgdGhlIHVzZXIgZGF0YWJhc2VcclxuXHJcbmNvbnN0IHVzZXJNYW5hZ2VyID0ge1xyXG4gICAgZ2V0QWxsVXNlcnM6ICgpID0+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKHVzZXJzID0+IHVzZXJzLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBhZGRVc2VyOiAodXNlck9iamVjdCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJPYmplY3QpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBnZXRTaW5nbGVVc2VyOih1c2VyS2V5LCB1c2VyVmFsdWUpPT57XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnM/JHt1c2VyS2V5fT0ke3VzZXJWYWx1ZX1gKVxyXG4gICAgICAgICAgICAudGhlbih1c2VycyA9PiB1c2Vycy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgdXBkYXRlUGFzc3dvcmQ6KHBhdGNoT2JqZWN0LCBpZCk9PntcclxuICAgICAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnMvJHtpZH1gLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBhdGNoT2JqZWN0KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB1c2VyTWFuYWdlcjtcclxuXHJcbiIsImNvbnN0IHVzZXJGb3JtcyA9IHtcclxuXHJcbiAgICBtYWtlUmVnaXN0ZXJGb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3Rlci1jb250YWluZXJcIikuaW5uZXJIVE1MID0gYDxmaWVsZHNldD48bGVnZW5kPlJlZ2lzdGVyPC9sZWdlbmQ+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInVzZXJGaXJzdE5hbWVcIiBpZD1cInVzZXItZmlyc3QtbmFtZVwiIHBsYWNlaG9sZGVyPVwiRmlyc3QgTmFtZVwiPjwvaW5wdXQ+IDxicj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidXNlckxhc3ROYW1lXCIgaWQ9XCJ1c2VyLWxhc3QtbmFtZVwiIHBsYWNlaG9sZGVyPVwiTGFzdCBOYW1lXCI+PGJyPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ1c2VyTmFtZVwiIGlkPVwidXNlci1uYW1lXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBVc2VybmFtZVwiPjxicj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIgaWQ9XCJ1c2VyLXBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBQYXNzd29yZFwiPjxicj5cclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJyZWdpc3RlclwiIGlkPVwicmVnaXN0ZXItYnRuXCI+cmVnaXN0ZXI8L2J1dHRvbj48L2ZpZWxkc2V0PmBcclxuICAgIH0sXHJcbiAgICBtYWtlTG9naW5Gb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1jb250YWluZXJcIikuaW5uZXJIVE1MID0gYDxmaWVsZHNldD48bGVnZW5kPkxvZ2luPC9sZWdlbmQ+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInVzZXJOYW1lXCIgaWQ9XCJ1c2VyLWxvZ2luLW5hbWVcIiBwbGFjZWhvbGRlcj1cIkVudGVyIFVzZXJuYW1lXCI+PGJyPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIiBpZD1cInVzZXItbG9naW4tcGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIkVudGVyIFBhc3N3b3JkXCI+PGJyPlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGlkPVwibG9naW4tYnRuXCI+bG9naW48L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBpZD1cInNob3ctcmVnaXN0ZXItYnRuXCI+UmVnaXN0ZXI8L2J1dHRvbj5cclxuICAgICAgICA8L2ZpZWxkc2V0PmBcclxuICAgIH0sXHJcbiAgICByZW1vdmVMb2dpbkZvcm06KCk9PntcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRhaW5lclwiKS5pbm5lckhUTUwgPVwiXCJcclxuICAgIH0sXHJcbiAgICBtYWtlTG9nb3V0Rm9ybTogKCkgPT4ge1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRhaW5lclwiKS5pbm5lckhUTUwgPVxyXG4gICAgICAgIGA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBpZD1cImxvZ291dC1idG5cIj5sb2dvdXQ8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBpZD1cInVwZGF0ZS1idG5cIj5DaGFuZ2UgUGFzc3dvcmQ8L2J1dHRvbj5gXHJcblxyXG4gICAgfSxcclxuICAgIHJlbW92ZVJlZ2lzdGVyRm9ybTooKT0+e1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXItY29udGFpbmVyXCIpLmlubmVySFRNTD1cIlwiXHJcbiAgICB9LFxyXG4gICAgbWFrZVBhc3N3b3JkQ2hhbmdlRm9ybToodXNlck5hbWUpPT57XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tY29udGFpbmVyXCIpLmlubmVySFRNTD1cclxuICAgICAgICBgPGZpZWxkc2V0PjxsZWdlbmQ+Q2hhbmdlIFlvdXIgUGFzc3dvcmQ8L2xlZ2VuZD5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidXNlck5hbWVcIiBpZD1cInVzZXItY2hhbmdlLW5hbWVcIiB2YWx1ZT1cIiR7dXNlck5hbWV9XCI+PGJyPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJwYXNzd29yZFwiIGlkPVwidXNlci1jaGFuZ2UtcGFzc3dvcmQxXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBQYXNzd29yZFwiPjxicj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicGFzc3dvcmRcIiBpZD1cInVzZXItY2hhbmdlLXBhc3N3b3JkMlwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgUGFzc3dvcmQgQWdhaW5cIj48YnI+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgaWQ9XCJjaGFuZ2UtcGFzc3dvcmQtYnRuXCI+c3VibWl0PC9idXR0b24+XHJcbiAgICAgICAgPC9maWVsZHNldD5gXHJcbiAgICB9XHJcblxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHVzZXJGb3JtcztcclxuXHJcbiJdfQ==
