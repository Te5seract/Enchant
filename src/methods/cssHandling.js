window.__CSSHandler__ = (function () {
    function methodList (proto, en) {
        /*////////////////////////////////////////
            CSS method adds CSS to the selected node(s)
        */
        proto.css = function (strCSS, boolApnd) {
            en.forEach(this, (i) => {
                if (!boolApnd) {
                    this[i.index].style.cssText = strCSS;
                } else {
                    this[i.index].style.cssText += strCSS;
                }
            });

            return this;
        }; // end css method

        /*////////////////////////////////////////
            CSS val method returns value of CSS applied to element
        */
        proto.CSSVal = function (strProp, strVal) {
            if (strProp.match(/-/g)) {
                var breakHyphen = strProp.split("-");

                en.forEach(breakHyphen, (i) => {
                    if (i.index > 0) {
                        var firstLetter = breakHyphen[i.index].slice(0, 1).toUpperCase();
                        var wordBody = breakHyphen[i.index].slice(1, breakHyphen[i.index].length);

                        breakHyphen[i.index] = firstLetter+wordBody;
                    }
                });

                strProp = breakHyphen.toString().replace(/,/g, "");
            }

            if (!strVal) {
                return this[0].style[strProp];
            } else {
                return this[0].style[strProp] === strVal;
            }
        }; // end CSS val
        
    }; // end method list

    return {
        methods : function (proto, en) {
            methodList(proto, en);
        }
    }
})();