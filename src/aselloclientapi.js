// var kassaurl = "https://kassa.asello.at/"
(function(window) {
    var _windowProxy;
    var _rootUrl;
    var _iframequery;

    var getToken = function(user, password, callback) {
        if (!user || !password)
            return callback(null);

        var request = new XMLHttpRequest();

        request.open("POST", _rootUrl + "/token");
        request.addEventListener('load', function (event) {
            if (request.status >= 200 && request.status < 300 && request.responseText != null && request.responseText != "") {
                var obj = JSON.parse(request.responseText);

                callback(null, obj.access_token);
            } else {
                if (request.responseText != null && request.responseText != "") {
                    var obj = JSON.parse(request.responseText)

                    callback(new Error(obj.error_description));
                }
                else {
                    callback(new Error(request.responseText));
                }
            }
        });
        request.addEventListener('error', function (err) {
            callback(err);
        });
        request.send("userName=" + encodeURIComponent(user) + "&password=" + encodeURIComponent(password) + "&grant_type=password");
    }

    function AselloClientAPIClient(iframequery, aselloUrl) {
        var _this = this;

        _rootUrl = aselloUrl || "https://kassa.asello.at";
        _iframequery = iframequery;

        _windowProxy = new Porthole.WindowProxy(_rootUrl + '/proxy.html', '');
        _windowProxy.addEventListener(function (event) {
            if(_this.callback == null)
                return;
            
            var callback = _this.callback.callback;
            _this.callback = null;

            if(event.data.action == "invoice-created") {
                callback(event.data.result);
            }
        });
    }
    AselloClientAPIClient.prototype.updateIFrame = function(options, callback) {
        var url = this.getUrl(options);

        var iframe = document.querySelector(_iframequery);

        if(iframe) {
			iframe.src = "";

			setTimeout(function() {
				iframe.src = url;
			}, 100);
		}

        this.callback = {
            options: options,
            callback: callback
        };
    }

    AselloClientAPIClient.prototype.getUrl = function(options) {
        var action = options.action || "overview";
        var data = options.data;
        var access_token = options.access_token;

        var str = JSON.stringify(data);
        var strb64 = btoa(str);

        var url = _rootUrl + "/#/create?eventdestination=" + encodeURIComponent(location.protocol + "//" + location.host) + "&data=" + strb64;

        if (access_token) {
            url += "&access_token=" + access_token;
        }
        if (action) {
            url += "&action=" + action;
        }

        return url;
    }
    AselloClientAPIClient.prototype.call = function(options, callback) {
        var _this = this;

        if(!options)
            return;

        if(!options.access_token && options.user && options.password) {
            getToken(options.user, options.password, function(err, access_token) {
                options.access_token = access_token;

                 _this.updateIFrame(options, callback);
            });
        }
        else {
            this.updateIFrame(options, callback);
        }
    }
	AselloClientAPIClient.prototype.openDetailsInternal = function(options) {
		var access_token = options.access_token;
		var number = options.number;
		
		var url = _rootUrl + "/#/invoice/detail/" + number
		
		if (access_token) {
            url +=  "?access_token=" + access_token;
        }
		
		var iframe = document.querySelector(_iframequery);

		if(iframe) {
			iframe.src = "";

			setTimeout(function() {
				iframe.src = url;
			}, 100);
		}
	}
	AselloClientAPIClient.prototype.openDetails = function(options) {
		var _this = this;
		
		if(!options)
			return;
		
		if(!options.access_token && options.user && options.password) {
            getToken(options.user, options.password, function(err, access_token) {
                options.access_token = access_token;

                 _this.openDetailsInternal(options);
            });
        }
        else {
            this.openDetailsInternal(options);
        }
	}
	

    window.AselloClientAPIClient = AselloClientAPIClient;
})(window);