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
    const userId = sessionStorage.getItem("userId");

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

  _contactCollection.default.addContact(contactObject).then(_contactList.default.printUserContacts);
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
  const password = document.querySelector("#user-login-password").value;

  _userCollection.default.getSingleUser(userName).then(singleUser => {
    console.log(singleUser);
    sessionStorage.setItem("userId", singleUser[0].id);

    _contactList.default.printUserContacts(singleUser[0].id);
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
        <button type="submit" id="logout-btn">logout</button>`;
  }
};
var _default = userForms;
exports.default = _default;

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3VzZXIuanMiLCIuLi9zY3JpcHRzL3VzZXJDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy91c2VyRm9ybXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTtBQUdBLE1BQU0sY0FBYyxHQUFFO0FBQ2xCLEVBQUEsWUFBWSxFQUFHLGFBQUQsSUFBa0I7QUFFNUIsV0FBUTtjQUNGLGFBQWEsQ0FBQyxTQUFVLElBQUcsYUFBYSxDQUFDLFFBQVM7YUFDbkQsYUFBYSxDQUFDLFdBQVk7YUFDMUIsYUFBYSxDQUFDLE9BQVE7ZUFIM0I7QUFNSCxHQVRpQjtBQVdsQixFQUFBLGtCQUFrQixFQUFFLENBQUMsU0FBRCxFQUFZLFFBQVosRUFBc0IsS0FBdEIsRUFBNkIsT0FBN0IsS0FBeUM7QUFDekQsVUFBTSxhQUFhLEdBQUc7QUFFbEIsTUFBQSxTQUFTLEVBQUUsU0FGTztBQUdsQixNQUFBLFFBQVEsRUFBRSxRQUhRO0FBSWxCLE1BQUEsV0FBVyxFQUFFLEtBSks7QUFLbEIsTUFBQSxPQUFPLEVBQUUsT0FMUztBQU1sQixNQUFBLE1BQU0sRUFBRSxjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QjtBQU5VLEtBQXRCO0FBU0EsV0FBTyxhQUFQO0FBQ0g7QUF0QmlCLENBQXRCO2VBeUJlLGM7Ozs7Ozs7Ozs7QUM1QmY7QUFFQSxNQUFNLGNBQWMsR0FBRztBQUNuQixFQUFBLGNBQWMsRUFBRSxNQUFNO0FBRWxCLFdBQU8sS0FBSyxDQUFDLGdDQUFELENBQUwsQ0FDRixJQURFLENBQ0csUUFBUSxJQUFJLFFBQVEs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QUFBLE9BQU8sRUFBRyxVQUFELElBQWdCO0FBQ3JCLFdBQU8sS0FBSyxDQUFDLDZCQUFELEVBQWdDO0FBQ3hDLE1BQUEsTUFBTSxFQUFFLE1BRGdDO0FBRXhDLE1BQUEsT0FBTyxFQUFFO0FBQ0wsd0JBQWdCO0FBRFgsT0FGK0I7QUFLeEMsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxVQUFmO0FBTGtDLEtBQWhDLENBQVo7QUFPSCxHQWRlO0FBZWhCLEVBQUEsYUFBYSxFQUFFLFFBQUQsSUFBWTtBQUN0QixXQUFPLEtBQUssQ0FBRSx3Q0FBdUMsUUFBUyxFQUFsRCxDQUFMLENBQ0YsSUFERSxDQUNHLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBTixFQURaLENBQVA7QUFFSDtBQWxCZSxDQUFwQjtlQXdCZSxXOzs7Ozs7Ozs7O0FDMUJmLE1BQU0sU0FBUyxHQUFFO0FBRWpCLEVBQUEsZ0JBQWdCLEVBQUUsTUFBTTtBQUNwQixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLHFCQUF2QixFQUE4QyxTQUE5QyxHQUEyRDs7Ozs7b0VBQTNEO0FBTUgsR0FUZ0I7QUFVakIsRUFBQSxhQUFhLEVBQUUsTUFBTTtBQUNqQixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGtCQUF2QixFQUEyQyxTQUEzQyxHQUF3RDs7Ozs4REFBeEQ7QUFLSDtBQWhCZ0IsQ0FBakI7ZUFrQmUsUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vY3JlYXRlcyBIVE1MIHN0cmluZyBmb3IgYSBzaW5nbGUgZW1wbG95ZWUsIG9yIGFuIG9iamVjdCB3aGVuIHRoZXJlIGlzIGEgbmV3IGlucHV0ZnJvbSB0aGUgZm9ybVxyXG5cclxuXHJcbmNvbnN0IGNvbnRhY3RCdWlsZGVyID17XHJcbiAgICBidWlsZENvbnRhY3Q6IChzaW5nbGVDb250YWN0KSA9PntcclxuXHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2PlxyXG4gICAgICAgIDxoMz4ke3NpbmdsZUNvbnRhY3QuZmlyc3ROYW1lfSAke3NpbmdsZUNvbnRhY3QubGFzdE5hbWV9PC9oMz5cclxuICAgICAgICA8cD4ke3NpbmdsZUNvbnRhY3QucGhvbmVOdW1iZXJ9PC9wPlxyXG4gICAgICAgIDxwPiR7c2luZ2xlQ29udGFjdC5hZGRyZXNzfTwvcD5cclxuICAgICAgICA8L2Rpdj5gXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBidWlsZENvbnRhY3RPYmplY3Q6IChmaXJzdE5hbWUsIGxhc3ROYW1lLCBwaG9uZSwgYWRkcmVzcykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RPYmplY3QgPSB7XHJcblxyXG4gICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSxcclxuICAgICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lLFxyXG4gICAgICAgICAgICBwaG9uZU51bWJlcjogcGhvbmUsXHJcbiAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MsXHJcbiAgICAgICAgICAgIHVzZXJJZDogc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhY3RPYmplY3Q7XHJcbiAgICB9XHJcblxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNvbnRhY3RCdWlsZGVyOyIsIi8vIHRoaXMgbW9kdWxlIHdpbGwgY2FsbCBhcGkgdG8gZ2V0IGFsbCBjb250YWN0cywgYW5kIHRvIGFkZCBhbm90aGVyIGNvbnRhY3RcclxuXHJcbmNvbnN0IGNvbnRhY3RNYW5hZ2VyID0ge1xyXG4gICAgZ2V0QWxsQ29udGFjdHM6ICgpID0+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKGNvbnRhY3RzID0+IGNvbnRhY3RzLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBhZGRDb250YWN0OiAoY29udGFjdE9iamVjdCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0c1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbnRhY3RPYmplY3QpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0VXNlckNvbnRhY3RzOiAodXNlcklkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHM/dXNlcklkPSR7dXNlcklkfWApXHJcbiAgICAgICAgICAgIC50aGVuKGNvbnRhY3RzID0+IGNvbnRhY3RzLmpzb24oKSlcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29udGFjdE1hbmFnZXI7XHJcbiIsImNvbnN0IG1ha2VDb250YWN0Rm9ybSA9ICgpID0+e1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm0tY29udGFpbmVyXCIpLmlubmVySFRNTCA9YFxyXG48bGVnZW5kPkNyZWF0ZSBhIE5ldyBDb250YWN0PC9sZWdlbmQ+XHJcbjxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWUgPSBcImZpcnN0TmFtZVwiIGlkPVwiZmlyc3QtbmFtZVwiIHBsYWNlaG9sZGVyPVwiRmlyc3QgTmFtZVwiPjxicj5cclxuPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImxhc3ROYW1lXCIgaWQ9XCJsYXN0LW5hbWVcIiBwbGFjZWhvbGRlcj1cIkxhc3QgTmFtZVwiPjxicj5cclxuPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZSA9XCJwaG9uZU51bWJlclwiLCBpZD1cInBob25lLW51bWJlclwiIHBsYWNlaG9sZGVyPVwiUGhvbmUgTnVtYmVyXCI+PGJyPlxyXG48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiYWRkcmVzc1wiIGlkPVwiYWRkcmVzc1wiIHBsYWNlaG9sZGVyPVwiQWRkcmVzc1wiPjxicj5cclxuPGJ1dHRvbiB0eXBlID0gXCJzdWJtaXRcIiwgaWQ9XCJzdWJtaXQtYnRuXCI+U3VibWl0PC9idXR0b24+YFxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWFrZUNvbnRhY3RGb3JtOyIsIi8vIHRoaXMgbW9kdWxlIHNob3VsZCBpbXBvcnQgZnJvbSBhcGlNYW5hZ2VyIChnZXQgZW1wbG95ZWVzKSBhbmQgbG9vcCB0aHJvdWdoIGFuZCBvcHRpb24gdG8gcHJpbnQgb25lIG9yIGFsbFxyXG4vL2V4cG9ydCBhbiBvYmplY3Qgd2l0aCBtZXRob2RzIChwcmludCBhbGwsIHByaW50IHNpbmdsZSlcclxuXHJcbmltcG9ydCBjb250YWN0TWFuYWdlciBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvbi5qc1wiXHJcbmltcG9ydCBjb250YWN0QnVpbGRlciBmcm9tIFwiLi9jb250YWN0LmpzXCJcclxuXHJcbmNvbnN0IHByaW50Q29udGFjdHMgPSB7XHJcblxyXG5wcmludEFsbENvbnRhY3RzOigpPT57XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdC1saXN0XCIpLmlubmVySFRNTD1cIlwiXHJcblxyXG5jb250YWN0TWFuYWdlci5nZXRBbGxDb250YWN0cygpXHJcbi50aGVuKChwYXJzZWRDb250YWN0cyk9PntcclxuY29uc29sZS5sb2cocGFyc2VkQ29udGFjdHMpXHJcbnBhcnNlZENvbnRhY3RzLmZvckVhY2goc2luZ2xlQ29udGFjdE9iamVjdD0+IHtcclxuICAgIGNvbnN0IGNvbnRhY3RIVE1MU3RyaW5nID0gY29udGFjdEJ1aWxkZXIuYnVpbGRDb250YWN0KHNpbmdsZUNvbnRhY3RPYmplY3QpXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtbGlzdFwiKS5pbm5lckhUTUwrPWNvbnRhY3RCdWlsZGVyLmJ1aWxkQ29udGFjdChzaW5nbGVDb250YWN0T2JqZWN0KVxyXG5cclxufSlcclxuXHJcbn0pXHJcbn0sXHJcbnByaW50VXNlckNvbnRhY3RzOigpPT57XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtbGlzdFwiKS5pbm5lckhUTUw9XCJcIlxyXG4gICAgY29uc3QgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKVxyXG4gICAgY29udGFjdE1hbmFnZXIuZ2V0VXNlckNvbnRhY3RzKHVzZXJJZClcclxuICAgIC50aGVuKChwYXJzZWRDb250YWN0cyk9PntcclxuICAgIGNvbnNvbGUubG9nKHBhcnNlZENvbnRhY3RzKVxyXG4gICAgcGFyc2VkQ29udGFjdHMuZm9yRWFjaChzaW5nbGVDb250YWN0T2JqZWN0PT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RIVE1MU3RyaW5nID0gY29udGFjdEJ1aWxkZXIuYnVpbGRDb250YWN0KHNpbmdsZUNvbnRhY3RPYmplY3QpXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWxpc3RcIikuaW5uZXJIVE1MKz1jb250YWN0QnVpbGRlci5idWlsZENvbnRhY3Qoc2luZ2xlQ29udGFjdE9iamVjdClcclxuXHJcbiAgICB9KVxyXG5cclxuICAgIH0pXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByaW50Q29udGFjdHM7IiwiaW1wb3J0IG1ha2VDb250YWN0Rm9ybSBmcm9tIFwiLi9jb250YWN0Rm9ybVwiXHJcbmltcG9ydCBwcmludENvbnRhY3RzIGZyb20gXCIuL2NvbnRhY3RMaXN0LmpzXCJcclxuaW1wb3J0IGNvbnRhY3RNYW5hZ2VyIGZyb20gXCIuL2NvbnRhY3RDb2xsZWN0aW9uLmpzXCJcclxuaW1wb3J0IGNvbnRhY3RCdWlsZGVyIGZyb20gXCIuL2NvbnRhY3QuanNcIlxyXG5pbXBvcnQgdXNlckZvcm1zIGZyb20gXCIuL3VzZXJGb3Jtcy5qc1wiO1xyXG5pbXBvcnQgdXNlck1hbmFnZXIgZnJvbSBcIi4vdXNlckNvbGxlY3Rpb24uanNcIlxyXG5pbXBvcnQgdXNlckJ1aWxkZXIgZnJvbSBcIi4vdXNlci5qc1wiXHJcblxyXG5wcmludENvbnRhY3RzLnByaW50QWxsQ29udGFjdHMoKTtcclxubWFrZUNvbnRhY3RGb3JtKCk7XHJcbnVzZXJGb3Jtcy5tYWtlUmVnaXN0ZXJGb3JtKCk7XHJcbnVzZXJGb3Jtcy5tYWtlTG9naW5Gb3JtKCk7XHJcblxyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdWJtaXQtYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGZpcnN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZmlyc3QtbmFtZVwiKS52YWx1ZVxyXG4gICAgICAgIGNvbnN0IGxhc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYXN0LW5hbWVcIikudmFsdWVcclxuICAgICAgICBjb25zdCBhZGRyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGRyZXNzXCIpLnZhbHVlXHJcbiAgICAgICAgY29uc3QgcGhvbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bob25lLW51bWJlclwiKS52YWx1ZVxyXG5cclxuICAgICAgICBjb25zdCBjb250YWN0T2JqZWN0ID0gY29udGFjdEJ1aWxkZXIuYnVpbGRDb250YWN0T2JqZWN0KGZpcnN0TmFtZSwgbGFzdE5hbWUsIHBob25lLCBhZGRyZXNzKVxyXG5cclxuICAgICAgICBjb250YWN0TWFuYWdlci5hZGRDb250YWN0KGNvbnRhY3RPYmplY3QpXHJcbiAgICAgICAgICAgICAgICAudGhlbihwcmludENvbnRhY3RzLnByaW50VXNlckNvbnRhY3RzKVxyXG59KVxyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3Rlci1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuXHJcbiAgICAgICAgY29uc3QgZmlyc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyLWZpcnN0LW5hbWVcIikudmFsdWVcclxuICAgICAgICBjb25zdCBsYXN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1sYXN0LW5hbWVcIikudmFsdWVcclxuICAgICAgICBjb25zdCB1c2VyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXItcGFzc3dvcmRcIikudmFsdWVcclxuXHJcbiAgICAgICAgY29uc3QgdXNlck9iamVjdCA9IHVzZXJCdWlsZGVyLmJ1aWxkVXNlck9iamVjdChmaXJzdE5hbWUsIGxhc3ROYW1lLCB1c2VyTmFtZSwgcGFzc3dvcmQpXHJcblxyXG4gICAgICAgIHVzZXJNYW5hZ2VyLmFkZFVzZXIodXNlck9iamVjdClcclxuICAgICAgICAgICAgICAgIC50aGVuKHVzZXIgPT4gdXNlci5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbigodXNlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBqdXN0IGFkZGVkIGEgdXNlciFcIiwgdXNlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInVzZXJJZFwiLCB1c2VyLmlkKVxyXG4gICAgICAgICAgICAgICAgfSlcclxufSlcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyLWxvZ2luLW5hbWVcIikudmFsdWVcclxuICAgICAgICBjb25zdCBwYXNzd29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1sb2dpbi1wYXNzd29yZFwiKS52YWx1ZVxyXG5cclxuICAgICAgICB1c2VyTWFuYWdlci5nZXRTaW5nbGVVc2VyKHVzZXJOYW1lKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHNpbmdsZVVzZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2luZ2xlVXNlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInVzZXJJZFwiLCBzaW5nbGVVc2VyWzBdLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmludENvbnRhY3RzLnByaW50VXNlckNvbnRhY3RzKHNpbmdsZVVzZXJbMF0uaWQpXHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG5cclxufSlcclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCIvL2NyZWF0ZXMgSFRNTCBzdHJpbmcgZm9yIGEgc2luZ2xlIGVtcGxveWVlLCBvciBhbiBvYmplY3Qgd2hlbiB0aGVyZSBpcyBhIG5ldyBpbnB1dGZyb20gdGhlIGZvcm1cclxuXHJcblxyXG5jb25zdCB1c2VyQnVpbGRlciA9e1xyXG4gICAgYnVpbGRVc2VyOiAoc2luZ2xlVXNlcikgPT57XHJcblxyXG4gICAgICAgIHJldHVybiBgPGRpdj5cclxuICAgICAgICA8aDM+JHtzaW5nbGVVc2VyLmZpcnN0TmFtZX0gJHtzaW5nbGVVc2VyLmxhc3ROYW1lfTwvaDM+XHJcbiAgICAgICAgPHA+JHtzaW5nbGVVc2VyLnVzZXJOYW1lfTwvcD5cclxuICAgICAgICA8cD4ke3NpbmdsZVVzZXIucGFzc3dvcmR9PC9wPlxyXG4gICAgICAgIDwvZGl2PmBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGJ1aWxkVXNlck9iamVjdDogKGZpcnN0TmFtZSwgbGFzdE5hbWUsIHVzZXJOYW1lLCBwYXNzd29yZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJPYmplY3QgPSB7XHJcblxyXG4gICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSxcclxuICAgICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lLFxyXG4gICAgICAgICAgICB1c2VyTmFtZTogdXNlck5hbWUsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHVzZXJPYmplY3Q7XHJcbiAgICB9XHJcblxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHVzZXJCdWlsZGVyOyIsIi8vIFRoaXMgbW9kdWxlIHdpbGwgbWFuYWdlIHRoZSB1c2VyIGRhdGFiYXNlXHJcblxyXG5jb25zdCB1c2VyTWFuYWdlciA9IHtcclxuICAgIGdldEFsbFVzZXJzOiAoKSA9PiB7XHJcblxyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiKVxyXG4gICAgICAgICAgICAudGhlbih1c2VycyA9PiB1c2Vycy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgYWRkVXNlcjogKHVzZXJPYmplY3QpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VyT2JqZWN0KVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZ2V0U2luZ2xlVXNlcjoodXNlck5hbWUpPT57XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnM/dXNlck5hbWU9JHt1c2VyTmFtZX1gKVxyXG4gICAgICAgICAgICAudGhlbih1c2VycyA9PiB1c2Vycy5qc29uKCkpXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXNlck1hbmFnZXI7IiwiY29uc3QgdXNlckZvcm1zID17XHJcblxyXG5tYWtlUmVnaXN0ZXJGb3JtOiAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyLWNvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBgPGxlZ2VuZD5SZWdpc3RlcjwvbGVnZW5kPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ1c2VyRmlyc3ROYW1lXCIgaWQ9XCJ1c2VyLWZpcnN0LW5hbWVcIiBwbGFjZWhvbGRlcj1cIkZpcnN0IE5hbWVcIj48L2lucHV0PiA8YnI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInVzZXJMYXN0TmFtZVwiIGlkPVwidXNlci1sYXN0LW5hbWVcIiBwbGFjZWhvbGRlcj1cIkxhc3QgTmFtZVwiPjxicj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidXNlck5hbWVcIiBpZD1cInVzZXItbmFtZVwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgVXNlcm5hbWVcIj48YnI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIGlkPVwidXNlci1wYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgUGFzc3dvcmRcIj48YnI+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwicmVnaXN0ZXJcIiBpZD1cInJlZ2lzdGVyLWJ0blwiPnJlZ2lzdGVyPC9idXR0b24+YFxyXG59LFxyXG5tYWtlTG9naW5Gb3JtOiAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBgPGxlZ2VuZD5Mb2dpbjwvbGVnZW5kPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ1c2VyTmFtZVwiIGlkPVwidXNlci1sb2dpbi1uYW1lXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBVc2VybmFtZVwiPjxicj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIgaWQ9XCJ1c2VyLWxvZ2luLXBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBQYXNzd29yZFwiPjxicj5cclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBpZD1cImxvZ2luLWJ0blwiPmxvZ2luPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgaWQ9XCJsb2dvdXQtYnRuXCI+bG9nb3V0PC9idXR0b24+YFxyXG59XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgdXNlckZvcm1zO1xyXG5cclxuIl19
