export const __attrHandler__ = (function () {
    "use strict";
    
    function methodList (proto, en) {
        /*////////////////////////////////////////
            Set attr method adds an attribute to the node(s)
        */
        proto.setAttr = function (strType, strVal) {
            strType = strType.replace(/, | ,/g, ",");

            // set attribute with both params
            if (strType && strVal) {
                en.forEach(this, (i) => {
                    this[i.index].setAttribute(strType, strVal);
                });
            }

            // set attribute with single string
            if (strType.match(/=/) && !strType.match(/,/g)) {
                en.forEach(this, (i) => {
                    var typeSegs = strType.split("=");

                    this[i.index].setAttribute(typeSegs[0], typeSegs[1]);
                });
            }

            // set multiple attributes with single string
            if (strType.match(/=/) && strType.match(/,/g)) {
                en.forEach(this, (i) => {
                    strType = strType.replace(/,/g, "~");
                    var atts = strType.split("~").filter(Boolean);

                    en.forEach(atts, (x) => {
                        var typeSegs = atts[x.index].split("=");

                        this[i.index].setAttribute(typeSegs[0], typeSegs[1]);
                    });
                });
            }

            return this;
        }; // end set attr

        /*////////////////////////////////////////
            Del attr method deletes an attribute
        */
        proto.delAttr = function (strType) {
            // remove single attribute
            if (!strType.match(/ |,/g)) {
                en.forEach(this, (i) => {
                    this[i.index].removeAttribute(strType);
                });
            }
            
            // remove multiple attributes 
            if (strType.match(/ |,/g)) {
                strType = strType.replace(/ |,/g, "~");
                var attr = strType.split("~");

                en.forEach(this, (i) => {
                    en.forEach(attr, (x) => {
                        this[i.index].removeAttribute(attr[x.index]);
                    });
                });
            }

            return this;
        }; // end del attr

        /*////////////////////////////////////////
            Get attr method returns the attribute value of 
            a selected attribute
        */
        proto.getAttr = function (strType) {
            return this[0].getAttribute(strType);
        };

        /*////////////////////////////////////////
            Het attr method checks if an attribute exists on node
        */
        proto.hasAttr = function (strType) {
            return this[0].hasAttribute(strType);
        }; // end set attr

        /*////////////////////////////////////////
            Add class adds another class to the node(s)
        */
        proto.classList = function (strType, strVal) {
            en.forEach(this, (i) => {
                if (strType.match(/add|\+/i)) {
                    this[i.index].classList.add(strVal);
                } 
                else if (strType.match(/remove|delete|-/i)) {
                    this[i.index].classList.remove(strVal);
                }
            });

            return this;
        }; // end set attr

        /*////////////////////////////////////////
            Check for a class in class list
        */
        proto.hasClass = function (strClass) {
            return this[0].classList.contains(strClass);
        }; // end has class

    }; // end of method list

    return {
        methods : function (proto, en) {
            methodList(proto, en);
        }
    }
})();