import { __EnchantQuerySelector__ } from "./selector.js";
import { __queryHandling__ } from "./methods/queryHandling.js";
import { __eventHandling__ } from "./methods/eventHandling.js";
import { __CSSHandler__ } from "./methods/cssHandling.js";
import { __attrHandler__ } from "./methods/attrHandling.js";
import { __DOMHandler__ } from "./methods/domHandling.js";
import { __miscHandler__ } from "./methods/miscHandling.js";

export const E = (function () {
    "use strict";

    var E, // library alias
    conf = {}, // library configuration
    arr = [], // array to display selector
    en = __EnchantQuerySelector__, // query selector module
    proto = Enchant.prototype; // library prototype

    ////////////////////////////////////////
    // core library
    function Enchant (el, sel) {
        for (let i = 0; i < el.length; i++) {
            this[i] = el[i];
        }

        this.length = el.length;

        // this.selector = sel ? sel.replace(/{.*?}| {.*?}/g, "") : "";
    };

    // force the library to return as an array
    
    proto.splice = arr.splice;

    ////////////////////////////////////////
    // methods
    // for modifying the main query
    __queryHandling__.methods(proto, en);

    // for handling events
    __eventHandling__.methods(proto, en);

    // for handling css stuff
    __CSSHandler__.methods(proto, en);

    // for handling attributes
    __attrHandler__.methods(proto, en);

    // for handling HTML DOM stuff
    __DOMHandler__.methods(proto, en);

    // for miscellaneous stuff
    __miscHandler__.methods(proto, en);

    ////////////////////////////////////////
    // setup
    // pass selector to library
    conf.E = function (el, sel) {
        return new Enchant(el, sel);
    };

    conf.init = function (sel) {
        if (sel) {
            var el = en.selector(sel);
            return conf.E(el, sel);
        } else {
            return conf.E([]);
        }
    };

    ////////////////////////////////////////
    // take the selector
    E = function (sel) {
        return conf.init(sel);
    };

    return E;
})();