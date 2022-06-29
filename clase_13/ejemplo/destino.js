"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// const list = [2, 3, 4, 6];
// list.map((x) => x * x).forEach((x) => console.log(x));
var Color = /*#__PURE__*/function () {
  function Color() {
    _classCallCheck(this, Color);
  }

  _createClass(Color, [{
    key: "getRandomColor",
    value: function getRandomColor() {
      var randomValue = function randomValue() {
        return Math.floor(Math.random() * 256);
      };

      return "rgb(".concat(randomValue(), ", ").concat(randomValue(), ", ").concat(randomValue(), ")");
    }
  }]);

  return Color;
}();
