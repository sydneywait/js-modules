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
    return `<div class="contacts" id="user-${userId}-contact-${singleContact.id}">
        <h3>${singleContact.firstName} ${singleContact.lastName}</h3>
        <p>${singleContact.phoneNumber}</p>
        <p>${singleContact.address}</p>
        <button class = "sm-btn green-btn" type = "submit" id ="edit-contact-${singleContact.id}">edit</button>
        <button class = "sm-btn red-btn" type = "submit" id ="delete-contact-${singleContact.id}" >delete</button>
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
        <h1>Create a New Contact</h1>
        <input class="make-contact" type="text" name = "firstName" id="first-name" placeholder="First Name"><br>
        <input class="make-contact" type="text" name="lastName" id="last-name" placeholder="Last Name"><br>
        <input class="make-contact" type="text" name ="phoneNumber", id="phone-number" placeholder="Phone Number"><br>
        <input class="make-contact" type="text" name="address" id="address" placeholder="Address"><br>
        <button class = "big-btn green-btn" type = "submit", id="submit-btn">Submit</button>`;
  },
  removeContactForm: () => {
    document.querySelector("#form-container").innerHTML = "";
  },
  removeContactList: () => {
    document.querySelector("#contact-header").innerHTML = "";
    document.querySelector("#contact-list").innerHTML = "";
  },
  makeEditContactForm: (userId, contactId, singleContact) => {
    document.querySelector(`#user-${userId}-contact-${contactId}`).innerHTML = `<h4 class = "edit-contact-label" >Edit your Contact<h4>
        <input type="text" name = "firstName" id="edit-first-name" value="${singleContact.firstName}"><br>
        <input type="text" name="lastName" id="edit-last-name" value="${singleContact.lastName}"><br>
        <input type="text" name ="phoneNumber", id="edit-phone-number" value="${singleContact.phoneNumber}"><br>
        <input type="text" name="address" id="edit-address" value="${singleContact.address}"><br>
        <button class = "sm-btn green-btn" type = "submit", id="submit-edit-${contactId}">Submit</button>
        <button class = "sm-btn red-btn" type = "submit", id="cancel-edit-${contactId}">Cancel</button>`;
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

var _contactForm = _interopRequireDefault(require("./contactForm.js"));

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
    _contactForm.default.removeContactList();

    const userId = sessionStorage.getItem("userId");

    _userCollection.default.getSingleUser("id", userId).then(user => {
      console.log("get single user", user);
      document.querySelector("#contact-header").innerHTML = `${user[0].firstName} ${user[0].lastName}'s contacts`;
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

},{"./contact.js":1,"./contactCollection.js":2,"./contactForm.js":3,"./userCollection.js":8}],5:[function(require,module,exports){
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

      _userForms.default.makeLogoutForm(); // userForms.removeRegisterForm();


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
    document.querySelector("#register-container").innerHTML = `<h1>Please Register:</h1>
        <input class="register-input" type="text" name="userFirstName" id="user-first-name" placeholder="First Name"></input> <br>
        <input class="register-input" type="text" name="userLastName" id="user-last-name" placeholder="Last Name"><br>
        <input class="register-input" type="text" name="userName" id="user-name" placeholder="Username"><br>
        <input class="register-input" type="password" name="password" id="user-password" placeholder="Password"><br>
        <button type="register" class = "big-btn green-btn" id="register-btn">register</button>`;
  },
  makeLoginForm: () => {
    document.querySelector("#login-container").innerHTML = `<h1>Welcome!</h1>
        <input type="text" name="userName" id="user-login-name" placeholder="Enter Username"><br>
        <input type="password" name="password" id="user-login-password" placeholder="Enter Password"><br>
        <button class = "big-btn green-btn" type="submit" id="login-btn">login</button>
        <button class = "big-btn green-btn" type="submit" id="show-register-btn">register</button>`;
  },
  removeLoginForm: () => {
    document.querySelector("#login-container").innerHTML = "";
  },
  makeLogoutForm: () => {
    document.querySelector("#login-container").innerHTML = `<button class = "big-btn green-btn" type="submit" id="logout-btn">logout</button>
        <button class = "big-btn blue-btn" type="submit" id="update-btn">change password</button>`;
  },
  removeRegisterForm: () => {
    document.querySelector("#register-container").innerHTML = "";
  },
  makePasswordChangeForm: userName => {
    document.querySelector("#login-container").innerHTML = `<h1>Change Your Password</h1>
        <input type="text" name="userName" id="user-change-name" value="${userName}"><br>
        <input type="text" name="password" id="user-change-password1" placeholder="Enter Password"><br>
        <input type="text" name="password" id="user-change-password2" placeholder="Enter Password Again"><br>
        <button class = "big-btn green-btn" type="submit" id="change-password-btn">submit</button>
        `;
  }
};
var _default = userForms;
exports.default = _default;

},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL2xvZ2luTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvdXNlci5qcyIsIi4uL3NjcmlwdHMvdXNlckNvbGxlY3Rpb24uanMiLCIuLi9zY3JpcHRzL3VzZXJGb3Jtcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBR0EsTUFBTSxjQUFjLEdBQUU7QUFDbEIsRUFBQSxZQUFZLEVBQUcsYUFBRCxJQUFrQjtBQUM1QixVQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QixDQUFmO0FBQ0EsV0FBUSxrQ0FBaUMsTUFBTyxZQUFXLGFBQWEsQ0FBQyxFQUFHO2NBQ3RFLGFBQWEsQ0FBQyxTQUFVLElBQUcsYUFBYSxDQUFDLFFBQVM7YUFDbkQsYUFBYSxDQUFDLFdBQVk7YUFDMUIsYUFBYSxDQUFDLE9BQVE7K0VBQzRDLGFBQWEsQ0FBQyxFQUFHOytFQUNqQixhQUFhLENBQUMsRUFBRztlQUx4RjtBQVFILEdBWGlCO0FBYWxCLEVBQUEsa0JBQWtCLEVBQUUsQ0FBQyxTQUFELEVBQVksUUFBWixFQUFzQixLQUF0QixFQUE2QixPQUE3QixLQUF5QztBQUN6RCxVQUFNLGFBQWEsR0FBRztBQUVsQixNQUFBLFNBQVMsRUFBRSxTQUZPO0FBR2xCLE1BQUEsUUFBUSxFQUFFLFFBSFE7QUFJbEIsTUFBQSxXQUFXLEVBQUUsS0FKSztBQUtsQixNQUFBLE9BQU8sRUFBRSxPQUxTO0FBTWxCLE1BQUEsTUFBTSxFQUFFLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCO0FBTlUsS0FBdEI7QUFTQSxX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YUFBYSxFQUFFLE1BQU07QUFDakIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixrQkFBdkIsRUFBMkMsU0FBM0MsR0FBd0Q7Ozs7bUdBQXhEO0FBS0gsR0FoQmE7QUFpQmQsRUFBQSxlQUFlLEVBQUMsTUFBSTtBQUNoQixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGtCQUF2QixFQUEyQyxTQUEzQyxHQUFzRCxFQUF0RDtBQUNILEdBbkJhO0FBb0JkLEVBQUEsY0FBYyxFQUFFLE1BQU07QUFFbEIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixrQkFBdkIsRUFBMkMsU0FBM0MsR0FDQztrR0FERDtBQUlILEdBMUJhO0FBMkJkLEVBQUEsa0JBQWtCLEVBQUMsTUFBSTtBQUNuQixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLHFCQUF2QixFQUE4QyxTQUE5QyxHQUF3RCxFQUF4RDtBQUNILEdBN0JhO0FBOEJkLEVBQUEsc0JBQXNCLEVBQUUsUUFBRCxJQUFZO0FBRS9CLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsa0JBQXZCLEVBQTJDLFNBQTNDLEdBQ0M7MEVBQ2lFLFFBQVM7Ozs7U0FGM0U7QUFPSDtBQXZDYSxDQUFsQjtlQTBDZSxTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy9jcmVhdGVzIEhUTUwgc3RyaW5nIGZvciBhIHNpbmdsZSBlbXBsb3llZSwgb3IgYW4gb2JqZWN0IHdoZW4gdGhlcmUgaXMgYSBuZXcgaW5wdXRmcm9tIHRoZSBmb3JtXHJcblxyXG5cclxuY29uc3QgY29udGFjdEJ1aWxkZXIgPXtcclxuICAgIGJ1aWxkQ29udGFjdDogKHNpbmdsZUNvbnRhY3QpID0+e1xyXG4gICAgICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJjb250YWN0c1wiIGlkPVwidXNlci0ke3VzZXJJZH0tY29udGFjdC0ke3NpbmdsZUNvbnRhY3QuaWR9XCI+XHJcbiAgICAgICAgPGgzPiR7c2luZ2xlQ29udGFjdC5maXJzdE5hbWV9ICR7c2luZ2xlQ29udGFjdC5sYXN0TmFtZX08L2gzPlxyXG4gICAgICAgIDxwPiR7c2luZ2xlQ29udGFjdC5waG9uZU51bWJlcn08L3A+XHJcbiAgICAgICAgPHA+JHtzaW5nbGVDb250YWN0LmFkZHJlc3N9PC9wPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3MgPSBcInNtLWJ0biBncmVlbi1idG5cIiB0eXBlID0gXCJzdWJtaXRcIiBpZCA9XCJlZGl0LWNvbnRhY3QtJHtzaW5nbGVDb250YWN0LmlkfVwiPmVkaXQ8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzID0gXCJzbS1idG4gcmVkLWJ0blwiIHR5cGUgPSBcInN1Ym1pdFwiIGlkID1cImRlbGV0ZS1jb250YWN0LSR7c2luZ2xlQ29udGFjdC5pZH1cIiA+ZGVsZXRlPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+YFxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYnVpbGRDb250YWN0T2JqZWN0OiAoZmlyc3ROYW1lLCBsYXN0TmFtZSwgcGhvbmUsIGFkZHJlc3MpID0+IHtcclxuICAgICAgICBjb25zdCBjb250YWN0T2JqZWN0ID0ge1xyXG5cclxuICAgICAgICAgICAgZmlyc3ROYW1lOiBmaXJzdE5hbWUsXHJcbiAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZSxcclxuICAgICAgICAgICAgcGhvbmVOdW1iZXI6IHBob25lLFxyXG4gICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzLFxyXG4gICAgICAgICAgICB1c2VySWQ6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWN0T2JqZWN0O1xyXG4gICAgfVxyXG5cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjb250YWN0QnVpbGRlcjsiLCIvLyB0aGlzIG1vZHVsZSB3aWxsIGNhbGwgYXBpIHRvIGdldCBhbGwgY29udGFjdHMsIGFuZCB0byBhZGQgYW5vdGhlciBjb250YWN0XHJcblxyXG5jb25zdCBjb250YWN0TWFuYWdlciA9IHtcclxuICAgIGdldEFsbENvbnRhY3RzOiAoKSA9PiB7XHJcblxyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0c1wiKVxyXG4gICAgICAgICAgICAudGhlbihjb250YWN0cyA9PiBjb250YWN0cy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgZ2V0U2luZ2xlQ29udGFjdDogKGNvbnRhY3RJZCkgPT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0cy8ke2NvbnRhY3RJZH1gKVxyXG4gICAgICAgICAgICAudGhlbihjb250YWN0cyA9PiBjb250YWN0cy5qc29uKCkpXHJcbiAgICB9LFxyXG5cclxuICAgIGFkZENvbnRhY3Q6IChjb250YWN0T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29udGFjdE9iamVjdClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRVc2VyQ29udGFjdHM6ICh1c2VySWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0cz91c2VySWQ9JHt1c2VySWR9YClcclxuICAgICAgICAgICAgLnRoZW4oY29udGFjdHMgPT4gY29udGFjdHMuanNvbigpKVxyXG4gICAgfSxcclxuXHJcbiAgICBkZWxldGVDb250YWN0OiAoaWQpPT57XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHMvJHtpZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBlZGl0U2luZ2xlQ29udGFjdDogKGNvbnRhY3RPYmplY3QsIGlkKT0+e1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzLyR7aWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbnRhY3RPYmplY3QpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbnRhY3RNYW5hZ2VyO1xyXG4iLCJjb25zdCBjb250YWN0Rm9ybXMgPSB7XHJcblxyXG4gICAgbWFrZUNvbnRhY3RGb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtLWNvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPGgxPkNyZWF0ZSBhIE5ldyBDb250YWN0PC9oMT5cclxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJtYWtlLWNvbnRhY3RcIiB0eXBlPVwidGV4dFwiIG5hbWUgPSBcImZpcnN0TmFtZVwiIGlkPVwiZmlyc3QtbmFtZVwiIHBsYWNlaG9sZGVyPVwiRmlyc3QgTmFtZVwiPjxicj5cclxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJtYWtlLWNvbnRhY3RcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJsYXN0TmFtZVwiIGlkPVwibGFzdC1uYW1lXCIgcGxhY2Vob2xkZXI9XCJMYXN0IE5hbWVcIj48YnI+XHJcbiAgICAgICAgPGlucHV0IGNsYXNzPVwibWFrZS1jb250YWN0XCIgdHlwZT1cInRleHRcIiBuYW1lID1cInBob25lTnVtYmVyXCIsIGlkPVwicGhvbmUtbnVtYmVyXCIgcGxhY2Vob2xkZXI9XCJQaG9uZSBOdW1iZXJcIj48YnI+XHJcbiAgICAgICAgPGlucHV0IGNsYXNzPVwibWFrZS1jb250YWN0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwiYWRkcmVzc1wiIGlkPVwiYWRkcmVzc1wiIHBsYWNlaG9sZGVyPVwiQWRkcmVzc1wiPjxicj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzID0gXCJiaWctYnRuIGdyZWVuLWJ0blwiIHR5cGUgPSBcInN1Ym1pdFwiLCBpZD1cInN1Ym1pdC1idG5cIj5TdWJtaXQ8L2J1dHRvbj5gXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmVDb250YWN0Rm9ybTogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1jb250YWluZXJcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgfSxcclxuICAgIHJlbW92ZUNvbnRhY3RMaXN0OiAoKT0+e1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdC1oZWFkZXJcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdC1saXN0XCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIH0sXHJcbiAgICBtYWtlRWRpdENvbnRhY3RGb3JtOih1c2VySWQsIGNvbnRhY3RJZCwgc2luZ2xlQ29udGFjdCk9PntcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjdXNlci0ke3VzZXJJZH0tY29udGFjdC0ke2NvbnRhY3RJZH1gKS5pbm5lckhUTUw9XHJcbiAgICAgICAgYDxoNCBjbGFzcyA9IFwiZWRpdC1jb250YWN0LWxhYmVsXCIgPkVkaXQgeW91ciBDb250YWN0PGg0PlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWUgPSBcImZpcnN0TmFtZVwiIGlkPVwiZWRpdC1maXJzdC1uYW1lXCIgdmFsdWU9XCIke3NpbmdsZUNvbnRhY3QuZmlyc3ROYW1lfVwiPjxicj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibGFzdE5hbWVcIiBpZD1cImVkaXQtbGFzdC1uYW1lXCIgdmFsdWU9XCIke3NpbmdsZUNvbnRhY3QubGFzdE5hbWV9XCI+PGJyPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWUgPVwicGhvbmVOdW1iZXJcIiwgaWQ9XCJlZGl0LXBob25lLW51bWJlclwiIHZhbHVlPVwiJHtzaW5nbGVDb250YWN0LnBob25lTnVtYmVyfVwiPjxicj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiYWRkcmVzc1wiIGlkPVwiZWRpdC1hZGRyZXNzXCIgdmFsdWU9XCIke3NpbmdsZUNvbnRhY3QuYWRkcmVzc31cIj48YnI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcyA9IFwic20tYnRuIGdyZWVuLWJ0blwiIHR5cGUgPSBcInN1Ym1pdFwiLCBpZD1cInN1Ym1pdC1lZGl0LSR7Y29udGFjdElkfVwiPlN1Ym1pdDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3MgPSBcInNtLWJ0biByZWQtYnRuXCIgdHlwZSA9IFwic3VibWl0XCIsIGlkPVwiY2FuY2VsLWVkaXQtJHtjb250YWN0SWR9XCI+Q2FuY2VsPC9idXR0b24+YFxyXG5cclxuXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY29udGFjdEZvcm1zOyIsIi8vIHRoaXMgbW9kdWxlIHNob3VsZCBpbXBvcnQgZnJvbSBhcGlNYW5hZ2VyIChnZXQgZW1wbG95ZWVzKSBhbmQgbG9vcCB0aHJvdWdoIGFuZCBvcHRpb24gdG8gcHJpbnQgb25lIG9yIGFsbFxyXG4vL2V4cG9ydCBhbiBvYmplY3Qgd2l0aCBtZXRob2RzIChwcmludCBhbGwsIHByaW50IHNpbmdsZSlcclxuXHJcbmltcG9ydCBjb250YWN0TWFuYWdlciBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvbi5qc1wiXHJcbmltcG9ydCBjb250YWN0QnVpbGRlciBmcm9tIFwiLi9jb250YWN0LmpzXCJcclxuaW1wb3J0IHVzZXJNYW5hZ2VyIGZyb20gXCIuL3VzZXJDb2xsZWN0aW9uLmpzXCI7XHJcbmltcG9ydCBjb250YWN0Rm9ybXMgZnJvbSBcIi4vY29udGFjdEZvcm0uanNcIjtcclxuXHJcbmNvbnN0IHByaW50Q29udGFjdHMgPSB7XHJcblxyXG5wcmludEFsbENvbnRhY3RzOigpPT57XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdC1saXN0XCIpLmlubmVySFRNTD1cIlwiXHJcblxyXG5jb250YWN0TWFuYWdlci5nZXRBbGxDb250YWN0cygpXHJcbi50aGVuKChwYXJzZWRDb250YWN0cyk9PntcclxuY29uc29sZS5sb2cocGFyc2VkQ29udGFjdHMpXHJcbnBhcnNlZENvbnRhY3RzLmZvckVhY2goc2luZ2xlQ29udGFjdE9iamVjdD0+IHtcclxuICAgIGNvbnN0IGNvbnRhY3RIVE1MU3RyaW5nID0gY29udGFjdEJ1aWxkZXIuYnVpbGRDb250YWN0KHNpbmdsZUNvbnRhY3RPYmplY3QpXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtbGlzdFwiKS5pbm5lckhUTUwrPWNvbnRhY3RCdWlsZGVyLmJ1aWxkQ29udGFjdChzaW5nbGVDb250YWN0T2JqZWN0KVxyXG5cclxufSlcclxuXHJcbn0pXHJcbn0sXHJcbnByaW50VXNlckNvbnRhY3RzOigpPT57XHJcbiAgICBjb250YWN0Rm9ybXMucmVtb3ZlQ29udGFjdExpc3QoKTtcclxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuXHJcbiAgICB1c2VyTWFuYWdlci5nZXRTaW5nbGVVc2VyKFwiaWRcIiwgdXNlcklkKVxyXG4gICAgLnRoZW4oKHVzZXIpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnZXQgc2luZ2xlIHVzZXJcIiwgdXNlcilcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtaGVhZGVyXCIpLmlubmVySFRNTD1gJHt1c2VyWzBdLmZpcnN0TmFtZX0gJHt1c2VyWzBdLmxhc3ROYW1lfSdzIGNvbnRhY3RzYFxyXG4gICAgfSlcclxuICAgIGNvbnRhY3RNYW5hZ2VyLmdldFVzZXJDb250YWN0cyh1c2VySWQpXHJcbiAgICAudGhlbigocGFyc2VkQ29udGFjdHMpPT57XHJcbiAgICBjb25zb2xlLmxvZyhwYXJzZWRDb250YWN0cylcclxuXHJcbiAgICBwYXJzZWRDb250YWN0cy5mb3JFYWNoKHNpbmdsZUNvbnRhY3RPYmplY3Q9PiB7XHJcbiAgICAgICAgY29uc3QgY29udGFjdEhUTUxTdHJpbmcgPSBjb250YWN0QnVpbGRlci5idWlsZENvbnRhY3Qoc2luZ2xlQ29udGFjdE9iamVjdClcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtbGlzdFwiKS5pbm5lckhUTUwrPWNvbnRhY3RCdWlsZGVyLmJ1aWxkQ29udGFjdChzaW5nbGVDb250YWN0T2JqZWN0KVxyXG5cclxuICAgIH0pXHJcblxyXG4gICAgfSlcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpbnRDb250YWN0czsiLCJpbXBvcnQgdXNlckZvcm1zIGZyb20gXCIuL3VzZXJGb3Jtcy5qc1wiXHJcbmltcG9ydCBjb250YWN0Rm9ybXMgZnJvbSBcIi4vY29udGFjdEZvcm0uanNcIlxyXG5pbXBvcnQgcHJpbnRDb250YWN0cyBmcm9tIFwiLi9jb250YWN0TGlzdC5qc1wiXHJcblxyXG5cclxuY29uc3QgbG9naW5NYW5hZ2VyID17XHJcblxyXG4gICAgdmVyaWZ5UGFzc3dvcmQ6ICh1c2VyLCBwYXNzd29yZCk9PntcclxuICAgICAgICBpZihwYXNzd29yZD09PXVzZXJbMF0ucGFzc3dvcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBhc3N3b3JkIG1hdGNoZWRcIilcclxuICAgICAgICAgICAgdXNlckZvcm1zLm1ha2VMb2dvdXRGb3JtKCk7XHJcbiAgICAgICAgICAgIC8vIHVzZXJGb3Jtcy5yZW1vdmVSZWdpc3RlckZvcm0oKTtcclxuICAgICAgICAgICAgY29udGFjdEZvcm1zLm1ha2VDb250YWN0Rm9ybSgpO1xyXG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwidXNlcklkXCIsIHVzZXJbMF0uaWQpXHJcbiAgICAgICAgICAgIHByaW50Q29udGFjdHMucHJpbnRVc2VyQ29udGFjdHModXNlclswXS5pZClcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXNlciBsb2dnZWQgaW5cIiwgdXNlclswXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwYXNzd29yZCBkaWQgbm90IG1hdGNoXCIpXHJcbiAgICAgICAgICAgIHdpbmRvdy5hbGVydChcIlBhc3N3b3JkIGlzIGluY29ycmVjdCEhICBUcnkgYWdhaW5cIilcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY29uZmlybVBhc3N3b3JkOiAocGFzc3dvcmQxLCBwYXNzd29yZDIpPT57XHJcbiAgICAgICAgaWYocGFzc3dvcmQxPT09cGFzc3dvcmQyKXtcclxuICAgICAgICAgICAgc2luZ2xlSWQ9c2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKVxyXG4gICAgICAgIHVzZXJNYW5hZ2VyLnVwZGF0ZVBhc3N3b3JkKHBhc3N3b3JkMSwgc2luZ2xlSWQpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICB2ZXJpZnlVc2VyTmFtZTogKHVzZXIsIHVzZXJOYW1lKT0+e1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbG9naW5NYW5hZ2VyO1xyXG4iLCJpbXBvcnQgY29udGFjdEZvcm1zIGZyb20gXCIuL2NvbnRhY3RGb3JtXCJcclxuaW1wb3J0IHByaW50Q29udGFjdHMgZnJvbSBcIi4vY29udGFjdExpc3QuanNcIlxyXG5pbXBvcnQgY29udGFjdE1hbmFnZXIgZnJvbSBcIi4vY29udGFjdENvbGxlY3Rpb24uanNcIlxyXG5pbXBvcnQgY29udGFjdEJ1aWxkZXIgZnJvbSBcIi4vY29udGFjdC5qc1wiXHJcbmltcG9ydCB1c2VyRm9ybXMgZnJvbSBcIi4vdXNlckZvcm1zLmpzXCI7XHJcbmltcG9ydCB1c2VyTWFuYWdlciBmcm9tIFwiLi91c2VyQ29sbGVjdGlvbi5qc1wiXHJcbmltcG9ydCB1c2VyQnVpbGRlciBmcm9tIFwiLi91c2VyLmpzXCJcclxuaW1wb3J0IGxvZ2luTWFuYWdlciBmcm9tIFwiLi9sb2dpbk1hbmFnZXIuanNcIlxyXG5cclxuLy8gcHJpbnRDb250YWN0cy5wcmludEFsbENvbnRhY3RzKCk7XHJcblxyXG5cclxudXNlckZvcm1zLm1ha2VMb2dpbkZvcm0oKTtcclxuXHJcbi8vQWRkIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBjb250YWN0IGJ1dHRvbiB0byBzYXZlIGEgY29udGFjdCBhbmQgcG9zdCB0byBKU09OXHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm0tY29udGFpbmVyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJzdWJtaXQtYnRuXCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZpcnN0LW5hbWVcIikudmFsdWVcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYXN0LW5hbWVcIikudmFsdWVcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFkZHJlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZHJlc3NcIikudmFsdWVcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBob25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwaG9uZS1udW1iZXJcIikudmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250YWN0T2JqZWN0ID0gY29udGFjdEJ1aWxkZXIuYnVpbGRDb250YWN0T2JqZWN0KGZpcnN0TmFtZSwgbGFzdE5hbWUsIHBob25lLCBhZGRyZXNzKVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRhY3RNYW5hZ2VyLmFkZENvbnRhY3QoY29udGFjdE9iamVjdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocHJpbnRDb250YWN0cy5wcmludFVzZXJDb250YWN0cylcclxuICAgICAgICB9XHJcbn0pXHJcbi8vQWRkIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSByZWdpc3RlciBidXR0b24gdG8gcmVnaXN0ZXIgYSBuZXcgdXNlclxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyLWNvbnRhaW5lclwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwicmVnaXN0ZXItYnRuXCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXItZmlyc3QtbmFtZVwiKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXItbGFzdC1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXNzd29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1wYXNzd29yZFwiKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgdXNlck1hbmFnZXIuZ2V0U2luZ2xlVXNlcihcInVzZXJOYW1lXCIsIHVzZXJOYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoc2luZ2xlVXNlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaW5nbGVVc2VyLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9CdWlsZCBhbiBvYmplY3QgdG8gcmVwcmVzZW50IHRoZSB1c2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1c2VyT2JqZWN0ID0gdXNlckJ1aWxkZXIuYnVpbGRVc2VyT2JqZWN0KGZpcnN0TmFtZSwgbGFzdE5hbWUsIHVzZXJOYW1lLCBwYXNzd29yZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vTWFrZSBBUEkgY2FsbCBhbmQgYWRkIHVzZXIgdG8gZGF0YWJhc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJNYW5hZ2VyLmFkZFVzZXIodXNlck9iamVjdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odXNlciA9PiB1c2VyLmpzb24oKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHVzZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBqdXN0IGFkZGVkIGEgdXNlciFcIiwgdXNlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwidXNlcklkXCIsIHVzZXIuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdEZvcm1zLm1ha2VDb250YWN0Rm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJGb3Jtcy5tYWtlTG9nb3V0Rm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdC1saXN0XCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyRm9ybXMucmVtb3ZlUmVnaXN0ZXJGb3JtKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JZiB1c2VybmFtZSBpcyBhbHJlYWR5IGluIHRoZSBkYXRhYmFzZSwgd2luZG93IGFsZXJ0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KFwiVGhlIHVzZXJuYW1lIGhhcyBhbHJlYWR5IGJlZW4gYXNzaWduZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1cclxufSlcclxuLy9FdmVudCBsaXN0ZW5lciBvbiB0aGUgbG9naW4gY29udGFpbmVyXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tY29udGFpbmVyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgb24gdGhlIGxvZ2luIGJ1dHRvbiB0byBsb2cgaW4gYSB1c2VyIGFuZCBzdG9yZSB0aGVpciB1c2VySUQgaW4gdGhlIHNlc3Npb25cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcInNob3ctcmVnaXN0ZXItYnRuXCIpIHtcclxuICAgICAgICAgICAgICAgIHVzZXJGb3Jtcy5tYWtlUmVnaXN0ZXJGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICB1c2VyRm9ybXMucmVtb3ZlTG9naW5Gb3JtKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcImxvZ2luLWJ0blwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1sb2dpbi1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXNzd29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1sb2dpbi1wYXNzd29yZFwiKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codXNlck1hbmFnZXIuZ2V0U2luZ2xlVXNlcihcInVzZXJOYW1lXCIsIHVzZXJOYW1lKSlcclxuICAgICAgICAgICAgICAgIC8vQ2hlY2sgdG8gc2VlIGlmIHVzZXIgZXhpc3RzIGluIHRoZSBkYXRhYmFzZVxyXG4gICAgICAgICAgICAgICAgdXNlck1hbmFnZXIuZ2V0U2luZ2xlVXNlcihcInVzZXJOYW1lXCIsIHVzZXJOYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoc2luZ2xlVXNlcikgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2luZ2xlVXNlci5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIHVzZXJuYW1lIG9mXCIsIHVzZXJOYW1lLCBcIndhcyB2ZXJpZmllZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JZiB1c2VybmFtZSBleGlzdHMsIG1vdmUgb24gdG8gdmVyaWZ5aW5nIHRoZSBwYXNzd29yZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9naW5NYW5hZ2VyLnZlcmlmeVBhc3N3b3JkKHNpbmdsZVVzZXIsIHBhc3N3b3JkKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0lmIHVzZXJuYW1lIGRvZXMgbm90IGV4aXN0LCBnaXZlIGFsZXJ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJ0aGF0IHVzZXJuYW1lIGRvZXMgbm90IGV4aXN0IGluIHRoZSBkYXRhYmFzZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9ldmVudCBsaXN0ZW5lciBvbiB0aGUgbG9nb3V0IGJ1dHRvbiB0byByZW1vdmUgYSB1c2VySUQgZnJvbSBzZXNzaW9uIHN0b3JhZ2UgYW5kIGNsZWFyIGNvbnRhY3RzXHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJsb2dvdXQtYnRuXCIpIHtcclxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKFwidXNlcklkXCIpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXIgaWQgY2xlYXJlZFwiKVxyXG4gICAgICAgICAgICAgICAgdXNlckZvcm1zLm1ha2VMb2dpbkZvcm0oKVxyXG4gICAgICAgICAgICAgICAgY29udGFjdEZvcm1zLnJlbW92ZUNvbnRhY3RMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICBjb250YWN0Rm9ybXMucmVtb3ZlQ29udGFjdEZvcm0oKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwidXBkYXRlLWJ0blwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgY2xpY2tlZCB0aGUgdXBkYXRlIGJ1dHRvblwiKVxyXG4gICAgICAgICAgICAgICAgdXNlck1hbmFnZXIuZ2V0U2luZ2xlVXNlcihcImlkXCIsIHVzZXJJZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHNpbmdsZVVzZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNpbmdsZSB1c2VyIGluc2lkZSB1cGRhdGVcIiwgc2luZ2xlVXNlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyRm9ybXMubWFrZVBhc3N3b3JkQ2hhbmdlRm9ybShzaW5nbGVVc2VyWzBdLnVzZXJOYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3RGb3Jtcy5yZW1vdmVDb250YWN0Rm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3RGb3Jtcy5yZW1vdmVDb250YWN0TGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcImNoYW5nZS1wYXNzd29yZC1idG5cIikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgY2xpY2tlZCB0aGUgYnV0dG9uIHRvIGNoYW5nZSB5b3VyIHBhc3N3b3JkXCIpXHJcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXNzd29yZDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXItY2hhbmdlLXBhc3N3b3JkMVwiKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFzc3dvcmQyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyLWNoYW5nZS1wYXNzd29yZDJcIikudmFsdWVcclxuICAgICAgICAgICAgICAgIGlmIChwYXNzd29yZDEgPT09IHBhc3N3b3JkMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXRjaE9iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJNYW5hZ2VyLnVwZGF0ZVBhc3N3b3JkKHBhdGNoT2JqZWN0LCB1c2VySWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChcIllvdXIgcGFzc3dvcmQgd2FzIHN1Y2Nlc3NmdWxseSBjaGFuZ2VkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJGb3Jtcy5tYWtlTG9nb3V0Rm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0Rm9ybXMubWFrZUNvbnRhY3RGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW50Q29udGFjdHMucHJpbnRVc2VyQ29udGFjdHModXNlcklkKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChcIlRoZSBwYXNzd29yZHMgZG8gbm90IG1hdGNoXCIpXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbn0pXHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtbGlzdFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilcclxuICAgICAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpXHJcblxyXG4gICAgICAgIGlmICh0YXJnZXRbMF0gPT09IFwiZGVsZXRlXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhY3RJZD10YXJnZXRbMl1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGNsaWNrZWQgdGhlXCIsIHRhcmdldCwgXCJidXR0b25cIilcclxuICAgICAgICAgICAgICAgIGNvbnRhY3RNYW5hZ2VyLmRlbGV0ZUNvbnRhY3QoY29udGFjdElkKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHByaW50Q29udGFjdHMucHJpbnRVc2VyQ29udGFjdHMpKVxyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGFyZ2V0WzBdID09PSBcImVkaXRcIil7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250YWN0SWQ9dGFyZ2V0WzJdXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBjbGlja2VkIHRoZVwiLCB0YXJnZXQsIFwiYnV0dG9uXCIpXHJcblxyXG4gICAgICAgICAgICAgICAgY29udGFjdE1hbmFnZXIuZ2V0U2luZ2xlQ29udGFjdChjb250YWN0SWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoc2luZ2xlQ29udGFjdCk9PntcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3RGb3Jtcy5tYWtlRWRpdENvbnRhY3RGb3JtKHVzZXJJZCwgY29udGFjdElkLCBzaW5nbGVDb250YWN0KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0YXJnZXRbMF0gPT09IFwic3VibWl0XCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhY3RJZD10YXJnZXRbMl1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGNsaWNrZWQgdGhlXCIsIHRhcmdldCwgXCJidXR0b25cIilcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1maXJzdC1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1sYXN0LW5hbWVcIikudmFsdWVcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBob25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LXBob25lLW51bWJlclwiKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgYWRkcmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1hZGRyZXNzXCIpLnZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFjdE9iamVjdD1jb250YWN0QnVpbGRlci5idWlsZENvbnRhY3RPYmplY3QoZmlyc3ROYW1lLCBsYXN0TmFtZSwgcGhvbmUsIGFkZHJlc3MpXHJcblxyXG4gICAgICAgICAgICAgICAgY29udGFjdE1hbmFnZXIuZWRpdFNpbmdsZUNvbnRhY3QoY29udGFjdE9iamVjdCwgY29udGFjdElkKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocHJpbnRDb250YWN0cy5wcmludFVzZXJDb250YWN0cylcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0YXJnZXRbMF0gPT09IFwiY2FuY2VsXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGNsaWNrZWQgdGhlXCIsIHRhcmdldCwgXCJidXR0b25cIilcclxuICAgICAgICAgICAgICAgIHByaW50Q29udGFjdHMucHJpbnRVc2VyQ29udGFjdHMoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG59KVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCIvL2NyZWF0ZXMgSFRNTCBzdHJpbmcgZm9yIGEgc2luZ2xlIGVtcGxveWVlLCBvciBhbiBvYmplY3Qgd2hlbiB0aGVyZSBpcyBhIG5ldyBpbnB1dGZyb20gdGhlIGZvcm1cclxuXHJcblxyXG5jb25zdCB1c2VyQnVpbGRlciA9e1xyXG4gICAgYnVpbGRVc2VyOiAoc2luZ2xlVXNlcikgPT57XHJcblxyXG4gICAgICAgIHJldHVybiBgPGRpdj5cclxuICAgICAgICA8aDM+JHtzaW5nbGVVc2VyLmZpcnN0TmFtZX0gJHtzaW5nbGVVc2VyLmxhc3ROYW1lfTwvaDM+XHJcbiAgICAgICAgPHA+JHtzaW5nbGVVc2VyLnVzZXJOYW1lfTwvcD5cclxuICAgICAgICA8cD4ke3NpbmdsZVVzZXIucGFzc3dvcmR9PC9wPlxyXG4gICAgICAgIDwvZGl2PmBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGJ1aWxkVXNlck9iamVjdDogKGZpcnN0TmFtZSwgbGFzdE5hbWUsIHVzZXJOYW1lLCBwYXNzd29yZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJPYmplY3QgPSB7XHJcblxyXG4gICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSxcclxuICAgICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lLFxyXG4gICAgICAgICAgICB1c2VyTmFtZTogdXNlck5hbWUsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHVzZXJPYmplY3Q7XHJcbiAgICB9XHJcblxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHVzZXJCdWlsZGVyOyIsIi8vIFRoaXMgbW9kdWxlIHdpbGwgbWFuYWdlIHRoZSB1c2VyIGRhdGFiYXNlXHJcblxyXG5jb25zdCB1c2VyTWFuYWdlciA9IHtcclxuICAgIGdldEFsbFVzZXJzOiAoKSA9PiB7XHJcblxyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiKVxyXG4gICAgICAgICAgICAudGhlbih1c2VycyA9PiB1c2Vycy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgYWRkVXNlcjogKHVzZXJPYmplY3QpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VyT2JqZWN0KVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZ2V0U2luZ2xlVXNlcjoodXNlcktleSwgdXNlclZhbHVlKT0+e1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzPyR7dXNlcktleX09JHt1c2VyVmFsdWV9YClcclxuICAgICAgICAgICAgLnRoZW4odXNlcnMgPT4gdXNlcnMuanNvbigpKVxyXG4gICAgfSxcclxuICAgIHVwZGF0ZVBhc3N3b3JkOihwYXRjaE9iamVjdCwgaWQpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzLyR7aWR9YCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXRjaE9iamVjdClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXNlck1hbmFnZXI7XHJcblxyXG4iLCJjb25zdCB1c2VyRm9ybXMgPSB7XHJcblxyXG4gICAgbWFrZVJlZ2lzdGVyRm9ybTogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXItY29udGFpbmVyXCIpLmlubmVySFRNTCA9IGA8aDE+UGxlYXNlIFJlZ2lzdGVyOjwvaDE+XHJcbiAgICAgICAgPGlucHV0IGNsYXNzPVwicmVnaXN0ZXItaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJ1c2VyRmlyc3ROYW1lXCIgaWQ9XCJ1c2VyLWZpcnN0LW5hbWVcIiBwbGFjZWhvbGRlcj1cIkZpcnN0IE5hbWVcIj48L2lucHV0PiA8YnI+XHJcbiAgICAgICAgPGlucHV0IGNsYXNzPVwicmVnaXN0ZXItaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJ1c2VyTGFzdE5hbWVcIiBpZD1cInVzZXItbGFzdC1uYW1lXCIgcGxhY2Vob2xkZXI9XCJMYXN0IE5hbWVcIj48YnI+XHJcbiAgICAgICAgPGlucHV0IGNsYXNzPVwicmVnaXN0ZXItaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJ1c2VyTmFtZVwiIGlkPVwidXNlci1uYW1lXCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiPjxicj5cclxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJyZWdpc3Rlci1pbnB1dFwiIHR5cGU9XCJwYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIGlkPVwidXNlci1wYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIj48YnI+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwicmVnaXN0ZXJcIiBjbGFzcyA9IFwiYmlnLWJ0biBncmVlbi1idG5cIiBpZD1cInJlZ2lzdGVyLWJ0blwiPnJlZ2lzdGVyPC9idXR0b24+YFxyXG4gICAgfSxcclxuICAgIG1ha2VMb2dpbkZvcm06ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBgPGgxPldlbGNvbWUhPC9oMT5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidXNlck5hbWVcIiBpZD1cInVzZXItbG9naW4tbmFtZVwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgVXNlcm5hbWVcIj48YnI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIGlkPVwidXNlci1sb2dpbi1wYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgUGFzc3dvcmRcIj48YnI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcyA9IFwiYmlnLWJ0biBncmVlbi1idG5cIiB0eXBlPVwic3VibWl0XCIgaWQ9XCJsb2dpbi1idG5cIj5sb2dpbjwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3MgPSBcImJpZy1idG4gZ3JlZW4tYnRuXCIgdHlwZT1cInN1Ym1pdFwiIGlkPVwic2hvdy1yZWdpc3Rlci1idG5cIj5yZWdpc3RlcjwvYnV0dG9uPmBcclxuICAgIH0sXHJcbiAgICByZW1vdmVMb2dpbkZvcm06KCk9PntcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRhaW5lclwiKS5pbm5lckhUTUwgPVwiXCJcclxuICAgIH0sXHJcbiAgICBtYWtlTG9nb3V0Rm9ybTogKCkgPT4ge1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRhaW5lclwiKS5pbm5lckhUTUwgPVxyXG4gICAgICAgIGA8YnV0dG9uIGNsYXNzID0gXCJiaWctYnRuIGdyZWVuLWJ0blwiIHR5cGU9XCJzdWJtaXRcIiBpZD1cImxvZ291dC1idG5cIj5sb2dvdXQ8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzID0gXCJiaWctYnRuIGJsdWUtYnRuXCIgdHlwZT1cInN1Ym1pdFwiIGlkPVwidXBkYXRlLWJ0blwiPmNoYW5nZSBwYXNzd29yZDwvYnV0dG9uPmBcclxuXHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlUmVnaXN0ZXJGb3JtOigpPT57XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3Rlci1jb250YWluZXJcIikuaW5uZXJIVE1MPVwiXCJcclxuICAgIH0sXHJcbiAgICBtYWtlUGFzc3dvcmRDaGFuZ2VGb3JtOih1c2VyTmFtZSk9PntcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1jb250YWluZXJcIikuaW5uZXJIVE1MPVxyXG4gICAgICAgIGA8aDE+Q2hhbmdlIFlvdXIgUGFzc3dvcmQ8L2gxPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ1c2VyTmFtZVwiIGlkPVwidXNlci1jaGFuZ2UtbmFtZVwiIHZhbHVlPVwiJHt1c2VyTmFtZX1cIj48YnI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInBhc3N3b3JkXCIgaWQ9XCJ1c2VyLWNoYW5nZS1wYXNzd29yZDFcIiBwbGFjZWhvbGRlcj1cIkVudGVyIFBhc3N3b3JkXCI+PGJyPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJwYXNzd29yZFwiIGlkPVwidXNlci1jaGFuZ2UtcGFzc3dvcmQyXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBQYXNzd29yZCBBZ2FpblwiPjxicj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzID0gXCJiaWctYnRuIGdyZWVuLWJ0blwiIHR5cGU9XCJzdWJtaXRcIiBpZD1cImNoYW5nZS1wYXNzd29yZC1idG5cIj5zdWJtaXQ8L2J1dHRvbj5cclxuICAgICAgICBgXHJcbiAgICB9XHJcblxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHVzZXJGb3JtcztcclxuXHJcbiJdfQ==
