webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueRouter = __webpack_require__(4);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _vueResource = __webpack_require__(5);

	var _vueResource2 = _interopRequireDefault(_vueResource);

	var _toast = __webpack_require__(6);

	var _toast2 = _interopRequireDefault(_toast);

	__webpack_require__(13);

	__webpack_require__(20);

	__webpack_require__(28);

	__webpack_require__(30);

	__webpack_require__(32);

	var _app = __webpack_require__(33);

	var _app2 = _interopRequireDefault(_app);

	var _collapseMenu = __webpack_require__(42);

	var _collapseMenu2 = _interopRequireDefault(_collapseMenu);

	var _auth_interceptor = __webpack_require__(43);

	var _auth_interceptor2 = _interopRequireDefault(_auth_interceptor);

	var _routes = __webpack_require__(44);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.use(_vueResource2.default);
	_vue2.default.use(_vueRouter2.default);
	_vue2.default.use(_toast2.default);

	// Style


	// Js


	// Components


	// Directives

	_vue2.default.directive('menu', _collapseMenu2.default);

	_vue2.default.config.debug = true;
	_vue2.default.config.silent = false;
	_vue2.default.config.devtools = true;
	_vue2.default.http.options.root = '/backend';

	var router = new _vueRouter2.default();
	(0, _routes2.default)(router);

	(0, _auth_interceptor2.default)(_vue2.default);

	router.start(_app2.default, '#app');

	window.router = router;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process, jQuery) {/*!
	 * Vue.js v1.0.26
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	'use strict';

	function set(obj, key, val) {
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      vm._digest();
	    }
	  }
	  return val;
	}

	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */

	function del(obj, key) {
	  if (!hasOwn(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	  if (!ob) {
	    if (obj._isVue) {
	      delete obj._data[key];
	      obj._digest();
	    }
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      vm._digest();
	    }
	  }
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */

	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}

	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;

	function isLiteral(exp) {
	  return literalValueRE.test(exp);
	}

	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */

	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}

	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function _toString(value) {
	  return value == null ? '' : value.toString();
	}

	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */

	function toNumber(value) {
	  if (typeof value !== 'string') {
	    return value;
	  } else {
	    var parsed = Number(value);
	    return isNaN(parsed) ? value : parsed;
	  }
	}

	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */

	function toBoolean(value) {
	  return value === 'true' ? true : value === 'false' ? false : value;
	}

	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */

	function stripQuotes(str) {
	  var a = str.charCodeAt(0);
	  var b = str.charCodeAt(str.length - 1);
	  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	}

	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var camelizeRE = /-(\w)/g;

	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}

	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}

	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var hyphenateRE = /([a-z\d])([A-Z])/g;

	function hyphenate(str) {
	  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	}

	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var classifyRE = /(?:^|[-_\/])(\w)/g;

	function classify(str) {
	  return str.replace(classifyRE, toUpper);
	}

	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */

	function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}

	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */

	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}

	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */

	function extend(to, from) {
	  var keys = Object.keys(from);
	  var i = keys.length;
	  while (i--) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';

	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}

	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var isArray = Array.isArray;

	/**
	 * Define a property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */

	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */

	function _debounce(func, wait) {
	  var timeout, args, context, timestamp, result;
	  var later = function later() {
	    var last = Date.now() - timestamp;
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    }
	  };
	  return function () {
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	    }
	    return result;
	  };
	}

	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */

	function indexOf(arr, obj) {
	  var i = arr.length;
	  while (i--) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	}

	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */

	function cancellable(fn) {
	  var cb = function cb() {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments);
	    }
	  };
	  cb.cancel = function () {
	    cb.cancelled = true;
	  };
	  return cb;
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */

	function looseEqual(a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	  /* eslint-enable eqeqeq */
	}

	var hasProto = ('__proto__' in {});

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	// UA sniffing for working around browser-specific quirks
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && UA.indexOf('trident') > 0;
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIos = UA && /(iphone|ipad|ipod|ios)/i.test(UA);
	var iosVersionMatch = isIos && UA.match(/os ([\d_]+)/);
	var iosVersion = iosVersionMatch && iosVersionMatch[1].split('_');

	// detecting iOS UIWebView by indexedDB
	var hasMutationObserverBug = iosVersion && Number(iosVersion[0]) >= 9 && Number(iosVersion[1]) >= 3 && !window.indexedDB;

	var transitionProp = undefined;
	var transitionEndEvent = undefined;
	var animationProp = undefined;
	var animationEndEvent = undefined;

	// Transition property/event sniffing
	if (inBrowser && !isIE9) {
	  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	}

	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */

	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks = [];
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined' && !hasMutationObserverBug) {
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(counter);
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = counter;
	    };
	  } else {
	    // webpack attempts to inject a shim for setImmediate
	    // if it is used as a global, so we have to work around that to
	    // avoid bundling unnecessary code.
	    var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
	    timerFunc = context.setImmediate || setTimeout;
	  }
	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	})();

	var _Set = undefined;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && Set.toString().match(/native code/)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = function () {
	    this.set = Object.create(null);
	  };
	  _Set.prototype.has = function (key) {
	    return this.set[key] !== undefined;
	  };
	  _Set.prototype.add = function (key) {
	    this.set[key] = 1;
	  };
	  _Set.prototype.clear = function () {
	    this.set = Object.create(null);
	  };
	}

	function Cache(limit) {
	  this.size = 0;
	  this.limit = limit;
	  this.head = this.tail = undefined;
	  this._keymap = Object.create(null);
	}

	var p = Cache.prototype;

	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */

	p.put = function (key, value) {
	  var removed;

	  var entry = this.get(key, true);
	  if (!entry) {
	    if (this.size === this.limit) {
	      removed = this.shift();
	    }
	    entry = {
	      key: key
	    };
	    this._keymap[key] = entry;
	    if (this.tail) {
	      this.tail.newer = entry;
	      entry.older = this.tail;
	    } else {
	      this.head = entry;
	    }
	    this.tail = entry;
	    this.size++;
	  }
	  entry.value = value;

	  return removed;
	};

	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */

	p.shift = function () {
	  var entry = this.head;
	  if (entry) {
	    this.head = this.head.newer;
	    this.head.older = undefined;
	    entry.newer = entry.older = undefined;
	    this._keymap[entry.key] = undefined;
	    this.size--;
	  }
	  return entry;
	};

	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */

	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key];
	  if (entry === undefined) return;
	  if (entry === this.tail) {
	    return returnEntry ? entry : entry.value;
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer;
	    }
	    entry.newer.older = entry.older; // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer; // C. --> E
	  }
	  entry.newer = undefined; // D --x
	  entry.older = this.tail; // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry; // E. <-- D
	  }
	  this.tail = entry;
	  return returnEntry ? entry : entry.value;
	};

	var cache$1 = new Cache(1000);
	var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
	var reservedArgRE = /^in$|^-?\d+/;

	/**
	 * Parser state
	 */

	var str;
	var dir;
	var c;
	var prev;
	var i;
	var l;
	var lastFilterIndex;
	var inSingle;
	var inDouble;
	var curly;
	var square;
	var paren;
	/**
	 * Push a filter to the current directive object
	 */

	function pushFilter() {
	  var exp = str.slice(lastFilterIndex, i).trim();
	  var filter;
	  if (exp) {
	    filter = {};
	    var tokens = exp.match(filterTokenRE);
	    filter.name = tokens[0];
	    if (tokens.length > 1) {
	      filter.args = tokens.slice(1).map(processFilterArg);
	    }
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter);
	  }
	  lastFilterIndex = i + 1;
	}

	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */

	function processFilterArg(arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: toNumber(arg),
	      dynamic: false
	    };
	  } else {
	    var stripped = stripQuotes(arg);
	    var dynamic = stripped === arg;
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    };
	  }
	}

	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} s
	 * @return {Object}
	 */

	function parseDirective(s) {
	  var hit = cache$1.get(s);
	  if (hit) {
	    return hit;
	  }

	  // reset parser state
	  str = s;
	  inSingle = inDouble = false;
	  curly = square = paren = 0;
	  lastFilterIndex = 0;
	  dir = {};

	  for (i = 0, l = str.length; i < l; i++) {
	    prev = c;
	    c = str.charCodeAt(i);
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle;
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble;
	    } else if (c === 0x7C && // pipe
	    str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
	      if (dir.expression == null) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        dir.expression = str.slice(0, i).trim();
	      } else {
	        // already has filter
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22:
	          inDouble = true;break; // "
	        case 0x27:
	          inSingle = true;break; // '
	        case 0x28:
	          paren++;break; // (
	        case 0x29:
	          paren--;break; // )
	        case 0x5B:
	          square++;break; // [
	        case 0x5D:
	          square--;break; // ]
	        case 0x7B:
	          curly++;break; // {
	        case 0x7D:
	          curly--;break; // }
	      }
	    }
	  }

	  if (dir.expression == null) {
	    dir.expression = str.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }

	  cache$1.put(s, dir);
	  return dir;
	}

	var directive = Object.freeze({
	  parseDirective: parseDirective
	});

	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var cache = undefined;
	var tagRE = undefined;
	var htmlRE = undefined;
	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */

	function escapeRegex(str) {
	  return str.replace(regexEscapeRE, '\\$&');
	}

	function compileRegex() {
	  var open = escapeRegex(config.delimiters[0]);
	  var close = escapeRegex(config.delimiters[1]);
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	  tagRE = new RegExp(unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '|' + open + '((?:.|\\n)+?)' + close, 'g');
	  htmlRE = new RegExp('^' + unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '$');
	  // reset cache
	  cache = new Cache(1000);
	}

	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */

	function parseText(text) {
	  if (!cache) {
	    compileRegex();
	  }
	  var hit = cache.get(text);
	  if (hit) {
	    return hit;
	  }
	  if (!tagRE.test(text)) {
	    return null;
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index, html, value, first, oneTime;
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	    /* eslint-enable no-cond-assign */
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      });
	    }
	    // tag token
	    html = htmlRE.test(match[0]);
	    value = html ? match[1] : match[2];
	    first = value.charCodeAt(0);
	    oneTime = first === 42; // *
	    value = oneTime ? value.slice(1) : value;
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    });
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    });
	  }
	  cache.put(text, tokens);
	  return tokens;
	}

	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @param {Vue} [vm]
	 * @return {String}
	 */

	function tokensToExp(tokens, vm) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token, vm);
	    }).join('+');
	  } else {
	    return formatToken(tokens[0], vm, true);
	  }
	}

	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Vue} [vm]
	 * @param {Boolean} [single]
	 * @return {String}
	 */

	function formatToken(token, vm, single) {
	  return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
	}

	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */

	var filterRE = /[^|]\|[^|]/;
	function inlineFilters(exp, single) {
	  if (!filterRE.test(exp)) {
	    return single ? exp : '(' + exp + ')';
	  } else {
	    var dir = parseDirective(exp);
	    if (!dir.filters) {
	      return '(' + exp + ')';
	    } else {
	      return 'this._applyFilters(' + dir.expression + // value
	      ',null,' + // oldValue (null for read)
	      JSON.stringify(dir.filters) + // filter descriptors
	      ',false)'; // write?
	    }
	  }
	}

	var text = Object.freeze({
	  compileRegex: compileRegex,
	  parseText: parseText,
	  tokensToExp: tokensToExp
	});

	var delimiters = ['{{', '}}'];
	var unsafeDelimiters = ['{{{', '}}}'];

	var config = Object.defineProperties({

	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */

	  debug: false,

	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */

	  silent: false,

	  /**
	   * Whether to use async rendering.
	   */

	  async: true,

	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */

	  warnExpressionErrors: true,

	  /**
	   * Whether to allow devtools inspection.
	   * Disabled by default in production builds.
	   */

	  devtools: process.env.NODE_ENV !== 'production',

	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */

	  _delimitersChanged: true,

	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */

	  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],

	  /**
	   * prop binding modes
	   */

	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },

	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */

	  _maxUpdateCount: 100

	}, {
	  delimiters: { /**
	                 * Interpolation delimiters. Changing these would trigger
	                 * the text parser to re-compile the regular expressions.
	                 *
	                 * @type {Array<String>}
	                 */

	    get: function get() {
	      return delimiters;
	    },
	    set: function set(val) {
	      delimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  },
	  unsafeDelimiters: {
	    get: function get() {
	      return unsafeDelimiters;
	    },
	    set: function set(val) {
	      unsafeDelimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  }
	});

	var warn = undefined;
	var formatComponentName = undefined;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';

	    warn = function (msg, vm) {
	      if (hasConsole && !config.silent) {
	        console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''));
	      }
	    };

	    formatComponentName = function (vm) {
	      var name = vm._isVue ? vm.$options.name : vm.name;
	      return name ? ' (found in component: <' + hyphenate(name) + '>)' : '';
	    };
	  })();
	}

	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function appendWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    target.appendChild(el);
	  }, vm, cb);
	}

	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function beforeWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    before(el, target);
	  }, vm, cb);
	}

	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function removeWithTransition(el, vm, cb) {
	  applyTransition(el, -1, function () {
	    remove(el);
	  }, vm, cb);
	}

	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function applyTransition(el, direction, op, vm, cb) {
	  var transition = el.__v_trans;
	  if (!transition ||
	  // skip if there are no js hooks and CSS transition is
	  // not supported
	  !transition.hooks && !transitionEndEvent ||
	  // skip transitions for initial compile
	  !vm._isCompiled ||
	  // if the vm is being manipulated by a parent directive
	  // during the parent's compilation phase, skip the
	  // animation.
	  vm.$parent && !vm.$parent._isCompiled) {
	    op();
	    if (cb) cb();
	    return;
	  }
	  var action = direction > 0 ? 'enter' : 'leave';
	  transition[action](op, cb);
	}

	var transition = Object.freeze({
	  appendWithTransition: appendWithTransition,
	  beforeWithTransition: beforeWithTransition,
	  removeWithTransition: removeWithTransition,
	  applyTransition: applyTransition
	});

	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */

	function query(el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
	    }
	  }
	  return el;
	}

	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function inDoc(node) {
	  if (!node) return false;
	  var doc = node.ownerDocument.documentElement;
	  var parent = node.parentNode;
	  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	}

	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} _attr
	 */

	function getAttr(node, _attr) {
	  var val = node.getAttribute(_attr);
	  if (val !== null) {
	    node.removeAttribute(_attr);
	  }
	  return val;
	}

	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */

	function getBindAttr(node, name) {
	  var val = getAttr(node, ':' + name);
	  if (val === null) {
	    val = getAttr(node, 'v-bind:' + name);
	  }
	  return val;
	}

	/**
	 * Check the presence of a bind attribute.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {Boolean}
	 */

	function hasBindAttr(node, name) {
	  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
	}

	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function before(el, target) {
	  target.parentNode.insertBefore(el, target);
	}

	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function after(el, target) {
	  if (target.nextSibling) {
	    before(el, target.nextSibling);
	  } else {
	    target.parentNode.appendChild(el);
	  }
	}

	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */

	function remove(el) {
	  el.parentNode.removeChild(el);
	}

	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function prepend(el, target) {
	  if (target.firstChild) {
	    before(el, target.firstChild);
	  } else {
	    target.appendChild(el);
	  }
	}

	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */

	function replace(target, el) {
	  var parent = target.parentNode;
	  if (parent) {
	    parent.replaceChild(el, target);
	  }
	}

	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 * @param {Boolean} [useCapture]
	 */

	function on(el, event, cb, useCapture) {
	  el.addEventListener(event, cb, useCapture);
	}

	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	function off(el, event, cb) {
	  el.removeEventListener(event, cb);
	}

	/**
	 * For IE9 compat: when both class and :class are present
	 * getAttribute('class') returns wrong value...
	 *
	 * @param {Element} el
	 * @return {String}
	 */

	function getClass(el) {
	  var classname = el.className;
	  if (typeof classname === 'object') {
	    classname = classname.baseVal || '';
	  }
	  return classname;
	}

	/**
	 * In IE9, setAttribute('class') will result in empty class
	 * if the element also has the :class attribute; However in
	 * PhantomJS, setting `className` does not work on SVG elements...
	 * So we have to do a conditional check here.
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function setClass(el, cls) {
	  /* istanbul ignore if */
	  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
	    el.className = cls;
	  } else {
	    el.setAttribute('class', cls);
	  }
	}

	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function addClass(el, cls) {
	  if (el.classList) {
	    el.classList.add(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      setClass(el, (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function removeClass(el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    setClass(el, cur.trim());
	  }
	  if (!el.className) {
	    el.removeAttribute('class');
	  }
	}

	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element|DocumentFragment}
	 */

	function extractContent(el, asFragment) {
	  var child;
	  var rawContent;
	  /* istanbul ignore if */
	  if (isTemplate(el) && isFragment(el.content)) {
	    el = el.content;
	  }
	  if (el.hasChildNodes()) {
	    trimNode(el);
	    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	      /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child);
	    }
	  }
	  return rawContent;
	}

	/**
	 * Trim possible empty head/tail text and comment
	 * nodes inside a parent.
	 *
	 * @param {Node} node
	 */

	function trimNode(node) {
	  var child;
	  /* eslint-disable no-sequences */
	  while ((child = node.firstChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  while ((child = node.lastChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  /* eslint-enable no-sequences */
	}

	function isTrimmable(node) {
	  return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
	}

	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */

	function isTemplate(el) {
	  return el.tagName && el.tagName.toLowerCase() === 'template';
	}

	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */

	function createAnchor(content, persist) {
	  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	  anchor.__v_anchor = true;
	  return anchor;
	}

	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */

	var refRE = /^v-ref:/;

	function findRef(node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name;
	      if (refRE.test(name)) {
	        return camelize(name.replace(refRE, ''));
	      }
	    }
	  }
	}

	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */

	function mapNodeRange(node, end, op) {
	  var next;
	  while (node !== end) {
	    next = node.nextSibling;
	    op(node);
	    node = next;
	  }
	  op(end);
	}

	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */

	function removeNodeRange(start, end, vm, frag, cb) {
	  var done = false;
	  var removed = 0;
	  var nodes = [];
	  mapNodeRange(start, end, function (node) {
	    if (node === end) done = true;
	    nodes.push(node);
	    removeWithTransition(node, vm, onRemoved);
	  });
	  function onRemoved() {
	    removed++;
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i]);
	      }
	      cb && cb();
	    }
	  }
	}

	/**
	 * Check if a node is a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isFragment(node) {
	  return node && node.nodeType === 11;
	}

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 *
	 * @param {Element} el
	 * @return {String}
	 */

	function getOuterHTML(el) {
	  if (el.outerHTML) {
	    return el.outerHTML;
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML;
	  }
	}

	var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i;
	var reservedTagRE = /^(slot|partial|component)$/i;

	var isUnknownElement = undefined;
	if (process.env.NODE_ENV !== 'production') {
	  isUnknownElement = function (el, tag) {
	    if (tag.indexOf('-') > -1) {
	      // http://stackoverflow.com/a/28210364/1070244
	      return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
	    } else {
	      return (/HTMLUnknownElement/.test(el.toString()) &&
	        // Chrome returns unknown for several HTML5 elements.
	        // https://code.google.com/p/chromium/issues/detail?id=540526
	        // Firefox returns unknown for some "Interactive elements."
	        !/^(data|time|rtc|rb|details|dialog|summary)$/.test(tag)
	      );
	    }
	  };
	}

	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function checkComponentAttr(el, options) {
	  var tag = el.tagName.toLowerCase();
	  var hasAttrs = el.hasAttributes();
	  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
	    if (resolveAsset(options, 'components', tag)) {
	      return { id: tag };
	    } else {
	      var is = hasAttrs && getIsBinding(el, options);
	      if (is) {
	        return is;
	      } else if (process.env.NODE_ENV !== 'production') {
	        var expectedTag = options._componentNameMap && options._componentNameMap[tag];
	        if (expectedTag) {
	          warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
	        } else if (isUnknownElement(el, tag)) {
	          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el, options);
	  }
	}

	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function getIsBinding(el, options) {
	  // dynamic syntax
	  var exp = el.getAttribute('is');
	  if (exp != null) {
	    if (resolveAsset(options, 'components', exp)) {
	      el.removeAttribute('is');
	      return { id: exp };
	    }
	  } else {
	    exp = getBindAttr(el, 'is');
	    if (exp != null) {
	      return { id: exp, dynamic: true };
	    }
	  }
	}

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */

	var strats = config.optionMergeStrategies = Object.create(null);

	/**
	 * Helper that recursively merges two data objects together.
	 */

	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}

	/**
	 * Data
	 */

	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};

	/**
	 * El
	 */

	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};

	/**
	 * Hooks and param attributes are merged as arrays.
	 */

	strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	};

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */

	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */

	strats.watch = strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};

	/**
	 * Other object hashes.
	 */

	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret;
	};

	/**
	 * Default strategy.
	 */

	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};

	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */

	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components = guardArrayAssets(options.components);
	    var ids = Object.keys(components);
	    var def;
	    if (process.env.NODE_ENV !== 'production') {
	      var map = options._componentNameMap = {};
	    }
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i];
	      if (commonTagRE.test(key) || reservedTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      // record a all lowercase <-> kebab-case mapping for
	      // possible custom element case error warning
	      if (process.env.NODE_ENV !== 'production') {
	        map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
	      }
	      def = components[key];
	      if (isPlainObject(def)) {
	        components[key] = Vue.extend(def);
	      }
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */

	function guardProps(options) {
	  var props = options.props;
	  var i, val;
	  if (isArray(props)) {
	    options.props = {};
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        options.props[val] = null;
	      } else if (val.name) {
	        options.props[val.name] = val;
	      }
	    }
	  } else if (isPlainObject(props)) {
	    var keys = Object.keys(props);
	    i = keys.length;
	    while (i--) {
	      val = props[keys[i]];
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val };
	      }
	    }
	  }
	}

	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */

	function guardArrayAssets(assets) {
	  if (isArray(assets)) {
	    var res = {};
	    var i = assets.length;
	    var asset;
	    while (i--) {
	      asset = assets[i];
	      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	      } else {
	        res[id] = asset;
	      }
	    }
	    return res;
	  }
	  return assets;
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */

	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  if (process.env.NODE_ENV !== 'production') {
	    if (child.propsData && !vm) {
	      warn('propsData can only be used as an instantiation option.');
	    }
	  }
	  var options = {};
	  var key;
	  if (child['extends']) {
	    parent = typeof child['extends'] === 'function' ? mergeOptions(parent, child['extends'].options, vm) : mergeOptions(parent, child['extends'], vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i];
	      var mixinOptions = mixin.prototype instanceof Vue ? mixin.options : mixin;
	      parent = mergeOptions(parent, mixinOptions, vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @param {Boolean} warnMissing
	 * @return {Object|Function}
	 */

	function resolveAsset(options, type, id, warnMissing) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return;
	  }
	  var assets = options[type];
	  var camelizedId;
	  var res = assets[id] ||
	  // camelCase ID
	  assets[camelizedId = camelize(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
	    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
	  }
	  return res;
	}

	var uid$1 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	function Dep() {
	  this.id = uid$1++;
	  this.subs = [];
	}

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;

	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};

	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};

	/**
	 * Add self as a dependency to the target watcher.
	 */

	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};

	/**
	 * Notify all subscribers of a new value.
	 */

	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)

	/**
	 * Intercept mutating methods and emit events
	 */

	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});

	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */

	def(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = Number(index) + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});

	/**
	 * Convenience method to remove the element at given index or target element reference.
	 *
	 * @param {*} item
	 */

	def(arrayProto, '$remove', function $remove(item) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  var index = indexOf(this, item);
	  if (index > -1) {
	    return this.splice(index, 1);
	  }
	});

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However in certain cases, e.g.
	 * v-for scope alias and props, we don't want to force conversion
	 * because the value may be a nested value under a frozen data structure.
	 *
	 * So whenever we want to set a reactive property without forcing
	 * conversion on the new value, we wrap that call inside this function.
	 */

	var shouldConvert = true;

	function withoutConversion(fn) {
	  shouldConvert = false;
	  fn();
	  shouldConvert = true;
	}

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */

	function Observer(value) {
	  this.value = value;
	  this.dep = new Dep();
	  def(value, '__ob__', this);
	  if (isArray(value)) {
	    var augment = hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}

	// Instance methods

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */

	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    this.convert(keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */

	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */

	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};

	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};

	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} src
	 */

	function protoAugment(target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */

	function observe(value, vm) {
	  if (!value || typeof value !== 'object') {
	    return;
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (shouldConvert && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}

	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */

	function defineReactive(obj, key, val) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return;
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}



	var util = Object.freeze({
		defineReactive: defineReactive,
		set: set,
		del: del,
		hasOwn: hasOwn,
		isLiteral: isLiteral,
		isReserved: isReserved,
		_toString: _toString,
		toNumber: toNumber,
		toBoolean: toBoolean,
		stripQuotes: stripQuotes,
		camelize: camelize,
		hyphenate: hyphenate,
		classify: classify,
		bind: bind,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		def: def,
		debounce: _debounce,
		indexOf: indexOf,
		cancellable: cancellable,
		looseEqual: looseEqual,
		isArray: isArray,
		hasProto: hasProto,
		inBrowser: inBrowser,
		devtools: devtools,
		isIE: isIE,
		isIE9: isIE9,
		isAndroid: isAndroid,
		isIos: isIos,
		iosVersionMatch: iosVersionMatch,
		iosVersion: iosVersion,
		hasMutationObserverBug: hasMutationObserverBug,
		get transitionProp () { return transitionProp; },
		get transitionEndEvent () { return transitionEndEvent; },
		get animationProp () { return animationProp; },
		get animationEndEvent () { return animationEndEvent; },
		nextTick: nextTick,
		get _Set () { return _Set; },
		query: query,
		inDoc: inDoc,
		getAttr: getAttr,
		getBindAttr: getBindAttr,
		hasBindAttr: hasBindAttr,
		before: before,
		after: after,
		remove: remove,
		prepend: prepend,
		replace: replace,
		on: on,
		off: off,
		setClass: setClass,
		addClass: addClass,
		removeClass: removeClass,
		extractContent: extractContent,
		trimNode: trimNode,
		isTemplate: isTemplate,
		createAnchor: createAnchor,
		findRef: findRef,
		mapNodeRange: mapNodeRange,
		removeNodeRange: removeNodeRange,
		isFragment: isFragment,
		getOuterHTML: getOuterHTML,
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		checkComponentAttr: checkComponentAttr,
		commonTagRE: commonTagRE,
		reservedTagRE: reservedTagRE,
		get warn () { return warn; }
	});

	var uid = 0;

	function initMixin (Vue) {
	  /**
	   * The main init sequence. This is called for every
	   * instance, including ones that are created from extended
	   * constructors.
	   *
	   * @param {Object} options - this options object should be
	   *                           the result of merging class
	   *                           options and the options passed
	   *                           in to the constructor.
	   */

	  Vue.prototype._init = function (options) {
	    options = options || {};

	    this.$el = null;
	    this.$parent = options.parent;
	    this.$root = this.$parent ? this.$parent.$root : this;
	    this.$children = [];
	    this.$refs = {}; // child vm references
	    this.$els = {}; // element references
	    this._watchers = []; // all watchers as an array
	    this._directives = []; // all directives

	    // a uid
	    this._uid = uid++;

	    // a flag to avoid this being observed
	    this._isVue = true;

	    // events bookkeeping
	    this._events = {}; // registered callbacks
	    this._eventsCount = {}; // for $broadcast optimization

	    // fragment instance properties
	    this._isFragment = false;
	    this._fragment = // @type {DocumentFragment}
	    this._fragmentStart = // @type {Text|Comment}
	    this._fragmentEnd = null; // @type {Text|Comment}

	    // lifecycle state
	    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
	    this._unlinkFn = null;

	    // context:
	    // if this is a transcluded component, context
	    // will be the common parent vm of this instance
	    // and its host.
	    this._context = options._context || this.$parent;

	    // scope:
	    // if this is inside an inline v-for, the scope
	    // will be the intermediate scope created for this
	    // repeat fragment. this is used for linking props
	    // and container directives.
	    this._scope = options._scope;

	    // fragment:
	    // if this instance is compiled inside a Fragment, it
	    // needs to reigster itself as a child of that fragment
	    // for attach/detach to work properly.
	    this._frag = options._frag;
	    if (this._frag) {
	      this._frag.children.push(this);
	    }

	    // push self into parent / transclusion host
	    if (this.$parent) {
	      this.$parent.$children.push(this);
	    }

	    // merge options.
	    options = this.$options = mergeOptions(this.constructor.options, options, this);

	    // set ref
	    this._updateRef();

	    // initialize data as empty object.
	    // it will be filled up in _initData().
	    this._data = {};

	    // call init hook
	    this._callHook('init');

	    // initialize data observation and scope inheritance.
	    this._initState();

	    // setup event system and option events.
	    this._initEvents();

	    // call created hook
	    this._callHook('created');

	    // if `el` option is passed, start compilation.
	    if (options.el) {
	      this.$mount(options.el);
	    }
	  };
	}

	var pathCache = new Cache(1000);

	// actions
	var APPEND = 0;
	var PUSH = 1;
	var INC_SUB_PATH_DEPTH = 2;
	var PUSH_SUB_PATH = 3;

	// states
	var BEFORE_PATH = 0;
	var IN_PATH = 1;
	var BEFORE_IDENT = 2;
	var IN_IDENT = 3;
	var IN_SUB_PATH = 4;
	var IN_SINGLE_QUOTE = 5;
	var IN_DOUBLE_QUOTE = 6;
	var AFTER_PATH = 7;
	var ERROR = 8;

	var pathStateMachine = [];

	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	};

	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [IN_SUB_PATH, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	};

	pathStateMachine[IN_SUB_PATH] = {
	  "'": [IN_SINGLE_QUOTE, APPEND],
	  '"': [IN_DOUBLE_QUOTE, APPEND],
	  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	  ']': [IN_PATH, PUSH_SUB_PATH],
	  'eof': ERROR,
	  'else': [IN_SUB_PATH, APPEND]
	};

	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	};

	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	};

	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */

	function getPathCharType(ch) {
	  if (ch === undefined) {
	    return 'eof';
	  }

	  var code = ch.charCodeAt(0);

	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30:
	      // 0
	      return ch;

	    case 0x5F: // _
	    case 0x24:
	      // $
	      return 'ident';

	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0: // No-break space
	    case 0xFEFF: // Byte Order Mark
	    case 0x2028: // Line Separator
	    case 0x2029:
	      // Paragraph Separator
	      return 'ws';
	  }

	  // a-z, A-Z
	  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	    return 'ident';
	  }

	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number';
	  }

	  return 'else';
	}

	/**
	 * Format a subPath, return its plain form if it is
	 * a literal string or number. Otherwise prepend the
	 * dynamic indicator (*).
	 *
	 * @param {String} path
	 * @return {String}
	 */

	function formatSubPath(path) {
	  var trimmed = path.trim();
	  // invalid leading 0
	  if (path.charAt(0) === '0' && isNaN(path)) {
	    return false;
	  }
	  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	}

	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parse(path) {
	  var keys = [];
	  var index = -1;
	  var mode = BEFORE_PATH;
	  var subPathDepth = 0;
	  var c, newChar, key, type, transition, action, typeMap;

	  var actions = [];

	  actions[PUSH] = function () {
	    if (key !== undefined) {
	      keys.push(key);
	      key = undefined;
	    }
	  };

	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar;
	    } else {
	      key += newChar;
	    }
	  };

	  actions[INC_SUB_PATH_DEPTH] = function () {
	    actions[APPEND]();
	    subPathDepth++;
	  };

	  actions[PUSH_SUB_PATH] = function () {
	    if (subPathDepth > 0) {
	      subPathDepth--;
	      mode = IN_SUB_PATH;
	      actions[APPEND]();
	    } else {
	      subPathDepth = 0;
	      key = formatSubPath(key);
	      if (key === false) {
	        return false;
	      } else {
	        actions[PUSH]();
	      }
	    }
	  };

	  function maybeUnescapeQuote() {
	    var nextChar = path[index + 1];
	    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	      index++;
	      newChar = '\\' + nextChar;
	      actions[APPEND]();
	      return true;
	    }
	  }

	  while (mode != null) {
	    index++;
	    c = path[index];

	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue;
	    }

	    type = getPathCharType(c);
	    typeMap = pathStateMachine[mode];
	    transition = typeMap[type] || typeMap['else'] || ERROR;

	    if (transition === ERROR) {
	      return; // parse error
	    }

	    mode = transition[0];
	    action = actions[transition[1]];
	    if (action) {
	      newChar = transition[2];
	      newChar = newChar === undefined ? c : newChar;
	      if (action() === false) {
	        return;
	      }
	    }

	    if (mode === AFTER_PATH) {
	      keys.raw = path;
	      return keys;
	    }
	  }
	}

	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parsePath(path) {
	  var hit = pathCache.get(path);
	  if (!hit) {
	    hit = parse(path);
	    if (hit) {
	      pathCache.put(path, hit);
	    }
	  }
	  return hit;
	}

	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */

	function getPath(obj, path) {
	  return parseExpression(path).get(obj);
	}

	/**
	 * Warn against setting non-existent root path on a vm.
	 */

	var warnNonExistent;
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path, vm) {
	    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.', vm);
	  };
	}

	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */

	function setPath(obj, path, val) {
	  var original = obj;
	  if (typeof path === 'string') {
	    path = parse(path);
	  }
	  if (!path || !isObject(obj)) {
	    return false;
	  }
	  var last, key;
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj;
	    key = path[i];
	    if (key.charAt(0) === '*') {
	      key = parseExpression(key.slice(1)).get.call(original, original);
	    }
	    if (i < l - 1) {
	      obj = obj[key];
	      if (!isObject(obj)) {
	        obj = {};
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path, last);
	        }
	        set(last, key, obj);
	      }
	    } else {
	      if (isArray(obj)) {
	        obj.$set(key, val);
	      } else if (key in obj) {
	        obj[key] = val;
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path, obj);
	        }
	        set(obj, key, val);
	      }
	    }
	  }
	  return true;
	}

	var path = Object.freeze({
	  parsePath: parsePath,
	  getPath: getPath,
	  setPath: setPath
	});

	var expressionCache = new Cache(1000);

	var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');

	// keywords that don't make sense inside expressions
	var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'protected,static,interface,private,public';
	var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');

	var wsRE = /\s/g;
	var newlineRE = /\n/g;
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
	var restoreRE = /"(\d+)"/g;
	var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
	var literalValueRE$1 = /^(?:true|false|null|undefined|Infinity|NaN)$/;

	function noop() {}

	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */

	var saved = [];

	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */

	function save(str, isString) {
	  var i = saved.length;
	  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	  return '"' + i + '"';
	}

	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */

	function rewrite(raw) {
	  var c = raw.charAt(0);
	  var path = raw.slice(1);
	  if (allowedKeywordsRE.test(path)) {
	    return raw;
	  } else {
	    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	    return c + 'scope.' + path;
	  }
	}

	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */

	function restore(str, i) {
	  return saved[i];
	}

	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */

	function compileGetter(exp) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	  }
	  // reset state
	  saved.length = 0;
	  // save strings and object literal keys
	  var body = exp.replace(saveRE, save).replace(wsRE, '');
	  // rewrite all paths
	  // pad 1 space here because the regex matches 1 extra char
	  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
	  return makeGetterFn(body);
	}

	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeGetterFn(body) {
	  try {
	    /* eslint-disable no-new-func */
	    return new Function('scope', 'return ' + body + ';');
	    /* eslint-enable no-new-func */
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production') {
	      /* istanbul ignore if */
	      if (e.toString().match(/unsafe-eval|CSP/)) {
	        warn('It seems you are using the default build of Vue.js in an environment ' + 'with Content Security Policy that prohibits unsafe-eval. ' + 'Use the CSP-compliant build instead: ' + 'http://vuejs.org/guide/installation.html#CSP-compliant-build');
	      } else {
	        warn('Invalid expression. ' + 'Generated function body: ' + body);
	      }
	    }
	    return noop;
	  }
	}

	/**
	 * Compile a setter function for the expression.
	 *
	 * @param {String} exp
	 * @return {Function|undefined}
	 */

	function compileSetter(exp) {
	  var path = parsePath(exp);
	  if (path) {
	    return function (scope, val) {
	      setPath(scope, path, val);
	    };
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
	  }
	}

	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	function parseExpression(exp, needSet) {
	  exp = exp.trim();
	  // try cache
	  var hit = expressionCache.get(exp);
	  if (hit) {
	    if (needSet && !hit.set) {
	      hit.set = compileSetter(hit.exp);
	    }
	    return hit;
	  }
	  var res = { exp: exp };
	  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	  // optimized super simple getter
	  ? makeGetterFn('scope.' + exp)
	  // dynamic getter
	  : compileGetter(exp);
	  if (needSet) {
	    res.set = compileSetter(exp);
	  }
	  expressionCache.put(exp, res);
	  return res;
	}

	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	function isSimplePath(exp) {
	  return pathTestRE.test(exp) &&
	  // don't treat literal values as paths
	  !literalValueRE$1.test(exp) &&
	  // Math constants e.g. Math.PI, Math.E etc.
	  exp.slice(0, 5) !== 'Math.';
	}

	var expression = Object.freeze({
	  parseExpression: parseExpression,
	  isSimplePath: isSimplePath
	});

	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.

	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;

	/**
	 * Reset the batcher's state.
	 */

	function resetBatcherState() {
	  queue.length = 0;
	  userQueue.length = 0;
	  has = {};
	  circular = {};
	  waiting = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */

	function flushBatcherQueue() {
	  var _again = true;

	  _function: while (_again) {
	    _again = false;

	    runBatcherQueue(queue);
	    runBatcherQueue(userQueue);
	    // user watchers triggered more watchers,
	    // keep flushing until it depletes
	    if (queue.length) {
	      _again = true;
	      continue _function;
	    }
	    // dev tool hook
	    /* istanbul ignore if */
	    if (devtools && config.devtools) {
	      devtools.emit('flush');
	    }
	    resetBatcherState();
	  }
	}

	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */

	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (var i = 0; i < queue.length; i++) {
	    var watcher = queue[i];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn('You may have an infinite update loop for watcher ' + 'with expression "' + watcher.expression + '"', watcher.vm);
	        break;
	      }
	    }
	  }
	  queue.length = 0;
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */

	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    // push watcher into appropriate queue
	    var q = watcher.user ? userQueue : queue;
	    has[id] = q.length;
	    q.push(watcher);
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushBatcherQueue);
	    }
	  }
	}

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String|Function} expOrFn
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    extend(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = expOrFn;
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.prevError = null; // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn;
	    this.setter = undefined;
	  } else {
	    var res = parseExpression(expOrFn, this.twoWay);
	    this.getter = res.get;
	    this.setter = res.set;
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */

	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var scope = this.scope || this.vm;
	  var value;
	  try {
	    value = this.getter.call(scope, scope);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating expression ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false);
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value);
	  }
	  this.afterGet();
	  return value;
	};

	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */

	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm;
	  if (this.filters) {
	    value = scope._applyFilters(value, this.value, this.filters, true);
	  }
	  try {
	    this.setter.call(scope, scope, value);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating setter ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext;
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.', this.vm);
	      return;
	    }
	    forContext._withLock(function () {
	      if (scope.$key) {
	        // original is an object
	        forContext.rawValue[scope.$key] = value;
	      } else {
	        forContext.rawValue.$set(scope.$index, value);
	      }
	    });
	  }
	};

	/**
	 * Prepare for dependency collection.
	 */

	Watcher.prototype.beforeGet = function () {
	  Dep.target = this;
	};

	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */

	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */

	Watcher.prototype.afterGet = function () {
	  Dep.target = null;
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this.deps[i];
	    if (!this.newDepIds.has(dep.id)) {
	      dep.removeSub(this);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */

	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync || !config.async) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace');
	    }
	    pushWatcher(this);
	  }
	};

	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */

	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    (isObject(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError;
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
	        this.prevError = null;
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          nextTick(function () {
	            throw prevError;
	          }, 0);
	          throw e;
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	    this.queued = this.shallow = false;
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */

	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target;
	  this.value = this.get();
	  this.dirty = false;
	  Dep.target = current;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */

	Watcher.prototype.depend = function () {
	  var i = this.deps.length;
	  while (i--) {
	    this.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subcriber list.
	 */

	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      this.vm._watchers.$remove(this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};

	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */

	var seenObjects = new _Set();
	function traverse(val, seen) {
	  var i = undefined,
	      keys = undefined;
	  if (!seen) {
	    seen = seenObjects;
	    seen.clear();
	  }
	  var isA = isArray(val);
	  var isO = isObject(val);
	  if ((isA || isO) && Object.isExtensible(val)) {
	    if (val.__ob__) {
	      var depId = val.__ob__.dep.id;
	      if (seen.has(depId)) {
	        return;
	      } else {
	        seen.add(depId);
	      }
	    }
	    if (isA) {
	      i = val.length;
	      while (i--) traverse(val[i], seen);
	    } else if (isO) {
	      keys = Object.keys(val);
	      i = keys.length;
	      while (i--) traverse(val[keys[i]], seen);
	    }
	  }
	}

	var text$1 = {

	  bind: function bind() {
	    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	  },

	  update: function update(value) {
	    this.el[this.attr] = _toString(value);
	  }
	};

	var templateCache = new Cache(1000);
	var idSelectorCache = new Cache(1000);

	var map = {
	  efault: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	};

	map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

	map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

	map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];

	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isRealTemplate(node) {
	  return isTemplate(node) && isFragment(node.content);
	}

	var tagRE$1 = /<([\w:-]+)/;
	var entityRE = /&#?\w+?;/;
	var commentRE = /<!--/;

	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @param {Boolean} raw
	 * @return {DocumentFragment}
	 */

	function stringToFragment(templateString, raw) {
	  // try a cache hit first
	  var cacheKey = raw ? templateString : templateString.trim();
	  var hit = templateCache.get(cacheKey);
	  if (hit) {
	    return hit;
	  }

	  var frag = document.createDocumentFragment();
	  var tagMatch = templateString.match(tagRE$1);
	  var entityMatch = entityRE.test(templateString);
	  var commentMatch = commentRE.test(templateString);

	  if (!tagMatch && !entityMatch && !commentMatch) {
	    // text only, return a single text node.
	    frag.appendChild(document.createTextNode(templateString));
	  } else {
	    var tag = tagMatch && tagMatch[1];
	    var wrap = map[tag] || map.efault;
	    var depth = wrap[0];
	    var prefix = wrap[1];
	    var suffix = wrap[2];
	    var node = document.createElement('div');

	    node.innerHTML = prefix + templateString + suffix;
	    while (depth--) {
	      node = node.lastChild;
	    }

	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	  }
	  if (!raw) {
	    trimNode(frag);
	  }
	  templateCache.put(cacheKey, frag);
	  return frag;
	}

	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */

	function nodeToFragment(node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment. However, iOS Safari has
	  // bug when using directly cloned template content with touch
	  // events and can cause crashes when the nodes are removed from DOM, so we
	  // have to treat template elements as string templates. (#2805)
	  /* istanbul ignore if */
	  if (isRealTemplate(node)) {
	    return stringToFragment(node.innerHTML);
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent);
	  }
	  // normal node, clone it to avoid mutating the original
	  var clonedNode = cloneNode(node);
	  var frag = document.createDocumentFragment();
	  var child;
	  /* eslint-disable no-cond-assign */
	  while (child = clonedNode.firstChild) {
	    /* eslint-enable no-cond-assign */
	    frag.appendChild(child);
	  }
	  trimNode(frag);
	  return frag;
	}

	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/showug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var a = document.createElement('div');
	    a.innerHTML = '<template>1</template>';
	    return !a.cloneNode(true).firstChild.innerHTML;
	  } else {
	    return false;
	  }
	})();

	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var t = document.createElement('textarea');
	    t.placeholder = 't';
	    return t.cloneNode(true).value === 't';
	  } else {
	    return false;
	  }
	})();

	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */

	function cloneNode(node) {
	  /* istanbul ignore if */
	  if (!node.querySelectorAll) {
	    return node.cloneNode();
	  }
	  var res = node.cloneNode(true);
	  var i, original, cloned;
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var tempClone = res;
	    if (isRealTemplate(node)) {
	      node = node.content;
	      tempClone = res.content;
	    }
	    original = node.querySelectorAll('template');
	    if (original.length) {
	      cloned = tempClone.querySelectorAll('template');
	      i = cloned.length;
	      while (i--) {
	        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value;
	    } else {
	      original = node.querySelectorAll('textarea');
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].value = original[i].value;
	        }
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *        Possible values include:
	 *        - DocumentFragment object
	 *        - Node object of type Template
	 *        - id selector: '#some-template-id'
	 *        - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} shouldClone
	 * @param {Boolean} raw
	 *        inline HTML interpolation. Do not check for id
	 *        selector and keep whitespace in the string.
	 * @return {DocumentFragment|undefined}
	 */

	function parseTemplate(template, shouldClone, raw) {
	  var node, frag;

	  // if the template is already a document fragment,
	  // do nothing
	  if (isFragment(template)) {
	    trimNode(template);
	    return shouldClone ? cloneNode(template) : template;
	  }

	  if (typeof template === 'string') {
	    // id selector
	    if (!raw && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template);
	      if (!frag) {
	        node = document.getElementById(template.slice(1));
	        if (node) {
	          frag = nodeToFragment(node);
	          // save selector to cache
	          idSelectorCache.put(template, frag);
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template, raw);
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template);
	  }

	  return frag && shouldClone ? cloneNode(frag) : frag;
	}

	var template = Object.freeze({
	  cloneNode: cloneNode,
	  parseTemplate: parseTemplate
	});

	var html = {

	  bind: function bind() {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = [];
	      // replace the placeholder with proper anchor
	      this.anchor = createAnchor('v-html');
	      replace(this.el, this.anchor);
	    }
	  },

	  update: function update(value) {
	    value = _toString(value);
	    if (this.nodes) {
	      this.swap(value);
	    } else {
	      this.el.innerHTML = value;
	    }
	  },

	  swap: function swap(value) {
	    // remove old nodes
	    var i = this.nodes.length;
	    while (i--) {
	      remove(this.nodes[i]);
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = parseTemplate(value, true, true);
	    // save a reference to these nodes so we can remove later
	    this.nodes = toArray(frag.childNodes);
	    before(frag, this.anchor);
	  }
	};

	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 * @param {Fragment} [parentFrag]
	 */
	function Fragment(linker, vm, frag, host, scope, parentFrag) {
	  this.children = [];
	  this.childFrags = [];
	  this.vm = vm;
	  this.scope = scope;
	  this.inserted = false;
	  this.parentFrag = parentFrag;
	  if (parentFrag) {
	    parentFrag.childFrags.push(this);
	  }
	  this.unlink = linker(vm, frag, host, scope, this);
	  var single = this.single = frag.childNodes.length === 1 &&
	  // do not go single mode if the only node is an anchor
	  !frag.childNodes[0].__v_anchor;
	  if (single) {
	    this.node = frag.childNodes[0];
	    this.before = singleBefore;
	    this.remove = singleRemove;
	  } else {
	    this.node = createAnchor('fragment-start');
	    this.end = createAnchor('fragment-end');
	    this.frag = frag;
	    prepend(this.node, frag);
	    frag.appendChild(this.end);
	    this.before = multiBefore;
	    this.remove = multiRemove;
	  }
	  this.node.__v_frag = this;
	}

	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */

	Fragment.prototype.callHook = function (hook) {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i]);
	  }
	};

	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function singleBefore(target, withTransition) {
	  this.inserted = true;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  method(this.node, target, this.vm);
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, single node version
	 */

	function singleRemove() {
	  this.inserted = false;
	  var shouldCallRemove = inDoc(this.node);
	  var self = this;
	  this.beforeRemove();
	  removeWithTransition(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function multiBefore(target, withTransition) {
	  this.inserted = true;
	  var vm = this.vm;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm);
	  });
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, multi-nodes version
	 */

	function multiRemove() {
	  this.inserted = false;
	  var self = this;
	  var shouldCallRemove = inDoc(this.node);
	  this.beforeRemove();
	  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Prepare the fragment for removal.
	 */

	Fragment.prototype.beforeRemove = function () {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    // call the same method recursively on child
	    // fragments, depth-first
	    this.childFrags[i].beforeRemove(false);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    // Call destroy for all contained instances,
	    // with remove:false and defer:true.
	    // Defer is necessary because we need to
	    // keep the children to call detach hooks
	    // on them.
	    this.children[i].$destroy(false, true);
	  }
	  var dirs = this.unlink.dirs;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    // disable the watchers on all the directives
	    // so that the rendered content stays the same
	    // during removal.
	    dirs[i]._watcher && dirs[i]._watcher.teardown();
	  }
	};

	/**
	 * Destroy the fragment.
	 */

	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this);
	  }
	  this.node.__v_frag = null;
	  this.unlink();
	};

	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function attach(child) {
	  if (!child._isAttached && inDoc(child.$el)) {
	    child._callHook('attached');
	  }
	}

	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function detach(child) {
	  if (child._isAttached && !inDoc(child.$el)) {
	    child._callHook('detached');
	  }
	}

	var linkerCache = new Cache(5000);

	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */
	function FragmentFactory(vm, el) {
	  this.vm = vm;
	  var template;
	  var isString = typeof el === 'string';
	  if (isString || isTemplate(el) && !el.hasAttribute('v-if')) {
	    template = parseTemplate(el, true);
	  } else {
	    template = document.createDocumentFragment();
	    template.appendChild(el);
	  }
	  this.template = template;
	  // linker can be cached, but only for components
	  var linker;
	  var cid = vm.constructor.cid;
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : getOuterHTML(el));
	    linker = linkerCache.get(cacheId);
	    if (!linker) {
	      linker = compile(template, vm.$options, true);
	      linkerCache.put(cacheId, linker);
	    }
	  } else {
	    linker = compile(template, vm.$options, true);
	  }
	  this.linker = linker;
	}

	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */

	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = cloneNode(this.template);
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	};

	var ON = 700;
	var MODEL = 800;
	var BIND = 850;
	var TRANSITION = 1100;
	var EL = 1500;
	var COMPONENT = 1500;
	var PARTIAL = 1750;
	var IF = 2100;
	var FOR = 2200;
	var SLOT = 2300;

	var uid$3 = 0;

	var vFor = {

	  priority: FOR,
	  terminal: true,

	  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],

	  bind: function bind() {
	    // support "item in/of items" syntax
	    var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	      if (itMatch) {
	        this.iterator = itMatch[1].trim();
	        this.alias = itMatch[2].trim();
	      } else {
	        this.alias = inMatch[1].trim();
	      }
	      this.expression = inMatch[2];
	    }

	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid v-for expression "' + this.descriptor.raw + '": ' + 'alias is required.', this.vm);
	      return;
	    }

	    // uid as a cache identifier
	    this.id = '__v-for__' + ++uid$3;

	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName;
	    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';

	    // setup anchor nodes
	    this.start = createAnchor('v-for-start');
	    this.end = createAnchor('v-for-end');
	    replace(this.el, this.end);
	    before(this.start, this.end);

	    // cache
	    this.cache = Object.create(null);

	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el);
	  },

	  update: function update(data) {
	    this.diff(data);
	    this.updateRef();
	    this.updateModel();
	  },

	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */

	  diff: function diff(data) {
	    // check if the Array was converted from an Object
	    var item = data[0];
	    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');

	    var trackByKey = this.params.trackBy;
	    var oldFrags = this.frags;
	    var frags = this.frags = new Array(data.length);
	    var alias = this.alias;
	    var iterator = this.iterator;
	    var start = this.start;
	    var end = this.end;
	    var inDocument = inDoc(start);
	    var init = !oldFrags;
	    var i, l, frag, key, value, primitive;

	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i];
	      key = convertedFromObject ? item.$key : null;
	      value = convertedFromObject ? item.$value : item;
	      primitive = !isObject(value);
	      frag = !init && this.getCachedFrag(value, i, key);
	      if (frag) {
	        // reusable fragment
	        frag.reused = true;
	        // update $index
	        frag.scope.$index = i;
	        // update $key
	        if (key) {
	          frag.scope.$key = key;
	        }
	        // update iterator
	        if (iterator) {
	          frag.scope[iterator] = key !== null ? key : i;
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          withoutConversion(function () {
	            frag.scope[alias] = value;
	          });
	        }
	      } else {
	        // new isntance
	        frag = this.create(value, alias, i, key);
	        frag.fresh = !init;
	      }
	      frags[i] = frag;
	      if (init) {
	        frag.before(end);
	      }
	    }

	    // we're done for the initial render.
	    if (init) {
	      return;
	    }

	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0;
	    var totalRemoved = oldFrags.length - frags.length;
	    // when removing a large number of fragments, watcher removal
	    // turns out to be a perf bottleneck, so we batch the watcher
	    // removals into a single filter call!
	    this.vm._vForRemoving = true;
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i];
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag);
	        this.remove(frag, removalIndex++, totalRemoved, inDocument);
	      }
	    }
	    this.vm._vForRemoving = false;
	    if (removalIndex) {
	      this.vm._watchers = this.vm._watchers.filter(function (w) {
	        return w.active;
	      });
	    }

	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev;
	    var insertionIndex = 0;
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i];
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1];
	      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id);
	        if (currentPrev !== targetPrev && (!currentPrev ||
	        // optimization for moving a single item.
	        // thanks to suggestions by @livoras in #1807
	        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	          this.move(frag, prevEl);
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDocument);
	      }
	      frag.reused = frag.fresh = false;
	    }
	  },

	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */

	  create: function create(value, alias, index, key) {
	    var host = this._host;
	    // create iteration scope
	    var parentScope = this._scope || this.vm;
	    var scope = Object.create(parentScope);
	    // ref holder for the scope
	    scope.$refs = Object.create(parentScope.$refs);
	    scope.$els = Object.create(parentScope.$els);
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope;
	    // for two-way binding on alias
	    scope.$forContext = this;
	    // define scope properties
	    // important: define the scope alias without forced conversion
	    // so that frozen data structures remain non-reactive.
	    withoutConversion(function () {
	      defineReactive(scope, alias, value);
	    });
	    defineReactive(scope, '$index', index);
	    if (key) {
	      defineReactive(scope, '$key', key);
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      def(scope, '$key', null);
	    }
	    if (this.iterator) {
	      defineReactive(scope, this.iterator, key !== null ? key : index);
	    }
	    var frag = this.factory.create(host, scope, this._frag);
	    frag.forId = this.id;
	    this.cacheFrag(value, frag, index, key);
	    return frag;
	  },

	  /**
	   * Update the v-ref on owner vm.
	   */

	  updateRef: function updateRef() {
	    var ref = this.descriptor.ref;
	    if (!ref) return;
	    var hash = (this._scope || this.vm).$refs;
	    var refs;
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag);
	    } else {
	      refs = {};
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag);
	      });
	    }
	    hash[ref] = refs;
	  },

	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */

	  updateModel: function updateModel() {
	    if (this.isOption) {
	      var parent = this.start.parentNode;
	      var model = parent && parent.__v_model;
	      if (model) {
	        model.forceUpdate();
	      }
	    }
	  },

	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDocument
	   */

	  insert: function insert(frag, index, prevEl, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter');
	    if (inDocument && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor;
	      if (!anchor) {
	        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	        anchor.__v_frag = frag;
	      }
	      after(anchor, prevEl);
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.before(anchor);
	        remove(anchor);
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      var target = prevEl.nextSibling;
	      /* istanbul ignore if */
	      if (!target) {
	        // reset end anchor position in case the position was messed up
	        // by an external drag-n-drop library.
	        after(this.end, prevEl);
	        target = this.end;
	      }
	      frag.before(target);
	    }
	  },

	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDocument
	   */

	  remove: function remove(frag, index, total, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return;
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave');
	    if (inDocument && staggerAmount) {
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.remove();
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.remove();
	    }
	  },

	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */

	  move: function move(frag, prevEl) {
	    // fix a common issue with Sortable:
	    // if prevEl doesn't have nextSibling, this means it's
	    // been dragged after the end anchor. Just re-position
	    // the end anchor to the end of the container.
	    /* istanbul ignore if */
	    if (!prevEl.nextSibling) {
	      this.end.parentNode.appendChild(this.end);
	    }
	    frag.before(prevEl.nextSibling, false);
	  },

	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */

	  cacheFrag: function cacheFrag(value, frag, index, key) {
	    var trackByKey = this.params.trackBy;
	    var cache = this.cache;
	    var primitive = !isObject(value);
	    var id;
	    if (key || trackByKey || primitive) {
	      id = getTrackByKey(index, key, value, trackByKey);
	      if (!cache[id]) {
	        cache[id] = frag;
	      } else if (trackByKey !== '$index') {
	        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	      }
	    } else {
	      id = this.id;
	      if (hasOwn(value, id)) {
	        if (value[id] === null) {
	          value[id] = frag;
	        } else {
	          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	        }
	      } else if (Object.isExtensible(value)) {
	        def(value, id, frag);
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('Frozen v-for objects cannot be automatically tracked, make sure to ' + 'provide a track-by key.');
	      }
	    }
	    frag.raw = value;
	  },

	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */

	  getCachedFrag: function getCachedFrag(value, index, key) {
	    var trackByKey = this.params.trackBy;
	    var primitive = !isObject(value);
	    var frag;
	    if (key || trackByKey || primitive) {
	      var id = getTrackByKey(index, key, value, trackByKey);
	      frag = this.cache[id];
	    } else {
	      frag = value[this.id];
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	    }
	    return frag;
	  },

	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */

	  deleteCachedFrag: function deleteCachedFrag(frag) {
	    var value = frag.raw;
	    var trackByKey = this.params.trackBy;
	    var scope = frag.scope;
	    var index = scope.$index;
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = hasOwn(scope, '$key') && scope.$key;
	    var primitive = !isObject(value);
	    if (trackByKey || key || primitive) {
	      var id = getTrackByKey(index, key, value, trackByKey);
	      this.cache[id] = null;
	    } else {
	      value[this.id] = null;
	      frag.raw = null;
	    }
	  },

	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */

	  getStagger: function getStagger(frag, index, total, type) {
	    type = type + 'Stagger';
	    var trans = frag.node.__v_trans;
	    var hooks = trans && trans.hooks;
	    var hook = hooks && (hooks[type] || hooks.stagger);
	    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	  },

	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */

	  _preProcess: function _preProcess(value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value;
	    return value;
	  },

	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * watcher's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */

	  _postProcess: function _postProcess(value) {
	    if (isArray(value)) {
	      return value;
	    } else if (isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value);
	      var i = keys.length;
	      var res = new Array(i);
	      var key;
	      while (i--) {
	        key = keys[i];
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        };
	      }
	      return res;
	    } else {
	      if (typeof value === 'number' && !isNaN(value)) {
	        value = range(value);
	      }
	      return value || [];
	    }
	  },

	  unbind: function unbind() {
	    if (this.descriptor.ref) {
	      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	    }
	    if (this.frags) {
	      var i = this.frags.length;
	      var frag;
	      while (i--) {
	        frag = this.frags[i];
	        this.deleteCachedFrag(frag);
	        frag.destroy();
	      }
	    }
	  }
	};

	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */

	function findPrevFrag(frag, anchor, id) {
	  var el = frag.node.previousSibling;
	  /* istanbul ignore if */
	  if (!el) return;
	  frag = el.__v_frag;
	  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	    el = el.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__v_frag;
	  }
	  return frag;
	}

	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */

	function findVmFromFrag(frag) {
	  var node = frag.node;
	  // handle multi-node frag
	  if (frag.end) {
	    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	      node = node.nextSibling;
	    }
	  }
	  return node.__vue__;
	}

	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */

	function range(n) {
	  var i = -1;
	  var ret = new Array(Math.floor(n));
	  while (++i < n) {
	    ret[i] = i;
	  }
	  return ret;
	}

	/**
	 * Get the track by key for an item.
	 *
	 * @param {Number} index
	 * @param {String} key
	 * @param {*} value
	 * @param {String} [trackByKey]
	 */

	function getTrackByKey(index, key, value, trackByKey) {
	  return trackByKey ? trackByKey === '$index' ? index : trackByKey.charAt(0).match(/\w/) ? getPath(value, trackByKey) : value[trackByKey] : key || value;
	}

	if (process.env.NODE_ENV !== 'production') {
	  vFor.warnDuplicate = function (value) {
	    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.', this.vm);
	  };
	}

	var vIf = {

	  priority: IF,
	  terminal: true,

	  bind: function bind() {
	    var el = this.el;
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        remove(next);
	        this.elseEl = next;
	      }
	      // check main block
	      this.anchor = createAnchor('v-if');
	      replace(el, this.anchor);
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.', this.vm);
	      this.invalid = true;
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) return;
	    if (value) {
	      if (!this.frag) {
	        this.insert();
	      }
	    } else {
	      this.remove();
	    }
	  },

	  insert: function insert() {
	    if (this.elseFrag) {
	      this.elseFrag.remove();
	      this.elseFrag = null;
	    }
	    // lazy init factory
	    if (!this.factory) {
	      this.factory = new FragmentFactory(this.vm, this.el);
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag);
	    this.frag.before(this.anchor);
	  },

	  remove: function remove() {
	    if (this.frag) {
	      this.frag.remove();
	      this.frag = null;
	    }
	    if (this.elseEl && !this.elseFrag) {
	      if (!this.elseFactory) {
	        this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
	      }
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	      this.elseFrag.before(this.anchor);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	    if (this.elseFrag) {
	      this.elseFrag.destroy();
	    }
	  }
	};

	var show = {

	  bind: function bind() {
	    // check else block
	    var next = this.el.nextElementSibling;
	    if (next && getAttr(next, 'v-else') !== null) {
	      this.elseEl = next;
	    }
	  },

	  update: function update(value) {
	    this.apply(this.el, value);
	    if (this.elseEl) {
	      this.apply(this.elseEl, !value);
	    }
	  },

	  apply: function apply(el, value) {
	    if (inDoc(el)) {
	      applyTransition(el, value ? 1 : -1, toggle, this.vm);
	    } else {
	      toggle();
	    }
	    function toggle() {
	      el.style.display = value ? '' : 'none';
	    }
	  }
	};

	var text$2 = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	    var isRange = el.type === 'range';
	    var lazy = this.params.lazy;
	    var number = this.params.number;
	    var debounce = this.params.debounce;

	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false;
	    if (!isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true;
	      });
	      this.on('compositionend', function () {
	        composing = false;
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener();
	        }
	      });
	    }

	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false;
	    if (!isRange && !lazy) {
	      this.on('focus', function () {
	        self.focused = true;
	      });
	      this.on('blur', function () {
	        self.focused = false;
	        // do not sync value after fragment removal (#2017)
	        if (!self._frag || self._frag.inserted) {
	          self.rawListener();
	        }
	      });
	    }

	    // Now attach the main listener
	    this.listener = this.rawListener = function () {
	      if (composing || !self._bound) {
	        return;
	      }
	      var val = number || isRange ? toNumber(el.value) : el.value;
	      self.set(val);
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value);
	        }
	      });
	    };

	    // apply debounce
	    if (debounce) {
	      this.listener = _debounce(this.listener, debounce);
	    }

	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function';
	    if (this.hasjQuery) {
	      var method = jQuery.fn.on ? 'on' : 'bind';
	      jQuery(el)[method]('change', this.rawListener);
	      if (!lazy) {
	        jQuery(el)[method]('input', this.listener);
	      }
	    } else {
	      this.on('change', this.rawListener);
	      if (!lazy) {
	        this.on('input', this.listener);
	      }
	    }

	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && isIE9) {
	      this.on('cut', function () {
	        nextTick(self.listener);
	      });
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener();
	        }
	      });
	    }

	    // set initial value if present
	    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    // #3029 only update when the value changes. This prevent
	    // browsers from overwriting values like selectionStart
	    value = _toString(value);
	    if (value !== this.el.value) this.el.value = value;
	  },

	  unbind: function unbind() {
	    var el = this.el;
	    if (this.hasjQuery) {
	      var method = jQuery.fn.off ? 'off' : 'unbind';
	      jQuery(el)[method]('change', this.listener);
	      jQuery(el)[method]('input', this.listener);
	    }
	  }
	};

	var radio = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value;
	      }
	      var val = el.value;
	      if (self.params.number) {
	        val = toNumber(val);
	      }
	      return val;
	    };

	    this.listener = function () {
	      self.set(self.getValue());
	    };
	    this.on('change', this.listener);

	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    this.el.checked = looseEqual(value, this.getValue());
	  }
	};

	var select = {

	  bind: function bind() {
	    var _this = this;

	    var self = this;
	    var el = this.el;

	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get());
	      }
	    };

	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple');

	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple);
	      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	      self.set(value);
	    };
	    this.on('change', this.listener);

	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true);
	    if (multiple && initValue.length || !multiple && initValue !== null) {
	      this.afterBind = this.listener;
	    }

	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', function () {
	      nextTick(_this.forceUpdate);
	    });
	    if (!inDoc(el)) {
	      nextTick(this.forceUpdate);
	    }
	  },

	  update: function update(value) {
	    var el = this.el;
	    el.selectedIndex = -1;
	    var multi = this.multiple && isArray(value);
	    var options = el.options;
	    var i = options.length;
	    var op, val;
	    while (i--) {
	      op = options[i];
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      /* eslint-disable eqeqeq */
	      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	      /* eslint-enable eqeqeq */
	    }
	  },

	  unbind: function unbind() {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate);
	  }
	};

	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */

	function getValue(el, multi, init) {
	  var res = multi ? [] : null;
	  var op, val, selected;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i];
	    selected = init ? op.hasAttribute('selected') : op.selected;
	    if (selected) {
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      if (multi) {
	        res.push(val);
	      } else {
	        return val;
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */

	function indexOf$1(arr, val) {
	  var i = arr.length;
	  while (i--) {
	    if (looseEqual(arr[i], val)) {
	      return i;
	    }
	  }
	  return -1;
	}

	var checkbox = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	    };

	    function getBooleanValue() {
	      var val = el.checked;
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue;
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue;
	      }
	      return val;
	    }

	    this.listener = function () {
	      var model = self._watcher.value;
	      if (isArray(model)) {
	        var val = self.getValue();
	        if (el.checked) {
	          if (indexOf(model, val) < 0) {
	            model.push(val);
	          }
	        } else {
	          model.$remove(val);
	        }
	      } else {
	        self.set(getBooleanValue());
	      }
	    };

	    this.on('change', this.listener);
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    var el = this.el;
	    if (isArray(value)) {
	      el.checked = indexOf(value, this.getValue()) > -1;
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = looseEqual(value, el._trueValue);
	      } else {
	        el.checked = !!value;
	      }
	    }
	  }
	};

	var handlers = {
	  text: text$2,
	  radio: radio,
	  select: select,
	  checkbox: checkbox
	};

	var model = {

	  priority: MODEL,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],

	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */

	  bind: function bind() {
	    // friendly warning...
	    this.checkFilters();
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model="' + this.descriptor.raw + '". ' + 'You might want to use a two-way filter to ensure correct behavior.', this.vm);
	    }
	    var el = this.el;
	    var tag = el.tagName;
	    var handler;
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text;
	    } else if (tag === 'SELECT') {
	      handler = handlers.select;
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text;
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag, this.vm);
	      return;
	    }
	    el.__v_model = this;
	    handler.bind.call(this);
	    this.update = handler.update;
	    this._unbind = handler.unbind;
	  },

	  /**
	   * Check read/write filter stats.
	   */

	  checkFilters: function checkFilters() {
	    var filters = this.filters;
	    if (!filters) return;
	    var i = filters.length;
	    while (i--) {
	      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true;
	      }
	      if (filter.write) {
	        this.hasWrite = true;
	      }
	    }
	  },

	  unbind: function unbind() {
	    this.el.__v_model = null;
	    this._unbind && this._unbind();
	  }
	};

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': [8, 46],
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	};

	function keyFilter(handler, keys) {
	  var codes = keys.map(function (key) {
	    var charCode = key.charCodeAt(0);
	    if (charCode > 47 && charCode < 58) {
	      return parseInt(key, 10);
	    }
	    if (key.length === 1) {
	      charCode = key.toUpperCase().charCodeAt(0);
	      if (charCode > 64 && charCode < 91) {
	        return charCode;
	      }
	    }
	    return keyCodes[key];
	  });
	  codes = [].concat.apply([], codes);
	  return function keyHandler(e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e);
	    }
	  };
	}

	function stopFilter(handler) {
	  return function stopHandler(e) {
	    e.stopPropagation();
	    return handler.call(this, e);
	  };
	}

	function preventFilter(handler) {
	  return function preventHandler(e) {
	    e.preventDefault();
	    return handler.call(this, e);
	  };
	}

	function selfFilter(handler) {
	  return function selfHandler(e) {
	    if (e.target === e.currentTarget) {
	      return handler.call(this, e);
	    }
	  };
	}

	var on$1 = {

	  priority: ON,
	  acceptStatement: true,
	  keyCodes: keyCodes,

	  bind: function bind() {
	    // deal with iframes
	    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	      var self = this;
	      this.iframeBind = function () {
	        on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
	      };
	      this.on('load', this.iframeBind);
	    }
	  },

	  update: function update(handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {};
	    }

	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler, this.vm);
	      return;
	    }

	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler);
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler);
	    }
	    if (this.modifiers.self) {
	      handler = selfFilter(handler);
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers).filter(function (key) {
	      return key !== 'stop' && key !== 'prevent' && key !== 'self' && key !== 'capture';
	    });
	    if (keys.length) {
	      handler = keyFilter(handler, keys);
	    }

	    this.reset();
	    this.handler = handler;

	    if (this.iframeBind) {
	      this.iframeBind();
	    } else {
	      on(this.el, this.arg, this.handler, this.modifiers.capture);
	    }
	  },

	  reset: function reset() {
	    var el = this.iframeBind ? this.el.contentWindow : this.el;
	    if (this.handler) {
	      off(el, this.arg, this.handler);
	    }
	  },

	  unbind: function unbind() {
	    this.reset();
	  }
	};

	var prefixes = ['-webkit-', '-moz-', '-ms-'];
	var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	var importantRE = /!important;?$/;
	var propCache = Object.create(null);

	var testEl = null;

	var style = {

	  deep: true,

	  update: function update(value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value;
	    } else if (isArray(value)) {
	      this.handleObject(value.reduce(extend, {}));
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  handleObject: function handleObject(value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {});
	    var name, val;
	    for (name in cache) {
	      if (!(name in value)) {
	        this.handleSingle(name, null);
	        delete cache[name];
	      }
	    }
	    for (name in value) {
	      val = value[name];
	      if (val !== cache[name]) {
	        cache[name] = val;
	        this.handleSingle(name, val);
	      }
	    }
	  },

	  handleSingle: function handleSingle(prop, value) {
	    prop = normalize(prop);
	    if (!prop) return; // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += '';
	    if (value) {
	      var isImportant = importantRE.test(value) ? 'important' : '';
	      if (isImportant) {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          warn('It\'s probably a bad idea to use !important with inline rules. ' + 'This feature will be deprecated in a future version of Vue.');
	        }
	        value = value.replace(importantRE, '').trim();
	        this.el.style.setProperty(prop.kebab, value, isImportant);
	      } else {
	        this.el.style[prop.camel] = value;
	      }
	    } else {
	      this.el.style[prop.camel] = '';
	    }
	  }

	};

	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function normalize(prop) {
	  if (propCache[prop]) {
	    return propCache[prop];
	  }
	  var res = prefix(prop);
	  propCache[prop] = propCache[res] = res;
	  return res;
	}

	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function prefix(prop) {
	  prop = hyphenate(prop);
	  var camel = camelize(prop);
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	  if (!testEl) {
	    testEl = document.createElement('div');
	  }
	  var i = prefixes.length;
	  var prefixed;
	  if (camel !== 'filter' && camel in testEl.style) {
	    return {
	      kebab: prop,
	      camel: camel
	    };
	  }
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return {
	        kebab: prefixes[i] + prop,
	        camel: prefixed
	      };
	    }
	  }
	}

	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xlinkRE = /^xlink:/;

	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
	// these attributes should also set their corresponding properties
	// because they only affect the initial state of the element
	var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
	// these attributes expect enumrated values of "true" or "false"
	// but are not boolean attributes
	var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;

	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	};

	var bind$1 = {

	  priority: BIND,

	  bind: function bind() {
	    var attr = this.arg;
	    var tag = this.el.tagName;
	    // should be deep watch on object mode
	    if (!attr) {
	      this.deep = true;
	    }
	    // handle interpolation bindings
	    var descriptor = this.descriptor;
	    var tokens = descriptor.interp;
	    if (tokens) {
	      // handle interpolations with one-time tokens
	      if (descriptor.hasOneTime) {
	        this.expression = tokensToExp(tokens, this._scope || this.vm);
	      }

	      // only allow binding on native attributes
	      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	        process.env.NODE_ENV !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.', this.vm);
	        this.el.removeAttribute(attr);
	        this.invalid = true;
	      }

	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + descriptor.raw + '": ';
	        // warn src
	        if (attr === 'src') {
	          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.', this.vm);
	        }

	        // warn style
	        if (attr === 'style') {
	          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.', this.vm);
	        }
	      }
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) {
	      return;
	    }
	    var attr = this.arg;
	    if (this.arg) {
	      this.handleSingle(attr, value);
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  // share object handler with v-bind:class
	  handleObject: style.handleObject,

	  handleSingle: function handleSingle(attr, value) {
	    var el = this.el;
	    var interp = this.descriptor.interp;
	    if (this.modifiers.camel) {
	      attr = camelize(attr);
	    }
	    if (!interp && attrWithPropsRE.test(attr) && attr in el) {
	      var attrValue = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
	      ? '' : value : value;

	      if (el[attr] !== attrValue) {
	        el[attr] = attrValue;
	      }
	    }
	    // set model props
	    var modelProp = modelProps[attr];
	    if (!interp && modelProp) {
	      el[modelProp] = value;
	      // update v-model if present
	      var model = el.__v_model;
	      if (model) {
	        model.listener();
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && el.tagName === 'TEXTAREA') {
	      el.removeAttribute(attr);
	      return;
	    }
	    // update attribute
	    if (enumeratedAttrRE.test(attr)) {
	      el.setAttribute(attr, value ? 'true' : 'false');
	    } else if (value != null && value !== false) {
	      if (attr === 'class') {
	        // handle edge case #1960:
	        // class interpolation should not overwrite Vue transition class
	        if (el.__v_trans) {
	          value += ' ' + el.__v_trans.id + '-transition';
	        }
	        setClass(el, value);
	      } else if (xlinkRE.test(attr)) {
	        el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
	      } else {
	        el.setAttribute(attr, value === true ? '' : value);
	      }
	    } else {
	      el.removeAttribute(attr);
	    }
	  }
	};

	var el = {

	  priority: EL,

	  bind: function bind() {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return;
	    }
	    var id = this.id = camelize(this.arg);
	    var refs = (this._scope || this.vm).$els;
	    if (hasOwn(refs, id)) {
	      refs[id] = this.el;
	    } else {
	      defineReactive(refs, id, this.el);
	    }
	  },

	  unbind: function unbind() {
	    var refs = (this._scope || this.vm).$els;
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null;
	    }
	  }
	};

	var ref = {
	  bind: function bind() {
	    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.', this.vm);
	  }
	};

	var cloak = {
	  bind: function bind() {
	    var el = this.el;
	    this.vm.$once('pre-hook:compiled', function () {
	      el.removeAttribute('v-cloak');
	    });
	  }
	};

	// must export plain object
	var directives = {
	  text: text$1,
	  html: html,
	  'for': vFor,
	  'if': vIf,
	  show: show,
	  model: model,
	  on: on$1,
	  bind: bind$1,
	  el: el,
	  ref: ref,
	  cloak: cloak
	};

	var vClass = {

	  deep: true,

	  update: function update(value) {
	    if (!value) {
	      this.cleanup();
	    } else if (typeof value === 'string') {
	      this.setClass(value.trim().split(/\s+/));
	    } else {
	      this.setClass(normalize$1(value));
	    }
	  },

	  setClass: function setClass(value) {
	    this.cleanup(value);
	    for (var i = 0, l = value.length; i < l; i++) {
	      var val = value[i];
	      if (val) {
	        apply(this.el, val, addClass);
	      }
	    }
	    this.prevKeys = value;
	  },

	  cleanup: function cleanup(value) {
	    var prevKeys = this.prevKeys;
	    if (!prevKeys) return;
	    var i = prevKeys.length;
	    while (i--) {
	      var key = prevKeys[i];
	      if (!value || value.indexOf(key) < 0) {
	        apply(this.el, key, removeClass);
	      }
	    }
	  }
	};

	/**
	 * Normalize objects and arrays (potentially containing objects)
	 * into array of strings.
	 *
	 * @param {Object|Array<String|Object>} value
	 * @return {Array<String>}
	 */

	function normalize$1(value) {
	  var res = [];
	  if (isArray(value)) {
	    for (var i = 0, l = value.length; i < l; i++) {
	      var _key = value[i];
	      if (_key) {
	        if (typeof _key === 'string') {
	          res.push(_key);
	        } else {
	          for (var k in _key) {
	            if (_key[k]) res.push(k);
	          }
	        }
	      }
	    }
	  } else if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) res.push(key);
	    }
	  }
	  return res;
	}

	/**
	 * Add or remove a class/classes on an element
	 *
	 * @param {Element} el
	 * @param {String} key The class name. This may or may not
	 *                     contain a space character, in such a
	 *                     case we'll deal with multiple class
	 *                     names at once.
	 * @param {Function} fn
	 */

	function apply(el, key, fn) {
	  key = key.trim();
	  if (key.indexOf(' ') === -1) {
	    fn(el, key);
	    return;
	  }
	  // The key contains one or more space characters.
	  // Since a class name doesn't accept such characters, we
	  // treat it as multiple classes.
	  var keys = key.split(/\s+/);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    fn(el, keys[i]);
	  }
	}

	var component = {

	  priority: COMPONENT,

	  params: ['keep-alive', 'transition-mode', 'inline-template'],

	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */

	  bind: function bind() {
	    if (!this.el.__vue__) {
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive;
	      if (this.keepAlive) {
	        this.cache = {};
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = extractContent(this.el, true);
	      }
	      // component resolution related state
	      this.pendingComponentCb = this.Component = null;
	      // transition related state
	      this.pendingRemovals = 0;
	      this.pendingRemovalCb = null;
	      // create a ref anchor
	      this.anchor = createAnchor('v-component');
	      replace(this.el, this.anchor);
	      // remove is attribute.
	      // this is removed during compilation, but because compilation is
	      // cached, when the component is used elsewhere this attribute
	      // will remain at link time.
	      this.el.removeAttribute('is');
	      this.el.removeAttribute(':is');
	      // remove ref, same as above
	      if (this.descriptor.ref) {
	        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	      }
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression);
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	    }
	  },

	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */

	  update: function update(value) {
	    if (!this.literal) {
	      this.setComponent(value);
	    }
	  },

	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */

	  setComponent: function setComponent(value, cb) {
	    this.invalidatePending();
	    if (!value) {
	      // just remove current
	      this.unbuild(true);
	      this.remove(this.childVM, cb);
	      this.childVM = null;
	    } else {
	      var self = this;
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb);
	      });
	    }
	  },

	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */

	  resolveComponent: function resolveComponent(value, cb) {
	    var self = this;
	    this.pendingComponentCb = cancellable(function (Component) {
	      self.ComponentName = Component.options.name || (typeof value === 'string' ? value : null);
	      self.Component = Component;
	      cb();
	    });
	    this.vm._resolveComponent(value, this.pendingComponentCb);
	  },

	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */

	  mountComponent: function mountComponent(cb) {
	    // actual mount
	    this.unbuild(true);
	    var self = this;
	    var activateHooks = this.Component.options.activate;
	    var cached = this.getCached();
	    var newComponent = this.build();
	    if (activateHooks && !cached) {
	      this.waitingFor = newComponent;
	      callActivateHooks(activateHooks, newComponent, function () {
	        if (self.waitingFor !== newComponent) {
	          return;
	        }
	        self.waitingFor = null;
	        self.transition(newComponent, cb);
	      });
	    } else {
	      // update ref for kept-alive component
	      if (cached) {
	        newComponent._updateRef();
	      }
	      this.transition(newComponent, cb);
	    }
	  },

	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */

	  invalidatePending: function invalidatePending() {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel();
	      this.pendingComponentCb = null;
	    }
	  },

	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */

	  build: function build(extraOptions) {
	    var cached = this.getCached();
	    if (cached) {
	      return cached;
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: cloneNode(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.descriptor.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      };
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        extend(options, extraOptions);
	      }
	      var child = new this.Component(options);
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child;
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template, child);
	      }
	      return child;
	    }
	  },

	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */

	  getCached: function getCached() {
	    return this.keepAlive && this.cache[this.Component.cid];
	  },

	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */

	  unbuild: function unbuild(defer) {
	    if (this.waitingFor) {
	      if (!this.keepAlive) {
	        this.waitingFor.$destroy();
	      }
	      this.waitingFor = null;
	    }
	    var child = this.childVM;
	    if (!child || this.keepAlive) {
	      if (child) {
	        // remove ref
	        child._inactive = true;
	        child._updateRef(true);
	      }
	      return;
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer);
	  },

	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */

	  remove: function remove(child, cb) {
	    var keepAlive = this.keepAlive;
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++;
	      this.pendingRemovalCb = cb;
	      var self = this;
	      child.$remove(function () {
	        self.pendingRemovals--;
	        if (!keepAlive) child._cleanup();
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb();
	          self.pendingRemovalCb = null;
	        }
	      });
	    } else if (cb) {
	      cb();
	    }
	  },

	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */

	  transition: function transition(target, cb) {
	    var self = this;
	    var current = this.childVM;
	    // for devtool inspection
	    if (current) current._inactive = true;
	    target._inactive = false;
	    this.childVM = target;
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb);
	        });
	        break;
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb);
	        });
	        break;
	      default:
	        self.remove(current);
	        target.$before(self.anchor, cb);
	    }
	  },

	  /**
	   * Unbind.
	   */

	  unbind: function unbind() {
	    this.invalidatePending();
	    // Do not defer cleanup when unbinding
	    this.unbuild();
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy();
	      }
	      this.cache = null;
	    }
	  }
	};

	/**
	 * Call activate hooks in order (asynchronous)
	 *
	 * @param {Array} hooks
	 * @param {Vue} vm
	 * @param {Function} cb
	 */

	function callActivateHooks(hooks, vm, cb) {
	  var total = hooks.length;
	  var called = 0;
	  hooks[0].call(vm, next);
	  function next() {
	    if (++called >= total) {
	      cb();
	    } else {
	      hooks[called].call(vm, next);
	    }
	  }
	}

	var propBindingModes = config._propBindingModes;
	var empty = {};

	// regexes
	var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;

	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @param {Vue} vm
	 * @return {Function} propsLinkFn
	 */

	function compileProps(el, propOptions, vm) {
	  var props = [];
	  var names = Object.keys(propOptions);
	  var i = names.length;
	  var options, name, attr, value, path, parsed, prop;
	  while (i--) {
	    name = names[i];
	    options = propOptions[name] || empty;

	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      warn('Do not use $data as prop.', vm);
	      continue;
	    }

	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = camelize(name);
	    if (!identRE$1.test(path)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.', vm);
	      continue;
	    }

	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY,
	      raw: null
	    };

	    attr = hyphenate(name);
	    // first check dynamic version
	    if ((value = getBindAttr(el, attr)) === null) {
	      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	        prop.mode = propBindingModes.TWO_WAY;
	      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	        prop.mode = propBindingModes.ONE_TIME;
	      }
	    }
	    if (value !== null) {
	      // has dynamic binding!
	      prop.raw = value;
	      parsed = parseDirective(value);
	      value = parsed.expression;
	      prop.filters = parsed.filters;
	      // check binding type
	      if (isLiteral(value) && !parsed.filters) {
	        // for expressions containing literal numbers and
	        // booleans, there's no need to setup a prop binding,
	        // so we can optimize them as a one-time set.
	        prop.optimizedLiteral = true;
	      } else {
	        prop.dynamic = true;
	        // check non-settable path for two-way bindings
	        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	          prop.mode = propBindingModes.ONE_WAY;
	          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value, vm);
	        }
	      }
	      prop.parentPath = value;

	      // warn required two-way
	      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	        warn('Prop "' + name + '" expects a two-way binding type.', vm);
	      }
	    } else if ((value = getAttr(el, attr)) !== null) {
	      // has literal binding!
	      prop.raw = value;
	    } else if (process.env.NODE_ENV !== 'production') {
	      // check possible camelCase prop usage
	      var lowerCaseName = path.toLowerCase();
	      value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
	      if (value) {
	        warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.', vm);
	      } else if (options.required) {
	        // warn missing required
	        warn('Missing required prop: ' + name, vm);
	      }
	    }
	    // push prop
	    props.push(prop);
	  }
	  return makePropsLinkFn(props);
	}

	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */

	function makePropsLinkFn(props) {
	  return function propsLinkFn(vm, scope) {
	    // store resolved props info
	    vm._props = {};
	    var inlineProps = vm.$options.propsData;
	    var i = props.length;
	    var prop, path, options, value, raw;
	    while (i--) {
	      prop = props[i];
	      raw = prop.raw;
	      path = prop.path;
	      options = prop.options;
	      vm._props[path] = prop;
	      if (inlineProps && hasOwn(inlineProps, path)) {
	        initProp(vm, prop, inlineProps[path]);
	      }if (raw === null) {
	        // initialize absent prop
	        initProp(vm, prop, undefined);
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (prop.mode === propBindingModes.ONE_TIME) {
	          // one time binding
	          value = (scope || vm._context || vm).$get(prop.parentPath);
	          initProp(vm, prop, value);
	        } else {
	          if (vm._context) {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope); // el, host, scope
	          } else {
	              // root instance
	              initProp(vm, prop, vm.$get(prop.parentPath));
	            }
	        }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        var stripped = stripQuotes(raw);
	        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	        initProp(vm, prop, value);
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value, or with same
	        // literal value (e.g. disabled="disabled")
	        // see https://github.com/vuejs/vue-loader/issues/182
	        value = options.type === Boolean && (raw === '' || raw === hyphenate(prop.name)) ? true : raw;
	        initProp(vm, prop, value);
	      }
	    }
	  };
	}

	/**
	 * Process a prop with a rawValue, applying necessary coersions,
	 * default values & assertions and call the given callback with
	 * processed value.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} rawValue
	 * @param {Function} fn
	 */

	function processPropValue(vm, prop, rawValue, fn) {
	  var isSimple = prop.dynamic && isSimplePath(prop.parentPath);
	  var value = rawValue;
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop);
	  }
	  value = coerceProp(prop, value, vm);
	  var coerced = value !== rawValue;
	  if (!assertProp(prop, value, vm)) {
	    value = undefined;
	  }
	  if (isSimple && !coerced) {
	    withoutConversion(function () {
	      fn(value);
	    });
	  } else {
	    fn(value);
	  }
	}

	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function initProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    defineReactive(vm, prop.path, value);
	  });
	}

	/**
	 * Update a prop's value on a vm.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function updateProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    vm[prop.path] = value;
	  });
	}

	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @return {*}
	 */

	function getPropDefaultValue(vm, prop) {
	  // no default, return undefined
	  var options = prop.options;
	  if (!hasOwn(options, 'default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean ? false : undefined;
	  }
	  var def = options['default'];
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid default value for prop "' + prop.name + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	}

	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 * @param {Vue} vm
	 */

	function assertProp(prop, value, vm) {
	  if (!prop.options.required && ( // non-required
	  prop.raw === null || // abscent
	  value == null) // null or undefined
	  ) {
	      return true;
	    }
	  var options = prop.options;
	  var type = options.type;
	  var valid = !type;
	  var expectedTypes = [];
	  if (type) {
	    if (!isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType);
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    if (process.env.NODE_ENV !== 'production') {
	      warn('Invalid prop: type check failed for prop "' + prop.name + '".' + ' Expected ' + expectedTypes.map(formatType).join(', ') + ', got ' + formatValue(value) + '.', vm);
	    }
	    return false;
	  }
	  var validator = options.validator;
	  if (validator) {
	    if (!validator(value)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for prop "' + prop.name + '".', vm);
	      return false;
	    }
	  }
	  return true;
	}

	/**
	 * Force parsing value with coerce option.
	 *
	 * @param {*} value
	 * @param {Object} options
	 * @return {*}
	 */

	function coerceProp(prop, value, vm) {
	  var coerce = prop.options.coerce;
	  if (!coerce) {
	    return value;
	  }
	  if (typeof coerce === 'function') {
	    return coerce(value);
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid coerce for prop "' + prop.name + '": expected function, got ' + typeof coerce + '.', vm);
	    return value;
	  }
	}

	/**
	 * Assert the type of a value
	 *
	 * @param {*} value
	 * @param {Function} type
	 * @return {Object}
	 */

	function assertType(value, type) {
	  var valid;
	  var expectedType;
	  if (type === String) {
	    expectedType = 'string';
	    valid = typeof value === expectedType;
	  } else if (type === Number) {
	    expectedType = 'number';
	    valid = typeof value === expectedType;
	  } else if (type === Boolean) {
	    expectedType = 'boolean';
	    valid = typeof value === expectedType;
	  } else if (type === Function) {
	    expectedType = 'function';
	    valid = typeof value === expectedType;
	  } else if (type === Object) {
	    expectedType = 'object';
	    valid = isPlainObject(value);
	  } else if (type === Array) {
	    expectedType = 'array';
	    valid = isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  };
	}

	/**
	 * Format type for output
	 *
	 * @param {String} type
	 * @return {String}
	 */

	function formatType(type) {
	  return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'custom type';
	}

	/**
	 * Format value
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function formatValue(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	}

	var bindingModes = config._propBindingModes;

	var propDef = {

	  bind: function bind() {
	    var child = this.vm;
	    var parent = child._context;
	    // passed in from compiler directly
	    var prop = this.descriptor.prop;
	    var childKey = prop.path;
	    var parentKey = prop.parentPath;
	    var twoWay = prop.mode === bindingModes.TWO_WAY;

	    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	      updateProp(child, prop, val);
	    }, {
	      twoWay: twoWay,
	      filters: prop.filters,
	      // important: props need to be observed on the
	      // v-for scope if present
	      scope: this._scope
	    });

	    // set the child initial value.
	    initProp(child, prop, parentWatcher.value);

	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this;
	      child.$once('pre-hook:created', function () {
	        self.childWatcher = new Watcher(child, childKey, function (val) {
	          parentWatcher.set(val);
	        }, {
	          // ensure sync upward before parent sync down.
	          // this is necessary in cases e.g. the child
	          // mutates a prop array, then replaces it. (#1683)
	          sync: true
	        });
	      });
	    }
	  },

	  unbind: function unbind() {
	    this.parentWatcher.teardown();
	    if (this.childWatcher) {
	      this.childWatcher.teardown();
	    }
	  }
	};

	var queue$1 = [];
	var queued = false;

	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */

	function pushJob(job) {
	  queue$1.push(job);
	  if (!queued) {
	    queued = true;
	    nextTick(flush);
	  }
	}

	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */

	function flush() {
	  // Force layout
	  var f = document.documentElement.offsetHeight;
	  for (var i = 0; i < queue$1.length; i++) {
	    queue$1[i]();
	  }
	  queue$1 = [];
	  queued = false;
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f;
	}

	var TYPE_TRANSITION = 'transition';
	var TYPE_ANIMATION = 'animation';
	var transDurationProp = transitionProp + 'Duration';
	var animDurationProp = animationProp + 'Duration';

	/**
	 * If a just-entered element is applied the
	 * leave class while its enter transition hasn't started yet,
	 * and the transitioned property has the same value for both
	 * enter/leave, then the leave transition will be skipped and
	 * the transitionend event never fires. This function ensures
	 * its callback to be called after a transition has started
	 * by waiting for double raf.
	 *
	 * It falls back to setTimeout on devices that support CSS
	 * transitions but not raf (e.g. Android 4.2 browser) - since
	 * these environments are usually slow, we are giving it a
	 * relatively large timeout.
	 */

	var raf = inBrowser && window.requestAnimationFrame;
	var waitForTransitionStart = raf
	/* istanbul ignore next */
	? function (fn) {
	  raf(function () {
	    raf(fn);
	  });
	} : function (fn) {
	  setTimeout(fn, 50);
	};

	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */
	function Transition(el, id, hooks, vm) {
	  this.id = id;
	  this.el = el;
	  this.enterClass = hooks && hooks.enterClass || id + '-enter';
	  this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
	  this.hooks = hooks;
	  this.vm = vm;
	  // async state
	  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	  this.justEntered = false;
	  this.entered = this.left = false;
	  this.typeCache = {};
	  // check css transition type
	  this.type = hooks && hooks.type;
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
	      warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type, vm);
	    }
	  }
	  // bind
	  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	    self[m] = bind(self[m], self);
	  });
	}

	var p$1 = Transition.prototype;

	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */

	p$1.enter = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeEnter');
	  this.cb = cb;
	  addClass(this.el, this.enterClass);
	  op();
	  this.entered = false;
	  this.callHookWithCb('enter');
	  if (this.entered) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled;
	  pushJob(this.enterNextTick);
	};

	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */

	p$1.enterNextTick = function () {
	  var _this = this;

	  // prevent transition skipping
	  this.justEntered = true;
	  waitForTransitionStart(function () {
	    _this.justEntered = false;
	  });
	  var enterDone = this.enterDone;
	  var type = this.getCssTransitionType(this.enterClass);
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass);
	      this.setupCssCb(transitionEndEvent, enterDone);
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone);
	    } else {
	      enterDone();
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass);
	  }
	};

	/**
	 * The "cleanup" phase of an entering transition.
	 */

	p$1.enterDone = function () {
	  this.entered = true;
	  this.cancel = this.pendingJsCb = null;
	  removeClass(this.el, this.enterClass);
	  this.callHook('afterEnter');
	  if (this.cb) this.cb();
	};

	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */

	p$1.leave = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeLeave');
	  this.op = op;
	  this.cb = cb;
	  addClass(this.el, this.leaveClass);
	  this.left = false;
	  this.callHookWithCb('leave');
	  if (this.left) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled;
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone();
	    } else {
	      pushJob(this.leaveNextTick);
	    }
	  }
	};

	/**
	 * The "nextTick" phase of a leaving transition.
	 */

	p$1.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass);
	  if (type) {
	    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	    this.setupCssCb(event, this.leaveDone);
	  } else {
	    this.leaveDone();
	  }
	};

	/**
	 * The "cleanup" phase of a leaving transition.
	 */

	p$1.leaveDone = function () {
	  this.left = true;
	  this.cancel = this.pendingJsCb = null;
	  this.op();
	  removeClass(this.el, this.leaveClass);
	  this.callHook('afterLeave');
	  if (this.cb) this.cb();
	  this.op = null;
	};

	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */

	p$1.cancelPending = function () {
	  this.op = this.cb = null;
	  var hasPending = false;
	  if (this.pendingCssCb) {
	    hasPending = true;
	    off(this.el, this.pendingCssEvent, this.pendingCssCb);
	    this.pendingCssEvent = this.pendingCssCb = null;
	  }
	  if (this.pendingJsCb) {
	    hasPending = true;
	    this.pendingJsCb.cancel();
	    this.pendingJsCb = null;
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass);
	    removeClass(this.el, this.leaveClass);
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el);
	    this.cancel = null;
	  }
	};

	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */

	p$1.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el);
	  }
	};

	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */

	p$1.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type];
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = cancellable(this[type + 'Done']);
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb);
	  }
	};

	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */

	p$1.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (!transitionEndEvent ||
	  // skip CSS transitions if page is not visible -
	  // this solves the issue of transitionend events not
	  // firing until the page is visible again.
	  // pageVisibility API is supported in IE10+, same as
	  // CSS transitions.
	  document.hidden ||
	  // explicit js-only transition
	  this.hooks && this.hooks.css === false ||
	  // element is hidden
	  isHidden(this.el)) {
	    return;
	  }
	  var type = this.type || this.typeCache[className];
	  if (type) return type;
	  var inlineStyles = this.el.style;
	  var computedStyles = window.getComputedStyle(this.el);
	  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION;
	  } else {
	    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION;
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type;
	  }
	  return type;
	};

	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */

	p$1.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event;
	  var self = this;
	  var el = this.el;
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      off(el, event, onEnd);
	      self.pendingCssEvent = self.pendingCssCb = null;
	      if (!self.pendingJsCb && cb) {
	        cb();
	      }
	    }
	  };
	  on(el, event, onEnd);
	};

	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */

	function isHidden(el) {
	  if (/svg$/.test(el.namespaceURI)) {
	    // SVG elements do not have offset(Width|Height)
	    // so we need to check the client rect
	    var rect = el.getBoundingClientRect();
	    return !(rect.width || rect.height);
	  } else {
	    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	  }
	}

	var transition$1 = {

	  priority: TRANSITION,

	  update: function update(id, oldId) {
	    var el = this.el;
	    // resolve on owner vm
	    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	    id = id || 'v';
	    oldId = oldId || 'v';
	    el.__v_trans = new Transition(el, id, hooks, this.vm);
	    removeClass(el, oldId + '-transition');
	    addClass(el, id + '-transition');
	  }
	};

	var internalDirectives = {
	  style: style,
	  'class': vClass,
	  component: component,
	  prop: propDef,
	  transition: transition$1
	};

	// special binding prefixes
	var bindRE = /^v-bind:|^:/;
	var onRE = /^v-on:|^@/;
	var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
	var modifierRE = /\.[^\.]+/g;
	var transitionRE = /^(v-bind:|:)?transition$/;

	// default directive priority
	var DEFAULT_PRIORITY = 1000;
	var DEFAULT_TERMINAL_PRIORITY = 2000;

	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */

	function compile(el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	  // link function for the childNodes
	  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && !isScript(el) && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;

	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */

	  return function compositeLinkFn(vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = toArray(el.childNodes);
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer() {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	    }, vm);
	    return makeUnlinkFn(vm, dirs);
	  };
	}

	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */

	function linkAndCapture(linker, vm) {
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV === 'production') {
	    // reset directives before every capture in production
	    // mode, so that when unlinking we don't need to splice
	    // them out (which turns out to be a perf hit).
	    // they are kept in development mode because they are
	    // useful for Vue's own tests.
	    vm._directives = [];
	  }
	  var originalDirCount = vm._directives.length;
	  linker();
	  var dirs = vm._directives.slice(originalDirCount);
	  dirs.sort(directiveComparator);
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind();
	  }
	  return dirs;
	}

	/**
	 * Directive priority sort comparator
	 *
	 * @param {Object} a
	 * @param {Object} b
	 */

	function directiveComparator(a, b) {
	  a = a.descriptor.def.priority || DEFAULT_PRIORITY;
	  b = b.descriptor.def.priority || DEFAULT_PRIORITY;
	  return a > b ? -1 : a === b ? 0 : 1;
	}

	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */

	function makeUnlinkFn(vm, dirs, context, contextDirs) {
	  function unlink(destroying) {
	    teardownDirs(vm, dirs, destroying);
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs);
	    }
	  }
	  // expose linked directives
	  unlink.dirs = dirs;
	  return unlink;
	}

	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */

	function teardownDirs(vm, dirs, destroying) {
	  var i = dirs.length;
	  while (i--) {
	    dirs[i]._teardown();
	    if (process.env.NODE_ENV !== 'production' && !destroying) {
	      vm._directives.$remove(dirs[i]);
	    }
	  }
	}

	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */

	function compileAndLinkProps(vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props, vm);
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope);
	  }, vm);
	  return makeUnlinkFn(vm, propDirs);
	}

	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */

	function compileRoot(el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs;
	  var replacerAttrs = options._replacerAttrs;
	  var contextLinkFn, replacerLinkFn;

	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options);
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options);
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    var names = containerAttrs.filter(function (attr) {
	      // allow vue-loader/vueify scoped css attributes
	      return attr.name.indexOf('_v-') < 0 &&
	      // allow event listeners
	      !onRE.test(attr.name) &&
	      // allow slots
	      attr.name !== 'slot';
	    }).map(function (attr) {
	      return '"' + attr.name + '"';
	    });
	    if (names.length) {
	      var plural = names.length > 1;
	      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment-Instance');
	    }
	  }

	  options._containerAttrs = options._replacerAttrs = null;
	  return function rootLinkFn(vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context;
	    var contextDirs;
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope);
	      }, context);
	    }

	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el);
	    }, vm);

	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	  };
	}

	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileNode(node, options) {
	  var type = node.nodeType;
	  if (type === 1 && !isScript(node)) {
	    return compileElement(node, options);
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options);
	  } else {
	    return null;
	  }
	}

	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileElement(el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    var tokens = parseText(el.value);
	    if (tokens) {
	      el.setAttribute(':value', tokensToExp(tokens));
	      el.value = '';
	    }
	  }
	  var linkFn;
	  var hasAttrs = el.hasAttributes();
	  var attrs = hasAttrs && toArray(el.attributes);
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, attrs, options);
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options);
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options);
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(attrs, options);
	  }
	  return linkFn;
	}

	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */

	function compileTextNode(node, options) {
	  // skip marked text nodes
	  if (node._skip) {
	    return removeText;
	  }

	  var tokens = parseText(node.wholeText);
	  if (!tokens) {
	    return null;
	  }

	  // mark adjacent text nodes as skipped,
	  // because we are using node.wholeText to compile
	  // all adjacent text nodes together. This fixes
	  // issues in IE where sometimes it splits up a single
	  // text node into multiple ones.
	  var next = node.nextSibling;
	  while (next && next.nodeType === 3) {
	    next._skip = true;
	    next = next.nextSibling;
	  }

	  var frag = document.createDocumentFragment();
	  var el, token;
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i];
	    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	    frag.appendChild(el);
	  }
	  return makeTextNodeLinkFn(tokens, frag, options);
	}

	/**
	 * Linker for an skipped text node.
	 *
	 * @param {Vue} vm
	 * @param {Text} node
	 */

	function removeText(vm, node) {
	  remove(node);
	}

	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */

	function processTextToken(token, options) {
	  var el;
	  if (token.oneTime) {
	    el = document.createTextNode(token.value);
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html');
	      setTokenType('html');
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ');
	      setTokenType('text');
	    }
	  }
	  function setTokenType(type) {
	    if (token.descriptor) return;
	    var parsed = parseDirective(token.value);
	    token.descriptor = {
	      name: type,
	      def: directives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    };
	  }
	  return el;
	}

	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */

	function makeTextNodeLinkFn(tokens, frag) {
	  return function textNodeLinkFn(vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true);
	    var childNodes = toArray(fragClone.childNodes);
	    var token, value, node;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      value = token.value;
	      if (token.tag) {
	        node = childNodes[i];
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value);
	          if (token.html) {
	            replace(node, parseTemplate(value, true));
	          } else {
	            node.data = _toString(value);
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope);
	        }
	      }
	    }
	    replace(el, fragClone);
	  };
	}

	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function compileNodeList(nodeList, options) {
	  var linkFns = [];
	  var nodeLinkFn, childLinkFn, node;
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i];
	    nodeLinkFn = compileNode(node, options);
	    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	    linkFns.push(nodeLinkFn, childLinkFn);
	  }
	  return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}

	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */

	function makeChildLinkFn(linkFns) {
	  return function childLinkFn(vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn;
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n];
	      nodeLinkFn = linkFns[i++];
	      childrenLinkFn = linkFns[i++];
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(node.childNodes);
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag);
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag);
	      }
	    }
	  };
	}

	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */

	function checkElementDirectives(el, options) {
	  var tag = el.tagName.toLowerCase();
	  if (commonTagRE.test(tag)) {
	    return;
	  }
	  var def = resolveAsset(options, 'elementDirectives', tag);
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def);
	  }
	}

	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function checkComponent(el, options) {
	  var component = checkComponentAttr(el, options);
	  if (component) {
	    var ref = findRef(el);
	    var descriptor = {
	      name: 'component',
	      ref: ref,
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    };
	    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	      if (ref) {
	        defineReactive((scope || vm).$refs, ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    componentLinkFn.terminal = true;
	    return componentLinkFn;
	  }
	}

	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Array} attrs
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */

	function checkTerminalDirectives(el, attrs, options) {
	  // skip v-pre
	  if (getAttr(el, 'v-pre') !== null) {
	    return skip;
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling;
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip;
	    }
	  }

	  var attr, name, value, modifiers, matched, dirName, rawName, arg, def, termDef;
	  for (var i = 0, j = attrs.length; i < j; i++) {
	    attr = attrs[i];
	    name = attr.name.replace(modifierRE, '');
	    if (matched = name.match(dirAttrRE)) {
	      def = resolveAsset(options, 'directives', matched[1]);
	      if (def && def.terminal) {
	        if (!termDef || (def.priority || DEFAULT_TERMINAL_PRIORITY) > termDef.priority) {
	          termDef = def;
	          rawName = attr.name;
	          modifiers = parseModifiers(attr.name);
	          value = attr.value;
	          dirName = matched[1];
	          arg = matched[2];
	        }
	      }
	    }
	  }

	  if (termDef) {
	    return makeTerminalNodeLinkFn(el, dirName, value, options, termDef, rawName, arg, modifiers);
	  }
	}

	function skip() {}
	skip.terminal = true;

	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} def
	 * @param {String} [rawName]
	 * @param {String} [arg]
	 * @param {Object} [modifiers]
	 * @return {Function} terminalLinkFn
	 */

	function makeTerminalNodeLinkFn(el, dirName, value, options, def, rawName, arg, modifiers) {
	  var parsed = parseDirective(value);
	  var descriptor = {
	    name: dirName,
	    arg: arg,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    attr: rawName,
	    modifiers: modifiers,
	    def: def
	  };
	  // check ref for v-for and router-view
	  if (dirName === 'for' || dirName === 'router-view') {
	    descriptor.ref = findRef(el);
	  }
	  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	    if (descriptor.ref) {
	      defineReactive((scope || vm).$refs, descriptor.ref, null);
	    }
	    vm._bindDir(descriptor, el, host, scope, frag);
	  };
	  fn.terminal = true;
	  return fn;
	}

	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */

	function compileDirectives(attrs, options) {
	  var i = attrs.length;
	  var dirs = [];
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
	  while (i--) {
	    attr = attrs[i];
	    name = rawName = attr.name;
	    value = rawValue = attr.value;
	    tokens = parseText(value);
	    // reset arg
	    arg = null;
	    // check modifiers
	    modifiers = parseModifiers(name);
	    name = name.replace(modifierRE, '');

	    // attribute interpolations
	    if (tokens) {
	      value = tokensToExp(tokens);
	      arg = name;
	      pushDir('bind', directives.bind, tokens);
	      // warn against mixing mustaches with v-bind
	      if (process.env.NODE_ENV !== 'production') {
	        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	          return attr.name === ':class' || attr.name === 'v-bind:class';
	        })) {
	          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.', options);
	        }
	      }
	    } else

	      // special attribute: transition
	      if (transitionRE.test(name)) {
	        modifiers.literal = !bindRE.test(name);
	        pushDir('transition', internalDirectives.transition);
	      } else

	        // event handlers
	        if (onRE.test(name)) {
	          arg = name.replace(onRE, '');
	          pushDir('on', directives.on);
	        } else

	          // attribute bindings
	          if (bindRE.test(name)) {
	            dirName = name.replace(bindRE, '');
	            if (dirName === 'style' || dirName === 'class') {
	              pushDir(dirName, internalDirectives[dirName]);
	            } else {
	              arg = dirName;
	              pushDir('bind', directives.bind);
	            }
	          } else

	            // normal directives
	            if (matched = name.match(dirAttrRE)) {
	              dirName = matched[1];
	              arg = matched[2];

	              // skip v-else (when used with v-show)
	              if (dirName === 'else') {
	                continue;
	              }

	              dirDef = resolveAsset(options, 'directives', dirName, true);
	              if (dirDef) {
	                pushDir(dirName, dirDef);
	              }
	            }
	  }

	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Array} [interpTokens]
	   */

	  function pushDir(dirName, def, interpTokens) {
	    var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
	    var parsed = !hasOneTimeToken && parseDirective(value);
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      // conversion from interpolation strings with one-time token
	      // to expression is differed until directive bind time so that we
	      // have access to the actual vm context for one-time bindings.
	      expression: parsed && parsed.expression,
	      filters: parsed && parsed.filters,
	      interp: interpTokens,
	      hasOneTime: hasOneTimeToken
	    });
	  }

	  if (dirs.length) {
	    return makeNodeLinkFn(dirs);
	  }
	}

	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */

	function parseModifiers(name) {
	  var res = Object.create(null);
	  var match = name.match(modifierRE);
	  if (match) {
	    var i = match.length;
	    while (i--) {
	      res[match[i].slice(1)] = true;
	    }
	  }
	  return res;
	}

	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */

	function makeNodeLinkFn(directives) {
	  return function nodeLinkFn(vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length;
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag);
	    }
	  };
	}

	/**
	 * Check if an interpolation string contains one-time tokens.
	 *
	 * @param {Array} tokens
	 * @return {Boolean}
	 */

	function hasOneTime(tokens) {
	  var i = tokens.length;
	  while (i--) {
	    if (tokens[i].oneTime) return true;
	  }
	}

	function isScript(el) {
	  return el.tagName === 'SCRIPT' && (!el.hasAttribute('type') || el.getAttribute('type') === 'text/javascript');
	}

	var specialCharRE = /[^\w\-:\.]/;

	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transclude(el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el);
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (isTemplate(el)) {
	    el = parseTemplate(el);
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>';
	    }
	    if (options.template) {
	      options._content = extractContent(el);
	      el = transcludeTemplate(el, options);
	    }
	  }
	  if (isFragment(el)) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    prepend(createAnchor('v-start', true), el);
	    el.appendChild(createAnchor('v-end', true));
	  }
	  return el;
	}

	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transcludeTemplate(el, options) {
	  var template = options.template;
	  var frag = parseTemplate(template, true);
	  if (frag) {
	    var replacer = frag.firstChild;
	    var tag = replacer.tagName && replacer.tagName.toLowerCase();
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	      // multi-children template
	      frag.childNodes.length > 1 ||
	      // non-element template
	      replacer.nodeType !== 1 ||
	      // single nested component
	      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
	      // element directive
	      resolveAsset(options, 'elementDirectives', tag) ||
	      // for block
	      replacer.hasAttribute('v-for') ||
	      // if block
	      replacer.hasAttribute('v-if')) {
	        return frag;
	      } else {
	        options._replacerAttrs = extractAttrs(replacer);
	        mergeAttrs(el, replacer);
	        return replacer;
	      }
	    } else {
	      el.appendChild(frag);
	      return el;
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
	  }
	}

	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */

	function extractAttrs(el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return toArray(el.attributes);
	  }
	}

	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */

	function mergeAttrs(from, to) {
	  var attrs = from.attributes;
	  var i = attrs.length;
	  var name, value;
	  while (i--) {
	    name = attrs[i].name;
	    value = attrs[i].value;
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value);
	    } else if (name === 'class' && !parseText(value) && (value = value.trim())) {
	      value.split(/\s+/).forEach(function (cls) {
	        addClass(to, cls);
	      });
	    }
	  }
	}

	/**
	 * Scan and determine slot content distribution.
	 * We do this during transclusion instead at compile time so that
	 * the distribution is decoupled from the compilation order of
	 * the slots.
	 *
	 * @param {Element|DocumentFragment} template
	 * @param {Element} content
	 * @param {Vue} vm
	 */

	function resolveSlots(vm, content) {
	  if (!content) {
	    return;
	  }
	  var contents = vm._slotContents = Object.create(null);
	  var el, name;
	  for (var i = 0, l = content.children.length; i < l; i++) {
	    el = content.children[i];
	    /* eslint-disable no-cond-assign */
	    if (name = el.getAttribute('slot')) {
	      (contents[name] || (contents[name] = [])).push(el);
	    }
	    /* eslint-enable no-cond-assign */
	    if (process.env.NODE_ENV !== 'production' && getBindAttr(el, 'slot')) {
	      warn('The "slot" attribute must be static.', vm.$parent);
	    }
	  }
	  for (name in contents) {
	    contents[name] = extractFragment(contents[name], content);
	  }
	  if (content.hasChildNodes()) {
	    var nodes = content.childNodes;
	    if (nodes.length === 1 && nodes[0].nodeType === 3 && !nodes[0].data.trim()) {
	      return;
	    }
	    contents['default'] = extractFragment(content.childNodes, content);
	  }
	}

	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @return {DocumentFragment}
	 */

	function extractFragment(nodes, parent) {
	  var frag = document.createDocumentFragment();
	  nodes = toArray(nodes);
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i];
	    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	      parent.removeChild(node);
	      node = parseTemplate(node, true);
	    }
	    frag.appendChild(node);
	  }
	  return frag;
	}



	var compiler = Object.freeze({
		compile: compile,
		compileAndLinkProps: compileAndLinkProps,
		compileRoot: compileRoot,
		transclude: transclude,
		resolveSlots: resolveSlots
	});

	function stateMixin (Vue) {
	  /**
	   * Accessor for `$data` property, since setting $data
	   * requires observing the new object and updating
	   * proxied properties.
	   */

	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        this._setData(newData);
	      }
	    }
	  });

	  /**
	   * Setup the scope of an instance, which contains:
	   * - observed data
	   * - computed properties
	   * - user methods
	   * - meta properties
	   */

	  Vue.prototype._initState = function () {
	    this._initProps();
	    this._initMeta();
	    this._initMethods();
	    this._initData();
	    this._initComputed();
	  };

	  /**
	   * Initialize props.
	   */

	  Vue.prototype._initProps = function () {
	    var options = this.$options;
	    var el = options.el;
	    var props = options.props;
	    if (props && !el) {
	      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.', this);
	    }
	    // make sure to convert string selectors into element now
	    el = options.el = query(el);
	    this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compileAndLinkProps(this, el, props, this._scope) : null;
	  };

	  /**
	   * Initialize the data.
	   */

	  Vue.prototype._initData = function () {
	    var dataFn = this.$options.data;
	    var data = this._data = dataFn ? dataFn() : {};
	    if (!isPlainObject(data)) {
	      data = {};
	      process.env.NODE_ENV !== 'production' && warn('data functions should return an object.', this);
	    }
	    var props = this._props;
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var i, key;
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      // there are two scenarios where we can proxy a data key:
	      // 1. it's not already defined as a prop
	      // 2. it's provided via a instantiation option AND there are no
	      //    template prop present
	      if (!props || !hasOwn(props, key)) {
	        this._proxy(key);
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('Data field "' + key + '" is already defined ' + 'as a prop. To provide default value for a prop, use the "default" ' + 'prop option; if you want to pass prop values to an instantiation ' + 'call, use the "propsData" option.', this);
	      }
	    }
	    // observe data
	    observe(data, this);
	  };

	  /**
	   * Swap the instance's $data. Called in $data's setter.
	   *
	   * @param {Object} newData
	   */

	  Vue.prototype._setData = function (newData) {
	    newData = newData || {};
	    var oldData = this._data;
	    this._data = newData;
	    var keys, key, i;
	    // unproxy keys not present in new data
	    keys = Object.keys(oldData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!(key in newData)) {
	        this._unproxy(key);
	      }
	    }
	    // proxy keys not already proxied,
	    // and trigger change for changed values
	    keys = Object.keys(newData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!hasOwn(this, key)) {
	        // new property
	        this._proxy(key);
	      }
	    }
	    oldData.__ob__.removeVm(this);
	    observe(newData, this);
	    this._digest();
	  };

	  /**
	   * Proxy a property, so that
	   * vm.prop === vm._data.prop
	   *
	   * @param {String} key
	   */

	  Vue.prototype._proxy = function (key) {
	    if (!isReserved(key)) {
	      // need to store ref to self here
	      // because these getter/setters might
	      // be called by child scopes via
	      // prototype inheritance.
	      var self = this;
	      Object.defineProperty(self, key, {
	        configurable: true,
	        enumerable: true,
	        get: function proxyGetter() {
	          return self._data[key];
	        },
	        set: function proxySetter(val) {
	          self._data[key] = val;
	        }
	      });
	    }
	  };

	  /**
	   * Unproxy a property.
	   *
	   * @param {String} key
	   */

	  Vue.prototype._unproxy = function (key) {
	    if (!isReserved(key)) {
	      delete this[key];
	    }
	  };

	  /**
	   * Force update on every watcher in scope.
	   */

	  Vue.prototype._digest = function () {
	    for (var i = 0, l = this._watchers.length; i < l; i++) {
	      this._watchers[i].update(true); // shallow updates
	    }
	  };

	  /**
	   * Setup computed properties. They are essentially
	   * special getter/setters
	   */

	  function noop() {}
	  Vue.prototype._initComputed = function () {
	    var computed = this.$options.computed;
	    if (computed) {
	      for (var key in computed) {
	        var userDef = computed[key];
	        var def = {
	          enumerable: true,
	          configurable: true
	        };
	        if (typeof userDef === 'function') {
	          def.get = makeComputedGetter(userDef, this);
	          def.set = noop;
	        } else {
	          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
	          def.set = userDef.set ? bind(userDef.set, this) : noop;
	        }
	        Object.defineProperty(this, key, def);
	      }
	    }
	  };

	  function makeComputedGetter(getter, owner) {
	    var watcher = new Watcher(owner, getter, null, {
	      lazy: true
	    });
	    return function computedGetter() {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value;
	    };
	  }

	  /**
	   * Setup instance methods. Methods must be bound to the
	   * instance since they might be passed down as a prop to
	   * child components.
	   */

	  Vue.prototype._initMethods = function () {
	    var methods = this.$options.methods;
	    if (methods) {
	      for (var key in methods) {
	        this[key] = bind(methods[key], this);
	      }
	    }
	  };

	  /**
	   * Initialize meta information like $index, $key & $value.
	   */

	  Vue.prototype._initMeta = function () {
	    var metas = this.$options._meta;
	    if (metas) {
	      for (var key in metas) {
	        defineReactive(this, key, metas[key]);
	      }
	    }
	  };
	}

	var eventRE = /^v-on:|^@/;

	function eventsMixin (Vue) {
	  /**
	   * Setup the instance's option events & watchers.
	   * If the value is a string, we pull it from the
	   * instance's methods by name.
	   */

	  Vue.prototype._initEvents = function () {
	    var options = this.$options;
	    if (options._asComponent) {
	      registerComponentEvents(this, options.el);
	    }
	    registerCallbacks(this, '$on', options.events);
	    registerCallbacks(this, '$watch', options.watch);
	  };

	  /**
	   * Register v-on events on a child component
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   */

	  function registerComponentEvents(vm, el) {
	    var attrs = el.attributes;
	    var name, value, handler;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      name = attrs[i].name;
	      if (eventRE.test(name)) {
	        name = name.replace(eventRE, '');
	        // force the expression into a statement so that
	        // it always dynamically resolves the method to call (#2670)
	        // kinda ugly hack, but does the job.
	        value = attrs[i].value;
	        if (isSimplePath(value)) {
	          value += '.apply(this, $arguments)';
	        }
	        handler = (vm._scope || vm._context).$eval(value, true);
	        handler._fromParent = true;
	        vm.$on(name.replace(eventRE), handler);
	      }
	    }
	  }

	  /**
	   * Register callbacks for option events and watchers.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {Object} hash
	   */

	  function registerCallbacks(vm, action, hash) {
	    if (!hash) return;
	    var handlers, key, i, j;
	    for (key in hash) {
	      handlers = hash[key];
	      if (isArray(handlers)) {
	        for (i = 0, j = handlers.length; i < j; i++) {
	          register(vm, action, key, handlers[i]);
	        }
	      } else {
	        register(vm, action, key, handlers);
	      }
	    }
	  }

	  /**
	   * Helper to register an event/watch callback.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {String} key
	   * @param {Function|String|Object} handler
	   * @param {Object} [options]
	   */

	  function register(vm, action, key, handler, options) {
	    var type = typeof handler;
	    if (type === 'function') {
	      vm[action](key, handler, options);
	    } else if (type === 'string') {
	      var methods = vm.$options.methods;
	      var method = methods && methods[handler];
	      if (method) {
	        vm[action](key, method, options);
	      } else {
	        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".', vm);
	      }
	    } else if (handler && type === 'object') {
	      register(vm, action, key, handler.handler, handler);
	    }
	  }

	  /**
	   * Setup recursive attached/detached calls
	   */

	  Vue.prototype._initDOMHooks = function () {
	    this.$on('hook:attached', onAttached);
	    this.$on('hook:detached', onDetached);
	  };

	  /**
	   * Callback to recursively call attached hook on children
	   */

	  function onAttached() {
	    if (!this._isAttached) {
	      this._isAttached = true;
	      this.$children.forEach(callAttach);
	    }
	  }

	  /**
	   * Iterator to call attached hook
	   *
	   * @param {Vue} child
	   */

	  function callAttach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }

	  /**
	   * Callback to recursively call detached hook on children
	   */

	  function onDetached() {
	    if (this._isAttached) {
	      this._isAttached = false;
	      this.$children.forEach(callDetach);
	    }
	  }

	  /**
	   * Iterator to call detached hook
	   *
	   * @param {Vue} child
	   */

	  function callDetach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }

	  /**
	   * Trigger all handlers for a hook
	   *
	   * @param {String} hook
	   */

	  Vue.prototype._callHook = function (hook) {
	    this.$emit('pre-hook:' + hook);
	    var handlers = this.$options[hook];
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        handlers[i].call(this);
	      }
	    }
	    this.$emit('hook:' + hook);
	  };
	}

	function noop$1() {}

	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Object} [modifiers]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} arg
	 *                 - {String} raw
	 *                 - {String} [ref]
	 *                 - {Array<Object>} [interp]
	 *                 - {Boolean} [hasOneTime]
	 * @param {Vue} vm
	 * @param {Node} el
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	function Directive(descriptor, vm, el, host, scope, frag) {
	  this.vm = vm;
	  this.el = el;
	  // copy descriptor properties
	  this.descriptor = descriptor;
	  this.name = descriptor.name;
	  this.expression = descriptor.expression;
	  this.arg = descriptor.arg;
	  this.modifiers = descriptor.modifiers;
	  this.filters = descriptor.filters;
	  this.literal = this.modifiers && this.modifiers.literal;
	  // private
	  this._locked = false;
	  this._bound = false;
	  this._listeners = null;
	  // link context
	  this._host = host;
	  this._scope = scope;
	  this._frag = frag;
	  // store directives on node in dev mode
	  if (process.env.NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || [];
	    this.el._vue_directives.push(this);
	  }
	}

	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 */

	Directive.prototype._bind = function () {
	  var name = this.name;
	  var descriptor = this.descriptor;

	  // remove attribute
	  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	    var attr = descriptor.attr || 'v-' + name;
	    this.el.removeAttribute(attr);
	  }

	  // copy def properties
	  var def = descriptor.def;
	  if (typeof def === 'function') {
	    this.update = def;
	  } else {
	    extend(this, def);
	  }

	  // setup directive params
	  this._setupParams();

	  // initial bind
	  if (this.bind) {
	    this.bind();
	  }
	  this._bound = true;

	  if (this.literal) {
	    this.update && this.update(descriptor.raw);
	  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	    // wrapped updater for context
	    var dir = this;
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal);
	        }
	      };
	    } else {
	      this._update = noop$1;
	    }
	    var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
	    var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
	    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	    {
	      filters: this.filters,
	      twoWay: this.twoWay,
	      deep: this.deep,
	      preProcess: preProcess,
	      postProcess: postProcess,
	      scope: this._scope
	    });
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind();
	    } else if (this.update) {
	      this.update(watcher.value);
	    }
	  }
	};

	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */

	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return;
	  }
	  var params = this.params;
	  // swap the params array with a fresh object.
	  this.params = Object.create(null);
	  var i = params.length;
	  var key, val, mappedKey;
	  while (i--) {
	    key = hyphenate(params[i]);
	    mappedKey = camelize(key);
	    val = getBindAttr(this.el, key);
	    if (val != null) {
	      // dynamic
	      this._setupParamWatcher(mappedKey, val);
	    } else {
	      // static
	      val = getAttr(this.el, key);
	      if (val != null) {
	        this.params[mappedKey] = val === '' ? true : val;
	      }
	    }
	  }
	};

	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */

	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this;
	  var called = false;
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val;
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key];
	      if (cb) {
	        cb.call(self, val, oldVal);
	      }
	    } else {
	      called = true;
	    }
	  }, {
	    immediate: true,
	    user: false
	  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	};

	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */

	Directive.prototype._checkStatement = function () {
	  var expression = this.expression;
	  if (expression && this.acceptStatement && !isSimplePath(expression)) {
	    var fn = parseExpression(expression).get;
	    var scope = this._scope || this.vm;
	    var handler = function handler(e) {
	      scope.$event = e;
	      fn.call(scope, scope);
	      scope.$event = null;
	    };
	    if (this.filters) {
	      handler = scope._applyFilters(handler, null, this.filters);
	    }
	    this.update(handler);
	    return true;
	  }
	};

	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */

	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value);
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn('Directive.set() can only be used inside twoWay' + 'directives.');
	  }
	};

	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */

	Directive.prototype._withLock = function (fn) {
	  var self = this;
	  self._locked = true;
	  fn.call(self);
	  nextTick(function () {
	    self._locked = false;
	  });
	};

	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 * @param {Boolean} [useCapture]
	 */

	Directive.prototype.on = function (event, handler, useCapture) {
	  on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
	};

	/**
	 * Teardown the watcher and call unbind.
	 */

	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false;
	    if (this.unbind) {
	      this.unbind();
	    }
	    if (this._watcher) {
	      this._watcher.teardown();
	    }
	    var listeners = this._listeners;
	    var i;
	    if (listeners) {
	      i = listeners.length;
	      while (i--) {
	        off(this.el, listeners[i][0], listeners[i][1]);
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns;
	    if (unwatchFns) {
	      i = unwatchFns.length;
	      while (i--) {
	        unwatchFns[i]();
	      }
	    }
	    if (process.env.NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this);
	    }
	    this.vm = this.el = this._watcher = this._listeners = null;
	  }
	};

	function lifecycleMixin (Vue) {
	  /**
	   * Update v-ref for component.
	   *
	   * @param {Boolean} remove
	   */

	  Vue.prototype._updateRef = function (remove) {
	    var ref = this.$options._ref;
	    if (ref) {
	      var refs = (this._scope || this._context).$refs;
	      if (remove) {
	        if (refs[ref] === this) {
	          refs[ref] = null;
	        }
	      } else {
	        refs[ref] = this;
	      }
	    }
	  };

	  /**
	   * Transclude, compile and link element.
	   *
	   * If a pre-compiled linker is available, that means the
	   * passed in element will be pre-transcluded and compiled
	   * as well - all we need to do is to call the linker.
	   *
	   * Otherwise we need to call transclude/compile/link here.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._compile = function (el) {
	    var options = this.$options;

	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el;
	    el = transclude(el, options);
	    this._initElement(el);

	    // handle v-pre on root node (#2026)
	    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
	      return;
	    }

	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var contextOptions = this._context && this._context.$options;
	    var rootLinker = compileRoot(el, options, contextOptions);

	    // resolve slot distribution
	    resolveSlots(this, options._content);

	    // compile and link the rest
	    var contentLinkFn;
	    var ctor = this.constructor;
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker;
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compile(el, options);
	      }
	    }

	    // link phase
	    // make sure to link root with prop scope!
	    var rootUnlinkFn = rootLinker(this, el, this._scope);
	    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);

	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn();
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true);
	    };

	    // finally replace original
	    if (options.replace) {
	      replace(original, el);
	    }

	    this._isCompiled = true;
	    this._callHook('compiled');
	  };

	  /**
	   * Initialize instance element. Called in the public
	   * $mount() method.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._initElement = function (el) {
	    if (isFragment(el)) {
	      this._isFragment = true;
	      this.$el = this._fragmentStart = el.firstChild;
	      this._fragmentEnd = el.lastChild;
	      // set persisted text anchors to empty
	      if (this._fragmentStart.nodeType === 3) {
	        this._fragmentStart.data = this._fragmentEnd.data = '';
	      }
	      this._fragment = el;
	    } else {
	      this.$el = el;
	    }
	    this.$el.__vue__ = this;
	    this._callHook('beforeCompile');
	  };

	  /**
	   * Create and bind a directive to an element.
	   *
	   * @param {Object} descriptor - parsed directive descriptor
	   * @param {Node} node   - target node
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   */

	  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	  };

	  /**
	   * Teardown an instance, unobserves the data, unbind all the
	   * directives, turn off all the event listeners, etc.
	   *
	   * @param {Boolean} remove - whether to remove the DOM node.
	   * @param {Boolean} deferCleanup - if true, defer cleanup to
	   *                                 be called later
	   */

	  Vue.prototype._destroy = function (remove, deferCleanup) {
	    if (this._isBeingDestroyed) {
	      if (!deferCleanup) {
	        this._cleanup();
	      }
	      return;
	    }

	    var destroyReady;
	    var pendingRemoval;

	    var self = this;
	    // Cleanup should be called either synchronously or asynchronoysly as
	    // callback of this.$remove(), or if remove and deferCleanup are false.
	    // In any case it should be called after all other removing, unbinding and
	    // turning of is done
	    var cleanupIfPossible = function cleanupIfPossible() {
	      if (destroyReady && !pendingRemoval && !deferCleanup) {
	        self._cleanup();
	      }
	    };

	    // remove DOM element
	    if (remove && this.$el) {
	      pendingRemoval = true;
	      this.$remove(function () {
	        pendingRemoval = false;
	        cleanupIfPossible();
	      });
	    }

	    this._callHook('beforeDestroy');
	    this._isBeingDestroyed = true;
	    var i;
	    // remove self from parent. only necessary
	    // if parent is not being destroyed as well.
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      parent.$children.$remove(this);
	      // unregister ref (remove: true)
	      this._updateRef(true);
	    }
	    // destroy all children.
	    i = this.$children.length;
	    while (i--) {
	      this.$children[i].$destroy();
	    }
	    // teardown props
	    if (this._propsUnlinkFn) {
	      this._propsUnlinkFn();
	    }
	    // teardown all directives. this also tearsdown all
	    // directive-owned watchers.
	    if (this._unlinkFn) {
	      this._unlinkFn();
	    }
	    i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference to self on $el
	    if (this.$el) {
	      this.$el.__vue__ = null;
	    }

	    destroyReady = true;
	    cleanupIfPossible();
	  };

	  /**
	   * Clean up to ensure garbage collection.
	   * This is called after the leave transition if there
	   * is any.
	   */

	  Vue.prototype._cleanup = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    // remove self from owner fragment
	    // do it in cleanup so that we can call $destroy with
	    // defer right when a fragment is about to be removed.
	    if (this._frag) {
	      this._frag.children.$remove(this);
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data && this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // Clean up references to private properties and other
	    // instances. preserve reference to _data so that proxy
	    // accessors still work. The only potential side effect
	    // here is that mutating the instance after it's destroyed
	    // may affect the state of other components that are still
	    // observing the same object, but that seems to be a
	    // reasonable responsibility for the user rather than
	    // always throwing an error on them.
	    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	    // call the last hook...
	    this._isDestroyed = true;
	    this._callHook('destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}

	function miscMixin (Vue) {
	  /**
	   * Apply a list of filter (descriptors) to a value.
	   * Using plain for loops here because this will be called in
	   * the getter of any watcher with filters so it is very
	   * performance sensitive.
	   *
	   * @param {*} value
	   * @param {*} [oldValue]
	   * @param {Array} filters
	   * @param {Boolean} write
	   * @return {*}
	   */

	  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	    var filter, fn, args, arg, offset, i, l, j, k;
	    for (i = 0, l = filters.length; i < l; i++) {
	      filter = filters[write ? l - i - 1 : i];
	      fn = resolveAsset(this.$options, 'filters', filter.name, true);
	      if (!fn) continue;
	      fn = write ? fn.write : fn.read || fn;
	      if (typeof fn !== 'function') continue;
	      args = write ? [value, oldValue] : [value];
	      offset = write ? 2 : 1;
	      if (filter.args) {
	        for (j = 0, k = filter.args.length; j < k; j++) {
	          arg = filter.args[j];
	          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	        }
	      }
	      value = fn.apply(this, args);
	    }
	    return value;
	  };

	  /**
	   * Resolve a component, depending on whether the component
	   * is defined normally or using an async factory function.
	   * Resolves synchronously if already resolved, otherwise
	   * resolves asynchronously and caches the resolved
	   * constructor on the factory.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */

	  Vue.prototype._resolveComponent = function (value, cb) {
	    var factory;
	    if (typeof value === 'function') {
	      factory = value;
	    } else {
	      factory = resolveAsset(this.$options, 'components', value, true);
	    }
	    /* istanbul ignore if */
	    if (!factory) {
	      return;
	    }
	    // async component factory
	    if (!factory.options) {
	      if (factory.resolved) {
	        // cached
	        cb(factory.resolved);
	      } else if (factory.requested) {
	        // pool callbacks
	        factory.pendingCallbacks.push(cb);
	      } else {
	        factory.requested = true;
	        var cbs = factory.pendingCallbacks = [cb];
	        factory.call(this, function resolve(res) {
	          if (isPlainObject(res)) {
	            res = Vue.extend(res);
	          }
	          // cache resolved
	          factory.resolved = res;
	          // invoke callbacks
	          for (var i = 0, l = cbs.length; i < l; i++) {
	            cbs[i](res);
	          }
	        }, function reject(reason) {
	          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component' + (typeof value === 'string' ? ': ' + value : '') + '. ' + (reason ? '\nReason: ' + reason : ''));
	        });
	      }
	    } else {
	      // normal component
	      cb(factory);
	    }
	  };
	}

	var filterRE$1 = /[^|]\|[^|]/;

	function dataAPI (Vue) {
	  /**
	   * Get the value from an expression on this vm.
	   *
	   * @param {String} exp
	   * @param {Boolean} [asStatement]
	   * @return {*}
	   */

	  Vue.prototype.$get = function (exp, asStatement) {
	    var res = parseExpression(exp);
	    if (res) {
	      if (asStatement) {
	        var self = this;
	        return function statementHandler() {
	          self.$arguments = toArray(arguments);
	          var result = res.get.call(self, self);
	          self.$arguments = null;
	          return result;
	        };
	      } else {
	        try {
	          return res.get.call(this, this);
	        } catch (e) {}
	      }
	    }
	  };

	  /**
	   * Set the value from an expression on this vm.
	   * The expression must be a valid left-hand
	   * expression in an assignment.
	   *
	   * @param {String} exp
	   * @param {*} val
	   */

	  Vue.prototype.$set = function (exp, val) {
	    var res = parseExpression(exp, true);
	    if (res && res.set) {
	      res.set.call(this, this, val);
	    }
	  };

	  /**
	   * Delete a property on the VM
	   *
	   * @param {String} key
	   */

	  Vue.prototype.$delete = function (key) {
	    del(this._data, key);
	  };

	  /**
	   * Watch an expression, trigger callback when its
	   * value changes.
	   *
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} [options]
	   *                 - {Boolean} deep
	   *                 - {Boolean} immediate
	   * @return {Function} - unwatchFn
	   */

	  Vue.prototype.$watch = function (expOrFn, cb, options) {
	    var vm = this;
	    var parsed;
	    if (typeof expOrFn === 'string') {
	      parsed = parseDirective(expOrFn);
	      expOrFn = parsed.expression;
	    }
	    var watcher = new Watcher(vm, expOrFn, cb, {
	      deep: options && options.deep,
	      sync: options && options.sync,
	      filters: parsed && parsed.filters,
	      user: !options || options.user !== false
	    });
	    if (options && options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };

	  /**
	   * Evaluate a text directive, including filters.
	   *
	   * @param {String} text
	   * @param {Boolean} [asStatement]
	   * @return {String}
	   */

	  Vue.prototype.$eval = function (text, asStatement) {
	    // check for filters.
	    if (filterRE$1.test(text)) {
	      var dir = parseDirective(text);
	      // the filter regex check might give false positive
	      // for pipes inside strings, so it's possible that
	      // we don't get any filters here
	      var val = this.$get(dir.expression, asStatement);
	      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	    } else {
	      // no filter
	      return this.$get(text, asStatement);
	    }
	  };

	  /**
	   * Interpolate a piece of template text.
	   *
	   * @param {String} text
	   * @return {String}
	   */

	  Vue.prototype.$interpolate = function (text) {
	    var tokens = parseText(text);
	    var vm = this;
	    if (tokens) {
	      if (tokens.length === 1) {
	        return vm.$eval(tokens[0].value) + '';
	      } else {
	        return tokens.map(function (token) {
	          return token.tag ? vm.$eval(token.value) : token.value;
	        }).join('');
	      }
	    } else {
	      return text;
	    }
	  };

	  /**
	   * Log instance data as a plain JS object
	   * so that it is easier to inspect in console.
	   * This method assumes console is available.
	   *
	   * @param {String} [path]
	   */

	  Vue.prototype.$log = function (path) {
	    var data = path ? getPath(this._data, path) : this._data;
	    if (data) {
	      data = clean(data);
	    }
	    // include computed fields
	    if (!path) {
	      var key;
	      for (key in this.$options.computed) {
	        data[key] = clean(this[key]);
	      }
	      if (this._props) {
	        for (key in this._props) {
	          data[key] = clean(this[key]);
	        }
	      }
	    }
	    console.log(data);
	  };

	  /**
	   * "clean" a getter/setter converted object into a plain
	   * object copy.
	   *
	   * @param {Object} - obj
	   * @return {Object}
	   */

	  function clean(obj) {
	    return JSON.parse(JSON.stringify(obj));
	  }
	}

	function domAPI (Vue) {
	  /**
	   * Convenience on-instance nextTick. The callback is
	   * auto-bound to the instance, and this avoids component
	   * modules having to rely on the global Vue.
	   *
	   * @param {Function} fn
	   */

	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };

	  /**
	   * Append instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$appendTo = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, append, appendWithTransition);
	  };

	  /**
	   * Prepend instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$prependTo = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.hasChildNodes()) {
	      this.$before(target.firstChild, cb, withTransition);
	    } else {
	      this.$appendTo(target, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Insert instance before target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$before = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	  };

	  /**
	   * Insert instance after target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$after = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.nextSibling) {
	      this.$before(target.nextSibling, cb, withTransition);
	    } else {
	      this.$appendTo(target.parentNode, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Remove instance from DOM
	   *
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$remove = function (cb, withTransition) {
	    if (!this.$el.parentNode) {
	      return cb && cb();
	    }
	    var inDocument = this._isAttached && inDoc(this.$el);
	    // if we are not in document, no need to check
	    // for transitions
	    if (!inDocument) withTransition = false;
	    var self = this;
	    var realCb = function realCb() {
	      if (inDocument) self._callHook('detached');
	      if (cb) cb();
	    };
	    if (this._isFragment) {
	      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	    } else {
	      var op = withTransition === false ? removeWithCb : removeWithTransition;
	      op(this.$el, this, realCb);
	    }
	    return this;
	  };

	  /**
	   * Shared DOM insertion function.
	   *
	   * @param {Vue} vm
	   * @param {Element} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition]
	   * @param {Function} op1 - op for non-transition insert
	   * @param {Function} op2 - op for transition insert
	   * @return vm
	   */

	  function insert(vm, target, cb, withTransition, op1, op2) {
	    target = query(target);
	    var targetIsDetached = !inDoc(target);
	    var op = withTransition === false || targetIsDetached ? op1 : op2;
	    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	    if (vm._isFragment) {
	      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	        op(node, target, vm);
	      });
	      cb && cb();
	    } else {
	      op(vm.$el, target, vm, cb);
	    }
	    if (shouldCallHook) {
	      vm._callHook('attached');
	    }
	    return vm;
	  }

	  /**
	   * Check for selectors
	   *
	   * @param {String|Element} el
	   */

	  function query(el) {
	    return typeof el === 'string' ? document.querySelector(el) : el;
	  }

	  /**
	   * Append operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function append(el, target, vm, cb) {
	    target.appendChild(el);
	    if (cb) cb();
	  }

	  /**
	   * InsertBefore operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function beforeWithCb(el, target, vm, cb) {
	    before(el, target);
	    if (cb) cb();
	  }

	  /**
	   * Remove operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function removeWithCb(el, vm, cb) {
	    remove(el);
	    if (cb) cb();
	  }
	}

	function eventsAPI (Vue) {
	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    modifyListenerCount(this, event, 1);
	    return this;
	  };

	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };

	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      if (this.$parent) {
	        for (event in this._events) {
	          cbs = this._events[event];
	          if (cbs) {
	            modifyListenerCount(this, event, -cbs.length);
	          }
	        }
	      }
	      this._events = {};
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      modifyListenerCount(this, event, -cbs.length);
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        modifyListenerCount(this, event, -1);
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };

	  /**
	   * Trigger an event on self.
	   *
	   * @param {String|Object} event
	   * @return {Boolean} shouldPropagate
	   */

	  Vue.prototype.$emit = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    var cbs = this._events[event];
	    var shouldPropagate = isSource || !cbs;
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      // this is a somewhat hacky solution to the question raised
	      // in #2102: for an inline component listener like <comp @test="doThis">,
	      // the propagation handling is somewhat broken. Therefore we
	      // need to treat these inline callbacks differently.
	      var hasParentCbs = isSource && cbs.some(function (cb) {
	        return cb._fromParent;
	      });
	      if (hasParentCbs) {
	        shouldPropagate = false;
	      }
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        var cb = cbs[i];
	        var res = cb.apply(this, args);
	        if (res === true && (!hasParentCbs || cb._fromParent)) {
	          shouldPropagate = true;
	        }
	      }
	    }
	    return shouldPropagate;
	  };

	  /**
	   * Recursively broadcast an event to all children instances.
	   *
	   * @param {String|Object} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$broadcast = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    // if no child has registered for this event,
	    // then there's no need to broadcast.
	    if (!this._eventsCount[event]) return;
	    var children = this.$children;
	    var args = toArray(arguments);
	    if (isSource) {
	      // use object event to indicate non-source emit
	      // on children
	      args[0] = { name: event, source: this };
	    }
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var shouldPropagate = child.$emit.apply(child, args);
	      if (shouldPropagate) {
	        child.$broadcast.apply(child, args);
	      }
	    }
	    return this;
	  };

	  /**
	   * Recursively propagate an event up the parent chain.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$dispatch = function (event) {
	    var shouldPropagate = this.$emit.apply(this, arguments);
	    if (!shouldPropagate) return;
	    var parent = this.$parent;
	    var args = toArray(arguments);
	    // use object event to indicate non-source emit
	    // on parents
	    args[0] = { name: event, source: this };
	    while (parent) {
	      shouldPropagate = parent.$emit.apply(parent, args);
	      parent = shouldPropagate ? parent.$parent : null;
	    }
	    return this;
	  };

	  /**
	   * Modify the listener counts on all parents.
	   * This bookkeeping allows $broadcast to return early when
	   * no child has listened to a certain event.
	   *
	   * @param {Vue} vm
	   * @param {String} event
	   * @param {Number} count
	   */

	  var hookRE = /^hook:/;
	  function modifyListenerCount(vm, event, count) {
	    var parent = vm.$parent;
	    // hooks do not get broadcasted so no need
	    // to do bookkeeping for them
	    if (!parent || !count || hookRE.test(event)) return;
	    while (parent) {
	      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	      parent = parent.$parent;
	    }
	  }
	}

	function lifecycleAPI (Vue) {
	  /**
	   * Set instance target element and kick off the compilation
	   * process. The passed in `el` can be a selector string, an
	   * existing Element, or a DocumentFragment (for block
	   * instances).
	   *
	   * @param {Element|DocumentFragment|string} el
	   * @public
	   */

	  Vue.prototype.$mount = function (el) {
	    if (this._isCompiled) {
	      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.', this);
	      return;
	    }
	    el = query(el);
	    if (!el) {
	      el = document.createElement('div');
	    }
	    this._compile(el);
	    this._initDOMHooks();
	    if (inDoc(this.$el)) {
	      this._callHook('attached');
	      ready.call(this);
	    } else {
	      this.$once('hook:attached', ready);
	    }
	    return this;
	  };

	  /**
	   * Mark an instance as ready.
	   */

	  function ready() {
	    this._isAttached = true;
	    this._isReady = true;
	    this._callHook('ready');
	  }

	  /**
	   * Teardown the instance, simply delegate to the internal
	   * _destroy.
	   *
	   * @param {Boolean} remove
	   * @param {Boolean} deferCleanup
	   */

	  Vue.prototype.$destroy = function (remove, deferCleanup) {
	    this._destroy(remove, deferCleanup);
	  };

	  /**
	   * Partially compile a piece of DOM and return a
	   * decompile function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host]
	   * @param {Object} [scope]
	   * @param {Fragment} [frag]
	   * @return {Function}
	   */

	  Vue.prototype.$compile = function (el, host, scope, frag) {
	    return compile(el, this.$options, true)(this, el, host, scope, frag);
	  };
	}

	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefixed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */

	function Vue(options) {
	  this._init(options);
	}

	// install internals
	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	miscMixin(Vue);

	// install instance APIs
	dataAPI(Vue);
	domAPI(Vue);
	eventsAPI(Vue);
	lifecycleAPI(Vue);

	var slot = {

	  priority: SLOT,
	  params: ['name'],

	  bind: function bind() {
	    // this was resolved during component transclusion
	    var name = this.params.name || 'default';
	    var content = this.vm._slotContents && this.vm._slotContents[name];
	    if (!content || !content.hasChildNodes()) {
	      this.fallback();
	    } else {
	      this.compile(content.cloneNode(true), this.vm._context, this.vm);
	    }
	  },

	  compile: function compile(content, context, host) {
	    if (content && context) {
	      if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
	        // if the inserted slot has v-if
	        // inject fallback content as the v-else
	        var elseBlock = document.createElement('template');
	        elseBlock.setAttribute('v-else', '');
	        elseBlock.innerHTML = this.el.innerHTML;
	        // the else block should be compiled in child scope
	        elseBlock._context = this.vm;
	        content.appendChild(elseBlock);
	      }
	      var scope = host ? host._scope : this._scope;
	      this.unlink = context.$compile(content, host, scope, this._frag);
	    }
	    if (content) {
	      replace(this.el, content);
	    } else {
	      remove(this.el);
	    }
	  },

	  fallback: function fallback() {
	    this.compile(extractContent(this.el, true), this.vm);
	  },

	  unbind: function unbind() {
	    if (this.unlink) {
	      this.unlink();
	    }
	  }
	};

	var partial = {

	  priority: PARTIAL,

	  params: ['name'],

	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function name(value) {
	      vIf.remove.call(this);
	      if (value) {
	        this.insert(value);
	      }
	    }
	  },

	  bind: function bind() {
	    this.anchor = createAnchor('v-partial');
	    replace(this.el, this.anchor);
	    this.insert(this.params.name);
	  },

	  insert: function insert(id) {
	    var partial = resolveAsset(this.vm.$options, 'partials', id, true);
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial);
	      vIf.insert.call(this);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};

	var elementDirectives = {
	  slot: slot,
	  partial: partial
	};

	var convertArray = vFor._postProcess;

	/**
	 * Limit filter for arrays
	 *
	 * @param {Number} n
	 * @param {Number} offset (Decimal expected)
	 */

	function limitBy(arr, n, offset) {
	  offset = offset ? parseInt(offset, 10) : 0;
	  n = toNumber(n);
	  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} search
	 * @param {String} [delimiter]
	 * @param {String} ...dataKeys
	 */

	function filterBy(arr, search, delimiter) {
	  arr = convertArray(arr);
	  if (search == null) {
	    return arr;
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search);
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase();
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2;
	  // extract and flatten keys
	  var keys = Array.prototype.concat.apply([], toArray(arguments, n));
	  var res = [];
	  var item, key, val, j;
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i];
	    val = item && item.$value || item;
	    j = keys.length;
	    if (j) {
	      while (j--) {
	        key = keys[j];
	        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
	          res.push(item);
	          break;
	        }
	      }
	    } else if (contains(item, search)) {
	      res.push(item);
	    }
	  }
	  return res;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String|Array<String>|Function} ...sortKeys
	 * @param {Number} [order]
	 */

	function orderBy(arr) {
	  var comparator = null;
	  var sortKeys = undefined;
	  arr = convertArray(arr);

	  // determine order (last argument)
	  var args = toArray(arguments, 1);
	  var order = args[args.length - 1];
	  if (typeof order === 'number') {
	    order = order < 0 ? -1 : 1;
	    args = args.length > 1 ? args.slice(0, -1) : args;
	  } else {
	    order = 1;
	  }

	  // determine sortKeys & comparator
	  var firstArg = args[0];
	  if (!firstArg) {
	    return arr;
	  } else if (typeof firstArg === 'function') {
	    // custom comparator
	    comparator = function (a, b) {
	      return firstArg(a, b) * order;
	    };
	  } else {
	    // string keys. flatten first
	    sortKeys = Array.prototype.concat.apply([], args);
	    comparator = function (a, b, i) {
	      i = i || 0;
	      return i >= sortKeys.length - 1 ? baseCompare(a, b, i) : baseCompare(a, b, i) || comparator(a, b, i + 1);
	    };
	  }

	  function baseCompare(a, b, sortKeyIndex) {
	    var sortKey = sortKeys[sortKeyIndex];
	    if (sortKey) {
	      if (sortKey !== '$key') {
	        if (isObject(a) && '$value' in a) a = a.$value;
	        if (isObject(b) && '$value' in b) b = b.$value;
	      }
	      a = isObject(a) ? getPath(a, sortKey) : a;
	      b = isObject(b) ? getPath(b, sortKey) : b;
	    }
	    return a === b ? 0 : a > b ? order : -order;
	  }

	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(comparator);
	}

	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */

	function contains(val, search) {
	  var i;
	  if (isPlainObject(val)) {
	    var keys = Object.keys(val);
	    i = keys.length;
	    while (i--) {
	      if (contains(val[keys[i]], search)) {
	        return true;
	      }
	    }
	  } else if (isArray(val)) {
	    i = val.length;
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true;
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1;
	  }
	}

	var digitsRE = /(\d{3})(?=\d)/g;

	// asset collections must be a plain object.
	var filters = {

	  orderBy: orderBy,
	  filterBy: filterBy,
	  limitBy: limitBy,

	  /**
	   * Stringify value.
	   *
	   * @param {Number} indent
	   */

	  json: {
	    read: function read(value, indent) {
	      return typeof value === 'string' ? value : JSON.stringify(value, null, arguments.length > 1 ? indent : 2);
	    },
	    write: function write(value) {
	      try {
	        return JSON.parse(value);
	      } catch (e) {
	        return value;
	      }
	    }
	  },

	  /**
	   * 'abc' => 'Abc'
	   */

	  capitalize: function capitalize(value) {
	    if (!value && value !== 0) return '';
	    value = value.toString();
	    return value.charAt(0).toUpperCase() + value.slice(1);
	  },

	  /**
	   * 'abc' => 'ABC'
	   */

	  uppercase: function uppercase(value) {
	    return value || value === 0 ? value.toString().toUpperCase() : '';
	  },

	  /**
	   * 'AbC' => 'abc'
	   */

	  lowercase: function lowercase(value) {
	    return value || value === 0 ? value.toString().toLowerCase() : '';
	  },

	  /**
	   * 12345 => $12,345.00
	   *
	   * @param {String} sign
	   * @param {Number} decimals Decimal places
	   */

	  currency: function currency(value, _currency, decimals) {
	    value = parseFloat(value);
	    if (!isFinite(value) || !value && value !== 0) return '';
	    _currency = _currency != null ? _currency : '$';
	    decimals = decimals != null ? decimals : 2;
	    var stringified = Math.abs(value).toFixed(decimals);
	    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
	    var i = _int.length % 3;
	    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	    var _float = decimals ? stringified.slice(-1 - decimals) : '';
	    var sign = value < 0 ? '-' : '';
	    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	  },

	  /**
	   * 'item' => 'items'
	   *
	   * @params
	   *  an array of strings corresponding to
	   *  the single, double, triple ... forms of the word to
	   *  be pluralized. When the number to be pluralized
	   *  exceeds the length of the args, it will use the last
	   *  entry in the array.
	   *
	   *  e.g. ['single', 'double', 'triple', 'multiple']
	   */

	  pluralize: function pluralize(value) {
	    var args = toArray(arguments, 1);
	    var length = args.length;
	    if (length > 1) {
	      var index = value % 10 - 1;
	      return index in args ? args[index] : args[length - 1];
	    } else {
	      return args[0] + (value === 1 ? '' : 's');
	    }
	  },

	  /**
	   * Debounce a handler function.
	   *
	   * @param {Function} handler
	   * @param {Number} delay = 300
	   * @return {Function}
	   */

	  debounce: function debounce(handler, delay) {
	    if (!handler) return;
	    if (!delay) {
	      delay = 300;
	    }
	    return _debounce(handler, delay);
	  }
	};

	function installGlobalAPI (Vue) {
	  /**
	   * Vue and every constructor that extends Vue has an
	   * associated options object, which can be accessed during
	   * compilation steps as `this.constructor.options`.
	   *
	   * These can be seen as the default options of every
	   * Vue instance.
	   */

	  Vue.options = {
	    directives: directives,
	    elementDirectives: elementDirectives,
	    filters: filters,
	    transitions: {},
	    components: {},
	    partials: {},
	    replace: true
	  };

	  /**
	   * Expose useful internals
	   */

	  Vue.util = util;
	  Vue.config = config;
	  Vue.set = set;
	  Vue['delete'] = del;
	  Vue.nextTick = nextTick;

	  /**
	   * The following are exposed for advanced usage / plugins
	   */

	  Vue.compiler = compiler;
	  Vue.FragmentFactory = FragmentFactory;
	  Vue.internalDirectives = internalDirectives;
	  Vue.parsers = {
	    path: path,
	    text: text,
	    template: template,
	    directive: directive,
	    expression: expression
	  };

	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */

	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */

	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
	        name = null;
	      }
	    }
	    var Sub = createClass(name || 'VueComponent');
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };

	  /**
	   * A function that returns a sub-class constructor with the
	   * given name. This gives us much nicer output when
	   * logging instances in the console.
	   *
	   * @param {String} name
	   * @return {Function}
	   */

	  function createClass(name) {
	    /* eslint-disable no-new-func */
	    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	    /* eslint-enable no-new-func */
	  }

	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */

	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };

	  /**
	   * Apply a global mixin by merging it into the default
	   * options.
	   */

	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };

	  /**
	   * Create asset registration methods with the following
	   * signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */

	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
	            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          if (!definition.name) {
	            definition.name = id;
	          }
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });

	  // expose internal transition API
	  extend(Vue.transition, transition);
	}

	installGlobalAPI(Vue);

	Vue.version = '1.0.26';

	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue);
	    } else if (process.env.NODE_ENV !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
	      console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	    }
	  }
	}, 0);

	module.exports = Vue;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(2), __webpack_require__(3)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * vue-router v0.7.13
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  global.VueRouter = factory();
	}(this, function () { 'use strict';

	  var babelHelpers = {};

	  babelHelpers.classCallCheck = function (instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  };
	  function Target(path, matcher, delegate) {
	    this.path = path;
	    this.matcher = matcher;
	    this.delegate = delegate;
	  }

	  Target.prototype = {
	    to: function to(target, callback) {
	      var delegate = this.delegate;

	      if (delegate && delegate.willAddRoute) {
	        target = delegate.willAddRoute(this.matcher.target, target);
	      }

	      this.matcher.add(this.path, target);

	      if (callback) {
	        if (callback.length === 0) {
	          throw new Error("You must have an argument in the function passed to `to`");
	        }
	        this.matcher.addChild(this.path, target, callback, this.delegate);
	      }
	      return this;
	    }
	  };

	  function Matcher(target) {
	    this.routes = {};
	    this.children = {};
	    this.target = target;
	  }

	  Matcher.prototype = {
	    add: function add(path, handler) {
	      this.routes[path] = handler;
	    },

	    addChild: function addChild(path, target, callback, delegate) {
	      var matcher = new Matcher(target);
	      this.children[path] = matcher;

	      var match = generateMatch(path, matcher, delegate);

	      if (delegate && delegate.contextEntered) {
	        delegate.contextEntered(target, match);
	      }

	      callback(match);
	    }
	  };

	  function generateMatch(startingPath, matcher, delegate) {
	    return function (path, nestedCallback) {
	      var fullPath = startingPath + path;

	      if (nestedCallback) {
	        nestedCallback(generateMatch(fullPath, matcher, delegate));
	      } else {
	        return new Target(startingPath + path, matcher, delegate);
	      }
	    };
	  }

	  function addRoute(routeArray, path, handler) {
	    var len = 0;
	    for (var i = 0, l = routeArray.length; i < l; i++) {
	      len += routeArray[i].path.length;
	    }

	    path = path.substr(len);
	    var route = { path: path, handler: handler };
	    routeArray.push(route);
	  }

	  function eachRoute(baseRoute, matcher, callback, binding) {
	    var routes = matcher.routes;

	    for (var path in routes) {
	      if (routes.hasOwnProperty(path)) {
	        var routeArray = baseRoute.slice();
	        addRoute(routeArray, path, routes[path]);

	        if (matcher.children[path]) {
	          eachRoute(routeArray, matcher.children[path], callback, binding);
	        } else {
	          callback.call(binding, routeArray);
	        }
	      }
	    }
	  }

	  function map (callback, addRouteCallback) {
	    var matcher = new Matcher();

	    callback(generateMatch("", matcher, this.delegate));

	    eachRoute([], matcher, function (route) {
	      if (addRouteCallback) {
	        addRouteCallback(this, route);
	      } else {
	        this.add(route);
	      }
	    }, this);
	  }

	  var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];

	  var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');

	  var noWarning = false;
	  function warn(msg) {
	    if (!noWarning && typeof console !== 'undefined') {
	      console.error('[vue-router] ' + msg);
	    }
	  }

	  function tryDecode(uri, asComponent) {
	    try {
	      return asComponent ? decodeURIComponent(uri) : decodeURI(uri);
	    } catch (e) {
	      warn('malformed URI' + (asComponent ? ' component: ' : ': ') + uri);
	    }
	  }

	  function isArray(test) {
	    return Object.prototype.toString.call(test) === "[object Array]";
	  }

	  // A Segment represents a segment in the original route description.
	  // Each Segment type provides an `eachChar` and `regex` method.
	  //
	  // The `eachChar` method invokes the callback with one or more character
	  // specifications. A character specification consumes one or more input
	  // characters.
	  //
	  // The `regex` method returns a regex fragment for the segment. If the
	  // segment is a dynamic of star segment, the regex fragment also includes
	  // a capture.
	  //
	  // A character specification contains:
	  //
	  // * `validChars`: a String with a list of all valid characters, or
	  // * `invalidChars`: a String with a list of all invalid characters
	  // * `repeat`: true if the character specification can repeat

	  function StaticSegment(string) {
	    this.string = string;
	  }
	  StaticSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      var string = this.string,
	          ch;

	      for (var i = 0, l = string.length; i < l; i++) {
	        ch = string.charAt(i);
	        callback({ validChars: ch });
	      }
	    },

	    regex: function regex() {
	      return this.string.replace(escapeRegex, '\\$1');
	    },

	    generate: function generate() {
	      return this.string;
	    }
	  };

	  function DynamicSegment(name) {
	    this.name = name;
	  }
	  DynamicSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      callback({ invalidChars: "/", repeat: true });
	    },

	    regex: function regex() {
	      return "([^/]+)";
	    },

	    generate: function generate(params) {
	      var val = params[this.name];
	      return val == null ? ":" + this.name : val;
	    }
	  };

	  function StarSegment(name) {
	    this.name = name;
	  }
	  StarSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      callback({ invalidChars: "", repeat: true });
	    },

	    regex: function regex() {
	      return "(.+)";
	    },

	    generate: function generate(params) {
	      var val = params[this.name];
	      return val == null ? ":" + this.name : val;
	    }
	  };

	  function EpsilonSegment() {}
	  EpsilonSegment.prototype = {
	    eachChar: function eachChar() {},
	    regex: function regex() {
	      return "";
	    },
	    generate: function generate() {
	      return "";
	    }
	  };

	  function parse(route, names, specificity) {
	    // normalize route as not starting with a "/". Recognition will
	    // also normalize.
	    if (route.charAt(0) === "/") {
	      route = route.substr(1);
	    }

	    var segments = route.split("/"),
	        results = [];

	    // A routes has specificity determined by the order that its different segments
	    // appear in. This system mirrors how the magnitude of numbers written as strings
	    // works.
	    // Consider a number written as: "abc". An example would be "200". Any other number written
	    // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
	    // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
	    // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
	    // leading symbol, "1".
	    // The rule is that symbols to the left carry more weight than symbols to the right
	    // when a number is written out as a string. In the above strings, the leading digit
	    // represents how many 100's are in the number, and it carries more weight than the middle
	    // number which represents how many 10's are in the number.
	    // This system of number magnitude works well for route specificity, too. A route written as
	    // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
	    // `x`, irrespective of the other parts.
	    // Because of this similarity, we assign each type of segment a number value written as a
	    // string. We can find the specificity of compound routes by concatenating these strings
	    // together, from left to right. After we have looped through all of the segments,
	    // we convert the string to a number.
	    specificity.val = '';

	    for (var i = 0, l = segments.length; i < l; i++) {
	      var segment = segments[i],
	          match;

	      if (match = segment.match(/^:([^\/]+)$/)) {
	        results.push(new DynamicSegment(match[1]));
	        names.push(match[1]);
	        specificity.val += '3';
	      } else if (match = segment.match(/^\*([^\/]+)$/)) {
	        results.push(new StarSegment(match[1]));
	        specificity.val += '2';
	        names.push(match[1]);
	      } else if (segment === "") {
	        results.push(new EpsilonSegment());
	        specificity.val += '1';
	      } else {
	        results.push(new StaticSegment(segment));
	        specificity.val += '4';
	      }
	    }

	    specificity.val = +specificity.val;

	    return results;
	  }

	  // A State has a character specification and (`charSpec`) and a list of possible
	  // subsequent states (`nextStates`).
	  //
	  // If a State is an accepting state, it will also have several additional
	  // properties:
	  //
	  // * `regex`: A regular expression that is used to extract parameters from paths
	  //   that reached this accepting state.
	  // * `handlers`: Information on how to convert the list of captures into calls
	  //   to registered handlers with the specified parameters
	  // * `types`: How many static, dynamic or star segments in this route. Used to
	  //   decide which route to use if multiple registered routes match a path.
	  //
	  // Currently, State is implemented naively by looping over `nextStates` and
	  // comparing a character specification against a character. A more efficient
	  // implementation would use a hash of keys pointing at one or more next states.

	  function State(charSpec) {
	    this.charSpec = charSpec;
	    this.nextStates = [];
	  }

	  State.prototype = {
	    get: function get(charSpec) {
	      var nextStates = this.nextStates;

	      for (var i = 0, l = nextStates.length; i < l; i++) {
	        var child = nextStates[i];

	        var isEqual = child.charSpec.validChars === charSpec.validChars;
	        isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;

	        if (isEqual) {
	          return child;
	        }
	      }
	    },

	    put: function put(charSpec) {
	      var state;

	      // If the character specification already exists in a child of the current
	      // state, just return that state.
	      if (state = this.get(charSpec)) {
	        return state;
	      }

	      // Make a new state for the character spec
	      state = new State(charSpec);

	      // Insert the new state as a child of the current state
	      this.nextStates.push(state);

	      // If this character specification repeats, insert the new state as a child
	      // of itself. Note that this will not trigger an infinite loop because each
	      // transition during recognition consumes a character.
	      if (charSpec.repeat) {
	        state.nextStates.push(state);
	      }

	      // Return the new state
	      return state;
	    },

	    // Find a list of child states matching the next character
	    match: function match(ch) {
	      // DEBUG "Processing `" + ch + "`:"
	      var nextStates = this.nextStates,
	          child,
	          charSpec,
	          chars;

	      // DEBUG "  " + debugState(this)
	      var returned = [];

	      for (var i = 0, l = nextStates.length; i < l; i++) {
	        child = nextStates[i];

	        charSpec = child.charSpec;

	        if (typeof (chars = charSpec.validChars) !== 'undefined') {
	          if (chars.indexOf(ch) !== -1) {
	            returned.push(child);
	          }
	        } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
	          if (chars.indexOf(ch) === -1) {
	            returned.push(child);
	          }
	        }
	      }

	      return returned;
	    }

	    /** IF DEBUG
	    , debug: function() {
	      var charSpec = this.charSpec,
	          debug = "[",
	          chars = charSpec.validChars || charSpec.invalidChars;
	       if (charSpec.invalidChars) { debug += "^"; }
	      debug += chars;
	      debug += "]";
	       if (charSpec.repeat) { debug += "+"; }
	       return debug;
	    }
	    END IF **/
	  };

	  /** IF DEBUG
	  function debug(log) {
	    console.log(log);
	  }

	  function debugState(state) {
	    return state.nextStates.map(function(n) {
	      if (n.nextStates.length === 0) { return "( " + n.debug() + " [accepting] )"; }
	      return "( " + n.debug() + " <then> " + n.nextStates.map(function(s) { return s.debug() }).join(" or ") + " )";
	    }).join(", ")
	  }
	  END IF **/

	  // Sort the routes by specificity
	  function sortSolutions(states) {
	    return states.sort(function (a, b) {
	      return b.specificity.val - a.specificity.val;
	    });
	  }

	  function recognizeChar(states, ch) {
	    var nextStates = [];

	    for (var i = 0, l = states.length; i < l; i++) {
	      var state = states[i];

	      nextStates = nextStates.concat(state.match(ch));
	    }

	    return nextStates;
	  }

	  var oCreate = Object.create || function (proto) {
	    function F() {}
	    F.prototype = proto;
	    return new F();
	  };

	  function RecognizeResults(queryParams) {
	    this.queryParams = queryParams || {};
	  }
	  RecognizeResults.prototype = oCreate({
	    splice: Array.prototype.splice,
	    slice: Array.prototype.slice,
	    push: Array.prototype.push,
	    length: 0,
	    queryParams: null
	  });

	  function findHandler(state, path, queryParams) {
	    var handlers = state.handlers,
	        regex = state.regex;
	    var captures = path.match(regex),
	        currentCapture = 1;
	    var result = new RecognizeResults(queryParams);

	    for (var i = 0, l = handlers.length; i < l; i++) {
	      var handler = handlers[i],
	          names = handler.names,
	          params = {};

	      for (var j = 0, m = names.length; j < m; j++) {
	        params[names[j]] = captures[currentCapture++];
	      }

	      result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
	    }

	    return result;
	  }

	  function addSegment(currentState, segment) {
	    segment.eachChar(function (ch) {
	      var state;

	      currentState = currentState.put(ch);
	    });

	    return currentState;
	  }

	  function decodeQueryParamPart(part) {
	    // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
	    part = part.replace(/\+/gm, '%20');
	    return tryDecode(part, true);
	  }

	  // The main interface

	  var RouteRecognizer = function RouteRecognizer() {
	    this.rootState = new State();
	    this.names = {};
	  };

	  RouteRecognizer.prototype = {
	    add: function add(routes, options) {
	      var currentState = this.rootState,
	          regex = "^",
	          specificity = {},
	          handlers = [],
	          allSegments = [],
	          name;

	      var isEmpty = true;

	      for (var i = 0, l = routes.length; i < l; i++) {
	        var route = routes[i],
	            names = [];

	        var segments = parse(route.path, names, specificity);

	        allSegments = allSegments.concat(segments);

	        for (var j = 0, m = segments.length; j < m; j++) {
	          var segment = segments[j];

	          if (segment instanceof EpsilonSegment) {
	            continue;
	          }

	          isEmpty = false;

	          // Add a "/" for the new segment
	          currentState = currentState.put({ validChars: "/" });
	          regex += "/";

	          // Add a representation of the segment to the NFA and regex
	          currentState = addSegment(currentState, segment);
	          regex += segment.regex();
	        }

	        var handler = { handler: route.handler, names: names };
	        handlers.push(handler);
	      }

	      if (isEmpty) {
	        currentState = currentState.put({ validChars: "/" });
	        regex += "/";
	      }

	      currentState.handlers = handlers;
	      currentState.regex = new RegExp(regex + "$");
	      currentState.specificity = specificity;

	      if (name = options && options.as) {
	        this.names[name] = {
	          segments: allSegments,
	          handlers: handlers
	        };
	      }
	    },

	    handlersFor: function handlersFor(name) {
	      var route = this.names[name],
	          result = [];
	      if (!route) {
	        throw new Error("There is no route named " + name);
	      }

	      for (var i = 0, l = route.handlers.length; i < l; i++) {
	        result.push(route.handlers[i]);
	      }

	      return result;
	    },

	    hasRoute: function hasRoute(name) {
	      return !!this.names[name];
	    },

	    generate: function generate(name, params) {
	      var route = this.names[name],
	          output = "";
	      if (!route) {
	        throw new Error("There is no route named " + name);
	      }

	      var segments = route.segments;

	      for (var i = 0, l = segments.length; i < l; i++) {
	        var segment = segments[i];

	        if (segment instanceof EpsilonSegment) {
	          continue;
	        }

	        output += "/";
	        output += segment.generate(params);
	      }

	      if (output.charAt(0) !== '/') {
	        output = '/' + output;
	      }

	      if (params && params.queryParams) {
	        output += this.generateQueryString(params.queryParams);
	      }

	      return output;
	    },

	    generateQueryString: function generateQueryString(params) {
	      var pairs = [];
	      var keys = [];
	      for (var key in params) {
	        if (params.hasOwnProperty(key)) {
	          keys.push(key);
	        }
	      }
	      keys.sort();
	      for (var i = 0, len = keys.length; i < len; i++) {
	        key = keys[i];
	        var value = params[key];
	        if (value == null) {
	          continue;
	        }
	        var pair = encodeURIComponent(key);
	        if (isArray(value)) {
	          for (var j = 0, l = value.length; j < l; j++) {
	            var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
	            pairs.push(arrayPair);
	          }
	        } else {
	          pair += "=" + encodeURIComponent(value);
	          pairs.push(pair);
	        }
	      }

	      if (pairs.length === 0) {
	        return '';
	      }

	      return "?" + pairs.join("&");
	    },

	    parseQueryString: function parseQueryString(queryString) {
	      var pairs = queryString.split("&"),
	          queryParams = {};
	      for (var i = 0; i < pairs.length; i++) {
	        var pair = pairs[i].split('='),
	            key = decodeQueryParamPart(pair[0]),
	            keyLength = key.length,
	            isArray = false,
	            value;
	        if (pair.length === 1) {
	          value = 'true';
	        } else {
	          //Handle arrays
	          if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
	            isArray = true;
	            key = key.slice(0, keyLength - 2);
	            if (!queryParams[key]) {
	              queryParams[key] = [];
	            }
	          }
	          value = pair[1] ? decodeQueryParamPart(pair[1]) : '';
	        }
	        if (isArray) {
	          queryParams[key].push(value);
	        } else {
	          queryParams[key] = value;
	        }
	      }
	      return queryParams;
	    },

	    recognize: function recognize(path, silent) {
	      noWarning = silent;
	      var states = [this.rootState],
	          pathLen,
	          i,
	          l,
	          queryStart,
	          queryParams = {},
	          isSlashDropped = false;

	      queryStart = path.indexOf('?');
	      if (queryStart !== -1) {
	        var queryString = path.substr(queryStart + 1, path.length);
	        path = path.substr(0, queryStart);
	        if (queryString) {
	          queryParams = this.parseQueryString(queryString);
	        }
	      }

	      path = tryDecode(path);
	      if (!path) return;

	      // DEBUG GROUP path

	      if (path.charAt(0) !== "/") {
	        path = "/" + path;
	      }

	      pathLen = path.length;
	      if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
	        path = path.substr(0, pathLen - 1);
	        isSlashDropped = true;
	      }

	      for (i = 0, l = path.length; i < l; i++) {
	        states = recognizeChar(states, path.charAt(i));
	        if (!states.length) {
	          break;
	        }
	      }

	      // END DEBUG GROUP

	      var solutions = [];
	      for (i = 0, l = states.length; i < l; i++) {
	        if (states[i].handlers) {
	          solutions.push(states[i]);
	        }
	      }

	      states = sortSolutions(solutions);

	      var state = solutions[0];

	      if (state && state.handlers) {
	        // if a trailing slash was dropped and a star segment is the last segment
	        // specified, put the trailing slash back
	        if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
	          path = path + "/";
	        }
	        return findHandler(state, path, queryParams);
	      }
	    }
	  };

	  RouteRecognizer.prototype.map = map;

	  var genQuery = RouteRecognizer.prototype.generateQueryString;

	  // export default for holding the Vue reference
	  var exports$1 = {};
	  /**
	   * Warn stuff.
	   *
	   * @param {String} msg
	   */

	  function warn$1(msg) {
	    /* istanbul ignore next */
	    if (typeof console !== 'undefined') {
	      console.error('[vue-router] ' + msg);
	    }
	  }

	  /**
	   * Resolve a relative path.
	   *
	   * @param {String} base
	   * @param {String} relative
	   * @param {Boolean} append
	   * @return {String}
	   */

	  function resolvePath(base, relative, append) {
	    var query = base.match(/(\?.*)$/);
	    if (query) {
	      query = query[1];
	      base = base.slice(0, -query.length);
	    }
	    // a query!
	    if (relative.charAt(0) === '?') {
	      return base + relative;
	    }
	    var stack = base.split('/');
	    // remove trailing segment if:
	    // - not appending
	    // - appending to trailing slash (last segment is empty)
	    if (!append || !stack[stack.length - 1]) {
	      stack.pop();
	    }
	    // resolve relative path
	    var segments = relative.replace(/^\//, '').split('/');
	    for (var i = 0; i < segments.length; i++) {
	      var segment = segments[i];
	      if (segment === '.') {
	        continue;
	      } else if (segment === '..') {
	        stack.pop();
	      } else {
	        stack.push(segment);
	      }
	    }
	    // ensure leading slash
	    if (stack[0] !== '') {
	      stack.unshift('');
	    }
	    return stack.join('/');
	  }

	  /**
	   * Forgiving check for a promise
	   *
	   * @param {Object} p
	   * @return {Boolean}
	   */

	  function isPromise(p) {
	    return p && typeof p.then === 'function';
	  }

	  /**
	   * Retrive a route config field from a component instance
	   * OR a component contructor.
	   *
	   * @param {Function|Vue} component
	   * @param {String} name
	   * @return {*}
	   */

	  function getRouteConfig(component, name) {
	    var options = component && (component.$options || component.options);
	    return options && options.route && options.route[name];
	  }

	  /**
	   * Resolve an async component factory. Have to do a dirty
	   * mock here because of Vue core's internal API depends on
	   * an ID check.
	   *
	   * @param {Object} handler
	   * @param {Function} cb
	   */

	  var resolver = undefined;

	  function resolveAsyncComponent(handler, cb) {
	    if (!resolver) {
	      resolver = {
	        resolve: exports$1.Vue.prototype._resolveComponent,
	        $options: {
	          components: {
	            _: handler.component
	          }
	        }
	      };
	    } else {
	      resolver.$options.components._ = handler.component;
	    }
	    resolver.resolve('_', function (Component) {
	      handler.component = Component;
	      cb(Component);
	    });
	  }

	  /**
	   * Map the dynamic segments in a path to params.
	   *
	   * @param {String} path
	   * @param {Object} params
	   * @param {Object} query
	   */

	  function mapParams(path, params, query) {
	    if (params === undefined) params = {};

	    path = path.replace(/:([^\/]+)/g, function (_, key) {
	      var val = params[key];
	      /* istanbul ignore if */
	      if (!val) {
	        warn$1('param "' + key + '" not found when generating ' + 'path for "' + path + '" with params ' + JSON.stringify(params));
	      }
	      return val || '';
	    });
	    if (query) {
	      path += genQuery(query);
	    }
	    return path;
	  }

	  var hashRE = /#.*$/;

	  var HTML5History = (function () {
	    function HTML5History(_ref) {
	      var root = _ref.root;
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, HTML5History);

	      if (root && root !== '/') {
	        // make sure there's the starting slash
	        if (root.charAt(0) !== '/') {
	          root = '/' + root;
	        }
	        // remove trailing slash
	        this.root = root.replace(/\/$/, '');
	        this.rootRE = new RegExp('^\\' + this.root);
	      } else {
	        this.root = null;
	      }
	      this.onChange = onChange;
	      // check base tag
	      var baseEl = document.querySelector('base');
	      this.base = baseEl && baseEl.getAttribute('href');
	    }

	    HTML5History.prototype.start = function start() {
	      var _this = this;

	      this.listener = function (e) {
	        var url = location.pathname + location.search;
	        if (_this.root) {
	          url = url.replace(_this.rootRE, '');
	        }
	        _this.onChange(url, e && e.state, location.hash);
	      };
	      window.addEventListener('popstate', this.listener);
	      this.listener();
	    };

	    HTML5History.prototype.stop = function stop() {
	      window.removeEventListener('popstate', this.listener);
	    };

	    HTML5History.prototype.go = function go(path, replace, append) {
	      var url = this.formatPath(path, append);
	      if (replace) {
	        history.replaceState({}, '', url);
	      } else {
	        // record scroll position by replacing current state
	        history.replaceState({
	          pos: {
	            x: window.pageXOffset,
	            y: window.pageYOffset
	          }
	        }, '', location.href);
	        // then push new state
	        history.pushState({}, '', url);
	      }
	      var hashMatch = path.match(hashRE);
	      var hash = hashMatch && hashMatch[0];
	      path = url
	      // strip hash so it doesn't mess up params
	      .replace(hashRE, '')
	      // remove root before matching
	      .replace(this.rootRE, '');
	      this.onChange(path, null, hash);
	    };

	    HTML5History.prototype.formatPath = function formatPath(path, append) {
	      return path.charAt(0) === '/'
	      // absolute path
	      ? this.root ? this.root + '/' + path.replace(/^\//, '') : path : resolvePath(this.base || location.pathname, path, append);
	    };

	    return HTML5History;
	  })();

	  var HashHistory = (function () {
	    function HashHistory(_ref) {
	      var hashbang = _ref.hashbang;
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, HashHistory);

	      this.hashbang = hashbang;
	      this.onChange = onChange;
	    }

	    HashHistory.prototype.start = function start() {
	      var self = this;
	      this.listener = function () {
	        var path = location.hash;
	        var raw = path.replace(/^#!?/, '');
	        // always
	        if (raw.charAt(0) !== '/') {
	          raw = '/' + raw;
	        }
	        var formattedPath = self.formatPath(raw);
	        if (formattedPath !== path) {
	          location.replace(formattedPath);
	          return;
	        }
	        // determine query
	        // note it's possible to have queries in both the actual URL
	        // and the hash fragment itself.
	        var query = location.search && path.indexOf('?') > -1 ? '&' + location.search.slice(1) : location.search;
	        self.onChange(path.replace(/^#!?/, '') + query);
	      };
	      window.addEventListener('hashchange', this.listener);
	      this.listener();
	    };

	    HashHistory.prototype.stop = function stop() {
	      window.removeEventListener('hashchange', this.listener);
	    };

	    HashHistory.prototype.go = function go(path, replace, append) {
	      path = this.formatPath(path, append);
	      if (replace) {
	        location.replace(path);
	      } else {
	        location.hash = path;
	      }
	    };

	    HashHistory.prototype.formatPath = function formatPath(path, append) {
	      var isAbsoloute = path.charAt(0) === '/';
	      var prefix = '#' + (this.hashbang ? '!' : '');
	      return isAbsoloute ? prefix + path : prefix + resolvePath(location.hash.replace(/^#!?/, ''), path, append);
	    };

	    return HashHistory;
	  })();

	  var AbstractHistory = (function () {
	    function AbstractHistory(_ref) {
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, AbstractHistory);

	      this.onChange = onChange;
	      this.currentPath = '/';
	    }

	    AbstractHistory.prototype.start = function start() {
	      this.onChange('/');
	    };

	    AbstractHistory.prototype.stop = function stop() {
	      // noop
	    };

	    AbstractHistory.prototype.go = function go(path, replace, append) {
	      path = this.currentPath = this.formatPath(path, append);
	      this.onChange(path);
	    };

	    AbstractHistory.prototype.formatPath = function formatPath(path, append) {
	      return path.charAt(0) === '/' ? path : resolvePath(this.currentPath, path, append);
	    };

	    return AbstractHistory;
	  })();

	  /**
	   * Determine the reusability of an existing router view.
	   *
	   * @param {Directive} view
	   * @param {Object} handler
	   * @param {Transition} transition
	   */

	  function canReuse(view, handler, transition) {
	    var component = view.childVM;
	    if (!component || !handler) {
	      return false;
	    }
	    // important: check view.Component here because it may
	    // have been changed in activate hook
	    if (view.Component !== handler.component) {
	      return false;
	    }
	    var canReuseFn = getRouteConfig(component, 'canReuse');
	    return typeof canReuseFn === 'boolean' ? canReuseFn : canReuseFn ? canReuseFn.call(component, {
	      to: transition.to,
	      from: transition.from
	    }) : true; // defaults to true
	  }

	  /**
	   * Check if a component can deactivate.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Function} next
	   */

	  function canDeactivate(view, transition, next) {
	    var fromComponent = view.childVM;
	    var hook = getRouteConfig(fromComponent, 'canDeactivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHook(hook, fromComponent, next, {
	        expectBoolean: true
	      });
	    }
	  }

	  /**
	   * Check if a component can activate.
	   *
	   * @param {Object} handler
	   * @param {Transition} transition
	   * @param {Function} next
	   */

	  function canActivate(handler, transition, next) {
	    resolveAsyncComponent(handler, function (Component) {
	      // have to check due to async-ness
	      if (transition.aborted) {
	        return;
	      }
	      // determine if this component can be activated
	      var hook = getRouteConfig(Component, 'canActivate');
	      if (!hook) {
	        next();
	      } else {
	        transition.callHook(hook, null, next, {
	          expectBoolean: true
	        });
	      }
	    });
	  }

	  /**
	   * Call deactivate hooks for existing router-views.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Function} next
	   */

	  function deactivate(view, transition, next) {
	    var component = view.childVM;
	    var hook = getRouteConfig(component, 'deactivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHooks(hook, component, next);
	    }
	  }

	  /**
	   * Activate / switch component for a router-view.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Number} depth
	   * @param {Function} [cb]
	   */

	  function activate(view, transition, depth, cb, reuse) {
	    var handler = transition.activateQueue[depth];
	    if (!handler) {
	      saveChildView(view);
	      if (view._bound) {
	        view.setComponent(null);
	      }
	      cb && cb();
	      return;
	    }

	    var Component = view.Component = handler.component;
	    var activateHook = getRouteConfig(Component, 'activate');
	    var dataHook = getRouteConfig(Component, 'data');
	    var waitForData = getRouteConfig(Component, 'waitForData');

	    view.depth = depth;
	    view.activated = false;

	    var component = undefined;
	    var loading = !!(dataHook && !waitForData);

	    // "reuse" is a flag passed down when the parent view is
	    // either reused via keep-alive or as a child of a kept-alive view.
	    // of course we can only reuse if the current kept-alive instance
	    // is of the correct type.
	    reuse = reuse && view.childVM && view.childVM.constructor === Component;

	    if (reuse) {
	      // just reuse
	      component = view.childVM;
	      component.$loadingRouteData = loading;
	    } else {
	      saveChildView(view);

	      // unbuild current component. this step also destroys
	      // and removes all nested child views.
	      view.unbuild(true);

	      // build the new component. this will also create the
	      // direct child view of the current one. it will register
	      // itself as view.childView.
	      component = view.build({
	        _meta: {
	          $loadingRouteData: loading
	        },
	        created: function created() {
	          this._routerView = view;
	        }
	      });

	      // handle keep-alive.
	      // when a kept-alive child vm is restored, we need to
	      // add its cached child views into the router's view list,
	      // and also properly update current view's child view.
	      if (view.keepAlive) {
	        component.$loadingRouteData = loading;
	        var cachedChildView = component._keepAliveRouterView;
	        if (cachedChildView) {
	          view.childView = cachedChildView;
	          component._keepAliveRouterView = null;
	        }
	      }
	    }

	    // cleanup the component in case the transition is aborted
	    // before the component is ever inserted.
	    var cleanup = function cleanup() {
	      component.$destroy();
	    };

	    // actually insert the component and trigger transition
	    var insert = function insert() {
	      if (reuse) {
	        cb && cb();
	        return;
	      }
	      var router = transition.router;
	      if (router._rendered || router._transitionOnLoad) {
	        view.transition(component);
	      } else {
	        // no transition on first render, manual transition
	        /* istanbul ignore if */
	        if (view.setCurrent) {
	          // 0.12 compat
	          view.setCurrent(component);
	        } else {
	          // 1.0
	          view.childVM = component;
	        }
	        component.$before(view.anchor, null, false);
	      }
	      cb && cb();
	    };

	    var afterData = function afterData() {
	      // activate the child view
	      if (view.childView) {
	        activate(view.childView, transition, depth + 1, null, reuse || view.keepAlive);
	      }
	      insert();
	    };

	    // called after activation hook is resolved
	    var afterActivate = function afterActivate() {
	      view.activated = true;
	      if (dataHook && waitForData) {
	        // wait until data loaded to insert
	        loadData(component, transition, dataHook, afterData, cleanup);
	      } else {
	        // load data and insert at the same time
	        if (dataHook) {
	          loadData(component, transition, dataHook);
	        }
	        afterData();
	      }
	    };

	    if (activateHook) {
	      transition.callHooks(activateHook, component, afterActivate, {
	        cleanup: cleanup,
	        postActivate: true
	      });
	    } else {
	      afterActivate();
	    }
	  }

	  /**
	   * Reuse a view, just reload data if necessary.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   */

	  function reuse(view, transition) {
	    var component = view.childVM;
	    var dataHook = getRouteConfig(component, 'data');
	    if (dataHook) {
	      loadData(component, transition, dataHook);
	    }
	  }

	  /**
	   * Asynchronously load and apply data to component.
	   *
	   * @param {Vue} component
	   * @param {Transition} transition
	   * @param {Function} hook
	   * @param {Function} cb
	   * @param {Function} cleanup
	   */

	  function loadData(component, transition, hook, cb, cleanup) {
	    component.$loadingRouteData = true;
	    transition.callHooks(hook, component, function () {
	      component.$loadingRouteData = false;
	      component.$emit('route-data-loaded', component);
	      cb && cb();
	    }, {
	      cleanup: cleanup,
	      postActivate: true,
	      processData: function processData(data) {
	        // handle promise sugar syntax
	        var promises = [];
	        if (isPlainObject(data)) {
	          Object.keys(data).forEach(function (key) {
	            var val = data[key];
	            if (isPromise(val)) {
	              promises.push(val.then(function (resolvedVal) {
	                component.$set(key, resolvedVal);
	              }));
	            } else {
	              component.$set(key, val);
	            }
	          });
	        }
	        if (promises.length) {
	          return promises[0].constructor.all(promises);
	        }
	      }
	    });
	  }

	  /**
	   * Save the child view for a kept-alive view so that
	   * we can restore it when it is switched back to.
	   *
	   * @param {Directive} view
	   */

	  function saveChildView(view) {
	    if (view.keepAlive && view.childVM && view.childView) {
	      view.childVM._keepAliveRouterView = view.childView;
	    }
	    view.childView = null;
	  }

	  /**
	   * Check plain object.
	   *
	   * @param {*} val
	   */

	  function isPlainObject(val) {
	    return Object.prototype.toString.call(val) === '[object Object]';
	  }

	  /**
	   * A RouteTransition object manages the pipeline of a
	   * router-view switching process. This is also the object
	   * passed into user route hooks.
	   *
	   * @param {Router} router
	   * @param {Route} to
	   * @param {Route} from
	   */

	  var RouteTransition = (function () {
	    function RouteTransition(router, to, from) {
	      babelHelpers.classCallCheck(this, RouteTransition);

	      this.router = router;
	      this.to = to;
	      this.from = from;
	      this.next = null;
	      this.aborted = false;
	      this.done = false;
	    }

	    /**
	     * Abort current transition and return to previous location.
	     */

	    RouteTransition.prototype.abort = function abort() {
	      if (!this.aborted) {
	        this.aborted = true;
	        // if the root path throws an error during validation
	        // on initial load, it gets caught in an infinite loop.
	        var abortingOnLoad = !this.from.path && this.to.path === '/';
	        if (!abortingOnLoad) {
	          this.router.replace(this.from.path || '/');
	        }
	      }
	    };

	    /**
	     * Abort current transition and redirect to a new location.
	     *
	     * @param {String} path
	     */

	    RouteTransition.prototype.redirect = function redirect(path) {
	      if (!this.aborted) {
	        this.aborted = true;
	        if (typeof path === 'string') {
	          path = mapParams(path, this.to.params, this.to.query);
	        } else {
	          path.params = path.params || this.to.params;
	          path.query = path.query || this.to.query;
	        }
	        this.router.replace(path);
	      }
	    };

	    /**
	     * A router view transition's pipeline can be described as
	     * follows, assuming we are transitioning from an existing
	     * <router-view> chain [Component A, Component B] to a new
	     * chain [Component A, Component C]:
	     *
	     *  A    A
	     *  | => |
	     *  B    C
	     *
	     * 1. Reusablity phase:
	     *   -> canReuse(A, A)
	     *   -> canReuse(B, C)
	     *   -> determine new queues:
	     *      - deactivation: [B]
	     *      - activation: [C]
	     *
	     * 2. Validation phase:
	     *   -> canDeactivate(B)
	     *   -> canActivate(C)
	     *
	     * 3. Activation phase:
	     *   -> deactivate(B)
	     *   -> activate(C)
	     *
	     * Each of these steps can be asynchronous, and any
	     * step can potentially abort the transition.
	     *
	     * @param {Function} cb
	     */

	    RouteTransition.prototype.start = function start(cb) {
	      var transition = this;

	      // determine the queue of views to deactivate
	      var deactivateQueue = [];
	      var view = this.router._rootView;
	      while (view) {
	        deactivateQueue.unshift(view);
	        view = view.childView;
	      }
	      var reverseDeactivateQueue = deactivateQueue.slice().reverse();

	      // determine the queue of route handlers to activate
	      var activateQueue = this.activateQueue = toArray(this.to.matched).map(function (match) {
	        return match.handler;
	      });

	      // 1. Reusability phase
	      var i = undefined,
	          reuseQueue = undefined;
	      for (i = 0; i < reverseDeactivateQueue.length; i++) {
	        if (!canReuse(reverseDeactivateQueue[i], activateQueue[i], transition)) {
	          break;
	        }
	      }
	      if (i > 0) {
	        reuseQueue = reverseDeactivateQueue.slice(0, i);
	        deactivateQueue = reverseDeactivateQueue.slice(i).reverse();
	        activateQueue = activateQueue.slice(i);
	      }

	      // 2. Validation phase
	      transition.runQueue(deactivateQueue, canDeactivate, function () {
	        transition.runQueue(activateQueue, canActivate, function () {
	          transition.runQueue(deactivateQueue, deactivate, function () {
	            // 3. Activation phase

	            // Update router current route
	            transition.router._onTransitionValidated(transition);

	            // trigger reuse for all reused views
	            reuseQueue && reuseQueue.forEach(function (view) {
	              return reuse(view, transition);
	            });

	            // the root of the chain that needs to be replaced
	            // is the top-most non-reusable view.
	            if (deactivateQueue.length) {
	              var _view = deactivateQueue[deactivateQueue.length - 1];
	              var depth = reuseQueue ? reuseQueue.length : 0;
	              activate(_view, transition, depth, cb);
	            } else {
	              cb();
	            }
	          });
	        });
	      });
	    };

	    /**
	     * Asynchronously and sequentially apply a function to a
	     * queue.
	     *
	     * @param {Array} queue
	     * @param {Function} fn
	     * @param {Function} cb
	     */

	    RouteTransition.prototype.runQueue = function runQueue(queue, fn, cb) {
	      var transition = this;
	      step(0);
	      function step(index) {
	        if (index >= queue.length) {
	          cb();
	        } else {
	          fn(queue[index], transition, function () {
	            step(index + 1);
	          });
	        }
	      }
	    };

	    /**
	     * Call a user provided route transition hook and handle
	     * the response (e.g. if the user returns a promise).
	     *
	     * If the user neither expects an argument nor returns a
	     * promise, the hook is assumed to be synchronous.
	     *
	     * @param {Function} hook
	     * @param {*} [context]
	     * @param {Function} [cb]
	     * @param {Object} [options]
	     *                 - {Boolean} expectBoolean
	     *                 - {Boolean} postActive
	     *                 - {Function} processData
	     *                 - {Function} cleanup
	     */

	    RouteTransition.prototype.callHook = function callHook(hook, context, cb) {
	      var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	      var _ref$expectBoolean = _ref.expectBoolean;
	      var expectBoolean = _ref$expectBoolean === undefined ? false : _ref$expectBoolean;
	      var _ref$postActivate = _ref.postActivate;
	      var postActivate = _ref$postActivate === undefined ? false : _ref$postActivate;
	      var processData = _ref.processData;
	      var cleanup = _ref.cleanup;

	      var transition = this;
	      var nextCalled = false;

	      // abort the transition
	      var abort = function abort() {
	        cleanup && cleanup();
	        transition.abort();
	      };

	      // handle errors
	      var onError = function onError(err) {
	        postActivate ? next() : abort();
	        if (err && !transition.router._suppress) {
	          warn$1('Uncaught error during transition: ');
	          throw err instanceof Error ? err : new Error(err);
	        }
	      };

	      // since promise swallows errors, we have to
	      // throw it in the next tick...
	      var onPromiseError = function onPromiseError(err) {
	        try {
	          onError(err);
	        } catch (e) {
	          setTimeout(function () {
	            throw e;
	          }, 0);
	        }
	      };

	      // advance the transition to the next step
	      var next = function next() {
	        if (nextCalled) {
	          warn$1('transition.next() should be called only once.');
	          return;
	        }
	        nextCalled = true;
	        if (transition.aborted) {
	          cleanup && cleanup();
	          return;
	        }
	        cb && cb();
	      };

	      var nextWithBoolean = function nextWithBoolean(res) {
	        if (typeof res === 'boolean') {
	          res ? next() : abort();
	        } else if (isPromise(res)) {
	          res.then(function (ok) {
	            ok ? next() : abort();
	          }, onPromiseError);
	        } else if (!hook.length) {
	          next();
	        }
	      };

	      var nextWithData = function nextWithData(data) {
	        var res = undefined;
	        try {
	          res = processData(data);
	        } catch (err) {
	          return onError(err);
	        }
	        if (isPromise(res)) {
	          res.then(next, onPromiseError);
	        } else {
	          next();
	        }
	      };

	      // expose a clone of the transition object, so that each
	      // hook gets a clean copy and prevent the user from
	      // messing with the internals.
	      var exposed = {
	        to: transition.to,
	        from: transition.from,
	        abort: abort,
	        next: processData ? nextWithData : next,
	        redirect: function redirect() {
	          transition.redirect.apply(transition, arguments);
	        }
	      };

	      // actually call the hook
	      var res = undefined;
	      try {
	        res = hook.call(context, exposed);
	      } catch (err) {
	        return onError(err);
	      }

	      if (expectBoolean) {
	        // boolean hooks
	        nextWithBoolean(res);
	      } else if (isPromise(res)) {
	        // promise
	        if (processData) {
	          res.then(nextWithData, onPromiseError);
	        } else {
	          res.then(next, onPromiseError);
	        }
	      } else if (processData && isPlainOjbect(res)) {
	        // data promise sugar
	        nextWithData(res);
	      } else if (!hook.length) {
	        next();
	      }
	    };

	    /**
	     * Call a single hook or an array of async hooks in series.
	     *
	     * @param {Array} hooks
	     * @param {*} context
	     * @param {Function} cb
	     * @param {Object} [options]
	     */

	    RouteTransition.prototype.callHooks = function callHooks(hooks, context, cb, options) {
	      var _this = this;

	      if (Array.isArray(hooks)) {
	        this.runQueue(hooks, function (hook, _, next) {
	          if (!_this.aborted) {
	            _this.callHook(hook, context, next, options);
	          }
	        }, cb);
	      } else {
	        this.callHook(hooks, context, cb, options);
	      }
	    };

	    return RouteTransition;
	  })();

	  function isPlainOjbect(val) {
	    return Object.prototype.toString.call(val) === '[object Object]';
	  }

	  function toArray(val) {
	    return val ? Array.prototype.slice.call(val) : [];
	  }

	  var internalKeysRE = /^(component|subRoutes|fullPath)$/;

	  /**
	   * Route Context Object
	   *
	   * @param {String} path
	   * @param {Router} router
	   */

	  var Route = function Route(path, router) {
	    var _this = this;

	    babelHelpers.classCallCheck(this, Route);

	    var matched = router._recognizer.recognize(path);
	    if (matched) {
	      // copy all custom fields from route configs
	      [].forEach.call(matched, function (match) {
	        for (var key in match.handler) {
	          if (!internalKeysRE.test(key)) {
	            _this[key] = match.handler[key];
	          }
	        }
	      });
	      // set query and params
	      this.query = matched.queryParams;
	      this.params = [].reduce.call(matched, function (prev, cur) {
	        if (cur.params) {
	          for (var key in cur.params) {
	            prev[key] = cur.params[key];
	          }
	        }
	        return prev;
	      }, {});
	    }
	    // expose path and router
	    this.path = path;
	    // for internal use
	    this.matched = matched || router._notFoundHandler;
	    // internal reference to router
	    Object.defineProperty(this, 'router', {
	      enumerable: false,
	      value: router
	    });
	    // Important: freeze self to prevent observation
	    Object.freeze(this);
	  };

	  function applyOverride (Vue) {
	    var _Vue$util = Vue.util;
	    var extend = _Vue$util.extend;
	    var isArray = _Vue$util.isArray;
	    var defineReactive = _Vue$util.defineReactive;

	    // override Vue's init and destroy process to keep track of router instances
	    var init = Vue.prototype._init;
	    Vue.prototype._init = function (options) {
	      options = options || {};
	      var root = options._parent || options.parent || this;
	      var router = root.$router;
	      var route = root.$route;
	      if (router) {
	        // expose router
	        this.$router = router;
	        router._children.push(this);
	        /* istanbul ignore if */
	        if (this._defineMeta) {
	          // 0.12
	          this._defineMeta('$route', route);
	        } else {
	          // 1.0
	          defineReactive(this, '$route', route);
	        }
	      }
	      init.call(this, options);
	    };

	    var destroy = Vue.prototype._destroy;
	    Vue.prototype._destroy = function () {
	      if (!this._isBeingDestroyed && this.$router) {
	        this.$router._children.$remove(this);
	      }
	      destroy.apply(this, arguments);
	    };

	    // 1.0 only: enable route mixins
	    var strats = Vue.config.optionMergeStrategies;
	    var hooksToMergeRE = /^(data|activate|deactivate)$/;

	    if (strats) {
	      strats.route = function (parentVal, childVal) {
	        if (!childVal) return parentVal;
	        if (!parentVal) return childVal;
	        var ret = {};
	        extend(ret, parentVal);
	        for (var key in childVal) {
	          var a = ret[key];
	          var b = childVal[key];
	          // for data, activate and deactivate, we need to merge them into
	          // arrays similar to lifecycle hooks.
	          if (a && hooksToMergeRE.test(key)) {
	            ret[key] = (isArray(a) ? a : [a]).concat(b);
	          } else {
	            ret[key] = b;
	          }
	        }
	        return ret;
	      };
	    }
	  }

	  function View (Vue) {

	    var _ = Vue.util;
	    var componentDef =
	    // 0.12
	    Vue.directive('_component') ||
	    // 1.0
	    Vue.internalDirectives.component;
	    // <router-view> extends the internal component directive
	    var viewDef = _.extend({}, componentDef);

	    // with some overrides
	    _.extend(viewDef, {

	      _isRouterView: true,

	      bind: function bind() {
	        var route = this.vm.$route;
	        /* istanbul ignore if */
	        if (!route) {
	          warn$1('<router-view> can only be used inside a ' + 'router-enabled app.');
	          return;
	        }
	        // force dynamic directive so v-component doesn't
	        // attempt to build right now
	        this._isDynamicLiteral = true;
	        // finally, init by delegating to v-component
	        componentDef.bind.call(this);

	        // locate the parent view
	        var parentView = undefined;
	        var parent = this.vm;
	        while (parent) {
	          if (parent._routerView) {
	            parentView = parent._routerView;
	            break;
	          }
	          parent = parent.$parent;
	        }
	        if (parentView) {
	          // register self as a child of the parent view,
	          // instead of activating now. This is so that the
	          // child's activate hook is called after the
	          // parent's has resolved.
	          this.parentView = parentView;
	          parentView.childView = this;
	        } else {
	          // this is the root view!
	          var router = route.router;
	          router._rootView = this;
	        }

	        // handle late-rendered view
	        // two possibilities:
	        // 1. root view rendered after transition has been
	        //    validated;
	        // 2. child view rendered after parent view has been
	        //    activated.
	        var transition = route.router._currentTransition;
	        if (!parentView && transition.done || parentView && parentView.activated) {
	          var depth = parentView ? parentView.depth + 1 : 0;
	          activate(this, transition, depth);
	        }
	      },

	      unbind: function unbind() {
	        if (this.parentView) {
	          this.parentView.childView = null;
	        }
	        componentDef.unbind.call(this);
	      }
	    });

	    Vue.elementDirective('router-view', viewDef);
	  }

	  var trailingSlashRE = /\/$/;
	  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	  var queryStringRE = /\?.*$/;

	  // install v-link, which provides navigation support for
	  // HTML5 history mode
	  function Link (Vue) {
	    var _Vue$util = Vue.util;
	    var _bind = _Vue$util.bind;
	    var isObject = _Vue$util.isObject;
	    var addClass = _Vue$util.addClass;
	    var removeClass = _Vue$util.removeClass;

	    var onPriority = Vue.directive('on').priority;
	    var LINK_UPDATE = '__vue-router-link-update__';

	    var activeId = 0;

	    Vue.directive('link-active', {
	      priority: 9999,
	      bind: function bind() {
	        var _this = this;

	        var id = String(activeId++);
	        // collect v-links contained within this element.
	        // we need do this here before the parent-child relationship
	        // gets messed up by terminal directives (if, for, components)
	        var childLinks = this.el.querySelectorAll('[v-link]');
	        for (var i = 0, l = childLinks.length; i < l; i++) {
	          var link = childLinks[i];
	          var existingId = link.getAttribute(LINK_UPDATE);
	          var value = existingId ? existingId + ',' + id : id;
	          // leave a mark on the link element which can be persisted
	          // through fragment clones.
	          link.setAttribute(LINK_UPDATE, value);
	        }
	        this.vm.$on(LINK_UPDATE, this.cb = function (link, path) {
	          if (link.activeIds.indexOf(id) > -1) {
	            link.updateClasses(path, _this.el);
	          }
	        });
	      },
	      unbind: function unbind() {
	        this.vm.$off(LINK_UPDATE, this.cb);
	      }
	    });

	    Vue.directive('link', {
	      priority: onPriority - 2,

	      bind: function bind() {
	        var vm = this.vm;
	        /* istanbul ignore if */
	        if (!vm.$route) {
	          warn$1('v-link can only be used inside a router-enabled app.');
	          return;
	        }
	        this.router = vm.$route.router;
	        // update things when the route changes
	        this.unwatch = vm.$watch('$route', _bind(this.onRouteUpdate, this));
	        // check v-link-active ids
	        var activeIds = this.el.getAttribute(LINK_UPDATE);
	        if (activeIds) {
	          this.el.removeAttribute(LINK_UPDATE);
	          this.activeIds = activeIds.split(',');
	        }
	        // no need to handle click if link expects to be opened
	        // in a new window/tab.
	        /* istanbul ignore if */
	        if (this.el.tagName === 'A' && this.el.getAttribute('target') === '_blank') {
	          return;
	        }
	        // handle click
	        this.handler = _bind(this.onClick, this);
	        this.el.addEventListener('click', this.handler);
	      },

	      update: function update(target) {
	        this.target = target;
	        if (isObject(target)) {
	          this.append = target.append;
	          this.exact = target.exact;
	          this.prevActiveClass = this.activeClass;
	          this.activeClass = target.activeClass;
	        }
	        this.onRouteUpdate(this.vm.$route);
	      },

	      onClick: function onClick(e) {
	        // don't redirect with control keys
	        /* istanbul ignore if */
	        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
	        // don't redirect when preventDefault called
	        /* istanbul ignore if */
	        if (e.defaultPrevented) return;
	        // don't redirect on right click
	        /* istanbul ignore if */
	        if (e.button !== 0) return;

	        var target = this.target;
	        if (target) {
	          // v-link with expression, just go
	          e.preventDefault();
	          this.router.go(target);
	        } else {
	          // no expression, delegate for an <a> inside
	          var el = e.target;
	          while (el.tagName !== 'A' && el !== this.el) {
	            el = el.parentNode;
	          }
	          if (el.tagName === 'A' && sameOrigin(el)) {
	            e.preventDefault();
	            var path = el.pathname;
	            if (this.router.history.root) {
	              path = path.replace(this.router.history.rootRE, '');
	            }
	            this.router.go({
	              path: path,
	              replace: target && target.replace,
	              append: target && target.append
	            });
	          }
	        }
	      },

	      onRouteUpdate: function onRouteUpdate(route) {
	        // router.stringifyPath is dependent on current route
	        // and needs to be called again whenver route changes.
	        var newPath = this.router.stringifyPath(this.target);
	        if (this.path !== newPath) {
	          this.path = newPath;
	          this.updateActiveMatch();
	          this.updateHref();
	        }
	        if (this.activeIds) {
	          this.vm.$emit(LINK_UPDATE, this, route.path);
	        } else {
	          this.updateClasses(route.path, this.el);
	        }
	      },

	      updateActiveMatch: function updateActiveMatch() {
	        this.activeRE = this.path && !this.exact ? new RegExp('^' + this.path.replace(/\/$/, '').replace(queryStringRE, '').replace(regexEscapeRE, '\\$&') + '(\\/|$)') : null;
	      },

	      updateHref: function updateHref() {
	        if (this.el.tagName !== 'A') {
	          return;
	        }
	        var path = this.path;
	        var router = this.router;
	        var isAbsolute = path.charAt(0) === '/';
	        // do not format non-hash relative paths
	        var href = path && (router.mode === 'hash' || isAbsolute) ? router.history.formatPath(path, this.append) : path;
	        if (href) {
	          this.el.href = href;
	        } else {
	          this.el.removeAttribute('href');
	        }
	      },

	      updateClasses: function updateClasses(path, el) {
	        var activeClass = this.activeClass || this.router._linkActiveClass;
	        // clear old class
	        if (this.prevActiveClass && this.prevActiveClass !== activeClass) {
	          toggleClasses(el, this.prevActiveClass, removeClass);
	        }
	        // remove query string before matching
	        var dest = this.path.replace(queryStringRE, '');
	        path = path.replace(queryStringRE, '');
	        // add new class
	        if (this.exact) {
	          if (dest === path ||
	          // also allow additional trailing slash
	          dest.charAt(dest.length - 1) !== '/' && dest === path.replace(trailingSlashRE, '')) {
	            toggleClasses(el, activeClass, addClass);
	          } else {
	            toggleClasses(el, activeClass, removeClass);
	          }
	        } else {
	          if (this.activeRE && this.activeRE.test(path)) {
	            toggleClasses(el, activeClass, addClass);
	          } else {
	            toggleClasses(el, activeClass, removeClass);
	          }
	        }
	      },

	      unbind: function unbind() {
	        this.el.removeEventListener('click', this.handler);
	        this.unwatch && this.unwatch();
	      }
	    });

	    function sameOrigin(link) {
	      return link.protocol === location.protocol && link.hostname === location.hostname && link.port === location.port;
	    }

	    // this function is copied from v-bind:class implementation until
	    // we properly expose it...
	    function toggleClasses(el, key, fn) {
	      key = key.trim();
	      if (key.indexOf(' ') === -1) {
	        fn(el, key);
	        return;
	      }
	      var keys = key.split(/\s+/);
	      for (var i = 0, l = keys.length; i < l; i++) {
	        fn(el, keys[i]);
	      }
	    }
	  }

	  var historyBackends = {
	    abstract: AbstractHistory,
	    hash: HashHistory,
	    html5: HTML5History
	  };

	  // late bind during install
	  var Vue = undefined;

	  /**
	   * Router constructor
	   *
	   * @param {Object} [options]
	   */

	  var Router = (function () {
	    function Router() {
	      var _this = this;

	      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      var _ref$hashbang = _ref.hashbang;
	      var hashbang = _ref$hashbang === undefined ? true : _ref$hashbang;
	      var _ref$abstract = _ref.abstract;
	      var abstract = _ref$abstract === undefined ? false : _ref$abstract;
	      var _ref$history = _ref.history;
	      var history = _ref$history === undefined ? false : _ref$history;
	      var _ref$saveScrollPosition = _ref.saveScrollPosition;
	      var saveScrollPosition = _ref$saveScrollPosition === undefined ? false : _ref$saveScrollPosition;
	      var _ref$transitionOnLoad = _ref.transitionOnLoad;
	      var transitionOnLoad = _ref$transitionOnLoad === undefined ? false : _ref$transitionOnLoad;
	      var _ref$suppressTransitionError = _ref.suppressTransitionError;
	      var suppressTransitionError = _ref$suppressTransitionError === undefined ? false : _ref$suppressTransitionError;
	      var _ref$root = _ref.root;
	      var root = _ref$root === undefined ? null : _ref$root;
	      var _ref$linkActiveClass = _ref.linkActiveClass;
	      var linkActiveClass = _ref$linkActiveClass === undefined ? 'v-link-active' : _ref$linkActiveClass;
	      babelHelpers.classCallCheck(this, Router);

	      /* istanbul ignore if */
	      if (!Router.installed) {
	        throw new Error('Please install the Router with Vue.use() before ' + 'creating an instance.');
	      }

	      // Vue instances
	      this.app = null;
	      this._children = [];

	      // route recognizer
	      this._recognizer = new RouteRecognizer();
	      this._guardRecognizer = new RouteRecognizer();

	      // state
	      this._started = false;
	      this._startCb = null;
	      this._currentRoute = {};
	      this._currentTransition = null;
	      this._previousTransition = null;
	      this._notFoundHandler = null;
	      this._notFoundRedirect = null;
	      this._beforeEachHooks = [];
	      this._afterEachHooks = [];

	      // trigger transition on initial render?
	      this._rendered = false;
	      this._transitionOnLoad = transitionOnLoad;

	      // history mode
	      this._root = root;
	      this._abstract = abstract;
	      this._hashbang = hashbang;

	      // check if HTML5 history is available
	      var hasPushState = typeof window !== 'undefined' && window.history && window.history.pushState;
	      this._history = history && hasPushState;
	      this._historyFallback = history && !hasPushState;

	      // create history object
	      var inBrowser = Vue.util.inBrowser;
	      this.mode = !inBrowser || this._abstract ? 'abstract' : this._history ? 'html5' : 'hash';

	      var History = historyBackends[this.mode];
	      this.history = new History({
	        root: root,
	        hashbang: this._hashbang,
	        onChange: function onChange(path, state, anchor) {
	          _this._match(path, state, anchor);
	        }
	      });

	      // other options
	      this._saveScrollPosition = saveScrollPosition;
	      this._linkActiveClass = linkActiveClass;
	      this._suppress = suppressTransitionError;
	    }

	    /**
	     * Allow directly passing components to a route
	     * definition.
	     *
	     * @param {String} path
	     * @param {Object} handler
	     */

	    // API ===================================================

	    /**
	    * Register a map of top-level paths.
	    *
	    * @param {Object} map
	    */

	    Router.prototype.map = function map(_map) {
	      for (var route in _map) {
	        this.on(route, _map[route]);
	      }
	      return this;
	    };

	    /**
	     * Register a single root-level path
	     *
	     * @param {String} rootPath
	     * @param {Object} handler
	     *                 - {String} component
	     *                 - {Object} [subRoutes]
	     *                 - {Boolean} [forceRefresh]
	     *                 - {Function} [before]
	     *                 - {Function} [after]
	     */

	    Router.prototype.on = function on(rootPath, handler) {
	      if (rootPath === '*') {
	        this._notFound(handler);
	      } else {
	        this._addRoute(rootPath, handler, []);
	      }
	      return this;
	    };

	    /**
	     * Set redirects.
	     *
	     * @param {Object} map
	     */

	    Router.prototype.redirect = function redirect(map) {
	      for (var path in map) {
	        this._addRedirect(path, map[path]);
	      }
	      return this;
	    };

	    /**
	     * Set aliases.
	     *
	     * @param {Object} map
	     */

	    Router.prototype.alias = function alias(map) {
	      for (var path in map) {
	        this._addAlias(path, map[path]);
	      }
	      return this;
	    };

	    /**
	     * Set global before hook.
	     *
	     * @param {Function} fn
	     */

	    Router.prototype.beforeEach = function beforeEach(fn) {
	      this._beforeEachHooks.push(fn);
	      return this;
	    };

	    /**
	     * Set global after hook.
	     *
	     * @param {Function} fn
	     */

	    Router.prototype.afterEach = function afterEach(fn) {
	      this._afterEachHooks.push(fn);
	      return this;
	    };

	    /**
	     * Navigate to a given path.
	     * The path can be an object describing a named path in
	     * the format of { name: '...', params: {}, query: {}}
	     * The path is assumed to be already decoded, and will
	     * be resolved against root (if provided)
	     *
	     * @param {String|Object} path
	     * @param {Boolean} [replace]
	     */

	    Router.prototype.go = function go(path) {
	      var replace = false;
	      var append = false;
	      if (Vue.util.isObject(path)) {
	        replace = path.replace;
	        append = path.append;
	      }
	      path = this.stringifyPath(path);
	      if (path) {
	        this.history.go(path, replace, append);
	      }
	    };

	    /**
	     * Short hand for replacing current path
	     *
	     * @param {String} path
	     */

	    Router.prototype.replace = function replace(path) {
	      if (typeof path === 'string') {
	        path = { path: path };
	      }
	      path.replace = true;
	      this.go(path);
	    };

	    /**
	     * Start the router.
	     *
	     * @param {VueConstructor} App
	     * @param {String|Element} container
	     * @param {Function} [cb]
	     */

	    Router.prototype.start = function start(App, container, cb) {
	      /* istanbul ignore if */
	      if (this._started) {
	        warn$1('already started.');
	        return;
	      }
	      this._started = true;
	      this._startCb = cb;
	      if (!this.app) {
	        /* istanbul ignore if */
	        if (!App || !container) {
	          throw new Error('Must start vue-router with a component and a ' + 'root container.');
	        }
	        /* istanbul ignore if */
	        if (App instanceof Vue) {
	          throw new Error('Must start vue-router with a component, not a ' + 'Vue instance.');
	        }
	        this._appContainer = container;
	        var Ctor = this._appConstructor = typeof App === 'function' ? App : Vue.extend(App);
	        // give it a name for better debugging
	        Ctor.options.name = Ctor.options.name || 'RouterApp';
	      }

	      // handle history fallback in browsers that do not
	      // support HTML5 history API
	      if (this._historyFallback) {
	        var _location = window.location;
	        var _history = new HTML5History({ root: this._root });
	        var path = _history.root ? _location.pathname.replace(_history.rootRE, '') : _location.pathname;
	        if (path && path !== '/') {
	          _location.assign((_history.root || '') + '/' + this.history.formatPath(path) + _location.search);
	          return;
	        }
	      }

	      this.history.start();
	    };

	    /**
	     * Stop listening to route changes.
	     */

	    Router.prototype.stop = function stop() {
	      this.history.stop();
	      this._started = false;
	    };

	    /**
	     * Normalize named route object / string paths into
	     * a string.
	     *
	     * @param {Object|String|Number} path
	     * @return {String}
	     */

	    Router.prototype.stringifyPath = function stringifyPath(path) {
	      var generatedPath = '';
	      if (path && typeof path === 'object') {
	        if (path.name) {
	          var extend = Vue.util.extend;
	          var currentParams = this._currentTransition && this._currentTransition.to.params;
	          var targetParams = path.params || {};
	          var params = currentParams ? extend(extend({}, currentParams), targetParams) : targetParams;
	          generatedPath = encodeURI(this._recognizer.generate(path.name, params));
	        } else if (path.path) {
	          generatedPath = encodeURI(path.path);
	        }
	        if (path.query) {
	          // note: the generated query string is pre-URL-encoded by the recognizer
	          var query = this._recognizer.generateQueryString(path.query);
	          if (generatedPath.indexOf('?') > -1) {
	            generatedPath += '&' + query.slice(1);
	          } else {
	            generatedPath += query;
	          }
	        }
	      } else {
	        generatedPath = encodeURI(path ? path + '' : '');
	      }
	      return generatedPath;
	    };

	    // Internal methods ======================================

	    /**
	    * Add a route containing a list of segments to the internal
	    * route recognizer. Will be called recursively to add all
	    * possible sub-routes.
	    *
	    * @param {String} path
	    * @param {Object} handler
	    * @param {Array} segments
	    */

	    Router.prototype._addRoute = function _addRoute(path, handler, segments) {
	      guardComponent(path, handler);
	      handler.path = path;
	      handler.fullPath = (segments.reduce(function (path, segment) {
	        return path + segment.path;
	      }, '') + path).replace('//', '/');
	      segments.push({
	        path: path,
	        handler: handler
	      });
	      this._recognizer.add(segments, {
	        as: handler.name
	      });
	      // add sub routes
	      if (handler.subRoutes) {
	        for (var subPath in handler.subRoutes) {
	          // recursively walk all sub routes
	          this._addRoute(subPath, handler.subRoutes[subPath],
	          // pass a copy in recursion to avoid mutating
	          // across branches
	          segments.slice());
	        }
	      }
	    };

	    /**
	     * Set the notFound route handler.
	     *
	     * @param {Object} handler
	     */

	    Router.prototype._notFound = function _notFound(handler) {
	      guardComponent('*', handler);
	      this._notFoundHandler = [{ handler: handler }];
	    };

	    /**
	     * Add a redirect record.
	     *
	     * @param {String} path
	     * @param {String} redirectPath
	     */

	    Router.prototype._addRedirect = function _addRedirect(path, redirectPath) {
	      if (path === '*') {
	        this._notFoundRedirect = redirectPath;
	      } else {
	        this._addGuard(path, redirectPath, this.replace);
	      }
	    };

	    /**
	     * Add an alias record.
	     *
	     * @param {String} path
	     * @param {String} aliasPath
	     */

	    Router.prototype._addAlias = function _addAlias(path, aliasPath) {
	      this._addGuard(path, aliasPath, this._match);
	    };

	    /**
	     * Add a path guard.
	     *
	     * @param {String} path
	     * @param {String} mappedPath
	     * @param {Function} handler
	     */

	    Router.prototype._addGuard = function _addGuard(path, mappedPath, _handler) {
	      var _this2 = this;

	      this._guardRecognizer.add([{
	        path: path,
	        handler: function handler(match, query) {
	          var realPath = mapParams(mappedPath, match.params, query);
	          _handler.call(_this2, realPath);
	        }
	      }]);
	    };

	    /**
	     * Check if a path matches any redirect records.
	     *
	     * @param {String} path
	     * @return {Boolean} - if true, will skip normal match.
	     */

	    Router.prototype._checkGuard = function _checkGuard(path) {
	      var matched = this._guardRecognizer.recognize(path, true);
	      if (matched) {
	        matched[0].handler(matched[0], matched.queryParams);
	        return true;
	      } else if (this._notFoundRedirect) {
	        matched = this._recognizer.recognize(path);
	        if (!matched) {
	          this.replace(this._notFoundRedirect);
	          return true;
	        }
	      }
	    };

	    /**
	     * Match a URL path and set the route context on vm,
	     * triggering view updates.
	     *
	     * @param {String} path
	     * @param {Object} [state]
	     * @param {String} [anchor]
	     */

	    Router.prototype._match = function _match(path, state, anchor) {
	      var _this3 = this;

	      if (this._checkGuard(path)) {
	        return;
	      }

	      var currentRoute = this._currentRoute;
	      var currentTransition = this._currentTransition;

	      if (currentTransition) {
	        if (currentTransition.to.path === path) {
	          // do nothing if we have an active transition going to the same path
	          return;
	        } else if (currentRoute.path === path) {
	          // We are going to the same path, but we also have an ongoing but
	          // not-yet-validated transition. Abort that transition and reset to
	          // prev transition.
	          currentTransition.aborted = true;
	          this._currentTransition = this._prevTransition;
	          return;
	        } else {
	          // going to a totally different path. abort ongoing transition.
	          currentTransition.aborted = true;
	        }
	      }

	      // construct new route and transition context
	      var route = new Route(path, this);
	      var transition = new RouteTransition(this, route, currentRoute);

	      // current transition is updated right now.
	      // however, current route will only be updated after the transition has
	      // been validated.
	      this._prevTransition = currentTransition;
	      this._currentTransition = transition;

	      if (!this.app) {
	        (function () {
	          // initial render
	          var router = _this3;
	          _this3.app = new _this3._appConstructor({
	            el: _this3._appContainer,
	            created: function created() {
	              this.$router = router;
	            },
	            _meta: {
	              $route: route
	            }
	          });
	        })();
	      }

	      // check global before hook
	      var beforeHooks = this._beforeEachHooks;
	      var startTransition = function startTransition() {
	        transition.start(function () {
	          _this3._postTransition(route, state, anchor);
	        });
	      };

	      if (beforeHooks.length) {
	        transition.runQueue(beforeHooks, function (hook, _, next) {
	          if (transition === _this3._currentTransition) {
	            transition.callHook(hook, null, next, {
	              expectBoolean: true
	            });
	          }
	        }, startTransition);
	      } else {
	        startTransition();
	      }

	      if (!this._rendered && this._startCb) {
	        this._startCb.call(null);
	      }

	      // HACK:
	      // set rendered to true after the transition start, so
	      // that components that are acitvated synchronously know
	      // whether it is the initial render.
	      this._rendered = true;
	    };

	    /**
	     * Set current to the new transition.
	     * This is called by the transition object when the
	     * validation of a route has succeeded.
	     *
	     * @param {Transition} transition
	     */

	    Router.prototype._onTransitionValidated = function _onTransitionValidated(transition) {
	      // set current route
	      var route = this._currentRoute = transition.to;
	      // update route context for all children
	      if (this.app.$route !== route) {
	        this.app.$route = route;
	        this._children.forEach(function (child) {
	          child.$route = route;
	        });
	      }
	      // call global after hook
	      if (this._afterEachHooks.length) {
	        this._afterEachHooks.forEach(function (hook) {
	          return hook.call(null, {
	            to: transition.to,
	            from: transition.from
	          });
	        });
	      }
	      this._currentTransition.done = true;
	    };

	    /**
	     * Handle stuff after the transition.
	     *
	     * @param {Route} route
	     * @param {Object} [state]
	     * @param {String} [anchor]
	     */

	    Router.prototype._postTransition = function _postTransition(route, state, anchor) {
	      // handle scroll positions
	      // saved scroll positions take priority
	      // then we check if the path has an anchor
	      var pos = state && state.pos;
	      if (pos && this._saveScrollPosition) {
	        Vue.nextTick(function () {
	          window.scrollTo(pos.x, pos.y);
	        });
	      } else if (anchor) {
	        Vue.nextTick(function () {
	          var el = document.getElementById(anchor.slice(1));
	          if (el) {
	            window.scrollTo(window.scrollX, el.offsetTop);
	          }
	        });
	      }
	    };

	    return Router;
	  })();

	  function guardComponent(path, handler) {
	    var comp = handler.component;
	    if (Vue.util.isPlainObject(comp)) {
	      comp = handler.component = Vue.extend(comp);
	    }
	    /* istanbul ignore if */
	    if (typeof comp !== 'function') {
	      handler.component = null;
	      warn$1('invalid component for route "' + path + '".');
	    }
	  }

	  /* Installation */

	  Router.installed = false;

	  /**
	   * Installation interface.
	   * Install the necessary directives.
	   */

	  Router.install = function (externalVue) {
	    /* istanbul ignore if */
	    if (Router.installed) {
	      warn$1('already installed.');
	      return;
	    }
	    Vue = externalVue;
	    applyOverride(Vue);
	    View(Vue);
	    Link(Vue);
	    exports$1.Vue = Vue;
	    Router.installed = true;
	  };

	  // auto install
	  /* istanbul ignore if */
	  if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(Router);
	  }

	  return Router;

	}));

/***/ },
/* 5 */
/***/ function(module, exports) {

	/*!
	 * vue-resource v0.7.4
	 * https://github.com/vuejs/vue-resource
	 * Released under the MIT License.
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	};

	/**
	 * Utility functions.
	 */

	var util = {};
	var config = {};
	var array = [];
	var console = window.console;
	function Util (Vue) {
	    util = Vue.util;
	    config = Vue.config;
	}

	var isArray = Array.isArray;

	function warn(msg) {
	    if (console && util.warn && (!config.silent || config.debug)) {
	        console.warn('[VueResource warn]: ' + msg);
	    }
	}

	function error(msg) {
	    if (console) {
	        console.error(msg);
	    }
	}

	function nextTick(cb, ctx) {
	    return util.nextTick(cb, ctx);
	}

	function trim(str) {
	    return str.replace(/^\s*|\s*$/g, '');
	}

	function toLower(str) {
	    return str ? str.toLowerCase() : '';
	}

	function isString(val) {
	    return typeof val === 'string';
	}

	function isFunction(val) {
	    return typeof val === 'function';
	}

	function isObject(obj) {
	    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
	}

	function isPlainObject(obj) {
	    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
	}

	function options(fn, obj, opts) {

	    opts = opts || {};

	    if (isFunction(opts)) {
	        opts = opts.call(obj);
	    }

	    return merge(fn.bind({ $vm: obj, $options: opts }), fn, { $options: opts });
	}

	function each(obj, iterator) {

	    var i, key;

	    if (typeof obj.length == 'number') {
	        for (i = 0; i < obj.length; i++) {
	            iterator.call(obj[i], obj[i], i);
	        }
	    } else if (isObject(obj)) {
	        for (key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                iterator.call(obj[key], obj[key], key);
	            }
	        }
	    }

	    return obj;
	}

	function extend(target) {

	    var args = array.slice.call(arguments, 1);

	    args.forEach(function (arg) {
	        _merge(target, arg);
	    });

	    return target;
	}

	function merge(target) {

	    var args = array.slice.call(arguments, 1);

	    args.forEach(function (arg) {
	        _merge(target, arg, true);
	    });

	    return target;
	}

	function _merge(target, source, deep) {
	    for (var key in source) {
	        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
	                target[key] = {};
	            }
	            if (isArray(source[key]) && !isArray(target[key])) {
	                target[key] = [];
	            }
	            _merge(target[key], source[key], deep);
	        } else if (source[key] !== undefined) {
	            target[key] = source[key];
	        }
	    }
	}

	function root (options, next) {

	    var url = next(options);

	    if (isString(options.root) && !url.match(/^(https?:)?\//)) {
	        url = options.root + '/' + url;
	    }

	    return url;
	}

	function query (options, next) {

	    var urlParams = Object.keys(Url.options.params),
	        query = {},
	        url = next(options);

	    each(options.params, function (value, key) {
	        if (urlParams.indexOf(key) === -1) {
	            query[key] = value;
	        }
	    });

	    query = Url.params(query);

	    if (query) {
	        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
	    }

	    return url;
	}

	function legacy (options, next) {

	    var variables = [],
	        url = next(options);

	    url = url.replace(/(\/?):([a-z]\w*)/gi, function (match, slash, name) {

	        warn('The `:' + name + '` parameter syntax has been deprecated. Use the `{' + name + '}` syntax instead.');

	        if (options.params[name]) {
	            variables.push(name);
	            return slash + encodeUriSegment(options.params[name]);
	        }

	        return '';
	    });

	    variables.forEach(function (key) {
	        delete options.params[key];
	    });

	    return url;
	}

	function encodeUriSegment(value) {

	    return encodeUriQuery(value, true).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
	}

	function encodeUriQuery(value, spaces) {

	    return encodeURIComponent(value).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, spaces ? '%20' : '+');
	}

	/**
	 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
	 */

	function expand(url, params, variables) {

	    var tmpl = parse(url),
	        expanded = tmpl.expand(params);

	    if (variables) {
	        variables.push.apply(variables, tmpl.vars);
	    }

	    return expanded;
	}

	function parse(template) {

	    var operators = ['+', '#', '.', '/', ';', '?', '&'],
	        variables = [];

	    return {
	        vars: variables,
	        expand: function expand(context) {
	            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
	                if (expression) {

	                    var operator = null,
	                        values = [];

	                    if (operators.indexOf(expression.charAt(0)) !== -1) {
	                        operator = expression.charAt(0);
	                        expression = expression.substr(1);
	                    }

	                    expression.split(/,/g).forEach(function (variable) {
	                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
	                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
	                        variables.push(tmp[1]);
	                    });

	                    if (operator && operator !== '+') {

	                        var separator = ',';

	                        if (operator === '?') {
	                            separator = '&';
	                        } else if (operator !== '#') {
	                            separator = operator;
	                        }

	                        return (values.length !== 0 ? operator : '') + values.join(separator);
	                    } else {
	                        return values.join(',');
	                    }
	                } else {
	                    return encodeReserved(literal);
	                }
	            });
	        }
	    };
	}

	function getValues(context, operator, key, modifier) {

	    var value = context[key],
	        result = [];

	    if (isDefined(value) && value !== '') {
	        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
	            value = value.toString();

	            if (modifier && modifier !== '*') {
	                value = value.substring(0, parseInt(modifier, 10));
	            }

	            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	        } else {
	            if (modifier === '*') {
	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            result.push(encodeValue(operator, value[k], k));
	                        }
	                    });
	                }
	            } else {
	                var tmp = [];

	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        tmp.push(encodeValue(operator, value));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            tmp.push(encodeURIComponent(k));
	                            tmp.push(encodeValue(operator, value[k].toString()));
	                        }
	                    });
	                }

	                if (isKeyOperator(operator)) {
	                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
	                } else if (tmp.length !== 0) {
	                    result.push(tmp.join(','));
	                }
	            }
	        }
	    } else {
	        if (operator === ';') {
	            result.push(encodeURIComponent(key));
	        } else if (value === '' && (operator === '&' || operator === '?')) {
	            result.push(encodeURIComponent(key) + '=');
	        } else if (value === '') {
	            result.push('');
	        }
	    }

	    return result;
	}

	function isDefined(value) {
	    return value !== undefined && value !== null;
	}

	function isKeyOperator(operator) {
	    return operator === ';' || operator === '&' || operator === '?';
	}

	function encodeValue(operator, value, key) {

	    value = operator === '+' || operator === '#' ? encodeReserved(value) : encodeURIComponent(value);

	    if (key) {
	        return encodeURIComponent(key) + '=' + value;
	    } else {
	        return value;
	    }
	}

	function encodeReserved(str) {
	    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
	        if (!/%[0-9A-Fa-f]/.test(part)) {
	            part = encodeURI(part);
	        }
	        return part;
	    }).join('');
	}

	function template (options) {

	    var variables = [],
	        url = expand(options.url, options.params, variables);

	    variables.forEach(function (key) {
	        delete options.params[key];
	    });

	    return url;
	}

	/**
	 * Service for URL templating.
	 */

	var ie = document.documentMode;
	var el = document.createElement('a');

	function Url(url, params) {

	    var self = this || {},
	        options = url,
	        transform;

	    if (isString(url)) {
	        options = { url: url, params: params };
	    }

	    options = merge({}, Url.options, self.$options, options);

	    Url.transforms.forEach(function (handler) {
	        transform = factory(handler, transform, self.$vm);
	    });

	    return transform(options);
	}

	/**
	 * Url options.
	 */

	Url.options = {
	    url: '',
	    root: null,
	    params: {}
	};

	/**
	 * Url transforms.
	 */

	Url.transforms = [template, legacy, query, root];

	/**
	 * Encodes a Url parameter string.
	 *
	 * @param {Object} obj
	 */

	Url.params = function (obj) {

	    var params = [],
	        escape = encodeURIComponent;

	    params.add = function (key, value) {

	        if (isFunction(value)) {
	            value = value();
	        }

	        if (value === null) {
	            value = '';
	        }

	        this.push(escape(key) + '=' + escape(value));
	    };

	    serialize(params, obj);

	    return params.join('&').replace(/%20/g, '+');
	};

	/**
	 * Parse a URL and return its components.
	 *
	 * @param {String} url
	 */

	Url.parse = function (url) {

	    if (ie) {
	        el.href = url;
	        url = el.href;
	    }

	    el.href = url;

	    return {
	        href: el.href,
	        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
	        port: el.port,
	        host: el.host,
	        hostname: el.hostname,
	        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
	        search: el.search ? el.search.replace(/^\?/, '') : '',
	        hash: el.hash ? el.hash.replace(/^#/, '') : ''
	    };
	};

	function factory(handler, next, vm) {
	    return function (options) {
	        return handler.call(vm, options, next);
	    };
	}

	function serialize(params, obj, scope) {

	    var array = isArray(obj),
	        plain = isPlainObject(obj),
	        hash;

	    each(obj, function (value, key) {

	        hash = isObject(value) || isArray(value);

	        if (scope) {
	            key = scope + '[' + (plain || hash ? key : '') + ']';
	        }

	        if (!scope && array) {
	            params.add(value.name, value.value);
	        } else if (hash) {
	            serialize(params, value, key);
	        } else {
	            params.add(key, value);
	        }
	    });
	}

	/**
	 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
	 */

	var RESOLVED = 0;
	var REJECTED = 1;
	var PENDING = 2;

	function Promise$2(executor) {

	    this.state = PENDING;
	    this.value = undefined;
	    this.deferred = [];

	    var promise = this;

	    try {
	        executor(function (x) {
	            promise.resolve(x);
	        }, function (r) {
	            promise.reject(r);
	        });
	    } catch (e) {
	        promise.reject(e);
	    }
	}

	Promise$2.reject = function (r) {
	    return new Promise$2(function (resolve, reject) {
	        reject(r);
	    });
	};

	Promise$2.resolve = function (x) {
	    return new Promise$2(function (resolve, reject) {
	        resolve(x);
	    });
	};

	Promise$2.all = function all(iterable) {
	    return new Promise$2(function (resolve, reject) {
	        var count = 0,
	            result = [];

	        if (iterable.length === 0) {
	            resolve(result);
	        }

	        function resolver(i) {
	            return function (x) {
	                result[i] = x;
	                count += 1;

	                if (count === iterable.length) {
	                    resolve(result);
	                }
	            };
	        }

	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$2.resolve(iterable[i]).then(resolver(i), reject);
	        }
	    });
	};

	Promise$2.race = function race(iterable) {
	    return new Promise$2(function (resolve, reject) {
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$2.resolve(iterable[i]).then(resolve, reject);
	        }
	    });
	};

	var p$1 = Promise$2.prototype;

	p$1.resolve = function resolve(x) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (x === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        var called = false;

	        try {
	            var then = x && x['then'];

	            if (x !== null && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && typeof then === 'function') {
	                then.call(x, function (x) {
	                    if (!called) {
	                        promise.resolve(x);
	                    }
	                    called = true;
	                }, function (r) {
	                    if (!called) {
	                        promise.reject(r);
	                    }
	                    called = true;
	                });
	                return;
	            }
	        } catch (e) {
	            if (!called) {
	                promise.reject(e);
	            }
	            return;
	        }

	        promise.state = RESOLVED;
	        promise.value = x;
	        promise.notify();
	    }
	};

	p$1.reject = function reject(reason) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (reason === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        promise.state = REJECTED;
	        promise.value = reason;
	        promise.notify();
	    }
	};

	p$1.notify = function notify() {
	    var promise = this;

	    nextTick(function () {
	        if (promise.state !== PENDING) {
	            while (promise.deferred.length) {
	                var deferred = promise.deferred.shift(),
	                    onResolved = deferred[0],
	                    onRejected = deferred[1],
	                    resolve = deferred[2],
	                    reject = deferred[3];

	                try {
	                    if (promise.state === RESOLVED) {
	                        if (typeof onResolved === 'function') {
	                            resolve(onResolved.call(undefined, promise.value));
	                        } else {
	                            resolve(promise.value);
	                        }
	                    } else if (promise.state === REJECTED) {
	                        if (typeof onRejected === 'function') {
	                            resolve(onRejected.call(undefined, promise.value));
	                        } else {
	                            reject(promise.value);
	                        }
	                    }
	                } catch (e) {
	                    reject(e);
	                }
	            }
	        }
	    });
	};

	p$1.then = function then(onResolved, onRejected) {
	    var promise = this;

	    return new Promise$2(function (resolve, reject) {
	        promise.deferred.push([onResolved, onRejected, resolve, reject]);
	        promise.notify();
	    });
	};

	p$1.catch = function (onRejected) {
	    return this.then(undefined, onRejected);
	};

	var PromiseObj = window.Promise || Promise$2;

	function Promise$1(executor, context) {

	    if (executor instanceof PromiseObj) {
	        this.promise = executor;
	    } else {
	        this.promise = new PromiseObj(executor.bind(context));
	    }

	    this.context = context;
	}

	Promise$1.all = function (iterable, context) {
	    return new Promise$1(PromiseObj.all(iterable), context);
	};

	Promise$1.resolve = function (value, context) {
	    return new Promise$1(PromiseObj.resolve(value), context);
	};

	Promise$1.reject = function (reason, context) {
	    return new Promise$1(PromiseObj.reject(reason), context);
	};

	Promise$1.race = function (iterable, context) {
	    return new Promise$1(PromiseObj.race(iterable), context);
	};

	var p = Promise$1.prototype;

	p.bind = function (context) {
	    this.context = context;
	    return this;
	};

	p.then = function (fulfilled, rejected) {

	    if (fulfilled && fulfilled.bind && this.context) {
	        fulfilled = fulfilled.bind(this.context);
	    }

	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }

	    this.promise = this.promise.then(fulfilled, rejected);

	    return this;
	};

	p.catch = function (rejected) {

	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }

	    this.promise = this.promise.catch(rejected);

	    return this;
	};

	p.finally = function (callback) {

	    return this.then(function (value) {
	        callback.call(this);
	        return value;
	    }, function (reason) {
	        callback.call(this);
	        return PromiseObj.reject(reason);
	    });
	};

	p.success = function (callback) {

	    warn('The `success` method has been deprecated. Use the `then` method instead.');

	    return this.then(function (response) {
	        return callback.call(this, response.data, response.status, response) || response;
	    });
	};

	p.error = function (callback) {

	    warn('The `error` method has been deprecated. Use the `catch` method instead.');

	    return this.catch(function (response) {
	        return callback.call(this, response.data, response.status, response) || response;
	    });
	};

	p.always = function (callback) {

	    warn('The `always` method has been deprecated. Use the `finally` method instead.');

	    var cb = function cb(response) {
	        return callback.call(this, response.data, response.status, response) || response;
	    };

	    return this.then(cb, cb);
	};

	function xdrClient (request) {
	    return new Promise$1(function (resolve) {

	        var xdr = new XDomainRequest(),
	            response = { request: request },
	            handler;

	        request.cancel = function () {
	            xdr.abort();
	        };

	        xdr.open(request.method, Url(request), true);

	        handler = function handler(event) {

	            response.data = xdr.responseText;
	            response.status = xdr.status;
	            response.statusText = xdr.statusText || '';

	            resolve(response);
	        };

	        xdr.timeout = 0;
	        xdr.onload = handler;
	        xdr.onabort = handler;
	        xdr.onerror = handler;
	        xdr.ontimeout = function () {};
	        xdr.onprogress = function () {};

	        xdr.send(request.data);
	    });
	}

	var originUrl = Url.parse(location.href);
	var supportCors = 'withCredentials' in new XMLHttpRequest();

	var exports$1 = {
	    request: function request(_request) {

	        if (_request.crossOrigin === null) {
	            _request.crossOrigin = crossOrigin(_request);
	        }

	        if (_request.crossOrigin) {

	            if (!supportCors) {
	                _request.client = xdrClient;
	            }

	            _request.emulateHTTP = false;
	        }

	        return _request;
	    }
	};

	function crossOrigin(request) {

	    var requestUrl = Url.parse(Url(request));

	    return requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host;
	}

	var exports$2 = {
	    request: function request(_request) {

	        if (_request.emulateJSON && isPlainObject(_request.data)) {
	            _request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	            _request.data = Url.params(_request.data);
	        }

	        if (isObject(_request.data) && /FormData/i.test(_request.data.toString())) {
	            delete _request.headers['Content-Type'];
	        }

	        if (isPlainObject(_request.data)) {
	            _request.data = JSON.stringify(_request.data);
	        }

	        return _request;
	    },
	    response: function response(_response) {

	        try {
	            _response.data = JSON.parse(_response.data);
	        } catch (e) {}

	        return _response;
	    }
	};

	function jsonpClient (request) {
	    return new Promise$1(function (resolve) {

	        var callback = '_jsonp' + Math.random().toString(36).substr(2),
	            response = { request: request, data: null },
	            handler,
	            script;

	        request.params[request.jsonp] = callback;
	        request.cancel = function () {
	            handler({ type: 'cancel' });
	        };

	        script = document.createElement('script');
	        script.src = Url(request);
	        script.type = 'text/javascript';
	        script.async = true;

	        window[callback] = function (data) {
	            response.data = data;
	        };

	        handler = function handler(event) {

	            if (event.type === 'load' && response.data !== null) {
	                response.status = 200;
	            } else if (event.type === 'error') {
	                response.status = 404;
	            } else {
	                response.status = 0;
	            }

	            resolve(response);

	            delete window[callback];
	            document.body.removeChild(script);
	        };

	        script.onload = handler;
	        script.onerror = handler;

	        document.body.appendChild(script);
	    });
	}

	var exports$3 = {
	    request: function request(_request) {

	        if (_request.method == 'JSONP') {
	            _request.client = jsonpClient;
	        }

	        return _request;
	    }
	};

	var exports$4 = {
	    request: function request(_request) {

	        if (isFunction(_request.beforeSend)) {
	            _request.beforeSend.call(this, _request);
	        }

	        return _request;
	    }
	};

	/**
	 * HTTP method override Interceptor.
	 */

	var exports$5 = {
	    request: function request(_request) {

	        if (_request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(_request.method)) {
	            _request.headers['X-HTTP-Method-Override'] = _request.method;
	            _request.method = 'POST';
	        }

	        return _request;
	    }
	};

	var exports$6 = {
	    request: function request(_request) {

	        _request.method = _request.method.toUpperCase();
	        _request.headers = extend({}, Http.headers.common, !_request.crossOrigin ? Http.headers.custom : {}, Http.headers[_request.method.toLowerCase()], _request.headers);

	        if (isPlainObject(_request.data) && /^(GET|JSONP)$/i.test(_request.method)) {
	            extend(_request.params, _request.data);
	            delete _request.data;
	        }

	        return _request;
	    }
	};

	/**
	 * Timeout Interceptor.
	 */

	var exports$7 = function exports() {

	    var timeout;

	    return {
	        request: function request(_request) {

	            if (_request.timeout) {
	                timeout = setTimeout(function () {
	                    _request.cancel();
	                }, _request.timeout);
	            }

	            return _request;
	        },
	        response: function response(_response) {

	            clearTimeout(timeout);

	            return _response;
	        }
	    };
	};

	function interceptor (handler, vm) {

	    return function (client) {

	        if (isFunction(handler)) {
	            handler = handler.call(vm, Promise$1);
	        }

	        return function (request) {

	            if (isFunction(handler.request)) {
	                request = handler.request.call(vm, request);
	            }

	            return when(request, function (request) {
	                return when(client(request), function (response) {

	                    if (isFunction(handler.response)) {
	                        response = handler.response.call(vm, response);
	                    }

	                    return response;
	                });
	            });
	        };
	    };
	}

	function when(value, fulfilled, rejected) {

	    var promise = Promise$1.resolve(value);

	    if (arguments.length < 2) {
	        return promise;
	    }

	    return promise.then(fulfilled, rejected);
	}

	function xhrClient (request) {
	    return new Promise$1(function (resolve) {

	        var xhr = new XMLHttpRequest(),
	            response = { request: request },
	            handler;

	        request.cancel = function () {
	            xhr.abort();
	        };

	        xhr.open(request.method, Url(request), true);

	        handler = function handler(event) {

	            response.data = 'response' in xhr ? xhr.response : xhr.responseText;
	            response.status = xhr.status === 1223 ? 204 : xhr.status; // IE9 status bug
	            response.statusText = trim(xhr.statusText || '');
	            response.headers = xhr.getAllResponseHeaders();

	            resolve(response);
	        };

	        xhr.timeout = 0;
	        xhr.onload = handler;
	        xhr.onabort = handler;
	        xhr.onerror = handler;
	        xhr.ontimeout = function () {};
	        xhr.onprogress = function () {};

	        if (isPlainObject(request.xhr)) {
	            extend(xhr, request.xhr);
	        }

	        if (isPlainObject(request.upload)) {
	            extend(xhr.upload, request.upload);
	        }

	        each(request.headers || {}, function (value, header) {
	            xhr.setRequestHeader(header, value);
	        });

	        xhr.send(request.data);
	    });
	}

	function Client (request) {

	    var response = (request.client || xhrClient)(request);

	    return Promise$1.resolve(response).then(function (response) {

	        if (response.headers) {

	            var headers = parseHeaders(response.headers);

	            response.headers = function (name) {

	                if (name) {
	                    return headers[toLower(name)];
	                }

	                return headers;
	            };
	        }

	        response.ok = response.status >= 200 && response.status < 300;

	        return response;
	    });
	}

	function parseHeaders(str) {

	    var headers = {},
	        value,
	        name,
	        i;

	    if (isString(str)) {
	        each(str.split('\n'), function (row) {

	            i = row.indexOf(':');
	            name = trim(toLower(row.slice(0, i)));
	            value = trim(row.slice(i + 1));

	            if (headers[name]) {

	                if (isArray(headers[name])) {
	                    headers[name].push(value);
	                } else {
	                    headers[name] = [headers[name], value];
	                }
	            } else {

	                headers[name] = value;
	            }
	        });
	    }

	    return headers;
	}

	/**
	 * Service for sending network requests.
	 */

	var jsonType = { 'Content-Type': 'application/json' };

	function Http(url, options) {

	    var self = this || {},
	        client = Client,
	        request,
	        promise;

	    Http.interceptors.forEach(function (handler) {
	        client = interceptor(handler, self.$vm)(client);
	    });

	    options = isObject(url) ? url : extend({ url: url }, options);
	    request = merge({}, Http.options, self.$options, options);
	    promise = client(request).bind(self.$vm).then(function (response) {

	        return response.ok ? response : Promise$1.reject(response);
	    }, function (response) {

	        if (response instanceof Error) {
	            error(response);
	        }

	        return Promise$1.reject(response);
	    });

	    if (request.success) {
	        promise.success(request.success);
	    }

	    if (request.error) {
	        promise.error(request.error);
	    }

	    return promise;
	}

	Http.options = {
	    method: 'get',
	    data: '',
	    params: {},
	    headers: {},
	    xhr: null,
	    upload: null,
	    jsonp: 'callback',
	    beforeSend: null,
	    crossOrigin: null,
	    emulateHTTP: false,
	    emulateJSON: false,
	    timeout: 0
	};

	Http.headers = {
	    put: jsonType,
	    post: jsonType,
	    patch: jsonType,
	    delete: jsonType,
	    common: { 'Accept': 'application/json, text/plain, */*' },
	    custom: { 'X-Requested-With': 'XMLHttpRequest' }
	};

	Http.interceptors = [exports$4, exports$7, exports$3, exports$5, exports$2, exports$6, exports$1];

	['get', 'put', 'post', 'patch', 'delete', 'jsonp'].forEach(function (method) {

	    Http[method] = function (url, data, success, options) {

	        if (isFunction(data)) {
	            options = success;
	            success = data;
	            data = undefined;
	        }

	        if (isObject(success)) {
	            options = success;
	            success = undefined;
	        }

	        return this(url, extend({ method: method, data: data, success: success }, options));
	    };
	});

	function Resource(url, params, actions, options) {

	    var self = this || {},
	        resource = {};

	    actions = extend({}, Resource.actions, actions);

	    each(actions, function (action, name) {

	        action = merge({ url: url, params: params || {} }, options, action);

	        resource[name] = function () {
	            return (self.$http || Http)(opts(action, arguments));
	        };
	    });

	    return resource;
	}

	function opts(action, args) {

	    var options = extend({}, action),
	        params = {},
	        data,
	        success,
	        error;

	    switch (args.length) {

	        case 4:

	            error = args[3];
	            success = args[2];

	        case 3:
	        case 2:

	            if (isFunction(args[1])) {

	                if (isFunction(args[0])) {

	                    success = args[0];
	                    error = args[1];

	                    break;
	                }

	                success = args[1];
	                error = args[2];
	            } else {

	                params = args[0];
	                data = args[1];
	                success = args[2];

	                break;
	            }

	        case 1:

	            if (isFunction(args[0])) {
	                success = args[0];
	            } else if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
	                data = args[0];
	            } else {
	                params = args[0];
	            }

	            break;

	        case 0:

	            break;

	        default:

	            throw 'Expected up to 4 arguments [params, data, success, error], got ' + args.length + ' arguments';
	    }

	    options.data = data;
	    options.params = extend({}, options.params, params);

	    if (success) {
	        options.success = success;
	    }

	    if (error) {
	        options.error = error;
	    }

	    return options;
	}

	Resource.actions = {

	    get: { method: 'GET' },
	    save: { method: 'POST' },
	    query: { method: 'GET' },
	    update: { method: 'PUT' },
	    remove: { method: 'DELETE' },
	    delete: { method: 'DELETE' }

	};

	function plugin(Vue) {

	    if (plugin.installed) {
	        return;
	    }

	    Util(Vue);

	    Vue.url = Url;
	    Vue.http = Http;
	    Vue.resource = Resource;
	    Vue.Promise = Promise$1;

	    Object.defineProperties(Vue.prototype, {

	        $url: {
	            get: function get() {
	                return options(Vue.url, this, this.$options.url);
	            }
	        },

	        $http: {
	            get: function get() {
	                return options(Vue.http, this, this.$options.http);
	            }
	        },

	        $resource: {
	            get: function get() {
	                return Vue.resource.bind(this);
	            }
	        },

	        $promise: {
	            get: function get() {
	                var _this = this;

	                return function (executor) {
	                    return new Vue.Promise(executor, _this);
	                };
	            }
	        }

	    });
	}

	if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(plugin);
	}

	module.exports = plugin;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	__webpack_require__(7);

	var _toastr = __webpack_require__(11);

	var _toastr2 = _interopRequireDefault(_toastr);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    install: function install(vue) {
	        "use strict";
	        //Toast.options = {
	        //    "closeButton": true,
	        //    "debug": false,
	        //    "progressBar": true,
	        //    "positionClass": "toast-top-right",
	        //    "onclick": null,
	        //    "showDuration": "400",
	        //    "hideDuration": "400",
	        //    "timeOut": "7000",
	        //    "extendedTimeOut": "1000",
	        //    "showEasing": "swing",
	        //    "hideEasing": "linear",
	        //    "showMethod": "fadeIn",
	        //    "hideMethod": "fadeOut"
	        //}

	        vue.prototype.$toast = _toastr2.default;
	    }

	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	/*
	 * Toastr
	 * Copyright 2012-2015
	 * Authors: John Papa, Hans Fjällemark, and Tim Ferrell.
	 * All Rights Reserved.
	 * Use, reproduction, distribution, and modification of this code is subject to the terms and
	 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
	 *
	 * ARIA Support: Greta Krafsig
	 *
	 * Project: https://github.com/CodeSeven/toastr
	 */
	/* global define */
	;(function (define) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($) {
	        return function () {
	            var $container;
	            var listener;
	            var toastId = 0;
	            var toastType = {
	                error: 'error',
	                info: 'info',
	                success: 'success',
	                warning: 'warning'
	            };

	            var toastr = {
	                clear: clear,
	                remove: remove,
	                error: error,
	                getContainer: getContainer,
	                info: info,
	                options: {},
	                subscribe: subscribe,
	                success: success,
	                version: '2.1.1',
	                warning: warning
	            };

	            var previousToast;

	            return toastr;

	            ////////////////

	            function error(message, title, optionsOverride) {
	                return notify({
	                    type: toastType.error,
	                    iconClass: getOptions().iconClasses.error,
	                    message: message,
	                    optionsOverride: optionsOverride,
	                    title: title
	                });
	            }

	            function getContainer(options, create) {
	                if (!options) {
	                    options = getOptions();
	                }
	                $container = $('#' + options.containerId);
	                if ($container.length) {
	                    return $container;
	                }
	                if (create) {
	                    $container = createContainer(options);
	                }
	                return $container;
	            }

	            function info(message, title, optionsOverride) {
	                return notify({
	                    type: toastType.info,
	                    iconClass: getOptions().iconClasses.info,
	                    message: message,
	                    optionsOverride: optionsOverride,
	                    title: title
	                });
	            }

	            function subscribe(callback) {
	                listener = callback;
	            }

	            function success(message, title, optionsOverride) {
	                return notify({
	                    type: toastType.success,
	                    iconClass: getOptions().iconClasses.success,
	                    message: message,
	                    optionsOverride: optionsOverride,
	                    title: title
	                });
	            }

	            function warning(message, title, optionsOverride) {
	                return notify({
	                    type: toastType.warning,
	                    iconClass: getOptions().iconClasses.warning,
	                    message: message,
	                    optionsOverride: optionsOverride,
	                    title: title
	                });
	            }

	            function clear($toastElement, clearOptions) {
	                var options = getOptions();
	                if (!$container) {
	                    getContainer(options);
	                }
	                if (!clearToast($toastElement, options, clearOptions)) {
	                    clearContainer(options);
	                }
	            }

	            function remove($toastElement) {
	                var options = getOptions();
	                if (!$container) {
	                    getContainer(options);
	                }
	                if ($toastElement && $(':focus', $toastElement).length === 0) {
	                    removeToast($toastElement);
	                    return;
	                }
	                if ($container.children().length) {
	                    $container.remove();
	                }
	            }

	            // internal functions

	            function clearContainer(options) {
	                var toastsToClear = $container.children();
	                for (var i = toastsToClear.length - 1; i >= 0; i--) {
	                    clearToast($(toastsToClear[i]), options);
	                }
	            }

	            function clearToast($toastElement, options, clearOptions) {
	                var force = clearOptions && clearOptions.force ? clearOptions.force : false;
	                if ($toastElement && (force || $(':focus', $toastElement).length === 0)) {
	                    $toastElement[options.hideMethod]({
	                        duration: options.hideDuration,
	                        easing: options.hideEasing,
	                        complete: function complete() {
	                            removeToast($toastElement);
	                        }
	                    });
	                    return true;
	                }
	                return false;
	            }

	            function createContainer(options) {
	                $container = $('<div/>').attr('id', options.containerId).addClass(options.positionClass).attr('aria-live', 'polite').attr('role', 'alert');

	                $container.appendTo($(options.target));
	                return $container;
	            }

	            function getDefaults() {
	                return {
	                    tapToDismiss: true,
	                    toastClass: 'toast',
	                    containerId: 'toast-container',
	                    debug: false,

	                    showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
	                    showDuration: 300,
	                    showEasing: 'swing', //swing and linear are built into jQuery
	                    onShown: undefined,
	                    hideMethod: 'fadeOut',
	                    hideDuration: 1000,
	                    hideEasing: 'swing',
	                    onHidden: undefined,

	                    extendedTimeOut: 1000,
	                    iconClasses: {
	                        error: 'toast-error',
	                        info: 'toast-info',
	                        success: 'toast-success',
	                        warning: 'toast-warning'
	                    },
	                    iconClass: 'toast-info',
	                    positionClass: 'toast-top-right',
	                    timeOut: 5000, // Set timeOut and extendedTimeOut to 0 to make it sticky
	                    titleClass: 'toast-title',
	                    messageClass: 'toast-message',
	                    target: 'body',
	                    closeHtml: '<button type="button">&times;</button>',
	                    newestOnTop: true,
	                    preventDuplicates: false,
	                    progressBar: false
	                };
	            }

	            function publish(args) {
	                if (!listener) {
	                    return;
	                }
	                listener(args);
	            }

	            function notify(map) {
	                var options = getOptions();
	                var iconClass = map.iconClass || options.iconClass;

	                if (typeof map.optionsOverride !== 'undefined') {
	                    options = $.extend(options, map.optionsOverride);
	                    iconClass = map.optionsOverride.iconClass || iconClass;
	                }

	                if (shouldExit(options, map)) {
	                    return;
	                }

	                toastId++;

	                $container = getContainer(options, true);

	                var intervalId = null;
	                var $toastElement = $('<div/>');
	                var $titleElement = $('<div/>');
	                var $messageElement = $('<div/>');
	                var $progressElement = $('<div/>');
	                var $closeElement = $(options.closeHtml);
	                var progressBar = {
	                    intervalId: null,
	                    hideEta: null,
	                    maxHideTime: null
	                };
	                var response = {
	                    toastId: toastId,
	                    state: 'visible',
	                    startTime: new Date(),
	                    options: options,
	                    map: map
	                };

	                personalizeToast();

	                displayToast();

	                handleEvents();

	                publish(response);

	                if (options.debug && console) {
	                    console.log(response);
	                }

	                return $toastElement;

	                function personalizeToast() {
	                    setIcon();
	                    setTitle();
	                    setMessage();
	                    setCloseButton();
	                    setProgressBar();
	                    setSequence();
	                }

	                function handleEvents() {
	                    $toastElement.hover(stickAround, delayedHideToast);
	                    if (!options.onclick && options.tapToDismiss) {
	                        $toastElement.click(hideToast);
	                    }

	                    if (options.closeButton && $closeElement) {
	                        $closeElement.click(function (event) {
	                            if (event.stopPropagation) {
	                                event.stopPropagation();
	                            } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
	                                event.cancelBubble = true;
	                            }
	                            hideToast(true);
	                        });
	                    }

	                    if (options.onclick) {
	                        $toastElement.click(function () {
	                            options.onclick();
	                            hideToast();
	                        });
	                    }
	                }

	                function displayToast() {
	                    $toastElement.hide();

	                    $toastElement[options.showMethod]({ duration: options.showDuration, easing: options.showEasing, complete: options.onShown });

	                    if (options.timeOut > 0) {
	                        intervalId = setTimeout(hideToast, options.timeOut);
	                        progressBar.maxHideTime = parseFloat(options.timeOut);
	                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
	                        if (options.progressBar) {
	                            progressBar.intervalId = setInterval(updateProgress, 10);
	                        }
	                    }
	                }

	                function setIcon() {
	                    if (map.iconClass) {
	                        $toastElement.addClass(options.toastClass).addClass(iconClass);
	                    }
	                }

	                function setSequence() {
	                    if (options.newestOnTop) {
	                        $container.prepend($toastElement);
	                    } else {
	                        $container.append($toastElement);
	                    }
	                }

	                function setTitle() {
	                    if (map.title) {
	                        $titleElement.append(map.title).addClass(options.titleClass);
	                        $toastElement.append($titleElement);
	                    }
	                }

	                function setMessage() {
	                    if (map.message) {
	                        $messageElement.append(map.message).addClass(options.messageClass);
	                        $toastElement.append($messageElement);
	                    }
	                }

	                function setCloseButton() {
	                    if (options.closeButton) {
	                        $closeElement.addClass('toast-close-button').attr('role', 'button');
	                        $toastElement.prepend($closeElement);
	                    }
	                }

	                function setProgressBar() {
	                    if (options.progressBar) {
	                        $progressElement.addClass('toast-progress');
	                        $toastElement.prepend($progressElement);
	                    }
	                }

	                function shouldExit(options, map) {
	                    if (options.preventDuplicates) {
	                        if (map.message === previousToast) {
	                            return true;
	                        } else {
	                            previousToast = map.message;
	                        }
	                    }
	                    return false;
	                }

	                function hideToast(override) {
	                    if ($(':focus', $toastElement).length && !override) {
	                        return;
	                    }
	                    clearTimeout(progressBar.intervalId);
	                    return $toastElement[options.hideMethod]({
	                        duration: options.hideDuration,
	                        easing: options.hideEasing,
	                        complete: function complete() {
	                            removeToast($toastElement);
	                            if (options.onHidden && response.state !== 'hidden') {
	                                options.onHidden();
	                            }
	                            response.state = 'hidden';
	                            response.endTime = new Date();
	                            publish(response);
	                        }
	                    });
	                }

	                function delayedHideToast() {
	                    if (options.timeOut > 0 || options.extendedTimeOut > 0) {
	                        intervalId = setTimeout(hideToast, options.extendedTimeOut);
	                        progressBar.maxHideTime = parseFloat(options.extendedTimeOut);
	                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
	                    }
	                }

	                function stickAround() {
	                    clearTimeout(intervalId);
	                    progressBar.hideEta = 0;
	                    $toastElement.stop(true, true)[options.showMethod]({ duration: options.showDuration, easing: options.showEasing });
	                }

	                function updateProgress() {
	                    var percentage = (progressBar.hideEta - new Date().getTime()) / progressBar.maxHideTime * 100;
	                    $progressElement.width(percentage + '%');
	                }
	            }

	            function getOptions() {
	                return $.extend({}, getDefaults(), toastr.options);
	            }

	            function removeToast($toastElement) {
	                if (!$container) {
	                    $container = getContainer();
	                }
	                if ($toastElement.is(':visible')) {
	                    return;
	                }
	                $toastElement.remove();
	                $toastElement = null;
	                if ($container.children().length === 0) {
	                    $container.remove();
	                    previousToast = undefined;
	                }
	            }
	        }();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(12));

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 13 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 29 */,
/* 30 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 31 */,
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*!
	 * Bootstrap v3.3.4 (http://getbootstrap.com)
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 */

	if (typeof jQuery === 'undefined') {
	  throw new Error('Bootstrap\'s JavaScript requires jQuery');
	}

	+function ($) {
	  'use strict';

	  var version = $.fn.jquery.split(' ')[0].split('.');
	  if (version[0] < 2 && version[1] < 9 || version[0] == 1 && version[1] == 9 && version[2] < 1) {
	    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher');
	  }
	}(jQuery);

	/* ========================================================================
	 * Bootstrap: transition.js v3.3.4
	 * http://getbootstrap.com/javascript/#transitions
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */

	+function ($) {
	  'use strict';

	  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
	  // ============================================================

	  function transitionEnd() {
	    var el = document.createElement('bootstrap');

	    var transEndEventNames = {
	      WebkitTransition: 'webkitTransitionEnd',
	      MozTransition: 'transitionend',
	      OTransition: 'oTransitionEnd otransitionend',
	      transition: 'transitionend'
	    };

	    for (var name in transEndEventNames) {
	      if (el.style[name] !== undefined) {
	        return { end: transEndEventNames[name] };
	      }
	    }

	    return false; // explicit for ie8 (  ._.)
	  }

	  // http://blog.alexmaccaw.com/css-transitions
	  $.fn.emulateTransitionEnd = function (duration) {
	    var called = false;
	    var $el = this;
	    $(this).one('bsTransitionEnd', function () {
	      called = true;
	    });
	    var callback = function callback() {
	      if (!called) $($el).trigger($.support.transition.end);
	    };
	    setTimeout(callback, duration);
	    return this;
	  };

	  $(function () {
	    $.support.transition = transitionEnd();

	    if (!$.support.transition) return;

	    $.event.special.bsTransitionEnd = {
	      bindType: $.support.transition.end,
	      delegateType: $.support.transition.end,
	      handle: function handle(e) {
	        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
	      }
	    };
	  });
	}(jQuery);

	/* ========================================================================
	 * Bootstrap: alert.js v3.3.4
	 * http://getbootstrap.com/javascript/#alerts
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */

	+function ($) {
	  'use strict';

	  // ALERT CLASS DEFINITION
	  // ======================

	  var dismiss = '[data-dismiss="alert"]';
	  var Alert = function Alert(el) {
	    $(el).on('click', dismiss, this.close);
	  };

	  Alert.VERSION = '3.3.4';

	  Alert.TRANSITION_DURATION = 150;

	  Alert.prototype.close = function (e) {
	    var $this = $(this);
	    var selector = $this.attr('data-target');

	    if (!selector) {
	      selector = $this.attr('href');
	      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
	    }

	    var $parent = $(selector);

	    if (e) e.preventDefault();

	    if (!$parent.length) {
	      $parent = $this.closest('.alert');
	    }

	    $parent.trigger(e = $.Event('close.bs.alert'));

	    if (e.isDefaultPrevented()) return;

	    $parent.removeClass('in');

	    function removeElement() {
	      // detach from parent, fire event then clean up data
	      $parent.detach().trigger('closed.bs.alert').remove();
	    }

	    $.support.transition && $parent.hasClass('fade') ? $parent.one('bsTransitionEnd', removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement();
	  };

	  // ALERT PLUGIN DEFINITION
	  // =======================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this);
	      var data = $this.data('bs.alert');

	      if (!data) $this.data('bs.alert', data = new Alert(this));
	      if (typeof option == 'string') data[option].call($this);
	    });
	  }

	  var old = $.fn.alert;

	  $.fn.alert = Plugin;
	  $.fn.alert.Constructor = Alert;

	  // ALERT NO CONFLICT
	  // =================

	  $.fn.alert.noConflict = function () {
	    $.fn.alert = old;
	    return this;
	  };

	  // ALERT DATA-API
	  // ==============

	  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close);
	}(jQuery);

	/* ========================================================================
	 * Bootstrap: button.js v3.3.4
	 * http://getbootstrap.com/javascript/#buttons
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */

	+function ($) {
	  'use strict';

	  // BUTTON PUBLIC CLASS DEFINITION
	  // ==============================

	  var Button = function Button(element, options) {
	    this.$element = $(element);
	    this.options = $.extend({}, Button.DEFAULTS, options);
	    this.isLoading = false;
	  };

	  Button.VERSION = '3.3.4';

	  Button.DEFAULTS = {
	    loadingText: 'loading...'
	  };

	  Button.prototype.setState = function (state) {
	    var d = 'disabled';
	    var $el = this.$element;
	    var val = $el.is('input') ? 'val' : 'html';
	    var data = $el.data();

	    state = state + 'Text';

	    if (data.resetText == null) $el.data('resetText', $el[val]());

	    // push to event loop to allow forms to submit
	    setTimeout($.proxy(function () {
	      $el[val](data[state] == null ? this.options[state] : data[state]);

	      if (state == 'loadingText') {
	        this.isLoading = true;
	        $el.addClass(d).attr(d, d);
	      } else if (this.isLoading) {
	        this.isLoading = false;
	        $el.removeClass(d).removeAttr(d);
	      }
	    }, this), 0);
	  };

	  Button.prototype.toggle = function () {
	    var changed = true;
	    var $parent = this.$element.closest('[data-toggle="buttons"]');

	    if ($parent.length) {
	      var $input = this.$element.find('input');
	      if ($input.prop('type') == 'radio') {
	        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false;else $parent.find('.active').removeClass('active');
	      }
	      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change');
	    } else {
	      this.$element.attr('aria-pressed', !this.$element.hasClass('active'));
	    }

	    if (changed) this.$element.toggleClass('active');
	  };

	  // BUTTON PLUGIN DEFINITION
	  // ========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this);
	      var data = $this.data('bs.button');
	      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

	      if (!data) $this.data('bs.button', data = new Button(this, options));

	      if (option == 'toggle') data.toggle();else if (option) data.setState(option);
	    });
	  }

	  var old = $.fn.button;

	  $.fn.button = Plugin;
	  $.fn.button.Constructor = Button;

	  // BUTTON NO CONFLICT
	  // ==================

	  $.fn.button.noConflict = function () {
	    $.fn.button = old;
	    return this;
	  };

	  // BUTTON DATA-API
	  // ===============

	  $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
	    var $btn = $(e.target);
	    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn');
	    Plugin.call($btn, 'toggle');
	    e.preventDefault();
	  }).on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
	    $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type));
	  });
	}(jQuery);

	/* ========================================================================
	 * Bootstrap: carousel.js v3.3.4
	 * http://getbootstrap.com/javascript/#carousel
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */

	+function ($) {
	  'use strict';

	  // CAROUSEL CLASS DEFINITION
	  // =========================

	  var Carousel = function Carousel(element, options) {
	    this.$element = $(element);
	    this.$indicators = this.$element.find('.carousel-indicators');
	    this.options = options;
	    this.paused = null;
	    this.sliding = null;
	    this.interval = null;
	    this.$active = null;
	    this.$items = null;

	    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this));

	    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element.on('mouseenter.bs.carousel', $.proxy(this.pause, this)).on('mouseleave.bs.carousel', $.proxy(this.cycle, this));
	  };

	  Carousel.VERSION = '3.3.4';

	  Carousel.TRANSITION_DURATION = 600;

	  Carousel.DEFAULTS = {
	    interval: 5000,
	    pause: 'hover',
	    wrap: true,
	    keyboard: true
	  };

	  Carousel.prototype.keydown = function (e) {
	    if (/input|textarea/i.test(e.target.tagName)) return;
	    switch (e.which) {
	      case 37:
	        this.prev();break;
	      case 39:
	        this.next();break;
	      default:
	        return;
	    }

	    e.preventDefault();
	  };

	  Carousel.prototype.cycle = function (e) {
	    e || (this.paused = false);

	    this.interval && clearInterval(this.interval);

	    this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));

	    return this;
	  };

	  Carousel.prototype.getItemIndex = function (item) {
	    this.$items = item.parent().children('.item');
	    return this.$items.index(item || this.$active);
	  };

	  Carousel.prototype.getItemForDirection = function (direction, active) {
	    var activeIndex = this.getItemIndex(active);
	    var willWrap = direction == 'prev' && activeIndex === 0 || direction == 'next' && activeIndex == this.$items.length - 1;
	    if (willWrap && !this.options.wrap) return active;
	    var delta = direction == 'prev' ? -1 : 1;
	    var itemIndex = (activeIndex + delta) % this.$items.length;
	    return this.$items.eq(itemIndex);
	  };

	  Carousel.prototype.to = function (pos) {
	    var that = this;
	    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'));

	    if (pos > this.$items.length - 1 || pos < 0) return;

	    if (this.sliding) return this.$element.one('slid.bs.carousel', function () {
	      that.to(pos);
	    }); // yes, "slid"
	    if (activeIndex == pos) return this.pause().cycle();

	    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos));
	  };

	  Carousel.prototype.pause = function (e) {
	    e || (this.paused = true);

	    if (this.$element.find('.next, .prev').length && $.support.transition) {
	      this.$element.trigger($.support.transition.end);
	      this.cycle(true);
	    }

	    this.interval = clearInterval(this.interval);

	    return this;
	  };

	  Carousel.prototype.next = function () {
	    if (this.sliding) return;
	    return this.slide('next');
	  };

	  Carousel.prototype.prev = function () {
	    if (this.sliding) return;
	    return this.slide('prev');
	  };

	  Carousel.prototype.slide = function (type, next) {
	    var $active = this.$element.find('.item.active');
	    var $next = next || this.getItemForDirection(type, $active);
	    var isCycling = this.interval;
	    var direction = type == 'next' ? 'left' : 'right';
	    var that = this;

	    if ($next.hasClass('active')) return this.sliding = false;

	    var relatedTarget = $next[0];
	    var slideEvent = $.Event('slide.bs.carousel', {
	      relatedTarget: relatedTarget,
	      direction: direction
	    });
	    this.$element.trigger(slideEvent);
	    if (slideEvent.isDefaultPrevented()) return;

	    this.sliding = true;

	    isCycling && this.pause();

	    if (this.$indicators.length) {
	      this.$indicators.find('.active').removeClass('active');
	      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
	      $nextIndicator && $nextIndicator.addClass('active');
	    }

	    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }); // yes, "slid"
	    if ($.support.transition && this.$element.hasClass('slide')) {
	      $next.addClass(type);
	      $next[0].offsetWidth; // force reflow
	      $active.addClass(direction);
	      $next.addClass(direction);
	      $active.one('bsTransitionEnd', function () {
	        $next.removeClass([type, direction].join(' ')).addClass('active');
	        $active.removeClass(['active', direction].join(' '));
	        that.sliding = false;
	        setTimeout(function () {
	          that.$element.trigger(slidEvent);
	        }, 0);
	      }).emulateTransitionEnd(Carousel.TRANSITION_DURATION);
	    } else {
	      $active.removeClass('active');
	      $next.addClass('active');
	      this.sliding = false;
	      this.$element.trigger(slidEvent);
	    }

	    isCycling && this.cycle();

	    return this;
	  };

	  // CAROUSEL PLUGIN DEFINITION
	  // ==========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this);
	      var data = $this.data('bs.carousel');
	      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option);
	      var action = typeof option == 'string' ? option : options.slide;

	      if (!data) $this.data('bs.carousel', data = new Carousel(this, options));
	      if (typeof option == 'number') data.to(option);else if (action) data[action]();else if (options.interval) data.pause().cycle();
	    });
	  }

	  var old = $.fn.carousel;

	  $.fn.carousel = Plugin;
	  $.fn.carousel.Constructor = Carousel;

	  // CAROUSEL NO CONFLICT
	  // ====================

	  $.fn.carousel.noConflict = function () {
	    $.fn.carousel = old;
	    return this;
	  };

	  // CAROUSEL DATA-API
	  // =================

	  var clickHandler = function clickHandler(e) {
	    var href;
	    var $this = $(this);
	    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7
	    if (!$target.hasClass('carousel')) return;
	    var options = $.extend({}, $target.data(), $this.data());
	    var slideIndex = $this.attr('data-slide-to');
	    if (slideIndex) options.interval = false;

	    Plugin.call($target, options);

	    if (slideIndex) {
	      $target.data('bs.carousel').to(slideIndex);
	    }

	    e.preventDefault();
	  };

	  $(document).on('click.bs.carousel.data-api', '[data-slide]', clickHandler).on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler);

	  $(window).on('load', function () {
	    $('[data-ride="carousel"]').each(function () {
	      var $carousel = $(this);
	      Plugin.call($carousel, $carousel.data());
	    });
	  });
	}(jQuery);

	/* ========================================================================
	 * Bootstrap: collapse.js v3.3.4
	 * http://getbootstrap.com/javascript/#collapse
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */

	+function ($) {
	  'use strict';

	  // COLLAPSE PUBLIC CLASS DEFINITION
	  // ================================

	  var Collapse = function Collapse(element, options) {
	    this.$element = $(element);
	    this.options = $.extend({}, Collapse.DEFAULTS, options);
	    this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],' + '[data-toggle="collapse"][data-target="#' + element.id + '"]');
	    this.transitioning = null;

	    if (this.options.parent) {
	      this.$parent = this.getParent();
	    } else {
	      this.addAriaAndCollapsedClass(this.$element, this.$trigger);
	    }

	    if (this.options.toggle) this.toggle();
	  };

	  Collapse.VERSION = '3.3.4';

	  Collapse.TRANSITION_DURATION = 350;

	  Collapse.DEFAULTS = {
	    toggle: true
	  };

	  Collapse.prototype.dimension = function () {
	    var hasWidth = this.$element.hasClass('width');
	    return hasWidth ? 'width' : 'height';
	  };

	  Collapse.prototype.show = function () {
	    if (this.transitioning || this.$element.hasClass('in')) return;

	    var activesData;
	    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing');

	    if (actives && actives.length) {
	      activesData = actives.data('bs.collapse');
	      if (activesData && activesData.transitioning) return;
	    }

	    var startEvent = $.Event('show.bs.collapse');
	    this.$element.trigger(startEvent);
	    if (startEvent.isDefaultPrevented()) return;

	    if (actives && actives.length) {
	      Plugin.call(actives, 'hide');
	      activesData || actives.data('bs.collapse', null);
	    }

	    var dimension = this.dimension();

	    this.$element.removeClass('collapse').addClass('collapsing')[dimension](0).attr('aria-expanded', true);

	    this.$trigger.removeClass('collapsed').attr('aria-expanded', true);

	    this.transitioning = 1;

	    var complete = function complete() {
	      this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('');
	      this.transitioning = 0;
	      this.$element.trigger('shown.bs.collapse');
	    };

	    if (!$.support.transition) return complete.call(this);

	    var scrollSize = $.camelCase(['scroll', dimension].join('-'));

	    this.$element.one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
	  };

	  Collapse.prototype.hide = function () {
	    if (this.transitioning || !this.$element.hasClass('in')) return;

	    var startEvent = $.Event('hide.bs.collapse');
	    this.$element.trigger(startEvent);
	    if (startEvent.isDefaultPrevented()) return;

	    var dimension = this.dimension();

	    this.$element[dimension](this.$element[dimension]())[0].offsetHeight;

	    this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded', false);

	    this.$trigger.addClass('collapsed').attr('aria-expanded', false);

	    this.transitioning = 1;

	    var complete = function complete() {
	      this.transitioning = 0;
	      this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse');
	    };

	    if (!$.support.transition) return complete.call(this);

	    this.$element[dimension](0).one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION);
	  };

	  Collapse.prototype.toggle = function () {
	    this[this.$element.hasClass('in') ? 'hide' : 'show']();
	  };

	  Collapse.prototype.getParent = function () {
	    return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function (i, element) {
	      var $element = $(element);
	      this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
	    }, this)).end();
	  };

	  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
	    var isOpen = $element.hasClass('in');

	    $element.attr('aria-expanded', isOpen);
	    $trigger.toggleClass('collapsed', !isOpen).attr('aria-expanded', isOpen);
	  };

	  function getTargetFromTrigger($trigger) {
	    var href;
	    var target = $trigger.attr('data-target') || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); // strip for ie7

	    return $(target);
	  }

	  // COLLAPSE PLUGIN DEFINITION
	  // ==========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this);
	      var data = $this.data('bs.collapse');
	      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option);

	      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false;
	      if (!data) $this.data('bs.collapse', data = new Collapse(this, options));
	      if (typeof option == 'string') data[option]();
	    });
	  }

	  var old = $.fn.collapse;

	  $.fn.collapse = Plugin;
	  $.fn.collapse.Constructor = Collapse;

	  // COLLAPSE NO CONFLICT
	  // ====================

	  $.fn.collapse.noConflict = function () {
	    $.fn.collapse = old;
	    return this;
	  };

	  // COLLAPSE DATA-API
	  // =================

	  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
	    var $this = $(this);

	    if (!$this.attr('data-target')) e.preventDefault();

	    var $target = getTargetFromTrigger($this);
	    var data = $target.data('bs.collapse');
	    var option = data ? 'toggle' : $this.data();

	    Plugin.call($target, option);
	  });
	}(jQuery);

	/* ========================================================================
	 * Bootstrap: dropdown.js v3.3.4
	 * http://getbootstrap.com/javascript/#dropdowns
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */

	+function ($) {
	  'use strict';

	  // DROPDOWN CLASS DEFINITION
	  // =========================

	  var backdrop = '.dropdown-backdrop';
	  var toggle = '[data-toggle="dropdown"]';
	  var Dropdown = function Dropdown(element) {
	    $(element).on('click.bs.dropdown', this.toggle);
	  };

	  Dropdown.VERSION = '3.3.4';

	  Dropdown.prototype.toggle = function (e) {
	    var $this = $(this);

	    if ($this.is('.disabled, :disabled')) return;

	    var $parent = getParent($this);
	    var isActive = $parent.hasClass('open');

	    clearMenus();

	    if (!isActive) {
	      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
	        // if mobile we use a backdrop because click events don't delegate
	        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus);
	      }

	      var relatedTarget = { relatedTarget: this };
	      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));

	      if (e.isDefaultPrevented()) return;

	      $this.trigger('focus').attr('aria-expanded', 'true');

	      $parent.toggleClass('open').trigger('shown.bs.dropdown', relatedTarget);
	    }

	    return false;
	  };

	  Dropdown.prototype.keydown = function (e) {
	    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;

	    var $this = $(this);

	    e.preventDefault();
	    e.stopPropagation();

	    if ($this.is('.disabled, :disabled')) return;

	    var $parent = getParent($this);
	    var isActive = $parent.hasClass('open');

	    if (!isActive && e.which != 27 || isActive && e.which == 27) {
	      if (e.which == 27) $parent.find(toggle).trigger('focus');
	      return $this.trigger('click');
	    }

	    var desc = ' li:not(.disabled):visible a';
	    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc);

	    if (!$items.length) return;

	    var index = $items.index(e.target);

	    if (e.which == 38 && index > 0) index--; // up
	    if (e.which == 40 && index < $items.length - 1) index++; // down
	    if (!~index) index = 0;

	    $items.eq(index).trigger('focus');
	  };

	  function clearMenus(e) {
	    if (e && e.which === 3) return;
	    $(backdrop).remove();
	    $(toggle).each(function () {
	      var $this = $(this);
	      var $parent = getParent($this);
	      var relatedTarget = { relatedTarget: this };

	      if (!$parent.hasClass('open')) return;

	      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));

	      if (e.isDefaultPrevented()) return;

	      $this.attr('aria-expanded', 'false');
	      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget);
	    });
	  }

	  function getParent($this) {
	    var selector = $this.attr('data-target');

	    if (!selector) {
	      selector = $this.attr('href');
	      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
	    }

	    var $parent = selector && $(selector);

	    return $parent && $parent.length ? $parent : $this.parent();
	  }

	  // DROPDOWN PLUGIN DEFINITION
	  // ==========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this);
	      var data = $this.data('bs.dropdown');

	      if (!data) $this.data('bs.dropdown', data = new Dropdown(this));
	      if (typeof option == 'string') data[option].call($this);
	    });
	  }

	  var old = $.fn.dropdown;

	  $.fn.dropdown = Plugin;
	  $.fn.dropdown.Constructor = Dropdown;

	  // DROPDOWN NO CONFLICT
	  // ====================

	  $.fn.dropdown.noConflict = function () {
	    $.fn.dropdown = old;
	    return this;
	  };

	  // APPLY TO STANDARD DROPDOWN ELEMENTS
	  // ===================================

	  $(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form', function (e) {
	    e.stopPropagation();
	  }).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api', '[role="menu"]', Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api', '[role="listbox"]', Dropdown.prototype.keydown);
	}(jQuery);

	/* ========================================================================
	 * Bootstrap: modal.js v3.3.4
	 * http://getbootstrap.com/javascript/#modals
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */

	+function ($) {
	  'use strict';

	  // MODAL CLASS DEFINITION
	  // ======================

	  var Modal = function Modal(element, options) {
	    this.options = options;
	    this.$body = $(document.body);
	    this.$element = $(element);
	    this.$dialog = this.$element.find('.modal-dialog');
	    this.$backdrop = null;
	    this.isShown = null;
	    this.originalBodyPad = null;
	    this.scrollbarWidth = 0;
	    this.ignoreBackdropClick = false;

	    if (this.options.remote) {
	      this.$element.find('.modal-content').load(this.options.remote, $.proxy(function () {
	        this.$element.trigger('loaded.bs.modal');
	      }, this));
	    }
	  };

	  Modal.VERSION = '3.3.4';

	  Modal.TRANSITION_DURATION = 300;
	  Modal.BACKDROP_TRANSITION_DURATION = 150;

	  Modal.DEFAULTS = {
	    backdrop: true,
	    keyboard: true,
	    show: true
	  };

	  Modal.prototype.toggle = function (_relatedTarget) {
	    return this.isShown ? this.hide() : this.show(_relatedTarget);
	  };

	  Modal.prototype.show = function (_relatedTarget) {
	    var that = this;
	    var e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget });

	    this.$element.trigger(e);

	    if (this.isShown || e.isDefaultPrevented()) return;

	    this.isShown = true;

	    this.checkScrollbar();
	    this.setScrollbar();
	    this.$body.addClass('modal-open');

	    this.escape();
	    this.resize();

	    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));

	    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
	      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
	        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true;
	      });
	    });

	    this.backdrop(function () {
	      var transition = $.support.transition && that.$element.hasClass('fade');

	      if (!that.$element.parent().length) {
	        that.$element.appendTo(that.$body); // don't move modals dom position
	      }

	      that.$element.show().scrollTop(0);

	      that.adjustDialog();

	      if (transition) {
	        that.$element[0].offsetWidth; // force reflow
	      }

	      that.$element.addClass('in').attr('aria-hidden', false);

	      that.enforceFocus();

	      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget });

	      transition ? that.$dialog // wait for modal to slide in
	      .one('bsTransitionEnd', function () {
	        that.$element.trigger('focus').trigger(e);
	      }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger('focus').trigger(e);
	    });
	  };

	  Modal.prototype.hide = function (e) {
	    if (e) e.preventDefault();

	    e = $.Event('hide.bs.modal');

	    this.$element.trigger(e);

	    if (!this.isShown || e.isDefaultPrevented()) return;

	    this.isShown = false;

	    this.escape();
	    this.resize();

	    $(document).off('focusin.bs.modal');

	    this.$element.removeClass('in').attr('aria-hidden', true).off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal');

	    this.$dialog.off('mousedown.dismiss.bs.modal');

	    $.support.transition && this.$element.hasClass('fade') ? this.$element.one('bsTransitionEnd', $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal();
	  };

	  Modal.prototype.enforceFocus = function () {
	    $(document).off('focusin.bs.modal') // guard against infinite focus loop
	    .on('focusin.bs.modal', $.proxy(function (e) {
	      if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
	        this.$element.trigger('focus');
	      }
	    }, this));
	  };

	  Modal.prototype.escape = function () {
	    if (this.isShown && this.options.keyboard) {
	      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
	        e.which == 27 && this.hide();
	      }, this));
	    } else if (!this.isShown) {
	      this.$element.off('keydown.dismiss.bs.modal');
	    }
	  };

	  Modal.prototype.resize = function () {
	    if (this.isShown) {
	      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this));
	    } else {
	      $(window).off('resize.bs.modal');
	    }
	  };

	  Modal.prototype.hideModal = function () {
	    var that = this;
	    this.$element.hide();
	    this.backdrop(function () {
	      that.$body.removeClass('modal-open');
	      that.resetAdjustments();
	      that.resetScrollbar();
	      that.$element.trigger('hidden.bs.modal');
	    });
	  };

	  Modal.prototype.removeBackdrop = function () {
	    this.$backdrop && this.$backdrop.remove();
	    this.$backdrop = null;
	  };

	  Modal.prototype.backdrop = function (callback) {
	    var that = this;
	    var animate = this.$element.hasClass('fade') ? 'fade' : '';

	    if (this.isShown && this.options.backdrop) {
	      var doAnimate = $.support.transition && animate;

	      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(this.$body);

	      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
	        if (this.ignoreBackdropClick) {
	          this.ignoreBackdropClick = false;
	          return;
	        }
	        if (e.target !== e.currentTarget) return;
	        this.options.backdrop == 'static' ? this.$element[0].focus() : this.hide();
	      }, this));

	      if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow

	      this.$backdrop.addClass('in');

	      if (!callback) return;

	      doAnimate ? this.$backdrop.one('bsTransitionEnd', callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
	    } else if (!this.isShown && this.$backdrop) {
	      this.$backdrop.removeClass('in');

	      var callbackRemove = function callbackRemove() {
	        that.removeBackdrop();
	        callback && callback();
	      };
	      $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one('bsTransitionEnd', callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
	    } else if (callback) {
	      callback();
	    }
	  };

	  // these following methods are used to handle overflowing modals

	  Modal.prototype.handleUpdate = function () {
	    this.adjustDialog();
	  };

	  Modal.prototype.adjustDialog = function () {
	    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;

	    this.$element.css({
	      paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
	      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
	    });
	  };

	  Modal.prototype.resetAdjustments = function () {
	    this.$element.css({
	      paddingLeft: '',
	      paddingRight: ''
	    });
	  };

	  Modal.prototype.checkScrollbar = function () {
	    var fullWindowWidth = window.innerWidth;
	    if (!fullWindowWidth) {
	      // workaround for missing window.innerWidth in IE8
	      var documentElementRect = document.documentElement.getBoundingClientRect();
	      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
	    }
	    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
	    this.scrollbarWidth = this.measureScrollbar();
	  };

	  Modal.prototype.setScrollbar = function () {
	    var bodyPad = parseInt(this.$body.css('padding-right') || 0, 10);
	    this.originalBodyPad = document.body.style.paddingRight || '';
	    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
	  };

	  Modal.prototype.resetScrollbar = function () {
	    this.$body.css('padding-right', this.originalBodyPad);
	  };

	  Modal.prototype.measureScrollbar = function () {
	    // thx walsh
	    var scrollDiv = document.createElement('div');
	    scrollDiv.className = 'modal-scrollbar-measure';
	    this.$body.append(scrollDiv);
	    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	    this.$body[0].removeChild(scrollDiv);
	    return scrollbarWidth;
	  };

	  // MODAL PLUGIN DEFINITION
	  // =======================

	  function Plugin(option, _relatedTarget) {
	    return this.each(function () {
	      var $this = $(this);
	      var data = $this.data('bs.modal');
	      var options = $.extend({}, Modal.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option);

	      if (!data) $this.data('bs.modal', data = new Modal(this, options));
	      if (typeof option == 'string') data[option](_relatedTarget);else if (options.show) data.show(_relatedTarget);
	    });
	  }

	  var old = $.fn.modal;

	  $.fn.modal = Plugin;
	  $.fn.modal.Constructor = Modal;

	  // MODAL NO CONFLICT
	  // =================

	  $.fn.modal.noConflict = function () {
	    $.fn.modal = old;
	    return this;
	  };

	  // MODAL DATA-API
	  // ==============

	  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
	    var $this = $(this);
	    var href = $this.attr('href');
	    var $target = $($this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7
	    var option = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());

	    if ($this.is('a')) e.preventDefault();

	    $target.one('show.bs.modal', function (showEvent) {
	      if (showEvent.isDefaultPrevented()) return; // only register focus restorer if modal will actually get shown
	      $target.one('hidden.bs.modal', function () {
	        $this.is(':visible') && $this.trigger('focus');
	      });
	    });
	    Plugin.call($target, option, this);
	  });
	}(jQuery);

	/* ========================================================================
	 * Bootstrap: tooltip.js v3.3.4
	 * http://getbootstrap.com/javascript/#tooltip
	 * Inspired by the original jQuery.tipsy by Jason Frame
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */

	+function ($) {
	  'use strict';

	  // TOOLTIP PUBLIC CLASS DEFINITION
	  // ===============================

	  var Tooltip = function Tooltip(element, options) {
	    this.type = null;
	    this.options = null;
	    this.enabled = null;
	    this.timeout = null;
	    this.hoverState = null;
	    this.$element = null;

	    this.init('tooltip', element, options);
	  };

	  Tooltip.VERSION = '3.3.4';

	  Tooltip.TRANSITION_DURATION = 150;

	  Tooltip.DEFAULTS = {
	    animation: true,
	    placement: 'top',
	    selector: false,
	    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
	    trigger: 'hover focus',
	    title: '',
	    delay: 0,
	    html: false,
	    container: false,
	    viewport: {
	      selector: 'body',
	      padding: 0
	    }
	  };

	  Tooltip.prototype.init = function (type, element, options) {
	    this.enabled = true;
	    this.type = type;
	    this.$element = $(element);
	    this.options = this.getOptions(options);
	    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport);

	    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
	      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!');
	    }

	    var triggers = this.options.trigger.split(' ');

	    for (var i = triggers.length; i--;) {
	      var trigger = triggers[i];

	      if (trigger == 'click') {
	        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
	      } else if (trigger != 'manual') {
	        var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin';
	        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';

	        this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this));
	        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this));
	      }
	    }

	    this.options.selector ? this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' }) : this.fixTitle();
	  };

	  Tooltip.prototype.getDefaults = function () {
	    return Tooltip.DEFAULTS;
	  };

	  Tooltip.prototype.getOptions = function (options) {
	    options = $.extend({}, this.getDefaults(), this.$element.data(), options);

	    if (options.delay && typeof options.delay == 'number') {
	      options.delay = {
	        show: options.delay,
	        hide: options.delay
	      };
	    }

	    return options;
	  };

	  Tooltip.prototype.getDelegateOptions = function () {
	    var options = {};
	    var defaults = this.getDefaults();

	    this._options && $.each(this._options, function (key, value) {
	      if (defaults[key] != value) options[key] = value;
	    });

	    return options;
	  };

	  Tooltip.prototype.enter = function (obj) {
	    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);

	    if (self && self.$tip && self.$tip.is(':visible')) {
	      self.hoverState = 'in';
	      return;
	    }

	    if (!self) {
	      self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
	      $(obj.currentTarget).data('bs.' + this.type, self);
	    }

	    clearTimeout(self.timeout);

	    self.hoverState = 'in';

	    if (!self.options.delay || !self.options.delay.show) return self.show();

	    self.timeout = setTimeout(function () {
	      if (self.hoverState == 'in') self.show();
	    }, self.options.delay.show);
	  };

	  Tooltip.prototype.leave = function (obj) {
	    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);

	    if (!self) {
	      self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
	      $(obj.currentTarget).data('bs.' + this.type, self);
	    }

	    clearTimeout(self.timeout);

	    self.hoverState = 'out';

	    if (!self.options.delay || !self.options.delay.hide) return self.hide();

	    self.timeout = setTimeout(function () {
	      if (self.hoverState == 'out') self.hide();
	    }, self.options.delay.hide);
	  };

	  Tooltip.prototype.show = function () {
	    var e = $.Event('show.bs.' + this.type);

	    if (this.hasContent() && this.enabled) {
	      this.$element.trigger(e);

	      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
	      if (e.isDefaultPrevented() || !inDom) return;
	      var that = this;

	      var $tip = this.tip();

	      var tipId = this.getUID(this.type);

	      this.setContent();
	      $tip.attr('id', tipId);
	      this.$element.attr('aria-describedby', tipId);

	      if (this.options.animation) $tip.addClass('fade');

	      var placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;

	      var autoToken = /\s?auto?\s?/i;
	      var autoPlace = autoToken.test(placement);
	      if (autoPlace) placement = placement.replace(autoToken, '') || 'top';

	      $tip.detach().css({ top: 0, left: 0, display: 'block' }).addClass(placement).data('bs.' + this.type, this);

	      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);

	      var pos = this.getPosition();
	      var actualWidth = $tip[0].offsetWidth;
	      var actualHeight = $tip[0].offsetHeight;

	      if (autoPlace) {
	        var orgPlacement = placement;
	        var $container = this.options.container ? $(this.options.container) : this.$element.parent();
	        var containerDim = this.getPosition($container);

	        placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top' : placement == 'top' && pos.top - actualHeight < containerDim.top ? 'bottom' : placement == 'right' && pos.right + actualWidth > containerDim.width ? 'left' : placement == 'left' && pos.left - actualWidth < containerDim.left ? 'right' : placement;

	        $tip.removeClass(orgPlacement).addClass(placement);
	      }

	      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);

	      this.applyPlacement(calculatedOffset, placement);

	      var complete = function complete() {
	        var prevHoverState = that.hoverState;
	        that.$element.trigger('shown.bs.' + that.type);
	        that.hoverState = null;

	        if (prevHoverState == 'out') that.leave(that);
	      };

	      $.support.transition && this.$tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
	    }
	  };

	  Tooltip.prototype.applyPlacement = function (offset, placement) {
	    var $tip = this.tip();
	    var width = $tip[0].offsetWidth;
	    var height = $tip[0].offsetHeight;

	    // manually read margins because getBoundingClientRect includes difference
	    var marginTop = parseInt($tip.css('margin-top'), 10);
	    var marginLeft = parseInt($tip.css('margin-left'), 10);

	    // we must check for NaN for ie 8/9
	    if (isNaN(marginTop)) marginTop = 0;
	    if (isNaN(marginLeft)) marginLeft = 0;

	    offset.top = offset.top + marginTop;
	    offset.left = offset.left + marginLeft;

	    // $.fn.offset doesn't round pixel values
	    // so we use setOffset directly with our own function B-0
	    $.offset.setOffset($tip[0], $.extend({
	      using: function using(props) {
	        $tip.css({
	          top: Math.round(props.top),
	          left: Math.round(props.left)
	        });
	      }
	    }, offset), 0);

	    $tip.addClass('in');

	    // check to see if placing tip in new offset caused the tip to resize itself
	    var actualWidth = $tip[0].offsetWidth;
	    var actualHeight = $tip[0].offsetHeight;

	    if (placement == 'top' && actualHeight != height) {
	      offset.top = offset.top + height - actualHeight;
	    }

	    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);

	    if (delta.left) offset.left += delta.left;else offset.top += delta.top;

	    var isVertical = /top|bottom/.test(placement);
	    var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
	    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight';

	    $tip.offset(offset);
	    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
	  };

	  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
	    this.arrow().css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%').css(isVertical ? 'top' : 'left', '');
	  };

	  Tooltip.prototype.setContent = function () {
	    var $tip = this.tip();
	    var title = this.getTitle();

	    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
	    $tip.removeClass('fade in top bottom left right');
	  };

	  Tooltip.prototype.hide = function (callback) {
	    var that = this;
	    var $tip = $(this.$tip);
	    var e = $.Event('hide.bs.' + this.type);

	    function complete() {
	      if (that.hoverState != 'in') $tip.detach();
	      that.$element.removeAttr('aria-describedby').trigger('hidden.bs.' + that.type);
	      callback && callback();
	    }

	    this.$element.trigger(e);

	    if (e.isDefaultPrevented()) return;

	    $tip.removeClass('in');

	    $.support.transition && $tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();

	    this.hoverState = null;

	    return this;
	  };

	  Tooltip.prototype.fixTitle = function () {
	    var $e = this.$element;
	    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
	      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
	    }
	  };

	  Tooltip.prototype.hasContent = function () {
	    return this.getTitle();
	  };

	  Tooltip.prototype.getPosition = function ($element) {
	    $element = $element || this.$element;

	    var el = $element[0];
	    var isBody = el.tagName == 'BODY';

	    var elRect = el.getBoundingClientRect();
	    if (elRect.width == null) {
	      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
	      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top });
	    }
	    var elOffset = isBody ? { top: 0, left: 0 } : $element.offset();
	    var scroll = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() };
	    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null;

	    return $.extend({}, elRect, scroll, outerDims, elOffset);
	  };

	  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
	    return placement == 'bottom' ? { top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2 } : placement == 'top' ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } : placement == 'left' ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
	    /* placement == 'right' */{ top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width };
	  };

	  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
	    var delta = { top: 0, left: 0 };
	    if (!this.$viewport) return delta;

	    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
	    var viewportDimensions = this.getPosition(this.$viewport);

	    if (/right|left/.test(placement)) {
	      var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
	      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
	      if (topEdgeOffset < viewportDimensions.top) {
	        // top overflow
	        delta.top = viewportDimensions.top - topEdgeOffset;
	      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
	        // bottom overflow
	        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
	      }
	    } else {
	      var leftEdgeOffset = pos.left - viewportPadding;
	      var rightEdgeOffset = pos.left + viewportPadding + actualWidth;
	      if (leftEdgeOffset < viewportDimensions.left) {
	        // left overflow
	        delta.left = viewportDimensions.left - leftEdgeOffset;
	      } else if (rightEdgeOffset > viewportDimensions.width) {
	        // right overflow
	        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
	      }
	    }

	    return delta;
	  };

	  Tooltip.prototype.getTitle = function () {
	    var title;
	    var $e = this.$element;
	    var o = this.options;

	    title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title);

	    return title;
	  };

	  Tooltip.prototype.getUID = function (prefix) {
	    do {
	      prefix += ~~(Math.random() * 1000000);
	    } while (document.getElementById(prefix));
	    return prefix;
	  };

	  Tooltip.prototype.tip = function () {
	    return this.$tip = this.$tip || $(this.options.template);
	  };

	  Tooltip.prototype.arrow = function () {
	    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow');
	  };

	  Tooltip.prototype.enable = function () {
	    this.enabled = true;
	  };

	  Tooltip.prototype.disable = function () {
	    this.enabled = false;
	  };

	  Tooltip.prototype.toggleEnabled = function () {
	    this.enabled = !this.enabled;
	  };

	  Tooltip.prototype.toggle = function (e) {
	    var self = this;
	    if (e) {
	      self = $(e.currentTarget).data('bs.' + this.type);
	      if (!self) {
	        self = new this.constructor(e.currentTarget, this.getDelegateOptions());
	        $(e.currentTarget).data('bs.' + this.type, self);
	      }
	    }

	    self.tip().hasClass('in') ? self.leave(self) : self.enter(self);
	  };

	  Tooltip.prototype.destroy = function () {
	    var that = this;
	    clearTimeout(this.timeout);
	    this.hide(function () {
	      that.$element.off('.' + that.type).removeData('bs.' + that.type);
	    });
	  };

	  // TOOLTIP PLUGIN DEFINITION
	  // =========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this);
	      var data = $this.data('bs.tooltip');
	      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

	      if (!data && /destroy|hide/.test(option)) return;
	      if (!data) $this.data('bs.tooltip', data = new Tooltip(this, options));
	      if (typeof option == 'string') data[option]();
	    });
	  }

	  var old = $.fn.tooltip;

	  $.fn.tooltip = Plugin;
	  $.fn.tooltip.Constructor = Tooltip;

	  // TOOLTIP NO CONFLICT
	  // ===================

	  $.fn.tooltip.noConflict = function () {
	    $.fn.tooltip = old;
	    return this;
	  };
	}(jQuery);

	/* ========================================================================
	 * Bootstrap: popover.js v3.3.4
	 * http://getbootstrap.com/javascript/#popovers
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */

	+function ($) {
	  'use strict';

	  // POPOVER PUBLIC CLASS DEFINITION
	  // ===============================

	  var Popover = function Popover(element, options) {
	    this.init('popover', element, options);
	  };

	  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js');

	  Popover.VERSION = '3.3.4';

	  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
	    placement: 'right',
	    trigger: 'click',
	    content: '',
	    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	  });

	  // NOTE: POPOVER EXTENDS tooltip.js
	  // ================================

	  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);

	  Popover.prototype.constructor = Popover;

	  Popover.prototype.getDefaults = function () {
	    return Popover.DEFAULTS;
	  };

	  Popover.prototype.setContent = function () {
	    var $tip = this.tip();
	    var title = this.getTitle();
	    var content = this.getContent();

	    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);
	    $tip.find('.popover-content').children().detach().end()[// we use append for html objects to maintain js events
	    this.options.html ? typeof content == 'string' ? 'html' : 'append' : 'text'](content);

	    $tip.removeClass('fade top bottom left right in');

	    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
	    // this manually by checking the contents.
	    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide();
	  };

	  Popover.prototype.hasContent = function () {
	    return this.getTitle() || this.getContent();
	  };

	  Popover.prototype.getContent = function () {
	    var $e = this.$element;
	    var o = this.options;

	    return $e.attr('data-content') || (typeof o.content == 'function' ? o.content.call($e[0]) : o.content);
	  };

	  Popover.prototype.arrow = function () {
	    return this.$arrow = this.$arrow || this.tip().find('.arrow');
	  };

	  // POPOVER PLUGIN DEFINITION
	  // =========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this);
	      var data = $this.data('bs.popover');
	      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

	      if (!data && /destroy|hide/.test(option)) return;
	      if (!data) $this.data('bs.popover', data = new Popover(this, options));
	      if (typeof option == 'string') data[option]();
	    });
	  }

	  var old = $.fn.popover;

	  $.fn.popover = Plugin;
	  $.fn.popover.Constructor = Popover;

	  // POPOVER NO CONFLICT
	  // ===================

	  $.fn.popover.noConflict = function () {
	    $.fn.popover = old;
	    return this;
	  };
	}(jQuery);

	/* ========================================================================
	 * Bootstrap: scrollspy.js v3.3.4
	 * http://getbootstrap.com/javascript/#scrollspy
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */

	+function ($) {
	  'use strict';

	  // SCROLLSPY CLASS DEFINITION
	  // ==========================

	  function ScrollSpy(element, options) {
	    this.$body = $(document.body);
	    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element);
	    this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
	    this.selector = (this.options.target || '') + ' .nav li > a';
	    this.offsets = [];
	    this.targets = [];
	    this.activeTarget = null;
	    this.scrollHeight = 0;

	    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this));
	    this.refresh();
	    this.process();
	  }

	  ScrollSpy.VERSION = '3.3.4';

	  ScrollSpy.DEFAULTS = {
	    offset: 10
	  };

	  ScrollSpy.prototype.getScrollHeight = function () {
	    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
	  };

	  ScrollSpy.prototype.refresh = function () {
	    var that = this;
	    var offsetMethod = 'offset';
	    var offsetBase = 0;

	    this.offsets = [];
	    this.targets = [];
	    this.scrollHeight = this.getScrollHeight();

	    if (!$.isWindow(this.$scrollElement[0])) {
	      offsetMethod = 'position';
	      offsetBase = this.$scrollElement.scrollTop();
	    }

	    this.$body.find(this.selector).map(function () {
	      var $el = $(this);
	      var href = $el.data('target') || $el.attr('href');
	      var $href = /^#./.test(href) && $(href);

	      return $href && $href.length && $href.is(':visible') && [[$href[offsetMethod]().top + offsetBase, href]] || null;
	    }).sort(function (a, b) {
	      return a[0] - b[0];
	    }).each(function () {
	      that.offsets.push(this[0]);
	      that.targets.push(this[1]);
	    });
	  };

	  ScrollSpy.prototype.process = function () {
	    var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
	    var scrollHeight = this.getScrollHeight();
	    var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height();
	    var offsets = this.offsets;
	    var targets = this.targets;
	    var activeTarget = this.activeTarget;
	    var i;

	    if (this.scrollHeight != scrollHeight) {
	      this.refresh();
	    }

	    if (scrollTop >= maxScroll) {
	      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
	    }

	    if (activeTarget && scrollTop < offsets[0]) {
	      this.activeTarget = null;
	      return this.clear();
	    }

	    for (i = offsets.length; i--;) {
	      activeTarget != targets[i] && scrollTop >= offsets[i] && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) && this.activate(targets[i]);
	    }
	  };

	  ScrollSpy.prototype.activate = function (target) {
	    this.activeTarget = target;

	    this.clear();

	    var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';

	    var active = $(selector).parents('li').addClass('active');

	    if (active.parent('.dropdown-menu').length) {
	      active = active.closest('li.dropdown').addClass('active');
	    }

	    active.trigger('activate.bs.scrollspy');
	  };

	  ScrollSpy.prototype.clear = function () {
	    $(this.selector).parentsUntil(this.options.target, '.active').removeClass('active');
	  };

	  // SCROLLSPY PLUGIN DEFINITION
	  // ===========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this);
	      var data = $this.data('bs.scrollspy');
	      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

	      if (!data) $this.data('bs.scrollspy', data = new ScrollSpy(this, options));
	      if (typeof option == 'string') data[option]();
	    });
	  }

	  var old = $.fn.scrollspy;

	  $.fn.scrollspy = Plugin;
	  $.fn.scrollspy.Constructor = ScrollSpy;

	  // SCROLLSPY NO CONFLICT
	  // =====================

	  $.fn.scrollspy.noConflict = function () {
	    $.fn.scrollspy = old;
	    return this;
	  };

	  // SCROLLSPY DATA-API
	  // ==================

	  $(window).on('load.bs.scrollspy.data-api', function () {
	    $('[data-spy="scroll"]').each(function () {
	      var $spy = $(this);
	      Plugin.call($spy, $spy.data());
	    });
	  });
	}(jQuery);

	/* ========================================================================
	 * Bootstrap: tab.js v3.3.4
	 * http://getbootstrap.com/javascript/#tabs
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */

	+function ($) {
	  'use strict';

	  // TAB CLASS DEFINITION
	  // ====================

	  var Tab = function Tab(element) {
	    this.element = $(element);
	  };

	  Tab.VERSION = '3.3.4';

	  Tab.TRANSITION_DURATION = 150;

	  Tab.prototype.show = function () {
	    var $this = this.element;
	    var $ul = $this.closest('ul:not(.dropdown-menu)');
	    var selector = $this.data('target');

	    if (!selector) {
	      selector = $this.attr('href');
	      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
	    }

	    if ($this.parent('li').hasClass('active')) return;

	    var $previous = $ul.find('.active:last a');
	    var hideEvent = $.Event('hide.bs.tab', {
	      relatedTarget: $this[0]
	    });
	    var showEvent = $.Event('show.bs.tab', {
	      relatedTarget: $previous[0]
	    });

	    $previous.trigger(hideEvent);
	    $this.trigger(showEvent);

	    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return;

	    var $target = $(selector);

	    this.activate($this.closest('li'), $ul);
	    this.activate($target, $target.parent(), function () {
	      $previous.trigger({
	        type: 'hidden.bs.tab',
	        relatedTarget: $this[0]
	      });
	      $this.trigger({
	        type: 'shown.bs.tab',
	        relatedTarget: $previous[0]
	      });
	    });
	  };

	  Tab.prototype.activate = function (element, container, callback) {
	    var $active = container.find('> .active');
	    var transition = callback && $.support.transition && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length);

	    function next() {
	      $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', false);

	      element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', true);

	      if (transition) {
	        element[0].offsetWidth; // reflow for transition
	        element.addClass('in');
	      } else {
	        element.removeClass('fade');
	      }

	      if (element.parent('.dropdown-menu').length) {
	        element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', true);
	      }

	      callback && callback();
	    }

	    $active.length && transition ? $active.one('bsTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next();

	    $active.removeClass('in');
	  };

	  // TAB PLUGIN DEFINITION
	  // =====================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this);
	      var data = $this.data('bs.tab');

	      if (!data) $this.data('bs.tab', data = new Tab(this));
	      if (typeof option == 'string') data[option]();
	    });
	  }

	  var old = $.fn.tab;

	  $.fn.tab = Plugin;
	  $.fn.tab.Constructor = Tab;

	  // TAB NO CONFLICT
	  // ===============

	  $.fn.tab.noConflict = function () {
	    $.fn.tab = old;
	    return this;
	  };

	  // TAB DATA-API
	  // ============

	  var clickHandler = function clickHandler(e) {
	    e.preventDefault();
	    Plugin.call($(this), 'show');
	  };

	  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler).on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler);
	}(jQuery);

	/* ========================================================================
	 * Bootstrap: affix.js v3.3.4
	 * http://getbootstrap.com/javascript/#affix
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */

	+function ($) {
	  'use strict';

	  // AFFIX CLASS DEFINITION
	  // ======================

	  var Affix = function Affix(element, options) {
	    this.options = $.extend({}, Affix.DEFAULTS, options);

	    this.$target = $(this.options.target).on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this)).on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this));

	    this.$element = $(element);
	    this.affixed = null;
	    this.unpin = null;
	    this.pinnedOffset = null;

	    this.checkPosition();
	  };

	  Affix.VERSION = '3.3.4';

	  Affix.RESET = 'affix affix-top affix-bottom';

	  Affix.DEFAULTS = {
	    offset: 0,
	    target: window
	  };

	  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
	    var scrollTop = this.$target.scrollTop();
	    var position = this.$element.offset();
	    var targetHeight = this.$target.height();

	    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false;

	    if (this.affixed == 'bottom') {
	      if (offsetTop != null) return scrollTop + this.unpin <= position.top ? false : 'bottom';
	      return scrollTop + targetHeight <= scrollHeight - offsetBottom ? false : 'bottom';
	    }

	    var initializing = this.affixed == null;
	    var colliderTop = initializing ? scrollTop : position.top;
	    var colliderHeight = initializing ? targetHeight : height;

	    if (offsetTop != null && scrollTop <= offsetTop) return 'top';
	    if (offsetBottom != null && colliderTop + colliderHeight >= scrollHeight - offsetBottom) return 'bottom';

	    return false;
	  };

	  Affix.prototype.getPinnedOffset = function () {
	    if (this.pinnedOffset) return this.pinnedOffset;
	    this.$element.removeClass(Affix.RESET).addClass('affix');
	    var scrollTop = this.$target.scrollTop();
	    var position = this.$element.offset();
	    return this.pinnedOffset = position.top - scrollTop;
	  };

	  Affix.prototype.checkPositionWithEventLoop = function () {
	    setTimeout($.proxy(this.checkPosition, this), 1);
	  };

	  Affix.prototype.checkPosition = function () {
	    if (!this.$element.is(':visible')) return;

	    var height = this.$element.height();
	    var offset = this.options.offset;
	    var offsetTop = offset.top;
	    var offsetBottom = offset.bottom;
	    var scrollHeight = $(document.body).height();

	    if ((typeof offset === 'undefined' ? 'undefined' : _typeof(offset)) != 'object') offsetBottom = offsetTop = offset;
	    if (typeof offsetTop == 'function') offsetTop = offset.top(this.$element);
	    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element);

	    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);

	    if (this.affixed != affix) {
	      if (this.unpin != null) this.$element.css('top', '');

	      var affixType = 'affix' + (affix ? '-' + affix : '');
	      var e = $.Event(affixType + '.bs.affix');

	      this.$element.trigger(e);

	      if (e.isDefaultPrevented()) return;

	      this.affixed = affix;
	      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null;

	      this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace('affix', 'affixed') + '.bs.affix');
	    }

	    if (affix == 'bottom') {
	      this.$element.offset({
	        top: scrollHeight - height - offsetBottom
	      });
	    }
	  };

	  // AFFIX PLUGIN DEFINITION
	  // =======================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this);
	      var data = $this.data('bs.affix');
	      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

	      if (!data) $this.data('bs.affix', data = new Affix(this, options));
	      if (typeof option == 'string') data[option]();
	    });
	  }

	  var old = $.fn.affix;

	  $.fn.affix = Plugin;
	  $.fn.affix.Constructor = Affix;

	  // AFFIX NO CONFLICT
	  // =================

	  $.fn.affix.noConflict = function () {
	    $.fn.affix = old;
	    return this;
	  };

	  // AFFIX DATA-API
	  // ==============

	  $(window).on('load', function () {
	    $('[data-spy="affix"]').each(function () {
	      var $spy = $(this);
	      var data = $spy.data();

	      data.offset = data.offset || {};

	      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom;
	      if (data.offsetTop != null) data.offset.top = data.offsetTop;

	      Plugin.call($spy, data);
	    });
	  });
	}(jQuery);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(34)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\app.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(41)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./app.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _loading = __webpack_require__(35);

	var _loading2 = _interopRequireDefault(_loading);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    ready: function ready() {
	        var vm = this;
	        _vue2.default.http.interceptors.push({
	            request: function request(_request) {
	                vm.showLoading = true;
	                return _request;
	            },
	            response: function response(_response) {
	                vm.showLoading = false;
	                return _response;
	            }
	        });
	    },
	    data: function data() {
	        return {
	            showLoading: false
	        };
	    },
	    components: {
	        loading: _loading2.default
	    }
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(36)
	__vue_script__ = __webpack_require__(39)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\components\\loading.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(40)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./loading.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(37);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(38)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./loading.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./loading.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "\n\n.loading-mask {\n    position: absolute;\n    left: 0;\n    top: 0;\n    z-index: 2001;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.2);\n}\n\n.loading-mask > div {\n    position: absolute !important;\n    top: 50% !important;\n    left: 50% !important;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n}\n\n", ""]);

	// exports


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    props: {
	        show: {
	            default: false
	        }
	    }
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div class=\"loading-mask\" :transition=\"fade\" v-show=\"show\">\n    <div class=\"sk-spinner sk-spinner-rotating-plane\"></div>\n</div>\n\n";

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n    <router-view></router-view>\n    <loading :show=\"showLoading\"></loading>\n</div>\n";

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    twoWay: true,
	    priority: 1000,
	    params: ['options'],
	    bind: function bind() {
	        var self = this;
	        var defaults = {
	            toggle: true
	        };
	        var settings = $.extend(defaults, self.params.options);
	        var $this = $(this.el);
	        var $toggle = settings.toggle;

	        $this.find("li.active").has("ul").children("ul").addClass("collapse in");
	        $this.find("li").not(".active").has("ul").children("ul").addClass("collapse");

	        $this.find("li").children("a").on("click" + ".collapseMenu", function (e) {
	            if ($(this).siblings("ul").length) {
	                e.preventDefault();
	            }
	            $(this).parent("li").toggleClass("active").children("ul").collapse("toggle");
	            if ($toggle) {
	                $(this).parent("li").siblings().removeClass("active").children("ul.in").collapse("hide");
	            }
	        });
	    },

	    update: function update(value) {
	        // todo
	    },
	    unbind: function unbind() {
	        $(this.el).off('.collapseMenu');
	    }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = authConfig;
	function authConfig(Vue) {
	    Vue.http.interceptors.push({
	        request: function request(_request) {
	            var token, headers;

	            token = localStorage.getItem('jwt_token');
	            headers = _request.headers || (_request.headers = {});

	            if (token !== null && token !== 'undefined') {
	                headers.Authorization = token;
	            }

	            return _request;
	        },
	        response: function response(_response) {
	            if (_response.status && _response.status.code === 401) {
	                localStorage.removeItem('jwt_token');
	            }
	            if (_response.headers && _response.headers.Authorization) {
	                localStorage.setItem('jwt_token', _response.headers.Authorization);
	            }
	            if (_response.entity && _response.entity.token && _response.entity.token.length > 10) {
	                localStorage.setItem('jwt_token', 'Bearer ' + _response.entity.token);
	            }
	            return _response;
	        }
	    });
	}

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = routeConfig;

	var _login = __webpack_require__(45);

	var _login2 = _interopRequireDefault(_login);

	var _layout = __webpack_require__(49);

	var _layout2 = _interopRequireDefault(_layout);

	var _dashboard = __webpack_require__(63);

	var _dashboard2 = _interopRequireDefault(_dashboard);

	var _index = __webpack_require__(66);

	var _index2 = _interopRequireDefault(_index);

	var _create = __webpack_require__(79);

	var _create2 = _interopRequireDefault(_create);

	var _edit = __webpack_require__(153);

	var _edit2 = _interopRequireDefault(_edit);

	var _index3 = __webpack_require__(156);

	var _index4 = _interopRequireDefault(_index3);

	var _create3 = __webpack_require__(159);

	var _create4 = _interopRequireDefault(_create3);

	var _edit3 = __webpack_require__(162);

	var _edit4 = _interopRequireDefault(_edit3);

	var _index5 = __webpack_require__(165);

	var _index6 = _interopRequireDefault(_index5);

	var _create5 = __webpack_require__(168);

	var _create6 = _interopRequireDefault(_create5);

	var _edit5 = __webpack_require__(183);

	var _edit6 = _interopRequireDefault(_edit5);

	var _index7 = __webpack_require__(190);

	var _index8 = _interopRequireDefault(_index7);

	var _create7 = __webpack_require__(193);

	var _create8 = _interopRequireDefault(_create7);

	var _edit7 = __webpack_require__(196);

	var _edit8 = _interopRequireDefault(_edit7);

	var _index9 = __webpack_require__(199);

	var _index10 = _interopRequireDefault(_index9);

	var _create9 = __webpack_require__(202);

	var _create10 = _interopRequireDefault(_create9);

	var _edit9 = __webpack_require__(203);

	var _edit10 = _interopRequireDefault(_edit9);

	var _index11 = __webpack_require__(206);

	var _index12 = _interopRequireDefault(_index11);

	var _create11 = __webpack_require__(209);

	var _create12 = _interopRequireDefault(_create11);

	var _edit11 = __webpack_require__(212);

	var _edit12 = _interopRequireDefault(_edit11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function routeConfig(router) {
	    router.map({
	        '/login': {
	            name: 'login',
	            component: _login2.default
	        },
	        '/main': {
	            name: 'main',
	            component: _layout2.default,
	            subRoutes: {
	                '/dashboard': {
	                    name: 'dashboard',
	                    component: _dashboard2.default
	                },
	                //admin
	                '/admin/index': {
	                    name: 'admin_index',
	                    component: _index2.default
	                },
	                '/admin/create': {
	                    name: 'admin_create',
	                    component: _create2.default
	                },
	                '/admin/edit/:id': {
	                    name: 'admin_edit',
	                    component: _edit2.default
	                },
	                //city
	                '/city/index': {
	                    name: 'city_index',
	                    component: _index4.default
	                },
	                '/city/create': {
	                    name: 'city_create',
	                    component: _create4.default
	                },
	                '/city/edit/:id': {
	                    name: 'city_edit',
	                    component: _edit4.default
	                },
	                //post
	                '/post/index': {
	                    name: 'post_index',
	                    component: _index6.default
	                },
	                '/post/create': {
	                    name: 'post_create',
	                    component: _create6.default
	                },
	                '/post/edit/:id': {
	                    name: 'post_edit',
	                    component: _edit6.default
	                },
	                //tag
	                '/tag/index': {
	                    name: 'tag_index',
	                    component: _index8.default
	                },
	                '/tag/create': {
	                    name: 'tag_create',
	                    component: _create8.default
	                },
	                '/tag/edit/:id': {
	                    name: 'tag_edit',
	                    component: _edit8.default
	                },
	                //tag
	                '/comment/index': {
	                    name: 'comment_index',
	                    component: _index10.default
	                },
	                '/comment/create': {
	                    name: 'comment_create',
	                    component: _create10.default
	                },
	                '/comment/edit/:id': {
	                    name: 'comment_edit',
	                    component: _edit10.default
	                },
	                //user
	                '/user/index': {
	                    name: 'user_index',
	                    component: _index12.default
	                },
	                '/user/create': {
	                    name: 'user_create',
	                    component: _create12.default
	                },
	                '/user/edit/:id': {
	                    name: 'user_edit',
	                    component: _edit12.default
	                }
	            }
	        }
	    });

	    router.redirect({
	        '*': '/login',
	        '/main': '/main/dashboard'
	    });

	    router.beforeEach(function (transition) {
	        var token = localStorage.getItem('jwt_token');
	        if (!token || token === null) {
	            router.go('/login');
	        }
	        transition.next();
	    });
	}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(46)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\login.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(48)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./login.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _auth = __webpack_require__(47);

	var _auth2 = _interopRequireDefault(_auth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            credentials: {
	                name: '',
	                password: ''
	            }

	        };
	    },
	    methods: {
	        login: function login() {

	            var vm = this;

	            _auth2.default.login(vm, vm.credentials).then(function () {
	                vm.$route.router.go('/main/dashboard');
	                vm.$toast['success']('登陆成功');
	            }, function (error) {
	                vm.$toast['success'](error.msg);
	            });
	        }
	    }
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var LOGIN_URL = 'login';
	var LOGOUT_URL = 'logout';

	exports.default = {

	    user: null,

	    authenticated: false,

	    login: function login(context, creds) {

	        return new Promise(function (resolve, reject) {
	            var _this = this;

	            var error_result = { flag: false, msg: "登陆失败" };
	            context.$http.post(LOGIN_URL, creds).then(function (result) {
	                var data = result.data;
	                if (data.flag === true && data.jwt_token) {
	                    localStorage.setItem('jwt_token', data.jwt_token);
	                    localStorage.setItem('jwt_user', JSON.stringify(data.data));
	                    _this.authenticated = true;
	                    _this.user = data.data;
	                    resolve(result);
	                } else {
	                    reject(error_result);
	                }
	            }, function (error) {
	                reject(error_result);
	            });
	        }.bind(this));
	    },
	    logout: function logout(context) {

	        return new Promise(function (resolve, reject) {
	            var _this2 = this;

	            context.$http.post(LOGOUT_URL).then(function (result) {
	                var data = result.data;
	                if (data.flag === true) {
	                    localStorage.removeItem('jwt_token');
	                    localStorage.removeItem('jwt_user');
	                    _this2.authenticated = false;
	                    _this2.user = null;
	                    resolve();
	                } else {
	                    reject();
	                }
	            }, function (error) {
	                reject(error);
	            });
	        }.bind(this));
	    },
	    checkAuth: function checkAuth() {
	        var jwt = localStorage.getItem('jwt_token');
	        if (jwt) {
	            this.authenticated = true;
	        } else {
	            this.authenticated = false;
	        }
	    },
	    getToken: function getToken() {
	        return localStorage.getItem('jwt_token');
	    }
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"middle-box text-center animated fadeInDown\">\n    <div>\n        <form class=\"m-t\" role=\"form\" onsubmit=\"return false\">\n            <div class=\"form-group\">\n                <input type=\"text\" class=\"form-control\" placeholder=\"邮箱/用户名\" required v-model=\"credentials.name\">\n            </div>\n            <div class=\"form-group\">\n                <input type=\"password\" class=\"form-control\" placeholder=\"密码\" required\n                       v-model=\"credentials.password\">\n            </div>\n            <button type=\"submit\" class=\"btn btn-primary block full-width m-b\" @click=\"login\">登陆</button>\n        </form>\n    </div>\n</div>\n";

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(50)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\layout.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(62)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./layout.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _auth = __webpack_require__(47);

	var _auth2 = _interopRequireDefault(_auth);

	var _top = __webpack_require__(51);

	var _top2 = _interopRequireDefault(_top);

	var _sidebar = __webpack_require__(55);

	var _sidebar2 = _interopRequireDefault(_sidebar);

	var _bottom = __webpack_require__(60);

	var _bottom2 = _interopRequireDefault(_bottom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    ready: function ready() {
	        var vm = this;
	        var local_admin = _auth2.default.user;
	        if (local_admin) {
	            vm.admin = local_admin;
	        } else {
	            var token = _auth2.default.getToken();
	            vm.$http.get('admin_info', { token: token }).then(function (result) {
	                var data = result.data;
	                if (data.flag == true && data.data) {
	                    vm.admin = data.data;
	                } else {
	                    vm.$route.router.go('/login');
	                }
	                vm.$toast['success'](data.msg);
	            });
	        }
	    },
	    data: function data() {
	        return {
	            admin: {}
	        };
	    },
	    components: {
	        top: _top2.default,
	        sidebar: _sidebar2.default,
	        bottom: _bottom2.default
	    }
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(52)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\partial\\top.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(54)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./top.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _auth = __webpack_require__(53);

	var _auth2 = _interopRequireDefault(_auth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    props: ['admin'],
	    data: function data() {
	        return {
	            search_text: ''
	        };
	    },
	    mixins: [_auth2.default],
	    methods: {
	        onKeyup: function onKeyup() {
	            this.$root.$broadcast('onSearch', this.search_text);
	            return false;
	        },
	        toggleCanvasMenu: function toggleCanvasMenu() {
	            window.document.body.classList.toggle('mini-navbar');
	        }
	    }
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _auth = __webpack_require__(47);

	var _auth2 = _interopRequireDefault(_auth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    methods: {
	        logout: function logout() {
	            var vm = this;
	            _auth2.default.logout(this).then(function () {
	                vm.$toast['success']('退出成功');
	                vm.$route.router.go('/login');
	            });
	        }
	    }
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"row border-bottom\">\n    <nav class=\"navbar navbar-static-top\" role=\"navigation\" style=\"margin-bottom: 0\">\n        <div class=\"navbar-header\">\n            <button type=\"button\" class=\"navbar-minimalize minimalize-styl-2 btn btn-primary\"\n                    @click=\"toggleCanvasMenu\">\n                <i class=\"fa fa-bars\"></i>\n            </button>\n            <form role=\"search\" class=\"navbar-form-custom\">\n                <div class=\"form-group\">\n                    <!--<input type=\"text\" placeholder=\"搜索…\" class=\"form-control\" v-model=\"search_text\"\n                           @keyup=\"onKeyup | debounce 300\">-->\n                </div>\n            </form>\n\n        </div>\n        <ul class=\"nav navbar-top-links navbar-right\">\n            <li>\n                <span class=\"m-r-sm text-muted welcome-message\">欢迎您 {{admin.name}}！</span>\n            </li>\n            <li>\n                <a @click.prevent=\"logout\">\n                    <i class=\"fa fa-sign-out\"></i> 退出\n                </a>\n            </li>\n        </ul>\n    </nav>\n</div>\n";

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(56)
	__vue_script__ = __webpack_require__(58)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\partial\\sidebar.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(59)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./sidebar.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(57);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(38)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./sidebar.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./sidebar.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "\n.nav > li > a.v-link-active {\n    color: #fff;\n}\n\nbody.mini-navbar .nav-header {\n    background: none;\n}\n", ""]);

	// exports


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _auth = __webpack_require__(53);

	var _auth2 = _interopRequireDefault(_auth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    props: ['admin'],
	    mixins: [_auth2.default]
	};

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n<nav class=\"navbar-default navbar-static-side\" role=\"navigation\">\n    <div class=\"sidebar-collapse\">\n        <ul class=\"nav\">\n            <li class=\"nav-header\">\n                <div class=\"dropdown profile-element\">\n                    <img :src=\"admin.image\" class=\"img-circle\" width=\"60\">\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                        <span class=\"block m-t-xs\">\n                            <strong class=\"font-bold\">{{admin.name}}</strong>\n                            <b class=\"caret\"></b>\n                        </span>\n                    </a>\n                    <ul class=\"dropdown-menu animated fadeInRight m-t-xs\">\n                        <li><a v-link=\"{name: 'admin_edit', params: {id: admin.id}}\">个人资料</a></li>\n                        <li class=\"divider\"></li>\n                        <li><a @click.prevent=\"logout\">退出</a></li>\n                    </ul>\n                </div>\n                <!--  <div class=\"logo-element\">\n                     LV\n                 </div> -->\n            </li>\n        </ul>\n        <ul class=\"nav\" v-menu>\n            <li class=\"active\">\n                <a v-link=\"{name:'dashboard'}\">\n                    <i class=\"fa fa-th\"></i>\n                    <span class=\"nav-label\">首页</span>\n                </a>\n            </li>\n            <li>\n                <a>\n                    <i class=\"fa fa-sitemap\"></i>\n                    <span class=\"nav-label\">城市</span>\n                    <span class=\"fa arrow\"></span>\n                </a>\n                <ul class=\"nav nav-second-level\">\n                    <li><a v-link=\"{name:'city_index'}\">城市列表</a></li>\n                    <li><a v-link=\"{name:'city_create'}\">城市添加</a></li>\n                </ul>\n            </li>\n            <li>\n                <a>\n                    <i class=\"fa fa-files-o\"></i>\n                    <span class=\"nav-label\">小区</span>\n                    <span class=\"fa arrow\"></span>\n                </a>\n                <ul class=\"nav nav-second-level\">\n                    <li><a v-link=\"{name:'post_index'}\">小区列表</a></li>\n                    <li><a v-link=\"{name:'post_create'}\">小区添加</a></li>\n                </ul>\n            </li>\n            <li>\n                <a>\n                    <i class=\"fa fa-tag\"></i>\n                    <span class=\"nav-label\">标签</span>\n                    <span class=\"fa arrow\"></span>\n                </a>\n                <ul class=\"nav nav-second-level\">\n                    <li><a v-link=\"{name:'tag_index'}\">标签列表</a></li>\n                    <li><a v-link=\"{name:'tag_create'}\">标签添加</a></li>\n                </ul>\n            </li>\n            <li>\n                <a>\n                    <i class=\"fa fa-comment\"></i>\n                    <span class=\"nav-label\">评论</span>\n                    <span class=\"fa arrow\"></span>\n                </a>\n                <ul class=\"nav nav-second-level\">\n                    <li><a v-link=\"{name:'comment_index'}\">评论列表</a></li>\n                </ul>\n            </li>\n            <li>\n                <a>\n                    <i class=\"fa fa-group\"></i>\n                    <span class=\"nav-label\">用户</span>\n                    <span class=\"fa arrow\"></span>\n                </a>\n                <ul class=\"nav nav-second-level\">\n                    <li><a v-link=\"{name:'user_index'}\">用户列表</a></li>\n                    <li><a v-link=\"{name:'user_create'}\">用户添加</a></li>\n                </ul>\n            </li>\n            <li>\n                <a>\n                    <i class=\"fa fa-user\"></i>\n                    <span class=\"nav-label\">管理员</span>\n                    <span class=\"fa arrow\"></span>\n                </a>\n                <ul class=\"nav nav-second-level\">\n                    <li><a v-link=\"{name:'admin_index'}\">管理员列表</a></li>\n                    <li><a v-link=\"{name:'admin_create'}\">管理员添加</a></li>\n                </ul>\n            </li>\n        </ul>\n\n    </div>\n</nav>\n";

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_template__ = __webpack_require__(61)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./bottom.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"footer\">\n    <div>\n        <strong>Copyright</strong> &copy; 2016\n    </div>\n</div>\n";

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = "\n<div id=\"wrapper\">\n\n    <sidebar :admin=\"admin\"></sidebar>\n\n    <div id=\"page-wrapper\" class=\"gray-bg\">\n\n        <top :admin=\"admin\"></top>\n\n        <router-view></router-view>\n\n        <bottom></bottom>\n    </div>\n\n</div>\n";

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(64)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\dashboard.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(65)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./dashboard.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 64 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    ready: function ready() {
	        this.getData();
	    },
	    data: function data() {
	        return {
	            data: {
	                posts_count: 0,
	                users_count: 0,
	                categories_count: 0
	            }
	        };
	    },
	    methods: {
	        getData: function getData() {
	            this.$http.get('dashboard').then(function (result) {
	                var data = result.data;
	                this.data = data.data;
	            });
	        }
	    }
	};

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\" wrapper wrapper-content animated fadeInRight\">\n    <div class=\"row\">\n        <div class=\"col-lg-4\">\n            <div class=\"widget navy-bg\">\n                <div class=\"row vertical-align\">\n                    <div class=\"col-xs-3\">\n                        <i class=\"fa fa-user fa-3x\"></i>\n                    </div>\n                    <div class=\"col-xs-9 text-right\">\n                        <h2 class=\"font-bold\">{{data.users_count}}</h2>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-lg-4\">\n            <div class=\"widget navy-bg\">\n                <div class=\"row vertical-align\">\n                    <div class=\"col-xs-3\">\n                        <i class=\"fa fa-thumbs-up fa-3x\"></i>\n                    </div>\n                    <div class=\"col-xs-9 text-right\">\n                        <h2 class=\"font-bold\">{{data.posts_count}}</h2>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-lg-4\">\n            <div class=\"widget navy-bg\">\n                <div class=\"row vertical-align\">\n                    <div class=\"col-xs-3\">\n                        <i class=\"fa fa-rss fa-3x\"></i>\n                    </div>\n                    <div class=\"col-xs-9 text-right\">\n                        <h2 class=\"font-bold\">{{data.categories_count}}</h2>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n</div>\n";

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(67)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\admin\\index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(78)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _breadCrumb = __webpack_require__(68);

	var _breadCrumb2 = _interopRequireDefault(_breadCrumb);

	var _dataTable = __webpack_require__(71);

	var _dataTable2 = _interopRequireDefault(_dataTable);

	var _pagination = __webpack_require__(75);

	var _pagination2 = _interopRequireDefault(_pagination);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    ready: function ready() {
	        this.getData();
	    },
	    data: function data() {
	        return {
	            title: '管理员列表',
	            breadcrumbs: [{
	                name: '首页',
	                url: ''
	            }, {
	                name: '管理员列表',
	                url: ''
	            }],
	            page: 1,
	            pageSize: 15,
	            count: 0,
	            data: [],
	            columns: {
	                id: '#',
	                name: '姓名',
	                email: '邮箱',
	                created_at: '创建时间'
	            }

	        };
	    },
	    components: {
	        'bread-crumb': _breadCrumb2.default,
	        'data-table': _dataTable2.default,
	        'pagination': _pagination2.default
	    },
	    methods: {
	        getData: function getData() {
	            this.$http.get('admin', {
	                page: this.page,
	                page_size: this.pageSize
	            }).then(function (result) {
	                var data = result.data;
	                this.data = data.data;
	                this.count = data.count;
	            });
	        }
	    },
	    events: {
	        onEdit: function onEdit(id) {
	            this.$route.router.go({ name: 'admin_edit', params: { id: id } });
	        },
	        onDelete: function onDelete(id) {
	            this.$http.delete('admin/' + id).then(function (result) {
	                var data = result.data;
	                if (data.flag == true) {
	                    this.getData();
	                }
	                this.$toast['success'](data.msg);
	            });
	        },
	        onChangePage: function onChangePage(page) {
	            this.page = page;
	            this.getData();
	        }
	    }
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(69)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\partial\\bread-crumb.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(70)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./bread-crumb.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 69 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    props: {
	        title: {
	            required: true,
	            type: String
	        },
	        paths: {
	            type: Array
	        }
	    },
	    computed: {
	        count: function count() {
	            return this.paths.length;
	        }
	    }
	};

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"row wrapper border-bottom white-bg page-heading\">\n    <div class=\"col-lg-8\">\n        <h2>{{title}}</h2>\n        <ol class=\"breadcrumb\" v-if=\"count>0\">\n            <li v-for=\"(key,val) in paths\" :class=\"{'active':$index==(count-1)}\">\n                <strong v-if=\"$index==(count-1)\">{{val.name}}</strong>\n                <a href=\"{{val.url?val.url:'javascript:;'}}\" v-else>{{val.name}}</a>\n            </li>\n        </ol>\n    </div>\n    <div class=\"col-lg-4\">\n        <slot></slot>\n    </div>\n</div>\n";

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(72)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\components\\data-table.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(74)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./data-table.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(73);

	exports.default = {
	    props: {
	        columns: {
	            required: true,
	            type: Object
	        },
	        data: {
	            required: true,
	            type: Array
	        },
	        actions: {
	            type: Array,
	            default: function _default() {
	                return [{
	                    name: 'edit',
	                    display: '编辑',
	                    prop: 'id'
	                }, {
	                    name: 'delete',
	                    display: '删除',
	                    prop: 'id'
	                }];
	            }
	        },
	        class: {
	            type: String
	        }
	    },
	    methods: {
	        invokeAction: function invokeAction(action, params) {
	            action = 'on' + (0, _utils.ucFirst)(action);
	            var args = [];
	            if (Array.isArray(params)) {
	                params.unshift(action);
	                args = params;
	            } else {
	                args = [action, params];
	            }
	            var dispatch = this.$dispatch;
	            dispatch.apply(this, args);
	        }
	    }
	};

/***/ },
/* 73 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ucFirst = ucFirst;
	exports.extend = extend;
	function ucFirst(word) {
	    return word.replace(/(\w)/, function (v) {
	        return v.toUpperCase();
	    });
	}

	function extend() {
	    var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    for (var i = 1; i < arguments.length; i++) {
	        if (!arguments[i]) {
	            continue;
	        }

	        for (var key in arguments[i]) {
	            if (arguments[i].hasOwnProperty(key)) {
	                out[key] = arguments[i][key];
	            }
	        }
	    }
	    return out;
	}

/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = "\n<table class=\"table\">\n    <thead>\n    <tr>\n        <td v-for=\"(k,v) in columns\">\n            {{typeof v=='object'?v[0]:v}}\n        </td>\n        <td>操作</td>\n    </tr>\n    </thead>\n    <tbody>\n    <tr v-for=\"entry in data\">\n        <td v-for=\"(k,v) in columns\">\n            {{typeof v=='object'&&entry[k]?entry[k][v[1]]:entry[k]}}              \n        </td>\n        <td>\n            <a :class=\"{'m-l-sm':$index>0}\" @click.prevent=\"invokeAction(action.name,entry[action.prop])\"\n               v-for=\"action in actions\">{{action.display}}</a>\n        </td>\n    </tr>\n    </tbody>\n</table>\n";

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(76)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\components\\pagination.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(77)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./pagination.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 76 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    props: {
	        page: {
	            type: Number,
	            required: true
	        },
	        showSize: {
	            type: Number,
	            default: 10
	        },
	        pageSize: {
	            type: Number,
	            default: 20
	        },
	        count: {
	            type: Number,
	            required: true
	        },
	        class: {
	            type: String,
	            default: ''
	        }
	    },
	    computed: {
	        isShow: function isShow() {
	            return Math.floor(this.count / this.pageSize);
	        },
	        pages: function pages() {
	            var arr = [],
	                left = 1,
	                totalPage = Math.ceil(this.count / this.pageSize),
	                right = totalPage;
	            if (this.showSize > totalPage) {
	                this.showSize = totalPage;
	            }
	            if (this.current <= 0) {
	                this.page = 1;
	            }
	            if (this.page > totalPage) {
	                this.page = totalPage;
	            }
	            if (totalPage >= this.showSize + 1) {
	                var halfRight = Math.ceil((this.showSize - 1) / 2);
	                var halfLeft = Math.floor((this.showSize - 1) / 2);
	                if (this.page > halfRight && this.current < totalPage - halfLeft) {
	                    left = this.page - halfRight;
	                    right = this.page + halfLeft;
	                } else {
	                    if (this.page <= halfRight) {
	                        left = 1;
	                        right = this.showSize;
	                    } else {
	                        right = totalPage;
	                        left = totalPage - (this.showSize - 1);
	                    }
	                }
	            }
	            while (left <= right) {
	                arr.push(left);
	                left++;
	            }
	            return arr;
	        },
	        showLast: function showLast() {
	            if (this.page == Math.ceil(this.count / this.pageSize)) {
	                return false;
	            }
	            return true;
	        },
	        showFirst: function showFirst() {
	            if (this.page == 1) {
	                return false;
	            }
	            return true;
	        }
	    },
	    methods: {
	        linkClick: function linkClick(index) {
	            if (index != this.page) {
	                this.page = index;
	            }
	        }
	    },
	    watch: {
	        page: function page(oldValue, newValue) {
	            this.$dispatch('onChangePage', oldValue);
	        }
	    }
	};

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = "\n\n<ul class=\"pagination {{class}}\" v-if=\"isShow\">\n    <li v-if=\"showFirst\"><a @click.prevent=\"page--\"><span>&laquo;</span></a></li>\n    <li v-for=\"index in pages\" :class=\"{ 'active': page == index}\">\n        <a @click.prevent=\"linkClick(index)\">{{ index }}</a>\n    </li>\n    <li v-if=\"showLast\"><a @click.prevent=\"page++\"><span>&raquo;</span></a></li>\n</ul>\n\n";

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n\n    <bread-crumb :title=\"title\" :paths=\"breadcrumbs\"></bread-crumb>\n\n    <div class=\" wrapper wrapper-content animated fadeInRight\">\n\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n\n                <div class=\"ibox float-e-margins\">\n                    <div class=\"ibox-title\">\n                        <h5>{{title}}</h5>\n\n                        <div class=\"ibox-tools\"></div>\n                    </div>\n                    <div class=\"ibox-content\">\n\n                        <data-table :data=\"data\" :columns=\"columns\"></data-table>\n\n                        <div class=\"row\">\n                            <div class=\"col-lg-12\">\n                                <div class=\"pull-right\">\n                                    <pagination :count=\"count\" :page=\"page\" :page-size=\"pageSize\"></pagination>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n</div>\n";

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(80)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\admin\\create.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(152)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./create.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _breadCrumb = __webpack_require__(68);

	var _breadCrumb2 = _interopRequireDefault(_breadCrumb);

	var _fileUpload = __webpack_require__(81);

	var _fileUpload2 = _interopRequireDefault(_fileUpload);

	var _upload = __webpack_require__(151);

	var _upload2 = _interopRequireDefault(_upload);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            title: '管理员创建',
	            breadcrumbs: [{
	                name: '首页',
	                url: ''
	            }, {
	                name: '管理员创建',
	                url: ''
	            }],
	            data: {
	                name: '',
	                email: '',
	                image: '',
	                password: '',
	                repeat_password: ''
	            },
	            errors: null
	        };
	    },
	    mixins: [_upload2.default],
	    components: {
	        'bread-crumb': _breadCrumb2.default,
	        'file-upload': _fileUpload2.default
	    },
	    methods: {
	        createData: function createData() {
	            this.$http.post('admin', this.data).then(function (result) {
	                var data = result.data;
	                if (data.flag == true) {
	                    this.$route.router.go('/main/admin/index');
	                }
	                if (data.errors) {
	                    this.errors = data.errors;
	                }
	                this.$toast['success'](data.msg);
	            });
	        }
	    }
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(82)
	__vue_script__ = __webpack_require__(84)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\components\\file-upload.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(150)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./file-upload.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(83);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(38)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./file-upload.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./file-upload.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "\n.file-upload-label {\n    display: inline-block;\n    position: relative;\n    margin: 0 !important;\n    padding: 0 !important;\n}\n\n.file-upload-btn {\n    margin-bottom: 0 !important;\n}\n\n.file-upload-btn + input {\n    opacity: 0;\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n}\n", ""]);

	// exports


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _promise = __webpack_require__(85);

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    props: {
	        class: {
	            type: String,
	            default: ''
	        },
	        name: {
	            type: String,
	            default: 'file'
	        },
	        id: String,
	        action: {
	            type: String,
	            required: true
	        },
	        accept: String,
	        multiple: String,
	        showBtn: {
	            type: Boolean,
	            default: false
	        },
	        changeUpload: {
	            type: Boolean,
	            default: true
	        },
	        headers: Object,
	        params: Object
	    },
	    data: function data() {
	        return {
	            files: []
	        };
	    },

	    methods: {
	        fileInputClick: function fileInputClick() {
	            this.$dispatch('onFileClick', this.files);
	        },

	        fileInputChange: function fileInputChange() {
	            var id = this.id || this.name;
	            var element = document.getElementById(id);
	            this.files = element.files;
	            this.$dispatch('onFileChange', this.files);
	            if (this.changeUpload) {
	                this.fileUpload();
	            }
	        },

	        _onProgress: function _onProgress(e) {
	            e.percent = e.loaded / e.total * 100;
	            this.$dispatch('onFileProgress', e);
	        },

	        _handleUpload: function _handleUpload(file) {
	            this.$dispatch('beforeFileUpload', file);
	            var form = new FormData(),
	                xhr = new XMLHttpRequest();
	            try {
	                form.append('Content-Type', file.type || 'application/octet-stream');
	                form.append('file', file);
	                if (this.params) {
	                    for (var param in this.params) {
	                        form.append(param, this.params[param]);
	                    }
	                }
	            } catch (e) {
	                this.$dispatch('onFileError', file, e);
	                return;
	            }

	            return new _promise2.default(function (resolve, reject) {
	                xhr.upload.addEventListener('progress', this._onProgress, false);
	                xhr.onreadystatechange = function () {
	                    if (xhr.readyState < 4) {
	                        return;
	                    }
	                    if (xhr.readyState < 400) {
	                        var res = JSON.parse(xhr.responseText);
	                        this.$dispatch('onFileUpload', file, res);
	                        resolve(file);
	                    } else {
	                        var err = JSON.parse(xhr.responseText);
	                        err.status = xhr.status;
	                        err.statusText = xhr.statusText;
	                        this.$dispatch('onFileError', file, err);
	                        reject(err);
	                    }
	                }.bind(this);

	                xhr.onerror = function () {
	                    var err = JSON.parse(xhr.responseText);
	                    err.status = xhr.status;
	                    err.statusText = xhr.statusText;
	                    this.$dispatch('onFileError', file, err);
	                    reject(err);
	                }.bind(this);

	                xhr.open('POST', this.action, true);
	                if (this.headers) {
	                    for (var header in this.headers) {
	                        xhr.setRequestHeader(header, this.headers[header]);
	                    }
	                }
	                xhr.send(form);
	                this.$dispatch('afterFileUpload', file);
	            }.bind(this));
	        },

	        fileUpload: function fileUpload() {
	            if (this.files.length > 0) {
	                var arrayOfPromises = Array.prototype.slice.call(this.files, 0).map(function (file) {
	                    return this._handleUpload(file);
	                }.bind(this));

	                _promise2.default.all(arrayOfPromises).then(function (allFiles) {
	                    this.$dispatch('onAllFilesUploaded', allFiles);
	                }.bind(this)).catch(function (err) {
	                    this.$dispatch('onFileError', this.files, err);
	                }.bind(this));
	            } else {
	                var err = new Error("No files to upload for this field");
	                this.$dispatch('onFileError', this.files, err);
	                console.log('No files to upload for this field');
	            }
	        }
	    }
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(87);
	__webpack_require__(88);
	__webpack_require__(132);
	__webpack_require__(136);
	module.exports = __webpack_require__(96).Promise;

/***/ },
/* 87 */
/***/ function(module, exports) {

	

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(89)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(92)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(90)
	  , defined   = __webpack_require__(91);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 90 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 91 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(93)
	  , $export        = __webpack_require__(94)
	  , redefine       = __webpack_require__(109)
	  , hide           = __webpack_require__(99)
	  , has            = __webpack_require__(110)
	  , Iterators      = __webpack_require__(111)
	  , $iterCreate    = __webpack_require__(112)
	  , setToStringTag = __webpack_require__(128)
	  , getPrototypeOf = __webpack_require__(130)
	  , ITERATOR       = __webpack_require__(129)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 93 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(95)
	  , core      = __webpack_require__(96)
	  , ctx       = __webpack_require__(97)
	  , hide      = __webpack_require__(99)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 95 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 96 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(98);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 98 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(100)
	  , createDesc = __webpack_require__(108);
	module.exports = __webpack_require__(104) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(101)
	  , IE8_DOM_DEFINE = __webpack_require__(103)
	  , toPrimitive    = __webpack_require__(107)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(104) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(102);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 102 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(104) && !__webpack_require__(105)(function(){
	  return Object.defineProperty(__webpack_require__(106)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(105)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 105 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(102)
	  , document = __webpack_require__(95).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(102);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 108 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(99);

/***/ },
/* 110 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 111 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(113)
	  , descriptor     = __webpack_require__(108)
	  , setToStringTag = __webpack_require__(128)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(99)(IteratorPrototype, __webpack_require__(129)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(101)
	  , dPs         = __webpack_require__(114)
	  , enumBugKeys = __webpack_require__(126)
	  , IE_PROTO    = __webpack_require__(123)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(106)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(127).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(100)
	  , anObject = __webpack_require__(101)
	  , getKeys  = __webpack_require__(115);

	module.exports = __webpack_require__(104) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(116)
	  , enumBugKeys = __webpack_require__(126);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(110)
	  , toIObject    = __webpack_require__(117)
	  , arrayIndexOf = __webpack_require__(120)(false)
	  , IE_PROTO     = __webpack_require__(123)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(118)
	  , defined = __webpack_require__(91);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(119);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 119 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(117)
	  , toLength  = __webpack_require__(121)
	  , toIndex   = __webpack_require__(122);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(90)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(90)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(124)('keys')
	  , uid    = __webpack_require__(125);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(95)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 125 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 126 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(95).document && document.documentElement;

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(100).f
	  , has = __webpack_require__(110)
	  , TAG = __webpack_require__(129)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(124)('wks')
	  , uid        = __webpack_require__(125)
	  , Symbol     = __webpack_require__(95).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(110)
	  , toObject    = __webpack_require__(131)
	  , IE_PROTO    = __webpack_require__(123)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(91);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(133);
	var global        = __webpack_require__(95)
	  , hide          = __webpack_require__(99)
	  , Iterators     = __webpack_require__(111)
	  , TO_STRING_TAG = __webpack_require__(129)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(134)
	  , step             = __webpack_require__(135)
	  , Iterators        = __webpack_require__(111)
	  , toIObject        = __webpack_require__(117);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(92)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 134 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 135 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(93)
	  , global             = __webpack_require__(95)
	  , ctx                = __webpack_require__(97)
	  , classof            = __webpack_require__(137)
	  , $export            = __webpack_require__(94)
	  , isObject           = __webpack_require__(102)
	  , aFunction          = __webpack_require__(98)
	  , anInstance         = __webpack_require__(138)
	  , forOf              = __webpack_require__(139)
	  , speciesConstructor = __webpack_require__(143)
	  , task               = __webpack_require__(144).set
	  , microtask          = __webpack_require__(146)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(129)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(147)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(128)($Promise, PROMISE);
	__webpack_require__(148)(PROMISE);
	Wrapper = __webpack_require__(96)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(149)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(119)
	  , TAG = __webpack_require__(129)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 138 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(97)
	  , call        = __webpack_require__(140)
	  , isArrayIter = __webpack_require__(141)
	  , anObject    = __webpack_require__(101)
	  , toLength    = __webpack_require__(121)
	  , getIterFn   = __webpack_require__(142)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(101);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(111)
	  , ITERATOR   = __webpack_require__(129)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(137)
	  , ITERATOR  = __webpack_require__(129)('iterator')
	  , Iterators = __webpack_require__(111);
	module.exports = __webpack_require__(96).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(101)
	  , aFunction = __webpack_require__(98)
	  , SPECIES   = __webpack_require__(129)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(97)
	  , invoke             = __webpack_require__(145)
	  , html               = __webpack_require__(127)
	  , cel                = __webpack_require__(106)
	  , global             = __webpack_require__(95)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(119)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 145 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(95)
	  , macrotask = __webpack_require__(144).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(119)(process) == 'process';

	module.exports = function(){
	  var head, last, notify;

	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };

	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(99);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(95)
	  , core        = __webpack_require__(96)
	  , dP          = __webpack_require__(100)
	  , DESCRIPTORS = __webpack_require__(104)
	  , SPECIES     = __webpack_require__(129)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(129)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 150 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div class=\"{{ class }} vue-upload\">\n    <label :for=\"name\" class=\"file-upload-label\">\n        <span class=\"file-upload-btn btn btn-primary\" v-if=\"changeUpload\">选择上传</span>\n        <input type=\"file\" class=\"form-control\" name=\"{{ name }}\" id=\"{{ id || name }}\" accept=\"{{ accept }}\"\n               @click=\"fileInputClick\"\n               @change=\"fileInputChange\" multiple=\"{{ multiple }}\">\n        <slot></slot>\n    </label>\n    <button type=\"button\" class=\"btn btn-primary\" @click=\"fileUpload\" v-if=\"showBtn\">上传文件</button>\n</div>\n\n";

/***/ },
/* 151 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});
	exports.default = {
	        events: {
	                onFileClick: function onFileClick(files) {},
	                onFileChange: function onFileChange(files) {},
	                onFileProgress: function onFileProgress(e) {},
	                beforeFileUpload: function beforeFileUpload(file) {},
	                onFileUpload: function onFileUpload(file, response) {
	                        if (this.data && response && response.file) {
	                                this.data.image = response.file;
	                        }
	                },
	                afterFileUpload: function afterFileUpload(file) {},
	                onAllFilesUploaded: function onAllFilesUploaded(allFiles) {},
	                onFileError: function onFileError(file, e) {}
	        }
	};

/***/ },
/* 152 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n\n    <bread-crumb :title=\"title\" :paths=\"breadcrumbs\"></bread-crumb>\n\n    <div class=\" wrapper wrapper-content animated fadeInRight\">\n\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n\n                <div class=\"ibox float-e-margins\">\n                    <div class=\"ibox-title\">\n                        <h5>{{title}}</h5>\n\n                        <div class=\"ibox-tools\"></div>\n                    </div>\n                    <div class=\"ibox-content\">\n\n                        <form class=\"form-horizontal\" @submit.prevent=\"createData\">\n\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">邮箱：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"text\" class=\"form-control\" v-model=\"data.email\"\n                                           :disabled=\"data.id\">\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['email']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">密码：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"password\" class=\"form-control\" v-model=\"data.password\">\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['password']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">确认密码：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"password\" class=\"form-control\" v-model=\"data.repeat_password\">\n                                    <label class=\"help-block error\"\n                                           v-if=\"errors\">{{errors['repeat_password']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">姓名：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"text\" class=\"form-control\" v-model=\"data.name\">\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">头像：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <file-upload :params=\"{dir:'uploads'}\"\n                                                 :action=\"'/backend/upload'\"></file-upload>\n                                    <div class=\"m-t-sm\" v-if=\"data.image\">\n                                        <img :src=\"data.image\" width=\"60\">\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <div class=\"col-sm-4 col-sm-offset-2\">\n                                    <button type=\"submit\" class=\"btn btn-primary\">提交\n                                    </button>\n                                    <a v-link=\"{name:'admin_index'}\" class=\"btn btn-white\">取消</a>\n                                </div>\n                            </div>\n                        </form>\n\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n</div>\n";

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(154)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\admin\\edit.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(155)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./edit.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(73);

	var _breadCrumb = __webpack_require__(68);

	var _breadCrumb2 = _interopRequireDefault(_breadCrumb);

	var _fileUpload = __webpack_require__(81);

	var _fileUpload2 = _interopRequireDefault(_fileUpload);

	var _upload = __webpack_require__(151);

	var _upload2 = _interopRequireDefault(_upload);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    ready: function ready() {
	        this.data.id = this.$route.params.id;
	        this.getData();
	    },
	    data: function data() {
	        return {
	            title: '管理员编辑',
	            breadcrumbs: [{
	                name: '首页',
	                url: ''
	            }, {
	                name: '管理员编辑',
	                url: ''
	            }],
	            data: {
	                id: 0,
	                name: '',
	                email: '',
	                image: '',
	                password: '',
	                new_password: ''
	            },
	            errors: null
	        };
	    },
	    mixins: [_upload2.default],
	    components: {
	        'bread-crumb': _breadCrumb2.default,
	        'file-upload': _fileUpload2.default
	    },
	    methods: {
	        getData: function getData() {
	            this.$http.get('admin/' + this.data.id + '/edit').then(function (result) {
	                var data = result.data;
	                if (data.flag == true && data.data) {
	                    this.data = (0, _utils.extend)(this.data, data.data);
	                }
	                this.$toast['success'](data.msg);
	            });
	        },
	        updateData: function updateData() {
	            this.$http.put('admin/' + this.data.id, this.data).then(function (result) {
	                var data = result.data;
	                if (data.flag == true && data.data) {
	                    this.data = (0, _utils.extend)(this.data, data.data);
	                    this.errors = {};
	                }
	                if (data.errors) {
	                    this.errors = data.errors;
	                }
	                this.$toast['success'](data.msg);
	            });
	        }
	    }
	};

/***/ },
/* 155 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n\n    <bread-crumb :title=\"title\" :paths=\"breadcrumbs\"></bread-crumb>\n\n    <div class=\" wrapper wrapper-content animated fadeInRight\">\n\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n\n                <div class=\"ibox float-e-margins\">\n                    <div class=\"ibox-title\">\n                        <h5>{{title}}</h5>\n\n                        <div class=\"ibox-tools\"></div>\n                    </div>\n                    <div class=\"ibox-content\">\n\n                        <form class=\"form-horizontal\" @submit.prevent=\"updateData\">\n\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">邮箱：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"text\" class=\"form-control\" v-model=\"data.email\"\n                                           :disabled=\"data.id\">\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['email']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">旧密码：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"password\" class=\"form-control\" v-model=\"data.password\">\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['password']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">新密码：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"password\" class=\"form-control\" v-model=\"data.new_password\">\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['new_password']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">姓名：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"text\" class=\"form-control\" v-model=\"data.name\">\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">头像：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <file-upload :params=\"{dir:'uploads'}\"\n                                                 :action=\"'/backend/upload'\"></file-upload>\n                                    <div class=\"m-t-sm\" v-if=\"data.image\">\n                                        <img :src=\"data.image\" width=\"60\">\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <div class=\"col-sm-4 col-sm-offset-2\">\n                                    <button type=\"submit\" class=\"btn btn-primary\">提交\n                                    </button>\n                                    <a v-link=\"{name:'admin_index'}\" class=\"btn btn-white\">取消</a>\n                                </div>\n                            </div>\n                        </form>\n\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n</div>\n";

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(157)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\city\\index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(158)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _breadCrumb = __webpack_require__(68);

	var _breadCrumb2 = _interopRequireDefault(_breadCrumb);

	var _dataTable = __webpack_require__(71);

	var _dataTable2 = _interopRequireDefault(_dataTable);

	var _pagination = __webpack_require__(75);

	var _pagination2 = _interopRequireDefault(_pagination);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    ready: function ready() {
	        this.getData();
	    },
	    data: function data() {
	        return {
	            title: '城市列表',
	            breadcrumbs: [{
	                name: '首页',
	                url: ''
	            }, {
	                name: '城市列表',
	                url: ''
	            }],
	            page: 1,
	            pageSize: 15,
	            count: 0,
	            data: [],
	            columns: {
	                id: '#',
	                name: '名称',
	                city: ['上级城市', 'name'],
	                created_at: '创建时间'
	            }

	        };
	    },
	    components: {
	        'bread-crumb': _breadCrumb2.default,
	        'data-table': _dataTable2.default,
	        'pagination': _pagination2.default
	    },
	    methods: {
	        getData: function getData() {
	            this.$http.get('city', {
	                page: this.page,
	                page_size: this.pageSize
	            }).then(function (result) {
	                var data = result.data;
	                this.data = data.data;
	                this.count = data.count;
	            });
	        }
	    },
	    events: {
	        onEdit: function onEdit(id) {
	            this.$route.router.go({ name: 'city_edit', params: { id: id } });
	        },
	        onDelete: function onDelete(id) {
	            this.$http.delete('city/' + id).then(function (result) {
	                var data = result.data;
	                if (data.flag == true) {
	                    this.getData();
	                }
	                this.$toast['success'](data.msg);
	            });
	        },
	        onChangePage: function onChangePage(page) {
	            this.page = page;
	            this.getData();
	        }
	    }
	};

/***/ },
/* 158 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n\n    <bread-crumb :title=\"title\" :paths=\"breadcrumbs\"></bread-crumb>\n\n    <div class=\" wrapper wrapper-content animated fadeInRight\">\n\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n\n                <div class=\"ibox float-e-margins\">\n                    <div class=\"ibox-title\">\n                        <h5>{{title}}</h5>\n\n                        <div class=\"ibox-tools\"></div>\n                    </div>\n                    <div class=\"ibox-content\">\n\n                        <data-table :data=\"data\" :columns=\"columns\"></data-table>\n\n                        <div class=\"row\">\n                            <div class=\"col-lg-12\">\n                                <div class=\"pull-right\">\n                                    <pagination :count=\"count\" :page=\"page\" :page-size=\"pageSize\"></pagination>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n</div>\n";

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(160)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\city\\create.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(161)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./create.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _breadCrumb = __webpack_require__(68);

	var _breadCrumb2 = _interopRequireDefault(_breadCrumb);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    ready: function ready() {
	        this.$http.get('city/create').then(function (result) {
	            var data = result.data;
	            if (data.flag == true && data.data) {
	                this.categories = data.data;
	            }
	        });
	    },
	    data: function data() {
	        return {
	            title: '城市创建',
	            breadcrumbs: [{
	                name: '首页',
	                url: ''
	            }, {
	                name: '城市创建',
	                url: ''
	            }],
	            categories: [],
	            data: {
	                name: '',
	                parent_id: 0
	            },
	            errors: null
	        };
	    },
	    components: {
	        'bread-crumb': _breadCrumb2.default
	    },
	    methods: {
	        createData: function createData() {
	            this.$http.post('city', this.data).then(function (result) {
	                var data = result.data;
	                if (data.flag == true) {
	                    this.$route.router.go('/main/city/index');
	                }
	                if (data.errors) {
	                    this.errors = data.errors;
	                }
	                this.$toast['success'](data.msg);
	            });
	        }
	    }
	};

/***/ },
/* 161 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n\n    <bread-crumb :title=\"title\" :paths=\"breadcrumbs\"></bread-crumb>\n\n    <div class=\" wrapper wrapper-content animated fadeInRight\">\n\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n\n                <div class=\"ibox float-e-margins\">\n                    <div class=\"ibox-title\">\n                        <h5>{{title}}</h5>\n\n                        <div class=\"ibox-tools\"></div>\n                    </div>\n                    <div class=\"ibox-content\">\n\n                        <form class=\"form-horizontal\" @submit.prevent=\"createData\">\n\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">城市名称：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"text\" class=\"form-control\" v-model=\"data.name\">\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['name']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">父级城市：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <select class=\"form-control\" v-model=\"data.parent_id\">\n                                        <option value=\"0\">请选择</option>\n                                        <option v-for=\"city in categories\" :value=\"city.id\">\n                                            {{city.name}}\n                                        </option>\n                                    </select>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <div class=\"col-sm-4 col-sm-offset-2\">\n                                    <button type=\"submit\" class=\"btn btn-primary\">提交\n                                    </button>\n                                    <a v-link=\"{name:'city_index'}\" class=\"btn btn-white\">取消</a>\n                                </div>\n                            </div>\n                        </form>\n\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n</div>\n";

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(163)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\city\\edit.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(164)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./edit.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _breadCrumb = __webpack_require__(68);

	var _breadCrumb2 = _interopRequireDefault(_breadCrumb);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    ready: function ready() {
	        this.data.id = this.$route.params.id;
	        this.$http.get('city/' + this.data.id + '/edit').then(function (result) {
	            var data = result.data;
	            if (data.flag == true && data.data) {
	                this.data = data.data;
	                this.categories = data.categories;
	            }
	            this.$toast['success'](data.msg);
	        });
	    },
	    data: function data() {
	        return {
	            title: '城市修改',
	            breadcrumbs: [{
	                name: '首页',
	                url: ''
	            }, {
	                name: '城市修改',
	                url: ''
	            }],
	            categories: [],
	            data: {
	                id: 0,
	                name: '',
	                parent_id: 0
	            },
	            errors: null
	        };
	    },
	    components: {
	        'bread-crumb': _breadCrumb2.default
	    },
	    methods: {
	        updateData: function updateData() {
	            this.$http.put('city/' + this.data.id, this.data).then(function (result) {
	                var data = result.data;
	                if (data.flag == true) {
	                    this.$route.router.go('/main/city/index');
	                }
	                if (data.errors) {
	                    this.errors = data.errors;
	                }
	                this.$toast['success'](data.msg);
	            });
	        }
	    }
	};

/***/ },
/* 164 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n\n    <bread-crumb :title=\"title\" :paths=\"breadcrumbs\"></bread-crumb>\n\n    <div class=\" wrapper wrapper-content animated fadeInRight\">\n\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n\n                <div class=\"ibox float-e-margins\">\n                    <div class=\"ibox-title\">\n                        <h5>{{title}}</h5>\n\n                        <div class=\"ibox-tools\"></div>\n                    </div>\n                    <div class=\"ibox-content\">\n\n                        <form class=\"form-horizontal\" @submit.prevent=\"updateData\">\n\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">城市名称：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"text\" class=\"form-control\" v-model=\"data.name\">\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['name']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">父级城市：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <select class=\"form-control\" v-model=\"data.parent_id\">\n                                        <option value=\"0\">请选择</option>\n                                        <option v-for=\"city in categories\" :value=\"city.id\">\n                                            {{city.name}}\n                                        </option>\n                                    </select>\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['parent_id']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <div class=\"col-sm-4 col-sm-offset-2\">\n                                    <button type=\"submit\" class=\"btn btn-primary\">提交\n                                    </button>\n                                    <a v-link=\"{name:'city_index'}\" class=\"btn btn-white\">取消</a>\n                                </div>\n                            </div>\n                        </form>\n\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n</div>\n";

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(166)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\post\\index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(167)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _breadCrumb = __webpack_require__(68);

	var _breadCrumb2 = _interopRequireDefault(_breadCrumb);

	var _dataTable = __webpack_require__(71);

	var _dataTable2 = _interopRequireDefault(_dataTable);

	var _pagination = __webpack_require__(75);

	var _pagination2 = _interopRequireDefault(_pagination);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    ready: function ready() {
	        this.getData();
	    },
	    data: function data() {
	        return {
	            title: '小区列表',
	            breadcrumbs: [{
	                name: '首页',
	                url: ''
	            }, {
	                name: '小区列表',
	                url: ''
	            }],
	            page: 1,
	            pageSize: 15,
	            count: 0,
	            data: [],
	            columns: {
	                id: '#',
	                title: '标题',
	                city: ['所属城市', 'name'],
	                created_at: '创建时间'
	            }

	        };
	    },
	    components: {
	        'bread-crumb': _breadCrumb2.default,
	        'data-table': _dataTable2.default,
	        'pagination': _pagination2.default
	    },
	    methods: {
	        getData: function getData() {
	            this.$http.get('post', {
	                page: this.page,
	                page_size: this.pageSize
	            }).then(function (result) {
	                var data = result.data;
	                this.data = data.data;
	                this.count = data.count;
	            });
	        }
	    },
	    events: {
	        onEdit: function onEdit(id) {
	            this.$route.router.go({ name: 'post_edit', params: { id: id } });
	        },
	        onDelete: function onDelete(id) {
	            this.$http.delete('post/' + id).then(function (result) {
	                var data = result.data;
	                if (data.flag == true) {
	                    this.getData();
	                }
	                this.$toast['success'](data.msg);
	            });
	        },
	        onChangePage: function onChangePage(page) {
	            this.page = page;
	            this.getData();
	        },
	        onSearch: function onSearch(text) {
	            console.log(text);
	        }
	    }
	};

/***/ },
/* 167 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n\n    <bread-crumb :title=\"title\" :paths=\"breadcrumbs\"></bread-crumb>\n\n    <div class=\" wrapper wrapper-content animated fadeInRight\">\n\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n\n                <div class=\"ibox float-e-margins\">\n                    <div class=\"ibox-title\">\n                        <h5>{{title}}</h5>\n\n                        <div class=\"ibox-tools\"></div>\n                    </div>\n                    <div class=\"ibox-content\">\n\n                        <data-table :data=\"data\" :columns=\"columns\"></data-table>\n\n                        <div class=\"row\">\n                            <div class=\"col-lg-12\">\n                                <div class=\"pull-right\">\n                                    <pagination :count=\"count\" :page=\"page\" :page-size=\"pageSize\"></pagination>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n</div>\n";

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(169)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\post\\create.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(182)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./create.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _breadCrumb = __webpack_require__(68);

	var _breadCrumb2 = _interopRequireDefault(_breadCrumb);

	var _editor = __webpack_require__(170);

	var _editor2 = _interopRequireDefault(_editor);

	__webpack_require__(179);

	__webpack_require__(181);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    ready: function ready() {
	        var vm = this;
	        this.$http.get('post/create').then(function (result) {
	            var data = result.data;
	            if (data.flag == true) {
	                this.categories = data.categories;
	                this.tags = data.tags;
	            }
	        });
	    },
	    data: function data() {
	        return {
	            title: '小区创建',
	            breadcrumbs: [{
	                name: '首页',
	                url: ''
	            }, {
	                name: '小区创建',
	                url: ''
	            }],
	            categories: [],
	            status: [{
	                id: 1,
	                name: "洽谈中"
	            }, {
	                id: 2,
	                name: "有店"
	            }, {
	                id: 3,
	                name: "专柜"
	            }, {
	                id: 4,
	                name: "自有冰箱"
	            }, {
	                id: 0,
	                name: "拒绝合作"
	            }],
	            tags: [],
	            data: {
	                title: '',
	                city_id: 0,
	                status: 0,
	                tagIds: [],
	                description: '',
	                content: ''
	            },
	            errors: null
	        };
	    },
	    components: {
	        'bread-crumb': _breadCrumb2.default,
	        'editor': _editor2.default
	    },
	    methods: {
	        createData: function createData() {
	            this.$http.post('post', this.data).then(function (result) {
	                var data = result.data;
	                if (data.flag == true) {
	                    this.$route.router.go('/main/post/index');
	                }
	                if (data.errors) {
	                    this.errors = data.errors;
	                }
	                this.$toast['success'](data.msg);
	            });
	        }
	    }
	};

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(171)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\components\\editor.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(178)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./editor.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	__webpack_require__(172);

	__webpack_require__(174);

	__webpack_require__(176);

	exports.default = {
	    replace: true,
	    inherit: false,
	    props: {
	        model: {
	            required: true,
	            twoWay: true
	        },
	        language: {
	            type: String,
	            required: false,
	            default: "en-US"
	        },
	        height: {
	            type: Number,
	            required: false,
	            default: 300
	        },
	        minHeight: {
	            type: Number,
	            required: false,
	            default: 200
	        },
	        maxHeight: {
	            type: Number,
	            required: false,
	            default: 800
	        },
	        toolbar: {
	            type: Array,
	            required: false,
	            default: function _default() {
	                return [["font", ["bold", "italic", "underline", "clear"]], ["fontsize", ["fontsize"]], ["para", ["ul", "ol", "paragraph"]], ["color", ["color"]], ["insert", ["link", "picture", "hr"]]];
	            }
	        }
	    },
	    beforeCompile: function beforeCompile() {
	        this.isChanging = false;
	        this.control = null;
	    },
	    ready: function ready() {
	        if (this.minHeight > this.height) {
	            this.minHeight = this.height;
	        }
	        if (this.maxHeight < this.height) {
	            this.maxHeight = this.height;
	        }
	        var me = this;
	        this.control = $(this.$el);
	        this.control.summernote({
	            lang: this.language,
	            height: this.height,
	            minHeight: this.minHeight,
	            maxHeight: this.maxHeight,
	            toolbar: this.toolbar,
	            onInit: function onInit() {
	                me.control.code(me.model);
	            }
	        }).on("summernote.change", function () {
	            if (!me.isChanging) {
	                me.isChanging = true;
	                var code = me.control.code();
	                me.model = code === null || code.length === 0 ? null : code;
	                me.$nextTick(function () {
	                    me.isChanging = false;
	                });
	            }
	        });
	    },
	    watch: {
	        model: function model(val, oldVal) {
	            if (!this.isChanging) {
	                this.isChanging = true;
	                var code = val === null ? "" : val;
	                this.control.code(code).trigger("summernote.change");
	                this.isChanging = false;
	            }
	        }
	    }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';/**
	 * Super simple wysiwyg editor on Bootstrap v0.6.16
	 * http://summernote.org/
	 *
	 * summernote.js
	 * Copyright 2013-2015 Alan Hong. and other contributors
	 * summernote may be freely distributed under the MIT license./
	 *
	 * Date: 2015-08-03T16:41Z
	 */(function(factory){/* global define */if(true){// AMD. Register as an anonymous module.
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));}else{// Browser globals: jQuery
	factory(window.jQuery);}})(function($){if(!Array.prototype.reduce){/**
	         * Array.prototype.reduce polyfill
	         *
	         * @param {Function} callback
	         * @param {Value} [initialValue]
	         * @return {Value}
	         *
	         * @see http://goo.gl/WNriQD
	         */Array.prototype.reduce=function(callback){var t=Object(this),len=t.length>>>0,k=0,value;if(arguments.length===2){value=arguments[1];}else{while(k<len&&!(k in t)){k++;}if(k>=len){throw new TypeError('Reduce of empty array with no initial value');}value=t[k++];}for(;k<len;k++){if(k in t){value=callback(value,t[k],k,t);}}return value;};}if('function'!==typeof Array.prototype.filter){/**
	         * Array.prototype.filter polyfill
	         *
	         * @param {Function} func
	         * @return {Array}
	         *
	         * @see http://goo.gl/T1KFnq
	         */Array.prototype.filter=function(func){var t=Object(this),len=t.length>>>0;var res=[];var thisArg=arguments.length>=2?arguments[1]:void 0;for(var i=0;i<len;i++){if(i in t){var val=t[i];if(func.call(thisArg,val,i,t)){res.push(val);}}}return res;};}if(!Array.prototype.map){/**
	         * Array.prototype.map polyfill
	         *
	         * @param {Function} callback
	         * @return {Array}
	         *
	         * @see https://goo.gl/SMWaMK
	         */Array.prototype.map=function(callback,thisArg){var T,A,k;if(this===null){throw new TypeError(' this is null or not defined');}var O=Object(this);var len=O.length>>>0;if(typeof callback!=='function'){throw new TypeError(callback+' is not a function');}if(arguments.length>1){T=thisArg;}A=new Array(len);k=0;while(k<len){var kValue,mappedValue;if(k in O){kValue=O[k];mappedValue=callback.call(T,kValue,k,O);A[k]=mappedValue;}k++;}return A;};}var isSupportAmd="function"==='function'&&__webpack_require__(173);/**
	     * returns whether font is installed or not.
	     *
	     * @param {String} fontName
	     * @return {Boolean}
	     */var isFontInstalled=function isFontInstalled(fontName){var testFontName=fontName==='Comic Sans MS'?'Courier New':'Comic Sans MS';var $tester=$('<div>').css({position:'absolute',left:'-9999px',top:'-9999px',fontSize:'200px'}).text('mmmmmmmmmwwwwwww').appendTo(document.body);var originalWidth=$tester.css('fontFamily',testFontName).width();var width=$tester.css('fontFamily',fontName+','+testFontName).width();$tester.remove();return originalWidth!==width;};var userAgent=navigator.userAgent;var isMSIE=/MSIE|Trident/i.test(userAgent);var browserVersion;if(isMSIE){var matches=/MSIE (\d+[.]\d+)/.exec(userAgent);if(matches){browserVersion=parseFloat(matches[1]);}matches=/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(userAgent);if(matches){browserVersion=parseFloat(matches[1]);}}/**
	     * @class core.agent
	     *
	     * Object which check platform and agent
	     *
	     * @singleton
	     * @alternateClassName agent
	     */var agent={/** @property {Boolean} [isMac=false] true if this agent is Mac  */isMac:navigator.appVersion.indexOf('Mac')>-1,/** @property {Boolean} [isMSIE=false] true if this agent is a Internet Explorer  */isMSIE:isMSIE,/** @property {Boolean} [isFF=false] true if this agent is a Firefox  */isFF:/firefox/i.test(userAgent),isWebkit:/webkit/i.test(userAgent),/** @property {Boolean} [isSafari=false] true if this agent is a Safari  */isSafari:/safari/i.test(userAgent),/** @property {Float} browserVersion current browser version  */browserVersion:browserVersion,/** @property {String} jqueryVersion current jQuery version string  */jqueryVersion:parseFloat($.fn.jquery),isSupportAmd:isSupportAmd,hasCodeMirror:!!window.CodeMirror,isFontInstalled:isFontInstalled,isW3CRangeSupport:!!document.createRange};/**
	     * @class core.func
	     *
	     * func utils (for high-order func's arg)
	     *
	     * @singleton
	     * @alternateClassName func
	     */var func=function(){var eq=function eq(itemA){return function(itemB){return itemA===itemB;};};var eq2=function eq2(itemA,itemB){return itemA===itemB;};var peq2=function peq2(propName){return function(itemA,itemB){return itemA[propName]===itemB[propName];};};var ok=function ok(){return true;};var fail=function fail(){return false;};var not=function not(f){return function(){return!f.apply(f,arguments);};};var and=function and(fA,fB){return function(item){return fA(item)&&fB(item);};};var self=function self(a){return a;};var idCounter=0;/**
	         * generate a globally-unique id
	         *
	         * @param {String} [prefix]
	         */var uniqueId=function uniqueId(prefix){var id=++idCounter+'';return prefix?prefix+id:id;};/**
	         * returns bnd (bounds) from rect
	         *
	         * - IE Compatability Issue: http://goo.gl/sRLOAo
	         * - Scroll Issue: http://goo.gl/sNjUc
	         *
	         * @param {Rect} rect
	         * @return {Object} bounds
	         * @return {Number} bounds.top
	         * @return {Number} bounds.left
	         * @return {Number} bounds.width
	         * @return {Number} bounds.height
	         */var rect2bnd=function rect2bnd(rect){var $document=$(document);return{top:rect.top+$document.scrollTop(),left:rect.left+$document.scrollLeft(),width:rect.right-rect.left,height:rect.bottom-rect.top};};/**
	         * returns a copy of the object where the keys have become the values and the values the keys.
	         * @param {Object} obj
	         * @return {Object}
	         */var invertObject=function invertObject(obj){var inverted={};for(var key in obj){if(obj.hasOwnProperty(key)){inverted[obj[key]]=key;}}return inverted;};/**
	         * @param {String} namespace
	         * @param {String} [prefix]
	         * @return {String}
	         */var namespaceToCamel=function namespaceToCamel(namespace,prefix){prefix=prefix||'';return prefix+namespace.split('.').map(function(name){return name.substring(0,1).toUpperCase()+name.substring(1);}).join('');};return{eq:eq,eq2:eq2,peq2:peq2,ok:ok,fail:fail,self:self,not:not,and:and,uniqueId:uniqueId,rect2bnd:rect2bnd,invertObject:invertObject,namespaceToCamel:namespaceToCamel};}();/**
	     * @class core.list
	     *
	     * list utils
	     *
	     * @singleton
	     * @alternateClassName list
	     */var list=function(){/**
	         * returns the first item of an array.
	         *
	         * @param {Array} array
	         */var head=function head(array){return array[0];};/**
	         * returns the last item of an array.
	         *
	         * @param {Array} array
	         */var last=function last(array){return array[array.length-1];};/**
	         * returns everything but the last entry of the array.
	         *
	         * @param {Array} array
	         */var initial=function initial(array){return array.slice(0,array.length-1);};/**
	         * returns the rest of the items in an array.
	         *
	         * @param {Array} array
	         */var tail=function tail(array){return array.slice(1);};/**
	         * returns item of array
	         */var find=function find(array,pred){for(var idx=0,len=array.length;idx<len;idx++){var item=array[idx];if(pred(item)){return item;}}};/**
	         * returns true if all of the values in the array pass the predicate truth test.
	         */var all=function all(array,pred){for(var idx=0,len=array.length;idx<len;idx++){if(!pred(array[idx])){return false;}}return true;};/**
	         * returns index of item
	         */var indexOf=function indexOf(array,item){return $.inArray(item,array);};/**
	         * returns true if the value is present in the list.
	         */var contains=function contains(array,item){return indexOf(array,item)!==-1;};/**
	         * get sum from a list
	         *
	         * @param {Array} array - array
	         * @param {Function} fn - iterator
	         */var sum=function sum(array,fn){fn=fn||func.self;return array.reduce(function(memo,v){return memo+fn(v);},0);};/**
	         * returns a copy of the collection with array type.
	         * @param {Collection} collection - collection eg) node.childNodes, ...
	         */var from=function from(collection){var result=[],idx=-1,length=collection.length;while(++idx<length){result[idx]=collection[idx];}return result;};/**
	         * cluster elements by predicate function.
	         *
	         * @param {Array} array - array
	         * @param {Function} fn - predicate function for cluster rule
	         * @param {Array[]}
	         */var clusterBy=function clusterBy(array,fn){if(!array.length){return[];}var aTail=tail(array);return aTail.reduce(function(memo,v){var aLast=last(memo);if(fn(last(aLast),v)){aLast[aLast.length]=v;}else{memo[memo.length]=[v];}return memo;},[[head(array)]]);};/**
	         * returns a copy of the array with all falsy values removed
	         *
	         * @param {Array} array - array
	         * @param {Function} fn - predicate function for cluster rule
	         */var compact=function compact(array){var aResult=[];for(var idx=0,len=array.length;idx<len;idx++){if(array[idx]){aResult.push(array[idx]);}}return aResult;};/**
	         * produces a duplicate-free version of the array
	         *
	         * @param {Array} array
	         */var unique=function unique(array){var results=[];for(var idx=0,len=array.length;idx<len;idx++){if(!contains(results,array[idx])){results.push(array[idx]);}}return results;};/**
	         * returns next item.
	         * @param {Array} array
	         */var next=function next(array,item){var idx=indexOf(array,item);if(idx===-1){return null;}return array[idx+1];};/**
	         * returns prev item.
	         * @param {Array} array
	         */var prev=function prev(array,item){var idx=indexOf(array,item);if(idx===-1){return null;}return array[idx-1];};return{head:head,last:last,initial:initial,tail:tail,prev:prev,next:next,find:find,contains:contains,all:all,sum:sum,from:from,clusterBy:clusterBy,compact:compact,unique:unique};}();var NBSP_CHAR=String.fromCharCode(160);var ZERO_WIDTH_NBSP_CHAR='﻿';/**
	     * @class core.dom
	     *
	     * Dom functions
	     *
	     * @singleton
	     * @alternateClassName dom
	     */var dom=function(){/**
	         * @method isEditable
	         *
	         * returns whether node is `note-editable` or not.
	         *
	         * @param {Node} node
	         * @return {Boolean}
	         */var isEditable=function isEditable(node){return node&&$(node).hasClass('note-editable');};/**
	         * @method isControlSizing
	         *
	         * returns whether node is `note-control-sizing` or not.
	         *
	         * @param {Node} node
	         * @return {Boolean}
	         */var isControlSizing=function isControlSizing(node){return node&&$(node).hasClass('note-control-sizing');};/**
	         * @method  buildLayoutInfo
	         *
	         * build layoutInfo from $editor(.note-editor)
	         *
	         * @param {jQuery} $editor
	         * @return {Object}
	         * @return {Function} return.editor
	         * @return {Node} return.dropzone
	         * @return {Node} return.toolbar
	         * @return {Node} return.editable
	         * @return {Node} return.codable
	         * @return {Node} return.popover
	         * @return {Node} return.handle
	         * @return {Node} return.dialog
	         */var buildLayoutInfo=function buildLayoutInfo($editor){var makeFinder;// air mode
	if($editor.hasClass('note-air-editor')){var id=list.last($editor.attr('id').split('-'));makeFinder=function makeFinder(sIdPrefix){return function(){return $(sIdPrefix+id);};};return{editor:function editor(){return $editor;},holder:function holder(){return $editor.data('holder');},editable:function editable(){return $editor;},popover:makeFinder('#note-popover-'),handle:makeFinder('#note-handle-'),dialog:makeFinder('#note-dialog-')};// frame mode
	}else{makeFinder=function makeFinder(className,$base){$base=$base||$editor;return function(){return $base.find(className);};};var options=$editor.data('options');var $dialogHolder=options&&options.dialogsInBody?$(document.body):null;return{editor:function editor(){return $editor;},holder:function holder(){return $editor.data('holder');},dropzone:makeFinder('.note-dropzone'),toolbar:makeFinder('.note-toolbar'),editable:makeFinder('.note-editable'),codable:makeFinder('.note-codable'),statusbar:makeFinder('.note-statusbar'),popover:makeFinder('.note-popover'),handle:makeFinder('.note-handle'),dialog:makeFinder('.note-dialog',$dialogHolder)};}};/**
	         * returns makeLayoutInfo from editor's descendant node.
	         *
	         * @private
	         * @param {Node} descendant
	         * @return {Object}
	         */var makeLayoutInfo=function makeLayoutInfo(descendant){var $target=$(descendant).closest('.note-editor, .note-air-editor, .note-air-layout');if(!$target.length){return null;}var $editor;if($target.is('.note-editor, .note-air-editor')){$editor=$target;}else{$editor=$('#note-editor-'+list.last($target.attr('id').split('-')));}return buildLayoutInfo($editor);};/**
	         * @method makePredByNodeName
	         *
	         * returns predicate which judge whether nodeName is same
	         *
	         * @param {String} nodeName
	         * @return {Function}
	         */var makePredByNodeName=function makePredByNodeName(nodeName){nodeName=nodeName.toUpperCase();return function(node){return node&&node.nodeName.toUpperCase()===nodeName;};};/**
	         * @method isText
	         *
	         *
	         *
	         * @param {Node} node
	         * @return {Boolean} true if node's type is text(3)
	         */var isText=function isText(node){return node&&node.nodeType===3;};/**
	         * ex) br, col, embed, hr, img, input, ...
	         * @see http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
	         */var isVoid=function isVoid(node){return node&&/^BR|^IMG|^HR|^IFRAME|^BUTTON/.test(node.nodeName.toUpperCase());};var isPara=function isPara(node){if(isEditable(node)){return false;}// Chrome(v31.0), FF(v25.0.1) use DIV for paragraph
	return node&&/^DIV|^P|^LI|^H[1-7]/.test(node.nodeName.toUpperCase());};var isLi=makePredByNodeName('LI');var isPurePara=function isPurePara(node){return isPara(node)&&!isLi(node);};var isTable=makePredByNodeName('TABLE');var isInline=function isInline(node){return!isBodyContainer(node)&&!isList(node)&&!isHr(node)&&!isPara(node)&&!isTable(node)&&!isBlockquote(node);};var isList=function isList(node){return node&&/^UL|^OL/.test(node.nodeName.toUpperCase());};var isHr=makePredByNodeName('HR');var isCell=function isCell(node){return node&&/^TD|^TH/.test(node.nodeName.toUpperCase());};var isBlockquote=makePredByNodeName('BLOCKQUOTE');var isBodyContainer=function isBodyContainer(node){return isCell(node)||isBlockquote(node)||isEditable(node);};var isAnchor=makePredByNodeName('A');var isParaInline=function isParaInline(node){return isInline(node)&&!!ancestor(node,isPara);};var isBodyInline=function isBodyInline(node){return isInline(node)&&!ancestor(node,isPara);};var isBody=makePredByNodeName('BODY');/**
	         * returns whether nodeB is closest sibling of nodeA
	         *
	         * @param {Node} nodeA
	         * @param {Node} nodeB
	         * @return {Boolean}
	         */var isClosestSibling=function isClosestSibling(nodeA,nodeB){return nodeA.nextSibling===nodeB||nodeA.previousSibling===nodeB;};/**
	         * returns array of closest siblings with node
	         *
	         * @param {Node} node
	         * @param {function} [pred] - predicate function
	         * @return {Node[]}
	         */var withClosestSiblings=function withClosestSiblings(node,pred){pred=pred||func.ok;var siblings=[];if(node.previousSibling&&pred(node.previousSibling)){siblings.push(node.previousSibling);}siblings.push(node);if(node.nextSibling&&pred(node.nextSibling)){siblings.push(node.nextSibling);}return siblings;};/**
	         * blank HTML for cursor position
	         * - [workaround] old IE only works with &nbsp;
	         * - [workaround] IE11 and other browser works with bogus br
	         */var blankHTML=agent.isMSIE&&agent.browserVersion<11?'&nbsp;':'<br>';/**
	         * @method nodeLength
	         *
	         * returns #text's text size or element's childNodes size
	         *
	         * @param {Node} node
	         */var nodeLength=function nodeLength(node){if(isText(node)){return node.nodeValue.length;}return node.childNodes.length;};/**
	         * returns whether node is empty or not.
	         *
	         * @param {Node} node
	         * @return {Boolean}
	         */var isEmpty=function isEmpty(node){var len=nodeLength(node);if(len===0){return true;}else if(!isText(node)&&len===1&&node.innerHTML===blankHTML){// ex) <p><br></p>, <span><br></span>
	return true;}else if(list.all(node.childNodes,isText)&&node.innerHTML===''){// ex) <p></p>, <span></span>
	return true;}return false;};/**
	         * padding blankHTML if node is empty (for cursor position)
	         */var paddingBlankHTML=function paddingBlankHTML(node){if(!isVoid(node)&&!nodeLength(node)){node.innerHTML=blankHTML;}};/**
	         * find nearest ancestor predicate hit
	         *
	         * @param {Node} node
	         * @param {Function} pred - predicate function
	         */var ancestor=function ancestor(node,pred){while(node){if(pred(node)){return node;}if(isEditable(node)){break;}node=node.parentNode;}return null;};/**
	         * find nearest ancestor only single child blood line and predicate hit
	         *
	         * @param {Node} node
	         * @param {Function} pred - predicate function
	         */var singleChildAncestor=function singleChildAncestor(node,pred){node=node.parentNode;while(node){if(nodeLength(node)!==1){break;}if(pred(node)){return node;}if(isEditable(node)){break;}node=node.parentNode;}return null;};/**
	         * returns new array of ancestor nodes (until predicate hit).
	         *
	         * @param {Node} node
	         * @param {Function} [optional] pred - predicate function
	         */var listAncestor=function listAncestor(node,pred){pred=pred||func.fail;var ancestors=[];ancestor(node,function(el){if(!isEditable(el)){ancestors.push(el);}return pred(el);});return ancestors;};/**
	         * find farthest ancestor predicate hit
	         */var lastAncestor=function lastAncestor(node,pred){var ancestors=listAncestor(node);return list.last(ancestors.filter(pred));};/**
	         * returns common ancestor node between two nodes.
	         *
	         * @param {Node} nodeA
	         * @param {Node} nodeB
	         */var commonAncestor=function commonAncestor(nodeA,nodeB){var ancestors=listAncestor(nodeA);for(var n=nodeB;n;n=n.parentNode){if($.inArray(n,ancestors)>-1){return n;}}return null;// difference document area
	};/**
	         * listing all previous siblings (until predicate hit).
	         *
	         * @param {Node} node
	         * @param {Function} [optional] pred - predicate function
	         */var listPrev=function listPrev(node,pred){pred=pred||func.fail;var nodes=[];while(node){if(pred(node)){break;}nodes.push(node);node=node.previousSibling;}return nodes;};/**
	         * listing next siblings (until predicate hit).
	         *
	         * @param {Node} node
	         * @param {Function} [pred] - predicate function
	         */var listNext=function listNext(node,pred){pred=pred||func.fail;var nodes=[];while(node){if(pred(node)){break;}nodes.push(node);node=node.nextSibling;}return nodes;};/**
	         * listing descendant nodes
	         *
	         * @param {Node} node
	         * @param {Function} [pred] - predicate function
	         */var listDescendant=function listDescendant(node,pred){var descendents=[];pred=pred||func.ok;// start DFS(depth first search) with node
	(function fnWalk(current){if(node!==current&&pred(current)){descendents.push(current);}for(var idx=0,len=current.childNodes.length;idx<len;idx++){fnWalk(current.childNodes[idx]);}})(node);return descendents;};/**
	         * wrap node with new tag.
	         *
	         * @param {Node} node
	         * @param {Node} tagName of wrapper
	         * @return {Node} - wrapper
	         */var wrap=function wrap(node,wrapperName){var parent=node.parentNode;var wrapper=$('<'+wrapperName+'>')[0];parent.insertBefore(wrapper,node);wrapper.appendChild(node);return wrapper;};/**
	         * insert node after preceding
	         *
	         * @param {Node} node
	         * @param {Node} preceding - predicate function
	         */var insertAfter=function insertAfter(node,preceding){var next=preceding.nextSibling,parent=preceding.parentNode;if(next){parent.insertBefore(node,next);}else{parent.appendChild(node);}return node;};/**
	         * append elements.
	         *
	         * @param {Node} node
	         * @param {Collection} aChild
	         */var appendChildNodes=function appendChildNodes(node,aChild){$.each(aChild,function(idx,child){node.appendChild(child);});return node;};/**
	         * returns whether boundaryPoint is left edge or not.
	         *
	         * @param {BoundaryPoint} point
	         * @return {Boolean}
	         */var isLeftEdgePoint=function isLeftEdgePoint(point){return point.offset===0;};/**
	         * returns whether boundaryPoint is right edge or not.
	         *
	         * @param {BoundaryPoint} point
	         * @return {Boolean}
	         */var isRightEdgePoint=function isRightEdgePoint(point){return point.offset===nodeLength(point.node);};/**
	         * returns whether boundaryPoint is edge or not.
	         *
	         * @param {BoundaryPoint} point
	         * @return {Boolean}
	         */var isEdgePoint=function isEdgePoint(point){return isLeftEdgePoint(point)||isRightEdgePoint(point);};/**
	         * returns wheter node is left edge of ancestor or not.
	         *
	         * @param {Node} node
	         * @param {Node} ancestor
	         * @return {Boolean}
	         */var isLeftEdgeOf=function isLeftEdgeOf(node,ancestor){while(node&&node!==ancestor){if(position(node)!==0){return false;}node=node.parentNode;}return true;};/**
	         * returns whether node is right edge of ancestor or not.
	         *
	         * @param {Node} node
	         * @param {Node} ancestor
	         * @return {Boolean}
	         */var isRightEdgeOf=function isRightEdgeOf(node,ancestor){while(node&&node!==ancestor){if(position(node)!==nodeLength(node.parentNode)-1){return false;}node=node.parentNode;}return true;};/**
	         * returns whether point is left edge of ancestor or not.
	         * @param {BoundaryPoint} point
	         * @param {Node} ancestor
	         * @return {Boolean}
	         */var isLeftEdgePointOf=function isLeftEdgePointOf(point,ancestor){return isLeftEdgePoint(point)&&isLeftEdgeOf(point.node,ancestor);};/**
	         * returns whether point is right edge of ancestor or not.
	         * @param {BoundaryPoint} point
	         * @param {Node} ancestor
	         * @return {Boolean}
	         */var isRightEdgePointOf=function isRightEdgePointOf(point,ancestor){return isRightEdgePoint(point)&&isRightEdgeOf(point.node,ancestor);};/**
	         * returns offset from parent.
	         *
	         * @param {Node} node
	         */var position=function position(node){var offset=0;while(node=node.previousSibling){offset+=1;}return offset;};var hasChildren=function hasChildren(node){return!!(node&&node.childNodes&&node.childNodes.length);};/**
	         * returns previous boundaryPoint
	         *
	         * @param {BoundaryPoint} point
	         * @param {Boolean} isSkipInnerOffset
	         * @return {BoundaryPoint}
	         */var prevPoint=function prevPoint(point,isSkipInnerOffset){var node,offset;if(point.offset===0){if(isEditable(point.node)){return null;}node=point.node.parentNode;offset=position(point.node);}else if(hasChildren(point.node)){node=point.node.childNodes[point.offset-1];offset=nodeLength(node);}else{node=point.node;offset=isSkipInnerOffset?0:point.offset-1;}return{node:node,offset:offset};};/**
	         * returns next boundaryPoint
	         *
	         * @param {BoundaryPoint} point
	         * @param {Boolean} isSkipInnerOffset
	         * @return {BoundaryPoint}
	         */var nextPoint=function nextPoint(point,isSkipInnerOffset){var node,offset;if(nodeLength(point.node)===point.offset){if(isEditable(point.node)){return null;}node=point.node.parentNode;offset=position(point.node)+1;}else if(hasChildren(point.node)){node=point.node.childNodes[point.offset];offset=0;}else{node=point.node;offset=isSkipInnerOffset?nodeLength(point.node):point.offset+1;}return{node:node,offset:offset};};/**
	         * returns whether pointA and pointB is same or not.
	         *
	         * @param {BoundaryPoint} pointA
	         * @param {BoundaryPoint} pointB
	         * @return {Boolean}
	         */var isSamePoint=function isSamePoint(pointA,pointB){return pointA.node===pointB.node&&pointA.offset===pointB.offset;};/**
	         * returns whether point is visible (can set cursor) or not.
	         *
	         * @param {BoundaryPoint} point
	         * @return {Boolean}
	         */var isVisiblePoint=function isVisiblePoint(point){if(isText(point.node)||!hasChildren(point.node)||isEmpty(point.node)){return true;}var leftNode=point.node.childNodes[point.offset-1];var rightNode=point.node.childNodes[point.offset];if((!leftNode||isVoid(leftNode))&&(!rightNode||isVoid(rightNode))){return true;}return false;};/**
	         * @method prevPointUtil
	         *
	         * @param {BoundaryPoint} point
	         * @param {Function} pred
	         * @return {BoundaryPoint}
	         */var prevPointUntil=function prevPointUntil(point,pred){while(point){if(pred(point)){return point;}point=prevPoint(point);}return null;};/**
	         * @method nextPointUntil
	         *
	         * @param {BoundaryPoint} point
	         * @param {Function} pred
	         * @return {BoundaryPoint}
	         */var nextPointUntil=function nextPointUntil(point,pred){while(point){if(pred(point)){return point;}point=nextPoint(point);}return null;};/**
	         * returns whether point has character or not.
	         *
	         * @param {Point} point
	         * @return {Boolean}
	         */var isCharPoint=function isCharPoint(point){if(!isText(point.node)){return false;}var ch=point.node.nodeValue.charAt(point.offset-1);return ch&&ch!==' '&&ch!==NBSP_CHAR;};/**
	         * @method walkPoint
	         *
	         * @param {BoundaryPoint} startPoint
	         * @param {BoundaryPoint} endPoint
	         * @param {Function} handler
	         * @param {Boolean} isSkipInnerOffset
	         */var walkPoint=function walkPoint(startPoint,endPoint,handler,isSkipInnerOffset){var point=startPoint;while(point){handler(point);if(isSamePoint(point,endPoint)){break;}var isSkipOffset=isSkipInnerOffset&&startPoint.node!==point.node&&endPoint.node!==point.node;point=nextPoint(point,isSkipOffset);}};/**
	         * @method makeOffsetPath
	         *
	         * return offsetPath(array of offset) from ancestor
	         *
	         * @param {Node} ancestor - ancestor node
	         * @param {Node} node
	         */var makeOffsetPath=function makeOffsetPath(ancestor,node){var ancestors=listAncestor(node,func.eq(ancestor));return ancestors.map(position).reverse();};/**
	         * @method fromOffsetPath
	         *
	         * return element from offsetPath(array of offset)
	         *
	         * @param {Node} ancestor - ancestor node
	         * @param {array} offsets - offsetPath
	         */var fromOffsetPath=function fromOffsetPath(ancestor,offsets){var current=ancestor;for(var i=0,len=offsets.length;i<len;i++){if(current.childNodes.length<=offsets[i]){current=current.childNodes[current.childNodes.length-1];}else{current=current.childNodes[offsets[i]];}}return current;};/**
	         * @method splitNode
	         *
	         * split element or #text
	         *
	         * @param {BoundaryPoint} point
	         * @param {Object} [options]
	         * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false
	         * @param {Boolean} [options.isNotSplitEdgePoint] - default: false
	         * @return {Node} right node of boundaryPoint
	         */var splitNode=function splitNode(point,options){var isSkipPaddingBlankHTML=options&&options.isSkipPaddingBlankHTML;var isNotSplitEdgePoint=options&&options.isNotSplitEdgePoint;// edge case
	if(isEdgePoint(point)&&(isText(point.node)||isNotSplitEdgePoint)){if(isLeftEdgePoint(point)){return point.node;}else if(isRightEdgePoint(point)){return point.node.nextSibling;}}// split #text
	if(isText(point.node)){return point.node.splitText(point.offset);}else{var childNode=point.node.childNodes[point.offset];var clone=insertAfter(point.node.cloneNode(false),point.node);appendChildNodes(clone,listNext(childNode));if(!isSkipPaddingBlankHTML){paddingBlankHTML(point.node);paddingBlankHTML(clone);}return clone;}};/**
	         * @method splitTree
	         *
	         * split tree by point
	         *
	         * @param {Node} root - split root
	         * @param {BoundaryPoint} point
	         * @param {Object} [options]
	         * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false
	         * @param {Boolean} [options.isNotSplitEdgePoint] - default: false
	         * @return {Node} right node of boundaryPoint
	         */var splitTree=function splitTree(root,point,options){// ex) [#text, <span>, <p>]
	var ancestors=listAncestor(point.node,func.eq(root));if(!ancestors.length){return null;}else if(ancestors.length===1){return splitNode(point,options);}return ancestors.reduce(function(node,parent){if(node===point.node){node=splitNode(point,options);}return splitNode({node:parent,offset:node?dom.position(node):nodeLength(parent)},options);});};/**
	         * split point
	         *
	         * @param {Point} point
	         * @param {Boolean} isInline
	         * @return {Object}
	         */var splitPoint=function splitPoint(point,isInline){// find splitRoot, container
	//  - inline: splitRoot is a child of paragraph
	//  - block: splitRoot is a child of bodyContainer
	var pred=isInline?isPara:isBodyContainer;var ancestors=listAncestor(point.node,pred);var topAncestor=list.last(ancestors)||point.node;var splitRoot,container;if(pred(topAncestor)){splitRoot=ancestors[ancestors.length-2];container=topAncestor;}else{splitRoot=topAncestor;container=splitRoot.parentNode;}// if splitRoot is exists, split with splitTree
	var pivot=splitRoot&&splitTree(splitRoot,point,{isSkipPaddingBlankHTML:isInline,isNotSplitEdgePoint:isInline});// if container is point.node, find pivot with point.offset
	if(!pivot&&container===point.node){pivot=point.node.childNodes[point.offset];}return{rightNode:pivot,container:container};};var create=function create(nodeName){return document.createElement(nodeName);};var createText=function createText(text){return document.createTextNode(text);};/**
	         * @method remove
	         *
	         * remove node, (isRemoveChild: remove child or not)
	         *
	         * @param {Node} node
	         * @param {Boolean} isRemoveChild
	         */var remove=function remove(node,isRemoveChild){if(!node||!node.parentNode){return;}if(node.removeNode){return node.removeNode(isRemoveChild);}var parent=node.parentNode;if(!isRemoveChild){var nodes=[];var i,len;for(i=0,len=node.childNodes.length;i<len;i++){nodes.push(node.childNodes[i]);}for(i=0,len=nodes.length;i<len;i++){parent.insertBefore(nodes[i],node);}}parent.removeChild(node);};/**
	         * @method removeWhile
	         *
	         * @param {Node} node
	         * @param {Function} pred
	         */var removeWhile=function removeWhile(node,pred){while(node){if(isEditable(node)||!pred(node)){break;}var parent=node.parentNode;remove(node);node=parent;}};/**
	         * @method replace
	         *
	         * replace node with provided nodeName
	         *
	         * @param {Node} node
	         * @param {String} nodeName
	         * @return {Node} - new node
	         */var replace=function replace(node,nodeName){if(node.nodeName.toUpperCase()===nodeName.toUpperCase()){return node;}var newNode=create(nodeName);if(node.style.cssText){newNode.style.cssText=node.style.cssText;}appendChildNodes(newNode,list.from(node.childNodes));insertAfter(newNode,node);remove(node);return newNode;};var isTextarea=makePredByNodeName('TEXTAREA');/**
	         * @param {jQuery} $node
	         * @param {Boolean} [stripLinebreaks] - default: false
	         */var value=function value($node,stripLinebreaks){var val=isTextarea($node[0])?$node.val():$node.html();if(stripLinebreaks){return val.replace(/[\n\r]/g,'');}return val;};/**
	         * @method html
	         *
	         * get the HTML contents of node
	         *
	         * @param {jQuery} $node
	         * @param {Boolean} [isNewlineOnBlock]
	         */var html=function html($node,isNewlineOnBlock){var markup=value($node);if(isNewlineOnBlock){var regexTag=/<(\/?)(\b(?!!)[^>\s]*)(.*?)(\s*\/?>)/g;markup=markup.replace(regexTag,function(match,endSlash,name){name=name.toUpperCase();var isEndOfInlineContainer=/^DIV|^TD|^TH|^P|^LI|^H[1-7]/.test(name)&&!!endSlash;var isBlockNode=/^BLOCKQUOTE|^TABLE|^TBODY|^TR|^HR|^UL|^OL/.test(name);return match+(isEndOfInlineContainer||isBlockNode?'\n':'');});markup=$.trim(markup);}return markup;};return{/** @property {String} NBSP_CHAR */NBSP_CHAR:NBSP_CHAR,/** @property {String} ZERO_WIDTH_NBSP_CHAR */ZERO_WIDTH_NBSP_CHAR:ZERO_WIDTH_NBSP_CHAR,/** @property {String} blank */blank:blankHTML,/** @property {String} emptyPara */emptyPara:'<p>'+blankHTML+'</p>',makePredByNodeName:makePredByNodeName,isEditable:isEditable,isControlSizing:isControlSizing,buildLayoutInfo:buildLayoutInfo,makeLayoutInfo:makeLayoutInfo,isText:isText,isVoid:isVoid,isPara:isPara,isPurePara:isPurePara,isInline:isInline,isBlock:func.not(isInline),isBodyInline:isBodyInline,isBody:isBody,isParaInline:isParaInline,isList:isList,isTable:isTable,isCell:isCell,isBlockquote:isBlockquote,isBodyContainer:isBodyContainer,isAnchor:isAnchor,isDiv:makePredByNodeName('DIV'),isLi:isLi,isBR:makePredByNodeName('BR'),isSpan:makePredByNodeName('SPAN'),isB:makePredByNodeName('B'),isU:makePredByNodeName('U'),isS:makePredByNodeName('S'),isI:makePredByNodeName('I'),isImg:makePredByNodeName('IMG'),isTextarea:isTextarea,isEmpty:isEmpty,isEmptyAnchor:func.and(isAnchor,isEmpty),isClosestSibling:isClosestSibling,withClosestSiblings:withClosestSiblings,nodeLength:nodeLength,isLeftEdgePoint:isLeftEdgePoint,isRightEdgePoint:isRightEdgePoint,isEdgePoint:isEdgePoint,isLeftEdgeOf:isLeftEdgeOf,isRightEdgeOf:isRightEdgeOf,isLeftEdgePointOf:isLeftEdgePointOf,isRightEdgePointOf:isRightEdgePointOf,prevPoint:prevPoint,nextPoint:nextPoint,isSamePoint:isSamePoint,isVisiblePoint:isVisiblePoint,prevPointUntil:prevPointUntil,nextPointUntil:nextPointUntil,isCharPoint:isCharPoint,walkPoint:walkPoint,ancestor:ancestor,singleChildAncestor:singleChildAncestor,listAncestor:listAncestor,lastAncestor:lastAncestor,listNext:listNext,listPrev:listPrev,listDescendant:listDescendant,commonAncestor:commonAncestor,wrap:wrap,insertAfter:insertAfter,appendChildNodes:appendChildNodes,position:position,hasChildren:hasChildren,makeOffsetPath:makeOffsetPath,fromOffsetPath:fromOffsetPath,splitTree:splitTree,splitPoint:splitPoint,create:create,createText:createText,remove:remove,removeWhile:removeWhile,replace:replace,html:html,value:value};}();var range=function(){/**
	         * return boundaryPoint from TextRange, inspired by Andy Na's HuskyRange.js
	         *
	         * @param {TextRange} textRange
	         * @param {Boolean} isStart
	         * @return {BoundaryPoint}
	         *
	         * @see http://msdn.microsoft.com/en-us/library/ie/ms535872(v=vs.85).aspx
	         */var textRangeToPoint=function textRangeToPoint(textRange,isStart){var container=textRange.parentElement(),offset;var tester=document.body.createTextRange(),prevContainer;var childNodes=list.from(container.childNodes);for(offset=0;offset<childNodes.length;offset++){if(dom.isText(childNodes[offset])){continue;}tester.moveToElementText(childNodes[offset]);if(tester.compareEndPoints('StartToStart',textRange)>=0){break;}prevContainer=childNodes[offset];}if(offset!==0&&dom.isText(childNodes[offset-1])){var textRangeStart=document.body.createTextRange(),curTextNode=null;textRangeStart.moveToElementText(prevContainer||container);textRangeStart.collapse(!prevContainer);curTextNode=prevContainer?prevContainer.nextSibling:container.firstChild;var pointTester=textRange.duplicate();pointTester.setEndPoint('StartToStart',textRangeStart);var textCount=pointTester.text.replace(/[\r\n]/g,'').length;while(textCount>curTextNode.nodeValue.length&&curTextNode.nextSibling){textCount-=curTextNode.nodeValue.length;curTextNode=curTextNode.nextSibling;}/* jshint ignore:start */var dummy=curTextNode.nodeValue;// enforce IE to re-reference curTextNode, hack
	/* jshint ignore:end */if(isStart&&curTextNode.nextSibling&&dom.isText(curTextNode.nextSibling)&&textCount===curTextNode.nodeValue.length){textCount-=curTextNode.nodeValue.length;curTextNode=curTextNode.nextSibling;}container=curTextNode;offset=textCount;}return{cont:container,offset:offset};};/**
	         * return TextRange from boundary point (inspired by google closure-library)
	         * @param {BoundaryPoint} point
	         * @return {TextRange}
	         */var pointToTextRange=function pointToTextRange(point){var textRangeInfo=function textRangeInfo(container,offset){var node,isCollapseToStart;if(dom.isText(container)){var prevTextNodes=dom.listPrev(container,func.not(dom.isText));var prevContainer=list.last(prevTextNodes).previousSibling;node=prevContainer||container.parentNode;offset+=list.sum(list.tail(prevTextNodes),dom.nodeLength);isCollapseToStart=!prevContainer;}else{node=container.childNodes[offset]||container;if(dom.isText(node)){return textRangeInfo(node,0);}offset=0;isCollapseToStart=false;}return{node:node,collapseToStart:isCollapseToStart,offset:offset};};var textRange=document.body.createTextRange();var info=textRangeInfo(point.node,point.offset);textRange.moveToElementText(info.node);textRange.collapse(info.collapseToStart);textRange.moveStart('character',info.offset);return textRange;};/**
	         * Wrapped Range
	         *
	         * @constructor
	         * @param {Node} sc - start container
	         * @param {Number} so - start offset
	         * @param {Node} ec - end container
	         * @param {Number} eo - end offset
	         */var WrappedRange=function WrappedRange(sc,so,ec,eo){this.sc=sc;this.so=so;this.ec=ec;this.eo=eo;// nativeRange: get nativeRange from sc, so, ec, eo
	var nativeRange=function nativeRange(){if(agent.isW3CRangeSupport){var w3cRange=document.createRange();w3cRange.setStart(sc,so);w3cRange.setEnd(ec,eo);return w3cRange;}else{var textRange=pointToTextRange({node:sc,offset:so});textRange.setEndPoint('EndToEnd',pointToTextRange({node:ec,offset:eo}));return textRange;}};this.getPoints=function(){return{sc:sc,so:so,ec:ec,eo:eo};};this.getStartPoint=function(){return{node:sc,offset:so};};this.getEndPoint=function(){return{node:ec,offset:eo};};/**
	             * select update visible range
	             */this.select=function(){var nativeRng=nativeRange();if(agent.isW3CRangeSupport){var selection=document.getSelection();if(selection.rangeCount>0){selection.removeAllRanges();}selection.addRange(nativeRng);}else{nativeRng.select();}return this;};/**
	             * @return {WrappedRange}
	             */this.normalize=function(){/**
	                 * @param {BoundaryPoint} point
	                 * @param {Boolean} isLeftToRight
	                 * @return {BoundaryPoint}
	                 */var getVisiblePoint=function getVisiblePoint(point,isLeftToRight){if(dom.isVisiblePoint(point)&&!dom.isEdgePoint(point)||dom.isVisiblePoint(point)&&dom.isRightEdgePoint(point)&&!isLeftToRight||dom.isVisiblePoint(point)&&dom.isLeftEdgePoint(point)&&isLeftToRight||dom.isVisiblePoint(point)&&dom.isBlock(point.node)&&dom.isEmpty(point.node)){return point;}// point on block's edge
	var block=dom.ancestor(point.node,dom.isBlock);if((dom.isLeftEdgePointOf(point,block)||dom.isVoid(dom.prevPoint(point).node))&&!isLeftToRight||(dom.isRightEdgePointOf(point,block)||dom.isVoid(dom.nextPoint(point).node))&&isLeftToRight){// returns point already on visible point
	if(dom.isVisiblePoint(point)){return point;}// reverse direction 
	isLeftToRight=!isLeftToRight;}var nextPoint=isLeftToRight?dom.nextPointUntil(dom.nextPoint(point),dom.isVisiblePoint):dom.prevPointUntil(dom.prevPoint(point),dom.isVisiblePoint);return nextPoint||point;};var endPoint=getVisiblePoint(this.getEndPoint(),false);var startPoint=this.isCollapsed()?endPoint:getVisiblePoint(this.getStartPoint(),true);return new WrappedRange(startPoint.node,startPoint.offset,endPoint.node,endPoint.offset);};/**
	             * returns matched nodes on range
	             *
	             * @param {Function} [pred] - predicate function
	             * @param {Object} [options]
	             * @param {Boolean} [options.includeAncestor]
	             * @param {Boolean} [options.fullyContains]
	             * @return {Node[]}
	             */this.nodes=function(pred,options){pred=pred||func.ok;var includeAncestor=options&&options.includeAncestor;var fullyContains=options&&options.fullyContains;// TODO compare points and sort
	var startPoint=this.getStartPoint();var endPoint=this.getEndPoint();var nodes=[];var leftEdgeNodes=[];dom.walkPoint(startPoint,endPoint,function(point){if(dom.isEditable(point.node)){return;}var node;if(fullyContains){if(dom.isLeftEdgePoint(point)){leftEdgeNodes.push(point.node);}if(dom.isRightEdgePoint(point)&&list.contains(leftEdgeNodes,point.node)){node=point.node;}}else if(includeAncestor){node=dom.ancestor(point.node,pred);}else{node=point.node;}if(node&&pred(node)){nodes.push(node);}},true);return list.unique(nodes);};/**
	             * returns commonAncestor of range
	             * @return {Element} - commonAncestor
	             */this.commonAncestor=function(){return dom.commonAncestor(sc,ec);};/**
	             * returns expanded range by pred
	             *
	             * @param {Function} pred - predicate function
	             * @return {WrappedRange}
	             */this.expand=function(pred){var startAncestor=dom.ancestor(sc,pred);var endAncestor=dom.ancestor(ec,pred);if(!startAncestor&&!endAncestor){return new WrappedRange(sc,so,ec,eo);}var boundaryPoints=this.getPoints();if(startAncestor){boundaryPoints.sc=startAncestor;boundaryPoints.so=0;}if(endAncestor){boundaryPoints.ec=endAncestor;boundaryPoints.eo=dom.nodeLength(endAncestor);}return new WrappedRange(boundaryPoints.sc,boundaryPoints.so,boundaryPoints.ec,boundaryPoints.eo);};/**
	             * @param {Boolean} isCollapseToStart
	             * @return {WrappedRange}
	             */this.collapse=function(isCollapseToStart){if(isCollapseToStart){return new WrappedRange(sc,so,sc,so);}else{return new WrappedRange(ec,eo,ec,eo);}};/**
	             * splitText on range
	             */this.splitText=function(){var isSameContainer=sc===ec;var boundaryPoints=this.getPoints();if(dom.isText(ec)&&!dom.isEdgePoint(this.getEndPoint())){ec.splitText(eo);}if(dom.isText(sc)&&!dom.isEdgePoint(this.getStartPoint())){boundaryPoints.sc=sc.splitText(so);boundaryPoints.so=0;if(isSameContainer){boundaryPoints.ec=boundaryPoints.sc;boundaryPoints.eo=eo-so;}}return new WrappedRange(boundaryPoints.sc,boundaryPoints.so,boundaryPoints.ec,boundaryPoints.eo);};/**
	             * delete contents on range
	             * @return {WrappedRange}
	             */this.deleteContents=function(){if(this.isCollapsed()){return this;}var rng=this.splitText();var nodes=rng.nodes(null,{fullyContains:true});// find new cursor point
	var point=dom.prevPointUntil(rng.getStartPoint(),function(point){return!list.contains(nodes,point.node);});var emptyParents=[];$.each(nodes,function(idx,node){// find empty parents
	var parent=node.parentNode;if(point.node!==parent&&dom.nodeLength(parent)===1){emptyParents.push(parent);}dom.remove(node,false);});// remove empty parents
	$.each(emptyParents,function(idx,node){dom.remove(node,false);});return new WrappedRange(point.node,point.offset,point.node,point.offset).normalize();};/**
	             * makeIsOn: return isOn(pred) function
	             */var makeIsOn=function makeIsOn(pred){return function(){var ancestor=dom.ancestor(sc,pred);return!!ancestor&&ancestor===dom.ancestor(ec,pred);};};// isOnEditable: judge whether range is on editable or not
	this.isOnEditable=makeIsOn(dom.isEditable);// isOnList: judge whether range is on list node or not
	this.isOnList=makeIsOn(dom.isList);// isOnAnchor: judge whether range is on anchor node or not
	this.isOnAnchor=makeIsOn(dom.isAnchor);// isOnAnchor: judge whether range is on cell node or not
	this.isOnCell=makeIsOn(dom.isCell);/**
	             * @param {Function} pred
	             * @return {Boolean}
	             */this.isLeftEdgeOf=function(pred){if(!dom.isLeftEdgePoint(this.getStartPoint())){return false;}var node=dom.ancestor(this.sc,pred);return node&&dom.isLeftEdgeOf(this.sc,node);};/**
	             * returns whether range was collapsed or not
	             */this.isCollapsed=function(){return sc===ec&&so===eo;};/**
	             * wrap inline nodes which children of body with paragraph
	             *
	             * @return {WrappedRange}
	             */this.wrapBodyInlineWithPara=function(){if(dom.isBodyContainer(sc)&&dom.isEmpty(sc)){sc.innerHTML=dom.emptyPara;return new WrappedRange(sc.firstChild,0,sc.firstChild,0);}/**
	                 * [workaround] firefox often create range on not visible point. so normalize here.
	                 *  - firefox: |<p>text</p>|
	                 *  - chrome: <p>|text|</p>
	                 */var rng=this.normalize();if(dom.isParaInline(sc)||dom.isPara(sc)){return rng;}// find inline top ancestor
	var topAncestor;if(dom.isInline(rng.sc)){var ancestors=dom.listAncestor(rng.sc,func.not(dom.isInline));topAncestor=list.last(ancestors);if(!dom.isInline(topAncestor)){topAncestor=ancestors[ancestors.length-2]||rng.sc.childNodes[rng.so];}}else{topAncestor=rng.sc.childNodes[rng.so>0?rng.so-1:0];}// siblings not in paragraph
	var inlineSiblings=dom.listPrev(topAncestor,dom.isParaInline).reverse();inlineSiblings=inlineSiblings.concat(dom.listNext(topAncestor.nextSibling,dom.isParaInline));// wrap with paragraph
	if(inlineSiblings.length){var para=dom.wrap(list.head(inlineSiblings),'p');dom.appendChildNodes(para,list.tail(inlineSiblings));}return this.normalize();};/**
	             * insert node at current cursor
	             *
	             * @param {Node} node
	             * @return {Node}
	             */this.insertNode=function(node){var rng=this.wrapBodyInlineWithPara().deleteContents();var info=dom.splitPoint(rng.getStartPoint(),dom.isInline(node));if(info.rightNode){info.rightNode.parentNode.insertBefore(node,info.rightNode);}else{info.container.appendChild(node);}return node;};/**
	             * insert html at current cursor
	             */this.pasteHTML=function(markup){var contentsContainer=$('<div></div>').html(markup)[0];var childNodes=list.from(contentsContainer.childNodes);var rng=this.wrapBodyInlineWithPara().deleteContents();return childNodes.reverse().map(function(childNode){return rng.insertNode(childNode);}).reverse();};/**
	             * returns text in range
	             *
	             * @return {String}
	             */this.toString=function(){var nativeRng=nativeRange();return agent.isW3CRangeSupport?nativeRng.toString():nativeRng.text;};/**
	             * returns range for word before cursor
	             *
	             * @param {Boolean} [findAfter] - find after cursor, default: false
	             * @return {WrappedRange}
	             */this.getWordRange=function(findAfter){var endPoint=this.getEndPoint();if(!dom.isCharPoint(endPoint)){return this;}var startPoint=dom.prevPointUntil(endPoint,function(point){return!dom.isCharPoint(point);});if(findAfter){endPoint=dom.nextPointUntil(endPoint,function(point){return!dom.isCharPoint(point);});}return new WrappedRange(startPoint.node,startPoint.offset,endPoint.node,endPoint.offset);};/**
	             * create offsetPath bookmark
	             *
	             * @param {Node} editable
	             */this.bookmark=function(editable){return{s:{path:dom.makeOffsetPath(editable,sc),offset:so},e:{path:dom.makeOffsetPath(editable,ec),offset:eo}};};/**
	             * create offsetPath bookmark base on paragraph
	             *
	             * @param {Node[]} paras
	             */this.paraBookmark=function(paras){return{s:{path:list.tail(dom.makeOffsetPath(list.head(paras),sc)),offset:so},e:{path:list.tail(dom.makeOffsetPath(list.last(paras),ec)),offset:eo}};};/**
	             * getClientRects
	             * @return {Rect[]}
	             */this.getClientRects=function(){var nativeRng=nativeRange();return nativeRng.getClientRects();};};/**
	         * @class core.range
	         *
	         * Data structure
	         *  * BoundaryPoint: a point of dom tree
	         *  * BoundaryPoints: two boundaryPoints corresponding to the start and the end of the Range
	         *
	         * See to http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html#Level-2-Range-Position
	         *
	         * @singleton
	         * @alternateClassName range
	         */return{/**
	             * @method
	             *
	             * create Range Object From arguments or Browser Selection
	             *
	             * @param {Node} sc - start container
	             * @param {Number} so - start offset
	             * @param {Node} ec - end container
	             * @param {Number} eo - end offset
	             * @return {WrappedRange}
	             */create:function create(sc,so,ec,eo){if(!arguments.length){// from Browser Selection
	if(agent.isW3CRangeSupport){var selection=document.getSelection();if(!selection||selection.rangeCount===0){return null;}else if(dom.isBody(selection.anchorNode)){// Firefox: returns entire body as range on initialization. We won't never need it.
	return null;}var nativeRng=selection.getRangeAt(0);sc=nativeRng.startContainer;so=nativeRng.startOffset;ec=nativeRng.endContainer;eo=nativeRng.endOffset;}else{// IE8: TextRange
	var textRange=document.selection.createRange();var textRangeEnd=textRange.duplicate();textRangeEnd.collapse(false);var textRangeStart=textRange;textRangeStart.collapse(true);var startPoint=textRangeToPoint(textRangeStart,true),endPoint=textRangeToPoint(textRangeEnd,false);// same visible point case: range was collapsed.
	if(dom.isText(startPoint.node)&&dom.isLeftEdgePoint(startPoint)&&dom.isTextNode(endPoint.node)&&dom.isRightEdgePoint(endPoint)&&endPoint.node.nextSibling===startPoint.node){startPoint=endPoint;}sc=startPoint.cont;so=startPoint.offset;ec=endPoint.cont;eo=endPoint.offset;}}else if(arguments.length===2){//collapsed
	ec=sc;eo=so;}return new WrappedRange(sc,so,ec,eo);},/**
	             * @method
	             *
	             * create WrappedRange from node
	             *
	             * @param {Node} node
	             * @return {WrappedRange}
	             */createFromNode:function createFromNode(node){var sc=node;var so=0;var ec=node;var eo=dom.nodeLength(ec);// browsers can't target a picture or void node
	if(dom.isVoid(sc)){so=dom.listPrev(sc).length-1;sc=sc.parentNode;}if(dom.isBR(ec)){eo=dom.listPrev(ec).length-1;ec=ec.parentNode;}else if(dom.isVoid(ec)){eo=dom.listPrev(ec).length;ec=ec.parentNode;}return this.create(sc,so,ec,eo);},/**
	             * create WrappedRange from node after position
	             *
	             * @param {Node} node
	             * @return {WrappedRange}
	             */createFromNodeBefore:function createFromNodeBefore(node){return this.createFromNode(node).collapse(true);},/**
	             * create WrappedRange from node after position
	             *
	             * @param {Node} node
	             * @return {WrappedRange}
	             */createFromNodeAfter:function createFromNodeAfter(node){return this.createFromNode(node).collapse();},/**
	             * @method
	             *
	             * create WrappedRange from bookmark
	             *
	             * @param {Node} editable
	             * @param {Object} bookmark
	             * @return {WrappedRange}
	             */createFromBookmark:function createFromBookmark(editable,bookmark){var sc=dom.fromOffsetPath(editable,bookmark.s.path);var so=bookmark.s.offset;var ec=dom.fromOffsetPath(editable,bookmark.e.path);var eo=bookmark.e.offset;return new WrappedRange(sc,so,ec,eo);},/**
	             * @method
	             *
	             * create WrappedRange from paraBookmark
	             *
	             * @param {Object} bookmark
	             * @param {Node[]} paras
	             * @return {WrappedRange}
	             */createFromParaBookmark:function createFromParaBookmark(bookmark,paras){var so=bookmark.s.offset;var eo=bookmark.e.offset;var sc=dom.fromOffsetPath(list.head(paras),bookmark.s.path);var ec=dom.fromOffsetPath(list.last(paras),bookmark.e.path);return new WrappedRange(sc,so,ec,eo);}};}();/**
	     * @class defaults
	     *
	     * @singleton
	     */var defaults={/** @property */version:'0.6.16',/**
	         *
	         * for event options, reference to EventHandler.attach
	         *
	         * @property {Object} options
	         * @property {String/Number} [options.width=null] set editor width
	         * @property {String/Number} [options.height=null] set editor height, ex) 300
	         * @property {String/Number} options.minHeight set minimum height of editor
	         * @property {String/Number} options.maxHeight
	         * @property {String/Number} options.focus
	         * @property {Number} options.tabsize
	         * @property {Boolean} options.styleWithSpan
	         * @property {Object} options.codemirror
	         * @property {Object} [options.codemirror.mode='text/html']
	         * @property {Object} [options.codemirror.htmlMode=true]
	         * @property {Object} [options.codemirror.lineNumbers=true]
	         * @property {String} [options.lang=en-US] language 'en-US', 'ko-KR', ...
	         * @property {String} [options.direction=null] text direction, ex) 'rtl'
	         * @property {Array} [options.toolbar]
	         * @property {Boolean} [options.airMode=false]
	         * @property {Array} [options.airPopover]
	         * @property {Fucntion} [options.onInit] initialize
	         * @property {Fucntion} [options.onsubmit]
	         */options:{width:null,// set editor width
	height:null,// set editor height, ex) 300
	minHeight:null,// set minimum height of editor
	maxHeight:null,// set maximum height of editor
	focus:false,// set focus to editable area after initializing summernote
	tabsize:4,// size of tab ex) 2 or 4
	styleWithSpan:true,// style with span (Chrome and FF only)
	disableLinkTarget:false,// hide link Target Checkbox
	disableDragAndDrop:false,// disable drag and drop event
	disableResizeEditor:false,// disable resizing editor
	disableResizeImage:false,// disable resizing image
	shortcuts:true,// enable keyboard shortcuts
	textareaAutoSync:true,// enable textarea auto sync
	placeholder:false,// enable placeholder text
	prettifyHtml:true,// enable prettifying html while toggling codeview
	iconPrefix:'fa fa-',// prefix for css icon classes
	icons:{font:{bold:'bold',italic:'italic',underline:'underline',clear:'eraser',height:'text-height',strikethrough:'strikethrough',superscript:'superscript',subscript:'subscript'},image:{image:'picture-o',floatLeft:'align-left',floatRight:'align-right',floatNone:'align-justify',shapeRounded:'square',shapeCircle:'circle-o',shapeThumbnail:'picture-o',shapeNone:'times',remove:'trash-o'},link:{link:'link',unlink:'unlink',edit:'edit'},table:{table:'table'},hr:{insert:'minus'},style:{style:'magic'},lists:{unordered:'list-ul',ordered:'list-ol'},options:{help:'question',fullscreen:'arrows-alt',codeview:'code'},paragraph:{paragraph:'align-left',outdent:'outdent',indent:'indent',left:'align-left',center:'align-center',right:'align-right',justify:'align-justify'},color:{recent:'font'},history:{undo:'undo',redo:'repeat'},misc:{check:'check'}},dialogsInBody:false,// false will add dialogs into editor
	codemirror:{// codemirror options
	mode:'text/html',htmlMode:true,lineNumbers:true},// language
	lang:'en-US',// language 'en-US', 'ko-KR', ...
	direction:null,// text direction, ex) 'rtl'
	// toolbar
	toolbar:[['style',['style']],['font',['bold','italic','underline','clear']],// ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
	['fontname',['fontname']],['fontsize',['fontsize']],['color',['color']],['para',['ul','ol','paragraph']],['height',['height']],['table',['table']],['insert',['link','picture','hr']],['view',['fullscreen','codeview']],['help',['help']]],plugin:{},// air mode: inline editor
	airMode:false,// airPopover: [
	//   ['style', ['style']],
	//   ['font', ['bold', 'italic', 'underline', 'clear']],
	//   ['fontname', ['fontname']],
	//   ['color', ['color']],
	//   ['para', ['ul', 'ol', 'paragraph']],
	//   ['height', ['height']],
	//   ['table', ['table']],
	//   ['insert', ['link', 'picture']],
	//   ['help', ['help']]
	// ],
	airPopover:[['color',['color']],['font',['bold','underline','clear']],['para',['ul','paragraph']],['table',['table']],['insert',['link','picture']]],// style tag
	styleTags:['p','blockquote','pre','h1','h2','h3','h4','h5','h6'],// default fontName
	defaultFontName:'Helvetica Neue',// fontName
	fontNames:['Arial','Arial Black','Comic Sans MS','Courier New','Helvetica Neue','Helvetica','Impact','Lucida Grande','Tahoma','Times New Roman','Verdana'],fontNamesIgnoreCheck:[],fontSizes:['8','9','10','11','12','14','18','24','36'],// pallete colors(n x n)
	colors:[['#000000','#424242','#636363','#9C9C94','#CEC6CE','#EFEFEF','#F7F7F7','#FFFFFF'],['#FF0000','#FF9C00','#FFFF00','#00FF00','#00FFFF','#0000FF','#9C00FF','#FF00FF'],['#F7C6CE','#FFE7CE','#FFEFC6','#D6EFD6','#CEDEE7','#CEE7F7','#D6D6E7','#E7D6DE'],['#E79C9C','#FFC69C','#FFE79C','#B5D6A5','#A5C6CE','#9CC6EF','#B5A5D6','#D6A5BD'],['#E76363','#F7AD6B','#FFD663','#94BD7B','#73A5AD','#6BADDE','#8C7BC6','#C67BA5'],['#CE0000','#E79439','#EFC631','#6BA54A','#4A7B8C','#3984C6','#634AA5','#A54A7B'],['#9C0000','#B56308','#BD9400','#397B21','#104A5A','#085294','#311873','#731842'],['#630000','#7B3900','#846300','#295218','#083139','#003163','#21104A','#4A1031']],// lineHeight
	lineHeights:['1.0','1.2','1.4','1.5','1.6','1.8','2.0','3.0'],// insertTable max size
	insertTableMaxSize:{col:10,row:10},// image
	maximumImageFileSize:null,// size in bytes, null = no limit
	// callbacks
	oninit:null,// initialize
	onfocus:null,// editable has focus
	onblur:null,// editable out of focus
	onenter:null,// enter key pressed
	onkeyup:null,// keyup
	onkeydown:null,// keydown
	onImageUpload:null,// imageUpload
	onImageUploadError:null,// imageUploadError
	onMediaDelete:null,// media delete
	onToolbarClick:null,onsubmit:null,/**
	             * manipulate link address when user create link
	             * @param {String} sLinkUrl
	             * @return {String}
	             */onCreateLink:function onCreateLink(sLinkUrl){if(sLinkUrl.indexOf('@')!==-1&&sLinkUrl.indexOf(':')===-1){sLinkUrl='mailto:'+sLinkUrl;}return sLinkUrl;},keyMap:{pc:{'ENTER':'insertParagraph','CTRL+Z':'undo','CTRL+Y':'redo','TAB':'tab','SHIFT+TAB':'untab','CTRL+B':'bold','CTRL+I':'italic','CTRL+U':'underline','CTRL+SHIFT+S':'strikethrough','CTRL+BACKSLASH':'removeFormat','CTRL+SHIFT+L':'justifyLeft','CTRL+SHIFT+E':'justifyCenter','CTRL+SHIFT+R':'justifyRight','CTRL+SHIFT+J':'justifyFull','CTRL+SHIFT+NUM7':'insertUnorderedList','CTRL+SHIFT+NUM8':'insertOrderedList','CTRL+LEFTBRACKET':'outdent','CTRL+RIGHTBRACKET':'indent','CTRL+NUM0':'formatPara','CTRL+NUM1':'formatH1','CTRL+NUM2':'formatH2','CTRL+NUM3':'formatH3','CTRL+NUM4':'formatH4','CTRL+NUM5':'formatH5','CTRL+NUM6':'formatH6','CTRL+ENTER':'insertHorizontalRule','CTRL+K':'showLinkDialog'},mac:{'ENTER':'insertParagraph','CMD+Z':'undo','CMD+SHIFT+Z':'redo','TAB':'tab','SHIFT+TAB':'untab','CMD+B':'bold','CMD+I':'italic','CMD+U':'underline','CMD+SHIFT+S':'strikethrough','CMD+BACKSLASH':'removeFormat','CMD+SHIFT+L':'justifyLeft','CMD+SHIFT+E':'justifyCenter','CMD+SHIFT+R':'justifyRight','CMD+SHIFT+J':'justifyFull','CMD+SHIFT+NUM7':'insertUnorderedList','CMD+SHIFT+NUM8':'insertOrderedList','CMD+LEFTBRACKET':'outdent','CMD+RIGHTBRACKET':'indent','CMD+NUM0':'formatPara','CMD+NUM1':'formatH1','CMD+NUM2':'formatH2','CMD+NUM3':'formatH3','CMD+NUM4':'formatH4','CMD+NUM5':'formatH5','CMD+NUM6':'formatH6','CMD+ENTER':'insertHorizontalRule','CMD+K':'showLinkDialog'}}},// default language: en-US
	lang:{'en-US':{font:{bold:'Bold',italic:'Italic',underline:'Underline',clear:'Remove Font Style',height:'Line Height',name:'Font Family',strikethrough:'Strikethrough',subscript:'Subscript',superscript:'Superscript',size:'Font Size'},image:{image:'Picture',insert:'Insert Image',resizeFull:'Resize Full',resizeHalf:'Resize Half',resizeQuarter:'Resize Quarter',floatLeft:'Float Left',floatRight:'Float Right',floatNone:'Float None',shapeRounded:'Shape: Rounded',shapeCircle:'Shape: Circle',shapeThumbnail:'Shape: Thumbnail',shapeNone:'Shape: None',dragImageHere:'Drag image or text here',dropImage:'Drop image or Text',selectFromFiles:'Select from files',maximumFileSize:'Maximum file size',maximumFileSizeError:'Maximum file size exceeded.',url:'Image URL',remove:'Remove Image'},link:{link:'Link',insert:'Insert Link',unlink:'Unlink',edit:'Edit',textToDisplay:'Text to display',url:'To what URL should this link go?',openInNewWindow:'Open in new window'},table:{table:'Table'},hr:{insert:'Insert Horizontal Rule'},style:{style:'Style',normal:'Normal',blockquote:'Quote',pre:'Code',h1:'Header 1',h2:'Header 2',h3:'Header 3',h4:'Header 4',h5:'Header 5',h6:'Header 6'},lists:{unordered:'Unordered list',ordered:'Ordered list'},options:{help:'Help',fullscreen:'Full Screen',codeview:'Code View'},paragraph:{paragraph:'Paragraph',outdent:'Outdent',indent:'Indent',left:'Align left',center:'Align center',right:'Align right',justify:'Justify full'},color:{recent:'Recent Color',more:'More Color',background:'Background Color',foreground:'Foreground Color',transparent:'Transparent',setTransparent:'Set transparent',reset:'Reset',resetToDefault:'Reset to default'},shortcut:{shortcuts:'Keyboard shortcuts',close:'Close',textFormatting:'Text formatting',action:'Action',paragraphFormatting:'Paragraph formatting',documentStyle:'Document Style',extraKeys:'Extra keys'},history:{undo:'Undo',redo:'Redo'}}}};/**
	     * @class core.async
	     *
	     * Async functions which returns `Promise`
	     *
	     * @singleton
	     * @alternateClassName async
	     */var async=function(){/**
	         * @method readFileAsDataURL
	         *
	         * read contents of file as representing URL
	         *
	         * @param {File} file
	         * @return {Promise} - then: sDataUrl
	         */var readFileAsDataURL=function readFileAsDataURL(file){return $.Deferred(function(deferred){$.extend(new FileReader(),{onload:function onload(e){var sDataURL=e.target.result;deferred.resolve(sDataURL);},onerror:function onerror(){deferred.reject(this);}}).readAsDataURL(file);}).promise();};/**
	         * @method createImage
	         *
	         * create `<image>` from url string
	         *
	         * @param {String} sUrl
	         * @param {String} filename
	         * @return {Promise} - then: $image
	         */var createImage=function createImage(sUrl,filename){return $.Deferred(function(deferred){var $img=$('<img>');$img.one('load',function(){$img.off('error abort');deferred.resolve($img);}).one('error abort',function(){$img.off('load').detach();deferred.reject($img);}).css({display:'none'}).appendTo(document.body).attr({'src':sUrl,'data-filename':filename});}).promise();};return{readFileAsDataURL:readFileAsDataURL,createImage:createImage};}();/**
	     * @class core.key
	     *
	     * Object for keycodes.
	     *
	     * @singleton
	     * @alternateClassName key
	     */var key=function(){var keyMap={'BACKSPACE':8,'TAB':9,'ENTER':13,'SPACE':32,// Number: 0-9
	'NUM0':48,'NUM1':49,'NUM2':50,'NUM3':51,'NUM4':52,'NUM5':53,'NUM6':54,'NUM7':55,'NUM8':56,// Alphabet: a-z
	'B':66,'E':69,'I':73,'J':74,'K':75,'L':76,'R':82,'S':83,'U':85,'V':86,'Y':89,'Z':90,'SLASH':191,'LEFTBRACKET':219,'BACKSLASH':220,'RIGHTBRACKET':221};return{/**
	             * @method isEdit
	             *
	             * @param {Number} keyCode
	             * @return {Boolean}
	             */isEdit:function isEdit(keyCode){return list.contains([8,9,13,32],keyCode);},/**
	             * @method isMove
	             *
	             * @param {Number} keyCode
	             * @return {Boolean}
	             */isMove:function isMove(keyCode){return list.contains([37,38,39,40],keyCode);},/**
	             * @property {Object} nameFromCode
	             * @property {String} nameFromCode.8 "BACKSPACE"
	             */nameFromCode:func.invertObject(keyMap),code:keyMap};}();/**
	     * @class editing.History
	     *
	     * Editor History
	     *
	     */var History=function History($editable){var stack=[],stackOffset=-1;var editable=$editable[0];var makeSnapshot=function makeSnapshot(){var rng=range.create();var emptyBookmark={s:{path:[],offset:0},e:{path:[],offset:0}};return{contents:$editable.html(),bookmark:rng?rng.bookmark(editable):emptyBookmark};};var applySnapshot=function applySnapshot(snapshot){if(snapshot.contents!==null){$editable.html(snapshot.contents);}if(snapshot.bookmark!==null){range.createFromBookmark(editable,snapshot.bookmark).select();}};/**
	         * undo
	         */this.undo=function(){// Create snap shot if not yet recorded
	if($editable.html()!==stack[stackOffset].contents){this.recordUndo();}if(0<stackOffset){stackOffset--;applySnapshot(stack[stackOffset]);}};/**
	         * redo
	         */this.redo=function(){if(stack.length-1>stackOffset){stackOffset++;applySnapshot(stack[stackOffset]);}};/**
	         * recorded undo
	         */this.recordUndo=function(){stackOffset++;// Wash out stack after stackOffset
	if(stack.length>stackOffset){stack=stack.slice(0,stackOffset);}// Create new snapshot and push it to the end
	stack.push(makeSnapshot());};// Create first undo stack
	this.recordUndo();};/**
	     * @class editing.Style
	     *
	     * Style
	     *
	     */var Style=function Style(){/**
	         * @method jQueryCSS
	         *
	         * [workaround] for old jQuery
	         * passing an array of style properties to .css()
	         * will result in an object of property-value pairs.
	         * (compability with version < 1.9)
	         *
	         * @private
	         * @param  {jQuery} $obj
	         * @param  {Array} propertyNames - An array of one or more CSS properties.
	         * @return {Object}
	         */var jQueryCSS=function jQueryCSS($obj,propertyNames){if(agent.jqueryVersion<1.9){var result={};$.each(propertyNames,function(idx,propertyName){result[propertyName]=$obj.css(propertyName);});return result;}return $obj.css.call($obj,propertyNames);};/**
	         * returns style object from node
	         *
	         * @param {jQuery} $node
	         * @return {Object}
	         */this.fromNode=function($node){var properties=['font-family','font-size','text-align','list-style-type','line-height'];var styleInfo=jQueryCSS($node,properties)||{};styleInfo['font-size']=parseInt(styleInfo['font-size'],10);return styleInfo;};/**
	         * paragraph level style
	         *
	         * @param {WrappedRange} rng
	         * @param {Object} styleInfo
	         */this.stylePara=function(rng,styleInfo){$.each(rng.nodes(dom.isPara,{includeAncestor:true}),function(idx,para){$(para).css(styleInfo);});};/**
	         * insert and returns styleNodes on range.
	         *
	         * @param {WrappedRange} rng
	         * @param {Object} [options] - options for styleNodes
	         * @param {String} [options.nodeName] - default: `SPAN`
	         * @param {Boolean} [options.expandClosestSibling] - default: `false`
	         * @param {Boolean} [options.onlyPartialContains] - default: `false`
	         * @return {Node[]}
	         */this.styleNodes=function(rng,options){rng=rng.splitText();var nodeName=options&&options.nodeName||'SPAN';var expandClosestSibling=!!(options&&options.expandClosestSibling);var onlyPartialContains=!!(options&&options.onlyPartialContains);if(rng.isCollapsed()){return[rng.insertNode(dom.create(nodeName))];}var pred=dom.makePredByNodeName(nodeName);var nodes=rng.nodes(dom.isText,{fullyContains:true}).map(function(text){return dom.singleChildAncestor(text,pred)||dom.wrap(text,nodeName);});if(expandClosestSibling){if(onlyPartialContains){var nodesInRange=rng.nodes();// compose with partial contains predication
	pred=func.and(pred,function(node){return list.contains(nodesInRange,node);});}return nodes.map(function(node){var siblings=dom.withClosestSiblings(node,pred);var head=list.head(siblings);var tails=list.tail(siblings);$.each(tails,function(idx,elem){dom.appendChildNodes(head,elem.childNodes);dom.remove(elem);});return list.head(siblings);});}else{return nodes;}};/**
	         * get current style on cursor
	         *
	         * @param {WrappedRange} rng
	         * @return {Object} - object contains style properties.
	         */this.current=function(rng){var $cont=$(dom.isText(rng.sc)?rng.sc.parentNode:rng.sc);var styleInfo=this.fromNode($cont);// document.queryCommandState for toggle state
	styleInfo['font-bold']=document.queryCommandState('bold')?'bold':'normal';styleInfo['font-italic']=document.queryCommandState('italic')?'italic':'normal';styleInfo['font-underline']=document.queryCommandState('underline')?'underline':'normal';styleInfo['font-strikethrough']=document.queryCommandState('strikeThrough')?'strikethrough':'normal';styleInfo['font-superscript']=document.queryCommandState('superscript')?'superscript':'normal';styleInfo['font-subscript']=document.queryCommandState('subscript')?'subscript':'normal';// list-style-type to list-style(unordered, ordered)
	if(!rng.isOnList()){styleInfo['list-style']='none';}else{var aOrderedType=['circle','disc','disc-leading-zero','square'];var isUnordered=$.inArray(styleInfo['list-style-type'],aOrderedType)>-1;styleInfo['list-style']=isUnordered?'unordered':'ordered';}var para=dom.ancestor(rng.sc,dom.isPara);if(para&&para.style['line-height']){styleInfo['line-height']=para.style.lineHeight;}else{var lineHeight=parseInt(styleInfo['line-height'],10)/parseInt(styleInfo['font-size'],10);styleInfo['line-height']=lineHeight.toFixed(1);}styleInfo.anchor=rng.isOnAnchor()&&dom.ancestor(rng.sc,dom.isAnchor);styleInfo.ancestors=dom.listAncestor(rng.sc,dom.isEditable);styleInfo.range=rng;return styleInfo;};};/**
	     * @class editing.Bullet
	     *
	     * @alternateClassName Bullet
	     */var Bullet=function Bullet(){/**
	         * @method insertOrderedList
	         *
	         * toggle ordered list
	         *
	         * @type command
	         */this.insertOrderedList=function(){this.toggleList('OL');};/**
	         * @method insertUnorderedList
	         *
	         * toggle unordered list
	         *
	         * @type command
	         */this.insertUnorderedList=function(){this.toggleList('UL');};/**
	         * @method indent
	         *
	         * indent
	         *
	         * @type command
	         */this.indent=function(){var self=this;var rng=range.create().wrapBodyInlineWithPara();var paras=rng.nodes(dom.isPara,{includeAncestor:true});var clustereds=list.clusterBy(paras,func.peq2('parentNode'));$.each(clustereds,function(idx,paras){var head=list.head(paras);if(dom.isLi(head)){self.wrapList(paras,head.parentNode.nodeName);}else{$.each(paras,function(idx,para){$(para).css('marginLeft',function(idx,val){return(parseInt(val,10)||0)+25;});});}});rng.select();};/**
	         * @method outdent
	         *
	         * outdent
	         *
	         * @type command
	         */this.outdent=function(){var self=this;var rng=range.create().wrapBodyInlineWithPara();var paras=rng.nodes(dom.isPara,{includeAncestor:true});var clustereds=list.clusterBy(paras,func.peq2('parentNode'));$.each(clustereds,function(idx,paras){var head=list.head(paras);if(dom.isLi(head)){self.releaseList([paras]);}else{$.each(paras,function(idx,para){$(para).css('marginLeft',function(idx,val){val=parseInt(val,10)||0;return val>25?val-25:'';});});}});rng.select();};/**
	         * @method toggleList
	         *
	         * toggle list
	         *
	         * @param {String} listName - OL or UL
	         */this.toggleList=function(listName){var self=this;var rng=range.create().wrapBodyInlineWithPara();var paras=rng.nodes(dom.isPara,{includeAncestor:true});var bookmark=rng.paraBookmark(paras);var clustereds=list.clusterBy(paras,func.peq2('parentNode'));// paragraph to list
	if(list.find(paras,dom.isPurePara)){var wrappedParas=[];$.each(clustereds,function(idx,paras){wrappedParas=wrappedParas.concat(self.wrapList(paras,listName));});paras=wrappedParas;// list to paragraph or change list style
	}else{var diffLists=rng.nodes(dom.isList,{includeAncestor:true}).filter(function(listNode){return!$.nodeName(listNode,listName);});if(diffLists.length){$.each(diffLists,function(idx,listNode){dom.replace(listNode,listName);});}else{paras=this.releaseList(clustereds,true);}}range.createFromParaBookmark(bookmark,paras).select();};/**
	         * @method wrapList
	         *
	         * @param {Node[]} paras
	         * @param {String} listName
	         * @return {Node[]}
	         */this.wrapList=function(paras,listName){var head=list.head(paras);var last=list.last(paras);var prevList=dom.isList(head.previousSibling)&&head.previousSibling;var nextList=dom.isList(last.nextSibling)&&last.nextSibling;var listNode=prevList||dom.insertAfter(dom.create(listName||'UL'),last);// P to LI
	paras=paras.map(function(para){return dom.isPurePara(para)?dom.replace(para,'LI'):para;});// append to list(<ul>, <ol>)
	dom.appendChildNodes(listNode,paras);if(nextList){dom.appendChildNodes(listNode,list.from(nextList.childNodes));dom.remove(nextList);}return paras;};/**
	         * @method releaseList
	         *
	         * @param {Array[]} clustereds
	         * @param {Boolean} isEscapseToBody
	         * @return {Node[]}
	         */this.releaseList=function(clustereds,isEscapseToBody){var releasedParas=[];$.each(clustereds,function(idx,paras){var head=list.head(paras);var last=list.last(paras);var headList=isEscapseToBody?dom.lastAncestor(head,dom.isList):head.parentNode;var lastList=headList.childNodes.length>1?dom.splitTree(headList,{node:last.parentNode,offset:dom.position(last)+1},{isSkipPaddingBlankHTML:true}):null;var middleList=dom.splitTree(headList,{node:head.parentNode,offset:dom.position(head)},{isSkipPaddingBlankHTML:true});paras=isEscapseToBody?dom.listDescendant(middleList,dom.isLi):list.from(middleList.childNodes).filter(dom.isLi);// LI to P
	if(isEscapseToBody||!dom.isList(headList.parentNode)){paras=paras.map(function(para){return dom.replace(para,'P');});}$.each(list.from(paras).reverse(),function(idx,para){dom.insertAfter(para,headList);});// remove empty lists
	var rootLists=list.compact([headList,middleList,lastList]);$.each(rootLists,function(idx,rootList){var listNodes=[rootList].concat(dom.listDescendant(rootList,dom.isList));$.each(listNodes.reverse(),function(idx,listNode){if(!dom.nodeLength(listNode)){dom.remove(listNode,true);}});});releasedParas=releasedParas.concat(paras);});return releasedParas;};};/**
	     * @class editing.Typing
	     *
	     * Typing
	     *
	     */var Typing=function Typing(){// a Bullet instance to toggle lists off
	var bullet=new Bullet();/**
	         * insert tab
	         *
	         * @param {jQuery} $editable
	         * @param {WrappedRange} rng
	         * @param {Number} tabsize
	         */this.insertTab=function($editable,rng,tabsize){var tab=dom.createText(new Array(tabsize+1).join(dom.NBSP_CHAR));rng=rng.deleteContents();rng.insertNode(tab,true);rng=range.create(tab,tabsize);rng.select();};/**
	         * insert paragraph
	         */this.insertParagraph=function(){var rng=range.create();// deleteContents on range.
	rng=rng.deleteContents();// Wrap range if it needs to be wrapped by paragraph
	rng=rng.wrapBodyInlineWithPara();// finding paragraph
	var splitRoot=dom.ancestor(rng.sc,dom.isPara);var nextPara;// on paragraph: split paragraph
	if(splitRoot){// if it is an empty line with li
	if(dom.isEmpty(splitRoot)&&dom.isLi(splitRoot)){// disable UL/OL and escape!
	bullet.toggleList(splitRoot.parentNode.nodeName);return;// if new line has content (not a line break)
	}else{nextPara=dom.splitTree(splitRoot,rng.getStartPoint());var emptyAnchors=dom.listDescendant(splitRoot,dom.isEmptyAnchor);emptyAnchors=emptyAnchors.concat(dom.listDescendant(nextPara,dom.isEmptyAnchor));$.each(emptyAnchors,function(idx,anchor){dom.remove(anchor);});}// no paragraph: insert empty paragraph
	}else{var next=rng.sc.childNodes[rng.so];nextPara=$(dom.emptyPara)[0];if(next){rng.sc.insertBefore(nextPara,next);}else{rng.sc.appendChild(nextPara);}}range.create(nextPara,0).normalize().select();};};/**
	     * @class editing.Table
	     *
	     * Table
	     *
	     */var Table=function Table(){/**
	         * handle tab key
	         *
	         * @param {WrappedRange} rng
	         * @param {Boolean} isShift
	         */this.tab=function(rng,isShift){var cell=dom.ancestor(rng.commonAncestor(),dom.isCell);var table=dom.ancestor(cell,dom.isTable);var cells=dom.listDescendant(table,dom.isCell);var nextCell=list[isShift?'prev':'next'](cells,cell);if(nextCell){range.create(nextCell,0).select();}};/**
	         * create empty table element
	         *
	         * @param {Number} rowCount
	         * @param {Number} colCount
	         * @return {Node}
	         */this.createTable=function(colCount,rowCount){var tds=[],tdHTML;for(var idxCol=0;idxCol<colCount;idxCol++){tds.push('<td>'+dom.blank+'</td>');}tdHTML=tds.join('');var trs=[],trHTML;for(var idxRow=0;idxRow<rowCount;idxRow++){trs.push('<tr>'+tdHTML+'</tr>');}trHTML=trs.join('');return $('<table class="table table-bordered">'+trHTML+'</table>')[0];};};var KEY_BOGUS='bogus';/**
	     * @class editing.Editor
	     *
	     * Editor
	     *
	     */var Editor=function Editor(handler){var self=this;var style=new Style();var table=new Table();var typing=new Typing();var bullet=new Bullet();/**
	         * @method createRange
	         *
	         * create range
	         *
	         * @param {jQuery} $editable
	         * @return {WrappedRange}
	         */this.createRange=function($editable){this.focus($editable);return range.create();};/**
	         * @method saveRange
	         *
	         * save current range
	         *
	         * @param {jQuery} $editable
	         * @param {Boolean} [thenCollapse=false]
	         */this.saveRange=function($editable,thenCollapse){this.focus($editable);$editable.data('range',range.create());if(thenCollapse){range.create().collapse().select();}};/**
	         * @method saveRange
	         *
	         * save current node list to $editable.data('childNodes')
	         *
	         * @param {jQuery} $editable
	         */this.saveNode=function($editable){// copy child node reference
	var copy=[];for(var key=0,len=$editable[0].childNodes.length;key<len;key++){copy.push($editable[0].childNodes[key]);}$editable.data('childNodes',copy);};/**
	         * @method restoreRange
	         *
	         * restore lately range
	         *
	         * @param {jQuery} $editable
	         */this.restoreRange=function($editable){var rng=$editable.data('range');if(rng){rng.select();this.focus($editable);}};/**
	         * @method restoreNode
	         *
	         * restore lately node list
	         *
	         * @param {jQuery} $editable
	         */this.restoreNode=function($editable){$editable.html('');var child=$editable.data('childNodes');for(var index=0,len=child.length;index<len;index++){$editable[0].appendChild(child[index]);}};/**
	         * @method currentStyle
	         *
	         * current style
	         *
	         * @param {Node} target
	         * @return {Object|Boolean} unfocus
	         */this.currentStyle=function(target){var rng=range.create();var styleInfo=rng&&rng.isOnEditable()?style.current(rng.normalize()):{};if(dom.isImg(target)){styleInfo.image=target;}return styleInfo;};/**
	         * style from node
	         *
	         * @param {jQuery} $node
	         * @return {Object}
	         */this.styleFromNode=function($node){return style.fromNode($node);};var triggerOnBeforeChange=function triggerOnBeforeChange($editable){var $holder=dom.makeLayoutInfo($editable).holder();handler.bindCustomEvent($holder,$editable.data('callbacks'),'before.command')($editable.html(),$editable);};var triggerOnChange=function triggerOnChange($editable){var $holder=dom.makeLayoutInfo($editable).holder();handler.bindCustomEvent($holder,$editable.data('callbacks'),'change')($editable.html(),$editable);};/**
	         * @method undo
	         * undo
	         * @param {jQuery} $editable
	         */this.undo=function($editable){triggerOnBeforeChange($editable);$editable.data('NoteHistory').undo();triggerOnChange($editable);};/**
	         * @method redo
	         * redo
	         * @param {jQuery} $editable
	         */this.redo=function($editable){triggerOnBeforeChange($editable);$editable.data('NoteHistory').redo();triggerOnChange($editable);};/**
	         * @method beforeCommand
	         * before command
	         * @param {jQuery} $editable
	         */var beforeCommand=this.beforeCommand=function($editable){triggerOnBeforeChange($editable);// keep focus on editable before command execution
	self.focus($editable);};/**
	         * @method afterCommand
	         * after command
	         * @param {jQuery} $editable
	         * @param {Boolean} isPreventTrigger
	         */var afterCommand=this.afterCommand=function($editable,isPreventTrigger){$editable.data('NoteHistory').recordUndo();if(!isPreventTrigger){triggerOnChange($editable);}};/**
	         * @method bold
	         * @param {jQuery} $editable
	         * @param {Mixed} value
	         *//**
	         * @method italic
	         * @param {jQuery} $editable
	         * @param {Mixed} value
	         *//**
	         * @method underline
	         * @param {jQuery} $editable
	         * @param {Mixed} value
	         *//**
	         * @method strikethrough
	         * @param {jQuery} $editable
	         * @param {Mixed} value
	         *//**
	         * @method formatBlock
	         * @param {jQuery} $editable
	         * @param {Mixed} value
	         *//**
	         * @method superscript
	         * @param {jQuery} $editable
	         * @param {Mixed} value
	         *//**
	         * @method subscript
	         * @param {jQuery} $editable
	         * @param {Mixed} value
	         *//**
	         * @method justifyLeft
	         * @param {jQuery} $editable
	         * @param {Mixed} value
	         *//**
	         * @method justifyCenter
	         * @param {jQuery} $editable
	         * @param {Mixed} value
	         *//**
	         * @method justifyRight
	         * @param {jQuery} $editable
	         * @param {Mixed} value
	         *//**
	         * @method justifyFull
	         * @param {jQuery} $editable
	         * @param {Mixed} value
	         *//**
	         * @method formatBlock
	         * @param {jQuery} $editable
	         * @param {Mixed} value
	         *//**
	         * @method removeFormat
	         * @param {jQuery} $editable
	         * @param {Mixed} value
	         *//**
	         * @method backColor
	         * @param {jQuery} $editable
	         * @param {Mixed} value
	         *//**
	         * @method foreColor
	         * @param {jQuery} $editable
	         * @param {Mixed} value
	         *//**
	         * @method insertHorizontalRule
	         * @param {jQuery} $editable
	         * @param {Mixed} value
	         *//**
	         * @method fontName
	         *
	         * change font name
	         *
	         * @param {jQuery} $editable
	         * @param {Mixed} value
	         *//* jshint ignore:start */// native commands(with execCommand), generate function for execCommand
	var commands=['bold','italic','underline','strikethrough','superscript','subscript','justifyLeft','justifyCenter','justifyRight','justifyFull','formatBlock','removeFormat','backColor','foreColor','fontName'];for(var idx=0,len=commands.length;idx<len;idx++){this[commands[idx]]=function(sCmd){return function($editable,value){beforeCommand($editable);document.execCommand(sCmd,false,value);afterCommand($editable,true);};}(commands[idx]);}/* jshint ignore:end *//**
	         * @method tab
	         *
	         * handle tab key
	         *
	         * @param {jQuery} $editable
	         * @param {Object} options
	         */this.tab=function($editable,options){var rng=this.createRange($editable);if(rng.isCollapsed()&&rng.isOnCell()){table.tab(rng);}else{beforeCommand($editable);typing.insertTab($editable,rng,options.tabsize);afterCommand($editable);}};/**
	         * @method untab
	         *
	         * handle shift+tab key
	         *
	         */this.untab=function($editable){var rng=this.createRange($editable);if(rng.isCollapsed()&&rng.isOnCell()){table.tab(rng,true);}};/**
	         * @method insertParagraph
	         *
	         * insert paragraph
	         *
	         * @param {Node} $editable
	         */this.insertParagraph=function($editable){beforeCommand($editable);typing.insertParagraph($editable);afterCommand($editable);};/**
	         * @method insertOrderedList
	         *
	         * @param {jQuery} $editable
	         */this.insertOrderedList=function($editable){beforeCommand($editable);bullet.insertOrderedList($editable);afterCommand($editable);};/**
	         * @param {jQuery} $editable
	         */this.insertUnorderedList=function($editable){beforeCommand($editable);bullet.insertUnorderedList($editable);afterCommand($editable);};/**
	         * @param {jQuery} $editable
	         */this.indent=function($editable){beforeCommand($editable);bullet.indent($editable);afterCommand($editable);};/**
	         * @param {jQuery} $editable
	         */this.outdent=function($editable){beforeCommand($editable);bullet.outdent($editable);afterCommand($editable);};/**
	         * insert image
	         *
	         * @param {jQuery} $editable
	         * @param {String} sUrl
	         */this.insertImage=function($editable,sUrl,filename){async.createImage(sUrl,filename).then(function($image){beforeCommand($editable);$image.css({display:'',width:Math.min($editable.width(),$image.width())});range.create().insertNode($image[0]);range.createFromNodeAfter($image[0]).select();afterCommand($editable);}).fail(function(){var $holder=dom.makeLayoutInfo($editable).holder();handler.bindCustomEvent($holder,$editable.data('callbacks'),'image.upload.error')();});};/**
	         * @method insertNode
	         * insert node
	         * @param {Node} $editable
	         * @param {Node} node
	         */this.insertNode=function($editable,node){beforeCommand($editable);range.create().insertNode(node);range.createFromNodeAfter(node).select();afterCommand($editable);};/**
	         * insert text
	         * @param {Node} $editable
	         * @param {String} text
	         */this.insertText=function($editable,text){beforeCommand($editable);var textNode=range.create().insertNode(dom.createText(text));range.create(textNode,dom.nodeLength(textNode)).select();afterCommand($editable);};/**
	         * paste HTML
	         * @param {Node} $editable
	         * @param {String} markup
	         */this.pasteHTML=function($editable,markup){beforeCommand($editable);var contents=range.create().pasteHTML(markup);range.createFromNodeAfter(list.last(contents)).select();afterCommand($editable);};/**
	         * formatBlock
	         *
	         * @param {jQuery} $editable
	         * @param {String} tagName
	         */this.formatBlock=function($editable,tagName){beforeCommand($editable);// [workaround] for MSIE, IE need `<`
	tagName=agent.isMSIE?'<'+tagName+'>':tagName;document.execCommand('FormatBlock',false,tagName);afterCommand($editable);};this.formatPara=function($editable){beforeCommand($editable);this.formatBlock($editable,'P');afterCommand($editable);};/* jshint ignore:start */for(var idx=1;idx<=6;idx++){this['formatH'+idx]=function(idx){return function($editable){this.formatBlock($editable,'H'+idx);};}(idx);};/* jshint ignore:end *//**
	         * fontSize
	         *
	         * @param {jQuery} $editable
	         * @param {String} value - px
	         */this.fontSize=function($editable,value){var rng=range.create();if(rng.isCollapsed()){var spans=style.styleNodes(rng);var firstSpan=list.head(spans);$(spans).css({'font-size':value+'px'});// [workaround] added styled bogus span for style
	//  - also bogus character needed for cursor position
	if(firstSpan&&!dom.nodeLength(firstSpan)){firstSpan.innerHTML=dom.ZERO_WIDTH_NBSP_CHAR;range.createFromNodeAfter(firstSpan.firstChild).select();$editable.data(KEY_BOGUS,firstSpan);}}else{beforeCommand($editable);$(style.styleNodes(rng)).css({'font-size':value+'px'});afterCommand($editable);}};/**
	         * insert horizontal rule
	         * @param {jQuery} $editable
	         */this.insertHorizontalRule=function($editable){beforeCommand($editable);var rng=range.create();var hrNode=rng.insertNode($('<HR/>')[0]);if(hrNode.nextSibling){range.create(hrNode.nextSibling,0).normalize().select();}afterCommand($editable);};/**
	         * remove bogus node and character
	         */this.removeBogus=function($editable){var bogusNode=$editable.data(KEY_BOGUS);if(!bogusNode){return;}var textNode=list.find(list.from(bogusNode.childNodes),dom.isText);var bogusCharIdx=textNode.nodeValue.indexOf(dom.ZERO_WIDTH_NBSP_CHAR);if(bogusCharIdx!==-1){textNode.deleteData(bogusCharIdx,1);}if(dom.isEmpty(bogusNode)){dom.remove(bogusNode);}$editable.removeData(KEY_BOGUS);};/**
	         * lineHeight
	         * @param {jQuery} $editable
	         * @param {String} value
	         */this.lineHeight=function($editable,value){beforeCommand($editable);style.stylePara(range.create(),{lineHeight:value});afterCommand($editable);};/**
	         * unlink
	         *
	         * @type command
	         *
	         * @param {jQuery} $editable
	         */this.unlink=function($editable){var rng=this.createRange($editable);if(rng.isOnAnchor()){var anchor=dom.ancestor(rng.sc,dom.isAnchor);rng=range.createFromNode(anchor);rng.select();beforeCommand($editable);document.execCommand('unlink');afterCommand($editable);}};/**
	         * create link (command)
	         *
	         * @param {jQuery} $editable
	         * @param {Object} linkInfo
	         * @param {Object} options
	         */this.createLink=function($editable,linkInfo,options){var linkUrl=linkInfo.url;var linkText=linkInfo.text;var isNewWindow=linkInfo.isNewWindow;var rng=linkInfo.range||this.createRange($editable);var isTextChanged=rng.toString()!==linkText;options=options||dom.makeLayoutInfo($editable).editor().data('options');beforeCommand($editable);if(options.onCreateLink){linkUrl=options.onCreateLink(linkUrl);}var anchors=[];if(isTextChanged){// Create a new link when text changed.
	var anchor=rng.insertNode($('<A>'+linkText+'</A>')[0]);anchors.push(anchor);}else{anchors=style.styleNodes(rng,{nodeName:'A',expandClosestSibling:true,onlyPartialContains:true});}$.each(anchors,function(idx,anchor){$(anchor).attr('href',linkUrl);if(isNewWindow){$(anchor).attr('target','_blank');}else{$(anchor).removeAttr('target');}});var startRange=range.createFromNodeBefore(list.head(anchors));var startPoint=startRange.getStartPoint();var endRange=range.createFromNodeAfter(list.last(anchors));var endPoint=endRange.getEndPoint();range.create(startPoint.node,startPoint.offset,endPoint.node,endPoint.offset).select();afterCommand($editable);};/**
	         * returns link info
	         *
	         * @return {Object}
	         * @return {WrappedRange} return.range
	         * @return {String} return.text
	         * @return {Boolean} [return.isNewWindow=true]
	         * @return {String} [return.url=""]
	         */this.getLinkInfo=function($editable){this.focus($editable);var rng=range.create().expand(dom.isAnchor);// Get the first anchor on range(for edit).
	var $anchor=$(list.head(rng.nodes(dom.isAnchor)));return{range:rng,text:rng.toString(),isNewWindow:$anchor.length?$anchor.attr('target')==='_blank':false,url:$anchor.length?$anchor.attr('href'):''};};/**
	         * setting color
	         *
	         * @param {Node} $editable
	         * @param {Object} sObjColor  color code
	         * @param {String} sObjColor.foreColor foreground color
	         * @param {String} sObjColor.backColor background color
	         */this.color=function($editable,sObjColor){var oColor=JSON.parse(sObjColor);var foreColor=oColor.foreColor,backColor=oColor.backColor;beforeCommand($editable);if(foreColor){document.execCommand('foreColor',false,foreColor);}if(backColor){document.execCommand('backColor',false,backColor);}afterCommand($editable);};/**
	         * insert Table
	         *
	         * @param {Node} $editable
	         * @param {String} sDim dimension of table (ex : "5x5")
	         */this.insertTable=function($editable,sDim){var dimension=sDim.split('x');beforeCommand($editable);var rng=range.create().deleteContents();rng.insertNode(table.createTable(dimension[0],dimension[1]));afterCommand($editable);};/**
	         * float me
	         *
	         * @param {jQuery} $editable
	         * @param {String} value
	         * @param {jQuery} $target
	         */this.floatMe=function($editable,value,$target){beforeCommand($editable);// bootstrap
	$target.removeClass('pull-left pull-right');if(value&&value!=='none'){$target.addClass('pull-'+value);}// fallback for non-bootstrap
	$target.css('float',value);afterCommand($editable);};/**
	         * change image shape
	         *
	         * @param {jQuery} $editable
	         * @param {String} value css class
	         * @param {Node} $target
	         */this.imageShape=function($editable,value,$target){beforeCommand($editable);$target.removeClass('img-rounded img-circle img-thumbnail');if(value){$target.addClass(value);}afterCommand($editable);};/**
	         * resize overlay element
	         * @param {jQuery} $editable
	         * @param {String} value
	         * @param {jQuery} $target - target element
	         */this.resize=function($editable,value,$target){beforeCommand($editable);$target.css({width:value*100+'%',height:''});afterCommand($editable);};/**
	         * @param {Position} pos
	         * @param {jQuery} $target - target element
	         * @param {Boolean} [bKeepRatio] - keep ratio
	         */this.resizeTo=function(pos,$target,bKeepRatio){var imageSize;if(bKeepRatio){var newRatio=pos.y/pos.x;var ratio=$target.data('ratio');imageSize={width:ratio>newRatio?pos.x:pos.y/ratio,height:ratio>newRatio?pos.x*ratio:pos.y};}else{imageSize={width:pos.x,height:pos.y};}$target.css(imageSize);};/**
	         * remove media object
	         *
	         * @param {jQuery} $editable
	         * @param {String} value - dummy argument (for keep interface)
	         * @param {jQuery} $target - target element
	         */this.removeMedia=function($editable,value,$target){beforeCommand($editable);$target.detach();handler.bindCustomEvent($(),$editable.data('callbacks'),'media.delete')($target,$editable);afterCommand($editable);};/**
	         * set focus
	         *
	         * @param $editable
	         */this.focus=function($editable){$editable.focus();// [workaround] for firefox bug http://goo.gl/lVfAaI
	if(agent.isFF&&!range.create().isOnEditable()){range.createFromNode($editable[0]).normalize().collapse().select();}};/**
	         * returns whether contents is empty or not.
	         *
	         * @param {jQuery} $editable
	         * @return {Boolean}
	         */this.isEmpty=function($editable){return dom.isEmpty($editable[0])||dom.emptyPara===$editable.html();};};/**
	     * @class module.Button
	     *
	     * Button
	     */var Button=function Button(){/**
	         * update button status
	         *
	         * @param {jQuery} $container
	         * @param {Object} styleInfo
	         */this.update=function($container,styleInfo){/**
	             * handle dropdown's check mark (for fontname, fontsize, lineHeight).
	             * @param {jQuery} $btn
	             * @param {Number} value
	             */var checkDropdownMenu=function checkDropdownMenu($btn,value){$btn.find('.dropdown-menu li a').each(function(){// always compare string to avoid creating another func.
	var isChecked=$(this).data('value')+''===value+'';this.className=isChecked?'checked':'';});};/**
	             * update button state(active or not).
	             *
	             * @private
	             * @param {String} selector
	             * @param {Function} pred
	             */var btnState=function btnState(selector,pred){var $btn=$container.find(selector);$btn.toggleClass('active',pred());};if(styleInfo.image){var $img=$(styleInfo.image);btnState('button[data-event="imageShape"][data-value="img-rounded"]',function(){return $img.hasClass('img-rounded');});btnState('button[data-event="imageShape"][data-value="img-circle"]',function(){return $img.hasClass('img-circle');});btnState('button[data-event="imageShape"][data-value="img-thumbnail"]',function(){return $img.hasClass('img-thumbnail');});btnState('button[data-event="imageShape"]:not([data-value])',function(){return!$img.is('.img-rounded, .img-circle, .img-thumbnail');});var imgFloat=$img.css('float');btnState('button[data-event="floatMe"][data-value="left"]',function(){return imgFloat==='left';});btnState('button[data-event="floatMe"][data-value="right"]',function(){return imgFloat==='right';});btnState('button[data-event="floatMe"][data-value="none"]',function(){return imgFloat!=='left'&&imgFloat!=='right';});var style=$img.attr('style');btnState('button[data-event="resize"][data-value="1"]',function(){return!!/(^|\s)(max-)?width\s*:\s*100%/.test(style);});btnState('button[data-event="resize"][data-value="0.5"]',function(){return!!/(^|\s)(max-)?width\s*:\s*50%/.test(style);});btnState('button[data-event="resize"][data-value="0.25"]',function(){return!!/(^|\s)(max-)?width\s*:\s*25%/.test(style);});return;}// fontname
	var $fontname=$container.find('.note-fontname');if($fontname.length){var selectedFont=styleInfo['font-family'];if(!!selectedFont){var list=selectedFont.split(',');for(var i=0,len=list.length;i<len;i++){selectedFont=list[i].replace(/[\'\"]/g,'').replace(/\s+$/,'').replace(/^\s+/,'');if(agent.isFontInstalled(selectedFont)){break;}}$fontname.find('.note-current-fontname').text(selectedFont);checkDropdownMenu($fontname,selectedFont);}}// fontsize
	var $fontsize=$container.find('.note-fontsize');$fontsize.find('.note-current-fontsize').text(styleInfo['font-size']);checkDropdownMenu($fontsize,parseFloat(styleInfo['font-size']));// lineheight
	var $lineHeight=$container.find('.note-height');checkDropdownMenu($lineHeight,parseFloat(styleInfo['line-height']));btnState('button[data-event="bold"]',function(){return styleInfo['font-bold']==='bold';});btnState('button[data-event="italic"]',function(){return styleInfo['font-italic']==='italic';});btnState('button[data-event="underline"]',function(){return styleInfo['font-underline']==='underline';});btnState('button[data-event="strikethrough"]',function(){return styleInfo['font-strikethrough']==='strikethrough';});btnState('button[data-event="superscript"]',function(){return styleInfo['font-superscript']==='superscript';});btnState('button[data-event="subscript"]',function(){return styleInfo['font-subscript']==='subscript';});btnState('button[data-event="justifyLeft"]',function(){return styleInfo['text-align']==='left'||styleInfo['text-align']==='start';});btnState('button[data-event="justifyCenter"]',function(){return styleInfo['text-align']==='center';});btnState('button[data-event="justifyRight"]',function(){return styleInfo['text-align']==='right';});btnState('button[data-event="justifyFull"]',function(){return styleInfo['text-align']==='justify';});btnState('button[data-event="insertUnorderedList"]',function(){return styleInfo['list-style']==='unordered';});btnState('button[data-event="insertOrderedList"]',function(){return styleInfo['list-style']==='ordered';});};/**
	         * update recent color
	         *
	         * @param {Node} button
	         * @param {String} eventName
	         * @param {Mixed} value
	         */this.updateRecentColor=function(button,eventName,value){var $color=$(button).closest('.note-color');var $recentColor=$color.find('.note-recent-color');var colorInfo=JSON.parse($recentColor.attr('data-value'));colorInfo[eventName]=value;$recentColor.attr('data-value',JSON.stringify(colorInfo));var sKey=eventName==='backColor'?'background-color':'color';$recentColor.find('i').css(sKey,value);};};/**
	     * @class module.Toolbar
	     *
	     * Toolbar
	     */var Toolbar=function Toolbar(){var button=new Button();this.update=function($toolbar,styleInfo){button.update($toolbar,styleInfo);};/**
	         * @param {Node} button
	         * @param {String} eventName
	         * @param {String} value
	         */this.updateRecentColor=function(buttonNode,eventName,value){button.updateRecentColor(buttonNode,eventName,value);};/**
	         * activate buttons exclude codeview
	         * @param {jQuery} $toolbar
	         */this.activate=function($toolbar){$toolbar.find('button').not('button[data-event="codeview"]').removeClass('disabled');};/**
	         * deactivate buttons exclude codeview
	         * @param {jQuery} $toolbar
	         */this.deactivate=function($toolbar){$toolbar.find('button').not('button[data-event="codeview"]').addClass('disabled');};/**
	         * @param {jQuery} $container
	         * @param {Boolean} [bFullscreen=false]
	         */this.updateFullscreen=function($container,bFullscreen){var $btn=$container.find('button[data-event="fullscreen"]');$btn.toggleClass('active',bFullscreen);};/**
	         * @param {jQuery} $container
	         * @param {Boolean} [isCodeview=false]
	         */this.updateCodeview=function($container,isCodeview){var $btn=$container.find('button[data-event="codeview"]');$btn.toggleClass('active',isCodeview);if(isCodeview){this.deactivate($container);}else{this.activate($container);}};/**
	         * get button in toolbar
	         *
	         * @param {jQuery} $editable
	         * @param {String} name
	         * @return {jQuery}
	         */this.get=function($editable,name){var $toolbar=dom.makeLayoutInfo($editable).toolbar();return $toolbar.find('[data-name='+name+']');};/**
	         * set button state
	         * @param {jQuery} $editable
	         * @param {String} name
	         * @param {Boolean} [isActive=true]
	         */this.setButtonState=function($editable,name,isActive){isActive=isActive===false?false:true;var $button=this.get($editable,name);$button.toggleClass('active',isActive);};};var EDITABLE_PADDING=24;var Statusbar=function Statusbar(){var $document=$(document);this.attach=function(layoutInfo,options){if(!options.disableResizeEditor){layoutInfo.statusbar().on('mousedown',hStatusbarMousedown);}};/**
	         * `mousedown` event handler on statusbar
	         *
	         * @param {MouseEvent} event
	         */var hStatusbarMousedown=function hStatusbarMousedown(event){event.preventDefault();event.stopPropagation();var $editable=dom.makeLayoutInfo(event.target).editable();var editableTop=$editable.offset().top-$document.scrollTop();var layoutInfo=dom.makeLayoutInfo(event.currentTarget||event.target);var options=layoutInfo.editor().data('options');$document.on('mousemove',function(event){var nHeight=event.clientY-(editableTop+EDITABLE_PADDING);nHeight=options.minHeight>0?Math.max(nHeight,options.minHeight):nHeight;nHeight=options.maxHeight>0?Math.min(nHeight,options.maxHeight):nHeight;$editable.height(nHeight);}).one('mouseup',function(){$document.off('mousemove');});};};/**
	     * @class module.Popover
	     *
	     * Popover (http://getbootstrap.com/javascript/#popovers)
	     *
	     */var Popover=function Popover(){var button=new Button();/**
	         * returns position from placeholder
	         *
	         * @private
	         * @param {Node} placeholder
	         * @param {Object} options
	         * @param {Boolean} options.isAirMode
	         * @return {Position}
	         */var posFromPlaceholder=function posFromPlaceholder(placeholder,options){var isAirMode=options&&options.isAirMode;var isLeftTop=options&&options.isLeftTop;var $placeholder=$(placeholder);var pos=isAirMode?$placeholder.offset():$placeholder.position();var height=isLeftTop?0:$placeholder.outerHeight(true);// include margin
	// popover below placeholder.
	return{left:pos.left,top:pos.top+height};};/**
	         * show popover
	         *
	         * @private
	         * @param {jQuery} popover
	         * @param {Position} pos
	         */var showPopover=function showPopover($popover,pos){$popover.css({display:'block',left:pos.left,top:pos.top});};var PX_POPOVER_ARROW_OFFSET_X=20;/**
	         * update current state
	         * @param {jQuery} $popover - popover container
	         * @param {Object} styleInfo - style object
	         * @param {Boolean} isAirMode
	         */this.update=function($popover,styleInfo,isAirMode){button.update($popover,styleInfo);var $linkPopover=$popover.find('.note-link-popover');if(styleInfo.anchor){var $anchor=$linkPopover.find('a');var href=$(styleInfo.anchor).attr('href');var target=$(styleInfo.anchor).attr('target');$anchor.attr('href',href).html(href);if(!target){$anchor.removeAttr('target');}else{$anchor.attr('target','_blank');}showPopover($linkPopover,posFromPlaceholder(styleInfo.anchor,{isAirMode:isAirMode}));}else{$linkPopover.hide();}var $imagePopover=$popover.find('.note-image-popover');if(styleInfo.image){showPopover($imagePopover,posFromPlaceholder(styleInfo.image,{isAirMode:isAirMode,isLeftTop:true}));}else{$imagePopover.hide();}var $airPopover=$popover.find('.note-air-popover');if(isAirMode&&styleInfo.range&&!styleInfo.range.isCollapsed()){var rect=list.last(styleInfo.range.getClientRects());if(rect){var bnd=func.rect2bnd(rect);showPopover($airPopover,{left:Math.max(bnd.left+bnd.width/2-PX_POPOVER_ARROW_OFFSET_X,0),top:bnd.top+bnd.height});}}else{$airPopover.hide();}};/**
	         * @param {Node} button
	         * @param {String} eventName
	         * @param {String} value
	         */this.updateRecentColor=function(button,eventName,value){button.updateRecentColor(button,eventName,value);};/**
	         * hide all popovers
	         * @param {jQuery} $popover - popover container
	         */this.hide=function($popover){$popover.children().hide();};};/**
	     * @class module.Handle
	     *
	     * Handle
	     */var Handle=function Handle(handler){var $document=$(document);/**
	         * `mousedown` event handler on $handle
	         *  - controlSizing: resize image
	         *
	         * @param {MouseEvent} event
	         */var hHandleMousedown=function hHandleMousedown(event){if(dom.isControlSizing(event.target)){event.preventDefault();event.stopPropagation();var layoutInfo=dom.makeLayoutInfo(event.target),$handle=layoutInfo.handle(),$popover=layoutInfo.popover(),$editable=layoutInfo.editable(),$editor=layoutInfo.editor();var target=$handle.find('.note-control-selection').data('target'),$target=$(target),posStart=$target.offset(),scrollTop=$document.scrollTop();var isAirMode=$editor.data('options').airMode;$document.on('mousemove',function(event){handler.invoke('editor.resizeTo',{x:event.clientX-posStart.left,y:event.clientY-(posStart.top-scrollTop)},$target,!event.shiftKey);handler.invoke('handle.update',$handle,{image:target},isAirMode);handler.invoke('popover.update',$popover,{image:target},isAirMode);}).one('mouseup',function(){$document.off('mousemove');handler.invoke('editor.afterCommand',$editable);});if(!$target.data('ratio')){// original ratio.
	$target.data('ratio',$target.height()/$target.width());}}};this.attach=function(layoutInfo){layoutInfo.handle().on('mousedown',hHandleMousedown);};/**
	         * update handle
	         * @param {jQuery} $handle
	         * @param {Object} styleInfo
	         * @param {Boolean} isAirMode
	         */this.update=function($handle,styleInfo,isAirMode){var $selection=$handle.find('.note-control-selection');if(styleInfo.image){var $image=$(styleInfo.image);var pos=isAirMode?$image.offset():$image.position();// include margin
	var imageSize={w:$image.outerWidth(true),h:$image.outerHeight(true)};$selection.css({display:'block',left:pos.left,top:pos.top,width:imageSize.w,height:imageSize.h}).data('target',styleInfo.image);// save current image element.
	var sizingText=imageSize.w+'x'+imageSize.h;$selection.find('.note-control-selection-info').text(sizingText);}else{$selection.hide();}};/**
	         * hide
	         *
	         * @param {jQuery} $handle
	         */this.hide=function($handle){$handle.children().hide();};};var Fullscreen=function Fullscreen(handler){var $window=$(window);var $scrollbar=$('html, body');/**
	         * toggle fullscreen
	         *
	         * @param {Object} layoutInfo
	         */this.toggle=function(layoutInfo){var $editor=layoutInfo.editor(),$toolbar=layoutInfo.toolbar(),$editable=layoutInfo.editable(),$codable=layoutInfo.codable();var resize=function resize(size){$editable.css('height',size.h);$codable.css('height',size.h);if($codable.data('cmeditor')){$codable.data('cmeditor').setsize(null,size.h);}};$editor.toggleClass('fullscreen');var isFullscreen=$editor.hasClass('fullscreen');if(isFullscreen){$editable.data('orgheight',$editable.css('height'));$window.on('resize',function(){resize({h:$window.height()-$toolbar.outerHeight()});}).trigger('resize');$scrollbar.css('overflow','hidden');}else{$window.off('resize');resize({h:$editable.data('orgheight')});$scrollbar.css('overflow','visible');}handler.invoke('toolbar.updateFullscreen',$toolbar,isFullscreen);};};var CodeMirror;if(agent.hasCodeMirror){CodeMirror=window.CodeMirror;}/**
	     * @class Codeview
	     */var Codeview=function Codeview(handler){this.sync=function(layoutInfo){var isCodeview=handler.invoke('codeview.isActivated',layoutInfo);if(isCodeview&&agent.hasCodeMirror){layoutInfo.codable().data('cmEditor').save();}};/**
	         * @param {Object} layoutInfo
	         * @return {Boolean}
	         */this.isActivated=function(layoutInfo){var $editor=layoutInfo.editor();return $editor.hasClass('codeview');};/**
	         * toggle codeview
	         *
	         * @param {Object} layoutInfo
	         */this.toggle=function(layoutInfo){if(this.isActivated(layoutInfo)){this.deactivate(layoutInfo);}else{this.activate(layoutInfo);}};/**
	         * activate code view
	         *
	         * @param {Object} layoutInfo
	         */this.activate=function(layoutInfo){var $editor=layoutInfo.editor(),$toolbar=layoutInfo.toolbar(),$editable=layoutInfo.editable(),$codable=layoutInfo.codable(),$popover=layoutInfo.popover(),$handle=layoutInfo.handle();var options=$editor.data('options');$codable.val(dom.html($editable,options.prettifyHtml));$codable.height($editable.height());handler.invoke('toolbar.updateCodeview',$toolbar,true);handler.invoke('popover.hide',$popover);handler.invoke('handle.hide',$handle);$editor.addClass('codeview');$codable.focus();// activate CodeMirror as codable
	if(agent.hasCodeMirror){var cmEditor=CodeMirror.fromTextArea($codable[0],options.codemirror);// CodeMirror TernServer
	if(options.codemirror.tern){var server=new CodeMirror.TernServer(options.codemirror.tern);cmEditor.ternServer=server;cmEditor.on('cursorActivity',function(cm){server.updateArgHints(cm);});}// CodeMirror hasn't Padding.
	cmEditor.setSize(null,$editable.outerHeight());$codable.data('cmEditor',cmEditor);}};/**
	         * deactivate code view
	         *
	         * @param {Object} layoutInfo
	         */this.deactivate=function(layoutInfo){var $holder=layoutInfo.holder(),$editor=layoutInfo.editor(),$toolbar=layoutInfo.toolbar(),$editable=layoutInfo.editable(),$codable=layoutInfo.codable();var options=$editor.data('options');// deactivate CodeMirror as codable
	if(agent.hasCodeMirror){var cmEditor=$codable.data('cmEditor');$codable.val(cmEditor.getValue());cmEditor.toTextArea();}var value=dom.value($codable,options.prettifyHtml)||dom.emptyPara;var isChange=$editable.html()!==value;$editable.html(value);$editable.height(options.height?$codable.height():'auto');$editor.removeClass('codeview');if(isChange){handler.bindCustomEvent($holder,$editable.data('callbacks'),'change')($editable.html(),$editable);}$editable.focus();handler.invoke('toolbar.updateCodeview',$toolbar,false);};};var DragAndDrop=function DragAndDrop(handler){var $document=$(document);/**
	         * attach Drag and Drop Events
	         *
	         * @param {Object} layoutInfo - layout Informations
	         * @param {Object} options
	         */this.attach=function(layoutInfo,options){if(options.airMode||options.disableDragAndDrop){// prevent default drop event
	$document.on('drop',function(e){e.preventDefault();});}else{this.attachDragAndDropEvent(layoutInfo,options);}};/**
	         * attach Drag and Drop Events
	         *
	         * @param {Object} layoutInfo - layout Informations
	         * @param {Object} options
	         */this.attachDragAndDropEvent=function(layoutInfo,options){var collection=$(),$editor=layoutInfo.editor(),$dropzone=layoutInfo.dropzone(),$dropzoneMessage=$dropzone.find('.note-dropzone-message');// show dropzone on dragenter when dragging a object to document
	// -but only if the editor is visible, i.e. has a positive width and height
	$document.on('dragenter',function(e){var isCodeview=handler.invoke('codeview.isActivated',layoutInfo);var hasEditorSize=$editor.width()>0&&$editor.height()>0;if(!isCodeview&&!collection.length&&hasEditorSize){$editor.addClass('dragover');$dropzone.width($editor.width());$dropzone.height($editor.height());$dropzoneMessage.text(options.langInfo.image.dragImageHere);}collection=collection.add(e.target);}).on('dragleave',function(e){collection=collection.not(e.target);if(!collection.length){$editor.removeClass('dragover');}}).on('drop',function(){collection=$();$editor.removeClass('dragover');});// change dropzone's message on hover.
	$dropzone.on('dragenter',function(){$dropzone.addClass('hover');$dropzoneMessage.text(options.langInfo.image.dropImage);}).on('dragleave',function(){$dropzone.removeClass('hover');$dropzoneMessage.text(options.langInfo.image.dragImageHere);});// attach dropImage
	$dropzone.on('drop',function(event){var dataTransfer=event.originalEvent.dataTransfer;var layoutInfo=dom.makeLayoutInfo(event.currentTarget||event.target);if(dataTransfer&&dataTransfer.files&&dataTransfer.files.length){event.preventDefault();layoutInfo.editable().focus();handler.insertImages(layoutInfo,dataTransfer.files);}else{var insertNodefunc=function insertNodefunc(){layoutInfo.holder().summernote('insertNode',this);};for(var i=0,len=dataTransfer.types.length;i<len;i++){var type=dataTransfer.types[i];var content=dataTransfer.getData(type);if(type.toLowerCase().indexOf('text')>-1){layoutInfo.holder().summernote('pasteHTML',content);}else{$(content).each(insertNodefunc);}}}}).on('dragover',false);// prevent default dragover event
	};};var Clipboard=function Clipboard(handler){var $paste;this.attach=function(layoutInfo){// [workaround] getting image from clipboard
	//  - IE11 and Firefox: CTRL+v hook
	//  - Webkit: event.clipboardData
	if(agent.isMSIE&&agent.browserVersion>10||agent.isFF){$paste=$('<div />').attr('contenteditable',true).css({position:'absolute',left:-100000,opacity:0});layoutInfo.editable().on('keydown',function(e){if(e.ctrlKey&&e.keyCode===key.code.V){handler.invoke('saveRange',layoutInfo.editable());$paste.focus();setTimeout(function(){pasteByHook(layoutInfo);},0);}});layoutInfo.editable().before($paste);}else{layoutInfo.editable().on('paste',pasteByEvent);}};var pasteByHook=function pasteByHook(layoutInfo){var $editable=layoutInfo.editable();var node=$paste[0].firstChild;if(dom.isImg(node)){var dataURI=node.src;var decodedData=atob(dataURI.split(',')[1]);var array=new Uint8Array(decodedData.length);for(var i=0;i<decodedData.length;i++){array[i]=decodedData.charCodeAt(i);}var blob=new Blob([array],{type:'image/png'});blob.name='clipboard.png';handler.invoke('restoreRange',$editable);handler.invoke('focus',$editable);handler.insertImages(layoutInfo,[blob]);}else{var pasteContent=$('<div />').html($paste.html()).html();handler.invoke('restoreRange',$editable);handler.invoke('focus',$editable);if(pasteContent){handler.invoke('pasteHTML',$editable,pasteContent);}}$paste.empty();};/**
	         * paste by clipboard event
	         *
	         * @param {Event} event
	         */var pasteByEvent=function pasteByEvent(event){var clipboardData=event.originalEvent.clipboardData;var layoutInfo=dom.makeLayoutInfo(event.currentTarget||event.target);var $editable=layoutInfo.editable();if(clipboardData&&clipboardData.items&&clipboardData.items.length){var item=list.head(clipboardData.items);if(item.kind==='file'&&item.type.indexOf('image/')!==-1){handler.insertImages(layoutInfo,[item.getAsFile()]);}handler.invoke('editor.afterCommand',$editable);}};};var LinkDialog=function LinkDialog(handler){/**
	         * toggle button status
	         *
	         * @private
	         * @param {jQuery} $btn
	         * @param {Boolean} isEnable
	         */var toggleBtn=function toggleBtn($btn,isEnable){$btn.toggleClass('disabled',!isEnable);$btn.attr('disabled',!isEnable);};/**
	         * bind enter key
	         *
	         * @private
	         * @param {jQuery} $input
	         * @param {jQuery} $btn
	         */var bindEnterKey=function bindEnterKey($input,$btn){$input.on('keypress',function(event){if(event.keyCode===key.code.ENTER){$btn.trigger('click');}});};/**
	         * Show link dialog and set event handlers on dialog controls.
	         *
	         * @param {jQuery} $editable
	         * @param {jQuery} $dialog
	         * @param {Object} linkInfo
	         * @return {Promise}
	         */this.showLinkDialog=function($editable,$dialog,linkInfo){return $.Deferred(function(deferred){var $linkDialog=$dialog.find('.note-link-dialog');var $linkText=$linkDialog.find('.note-link-text'),$linkUrl=$linkDialog.find('.note-link-url'),$linkBtn=$linkDialog.find('.note-link-btn'),$openInNewWindow=$linkDialog.find('input[type=checkbox]');$linkDialog.one('shown.bs.modal',function(){$linkText.val(linkInfo.text);$linkText.on('input',function(){toggleBtn($linkBtn,$linkText.val()&&$linkUrl.val());// if linktext was modified by keyup,
	// stop cloning text from linkUrl
	linkInfo.text=$linkText.val();});// if no url was given, copy text to url
	if(!linkInfo.url){linkInfo.url=linkInfo.text||'http://';toggleBtn($linkBtn,linkInfo.text);}$linkUrl.on('input',function(){toggleBtn($linkBtn,$linkText.val()&&$linkUrl.val());// display same link on `Text to display` input
	// when create a new link
	if(!linkInfo.text){$linkText.val($linkUrl.val());}}).val(linkInfo.url).trigger('focus').trigger('select');bindEnterKey($linkUrl,$linkBtn);bindEnterKey($linkText,$linkBtn);$openInNewWindow.prop('checked',linkInfo.isNewWindow);$linkBtn.one('click',function(event){event.preventDefault();deferred.resolve({range:linkInfo.range,url:$linkUrl.val(),text:$linkText.val(),isNewWindow:$openInNewWindow.is(':checked')});$linkDialog.modal('hide');});}).one('hidden.bs.modal',function(){// detach events
	$linkText.off('input keypress');$linkUrl.off('input keypress');$linkBtn.off('click');if(deferred.state()==='pending'){deferred.reject();}}).modal('show');}).promise();};/**
	         * @param {Object} layoutInfo
	         */this.show=function(layoutInfo){var $editor=layoutInfo.editor(),$dialog=layoutInfo.dialog(),$editable=layoutInfo.editable(),$popover=layoutInfo.popover(),linkInfo=handler.invoke('editor.getLinkInfo',$editable);var options=$editor.data('options');handler.invoke('editor.saveRange',$editable);this.showLinkDialog($editable,$dialog,linkInfo).then(function(linkInfo){handler.invoke('editor.restoreRange',$editable);handler.invoke('editor.createLink',$editable,linkInfo,options);// hide popover after creating link
	handler.invoke('popover.hide',$popover);}).fail(function(){handler.invoke('editor.restoreRange',$editable);});};};var ImageDialog=function ImageDialog(handler){/**
	         * toggle button status
	         *
	         * @private
	         * @param {jQuery} $btn
	         * @param {Boolean} isEnable
	         */var toggleBtn=function toggleBtn($btn,isEnable){$btn.toggleClass('disabled',!isEnable);$btn.attr('disabled',!isEnable);};/**
	         * bind enter key
	         *
	         * @private
	         * @param {jQuery} $input
	         * @param {jQuery} $btn
	         */var bindEnterKey=function bindEnterKey($input,$btn){$input.on('keypress',function(event){if(event.keyCode===key.code.ENTER){$btn.trigger('click');}});};this.show=function(layoutInfo){var $dialog=layoutInfo.dialog(),$editable=layoutInfo.editable();handler.invoke('editor.saveRange',$editable);this.showImageDialog($editable,$dialog).then(function(data){handler.invoke('editor.restoreRange',$editable);if(typeof data==='string'){// image url
	handler.invoke('editor.insertImage',$editable,data);}else{// array of files
	handler.insertImages(layoutInfo,data);}}).fail(function(){handler.invoke('editor.restoreRange',$editable);});};/**
	         * show image dialog
	         *
	         * @param {jQuery} $editable
	         * @param {jQuery} $dialog
	         * @return {Promise}
	         */this.showImageDialog=function($editable,$dialog){return $.Deferred(function(deferred){var $imageDialog=$dialog.find('.note-image-dialog');var $imageInput=$dialog.find('.note-image-input'),$imageUrl=$dialog.find('.note-image-url'),$imageBtn=$dialog.find('.note-image-btn');$imageDialog.one('shown.bs.modal',function(){// Cloning imageInput to clear element.
	$imageInput.replaceWith($imageInput.clone().on('change',function(){deferred.resolve(this.files||this.value);$imageDialog.modal('hide');}).val(''));$imageBtn.click(function(event){event.preventDefault();deferred.resolve($imageUrl.val());$imageDialog.modal('hide');});$imageUrl.on('keyup paste',function(event){var url;if(event.type==='paste'){url=event.originalEvent.clipboardData.getData('text');}else{url=$imageUrl.val();}toggleBtn($imageBtn,url);}).val('').trigger('focus');bindEnterKey($imageUrl,$imageBtn);}).one('hidden.bs.modal',function(){$imageInput.off('change');$imageUrl.off('keyup paste keypress');$imageBtn.off('click');if(deferred.state()==='pending'){deferred.reject();}}).modal('show');});};};var HelpDialog=function HelpDialog(handler){/**
	         * show help dialog
	         *
	         * @param {jQuery} $editable
	         * @param {jQuery} $dialog
	         * @return {Promise}
	         */this.showHelpDialog=function($editable,$dialog){return $.Deferred(function(deferred){var $helpDialog=$dialog.find('.note-help-dialog');$helpDialog.one('hidden.bs.modal',function(){deferred.resolve();}).modal('show');}).promise();};/**
	         * @param {Object} layoutInfo
	         */this.show=function(layoutInfo){var $dialog=layoutInfo.dialog(),$editable=layoutInfo.editable();handler.invoke('editor.saveRange',$editable,true);this.showHelpDialog($editable,$dialog).then(function(){handler.invoke('editor.restoreRange',$editable);});};};/**
	     * @class EventHandler
	     *
	     * EventHandler
	     *  - TODO: new instance per a editor
	     */var EventHandler=function EventHandler(){var self=this;/**
	         * Modules
	         */var modules=this.modules={editor:new Editor(this),toolbar:new Toolbar(this),statusbar:new Statusbar(this),popover:new Popover(this),handle:new Handle(this),fullscreen:new Fullscreen(this),codeview:new Codeview(this),dragAndDrop:new DragAndDrop(this),clipboard:new Clipboard(this),linkDialog:new LinkDialog(this),imageDialog:new ImageDialog(this),helpDialog:new HelpDialog(this)};/**
	         * invoke module's method
	         *
	         * @param {String} moduleAndMethod - ex) 'editor.redo'
	         * @param {...*} arguments - arguments of method
	         * @return {*}
	         */this.invoke=function(){var moduleAndMethod=list.head(list.from(arguments));var args=list.tail(list.from(arguments));var splits=moduleAndMethod.split('.');var hasSeparator=splits.length>1;var moduleName=hasSeparator&&list.head(splits);var methodName=hasSeparator?list.last(splits):list.head(splits);var module=this.getModule(moduleName);var method=module[methodName];return method&&method.apply(module,args);};/**
	         * returns module
	         *
	         * @param {String} moduleName - name of module
	         * @return {Module} - defaults is editor
	         */this.getModule=function(moduleName){return this.modules[moduleName]||this.modules.editor;};/**
	         * @param {jQuery} $holder
	         * @param {Object} callbacks
	         * @param {String} eventNamespace
	         * @returns {Function}
	         */var bindCustomEvent=this.bindCustomEvent=function($holder,callbacks,eventNamespace){return function(){var callback=callbacks[func.namespaceToCamel(eventNamespace,'on')];if(callback){callback.apply($holder[0],arguments);}return $holder.trigger('summernote.'+eventNamespace,arguments);};};/**
	         * insert Images from file array.
	         *
	         * @private
	         * @param {Object} layoutInfo
	         * @param {File[]} files
	         */this.insertImages=function(layoutInfo,files){var $editor=layoutInfo.editor(),$editable=layoutInfo.editable(),$holder=layoutInfo.holder();var callbacks=$editable.data('callbacks');var options=$editor.data('options');// If onImageUpload options setted
	if(callbacks.onImageUpload){bindCustomEvent($holder,callbacks,'image.upload')(files);// else insert Image as dataURL
	}else{$.each(files,function(idx,file){var filename=file.name;if(options.maximumImageFileSize&&options.maximumImageFileSize<file.size){bindCustomEvent($holder,callbacks,'image.upload.error')(options.langInfo.image.maximumFileSizeError);}else{async.readFileAsDataURL(file).then(function(sDataURL){modules.editor.insertImage($editable,sDataURL,filename);}).fail(function(){bindCustomEvent($holder,callbacks,'image.upload.error')(options.langInfo.image.maximumFileSizeError);});}});}};var commands={/**
	             * @param {Object} layoutInfo
	             */showLinkDialog:function showLinkDialog(layoutInfo){modules.linkDialog.show(layoutInfo);},/**
	             * @param {Object} layoutInfo
	             */showImageDialog:function showImageDialog(layoutInfo){modules.imageDialog.show(layoutInfo);},/**
	             * @param {Object} layoutInfo
	             */showHelpDialog:function showHelpDialog(layoutInfo){modules.helpDialog.show(layoutInfo);},/**
	             * @param {Object} layoutInfo
	             */fullscreen:function fullscreen(layoutInfo){modules.fullscreen.toggle(layoutInfo);},/**
	             * @param {Object} layoutInfo
	             */codeview:function codeview(layoutInfo){modules.codeview.toggle(layoutInfo);}};var hMousedown=function hMousedown(event){//preventDefault Selection for FF, IE8+
	if(dom.isImg(event.target)){event.preventDefault();}};var hKeyupAndMouseup=function hKeyupAndMouseup(event){var layoutInfo=dom.makeLayoutInfo(event.currentTarget||event.target);modules.editor.removeBogus(layoutInfo.editable());hToolbarAndPopoverUpdate(event);};/**
	         * update sytle info
	         * @param {Object} styleInfo
	         * @param {Object} layoutInfo
	         */this.updateStyleInfo=function(styleInfo,layoutInfo){if(!styleInfo){return;}var isAirMode=layoutInfo.editor().data('options').airMode;if(!isAirMode){modules.toolbar.update(layoutInfo.toolbar(),styleInfo);}modules.popover.update(layoutInfo.popover(),styleInfo,isAirMode);modules.handle.update(layoutInfo.handle(),styleInfo,isAirMode);};var hToolbarAndPopoverUpdate=function hToolbarAndPopoverUpdate(event){var target=event.target;// delay for range after mouseup
	setTimeout(function(){var layoutInfo=dom.makeLayoutInfo(target);var styleInfo=modules.editor.currentStyle(target);self.updateStyleInfo(styleInfo,layoutInfo);},0);};var hScroll=function hScroll(event){var layoutInfo=dom.makeLayoutInfo(event.currentTarget||event.target);//hide popover and handle when scrolled
	modules.popover.hide(layoutInfo.popover());modules.handle.hide(layoutInfo.handle());};var hToolbarAndPopoverMousedown=function hToolbarAndPopoverMousedown(event){// prevent default event when insertTable (FF, Webkit)
	var $btn=$(event.target).closest('[data-event]');if($btn.length){event.preventDefault();}};var hToolbarAndPopoverClick=function hToolbarAndPopoverClick(event){var $btn=$(event.target).closest('[data-event]');if(!$btn.length){return;}var eventName=$btn.attr('data-event'),value=$btn.attr('data-value'),hide=$btn.attr('data-hide');var layoutInfo=dom.makeLayoutInfo(event.target);// before command: detect control selection element($target)
	var $target;if($.inArray(eventName,['resize','floatMe','removeMedia','imageShape'])!==-1){var $selection=layoutInfo.handle().find('.note-control-selection');$target=$($selection.data('target'));}// If requested, hide the popover when the button is clicked.
	// Useful for things like showHelpDialog.
	if(hide){$btn.parents('.popover').hide();}if($.isFunction($.summernote.pluginEvents[eventName])){$.summernote.pluginEvents[eventName](event,modules.editor,layoutInfo,value);}else if(modules.editor[eventName]){// on command
	var $editable=layoutInfo.editable();$editable.focus();modules.editor[eventName]($editable,value,$target);event.preventDefault();}else if(commands[eventName]){commands[eventName].call(this,layoutInfo);event.preventDefault();}// after command
	if($.inArray(eventName,['backColor','foreColor'])!==-1){var options=layoutInfo.editor().data('options',options);var module=options.airMode?modules.popover:modules.toolbar;module.updateRecentColor(list.head($btn),eventName,value);}hToolbarAndPopoverUpdate(event);};var PX_PER_EM=18;var hDimensionPickerMove=function hDimensionPickerMove(event,options){var $picker=$(event.target.parentNode);// target is mousecatcher
	var $dimensionDisplay=$picker.next();var $catcher=$picker.find('.note-dimension-picker-mousecatcher');var $highlighted=$picker.find('.note-dimension-picker-highlighted');var $unhighlighted=$picker.find('.note-dimension-picker-unhighlighted');var posOffset;// HTML5 with jQuery - e.offsetX is undefined in Firefox
	if(event.offsetX===undefined){var posCatcher=$(event.target).offset();posOffset={x:event.pageX-posCatcher.left,y:event.pageY-posCatcher.top};}else{posOffset={x:event.offsetX,y:event.offsetY};}var dim={c:Math.ceil(posOffset.x/PX_PER_EM)||1,r:Math.ceil(posOffset.y/PX_PER_EM)||1};$highlighted.css({width:dim.c+'em',height:dim.r+'em'});$catcher.attr('data-value',dim.c+'x'+dim.r);if(3<dim.c&&dim.c<options.insertTableMaxSize.col){$unhighlighted.css({width:dim.c+1+'em'});}if(3<dim.r&&dim.r<options.insertTableMaxSize.row){$unhighlighted.css({height:dim.r+1+'em'});}$dimensionDisplay.html(dim.c+' x '+dim.r);};/**
	         * bind KeyMap on keydown
	         *
	         * @param {Object} layoutInfo
	         * @param {Object} keyMap
	         */this.bindKeyMap=function(layoutInfo,keyMap){var $editor=layoutInfo.editor();var $editable=layoutInfo.editable();$editable.on('keydown',function(event){var keys=[];// modifier
	if(event.metaKey){keys.push('CMD');}if(event.ctrlKey&&!event.altKey){keys.push('CTRL');}if(event.shiftKey){keys.push('SHIFT');}// keycode
	var keyName=key.nameFromCode[event.keyCode];if(keyName){keys.push(keyName);}var pluginEvent;var keyString=keys.join('+');var eventName=keyMap[keyString];if(eventName){// FIXME Summernote doesn't support event pipeline yet.
	//  - Plugin -> Base Code
	pluginEvent=$.summernote.pluginEvents[keyString];if($.isFunction(pluginEvent)){if(pluginEvent(event,modules.editor,layoutInfo)){return false;}}pluginEvent=$.summernote.pluginEvents[eventName];if($.isFunction(pluginEvent)){pluginEvent(event,modules.editor,layoutInfo);}else if(modules.editor[eventName]){modules.editor[eventName]($editable,$editor.data('options'));event.preventDefault();}else if(commands[eventName]){commands[eventName].call(this,layoutInfo);event.preventDefault();}}else if(key.isEdit(event.keyCode)){modules.editor.afterCommand($editable);}});};/**
	         * attach eventhandler
	         *
	         * @param {Object} layoutInfo - layout Informations
	         * @param {Object} options - user options include custom event handlers
	         */this.attach=function(layoutInfo,options){// handlers for editable
	if(options.shortcuts){this.bindKeyMap(layoutInfo,options.keyMap[agent.isMac?'mac':'pc']);}layoutInfo.editable().on('mousedown',hMousedown);layoutInfo.editable().on('keyup mouseup',hKeyupAndMouseup);layoutInfo.editable().on('scroll',hScroll);// handler for clipboard
	modules.clipboard.attach(layoutInfo,options);// handler for handle and popover
	modules.handle.attach(layoutInfo,options);layoutInfo.popover().on('click',hToolbarAndPopoverClick);layoutInfo.popover().on('mousedown',hToolbarAndPopoverMousedown);// handler for drag and drop
	modules.dragAndDrop.attach(layoutInfo,options);// handlers for frame mode (toolbar, statusbar)
	if(!options.airMode){// handler for toolbar
	layoutInfo.toolbar().on('click',hToolbarAndPopoverClick);layoutInfo.toolbar().on('mousedown',hToolbarAndPopoverMousedown);// handler for statusbar
	modules.statusbar.attach(layoutInfo,options);}// handler for table dimension
	var $catcherContainer=options.airMode?layoutInfo.popover():layoutInfo.toolbar();var $catcher=$catcherContainer.find('.note-dimension-picker-mousecatcher');$catcher.css({width:options.insertTableMaxSize.col+'em',height:options.insertTableMaxSize.row+'em'}).on('mousemove',function(event){hDimensionPickerMove(event,options);});// save options on editor
	layoutInfo.editor().data('options',options);// ret styleWithCSS for backColor / foreColor clearing with 'inherit'.
	if(!agent.isMSIE){// [workaround] for Firefox
	//  - protect FF Error: NS_ERROR_FAILURE: Failure
	setTimeout(function(){document.execCommand('styleWithCSS',0,options.styleWithSpan);},0);}// History
	var history=new History(layoutInfo.editable());layoutInfo.editable().data('NoteHistory',history);// All editor status will be saved on editable with jquery's data
	// for support multiple editor with singleton object.
	layoutInfo.editable().data('callbacks',{onInit:options.onInit,onFocus:options.onFocus,onBlur:options.onBlur,onKeydown:options.onKeydown,onKeyup:options.onKeyup,onMousedown:options.onMousedown,onEnter:options.onEnter,onPaste:options.onPaste,onBeforeCommand:options.onBeforeCommand,onChange:options.onChange,onImageUpload:options.onImageUpload,onImageUploadError:options.onImageUploadError,onMediaDelete:options.onMediaDelete,onToolbarClick:options.onToolbarClick});var styleInfo=modules.editor.styleFromNode(layoutInfo.editable());this.updateStyleInfo(styleInfo,layoutInfo);};/**
	         * attach jquery custom event
	         *
	         * @param {Object} layoutInfo - layout Informations
	         */this.attachCustomEvent=function(layoutInfo,options){var $holder=layoutInfo.holder();var $editable=layoutInfo.editable();var callbacks=$editable.data('callbacks');$editable.focus(bindCustomEvent($holder,callbacks,'focus'));$editable.blur(bindCustomEvent($holder,callbacks,'blur'));$editable.keydown(function(event){if(event.keyCode===key.code.ENTER){bindCustomEvent($holder,callbacks,'enter').call(this,event);}bindCustomEvent($holder,callbacks,'keydown').call(this,event);});$editable.keyup(bindCustomEvent($holder,callbacks,'keyup'));$editable.on('mousedown',bindCustomEvent($holder,callbacks,'mousedown'));$editable.on('mouseup',bindCustomEvent($holder,callbacks,'mouseup'));$editable.on('scroll',bindCustomEvent($holder,callbacks,'scroll'));$editable.on('paste',bindCustomEvent($holder,callbacks,'paste'));// [workaround] IE doesn't have input events for contentEditable
	//  - see: https://goo.gl/4bfIvA
	var changeEventName=agent.isMSIE?'DOMCharacterDataModified DOMSubtreeModified DOMNodeInserted':'input';$editable.on(changeEventName,function(){bindCustomEvent($holder,callbacks,'change')($editable.html(),$editable);});if(!options.airMode){layoutInfo.toolbar().click(bindCustomEvent($holder,callbacks,'toolbar.click'));layoutInfo.popover().click(bindCustomEvent($holder,callbacks,'popover.click'));}// Textarea: auto filling the code before form submit.
	if(dom.isTextarea(list.head($holder))){$holder.closest('form').submit(function(e){layoutInfo.holder().val(layoutInfo.holder().code());bindCustomEvent($holder,callbacks,'submit').call(this,e,$holder.code());});}// textarea auto sync
	if(dom.isTextarea(list.head($holder))&&options.textareaAutoSync){$holder.on('summernote.change',function(){layoutInfo.holder().val(layoutInfo.holder().code());});}// fire init event
	bindCustomEvent($holder,callbacks,'init')(layoutInfo);// fire plugin init event
	for(var i=0,len=$.summernote.plugins.length;i<len;i++){if($.isFunction($.summernote.plugins[i].init)){$.summernote.plugins[i].init(layoutInfo);}}};this.detach=function(layoutInfo,options){layoutInfo.holder().off();layoutInfo.editable().off();layoutInfo.popover().off();layoutInfo.handle().off();layoutInfo.dialog().off();if(!options.airMode){layoutInfo.dropzone().off();layoutInfo.toolbar().off();layoutInfo.statusbar().off();}};};/**
	     * @class Renderer
	     *
	     * renderer
	     *
	     * rendering toolbar and editable
	     */var Renderer=function Renderer(){/**
	         * bootstrap button template
	         * @private
	         * @param {String} label button name
	         * @param {Object} [options] button options
	         * @param {String} [options.event] data-event
	         * @param {String} [options.className] button's class name
	         * @param {String} [options.value] data-value
	         * @param {String} [options.title] button's title for popup
	         * @param {String} [options.dropdown] dropdown html
	         * @param {String} [options.hide] data-hide
	         */var tplButton=function tplButton(label,options){var event=options.event;var value=options.value;var title=options.title;var className=options.className;var dropdown=options.dropdown;var hide=options.hide;return(dropdown?'<div class="btn-group'+(className?' '+className:'')+'">':'')+'<button type="button"'+' class="btn btn-default btn-sm'+(!dropdown&&className?' '+className:'')+(dropdown?' dropdown-toggle':'')+'"'+(dropdown?' data-toggle="dropdown"':'')+(title?' title="'+title+'"':'')+(event?' data-event="'+event+'"':'')+(value?' data-value=\''+value+'\'':'')+(hide?' data-hide=\''+hide+'\'':'')+' tabindex="-1">'+label+(dropdown?' <span class="caret"></span>':'')+'</button>'+(dropdown||'')+(dropdown?'</div>':'');};/**
	         * bootstrap icon button template
	         * @private
	         * @param {String} iconClassName
	         * @param {Object} [options]
	         * @param {String} [options.event]
	         * @param {String} [options.value]
	         * @param {String} [options.title]
	         * @param {String} [options.dropdown]
	         */var tplIconButton=function tplIconButton(iconClassName,options){var label='<i class="'+iconClassName+'"></i>';return tplButton(label,options);};/**
	         * bootstrap popover template
	         * @private
	         * @param {String} className
	         * @param {String} content
	         */var tplPopover=function tplPopover(className,content){var $popover=$('<div class="'+className+' popover bottom in" style="display: none;">'+'<div class="arrow"></div>'+'<div class="popover-content">'+'</div>'+'</div>');$popover.find('.popover-content').append(content);return $popover;};/**
	         * bootstrap dialog template
	         *
	         * @param {String} className
	         * @param {String} [title='']
	         * @param {String} body
	         * @param {String} [footer='']
	         */var tplDialog=function tplDialog(className,title,body,footer){return'<div class="'+className+' modal" aria-hidden="false">'+'<div class="modal-dialog">'+'<div class="modal-content">'+(title?'<div class="modal-header">'+'<button type="button" class="close" aria-hidden="true" tabindex="-1">&times;</button>'+'<h4 class="modal-title">'+title+'</h4>'+'</div>':'')+'<div class="modal-body">'+body+'</div>'+(footer?'<div class="modal-footer">'+footer+'</div>':'')+'</div>'+'</div>'+'</div>';};/**
	         * bootstrap dropdown template
	         *
	         * @param {String|String[]} contents
	         * @param {String} [className='']
	         * @param {String} [nodeName='']
	         */var tplDropdown=function tplDropdown(contents,className,nodeName){var classes='dropdown-menu'+(className?' '+className:'');nodeName=nodeName||'ul';if(contents instanceof Array){contents=contents.join('');}return'<'+nodeName+' class="'+classes+'">'+contents+'</'+nodeName+'>';};var tplButtonInfo={picture:function picture(lang,options){return tplIconButton(options.iconPrefix+options.icons.image.image,{event:'showImageDialog',title:lang.image.image,hide:true});},link:function link(lang,options){return tplIconButton(options.iconPrefix+options.icons.link.link,{event:'showLinkDialog',title:lang.link.link,hide:true});},table:function table(lang,options){var dropdown=['<div class="note-dimension-picker">','<div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"></div>','<div class="note-dimension-picker-highlighted"></div>','<div class="note-dimension-picker-unhighlighted"></div>','</div>','<div class="note-dimension-display"> 1 x 1 </div>'];return tplIconButton(options.iconPrefix+options.icons.table.table,{title:lang.table.table,dropdown:tplDropdown(dropdown,'note-table')});},style:function style(lang,options){var items=options.styleTags.reduce(function(memo,v){var label=lang.style[v==='p'?'normal':v];return memo+'<li><a data-event="formatBlock" href="#" data-value="'+v+'">'+(v==='p'||v==='pre'?label:'<'+v+'>'+label+'</'+v+'>')+'</a></li>';},'');return tplIconButton(options.iconPrefix+options.icons.style.style,{title:lang.style.style,dropdown:tplDropdown(items)});},fontname:function fontname(lang,options){var realFontList=[];var items=options.fontNames.reduce(function(memo,v){if(!agent.isFontInstalled(v)&&!list.contains(options.fontNamesIgnoreCheck,v)){return memo;}realFontList.push(v);return memo+'<li><a data-event="fontName" href="#" data-value="'+v+'" style="font-family:\''+v+'\'">'+'<i class="'+options.iconPrefix+options.icons.misc.check+'"></i> '+v+'</a></li>';},'');var hasDefaultFont=agent.isFontInstalled(options.defaultFontName);var defaultFontName=hasDefaultFont?options.defaultFontName:realFontList[0];var label='<span class="note-current-fontname">'+defaultFontName+'</span>';return tplButton(label,{title:lang.font.name,className:'note-fontname',dropdown:tplDropdown(items,'note-check')});},fontsize:function fontsize(lang,options){var items=options.fontSizes.reduce(function(memo,v){return memo+'<li><a data-event="fontSize" href="#" data-value="'+v+'">'+'<i class="'+options.iconPrefix+options.icons.misc.check+'"></i> '+v+'</a></li>';},'');var label='<span class="note-current-fontsize">11</span>';return tplButton(label,{title:lang.font.size,className:'note-fontsize',dropdown:tplDropdown(items,'note-check')});},color:function color(lang,options){var colorButtonLabel='<i class="'+options.iconPrefix+options.icons.color.recent+'" style="color:black;background-color:yellow;"></i>';var colorButton=tplButton(colorButtonLabel,{className:'note-recent-color',title:lang.color.recent,event:'color',value:'{"backColor":"yellow"}'});var items=['<li><div class="btn-group">','<div class="note-palette-title">'+lang.color.background+'</div>','<div class="note-color-reset" data-event="backColor"',' data-value="inherit" title="'+lang.color.transparent+'">'+lang.color.setTransparent+'</div>','<div class="note-color-palette" data-target-event="backColor"></div>','</div><div class="btn-group">','<div class="note-palette-title">'+lang.color.foreground+'</div>','<div class="note-color-reset" data-event="foreColor" data-value="inherit" title="'+lang.color.reset+'">',lang.color.resetToDefault,'</div>','<div class="note-color-palette" data-target-event="foreColor"></div>','</div></li>'];var moreButton=tplButton('',{title:lang.color.more,dropdown:tplDropdown(items)});return colorButton+moreButton;},bold:function bold(lang,options){return tplIconButton(options.iconPrefix+options.icons.font.bold,{event:'bold',title:lang.font.bold});},italic:function italic(lang,options){return tplIconButton(options.iconPrefix+options.icons.font.italic,{event:'italic',title:lang.font.italic});},underline:function underline(lang,options){return tplIconButton(options.iconPrefix+options.icons.font.underline,{event:'underline',title:lang.font.underline});},strikethrough:function strikethrough(lang,options){return tplIconButton(options.iconPrefix+options.icons.font.strikethrough,{event:'strikethrough',title:lang.font.strikethrough});},superscript:function superscript(lang,options){return tplIconButton(options.iconPrefix+options.icons.font.superscript,{event:'superscript',title:lang.font.superscript});},subscript:function subscript(lang,options){return tplIconButton(options.iconPrefix+options.icons.font.subscript,{event:'subscript',title:lang.font.subscript});},clear:function clear(lang,options){return tplIconButton(options.iconPrefix+options.icons.font.clear,{event:'removeFormat',title:lang.font.clear});},ul:function ul(lang,options){return tplIconButton(options.iconPrefix+options.icons.lists.unordered,{event:'insertUnorderedList',title:lang.lists.unordered});},ol:function ol(lang,options){return tplIconButton(options.iconPrefix+options.icons.lists.ordered,{event:'insertOrderedList',title:lang.lists.ordered});},paragraph:function paragraph(lang,options){var leftButton=tplIconButton(options.iconPrefix+options.icons.paragraph.left,{title:lang.paragraph.left,event:'justifyLeft'});var centerButton=tplIconButton(options.iconPrefix+options.icons.paragraph.center,{title:lang.paragraph.center,event:'justifyCenter'});var rightButton=tplIconButton(options.iconPrefix+options.icons.paragraph.right,{title:lang.paragraph.right,event:'justifyRight'});var justifyButton=tplIconButton(options.iconPrefix+options.icons.paragraph.justify,{title:lang.paragraph.justify,event:'justifyFull'});var outdentButton=tplIconButton(options.iconPrefix+options.icons.paragraph.outdent,{title:lang.paragraph.outdent,event:'outdent'});var indentButton=tplIconButton(options.iconPrefix+options.icons.paragraph.indent,{title:lang.paragraph.indent,event:'indent'});var dropdown=['<div class="note-align btn-group">',leftButton+centerButton+rightButton+justifyButton,'</div><div class="note-list btn-group">',indentButton+outdentButton,'</div>'];return tplIconButton(options.iconPrefix+options.icons.paragraph.paragraph,{title:lang.paragraph.paragraph,dropdown:tplDropdown(dropdown,'','div')});},height:function height(lang,options){var items=options.lineHeights.reduce(function(memo,v){return memo+'<li><a data-event="lineHeight" href="#" data-value="'+parseFloat(v)+'">'+'<i class="'+options.iconPrefix+options.icons.misc.check+'"></i> '+v+'</a></li>';},'');return tplIconButton(options.iconPrefix+options.icons.font.height,{title:lang.font.height,dropdown:tplDropdown(items,'note-check')});},help:function help(lang,options){return tplIconButton(options.iconPrefix+options.icons.options.help,{event:'showHelpDialog',title:lang.options.help,hide:true});},fullscreen:function fullscreen(lang,options){return tplIconButton(options.iconPrefix+options.icons.options.fullscreen,{event:'fullscreen',title:lang.options.fullscreen});},codeview:function codeview(lang,options){return tplIconButton(options.iconPrefix+options.icons.options.codeview,{event:'codeview',title:lang.options.codeview});},undo:function undo(lang,options){return tplIconButton(options.iconPrefix+options.icons.history.undo,{event:'undo',title:lang.history.undo});},redo:function redo(lang,options){return tplIconButton(options.iconPrefix+options.icons.history.redo,{event:'redo',title:lang.history.redo});},hr:function hr(lang,options){return tplIconButton(options.iconPrefix+options.icons.hr.insert,{event:'insertHorizontalRule',title:lang.hr.insert});}};var tplPopovers=function tplPopovers(lang,options){var tplLinkPopover=function tplLinkPopover(){var linkButton=tplIconButton(options.iconPrefix+options.icons.link.edit,{title:lang.link.edit,event:'showLinkDialog',hide:true});var unlinkButton=tplIconButton(options.iconPrefix+options.icons.link.unlink,{title:lang.link.unlink,event:'unlink'});var content='<a href="http://www.google.com" target="_blank">www.google.com</a>&nbsp;&nbsp;'+'<div class="note-insert btn-group">'+linkButton+unlinkButton+'</div>';return tplPopover('note-link-popover',content);};var tplImagePopover=function tplImagePopover(){var fullButton=tplButton('<span class="note-fontsize-10">100%</span>',{title:lang.image.resizeFull,event:'resize',value:'1'});var halfButton=tplButton('<span class="note-fontsize-10">50%</span>',{title:lang.image.resizeHalf,event:'resize',value:'0.5'});var quarterButton=tplButton('<span class="note-fontsize-10">25%</span>',{title:lang.image.resizeQuarter,event:'resize',value:'0.25'});var leftButton=tplIconButton(options.iconPrefix+options.icons.image.floatLeft,{title:lang.image.floatLeft,event:'floatMe',value:'left'});var rightButton=tplIconButton(options.iconPrefix+options.icons.image.floatRight,{title:lang.image.floatRight,event:'floatMe',value:'right'});var justifyButton=tplIconButton(options.iconPrefix+options.icons.image.floatNone,{title:lang.image.floatNone,event:'floatMe',value:'none'});var roundedButton=tplIconButton(options.iconPrefix+options.icons.image.shapeRounded,{title:lang.image.shapeRounded,event:'imageShape',value:'img-rounded'});var circleButton=tplIconButton(options.iconPrefix+options.icons.image.shapeCircle,{title:lang.image.shapeCircle,event:'imageShape',value:'img-circle'});var thumbnailButton=tplIconButton(options.iconPrefix+options.icons.image.shapeThumbnail,{title:lang.image.shapeThumbnail,event:'imageShape',value:'img-thumbnail'});var noneButton=tplIconButton(options.iconPrefix+options.icons.image.shapeNone,{title:lang.image.shapeNone,event:'imageShape',value:''});var removeButton=tplIconButton(options.iconPrefix+options.icons.image.remove,{title:lang.image.remove,event:'removeMedia',value:'none'});var content=(options.disableResizeImage?'':'<div class="btn-group">'+fullButton+halfButton+quarterButton+'</div>')+'<div class="btn-group">'+leftButton+rightButton+justifyButton+'</div><br>'+'<div class="btn-group">'+roundedButton+circleButton+thumbnailButton+noneButton+'</div>'+'<div class="btn-group">'+removeButton+'</div>';return tplPopover('note-image-popover',content);};var tplAirPopover=function tplAirPopover(){var $content=$('<div />');for(var idx=0,len=options.airPopover.length;idx<len;idx++){var group=options.airPopover[idx];var $group=$('<div class="note-'+group[0]+' btn-group">');for(var i=0,lenGroup=group[1].length;i<lenGroup;i++){var $button=$(tplButtonInfo[group[1][i]](lang,options));$button.attr('data-name',group[1][i]);$group.append($button);}$content.append($group);}return tplPopover('note-air-popover',$content.children());};var $notePopover=$('<div class="note-popover" />');$notePopover.append(tplLinkPopover());$notePopover.append(tplImagePopover());if(options.airMode){$notePopover.append(tplAirPopover());}return $notePopover;};var tplHandles=function tplHandles(options){return'<div class="note-handle">'+'<div class="note-control-selection">'+'<div class="note-control-selection-bg"></div>'+'<div class="note-control-holder note-control-nw"></div>'+'<div class="note-control-holder note-control-ne"></div>'+'<div class="note-control-holder note-control-sw"></div>'+'<div class="'+(options.disableResizeImage?'note-control-holder':'note-control-sizing')+' note-control-se"></div>'+(options.disableResizeImage?'':'<div class="note-control-selection-info"></div>')+'</div>'+'</div>';};/**
	         * shortcut table template
	         * @param {String} title
	         * @param {String} body
	         */var tplShortcut=function tplShortcut(title,keys){var keyClass='note-shortcut-col col-xs-6 note-shortcut-';var body=[];for(var i in keys){if(keys.hasOwnProperty(i)){body.push('<div class="'+keyClass+'key">'+keys[i].kbd+'</div>'+'<div class="'+keyClass+'name">'+keys[i].text+'</div>');}}return'<div class="note-shortcut-row row"><div class="'+keyClass+'title col-xs-offset-6">'+title+'</div></div>'+'<div class="note-shortcut-row row">'+body.join('</div><div class="note-shortcut-row row">')+'</div>';};var tplShortcutText=function tplShortcutText(lang){var keys=[{kbd:'⌘ + B',text:lang.font.bold},{kbd:'⌘ + I',text:lang.font.italic},{kbd:'⌘ + U',text:lang.font.underline},{kbd:'⌘ + \\',text:lang.font.clear}];return tplShortcut(lang.shortcut.textFormatting,keys);};var tplShortcutAction=function tplShortcutAction(lang){var keys=[{kbd:'⌘ + Z',text:lang.history.undo},{kbd:'⌘ + ⇧ + Z',text:lang.history.redo},{kbd:'⌘ + ]',text:lang.paragraph.indent},{kbd:'⌘ + [',text:lang.paragraph.outdent},{kbd:'⌘ + ENTER',text:lang.hr.insert}];return tplShortcut(lang.shortcut.action,keys);};var tplShortcutPara=function tplShortcutPara(lang){var keys=[{kbd:'⌘ + ⇧ + L',text:lang.paragraph.left},{kbd:'⌘ + ⇧ + E',text:lang.paragraph.center},{kbd:'⌘ + ⇧ + R',text:lang.paragraph.right},{kbd:'⌘ + ⇧ + J',text:lang.paragraph.justify},{kbd:'⌘ + ⇧ + NUM7',text:lang.lists.ordered},{kbd:'⌘ + ⇧ + NUM8',text:lang.lists.unordered}];return tplShortcut(lang.shortcut.paragraphFormatting,keys);};var tplShortcutStyle=function tplShortcutStyle(lang){var keys=[{kbd:'⌘ + NUM0',text:lang.style.normal},{kbd:'⌘ + NUM1',text:lang.style.h1},{kbd:'⌘ + NUM2',text:lang.style.h2},{kbd:'⌘ + NUM3',text:lang.style.h3},{kbd:'⌘ + NUM4',text:lang.style.h4},{kbd:'⌘ + NUM5',text:lang.style.h5},{kbd:'⌘ + NUM6',text:lang.style.h6}];return tplShortcut(lang.shortcut.documentStyle,keys);};var tplExtraShortcuts=function tplExtraShortcuts(lang,options){var extraKeys=options.extraKeys;var keys=[];for(var key in extraKeys){if(extraKeys.hasOwnProperty(key)){keys.push({kbd:key,text:extraKeys[key]});}}return tplShortcut(lang.shortcut.extraKeys,keys);};var tplShortcutTable=function tplShortcutTable(lang,options){var colClass='class="note-shortcut note-shortcut-col col-sm-6 col-xs-12"';var template=['<div '+colClass+'>'+tplShortcutAction(lang,options)+'</div>'+'<div '+colClass+'>'+tplShortcutText(lang,options)+'</div>','<div '+colClass+'>'+tplShortcutStyle(lang,options)+'</div>'+'<div '+colClass+'>'+tplShortcutPara(lang,options)+'</div>'];if(options.extraKeys){template.push('<div '+colClass+'>'+tplExtraShortcuts(lang,options)+'</div>');}return'<div class="note-shortcut-row row">'+template.join('</div><div class="note-shortcut-row row">')+'</div>';};var replaceMacKeys=function replaceMacKeys(sHtml){return sHtml.replace(/⌘/g,'Ctrl').replace(/⇧/g,'Shift');};var tplDialogInfo={image:function image(lang,options){var imageLimitation='';if(options.maximumImageFileSize){var unit=Math.floor(Math.log(options.maximumImageFileSize)/Math.log(1024));var readableSize=(options.maximumImageFileSize/Math.pow(1024,unit)).toFixed(2)*1+' '+' KMGTP'[unit]+'B';imageLimitation='<small>'+lang.image.maximumFileSize+' : '+readableSize+'</small>';}var body='<div class="form-group row note-group-select-from-files">'+'<label>'+lang.image.selectFromFiles+'</label>'+'<input class="note-image-input form-control" type="file" name="files" accept="image/*" multiple="multiple" />'+imageLimitation+'</div>'+'<div class="form-group row">'+'<label>'+lang.image.url+'</label>'+'<input class="note-image-url form-control col-md-12" type="text" />'+'</div>';var footer='<button href="#" class="btn btn-primary note-image-btn disabled" disabled>'+lang.image.insert+'</button>';return tplDialog('note-image-dialog',lang.image.insert,body,footer);},link:function link(lang,options){var body='<div class="form-group row">'+'<label>'+lang.link.textToDisplay+'</label>'+'<input class="note-link-text form-control col-md-12" type="text" />'+'</div>'+'<div class="form-group row">'+'<label>'+lang.link.url+'</label>'+'<input class="note-link-url form-control col-md-12" type="text" value="http://" />'+'</div>'+(!options.disableLinkTarget?'<div class="checkbox">'+'<label>'+'<input type="checkbox" checked> '+lang.link.openInNewWindow+'</label>'+'</div>':'');var footer='<button href="#" class="btn btn-primary note-link-btn disabled" disabled>'+lang.link.insert+'</button>';return tplDialog('note-link-dialog',lang.link.insert,body,footer);},help:function help(lang,options){var body='<a class="modal-close pull-right" aria-hidden="true" tabindex="-1">'+lang.shortcut.close+'</a>'+'<div class="title">'+lang.shortcut.shortcuts+'</div>'+(agent.isMac?tplShortcutTable(lang,options):replaceMacKeys(tplShortcutTable(lang,options)))+'<p class="text-center">'+'<a href="//summernote.org/" target="_blank">Summernote 0.6.16</a> · '+'<a href="//github.com/summernote/summernote" target="_blank">Project</a> · '+'<a href="//github.com/summernote/summernote/issues" target="_blank">Issues</a>'+'</p>';return tplDialog('note-help-dialog','',body,'');}};var tplDialogs=function tplDialogs(lang,options){var dialogs='';$.each(tplDialogInfo,function(idx,tplDialog){dialogs+=tplDialog(lang,options);});return'<div class="note-dialog">'+dialogs+'</div>';};var tplStatusbar=function tplStatusbar(){return'<div class="note-resizebar">'+'<div class="note-icon-bar"></div>'+'<div class="note-icon-bar"></div>'+'<div class="note-icon-bar"></div>'+'</div>';};var representShortcut=function representShortcut(str){if(agent.isMac){str=str.replace('CMD','⌘').replace('SHIFT','⇧');}return str.replace('BACKSLASH','\\').replace('SLASH','/').replace('LEFTBRACKET','[').replace('RIGHTBRACKET',']');};/**
	         * createTooltip
	         *
	         * @param {jQuery} $container
	         * @param {Object} keyMap
	         * @param {String} [sPlacement]
	         */var createTooltip=function createTooltip($container,keyMap,sPlacement){var invertedKeyMap=func.invertObject(keyMap);var $buttons=$container.find('button');$buttons.each(function(i,elBtn){var $btn=$(elBtn);var sShortcut=invertedKeyMap[$btn.data('event')];if(sShortcut){$btn.attr('title',function(i,v){return v+' ('+representShortcut(sShortcut)+')';});}// bootstrap tooltip on btn-group bug
	// https://github.com/twbs/bootstrap/issues/5687
	}).tooltip({container:'body',trigger:'hover',placement:sPlacement||'top'}).on('click',function(){$(this).tooltip('hide');});};// createPalette
	var createPalette=function createPalette($container,options){var colorInfo=options.colors;$container.find('.note-color-palette').each(function(){var $palette=$(this),eventName=$palette.attr('data-target-event');var paletteContents=[];for(var row=0,lenRow=colorInfo.length;row<lenRow;row++){var colors=colorInfo[row];var buttons=[];for(var col=0,lenCol=colors.length;col<lenCol;col++){var color=colors[col];buttons.push(['<button type="button" class="note-color-btn" style="background-color:',color,';" data-event="',eventName,'" data-value="',color,'" title="',color,'" data-toggle="button" tabindex="-1"></button>'].join(''));}paletteContents.push('<div class="note-color-row">'+buttons.join('')+'</div>');}$palette.html(paletteContents.join(''));});};/**
	         * create summernote layout (air mode)
	         *
	         * @param {jQuery} $holder
	         * @param {Object} options
	         */this.createLayoutByAirMode=function($holder,options){var langInfo=options.langInfo;var keyMap=options.keyMap[agent.isMac?'mac':'pc'];var id=func.uniqueId();$holder.addClass('note-air-editor note-editable panel-body');$holder.attr({'id':'note-editor-'+id,'contentEditable':true});var body=document.body;// create Popover
	var $popover=$(tplPopovers(langInfo,options));$popover.addClass('note-air-layout');$popover.attr('id','note-popover-'+id);$popover.appendTo(body);createTooltip($popover,keyMap);createPalette($popover,options);// create Handle
	var $handle=$(tplHandles(options));$handle.addClass('note-air-layout');$handle.attr('id','note-handle-'+id);$handle.appendTo(body);// create Dialog
	var $dialog=$(tplDialogs(langInfo,options));$dialog.addClass('note-air-layout');$dialog.attr('id','note-dialog-'+id);$dialog.find('button.close, a.modal-close').click(function(){$(this).closest('.modal').modal('hide');});$dialog.appendTo(body);};/**
	         * create summernote layout (normal mode)
	         *
	         * @param {jQuery} $holder
	         * @param {Object} options
	         */this.createLayoutByFrame=function($holder,options){var langInfo=options.langInfo;//01. create Editor
	var $editor=$('<div class="note-editor panel panel-default" />');if(options.width){$editor.width(options.width);}//02. statusbar (resizebar)
	if(options.height>0){$('<div class="note-statusbar">'+(options.disableResizeEditor?'':tplStatusbar())+'</div>').prependTo($editor);}//03 editing area
	var $editingArea=$('<div class="note-editing-area" />');//03. create editable
	var isContentEditable=!$holder.is(':disabled');var $editable=$('<div class="note-editable panel-body" contentEditable="'+isContentEditable+'"></div>').prependTo($editingArea);if(options.height){$editable.height(options.height);}if(options.direction){$editable.attr('dir',options.direction);}var placeholder=$holder.attr('placeholder')||options.placeholder;if(placeholder){$editable.attr('data-placeholder',placeholder);}$editable.html(dom.html($holder)||dom.emptyPara);//031. create codable
	$('<textarea class="note-codable"></textarea>').prependTo($editingArea);//04. create Popover
	var $popover=$(tplPopovers(langInfo,options)).prependTo($editingArea);createPalette($popover,options);createTooltip($popover,keyMap);//05. handle(control selection, ...)
	$(tplHandles(options)).prependTo($editingArea);$editingArea.prependTo($editor);//06. create Toolbar
	var $toolbar=$('<div class="note-toolbar panel-heading" />');for(var idx=0,len=options.toolbar.length;idx<len;idx++){var groupName=options.toolbar[idx][0];var groupButtons=options.toolbar[idx][1];var $group=$('<div class="note-'+groupName+' btn-group" />');for(var i=0,btnLength=groupButtons.length;i<btnLength;i++){var buttonInfo=tplButtonInfo[groupButtons[i]];// continue creating toolbar even if a button doesn't exist
	if(!$.isFunction(buttonInfo)){continue;}var $button=$(buttonInfo(langInfo,options));$button.attr('data-name',groupButtons[i]);// set button's alias, becuase to get button element from $toolbar
	$group.append($button);}$toolbar.append($group);}var keyMap=options.keyMap[agent.isMac?'mac':'pc'];createPalette($toolbar,options);createTooltip($toolbar,keyMap,'bottom');$toolbar.prependTo($editor);//07. create Dropzone
	$('<div class="note-dropzone"><div class="note-dropzone-message"></div></div>').prependTo($editor);//08. create Dialog
	var $dialogContainer=options.dialogsInBody?$(document.body):$editor;var $dialog=$(tplDialogs(langInfo,options)).prependTo($dialogContainer);$dialog.find('button.close, a.modal-close').click(function(){$(this).closest('.modal').modal('hide');});//09. Editor/Holder switch
	$editor.insertAfter($holder);$holder.hide();};this.hasNoteEditor=function($holder){return this.noteEditorFromHolder($holder).length>0;};this.noteEditorFromHolder=function($holder){if($holder.hasClass('note-air-editor')){return $holder;}else if($holder.next().hasClass('note-editor')){return $holder.next();}else{return $();}};/**
	         * create summernote layout
	         *
	         * @param {jQuery} $holder
	         * @param {Object} options
	         */this.createLayout=function($holder,options){if(options.airMode){this.createLayoutByAirMode($holder,options);}else{this.createLayoutByFrame($holder,options);}};/**
	         * returns layoutInfo from holder
	         *
	         * @param {jQuery} $holder - placeholder
	         * @return {Object}
	         */this.layoutInfoFromHolder=function($holder){var $editor=this.noteEditorFromHolder($holder);if(!$editor.length){return;}// connect $holder to $editor
	$editor.data('holder',$holder);return dom.buildLayoutInfo($editor);};/**
	         * removeLayout
	         *
	         * @param {jQuery} $holder - placeholder
	         * @param {Object} layoutInfo
	         * @param {Object} options
	         *
	         */this.removeLayout=function($holder,layoutInfo,options){if(options.airMode){$holder.removeClass('note-air-editor note-editable').removeAttr('id contentEditable');layoutInfo.popover().remove();layoutInfo.handle().remove();layoutInfo.dialog().remove();}else{$holder.html(layoutInfo.editable().html());if(options.dialogsInBody){layoutInfo.dialog().remove();}layoutInfo.editor().remove();$holder.show();}};/**
	         *
	         * @return {Object}
	         * @return {function(label, options=):string} return.button {@link #tplButton function to make text button}
	         * @return {function(iconClass, options=):string} return.iconButton {@link #tplIconButton function to make icon button}
	         * @return {function(className, title=, body=, footer=):string} return.dialog {@link #tplDialog function to make dialog}
	         */this.getTemplate=function(){return{button:tplButton,iconButton:tplIconButton,dialog:tplDialog};};/**
	         * add button information
	         *
	         * @param {String} name button name
	         * @param {Function} buttonInfo function to make button, reference to {@link #tplButton},{@link #tplIconButton}
	         */this.addButtonInfo=function(name,buttonInfo){tplButtonInfo[name]=buttonInfo;};/**
	         *
	         * @param {String} name
	         * @param {Function} dialogInfo function to make dialog, reference to {@link #tplDialog}
	         */this.addDialogInfo=function(name,dialogInfo){tplDialogInfo[name]=dialogInfo;};};// jQuery namespace for summernote
	/**
	     * @class $.summernote
	     *
	     * summernote attribute
	     *
	     * @mixin defaults
	     * @singleton
	     *
	     */$.summernote=$.summernote||{};// extends default settings
	//  - $.summernote.version
	//  - $.summernote.options
	//  - $.summernote.lang
	$.extend($.summernote,defaults);var renderer=new Renderer();var eventHandler=new EventHandler();$.extend($.summernote,{/** @property {Renderer} */renderer:renderer,/** @property {EventHandler} */eventHandler:eventHandler,/**
	         * @property {Object} core
	         * @property {core.agent} core.agent
	         * @property {core.dom} core.dom
	         * @property {core.range} core.range
	         */core:{agent:agent,list:list,dom:dom,range:range},/**
	         * @property {Object}
	         * pluginEvents event list for plugins
	         * event has name and callback function.
	         *
	         * ```
	         * $.summernote.addPlugin({
	     *     events : {
	     *          'hello' : function(layoutInfo, value, $target) {
	     *              console.log('event name is hello, value is ' + value );
	     *          }
	     *     }     
	     * })
	         * ```
	         *
	         * * event name is data-event property.
	         * * layoutInfo is a summernote layout information.
	         * * value is data-value property.
	         */pluginEvents:{},plugins:[]});/**
	     * @method addPlugin
	     *
	     * add Plugin in Summernote
	     *
	     * Summernote can make a own plugin.
	     *
	     * ### Define plugin
	     * ```
	     * // get template function
	     * var tmpl = $.summernote.renderer.getTemplate();
	     *
	     * // add a button
	     * $.summernote.addPlugin({
	   *     buttons : {
	   *        // "hello"  is button's namespace.      
	   *        "hello" : function(lang, options) {
	   *            // make icon button by template function          
	   *            return tmpl.iconButton(options.iconPrefix + 'header', {
	   *                // callback function name when button clicked 
	   *                event : 'hello',
	   *                // set data-value property                 
	   *                value : 'hello',                
	   *                hide : true
	   *            });           
	   *        }
	   *     
	   *     }, 
	   *     
	   *     events : {
	   *        "hello" : function(layoutInfo, value) {
	   *            // here is event code 
	   *        }
	   *     }     
	   * });
	     * ```
	     * ### Use a plugin in toolbar
	     *
	     * ```
	     *    $("#editor").summernote({
	   *    ...
	   *    toolbar : [
	   *        // display hello plugin in toolbar     
	   *        ['group', [ 'hello' ]]
	   *    ]
	   *    ...    
	   *    });
	     * ```
	     *
	     *
	     * @param {Object} plugin
	     * @param {Object} [plugin.buttons] define plugin button. for detail, see to Renderer.addButtonInfo
	     * @param {Object} [plugin.dialogs] define plugin dialog. for detail, see to Renderer.addDialogInfo
	     * @param {Object} [plugin.events] add event in $.summernote.pluginEvents
	     * @param {Object} [plugin.langs] update $.summernote.lang
	     * @param {Object} [plugin.options] update $.summernote.options
	     */$.summernote.addPlugin=function(plugin){// save plugin list
	$.summernote.plugins.push(plugin);if(plugin.buttons){$.each(plugin.buttons,function(name,button){renderer.addButtonInfo(name,button);});}if(plugin.dialogs){$.each(plugin.dialogs,function(name,dialog){renderer.addDialogInfo(name,dialog);});}if(plugin.events){$.each(plugin.events,function(name,event){$.summernote.pluginEvents[name]=event;});}if(plugin.langs){$.each(plugin.langs,function(locale,lang){if($.summernote.lang[locale]){$.extend($.summernote.lang[locale],lang);}});}if(plugin.options){$.extend($.summernote.options,plugin.options);}};/*
	     * extend $.fn
	     */$.fn.extend({/**
	         * @method
	         * Initialize summernote
	         *  - create editor layout and attach Mouse and keyboard events.
	         *
	         * ```
	         * $("#summernote").summernote( { options ..} );
	         * ```
	         *
	         * @member $.fn
	         * @param {Object|String} options reference to $.summernote.options
	         * @return {this}
	         */summernote:function summernote(){// check first argument's type
	//  - {String}: External API call {{module}}.{{method}}
	//  - {Object}: init options
	var type=$.type(list.head(arguments));var isExternalAPICalled=type==='string';var hasInitOptions=type==='object';// extend default options with custom user options
	var options=hasInitOptions?list.head(arguments):{};options=$.extend({},$.summernote.options,options);options.icons=$.extend({},$.summernote.options.icons,options.icons);// Include langInfo in options for later use, e.g. for image drag-n-drop
	// Setup language info with en-US as default
	options.langInfo=$.extend(true,{},$.summernote.lang['en-US'],$.summernote.lang[options.lang]);// override plugin options
	if(!isExternalAPICalled&&hasInitOptions){for(var i=0,len=$.summernote.plugins.length;i<len;i++){var plugin=$.summernote.plugins[i];if(options.plugin[plugin.name]){$.summernote.plugins[i]=$.extend(true,plugin,options.plugin[plugin.name]);}}}this.each(function(idx,holder){var $holder=$(holder);// if layout isn't created yet, createLayout and attach events
	if(!renderer.hasNoteEditor($holder)){renderer.createLayout($holder,options);var layoutInfo=renderer.layoutInfoFromHolder($holder);$holder.data('layoutInfo',layoutInfo);eventHandler.attach(layoutInfo,options);eventHandler.attachCustomEvent(layoutInfo,options);}});var $first=this.first();if($first.length){var layoutInfo=renderer.layoutInfoFromHolder($first);// external API
	if(isExternalAPICalled){var moduleAndMethod=list.head(list.from(arguments));var args=list.tail(list.from(arguments));// TODO now external API only works for editor
	var params=[moduleAndMethod,layoutInfo.editable()].concat(args);return eventHandler.invoke.apply(eventHandler,params);}else if(options.focus){// focus on first editable element for initialize editor
	layoutInfo.editable().focus();}}return this;},/**
	         * @method
	         *
	         * get the HTML contents of note or set the HTML contents of note.
	         *
	         * * get contents
	         * ```
	         * var content = $("#summernote").code();
	         * ```
	         * * set contents
	         *
	         * ```
	         * $("#summernote").code(html);
	         * ```
	         *
	         * @member $.fn
	         * @param {String} [html] - HTML contents(optional, set)
	         * @return {this|String} - context(set) or HTML contents of note(get).
	         */code:function code(html){// get the HTML contents of note
	if(html===undefined){var $holder=this.first();if(!$holder.length){return;}var layoutInfo=renderer.layoutInfoFromHolder($holder);var $editable=layoutInfo&&layoutInfo.editable();if($editable&&$editable.length){var isCodeview=eventHandler.invoke('codeview.isActivated',layoutInfo);eventHandler.invoke('codeview.sync',layoutInfo);return isCodeview?layoutInfo.codable().val():layoutInfo.editable().html();}return dom.value($holder);}// set the HTML contents of note
	this.each(function(i,holder){var layoutInfo=renderer.layoutInfoFromHolder($(holder));var $editable=layoutInfo&&layoutInfo.editable();if($editable){$editable.html(html);}});return this;},/**
	         * @method
	         *
	         * destroy Editor Layout and detach Key and Mouse Event
	         *
	         * @member $.fn
	         * @return {this}
	         */destroy:function destroy(){this.each(function(idx,holder){var $holder=$(holder);if(!renderer.hasNoteEditor($holder)){return;}var info=renderer.layoutInfoFromHolder($holder);var options=info.editor().data('options');eventHandler.detach(info,options);renderer.removeLayout($holder,info,options);});return this;}});});

/***/ },
/* 173 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 174 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 175 */,
/* 176 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 177 */,
/* 178 */
/***/ function(module, exports) {

	module.exports = "\n<textarea data-role=\"summernote\"></textarea>\n";

/***/ },
/* 179 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 180 */,
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;/* WEBPACK VAR INJECTION */(function($) {'use strict';var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};/*!
	 * Select2 4.0.2
	 * https://select2.github.io
	 *
	 * Released under the MIT license
	 * https://github.com/select2/select2/blob/master/LICENSE.md
	 */(function(factory){if(true){// AMD. Register as an anonymous module.
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));}else if((typeof exports==='undefined'?'undefined':_typeof(exports))==='object'){// Node/CommonJS
	factory(require('jquery'));}else{// Browser globals
	factory(jQuery);}})(function(jQuery){// This is needed so we can catch the AMD loader configuration and use it
	// The inner file should be wrapped (by `banner.start.js`) in a function that
	// returns the AMD loader references.
	var S2=function(){// Restore the Select2 AMD loader so it can be used
	// Needed mostly in the language files, where the loader is not inserted
	if(jQuery&&jQuery.fn&&jQuery.fn.select2&&jQuery.fn.select2.amd){var S2=jQuery.fn.select2.amd;}var S2;(function(){if(!S2||!S2.requirejs){if(!S2){S2={};}else{require=S2;}/**
	                 * @license almond 0.3.1 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
	                 * Available via the MIT or new BSD license.
	                 * see: http://github.com/jrburke/almond for details
	                 *///Going sloppy to avoid 'use strict' string cost, but strict practices should
	//be followed.
	/*jslint sloppy: true *//*global setTimeout: false */var requirejs,require,define;(function(undef){var main,_req,makeMap,handlers,defined={},waiting={},config={},defining={},hasOwn=Object.prototype.hasOwnProperty,aps=[].slice,jsSuffixRegExp=/\.js$/;function hasProp(obj,prop){return hasOwn.call(obj,prop);}/**
	                     * Given a relative module name, like ./something, normalize it to
	                     * a real name that can be mapped to a path.
	                     * @param {String} name the relative name
	                     * @param {String} baseName a real name that the name arg is relative
	                     * to.
	                     * @returns {String} normalized name
	                     */function normalize(name,baseName){var nameParts,nameSegment,mapValue,foundMap,lastIndex,foundI,foundStarMap,starI,i,j,part,baseParts=baseName&&baseName.split("/"),map=config.map,starMap=map&&map['*']||{};//Adjust any relative paths.
	if(name&&name.charAt(0)==="."){//If have a base name, try to normalize against it,
	//otherwise, assume it is a top-level require that will
	//be relative to baseUrl in the end.
	if(baseName){name=name.split('/');lastIndex=name.length-1;// Node .js allowance:
	if(config.nodeIdCompat&&jsSuffixRegExp.test(name[lastIndex])){name[lastIndex]=name[lastIndex].replace(jsSuffixRegExp,'');}//Lop off the last part of baseParts, so that . matches the
	//"directory" and not name of the baseName's module. For instance,
	//baseName of "one/two/three", maps to "one/two/three.js", but we
	//want the directory, "one/two" for this normalization.
	name=baseParts.slice(0,baseParts.length-1).concat(name);//start trimDots
	for(i=0;i<name.length;i+=1){part=name[i];if(part==="."){name.splice(i,1);i-=1;}else if(part===".."){if(i===1&&(name[2]==='..'||name[0]==='..')){//End of the line. Keep at least one non-dot
	//path segment at the front so it can be mapped
	//correctly to disk. Otherwise, there is likely
	//no path mapping for a path starting with '..'.
	//This can still fail, but catches the most reasonable
	//uses of ..
	break;}else if(i>0){name.splice(i-1,2);i-=2;}}}//end trimDots
	name=name.join("/");}else if(name.indexOf('./')===0){// No baseName, so this is ID is resolved relative
	// to baseUrl, pull off the leading dot.
	name=name.substring(2);}}//Apply map config if available.
	if((baseParts||starMap)&&map){nameParts=name.split('/');for(i=nameParts.length;i>0;i-=1){nameSegment=nameParts.slice(0,i).join("/");if(baseParts){//Find the longest baseName segment match in the config.
	//So, do joins on the biggest to smallest lengths of baseParts.
	for(j=baseParts.length;j>0;j-=1){mapValue=map[baseParts.slice(0,j).join('/')];//baseName segment has  config, find if it has one for
	//this name.
	if(mapValue){mapValue=mapValue[nameSegment];if(mapValue){//Match, update name to the new value.
	foundMap=mapValue;foundI=i;break;}}}}if(foundMap){break;}//Check for a star map match, but just hold on to it,
	//if there is a shorter segment match later in a matching
	//config, then favor over this star map.
	if(!foundStarMap&&starMap&&starMap[nameSegment]){foundStarMap=starMap[nameSegment];starI=i;}}if(!foundMap&&foundStarMap){foundMap=foundStarMap;foundI=starI;}if(foundMap){nameParts.splice(0,foundI,foundMap);name=nameParts.join('/');}}return name;}function makeRequire(relName,forceSync){return function(){//A version of a require function that passes a moduleName
	//value for items that may need to
	//look up paths relative to the moduleName
	var args=aps.call(arguments,0);//If first arg is not require('string'), and there is only
	//one arg, it is the array form without a callback. Insert
	//a null so that the following concat is correct.
	if(typeof args[0]!=='string'&&args.length===1){args.push(null);}return _req.apply(undef,args.concat([relName,forceSync]));};}function makeNormalize(relName){return function(name){return normalize(name,relName);};}function makeLoad(depName){return function(value){defined[depName]=value;};}function callDep(name){if(hasProp(waiting,name)){var args=waiting[name];delete waiting[name];defining[name]=true;main.apply(undef,args);}if(!hasProp(defined,name)&&!hasProp(defining,name)){throw new Error('No '+name);}return defined[name];}//Turns a plugin!resource to [plugin, resource]
	//with the plugin being undefined if the name
	//did not have a plugin prefix.
	function splitPrefix(name){var prefix,index=name?name.indexOf('!'):-1;if(index>-1){prefix=name.substring(0,index);name=name.substring(index+1,name.length);}return[prefix,name];}/**
	                     * Makes a name map, normalizing the name, and using a plugin
	                     * for normalization if necessary. Grabs a ref to plugin
	                     * too, as an optimization.
	                     */makeMap=function makeMap(name,relName){var plugin,parts=splitPrefix(name),prefix=parts[0];name=parts[1];if(prefix){prefix=normalize(prefix,relName);plugin=callDep(prefix);}//Normalize according
	if(prefix){if(plugin&&plugin.normalize){name=plugin.normalize(name,makeNormalize(relName));}else{name=normalize(name,relName);}}else{name=normalize(name,relName);parts=splitPrefix(name);prefix=parts[0];name=parts[1];if(prefix){plugin=callDep(prefix);}}//Using ridiculous property names for space reasons
	return{f:prefix?prefix+'!'+name:name,//fullName
	n:name,pr:prefix,p:plugin};};function makeConfig(name){return function(){return config&&config.config&&config.config[name]||{};};}handlers={require:function require(name){return makeRequire(name);},exports:function exports(name){var e=defined[name];if(typeof e!=='undefined'){return e;}else{return defined[name]={};}},module:function module(name){return{id:name,uri:'',exports:defined[name],config:makeConfig(name)};}};main=function main(name,deps,callback,relName){var cjsModule,depName,ret,map,i,args=[],callbackType=typeof callback==='undefined'?'undefined':_typeof(callback),usingExports;//Use name if no relName
	relName=relName||name;//Call the callback to define the module, if necessary.
	if(callbackType==='undefined'||callbackType==='function'){//Pull out the defined dependencies and pass the ordered
	//values to the callback.
	//Default to [require, exports, module] if no deps
	deps=!deps.length&&callback.length?['require','exports','module']:deps;for(i=0;i<deps.length;i+=1){map=makeMap(deps[i],relName);depName=map.f;//Fast path CommonJS standard dependencies.
	if(depName==="require"){args[i]=handlers.require(name);}else if(depName==="exports"){//CommonJS module spec 1.1
	args[i]=handlers.exports(name);usingExports=true;}else if(depName==="module"){//CommonJS module spec 1.1
	cjsModule=args[i]=handlers.module(name);}else if(hasProp(defined,depName)||hasProp(waiting,depName)||hasProp(defining,depName)){args[i]=callDep(depName);}else if(map.p){map.p.load(map.n,makeRequire(relName,true),makeLoad(depName),{});args[i]=defined[depName];}else{throw new Error(name+' missing '+depName);}}ret=callback?callback.apply(defined[name],args):undefined;if(name){//If setting exports via "module" is in play,
	//favor that over return value and exports. After that,
	//favor a non-undefined return value over exports use.
	if(cjsModule&&cjsModule.exports!==undef&&cjsModule.exports!==defined[name]){defined[name]=cjsModule.exports;}else if(ret!==undef||!usingExports){//Use the return value from the function.
	defined[name]=ret;}}}else if(name){//May just be an object definition for the module. Only
	//worry about defining if have a module name.
	defined[name]=callback;}};requirejs=require=_req=function req(deps,callback,relName,forceSync,alt){if(typeof deps==="string"){if(handlers[deps]){//callback in this case is really relName
	return handlers[deps](callback);}//Just return the module wanted. In this scenario, the
	//deps arg is the module name, and second arg (if passed)
	//is just the relName.
	//Normalize module name, if it contains . or ..
	return callDep(makeMap(deps,callback).f);}else if(!deps.splice){//deps is a config object, not an array.
	config=deps;if(config.deps){_req(config.deps,config.callback);}if(!callback){return;}if(callback.splice){//callback is an array, which means it is a dependency list.
	//Adjust args if there are dependencies
	deps=callback;callback=relName;relName=null;}else{deps=undef;}}//Support require(['a'])
	callback=callback||function(){};//If relName is a function, it is an errback handler,
	//so remove it.
	if(typeof relName==='function'){relName=forceSync;forceSync=alt;}//Simulate async callback;
	if(forceSync){main(undef,deps,callback,relName);}else{//Using a non-zero value because of concern for what old browsers
	//do, and latest browsers "upgrade" to 4 if lower value is used:
	//http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
	//If want a value immediately, use require('id') instead -- something
	//that works in almond on the global level, but not guaranteed and
	//unlikely to work in other AMD implementations.
	setTimeout(function(){main(undef,deps,callback,relName);},4);}return _req;};/**
	                     * Just drops the config on the floor, but returns req in case
	                     * the config return value is used.
	                     */_req.config=function(cfg){return _req(cfg);};/**
	                     * Expose module registry for debugging and tooling
	                     */requirejs._defined=defined;define=function define(name,deps,callback){if(typeof name!=='string'){throw new Error('See almond README: incorrect module build, no module name');}//This module may not have dependencies
	if(!deps.splice){//deps is not an array, so probably means
	//an object literal or factory function for
	//the value. Adjust args.
	callback=deps;deps=[];}if(!hasProp(defined,name)&&!hasProp(waiting,name)){waiting[name]=[name,deps,callback];}};define.amd={jQuery:true};})();S2.requirejs=requirejs;S2.require=require;S2.define=define;}})();S2.define("almond",function(){});/* global jQuery:false, $:false */S2.define('jquery',[],function(){var _$=jQuery||$;if(_$==null&&console&&console.error){console.error('Select2: An instance of jQuery or a jQuery-compatible library was not '+'found. Make sure that you are including jQuery before Select2 on your '+'web page.');}return _$;});S2.define('select2/utils',['jquery'],function($){var Utils={};Utils.Extend=function(ChildClass,SuperClass){var __hasProp={}.hasOwnProperty;function BaseConstructor(){this.constructor=ChildClass;}for(var key in SuperClass){if(__hasProp.call(SuperClass,key)){ChildClass[key]=SuperClass[key];}}BaseConstructor.prototype=SuperClass.prototype;ChildClass.prototype=new BaseConstructor();ChildClass.__super__=SuperClass.prototype;return ChildClass;};function getMethods(theClass){var proto=theClass.prototype;var methods=[];for(var methodName in proto){var m=proto[methodName];if(typeof m!=='function'){continue;}if(methodName==='constructor'){continue;}methods.push(methodName);}return methods;}Utils.Decorate=function(SuperClass,DecoratorClass){var decoratedMethods=getMethods(DecoratorClass);var superMethods=getMethods(SuperClass);function DecoratedClass(){var unshift=Array.prototype.unshift;var argCount=DecoratorClass.prototype.constructor.length;var calledConstructor=SuperClass.prototype.constructor;if(argCount>0){unshift.call(arguments,SuperClass.prototype.constructor);calledConstructor=DecoratorClass.prototype.constructor;}calledConstructor.apply(this,arguments);}DecoratorClass.displayName=SuperClass.displayName;function ctr(){this.constructor=DecoratedClass;}DecoratedClass.prototype=new ctr();for(var m=0;m<superMethods.length;m++){var superMethod=superMethods[m];DecoratedClass.prototype[superMethod]=SuperClass.prototype[superMethod];}var calledMethod=function calledMethod(methodName){// Stub out the original method if it's not decorating an actual method
	var originalMethod=function originalMethod(){};if(methodName in DecoratedClass.prototype){originalMethod=DecoratedClass.prototype[methodName];}var decoratedMethod=DecoratorClass.prototype[methodName];return function(){var unshift=Array.prototype.unshift;unshift.call(arguments,originalMethod);return decoratedMethod.apply(this,arguments);};};for(var d=0;d<decoratedMethods.length;d++){var decoratedMethod=decoratedMethods[d];DecoratedClass.prototype[decoratedMethod]=calledMethod(decoratedMethod);}return DecoratedClass;};var Observable=function Observable(){this.listeners={};};Observable.prototype.on=function(event,callback){this.listeners=this.listeners||{};if(event in this.listeners){this.listeners[event].push(callback);}else{this.listeners[event]=[callback];}};Observable.prototype.trigger=function(event){var slice=Array.prototype.slice;this.listeners=this.listeners||{};if(event in this.listeners){this.invoke(this.listeners[event],slice.call(arguments,1));}if('*'in this.listeners){this.invoke(this.listeners['*'],arguments);}};Observable.prototype.invoke=function(listeners,params){for(var i=0,len=listeners.length;i<len;i++){listeners[i].apply(this,params);}};Utils.Observable=Observable;Utils.generateChars=function(length){var chars='';for(var i=0;i<length;i++){var randomChar=Math.floor(Math.random()*36);chars+=randomChar.toString(36);}return chars;};Utils.bind=function(func,context){return function(){func.apply(context,arguments);};};Utils._convertData=function(data){for(var originalKey in data){var keys=originalKey.split('-');var dataLevel=data;if(keys.length===1){continue;}for(var k=0;k<keys.length;k++){var key=keys[k];// Lowercase the first letter
	// By default, dash-separated becomes camelCase
	key=key.substring(0,1).toLowerCase()+key.substring(1);if(!(key in dataLevel)){dataLevel[key]={};}if(k==keys.length-1){dataLevel[key]=data[originalKey];}dataLevel=dataLevel[key];}delete data[originalKey];}return data;};Utils.hasScroll=function(index,el){// Adapted from the function created by @ShadowScripter
	// and adapted by @BillBarry on the Stack Exchange Code Review website.
	// The original code can be found at
	// http://codereview.stackexchange.com/q/13338
	// and was designed to be used with the Sizzle selector engine.
	var $el=$(el);var overflowX=el.style.overflowX;var overflowY=el.style.overflowY;//Check both x and y declarations
	if(overflowX===overflowY&&(overflowY==='hidden'||overflowY==='visible')){return false;}if(overflowX==='scroll'||overflowY==='scroll'){return true;}return $el.innerHeight()<el.scrollHeight||$el.innerWidth()<el.scrollWidth;};Utils.escapeMarkup=function(markup){var replaceMap={'\\':'&#92;','&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;','/':'&#47;'};// Do not try to escape the markup if it's not a string
	if(typeof markup!=='string'){return markup;}return String(markup).replace(/[&<>"'\/\\]/g,function(match){return replaceMap[match];});};// Append an array of jQuery nodes to a given element.
	Utils.appendMany=function($element,$nodes){// jQuery 1.7.x does not support $.fn.append() with an array
	// Fall back to a jQuery object collection using $.fn.add()
	if($.fn.jquery.substr(0,3)==='1.7'){var $jqNodes=$();$.map($nodes,function(node){$jqNodes=$jqNodes.add(node);});$nodes=$jqNodes;}$element.append($nodes);};return Utils;});S2.define('select2/results',['jquery','./utils'],function($,Utils){function Results($element,options,dataAdapter){this.$element=$element;this.data=dataAdapter;this.options=options;Results.__super__.constructor.call(this);}Utils.Extend(Results,Utils.Observable);Results.prototype.render=function(){var $results=$('<ul class="select2-results__options" role="tree"></ul>');if(this.options.get('multiple')){$results.attr('aria-multiselectable','true');}this.$results=$results;return $results;};Results.prototype.clear=function(){this.$results.empty();};Results.prototype.displayMessage=function(params){var escapeMarkup=this.options.get('escapeMarkup');this.clear();this.hideLoading();var $message=$('<li role="treeitem" aria-live="assertive"'+' class="select2-results__option"></li>');var message=this.options.get('translations').get(params.message);$message.append(escapeMarkup(message(params.args)));$message[0].className+=' select2-results__message';this.$results.append($message);};Results.prototype.hideMessages=function(){this.$results.find('.select2-results__message').remove();};Results.prototype.append=function(data){this.hideLoading();var $options=[];if(data.results==null||data.results.length===0){if(this.$results.children().length===0){this.trigger('results:message',{message:'noResults'});}return;}data.results=this.sort(data.results);for(var d=0;d<data.results.length;d++){var item=data.results[d];var $option=this.option(item);$options.push($option);}this.$results.append($options);};Results.prototype.position=function($results,$dropdown){var $resultsContainer=$dropdown.find('.select2-results');$resultsContainer.append($results);};Results.prototype.sort=function(data){var sorter=this.options.get('sorter');return sorter(data);};Results.prototype.setClasses=function(){var self=this;this.data.current(function(selected){var selectedIds=$.map(selected,function(s){return s.id.toString();});var $options=self.$results.find('.select2-results__option[aria-selected]');$options.each(function(){var $option=$(this);var item=$.data(this,'data');// id needs to be converted to a string when comparing
	var id=''+item.id;if(item.element!=null&&item.element.selected||item.element==null&&$.inArray(id,selectedIds)>-1){$option.attr('aria-selected','true');}else{$option.attr('aria-selected','false');}});var $selected=$options.filter('[aria-selected=true]');// Check if there are any selected options
	if($selected.length>0){// If there are selected options, highlight the first
	$selected.first().trigger('mouseenter');}else{// If there are no selected options, highlight the first option
	// in the dropdown
	$options.first().trigger('mouseenter');}});};Results.prototype.showLoading=function(params){this.hideLoading();var loadingMore=this.options.get('translations').get('searching');var loading={disabled:true,loading:true,text:loadingMore(params)};var $loading=this.option(loading);$loading.className+=' loading-results';this.$results.prepend($loading);};Results.prototype.hideLoading=function(){this.$results.find('.loading-results').remove();};Results.prototype.option=function(data){var option=document.createElement('li');option.className='select2-results__option';var attrs={'role':'treeitem','aria-selected':'false'};if(data.disabled){delete attrs['aria-selected'];attrs['aria-disabled']='true';}if(data.id==null){delete attrs['aria-selected'];}if(data._resultId!=null){option.id=data._resultId;}if(data.title){option.title=data.title;}if(data.children){attrs.role='group';attrs['aria-label']=data.text;delete attrs['aria-selected'];}for(var attr in attrs){var val=attrs[attr];option.setAttribute(attr,val);}if(data.children){var $option=$(option);var label=document.createElement('strong');label.className='select2-results__group';var $label=$(label);this.template(data,label);var $children=[];for(var c=0;c<data.children.length;c++){var child=data.children[c];var $child=this.option(child);$children.push($child);}var $childrenContainer=$('<ul></ul>',{'class':'select2-results__options select2-results__options--nested'});$childrenContainer.append($children);$option.append(label);$option.append($childrenContainer);}else{this.template(data,option);}$.data(option,'data',data);return option;};Results.prototype.bind=function(container,$container){var self=this;var id=container.id+'-results';this.$results.attr('id',id);container.on('results:all',function(params){self.clear();self.append(params.data);if(container.isOpen()){self.setClasses();}});container.on('results:append',function(params){self.append(params.data);if(container.isOpen()){self.setClasses();}});container.on('query',function(params){self.hideMessages();self.showLoading(params);});container.on('select',function(){if(!container.isOpen()){return;}self.setClasses();});container.on('unselect',function(){if(!container.isOpen()){return;}self.setClasses();});container.on('open',function(){// When the dropdown is open, aria-expended="true"
	self.$results.attr('aria-expanded','true');self.$results.attr('aria-hidden','false');self.setClasses();self.ensureHighlightVisible();});container.on('close',function(){// When the dropdown is closed, aria-expended="false"
	self.$results.attr('aria-expanded','false');self.$results.attr('aria-hidden','true');self.$results.removeAttr('aria-activedescendant');});container.on('results:toggle',function(){var $highlighted=self.getHighlightedResults();if($highlighted.length===0){return;}$highlighted.trigger('mouseup');});container.on('results:select',function(){var $highlighted=self.getHighlightedResults();if($highlighted.length===0){return;}var data=$highlighted.data('data');if($highlighted.attr('aria-selected')=='true'){self.trigger('close',{});}else{self.trigger('select',{data:data});}});container.on('results:previous',function(){var $highlighted=self.getHighlightedResults();var $options=self.$results.find('[aria-selected]');var currentIndex=$options.index($highlighted);// If we are already at te top, don't move further
	if(currentIndex===0){return;}var nextIndex=currentIndex-1;// If none are highlighted, highlight the first
	if($highlighted.length===0){nextIndex=0;}var $next=$options.eq(nextIndex);$next.trigger('mouseenter');var currentOffset=self.$results.offset().top;var nextTop=$next.offset().top;var nextOffset=self.$results.scrollTop()+(nextTop-currentOffset);if(nextIndex===0){self.$results.scrollTop(0);}else if(nextTop-currentOffset<0){self.$results.scrollTop(nextOffset);}});container.on('results:next',function(){var $highlighted=self.getHighlightedResults();var $options=self.$results.find('[aria-selected]');var currentIndex=$options.index($highlighted);var nextIndex=currentIndex+1;// If we are at the last option, stay there
	if(nextIndex>=$options.length){return;}var $next=$options.eq(nextIndex);$next.trigger('mouseenter');var currentOffset=self.$results.offset().top+self.$results.outerHeight(false);var nextBottom=$next.offset().top+$next.outerHeight(false);var nextOffset=self.$results.scrollTop()+nextBottom-currentOffset;if(nextIndex===0){self.$results.scrollTop(0);}else if(nextBottom>currentOffset){self.$results.scrollTop(nextOffset);}});container.on('results:focus',function(params){params.element.addClass('select2-results__option--highlighted');});container.on('results:message',function(params){self.displayMessage(params);});if($.fn.mousewheel){this.$results.on('mousewheel',function(e){var top=self.$results.scrollTop();var bottom=self.$results.get(0).scrollHeight-top+e.deltaY;var isAtTop=e.deltaY>0&&top-e.deltaY<=0;var isAtBottom=e.deltaY<0&&bottom<=self.$results.height();if(isAtTop){self.$results.scrollTop(0);e.preventDefault();e.stopPropagation();}else if(isAtBottom){self.$results.scrollTop(self.$results.get(0).scrollHeight-self.$results.height());e.preventDefault();e.stopPropagation();}});}this.$results.on('mouseup','.select2-results__option[aria-selected]',function(evt){var $this=$(this);var data=$this.data('data');if($this.attr('aria-selected')==='true'){if(self.options.get('multiple')){self.trigger('unselect',{originalEvent:evt,data:data});}else{self.trigger('close',{});}return;}self.trigger('select',{originalEvent:evt,data:data});});this.$results.on('mouseenter','.select2-results__option[aria-selected]',function(evt){var data=$(this).data('data');self.getHighlightedResults().removeClass('select2-results__option--highlighted');self.trigger('results:focus',{data:data,element:$(this)});});};Results.prototype.getHighlightedResults=function(){var $highlighted=this.$results.find('.select2-results__option--highlighted');return $highlighted;};Results.prototype.destroy=function(){this.$results.remove();};Results.prototype.ensureHighlightVisible=function(){var $highlighted=this.getHighlightedResults();if($highlighted.length===0){return;}var $options=this.$results.find('[aria-selected]');var currentIndex=$options.index($highlighted);var currentOffset=this.$results.offset().top;var nextTop=$highlighted.offset().top;var nextOffset=this.$results.scrollTop()+(nextTop-currentOffset);var offsetDelta=nextTop-currentOffset;nextOffset-=$highlighted.outerHeight(false)*2;if(currentIndex<=2){this.$results.scrollTop(0);}else if(offsetDelta>this.$results.outerHeight()||offsetDelta<0){this.$results.scrollTop(nextOffset);}};Results.prototype.template=function(result,container){var template=this.options.get('templateResult');var escapeMarkup=this.options.get('escapeMarkup');var content=template(result,container);if(content==null){container.style.display='none';}else if(typeof content==='string'){container.innerHTML=escapeMarkup(content);}else{$(container).append(content);}};return Results;});S2.define('select2/keys',[],function(){var KEYS={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46};return KEYS;});S2.define('select2/selection/base',['jquery','../utils','../keys'],function($,Utils,KEYS){function BaseSelection($element,options){this.$element=$element;this.options=options;BaseSelection.__super__.constructor.call(this);}Utils.Extend(BaseSelection,Utils.Observable);BaseSelection.prototype.render=function(){var $selection=$('<span class="select2-selection" role="combobox" '+' aria-haspopup="true" aria-expanded="false">'+'</span>');this._tabindex=0;if(this.$element.data('old-tabindex')!=null){this._tabindex=this.$element.data('old-tabindex');}else if(this.$element.attr('tabindex')!=null){this._tabindex=this.$element.attr('tabindex');}$selection.attr('title',this.$element.attr('title'));$selection.attr('tabindex',this._tabindex);this.$selection=$selection;return $selection;};BaseSelection.prototype.bind=function(container,$container){var self=this;var id=container.id+'-container';var resultsId=container.id+'-results';this.container=container;this.$selection.on('focus',function(evt){self.trigger('focus',evt);});this.$selection.on('blur',function(evt){self._handleBlur(evt);});this.$selection.on('keydown',function(evt){self.trigger('keypress',evt);if(evt.which===KEYS.SPACE){evt.preventDefault();}});container.on('results:focus',function(params){self.$selection.attr('aria-activedescendant',params.data._resultId);});container.on('selection:update',function(params){self.update(params.data);});container.on('open',function(){// When the dropdown is open, aria-expanded="true"
	self.$selection.attr('aria-expanded','true');self.$selection.attr('aria-owns',resultsId);self._attachCloseHandler(container);});container.on('close',function(){// When the dropdown is closed, aria-expanded="false"
	self.$selection.attr('aria-expanded','false');self.$selection.removeAttr('aria-activedescendant');self.$selection.removeAttr('aria-owns');self.$selection.focus();self._detachCloseHandler(container);});container.on('enable',function(){self.$selection.attr('tabindex',self._tabindex);});container.on('disable',function(){self.$selection.attr('tabindex','-1');});};BaseSelection.prototype._handleBlur=function(evt){var self=this;// This needs to be delayed as the active element is the body when the tab
	// key is pressed, possibly along with others.
	window.setTimeout(function(){// Don't trigger `blur` if the focus is still in the selection
	if(document.activeElement==self.$selection[0]||$.contains(self.$selection[0],document.activeElement)){return;}self.trigger('blur',evt);},1);};BaseSelection.prototype._attachCloseHandler=function(container){var self=this;$(document.body).on('mousedown.select2.'+container.id,function(e){var $target=$(e.target);var $select=$target.closest('.select2');var $all=$('.select2.select2-container--open');$all.each(function(){var $this=$(this);if(this==$select[0]){return;}var $element=$this.data('element');$element.select2('close');});});};BaseSelection.prototype._detachCloseHandler=function(container){$(document.body).off('mousedown.select2.'+container.id);};BaseSelection.prototype.position=function($selection,$container){var $selectionContainer=$container.find('.selection');$selectionContainer.append($selection);};BaseSelection.prototype.destroy=function(){this._detachCloseHandler(this.container);};BaseSelection.prototype.update=function(data){throw new Error('The `update` method must be defined in child classes.');};return BaseSelection;});S2.define('select2/selection/single',['jquery','./base','../utils','../keys'],function($,BaseSelection,Utils,KEYS){function SingleSelection(){SingleSelection.__super__.constructor.apply(this,arguments);}Utils.Extend(SingleSelection,BaseSelection);SingleSelection.prototype.render=function(){var $selection=SingleSelection.__super__.render.call(this);$selection.addClass('select2-selection--single');$selection.html('<span class="select2-selection__rendered"></span>'+'<span class="select2-selection__arrow" role="presentation">'+'<b role="presentation"></b>'+'</span>');return $selection;};SingleSelection.prototype.bind=function(container,$container){var self=this;SingleSelection.__super__.bind.apply(this,arguments);var id=container.id+'-container';this.$selection.find('.select2-selection__rendered').attr('id',id);this.$selection.attr('aria-labelledby',id);this.$selection.on('mousedown',function(evt){// Only respond to left clicks
	if(evt.which!==1){return;}self.trigger('toggle',{originalEvent:evt});});this.$selection.on('focus',function(evt){// User focuses on the container
	});this.$selection.on('blur',function(evt){// User exits the container
	});container.on('selection:update',function(params){self.update(params.data);});};SingleSelection.prototype.clear=function(){this.$selection.find('.select2-selection__rendered').empty();};SingleSelection.prototype.display=function(data,container){var template=this.options.get('templateSelection');var escapeMarkup=this.options.get('escapeMarkup');return escapeMarkup(template(data,container));};SingleSelection.prototype.selectionContainer=function(){return $('<span></span>');};SingleSelection.prototype.update=function(data){if(data.length===0){this.clear();return;}var selection=data[0];var $rendered=this.$selection.find('.select2-selection__rendered');var formatted=this.display(selection,$rendered);$rendered.empty().append(formatted);$rendered.prop('title',selection.title||selection.text);};return SingleSelection;});S2.define('select2/selection/multiple',['jquery','./base','../utils'],function($,BaseSelection,Utils){function MultipleSelection($element,options){MultipleSelection.__super__.constructor.apply(this,arguments);}Utils.Extend(MultipleSelection,BaseSelection);MultipleSelection.prototype.render=function(){var $selection=MultipleSelection.__super__.render.call(this);$selection.addClass('select2-selection--multiple');$selection.html('<ul class="select2-selection__rendered"></ul>');return $selection;};MultipleSelection.prototype.bind=function(container,$container){var self=this;MultipleSelection.__super__.bind.apply(this,arguments);this.$selection.on('click',function(evt){self.trigger('toggle',{originalEvent:evt});});this.$selection.on('click','.select2-selection__choice__remove',function(evt){// Ignore the event if it is disabled
	if(self.options.get('disabled')){return;}var $remove=$(this);var $selection=$remove.parent();var data=$selection.data('data');self.trigger('unselect',{originalEvent:evt,data:data});});};MultipleSelection.prototype.clear=function(){this.$selection.find('.select2-selection__rendered').empty();};MultipleSelection.prototype.display=function(data,container){var template=this.options.get('templateSelection');var escapeMarkup=this.options.get('escapeMarkup');return escapeMarkup(template(data,container));};MultipleSelection.prototype.selectionContainer=function(){var $container=$('<li class="select2-selection__choice">'+'<span class="select2-selection__choice__remove" role="presentation">'+'&times;'+'</span>'+'</li>');return $container;};MultipleSelection.prototype.update=function(data){this.clear();if(data.length===0){return;}var $selections=[];for(var d=0;d<data.length;d++){var selection=data[d];var $selection=this.selectionContainer();var formatted=this.display(selection,$selection);$selection.append(formatted);$selection.prop('title',selection.title||selection.text);$selection.data('data',selection);$selections.push($selection);}var $rendered=this.$selection.find('.select2-selection__rendered');Utils.appendMany($rendered,$selections);};return MultipleSelection;});S2.define('select2/selection/placeholder',['../utils'],function(Utils){function Placeholder(decorated,$element,options){this.placeholder=this.normalizePlaceholder(options.get('placeholder'));decorated.call(this,$element,options);}Placeholder.prototype.normalizePlaceholder=function(_,placeholder){if(typeof placeholder==='string'){placeholder={id:'',text:placeholder};}return placeholder;};Placeholder.prototype.createPlaceholder=function(decorated,placeholder){var $placeholder=this.selectionContainer();$placeholder.html(this.display(placeholder));$placeholder.addClass('select2-selection__placeholder').removeClass('select2-selection__choice');return $placeholder;};Placeholder.prototype.update=function(decorated,data){var singlePlaceholder=data.length==1&&data[0].id!=this.placeholder.id;var multipleSelections=data.length>1;if(multipleSelections||singlePlaceholder){return decorated.call(this,data);}this.clear();var $placeholder=this.createPlaceholder(this.placeholder);this.$selection.find('.select2-selection__rendered').append($placeholder);};return Placeholder;});S2.define('select2/selection/allowClear',['jquery','../keys'],function($,KEYS){function AllowClear(){}AllowClear.prototype.bind=function(decorated,container,$container){var self=this;decorated.call(this,container,$container);if(this.placeholder==null){if(this.options.get('debug')&&window.console&&console.error){console.error('Select2: The `allowClear` option should be used in combination '+'with the `placeholder` option.');}}this.$selection.on('mousedown','.select2-selection__clear',function(evt){self._handleClear(evt);});container.on('keypress',function(evt){self._handleKeyboardClear(evt,container);});};AllowClear.prototype._handleClear=function(_,evt){// Ignore the event if it is disabled
	if(this.options.get('disabled')){return;}var $clear=this.$selection.find('.select2-selection__clear');// Ignore the event if nothing has been selected
	if($clear.length===0){return;}evt.stopPropagation();var data=$clear.data('data');for(var d=0;d<data.length;d++){var unselectData={data:data[d]};// Trigger the `unselect` event, so people can prevent it from being
	// cleared.
	this.trigger('unselect',unselectData);// If the event was prevented, don't clear it out.
	if(unselectData.prevented){return;}}this.$element.val(this.placeholder.id).trigger('change');this.trigger('toggle',{});};AllowClear.prototype._handleKeyboardClear=function(_,evt,container){if(container.isOpen()){return;}if(evt.which==KEYS.DELETE||evt.which==KEYS.BACKSPACE){this._handleClear(evt);}};AllowClear.prototype.update=function(decorated,data){decorated.call(this,data);if(this.$selection.find('.select2-selection__placeholder').length>0||data.length===0){return;}var $remove=$('<span class="select2-selection__clear">'+'&times;'+'</span>');$remove.data('data',data);this.$selection.find('.select2-selection__rendered').prepend($remove);};return AllowClear;});S2.define('select2/selection/search',['jquery','../utils','../keys'],function($,Utils,KEYS){function Search(decorated,$element,options){decorated.call(this,$element,options);}Search.prototype.render=function(decorated){var $search=$('<li class="select2-search select2-search--inline">'+'<input class="select2-search__field" type="search" tabindex="-1"'+' autocomplete="off" autocorrect="off" autocapitalize="off"'+' spellcheck="false" role="textbox" aria-autocomplete="list" />'+'</li>');this.$searchContainer=$search;this.$search=$search.find('input');var $rendered=decorated.call(this);this._transferTabIndex();return $rendered;};Search.prototype.bind=function(decorated,container,$container){var self=this;decorated.call(this,container,$container);container.on('open',function(){self.$search.trigger('focus');});container.on('close',function(){self.$search.val('');self.$search.removeAttr('aria-activedescendant');self.$search.trigger('focus');});container.on('enable',function(){self.$search.prop('disabled',false);self._transferTabIndex();});container.on('disable',function(){self.$search.prop('disabled',true);});container.on('focus',function(evt){self.$search.trigger('focus');});container.on('results:focus',function(params){self.$search.attr('aria-activedescendant',params.id);});this.$selection.on('focusin','.select2-search--inline',function(evt){self.trigger('focus',evt);});this.$selection.on('focusout','.select2-search--inline',function(evt){self._handleBlur(evt);});this.$selection.on('keydown','.select2-search--inline',function(evt){evt.stopPropagation();self.trigger('keypress',evt);self._keyUpPrevented=evt.isDefaultPrevented();var key=evt.which;if(key===KEYS.BACKSPACE&&self.$search.val()===''){var $previousChoice=self.$searchContainer.prev('.select2-selection__choice');if($previousChoice.length>0){var item=$previousChoice.data('data');self.searchRemoveChoice(item);evt.preventDefault();}}});// Try to detect the IE version should the `documentMode` property that
	// is stored on the document. This is only implemented in IE and is
	// slightly cleaner than doing a user agent check.
	// This property is not available in Edge, but Edge also doesn't have
	// this bug.
	var msie=document.documentMode;var disableInputEvents=msie&&msie<=11;// Workaround for browsers which do not support the `input` event
	// This will prevent double-triggering of events for browsers which support
	// both the `keyup` and `input` events.
	this.$selection.on('input.searchcheck','.select2-search--inline',function(evt){// IE will trigger the `input` event when a placeholder is used on a
	// search box. To get around this issue, we are forced to ignore all
	// `input` events in IE and keep using `keyup`.
	if(disableInputEvents){self.$selection.off('input.search input.searchcheck');return;}// Unbind the duplicated `keyup` event
	self.$selection.off('keyup.search');});this.$selection.on('keyup.search input.search','.select2-search--inline',function(evt){// IE will trigger the `input` event when a placeholder is used on a
	// search box. To get around this issue, we are forced to ignore all
	// `input` events in IE and keep using `keyup`.
	if(disableInputEvents&&evt.type==='input'){self.$selection.off('input.search input.searchcheck');return;}var key=evt.which;// We can freely ignore events from modifier keys
	if(key==KEYS.SHIFT||key==KEYS.CTRL||key==KEYS.ALT){return;}// Tabbing will be handled during the `keydown` phase
	if(key==KEYS.TAB){return;}self.handleSearch(evt);});};/**
	                 * This method will transfer the tabindex attribute from the rendered
	                 * selection to the search box. This allows for the search box to be used as
	                 * the primary focus instead of the selection container.
	                 *
	                 * @private
	                 */Search.prototype._transferTabIndex=function(decorated){this.$search.attr('tabindex',this.$selection.attr('tabindex'));this.$selection.attr('tabindex','-1');};Search.prototype.createPlaceholder=function(decorated,placeholder){this.$search.attr('placeholder',placeholder.text);};Search.prototype.update=function(decorated,data){var searchHadFocus=this.$search[0]==document.activeElement;this.$search.attr('placeholder','');decorated.call(this,data);this.$selection.find('.select2-selection__rendered').append(this.$searchContainer);this.resizeSearch();if(searchHadFocus){this.$search.focus();}};Search.prototype.handleSearch=function(){this.resizeSearch();if(!this._keyUpPrevented){var input=this.$search.val();this.trigger('query',{term:input});}this._keyUpPrevented=false;};Search.prototype.searchRemoveChoice=function(decorated,item){this.trigger('unselect',{data:item});this.$search.val(item.text);this.handleSearch();};Search.prototype.resizeSearch=function(){this.$search.css('width','25px');var width='';if(this.$search.attr('placeholder')!==''){width=this.$selection.find('.select2-selection__rendered').innerWidth();}else{var minimumWidth=this.$search.val().length+1;width=minimumWidth*0.75+'em';}this.$search.css('width',width);};return Search;});S2.define('select2/selection/eventRelay',['jquery'],function($){function EventRelay(){}EventRelay.prototype.bind=function(decorated,container,$container){var self=this;var relayEvents=['open','opening','close','closing','select','selecting','unselect','unselecting'];var preventableEvents=['opening','closing','selecting','unselecting'];decorated.call(this,container,$container);container.on('*',function(name,params){// Ignore events that should not be relayed
	if($.inArray(name,relayEvents)===-1){return;}// The parameters should always be an object
	params=params||{};// Generate the jQuery event for the Select2 event
	var evt=$.Event('select2:'+name,{params:params});self.$element.trigger(evt);// Only handle preventable events if it was one
	if($.inArray(name,preventableEvents)===-1){return;}params.prevented=evt.isDefaultPrevented();});};return EventRelay;});S2.define('select2/translation',['jquery','require'],function($,require){function Translation(dict){this.dict=dict||{};}Translation.prototype.all=function(){return this.dict;};Translation.prototype.get=function(key){return this.dict[key];};Translation.prototype.extend=function(translation){this.dict=$.extend({},translation.all(),this.dict);};// Static functions
	Translation._cache={};Translation.loadPath=function(path){if(!(path in Translation._cache)){var translations=require(path);Translation._cache[path]=translations;}return new Translation(Translation._cache[path]);};return Translation;});S2.define('select2/diacritics',[],function(){var diacritics={'Ⓐ':'A','Ａ':'A','À':'A','Á':'A','Â':'A','Ầ':'A','Ấ':'A','Ẫ':'A','Ẩ':'A','Ã':'A','Ā':'A','Ă':'A','Ằ':'A','Ắ':'A','Ẵ':'A','Ẳ':'A','Ȧ':'A','Ǡ':'A','Ä':'A','Ǟ':'A','Ả':'A','Å':'A','Ǻ':'A','Ǎ':'A','Ȁ':'A','Ȃ':'A','Ạ':'A','Ậ':'A','Ặ':'A','Ḁ':'A','Ą':'A','Ⱥ':'A','Ɐ':'A','Ꜳ':'AA','Æ':'AE','Ǽ':'AE','Ǣ':'AE','Ꜵ':'AO','Ꜷ':'AU','Ꜹ':'AV','Ꜻ':'AV','Ꜽ':'AY','Ⓑ':'B','Ｂ':'B','Ḃ':'B','Ḅ':'B','Ḇ':'B','Ƀ':'B','Ƃ':'B','Ɓ':'B','Ⓒ':'C','Ｃ':'C','Ć':'C','Ĉ':'C','Ċ':'C','Č':'C','Ç':'C','Ḉ':'C','Ƈ':'C','Ȼ':'C','Ꜿ':'C','Ⓓ':'D','Ｄ':'D','Ḋ':'D','Ď':'D','Ḍ':'D','Ḑ':'D','Ḓ':'D','Ḏ':'D','Đ':'D','Ƌ':'D','Ɗ':'D','Ɖ':'D','Ꝺ':'D','Ǳ':'DZ','Ǆ':'DZ','ǲ':'Dz','ǅ':'Dz','Ⓔ':'E','Ｅ':'E','È':'E','É':'E','Ê':'E','Ề':'E','Ế':'E','Ễ':'E','Ể':'E','Ẽ':'E','Ē':'E','Ḕ':'E','Ḗ':'E','Ĕ':'E','Ė':'E','Ë':'E','Ẻ':'E','Ě':'E','Ȅ':'E','Ȇ':'E','Ẹ':'E','Ệ':'E','Ȩ':'E','Ḝ':'E','Ę':'E','Ḙ':'E','Ḛ':'E','Ɛ':'E','Ǝ':'E','Ⓕ':'F','Ｆ':'F','Ḟ':'F','Ƒ':'F','Ꝼ':'F','Ⓖ':'G','Ｇ':'G','Ǵ':'G','Ĝ':'G','Ḡ':'G','Ğ':'G','Ġ':'G','Ǧ':'G','Ģ':'G','Ǥ':'G','Ɠ':'G','Ꞡ':'G','Ᵹ':'G','Ꝿ':'G','Ⓗ':'H','Ｈ':'H','Ĥ':'H','Ḣ':'H','Ḧ':'H','Ȟ':'H','Ḥ':'H','Ḩ':'H','Ḫ':'H','Ħ':'H','Ⱨ':'H','Ⱶ':'H','Ɥ':'H','Ⓘ':'I','Ｉ':'I','Ì':'I','Í':'I','Î':'I','Ĩ':'I','Ī':'I','Ĭ':'I','İ':'I','Ï':'I','Ḯ':'I','Ỉ':'I','Ǐ':'I','Ȉ':'I','Ȋ':'I','Ị':'I','Į':'I','Ḭ':'I','Ɨ':'I','Ⓙ':'J','Ｊ':'J','Ĵ':'J','Ɉ':'J','Ⓚ':'K','Ｋ':'K','Ḱ':'K','Ǩ':'K','Ḳ':'K','Ķ':'K','Ḵ':'K','Ƙ':'K','Ⱪ':'K','Ꝁ':'K','Ꝃ':'K','Ꝅ':'K','Ꞣ':'K','Ⓛ':'L','Ｌ':'L','Ŀ':'L','Ĺ':'L','Ľ':'L','Ḷ':'L','Ḹ':'L','Ļ':'L','Ḽ':'L','Ḻ':'L','Ł':'L','Ƚ':'L','Ɫ':'L','Ⱡ':'L','Ꝉ':'L','Ꝇ':'L','Ꞁ':'L','Ǉ':'LJ','ǈ':'Lj','Ⓜ':'M','Ｍ':'M','Ḿ':'M','Ṁ':'M','Ṃ':'M','Ɱ':'M','Ɯ':'M','Ⓝ':'N','Ｎ':'N','Ǹ':'N','Ń':'N','Ñ':'N','Ṅ':'N','Ň':'N','Ṇ':'N','Ņ':'N','Ṋ':'N','Ṉ':'N','Ƞ':'N','Ɲ':'N','Ꞑ':'N','Ꞥ':'N','Ǌ':'NJ','ǋ':'Nj','Ⓞ':'O','Ｏ':'O','Ò':'O','Ó':'O','Ô':'O','Ồ':'O','Ố':'O','Ỗ':'O','Ổ':'O','Õ':'O','Ṍ':'O','Ȭ':'O','Ṏ':'O','Ō':'O','Ṑ':'O','Ṓ':'O','Ŏ':'O','Ȯ':'O','Ȱ':'O','Ö':'O','Ȫ':'O','Ỏ':'O','Ő':'O','Ǒ':'O','Ȍ':'O','Ȏ':'O','Ơ':'O','Ờ':'O','Ớ':'O','Ỡ':'O','Ở':'O','Ợ':'O','Ọ':'O','Ộ':'O','Ǫ':'O','Ǭ':'O','Ø':'O','Ǿ':'O','Ɔ':'O','Ɵ':'O','Ꝋ':'O','Ꝍ':'O','Ƣ':'OI','Ꝏ':'OO','Ȣ':'OU','Ⓟ':'P','Ｐ':'P','Ṕ':'P','Ṗ':'P','Ƥ':'P','Ᵽ':'P','Ꝑ':'P','Ꝓ':'P','Ꝕ':'P','Ⓠ':'Q','Ｑ':'Q','Ꝗ':'Q','Ꝙ':'Q','Ɋ':'Q','Ⓡ':'R','Ｒ':'R','Ŕ':'R','Ṙ':'R','Ř':'R','Ȑ':'R','Ȓ':'R','Ṛ':'R','Ṝ':'R','Ŗ':'R','Ṟ':'R','Ɍ':'R','Ɽ':'R','Ꝛ':'R','Ꞧ':'R','Ꞃ':'R','Ⓢ':'S','Ｓ':'S','ẞ':'S','Ś':'S','Ṥ':'S','Ŝ':'S','Ṡ':'S','Š':'S','Ṧ':'S','Ṣ':'S','Ṩ':'S','Ș':'S','Ş':'S','Ȿ':'S','Ꞩ':'S','Ꞅ':'S','Ⓣ':'T','Ｔ':'T','Ṫ':'T','Ť':'T','Ṭ':'T','Ț':'T','Ţ':'T','Ṱ':'T','Ṯ':'T','Ŧ':'T','Ƭ':'T','Ʈ':'T','Ⱦ':'T','Ꞇ':'T','Ꜩ':'TZ','Ⓤ':'U','Ｕ':'U','Ù':'U','Ú':'U','Û':'U','Ũ':'U','Ṹ':'U','Ū':'U','Ṻ':'U','Ŭ':'U','Ü':'U','Ǜ':'U','Ǘ':'U','Ǖ':'U','Ǚ':'U','Ủ':'U','Ů':'U','Ű':'U','Ǔ':'U','Ȕ':'U','Ȗ':'U','Ư':'U','Ừ':'U','Ứ':'U','Ữ':'U','Ử':'U','Ự':'U','Ụ':'U','Ṳ':'U','Ų':'U','Ṷ':'U','Ṵ':'U','Ʉ':'U','Ⓥ':'V','Ｖ':'V','Ṽ':'V','Ṿ':'V','Ʋ':'V','Ꝟ':'V','Ʌ':'V','Ꝡ':'VY','Ⓦ':'W','Ｗ':'W','Ẁ':'W','Ẃ':'W','Ŵ':'W','Ẇ':'W','Ẅ':'W','Ẉ':'W','Ⱳ':'W','Ⓧ':'X','Ｘ':'X','Ẋ':'X','Ẍ':'X','Ⓨ':'Y','Ｙ':'Y','Ỳ':'Y','Ý':'Y','Ŷ':'Y','Ỹ':'Y','Ȳ':'Y','Ẏ':'Y','Ÿ':'Y','Ỷ':'Y','Ỵ':'Y','Ƴ':'Y','Ɏ':'Y','Ỿ':'Y','Ⓩ':'Z','Ｚ':'Z','Ź':'Z','Ẑ':'Z','Ż':'Z','Ž':'Z','Ẓ':'Z','Ẕ':'Z','Ƶ':'Z','Ȥ':'Z','Ɀ':'Z','Ⱬ':'Z','Ꝣ':'Z','ⓐ':'a','ａ':'a','ẚ':'a','à':'a','á':'a','â':'a','ầ':'a','ấ':'a','ẫ':'a','ẩ':'a','ã':'a','ā':'a','ă':'a','ằ':'a','ắ':'a','ẵ':'a','ẳ':'a','ȧ':'a','ǡ':'a','ä':'a','ǟ':'a','ả':'a','å':'a','ǻ':'a','ǎ':'a','ȁ':'a','ȃ':'a','ạ':'a','ậ':'a','ặ':'a','ḁ':'a','ą':'a','ⱥ':'a','ɐ':'a','ꜳ':'aa','æ':'ae','ǽ':'ae','ǣ':'ae','ꜵ':'ao','ꜷ':'au','ꜹ':'av','ꜻ':'av','ꜽ':'ay','ⓑ':'b','ｂ':'b','ḃ':'b','ḅ':'b','ḇ':'b','ƀ':'b','ƃ':'b','ɓ':'b','ⓒ':'c','ｃ':'c','ć':'c','ĉ':'c','ċ':'c','č':'c','ç':'c','ḉ':'c','ƈ':'c','ȼ':'c','ꜿ':'c','ↄ':'c','ⓓ':'d','ｄ':'d','ḋ':'d','ď':'d','ḍ':'d','ḑ':'d','ḓ':'d','ḏ':'d','đ':'d','ƌ':'d','ɖ':'d','ɗ':'d','ꝺ':'d','ǳ':'dz','ǆ':'dz','ⓔ':'e','ｅ':'e','è':'e','é':'e','ê':'e','ề':'e','ế':'e','ễ':'e','ể':'e','ẽ':'e','ē':'e','ḕ':'e','ḗ':'e','ĕ':'e','ė':'e','ë':'e','ẻ':'e','ě':'e','ȅ':'e','ȇ':'e','ẹ':'e','ệ':'e','ȩ':'e','ḝ':'e','ę':'e','ḙ':'e','ḛ':'e','ɇ':'e','ɛ':'e','ǝ':'e','ⓕ':'f','ｆ':'f','ḟ':'f','ƒ':'f','ꝼ':'f','ⓖ':'g','ｇ':'g','ǵ':'g','ĝ':'g','ḡ':'g','ğ':'g','ġ':'g','ǧ':'g','ģ':'g','ǥ':'g','ɠ':'g','ꞡ':'g','ᵹ':'g','ꝿ':'g','ⓗ':'h','ｈ':'h','ĥ':'h','ḣ':'h','ḧ':'h','ȟ':'h','ḥ':'h','ḩ':'h','ḫ':'h','ẖ':'h','ħ':'h','ⱨ':'h','ⱶ':'h','ɥ':'h','ƕ':'hv','ⓘ':'i','ｉ':'i','ì':'i','í':'i','î':'i','ĩ':'i','ī':'i','ĭ':'i','ï':'i','ḯ':'i','ỉ':'i','ǐ':'i','ȉ':'i','ȋ':'i','ị':'i','į':'i','ḭ':'i','ɨ':'i','ı':'i','ⓙ':'j','ｊ':'j','ĵ':'j','ǰ':'j','ɉ':'j','ⓚ':'k','ｋ':'k','ḱ':'k','ǩ':'k','ḳ':'k','ķ':'k','ḵ':'k','ƙ':'k','ⱪ':'k','ꝁ':'k','ꝃ':'k','ꝅ':'k','ꞣ':'k','ⓛ':'l','ｌ':'l','ŀ':'l','ĺ':'l','ľ':'l','ḷ':'l','ḹ':'l','ļ':'l','ḽ':'l','ḻ':'l','ſ':'l','ł':'l','ƚ':'l','ɫ':'l','ⱡ':'l','ꝉ':'l','ꞁ':'l','ꝇ':'l','ǉ':'lj','ⓜ':'m','ｍ':'m','ḿ':'m','ṁ':'m','ṃ':'m','ɱ':'m','ɯ':'m','ⓝ':'n','ｎ':'n','ǹ':'n','ń':'n','ñ':'n','ṅ':'n','ň':'n','ṇ':'n','ņ':'n','ṋ':'n','ṉ':'n','ƞ':'n','ɲ':'n','ŉ':'n','ꞑ':'n','ꞥ':'n','ǌ':'nj','ⓞ':'o','ｏ':'o','ò':'o','ó':'o','ô':'o','ồ':'o','ố':'o','ỗ':'o','ổ':'o','õ':'o','ṍ':'o','ȭ':'o','ṏ':'o','ō':'o','ṑ':'o','ṓ':'o','ŏ':'o','ȯ':'o','ȱ':'o','ö':'o','ȫ':'o','ỏ':'o','ő':'o','ǒ':'o','ȍ':'o','ȏ':'o','ơ':'o','ờ':'o','ớ':'o','ỡ':'o','ở':'o','ợ':'o','ọ':'o','ộ':'o','ǫ':'o','ǭ':'o','ø':'o','ǿ':'o','ɔ':'o','ꝋ':'o','ꝍ':'o','ɵ':'o','ƣ':'oi','ȣ':'ou','ꝏ':'oo','ⓟ':'p','ｐ':'p','ṕ':'p','ṗ':'p','ƥ':'p','ᵽ':'p','ꝑ':'p','ꝓ':'p','ꝕ':'p','ⓠ':'q','ｑ':'q','ɋ':'q','ꝗ':'q','ꝙ':'q','ⓡ':'r','ｒ':'r','ŕ':'r','ṙ':'r','ř':'r','ȑ':'r','ȓ':'r','ṛ':'r','ṝ':'r','ŗ':'r','ṟ':'r','ɍ':'r','ɽ':'r','ꝛ':'r','ꞧ':'r','ꞃ':'r','ⓢ':'s','ｓ':'s','ß':'s','ś':'s','ṥ':'s','ŝ':'s','ṡ':'s','š':'s','ṧ':'s','ṣ':'s','ṩ':'s','ș':'s','ş':'s','ȿ':'s','ꞩ':'s','ꞅ':'s','ẛ':'s','ⓣ':'t','ｔ':'t','ṫ':'t','ẗ':'t','ť':'t','ṭ':'t','ț':'t','ţ':'t','ṱ':'t','ṯ':'t','ŧ':'t','ƭ':'t','ʈ':'t','ⱦ':'t','ꞇ':'t','ꜩ':'tz','ⓤ':'u','ｕ':'u','ù':'u','ú':'u','û':'u','ũ':'u','ṹ':'u','ū':'u','ṻ':'u','ŭ':'u','ü':'u','ǜ':'u','ǘ':'u','ǖ':'u','ǚ':'u','ủ':'u','ů':'u','ű':'u','ǔ':'u','ȕ':'u','ȗ':'u','ư':'u','ừ':'u','ứ':'u','ữ':'u','ử':'u','ự':'u','ụ':'u','ṳ':'u','ų':'u','ṷ':'u','ṵ':'u','ʉ':'u','ⓥ':'v','ｖ':'v','ṽ':'v','ṿ':'v','ʋ':'v','ꝟ':'v','ʌ':'v','ꝡ':'vy','ⓦ':'w','ｗ':'w','ẁ':'w','ẃ':'w','ŵ':'w','ẇ':'w','ẅ':'w','ẘ':'w','ẉ':'w','ⱳ':'w','ⓧ':'x','ｘ':'x','ẋ':'x','ẍ':'x','ⓨ':'y','ｙ':'y','ỳ':'y','ý':'y','ŷ':'y','ỹ':'y','ȳ':'y','ẏ':'y','ÿ':'y','ỷ':'y','ẙ':'y','ỵ':'y','ƴ':'y','ɏ':'y','ỿ':'y','ⓩ':'z','ｚ':'z','ź':'z','ẑ':'z','ż':'z','ž':'z','ẓ':'z','ẕ':'z','ƶ':'z','ȥ':'z','ɀ':'z','ⱬ':'z','ꝣ':'z','Ά':'Α','Έ':'Ε','Ή':'Η','Ί':'Ι','Ϊ':'Ι','Ό':'Ο','Ύ':'Υ','Ϋ':'Υ','Ώ':'Ω','ά':'α','έ':'ε','ή':'η','ί':'ι','ϊ':'ι','ΐ':'ι','ό':'ο','ύ':'υ','ϋ':'υ','ΰ':'υ','ω':'ω','ς':'σ'};return diacritics;});S2.define('select2/data/base',['../utils'],function(Utils){function BaseAdapter($element,options){BaseAdapter.__super__.constructor.call(this);}Utils.Extend(BaseAdapter,Utils.Observable);BaseAdapter.prototype.current=function(callback){throw new Error('The `current` method must be defined in child classes.');};BaseAdapter.prototype.query=function(params,callback){throw new Error('The `query` method must be defined in child classes.');};BaseAdapter.prototype.bind=function(container,$container){// Can be implemented in subclasses
	};BaseAdapter.prototype.destroy=function(){// Can be implemented in subclasses
	};BaseAdapter.prototype.generateResultId=function(container,data){var id=container.id+'-result-';id+=Utils.generateChars(4);if(data.id!=null){id+='-'+data.id.toString();}else{id+='-'+Utils.generateChars(4);}return id;};return BaseAdapter;});S2.define('select2/data/select',['./base','../utils','jquery'],function(BaseAdapter,Utils,$){function SelectAdapter($element,options){this.$element=$element;this.options=options;SelectAdapter.__super__.constructor.call(this);}Utils.Extend(SelectAdapter,BaseAdapter);SelectAdapter.prototype.current=function(callback){var data=[];var self=this;this.$element.find(':selected').each(function(){var $option=$(this);var option=self.item($option);data.push(option);});callback(data);};SelectAdapter.prototype.select=function(data){var self=this;data.selected=true;// If data.element is a DOM node, use it instead
	if($(data.element).is('option')){data.element.selected=true;this.$element.trigger('change');return;}if(this.$element.prop('multiple')){this.current(function(currentData){var val=[];data=[data];data.push.apply(data,currentData);for(var d=0;d<data.length;d++){var id=data[d].id;if($.inArray(id,val)===-1){val.push(id);}}self.$element.val(val);self.$element.trigger('change');});}else{var val=data.id;this.$element.val(val);this.$element.trigger('change');}};SelectAdapter.prototype.unselect=function(data){var self=this;if(!this.$element.prop('multiple')){return;}data.selected=false;if($(data.element).is('option')){data.element.selected=false;this.$element.trigger('change');return;}this.current(function(currentData){var val=[];for(var d=0;d<currentData.length;d++){var id=currentData[d].id;if(id!==data.id&&$.inArray(id,val)===-1){val.push(id);}}self.$element.val(val);self.$element.trigger('change');});};SelectAdapter.prototype.bind=function(container,$container){var self=this;this.container=container;container.on('select',function(params){self.select(params.data);});container.on('unselect',function(params){self.unselect(params.data);});};SelectAdapter.prototype.destroy=function(){// Remove anything added to child elements
	this.$element.find('*').each(function(){// Remove any custom data set by Select2
	$.removeData(this,'data');});};SelectAdapter.prototype.query=function(params,callback){var data=[];var self=this;var $options=this.$element.children();$options.each(function(){var $option=$(this);if(!$option.is('option')&&!$option.is('optgroup')){return;}var option=self.item($option);var matches=self.matches(params,option);if(matches!==null){data.push(matches);}});callback({results:data});};SelectAdapter.prototype.addOptions=function($options){Utils.appendMany(this.$element,$options);};SelectAdapter.prototype.option=function(data){var option;if(data.children){option=document.createElement('optgroup');option.label=data.text;}else{option=document.createElement('option');if(option.textContent!==undefined){option.textContent=data.text;}else{option.innerText=data.text;}}if(data.id){option.value=data.id;}if(data.disabled){option.disabled=true;}if(data.selected){option.selected=true;}if(data.title){option.title=data.title;}var $option=$(option);var normalizedData=this._normalizeItem(data);normalizedData.element=option;// Override the option's data with the combined data
	$.data(option,'data',normalizedData);return $option;};SelectAdapter.prototype.item=function($option){var data={};data=$.data($option[0],'data');if(data!=null){return data;}if($option.is('option')){data={id:$option.val(),text:$option.text(),disabled:$option.prop('disabled'),selected:$option.prop('selected'),title:$option.prop('title')};}else if($option.is('optgroup')){data={text:$option.prop('label'),children:[],title:$option.prop('title')};var $children=$option.children('option');var children=[];for(var c=0;c<$children.length;c++){var $child=$($children[c]);var child=this.item($child);children.push(child);}data.children=children;}data=this._normalizeItem(data);data.element=$option[0];$.data($option[0],'data',data);return data;};SelectAdapter.prototype._normalizeItem=function(item){if(!$.isPlainObject(item)){item={id:item,text:item};}item=$.extend({},{text:''},item);var defaults={selected:false,disabled:false};if(item.id!=null){item.id=item.id.toString();}if(item.text!=null){item.text=item.text.toString();}if(item._resultId==null&&item.id&&this.container!=null){item._resultId=this.generateResultId(this.container,item);}return $.extend({},defaults,item);};SelectAdapter.prototype.matches=function(params,data){var matcher=this.options.get('matcher');return matcher(params,data);};return SelectAdapter;});S2.define('select2/data/array',['./select','../utils','jquery'],function(SelectAdapter,Utils,$){function ArrayAdapter($element,options){var data=options.get('data')||[];ArrayAdapter.__super__.constructor.call(this,$element,options);this.addOptions(this.convertToOptions(data));}Utils.Extend(ArrayAdapter,SelectAdapter);ArrayAdapter.prototype.select=function(data){var $option=this.$element.find('option').filter(function(i,elm){return elm.value==data.id.toString();});if($option.length===0){$option=this.option(data);this.addOptions($option);}ArrayAdapter.__super__.select.call(this,data);};ArrayAdapter.prototype.convertToOptions=function(data){var self=this;var $existing=this.$element.find('option');var existingIds=$existing.map(function(){return self.item($(this)).id;}).get();var $options=[];// Filter out all items except for the one passed in the argument
	function onlyItem(item){return function(){return $(this).val()==item.id;};}for(var d=0;d<data.length;d++){var item=this._normalizeItem(data[d]);// Skip items which were pre-loaded, only merge the data
	if($.inArray(item.id,existingIds)>=0){var $existingOption=$existing.filter(onlyItem(item));var existingData=this.item($existingOption);var newData=$.extend(true,{},item,existingData);var $newOption=this.option(newData);$existingOption.replaceWith($newOption);continue;}var $option=this.option(item);if(item.children){var $children=this.convertToOptions(item.children);Utils.appendMany($option,$children);}$options.push($option);}return $options;};return ArrayAdapter;});S2.define('select2/data/ajax',['./array','../utils','jquery'],function(ArrayAdapter,Utils,$){function AjaxAdapter($element,options){this.ajaxOptions=this._applyDefaults(options.get('ajax'));if(this.ajaxOptions.processResults!=null){this.processResults=this.ajaxOptions.processResults;}AjaxAdapter.__super__.constructor.call(this,$element,options);}Utils.Extend(AjaxAdapter,ArrayAdapter);AjaxAdapter.prototype._applyDefaults=function(options){var defaults={data:function data(params){return $.extend({},params,{q:params.term});},transport:function transport(params,success,failure){var $request=$.ajax(params);$request.then(success);$request.fail(failure);return $request;}};return $.extend({},defaults,options,true);};AjaxAdapter.prototype.processResults=function(results){return results;};AjaxAdapter.prototype.query=function(params,callback){var matches=[];var self=this;if(this._request!=null){// JSONP requests cannot always be aborted
	if($.isFunction(this._request.abort)){this._request.abort();}this._request=null;}var options=$.extend({type:'GET'},this.ajaxOptions);if(typeof options.url==='function'){options.url=options.url.call(this.$element,params);}if(typeof options.data==='function'){options.data=options.data.call(this.$element,params);}function request(){var $request=options.transport(options,function(data){var results=self.processResults(data,params);if(self.options.get('debug')&&window.console&&console.error){// Check to make sure that the response included a `results` key.
	if(!results||!results.results||!$.isArray(results.results)){console.error('Select2: The AJAX results did not return an array in the '+'`results` key of the response.');}}callback(results);},function(){self.trigger('results:message',{message:'errorLoading'});});self._request=$request;}if(this.ajaxOptions.delay&&params.term!==''){if(this._queryTimeout){window.clearTimeout(this._queryTimeout);}this._queryTimeout=window.setTimeout(request,this.ajaxOptions.delay);}else{request();}};return AjaxAdapter;});S2.define('select2/data/tags',['jquery'],function($){function Tags(decorated,$element,options){var tags=options.get('tags');var createTag=options.get('createTag');if(createTag!==undefined){this.createTag=createTag;}var insertTag=options.get('insertTag');if(insertTag!==undefined){this.insertTag=insertTag;}decorated.call(this,$element,options);if($.isArray(tags)){for(var t=0;t<tags.length;t++){var tag=tags[t];var item=this._normalizeItem(tag);var $option=this.option(item);this.$element.append($option);}}}Tags.prototype.query=function(decorated,params,callback){var self=this;this._removeOldTags();if(params.term==null||params.page!=null){decorated.call(this,params,callback);return;}function wrapper(obj,child){var data=obj.results;for(var i=0;i<data.length;i++){var option=data[i];var checkChildren=option.children!=null&&!wrapper({results:option.children},true);var checkText=option.text===params.term;if(checkText||checkChildren){if(child){return false;}obj.data=data;callback(obj);return;}}if(child){return true;}var tag=self.createTag(params);if(tag!=null){var $option=self.option(tag);$option.attr('data-select2-tag',true);self.addOptions([$option]);self.insertTag(data,tag);}obj.results=data;callback(obj);}decorated.call(this,params,wrapper);};Tags.prototype.createTag=function(decorated,params){var term=$.trim(params.term);if(term===''){return null;}return{id:term,text:term};};Tags.prototype.insertTag=function(_,data,tag){data.unshift(tag);};Tags.prototype._removeOldTags=function(_){var tag=this._lastTag;var $options=this.$element.find('option[data-select2-tag]');$options.each(function(){if(this.selected){return;}$(this).remove();});};return Tags;});S2.define('select2/data/tokenizer',['jquery'],function($){function Tokenizer(decorated,$element,options){var tokenizer=options.get('tokenizer');if(tokenizer!==undefined){this.tokenizer=tokenizer;}decorated.call(this,$element,options);}Tokenizer.prototype.bind=function(decorated,container,$container){decorated.call(this,container,$container);this.$search=container.dropdown.$search||container.selection.$search||$container.find('.select2-search__field');};Tokenizer.prototype.query=function(decorated,params,callback){var self=this;function select(data){self.trigger('select',{data:data});}params.term=params.term||'';var tokenData=this.tokenizer(params,this.options,select);if(tokenData.term!==params.term){// Replace the search term if we have the search box
	if(this.$search.length){this.$search.val(tokenData.term);this.$search.focus();}params.term=tokenData.term;}decorated.call(this,params,callback);};Tokenizer.prototype.tokenizer=function(_,params,options,callback){var separators=options.get('tokenSeparators')||[];var term=params.term;var i=0;var createTag=this.createTag||function(params){return{id:params.term,text:params.term};};while(i<term.length){var termChar=term[i];if($.inArray(termChar,separators)===-1){i++;continue;}var part=term.substr(0,i);var partParams=$.extend({},params,{term:part});var data=createTag(partParams);if(data==null){i++;continue;}callback(data);// Reset the term to not include the tokenized portion
	term=term.substr(i+1)||'';i=0;}return{term:term};};return Tokenizer;});S2.define('select2/data/minimumInputLength',[],function(){function MinimumInputLength(decorated,$e,options){this.minimumInputLength=options.get('minimumInputLength');decorated.call(this,$e,options);}MinimumInputLength.prototype.query=function(decorated,params,callback){params.term=params.term||'';if(params.term.length<this.minimumInputLength){this.trigger('results:message',{message:'inputTooShort',args:{minimum:this.minimumInputLength,input:params.term,params:params}});return;}decorated.call(this,params,callback);};return MinimumInputLength;});S2.define('select2/data/maximumInputLength',[],function(){function MaximumInputLength(decorated,$e,options){this.maximumInputLength=options.get('maximumInputLength');decorated.call(this,$e,options);}MaximumInputLength.prototype.query=function(decorated,params,callback){params.term=params.term||'';if(this.maximumInputLength>0&&params.term.length>this.maximumInputLength){this.trigger('results:message',{message:'inputTooLong',args:{maximum:this.maximumInputLength,input:params.term,params:params}});return;}decorated.call(this,params,callback);};return MaximumInputLength;});S2.define('select2/data/maximumSelectionLength',[],function(){function MaximumSelectionLength(decorated,$e,options){this.maximumSelectionLength=options.get('maximumSelectionLength');decorated.call(this,$e,options);}MaximumSelectionLength.prototype.query=function(decorated,params,callback){var self=this;this.current(function(currentData){var count=currentData!=null?currentData.length:0;if(self.maximumSelectionLength>0&&count>=self.maximumSelectionLength){self.trigger('results:message',{message:'maximumSelected',args:{maximum:self.maximumSelectionLength}});return;}decorated.call(self,params,callback);});};return MaximumSelectionLength;});S2.define('select2/dropdown',['jquery','./utils'],function($,Utils){function Dropdown($element,options){this.$element=$element;this.options=options;Dropdown.__super__.constructor.call(this);}Utils.Extend(Dropdown,Utils.Observable);Dropdown.prototype.render=function(){var $dropdown=$('<span class="select2-dropdown">'+'<span class="select2-results"></span>'+'</span>');$dropdown.attr('dir',this.options.get('dir'));this.$dropdown=$dropdown;return $dropdown;};Dropdown.prototype.bind=function(){// Should be implemented in subclasses
	};Dropdown.prototype.position=function($dropdown,$container){// Should be implmented in subclasses
	};Dropdown.prototype.destroy=function(){// Remove the dropdown from the DOM
	this.$dropdown.remove();};return Dropdown;});S2.define('select2/dropdown/search',['jquery','../utils'],function($,Utils){function Search(){}Search.prototype.render=function(decorated){var $rendered=decorated.call(this);var $search=$('<span class="select2-search select2-search--dropdown">'+'<input class="select2-search__field" type="search" tabindex="-1"'+' autocomplete="off" autocorrect="off" autocapitalize="off"'+' spellcheck="false" role="textbox" />'+'</span>');this.$searchContainer=$search;this.$search=$search.find('input');$rendered.prepend($search);return $rendered;};Search.prototype.bind=function(decorated,container,$container){var self=this;decorated.call(this,container,$container);this.$search.on('keydown',function(evt){self.trigger('keypress',evt);self._keyUpPrevented=evt.isDefaultPrevented();});// Workaround for browsers which do not support the `input` event
	// This will prevent double-triggering of events for browsers which support
	// both the `keyup` and `input` events.
	this.$search.on('input',function(evt){// Unbind the duplicated `keyup` event
	$(this).off('keyup');});this.$search.on('keyup input',function(evt){self.handleSearch(evt);});container.on('open',function(){self.$search.attr('tabindex',0);self.$search.focus();window.setTimeout(function(){self.$search.focus();},0);});container.on('close',function(){self.$search.attr('tabindex',-1);self.$search.val('');});container.on('results:all',function(params){if(params.query.term==null||params.query.term===''){var showSearch=self.showSearch(params);if(showSearch){self.$searchContainer.removeClass('select2-search--hide');}else{self.$searchContainer.addClass('select2-search--hide');}}});};Search.prototype.handleSearch=function(evt){if(!this._keyUpPrevented){var input=this.$search.val();this.trigger('query',{term:input});}this._keyUpPrevented=false;};Search.prototype.showSearch=function(_,params){return true;};return Search;});S2.define('select2/dropdown/hidePlaceholder',[],function(){function HidePlaceholder(decorated,$element,options,dataAdapter){this.placeholder=this.normalizePlaceholder(options.get('placeholder'));decorated.call(this,$element,options,dataAdapter);}HidePlaceholder.prototype.append=function(decorated,data){data.results=this.removePlaceholder(data.results);decorated.call(this,data);};HidePlaceholder.prototype.normalizePlaceholder=function(_,placeholder){if(typeof placeholder==='string'){placeholder={id:'',text:placeholder};}return placeholder;};HidePlaceholder.prototype.removePlaceholder=function(_,data){var modifiedData=data.slice(0);for(var d=data.length-1;d>=0;d--){var item=data[d];if(this.placeholder.id===item.id){modifiedData.splice(d,1);}}return modifiedData;};return HidePlaceholder;});S2.define('select2/dropdown/infiniteScroll',['jquery'],function($){function InfiniteScroll(decorated,$element,options,dataAdapter){this.lastParams={};decorated.call(this,$element,options,dataAdapter);this.$loadingMore=this.createLoadingMore();this.loading=false;}InfiniteScroll.prototype.append=function(decorated,data){this.$loadingMore.remove();this.loading=false;decorated.call(this,data);if(this.showLoadingMore(data)){this.$results.append(this.$loadingMore);}};InfiniteScroll.prototype.bind=function(decorated,container,$container){var self=this;decorated.call(this,container,$container);container.on('query',function(params){self.lastParams=params;self.loading=true;});container.on('query:append',function(params){self.lastParams=params;self.loading=true;});this.$results.on('scroll',function(){var isLoadMoreVisible=$.contains(document.documentElement,self.$loadingMore[0]);if(self.loading||!isLoadMoreVisible){return;}var currentOffset=self.$results.offset().top+self.$results.outerHeight(false);var loadingMoreOffset=self.$loadingMore.offset().top+self.$loadingMore.outerHeight(false);if(currentOffset+50>=loadingMoreOffset){self.loadMore();}});};InfiniteScroll.prototype.loadMore=function(){this.loading=true;var params=$.extend({},{page:1},this.lastParams);params.page++;this.trigger('query:append',params);};InfiniteScroll.prototype.showLoadingMore=function(_,data){return data.pagination&&data.pagination.more;};InfiniteScroll.prototype.createLoadingMore=function(){var $option=$('<li '+'class="select2-results__option select2-results__option--load-more"'+'role="treeitem" aria-disabled="true"></li>');var message=this.options.get('translations').get('loadingMore');$option.html(message(this.lastParams));return $option;};return InfiniteScroll;});S2.define('select2/dropdown/attachBody',['jquery','../utils'],function($,Utils){function AttachBody(decorated,$element,options){this.$dropdownParent=options.get('dropdownParent')||$(document.body);decorated.call(this,$element,options);}AttachBody.prototype.bind=function(decorated,container,$container){var self=this;var setupResultsEvents=false;decorated.call(this,container,$container);container.on('open',function(){self._showDropdown();self._attachPositioningHandler(container);if(!setupResultsEvents){setupResultsEvents=true;container.on('results:all',function(){self._positionDropdown();self._resizeDropdown();});container.on('results:append',function(){self._positionDropdown();self._resizeDropdown();});}});container.on('close',function(){self._hideDropdown();self._detachPositioningHandler(container);});this.$dropdownContainer.on('mousedown',function(evt){evt.stopPropagation();});};AttachBody.prototype.destroy=function(decorated){decorated.call(this);this.$dropdownContainer.remove();};AttachBody.prototype.position=function(decorated,$dropdown,$container){// Clone all of the container classes
	$dropdown.attr('class',$container.attr('class'));$dropdown.removeClass('select2');$dropdown.addClass('select2-container--open');$dropdown.css({position:'absolute',top:-999999});this.$container=$container;};AttachBody.prototype.render=function(decorated){var $container=$('<span></span>');var $dropdown=decorated.call(this);$container.append($dropdown);this.$dropdownContainer=$container;return $container;};AttachBody.prototype._hideDropdown=function(decorated){this.$dropdownContainer.detach();};AttachBody.prototype._attachPositioningHandler=function(decorated,container){var self=this;var scrollEvent='scroll.select2.'+container.id;var resizeEvent='resize.select2.'+container.id;var orientationEvent='orientationchange.select2.'+container.id;var $watchers=this.$container.parents().filter(Utils.hasScroll);$watchers.each(function(){$(this).data('select2-scroll-position',{x:$(this).scrollLeft(),y:$(this).scrollTop()});});$watchers.on(scrollEvent,function(ev){var position=$(this).data('select2-scroll-position');$(this).scrollTop(position.y);});$(window).on(scrollEvent+' '+resizeEvent+' '+orientationEvent,function(e){self._positionDropdown();self._resizeDropdown();});};AttachBody.prototype._detachPositioningHandler=function(decorated,container){var scrollEvent='scroll.select2.'+container.id;var resizeEvent='resize.select2.'+container.id;var orientationEvent='orientationchange.select2.'+container.id;var $watchers=this.$container.parents().filter(Utils.hasScroll);$watchers.off(scrollEvent);$(window).off(scrollEvent+' '+resizeEvent+' '+orientationEvent);};AttachBody.prototype._positionDropdown=function(){var $window=$(window);var isCurrentlyAbove=this.$dropdown.hasClass('select2-dropdown--above');var isCurrentlyBelow=this.$dropdown.hasClass('select2-dropdown--below');var newDirection=null;var offset=this.$container.offset();offset.bottom=offset.top+this.$container.outerHeight(false);var container={height:this.$container.outerHeight(false)};container.top=offset.top;container.bottom=offset.top+container.height;var dropdown={height:this.$dropdown.outerHeight(false)};var viewport={top:$window.scrollTop(),bottom:$window.scrollTop()+$window.height()};var enoughRoomAbove=viewport.top<offset.top-dropdown.height;var enoughRoomBelow=viewport.bottom>offset.bottom+dropdown.height;var css={left:offset.left,top:container.bottom};// Determine what the parent element is to use for calciulating the offset
	var $offsetParent=this.$dropdownParent;// For statically positoned elements, we need to get the element
	// that is determining the offset
	if($offsetParent.css('position')==='static'){$offsetParent=$offsetParent.offsetParent();}var parentOffset=$offsetParent.offset();css.top-=parentOffset.top;css.left-=parentOffset.left;if(!isCurrentlyAbove&&!isCurrentlyBelow){newDirection='below';}if(!enoughRoomBelow&&enoughRoomAbove&&!isCurrentlyAbove){newDirection='above';}else if(!enoughRoomAbove&&enoughRoomBelow&&isCurrentlyAbove){newDirection='below';}if(newDirection=='above'||isCurrentlyAbove&&newDirection!=='below'){css.top=container.top-dropdown.height;}if(newDirection!=null){this.$dropdown.removeClass('select2-dropdown--below select2-dropdown--above').addClass('select2-dropdown--'+newDirection);this.$container.removeClass('select2-container--below select2-container--above').addClass('select2-container--'+newDirection);}this.$dropdownContainer.css(css);};AttachBody.prototype._resizeDropdown=function(){var css={width:this.$container.outerWidth(false)+'px'};if(this.options.get('dropdownAutoWidth')){css.minWidth=css.width;css.width='auto';}this.$dropdown.css(css);};AttachBody.prototype._showDropdown=function(decorated){this.$dropdownContainer.appendTo(this.$dropdownParent);this._positionDropdown();this._resizeDropdown();};return AttachBody;});S2.define('select2/dropdown/minimumResultsForSearch',[],function(){function countResults(data){var count=0;for(var d=0;d<data.length;d++){var item=data[d];if(item.children){count+=countResults(item.children);}else{count++;}}return count;}function MinimumResultsForSearch(decorated,$element,options,dataAdapter){this.minimumResultsForSearch=options.get('minimumResultsForSearch');if(this.minimumResultsForSearch<0){this.minimumResultsForSearch=Infinity;}decorated.call(this,$element,options,dataAdapter);}MinimumResultsForSearch.prototype.showSearch=function(decorated,params){if(countResults(params.data.results)<this.minimumResultsForSearch){return false;}return decorated.call(this,params);};return MinimumResultsForSearch;});S2.define('select2/dropdown/selectOnClose',[],function(){function SelectOnClose(){}SelectOnClose.prototype.bind=function(decorated,container,$container){var self=this;decorated.call(this,container,$container);container.on('close',function(){self._handleSelectOnClose();});};SelectOnClose.prototype._handleSelectOnClose=function(){var $highlightedResults=this.getHighlightedResults();// Only select highlighted results
	if($highlightedResults.length<1){return;}var data=$highlightedResults.data('data');// Don't re-select already selected resulte
	if(data.element!=null&&data.element.selected||data.element==null&&data.selected){return;}this.trigger('select',{data:data});};return SelectOnClose;});S2.define('select2/dropdown/closeOnSelect',[],function(){function CloseOnSelect(){}CloseOnSelect.prototype.bind=function(decorated,container,$container){var self=this;decorated.call(this,container,$container);container.on('select',function(evt){self._selectTriggered(evt);});container.on('unselect',function(evt){self._selectTriggered(evt);});};CloseOnSelect.prototype._selectTriggered=function(_,evt){var originalEvent=evt.originalEvent;// Don't close if the control key is being held
	if(originalEvent&&originalEvent.ctrlKey){return;}this.trigger('close',{});};return CloseOnSelect;});S2.define('select2/i18n/en',[],function(){// English
	return{errorLoading:function errorLoading(){return'The results could not be loaded.';},inputTooLong:function inputTooLong(args){var overChars=args.input.length-args.maximum;var message='Please delete '+overChars+' character';if(overChars!=1){message+='s';}return message;},inputTooShort:function inputTooShort(args){var remainingChars=args.minimum-args.input.length;var message='Please enter '+remainingChars+' or more characters';return message;},loadingMore:function loadingMore(){return'Loading more results…';},maximumSelected:function maximumSelected(args){var message='You can only select '+args.maximum+' item';if(args.maximum!=1){message+='s';}return message;},noResults:function noResults(){return'No results found';},searching:function searching(){return'Searching…';}};});S2.define('select2/defaults',['jquery','require','./results','./selection/single','./selection/multiple','./selection/placeholder','./selection/allowClear','./selection/search','./selection/eventRelay','./utils','./translation','./diacritics','./data/select','./data/array','./data/ajax','./data/tags','./data/tokenizer','./data/minimumInputLength','./data/maximumInputLength','./data/maximumSelectionLength','./dropdown','./dropdown/search','./dropdown/hidePlaceholder','./dropdown/infiniteScroll','./dropdown/attachBody','./dropdown/minimumResultsForSearch','./dropdown/selectOnClose','./dropdown/closeOnSelect','./i18n/en'],function($,require,ResultsList,SingleSelection,MultipleSelection,Placeholder,AllowClear,SelectionSearch,EventRelay,Utils,Translation,DIACRITICS,SelectData,ArrayData,AjaxData,Tags,Tokenizer,MinimumInputLength,MaximumInputLength,MaximumSelectionLength,Dropdown,DropdownSearch,HidePlaceholder,InfiniteScroll,AttachBody,MinimumResultsForSearch,SelectOnClose,CloseOnSelect,EnglishTranslation){function Defaults(){this.reset();}Defaults.prototype.apply=function(options){options=$.extend(true,{},this.defaults,options);if(options.dataAdapter==null){if(options.ajax!=null){options.dataAdapter=AjaxData;}else if(options.data!=null){options.dataAdapter=ArrayData;}else{options.dataAdapter=SelectData;}if(options.minimumInputLength>0){options.dataAdapter=Utils.Decorate(options.dataAdapter,MinimumInputLength);}if(options.maximumInputLength>0){options.dataAdapter=Utils.Decorate(options.dataAdapter,MaximumInputLength);}if(options.maximumSelectionLength>0){options.dataAdapter=Utils.Decorate(options.dataAdapter,MaximumSelectionLength);}if(options.tags){options.dataAdapter=Utils.Decorate(options.dataAdapter,Tags);}if(options.tokenSeparators!=null||options.tokenizer!=null){options.dataAdapter=Utils.Decorate(options.dataAdapter,Tokenizer);}if(options.query!=null){var Query=require(options.amdBase+'compat/query');options.dataAdapter=Utils.Decorate(options.dataAdapter,Query);}if(options.initSelection!=null){var InitSelection=require(options.amdBase+'compat/initSelection');options.dataAdapter=Utils.Decorate(options.dataAdapter,InitSelection);}}if(options.resultsAdapter==null){options.resultsAdapter=ResultsList;if(options.ajax!=null){options.resultsAdapter=Utils.Decorate(options.resultsAdapter,InfiniteScroll);}if(options.placeholder!=null){options.resultsAdapter=Utils.Decorate(options.resultsAdapter,HidePlaceholder);}if(options.selectOnClose){options.resultsAdapter=Utils.Decorate(options.resultsAdapter,SelectOnClose);}}if(options.dropdownAdapter==null){if(options.multiple){options.dropdownAdapter=Dropdown;}else{var SearchableDropdown=Utils.Decorate(Dropdown,DropdownSearch);options.dropdownAdapter=SearchableDropdown;}if(options.minimumResultsForSearch!==0){options.dropdownAdapter=Utils.Decorate(options.dropdownAdapter,MinimumResultsForSearch);}if(options.closeOnSelect){options.dropdownAdapter=Utils.Decorate(options.dropdownAdapter,CloseOnSelect);}if(options.dropdownCssClass!=null||options.dropdownCss!=null||options.adaptDropdownCssClass!=null){var DropdownCSS=require(options.amdBase+'compat/dropdownCss');options.dropdownAdapter=Utils.Decorate(options.dropdownAdapter,DropdownCSS);}options.dropdownAdapter=Utils.Decorate(options.dropdownAdapter,AttachBody);}if(options.selectionAdapter==null){if(options.multiple){options.selectionAdapter=MultipleSelection;}else{options.selectionAdapter=SingleSelection;}// Add the placeholder mixin if a placeholder was specified
	if(options.placeholder!=null){options.selectionAdapter=Utils.Decorate(options.selectionAdapter,Placeholder);}if(options.allowClear){options.selectionAdapter=Utils.Decorate(options.selectionAdapter,AllowClear);}if(options.multiple){options.selectionAdapter=Utils.Decorate(options.selectionAdapter,SelectionSearch);}if(options.containerCssClass!=null||options.containerCss!=null||options.adaptContainerCssClass!=null){var ContainerCSS=require(options.amdBase+'compat/containerCss');options.selectionAdapter=Utils.Decorate(options.selectionAdapter,ContainerCSS);}options.selectionAdapter=Utils.Decorate(options.selectionAdapter,EventRelay);}if(typeof options.language==='string'){// Check if the language is specified with a region
	if(options.language.indexOf('-')>0){// Extract the region information if it is included
	var languageParts=options.language.split('-');var baseLanguage=languageParts[0];options.language=[options.language,baseLanguage];}else{options.language=[options.language];}}if($.isArray(options.language)){var languages=new Translation();options.language.push('en');var languageNames=options.language;for(var l=0;l<languageNames.length;l++){var name=languageNames[l];var language={};try{// Try to load it with the original name
	language=Translation.loadPath(name);}catch(e){try{// If we couldn't load it, check if it wasn't the full path
	name=this.defaults.amdLanguageBase+name;language=Translation.loadPath(name);}catch(ex){// The translation could not be loaded at all. Sometimes this is
	// because of a configuration problem, other times this can be
	// because of how Select2 helps load all possible translation files.
	if(options.debug&&window.console&&console.warn){console.warn('Select2: The language file for "'+name+'" could not be '+'automatically loaded. A fallback will be used instead.');}continue;}}languages.extend(language);}options.translations=languages;}else{var baseTranslation=Translation.loadPath(this.defaults.amdLanguageBase+'en');var customTranslation=new Translation(options.language);customTranslation.extend(baseTranslation);options.translations=customTranslation;}return options;};Defaults.prototype.reset=function(){function stripDiacritics(text){// Used 'uni range + named function' from http://jsperf.com/diacritics/18
	function match(a){return DIACRITICS[a]||a;}return text.replace(/[^\u0000-\u007E]/g,match);}function matcher(params,data){// Always return the object if there is nothing to compare
	if($.trim(params.term)===''){return data;}// Do a recursive check for options with children
	if(data.children&&data.children.length>0){// Clone the data object if there are children
	// This is required as we modify the object to remove any non-matches
	var match=$.extend(true,{},data);// Check each child of the option
	for(var c=data.children.length-1;c>=0;c--){var child=data.children[c];var matches=matcher(params,child);// If there wasn't a match, remove the object in the array
	if(matches==null){match.children.splice(c,1);}}// If any children matched, return the new object
	if(match.children.length>0){return match;}// If there were no matching children, check just the plain object
	return matcher(params,match);}var original=stripDiacritics(data.text).toUpperCase();var term=stripDiacritics(params.term).toUpperCase();// Check if the text contains the term
	if(original.indexOf(term)>-1){return data;}// If it doesn't contain the term, don't return anything
	return null;}this.defaults={amdBase:'./',amdLanguageBase:'./i18n/',closeOnSelect:true,debug:false,dropdownAutoWidth:false,escapeMarkup:Utils.escapeMarkup,language:EnglishTranslation,matcher:matcher,minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:false,sorter:function sorter(data){return data;},templateResult:function templateResult(result){return result.text;},templateSelection:function templateSelection(selection){return selection.text;},theme:'default',width:'resolve'};};Defaults.prototype.set=function(key,value){var camelKey=$.camelCase(key);var data={};data[camelKey]=value;var convertedData=Utils._convertData(data);$.extend(this.defaults,convertedData);};var defaults=new Defaults();return defaults;});S2.define('select2/options',['require','jquery','./defaults','./utils'],function(require,$,Defaults,Utils){function Options(options,$element){this.options=options;if($element!=null){this.fromElement($element);}this.options=Defaults.apply(this.options);if($element&&$element.is('input')){var InputCompat=require(this.get('amdBase')+'compat/inputData');this.options.dataAdapter=Utils.Decorate(this.options.dataAdapter,InputCompat);}}Options.prototype.fromElement=function($e){var excludedData=['select2'];if(this.options.multiple==null){this.options.multiple=$e.prop('multiple');}if(this.options.disabled==null){this.options.disabled=$e.prop('disabled');}if(this.options.language==null){if($e.prop('lang')){this.options.language=$e.prop('lang').toLowerCase();}else if($e.closest('[lang]').prop('lang')){this.options.language=$e.closest('[lang]').prop('lang');}}if(this.options.dir==null){if($e.prop('dir')){this.options.dir=$e.prop('dir');}else if($e.closest('[dir]').prop('dir')){this.options.dir=$e.closest('[dir]').prop('dir');}else{this.options.dir='ltr';}}$e.prop('disabled',this.options.disabled);$e.prop('multiple',this.options.multiple);if($e.data('select2Tags')){if(this.options.debug&&window.console&&console.warn){console.warn('Select2: The `data-select2-tags` attribute has been changed to '+'use the `data-data` and `data-tags="true"` attributes and will be '+'removed in future versions of Select2.');}$e.data('data',$e.data('select2Tags'));$e.data('tags',true);}if($e.data('ajaxUrl')){if(this.options.debug&&window.console&&console.warn){console.warn('Select2: The `data-ajax-url` attribute has been changed to '+'`data-ajax--url` and support for the old attribute will be removed'+' in future versions of Select2.');}$e.attr('ajax--url',$e.data('ajaxUrl'));$e.data('ajax--url',$e.data('ajaxUrl'));}var dataset={};// Prefer the element's `dataset` attribute if it exists
	// jQuery 1.x does not correctly handle data attributes with multiple dashes
	if($.fn.jquery&&$.fn.jquery.substr(0,2)=='1.'&&$e[0].dataset){dataset=$.extend(true,{},$e[0].dataset,$e.data());}else{dataset=$e.data();}var data=$.extend(true,{},dataset);data=Utils._convertData(data);for(var key in data){if($.inArray(key,excludedData)>-1){continue;}if($.isPlainObject(this.options[key])){$.extend(this.options[key],data[key]);}else{this.options[key]=data[key];}}return this;};Options.prototype.get=function(key){return this.options[key];};Options.prototype.set=function(key,val){this.options[key]=val;};return Options;});S2.define('select2/core',['jquery','./options','./utils','./keys'],function($,Options,Utils,KEYS){var Select2=function Select2($element,options){if($element.data('select2')!=null){$element.data('select2').destroy();}this.$element=$element;this.id=this._generateId($element);options=options||{};this.options=new Options(options,$element);Select2.__super__.constructor.call(this);// Set up the tabindex
	var tabindex=$element.attr('tabindex')||0;$element.data('old-tabindex',tabindex);$element.attr('tabindex','-1');// Set up containers and adapters
	var DataAdapter=this.options.get('dataAdapter');this.dataAdapter=new DataAdapter($element,this.options);var $container=this.render();this._placeContainer($container);var SelectionAdapter=this.options.get('selectionAdapter');this.selection=new SelectionAdapter($element,this.options);this.$selection=this.selection.render();this.selection.position(this.$selection,$container);var DropdownAdapter=this.options.get('dropdownAdapter');this.dropdown=new DropdownAdapter($element,this.options);this.$dropdown=this.dropdown.render();this.dropdown.position(this.$dropdown,$container);var ResultsAdapter=this.options.get('resultsAdapter');this.results=new ResultsAdapter($element,this.options,this.dataAdapter);this.$results=this.results.render();this.results.position(this.$results,this.$dropdown);// Bind events
	var self=this;// Bind the container to all of the adapters
	this._bindAdapters();// Register any DOM event handlers
	this._registerDomEvents();// Register any internal event handlers
	this._registerDataEvents();this._registerSelectionEvents();this._registerDropdownEvents();this._registerResultsEvents();this._registerEvents();// Set the initial state
	this.dataAdapter.current(function(initialData){self.trigger('selection:update',{data:initialData});});// Hide the original select
	$element.addClass('select2-hidden-accessible');$element.attr('aria-hidden','true');// Synchronize any monitored attributes
	this._syncAttributes();$element.data('select2',this);};Utils.Extend(Select2,Utils.Observable);Select2.prototype._generateId=function($element){var id='';if($element.attr('id')!=null){id=$element.attr('id');}else if($element.attr('name')!=null){id=$element.attr('name')+'-'+Utils.generateChars(2);}else{id=Utils.generateChars(4);}id=id.replace(/(:|\.|\[|\]|,)/g,'');id='select2-'+id;return id;};Select2.prototype._placeContainer=function($container){$container.insertAfter(this.$element);var width=this._resolveWidth(this.$element,this.options.get('width'));if(width!=null){$container.css('width',width);}};Select2.prototype._resolveWidth=function($element,method){var WIDTH=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if(method=='resolve'){var styleWidth=this._resolveWidth($element,'style');if(styleWidth!=null){return styleWidth;}return this._resolveWidth($element,'element');}if(method=='element'){var elementWidth=$element.outerWidth(false);if(elementWidth<=0){return'auto';}return elementWidth+'px';}if(method=='style'){var style=$element.attr('style');if(typeof style!=='string'){return null;}var attrs=style.split(';');for(var i=0,l=attrs.length;i<l;i=i+1){var attr=attrs[i].replace(/\s/g,'');var matches=attr.match(WIDTH);if(matches!==null&&matches.length>=1){return matches[1];}}return null;}return method;};Select2.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container);this.selection.bind(this,this.$container);this.dropdown.bind(this,this.$container);this.results.bind(this,this.$container);};Select2.prototype._registerDomEvents=function(){var self=this;this.$element.on('change.select2',function(){self.dataAdapter.current(function(data){self.trigger('selection:update',{data:data});});});this._sync=Utils.bind(this._syncAttributes,this);if(this.$element[0].attachEvent){this.$element[0].attachEvent('onpropertychange',this._sync);}var observer=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;if(observer!=null){this._observer=new observer(function(mutations){$.each(mutations,self._sync);});this._observer.observe(this.$element[0],{attributes:true,subtree:false});}else if(this.$element[0].addEventListener){this.$element[0].addEventListener('DOMAttrModified',self._sync,false);}};Select2.prototype._registerDataEvents=function(){var self=this;this.dataAdapter.on('*',function(name,params){self.trigger(name,params);});};Select2.prototype._registerSelectionEvents=function(){var self=this;var nonRelayEvents=['toggle','focus'];this.selection.on('toggle',function(){self.toggleDropdown();});this.selection.on('focus',function(params){self.focus(params);});this.selection.on('*',function(name,params){if($.inArray(name,nonRelayEvents)!==-1){return;}self.trigger(name,params);});};Select2.prototype._registerDropdownEvents=function(){var self=this;this.dropdown.on('*',function(name,params){self.trigger(name,params);});};Select2.prototype._registerResultsEvents=function(){var self=this;this.results.on('*',function(name,params){self.trigger(name,params);});};Select2.prototype._registerEvents=function(){var self=this;this.on('open',function(){self.$container.addClass('select2-container--open');});this.on('close',function(){self.$container.removeClass('select2-container--open');});this.on('enable',function(){self.$container.removeClass('select2-container--disabled');});this.on('disable',function(){self.$container.addClass('select2-container--disabled');});this.on('blur',function(){self.$container.removeClass('select2-container--focus');});this.on('query',function(params){if(!self.isOpen()){self.trigger('open',{});}this.dataAdapter.query(params,function(data){self.trigger('results:all',{data:data,query:params});});});this.on('query:append',function(params){this.dataAdapter.query(params,function(data){self.trigger('results:append',{data:data,query:params});});});this.on('keypress',function(evt){var key=evt.which;if(self.isOpen()){if(key===KEYS.ESC||key===KEYS.TAB||key===KEYS.UP&&evt.altKey){self.close();evt.preventDefault();}else if(key===KEYS.ENTER){self.trigger('results:select',{});evt.preventDefault();}else if(key===KEYS.SPACE&&evt.ctrlKey){self.trigger('results:toggle',{});evt.preventDefault();}else if(key===KEYS.UP){self.trigger('results:previous',{});evt.preventDefault();}else if(key===KEYS.DOWN){self.trigger('results:next',{});evt.preventDefault();}}else{if(key===KEYS.ENTER||key===KEYS.SPACE||key===KEYS.DOWN&&evt.altKey){self.open();evt.preventDefault();}}});};Select2.prototype._syncAttributes=function(){this.options.set('disabled',this.$element.prop('disabled'));if(this.options.get('disabled')){if(this.isOpen()){this.close();}this.trigger('disable',{});}else{this.trigger('enable',{});}};/**
	                 * Override the trigger method to automatically trigger pre-events when
	                 * there are events that can be prevented.
	                 */Select2.prototype.trigger=function(name,args){var actualTrigger=Select2.__super__.trigger;var preTriggerMap={'open':'opening','close':'closing','select':'selecting','unselect':'unselecting'};if(args===undefined){args={};}if(name in preTriggerMap){var preTriggerName=preTriggerMap[name];var preTriggerArgs={prevented:false,name:name,args:args};actualTrigger.call(this,preTriggerName,preTriggerArgs);if(preTriggerArgs.prevented){args.prevented=true;return;}}actualTrigger.call(this,name,args);};Select2.prototype.toggleDropdown=function(){if(this.options.get('disabled')){return;}if(this.isOpen()){this.close();}else{this.open();}};Select2.prototype.open=function(){if(this.isOpen()){return;}this.trigger('query',{});};Select2.prototype.close=function(){if(!this.isOpen()){return;}this.trigger('close',{});};Select2.prototype.isOpen=function(){return this.$container.hasClass('select2-container--open');};Select2.prototype.hasFocus=function(){return this.$container.hasClass('select2-container--focus');};Select2.prototype.focus=function(data){// No need to re-trigger focus events if we are already focused
	if(this.hasFocus()){return;}this.$container.addClass('select2-container--focus');this.trigger('focus',{});};Select2.prototype.enable=function(args){if(this.options.get('debug')&&window.console&&console.warn){console.warn('Select2: The `select2("enable")` method has been deprecated and will'+' be removed in later Select2 versions. Use $element.prop("disabled")'+' instead.');}if(args==null||args.length===0){args=[true];}var disabled=!args[0];this.$element.prop('disabled',disabled);};Select2.prototype.data=function(){if(this.options.get('debug')&&arguments.length>0&&window.console&&console.warn){console.warn('Select2: Data can no longer be set using `select2("data")`. You '+'should consider setting the value instead using `$element.val()`.');}var data=[];this.dataAdapter.current(function(currentData){data=currentData;});return data;};Select2.prototype.val=function(args){if(this.options.get('debug')&&window.console&&console.warn){console.warn('Select2: The `select2("val")` method has been deprecated and will be'+' removed in later Select2 versions. Use $element.val() instead.');}if(args==null||args.length===0){return this.$element.val();}var newVal=args[0];if($.isArray(newVal)){newVal=$.map(newVal,function(obj){return obj.toString();});}this.$element.val(newVal).trigger('change');};Select2.prototype.destroy=function(){this.$container.remove();if(this.$element[0].detachEvent){this.$element[0].detachEvent('onpropertychange',this._sync);}if(this._observer!=null){this._observer.disconnect();this._observer=null;}else if(this.$element[0].removeEventListener){this.$element[0].removeEventListener('DOMAttrModified',this._sync,false);}this._sync=null;this.$element.off('.select2');this.$element.attr('tabindex',this.$element.data('old-tabindex'));this.$element.removeClass('select2-hidden-accessible');this.$element.attr('aria-hidden','false');this.$element.removeData('select2');this.dataAdapter.destroy();this.selection.destroy();this.dropdown.destroy();this.results.destroy();this.dataAdapter=null;this.selection=null;this.dropdown=null;this.results=null;};Select2.prototype.render=function(){var $container=$('<span class="select2 select2-container">'+'<span class="selection"></span>'+'<span class="dropdown-wrapper" aria-hidden="true"></span>'+'</span>');$container.attr('dir',this.options.get('dir'));this.$container=$container;this.$container.addClass('select2-container--'+this.options.get('theme'));$container.data('element',this.$element);return $container;};return Select2;});S2.define('select2/compat/utils',['jquery'],function($){function syncCssClasses($dest,$src,adapter){var classes,replacements=[],adapted;classes=$.trim($dest.attr('class'));if(classes){classes=''+classes;// for IE which returns object
	$(classes.split(/\s+/)).each(function(){// Save all Select2 classes
	if(this.indexOf('select2-')===0){replacements.push(this);}});}classes=$.trim($src.attr('class'));if(classes){classes=''+classes;// for IE which returns object
	$(classes.split(/\s+/)).each(function(){// Only adapt non-Select2 classes
	if(this.indexOf('select2-')!==0){adapted=adapter(this);if(adapted!=null){replacements.push(adapted);}}});}$dest.attr('class',replacements.join(' '));}return{syncCssClasses:syncCssClasses};});S2.define('select2/compat/containerCss',['jquery','./utils'],function($,CompatUtils){// No-op CSS adapter that discards all classes by default
	function _containerAdapter(clazz){return null;}function ContainerCSS(){}ContainerCSS.prototype.render=function(decorated){var $container=decorated.call(this);var containerCssClass=this.options.get('containerCssClass')||'';if($.isFunction(containerCssClass)){containerCssClass=containerCssClass(this.$element);}var containerCssAdapter=this.options.get('adaptContainerCssClass');containerCssAdapter=containerCssAdapter||_containerAdapter;if(containerCssClass.indexOf(':all:')!==-1){containerCssClass=containerCssClass.replace(':all:','');var _cssAdapter=containerCssAdapter;containerCssAdapter=function containerCssAdapter(clazz){var adapted=_cssAdapter(clazz);if(adapted!=null){// Append the old one along with the adapted one
	return adapted+' '+clazz;}return clazz;};}var containerCss=this.options.get('containerCss')||{};if($.isFunction(containerCss)){containerCss=containerCss(this.$element);}CompatUtils.syncCssClasses($container,this.$element,containerCssAdapter);$container.css(containerCss);$container.addClass(containerCssClass);return $container;};return ContainerCSS;});S2.define('select2/compat/dropdownCss',['jquery','./utils'],function($,CompatUtils){// No-op CSS adapter that discards all classes by default
	function _dropdownAdapter(clazz){return null;}function DropdownCSS(){}DropdownCSS.prototype.render=function(decorated){var $dropdown=decorated.call(this);var dropdownCssClass=this.options.get('dropdownCssClass')||'';if($.isFunction(dropdownCssClass)){dropdownCssClass=dropdownCssClass(this.$element);}var dropdownCssAdapter=this.options.get('adaptDropdownCssClass');dropdownCssAdapter=dropdownCssAdapter||_dropdownAdapter;if(dropdownCssClass.indexOf(':all:')!==-1){dropdownCssClass=dropdownCssClass.replace(':all:','');var _cssAdapter=dropdownCssAdapter;dropdownCssAdapter=function dropdownCssAdapter(clazz){var adapted=_cssAdapter(clazz);if(adapted!=null){// Append the old one along with the adapted one
	return adapted+' '+clazz;}return clazz;};}var dropdownCss=this.options.get('dropdownCss')||{};if($.isFunction(dropdownCss)){dropdownCss=dropdownCss(this.$element);}CompatUtils.syncCssClasses($dropdown,this.$element,dropdownCssAdapter);$dropdown.css(dropdownCss);$dropdown.addClass(dropdownCssClass);return $dropdown;};return DropdownCSS;});S2.define('select2/compat/initSelection',['jquery'],function($){function InitSelection(decorated,$element,options){if(options.get('debug')&&window.console&&console.warn){console.warn('Select2: The `initSelection` option has been deprecated in favor'+' of a custom data adapter that overrides the `current` method. '+'This method is now called multiple times instead of a single '+'time when the instance is initialized. Support will be removed '+'for the `initSelection` option in future versions of Select2');}this.initSelection=options.get('initSelection');this._isInitialized=false;decorated.call(this,$element,options);}InitSelection.prototype.current=function(decorated,callback){var self=this;if(this._isInitialized){decorated.call(this,callback);return;}this.initSelection.call(null,this.$element,function(data){self._isInitialized=true;if(!$.isArray(data)){data=[data];}callback(data);});};return InitSelection;});S2.define('select2/compat/inputData',['jquery'],function($){function InputData(decorated,$element,options){this._currentData=[];this._valueSeparator=options.get('valueSeparator')||',';if($element.prop('type')==='hidden'){if(options.get('debug')&&console&&console.warn){console.warn('Select2: Using a hidden input with Select2 is no longer '+'supported and may stop working in the future. It is recommended '+'to use a `<select>` element instead.');}}decorated.call(this,$element,options);}InputData.prototype.current=function(_,callback){function getSelected(data,selectedIds){var selected=[];if(data.selected||$.inArray(data.id,selectedIds)!==-1){data.selected=true;selected.push(data);}else{data.selected=false;}if(data.children){selected.push.apply(selected,getSelected(data.children,selectedIds));}return selected;}var selected=[];for(var d=0;d<this._currentData.length;d++){var data=this._currentData[d];selected.push.apply(selected,getSelected(data,this.$element.val().split(this._valueSeparator)));}callback(selected);};InputData.prototype.select=function(_,data){if(!this.options.get('multiple')){this.current(function(allData){$.map(allData,function(data){data.selected=false;});});this.$element.val(data.id);this.$element.trigger('change');}else{var value=this.$element.val();value+=this._valueSeparator+data.id;this.$element.val(value);this.$element.trigger('change');}};InputData.prototype.unselect=function(_,data){var self=this;data.selected=false;this.current(function(allData){var values=[];for(var d=0;d<allData.length;d++){var item=allData[d];if(data.id==item.id){continue;}values.push(item.id);}self.$element.val(values.join(self._valueSeparator));self.$element.trigger('change');});};InputData.prototype.query=function(_,params,callback){var results=[];for(var d=0;d<this._currentData.length;d++){var data=this._currentData[d];var matches=this.matches(params,data);if(matches!==null){results.push(matches);}}callback({results:results});};InputData.prototype.addOptions=function(_,$options){var options=$.map($options,function($option){return $.data($option[0],'data');});this._currentData.push.apply(this._currentData,options);};return InputData;});S2.define('select2/compat/matcher',['jquery'],function($){function oldMatcher(matcher){function wrappedMatcher(params,data){var match=$.extend(true,{},data);if(params.term==null||$.trim(params.term)===''){return match;}if(data.children){for(var c=data.children.length-1;c>=0;c--){var child=data.children[c];// Check if the child object matches
	// The old matcher returned a boolean true or false
	var doesMatch=matcher(params.term,child.text,child);// If the child didn't match, pop it off
	if(!doesMatch){match.children.splice(c,1);}}if(match.children.length>0){return match;}}if(matcher(params.term,data.text,data)){return match;}return null;}return wrappedMatcher;}return oldMatcher;});S2.define('select2/compat/query',[],function(){function Query(decorated,$element,options){if(options.get('debug')&&window.console&&console.warn){console.warn('Select2: The `query` option has been deprecated in favor of a '+'custom data adapter that overrides the `query` method. Support '+'will be removed for the `query` option in future versions of '+'Select2.');}decorated.call(this,$element,options);}Query.prototype.query=function(_,params,callback){params.callback=callback;var query=this.options.get('query');query.call(null,params);};return Query;});S2.define('select2/dropdown/attachContainer',[],function(){function AttachContainer(decorated,$element,options){decorated.call(this,$element,options);}AttachContainer.prototype.position=function(decorated,$dropdown,$container){var $dropdownContainer=$container.find('.dropdown-wrapper');$dropdownContainer.append($dropdown);$dropdown.addClass('select2-dropdown--below');$container.addClass('select2-container--below');};return AttachContainer;});S2.define('select2/dropdown/stopPropagation',[],function(){function StopPropagation(){}StopPropagation.prototype.bind=function(decorated,container,$container){decorated.call(this,container,$container);var stoppedEvents=['blur','change','click','dblclick','focus','focusin','focusout','input','keydown','keyup','keypress','mousedown','mouseenter','mouseleave','mousemove','mouseover','mouseup','search','touchend','touchstart'];this.$dropdown.on(stoppedEvents.join(' '),function(evt){evt.stopPropagation();});};return StopPropagation;});S2.define('select2/selection/stopPropagation',[],function(){function StopPropagation(){}StopPropagation.prototype.bind=function(decorated,container,$container){decorated.call(this,container,$container);var stoppedEvents=['blur','change','click','dblclick','focus','focusin','focusout','input','keydown','keyup','keypress','mousedown','mouseenter','mouseleave','mousemove','mouseover','mouseup','search','touchend','touchstart'];this.$selection.on(stoppedEvents.join(' '),function(evt){evt.stopPropagation();});};return StopPropagation;});/*!
	             * jQuery Mousewheel 3.1.13
	             *
	             * Copyright jQuery Foundation and other contributors
	             * Released under the MIT license
	             * http://jquery.org/license
	             */(function(factory){if(typeof S2.define==='function'&&S2.define.amd){// AMD. Register as an anonymous module.
	S2.define('jquery-mousewheel',['jquery'],factory);}else if(( false?'undefined':_typeof(exports))==='object'){// Node/CommonJS style for Browserify
	module.exports=factory;}else{// Browser globals
	factory(jQuery);}})(function($){var toFix=['wheel','mousewheel','DOMMouseScroll','MozMousePixelScroll'],toBind='onwheel'in document||document.documentMode>=9?['wheel']:['mousewheel','DomMouseScroll','MozMousePixelScroll'],slice=Array.prototype.slice,nullLowestDeltaTimeout,lowestDelta;if($.event.fixHooks){for(var i=toFix.length;i;){$.event.fixHooks[toFix[--i]]=$.event.mouseHooks;}}var special=$.event.special.mousewheel={version:'3.1.12',setup:function setup(){if(this.addEventListener){for(var i=toBind.length;i;){this.addEventListener(toBind[--i],handler,false);}}else{this.onmousewheel=handler;}// Store the line height and page height for this particular element
	$.data(this,'mousewheel-line-height',special.getLineHeight(this));$.data(this,'mousewheel-page-height',special.getPageHeight(this));},teardown:function teardown(){if(this.removeEventListener){for(var i=toBind.length;i;){this.removeEventListener(toBind[--i],handler,false);}}else{this.onmousewheel=null;}// Clean up the data we added to the element
	$.removeData(this,'mousewheel-line-height');$.removeData(this,'mousewheel-page-height');},getLineHeight:function getLineHeight(elem){var $elem=$(elem),$parent=$elem['offsetParent'in $.fn?'offsetParent':'parent']();if(!$parent.length){$parent=$('body');}return parseInt($parent.css('fontSize'),10)||parseInt($elem.css('fontSize'),10)||16;},getPageHeight:function getPageHeight(elem){return $(elem).height();},settings:{adjustOldDeltas:true,// see shouldAdjustOldDeltas() below
	normalizeOffset:true// calls getBoundingClientRect for each event
	}};$.fn.extend({mousewheel:function mousewheel(fn){return fn?this.bind('mousewheel',fn):this.trigger('mousewheel');},unmousewheel:function unmousewheel(fn){return this.unbind('mousewheel',fn);}});function handler(event){var orgEvent=event||window.event,args=slice.call(arguments,1),delta=0,deltaX=0,deltaY=0,absDelta=0,offsetX=0,offsetY=0;event=$.event.fix(orgEvent);event.type='mousewheel';// Old school scrollwheel delta
	if('detail'in orgEvent){deltaY=orgEvent.detail*-1;}if('wheelDelta'in orgEvent){deltaY=orgEvent.wheelDelta;}if('wheelDeltaY'in orgEvent){deltaY=orgEvent.wheelDeltaY;}if('wheelDeltaX'in orgEvent){deltaX=orgEvent.wheelDeltaX*-1;}// Firefox < 17 horizontal scrolling related to DOMMouseScroll event
	if('axis'in orgEvent&&orgEvent.axis===orgEvent.HORIZONTAL_AXIS){deltaX=deltaY*-1;deltaY=0;}// Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
	delta=deltaY===0?deltaX:deltaY;// New school wheel delta (wheel event)
	if('deltaY'in orgEvent){deltaY=orgEvent.deltaY*-1;delta=deltaY;}if('deltaX'in orgEvent){deltaX=orgEvent.deltaX;if(deltaY===0){delta=deltaX*-1;}}// No change actually happened, no reason to go any further
	if(deltaY===0&&deltaX===0){return;}// Need to convert lines and pages to pixels if we aren't already in pixels
	// There are three delta modes:
	//   * deltaMode 0 is by pixels, nothing to do
	//   * deltaMode 1 is by lines
	//   * deltaMode 2 is by pages
	if(orgEvent.deltaMode===1){var lineHeight=$.data(this,'mousewheel-line-height');delta*=lineHeight;deltaY*=lineHeight;deltaX*=lineHeight;}else if(orgEvent.deltaMode===2){var pageHeight=$.data(this,'mousewheel-page-height');delta*=pageHeight;deltaY*=pageHeight;deltaX*=pageHeight;}// Store lowest absolute delta to normalize the delta values
	absDelta=Math.max(Math.abs(deltaY),Math.abs(deltaX));if(!lowestDelta||absDelta<lowestDelta){lowestDelta=absDelta;// Adjust older deltas if necessary
	if(shouldAdjustOldDeltas(orgEvent,absDelta)){lowestDelta/=40;}}// Adjust older deltas if necessary
	if(shouldAdjustOldDeltas(orgEvent,absDelta)){// Divide all the things by 40!
	delta/=40;deltaX/=40;deltaY/=40;}// Get a whole, normalized value for the deltas
	delta=Math[delta>=1?'floor':'ceil'](delta/lowestDelta);deltaX=Math[deltaX>=1?'floor':'ceil'](deltaX/lowestDelta);deltaY=Math[deltaY>=1?'floor':'ceil'](deltaY/lowestDelta);// Normalise offsetX and offsetY properties
	if(special.settings.normalizeOffset&&this.getBoundingClientRect){var boundingRect=this.getBoundingClientRect();offsetX=event.clientX-boundingRect.left;offsetY=event.clientY-boundingRect.top;}// Add information to the event object
	event.deltaX=deltaX;event.deltaY=deltaY;event.deltaFactor=lowestDelta;event.offsetX=offsetX;event.offsetY=offsetY;// Go ahead and set deltaMode to 0 since we converted to pixels
	// Although this is a little odd since we overwrite the deltaX/Y
	// properties with normalized deltas.
	event.deltaMode=0;// Add event and delta to the front of the arguments
	args.unshift(event,delta,deltaX,deltaY);// Clearout lowestDelta after sometime to better
	// handle multiple device types that give different
	// a different lowestDelta
	// Ex: trackpad = 3 and mouse wheel = 120
	if(nullLowestDeltaTimeout){clearTimeout(nullLowestDeltaTimeout);}nullLowestDeltaTimeout=setTimeout(nullLowestDelta,200);return($.event.dispatch||$.event.handle).apply(this,args);}function nullLowestDelta(){lowestDelta=null;}function shouldAdjustOldDeltas(orgEvent,absDelta){// If this is an older event and the delta is divisable by 120,
	// then we are assuming that the browser is treating this as an
	// older mouse wheel event and that we should divide the deltas
	// by 40 to try and get a more usable deltaFactor.
	// Side note, this actually impacts the reported scroll distance
	// in older browsers and can cause scrolling to be slower than native.
	// Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
	return special.settings.adjustOldDeltas&&orgEvent.type==='mousewheel'&&absDelta%120===0;}});S2.define('jquery.select2',['jquery','jquery-mousewheel','./select2/core','./select2/defaults'],function($,_,Select2,Defaults){if($.fn.select2==null){// All methods that should return the element
	var thisMethods=['open','close','destroy'];$.fn.select2=function(options){options=options||{};if((typeof options==='undefined'?'undefined':_typeof(options))==='object'){this.each(function(){var instanceOptions=$.extend(true,{},options);var instance=new Select2($(this),instanceOptions);});return this;}else if(typeof options==='string'){var ret;this.each(function(){var instance=$(this).data('select2');if(instance==null&&window.console&&console.error){console.error('The select2(\''+options+'\') method was called on an '+'element that is not using Select2.');}var args=Array.prototype.slice.call(arguments,1);ret=instance[options].apply(instance,args);});// Check if we should be returning `this`
	if($.inArray(options,thisMethods)>-1){return this;}return ret;}else{throw new Error('Invalid arguments for Select2: '+options);}};}if($.fn.select2.defaults==null){$.fn.select2.defaults=Defaults;}return Select2;});// Return the AMD loader configuration so it can be used outside of this file
	return{define:S2.define,require:S2.require};}();// Autoload the jQuery bindings
	// We know that all of the modules exist above this, so we're safe
	var select2=S2.require('jquery.select2');// Hold the AMD module references on the jQuery function that was just loaded
	// This allows Select2 to use the internal loader outside of this file, such
	// as in the language files.
	jQuery.fn.select2.amd=S2;// Return the Select2 instance for anyone who is importing it.
	return select2;});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 182 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n\n    <bread-crumb :title=\"title\" :paths=\"breadcrumbs\"></bread-crumb>\n\n    <div class=\" wrapper wrapper-content animated fadeInRight\">\n\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n\n                <div class=\"ibox float-e-margins\">\n                    <div class=\"ibox-title\">\n                        <h5>{{title}}</h5>\n\n                        <div class=\"ibox-tools\"></div>\n                    </div>\n                    <div class=\"ibox-content\">\n\n                        <form class=\"form-horizontal\" @submit.prevent=\"createData\">\n\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">小区名称：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"text\" class=\"form-control\" v-model=\"data.title\">\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['title']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">小区城市：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <select class=\"form-control\" v-model=\"data.city_id\">\n                                        <option value=\"0\">请选择</option>\n                                        <option v-for=\"city in categories\" :value=\"city.id\">\n                                            {{city.name}}\n                                        </option>\n                                    </select>\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['city_id']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">小区状态：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <select class=\"form-control\" v-model=\"data.status\">\n                                        <option value=\"0\">请选择</option>\n                                        <option v-for=\"sta in status\" :value=\"sta.id\">\n                                            {{sta.name}}\n                                        </option>\n                                    </select>\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['status']}}</label>\n                                </div>\n                            </div>\n                            <!--<div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">小区标签：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <select class=\"form-control\" id=\"select2\" multiple=\"multiple\" style=\"display: none;\">\n                                        <option v-for=\"tag in tags\" :value=\"tag.id\">\n                                            {{tag.name}}\n                                        </option>\n                                    </select>\n                                </div>\n                            </div>-->\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">小区描述：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <textarea class=\"form-control\" v-model=\"data.description\"></textarea>\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['description']}}</label>\n                                </div>\n                            </div>\n                            <!--<div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">小区内容：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <editor :model.sync=\"data.content\"></editor>\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['content']}}</label>\n                                </div>\n                            </div>-->\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <div class=\"col-sm-4 col-sm-offset-2\">\n                                    <button type=\"submit\" class=\"btn btn-primary\">提交\n                                    </button>\n                                    <a v-link=\"{name:'post_index'}\" class=\"btn btn-white\">取消</a>\n                                </div>\n                            </div>\n                        </form>\n\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n</div>\n";

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(184)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\post\\edit.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(189)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./edit.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _promise = __webpack_require__(85);

	var _promise2 = _interopRequireDefault(_promise);

	var _indexOf = __webpack_require__(185);

	var _indexOf2 = _interopRequireDefault(_indexOf);

	var _breadCrumb = __webpack_require__(68);

	var _breadCrumb2 = _interopRequireDefault(_breadCrumb);

	var _editor = __webpack_require__(170);

	var _editor2 = _interopRequireDefault(_editor);

	var _utils = __webpack_require__(73);

	__webpack_require__(179);

	__webpack_require__(181);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    ready: function ready() {
	        var vm = this;
	        this.data.id = this.$route.params.id;

	        this.getData().then(function () {
	            $('#select2').select2({
	                placeholder: '选择标签',
	                tags: true
	            }).on('change.select2', function () {
	                vm.data.tagIds = $('#select2').val();
	            }).trigger('change');
	        });
	    },
	    data: function data() {
	        return {
	            title: '小区修改',
	            breadcrumbs: [{
	                name: '首页',
	                url: ''
	            }, {
	                name: '小区修改',
	                url: ''
	            }],
	            categories: [],
	            tags: [],
	            data: {
	                title: '',
	                city_id: 0,
	                description: '',
	                tags: [],
	                tagIds: [],
	                content: ''
	            },
	            errors: null
	        };
	    },
	    computed: {
	        initSelectedTds: function initSelectedTds() {
	            var arr = [];
	            for (var index in this.data.tags) {
	                arr.push(this.data.tags[index]['id']);
	            }
	            return arr;
	        }
	    },
	    components: {
	        'bread-crumb': _breadCrumb2.default,
	        'editor': _editor2.default
	    },
	    methods: {
	        inArray: function inArray(array, item) {
	            return (0, _indexOf2.default)(array, item) > -1;
	        },
	        getData: function getData() {
	            return new _promise2.default(function (resolve, reject) {
	                this.$http.get('post/' + this.data.id + '/edit').then(function (result) {
	                    var data = result.data;
	                    if (data.flag == true && data.data) {
	                        this.data = (0, _utils.extend)(this.data, data.data);
	                        this.categories = data.categories;
	                        this.tags = data.tags;
	                    }
	                    this.$toast['success'](data.msg);
	                    resolve(result);
	                }, function (error) {
	                    reject(error);
	                });
	            }.bind(this));
	        },
	        updateData: function updateData() {
	            this.$http.put('post/' + this.data.id, this.data).then(function (result) {
	                var data = result.data;
	                if (data.flag == true) {
	                    this.$route.router.go('/main/post/index');
	                }
	                if (data.errors) {
	                    this.errors = data.errors;
	                }
	                this.$toast['success'](data.msg);
	            });
	        }
	    }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(186), __esModule: true };

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(187);
	module.exports = __webpack_require__(96).Array.indexOf;

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export       = __webpack_require__(94)
	  , $indexOf      = __webpack_require__(120)(false)
	  , $native       = [].indexOf
	  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(188)($native)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? $native.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments[1]);
	  }
	});

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	var fails = __webpack_require__(105);

	module.exports = function(method, arg){
	  return !!method && fails(function(){
	    arg ? method.call(null, function(){}, 1) : method.call(null);
	  });
	};

/***/ },
/* 189 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n\n    <bread-crumb :title=\"title\" :paths=\"breadcrumbs\"></bread-crumb>\n\n    <div class=\" wrapper wrapper-content animated fadeInRight\">\n\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n\n                <div class=\"ibox float-e-margins\">\n                    <div class=\"ibox-title\">\n                        <h5>{{title}}</h5>\n\n                        <div class=\"ibox-tools\"></div>\n                    </div>\n                    <div class=\"ibox-content\">\n\n                        <form class=\"form-horizontal\" @submit.prevent=\"updateData\">\n\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">小区名称：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"text\" class=\"form-control\" v-model=\"data.title\">\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['title']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">小区城市：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <select class=\"form-control\" v-model=\"data.city_id\">\n                                        <option v-for=\"city in categories\" :value=\"city.id\">\n                                            {{city.name}}\n                                        </option>\n                                    </select>\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['city_id']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">小区标签：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <select class=\"form-control\" id=\"select2\" multiple=\"multiple\" style=\"display: none;\">\n                                        <option v-for=\"tag in tags\" :value=\"tag.id\"\n                                                :selected=\"inArray(initSelectedTds,tag.id)\">\n                                            {{tag.name}}\n                                        </option>\n                                    </select>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">小区描述：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <textarea class=\"form-control\" v-model=\"data.description\"></textarea>\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['description']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">小区内容：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <editor :model.sync=\"data.content\"></editor>\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['content']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <div class=\"col-sm-4 col-sm-offset-2\">\n                                    <button type=\"submit\" class=\"btn btn-primary\">提交\n                                    </button>\n                                    <a v-link=\"{name:'post_index'}\" class=\"btn btn-white\">取消</a>\n                                </div>\n                            </div>\n                        </form>\n\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n</div>\n";

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(191)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\tag\\index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(192)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _breadCrumb = __webpack_require__(68);

	var _breadCrumb2 = _interopRequireDefault(_breadCrumb);

	var _dataTable = __webpack_require__(71);

	var _dataTable2 = _interopRequireDefault(_dataTable);

	var _pagination = __webpack_require__(75);

	var _pagination2 = _interopRequireDefault(_pagination);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    ready: function ready() {
	        this.getData();
	    },
	    data: function data() {
	        return {
	            title: '标签列表',
	            breadcrumbs: [{
	                name: '首页',
	                url: ''
	            }, {
	                name: '标签列表',
	                url: ''
	            }],
	            page: 1,
	            pageSize: 15,
	            count: 0,
	            data: [],
	            columns: {
	                id: '#',
	                name: '名称',
	                created_at: '创建时间'
	            }

	        };
	    },
	    components: {
	        'bread-crumb': _breadCrumb2.default,
	        'data-table': _dataTable2.default,
	        'pagination': _pagination2.default
	    },
	    methods: {
	        getData: function getData() {
	            this.$http.get('tag', {
	                page: this.page,
	                page_size: this.pageSize
	            }).then(function (result) {
	                var data = result.data;
	                this.data = data.data;
	                this.count = data.count;
	            });
	        }
	    },
	    events: {
	        onEdit: function onEdit(id) {
	            this.$route.router.go({ name: 'tag_edit', params: { id: id } });
	        },
	        onDelete: function onDelete(id) {
	            this.$http.delete('tag/' + id).then(function (result) {
	                var data = result.data;
	                if (data.flag == true) {
	                    this.getData();
	                }
	                this.$toast['success'](data.msg);
	            });
	        },
	        onChangePage: function onChangePage(page) {
	            this.page = page;
	            this.getData();
	        }
	    }
	};

/***/ },
/* 192 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n\n    <bread-crumb :title=\"title\" :paths=\"breadcrumbs\"></bread-crumb>\n\n    <div class=\" wrapper wrapper-content animated fadeInRight\">\n\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n\n                <div class=\"ibox float-e-margins\">\n                    <div class=\"ibox-title\">\n                        <h5>{{title}}</h5>\n\n                        <div class=\"ibox-tools\"></div>\n                    </div>\n                    <div class=\"ibox-content\">\n\n                        <data-table :data=\"data\" :columns=\"columns\"></data-table>\n\n                        <div class=\"row\">\n                            <div class=\"col-lg-12\">\n                                <div class=\"pull-right\">\n                                    <pagination :count=\"count\" :page=\"page\" :page-size=\"pageSize\"></pagination>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n</div>\n";

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(194)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\tag\\create.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(195)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./create.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _breadCrumb = __webpack_require__(68);

	var _breadCrumb2 = _interopRequireDefault(_breadCrumb);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            title: '标签创建',
	            breadcrumbs: [{
	                name: '首页',
	                url: ''
	            }, {
	                name: '标签创建',
	                url: ''
	            }],
	            categories: [],
	            data: {
	                name: ''
	            },
	            errors: null
	        };
	    },
	    components: {
	        'bread-crumb': _breadCrumb2.default
	    },
	    methods: {
	        createData: function createData() {
	            this.$http.post('tag', this.data).then(function (result) {
	                var data = result.data;
	                if (data.flag == true) {
	                    this.$route.router.go('/main/tag/index');
	                }
	                if (data.errors) {
	                    this.errors = data.errors;
	                }
	                this.$toast['success'](data.msg);
	            });
	        }
	    }
	};

/***/ },
/* 195 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n\n    <bread-crumb :title=\"title\" :paths=\"breadcrumbs\"></bread-crumb>\n\n    <div class=\" wrapper wrapper-content animated fadeInRight\">\n\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n\n                <div class=\"ibox float-e-margins\">\n                    <div class=\"ibox-title\">\n                        <h5>{{title}}</h5>\n\n                        <div class=\"ibox-tools\"></div>\n                    </div>\n                    <div class=\"ibox-content\">\n\n                        <form class=\"form-horizontal\" @submit.prevent=\"createData\">\n\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">标签名称：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"text\" class=\"form-control\" v-model=\"data.name\">\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['name']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <div class=\"col-sm-4 col-sm-offset-2\">\n                                    <button type=\"submit\" class=\"btn btn-primary\">提交\n                                    </button>\n                                    <a v-link=\"{name:'tag_index'}\" class=\"btn btn-white\">取消</a>\n                                </div>\n                            </div>\n                        </form>\n\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n</div>\n";

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(197)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\tag\\edit.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(198)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./edit.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _breadCrumb = __webpack_require__(68);

	var _breadCrumb2 = _interopRequireDefault(_breadCrumb);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    ready: function ready() {
	        this.data.id = this.$route.params.id;
	        this.$http.get('tag/' + this.data.id + '/edit').then(function (result) {
	            var data = result.data;
	            if (data.flag == true && data.data) {
	                this.data = data.data;
	            }
	            this.$toast['success'](data.msg);
	        });
	    },
	    data: function data() {
	        return {
	            title: '标签修改',
	            breadcrumbs: [{
	                name: '首页',
	                url: ''
	            }, {
	                name: '标签修改',
	                url: ''
	            }],
	            categories: [],
	            data: {
	                id: 0,
	                name: ''
	            },
	            errors: null
	        };
	    },
	    components: {
	        'bread-crumb': _breadCrumb2.default
	    },
	    methods: {
	        updateData: function updateData() {
	            this.$http.put('tag/' + this.data.id, this.data).then(function (result) {
	                var data = result.data;
	                if (data.flag == true) {
	                    this.$route.router.go('/main/tag/index');
	                }
	                if (data.errors) {
	                    this.errors = data.errors;
	                }
	                this.$toast['success'](data.msg);
	            });
	        }
	    }
	};

/***/ },
/* 198 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n\n    <bread-crumb :title=\"title\" :paths=\"breadcrumbs\"></bread-crumb>\n\n    <div class=\" wrapper wrapper-content animated fadeInRight\">\n\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n\n                <div class=\"ibox float-e-margins\">\n                    <div class=\"ibox-title\">\n                        <h5>{{title}}</h5>\n\n                        <div class=\"ibox-tools\"></div>\n                    </div>\n                    <div class=\"ibox-content\">\n\n                        <form class=\"form-horizontal\" @submit.prevent=\"updateData\">\n\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">标签名称：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"text\" class=\"form-control\" v-model=\"data.name\">\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['name']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <div class=\"col-sm-4 col-sm-offset-2\">\n                                    <button type=\"submit\" class=\"btn btn-primary\">提交\n                                    </button>\n                                    <a v-link=\"{name:'tag_index'}\" class=\"btn btn-white\">取消</a>\n                                </div>\n                            </div>\n                        </form>\n\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n</div>\n";

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(200)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\comment\\index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(201)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _breadCrumb = __webpack_require__(68);

	var _breadCrumb2 = _interopRequireDefault(_breadCrumb);

	var _dataTable = __webpack_require__(71);

	var _dataTable2 = _interopRequireDefault(_dataTable);

	var _pagination = __webpack_require__(75);

	var _pagination2 = _interopRequireDefault(_pagination);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    ready: function ready() {
	        this.getData();
	    },
	    data: function data() {
	        return {
	            title: '评论列表',
	            breadcrumbs: [{
	                name: '首页',
	                url: ''
	            }, {
	                name: '评论列表',
	                url: ''
	            }],
	            page: 1,
	            pageSize: 15,
	            count: 0,
	            data: [],
	            columns: {
	                id: '#',
	                name: '姓名',
	                created_at: '评论时间'
	            },
	            actions: [{
	                name: 'edit',
	                display: '查看',
	                prop: 'id'
	            }, {
	                name: 'delete',
	                display: '删除',
	                prop: 'id'
	            }]
	        };
	    },
	    components: {
	        'bread-crumb': _breadCrumb2.default,
	        'data-table': _dataTable2.default,
	        'pagination': _pagination2.default
	    },
	    methods: {
	        getData: function getData() {
	            this.$http.get('comment', {
	                page: this.page,
	                page_size: this.pageSize
	            }).then(function (result) {
	                var data = result.data;
	                this.data = data.data;
	                this.count = data.count;
	            });
	        }
	    },
	    events: {
	        onEdit: function onEdit(id) {
	            this.$route.router.go({ name: 'comment_edit', params: { id: id } });
	        },
	        onDelete: function onDelete(id) {
	            this.$http.delete('comment/' + id).then(function (result) {
	                var data = result.data;
	                if (data.flag == true) {
	                    this.getData();
	                }
	                this.$toast['success'](data.msg);
	            });
	        },
	        onChangePage: function onChangePage(page) {
	            this.page = page;
	            this.getData();
	        }
	    }
	};

/***/ },
/* 201 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n\n    <bread-crumb :title=\"title\" :paths=\"breadcrumbs\"></bread-crumb>\n\n    <div class=\" wrapper wrapper-content animated fadeInRight\">\n\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n\n                <div class=\"ibox float-e-margins\">\n                    <div class=\"ibox-title\">\n                        <h5>{{title}}</h5>\n\n                        <div class=\"ibox-tools\"></div>\n                    </div>\n                    <div class=\"ibox-content\">\n\n                        <data-table :data=\"data\" :columns=\"columns\" :actions=\"actions\"></data-table>\n\n                        <div class=\"row\">\n                            <div class=\"col-lg-12\">\n                                <div class=\"pull-right\">\n                                    <pagination :count=\"count\" :page=\"page\" :page-size=\"pageSize\"></pagination>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n</div>\n";

/***/ },
/* 202 */
/***/ function(module, exports) {

	var __vue_script__, __vue_template__
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(204)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\comment\\edit.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(205)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./edit.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _promise = __webpack_require__(85);

	var _promise2 = _interopRequireDefault(_promise);

	var _breadCrumb = __webpack_require__(68);

	var _breadCrumb2 = _interopRequireDefault(_breadCrumb);

	var _utils = __webpack_require__(73);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    ready: function ready() {
	        this.data.id = this.$route.params.id;
	        this.getData();
	    },
	    data: function data() {
	        return {
	            title: '评论查看',
	            breadcrumbs: [{
	                name: '首页',
	                url: ''
	            }, {
	                name: '评论查看',
	                url: ''
	            }],
	            data: {
	                id: 0,
	                post: {},
	                name: '',
	                email: '',
	                website: '',
	                content: ''
	            },
	            errors: null
	        };
	    },
	    components: {
	        'bread-crumb': _breadCrumb2.default
	    },
	    methods: {
	        getData: function getData() {
	            return new _promise2.default(function (resolve, reject) {
	                this.$http.get('comment/' + this.data.id + '/edit').then(function (result) {
	                    var data = result.data;
	                    if (data.flag == true && data.data) {
	                        this.data = (0, _utils.extend)(this.data, data.data);
	                    }
	                    this.$toast['success'](data.msg);
	                    resolve(result);
	                }, function (error) {
	                    reject(error);
	                });
	            }.bind(this));
	        },
	        updateData: function updateData() {}
	    }
	};

/***/ },
/* 205 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n\n    <bread-crumb :title=\"title\" :paths=\"breadcrumbs\"></bread-crumb>\n\n    <div class=\" wrapper wrapper-content animated fadeInRight\">\n\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n\n                <div class=\"ibox float-e-margins\">\n                    <div class=\"ibox-title\">\n                        <h5>{{title}}</h5>\n\n                        <div class=\"ibox-tools\"></div>\n                    </div>\n                    <div class=\"ibox-content\">\n\n                        <form class=\"form-horizontal\" @submit.prevent=\"updateData\">\n\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">评论人：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"text\" class=\"form-control\" v-model=\"data.name\" disabled>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">评论小区：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"text\" class=\"form-control\" v-model=\"data.post.title\" disabled>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">邮箱：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"text\" class=\"form-control\" v-model=\"data.email\" disabled>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">网站：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"text\" class=\"form-control\" v-model=\"data.website\" disabled>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">评论内容：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <textarea class=\"form-control\" v-model=\"data.content\" disabled></textarea>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <div class=\"col-sm-4 col-sm-offset-2\">\n                                    <a v-link=\"{name:'comment_index'}\" class=\"btn btn-white\">取消</a>\n                                </div>\n                            </div>\n                        </form>\n\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n</div>\n";

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(207)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\user\\index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(208)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _breadCrumb = __webpack_require__(68);

	var _breadCrumb2 = _interopRequireDefault(_breadCrumb);

	var _dataTable = __webpack_require__(71);

	var _dataTable2 = _interopRequireDefault(_dataTable);

	var _pagination = __webpack_require__(75);

	var _pagination2 = _interopRequireDefault(_pagination);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    ready: function ready() {
	        this.getData();
	    },
	    data: function data() {
	        return {
	            title: '用户列表',
	            breadcrumbs: [{
	                name: '首页',
	                url: ''
	            }, {
	                name: '用户列表',
	                url: ''
	            }],
	            page: 1,
	            pageSize: 15,
	            count: 0,
	            data: [],
	            columns: {
	                id: '#',
	                name: '姓名',
	                email: '邮箱',
	                created_at: '创建时间'
	            }

	        };
	    },
	    components: {
	        'bread-crumb': _breadCrumb2.default,
	        'data-table': _dataTable2.default,
	        'pagination': _pagination2.default
	    },
	    methods: {
	        getData: function getData() {
	            this.$http.get('user', {
	                page: this.page,
	                page_size: this.pageSize
	            }).then(function (result) {
	                var data = result.data;
	                this.data = data.data;
	                this.count = data.count;
	            });
	        }
	    },
	    events: {
	        onEdit: function onEdit(id) {
	            this.$route.router.go({ name: 'user_edit', params: { id: id } });
	        },
	        onDelete: function onDelete(id) {
	            this.$http.delete('user/' + id).then(function (result) {
	                var data = result.data;
	                if (data.flag == true) {
	                    this.getData();
	                }
	                this.$toast['success'](data.msg);
	            });
	        },
	        onChangePage: function onChangePage(page) {
	            this.page = page;
	            this.getData();
	        }
	    }
	};

/***/ },
/* 208 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n\n    <bread-crumb :title=\"title\" :paths=\"breadcrumbs\"></bread-crumb>\n\n    <div class=\" wrapper wrapper-content animated fadeInRight\">\n\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n\n                <div class=\"ibox float-e-margins\">\n                    <div class=\"ibox-title\">\n                        <h5>{{title}}</h5>\n\n                        <div class=\"ibox-tools\"></div>\n                    </div>\n                    <div class=\"ibox-content\">\n\n                        <data-table :data=\"data\" :columns=\"columns\"></data-table>\n\n                        <div class=\"row\">\n                            <div class=\"col-lg-12\">\n                                <div class=\"pull-right\">\n                                    <pagination :count=\"count\" :page=\"page\" :page-size=\"pageSize\"></pagination>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n</div>\n";

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(210)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\user\\create.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(211)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./create.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _breadCrumb = __webpack_require__(68);

	var _breadCrumb2 = _interopRequireDefault(_breadCrumb);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            title: '用户创建',
	            breadcrumbs: [{
	                name: '首页',
	                url: ''
	            }, {
	                name: '用户创建',
	                url: ''
	            }],
	            data: {
	                name: '',
	                email: '',
	                password: '',
	                repeat_password: ''
	            },
	            errors: null
	        };
	    },
	    components: {
	        'bread-crumb': _breadCrumb2.default
	    },
	    methods: {
	        createData: function createData() {
	            this.$http.post('user', this.data).then(function (result) {
	                var data = result.data;
	                if (data.flag == true) {
	                    this.$route.router.go('/main/user/index');
	                }
	                if (data.errors) {
	                    this.errors = data.errors;
	                }
	                this.$toast['success'](data.msg);
	            });
	        }
	    }
	};

/***/ },
/* 211 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n\n    <bread-crumb :title=\"title\" :paths=\"breadcrumbs\"></bread-crumb>\n\n    <div class=\" wrapper wrapper-content animated fadeInRight\">\n\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n\n                <div class=\"ibox float-e-margins\">\n                    <div class=\"ibox-title\">\n                        <h5>{{title}}</h5>\n\n                        <div class=\"ibox-tools\"></div>\n                    </div>\n                    <div class=\"ibox-content\">\n\n                        <form class=\"form-horizontal\" @submit.prevent=\"createData\">\n\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">邮箱：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"text\" class=\"form-control\" v-model=\"data.email\"\n                                           :disabled=\"data.id\">\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['email']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">密码：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"password\" class=\"form-control\" v-model=\"data.password\">\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['password']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">确认密码：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"password\" class=\"form-control\" v-model=\"data.repeat_password\">\n                                    <label class=\"help-block error\"\n                                           v-if=\"errors\">{{errors['repeat_password']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">姓名：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"text\" class=\"form-control\" v-model=\"data.name\">\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <div class=\"col-sm-4 col-sm-offset-2\">\n                                    <button type=\"submit\" class=\"btn btn-primary\">提交\n                                    </button>\n                                    <a v-link=\"{name:'admin_index'}\" class=\"btn btn-white\">取消</a>\n                                </div>\n                            </div>\n                        </form>\n\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n</div>\n";

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(213)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources\\admin\\views\\user\\edit.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(214)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./edit.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(73);

	var _breadCrumb = __webpack_require__(68);

	var _breadCrumb2 = _interopRequireDefault(_breadCrumb);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    ready: function ready() {
	        this.data.id = this.$route.params.id;
	        this.getData();
	    },
	    data: function data() {
	        return {
	            title: '管理员编辑',
	            breadcrumbs: [{
	                name: '首页',
	                url: ''
	            }, {
	                name: '管理员编辑',
	                url: ''
	            }],
	            data: {
	                id: 0,
	                name: '',
	                email: '',
	                password: '',
	                new_password: ''
	            },
	            errors: null
	        };
	    },
	    components: {
	        'bread-crumb': _breadCrumb2.default
	    },
	    methods: {
	        getData: function getData() {
	            this.$http.get('user/' + this.data.id + '/edit').then(function (result) {
	                var data = result.data;
	                if (data.flag == true && data.data) {
	                    this.data = (0, _utils.extend)(this.data, data.data);
	                }
	                this.$toast['success'](data.msg);
	            });
	        },
	        updateData: function updateData() {
	            this.$http.put('user/' + this.data.id, this.data).then(function (result) {
	                var data = result.data;
	                if (data.flag == true && data.data) {
	                    this.data = (0, _utils.extend)(this.data, data.data);
	                    this.errors = {};
	                }
	                if (data.errors) {
	                    this.errors = data.errors;
	                }
	                this.$toast['success'](data.msg);
	            });
	        }
	    }
	};

/***/ },
/* 214 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n\n    <bread-crumb :title=\"title\" :paths=\"breadcrumbs\"></bread-crumb>\n\n    <div class=\" wrapper wrapper-content animated fadeInRight\">\n\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n\n                <div class=\"ibox float-e-margins\">\n                    <div class=\"ibox-title\">\n                        <h5>{{title}}</h5>\n\n                        <div class=\"ibox-tools\"></div>\n                    </div>\n                    <div class=\"ibox-content\">\n\n                        <form class=\"form-horizontal\" @submit.prevent=\"updateData\">\n\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">邮箱：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"text\" class=\"form-control\" v-model=\"data.email\"\n                                           :disabled=\"data.id\">\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['email']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">旧密码：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"password\" class=\"form-control\" v-model=\"data.password\">\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['password']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">新密码：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"password\" class=\"form-control\" v-model=\"data.new_password\">\n                                    <label class=\"help-block error\" v-if=\"errors\">{{errors['new_password']}}</label>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">姓名：</label>\n\n                                <div class=\"col-sm-10\">\n                                    <input type=\"text\" class=\"form-control\" v-model=\"data.name\">\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <div class=\"col-sm-4 col-sm-offset-2\">\n                                    <button type=\"submit\" class=\"btn btn-primary\">提交\n                                    </button>\n                                    <a v-link=\"{name:'admin_index'}\" class=\"btn btn-white\">取消</a>\n                                </div>\n                            </div>\n                        </form>\n\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n</div>\n";

/***/ }
]);