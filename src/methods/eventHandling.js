window.__eventHandling__ = (function () {
    function methodList (proto, en) {
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

    }; // end of method list

    return {
        methods : function (proto, en) {
            methodList(proto, en);
        }
    }
})();