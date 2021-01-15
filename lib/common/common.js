'use strict';

exports.__esModule = true;
exports.propertyMap = exports.requestAnimationFrame = exports.merge = exports.isEqualWith = exports.isEqual = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// 引入 lodash 的 isEqual 代替


exports.propertyAssign = propertyAssign;
exports.getParentSize = getParentSize;
exports.pxToNumber = pxToNumber;
exports.getDataIndexColor = getDataIndexColor;
exports.getStatusColor = getStatusColor;
exports.getStatusColorName = getStatusColorName;
exports.isInvalidNumber = isInvalidNumber;
exports.numberDecimal = numberDecimal;
exports.beautifyNumber = beautifyNumber;
exports.noop = noop;
exports.getRawData = getRawData;
exports.filterKey = filterKey;
exports.defaultPadding = defaultPadding;

var _g = require('@antv/g2');

var _g2 = _interopRequireDefault(_g);

var _index = require('../themes/index');

var _index2 = _interopRequireDefault(_index);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _isEqualWith2 = require('lodash/isEqualWith');

var _isEqualWith3 = _interopRequireDefault(_isEqualWith2);

var _merge2 = require('./merge');

var _merge3 = _interopRequireDefault(_merge2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.isEqual = _isEqual3.default;
exports.isEqualWith = _isEqualWith3.default;
exports.merge = _merge3.default;
var requestAnimationFrame = exports.requestAnimationFrame = window && window.requestAnimationFrame || _g2.default.DomUtil.requestAnimationFrame;

var propertyMap = exports.propertyMap = {
  xAxis: ['type', 'alias', 'range', 'ticks', 'tickCount', 'tickInterval', 'formatter', 'min', 'max', 'minLimit', 'maxLimit', 'nice', 'values', 'mask', 'base', 'exponent', 'sync'],
  yAxis: ['type', 'alias', 'range', 'ticks', 'tickCount', 'tickInterval', 'formatter', 'min', 'max', 'minLimit', 'maxLimit', 'nice', 'values', 'mask', 'base', 'exponent', 'sync']
};

var keyType = {
  min: 'number',
  max: 'number',
  minLimit: 'number',
  maxLimit: 'number',
  tickCount: 'number'
};
/**
 * 向目标对象拷贝指定的key的值
 *
 * @param {string[]} keys 判断的key
 * @param {Object} target 目标对象
 * @param {Object} source 源对象
 *
 * @return {Object} 目标对象
 * */
function propertyAssign(keys, target, source) {
  if (!source) {
    return target;
  }
  keys.forEach(function (key) {
    // 仅判断undefined的情况
    if (source[key] !== undefined) {
      // 将部分限制了类型的key属性转换为需要的类型
      if (keyType[key] !== 'number') {
        target[key] = source[key];
      } else if (source[key] === null) {
        // 设置null则直接赋值
        target[key] = null;
      } else if (!isInvalidNumber(source[key])) {
        // 是数字时才赋值，否则直接跳过
        target[key] = Number(source[key]);
      }
      // if (keyType[key] === 'number') {
      //   if (!isInvalidNumber(source[key])) {
      //     target[key] = Number(source[key]);
      //   }
      // } else {
      //   target[key] = source[key];
      // }
    }
  });

  return target;
}

/**
 * 找到对应元素的父元素的大小
 *
 * @param {element} element Html元素
 * @param {number} width props中传递的width属性
 * @param {number} height props中传递的height属性
 *
 * @return {array} 宽和高的数组
 * */
function getParentSize(element, width, height) {
  var w = width || '';
  var h = height || '';

  var parent = element && element.parentElement;

  if (parent) {
    var parentStyle = window.getComputedStyle(parent);
    var paddingTop = pxToNumber(parentStyle.getPropertyValue('padding-top'));
    var paddingRight = pxToNumber(parentStyle.getPropertyValue('padding-right'));
    var paddingBottom = pxToNumber(parentStyle.getPropertyValue('padding-bottom'));
    var paddingLeft = pxToNumber(parentStyle.getPropertyValue('padding-left'));

    if (!width) {
      w = parent.clientWidth - paddingLeft - paddingRight;
    }
    if (!height) {
      h = parent.clientHeight - paddingTop - paddingBottom;
    }
  }
  return [w, h];
}

/**
 * 将像素字符串转为数值
 *
 * @param {string} px 像素字符串
 *
 * @return {number} 数值
 * */
function pxToNumber(px) {
  return Number(px.replace('px', ''));
}

/**
 * 从Highcharts格式数据中找到对应index的颜色
 *
 * @param {array} colors 颜色数组
 * @param {array} rawData Highcharts 格式的数据
 * @param {number} dataIndex y轴对应的index
 * */
function getDataIndexColor(colors, rawData, dataIndex) {
  var colorIndex = null;
  // 找到第一个顺序值和数据中yAxis值匹配的index
  rawData.some(function (d, i) {
    var dataYAxisIndex = d.yAxis || 0;
    if (dataYAxisIndex === dataIndex) {
      colorIndex = i;
      return true;
    }
    return false;
  });

  if (colorIndex !== null) {
    return colors[colorIndex];
  }
}

/**
 * 根据状态获得颜色值
 *
 * @param {string} status 状态字符串
 *
 * @return {string} 颜色值
 * */
function getStatusColor(status) {
  // map 放入函数内，以响应 theme 的动态变化
  var statusMap = {
    error: _index2.default['widgets-color-red'],
    red: _index2.default['widgets-color-red'],

    warning: _index2.default['widgets-color-orange'],
    orange: _index2.default['widgets-color-orange'],

    normal: _index2.default['widgets-color-blue'],
    blue: _index2.default['widgets-color-blue'],

    success: _index2.default['widgets-color-green'],
    green: _index2.default['widgets-color-green'],

    none: _index2.default['widgets-color-gray'],
    gray: _index2.default['widgets-color-gray']
  };

  return statusMap[status] || status || statusMap.normal;
}

var statusColorMap = {
  error: 'red',
  warning: 'orange',
  normal: 'blue',
  success: 'green',
  none: 'gray'
};
/**
 * 根据状态获得颜色名称
 *
 * @param {string} status 状态字符串
 *
 * @return {string} 颜色名称
 * */
function getStatusColorName(status) {
  return statusColorMap[status] || status || statusColorMap.normal;
}

/**
 * 判断是否是有效数字
 *
 * @param v 输入值
 *
 * @return {boolean} 是否有效数字
 * */
function isInvalidNumber(v) {
  return isNaN(v) || !isFinite(v) || v === '' || (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object';
}

/**
 * 数字格式化小数位
 *
 * @param {number} num 输入数字
 * @param {number} decimal 小数位数，默认两位
 *
 * @return {string|number} 如果不是数字，返回横杠字符串。如果是数字，返回设定小数位的字符串。
 * */
function numberDecimal(num) {
  var decimal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  if (isInvalidNumber(num) || isInvalidNumber(decimal)) {
    return '-';
  }

  return Math.round(Number(num) * Math.pow(10, decimal)) / Math.pow(10, decimal);
}

/**
 * 数字格式化千分位
 *
 * @param {number} num 输入数字
 * @param {number} char 分隔符，默认为逗号
 *
 * @return {string|number} 如果不是数字，返回横杠字符串。如果是数字，返回千分位的字符串。
 * */
function beautifyNumber(num) {
  var char = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';

  if (isInvalidNumber(num)) {
    return '-';
  }
  var isNegative = num < 0;
  var numberArr = num.toString().split('.');
  var number = numberArr[0].replace('-', '');
  var result = '';
  while (number.length > 3) {
    result = char + number.slice(-3) + result;
    number = number.slice(0, number.length - 3);
  }
  if (number) {
    result = number + result;
  }
  // fix 保留了小数位数字
  if (numberArr[1]) {
    result = result + '.' + numberArr[1];
  }
  // 处理负数
  if (isNegative) {
    result = '-' + result;
  }
  return result;
}

/**
 * 空函数
 * */
function noop() {}

/**
 * tooltip item 获取原始数据
 *
 * @param {object} config 图表配置项
 * @param {array} rawData 挂载于 this.rawData 上的原始数据
 * @param {number} item tooltip格式化函数的当前数据项
 *
 * @return {object} 寻找得到的原始数据，没有找到则返回空对象。
 * */
function getRawData(config, rawData, item) {
  if (!rawData) {
    return {};
  }

  var originData = item.point && item.point._origin || {};
  if (config.dataType !== 'g2' && Array.isArray(rawData)) {
    rawData.some(function (r) {
      if (r.name === originData.type) {
        // 如果原数据中定义了 facet，需要额外判定 facet 字段
        if (r.facet && originData.facet !== r.facet) {
          return false;
        }
        originData = r;
        return true;
      }
      return false;
    });
  }

  return originData;
}

/**
 * 过滤对象中的key，常用于过滤传递给div的props，防止react invalid attribute warning
 *
 * @param {object} obj 过滤的对象
 * @param {array} keys 过滤的键列表
 *
 * @return {object} 过滤后的结果
 * */
function filterKey(obj, keys) {
  var result = {};
  Object.keys(obj).forEach(function (key) {
    if (keys.indexOf(key) === -1) {
      result[key] = obj[key];
    }
  });
  return result;
}

/**
 * 处理图表库中的默认padding值的通用函数
 *
 * @param {padding} padding 用户配置的padding值
 * @param {object} config 合并了默认配置后的最终配置项
 * 以下参数非必选
 * @param {number} [defaultTop] 默认top padding
 * @param {number} [defaultRight] 默认right padding
 * @param {number} [defaultBottom] 默认bottom padding
 * @param {number} [defaultLeft] 默认left padding
 *
 * @return
 * */
function defaultPadding(padding, config, defaultTop, defaultRight, defaultBottom, defaultLeft) {
  if (padding) {
    return padding;
  }

  // 取默认配置中的padding
  var top = defaultTop;
  var right = defaultRight;
  var bottom = defaultBottom;
  var left = defaultLeft;

  if (right !== 'auto' && Array.isArray(config.yAxis)) {
    right = 45;
  }

  if (top !== 'auto' && (config.legend === false || config.legend && config.legend.visible === false)) {
    top = 16;
  }
  if (config.legend !== false && !(config.legend && config.legend.visible === false)) {
    var _ref = config.legend || {},
        _ref$position = _ref.position,
        position = _ref$position === undefined ? 'top' : _ref$position;

    if (top !== 'auto' && position === 'bottom') {
      top = 10;
    }
    if (position === 'bottom') {
      bottom = 48;
    }
  }

  // X轴标题
  if (config.xAxis && config.xAxis.visible !== false && config.xAxis.alias && bottom !== 'auto') {
    bottom += 14;
  }

  // Y轴标题
  if (Array.isArray(config.yAxis)) {
    config.yAxis.forEach(function (axis, yIndex) {
      if (yIndex === 0 && axis && axis.visible !== false && axis.alias && left !== 'auto') {
        left += 20;
      }
      if (yIndex !== 0 && axis && axis.visible !== false && axis.alias && right !== 'auto') {
        right += 20;
      }
    });
  } else if (config.yAxis && config.yAxis.visible !== false && config.yAxis.alias && left !== 'auto') {
    left += 20;
  }

  return [top, right, bottom, left];
}