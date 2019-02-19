(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

//creates HTML string for a single employee
const buildContact = singleContact => {
  return `<div>
    <h3>${singleContact.firstName} ${singleContact.lastName}</h3>
    <p>${singleContact.phoneNumber}</p>
    <p>${singleContact.address}</p>
    </div>`;
};

var _default = buildContact;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// this module will call api to get all employees
const getAllContacts = () => {
  return fetch("http://localhost:8088/contacts").then(contacts => contacts.json());
};

const addContact = contactObject => {
  return fetch("http://localhost:8088/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contactObject)
  });
};

const contactManager = {
  "getAllContacts": getAllContacts(),
  "addContact": addContact(contactObject)
};
var _default = getAllContacts;
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
  (0, _contactCollection.default)().then(parsedContacts => {
    console.log(parsedContacts);
    parsedContacts.forEach(singleContactObject => {
      const contactHTMLString = (0, _contact.default)(singleContactObject);
      console.log(contactHTMLString);
      document.querySelector("#contact-list").innerHTML += (0, _contact.default)(singleContactObject);
    });
  });
};

var _default = printAllContacts;
exports.default = _default;

},{"./contact.js":1,"./contactCollection.js":2}],4:[function(require,module,exports){
"use strict";

var _contactList = _interopRequireDefault(require("./contactList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _contactList.default)();
document.querySelector("#submit-btn").addEventListener("click", () => {});

},{"./contactList":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0TGlzdC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQTtBQUVBLE1BQU0sWUFBWSxHQUFJLGFBQUQsSUFBa0I7QUFFbkMsU0FBUTtVQUNGLGFBQWEsQ0FBQyxTQUFVLElBQUcsYUFBYSxDQUFDLFFBQVM7U0FDbkQsYUFBYSxDQUFDLFdBQVk7U0FDMUIsYUFBYSxDQUFDLE9BQVE7V0FIM0I7QUFNSCxDQVJEOztlQVVlLFk7Ozs7Ozs7Ozs7O0FDWmY7QUFFQSxNQUFNLGNBQWMsR0FBRyxNQUFNO0FBRXpCLFNBQU8sS0FBSyxDQUFDLGdDQUFELENBQUwsQ0FDRixJQURFLENBQ0csUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRGYsQ0FBUDtBQUVILENBSkQ7O0FBT0EsTUFBTSxVQUFVLEdBQUksYUFBRCxJQUFtQjtBQUNsQyxTQUFPLEtBQUssQ0FBQyxnQ0FBRCxFQUFtQztBQUMzQyxJQUFBLE1BQU0sRUFBRSxNQURtQztBQUUzQyxJQUFBLE9BQU8sRUFBRTtBQUNMLHNCQUFnQjtBQURYLEtBRmtDO0FBSzNDLElBQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsYUFBZjtBQUxxQyxHQUFuQyxDQUFaO0FBT0gsQ0FSRDs7QUFVQSxNQUFNLGNBQWMsR0FBRztBQUNuQixvQkFBa0IsY0FBYyxFQURiO0FBRW5CLGdCQUFjLFVBQVUsQ0FBQyxhQUFEO0FBRkwsQ0FBdkI7ZUFNZSxjOzs7Ozs7Ozs7OztBQ3RCZjs7QUFDQTs7OztBQUpBO0FBQ0E7QUFLQSxNQUFNLGdCQUFnQixHQUFFLE1BQUk7QUFDNUIsb0NBQ0MsSUFERCxDQUNPLGNBQUQsSUFBa0I7QUFDeEIsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGNBQVo7QUFDQSxJQUFBLGNBQWMsQ0FBQyxPQUFmLENBQXVCLG1CQUFtQixJQUFHO0FBQ3pDLFlBQU0saUJBQWlCLEdBQUcsc0JBQWEsbUJBQWIsQ0FBMUI7QUFDQSxNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksaUJBQVo7QUFDQSxNQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLFNBQXhDLElBQW1ELHNCQUFhLG1CQUFiLENBQW5EO0FBRUgsS0FMRDtBQU9DLEdBVkQ7QUFXQyxDQVpEOztlQWNlLGdCOzs7Ozs7QUNwQmY7Ozs7QUFFQTtBQUVBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLGdCQUF0QyxDQUF1RCxPQUF2RCxFQUFnRSxNQUFJLENBSW5FLENBSkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvL2NyZWF0ZXMgSFRNTCBzdHJpbmcgZm9yIGEgc2luZ2xlIGVtcGxveWVlXHJcblxyXG5jb25zdCBidWlsZENvbnRhY3QgPSAoc2luZ2xlQ29udGFjdCkgPT57XHJcblxyXG4gICAgcmV0dXJuIGA8ZGl2PlxyXG4gICAgPGgzPiR7c2luZ2xlQ29udGFjdC5maXJzdE5hbWV9ICR7c2luZ2xlQ29udGFjdC5sYXN0TmFtZX08L2gzPlxyXG4gICAgPHA+JHtzaW5nbGVDb250YWN0LnBob25lTnVtYmVyfTwvcD5cclxuICAgIDxwPiR7c2luZ2xlQ29udGFjdC5hZGRyZXNzfTwvcD5cclxuICAgIDwvZGl2PmBcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkQ29udGFjdDtcclxuIiwiLy8gdGhpcyBtb2R1bGUgd2lsbCBjYWxsIGFwaSB0byBnZXQgYWxsIGVtcGxveWVlc1xyXG5cclxuY29uc3QgZ2V0QWxsQ29udGFjdHMgPSAoKSA9PiB7XHJcblxyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzXCIpXHJcbiAgICAgICAgLnRoZW4oY29udGFjdHMgPT4gY29udGFjdHMuanNvbigpKVxyXG59XHJcblxyXG5cclxuY29uc3QgYWRkQ29udGFjdCA9IChjb250YWN0T2JqZWN0KSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIiwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29udGFjdE9iamVjdClcclxuICAgIH0pXHJcbn1cclxuXHJcbmNvbnN0IGNvbnRhY3RNYW5hZ2VyID0ge1xyXG4gICAgXCJnZXRBbGxDb250YWN0c1wiOiBnZXRBbGxDb250YWN0cygpLFxyXG4gICAgXCJhZGRDb250YWN0XCI6IGFkZENvbnRhY3QoY29udGFjdE9iamVjdClcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdldEFsbENvbnRhY3RzO1xyXG4iLCIvLyB0aGlzIG1vZHVsZSBzaG91bGQgaW1wb3J0IGZyb20gYXBpTWFuYWdlciAoZ2V0IGVtcGxveWVlcykgYW5kIGxvb3AgdGhyb3VnaCBhbmQgb3B0aW9uIHRvIHByaW50IG9uZSBvciBhbGxcclxuLy9leHBvcnQgYW4gb2JqZWN0IHdpdGggbWV0aG9kcyAocHJpbnQgYWxsLCBwcmludCBzaW5nbGUpXHJcblxyXG5pbXBvcnQgZ2V0QWxsQ29udGFjdHMgZnJvbSBcIi4vY29udGFjdENvbGxlY3Rpb24uanNcIlxyXG5pbXBvcnQgYnVpbGRDb250YWN0IGZyb20gXCIuL2NvbnRhY3QuanNcIlxyXG5cclxuY29uc3QgcHJpbnRBbGxDb250YWN0cyA9KCk9PntcclxuZ2V0QWxsQ29udGFjdHMoKVxyXG4udGhlbigocGFyc2VkQ29udGFjdHMpPT57XHJcbmNvbnNvbGUubG9nKHBhcnNlZENvbnRhY3RzKVxyXG5wYXJzZWRDb250YWN0cy5mb3JFYWNoKHNpbmdsZUNvbnRhY3RPYmplY3Q9PiB7XHJcbiAgICBjb25zdCBjb250YWN0SFRNTFN0cmluZyA9IGJ1aWxkQ29udGFjdChzaW5nbGVDb250YWN0T2JqZWN0KVxyXG4gICAgY29uc29sZS5sb2coY29udGFjdEhUTUxTdHJpbmcpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWxpc3RcIikuaW5uZXJIVE1MKz1idWlsZENvbnRhY3Qoc2luZ2xlQ29udGFjdE9iamVjdClcclxuXHJcbn0pO1xyXG5cclxufSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpbnRBbGxDb250YWN0czsiLCJpbXBvcnQgcHJpbnRBbGxDb250YWN0cyBmcm9tIFwiLi9jb250YWN0TGlzdFwiXHJcblxyXG5wcmludEFsbENvbnRhY3RzKClcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VibWl0LWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcclxuXHJcblxyXG5cclxufSkiXX0=
