(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("clipboard"), require("@angular/core"));
	else if(typeof define === 'function' && define.amd)
		define("xng", ["clipboard", "@angular/core"], factory);
	else if(typeof exports === 'object')
		exports["xng"] = factory(require("clipboard"), require("@angular/core"));
	else
		root["xng"] = factory(root["clipboard"], root["ng"]["core"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_clipboard__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_clipboard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_clipboard__);
/* harmony reexport (module object) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1_clipboard__; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return ClipboardDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ClipboardDirective = (function () {
    function ClipboardDirective(elmRef) {
        this.elmRef = elmRef;
        this.onSuccess = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onError = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ClipboardDirective.prototype.ngOnInit = function () {
        var _this = this;
        var option;
        option = !!this.targetElm ? { target: function () { return _this.targetElm; } } : { text: function () { return _this.cbContent; } };
        this.clipboard = new __WEBPACK_IMPORTED_MODULE_1_clipboard__(this.elmRef.nativeElement, option);
        this.clipboard.on('success', function () { return _this.onSuccess.emit(true); });
        this.clipboard.on('error', function () { return _this.onError.emit(true); });
    };
    ClipboardDirective.prototype.ngOnDestroy = function () {
        if (this.clipboard) {
            this.clipboard.destroy();
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('ngxClipboard'), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], ClipboardDirective.prototype, "targetElm", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], ClipboardDirective.prototype, "cbContent", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('cbOnSuccess'), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], ClipboardDirective.prototype, "onSuccess", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('cbOnError'), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], ClipboardDirective.prototype, "onError", void 0);
    ClipboardDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[ngxClipboard]'
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], ClipboardDirective);
    return ClipboardDirective;
}());


/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__clipboard_directive__ = __webpack_require__(0);
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "Clipboard", function() { return __WEBPACK_IMPORTED_MODULE_1__clipboard_directive__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "ClipboardDirective", function() { return __WEBPACK_IMPORTED_MODULE_1__clipboard_directive__["b"]; });
/* harmony export (binding) */ __webpack_require__.d(exports, "ClipboardModule", function() { return ClipboardModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ClipboardModule = (function () {
    function ClipboardModule() {
    }
    ClipboardModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__clipboard_directive__["b" /* ClipboardDirective */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__clipboard_directive__["b" /* ClipboardDirective */]]
        }), 
        __metadata('design:paramtypes', [])
    ], ClipboardModule);
    return ClipboardModule;
}());


/***/ }
/******/ ]);
});
//# sourceMappingURL=index.umd.js.map