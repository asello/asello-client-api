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
	var b64EncodeUnicode = function (str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
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

            if(callback && event.data.action == "invoice-created") {
                callback(event.data.result, event.data.error);
            }
        });
    }
    AselloClientAPIClient.prototype.updateIFrame = function(url, options, callback) {
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
    AselloClientAPIClient.prototype.updateIFrameCreate = function(options, callback) {
        var url = this.getCreateUrl(options);

        return this.updateIFrame(url, options, callback);
    }

    AselloClientAPIClient.prototype.getCreateUrl = function(options) {
        var action = options.action || "overview";
        var data = options.data;
        var access_token = options.access_token;
		var printer = options.printer;

        var str = JSON.stringify(data);
        var strb64 = b64EncodeUnicode(str);

        var url = _rootUrl + "/#/create?eventdestination=" + encodeURIComponent(location.protocol + "//" + location.host) + "&data=" + strb64;

        if (access_token) {
            url += "&access_token=" + access_token;
        }
        if (action) {
            url += "&action=" + action;
        }
		if(printer) {
			url += "&printer=" + printer
		}

        return url;
    }
    AselloClientAPIClient.prototype.getCancelUrl = function(options) {
        var action = "cancel";
        var data = options.data;
        var access_token = options.access_token;

        var str = JSON.stringify({
            invoiceid: options.invoiceid,
            reason: options.reason,
            internal_note: options.internal_note,
            print: options.print,
            printer: options.printer   
        });
        var strb64 = b64EncodeUnicode(str);

        var url = _rootUrl + "/#/invoice/detail/" + options.invoiceid + "?eventdestination=" + encodeURIComponent(location.protocol + "//" + location.host) + "&data=" + strb64;

        if (access_token) {
            url += "&access_token=" + access_token;
        }
        if (action) {
            url += "&action=" + action;
        }

        return url;
    }
    AselloClientAPIClient.prototype.call = function(options, callback) {
        console.log("Function 'call' is deprecated. Please use 'create'.");

        return this.create(options, callback);
    }
    AselloClientAPIClient.prototype.create = function(options, callback) {
        var _this = this;

        if(!options)
            return;

        if(!options.access_token && options.user && options.password) {
            getToken(options.user, options.password, function(err, access_token) {
                options.access_token = access_token;

                 _this.updateIFrameCreate(options, callback);
            });
        }
        else {
            this.updateIFrameCreate(options, callback);
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
    /**
     * cancel an invoice
     * 
     * @param {object} options The cancel options
     * @param {string} options.access_token The access token (optional if username and password are provided)
     * @param {string} options.user The username (optional if access_token is provided)
     * @param {string} options.password The username (optional if access_token is provided)
     * @param {string} options.invoiceid The invoice id to cancel (required)
     * @param {string} options.reason The reason (reason or internal_note are required)
     * @param {string} options.internal_note The internal note (reason or internal_note are required)
     * @param {string} options.printer The printer to print the cancellation
     * @param {function} callback The result callback
     */
	AselloClientAPIClient.prototype.cancel = function(options, callback) {
        var _this = this;

        if(!options)
            return;

        var cancelInternal = function (options, callback) {
            var url = _this.getCancelUrl(options);

            return _this.updateIFrame(url, options, callback);
        };


        if(!options.access_token && options.user && options.password) {
            getToken(options.user, options.password, function(err, access_token) {
                options.access_token = access_token;

                 cancelInternal(options, callback);
            });
        }
        else {
            cancelInternal(options, callback);
        }
    }

    window.AselloClientAPIClient = AselloClientAPIClient;
})(window);