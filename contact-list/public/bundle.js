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

const makeContactForm = () => {
  document.querySelector("#form-container").innerHTML = `
<legend>Create a New Contact</legend>
<input type="text" name = "firstName" id="first-name" placeholder="First Name"><br>
<input type="text" name="lastName" id="last-name" placeholder="Last Name"><br>
<input type="text" name ="phoneNumber", id="phone-number" placeholder="Phone Number"><br>
<input type="text" name="address" id="address" placeholder="Address"><br>
<button type = "submit", id="submit-btn">Submit</button>`;
};

var _default = makeContactForm;
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

},{"./contact.js":1,"./contactCollection.js":2,"./userCollection.js":7}],5:[function(require,module,exports){
"use strict";

var _contactForm = _interopRequireDefault(require("./contactForm"));

var _contactList = _interopRequireDefault(require("./contactList.js"));

var _contactCollection = _interopRequireDefault(require("./contactCollection.js"));

var _contact = _interopRequireDefault(require("./contact.js"));

var _userForms = _interopRequireDefault(require("./userForms.js"));

var _userCollection = _interopRequireDefault(require("./userCollection.js"));

var _user = _interopRequireDefault(require("./user.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_contactList.default.printAllContacts();

(0, _contactForm.default)();

_userForms.default.makeRegisterForm();

_userForms.default.makeLoginForm(); //Add event listener on the contact button to save a contact and post to JSON


document.querySelector("#submit-btn").addEventListener("click", () => {
  const firstName = document.querySelector("#first-name").value;
  const lastName = document.querySelector("#last-name").value;
  const address = document.querySelector("#address").value;
  const phone = document.querySelector("#phone-number").value;

  const contactObject = _contact.default.buildContactObject(firstName, lastName, phone, address);

  _contactCollection.default.addContact(contactObject).then(_contactList.default.printUserContacts);
}); //Add event listener on the register button to register a new user

document.querySelector("#register-btn").addEventListener("click", () => {
  const firstName = document.querySelector("#user-first-name").value;
  const lastName = document.querySelector("#user-last-name").value;
  const userName = document.querySelector("#user-name").value;
  const password = document.querySelector("#user-password").value;

  const userObject = _user.default.buildUserObject(firstName, lastName, userName, password);

  _userCollection.default.addUser(userObject).then(user => user.json()).then(user => {
    console.log("you just added a user!", user);
    sessionStorage.setItem("userId", user.id);
  });
}); //add event listener on the login button to log in a user and store their userID in the session

document.querySelector("#login-btn").addEventListener("click", () => {
  const userName = document.querySelector("#user-login-name").value;
  const password = document.querySelector("#user-login-password").value;

  _userCollection.default.getSingleUser("userName", userName).then(singleUser => {
    console.log(singleUser);
    sessionStorage.setItem("userId", singleUser[0].id);

    _contactList.default.printUserContacts(singleUser[0].id);
  });
}); //add event listener on the logout button to remove a userID from session storage and clear contacts

document.querySelector("#logout-btn").addEventListener("click", () => {
  sessionStorage.clear("userId");
  console.log("user id cleared");
});

},{"./contact.js":1,"./contactCollection.js":2,"./contactForm":3,"./contactList.js":4,"./user.js":6,"./userCollection.js":7,"./userForms.js":8}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const userForms = {
  makeRegisterForm: () => {
    document.querySelector("#register-container").innerHTML = `<legend>Register</legend>
        <input type="text" name="userFirstName" id="user-first-name" placeholder="First Name"></input> <br>
        <input type="text" name="userLastName" id="user-last-name" placeholder="Last Name"><br>
        <input type="text" name="userName" id="user-name" placeholder="Enter Username"><br>
        <input type="password" name="password" id="user-password" placeholder="Enter Password"><br>
        <button type="register" id="register-btn">register</button>`;
  },
  makeLoginForm: () => {
    document.querySelector("#login-container").innerHTML = `<legend>Login</legend>
        <input type="text" name="userName" id="user-login-name" placeholder="Enter Username"><br>
        <input type="password" name="password" id="user-login-password" placeholder="Enter Password"><br>
        <button type="submit" id="login-btn">login</button>
        <button type="submit" id="logout-btn">logout</button>`;
  }
};
var _default = userForms;
exports.default = _default;

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3VzZXIuanMiLCIuLi9zY3JpcHRzL3VzZXJDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy91c2VyRm9ybXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTtBQUdBLE1BQU0sY0FBYyxHQUFFO0FBQ2xCLEVBQUEsWUFBWSxFQUFHLGFBQUQsSUFBa0I7QUFFNUIsV0FBUTtjQUNGLGFBQWEsQ0FBQyxTQUFVLElBQUcsYUFBYSxDQUFDLFFBQVM7YUFDbkQsYUFBYSxDQUFDLFdBQVk7YUFDMUIsYUFBYSxDQUFDLE9BQVE7ZUFIM0I7QUFNSCxHQVRpQjtBQVdsQixFQUFBLGtCQUFrQixFQUFFLENBQUMsU0FBRCxFQUFZLFFBQVosRUFBc0IsS0FBdEIsRUFBNkIsT0FBN0IsS0FBeUM7QUFDekQsVUFBTSxhQUFhLEdBQUc7QUFFbEIsTUFBQSxTQUFTLEVBQUUsU0FGTztBQUdsQixNQUFBLFFBQVEsRUFBRSxRQUhRO0FBSWxCLE1BQUEsV0FBVyxFQUFFLEtBSks7QUFLbEIsTUFBQSxPQUFPLEVBQUUsT0FMUztBQU1sQixNQUFBLE1BQU0sRUFBRSxjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QjtBQU5VLEtBQXRCO0FBU0EsV0FBTyxhQUFQO0FBQ0g7QUF0QmlCLENBQXRCO2VBeUJlLGM7Ozs7Ozs7Ozs7QUM1QmY7QUFFQSxNQUFNLGNBQWMsR0FBRztBQUNuQixFQUFBLGNBQWMsRUFBRSxNQUFNO0FBRWxCLFdBQU8sS0FBSyxDQUFDLGdDQUFELENBQUwsQ0FDRixJQURFLENBQ0csUUFBUSxJQUFJLFFBQVEs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LElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIscUJBQXZCLEVBQThDLFNBQTlDLEdBQTJEOzs7OztvRUFBM0Q7QUFNSCxHQVRnQjtBQVVqQixFQUFBLGFBQWEsRUFBRSxNQUFNO0FBQ2pCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsa0JBQXZCLEVBQTJDLFNBQTNDLEdBQXdEOzs7OzhEQUF4RDtBQUtIO0FBaEJnQixDQUFqQjtlQWtCZSxTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy9jcmVhdGVzIEhUTUwgc3RyaW5nIGZvciBhIHNpbmdsZSBlbXBsb3llZSwgb3IgYW4gb2JqZWN0IHdoZW4gdGhlcmUgaXMgYSBuZXcgaW5wdXRmcm9tIHRoZSBmb3JtXHJcblxyXG5cclxuY29uc3QgY29udGFjdEJ1aWxkZXIgPXtcclxuICAgIGJ1aWxkQ29udGFjdDogKHNpbmdsZUNvbnRhY3QpID0+e1xyXG5cclxuICAgICAgICByZXR1cm4gYDxkaXY+XHJcbiAgICAgICAgPGgzPiR7c2luZ2xlQ29udGFjdC5maXJzdE5hbWV9ICR7c2luZ2xlQ29udGFjdC5sYXN0TmFtZX08L2gzPlxyXG4gICAgICAgIDxwPiR7c2luZ2xlQ29udGFjdC5waG9uZU51bWJlcn08L3A+XHJcbiAgICAgICAgPHA+JHtzaW5nbGVDb250YWN0LmFkZHJlc3N9PC9wPlxyXG4gICAgICAgIDwvZGl2PmBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGJ1aWxkQ29udGFjdE9iamVjdDogKGZpcnN0TmFtZSwgbGFzdE5hbWUsIHBob25lLCBhZGRyZXNzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udGFjdE9iamVjdCA9IHtcclxuXHJcbiAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lLFxyXG4gICAgICAgICAgICBsYXN0TmFtZTogbGFzdE5hbWUsXHJcbiAgICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZSxcclxuICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyxcclxuICAgICAgICAgICAgdXNlcklkOiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29udGFjdE9iamVjdDtcclxuICAgIH1cclxuXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY29udGFjdEJ1aWxkZXI7IiwiLy8gdGhpcyBtb2R1bGUgd2lsbCBjYWxsIGFwaSB0byBnZXQgYWxsIGNvbnRhY3RzLCBhbmQgdG8gYWRkIGFub3RoZXIgY29udGFjdFxyXG5cclxuY29uc3QgY29udGFjdE1hbmFnZXIgPSB7XHJcbiAgICBnZXRBbGxDb250YWN0czogKCkgPT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIilcclxuICAgICAgICAgICAgLnRoZW4oY29udGFjdHMgPT4gY29udGFjdHMuanNvbigpKVxyXG4gICAgfSxcclxuICAgIGFkZENvbnRhY3Q6IChjb250YWN0T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29udGFjdE9iamVjdClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRVc2VyQ29udGFjdHM6ICh1c2VySWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0cz91c2VySWQ9JHt1c2VySWR9YClcclxuICAgICAgICAgICAgLnRoZW4oY29udGFjdHMgPT4gY29udGFjdHMuanNvbigpKVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb250YWN0TWFuYWdlcjtcclxuIiwiY29uc3QgbWFrZUNvbnRhY3RGb3JtID0gKCkgPT57XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1jb250YWluZXJcIikuaW5uZXJIVE1MID1gXHJcbjxsZWdlbmQ+Q3JlYXRlIGEgTmV3IENvbnRhY3Q8L2xlZ2VuZD5cclxuPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZSA9IFwiZmlyc3ROYW1lXCIgaWQ9XCJmaXJzdC1uYW1lXCIgcGxhY2Vob2xkZXI9XCJGaXJzdCBOYW1lXCI+PGJyPlxyXG48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibGFzdE5hbWVcIiBpZD1cImxhc3QtbmFtZVwiIHBsYWNlaG9sZGVyPVwiTGFzdCBOYW1lXCI+PGJyPlxyXG48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lID1cInBob25lTnVtYmVyXCIsIGlkPVwicGhvbmUtbnVtYmVyXCIgcGxhY2Vob2xkZXI9XCJQaG9uZSBOdW1iZXJcIj48YnI+XHJcbjxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJhZGRyZXNzXCIgaWQ9XCJhZGRyZXNzXCIgcGxhY2Vob2xkZXI9XCJBZGRyZXNzXCI+PGJyPlxyXG48YnV0dG9uIHR5cGUgPSBcInN1Ym1pdFwiLCBpZD1cInN1Ym1pdC1idG5cIj5TdWJtaXQ8L2J1dHRvbj5gXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYWtlQ29udGFjdEZvcm07IiwiLy8gdGhpcyBtb2R1bGUgc2hvdWxkIGltcG9ydCBmcm9tIGFwaU1hbmFnZXIgKGdldCBlbXBsb3llZXMpIGFuZCBsb29wIHRocm91Z2ggYW5kIG9wdGlvbiB0byBwcmludCBvbmUgb3IgYWxsXHJcbi8vZXhwb3J0IGFuIG9iamVjdCB3aXRoIG1ldGhvZHMgKHByaW50IGFsbCwgcHJpbnQgc2luZ2xlKVxyXG5cclxuaW1wb3J0IGNvbnRhY3RNYW5hZ2VyIGZyb20gXCIuL2NvbnRhY3RDb2xsZWN0aW9uLmpzXCJcclxuaW1wb3J0IGNvbnRhY3RCdWlsZGVyIGZyb20gXCIuL2NvbnRhY3QuanNcIlxyXG5pbXBvcnQgdXNlck1hbmFnZXIgZnJvbSBcIi4vdXNlckNvbGxlY3Rpb24uanNcIjtcclxuXHJcbmNvbnN0IHByaW50Q29udGFjdHMgPSB7XHJcblxyXG5wcmludEFsbENvbnRhY3RzOigpPT57XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdC1saXN0XCIpLmlubmVySFRNTD1cIlwiXHJcblxyXG5jb250YWN0TWFuYWdlci5nZXRBbGxDb250YWN0cygpXHJcbi50aGVuKChwYXJzZWRDb250YWN0cyk9PntcclxuY29uc29sZS5sb2cocGFyc2VkQ29udGFjdHMpXHJcbnBhcnNlZENvbnRhY3RzLmZvckVhY2goc2luZ2xlQ29udGFjdE9iamVjdD0+IHtcclxuICAgIGNvbnN0IGNvbnRhY3RIVE1MU3RyaW5nID0gY29udGFjdEJ1aWxkZXIuYnVpbGRDb250YWN0KHNpbmdsZUNvbnRhY3RPYmplY3QpXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtbGlzdFwiKS5pbm5lckhUTUwrPWNvbnRhY3RCdWlsZGVyLmJ1aWxkQ29udGFjdChzaW5nbGVDb250YWN0T2JqZWN0KVxyXG5cclxufSlcclxuXHJcbn0pXHJcbn0sXHJcbnByaW50VXNlckNvbnRhY3RzOigpPT57XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtbGlzdFwiKS5pbm5lckhUTUw9XCJcIlxyXG4gICAgY29uc3QgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKVxyXG5cclxuICAgIHVzZXJNYW5hZ2VyLmdldFNpbmdsZVVzZXIoXCJpZFwiLCB1c2VySWQpXHJcbiAgICAudGhlbigodXNlcik9PntcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdldCBzaW5nbGUgdXNlclwiLCB1c2VyKVxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdC1saXN0XCIpLmlubmVySFRNTD1gPGgxPiR7dXNlclswXS5maXJzdE5hbWV9ICR7dXNlclswXS5sYXN0TmFtZX0ncyBDb250YWN0czwvaDE+YFxyXG4gICAgfSlcclxuICAgIGNvbnRhY3RNYW5hZ2VyLmdldFVzZXJDb250YWN0cyh1c2VySWQpXHJcbiAgICAudGhlbigocGFyc2VkQ29udGFjdHMpPT57XHJcbiAgICBjb25zb2xlLmxvZyhwYXJzZWRDb250YWN0cylcclxuXHJcbiAgICBwYXJzZWRDb250YWN0cy5mb3JFYWNoKHNpbmdsZUNvbnRhY3RPYmplY3Q9PiB7XHJcbiAgICAgICAgY29uc3QgY29udGFjdEhUTUxTdHJpbmcgPSBjb250YWN0QnVpbGRlci5idWlsZENvbnRhY3Qoc2luZ2xlQ29udGFjdE9iamVjdClcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtbGlzdFwiKS5pbm5lckhUTUwrPWNvbnRhY3RCdWlsZGVyLmJ1aWxkQ29udGFjdChzaW5nbGVDb250YWN0T2JqZWN0KVxyXG5cclxuICAgIH0pXHJcblxyXG4gICAgfSlcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpbnRDb250YWN0czsiLCJpbXBvcnQgbWFrZUNvbnRhY3RGb3JtIGZyb20gXCIuL2NvbnRhY3RGb3JtXCJcclxuaW1wb3J0IHByaW50Q29udGFjdHMgZnJvbSBcIi4vY29udGFjdExpc3QuanNcIlxyXG5pbXBvcnQgY29udGFjdE1hbmFnZXIgZnJvbSBcIi4vY29udGFjdENvbGxlY3Rpb24uanNcIlxyXG5pbXBvcnQgY29udGFjdEJ1aWxkZXIgZnJvbSBcIi4vY29udGFjdC5qc1wiXHJcbmltcG9ydCB1c2VyRm9ybXMgZnJvbSBcIi4vdXNlckZvcm1zLmpzXCI7XHJcbmltcG9ydCB1c2VyTWFuYWdlciBmcm9tIFwiLi91c2VyQ29sbGVjdGlvbi5qc1wiXHJcbmltcG9ydCB1c2VyQnVpbGRlciBmcm9tIFwiLi91c2VyLmpzXCJcclxuXHJcbnByaW50Q29udGFjdHMucHJpbnRBbGxDb250YWN0cygpO1xyXG5tYWtlQ29udGFjdEZvcm0oKTtcclxudXNlckZvcm1zLm1ha2VSZWdpc3RlckZvcm0oKTtcclxudXNlckZvcm1zLm1ha2VMb2dpbkZvcm0oKTtcclxuXHJcbi8vQWRkIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBjb250YWN0IGJ1dHRvbiB0byBzYXZlIGEgY29udGFjdCBhbmQgcG9zdCB0byBKU09OXHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1Ym1pdC1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuXHJcbiAgICAgICAgY29uc3QgZmlyc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaXJzdC1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgY29uc3QgbGFzdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xhc3QtbmFtZVwiKS52YWx1ZVxyXG4gICAgICAgIGNvbnN0IGFkZHJlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZHJlc3NcIikudmFsdWVcclxuICAgICAgICBjb25zdCBwaG9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGhvbmUtbnVtYmVyXCIpLnZhbHVlXHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RPYmplY3QgPSBjb250YWN0QnVpbGRlci5idWlsZENvbnRhY3RPYmplY3QoZmlyc3ROYW1lLCBsYXN0TmFtZSwgcGhvbmUsIGFkZHJlc3MpXHJcblxyXG4gICAgICAgIGNvbnRhY3RNYW5hZ2VyLmFkZENvbnRhY3QoY29udGFjdE9iamVjdClcclxuICAgICAgICAgICAgICAgIC50aGVuKHByaW50Q29udGFjdHMucHJpbnRVc2VyQ29udGFjdHMpXHJcbn0pXHJcbi8vQWRkIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSByZWdpc3RlciBidXR0b24gdG8gcmVnaXN0ZXIgYSBuZXcgdXNlclxyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3Rlci1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuXHJcbiAgICAgICAgY29uc3QgZmlyc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyLWZpcnN0LW5hbWVcIikudmFsdWVcclxuICAgICAgICBjb25zdCBsYXN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1sYXN0LW5hbWVcIikudmFsdWVcclxuICAgICAgICBjb25zdCB1c2VyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXItcGFzc3dvcmRcIikudmFsdWVcclxuXHJcbiAgICAgICAgY29uc3QgdXNlck9iamVjdCA9IHVzZXJCdWlsZGVyLmJ1aWxkVXNlck9iamVjdChmaXJzdE5hbWUsIGxhc3ROYW1lLCB1c2VyTmFtZSwgcGFzc3dvcmQpXHJcblxyXG4gICAgICAgIHVzZXJNYW5hZ2VyLmFkZFVzZXIodXNlck9iamVjdClcclxuICAgICAgICAgICAgICAgIC50aGVuKHVzZXIgPT4gdXNlci5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbigodXNlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBqdXN0IGFkZGVkIGEgdXNlciFcIiwgdXNlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInVzZXJJZFwiLCB1c2VyLmlkKVxyXG4gICAgICAgICAgICAgICAgfSlcclxufSlcclxuXHJcbi8vYWRkIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBsb2dpbiBidXR0b24gdG8gbG9nIGluIGEgdXNlciBhbmQgc3RvcmUgdGhlaXIgdXNlcklEIGluIHRoZSBzZXNzaW9uXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyLWxvZ2luLW5hbWVcIikudmFsdWVcclxuICAgICAgICBjb25zdCBwYXNzd29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1sb2dpbi1wYXNzd29yZFwiKS52YWx1ZVxyXG5cclxuICAgICAgICB1c2VyTWFuYWdlci5nZXRTaW5nbGVVc2VyKFwidXNlck5hbWVcIiwgdXNlck5hbWUpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoc2luZ2xlVXNlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzaW5nbGVVc2VyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwidXNlcklkXCIsIHNpbmdsZVVzZXJbMF0uaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW50Q29udGFjdHMucHJpbnRVc2VyQ29udGFjdHMoc2luZ2xlVXNlclswXS5pZClcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuXHJcblxyXG59KVxyXG5cclxuLy9hZGQgZXZlbnQgbGlzdGVuZXIgb24gdGhlIGxvZ291dCBidXR0b24gdG8gcmVtb3ZlIGEgdXNlcklEIGZyb20gc2Vzc2lvbiBzdG9yYWdlIGFuZCBjbGVhciBjb250YWN0c1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ291dC1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XHJcblxyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKFwidXNlcklkXCIpXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyIGlkIGNsZWFyZWRcIilcclxufSlcclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCIvL2NyZWF0ZXMgSFRNTCBzdHJpbmcgZm9yIGEgc2luZ2xlIGVtcGxveWVlLCBvciBhbiBvYmplY3Qgd2hlbiB0aGVyZSBpcyBhIG5ldyBpbnB1dGZyb20gdGhlIGZvcm1cclxuXHJcblxyXG5jb25zdCB1c2VyQnVpbGRlciA9e1xyXG4gICAgYnVpbGRVc2VyOiAoc2luZ2xlVXNlcikgPT57XHJcblxyXG4gICAgICAgIHJldHVybiBgPGRpdj5cclxuICAgICAgICA8aDM+JHtzaW5nbGVVc2VyLmZpcnN0TmFtZX0gJHtzaW5nbGVVc2VyLmxhc3ROYW1lfTwvaDM+XHJcbiAgICAgICAgPHA+JHtzaW5nbGVVc2VyLnVzZXJOYW1lfTwvcD5cclxuICAgICAgICA8cD4ke3NpbmdsZVVzZXIucGFzc3dvcmR9PC9wPlxyXG4gICAgICAgIDwvZGl2PmBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGJ1aWxkVXNlck9iamVjdDogKGZpcnN0TmFtZSwgbGFzdE5hbWUsIHVzZXJOYW1lLCBwYXNzd29yZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJPYmplY3QgPSB7XHJcblxyXG4gICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSxcclxuICAgICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lLFxyXG4gICAgICAgICAgICB1c2VyTmFtZTogdXNlck5hbWUsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHVzZXJPYmplY3Q7XHJcbiAgICB9XHJcblxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHVzZXJCdWlsZGVyOyIsIi8vIFRoaXMgbW9kdWxlIHdpbGwgbWFuYWdlIHRoZSB1c2VyIGRhdGFiYXNlXHJcblxyXG5jb25zdCB1c2VyTWFuYWdlciA9IHtcclxuICAgIGdldEFsbFVzZXJzOiAoKSA9PiB7XHJcblxyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiKVxyXG4gICAgICAgICAgICAudGhlbih1c2VycyA9PiB1c2Vycy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgYWRkVXNlcjogKHVzZXJPYmplY3QpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VyT2JqZWN0KVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZ2V0U2luZ2xlVXNlcjoodXNlcktleSwgdXNlclZhbHVlKT0+e1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzPyR7dXNlcktleX09JHt1c2VyVmFsdWV9YClcclxuICAgICAgICAgICAgLnRoZW4odXNlcnMgPT4gdXNlcnMuanNvbigpKVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVzZXJNYW5hZ2VyOyIsImNvbnN0IHVzZXJGb3JtcyA9e1xyXG5cclxubWFrZVJlZ2lzdGVyRm9ybTogKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3Rlci1jb250YWluZXJcIikuaW5uZXJIVE1MID0gYDxsZWdlbmQ+UmVnaXN0ZXI8L2xlZ2VuZD5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidXNlckZpcnN0TmFtZVwiIGlkPVwidXNlci1maXJzdC1uYW1lXCIgcGxhY2Vob2xkZXI9XCJGaXJzdCBOYW1lXCI+PC9pbnB1dD4gPGJyPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ1c2VyTGFzdE5hbWVcIiBpZD1cInVzZXItbGFzdC1uYW1lXCIgcGxhY2Vob2xkZXI9XCJMYXN0IE5hbWVcIj48YnI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInVzZXJOYW1lXCIgaWQ9XCJ1c2VyLW5hbWVcIiBwbGFjZWhvbGRlcj1cIkVudGVyIFVzZXJuYW1lXCI+PGJyPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIiBpZD1cInVzZXItcGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIkVudGVyIFBhc3N3b3JkXCI+PGJyPlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cInJlZ2lzdGVyXCIgaWQ9XCJyZWdpc3Rlci1idG5cIj5yZWdpc3RlcjwvYnV0dG9uPmBcclxufSxcclxubWFrZUxvZ2luRm9ybTogKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1jb250YWluZXJcIikuaW5uZXJIVE1MID0gYDxsZWdlbmQ+TG9naW48L2xlZ2VuZD5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidXNlck5hbWVcIiBpZD1cInVzZXItbG9naW4tbmFtZVwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgVXNlcm5hbWVcIj48YnI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIGlkPVwidXNlci1sb2dpbi1wYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgUGFzc3dvcmRcIj48YnI+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgaWQ9XCJsb2dpbi1idG5cIj5sb2dpbjwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGlkPVwibG9nb3V0LWJ0blwiPmxvZ291dDwvYnV0dG9uPmBcclxufVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHVzZXJGb3JtcztcclxuXHJcbiJdfQ==
