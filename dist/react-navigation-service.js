import { InteractionManager } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { aiInit, aiMethod, aiWithAsyncInit } from 'asynchronous-tools';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

/**
 * Static service to get access to navigator from any place of the application
 *
 * @example
 * import { NavigationService } from 'gl-rnservices';
 * NavigationService.navigateTo(YUOR_ROUTE_NAME);
 *
 * @export
 * @class NavigationService
 */
var NavigationService = /** @class */ (function () {
    function NavigationService() {
        var _this = this;
        this.runAfterInteractions = function (runAfterInteractions) {
            if (runAfterInteractions === void 0) { runAfterInteractions = false; }
            return (function (f) { return runAfterInteractions ? InteractionManager.runAfterInteractions(f) : f(); });
        };
        this.promiseWrapper = function (_a) {
            var _b = _a.resolveTimeout, resolveTimeout = _b === void 0 ? 1500 : _b, _c = _a.runAfterInteractions, runAfterInteractions = _c === void 0 ? false : _c;
            return function (func) {
                return _this.runAfterInteractions(runAfterInteractions)(function () { return resolveTimeout
                    ? new Promise(function (resolve) {
                        var result;
                        setTimeout(function () { return resolve(result); }, resolveTimeout);
                        result = func();
                    })
                    : func(); });
            };
        };
        // Some common navigation actions
        this.navigate = function (routeName, _a) {
            if (_a === void 0) { _a = {}; }
            var resolveTimeout = _a.resolveTimeout, runAfterInteractions = _a.runAfterInteractions, params = __rest(_a, ["resolveTimeout", "runAfterInteractions"]);
            return (_this.dispatch(NavigationActions.navigate({
                routeName: routeName,
                params: params,
            }), { resolveTimeout: resolveTimeout, runAfterInteractions: runAfterInteractions }));
        };
        this.goBack = function (options, _a) {
            var _b = _a === void 0 ? {} : _a, resolveTimeout = _b.resolveTimeout, runAfterInteractions = _b.runAfterInteractions;
            return (_this.dispatch(NavigationActions.back(options), { resolveTimeout: resolveTimeout, runAfterInteractions: runAfterInteractions }));
        };
        // Some stack navigation actions
        this.push = function (routeName, _a) {
            if (_a === void 0) { _a = {}; }
            var resolveTimeout = _a.resolveTimeout, runAfterInteractions = _a.runAfterInteractions, params = __rest(_a, ["resolveTimeout", "runAfterInteractions"]);
            return (_this.dispatch(StackActions.push({
                routeName: routeName,
                params: params,
            }), { resolveTimeout: resolveTimeout, runAfterInteractions: runAfterInteractions }));
        };
        // DEPRECATED!
        // @aiMethod
        // public navigateTo(routeName: string, params?: NavigationParams) {
        //   this.container.dispatch(
        //     NavigationActions.navigate(<NavigationNavigateAction>{
        //       type: NavigationActions.NAVIGATE,
        //       routeName,
        //       params
        //     })
        //   );
        // }
        // DEPRECATED!
        this.navigateTo = this.navigate;
        // DEPRECATED!
        // @aiMethod
        // public navigateBack(options?: NavigationBackActionPayload) {
        //   this.container.dispatch(NavigationActions.back(options));
        // }
        // DEPRECATED!
        this.navigateBack = this.goBack;
    }
    /**
     * Saves reference to navigator component instance
     *
     * @static
     * @param {NavigationContainerComponent} reference
     * @memberof NavigationService
     */
    NavigationService.prototype.setContainer = function (reference) {
        if (reference)
            this.container = reference;
    };
    /**
     * Proxy method for dispatch
     */
    NavigationService.prototype.dispatch = function (action, _a) {
        var _this = this;
        var _b = _a.resolveTimeout, resolveTimeout = _b === void 0 ? 1500 : _b, _c = _a.runAfterInteractions, runAfterInteractions = _c === void 0 ? false : _c;
        return this.promiseWrapper({ resolveTimeout: resolveTimeout, runAfterInteractions: runAfterInteractions })(function () { return _this.container.dispatch(action); });
    };
    __decorate([
        aiInit,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NavigationService.prototype, "setContainer", null);
    __decorate([
        aiMethod,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], NavigationService.prototype, "dispatch", null);
    NavigationService = __decorate([
        aiWithAsyncInit
    ], NavigationService);
    return NavigationService;
}());
var Intermediator = /** @class */ (function () {
    function Intermediator() {
        var _this = this;
        this.instance = new NavigationService();
        this.init = function () { return _this.instance = new NavigationService(); };
    }
    Object.defineProperty(Intermediator.prototype, "setContainer", {
        get: function () { return this.instance.setContainer.bind(this.instance); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Intermediator.prototype, "dispatch", {
        get: function () { return this.instance.dispatch.bind(this.instance); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Intermediator.prototype, "navigate", {
        get: function () { return this.instance.navigate.bind(this.instance); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Intermediator.prototype, "goBack", {
        get: function () { return this.instance.goBack.bind(this.instance); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Intermediator.prototype, "push", {
        get: function () { return this.instance.push.bind(this.instance); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Intermediator.prototype, "navigateTo", {
        // DEPRECATED!
        get: function () { return this.instance.navigateTo.bind(this.instance); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Intermediator.prototype, "navigateBack", {
        get: function () { return this.instance.navigateBack.bind(this.instance); },
        enumerable: true,
        configurable: true
    });
    return Intermediator;
}());
var reactNavigationService = new Intermediator();

export default reactNavigationService;
//# sourceMappingURL=react-navigation-service.js.map
