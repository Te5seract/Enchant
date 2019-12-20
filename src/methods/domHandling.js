export const __DOMHandler__ = (function () {
    "use strict";

    function methodList (proto, en) {
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
                        if (this[i.index].localName) {
                            if (this[i.index].hasAttribute("class")) {
                                idList.push("."+this[i.index].getAttribute("class"));
                            }

                            if (this[i.index].hasAttribute("id")) {
                                idList.push("#"+this[i.index].getAttribute("id"));
                            }
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
            var newElems = [];

            if (!intCount) {
                intCount = 1;
            }

            for (let i = 0; i < this.length; i++) {
                for (let x = 0; x < intCount; x++) {
                    var elem = document.createElement(strType);

                    if (strAttr) {
                        elem.setAttribute(strAttr, strVal);
                    }

                    if (!strAttr) {
                        newElems.push(elem);
                    }
                    
                    this[i].appendChild(elem);
                }
            }

            if (!strAttr) {
                // clear away anything in the main selector
                this.length = en.clearSelector(this);

                // set newElems array to be the main selector
                this.length = en.resetSelector(this, newElems);
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

            return this;
        }; // end editable

        /*////////////////////////////////////////
            Create method creates an element but doesn't append it
        */
        proto.create = function (strType, intCount, strAttr, strVal) {
            if (!intCount) {
                intCount = 1;
            }

            var created = [];
            for (let i = 0; i < intCount; i++) {
                var elem = document.createElement(strType);

                if (strAttr) {
                    elem.setAttribute(strAttr, strVal);
                }
                
                created.push(elem);
            }

            // clear main selector
            this.length = en.clearSelector(this);

            // reset main selector
            this.length = en.resetSelector(this, created);

            return this;
        }; // end create

        /*////////////////////////////////////////
            Prepend method adds an element before another
        */
        proto.prepend = function (objNode, objRefNode) {
            if (objNode.length > 0) {
                en.forEach(objNode, (i) => {
                    this[0].insertBefore(objNode[i.index], objRefNode);
                });
            } else {
                this[0].insertBefore(objNode, objRefNode);
            }

            return this;
        }; // end prepend

        /*////////////////////////////////////////
            Apend method appends elements to the selected node
        */
        proto.append = function (objNode) {
            en.forEach(this, (i) => {
                en.forEach(objNode, (x) => {
                    this[i.index].appendChild(objNode[x.index]);
                });
            });

            return this;
        }; // end append

        /*////////////////////////////////////////
            Parent method can get the parent node
        */
        proto.parent = function (intCount) {
            if (!intCount) {
                intCount = 1;
            } else {
                intCount = intCount + 1;
            }

            var prntNode = [],
            startPoint = this[0].parentElement,
            i = 0;

            while (startPoint && i < intCount) {
                if (i === intCount -1) {
                    prntNode.push(startPoint);

                    break;
                }

                startPoint = startPoint.parentElement;

                i++;
            }

            this.length = en.clearSelector(this);

            if (prntNode.length > 0) {
                this.length = en.resetSelector(this, prntNode);

                return this;
            } else {
                return null;
            }

        }; // end parent

        /*////////////////////////////////////////
            Child method can get the child node
        */
        proto.child = function (intCount) {
            if (!intCount) {
                intCount = 1;
            } else {
                intCount = intCount + 1;
            }

            var childNode = [],
            startPoint = this[0].children[0],
            i = 0;

            while (startPoint && i < intCount) {
                if (i === intCount -1) {
                    childNode.push(startPoint);

                    break;
                }

                startPoint = startPoint.children[0];

                i++;
            }

            this.length = en.clearSelector(this);

            if (childNode.length > 0) {
                this.length = en.resetSelector(this, childNode);

                return this;
            } else {
                return null;
            }

        }; // end child

    }; // end of method list

    return {
        methods : function (proto, en) {
            methodList(proto, en);
        }
    }
})();