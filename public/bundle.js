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
      address: address
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

var _contactCollection = _interopRequireDefault(require("./contactCollection.js"));

var _contact = _interopRequireDefault(require("./contact.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this module should import from apiManager (get employees) and loop through and option to print one or all
//export an object with methods (print all, print single)
const printAllContacts = () => {
  document.querySelector("#contact-list").innerHTML = "";

  _contactCollection.default.getAllContacts().then(parsedContacts => {
    console.log(parsedContacts);
    parsedContacts.forEach(singleContactObject => {
      const contactHTMLString = _contact.default.buildContact(singleContactObject);

      console.log(contactHTMLString);
      document.querySelector("#contact-list").innerHTML += _contact.default.buildContact(singleContactObject);
    });
  });
};

var _default = printAllContacts;
exports.default = _default;

},{"./contact.js":1,"./contactCollection.js":2}],4:[function(require,module,exports){
"use strict";

var _contactList = _interopRequireDefault(require("./contactList.js"));

var _contactCollection = _interopRequireDefault(require("./contactCollection.js"));

var _contact = _interopRequireDefault(require("./contact.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _contactList.default)();
document.querySelector("#submit-btn").addEventListener("click", () => {
  const firstName = document.querySelector("#first-name").value;
  const lastName = document.querySelector("#last-name").value;
  const address = document.querySelector("#address").value;
  const phone = document.querySelector("#phone-number").value;

  const contactObject = _contact.default.buildContactObject(firstName, lastName, phone, address); // const contactObject = {
  //             "firstName": firstName,
  //             "lastName": lastName,
  //             "phoneNumber": phone,
  //             "address": address
  //         }


  _contactCollection.default.addContact(contactObject).then(_contactList.default);
});

},{"./contact.js":1,"./contactCollection.js":2,"./contactList.js":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0TGlzdC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBR0EsTUFBTSxjQUFjLEdBQUU7QUFDbEIsRUFBQSxZQUFZLEVBQUcsYUFBRCxJQUFrQjtBQUU1QixXQUFRO2NBQ0YsYUFBYSxDQUFDLFNBQVUsSUFBRyxhQUFhLENBQUMsUUFBUzthQUNuRCxhQUFhLENBQUMsV0FBWTthQUMxQixhQUFhLENBQUMsT0FBUTtlQUgzQjtBQU1ILEdBVGlCO0FBV2xCLEVBQUEsa0JBQWtCLEVBQUUsQ0FBQyxTQUFELEVBQVksUUFBWixFQUFzQixLQUF0QixFQUE2QixPQUE3QixLQUF5QztBQUN6RCxVQUFNLGFBQWEsR0FBRztBQUVsQixNQUFBLFNBQVMsRUFBRSxTQUZPO0FBR2xCLE1BQUEsUUFBUSxFQUFFLFFBSFE7QUFJbEIsTUFBQSxXQUFXLEVBQUUsS0FKSztBQUtsQixNQUFBLE9BQU8sRUFBRTtBQUxTLEtBQXRCO0FBUUEsV0FBTyxhQUFQO0FBQ0g7QUFyQmlCLENBQXRCO2VBd0JlLGM7Ozs7Ozs7Ozs7QUMzQmY7QUFFQSxNQUFNLGNBQWMsR0FBRztBQUNuQixFQUFBLGNBQWMsRUFBRSxNQUFNO0FBRWxCLFdBQU8sS0FBSyxDQUFDLGdDQUFELENBQUwsQ0FDRixJQURFLENBQ0csUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRGYsQ0FBUDtBQUVILEdBTGtCO0FBTW5CLEVBQUEsVUFBVSxFQUFHLGFBQUQsSUFBbUI7QUFDM0IsV0FBTyxLQUFLLENBQUMsZ0NBQUQsRUFBbUM7QUFDM0MsTUFBQSxNQUFNLEVBQUUsTUFEbUM7QUFFM0MsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUZrQztBQUszQyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLGFBQWY7QUFMcUMsS0FBbkMsQ0FBWjtBQU9IO0FBZGtCLENBQXZCO2VBaUJlLGM7Ozs7Ozs7Ozs7O0FDaEJmOztBQUNBOzs7O0FBSkE7QUFDQTtBQUtBLE1BQU0sZ0JBQWdCLEdBQUUsTUFBSTtBQUM1QixFQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLFNBQXhDLEdBQWtELEVBQWxEOztBQUVBLDZCQUFlLGNBQWYsR0FDQyxJQURELENBQ08sY0FBRCxJQUFrQjtBQUN4QixJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksY0FBWjtBQUNBLElBQUEsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsbUJBQW1CLElBQUc7QUFDekMsWUFBTSxpQkFBaUIsR0FBRyxpQkFBZSxZQUFmLENBQTRCLG1CQUE1QixDQUExQjs7QUFDQSxNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksaUJBQVo7QUFDQSxNQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLFNBQXhDLElBQW1ELGlCQUFlLFlBQWYsQ0FBNEIsbUJBQTVCLENBQW5EO0FBRUgsS0FMRDtBQU9DLEdBVkQ7QUFXQyxDQWREOztlQWdCZSxnQjs7Ozs7O0FDdEJmOztBQUNBOztBQUNBOzs7O0FBR0E7QUFFQSxRQUFRLENBQUMsYUFBVCxDQUF1QixhQUF2QixFQUFzQyxnQkFBdEMsQ0FBdUQsT0FBdkQsRUFBZ0UsTUFBSTtBQUVwRSxRQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixhQUF2QixFQUFzQyxLQUF4RDtBQUNBLFFBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFlBQXZCLEVBQXFDLEtBQXREO0FBQ0EsUUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsVUFBdkIsRUFBbUMsS0FBbkQ7QUFDQSxRQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixlQUF2QixFQUF3QyxLQUF0RDs7QUFFQSxRQUFNLGFBQWEsR0FBRyxpQkFBZSxrQkFBZixDQUFrQyxTQUFsQyxFQUE2QyxRQUE3QyxFQUF1RCxLQUF2RCxFQUE4RCxPQUE5RCxDQUF0QixDQVBvRSxDQVNwRTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNRLDZCQUFlLFVBQWYsQ0FBMEIsYUFBMUIsRUFDQyxJQURELENBQ00sb0JBRE47QUFFUCxDQWxCRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vY3JlYXRlcyBIVE1MIHN0cmluZyBmb3IgYSBzaW5nbGUgZW1wbG95ZWUsIG9yIGFuIG9iamVjdCB3aGVuIHRoZXJlIGlzIGEgbmV3IGlucHV0ZnJvbSB0aGUgZm9ybVxyXG5cclxuXHJcbmNvbnN0IGNvbnRhY3RCdWlsZGVyID17XHJcbiAgICBidWlsZENvbnRhY3Q6IChzaW5nbGVDb250YWN0KSA9PntcclxuXHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2PlxyXG4gICAgICAgIDxoMz4ke3NpbmdsZUNvbnRhY3QuZmlyc3ROYW1lfSAke3NpbmdsZUNvbnRhY3QubGFzdE5hbWV9PC9oMz5cclxuICAgICAgICA8cD4ke3NpbmdsZUNvbnRhY3QucGhvbmVOdW1iZXJ9PC9wPlxyXG4gICAgICAgIDxwPiR7c2luZ2xlQ29udGFjdC5hZGRyZXNzfTwvcD5cclxuICAgICAgICA8L2Rpdj5gXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBidWlsZENvbnRhY3RPYmplY3Q6IChmaXJzdE5hbWUsIGxhc3ROYW1lLCBwaG9uZSwgYWRkcmVzcykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RPYmplY3QgPSB7XHJcblxyXG4gICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSxcclxuICAgICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lLFxyXG4gICAgICAgICAgICBwaG9uZU51bWJlcjogcGhvbmUsXHJcbiAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3NcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWN0T2JqZWN0O1xyXG4gICAgfVxyXG5cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjb250YWN0QnVpbGRlcjsiLCIvLyB0aGlzIG1vZHVsZSB3aWxsIGNhbGwgYXBpIHRvIGdldCBhbGwgY29udGFjdHMsIGFuZCB0byBhZGQgYW5vdGhlciBjb250YWN0XHJcblxyXG5jb25zdCBjb250YWN0TWFuYWdlciA9IHtcclxuICAgIGdldEFsbENvbnRhY3RzOiAoKSA9PiB7XHJcblxyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0c1wiKVxyXG4gICAgICAgICAgICAudGhlbihjb250YWN0cyA9PiBjb250YWN0cy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgYWRkQ29udGFjdDogKGNvbnRhY3RPYmplY3QpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb250YWN0T2JqZWN0KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbnRhY3RNYW5hZ2VyO1xyXG4iLCIvLyB0aGlzIG1vZHVsZSBzaG91bGQgaW1wb3J0IGZyb20gYXBpTWFuYWdlciAoZ2V0IGVtcGxveWVlcykgYW5kIGxvb3AgdGhyb3VnaCBhbmQgb3B0aW9uIHRvIHByaW50IG9uZSBvciBhbGxcclxuLy9leHBvcnQgYW4gb2JqZWN0IHdpdGggbWV0aG9kcyAocHJpbnQgYWxsLCBwcmludCBzaW5nbGUpXHJcblxyXG5pbXBvcnQgY29udGFjdE1hbmFnZXIgZnJvbSBcIi4vY29udGFjdENvbGxlY3Rpb24uanNcIlxyXG5pbXBvcnQgY29udGFjdEJ1aWxkZXIgZnJvbSBcIi4vY29udGFjdC5qc1wiXHJcblxyXG5jb25zdCBwcmludEFsbENvbnRhY3RzID0oKT0+e1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtbGlzdFwiKS5pbm5lckhUTUw9XCJcIlxyXG5cclxuY29udGFjdE1hbmFnZXIuZ2V0QWxsQ29udGFjdHMoKVxyXG4udGhlbigocGFyc2VkQ29udGFjdHMpPT57XHJcbmNvbnNvbGUubG9nKHBhcnNlZENvbnRhY3RzKVxyXG5wYXJzZWRDb250YWN0cy5mb3JFYWNoKHNpbmdsZUNvbnRhY3RPYmplY3Q9PiB7XHJcbiAgICBjb25zdCBjb250YWN0SFRNTFN0cmluZyA9IGNvbnRhY3RCdWlsZGVyLmJ1aWxkQ29udGFjdChzaW5nbGVDb250YWN0T2JqZWN0KVxyXG4gICAgY29uc29sZS5sb2coY29udGFjdEhUTUxTdHJpbmcpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWxpc3RcIikuaW5uZXJIVE1MKz1jb250YWN0QnVpbGRlci5idWlsZENvbnRhY3Qoc2luZ2xlQ29udGFjdE9iamVjdClcclxuXHJcbn0pO1xyXG5cclxufSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpbnRBbGxDb250YWN0czsiLCJpbXBvcnQgcHJpbnRBbGxDb250YWN0cyBmcm9tIFwiLi9jb250YWN0TGlzdC5qc1wiXHJcbmltcG9ydCBjb250YWN0TWFuYWdlciBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvbi5qc1wiXHJcbmltcG9ydCBjb250YWN0QnVpbGRlciBmcm9tIFwiLi9jb250YWN0LmpzXCJcclxuXHJcblxyXG5wcmludEFsbENvbnRhY3RzKClcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VibWl0LWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcclxuXHJcbmNvbnN0IGZpcnN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZmlyc3QtbmFtZVwiKS52YWx1ZVxyXG5jb25zdCBsYXN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFzdC1uYW1lXCIpLnZhbHVlXHJcbmNvbnN0IGFkZHJlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZHJlc3NcIikudmFsdWVcclxuY29uc3QgcGhvbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bob25lLW51bWJlclwiKS52YWx1ZVxyXG5cclxuY29uc3QgY29udGFjdE9iamVjdCA9IGNvbnRhY3RCdWlsZGVyLmJ1aWxkQ29udGFjdE9iamVjdChmaXJzdE5hbWUsIGxhc3ROYW1lLCBwaG9uZSwgYWRkcmVzcylcclxuXHJcbi8vIGNvbnN0IGNvbnRhY3RPYmplY3QgPSB7XHJcblxyXG4vLyAgICAgICAgICAgICBcImZpcnN0TmFtZVwiOiBmaXJzdE5hbWUsXHJcbi8vICAgICAgICAgICAgIFwibGFzdE5hbWVcIjogbGFzdE5hbWUsXHJcbi8vICAgICAgICAgICAgIFwicGhvbmVOdW1iZXJcIjogcGhvbmUsXHJcbi8vICAgICAgICAgICAgIFwiYWRkcmVzc1wiOiBhZGRyZXNzXHJcbi8vICAgICAgICAgfVxyXG4gICAgICAgIGNvbnRhY3RNYW5hZ2VyLmFkZENvbnRhY3QoY29udGFjdE9iamVjdClcclxuICAgICAgICAudGhlbihwcmludEFsbENvbnRhY3RzKVxyXG59KVxyXG5cclxuXHJcblxyXG5cclxuIl19
