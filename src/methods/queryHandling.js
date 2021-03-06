export const __queryHandling__ = (function () {
    "use strict";

    function methodList (proto, en) {
        /*////////////////////////////////////////
            swap method swaps main query for the one defined 
            in the swap method.
        */ 
        proto.swap = function (mixElem) {
            var replaceNode = [];

            if (typeof mixElem === "string") {
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
            } else {
                // if the type of element is an object and it has no length push it into replaceNode array
                if (!mixElem.length) {
                    replaceNode.push(mixElem);
                }
                // if the type of element is an object and it has length check the array for arrays
                else if (mixElem.length) {
                    en.forEach(mixElem, (i) => {
                        // detect multi-dimensional arrays
                        if (mixElem[i.index].length) {
                            en.forEach(mixElem[i.index], (x) => {
                                replaceNode.push(mixElem[i.index][x.index]);
                            });
                        } else {
                            // push single node to replaceNode array
                            replaceNode.push(mixElem[i.index]);
                        }
                    });
                }

                // completely clear the selector
                this.length = en.clearSelector(this);

                // reset selector size
                this.length = en.resetSelector(this, replaceNode);
            }

            return this;
        }; // swap method end

        /*////////////////////////////////////////
            any method gets any random element(s) from an array of elements
        */ 
        proto.any = function (boolMulti) {
            var rand = Math.floor(Math.random() * this.length) + 1,
                nodeList = [];

            if (!boolMulti) {
                nodeList.push(this[rand - 1]);
            } else {
                if (rand === 0) {
                    rand = 1;
                }

                for (let i = 0; i < rand; i++) {
                    var nodeIndex = Math.floor(Math.random() * this.length - 1) + 1;
                    nodeList.push(this[nodeIndex]);
                }
            }

            // completely clear the selector
            this.length = en.clearSelector(this);

            // reset selector size
            this.length = en.resetSelector(this, nodeList);

            return this;
        }; // any method end

        /*////////////////////////////////////////
            attach method attaches more elements to the main 
            query
        */ 
        proto.attach = function (mixElem) {
            var nodeList = [];

            if (typeof mixElem === "string") {
                // discern query flags and separate string into array
                mixElem = mixElem.replace(/ /g, "");
                mixElem = mixElem.replace(/ {|{/g, "~{").replace(/ |,/g, " ").split(" ").filter(Boolean);

                // push main selector into nodeList
                en.forEach(this, (i) => {
                    nodeList.push(this[i.index]);
                });

                // add nodes to nodeList array
                en.forEach(mixElem, (i) => {
                    // get array of selectors: [a, a, a, a]
                    en.forEach(en.selector(mixElem[i.index].replace("~", " ")), (x) => {
                        // push individual nodes into nodeList: a, a, a, a
                        nodeList.push(en.selector(mixElem[i.index].replace("~", " "))[x.index]);
                    });
                });

                // reset the main selector
                this.length = en.resetSelector(this, nodeList);
            } else {
                // if the mixElem param is an object with no length

                // if the mixElem contains just a single object not in an array format
                if (!mixElem.length) {
                    // push query main query selector into a different array
                    en.forEach(this, (i) => {
                        nodeList.push(this[i.index]);
                    });

                    // push single object into nodeList array
                    nodeList.push(mixElem);
                } else {

                    // push main selector into nodeList array
                    en.forEach(this, (i) => {
                        nodeList.push(this[i.index]);
                    });

                    // detect multi-dimensional arrays
                    en.forEach(mixElem, (i) => {
                        // push multi-dimensional array items to nodeList
                        if (mixElem[i.index] && mixElem[i.index].length) {
                            en.forEach(mixElem[i.index], (x) => {
                                nodeList.push(mixElem[i.index][x.index]);
                            });
                        } else {
                            // push single nodes into nodeList array
                            nodeList.push(mixElem[i.index]);
                        }
                    });
                }

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

            if (typeof mixRemove === "string") {
                mixRemove = mixRemove.replace(/ /g, "");
                mixRemove = mixRemove.replace(/{| {/g, "~{").replace(/ |,/g, " ").split(" ").filter(Boolean);
                
                // cleanup and push nodes to detach into detachList array
                en.forEach(mixRemove, (i) => {
                    // remove the ~ from any flags in 
                    mixRemove[i.index] = mixRemove[i.index].replace("~", " ");

                    // push individual nodes out from the selector into the detachList array
                    en.forEach(en.selector(mixRemove[i.index]), (x) => {
                        console.log(en.selector(mixRemove[i.index]));
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
            } else {
                // if mixRemove is an object
                if (!mixRemove.length) {
                    // if only one object is in the selector
                    detachList.push(mixRemove);
                } else {
                    en.forEach(mixRemove, (i) => {
                        // push detach items as array into detachList array
                        if (!mixRemove.length){
                            detachList.push(mixRemove[i.index]);
                        } else {
                            // detect multi-dimensional arrays
                            if (mixRemove[i.index].length) {
                                // if a multi-dimensional array is detected get nodes from it and push it into the nodeList
                                en.forEach(mixRemove[i.index], (x) => {
                                    detachList.push(mixRemove[i.index][x.index]);
                                });
                            } else {
                                // put non multi-dimensional items into detachList array
                                detachList.push(mixRemove[i.index]);
                            }
                        } 
                    });
                }

                // remove nodes in the main query selector if it matches node in detach array
                en.forEach(this, (i) => {
                    en.forEach(detachList, (x) => {
                        if (detachList[x.index] === this[i.index]) {
                            delete this[i.index];
                        }
                    });
                });

                // get left over query nodes and push them into nodesList array
                en.forEach(this, (i) => {
                    if (this[i.index] !== undefined) {
                        nodeList.push(this[i.index]);
                    }
                });

                // completely clear the main selector
                this.length = en.clearSelector(this);

                // reset the selector with new items
                this.length = en.resetSelector(this, nodeList);
            }

            return this;
        }; // detach method end

        /*////////////////////////////////////////
            within gets nodes out of the main 
            selectors child node list
        */ 
        proto.within = function (mixElem) {
            var elems = [];

            // this is just a modification of the script used for the main selector
            var all = mixElem.match(/all/i),
                odd = mixElem.match(/odd/i),
                evn = mixElem.match(/even|evn/i),
                spec = mixElem.match(/&|{[0-9]+}|{last}/i),
                ratio = mixElem.match(/{[0-9] >> [0-9]}|{[0-9]>>[0-9]}|{[0-9 >> last]+}|{[0-9>>last]+}/i);

            if (typeof mixElem === "string") {
                for (let i = 0; i < this.length; i++) {
                    if (all) { // if flags are used
                        var mixElem = mixElem.replace(/ {/, "~{").split("~")[0];

                        elems = this[i].querySelectorAll(mixElem);
                    }
                    else if (evn) {
                        var mixElem = mixElem.split(" ")[0],
                        even = this[i].querySelectorAll(mixElem);
            
                        // var elems = [];
                        for (let x = 0; x < even.length; x++) {
                            if (x > 0 && x * 2 <= even.length) {
                                elems.push(even[(x * 2) -1]);
                            }
                        }
                    } 
                    else if (odd) {
                        var mixElem = mixElem.split(" ")[0]
                        odd = this[i].querySelectorAll(mixElem);
            
                        // var elems = [];
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
                        // var elems = [];
                        for (let x = 0; x < nums.length; x++) {
                            elems.push(sp[Number(nums[x])]);
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
            
                        // var elems = [];
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
                    else if (!all || !evn || !odd || !spec || !ratio) {
                        // var elems = [];
                        if (this[i].querySelector(mixElem)) {
                            elems.push(this[i].querySelector(mixElem));
                        }
                    }
                }
            }
            else if (typeof mixElem === "object" && !mixElem.length) { // if just a singular object
                // return [e];
                elems.push(mixElem);
            }
            else if (typeof mixElem === "object" && mixElem.length > 1) { // for arrays
                for (let i = 0; i < mixElem.length; i++) {
                    elems.push(mixElem[i]);
                }
            }

            // completely clear the selector
            this.length = en.clearSelector(this);
            
            // reset the main selector
            this.length = en.resetSelector(this, elems);

            return this;
        }; // within method end

        /*////////////////////////////////////////
            search finds certain keywords in the scope of the element
            that is selected
        */
        proto.search = function (strSearch, ...strExcludeTag) {
            var reg = new RegExp(strSearch, "g"),
                found = [];

            en.forEach(this, (i) => {
                var within = this[i.index].querySelectorAll("*");

                // find items that contain the search keyword
                en.forEach(within, (x) => {
                    if (within[x.index].textContent.match(reg)) {
                        found.push(within[x.index]);
                    }

                    // find items via attributes
                    var className = within[x.index].attributes.class ? within[x.index].attributes.class.nodeValue : "",
                        id = within[x.index].attributes.id ? within[x.index].attributes.id.nodeValue : "",
                        tag = within[x.index].localName,
                        attrs = within[x.index].attributes;

                    // find attributes that have a certain keyword
                    for (let j = 0; j < attrs.length; j++) {
                        if (attrs[j].name !== "class" && attrs[j].name.match(reg) || attrs[j].name !== "class" && attrs[j].nodeValue.match(reg)) {
                            found.push(within[x.index]);
                        }
                    }

                    if (className.match(reg) || id.match(reg) || tag.match(reg)) {
                        found.push(within[x.index]);
                    }
                });
            }); // end find items that contain search keyword

            // exclude certain tags
            if (strExcludeTag) {
                en.forEach(found, (i) => {
                    en.forEach(strExcludeTag, (x) => {
                        if (found[i.index].localName === strExcludeTag[x.index]) {
                            found[i.index] = "";
                        }
                    });
                });
            } // end tag exclusion

            found = found.filter(Boolean);
            
            this.length = en.clearSelector(this);

            this.length = en.resetSelector(this, found);

            return this;
        }; // search method end

        /*////////////////////////////////////////
            Go to method goes back through parent nodes to the one 
            specified in the method
        */
        proto.goTo = function (strSearchBy, strId) {
            var current = this[0],
            node = [];

            // search methods
            if (strSearchBy.match(/parent|parents/i)) {
                var method = "parentNode";
            }
            else if (strSearchBy.match(/next|nextNode|nextSibling/i)) {
                var method = "nextElementSibling";
            }
            else if (strSearchBy.match(/prev|previousNode|previousSibling/)) {
                var method = "previousElementSibling";
            }

            // look for only parents and siblings
            while (current) {
                if (strId.match(/#|\./i)) {
                    if (current.localName) {
                        if (current.hasAttribute("class") && current.classList.contains(strId.replace(".", ""))) {
                            node.push(current);

                            break;
                        }
                        else if (current.hasAttribute("id") && current.getAttribute("id") === strId.replace("#", "")) {
                            node.push(current);

                            break;
                        }
                    }
                } else {
                    if (current.localName === strId) {
                        node.push(current);

                        break;
                    }
                }

                current = current[method];
            } // end while loop

            // go through child nodes (separete to the while loop)
            if (strSearchBy.match(/child|children/i)) {
                current = this[0].querySelectorAll("*");

                for (let i = 0; i < current.length; i++) {
                    if (strId.match(/#|\./i)) {
                        if (current[i].localName) {
                            if (current[i].hasAttribute("class") && current[i].classList.contains(strId.replace(".", ""))) {
                                node.push(current[i]);

                                break;
                            }
                            else if (current[i].hasAttribute("id") && current[i].getAttribute("id") === strId.replace("#", "")) {
                                node.push(current[i]);

                                break;
                            }
                        }
                    } else {
                        if (current[i].localName === strId) {
                            node.push(current[i]);

                            break;
                        }
                    }
                }
            } // end looking through child elements
        
        // clear the selector
        this.length = en.clearSelector(this);

        // reset selector with new node list
        this.length = en.resetSelector(this, node);

        return this;
    }; // end go to

    }; // end of method list

    return {
        methods : function (proto, en) {
            methodList(proto, en);
        }
    }
})();