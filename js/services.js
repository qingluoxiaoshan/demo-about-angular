
(function (window, angular) {
    angular.module("maoyan_services", [])
        .service("myService", ["$window", function ($w) {
            this.jsonp = function (url, data, callback) {
                var script = $w.document.createElement("script")
                    ,body = $w.document.body
                    ,dataStr = ""
                    ,cbName = "jsonp" + Math.random().toString().slice(2)
                    ,k;
                if (data) {
                    for (k in data) {
                        dataStr += k + "=" + data[k] + "&";
                    }
                }
                script.src = url + "?" + dataStr + "callback=" + cbName;
                body.appendChild(script);
                window[cbName] = function (res) {
                    callback(res);
                };
                body.removeChild(script);
            };
            
        }])
})(window, angular);