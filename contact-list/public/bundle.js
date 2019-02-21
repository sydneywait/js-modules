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

    _contactCollection.default.getUserContacts().then(parsedContacts => {
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

},{"./contact.js":1,"./contactCollection.js":2}],5:[function(require,module,exports){
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

_userForms.default.makeLoginForm();

document.querySelector("#submit-btn").addEventListener("click", () => {
  const firstName = document.querySelector("#first-name").value;
  const lastName = document.querySelector("#last-name").value;
  const address = document.querySelector("#address").value;
  const phone = document.querySelector("#phone-number").value;

  const contactObject = _contact.default.buildContactObject(firstName, lastName, phone, address);

  _contactCollection.default.addContact(contactObject).then(printAllContacts);
});
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
});
document.querySelector("#login-btn").addEventListener("click", () => {
  const userName = document.querySelector("#user-login-name").value;
  const password = document.querySelector("#user-password-name").value;
  getSingleUser(userName).then(singleUser => {
    sessionStorage.setItem("userId", singleUser[userId]);

    _contactList.default.printUserContacts(singleUser[userId]);
  });
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
  getSingleUser: userName => {
    return fetch(`http://localhost:8088/users?userName=${userName}`).then(users => users.json());
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
        <button type="submit" id="login-btn">login</button>`;
  }
};
var _default = userForms;
exports.default = _default;

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3VzZXIuanMiLCIuLi9zY3JpcHRzL3VzZXJDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy91c2VyRm9ybXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTtBQUdBLE1BQU0sY0FBYyxHQUFFO0FBQ2xCLEVBQUEsWUFBWSxFQUFHLGFBQUQsSUFBa0I7QUFFNUIsV0FBUTtjQUNGLGFBQWEsQ0FBQyxTQUFVLElBQUcsYUFBYSxDQUFDLFFBQVM7YUFDbkQsYUFBYSxDQUFDLFdBQVk7YUFDMUIsYUFBYSxDQUFDLE9BQVE7ZUFIM0I7QUFNSCxHQVRpQjtBQVdsQixFQUFBLGtCQUFrQixFQUFFLENBQUMsU0FBRCxFQUFZLFFBQVosRUFBc0IsS0FBdEIsRUFBNkIsT0FBN0IsS0FBeUM7QUFDekQsVUFBTSxhQUFhLEdBQUc7QUFFbEIsTUFBQSxTQUFTLEVBQUUsU0FGTztBQUdsQixNQUFBLFFBQVEsRUFBRSxRQUhRO0FBSWxCLE1BQUEsV0FBVyxFQUFFLEtBSks7QUFLbEIsTUFBQSxPQUFPLEVBQUUsT0FMUztBQU1sQixNQUFBLE1BQU0sRUFBRSxjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QjtBQU5VLEtBQXRCO0FBU0EsV0FBTyxhQUFQO0FBQ0g7QUF0QmlCLENBQXRCO2VBeUJlLGM7Ozs7Ozs7Ozs7QUM1QmY7QUFFQSxNQUFNLGNBQWMsR0FBRztBQUNuQixFQUFBLGNBQWMsRUFBRSxNQUFNO0FBRWxCLFdBQU8sS0FBSyxDQUFDLGdDQUFELENBQUwsQ0FDRixJQURFLENBQ0csUUFBUSxJQUFJLFFBQVEs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QjtBQUt4QyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLFVBQWY7QUFMa0MsS0FBaEMsQ0FBWjtBQU9ILEdBZGU7QUFlaEIsRUFBQSxhQUFhLEVBQUUsUUFBRCxJQUFZO0FBQ3RCLFdBQU8sS0FBSyxDQUFFLHdDQUF1QyxRQUFTLEVBQWxELENBQUwsQ0FDRixJQURFLENBQ0csS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFOLEVBRFosQ0FBUDtBQUVIO0FBbEJlLENBQXBCO2VBd0JlLFc7Ozs7Ozs7Ozs7QUMxQmYsTUFBTSxTQUFTLEdBQUU7QUFFakIsRUFBQSxnQkFBZ0IsRUFBRSxNQUFNO0FBQ3BCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIscUJBQXZCLEVBQThDLFNBQTlDLEdBQTJEOzs7OztvRUFBM0Q7QUFNSCxHQVRnQjtBQVVqQixFQUFBLGFBQWEsRUFBRSxNQUFNO0FBQ2pCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsa0JBQXZCLEVBQTJDLFNBQTNDLEdBQXdEOzs7OzREQUF4RDtBQUtIO0FBaEJnQixDQUFqQjtlQWtCZSxTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy9jcmVhdGVzIEhUTUwgc3RyaW5nIGZvciBhIHNpbmdsZSBlbXBsb3llZSwgb3IgYW4gb2JqZWN0IHdoZW4gdGhlcmUgaXMgYSBuZXcgaW5wdXRmcm9tIHRoZSBmb3JtXHJcblxyXG5cclxuY29uc3QgY29udGFjdEJ1aWxkZXIgPXtcclxuICAgIGJ1aWxkQ29udGFjdDogKHNpbmdsZUNvbnRhY3QpID0+e1xyXG5cclxuICAgICAgICByZXR1cm4gYDxkaXY+XHJcbiAgICAgICAgPGgzPiR7c2luZ2xlQ29udGFjdC5maXJzdE5hbWV9ICR7c2luZ2xlQ29udGFjdC5sYXN0TmFtZX08L2gzPlxyXG4gICAgICAgIDxwPiR7c2luZ2xlQ29udGFjdC5waG9uZU51bWJlcn08L3A+XHJcbiAgICAgICAgPHA+JHtzaW5nbGVDb250YWN0LmFkZHJlc3N9PC9wPlxyXG4gICAgICAgIDwvZGl2PmBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGJ1aWxkQ29udGFjdE9iamVjdDogKGZpcnN0TmFtZSwgbGFzdE5hbWUsIHBob25lLCBhZGRyZXNzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udGFjdE9iamVjdCA9IHtcclxuXHJcbiAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lLFxyXG4gICAgICAgICAgICBsYXN0TmFtZTogbGFzdE5hbWUsXHJcbiAgICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZSxcclxuICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyxcclxuICAgICAgICAgICAgdXNlcklkOiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29udGFjdE9iamVjdDtcclxuICAgIH1cclxuXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY29udGFjdEJ1aWxkZXI7IiwiLy8gdGhpcyBtb2R1bGUgd2lsbCBjYWxsIGFwaSB0byBnZXQgYWxsIGNvbnRhY3RzLCBhbmQgdG8gYWRkIGFub3RoZXIgY29udGFjdFxyXG5cclxuY29uc3QgY29udGFjdE1hbmFnZXIgPSB7XHJcbiAgICBnZXRBbGxDb250YWN0czogKCkgPT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIilcclxuICAgICAgICAgICAgLnRoZW4oY29udGFjdHMgPT4gY29udGFjdHMuanNvbigpKVxyXG4gICAgfSxcclxuICAgIGFkZENvbnRhY3Q6IChjb250YWN0T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29udGFjdE9iamVjdClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRVc2VyQ29udGFjdHM6ICh1c2VySWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0cz91c2VySWQ9JHt1c2VySWR9YClcclxuICAgICAgICAgICAgLnRoZW4oY29udGFjdHMgPT4gY29udGFjdHMuanNvbigpKVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb250YWN0TWFuYWdlcjtcclxuIiwiY29uc3QgbWFrZUNvbnRhY3RGb3JtID0gKCkgPT57XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1jb250YWluZXJcIikuaW5uZXJIVE1MID1gXHJcbjxsZWdlbmQ+Q3JlYXRlIGEgTmV3IENvbnRhY3Q8L2xlZ2VuZD5cclxuPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZSA9IFwiZmlyc3ROYW1lXCIgaWQ9XCJmaXJzdC1uYW1lXCIgcGxhY2Vob2xkZXI9XCJGaXJzdCBOYW1lXCI+PGJyPlxyXG48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibGFzdE5hbWVcIiBpZD1cImxhc3QtbmFtZVwiIHBsYWNlaG9sZGVyPVwiTGFzdCBOYW1lXCI+PGJyPlxyXG48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lID1cInBob25lTnVtYmVyXCIsIGlkPVwicGhvbmUtbnVtYmVyXCIgcGxhY2Vob2xkZXI9XCJQaG9uZSBOdW1iZXJcIj48YnI+XHJcbjxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJhZGRyZXNzXCIgaWQ9XCJhZGRyZXNzXCIgcGxhY2Vob2xkZXI9XCJBZGRyZXNzXCI+PGJyPlxyXG48YnV0dG9uIHR5cGUgPSBcInN1Ym1pdFwiLCBpZD1cInN1Ym1pdC1idG5cIj5TdWJtaXQ8L2J1dHRvbj5gXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYWtlQ29udGFjdEZvcm07IiwiLy8gdGhpcyBtb2R1bGUgc2hvdWxkIGltcG9ydCBmcm9tIGFwaU1hbmFnZXIgKGdldCBlbXBsb3llZXMpIGFuZCBsb29wIHRocm91Z2ggYW5kIG9wdGlvbiB0byBwcmludCBvbmUgb3IgYWxsXHJcbi8vZXhwb3J0IGFuIG9iamVjdCB3aXRoIG1ldGhvZHMgKHByaW50IGFsbCwgcHJpbnQgc2luZ2xlKVxyXG5cclxuaW1wb3J0IGNvbnRhY3RNYW5hZ2VyIGZyb20gXCIuL2NvbnRhY3RDb2xsZWN0aW9uLmpzXCJcclxuaW1wb3J0IGNvbnRhY3RCdWlsZGVyIGZyb20gXCIuL2NvbnRhY3QuanNcIlxyXG5cclxuY29uc3QgcHJpbnRDb250YWN0cyA9IHtcclxuXHJcbnByaW50QWxsQ29udGFjdHM6KCk9PntcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWxpc3RcIikuaW5uZXJIVE1MPVwiXCJcclxuXHJcbmNvbnRhY3RNYW5hZ2VyLmdldEFsbENvbnRhY3RzKClcclxuLnRoZW4oKHBhcnNlZENvbnRhY3RzKT0+e1xyXG5jb25zb2xlLmxvZyhwYXJzZWRDb250YWN0cylcclxucGFyc2VkQ29udGFjdHMuZm9yRWFjaChzaW5nbGVDb250YWN0T2JqZWN0PT4ge1xyXG4gICAgY29uc3QgY29udGFjdEhUTUxTdHJpbmcgPSBjb250YWN0QnVpbGRlci5idWlsZENvbnRhY3Qoc2luZ2xlQ29udGFjdE9iamVjdClcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdC1saXN0XCIpLmlubmVySFRNTCs9Y29udGFjdEJ1aWxkZXIuYnVpbGRDb250YWN0KHNpbmdsZUNvbnRhY3RPYmplY3QpXHJcblxyXG59KVxyXG5cclxufSlcclxufSxcclxucHJpbnRVc2VyQ29udGFjdHM6KCk9PntcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdC1saXN0XCIpLmlubmVySFRNTD1cIlwiXHJcblxyXG4gICAgY29udGFjdE1hbmFnZXIuZ2V0VXNlckNvbnRhY3RzKClcclxuICAgIC50aGVuKChwYXJzZWRDb250YWN0cyk9PntcclxuICAgIGNvbnNvbGUubG9nKHBhcnNlZENvbnRhY3RzKVxyXG4gICAgcGFyc2VkQ29udGFjdHMuZm9yRWFjaChzaW5nbGVDb250YWN0T2JqZWN0PT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RIVE1MU3RyaW5nID0gY29udGFjdEJ1aWxkZXIuYnVpbGRDb250YWN0KHNpbmdsZUNvbnRhY3RPYmplY3QpXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWxpc3RcIikuaW5uZXJIVE1MKz1jb250YWN0QnVpbGRlci5idWlsZENvbnRhY3Qoc2luZ2xlQ29udGFjdE9iamVjdClcclxuXHJcbiAgICB9KVxyXG5cclxuICAgIH0pXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByaW50Q29udGFjdHM7IiwiaW1wb3J0IG1ha2VDb250YWN0Rm9ybSBmcm9tIFwiLi9jb250YWN0Rm9ybVwiXHJcbmltcG9ydCBwcmludENvbnRhY3RzIGZyb20gXCIuL2NvbnRhY3RMaXN0LmpzXCJcclxuaW1wb3J0IGNvbnRhY3RNYW5hZ2VyIGZyb20gXCIuL2NvbnRhY3RDb2xsZWN0aW9uLmpzXCJcclxuaW1wb3J0IGNvbnRhY3RCdWlsZGVyIGZyb20gXCIuL2NvbnRhY3QuanNcIlxyXG5pbXBvcnQgdXNlckZvcm1zIGZyb20gXCIuL3VzZXJGb3Jtcy5qc1wiO1xyXG5pbXBvcnQgdXNlck1hbmFnZXIgZnJvbSBcIi4vdXNlckNvbGxlY3Rpb24uanNcIlxyXG5pbXBvcnQgdXNlckJ1aWxkZXIgZnJvbSBcIi4vdXNlci5qc1wiXHJcblxyXG5wcmludENvbnRhY3RzLnByaW50QWxsQ29udGFjdHMoKTtcclxubWFrZUNvbnRhY3RGb3JtKCk7XHJcbnVzZXJGb3Jtcy5tYWtlUmVnaXN0ZXJGb3JtKCk7XHJcbnVzZXJGb3Jtcy5tYWtlTG9naW5Gb3JtKCk7XHJcblxyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdWJtaXQtYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGZpcnN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZmlyc3QtbmFtZVwiKS52YWx1ZVxyXG4gICAgICAgIGNvbnN0IGxhc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYXN0LW5hbWVcIikudmFsdWVcclxuICAgICAgICBjb25zdCBhZGRyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGRyZXNzXCIpLnZhbHVlXHJcbiAgICAgICAgY29uc3QgcGhvbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bob25lLW51bWJlclwiKS52YWx1ZVxyXG5cclxuICAgICAgICBjb25zdCBjb250YWN0T2JqZWN0ID0gY29udGFjdEJ1aWxkZXIuYnVpbGRDb250YWN0T2JqZWN0KGZpcnN0TmFtZSwgbGFzdE5hbWUsIHBob25lLCBhZGRyZXNzKVxyXG5cclxuICAgICAgICBjb250YWN0TWFuYWdlci5hZGRDb250YWN0KGNvbnRhY3RPYmplY3QpXHJcbiAgICAgICAgICAgICAgICAudGhlbihwcmludEFsbENvbnRhY3RzKVxyXG59KVxyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3Rlci1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuXHJcbiAgICAgICAgY29uc3QgZmlyc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyLWZpcnN0LW5hbWVcIikudmFsdWVcclxuICAgICAgICBjb25zdCBsYXN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1sYXN0LW5hbWVcIikudmFsdWVcclxuICAgICAgICBjb25zdCB1c2VyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXItcGFzc3dvcmRcIikudmFsdWVcclxuXHJcbiAgICAgICAgY29uc3QgdXNlck9iamVjdCA9IHVzZXJCdWlsZGVyLmJ1aWxkVXNlck9iamVjdChmaXJzdE5hbWUsIGxhc3ROYW1lLCB1c2VyTmFtZSwgcGFzc3dvcmQpXHJcblxyXG4gICAgICAgIHVzZXJNYW5hZ2VyLmFkZFVzZXIodXNlck9iamVjdClcclxuICAgICAgICAudGhlbih1c2VyID0+IHVzZXIuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHVzZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UganVzdCBhZGRlZCBhIHVzZXIhXCIsIHVzZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgdXNlci5pZCwgKVxyXG4gICAgICAgICAgICAgICAgfSlcclxufSlcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyLWxvZ2luLW5hbWVcIikudmFsdWVcclxuICAgICAgICBjb25zdCBwYXNzd29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1wYXNzd29yZC1uYW1lXCIpLnZhbHVlXHJcblxyXG4gICAgICAgIGdldFNpbmdsZVVzZXIodXNlck5hbWUpXHJcbi50aGVuKChzaW5nbGVVc2VyKT0+e1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgc2luZ2xlVXNlclt1c2VySWRdKVxyXG4gICAgICAgIHByaW50Q29udGFjdHMucHJpbnRVc2VyQ29udGFjdHMoc2luZ2xlVXNlclt1c2VySWRdKVxyXG5cclxufSlcclxuXHJcblxyXG5cclxufSlcclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCIvL2NyZWF0ZXMgSFRNTCBzdHJpbmcgZm9yIGEgc2luZ2xlIGVtcGxveWVlLCBvciBhbiBvYmplY3Qgd2hlbiB0aGVyZSBpcyBhIG5ldyBpbnB1dGZyb20gdGhlIGZvcm1cclxuXHJcblxyXG5jb25zdCB1c2VyQnVpbGRlciA9e1xyXG4gICAgYnVpbGRVc2VyOiAoc2luZ2xlVXNlcikgPT57XHJcblxyXG4gICAgICAgIHJldHVybiBgPGRpdj5cclxuICAgICAgICA8aDM+JHtzaW5nbGVVc2VyLmZpcnN0TmFtZX0gJHtzaW5nbGVVc2VyLmxhc3ROYW1lfTwvaDM+XHJcbiAgICAgICAgPHA+JHtzaW5nbGVVc2VyLnVzZXJOYW1lfTwvcD5cclxuICAgICAgICA8cD4ke3NpbmdsZVVzZXIucGFzc3dvcmR9PC9wPlxyXG4gICAgICAgIDwvZGl2PmBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGJ1aWxkVXNlck9iamVjdDogKGZpcnN0TmFtZSwgbGFzdE5hbWUsIHVzZXJOYW1lLCBwYXNzd29yZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJPYmplY3QgPSB7XHJcblxyXG4gICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSxcclxuICAgICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lLFxyXG4gICAgICAgICAgICB1c2VyTmFtZTogdXNlck5hbWUsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHVzZXJPYmplY3Q7XHJcbiAgICB9XHJcblxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHVzZXJCdWlsZGVyOyIsIi8vIFRoaXMgbW9kdWxlIHdpbGwgbWFuYWdlIHRoZSB1c2VyIGRhdGFiYXNlXHJcblxyXG5jb25zdCB1c2VyTWFuYWdlciA9IHtcclxuICAgIGdldEFsbFVzZXJzOiAoKSA9PiB7XHJcblxyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiKVxyXG4gICAgICAgICAgICAudGhlbih1c2VycyA9PiB1c2Vycy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgYWRkVXNlcjogKHVzZXJPYmplY3QpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VyT2JqZWN0KVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZ2V0U2luZ2xlVXNlcjoodXNlck5hbWUpPT57XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnM/dXNlck5hbWU9JHt1c2VyTmFtZX1gKVxyXG4gICAgICAgICAgICAudGhlbih1c2VycyA9PiB1c2Vycy5qc29uKCkpXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXNlck1hbmFnZXI7IiwiY29uc3QgdXNlckZvcm1zID17XHJcblxyXG5tYWtlUmVnaXN0ZXJGb3JtOiAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyLWNvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBgPGxlZ2VuZD5SZWdpc3RlcjwvbGVnZW5kPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ1c2VyRmlyc3ROYW1lXCIgaWQ9XCJ1c2VyLWZpcnN0LW5hbWVcIiBwbGFjZWhvbGRlcj1cIkZpcnN0IE5hbWVcIj48L2lucHV0PiA8YnI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInVzZXJMYXN0TmFtZVwiIGlkPVwidXNlci1sYXN0LW5hbWVcIiBwbGFjZWhvbGRlcj1cIkxhc3QgTmFtZVwiPjxicj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidXNlck5hbWVcIiBpZD1cInVzZXItbmFtZVwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgVXNlcm5hbWVcIj48YnI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIGlkPVwidXNlci1wYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgUGFzc3dvcmRcIj48YnI+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwicmVnaXN0ZXJcIiBpZD1cInJlZ2lzdGVyLWJ0blwiPnJlZ2lzdGVyPC9idXR0b24+YFxyXG59LFxyXG5tYWtlTG9naW5Gb3JtOiAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBgPGxlZ2VuZD5Mb2dpbjwvbGVnZW5kPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ1c2VyTmFtZVwiIGlkPVwidXNlci1sb2dpbi1uYW1lXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBVc2VybmFtZVwiPjxicj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIgaWQ9XCJ1c2VyLWxvZ2luLXBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBQYXNzd29yZFwiPjxicj5cclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBpZD1cImxvZ2luLWJ0blwiPmxvZ2luPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgaWQ9XCJsb2dpbi1idG5cIj5sb2dpbjwvYnV0dG9uPmBcclxufVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHVzZXJGb3JtcztcclxuXHJcbiJdfQ==
