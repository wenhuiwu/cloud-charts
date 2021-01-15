'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _common = require('../common/common');

var _arrow = require('../common/arrow');

var _arrow2 = _interopRequireDefault(_arrow);

var _log = require('../common/log');

var _log2 = _interopRequireDefault(_log);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var prefix = 'cloud-wnumber';

function getTrendIcon(trend) {
  if (trend === 'raise') {
    return _react2.default.createElement(_arrow2.default, { type: 'up' });
  } else if (trend === 'drop') {
    return _react2.default.createElement(_arrow2.default, { type: 'down' });
  }
}

var Wnumber = function (_React$Component) {
  _inherits(Wnumber, _React$Component);

  function Wnumber(props) {
    _classCallCheck(this, Wnumber);

    // 图表初始化时记录日志
    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    (0, _log2.default)('Wnumber', 'init');
    return _this;
  }

  Wnumber.prototype.renderBottom = function renderBottom(bottomTitle) {
    if (!!bottomTitle) {
      return _react2.default.createElement(
        'div',
        { className: prefix + '-bottomTitle' },
        bottomTitle
      );
    }
  };

  Wnumber.prototype.renderMain = function renderMain(status, unit, numberTrend, rightRatioTrend, rightTitle, rightRatio, rightRatioStatus, trend, children) {
    var numberTrendIcon = getTrendIcon(numberTrend);
    var numberClasses = prefix + '-number';

    var rightRatioTrendIcon = getTrendIcon(rightRatioTrend);
    var rightRatioTrendClasses = prefix + '-rightRatio ' + rightRatioTrend + ' ' + (rightRatioStatus ? (0, _common.getStatusColorName)(rightRatioStatus) : '');

    return _react2.default.createElement(
      'div',
      { className: prefix + '-main ' + numberTrend + ' ' + (status ? (0, _common.getStatusColorName)(status) : '') },
      numberTrend && _react2.default.createElement(
        'span',
        { className: prefix + '-leftIcon' },
        numberTrendIcon
      ),
      _react2.default.createElement(
        'span',
        { className: numberClasses },
        children
      ),
      unit && _react2.default.createElement(
        'span',
        { className: prefix + '-unit' },
        unit
      ),
      rightTitle && _react2.default.createElement(
        'span',
        { className: prefix + '-rightTitle' },
        rightTitle
      ),
      rightRatio && _react2.default.createElement(
        'span',
        { className: rightRatioTrendClasses },
        rightRatioTrend && _react2.default.createElement(
          'span',
          { className: prefix + '-rightRatioIcon' },
          rightRatioTrendIcon
        ),
        rightRatio
      ),
      trend && _react2.default.createElement(
        'span',
        { className: prefix + '-trend' },
        trend()
      )
    );
  };

  Wnumber.prototype.render = function render() {
    var _classNames;

    var _props = this.props,
        className = _props.className,
        style = _props.style,
        status = _props.status,
        unit = _props.unit,
        numberTrend = _props.numberTrend,
        rightRatioTrend = _props.rightRatioTrend,
        rightTitle = _props.rightTitle,
        rightRatio = _props.rightRatio,
        rightRatioStatus = _props.rightRatioStatus,
        trend = _props.trend,
        children = _props.children,
        bottomTitle = _props.bottomTitle,
        otherProps = _objectWithoutProperties(_props, ['className', 'style', 'status', 'unit', 'numberTrend', 'rightRatioTrend', 'rightTitle', 'rightRatio', 'rightRatioStatus', 'trend', 'children', 'bottomTitle']);

    var mainClasses = (0, _classnames2.default)((_classNames = {
      'cloud-charts': true
    }, _classNames['' + prefix] = true, _classNames[className] = !!className, _classNames));

    return _react2.default.createElement(
      'div',
      _extends({ className: mainClasses, style: style }, otherProps),
      this.renderMain(status, unit, numberTrend, rightRatioTrend, rightTitle, rightRatio, rightRatioStatus, trend, children),
      this.renderBottom(bottomTitle)
    );
  };

  return Wnumber;
}(_react2.default.Component);

Wnumber.displayName = 'Wnumber';
Wnumber.defaultProps = {
  numberTrend: '',
  rightRatioTrend: '',
  status: ''
};
Wnumber.displayName = 'Wnumber';
exports.default = Wnumber;


Wnumber.propTypes = {
  bottomTitle: _propTypes2.default.node,
  unit: _propTypes2.default.node,
  trend: _propTypes2.default.func
};