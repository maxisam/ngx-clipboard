(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("clipboard"));
	else if(typeof define === 'function' && define.amd)
		define("xng", ["@angular/core", "clipboard"], factory);
	else if(typeof exports === 'object')
		exports["xng"] = factory(require("@angular/core"), require("clipboard"));
	else
		root["xng"] = factory(root["ng"]["core"], root["clipboard"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__) {
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var clipboard_module_1 = __webpack_require__(1);
	exports.ClipboardModule = clipboard_module_1.ClipboardModule;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var clipboard_directive_1 = __webpack_require__(3);
	var ClipboardModule = (function () {
	    function ClipboardModule() {
	    }
	    return ClipboardModule;
	}());
	ClipboardModule = __decorate([
	    core_1.NgModule({
	        declarations: [clipboard_directive_1.ClipboardDirective],
	        exports: [clipboard_directive_1.ClipboardDirective]
	    }),
	    __metadata("design:paramtypes", [])
	], ClipboardModule);
	exports.ClipboardModule = ClipboardModule;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var Clipboard = __webpack_require__(4);
	var ClipboardDirective = (function () {
	    function ClipboardDirective(elmRef) {
	        this.elmRef = elmRef;
	        this.onSuccess = new core_1.EventEmitter();
	        this.onError = new core_1.EventEmitter();
	    }
	    ClipboardDirective.prototype.ngOnInit = function () {
	        var _this = this;
	        var option;
	        option = !!this.targetElm ? { target: function () { return _this.targetElm; } } : { text: function () { return _this.cbContent; } };
	        this.clipboard = new Clipboard(this.elmRef.nativeElement, option);
	        this.clipboard.on('success', function () { return _this.onSuccess.emit(true); });
	        this.clipboard.on('error', function () { return _this.onError.emit(true); });
	    };
	    ClipboardDirective.prototype.ngOnDestroy = function () {
	        if (this.clipboard) {
	            this.clipboard.destroy();
	        }
	    };
	    return ClipboardDirective;
	}());
	__decorate([
	    core_1.Input('xngClipboard'),
	    __metadata("design:type", core_1.ElementRef)
	], ClipboardDirective.prototype, "targetElm", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", String)
	], ClipboardDirective.prototype, "cbContent", void 0);
	__decorate([
	    core_1.Output('cbOnSuccess'),
	    __metadata("design:type", core_1.EventEmitter)
	], ClipboardDirective.prototype, "onSuccess", void 0);
	__decorate([
	    core_1.Output('cbOnError'),
	    __metadata("design:type", core_1.EventEmitter)
	], ClipboardDirective.prototype, "onError", void 0);
	ClipboardDirective = __decorate([
	    core_1.Directive({
	        selector: '[xngClipboard]'
	    }),
	    __metadata("design:paramtypes", [core_1.ElementRef])
	], ClipboardDirective);
	exports.ClipboardDirective = ClipboardDirective;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.umd.js.map