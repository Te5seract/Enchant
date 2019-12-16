export const __attrHandler__ = (function () {
    "use strict";
    
    function methodList (proto, en) {
        /*////////////////////////////////////////
            Set attr method adds an attribute to the node(s)
        */
        proto.setAttr = function (strType, strVal) {
            en.forEach(this, (i) => {
                this[i.index].setAttribute(strType, strVal);
            });

            return this;
        }; // end set attr

        /*////////////////////////////////////////
            Del attr method deletes an attribute
        */
        proto.delAttr = function (strType) {
            en.forEach(this, (i) => {
                this[i.index].removeAttribute(strType);
            });

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