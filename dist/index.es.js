import React, { createContext, useRef, useMemo, useState, useEffect, createElement, useContext } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var FATTJS_URL = 'https://fattjs.fattpay.com/js/fattmerchant.js';
var FATTJS_URL_REGEX = /^https:\/\/fattjs\.fattpay\.com\/js\/fattmerchant\.js\/?(\?.*)?$/;
var EXISTING_SCRIPT_MESSAGE = 'FattJs was called but an existing FattJs.js script already exists in the document; existing script parameters will be used';
var findScript = function () {
    var scripts = document.querySelectorAll("script[src^=\"" + FATTJS_URL + "\"]");
    for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        if (!FATTJS_URL_REGEX.test(script.src)) {
            continue;
        }
        return script;
    }
    return null;
};
var injectScript = function () {
    var script = document.createElement('script');
    script.src = "" + FATTJS_URL;
    var headOrBody = document.head || document.body;
    if (!headOrBody) {
        throw new Error('Expected document.body not to be null. fattmerchant.js requires a <body> element.');
    }
    headOrBody.appendChild(script);
    return script;
};
var fattPromise = null;
var loadScript = function () {
    // Ensure that we only attempt to load fattmerchant.js at most once
    if (fattPromise !== null) {
        return fattPromise;
    }
    fattPromise = new Promise(function (resolve, reject) {
        if (typeof window === 'undefined') {
            // Resolve to null when imported server side. This makes the module
            // safe to import in an isomorphic code base.
            resolve(null);
            return;
        }
        if (window.FattJs) {
            console.warn(EXISTING_SCRIPT_MESSAGE);
        }
        if (window.FattJs) {
            resolve(window.FattJs);
            return;
        }
        try {
            var script = findScript();
            if (script) {
                console.warn(EXISTING_SCRIPT_MESSAGE);
            }
            else if (!script) {
                script = injectScript();
            }
            script.addEventListener('load', function () {
                if (window.FattJs) {
                    resolve(window.FattJs);
                }
                else {
                    reject(new Error('fattmerchant.js not available'));
                }
            });
            script.addEventListener('error', function () {
                reject(new Error('Failed to load fattmerchant.js'));
            });
        }
        catch (error) {
            reject(error);
            return;
        }
    });
    return fattPromise;
};
var initFattJs = function (maybeFattmerchant, args) {
    if (maybeFattmerchant === null) {
        return null;
    }
    return new (maybeFattmerchant.bind.apply(maybeFattmerchant, __spreadArrays([void 0], args)))();
};

var isUnknownObject = function (raw) {
    return raw !== null && typeof raw === 'object';
};
var isPromise = function (raw) {
    return isUnknownObject(raw) && typeof raw.then === 'function';
};
var isFattJs = function (raw) {
    return (isUnknownObject(raw) &&
        typeof raw.showCardForm === 'function' &&
        typeof raw.tokenize === 'function' &&
        typeof raw.pay === 'function' &&
        typeof raw.on === 'function');
};

var usePrevious = function (value) {
    var ref = React.useRef(value);
    React.useEffect(function () {
        ref.current = value;
    }, [value]);
    return ref.current;
};

var INVALID_STRIPE_ERROR = 'Invalid prop `fattJs` supplied to `Elements`. We recommend using the `loadFattJs` utility from `@bettercart/react-fattmerchant-js`.';
var validateFattJs = function (maybeFattmerchant) {
    if (maybeFattmerchant === null || isFattJs(maybeFattmerchant)) {
        return maybeFattmerchant;
    }
    throw new Error(INVALID_STRIPE_ERROR);
};
var parseFattJsProp = function (raw) {
    if (isPromise(raw)) {
        return {
            tag: 'async',
            fattJsPromise: Promise.resolve(raw).then(validateFattJs),
        };
    }
    var fattJs = validateFattJs(raw);
    if (fattJs === null) {
        return { tag: 'empty' };
    }
    return { tag: 'sync', fattJs: fattJs };
};
var ElementsContext = createContext(null);
var Elements = function (_a) {
    var rawFattJsProp = _a.fattJs, children = _a.children;
    var final = useRef(false);
    var isMounted = useRef(true);
    var parsed = useMemo(function () { return parseFattJsProp(rawFattJsProp); }, [rawFattJsProp]);
    var _b = useState(function () { return ({
        fattJs: null,
    }); }), ctx = _b[0], setContext = _b[1];
    var prevFattJs = usePrevious(rawFattJsProp);
    if (prevFattJs !== null) {
        if (prevFattJs !== rawFattJsProp) {
            console.warn('Unsupported prop change on Elements: You cannot change the `fattJs` prop after setting it.');
        }
    }
    if (!final.current) {
        if (parsed.tag === 'sync') {
            final.current = true;
            setContext({
                fattJs: parsed.fattJs,
            });
        }
        if (parsed.tag === 'async') {
            final.current = true;
            parsed.fattJsPromise.then(function (fattJs) {
                if (fattJs && isMounted.current) {
                    setContext({
                        fattJs: fattJs,
                    });
                }
            });
        }
    }
    useEffect(function () {
        return function () {
            isMounted.current = false;
        };
    }, []);
    useEffect(function () {
        var anyFattJs = ctx.fattJs;
        if (!anyFattJs) {
            return;
        }
    }, [ctx.fattJs]);
    return createElement(ElementsContext.Provider, { value: ctx }, children);
};
var useFattJs = function () {
    var ctx = useContext(ElementsContext);
    if (!ctx) {
        throw new Error("Could not find Elements context; You need to wrap the part of your app that in an <Elements> provider.");
    }
    return ctx === null || ctx === void 0 ? void 0 : ctx.fattJs;
};

var fattJsPromise = loadScript();
fattJsPromise.catch(function (err) {
    {
        console.warn(err);
    }
});
var loadFattJs = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var fattJs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fattJsPromise];
                case 1:
                    fattJs = _a.sent();
                    return [2 /*return*/, initFattJs(fattJs, args)];
            }
        });
    });
};

export { Elements, loadFattJs, useFattJs };
//# sourceMappingURL=index.es.js.map
