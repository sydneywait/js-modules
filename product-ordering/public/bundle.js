(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const makeNavBar = () => {
  const navString = `<span>BETSY</span>  <a class="navbar-item" href="#">Categories</a>
    <a class="navbar-item" href="#">Orders</a>
    <a class="navbar-item" href="#">Log Out</a>`;
  document.querySelector("#nav-bar").innerHTML = navString;
};

var _default = makeNavBar();

exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

var _Nav = _interopRequireDefault(require("./Nav.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _Nav.default)();

},{"./Nav.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL05hdi5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQSxNQUFNLFVBQVUsR0FBRyxNQUFNO0FBQ3JCLFFBQU0sU0FBUyxHQUFJOztnREFBbkI7QUFJQSxFQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLFVBQXZCLEVBQW1DLFNBQW5DLEdBQTZDLFNBQTdDO0FBQ0gsQ0FORDs7ZUFRZSxVQUFVLEU7Ozs7Ozs7QUNSekI7Ozs7QUFFQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IG1ha2VOYXZCYXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBuYXZTdHJpbmcgPSBgPHNwYW4+QkVUU1k8L3NwYW4+ICA8YSBjbGFzcz1cIm5hdmJhci1pdGVtXCIgaHJlZj1cIiNcIj5DYXRlZ29yaWVzPC9hPlxyXG4gICAgPGEgY2xhc3M9XCJuYXZiYXItaXRlbVwiIGhyZWY9XCIjXCI+T3JkZXJzPC9hPlxyXG4gICAgPGEgY2xhc3M9XCJuYXZiYXItaXRlbVwiIGhyZWY9XCIjXCI+TG9nIE91dDwvYT5gXHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYXYtYmFyXCIpLmlubmVySFRNTD1uYXZTdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWFrZU5hdkJhcigpOyIsImltcG9ydCBtYWtlTmF2QmFyIGZyb20gXCIuL05hdi5qc1wiXHJcblxyXG5tYWtlTmF2QmFyKCk7Il19
