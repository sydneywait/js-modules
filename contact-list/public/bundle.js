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
    document.querySelector("#login-container").innerHTML = `<button type="submit" id="logout-btn">logout</button>
        <button type="submit" id="update-btn">Change Password</button>`;
  },
  removeRegisterForm: () => {
    document.querySelector("#register-container").innerHTML = "";
  },
  makePasswordChangeForm: userName => {
    document.querySelector("#login-container").innerHTML = `<fieldset><legend>Change Your Password</legend>
        <input type="text" name="userName" id="user-change-name" value="${userName}"><br>
        <input type="text" name="password" id="user-change-password" placeholder="Enter Password"><br>
        <input type="text" name="password" id="user-change-password" placeholder="Enter Password Again"><br>
        <button type="submit" id="change-btn">submit</button>
        </fieldset>`;
  }
};
var _default = userForms;
exports.default = _default;

},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL2xvZ2luTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvdXNlci5qcyIsIi4uL3NjcmlwdHMvdXNlckNvbGxlY3Rpb24uanMiLCIuLi9zY3JpcHRzL3VzZXJGb3Jtcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBR0EsTUFBTSxjQUFjLEdBQUU7QUFDbEIsRUFBQSxZQUFZLEVBQUcsYUFBRCxJQUFrQjtBQUU1QixXQUFRO2NBQ0YsYUFBYSxDQUFDLFNBQVUsSUFBRyxhQUFhLENBQUMsUUFBUzthQUNuRCxhQUFhLENBQUMsV0FBWTthQUMxQixhQUFhLENBQUMsT0FBUTtlQUgzQjtBQU1ILEdBVGlCO0FBV2xCLEVBQUEsa0JBQWtCLEVBQUUsQ0FBQyxTQUFELEVBQVksUUFBWixFQUFzQixLQUF0QixFQUE2QixPQUE3QixLQUF5QztBQUN6RCxVQUFNLGFBQWEsR0FBRztBQUVsQixNQUFBLFNBQVMsRUFBRSxTQUZPO0FBR2xCLE1BQUEsUUFBUSxFQUFFLFFBSFE7QUFJbEIsTUFBQSxXQUFXLEVBQUUsS0FKSztBQUtsQixNQUFBLE9BQU8sRUFBRSxPQUxTO0FBTWxCLE1BQUEsTUFBTSxFQUFFLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCO0FBTlUsS0FBdEI7QUFTQSxXQUFPLGFBQVA7QUFDSDtBQXRCaUIsQ0FBdEI7ZUF5QmUsYzs7Ozs7Ozs7OztBQzVCZjtBQUVBLE1BQU0sY0FBYyxHQUFHO0FBQ25CLEVBQUEsY0FBYyxFQUFFLE1BQU07QUFFbEIsV0FBTyxLQUFLLENBQUMsZ0NBQUQsQ0FBTCxDQUNGLElBREUsQ0FDRyxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEZixDQUFQO0FBRUgsR0FMa0I7QUFNbkIsRUFBQSxVQUFVLEVBQUcsYUFBRCxJQUFtQjtBQUMzQixXQUFPLEtBQUssQ0FBQyxnQ0FBRCxFQUFtQztBQUMzQyxNQUFBLE1BQU0sRUFBRSxNQURtQztBQUUzQyxNQUFBLE9BQU8sRUFBRTtBQUNMLHdCQUFnQjtBQURYLE9BRmtDO0FBSzNDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsYUFBZjtBQUxxQyxLQUFuQyxDQUFaO0FBT0gsR0Fka0I7QUFnQm5CLEVBQUEsZUFBZSxFQUFHLE1BQUQsSUFBWTtBQUN6QixXQUFPLEtBQUssQ0FBRSx5Q0FBd0MsTUFBTyxFQUFqRCxDQUFMLENBQ0YsSUFERSxDQUNHLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURmLENBQVA7QUFFSDtBQW5Ca0IsQ0FBdkI7ZUF5QmUsYzs7Ozs7Ozs7OztBQzNCZixNQUFNLFlBQVksR0FBRztBQUVqQixFQUFBLGVBQWUsRUFBRSxNQUFNO0FBQ25CLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsaUJBQXZCLEVBQTBDLFNBQTFDLEdBQXVEOzs7Ozs7aUVBQXZEO0FBUUgsR0FYZ0I7QUFhakIsRUFBQSxpQkFBaUIsRUFBRSxNQUFNO0FBQ3JCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsaUJBQXZCLEVBQTBDLFNBQTFDLEdBQXNELEVBQXREO0FBQ0gsR0FmZ0I7QUFnQmpCLEVBQUEsaUJBQWlCLEVBQUUsTUFBSTtBQUNuQixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLFNBQXhDLEdBQW9ELEVBQXBEO0FBQ0g7QUFsQmdCLENBQXJCO2VBb0JlLFk7Ozs7Ozs7Ozs7O0FDakJmOztBQUNBOztBQUNBOzs7O0FBTEE7QUFDQTtBQU1BLE1BQU0sYUFBYSxHQUFHO0FBRXRCLEVBQUEsZ0JBQWdCLEVBQUMsTUFBSTtBQUNyQixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLFNBQXhDLEdBQWtELEVBQWxEOztBQUVBLCtCQUFlLGNBQWYsR0FDQyxJQURELENBQ08sY0FBRCxJQUFrQjtBQUN4QixNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksY0FBWjtBQUNBLE1BQUEsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsbUJBQW1CLElBQUc7QUFDekMsY0FBTSxpQkFBaUIsR0FBRyxpQkFBZSxZQUFmLENBQTRCLG1CQUE1QixDQUExQjs7QUFDQSxRQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLFNBQXhDLElBQW1ELGlCQUFlLFlBQWYsQ0FBNEIsbUJBQTVCLENBQW5EO0FBRUgsT0FKRDtBQU1DLEtBVEQ7QUFVQyxHQWZxQjtBQWdCdEIsRUFBQSxpQkFBaUIsRUFBQyxNQUFJO0FBQ2xCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZUFBdkIsRUFBd0MsU0FBeEMsR0FBa0QsRUFBbEQ7QUFDQSxVQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QixDQUFmOztBQUVBLDRCQUFZLGFBQVosQ0FBMEIsSUFBMUIsRUFBZ0MsTUFBaEMsRUFDQyxJQURELENBQ08sSUFBRCxJQUFRO0FBQ1YsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGlCQUFaLEVBQStCLElBQS9CO0FBQ0EsTUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixlQUF2QixFQUF3QyxTQUF4QyxHQUFtRCxPQUFNLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUSxTQUFVLElBQUcsSUFBSSxDQUFDLENBQUQsQ0FBSixDQUFRLFFBQVMsa0JBQS9GO0FBQ0gsS0FKRDs7QUFLQSwrQkFBZSxlQUFmLENBQStCLE1BQS9CLEVBQ0MsSUFERCxDQUNPLGNBQUQsSUFBa0I7QUFDeEIsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGNBQVo7QUFFQSxNQUFBLGNBQWMsQ0FBQyxPQUFmLENBQXVCLG1CQUFtQixJQUFHO0FBQ3pDLGNBQU0saUJBQWlCLEdBQUcsaUJBQWUsWUFBZixDQUE0QixtQkFBNUIsQ0FBMUI7O0FBQ0EsUUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixlQUF2QixFQUF3QyxTQUF4QyxJQUFtRCxpQkFBZSxZQUFmLENBQTRCLG1CQUE1QixDQUFuRDtBQUVILE9BSkQ7QUFNQyxLQVZEO0FBV0M7QUFwQ2lCLENBQXRCO2VBMENlLGE7Ozs7Ozs7Ozs7O0FDakRmOztBQUNBOztBQUNBOzs7O0FBR0EsTUFBTSxZQUFZLEdBQUU7QUFFaEIsRUFBQSxjQUFjLEVBQUUsQ0FBQyxJQUFELEVBQU8sUUFBUCxLQUFrQjtBQUM5QixRQUFHLFFBQVEsS0FBRyxJQUFJLENBQUMsQ0FBRCxDQUFKLENBQVEsUUFBdEIsRUFDQTtBQUNJLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxrQkFBWjs7QUFDQSx5QkFBVSxjQUFWOztBQUNBLHlCQUFVLGtCQUFWOztBQUNBLDJCQUFhLGVBQWI7O0FBQ0EsTUFBQSxjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QixFQUFpQyxJQUFJLENBQUMsQ0FBRCxDQUFKLENBQVEsRUFBekM7O0FBQ0EsMkJBQWMsaUJBQWQsQ0FBZ0MsSUFBSSxDQUFDLENBQUQsQ0FBSixDQUFRLEVBQXhDOztBQUVBLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixJQUFJLENBQUMsQ0FBRCxDQUFsQztBQUNILEtBVkQsTUFXSTtBQUNBLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSx3QkFBWjtBQUNBLE1BQUEsTUFBTSxDQUFDLEtBQVAsQ0FBYSxvQ0FBYjtBQUNIO0FBR0osR0FwQmU7QUFzQmhCLEVBQUEsZUFBZSxFQUFHLFFBQUQsSUFBWSxDQUc1QixDQXpCZTtBQTJCaEIsRUFBQSxjQUFjLEVBQUUsQ0FBQyxJQUFELEVBQU8sUUFBUCxLQUFrQixDQUdqQztBQTlCZSxDQUFwQjtlQW1DZSxZOzs7Ozs7QUN4Q2Y7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTtBQUVBLG1CQUFVLGdCQUFWOztBQUNBLG1CQUFVLGFBQVYsRyxDQUVBOzs7QUFFQSxRQUFRLENBQUMsYUFBVCxDQUF1QixpQkFBdkIsRUFBMEMsZ0JBQTFDLENBQTJELE9BQTNELEVBQW9FLE1BQU07QUFDbEUsTUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsS0FBb0IsWUFBeEIsRUFBc0M7QUFFOUIsVUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsS0FBeEQ7QUFDQSxVQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixZQUF2QixFQUFxQyxLQUF0RDtBQUNBLFVBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFVBQXZCLEVBQW1DLEtBQW5EO0FBQ0EsVUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZUFBdkIsRUFBd0MsS0FBdEQ7O0FBRUEsVUFBTSxhQUFhLEdBQUcsaUJBQWUsa0JBQWYsQ0FBa0MsU0FBbEMsRUFBNkMsUUFBN0MsRUFBdUQsS0FBdkQsRUFBOEQsT0FBOUQsQ0FBdEI7O0FBRUEsK0JBQWUsVUFBZixDQUEwQixhQUExQixFQUNTLElBRFQsQ0FDYyxxQkFBYyxpQkFENUI7QUFFUDtBQUNSLENBYkQsRSxDQWNBOztBQUVBLFFBQVEsQ0FBQyxhQUFULENBQXVCLHFCQUF2QixFQUE4QyxnQkFBOUMsQ0FBK0QsT0FBL0QsRUFBd0UsTUFBTTtBQUN0RSxNQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixLQUFvQixjQUF4QixFQUF3QztBQUVoQyxVQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixrQkFBdkIsRUFBMkMsS0FBN0Q7QUFDQSxVQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixpQkFBdkIsRUFBMEMsS0FBM0Q7QUFDQSxVQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixZQUF2QixFQUFxQyxLQUF0RDtBQUNBLFVBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGdCQUF2QixFQUF5QyxLQUExRDs7QUFDQSw0QkFBWSxhQUFaLENBQTBCLFVBQTFCLEVBQXNDLFFBQXRDLEVBQ1MsSUFEVCxDQUNlLFVBQUQsSUFBZ0I7QUFDZCxVQUFJLFVBQVUsQ0FBQyxNQUFYLEtBQXNCLENBQTFCLEVBQTZCO0FBQ3JCO0FBQ0EsY0FBTSxVQUFVLEdBQUcsY0FBWSxlQUFaLENBQTRCLFNBQTVCLEVBQXVDLFFBQXZDLEVBQWlELFFBQWpELEVBQTJELFFBQTNELENBQW5CLENBRnFCLENBR3JCOzs7QUFDQSxnQ0FBWSxPQUFaLENBQW9CLFVBQXBCLEVBQ1MsSUFEVCxDQUNjLElBQUksSUFBSSxJQUFJLENBQUMsSUFBTCxFQUR0QixFQUVTLElBRlQsQ0FFZSxJQUFELElBQVU7QUFDUixVQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksd0JBQVosRUFBc0MsSUFBdEM7QUFDQSxVQUFBLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLEVBQWlDLElBQUksQ0FBQyxFQUF0Qzs7QUFDQSwrQkFBYSxlQUFiOztBQUNBLDZCQUFVLGNBQVY7O0FBQ0EsVUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixlQUF2QixFQUF3QyxTQUF4QyxHQUFvRCxFQUFwRDs7QUFDQSw2QkFBVSxrQkFBVjtBQUNQLFNBVFQ7QUFVUCxPQWRELENBZUE7QUFmQSxXQWdCSztBQUNHLFVBQUEsTUFBTSxDQUFDLEtBQVAsQ0FBYSx3Q0FBYjtBQUNQO0FBQ1IsS0FyQlQ7QUF1QlA7QUFDUixDQS9CRCxFLENBZ0NBOztBQUNBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGtCQUF2QixFQUEyQyxnQkFBM0MsQ0FBNEQsT0FBNUQsRUFBcUUsTUFBTTtBQUNuRTtBQUNBLE1BQUksS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiLEtBQW9CLFdBQXhCLEVBQXFDO0FBQzdCLFVBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGtCQUF2QixFQUEyQyxLQUE1RDtBQUNBLFVBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLHNCQUF2QixFQUErQyxLQUFoRTtBQUNBLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSx3QkFBWSxhQUFaLENBQTBCLFVBQTFCLEVBQXNDLFFBQXRDLENBQVosRUFINkIsQ0FJN0I7O0FBQ0EsNEJBQVksYUFBWixDQUEwQixVQUExQixFQUFzQyxRQUF0QyxFQUNTLElBRFQsQ0FDZSxVQUFELElBQWdCO0FBRWQsVUFBSSxVQUFVLENBQUMsTUFBWCxLQUFzQixDQUExQixFQUE2QjtBQUNyQixRQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksaUJBQVosRUFBK0IsUUFBL0IsRUFBeUMsY0FBekMsRUFEcUIsQ0FFckI7O0FBQ0EsOEJBQWEsY0FBYixDQUE0QixVQUE1QixFQUF3QyxRQUF4QztBQUNQLE9BSkQsTUFLSztBQUNHO0FBQ0EsUUFBQSxNQUFNLENBQUMsS0FBUCxDQUFhLDhDQUFiO0FBQ1A7QUFDUixLQVpUO0FBYVAsR0FwQmtFLENBcUJuRTs7O0FBQ0EsTUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsS0FBb0IsWUFBeEIsRUFBc0M7QUFDOUIsSUFBQSxjQUFjLENBQUMsS0FBZixDQUFxQixRQUFyQjtBQUNBLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxpQkFBWjs7QUFDQSx1QkFBVSxnQkFBVjs7QUFDQSx1QkFBVSxhQUFWOztBQUNBLHlCQUFhLGlCQUFiOztBQUNBLHlCQUFhLGlCQUFiO0FBRVA7O0FBQ0QsTUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsS0FBb0IsWUFBeEIsRUFBc0M7QUFDOUIsUUFBSSxNQUFNLEdBQUcsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkIsQ0FBYjtBQUNBLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSwrQkFBWjs7QUFDQSw0QkFBWSxhQUFaLENBQTBCLElBQTFCLEVBQWdDLE1BQWhDLEVBQ1MsSUFEVCxDQUNlLFVBQUQsSUFBZ0I7QUFDZCxNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksMkJBQVosRUFBeUMsVUFBekM7O0FBQ0EseUJBQVUsc0JBQVYsQ0FBaUMsVUFBVSxDQUFDLENBQUQsQ0FBVixDQUFjLFFBQS9DOztBQUNBLDJCQUFhLGlCQUFiOztBQUNBLDJCQUFhLGlCQUFiO0FBQ1AsS0FOVDtBQVdQO0FBR1IsQ0FoREQ7Ozs7Ozs7OztBQ2pFQTtBQUdBLE1BQU0sV0FBVyxHQUFFO0FBQ2YsRUFBQSxTQUFTLEVBQUcsVUFBRCxJQUFlO0FBRXRCLFdBQVE7Y0FDRixVQUFVLENBQUMsU0FBVSxJQUFHLFVBQVUsQ0FBQyxRQUFTO2FBQzdDLFVBQVUsQ0FBQyxRQUFTO2FBQ3BCLFVBQVUsQ0FBQyxRQUFTO2VBSHpCO0FBTUgsR0FUYztBQVdmLEVBQUEsZUFBZSxFQUFFLENBQUMsU0FBRCxFQUFZLFFBQVosRUFBc0IsUUFBdEIsRUFBZ0MsUUFBaEMsS0FBNkM7QUFDMUQsVUFBTSxVQUFVLEdBQUc7QUFFZixNQUFBLFNBQVMsRUFBRSxTQUZJO0FBR2YsTUFBQSxRQUFRLEVBQUUsUUFISztBQUlmLE1BQUEsUUFBUSxFQUFFLFFBSks7QUFLZixNQUFBLFFBQVEsRUFBRTtBQUxLLEtBQW5CO0FBUUEsV0FBTyxVQUFQO0FBQ0g7QUFyQmMsQ0FBbkI7ZUF3QmUsVzs7Ozs7Ozs7OztBQzNCZjtBQUVBLE1BQU0sV0FBVyxHQUFHO0FBQ2hCLEVBQUEsV0FBVyxFQUFFLE1BQU07QUFFZixXQUFPLEtBQUssQ0FBQyw2QkFBRCxDQUFMLENBQ0YsSUFERSxDQUNHLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBTixFQURaLENBQVA7QUFFSCxHQUxlO0FBTWhCLEVBQUEsT0FBTyxFQUFHLFVBQUQsSUFBZ0I7QUFDckIsV0FBTyxLQUFLLENBQUMsNkJBQUQsRUFBZ0M7QUFDeEMsTUFBQSxNQUFNLEVBQUUsTUFEZ0M7QUFFeEMsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUYrQjtBQUt4QyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLFVBQWY7QUFMa0MsS0FBaEMsQ0FBWjtBQU9ILEdBZGU7QUFlaEIsRUFBQSxhQUFhLEVBQUMsQ0FBQyxPQUFELEVBQVUsU0FBVixLQUFzQjtBQUNoQyxXQUFPLEtBQUssQ0FBRSwrQkFBOEIsT0FBUSxJQUFHLFNBQVUsRUFBckQsQ0FBTCxDQUNGLElBREUsQ0FDRyxLQUFLLElBQUksS0FBSyxDQUFDLElBQU4sRUFEWixDQUFQO0FBRUg7QUFsQmUsQ0FBcEI7ZUFzQmUsVzs7Ozs7Ozs7OztBQ3hCZixNQUFNLFNBQVMsR0FBRztBQUVkLEVBQUEsZ0JBQWdCLEVBQUUsTUFBTTtBQUNwQixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLHFCQUF2QixFQUE4QyxTQUE5QyxHQUEyRDs7Ozs7K0VBQTNEO0FBTUgsR0FUYTtBQVVkLEVBQUEsYUFBYSxFQUFFLE1BQU07QUFDakIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixrQkFBdkIsRUFBMkMsU0FBM0MsR0FBd0Q7Ozs7b0JBQXhEO0FBS0gsR0FoQmE7QUFpQmQsRUFBQSxjQUFjLEVBQUUsTUFBTTtBQUVsQixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGtCQUF2QixFQUEyQyxTQUEzQyxHQUNDO3VFQUREO0FBSUgsR0F2QmE7QUF3QmQsRUFBQSxrQkFBa0IsRUFBQyxNQUFJO0FBQ25CLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIscUJBQXZCLEVBQThDLFNBQTlDLEdBQXdELEVBQXhEO0FBQ0gsR0ExQmE7QUEyQmQsRUFBQSxzQkFBc0IsRUFBRSxRQUFELElBQVk7QUFFL0IsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixrQkFBdkIsRUFBMkMsU0FBM0MsR0FDQzswRUFDaUUsUUFBUzs7OztvQkFGM0U7QUFPSDtBQXBDYSxDQUFsQjtlQXVDZSxTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy9jcmVhdGVzIEhUTUwgc3RyaW5nIGZvciBhIHNpbmdsZSBlbXBsb3llZSwgb3IgYW4gb2JqZWN0IHdoZW4gdGhlcmUgaXMgYSBuZXcgaW5wdXRmcm9tIHRoZSBmb3JtXHJcblxyXG5cclxuY29uc3QgY29udGFjdEJ1aWxkZXIgPXtcclxuICAgIGJ1aWxkQ29udGFjdDogKHNpbmdsZUNvbnRhY3QpID0+e1xyXG5cclxuICAgICAgICByZXR1cm4gYDxkaXY+XHJcbiAgICAgICAgPGgzPiR7c2luZ2xlQ29udGFjdC5maXJzdE5hbWV9ICR7c2luZ2xlQ29udGFjdC5sYXN0TmFtZX08L2gzPlxyXG4gICAgICAgIDxwPiR7c2luZ2xlQ29udGFjdC5waG9uZU51bWJlcn08L3A+XHJcbiAgICAgICAgPHA+JHtzaW5nbGVDb250YWN0LmFkZHJlc3N9PC9wPlxyXG4gICAgICAgIDwvZGl2PmBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGJ1aWxkQ29udGFjdE9iamVjdDogKGZpcnN0TmFtZSwgbGFzdE5hbWUsIHBob25lLCBhZGRyZXNzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udGFjdE9iamVjdCA9IHtcclxuXHJcbiAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lLFxyXG4gICAgICAgICAgICBsYXN0TmFtZTogbGFzdE5hbWUsXHJcbiAgICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZSxcclxuICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyxcclxuICAgICAgICAgICAgdXNlcklkOiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29udGFjdE9iamVjdDtcclxuICAgIH1cclxuXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY29udGFjdEJ1aWxkZXI7IiwiLy8gdGhpcyBtb2R1bGUgd2lsbCBjYWxsIGFwaSB0byBnZXQgYWxsIGNvbnRhY3RzLCBhbmQgdG8gYWRkIGFub3RoZXIgY29udGFjdFxyXG5cclxuY29uc3QgY29udGFjdE1hbmFnZXIgPSB7XHJcbiAgICBnZXRBbGxDb250YWN0czogKCkgPT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIilcclxuICAgICAgICAgICAgLnRoZW4oY29udGFjdHMgPT4gY29udGFjdHMuanNvbigpKVxyXG4gICAgfSxcclxuICAgIGFkZENvbnRhY3Q6IChjb250YWN0T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29udGFjdE9iamVjdClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRVc2VyQ29udGFjdHM6ICh1c2VySWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0cz91c2VySWQ9JHt1c2VySWR9YClcclxuICAgICAgICAgICAgLnRoZW4oY29udGFjdHMgPT4gY29udGFjdHMuanNvbigpKVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb250YWN0TWFuYWdlcjtcclxuIiwiY29uc3QgY29udGFjdEZvcm1zID0ge1xyXG5cclxuICAgIG1ha2VDb250YWN0Rm9ybTogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1jb250YWluZXJcIikuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxsZWdlbmQ+Q3JlYXRlIGEgTmV3IENvbnRhY3Q8L2xlZ2VuZD5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lID0gXCJmaXJzdE5hbWVcIiBpZD1cImZpcnN0LW5hbWVcIiBwbGFjZWhvbGRlcj1cIkZpcnN0IE5hbWVcIj48YnI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImxhc3ROYW1lXCIgaWQ9XCJsYXN0LW5hbWVcIiBwbGFjZWhvbGRlcj1cIkxhc3QgTmFtZVwiPjxicj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lID1cInBob25lTnVtYmVyXCIsIGlkPVwicGhvbmUtbnVtYmVyXCIgcGxhY2Vob2xkZXI9XCJQaG9uZSBOdW1iZXJcIj48YnI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImFkZHJlc3NcIiBpZD1cImFkZHJlc3NcIiBwbGFjZWhvbGRlcj1cIkFkZHJlc3NcIj48YnI+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlID0gXCJzdWJtaXRcIiwgaWQ9XCJzdWJtaXQtYnRuXCI+U3VibWl0PC9idXR0b24+YFxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlQ29udGFjdEZvcm06ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm0tY29udGFpbmVyXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIH0sXHJcbiAgICByZW1vdmVDb250YWN0TGlzdDogKCk9PntcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtbGlzdFwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY29udGFjdEZvcm1zOyIsIi8vIHRoaXMgbW9kdWxlIHNob3VsZCBpbXBvcnQgZnJvbSBhcGlNYW5hZ2VyIChnZXQgZW1wbG95ZWVzKSBhbmQgbG9vcCB0aHJvdWdoIGFuZCBvcHRpb24gdG8gcHJpbnQgb25lIG9yIGFsbFxyXG4vL2V4cG9ydCBhbiBvYmplY3Qgd2l0aCBtZXRob2RzIChwcmludCBhbGwsIHByaW50IHNpbmdsZSlcclxuXHJcbmltcG9ydCBjb250YWN0TWFuYWdlciBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvbi5qc1wiXHJcbmltcG9ydCBjb250YWN0QnVpbGRlciBmcm9tIFwiLi9jb250YWN0LmpzXCJcclxuaW1wb3J0IHVzZXJNYW5hZ2VyIGZyb20gXCIuL3VzZXJDb2xsZWN0aW9uLmpzXCI7XHJcblxyXG5jb25zdCBwcmludENvbnRhY3RzID0ge1xyXG5cclxucHJpbnRBbGxDb250YWN0czooKT0+e1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtbGlzdFwiKS5pbm5lckhUTUw9XCJcIlxyXG5cclxuY29udGFjdE1hbmFnZXIuZ2V0QWxsQ29udGFjdHMoKVxyXG4udGhlbigocGFyc2VkQ29udGFjdHMpPT57XHJcbmNvbnNvbGUubG9nKHBhcnNlZENvbnRhY3RzKVxyXG5wYXJzZWRDb250YWN0cy5mb3JFYWNoKHNpbmdsZUNvbnRhY3RPYmplY3Q9PiB7XHJcbiAgICBjb25zdCBjb250YWN0SFRNTFN0cmluZyA9IGNvbnRhY3RCdWlsZGVyLmJ1aWxkQ29udGFjdChzaW5nbGVDb250YWN0T2JqZWN0KVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWxpc3RcIikuaW5uZXJIVE1MKz1jb250YWN0QnVpbGRlci5idWlsZENvbnRhY3Qoc2luZ2xlQ29udGFjdE9iamVjdClcclxuXHJcbn0pXHJcblxyXG59KVxyXG59LFxyXG5wcmludFVzZXJDb250YWN0czooKT0+e1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWxpc3RcIikuaW5uZXJIVE1MPVwiXCJcclxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuXHJcbiAgICB1c2VyTWFuYWdlci5nZXRTaW5nbGVVc2VyKFwiaWRcIiwgdXNlcklkKVxyXG4gICAgLnRoZW4oKHVzZXIpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnZXQgc2luZ2xlIHVzZXJcIiwgdXNlcilcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtbGlzdFwiKS5pbm5lckhUTUw9YDxoMT4ke3VzZXJbMF0uZmlyc3ROYW1lfSAke3VzZXJbMF0ubGFzdE5hbWV9J3MgQ29udGFjdHM8L2gxPmBcclxuICAgIH0pXHJcbiAgICBjb250YWN0TWFuYWdlci5nZXRVc2VyQ29udGFjdHModXNlcklkKVxyXG4gICAgLnRoZW4oKHBhcnNlZENvbnRhY3RzKT0+e1xyXG4gICAgY29uc29sZS5sb2cocGFyc2VkQ29udGFjdHMpXHJcblxyXG4gICAgcGFyc2VkQ29udGFjdHMuZm9yRWFjaChzaW5nbGVDb250YWN0T2JqZWN0PT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RIVE1MU3RyaW5nID0gY29udGFjdEJ1aWxkZXIuYnVpbGRDb250YWN0KHNpbmdsZUNvbnRhY3RPYmplY3QpXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWxpc3RcIikuaW5uZXJIVE1MKz1jb250YWN0QnVpbGRlci5idWlsZENvbnRhY3Qoc2luZ2xlQ29udGFjdE9iamVjdClcclxuXHJcbiAgICB9KVxyXG5cclxuICAgIH0pXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByaW50Q29udGFjdHM7IiwiaW1wb3J0IHVzZXJGb3JtcyBmcm9tIFwiLi91c2VyRm9ybXMuanNcIlxyXG5pbXBvcnQgY29udGFjdEZvcm1zIGZyb20gXCIuL2NvbnRhY3RGb3JtLmpzXCJcclxuaW1wb3J0IHByaW50Q29udGFjdHMgZnJvbSBcIi4vY29udGFjdExpc3QuanNcIlxyXG5cclxuXHJcbmNvbnN0IGxvZ2luTWFuYWdlciA9e1xyXG5cclxuICAgIHZlcmlmeVBhc3N3b3JkOiAodXNlciwgcGFzc3dvcmQpPT57XHJcbiAgICAgICAgaWYocGFzc3dvcmQ9PT11c2VyWzBdLnBhc3N3b3JkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwYXNzd29yZCBtYXRjaGVkXCIpXHJcbiAgICAgICAgICAgIHVzZXJGb3Jtcy5tYWtlTG9nb3V0Rm9ybSgpO1xyXG4gICAgICAgICAgICB1c2VyRm9ybXMucmVtb3ZlUmVnaXN0ZXJGb3JtKCk7XHJcbiAgICAgICAgICAgIGNvbnRhY3RGb3Jtcy5tYWtlQ29udGFjdEZvcm0oKTtcclxuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInVzZXJJZFwiLCB1c2VyWzBdLmlkKVxyXG4gICAgICAgICAgICBwcmludENvbnRhY3RzLnByaW50VXNlckNvbnRhY3RzKHVzZXJbMF0uaWQpXHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXIgbG9nZ2VkIGluXCIsIHVzZXJbMF0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGFzc3dvcmQgZGlkIG5vdCBtYXRjaFwiKVxyXG4gICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJQYXNzd29yZCBpcyBpbmNvcnJlY3QhISAgVHJ5IGFnYWluXCIpXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbmZpcm1QYXNzd29yZDogKHBhc3N3b3JkKT0+e1xyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHZlcmlmeVVzZXJOYW1lOiAodXNlciwgdXNlck5hbWUpPT57XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsb2dpbk1hbmFnZXI7XHJcbiIsImltcG9ydCBjb250YWN0Rm9ybXMgZnJvbSBcIi4vY29udGFjdEZvcm1cIlxyXG5pbXBvcnQgcHJpbnRDb250YWN0cyBmcm9tIFwiLi9jb250YWN0TGlzdC5qc1wiXHJcbmltcG9ydCBjb250YWN0TWFuYWdlciBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvbi5qc1wiXHJcbmltcG9ydCBjb250YWN0QnVpbGRlciBmcm9tIFwiLi9jb250YWN0LmpzXCJcclxuaW1wb3J0IHVzZXJGb3JtcyBmcm9tIFwiLi91c2VyRm9ybXMuanNcIjtcclxuaW1wb3J0IHVzZXJNYW5hZ2VyIGZyb20gXCIuL3VzZXJDb2xsZWN0aW9uLmpzXCJcclxuaW1wb3J0IHVzZXJCdWlsZGVyIGZyb20gXCIuL3VzZXIuanNcIlxyXG5pbXBvcnQgbG9naW5NYW5hZ2VyIGZyb20gXCIuL2xvZ2luTWFuYWdlci5qc1wiXHJcblxyXG4vLyBwcmludENvbnRhY3RzLnByaW50QWxsQ29udGFjdHMoKTtcclxuXHJcbnVzZXJGb3Jtcy5tYWtlUmVnaXN0ZXJGb3JtKCk7XHJcbnVzZXJGb3Jtcy5tYWtlTG9naW5Gb3JtKCk7XHJcblxyXG4vL0FkZCBldmVudCBsaXN0ZW5lciBvbiB0aGUgY29udGFjdCBidXR0b24gdG8gc2F2ZSBhIGNvbnRhY3QgYW5kIHBvc3QgdG8gSlNPTlxyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtLWNvbnRhaW5lclwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwic3VibWl0LWJ0blwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaXJzdC1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFzdC1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBhZGRyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGRyZXNzXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwaG9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGhvbmUtbnVtYmVyXCIpLnZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFjdE9iamVjdCA9IGNvbnRhY3RCdWlsZGVyLmJ1aWxkQ29udGFjdE9iamVjdChmaXJzdE5hbWUsIGxhc3ROYW1lLCBwaG9uZSwgYWRkcmVzcylcclxuXHJcbiAgICAgICAgICAgICAgICBjb250YWN0TWFuYWdlci5hZGRDb250YWN0KGNvbnRhY3RPYmplY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHByaW50Q29udGFjdHMucHJpbnRVc2VyQ29udGFjdHMpXHJcbiAgICAgICAgfVxyXG59KVxyXG4vL0FkZCBldmVudCBsaXN0ZW5lciBvbiB0aGUgcmVnaXN0ZXIgYnV0dG9uIHRvIHJlZ2lzdGVyIGEgbmV3IHVzZXJcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXItY29udGFpbmVyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJyZWdpc3Rlci1idG5cIikge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1maXJzdC1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1sYXN0LW5hbWVcIikudmFsdWVcclxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyLW5hbWVcIikudmFsdWVcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhc3N3b3JkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyLXBhc3N3b3JkXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICB1c2VyTWFuYWdlci5nZXRTaW5nbGVVc2VyKFwidXNlck5hbWVcIiwgdXNlck5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChzaW5nbGVVc2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpbmdsZVVzZXIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0J1aWxkIGFuIG9iamVjdCB0byByZXByZXNlbnQgdGhlIHVzZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJPYmplY3QgPSB1c2VyQnVpbGRlci5idWlsZFVzZXJPYmplY3QoZmlyc3ROYW1lLCBsYXN0TmFtZSwgdXNlck5hbWUsIHBhc3N3b3JkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9NYWtlIEFQSSBjYWxsIGFuZCBhZGQgdXNlciB0byBkYXRhYmFzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlck1hbmFnZXIuYWRkVXNlcih1c2VyT2JqZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbih1c2VyID0+IHVzZXIuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigodXNlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGp1c3QgYWRkZWQgYSB1c2VyIVwiLCB1c2VyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgdXNlci5pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0Rm9ybXMubWFrZUNvbnRhY3RGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlckZvcm1zLm1ha2VMb2dvdXRGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWxpc3RcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJGb3Jtcy5yZW1vdmVSZWdpc3RlckZvcm0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0lmIHVzZXJuYW1lIGlzIGFscmVhZHkgaW4gdGhlIGRhdGFiYXNlLCB3aW5kb3cgYWxlcnQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJUaGUgdXNlcm5hbWUgaGFzIGFscmVhZHkgYmVlbiBhc3NpZ25lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG59KVxyXG4vL0V2ZW50IGxpc3RlbmVyIG9uIHRoZSBsb2dpbiBjb250YWluZXJcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1jb250YWluZXJcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAvL2FkZCBldmVudCBsaXN0ZW5lciBvbiB0aGUgbG9naW4gYnV0dG9uIHRvIGxvZyBpbiBhIHVzZXIgYW5kIHN0b3JlIHRoZWlyIHVzZXJJRCBpbiB0aGUgc2Vzc2lvblxyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwibG9naW4tYnRuXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyLWxvZ2luLW5hbWVcIikudmFsdWVcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhc3N3b3JkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyLWxvZ2luLXBhc3N3b3JkXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VyTWFuYWdlci5nZXRTaW5nbGVVc2VyKFwidXNlck5hbWVcIiwgdXNlck5hbWUpKVxyXG4gICAgICAgICAgICAgICAgLy9DaGVjayB0byBzZWUgaWYgdXNlciBleGlzdHMgaW4gdGhlIGRhdGFiYXNlXHJcbiAgICAgICAgICAgICAgICB1c2VyTWFuYWdlci5nZXRTaW5nbGVVc2VyKFwidXNlck5hbWVcIiwgdXNlck5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChzaW5nbGVVc2VyKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaW5nbGVVc2VyLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgdXNlcm5hbWUgb2ZcIiwgdXNlck5hbWUsIFwid2FzIHZlcmlmaWVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0lmIHVzZXJuYW1lIGV4aXN0cywgbW92ZSBvbiB0byB2ZXJpZnlpbmcgdGhlIHBhc3N3b3JkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dpbk1hbmFnZXIudmVyaWZ5UGFzc3dvcmQoc2luZ2xlVXNlciwgcGFzc3dvcmQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JZiB1c2VybmFtZSBkb2VzIG5vdCBleGlzdCwgZ2l2ZSBhbGVydFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KFwidGhhdCB1c2VybmFtZSBkb2VzIG5vdCBleGlzdCBpbiB0aGUgZGF0YWJhc2VcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vZXZlbnQgbGlzdGVuZXIgb24gdGhlIGxvZ291dCBidXR0b24gdG8gcmVtb3ZlIGEgdXNlcklEIGZyb20gc2Vzc2lvbiBzdG9yYWdlIGFuZCBjbGVhciBjb250YWN0c1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwibG9nb3V0LWJ0blwiKSB7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcihcInVzZXJJZFwiKVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyIGlkIGNsZWFyZWRcIilcclxuICAgICAgICAgICAgICAgIHVzZXJGb3Jtcy5tYWtlUmVnaXN0ZXJGb3JtKClcclxuICAgICAgICAgICAgICAgIHVzZXJGb3Jtcy5tYWtlTG9naW5Gb3JtKClcclxuICAgICAgICAgICAgICAgIGNvbnRhY3RGb3Jtcy5yZW1vdmVDb250YWN0TGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgY29udGFjdEZvcm1zLnJlbW92ZUNvbnRhY3RGb3JtKCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcInVwZGF0ZS1idG5cIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGNsaWNrZWQgdGhlIHVwZGF0ZSBidXR0b25cIilcclxuICAgICAgICAgICAgICAgIHVzZXJNYW5hZ2VyLmdldFNpbmdsZVVzZXIoXCJpZFwiLCB1c2VySWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChzaW5nbGVVc2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzaW5nbGUgdXNlciBpbnNpZGUgdXBkYXRlXCIsIHNpbmdsZVVzZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlckZvcm1zLm1ha2VQYXNzd29yZENoYW5nZUZvcm0oc2luZ2xlVXNlclswXS51c2VyTmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0Rm9ybXMucmVtb3ZlQ29udGFjdEZvcm0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0Rm9ybXMucmVtb3ZlQ29udGFjdExpc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbn0pXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsIi8vY3JlYXRlcyBIVE1MIHN0cmluZyBmb3IgYSBzaW5nbGUgZW1wbG95ZWUsIG9yIGFuIG9iamVjdCB3aGVuIHRoZXJlIGlzIGEgbmV3IGlucHV0ZnJvbSB0aGUgZm9ybVxyXG5cclxuXHJcbmNvbnN0IHVzZXJCdWlsZGVyID17XHJcbiAgICBidWlsZFVzZXI6IChzaW5nbGVVc2VyKSA9PntcclxuXHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2PlxyXG4gICAgICAgIDxoMz4ke3NpbmdsZVVzZXIuZmlyc3ROYW1lfSAke3NpbmdsZVVzZXIubGFzdE5hbWV9PC9oMz5cclxuICAgICAgICA8cD4ke3NpbmdsZVVzZXIudXNlck5hbWV9PC9wPlxyXG4gICAgICAgIDxwPiR7c2luZ2xlVXNlci5wYXNzd29yZH08L3A+XHJcbiAgICAgICAgPC9kaXY+YFxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYnVpbGRVc2VyT2JqZWN0OiAoZmlyc3ROYW1lLCBsYXN0TmFtZSwgdXNlck5hbWUsIHBhc3N3b3JkKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdXNlck9iamVjdCA9IHtcclxuXHJcbiAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lLFxyXG4gICAgICAgICAgICBsYXN0TmFtZTogbGFzdE5hbWUsXHJcbiAgICAgICAgICAgIHVzZXJOYW1lOiB1c2VyTmFtZSxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdXNlck9iamVjdDtcclxuICAgIH1cclxuXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgdXNlckJ1aWxkZXI7IiwiLy8gVGhpcyBtb2R1bGUgd2lsbCBtYW5hZ2UgdGhlIHVzZXIgZGF0YWJhc2VcclxuXHJcbmNvbnN0IHVzZXJNYW5hZ2VyID0ge1xyXG4gICAgZ2V0QWxsVXNlcnM6ICgpID0+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKHVzZXJzID0+IHVzZXJzLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBhZGRVc2VyOiAodXNlck9iamVjdCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJPYmplY3QpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBnZXRTaW5nbGVVc2VyOih1c2VyS2V5LCB1c2VyVmFsdWUpPT57XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnM/JHt1c2VyS2V5fT0ke3VzZXJWYWx1ZX1gKVxyXG4gICAgICAgICAgICAudGhlbih1c2VycyA9PiB1c2Vycy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgfVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVzZXJNYW5hZ2VyOyIsImNvbnN0IHVzZXJGb3JtcyA9IHtcclxuXHJcbiAgICBtYWtlUmVnaXN0ZXJGb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3Rlci1jb250YWluZXJcIikuaW5uZXJIVE1MID0gYDxmaWVsZHNldD48bGVnZW5kPlJlZ2lzdGVyPC9sZWdlbmQ+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInVzZXJGaXJzdE5hbWVcIiBpZD1cInVzZXItZmlyc3QtbmFtZVwiIHBsYWNlaG9sZGVyPVwiRmlyc3QgTmFtZVwiPjwvaW5wdXQ+IDxicj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidXNlckxhc3ROYW1lXCIgaWQ9XCJ1c2VyLWxhc3QtbmFtZVwiIHBsYWNlaG9sZGVyPVwiTGFzdCBOYW1lXCI+PGJyPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ1c2VyTmFtZVwiIGlkPVwidXNlci1uYW1lXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBVc2VybmFtZVwiPjxicj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIgaWQ9XCJ1c2VyLXBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBQYXNzd29yZFwiPjxicj5cclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJyZWdpc3RlclwiIGlkPVwicmVnaXN0ZXItYnRuXCI+cmVnaXN0ZXI8L2J1dHRvbj48L2ZpZWxkc2V0PmBcclxuICAgIH0sXHJcbiAgICBtYWtlTG9naW5Gb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1jb250YWluZXJcIikuaW5uZXJIVE1MID0gYDxmaWVsZHNldD48bGVnZW5kPkxvZ2luPC9sZWdlbmQ+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInVzZXJOYW1lXCIgaWQ9XCJ1c2VyLWxvZ2luLW5hbWVcIiBwbGFjZWhvbGRlcj1cIkVudGVyIFVzZXJuYW1lXCI+PGJyPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIiBpZD1cInVzZXItbG9naW4tcGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIkVudGVyIFBhc3N3b3JkXCI+PGJyPlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGlkPVwibG9naW4tYnRuXCI+bG9naW48L2J1dHRvbj5cclxuICAgICAgICA8L2ZpZWxkc2V0PmBcclxuICAgIH0sXHJcbiAgICBtYWtlTG9nb3V0Rm9ybTogKCkgPT4ge1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRhaW5lclwiKS5pbm5lckhUTUwgPVxyXG4gICAgICAgIGA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBpZD1cImxvZ291dC1idG5cIj5sb2dvdXQ8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBpZD1cInVwZGF0ZS1idG5cIj5DaGFuZ2UgUGFzc3dvcmQ8L2J1dHRvbj5gXHJcblxyXG4gICAgfSxcclxuICAgIHJlbW92ZVJlZ2lzdGVyRm9ybTooKT0+e1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXItY29udGFpbmVyXCIpLmlubmVySFRNTD1cIlwiXHJcbiAgICB9LFxyXG4gICAgbWFrZVBhc3N3b3JkQ2hhbmdlRm9ybToodXNlck5hbWUpPT57XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tY29udGFpbmVyXCIpLmlubmVySFRNTD1cclxuICAgICAgICBgPGZpZWxkc2V0PjxsZWdlbmQ+Q2hhbmdlIFlvdXIgUGFzc3dvcmQ8L2xlZ2VuZD5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidXNlck5hbWVcIiBpZD1cInVzZXItY2hhbmdlLW5hbWVcIiB2YWx1ZT1cIiR7dXNlck5hbWV9XCI+PGJyPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJwYXNzd29yZFwiIGlkPVwidXNlci1jaGFuZ2UtcGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIkVudGVyIFBhc3N3b3JkXCI+PGJyPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJwYXNzd29yZFwiIGlkPVwidXNlci1jaGFuZ2UtcGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIkVudGVyIFBhc3N3b3JkIEFnYWluXCI+PGJyPlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGlkPVwiY2hhbmdlLWJ0blwiPnN1Ym1pdDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZmllbGRzZXQ+YFxyXG4gICAgfVxyXG5cclxufVxyXG5leHBvcnQgZGVmYXVsdCB1c2VyRm9ybXM7XHJcblxyXG4iXX0=
