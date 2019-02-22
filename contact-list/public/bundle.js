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
        <button id ="edit-contact-${singleContact.id}" type = "submit">edit</button>
        <button id ="delete-contact-${singleContact.id}" type = "submit">delete</button>
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
  },
  deleteContact: id => {
    return fetch(`http://localhost:8088/contacts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactObject)
    });
  },
  editContact: (contactObject, id) => {
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
  if (event.target.id === "login-btn") {
    const userName = document.querySelector("#user-login-name").value;
    const password = document.querySelector("#user-login-password").value;
    console.log(_userCollection.default.getSingleUser("userName", userName)); //Check to see if user exists in the database

    _userCollection.default.getSingleUser("userName", userName).then(singleUser => {
      if (singleUser.length === 1) {
        console.log("The username of", userName, "was verified"); //If username exists, move on to verifying the password

        _loginManager.default.verifyPassword(singleUser, password);

        _userForms.default.makeLogoutForm();

        _userForms.default.removeRegisterForm();

        _contactForm.default.makeContactForm();
      } else {
        //If username does not exist, give alert
        window.alert("that username does not exist in the database");
      }
    });
  } //event listener on the logout button to remove a userID from session storage and clear contacts


  if (event.target.id === "logout-btn") {
    sessionStorage.clear("userId");
    console.log("user id cleared");

    _userForms.default.makeRegisterForm();

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

  document.querySelector("#contact-list").addEventListener("click", () => {
    const target = event.target.id.split("-")[0];
    const contactId = event.target.id.split("-")[2];
    console.log("you clicked the button");
  });
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
        </fieldset>`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL2xvZ2luTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvdXNlci5qcyIsIi4uL3NjcmlwdHMvdXNlckNvbGxlY3Rpb24uanMiLCIuLi9zY3JpcHRzL3VzZXJGb3Jtcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBR0EsTUFBTSxjQUFjLEdBQUU7QUFDbEIsRUFBQSxZQUFZLEVBQUcsYUFBRCxJQUFrQjtBQUM1QixVQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QixDQUFmO0FBQ0EsV0FBUSxpQkFBZ0IsTUFBTyxZQUFXLGFBQWEsQ0FBQyxFQUFHO2NBQ3JELGFBQWEsQ0FBQyxTQUFVLElBQUcsYUFBYSxDQUFDLFFBQVM7YUFDbkQsYUFBYSxDQUFDLFdBQVk7YUFDMUIsYUFBYSxDQUFDLE9BQVE7b0NBQ0MsYUFBYSxDQUFDLEVBQUc7c0NBQ2YsYUFBYSxDQUFDLEVBQUc7ZUFML0M7QUFRSCxHQVhpQjtBQWFsQixFQUFBLGtCQUFrQixFQUFFLENBQUMsU0FBRCxFQUFZLFFBQVosRUFBc0IsS0FBdEIsRUFBNkIsT0FBN0IsS0FBeUM7QUFDekQsVUFBTSxhQUFhLEdBQUc7QUFFbEIsTUFBQSxTQUFTLEVBQUUsU0FGTztBQUdsQixNQUFBLFFBQVEsRUFBRSxRQUhRO0FBSWxCLE1BQUEsV0FBVyxFQUFFLEtBSks7QUFLbEIsTUFBQSxPQUFPLEVBQUUsT0FMUztBQU1sQixNQUFBLE1BQU0sRUFBRSxjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QjtBQU5VLEtBQXRCO0FBU0EsV0FB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LE9BRHNDO0FBRTlDLE1BQUEsT0FBTyxFQUFFO0FBQ0wsd0JBQWdCO0FBRFgsT0FGcUM7QUFLOUMsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxXQUFmO0FBTHdDLEtBQXRDLENBQVo7QUFPSDtBQTNCVyxDQUFwQjtlQWlDZSxXOzs7Ozs7Ozs7O0FDbkNmLE1BQU0sU0FBUyxHQUFHO0FBRWQsRUFBQSxnQkFBZ0IsRUFBRSxNQUFNO0FBQ3BCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIscUJBQXZCLEVBQThDLFNBQTlDLEdBQTJEOzs7OzsrRUFBM0Q7QUFNSCxHQVRhO0FBVWQsRUFBQSxhQUFhLEVBQUUsTUFBTTtBQUNqQixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGtCQUF2QixFQUEyQyxTQUEzQyxHQUF3RDs7OztvQkFBeEQ7QUFLSCxHQWhCYTtBQWlCZCxFQUFBLGNBQWMsRUFBRSxNQUFNO0FBRWxCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsa0JBQXZCLEVBQTJDLFNBQTNDLEdBQ0M7dUVBREQ7QUFJSCxHQXZCYTtBQXdCZCxFQUFBLGtCQUFrQixFQUFDLE1BQUk7QUFDbkIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixxQkFBdkIsRUFBOEMsU0FBOUMsR0FBd0QsRUFBeEQ7QUFDSCxHQTFCYTtBQTJCZCxFQUFBLHNCQUFzQixFQUFFLFFBQUQsSUFBWTtBQUUvQixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGtCQUF2QixFQUEyQyxTQUEzQyxHQUNDOzBFQUNpRSxRQUFTOzs7O29CQUYzRTtBQU9IO0FBcENhLENBQWxCO2VBdUNlLFMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvL2NyZWF0ZXMgSFRNTCBzdHJpbmcgZm9yIGEgc2luZ2xlIGVtcGxveWVlLCBvciBhbiBvYmplY3Qgd2hlbiB0aGVyZSBpcyBhIG5ldyBpbnB1dGZyb20gdGhlIGZvcm1cclxuXHJcblxyXG5jb25zdCBjb250YWN0QnVpbGRlciA9e1xyXG4gICAgYnVpbGRDb250YWN0OiAoc2luZ2xlQ29udGFjdCkgPT57XHJcbiAgICAgICAgY29uc3QgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKVxyXG4gICAgICAgIHJldHVybiBgPGRpdiBpZD1cInVzZXItJHt1c2VySWR9LWNvbnRhY3QtJHtzaW5nbGVDb250YWN0LmlkfVwiPlxyXG4gICAgICAgIDxoMz4ke3NpbmdsZUNvbnRhY3QuZmlyc3ROYW1lfSAke3NpbmdsZUNvbnRhY3QubGFzdE5hbWV9PC9oMz5cclxuICAgICAgICA8cD4ke3NpbmdsZUNvbnRhY3QucGhvbmVOdW1iZXJ9PC9wPlxyXG4gICAgICAgIDxwPiR7c2luZ2xlQ29udGFjdC5hZGRyZXNzfTwvcD5cclxuICAgICAgICA8YnV0dG9uIGlkID1cImVkaXQtY29udGFjdC0ke3NpbmdsZUNvbnRhY3QuaWR9XCIgdHlwZSA9IFwic3VibWl0XCI+ZWRpdDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gaWQgPVwiZGVsZXRlLWNvbnRhY3QtJHtzaW5nbGVDb250YWN0LmlkfVwiIHR5cGUgPSBcInN1Ym1pdFwiPmRlbGV0ZTwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PmBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGJ1aWxkQ29udGFjdE9iamVjdDogKGZpcnN0TmFtZSwgbGFzdE5hbWUsIHBob25lLCBhZGRyZXNzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udGFjdE9iamVjdCA9IHtcclxuXHJcbiAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lLFxyXG4gICAgICAgICAgICBsYXN0TmFtZTogbGFzdE5hbWUsXHJcbiAgICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZSxcclxuICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyxcclxuICAgICAgICAgICAgdXNlcklkOiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29udGFjdE9iamVjdDtcclxuICAgIH1cclxuXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY29udGFjdEJ1aWxkZXI7IiwiLy8gdGhpcyBtb2R1bGUgd2lsbCBjYWxsIGFwaSB0byBnZXQgYWxsIGNvbnRhY3RzLCBhbmQgdG8gYWRkIGFub3RoZXIgY29udGFjdFxyXG5cclxuY29uc3QgY29udGFjdE1hbmFnZXIgPSB7XHJcbiAgICBnZXRBbGxDb250YWN0czogKCkgPT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIilcclxuICAgICAgICAgICAgLnRoZW4oY29udGFjdHMgPT4gY29udGFjdHMuanNvbigpKVxyXG4gICAgfSxcclxuXHJcbiAgICBhZGRDb250YWN0OiAoY29udGFjdE9iamVjdCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0c1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbnRhY3RPYmplY3QpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0VXNlckNvbnRhY3RzOiAodXNlcklkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHM/dXNlcklkPSR7dXNlcklkfWApXHJcbiAgICAgICAgICAgIC50aGVuKGNvbnRhY3RzID0+IGNvbnRhY3RzLmpzb24oKSlcclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlQ29udGFjdDogKGlkKT0+e1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzLyR7aWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbnRhY3RPYmplY3QpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgZWRpdENvbnRhY3Q6IChjb250YWN0T2JqZWN0LCBpZCk9PntcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0cy8ke2lkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb250YWN0T2JqZWN0KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb250YWN0TWFuYWdlcjtcclxuIiwiY29uc3QgY29udGFjdEZvcm1zID0ge1xyXG5cclxuICAgIG1ha2VDb250YWN0Rm9ybTogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1jb250YWluZXJcIikuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxsZWdlbmQ+Q3JlYXRlIGEgTmV3IENvbnRhY3Q8L2xlZ2VuZD5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lID0gXCJmaXJzdE5hbWVcIiBpZD1cImZpcnN0LW5hbWVcIiBwbGFjZWhvbGRlcj1cIkZpcnN0IE5hbWVcIj48YnI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImxhc3ROYW1lXCIgaWQ9XCJsYXN0LW5hbWVcIiBwbGFjZWhvbGRlcj1cIkxhc3QgTmFtZVwiPjxicj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lID1cInBob25lTnVtYmVyXCIsIGlkPVwicGhvbmUtbnVtYmVyXCIgcGxhY2Vob2xkZXI9XCJQaG9uZSBOdW1iZXJcIj48YnI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImFkZHJlc3NcIiBpZD1cImFkZHJlc3NcIiBwbGFjZWhvbGRlcj1cIkFkZHJlc3NcIj48YnI+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlID0gXCJzdWJtaXRcIiwgaWQ9XCJzdWJtaXQtYnRuXCI+U3VibWl0PC9idXR0b24+YFxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlQ29udGFjdEZvcm06ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm0tY29udGFpbmVyXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIH0sXHJcbiAgICByZW1vdmVDb250YWN0TGlzdDogKCk9PntcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtbGlzdFwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY29udGFjdEZvcm1zOyIsIi8vIHRoaXMgbW9kdWxlIHNob3VsZCBpbXBvcnQgZnJvbSBhcGlNYW5hZ2VyIChnZXQgZW1wbG95ZWVzKSBhbmQgbG9vcCB0aHJvdWdoIGFuZCBvcHRpb24gdG8gcHJpbnQgb25lIG9yIGFsbFxyXG4vL2V4cG9ydCBhbiBvYmplY3Qgd2l0aCBtZXRob2RzIChwcmludCBhbGwsIHByaW50IHNpbmdsZSlcclxuXHJcbmltcG9ydCBjb250YWN0TWFuYWdlciBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvbi5qc1wiXHJcbmltcG9ydCBjb250YWN0QnVpbGRlciBmcm9tIFwiLi9jb250YWN0LmpzXCJcclxuaW1wb3J0IHVzZXJNYW5hZ2VyIGZyb20gXCIuL3VzZXJDb2xsZWN0aW9uLmpzXCI7XHJcblxyXG5jb25zdCBwcmludENvbnRhY3RzID0ge1xyXG5cclxucHJpbnRBbGxDb250YWN0czooKT0+e1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtbGlzdFwiKS5pbm5lckhUTUw9XCJcIlxyXG5cclxuY29udGFjdE1hbmFnZXIuZ2V0QWxsQ29udGFjdHMoKVxyXG4udGhlbigocGFyc2VkQ29udGFjdHMpPT57XHJcbmNvbnNvbGUubG9nKHBhcnNlZENvbnRhY3RzKVxyXG5wYXJzZWRDb250YWN0cy5mb3JFYWNoKHNpbmdsZUNvbnRhY3RPYmplY3Q9PiB7XHJcbiAgICBjb25zdCBjb250YWN0SFRNTFN0cmluZyA9IGNvbnRhY3RCdWlsZGVyLmJ1aWxkQ29udGFjdChzaW5nbGVDb250YWN0T2JqZWN0KVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWxpc3RcIikuaW5uZXJIVE1MKz1jb250YWN0QnVpbGRlci5idWlsZENvbnRhY3Qoc2luZ2xlQ29udGFjdE9iamVjdClcclxuXHJcbn0pXHJcblxyXG59KVxyXG59LFxyXG5wcmludFVzZXJDb250YWN0czooKT0+e1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWxpc3RcIikuaW5uZXJIVE1MPVwiXCJcclxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuXHJcbiAgICB1c2VyTWFuYWdlci5nZXRTaW5nbGVVc2VyKFwiaWRcIiwgdXNlcklkKVxyXG4gICAgLnRoZW4oKHVzZXIpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnZXQgc2luZ2xlIHVzZXJcIiwgdXNlcilcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtbGlzdFwiKS5pbm5lckhUTUw9YDxoMT4ke3VzZXJbMF0uZmlyc3ROYW1lfSAke3VzZXJbMF0ubGFzdE5hbWV9J3MgQ29udGFjdHM8L2gxPmBcclxuICAgIH0pXHJcbiAgICBjb250YWN0TWFuYWdlci5nZXRVc2VyQ29udGFjdHModXNlcklkKVxyXG4gICAgLnRoZW4oKHBhcnNlZENvbnRhY3RzKT0+e1xyXG4gICAgY29uc29sZS5sb2cocGFyc2VkQ29udGFjdHMpXHJcblxyXG4gICAgcGFyc2VkQ29udGFjdHMuZm9yRWFjaChzaW5nbGVDb250YWN0T2JqZWN0PT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RIVE1MU3RyaW5nID0gY29udGFjdEJ1aWxkZXIuYnVpbGRDb250YWN0KHNpbmdsZUNvbnRhY3RPYmplY3QpXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWxpc3RcIikuaW5uZXJIVE1MKz1jb250YWN0QnVpbGRlci5idWlsZENvbnRhY3Qoc2luZ2xlQ29udGFjdE9iamVjdClcclxuXHJcbiAgICB9KVxyXG5cclxuICAgIH0pXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByaW50Q29udGFjdHM7IiwiaW1wb3J0IHVzZXJGb3JtcyBmcm9tIFwiLi91c2VyRm9ybXMuanNcIlxyXG5pbXBvcnQgY29udGFjdEZvcm1zIGZyb20gXCIuL2NvbnRhY3RGb3JtLmpzXCJcclxuaW1wb3J0IHByaW50Q29udGFjdHMgZnJvbSBcIi4vY29udGFjdExpc3QuanNcIlxyXG5cclxuXHJcbmNvbnN0IGxvZ2luTWFuYWdlciA9e1xyXG5cclxuICAgIHZlcmlmeVBhc3N3b3JkOiAodXNlciwgcGFzc3dvcmQpPT57XHJcbiAgICAgICAgaWYocGFzc3dvcmQ9PT11c2VyWzBdLnBhc3N3b3JkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwYXNzd29yZCBtYXRjaGVkXCIpXHJcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgdXNlclswXS5pZClcclxuICAgICAgICAgICAgcHJpbnRDb250YWN0cy5wcmludFVzZXJDb250YWN0cyh1c2VyWzBdLmlkKVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyIGxvZ2dlZCBpblwiLCB1c2VyWzBdKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBhc3N3b3JkIGRpZCBub3QgbWF0Y2hcIilcclxuICAgICAgICAgICAgd2luZG93LmFsZXJ0KFwiUGFzc3dvcmQgaXMgaW5jb3JyZWN0ISEgIFRyeSBhZ2FpblwiKVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjb25maXJtUGFzc3dvcmQ6IChwYXNzd29yZDEsIHBhc3N3b3JkMik9PntcclxuICAgICAgICBpZihwYXNzd29yZDE9PT1wYXNzd29yZDIpe1xyXG4gICAgICAgICAgICBzaW5nbGVJZD1zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpXHJcbiAgICAgICAgdXNlck1hbmFnZXIudXBkYXRlUGFzc3dvcmQocGFzc3dvcmQxLCBzaW5nbGVJZCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHZlcmlmeVVzZXJOYW1lOiAodXNlciwgdXNlck5hbWUpPT57XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsb2dpbk1hbmFnZXI7XHJcbiIsImltcG9ydCBjb250YWN0Rm9ybXMgZnJvbSBcIi4vY29udGFjdEZvcm1cIlxyXG5pbXBvcnQgcHJpbnRDb250YWN0cyBmcm9tIFwiLi9jb250YWN0TGlzdC5qc1wiXHJcbmltcG9ydCBjb250YWN0TWFuYWdlciBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvbi5qc1wiXHJcbmltcG9ydCBjb250YWN0QnVpbGRlciBmcm9tIFwiLi9jb250YWN0LmpzXCJcclxuaW1wb3J0IHVzZXJGb3JtcyBmcm9tIFwiLi91c2VyRm9ybXMuanNcIjtcclxuaW1wb3J0IHVzZXJNYW5hZ2VyIGZyb20gXCIuL3VzZXJDb2xsZWN0aW9uLmpzXCJcclxuaW1wb3J0IHVzZXJCdWlsZGVyIGZyb20gXCIuL3VzZXIuanNcIlxyXG5pbXBvcnQgbG9naW5NYW5hZ2VyIGZyb20gXCIuL2xvZ2luTWFuYWdlci5qc1wiXHJcblxyXG4vLyBwcmludENvbnRhY3RzLnByaW50QWxsQ29udGFjdHMoKTtcclxuXHJcbnVzZXJGb3Jtcy5tYWtlUmVnaXN0ZXJGb3JtKCk7XHJcbnVzZXJGb3Jtcy5tYWtlTG9naW5Gb3JtKCk7XHJcblxyXG4vL0FkZCBldmVudCBsaXN0ZW5lciBvbiB0aGUgY29udGFjdCBidXR0b24gdG8gc2F2ZSBhIGNvbnRhY3QgYW5kIHBvc3QgdG8gSlNPTlxyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtLWNvbnRhaW5lclwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwic3VibWl0LWJ0blwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaXJzdC1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFzdC1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBhZGRyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGRyZXNzXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwaG9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGhvbmUtbnVtYmVyXCIpLnZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFjdE9iamVjdCA9IGNvbnRhY3RCdWlsZGVyLmJ1aWxkQ29udGFjdE9iamVjdChmaXJzdE5hbWUsIGxhc3ROYW1lLCBwaG9uZSwgYWRkcmVzcylcclxuXHJcbiAgICAgICAgICAgICAgICBjb250YWN0TWFuYWdlci5hZGRDb250YWN0KGNvbnRhY3RPYmplY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHByaW50Q29udGFjdHMucHJpbnRVc2VyQ29udGFjdHMpXHJcbiAgICAgICAgfVxyXG59KVxyXG4vL0FkZCBldmVudCBsaXN0ZW5lciBvbiB0aGUgcmVnaXN0ZXIgYnV0dG9uIHRvIHJlZ2lzdGVyIGEgbmV3IHVzZXJcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3Rlci1jb250YWluZXJcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcInJlZ2lzdGVyLWJ0blwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyLWZpcnN0LW5hbWVcIikudmFsdWVcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyLWxhc3QtbmFtZVwiKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdXNlck5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXItbmFtZVwiKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXItcGFzc3dvcmRcIikudmFsdWVcclxuICAgICAgICAgICAgICAgIHVzZXJNYW5hZ2VyLmdldFNpbmdsZVVzZXIoXCJ1c2VyTmFtZVwiLCB1c2VyTmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHNpbmdsZVVzZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2luZ2xlVXNlci5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQnVpbGQgYW4gb2JqZWN0IHRvIHJlcHJlc2VudCB0aGUgdXNlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlck9iamVjdCA9IHVzZXJCdWlsZGVyLmJ1aWxkVXNlck9iamVjdChmaXJzdE5hbWUsIGxhc3ROYW1lLCB1c2VyTmFtZSwgcGFzc3dvcmQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL01ha2UgQVBJIGNhbGwgYW5kIGFkZCB1c2VyIHRvIGRhdGFiYXNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyTWFuYWdlci5hZGRVc2VyKHVzZXJPYmplY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHVzZXIgPT4gdXNlci5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCh1c2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UganVzdCBhZGRlZCBhIHVzZXIhXCIsIHVzZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInVzZXJJZFwiLCB1c2VyLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3RGb3Jtcy5tYWtlQ29udGFjdEZvcm0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyRm9ybXMubWFrZUxvZ291dEZvcm0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtbGlzdFwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlckZvcm1zLnJlbW92ZVJlZ2lzdGVyRm9ybSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSWYgdXNlcm5hbWUgaXMgYWxyZWFkeSBpbiB0aGUgZGF0YWJhc2UsIHdpbmRvdyBhbGVydC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChcIlRoZSB1c2VybmFtZSBoYXMgYWxyZWFkeSBiZWVuIGFzc2lnbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9XHJcbn0pXHJcbi8vRXZlbnQgbGlzdGVuZXIgb24gdGhlIGxvZ2luIGNvbnRhaW5lclxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRhaW5lclwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBsb2dpbiBidXR0b24gdG8gbG9nIGluIGEgdXNlciBhbmQgc3RvcmUgdGhlaXIgdXNlcklEIGluIHRoZSBzZXNzaW9uXHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJsb2dpbi1idG5cIikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdXNlck5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXItbG9naW4tbmFtZVwiKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXItbG9naW4tcGFzc3dvcmRcIikudmFsdWVcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXJNYW5hZ2VyLmdldFNpbmdsZVVzZXIoXCJ1c2VyTmFtZVwiLCB1c2VyTmFtZSkpXHJcbiAgICAgICAgICAgICAgICAvL0NoZWNrIHRvIHNlZSBpZiB1c2VyIGV4aXN0cyBpbiB0aGUgZGF0YWJhc2VcclxuICAgICAgICAgICAgICAgIHVzZXJNYW5hZ2VyLmdldFNpbmdsZVVzZXIoXCJ1c2VyTmFtZVwiLCB1c2VyTmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHNpbmdsZVVzZXIpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpbmdsZVVzZXIubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSB1c2VybmFtZSBvZlwiLCB1c2VyTmFtZSwgXCJ3YXMgdmVyaWZpZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSWYgdXNlcm5hbWUgZXhpc3RzLCBtb3ZlIG9uIHRvIHZlcmlmeWluZyB0aGUgcGFzc3dvcmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2luTWFuYWdlci52ZXJpZnlQYXNzd29yZChzaW5nbGVVc2VyLCBwYXNzd29yZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJGb3Jtcy5tYWtlTG9nb3V0Rm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlckZvcm1zLnJlbW92ZVJlZ2lzdGVyRm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdEZvcm1zLm1ha2VDb250YWN0Rm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSWYgdXNlcm5hbWUgZG9lcyBub3QgZXhpc3QsIGdpdmUgYWxlcnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChcInRoYXQgdXNlcm5hbWUgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGRhdGFiYXNlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2V2ZW50IGxpc3RlbmVyIG9uIHRoZSBsb2dvdXQgYnV0dG9uIHRvIHJlbW92ZSBhIHVzZXJJRCBmcm9tIHNlc3Npb24gc3RvcmFnZSBhbmQgY2xlYXIgY29udGFjdHNcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcImxvZ291dC1idG5cIikge1xyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoXCJ1c2VySWRcIilcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXNlciBpZCBjbGVhcmVkXCIpXHJcbiAgICAgICAgICAgICAgICB1c2VyRm9ybXMubWFrZVJlZ2lzdGVyRm9ybSgpXHJcbiAgICAgICAgICAgICAgICB1c2VyRm9ybXMubWFrZUxvZ2luRm9ybSgpXHJcbiAgICAgICAgICAgICAgICBjb250YWN0Rm9ybXMucmVtb3ZlQ29udGFjdExpc3QoKTtcclxuICAgICAgICAgICAgICAgIGNvbnRhY3RGb3Jtcy5yZW1vdmVDb250YWN0Rm9ybSgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJ1cGRhdGUtYnRuXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCB1c2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBjbGlja2VkIHRoZSB1cGRhdGUgYnV0dG9uXCIpXHJcbiAgICAgICAgICAgICAgICB1c2VyTWFuYWdlci5nZXRTaW5nbGVVc2VyKFwiaWRcIiwgdXNlcklkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoc2luZ2xlVXNlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2luZ2xlIHVzZXIgaW5zaWRlIHVwZGF0ZVwiLCBzaW5nbGVVc2VyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJGb3Jtcy5tYWtlUGFzc3dvcmRDaGFuZ2VGb3JtKHNpbmdsZVVzZXJbMF0udXNlck5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdEZvcm1zLnJlbW92ZUNvbnRhY3RGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdEZvcm1zLnJlbW92ZUNvbnRhY3RMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwiY2hhbmdlLXBhc3N3b3JkLWJ0blwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBjbGlja2VkIHRoZSBidXR0b24gdG8gY2hhbmdlIHlvdXIgcGFzc3dvcmRcIilcclxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhc3N3b3JkMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1jaGFuZ2UtcGFzc3dvcmQxXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXNzd29yZDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXItY2hhbmdlLXBhc3N3b3JkMlwiKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgaWYgKHBhc3N3b3JkMSA9PT0gcGFzc3dvcmQyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhdGNoT2JqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlck1hbmFnZXIudXBkYXRlUGFzc3dvcmQocGF0Y2hPYmplY3QsIHVzZXJJZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KFwiWW91ciBwYXNzd29yZCB3YXMgc3VjY2Vzc2Z1bGx5IGNoYW5nZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlckZvcm1zLm1ha2VMb2dvdXRGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3RGb3Jtcy5tYWtlQ29udGFjdEZvcm0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnRDb250YWN0cy5wcmludFVzZXJDb250YWN0cyh1c2VySWQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KFwiVGhlIHBhc3N3b3JkcyBkbyBub3QgbWF0Y2hcIilcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdC1saXN0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCgpPT57XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVswXVxyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMl1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgY2xpY2tlZCB0aGUgYnV0dG9uXCIpXHJcblxyXG5cclxuICAgICAgICB9KVxyXG59KVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCIvL2NyZWF0ZXMgSFRNTCBzdHJpbmcgZm9yIGEgc2luZ2xlIGVtcGxveWVlLCBvciBhbiBvYmplY3Qgd2hlbiB0aGVyZSBpcyBhIG5ldyBpbnB1dGZyb20gdGhlIGZvcm1cclxuXHJcblxyXG5jb25zdCB1c2VyQnVpbGRlciA9e1xyXG4gICAgYnVpbGRVc2VyOiAoc2luZ2xlVXNlcikgPT57XHJcblxyXG4gICAgICAgIHJldHVybiBgPGRpdj5cclxuICAgICAgICA8aDM+JHtzaW5nbGVVc2VyLmZpcnN0TmFtZX0gJHtzaW5nbGVVc2VyLmxhc3ROYW1lfTwvaDM+XHJcbiAgICAgICAgPHA+JHtzaW5nbGVVc2VyLnVzZXJOYW1lfTwvcD5cclxuICAgICAgICA8cD4ke3NpbmdsZVVzZXIucGFzc3dvcmR9PC9wPlxyXG4gICAgICAgIDwvZGl2PmBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGJ1aWxkVXNlck9iamVjdDogKGZpcnN0TmFtZSwgbGFzdE5hbWUsIHVzZXJOYW1lLCBwYXNzd29yZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJPYmplY3QgPSB7XHJcblxyXG4gICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSxcclxuICAgICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lLFxyXG4gICAgICAgICAgICB1c2VyTmFtZTogdXNlck5hbWUsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHVzZXJPYmplY3Q7XHJcbiAgICB9XHJcblxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHVzZXJCdWlsZGVyOyIsIi8vIFRoaXMgbW9kdWxlIHdpbGwgbWFuYWdlIHRoZSB1c2VyIGRhdGFiYXNlXHJcblxyXG5jb25zdCB1c2VyTWFuYWdlciA9IHtcclxuICAgIGdldEFsbFVzZXJzOiAoKSA9PiB7XHJcblxyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiKVxyXG4gICAgICAgICAgICAudGhlbih1c2VycyA9PiB1c2Vycy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgYWRkVXNlcjogKHVzZXJPYmplY3QpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VyT2JqZWN0KVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZ2V0U2luZ2xlVXNlcjoodXNlcktleSwgdXNlclZhbHVlKT0+e1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzPyR7dXNlcktleX09JHt1c2VyVmFsdWV9YClcclxuICAgICAgICAgICAgLnRoZW4odXNlcnMgPT4gdXNlcnMuanNvbigpKVxyXG4gICAgfSxcclxuICAgIHVwZGF0ZVBhc3N3b3JkOihwYXRjaE9iamVjdCwgaWQpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzLyR7aWR9YCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXRjaE9iamVjdClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXNlck1hbmFnZXI7XHJcblxyXG4iLCJjb25zdCB1c2VyRm9ybXMgPSB7XHJcblxyXG4gICAgbWFrZVJlZ2lzdGVyRm9ybTogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXItY29udGFpbmVyXCIpLmlubmVySFRNTCA9IGA8ZmllbGRzZXQ+PGxlZ2VuZD5SZWdpc3RlcjwvbGVnZW5kPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ1c2VyRmlyc3ROYW1lXCIgaWQ9XCJ1c2VyLWZpcnN0LW5hbWVcIiBwbGFjZWhvbGRlcj1cIkZpcnN0IE5hbWVcIj48L2lucHV0PiA8YnI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInVzZXJMYXN0TmFtZVwiIGlkPVwidXNlci1sYXN0LW5hbWVcIiBwbGFjZWhvbGRlcj1cIkxhc3QgTmFtZVwiPjxicj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidXNlck5hbWVcIiBpZD1cInVzZXItbmFtZVwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgVXNlcm5hbWVcIj48YnI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIGlkPVwidXNlci1wYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgUGFzc3dvcmRcIj48YnI+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwicmVnaXN0ZXJcIiBpZD1cInJlZ2lzdGVyLWJ0blwiPnJlZ2lzdGVyPC9idXR0b24+PC9maWVsZHNldD5gXHJcbiAgICB9LFxyXG4gICAgbWFrZUxvZ2luRm9ybTogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tY29udGFpbmVyXCIpLmlubmVySFRNTCA9IGA8ZmllbGRzZXQ+PGxlZ2VuZD5Mb2dpbjwvbGVnZW5kPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ1c2VyTmFtZVwiIGlkPVwidXNlci1sb2dpbi1uYW1lXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBVc2VybmFtZVwiPjxicj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIgaWQ9XCJ1c2VyLWxvZ2luLXBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBQYXNzd29yZFwiPjxicj5cclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBpZD1cImxvZ2luLWJ0blwiPmxvZ2luPC9idXR0b24+XHJcbiAgICAgICAgPC9maWVsZHNldD5gXHJcbiAgICB9LFxyXG4gICAgbWFrZUxvZ291dEZvcm06ICgpID0+IHtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1jb250YWluZXJcIikuaW5uZXJIVE1MID1cclxuICAgICAgICBgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgaWQ9XCJsb2dvdXQtYnRuXCI+bG9nb3V0PC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgaWQ9XCJ1cGRhdGUtYnRuXCI+Q2hhbmdlIFBhc3N3b3JkPC9idXR0b24+YFxyXG5cclxuICAgIH0sXHJcbiAgICByZW1vdmVSZWdpc3RlckZvcm06KCk9PntcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyLWNvbnRhaW5lclwiKS5pbm5lckhUTUw9XCJcIlxyXG4gICAgfSxcclxuICAgIG1ha2VQYXNzd29yZENoYW5nZUZvcm06KHVzZXJOYW1lKT0+e1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRhaW5lclwiKS5pbm5lckhUTUw9XHJcbiAgICAgICAgYDxmaWVsZHNldD48bGVnZW5kPkNoYW5nZSBZb3VyIFBhc3N3b3JkPC9sZWdlbmQ+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInVzZXJOYW1lXCIgaWQ9XCJ1c2VyLWNoYW5nZS1uYW1lXCIgdmFsdWU9XCIke3VzZXJOYW1lfVwiPjxicj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicGFzc3dvcmRcIiBpZD1cInVzZXItY2hhbmdlLXBhc3N3b3JkMVwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgUGFzc3dvcmRcIj48YnI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInBhc3N3b3JkXCIgaWQ9XCJ1c2VyLWNoYW5nZS1wYXNzd29yZDJcIiBwbGFjZWhvbGRlcj1cIkVudGVyIFBhc3N3b3JkIEFnYWluXCI+PGJyPlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGlkPVwiY2hhbmdlLXBhc3N3b3JkLWJ0blwiPnN1Ym1pdDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZmllbGRzZXQ+YFxyXG4gICAgfVxyXG5cclxufVxyXG5leHBvcnQgZGVmYXVsdCB1c2VyRm9ybXM7XHJcblxyXG4iXX0=
