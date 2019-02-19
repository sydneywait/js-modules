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
const printAllContacts = () => {
  document.querySelector("#contact-list").innerHTML = "";

  _contactCollection.default.getAllContacts().then(parsedContacts => {
    console.log(parsedContacts);
    parsedContacts.forEach(singleContactObject => {
      const contactHTMLString = _contact.default.buildContact(singleContactObject);

      document.querySelector("#contact-list").innerHTML += _contact.default.buildContact(singleContactObject);
    });
  });
};

var _default = printAllContacts;
exports.default = _default;

},{"./contact.js":1,"./contactCollection.js":2}],5:[function(require,module,exports){
"use strict";

var _contactForm = _interopRequireDefault(require("./contactForm"));

var _contactList = _interopRequireDefault(require("./contactList.js"));

var _contactCollection = _interopRequireDefault(require("./contactCollection.js"));

var _contact = _interopRequireDefault(require("./contact.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _contactForm.default)();
(0, _contactList.default)();
document.querySelector("#submit-btn").addEventListener("click", () => {
  const firstName = document.querySelector("#first-name").value;
  const lastName = document.querySelector("#last-name").value;
  const address = document.querySelector("#address").value;
  const phone = document.querySelector("#phone-number").value;

  const contactObject = _contact.default.buildContactObject(firstName, lastName, phone, address);

  _contactCollection.default.addContact(contactObject).then(_contactList.default);
});

},{"./contact.js":1,"./contactCollection.js":2,"./contactForm":3,"./contactList.js":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTtBQUdBLE1BQU0sY0FBYyxHQUFFO0FBQ2xCLEVBQUEsWUFBWSxFQUFHLGFBQUQsSUFBa0I7QUFFNUIsV0FBUTtjQUNGLGFBQWEsQ0FBQyxTQUFVLElBQUcsYUFBYSxDQUFDLFFBQVM7YUFDbkQsYUFBYSxDQUFDLFdBQVk7YUFDMUIsYUFBYSxDQUFDLE9BQVE7ZUFIM0I7QUFNSCxHQVRpQjtBQVdsQixFQUFBLGtCQUFrQixFQUFFLENBQUMsU0FBRCxFQUFZLFFBQVosRUFBc0IsS0FBdEIsRUFBNkIsT0FBN0IsS0FBeUM7QUFDekQsVUFBTSxhQUFhLEdBQUc7QUFFbEIsTUFBQSxTQUFTLEVBQUUsU0FGTztBQUdsQixNQUFBLFFBQVEsRUFBRSxRQUhRO0FBSWxCLE1BQUEsV0FBVyxFQUFFLEtBSks7QUFLbEIsTUFBQSxPQUFPLEVBQUU7QUFMUyxLQUF0QjtBQVFBLFdBQU8sYUFBUDtBQUNIO0FBckJpQixDQUF0QjtlQXdCZSxjOzs7Ozs7Ozs7O0FDM0JmO0FBRUEsTUFBTSxjQUFjLEdBQUc7QUFDbkIsRUFBQSxjQUFjLEVBQUUsTUFBTTtBQUVsQixXQUFPLEtBQUssQ0FBQyxnQ0FBRCxDQUFMLENBQ0YsSUFERSxDQUNHLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURmLENBQVA7QUFFSCxHQUxrQjtBQU1uQixFQUFBLFVBQVUsRUFBRyxhQUFELElBQW1CO0FBQzNCLFdBQU8sS0FBSyxDQUFDLGdDQUFELEVBQW1DO0FBQzNDLE1BQUEsTUFBTSxFQUFFLE1BRG1DO0FBRTNDLE1BQUEsT0FBTyxFQUFFO0FBQ0wsd0JBQWdCO0FBRFgsT0FGa0M7QUFLM0MsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxhQUFmO0FBTHFDLEtBQW5DLENBQVo7QUFPSDtBQWRrQixDQUF2QjtlQWlCZSxjOzs7Ozs7Ozs7OztBQ25CZixNQUFNLGVBQWUsR0FBRyxNQUFLO0FBQzdCLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsaUJBQXZCLEVBQTBDLFNBQTFDLEdBQXNEOzs7Ozs7eURBQXREO0FBUUMsQ0FURDs7ZUFXZSxlOzs7Ozs7Ozs7OztBQ1JmOztBQUNBOzs7O0FBSkE7QUFDQTtBQUtBLE1BQU0sZ0JBQWdCLEdBQUUsTUFBSTtBQUM1QixFQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLFNBQXhDLEdBQWtELEVBQWxEOztBQUVBLDZCQUFlLGNBQWYsR0FDQyxJQURELENBQ08sY0FBRCxJQUFrQjtBQUN4QixJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksY0FBWjtBQUNBLElBQUEsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsbUJBQW1CLElBQUc7QUFDekMsWUFBTSxpQkFBaUIsR0FBRyxpQkFBZSxZQUFmLENBQTRCLG1CQUE1QixDQUExQjs7QUFDQSxNQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLFNBQXhDLElBQW1ELGlCQUFlLFlBQWYsQ0FBNEIsbUJBQTVCLENBQW5EO0FBRUgsS0FKRDtBQU1DLEdBVEQ7QUFVQyxDQWJEOztlQWVlLGdCOzs7Ozs7QUNyQmY7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTtBQUNBO0FBRUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsZ0JBQXRDLENBQXVELE9BQXZELEVBQWdFLE1BQUk7QUFFcEUsUUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsS0FBeEQ7QUFDQSxRQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixZQUF2QixFQUFxQyxLQUF0RDtBQUNBLFFBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFVBQXZCLEVBQW1DLEtBQW5EO0FBQ0EsUUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZUFBdkIsRUFBd0MsS0FBdEQ7O0FBRUEsUUFBTSxhQUFhLEdBQUcsaUJBQWUsa0JBQWYsQ0FBa0MsU0FBbEMsRUFBNkMsUUFBN0MsRUFBdUQsS0FBdkQsRUFBOEQsT0FBOUQsQ0FBdEI7O0FBRVEsNkJBQWUsVUFBZixDQUEwQixhQUExQixFQUNDLElBREQsQ0FDTSxvQkFETjtBQUVQLENBWEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvL2NyZWF0ZXMgSFRNTCBzdHJpbmcgZm9yIGEgc2luZ2xlIGVtcGxveWVlLCBvciBhbiBvYmplY3Qgd2hlbiB0aGVyZSBpcyBhIG5ldyBpbnB1dGZyb20gdGhlIGZvcm1cclxuXHJcblxyXG5jb25zdCBjb250YWN0QnVpbGRlciA9e1xyXG4gICAgYnVpbGRDb250YWN0OiAoc2luZ2xlQ29udGFjdCkgPT57XHJcblxyXG4gICAgICAgIHJldHVybiBgPGRpdj5cclxuICAgICAgICA8aDM+JHtzaW5nbGVDb250YWN0LmZpcnN0TmFtZX0gJHtzaW5nbGVDb250YWN0Lmxhc3ROYW1lfTwvaDM+XHJcbiAgICAgICAgPHA+JHtzaW5nbGVDb250YWN0LnBob25lTnVtYmVyfTwvcD5cclxuICAgICAgICA8cD4ke3NpbmdsZUNvbnRhY3QuYWRkcmVzc308L3A+XHJcbiAgICAgICAgPC9kaXY+YFxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYnVpbGRDb250YWN0T2JqZWN0OiAoZmlyc3ROYW1lLCBsYXN0TmFtZSwgcGhvbmUsIGFkZHJlc3MpID0+IHtcclxuICAgICAgICBjb25zdCBjb250YWN0T2JqZWN0ID0ge1xyXG5cclxuICAgICAgICAgICAgZmlyc3ROYW1lOiBmaXJzdE5hbWUsXHJcbiAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZSxcclxuICAgICAgICAgICAgcGhvbmVOdW1iZXI6IHBob25lLFxyXG4gICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29udGFjdE9iamVjdDtcclxuICAgIH1cclxuXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY29udGFjdEJ1aWxkZXI7IiwiLy8gdGhpcyBtb2R1bGUgd2lsbCBjYWxsIGFwaSB0byBnZXQgYWxsIGNvbnRhY3RzLCBhbmQgdG8gYWRkIGFub3RoZXIgY29udGFjdFxyXG5cclxuY29uc3QgY29udGFjdE1hbmFnZXIgPSB7XHJcbiAgICBnZXRBbGxDb250YWN0czogKCkgPT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIilcclxuICAgICAgICAgICAgLnRoZW4oY29udGFjdHMgPT4gY29udGFjdHMuanNvbigpKVxyXG4gICAgfSxcclxuICAgIGFkZENvbnRhY3Q6IChjb250YWN0T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29udGFjdE9iamVjdClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb250YWN0TWFuYWdlcjtcclxuIiwiY29uc3QgbWFrZUNvbnRhY3RGb3JtID0gKCkgPT57XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1jb250YWluZXJcIikuaW5uZXJIVE1MID1gXHJcbjxsZWdlbmQ+Q3JlYXRlIGEgTmV3IENvbnRhY3Q8L2xlZ2VuZD5cclxuPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZSA9IFwiZmlyc3ROYW1lXCIgaWQ9XCJmaXJzdC1uYW1lXCIgcGxhY2Vob2xkZXI9XCJGaXJzdCBOYW1lXCI+PGJyPlxyXG48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibGFzdE5hbWVcIiBpZD1cImxhc3QtbmFtZVwiIHBsYWNlaG9sZGVyPVwiTGFzdCBOYW1lXCI+PGJyPlxyXG48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lID1cInBob25lTnVtYmVyXCIsIGlkPVwicGhvbmUtbnVtYmVyXCIgcGxhY2Vob2xkZXI9XCJQaG9uZSBOdW1iZXJcIj48YnI+XHJcbjxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJhZGRyZXNzXCIgaWQ9XCJhZGRyZXNzXCIgcGxhY2Vob2xkZXI9XCJBZGRyZXNzXCI+PGJyPlxyXG48YnV0dG9uIHR5cGUgPSBcInN1Ym1pdFwiLCBpZD1cInN1Ym1pdC1idG5cIj5TdWJtaXQ8L2J1dHRvbj5gXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYWtlQ29udGFjdEZvcm07IiwiLy8gdGhpcyBtb2R1bGUgc2hvdWxkIGltcG9ydCBmcm9tIGFwaU1hbmFnZXIgKGdldCBlbXBsb3llZXMpIGFuZCBsb29wIHRocm91Z2ggYW5kIG9wdGlvbiB0byBwcmludCBvbmUgb3IgYWxsXHJcbi8vZXhwb3J0IGFuIG9iamVjdCB3aXRoIG1ldGhvZHMgKHByaW50IGFsbCwgcHJpbnQgc2luZ2xlKVxyXG5cclxuaW1wb3J0IGNvbnRhY3RNYW5hZ2VyIGZyb20gXCIuL2NvbnRhY3RDb2xsZWN0aW9uLmpzXCJcclxuaW1wb3J0IGNvbnRhY3RCdWlsZGVyIGZyb20gXCIuL2NvbnRhY3QuanNcIlxyXG5cclxuY29uc3QgcHJpbnRBbGxDb250YWN0cyA9KCk9PntcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWxpc3RcIikuaW5uZXJIVE1MPVwiXCJcclxuXHJcbmNvbnRhY3RNYW5hZ2VyLmdldEFsbENvbnRhY3RzKClcclxuLnRoZW4oKHBhcnNlZENvbnRhY3RzKT0+e1xyXG5jb25zb2xlLmxvZyhwYXJzZWRDb250YWN0cylcclxucGFyc2VkQ29udGFjdHMuZm9yRWFjaChzaW5nbGVDb250YWN0T2JqZWN0PT4ge1xyXG4gICAgY29uc3QgY29udGFjdEhUTUxTdHJpbmcgPSBjb250YWN0QnVpbGRlci5idWlsZENvbnRhY3Qoc2luZ2xlQ29udGFjdE9iamVjdClcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdC1saXN0XCIpLmlubmVySFRNTCs9Y29udGFjdEJ1aWxkZXIuYnVpbGRDb250YWN0KHNpbmdsZUNvbnRhY3RPYmplY3QpXHJcblxyXG59KTtcclxuXHJcbn0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByaW50QWxsQ29udGFjdHM7IiwiaW1wb3J0IG1ha2VDb250YWN0Rm9ybSBmcm9tIFwiLi9jb250YWN0Rm9ybVwiXHJcbmltcG9ydCBwcmludEFsbENvbnRhY3RzIGZyb20gXCIuL2NvbnRhY3RMaXN0LmpzXCJcclxuaW1wb3J0IGNvbnRhY3RNYW5hZ2VyIGZyb20gXCIuL2NvbnRhY3RDb2xsZWN0aW9uLmpzXCJcclxuaW1wb3J0IGNvbnRhY3RCdWlsZGVyIGZyb20gXCIuL2NvbnRhY3QuanNcIlxyXG5cclxubWFrZUNvbnRhY3RGb3JtKCk7XHJcbnByaW50QWxsQ29udGFjdHMoKTtcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VibWl0LWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcclxuXHJcbmNvbnN0IGZpcnN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZmlyc3QtbmFtZVwiKS52YWx1ZVxyXG5jb25zdCBsYXN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFzdC1uYW1lXCIpLnZhbHVlXHJcbmNvbnN0IGFkZHJlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZHJlc3NcIikudmFsdWVcclxuY29uc3QgcGhvbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bob25lLW51bWJlclwiKS52YWx1ZVxyXG5cclxuY29uc3QgY29udGFjdE9iamVjdCA9IGNvbnRhY3RCdWlsZGVyLmJ1aWxkQ29udGFjdE9iamVjdChmaXJzdE5hbWUsIGxhc3ROYW1lLCBwaG9uZSwgYWRkcmVzcylcclxuXHJcbiAgICAgICAgY29udGFjdE1hbmFnZXIuYWRkQ29udGFjdChjb250YWN0T2JqZWN0KVxyXG4gICAgICAgIC50aGVuKHByaW50QWxsQ29udGFjdHMpXHJcbn0pXHJcblxyXG5cclxuXHJcblxyXG4iXX0=
