// selector
window.__E__ = (function () {
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
                multi = __E__.string_has(e, /{all}/),
                even = __E__.string_has(e, /{evn|even}/),
                odd = __E__.string_has(e, /{odd}/),
                spec = __E__.string_has(e, /&|{>.*?}/),
                ratio = __E__.string_has(e, />>/);

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

// core
window.E = (function () {
    "use strict";

    var E, // library alias
    conf = {}, // library configuration
    arr = [], // array to display selector
    en = __E__, // query selector module
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

    ////////////////////////////////////////
    // QUERY HANDLER
    ////////////////////////////////////////

     /*////////////////////////////////////////
        swap method swaps main query for the one defined 
        in the swap method.
    */ 
   proto.swap = function (mixElem) {
        if (typeof mixElem === "string") {
            var replaceNode = [];

            // split up the selectors and turn it into an array 
            mixElem = mixElem.replace(/,| /g, " ").replace(/{| {/g, "~{").split(" ").filter(Boolean);

            en.forEach(mixElem, (i) => {
                mixElem[i.index] = mixElem[i.index].replace("~", " ");

                // push individual elements into replaceNode array
                en.forEach(en.selector(mixElem[i.index]), (x) => {
                    replaceNode.push(en.selector(mixElem[i.index])[x.index]);
                });
            });

            //  completely clear the selector
            this.length = en.clearSelector(this);
            
            // reset selector size
            this.length = en.resetSelector(this, en.selector(replaceNode));
        }

        return this;
    }; // swap method end

    /*////////////////////////////////////////
        attach method attaches more elements to the main 
        query
    */ 
    proto.attach = function (mixElem) {
        if (typeof mixElem === "string") {
            var nodeList = [];

            // discern query flags and separate string into array
            mixElem = mixElem.replace(/ {|{/g, "~{").replace(/ |,/g, " ").split(" ").filter(Boolean);

            // push main selector into nodeList
            en.forEach(this, (i) => {
                nodeList.push(this[i.index]);
            });

            // add nodes to nodeList array
            en.forEach(mixElem, (i) => {
                // get array of selectors: [a, a, a, a]
                en.forEach(en.selector(mixElem[i.index]), (x) => {
                    // push individual nodes into nodeList: a, a, a, a
                    nodeList.push(en.selector(mixElem[i.index])[x.index]);
                });
            });

            // reset the main selector
            this.length = en.resetSelector(this, nodeList);
        }

        return this;
    }; // attach method end

    
    /*////////////////////////////////////////
        detach items from main selector
    */ 
    proto.detach = function (mixRemove) {
        var detachList = [],
        nodeList = [];
        mixRemove = mixRemove.replace(/{| {/g, "~{").replace(/ |,/g, " ").split(" ").filter(Boolean);

        
        // cleanup and push nodes to detach into detachList array
        en.forEach(mixRemove, (i) => {
            // remove the ~ from any flags in 
            mixRemove[i.index] = mixRemove[i.index].replace("~", " ");

            // push individual nodes out from the selector into the detachList array
            en.forEach(en.selector(mixRemove[i.index]), (x) => {
                detachList.push(en.selector(mixRemove[i.index])[x.index]);
            });  
        });

        // remove nodes in main selector that match the ones in detach list
        en.forEach(this, (i) => {
            en.forEach(detachList, (x) => {
                if (detachList[x.index] === this[i.index]) {
                    delete this[i.index];
                }
            });
        });

        // add nodes in selector to nodeList array if they're not undefined
        en.forEach(this, (i) => {
            if (this[i.index] !== undefined) {
                nodeList.push(this[i.index]);
            }
        });

        // completely clear the selector
        this.length = en.clearSelector(this);

        // reset the main selector
        this.length = en.resetSelector(this, nodeList);

        return this;
    }; // detach method end

    /*////////////////////////////////////////
        within gets nodes out of the main 
        selectors child node list
    */ 
    proto.within = function (mixElem) {
        for (let i = 0; i < this.length; i++) {
            // this is just a modification of the script used for the main selector
            var multi = en.string_has(mixElem, /{all}/),
            even = en.string_has(mixElem, /{evn|even}/),
            odd = en.string_has(mixElem, /{odd}/),
            spec = en.string_has(mixElem, /&|>/),
            ratio = en.string_has(mixElem, />>/);

            if (multi) { // if flags are used
                var mixElem = mixElem.split(" ")[0],
                elems = this[i].querySelectorAll(mixElem);
            }
            else if (even) {
                var mixElem = mixElem.split(" ")[0],
                even = this[i].querySelectorAll(mixElem);
    
                var elems = [];
                for (let x = 0; x < even.length; x++) {
                    if (x > 0 && x * 2 <= even.length) {
                        elems.push(even[(x * 2) -1]);
                    }
                }
            } 
            else if (odd) {
                var mixElem = mixElem.split(" ")[0]
                odd = this[i].querySelectorAll(mixElem);
    
                var elems = [];
                for (let x = 0; i < odd.length; x++) {
                    if (x > 0 && (i * 2) -1 <= odd.length) {
                        elems.push(odd[(x * 2) -2]);
                    }
                }
            }
            else if (spec) {
                var arg = mixElem.replace(/ {/, "~{").split("~")[1],
                mixElem = mixElem.replace(/ {/, "~{").split("~")[0],
                sp = this[i].querySelectorAll(mixElem),
                nums = arg.replace(/\D/g, "").split(""); // removes non digit items
    
                // iterate through array of numbers
                var elems = [];
                for (let x = 0; x < nums.length; x++) {
                    elems.push(sp[Number(nums[x])]);
                    
                    if (arg.match(/last/i)) {
                        elems.push(sp[sp.length -1]);
                    }
                }
    
                // to only get the last item
                if (arg.match(/last/i)) {
                    elems.push(sp[sp.length -1]);
                }
            }
            else if (ratio) {
                var arg = mixElem.replace(/ {/, "~{").split("~")[1],
                mixElem = mixElem.replace(/ {/, "~").split("~")[0],
                num1 = arg.replace(/\D/g, "").split("")[0],
                num2 = arg.replace(/\D/g, "").split("")[1],
                ratio = this[i].querySelectorAll(mixElem);
    
                var elems = [];
                for (let x = 0; x < ratio.length; x++) {
                    if (x >= num1 && i <= num2) {
                        elems.push(ratio[i]);
                    }
                    else if (num2 === undefined && arg.match(/last/i)) {
                        if (x >= num1 && x !== ratio.length) {
                            elems.push(ratio[x]);
                        }
                    }
                }
            }
            else if (!multi || !even || !odd || !spec || !ratio) {
                var elems = [];
                elems.push(this[i].querySelector(mixElem));
            }

            
        }

        // completely clear the selector
        this.length = en.clearSelector(this);
        
        // reset the main selector
        this.length = en.resetSelector(this, elems);

        return this;
    }; // within method end

    ////////////////////////////////////////
    // EVENT HANDLING
    ////////////////////////////////////////

    /*////////////////////////////////////////
            Events method ties multiple event listeners to 
            one method
        */
       proto.events = function (strType, fn) {
        strType = strType.replace(/ |,/g, " ").split(" ");

        en.forEach(this, (i) => {
            en.forEach(strType, (x) => {
                this[i.index].addEventListener(strType[x.index], ev);

                function ev (e) {
                    e.index = i.index;

                    fn(e, e.target);
                }
            });
        });

        return this;
    }; // end events method

    /*////////////////////////////////////////
        Hide method just does a base css method to hide elements
    */
    proto.hide = function () {
        en.forEach(this, (i) => {
            this[i.index].style.cssText = "visibility: hidden; opacity: 0; pointer-events: none;";
        });

        return this;
    }; // end hide method

    /*////////////////////////////////////////
        Show method just does a base css method to show elements
    */
    proto.show = function () {
        en.forEach(this, (i) => {
            this[i.index].style.cssText = "visibility: visible; opacity: 1; pointer-events: all;";
        });

        return this;
    }; // end hide method

    /*////////////////////////////////////////
        get index of selected node
    */
    proto.nodeIndex = function (strType) {
        if (strType.match(/class|\./i)) {
            var reference = document.querySelectorAll("."+this[0].getAttribute("class"));
        }
        else if (strType.match(/id|#/i)) {
            var reference = document.querySelectorAll("#"+this[0].getAttribute("id"));
        }

        for (let i = 0; i < reference.length; i++) {
            if (this[0] === reference[i]) {
                return i;
            }
        }
    }; // end node index

    ////////////////////////////////////////
    // CSS HANDLING
    ////////////////////////////////////////

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

    
    ////////////////////////////////////////
    // ATTR HANDLER
    ////////////////////////////////////////

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

    ////////////////////////////////////////
    // DOM HANDLER
    ////////////////////////////////////////

    /*////////////////////////////////////////
            Write method writes either HTML or text to
            the selected node(s)
        */
       proto.write = function (strType, strContent, boolApnd) {
        en.forEach(this, (i) => {
            if (strType.match(/html|innerhtml/i)) {
                if (!boolApnd) {
                    this[i.index].innerHTML = strContent;
                } else {
                    this[i.index].innerHTML += strContent;
                }
            }
            else if (strType.match(/text|txt|textcontent/i)) {
                if (!boolApnd) {
                    this[i.index].textContent = strContent;
                } else {
                    this[i.index].textContent += strContent;
                }
            }
        });
            
        return this;
    }; // end write

    /*////////////////////////////////////////
        Get content method gets text content or html content
        out of selected node
    */
    proto.getContent = function (strType) {
        if (strType.match(/html|innerhtml|htmlcontent|html content/i)) {
            return this[0].innerHTML;
        }
        else if (strType.match(/text|txt|textcontent|text content/i)) {
            return this[0].textContent;
        }
        else if (strType.match(/outer|outerhtml|outer html/i)) {
            return this[0].outerHTML;
        }
    }; // end get content

    /*////////////////////////////////////////
        Next method gets the next node from the selected node
        or jumps forward several nodes to another
    */
    proto.next = function (intIndex) {
        if (!intIndex) {
            var nextNode = this[0].nextElementSibling;

            // clear selection 
            this.length = en.clearSelector(this);

            // reset selector with new node
            this.length = en.resetSelector(this, [nextNode]);
        } else {
            var nextElemList = [],
            i = 0,
            el = this[0];

            while (el && i <= intIndex) {
                if (i === intIndex -1) {
                    nextElemList.push(el);
                }

                el = el.nextElementSibling;

                i++;
            }

            // clear selector of any node
            this.length = en.clearSelector(this);

            // reset selector with new node
            this.length = en.resetSelector(this, nextElemList);
        }

        return this;
    }; // end next

    /*////////////////////////////////////////
        Prev method gets the previous node from the selected node
        or jumps back several nodes to another
    */
    proto.prev = function (intIndex) {
        if (!intIndex) {
            var nextNode = this[0].previousElementSibling;

            // clear selection 
            this.length = en.clearSelector(this);

            // reset selector with new node
            this.length = en.resetSelector(this, [nextNode]);
        } else {
            var prevElemList = [],
            i = 0,
            el = this[0];

            while (el && i <= intIndex) {
                if (i === intIndex -1) {
                    prevElemList.push(el);
                }

                el = el.previousElementSibling;

                i++;
            }

            // clear selector of any node
            this.length = en.clearSelector(this);

            // reset selection with new node
            this.length = en.resetSelector(this, prevElemList);
        }

        return this;
    }; // end prev

    /*////////////////////////////////////////
        Parents gets all the parent nodes from a selected 
        point
    */
    proto.parents = function () {
        var parentList = [];

        while (this[0]) {
            parentList.push(this[0]);

            this[0] = this[0].parentNode;
        }

        // clear the selector of any nodes
        this.length = en.clearSelector(this);

        // reset selector with new nodes
        this.length = en.resetSelector(this, parentList);

        return this;
    }; // end parents

    /*////////////////////////////////////////
        Children gets all the child nodes from a selected 
        point
    */
    proto.children = function (boolAll) {
        var childList = [];

        if (!boolAll) {
            this[0] = this[0].children;
        } else {
            this[0] = this[0].childNodes;
        }

        for (let i = 0; i < this[0].length; i++) {
            childList.push(this[0][i]);
        }

        // clear selector of any nodes
        this.length = en.clearSelector(this);

        // reset selector with new nodes
        this.length = en.resetSelector(this, childList);

        return this;
    }; // end children

    /*////////////////////////////////////////
        Array contains method checks if an array contains
        a particular node
    */
    proto.arrayContains = function (mixNeedle, strID) {
        if (typeof this[0] === "object") {
            var idList = [];

            en.forEach(this, (i) => {
                if (strID.match(/id|identifier/i)) {
                    if (this[i.index].hasAttribute("class")) {
                        idList.push("."+this[i.index].getAttribute("class"));
                    }

                    if (this[i.index].hasAttribute("id")) {
                        idList.push("#"+this[i.index].getAttribute("id"));
                    }
                }
                else if (strID.match(/all|both/)) {
                    if (this[i.index].hasAttribute("class")) {
                        idList.push(this[i.index].localName+" ."+this[i.index].getAttribute("class"));
                    }

                    if (this[i.index].hasAttribute("id")) {
                        idList.push(this[i.index].localName+" #"+this[i.index].getAttribute("id"));
                    }
                }
            });

            // convert array to string
            var strIdList = idList.toString();

            // check if string array has the needle
            if(strIdList.match(mixNeedle)) {
                return true;
            } else {
                return false;
            }

        } else {
            var nodes = [];

            // convert array nodes to string and push them to nodes
            for (let i = 0; i < this.length; i++) {
                nodes.push(this[i].toString());
            }
            
            // convert nodes to string
            var strNodes = nodes.toString();

            // check if strNodes contains the needle
            if (strNodes.match(mixNeedle.toString())) {
                return true;
            } else {
                return false;
            }
        }
    }; // end array contains

    /*////////////////////////////////////////
        Make method creates a new element or more
    */
    proto.make = function (strType, intCount, strAttr, strVal) {
        if (!intCount) {
            intCount = 1;
        }

        for (let i = 0; i < this.length; i++) {
            for (let x = 0; x < intCount; x++) {
                var elem = document.createElement(strType);

                if (strAttr) {
                    elem.setAttribute(strAttr, strVal);
                }
                
                this[i].appendChild(elem);
            }
        }

        return this;
    };

    /*////////////////////////////////////////
        Change case method changes the case of text content
    */
    proto.changeCase = function (strType) {
        en.forEach(this, (i) => {
            if (strType.match(/upper|uppercase|upper case|to upper|toupper/i)) {
                this[i.index].textContent = this[i.index].textContent.toUpperCase();
            }
            else if (strType.match(/lower|lowercase|lower case|to lower|tolower/i)) {
                this[i.index].textContent = this[i.index].textContent.toLowerCase();
            }
            else if (strType.match(/title|heading|camel/i)) {
                var words = this[i.index].textContent.split(" ");

                for (let i = 0; i < words.length; i++) {
                    var firstLetter = words[i].slice(0, 1).toUpperCase(),
                    wordBody = words[i].slice(1, words[i].length);

                    words[i] = firstLetter+wordBody;
                }

                this[i.index].textContent = words.toString().replace(/,/g, " ");
            }
            else if (strType.match(/sentence/i)) {
                var words = this[i.index].textContent.split(" ");

                var firstLetter = words[0].slice(0, 1).toUpperCase(),
                wordBody = words[0].slice(1, words[0].length);

                words[0] = firstLetter+wordBody;

                this[i.index].textContent = words.toString().replace(/,/g, " ");
            }
        });

        return this;
    }; // end change case

    /*////////////////////////////////////////
        Limit method takes long words or sentences and 
        shortens them by either word or letter
    */
    proto.limit = function (strBreak, intCount, strTrail) {
        en.forEach(this, (i) => {
            if (strBreak.match(/word|words|wrd/i)) {
                var words = this[i.index].textContent.split(" "),
                limitedContent = [];

                for (let i = 0; i < words.length; i++) {
                    if (i === intCount) {
                        break;
                    }

                    limitedContent.push(words[i]);
                }

                if (strTrail) {
                    this[i.index].textContent = limitedContent.toString().replace(/,/g, " ")+strTrail;
                } else {
                    this[i.index].textContent = limitedContent.toString().replace(/,/g, " ");
                }
            }
            else if (strBreak.match(/letter|lttr|ltr|char|character/i)) {
                var letters = this[i.index].textContent.split(""),
                limitedContent = [];

                for (let i = 0; i < letters.length; i++) {
                    if (i === intCount) {
                        break;
                    }

                    limitedContent.push(letters[i]);
                }

                if (strTrail) {
                    this[i.index].textContent = limitedContent.toString().replace(/,/g, "")+strTrail;
                } else {
                    this[i.index].textContent = limitedContent.toString().replace(/,/g, "");
                }
            }
        });

        return this;
    }; // end limit

    /*////////////////////////////////////////
        Iframe method gets the inner contents of an iframe
    */
    proto.iframe = function (strPart) {
        var iframeFragment = [];

        en.forEach(this, (i) => {
            if (strPart) {
                iframeFragment.push(this[i.index].contentDocument[strPart]);
            } else {
                iframeFragment.push(this[i.index].contentDocument);
            }
        });

        // clear main selector query
        this.length = en.clearSelector(this);

        // insert new item to selector query
        this.length = en.resetSelector(this, iframeFragment);

        return this;
    }; // end iframe

    /*////////////////////////////////////////
        Design mode method sets the content editable of an iframe or dom elements
    */
    proto.designMode = function (strVal) {
        en.forEach(this, (i) => {
            this[i.index].designMode = strVal;
        });

        return this;
    }; // end design mode

    /*////////////////////////////////////////
        Editable method sets the content editable of HTML elements
    */
    proto.editable = function (boolEditable) {
        en.forEach(this, (i) => {
            this[i.index].setAttribute("contenteditable", boolEditable.toString());
        });
    }; // end editable

    ////////////////////////////////////////
    // MISC HANDLER
    ////////////////////////////////////////

    /*////////////////////////////////////////
            For each method is a loop and will output 
            a match after the function argument if a match
            is found
        */
        proto.forEach = function (fn, mixFromCollection) {
            var collection = [];
            for (let i = 0; i < this.length; i++) {
                fn({
                    node : this[i],
                    index : i
                }, i);

                collection.push(this[i]);
            }
            
            // if no match is searched for return the function to the library
            if (!mixFromCollection) {
                return this;
            } else {
                // return the result if a match is found
                var found;
                for (let i = 0; i < collection.length; i++) {
                    if (mixFromCollection === collection[i]) {
                        found = collection[i];
                        break; 
                    } else {
                        found = false;
                    }
                }

                return found;
            }
        }; // foreach end

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