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

var _default = makeNavBar;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// build a single product card
const makeProductCard = product => {
  return `<div class="card" style="width: 200px;">
<img class="card-img-top" src="${product.image}" width ="200px" alt="Card image cap">
<div class="card-body">
  <h4 class="card-title">${product.name}</h4>
  <h5>quantity: ${product.quantity}, price: ${product.price}</h5>

  <p class="card-text">${product.desc}</p>
  <a href="#" class="btn btn-primary">Go somewhere</a>
</div>
</div>`;
};

var _default = makeProductCard;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// database of products and their attributes
const products = [{
  name: "Furby",
  desc: "A lovable, yet evil, talking doll",
  price: "$15.99",
  quantity: "1",
  image: "https://images-na.ssl-images-amazon.com/images/I/51dJuSQqqWL.jpg"
}];
var _default = products;
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ProductData = _interopRequireDefault(require("./ProductData.js"));

var _Product = _interopRequireDefault(require("./Product.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// imports from productData and product
const listProducts = () => {
  _ProductData.default.forEach(product => {
    document.querySelector("#product-list").innerHTML += (0, _Product.default)(product);
  });
};

var _default = listProducts;
exports.default = _default;

},{"./Product.js":2,"./ProductData.js":3}],5:[function(require,module,exports){
// exports a function that makes an individual review
"use strict";

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Will hold the data from each review (think array of text?)
const reviews = [{
  text: "Lorem ipsum dolor amet franzen gentrify heirloom plaid, twee intelligentsia lyft hella art party succulents adaptogen poke. Food truck offal marfa pabst pickled disrupt kombucha distillery brunch photo booth tbh fanny pack literally thundercats. Williamsburg gluten-free cray activated charcoal chartreuse vape distillery four dollar toast letterpress offal venmo heirloom asymmetrical. Asymmetrical affogato intelligentsia poutine tofu mixtape polaroid offal kickstarter migas. IPhone quinoa adaptogen wolf locavore health goth waistcoat. Listicle echo park cred, polaroid mumblecore etsy squid.",
  stars: 4
}, {
  text: "Tumblr cronut pinterest small batch, sriracha four loko glossier jianbing butcher. Vinyl celiac cornhole affogato la croix. Master cleanse occupy neutra, selvage deep v +1 chambray kogi kickstarter vape synth slow-carb letterpress banh mi. Iceland pok pok meggings drinking vinegar, keytar flexitarian locavore ugh asymmetrical. 90's skateboard viral distillery, +1 roof party irony palo santo letterpress fanny pack kale chips gochujang keytar direct trade hashtag. Pok pok gentrify put a bird on it mixtape slow-carb. Gentrify knausgaard cronut keytar farm-to-table chambray mixtape edison bulb wayfarers celiac.",
  stars: 1
}, {
  text: "Poke scenester palo santo, hammock narwhal truffaut everyday carry williamsburg chartreuse helvetica typewriter pok pok. Kickstarter four dollar toast pop-up jianbing normcore stumptown. Mustache pok pok cray cloud bread letterpress kickstarter cardigan copper mug fanny pack tattooed next level williamsburg tbh farm-to-table forage. Small batch heirloom church-key beard meggings neutra subway tile, messenger bag tbh whatever brooklyn. Etsy poutine hella hell of cloud bread hashtag affogato before they sold out four loko chartreuse godard pickled hexagon actually air plant. Truffaut swag marfa polaroid vice. VHS listicle gentrify ramps chartreuse.",
  stars: 5
}];
var _default = reviews;
exports.default = _default;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ReviewData = _interopRequireDefault(require("./ReviewData.js"));

var _Review = _interopRequireDefault(require("./Review.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// imports from ReviewData and Review, creates a list of the reviews and posts to DOM?
const listReviews = () => {
  _ReviewData.default.forEach(review => {
    document.querySelector("#review-list").innerHTML += (0, _Review.default)(review);
  });
};

var _default = listReviews;
exports.default = _default;

},{"./Review.js":5,"./ReviewData.js":6}],8:[function(require,module,exports){
"use strict";

var _Nav = _interopRequireDefault(require("./Nav.js"));

var _ProductList = _interopRequireDefault(require("./ProductList.js"));

var _ReviewList = _interopRequireDefault(require("./ReviewList.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _Nav.default)();
(0, _ProductList.default)();
(0, _ReviewList.default)();

},{"./Nav.js":1,"./ProductList.js":4,"./ReviewList.js":7}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL05hdi5qcyIsIi4uL3NjcmlwdHMvUHJvZHVjdC5qcyIsIi4uL3NjcmlwdHMvUHJvZHVjdERhdGEuanMiLCIuLi9zY3JpcHRzL1Byb2R1Y3RMaXN0LmpzIiwiLi4vc2NyaXB0cy9SZXZpZXcuanMiLCIuLi9zY3JpcHRzL1Jldmlld0RhdGEuanMiLCIuLi9zY3JpcHRzL1Jldmlld0xpc3QuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUEsTUFBTSxVQUFVLEdBQUcsTUFBTTtBQUNyQixRQUFNLFNBQVMsR0FBSTs7Z0RBQW5CO0FBSUEsRUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixVQUF2QixFQUFtQyxTQUFuQyxHQUE2QyxTQUE3QztBQUNILENBTkQ7O2VBUWUsVTs7Ozs7Ozs7Ozs7QUNSZjtBQUVBLE1BQU0sZUFBZSxHQUFJLE9BQUQsSUFBVztBQUVuQyxTQUFRO2lDQUN5QixPQUFPLENBQUMsS0FBTTs7MkJBRXBCLE9BQU8sQ0FBQyxJQUFLO2tCQUN0QixPQUFPLENBQUMsUUFBUyxZQUFXLE9BQU8sQ0FBQyxLQUFNOzt5QkFFbkMsT0FBTyxDQUFDLElBQUs7OztPQU50QztBQVVDLENBWkQ7O2VBZWUsZTs7Ozs7Ozs7OztBQ2pCZjtBQUVBLE1BQU0sUUFBUSxHQUFHLENBQ2pCO0FBQ0ksRUFBQSxJQUFJLEVBQUUsT0FEVjtBQUVJLEVBQUEsSUFBSSxFQUFFLG1DQUZWO0FBR0ksRUFBQSxLQUFLLEVBQUUsUUFIWDtBQUlJLEVBQUEsUUFBUSxFQUFFLEdBSmQ7QUFLSSxFQUFBLEtBQUssRUFBRTtBQUxYLENBRGlCLENBQWpCO2VBVWUsUTs7Ozs7Ozs7Ozs7QUNYZjs7QUFDQTs7OztBQUZBO0FBSUEsTUFBTSxZQUFZLEdBQUcsTUFBSztBQUMxQix1QkFBUyxPQUFULENBQWlCLE9BQU8sSUFBSTtBQUN4QixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLFNBQXhDLElBQW1ELHNCQUFnQixPQUFoQixDQUFuRDtBQUNILEdBRkQ7QUFFRyxDQUhIOztlQUtlLFk7Ozs7QUNUZjs7Ozs7Ozs7OztBQ0FBO0FBRUEsTUFBTSxPQUFPLEdBQUcsQ0FDWjtBQUNJLEVBQUEsSUFBSSxFQUFFLHNsQkFEVjtBQUVJLEVBQUEsS0FBSyxFQUFFO0FBRlgsQ0FEWSxFQUtoQjtBQUNJLEVBQUEsSUFBSSxFQUFFLHdtQkFEVjtBQUVJLEVBQUEsS0FBSyxFQUFFO0FBRlgsQ0FMZ0IsRUFTaEI7QUFDSSxFQUFBLElBQUksRUFBRSxncEJBRFY7QUFFSSxFQUFBLEtBQUssRUFBRTtBQUZYLENBVGdCLENBQWhCO2VBZ0JlLE87Ozs7Ozs7Ozs7O0FDakJmOztBQUNBOzs7O0FBRkE7QUFJQSxNQUFNLFdBQVcsR0FBRSxNQUFJO0FBRXZCLHNCQUFRLE9BQVIsQ0FBZ0IsTUFBTSxJQUFHO0FBRXJCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsY0FBdkIsRUFBdUMsU0FBdkMsSUFBa0QscUJBQWMsTUFBZCxDQUFsRDtBQUVILEdBSkQ7QUFLQyxDQVBEOztlQVNlLFc7Ozs7OztBQ2JmOztBQUNBOztBQUNBOzs7O0FBRUE7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgbWFrZU5hdkJhciA9ICgpID0+IHtcclxuICAgIGNvbnN0IG5hdlN0cmluZyA9IGA8c3Bhbj5CRVRTWTwvc3Bhbj4gIDxhIGNsYXNzPVwibmF2YmFyLWl0ZW1cIiBocmVmPVwiI1wiPkNhdGVnb3JpZXM8L2E+XHJcbiAgICA8YSBjbGFzcz1cIm5hdmJhci1pdGVtXCIgaHJlZj1cIiNcIj5PcmRlcnM8L2E+XHJcbiAgICA8YSBjbGFzcz1cIm5hdmJhci1pdGVtXCIgaHJlZj1cIiNcIj5Mb2cgT3V0PC9hPmBcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hdi1iYXJcIikuaW5uZXJIVE1MPW5hdlN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYWtlTmF2QmFyOyIsIi8vIGJ1aWxkIGEgc2luZ2xlIHByb2R1Y3QgY2FyZFxyXG5cclxuY29uc3QgbWFrZVByb2R1Y3RDYXJkID0gKHByb2R1Y3QpPT57XHJcblxyXG5yZXR1cm4gYDxkaXYgY2xhc3M9XCJjYXJkXCIgc3R5bGU9XCJ3aWR0aDogMjAwcHg7XCI+XHJcbjxpbWcgY2xhc3M9XCJjYXJkLWltZy10b3BcIiBzcmM9XCIke3Byb2R1Y3QuaW1hZ2V9XCIgd2lkdGggPVwiMjAwcHhcIiBhbHQ9XCJDYXJkIGltYWdlIGNhcFwiPlxyXG48ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XHJcbiAgPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPiR7cHJvZHVjdC5uYW1lfTwvaDQ+XHJcbiAgPGg1PnF1YW50aXR5OiAke3Byb2R1Y3QucXVhbnRpdHl9LCBwcmljZTogJHtwcm9kdWN0LnByaWNlfTwvaDU+XHJcblxyXG4gIDxwIGNsYXNzPVwiY2FyZC10ZXh0XCI+JHtwcm9kdWN0LmRlc2N9PC9wPlxyXG4gIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIj5HbyBzb21ld2hlcmU8L2E+XHJcbjwvZGl2PlxyXG48L2Rpdj5gXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYWtlUHJvZHVjdENhcmQ7XHJcbiIsIi8vIGRhdGFiYXNlIG9mIHByb2R1Y3RzIGFuZCB0aGVpciBhdHRyaWJ1dGVzXHJcblxyXG5jb25zdCBwcm9kdWN0cyA9IFtcclxue1xyXG4gICAgbmFtZTogXCJGdXJieVwiLFxyXG4gICAgZGVzYzogXCJBIGxvdmFibGUsIHlldCBldmlsLCB0YWxraW5nIGRvbGxcIixcclxuICAgIHByaWNlOiBcIiQxNS45OVwiLFxyXG4gICAgcXVhbnRpdHk6IFwiMVwiLFxyXG4gICAgaW1hZ2U6IFwiaHR0cHM6Ly9pbWFnZXMtbmEuc3NsLWltYWdlcy1hbWF6b24uY29tL2ltYWdlcy9JLzUxZEp1U1FxcVdMLmpwZ1wiXHJcbn1cclxuXVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJvZHVjdHM7XHJcbiIsIi8vIGltcG9ydHMgZnJvbSBwcm9kdWN0RGF0YSBhbmQgcHJvZHVjdFxyXG5pbXBvcnQgcHJvZHVjdHMgZnJvbSBcIi4vUHJvZHVjdERhdGEuanNcIlxyXG5pbXBvcnQgbWFrZVByb2R1Y3RDYXJkIGZyb20gXCIuL1Byb2R1Y3QuanNcIlxyXG5cclxuY29uc3QgbGlzdFByb2R1Y3RzID0gKCkgPT57XHJcbnByb2R1Y3RzLmZvckVhY2gocHJvZHVjdCA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2R1Y3QtbGlzdFwiKS5pbm5lckhUTUwrPW1ha2VQcm9kdWN0Q2FyZChwcm9kdWN0KVxyXG59KX07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsaXN0UHJvZHVjdHM7IiwiLy8gZXhwb3J0cyBhIGZ1bmN0aW9uIHRoYXQgbWFrZXMgYW4gaW5kaXZpZHVhbCByZXZpZXdcclxuXHJcbiIsIi8vIFdpbGwgaG9sZCB0aGUgZGF0YSBmcm9tIGVhY2ggcmV2aWV3ICh0aGluayBhcnJheSBvZiB0ZXh0PylcclxuXHJcbmNvbnN0IHJldmlld3MgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgdGV4dDogXCJMb3JlbSBpcHN1bSBkb2xvciBhbWV0IGZyYW56ZW4gZ2VudHJpZnkgaGVpcmxvb20gcGxhaWQsIHR3ZWUgaW50ZWxsaWdlbnRzaWEgbHlmdCBoZWxsYSBhcnQgcGFydHkgc3VjY3VsZW50cyBhZGFwdG9nZW4gcG9rZS4gRm9vZCB0cnVjayBvZmZhbCBtYXJmYSBwYWJzdCBwaWNrbGVkIGRpc3J1cHQga29tYnVjaGEgZGlzdGlsbGVyeSBicnVuY2ggcGhvdG8gYm9vdGggdGJoIGZhbm55IHBhY2sgbGl0ZXJhbGx5IHRodW5kZXJjYXRzLiBXaWxsaWFtc2J1cmcgZ2x1dGVuLWZyZWUgY3JheSBhY3RpdmF0ZWQgY2hhcmNvYWwgY2hhcnRyZXVzZSB2YXBlIGRpc3RpbGxlcnkgZm91ciBkb2xsYXIgdG9hc3QgbGV0dGVycHJlc3Mgb2ZmYWwgdmVubW8gaGVpcmxvb20gYXN5bW1ldHJpY2FsLiBBc3ltbWV0cmljYWwgYWZmb2dhdG8gaW50ZWxsaWdlbnRzaWEgcG91dGluZSB0b2Z1IG1peHRhcGUgcG9sYXJvaWQgb2ZmYWwga2lja3N0YXJ0ZXIgbWlnYXMuIElQaG9uZSBxdWlub2EgYWRhcHRvZ2VuIHdvbGYgbG9jYXZvcmUgaGVhbHRoIGdvdGggd2Fpc3Rjb2F0LiBMaXN0aWNsZSBlY2hvIHBhcmsgY3JlZCwgcG9sYXJvaWQgbXVtYmxlY29yZSBldHN5IHNxdWlkLlwiLFxyXG4gICAgICAgIHN0YXJzOiA0XHJcbiAgICB9LFxyXG57XHJcbiAgICB0ZXh0OiBcIlR1bWJsciBjcm9udXQgcGludGVyZXN0IHNtYWxsIGJhdGNoLCBzcmlyYWNoYSBmb3VyIGxva28gZ2xvc3NpZXIgamlhbmJpbmcgYnV0Y2hlci4gVmlueWwgY2VsaWFjIGNvcm5ob2xlIGFmZm9nYXRvIGxhIGNyb2l4LiBNYXN0ZXIgY2xlYW5zZSBvY2N1cHkgbmV1dHJhLCBzZWx2YWdlIGRlZXAgdiArMSBjaGFtYnJheSBrb2dpIGtpY2tzdGFydGVyIHZhcGUgc3ludGggc2xvdy1jYXJiIGxldHRlcnByZXNzIGJhbmggbWkuIEljZWxhbmQgcG9rIHBvayBtZWdnaW5ncyBkcmlua2luZyB2aW5lZ2FyLCBrZXl0YXIgZmxleGl0YXJpYW4gbG9jYXZvcmUgdWdoIGFzeW1tZXRyaWNhbC4gOTAncyBza2F0ZWJvYXJkIHZpcmFsIGRpc3RpbGxlcnksICsxIHJvb2YgcGFydHkgaXJvbnkgcGFsbyBzYW50byBsZXR0ZXJwcmVzcyBmYW5ueSBwYWNrIGthbGUgY2hpcHMgZ29jaHVqYW5nIGtleXRhciBkaXJlY3QgdHJhZGUgaGFzaHRhZy4gUG9rIHBvayBnZW50cmlmeSBwdXQgYSBiaXJkIG9uIGl0IG1peHRhcGUgc2xvdy1jYXJiLiBHZW50cmlmeSBrbmF1c2dhYXJkIGNyb251dCBrZXl0YXIgZmFybS10by10YWJsZSBjaGFtYnJheSBtaXh0YXBlIGVkaXNvbiBidWxiIHdheWZhcmVycyBjZWxpYWMuXCIsXHJcbiAgICBzdGFyczogMVxyXG59LFxyXG57XHJcbiAgICB0ZXh0OiBcIlBva2Ugc2NlbmVzdGVyIHBhbG8gc2FudG8sIGhhbW1vY2sgbmFyd2hhbCB0cnVmZmF1dCBldmVyeWRheSBjYXJyeSB3aWxsaWFtc2J1cmcgY2hhcnRyZXVzZSBoZWx2ZXRpY2EgdHlwZXdyaXRlciBwb2sgcG9rLiBLaWNrc3RhcnRlciBmb3VyIGRvbGxhciB0b2FzdCBwb3AtdXAgamlhbmJpbmcgbm9ybWNvcmUgc3R1bXB0b3duLiBNdXN0YWNoZSBwb2sgcG9rIGNyYXkgY2xvdWQgYnJlYWQgbGV0dGVycHJlc3Mga2lja3N0YXJ0ZXIgY2FyZGlnYW4gY29wcGVyIG11ZyBmYW5ueSBwYWNrIHRhdHRvb2VkIG5leHQgbGV2ZWwgd2lsbGlhbXNidXJnIHRiaCBmYXJtLXRvLXRhYmxlIGZvcmFnZS4gU21hbGwgYmF0Y2ggaGVpcmxvb20gY2h1cmNoLWtleSBiZWFyZCBtZWdnaW5ncyBuZXV0cmEgc3Vid2F5IHRpbGUsIG1lc3NlbmdlciBiYWcgdGJoIHdoYXRldmVyIGJyb29rbHluLiBFdHN5IHBvdXRpbmUgaGVsbGEgaGVsbCBvZiBjbG91ZCBicmVhZCBoYXNodGFnIGFmZm9nYXRvIGJlZm9yZSB0aGV5IHNvbGQgb3V0IGZvdXIgbG9rbyBjaGFydHJldXNlIGdvZGFyZCBwaWNrbGVkIGhleGFnb24gYWN0dWFsbHkgYWlyIHBsYW50LiBUcnVmZmF1dCBzd2FnIG1hcmZhIHBvbGFyb2lkIHZpY2UuIFZIUyBsaXN0aWNsZSBnZW50cmlmeSByYW1wcyBjaGFydHJldXNlLlwiLFxyXG4gICAgc3RhcnM6IDVcclxuXHJcbn1cclxuXVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmV2aWV3cztcclxuIiwiLy8gaW1wb3J0cyBmcm9tIFJldmlld0RhdGEgYW5kIFJldmlldywgY3JlYXRlcyBhIGxpc3Qgb2YgdGhlIHJldmlld3MgYW5kIHBvc3RzIHRvIERPTT9cclxuaW1wb3J0IHJldmlld3MgZnJvbSBcIi4vUmV2aWV3RGF0YS5qc1wiXHJcbmltcG9ydCByZXZpZXdCdWlsZGVyIGZyb20gXCIuL1Jldmlldy5qc1wiXHJcblxyXG5jb25zdCBsaXN0UmV2aWV3cyA9KCk9PntcclxuXHJcbnJldmlld3MuZm9yRWFjaChyZXZpZXcgPT57XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZXZpZXctbGlzdFwiKS5pbm5lckhUTUwrPXJldmlld0J1aWxkZXIocmV2aWV3KTtcclxuXHJcbn0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxpc3RSZXZpZXdzOyIsImltcG9ydCBtYWtlTmF2QmFyIGZyb20gXCIuL05hdi5qc1wiXHJcbmltcG9ydCBsaXN0UHJvZHVjdHMgZnJvbSBcIi4vUHJvZHVjdExpc3QuanNcIlxyXG5pbXBvcnQgbGlzdFJldmlld3MgZnJvbSBcIi4vUmV2aWV3TGlzdC5qc1wiXHJcblxyXG5tYWtlTmF2QmFyKCk7XHJcbmxpc3RQcm9kdWN0cygpO1xyXG5saXN0UmV2aWV3cygpO1xyXG5cclxuXHJcbiJdfQ==
