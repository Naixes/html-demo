(function (modules) { // webpackBootstrap 启动函数
	// The module cache  定义一个缓存
	var installedModules = {}; // "./src/index.js": 对象

	// The require function 实现了require
	function __webpack_require__(moduleId) {

		// Check if module is in cache 检查是否缓存过
		if (installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		// Create a new module (and put it into the cache) 
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		};

		// Execute the module function
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		// Flag the module as loaded
		module.l = true;

		// Return the exports of the module
		return module.exports;

	}

	// expose the modules object (__webpack_modules__)
	__webpack_require__.m = modules;

	// expose the module cache
	__webpack_require__.c = installedModules;

	// define getter function for harmony exports
	__webpack_require__.d = function (exports, name, getter) {
		if (!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, { enumerable: true, get: getter });

		}

	};

	// define __esModule on exports
	__webpack_require__.r = function (exports) {
		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

		}
		Object.defineProperty(exports, '__esModule', { value: true });

	};

	__webpack_require__.t = function (value, mode) {
		if (mode & 1) value = __webpack_require__(value);
		if (mode & 8) return value;
		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
		var ns = Object.create(null);
		__webpack_require__.r(ns);
		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
		if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
		return ns;

	};

	// getDefaultExport function for compatibility with non-harmony modules
	__webpack_require__.n = function (module) {
		var getter = module && module.__esModule ?
			function getDefault() { return module['default']; } :
			function getModuleExports() { return module; };
		__webpack_require__.d(getter, 'a', getter);
		return getter;

	};

	// Object.prototype.hasOwnProperty.call
	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

	// __webpack_public_path__
	__webpack_require__.p = "";


	// Load entry module and return exports 调用require
	return __webpack_require__(__webpack_require__.s = "./src/index.js"); // 入口模块

})
	({
		// 传入到webpack启动函数中的参数
		"./src/index.js": // 模块路径
			(function (module, exports) { // 函数
				eval("console.log('hello')\n\n//# sourceURL=webpack:///./src/index.js?");
			})
	});