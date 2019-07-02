;(function(root, globalName, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD:
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    // Node:
    module.exports = factory()
    // Use module export as simulated ES6 default export:(将模块导出用作模拟ES6默认导出)
    module.exports.default = module.exports
  } else {
    // Browser:
    window[globalName] = factory()
  }
})(this, 'utils', function() {
  return function Utils(host) {
    function dataType(params) {
      if (params === null) {
        return 'Null'
      } else if (params === undefined) {
        return 'Undefined'
      } else {
        return Object.prototype.toString.call(params).slice(8, -1)
      }
    }

    const $isArray = function(params) {
      return dataType(params) == 'Array'
    }
    const $isObject = function(params) {
      return dataType(params) == 'Object'
    }
    const $isString = function(params) {
      return dataType(params) == 'String'
    }
    const $isNumber = function(params) {
      return dataType(params) == 'Number'
    }
    const $isFunction = function(params) {
      return dataType(params) == 'Function'
    }
    const $isNull = function(params) {
      return dataType(params) == 'Null'
    }
    const $isUndefined = function(params) {
      return dataType(params) == 'Undefined'
    }
    const $isEmpty = function(params) {
      if ($isObject(params)) {
        return Object.keys(params).length == 0
      } else if ($isArray(params)) {
        return params.length == 0
      } else if (
        $isNull(params) ||
        $isUndefined(params) ||
        params == '' ||
        params != params
      ) {
        return true
      } else {
        return false
      }
    }

    // 去除对象键值为空的值
    const $filterObj = function filterObj(obj) {
      if ($isObject(obj) || $isArray(obj)) {
        let result
        if ($isObject(obj)) {
          result = {}
        } else {
          result = []
        }
        for (let k in obj) {
          if (!$isEmpty(obj[k])) {
            if ($isObject(obj[k]) || $isArray(obj[k])) {
              result[k] = filterObj(obj[k])
            } else {
              result[k] = obj[k]
            }
          } else {
            continue
          }
        }
        return result
      } else {
        console.error('The incoming value is not an object or array')
        return obj
      }
    }

    let proto
    if (typeof host == 'function') {
      proto = host.prototype
    } else if (typeof host == 'object') {
      proto = host
    }
    proto = Object.assign(proto, {
      $isArray,
      $isObject,
      $isString,
      $isNumber,
      $isFunction,
      $isNull,
      $isUndefined,
      $isEmpty,
      $filterObj
    })
  }
})
