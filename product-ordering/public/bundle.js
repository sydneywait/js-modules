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
  <p class="card-text">${product.desc}</p>
  <h5>Quantity: ${product.quantity},     Price: ${product.price}</h5>
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// exports a function that makes an individual review
const reviewBuilder = review => {
  return `<div><img src = ${review.stars} width ="150px"></img>
<p>${review.text}</p>

</div>`;
};

var _default = reviewBuilder;
exports.default = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Will hold the data from each review (think array of text?)
const reviews = [{
  text: "Lorem ipsum dolor amet franzen gentrify heirloom plaid, twee intelligentsia lyft hella art party succulents adaptogen poke. Food truck offal marfa pabst pickled disrupt kombucha distillery brunch photo booth tbh fanny pack literally thundercats. Williamsburg gluten-free cray activated charcoal chartreuse vape distillery four dollar toast letterpress offal venmo heirloom asymmetrical. Asymmetrical affogato intelligentsia poutine tofu mixtape polaroid offal kickstarter migas. IPhone quinoa adaptogen wolf locavore health goth waistcoat. Listicle echo park cred, polaroid mumblecore etsy squid.",
  stars: "https://cdn-images-1.medium.com/max/1600/0*hJ9jT2iOGIU63xJ9.png"
}, {
  text: "Tumblr cronut pinterest small batch, sriracha four loko glossier jianbing butcher. Vinyl celiac cornhole affogato la croix. Master cleanse occupy neutra, selvage deep v +1 chambray kogi kickstarter vape synth slow-carb letterpress banh mi. Iceland pok pok meggings drinking vinegar, keytar flexitarian locavore ugh asymmetrical. 90's skateboard viral distillery, +1 roof party irony palo santo letterpress fanny pack kale chips gochujang keytar direct trade hashtag. Pok pok gentrify put a bird on it mixtape slow-carb. Gentrify knausgaard cronut keytar farm-to-table chambray mixtape edison bulb wayfarers celiac.",
  stars: "https://cdn-images-1.medium.com/max/1600/0*GkoECDuda4Ff2iZH.jpg"
}, {
  text: "Poke scenester palo santo, hammock narwhal truffaut everyday carry williamsburg chartreuse helvetica typewriter pok pok. Kickstarter four dollar toast pop-up jianbing normcore stumptown. Mustache pok pok cray cloud bread letterpress kickstarter cardigan copper mug fanny pack tattooed next level williamsburg tbh farm-to-table forage. Small batch heirloom church-key beard meggings neutra subway tile, messenger bag tbh whatever brooklyn. Etsy poutine hella hell of cloud bread hashtag affogato before they sold out four loko chartreuse godard pickled hexagon actually air plant. Truffaut swag marfa polaroid vice. VHS listicle gentrify ramps chartreuse.",
  stars: "http://deannanowadnick.com/wp-content/uploads/2016/04/xcg7BkocA.png"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL05hdi5qcyIsIi4uL3NjcmlwdHMvUHJvZHVjdC5qcyIsIi4uL3NjcmlwdHMvUHJvZHVjdERhdGEuanMiLCIuLi9zY3JpcHRzL1Byb2R1Y3RMaXN0LmpzIiwiLi4vc2NyaXB0cy9SZXZpZXcuanMiLCIuLi9zY3JpcHRzL1Jldmlld0RhdGEuanMiLCIuLi9zY3JpcHRzL1Jldmlld0xpc3QuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUEsTUFBTSxVQUFVLEdBQUcsTUFBTTtBQUNyQixRQUFNLFNBQVMsR0FBSTs7Z0RBQW5CO0FBSUEsRUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixVQUF2QixFQUFtQyxTQUFuQyxHQUE2QyxTQUE3QztBQUNILENBTkQ7O2VBUWUsVTs7Ozs7Ozs7Ozs7QUNSZjtBQUVBLE1BQU0sZUFBZSxHQUFJLE9BQUQsSUFBVztBQUVuQyxTQUFRO2lDQUN5QixPQUFPLENBQUMsS0FBTTs7MkJBRXBCLE9BQU8sQ0FBQyxJQUFLO3lCQUNmLE9BQU8sQ0FBQyxJQUFLO2tCQUNwQixPQUFPLENBQUMsUUFBUyxnQkFBZSxPQUFPLENBQUMsS0FBTTs7T0FMaEU7QUFRQyxDQVZEOztlQWFlLGU7Ozs7Ozs7Ozs7QUNmZjtBQUVBLE1BQU0sUUFBUSxHQUFHLENBQ2pCO0FBQ0ksRUFBQSxJQUFJLEVBQUUsT0FEVjtBQUVJLEVBQUEsSUFBSSxFQUFFLG1DQUZWO0FBR0ksRUFBQSxLQUFLLEVBQUUsUUFIWDtBQUlJLEVBQUEsUUFBUSxFQUFFLEdBSmQ7QUFLSSxFQUFBLEtBQUssRUFBRTtBQUxYLENBRGlCLENBQWpCO2VBVWUsUTs7Ozs7Ozs7Ozs7QUNYZjs7QUFDQTs7OztBQUZBO0FBSUEsTUFBTSxZQUFZLEdBQUcsTUFBSztBQUMxQix1QkFBUyxPQUFULENBQWlCLE9BQU8sSUFBSTtBQUN4QixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLFNBQXhDLElBQW1ELHNCQUFnQixPQUFoQixDQUFuRDtBQUNILEdBRkQ7QUFFRyxDQUhIOztlQUtlLFk7Ozs7Ozs7Ozs7O0FDVGY7QUFFQSxNQUFNLGFBQWEsR0FBSSxNQUFELElBQVc7QUFHakMsU0FBUSxtQkFBa0IsTUFBTSxDQUFDLEtBQU07S0FDbEMsTUFBTSxDQUFDLElBQUs7O09BRGpCO0FBS0MsQ0FSRDs7ZUFVZSxhOzs7Ozs7Ozs7O0FDWmY7QUFFQSxNQUFNLE9BQU8sR0FBRyxDQUNaO0FBQ0ksRUFBQSxJQUFJLEVBQUUsc2xCQURWO0FBRUksRUFBQSxLQUFLLEVBQUU7QUFGWCxDQURZLEVBS2hCO0FBQ0ksRUFBQSxJQUFJLEVBQUUsd21CQURWO0FBRUksRUFBQSxLQUFLLEVBQUU7QUFGWCxDQUxnQixFQVNoQjtBQUNJLEVBQUEsSUFBSSxFQUFFLGdwQkFEVjtBQUVJLEVBQUEsS0FBSyxFQUFFO0FBRlgsQ0FUZ0IsQ0FBaEI7ZUFnQmUsTzs7Ozs7Ozs7Ozs7QUNqQmY7O0FBQ0E7Ozs7QUFGQTtBQUlBLE1BQU0sV0FBVyxHQUFFLE1BQUk7QUFFdkIsc0JBQVEsT0FBUixDQUFnQixNQUFNLElBQUc7QUFFckIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QixFQUF1QyxTQUF2QyxJQUFrRCxxQkFBYyxNQUFkLENBQWxEO0FBRUgsR0FKRDtBQUtDLENBUEQ7O2VBU2UsVzs7Ozs7O0FDYmY7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBtYWtlTmF2QmFyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbmF2U3RyaW5nID0gYDxzcGFuPkJFVFNZPC9zcGFuPiAgPGEgY2xhc3M9XCJuYXZiYXItaXRlbVwiIGhyZWY9XCIjXCI+Q2F0ZWdvcmllczwvYT5cclxuICAgIDxhIGNsYXNzPVwibmF2YmFyLWl0ZW1cIiBocmVmPVwiI1wiPk9yZGVyczwvYT5cclxuICAgIDxhIGNsYXNzPVwibmF2YmFyLWl0ZW1cIiBocmVmPVwiI1wiPkxvZyBPdXQ8L2E+YFxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmF2LWJhclwiKS5pbm5lckhUTUw9bmF2U3RyaW5nXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1ha2VOYXZCYXI7IiwiLy8gYnVpbGQgYSBzaW5nbGUgcHJvZHVjdCBjYXJkXHJcblxyXG5jb25zdCBtYWtlUHJvZHVjdENhcmQgPSAocHJvZHVjdCk9PntcclxuXHJcbnJldHVybiBgPGRpdiBjbGFzcz1cImNhcmRcIiBzdHlsZT1cIndpZHRoOiAyMDBweDtcIj5cclxuPGltZyBjbGFzcz1cImNhcmQtaW1nLXRvcFwiIHNyYz1cIiR7cHJvZHVjdC5pbWFnZX1cIiB3aWR0aCA9XCIyMDBweFwiIGFsdD1cIkNhcmQgaW1hZ2UgY2FwXCI+XHJcbjxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICA8aDQgY2xhc3M9XCJjYXJkLXRpdGxlXCI+JHtwcm9kdWN0Lm5hbWV9PC9oND5cclxuICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiPiR7cHJvZHVjdC5kZXNjfTwvcD5cclxuICA8aDU+UXVhbnRpdHk6ICR7cHJvZHVjdC5xdWFudGl0eX0sICAgICBQcmljZTogJHtwcm9kdWN0LnByaWNlfTwvaDU+XHJcbjwvZGl2PlxyXG48L2Rpdj5gXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYWtlUHJvZHVjdENhcmQ7XHJcbiIsIi8vIGRhdGFiYXNlIG9mIHByb2R1Y3RzIGFuZCB0aGVpciBhdHRyaWJ1dGVzXHJcblxyXG5jb25zdCBwcm9kdWN0cyA9IFtcclxue1xyXG4gICAgbmFtZTogXCJGdXJieVwiLFxyXG4gICAgZGVzYzogXCJBIGxvdmFibGUsIHlldCBldmlsLCB0YWxraW5nIGRvbGxcIixcclxuICAgIHByaWNlOiBcIiQxNS45OVwiLFxyXG4gICAgcXVhbnRpdHk6IFwiMVwiLFxyXG4gICAgaW1hZ2U6IFwiaHR0cHM6Ly9pbWFnZXMtbmEuc3NsLWltYWdlcy1hbWF6b24uY29tL2ltYWdlcy9JLzUxZEp1U1FxcVdMLmpwZ1wiXHJcbn1cclxuXVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJvZHVjdHM7XHJcbiIsIi8vIGltcG9ydHMgZnJvbSBwcm9kdWN0RGF0YSBhbmQgcHJvZHVjdFxyXG5pbXBvcnQgcHJvZHVjdHMgZnJvbSBcIi4vUHJvZHVjdERhdGEuanNcIlxyXG5pbXBvcnQgbWFrZVByb2R1Y3RDYXJkIGZyb20gXCIuL1Byb2R1Y3QuanNcIlxyXG5cclxuY29uc3QgbGlzdFByb2R1Y3RzID0gKCkgPT57XHJcbnByb2R1Y3RzLmZvckVhY2gocHJvZHVjdCA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2R1Y3QtbGlzdFwiKS5pbm5lckhUTUwrPW1ha2VQcm9kdWN0Q2FyZChwcm9kdWN0KVxyXG59KX07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsaXN0UHJvZHVjdHM7IiwiLy8gZXhwb3J0cyBhIGZ1bmN0aW9uIHRoYXQgbWFrZXMgYW4gaW5kaXZpZHVhbCByZXZpZXdcclxuXHJcbmNvbnN0IHJldmlld0J1aWxkZXIgPSAocmV2aWV3KSA9PntcclxuXHJcblxyXG5yZXR1cm4gYDxkaXY+PGltZyBzcmMgPSAke3Jldmlldy5zdGFyc30gd2lkdGggPVwiMTUwcHhcIj48L2ltZz5cclxuPHA+JHtyZXZpZXcudGV4dH08L3A+XHJcblxyXG48L2Rpdj5gXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZXZpZXdCdWlsZGVyOyIsIi8vIFdpbGwgaG9sZCB0aGUgZGF0YSBmcm9tIGVhY2ggcmV2aWV3ICh0aGluayBhcnJheSBvZiB0ZXh0PylcclxuXHJcbmNvbnN0IHJldmlld3MgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgdGV4dDogXCJMb3JlbSBpcHN1bSBkb2xvciBhbWV0IGZyYW56ZW4gZ2VudHJpZnkgaGVpcmxvb20gcGxhaWQsIHR3ZWUgaW50ZWxsaWdlbnRzaWEgbHlmdCBoZWxsYSBhcnQgcGFydHkgc3VjY3VsZW50cyBhZGFwdG9nZW4gcG9rZS4gRm9vZCB0cnVjayBvZmZhbCBtYXJmYSBwYWJzdCBwaWNrbGVkIGRpc3J1cHQga29tYnVjaGEgZGlzdGlsbGVyeSBicnVuY2ggcGhvdG8gYm9vdGggdGJoIGZhbm55IHBhY2sgbGl0ZXJhbGx5IHRodW5kZXJjYXRzLiBXaWxsaWFtc2J1cmcgZ2x1dGVuLWZyZWUgY3JheSBhY3RpdmF0ZWQgY2hhcmNvYWwgY2hhcnRyZXVzZSB2YXBlIGRpc3RpbGxlcnkgZm91ciBkb2xsYXIgdG9hc3QgbGV0dGVycHJlc3Mgb2ZmYWwgdmVubW8gaGVpcmxvb20gYXN5bW1ldHJpY2FsLiBBc3ltbWV0cmljYWwgYWZmb2dhdG8gaW50ZWxsaWdlbnRzaWEgcG91dGluZSB0b2Z1IG1peHRhcGUgcG9sYXJvaWQgb2ZmYWwga2lja3N0YXJ0ZXIgbWlnYXMuIElQaG9uZSBxdWlub2EgYWRhcHRvZ2VuIHdvbGYgbG9jYXZvcmUgaGVhbHRoIGdvdGggd2Fpc3Rjb2F0LiBMaXN0aWNsZSBlY2hvIHBhcmsgY3JlZCwgcG9sYXJvaWQgbXVtYmxlY29yZSBldHN5IHNxdWlkLlwiLFxyXG4gICAgICAgIHN0YXJzOiBcImh0dHBzOi8vY2RuLWltYWdlcy0xLm1lZGl1bS5jb20vbWF4LzE2MDAvMCpoSjlqVDJpT0dJVTYzeEo5LnBuZ1wiXHJcbiAgICB9LFxyXG57XHJcbiAgICB0ZXh0OiBcIlR1bWJsciBjcm9udXQgcGludGVyZXN0IHNtYWxsIGJhdGNoLCBzcmlyYWNoYSBmb3VyIGxva28gZ2xvc3NpZXIgamlhbmJpbmcgYnV0Y2hlci4gVmlueWwgY2VsaWFjIGNvcm5ob2xlIGFmZm9nYXRvIGxhIGNyb2l4LiBNYXN0ZXIgY2xlYW5zZSBvY2N1cHkgbmV1dHJhLCBzZWx2YWdlIGRlZXAgdiArMSBjaGFtYnJheSBrb2dpIGtpY2tzdGFydGVyIHZhcGUgc3ludGggc2xvdy1jYXJiIGxldHRlcnByZXNzIGJhbmggbWkuIEljZWxhbmQgcG9rIHBvayBtZWdnaW5ncyBkcmlua2luZyB2aW5lZ2FyLCBrZXl0YXIgZmxleGl0YXJpYW4gbG9jYXZvcmUgdWdoIGFzeW1tZXRyaWNhbC4gOTAncyBza2F0ZWJvYXJkIHZpcmFsIGRpc3RpbGxlcnksICsxIHJvb2YgcGFydHkgaXJvbnkgcGFsbyBzYW50byBsZXR0ZXJwcmVzcyBmYW5ueSBwYWNrIGthbGUgY2hpcHMgZ29jaHVqYW5nIGtleXRhciBkaXJlY3QgdHJhZGUgaGFzaHRhZy4gUG9rIHBvayBnZW50cmlmeSBwdXQgYSBiaXJkIG9uIGl0IG1peHRhcGUgc2xvdy1jYXJiLiBHZW50cmlmeSBrbmF1c2dhYXJkIGNyb251dCBrZXl0YXIgZmFybS10by10YWJsZSBjaGFtYnJheSBtaXh0YXBlIGVkaXNvbiBidWxiIHdheWZhcmVycyBjZWxpYWMuXCIsXHJcbiAgICBzdGFyczogXCJodHRwczovL2Nkbi1pbWFnZXMtMS5tZWRpdW0uY29tL21heC8xNjAwLzAqR2tvRUNEdWRhNEZmMmlaSC5qcGdcIlxyXG59LFxyXG57XHJcbiAgICB0ZXh0OiBcIlBva2Ugc2NlbmVzdGVyIHBhbG8gc2FudG8sIGhhbW1vY2sgbmFyd2hhbCB0cnVmZmF1dCBldmVyeWRheSBjYXJyeSB3aWxsaWFtc2J1cmcgY2hhcnRyZXVzZSBoZWx2ZXRpY2EgdHlwZXdyaXRlciBwb2sgcG9rLiBLaWNrc3RhcnRlciBmb3VyIGRvbGxhciB0b2FzdCBwb3AtdXAgamlhbmJpbmcgbm9ybWNvcmUgc3R1bXB0b3duLiBNdXN0YWNoZSBwb2sgcG9rIGNyYXkgY2xvdWQgYnJlYWQgbGV0dGVycHJlc3Mga2lja3N0YXJ0ZXIgY2FyZGlnYW4gY29wcGVyIG11ZyBmYW5ueSBwYWNrIHRhdHRvb2VkIG5leHQgbGV2ZWwgd2lsbGlhbXNidXJnIHRiaCBmYXJtLXRvLXRhYmxlIGZvcmFnZS4gU21hbGwgYmF0Y2ggaGVpcmxvb20gY2h1cmNoLWtleSBiZWFyZCBtZWdnaW5ncyBuZXV0cmEgc3Vid2F5IHRpbGUsIG1lc3NlbmdlciBiYWcgdGJoIHdoYXRldmVyIGJyb29rbHluLiBFdHN5IHBvdXRpbmUgaGVsbGEgaGVsbCBvZiBjbG91ZCBicmVhZCBoYXNodGFnIGFmZm9nYXRvIGJlZm9yZSB0aGV5IHNvbGQgb3V0IGZvdXIgbG9rbyBjaGFydHJldXNlIGdvZGFyZCBwaWNrbGVkIGhleGFnb24gYWN0dWFsbHkgYWlyIHBsYW50LiBUcnVmZmF1dCBzd2FnIG1hcmZhIHBvbGFyb2lkIHZpY2UuIFZIUyBsaXN0aWNsZSBnZW50cmlmeSByYW1wcyBjaGFydHJldXNlLlwiLFxyXG4gICAgc3RhcnM6IFwiaHR0cDovL2RlYW5uYW5vd2Fkbmljay5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTYvMDQveGNnN0Jrb2NBLnBuZ1wiXHJcblxyXG59XHJcbl1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJldmlld3M7XHJcbiIsIi8vIGltcG9ydHMgZnJvbSBSZXZpZXdEYXRhIGFuZCBSZXZpZXcsIGNyZWF0ZXMgYSBsaXN0IG9mIHRoZSByZXZpZXdzIGFuZCBwb3N0cyB0byBET00/XHJcbmltcG9ydCByZXZpZXdzIGZyb20gXCIuL1Jldmlld0RhdGEuanNcIlxyXG5pbXBvcnQgcmV2aWV3QnVpbGRlciBmcm9tIFwiLi9SZXZpZXcuanNcIlxyXG5cclxuY29uc3QgbGlzdFJldmlld3MgPSgpPT57XHJcblxyXG5yZXZpZXdzLmZvckVhY2gocmV2aWV3ID0+e1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmV2aWV3LWxpc3RcIikuaW5uZXJIVE1MKz1yZXZpZXdCdWlsZGVyKHJldmlldyk7XHJcblxyXG59KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsaXN0UmV2aWV3czsiLCJpbXBvcnQgbWFrZU5hdkJhciBmcm9tIFwiLi9OYXYuanNcIlxyXG5pbXBvcnQgbGlzdFByb2R1Y3RzIGZyb20gXCIuL1Byb2R1Y3RMaXN0LmpzXCJcclxuaW1wb3J0IGxpc3RSZXZpZXdzIGZyb20gXCIuL1Jldmlld0xpc3QuanNcIlxyXG5cclxubWFrZU5hdkJhcigpO1xyXG5saXN0UHJvZHVjdHMoKTtcclxubGlzdFJldmlld3MoKTtcclxuXHJcblxyXG4iXX0=
