window.__miscHandler__ = (function () {
    function methodList (proto, en) {
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
        };
    };

    return {
        methods : function (proto, en) {
            methodList(proto, en);
        }
    }
})();