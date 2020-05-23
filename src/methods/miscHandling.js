export const __miscHandler__ = (function () {
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
        }; // end for each

        /*////////////////////////////////////////
            AJAX
        */
        var ajxOps = {
            method : "",
            url : "",
            data : ""
        };
        proto.ajax = function (ajxOps, fn, boolHeaders) {
            const ops = ajxOps;
            var xhr = new XMLHttpRequest();

            if (boolHeaders === undefined) {
                boolHeaders = true;
            }

            xhr.open(ops.method, ops.url);

            if (boolHeaders) {
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var jsn = {};
                    if (xhr.responseText.length > 0) {
                        for (let i = 0; i < JSON.parse(xhr.responseText).length; i++) {
                            for (let x in JSON.parse(xhr.responseText)[i]) {
                                jsn[x] = JSON.parse(xhr.responseText)[i][x];
                            }
                        }

                        fn({
                            response : xhr.responseText,
                            json : jsn
                        });
                    }
                }
            };

            if (ops.method.match(/post/i)) {
                xhr.send(ops.data);
            } else {
                xhr.send();
            }

            return this;
        }; // end ajax   

        /*////////////////////////////////////////
            is
            The is function returns a boolean result for one or more values
        */
        proto.is = function (...mixArgs) {
            for (let i = 0; i < this.length; i++) {
                for (let x = 0; x < mixArgs.length; x++) {
                    if (this[i] === mixArgs[x]) {
                        return true;
                    }
                }
            }

            return false;
        }; // end is

    }; // end of method list

    return {
        methods : function (proto, en) {
            methodList(proto, en);
        }
    }
})();