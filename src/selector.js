window.__EnchantQuerySelector__ = (function () {
    "use strict";
    ////////////////////////////////////////
    // selector types
    // for the {all} flag
    function get_all (s) {
        s = s.replace(/ {|{/, "~{");
        s = s.split("~")[0];

        var all = document.querySelectorAll(s);

        return all;
    };

    // for the {even} flag
    function get_even (s) {
        s = s.replace(/ {|{/, "~{");
        s = s.split("~")[0];
        var even = document.querySelectorAll(s);

        var elems = [];
        for (let i = 0; i < even.length; i++) {
            if (i > 0 && i * 2 <= even.length) {
                elems.push(even[(i * 2) -1]);
            }
        }

        return elems;
    };

    // for the {odd} flag
    function get_odd (s) {
        s = s.replace(/ {|{/, "~{");
        s = s.split("~")[0];
        var odd = document.querySelectorAll(s);

        var elems = [];
        for (let i = 0; i < odd.length; i++) {
            if (i > 0 && (i * 2) -1 <= odd.length) {
                elems.push(odd[(i * 2) -2]);
            }
        }

        return elems;
    };

    // for the {>x} or {x & y & z} flag
    function get_spec (s) {
        var arg = s.replace(/ {|{/, "~{").split("~")[1],
        s = s.replace(/ {|{/, "~{").split("~")[0],
        sp = document.querySelectorAll(s),
        nums = arg.replace(/\D/g, "").split(""); // removes non digit items

        // iterate through array of numbers
        var elems = [];
        for (let i = 0; i < nums.length; i++) {
            elems.push(sp[Number(nums[i])]);
            
            if (arg.match(/last/i)) {
                elems.push(sp[sp.length -1]);
            }
        }

        // to only get the last item
        if (arg.match(/last/i)) {
            elems.push(sp[sp.length -1]);
        }

        return elems;
    };

    // for the {x >> y} flag
    function get_ratio (s) {
        var arg = s.replace(/ {|{/, "~{").split("~")[1],
        s = s.replace(/ {|{/, "~").split("~")[0],
        num1 = arg.replace(/\D/g, "").split("")[0],
        num2 = arg.replace(/\D/g, "").split("")[1],
        ratio = document.querySelectorAll(s);

        var elems = [];
        for (let i = 0; i < ratio.length; i++) {
            if (i >= num1 && i <= num2) {
                elems.push(ratio[i]);
            }
            else if (num2 === undefined && arg.match(/last/i)) {
                if (i >= num1 && i !== ratio.length) {
                    elems.push(ratio[i]);
                }
            }
        }

        return elems;
    };

    ////////////////////////////////////////
    // public functions
    return {
        selector : function (e) {
            if (typeof e === "string") {
                var 
                multi = __EnchantQuerySelector__.string_has(e, /{all}/),
                even = __EnchantQuerySelector__.string_has(e, /{evn|even}/),
                odd = __EnchantQuerySelector__.string_has(e, /{odd}/),
                spec = __EnchantQuerySelector__.string_has(e, /&|{>.*?}/),
                ratio = __EnchantQuerySelector__.string_has(e, />>/);

                if (multi) { // if flags are used
                    var el = get_all(e);
                }
                else if (even) {
                    var el = get_even(e);
                } 
                else if (odd) {
                    var el = get_odd(e);
                }
                else if (spec) {
                    var el = get_spec(e);
                }
                else if (ratio) {
                    var el = get_ratio(e);
                }
                else if (!multi || !even || !odd || !spec || !ratio) {
                    var el = [];
                    el.push(document.querySelector(e));
                }

                return el;
            }
            else if (typeof e === "object" && !e.length) { // if just a singular object
                return [e];
            }
            else if (typeof e === "object" && e.length > 1) { // for arrays
                return e;
            }
        },

        // this mainly checks if a certain flag is used
        string_has : function (s, k) {
            var rg = new RegExp(s, "gi"),
            /*
                make the argument syntax flexible, eg:

                all = valid
                sdlfkall = valid
            */ 
            s_key = k.toString().replace(/{|}|\/|\//g, ""); 

            if (s.match(k) || s.match(s_key)) {
                return true;
            } else {
                return false;
            }
        },

        ////////////////////////////////////////
        // loops through arrays
        forEach : function (arr, fn) {
            for (let i = 0; i < arr.length; i++) {
                fn({
                    index : i,
                    node : arr[i]
                });
            }
        },

        // clear selector
        clearSelector : function (sel) {
            for (let i = 0; i < sel.length; i++) {
                delete sel[i];
            }

            return 0;
        },

        // reset selector
        resetSelector : function (sel, el) {
            for (let i = 0; i < el.length; i++) {
                sel[i] = el[i];
            }

            return el.length;
        },
    };
})();