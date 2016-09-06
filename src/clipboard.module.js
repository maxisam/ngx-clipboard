"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var clipboard_directive_1 = require('./clipboard.directive');
var ClipboardModule = (function () {
    function ClipboardModule() {
    }
    ClipboardModule = __decorate([
        core_1.NgModule({
            declarations: [clipboard_directive_1.ClipboardDirective],
            exports: [clipboard_directive_1.ClipboardDirective]
        })
    ], ClipboardModule);
    return ClipboardModule;
}());
exports.ClipboardModule = ClipboardModule;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
