var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/json");

var select = document.querySelector(".main select.example");
var actionSelect = document.querySelector(".main select.action");
var printerSelect = document.querySelector(".main select.printer");
var iframe = document.querySelector(".main .right iframe");
var userInput = document.querySelector("#userName");
var passwordInput = document.querySelector("#password");
var serverInput = document.querySelector("#serveraddress");
var identityaddress = document.querySelector('#identityaddress');
var autologoffInput = document.querySelector('#autologoff');
var rnrtxt = document.querySelector("#rnrtxt");
var crnrtxt = document.querySelector('#crnrtxt');
var cancelcbx = document.querySelector('#cancelcbx');
var cashwamount = document.querySelector('#cashwamount');
var cashwreason = document.querySelector('#cashwreason');
var cashwprint = document.querySelector('#cashwprint');
var cashdamount = document.querySelector('#cashdamount');
var cashdreason = document.querySelector('#cashdreason');
var cashdprint = document.querySelector('#cashdprint');

// load last settings
if(window.localStorage != null) {
	var obj = window.localStorage.getItem("demo-settings");
	
	if(obj) {
		try {
			obj = JSON.parse(obj);
			
			userInput.value = obj.user;
			passwordInput.value = obj.password;
			
			if(obj.server == null || obj.server == "") {
				serverInput.value = "https://kassa.asello.at/";
			}
			else {
				serverInput.value = obj.server;
			}
			if(obj.identityaddress == null || obj.identityaddress == "") {
				identityaddress.value = serverInput.value;
			}
			else {
				identityaddress.value = obj.identityaddress;
			}

			if(obj.autoLogoff == true)
				autologoffInput.checked = true;
			
			actionSelect.value = obj.action;
			rnrtxt.value = obj.number;
			crnrtxt.value = obj.number;
			printerSelect.value = obj.printer;
			cancelcbx.checked = obj.cancelprint;
			cashwamount.value = obj.cashwamount || 0;
			cashwreason.value = obj.cashwreason || "";
			cashwprint.checked = obj.cashwprint;
			cashdamount.value = obj.cashdamount || 0;
			cashdreason.value = obj.cashdreason || "";
			cashdprint.checked = obj.cashdprint;
		}
		catch(err) {
			
			
		}
	}
}

function selectionChanged() {
    var template = window[select.value];

    if (template != null) {
        editor.setValue(template);
        editor.selection.moveCursorToPosition({ row: 0, column: 0 });
    }
}
select.addEventListener("change", selectionChanged);

selectionChanged();

function createAPI() {
	var serverurl = "https://kassa.asello.at/";

	if(serverInput.value != null && serverInput.value != "") {
		serverurl = serverInput.value;
	}
	
	var identityUrl = serverurl;

	if(identityaddress.value != null && identityaddress.value != ""){
		identityUrl = identityaddress.value;
	}
	
	return new AselloClientAPIClient("#aselloframe", serverurl, identityUrl)
}

function saveCurrentSettings(nr) {
	window.localStorage.setItem("demo-settings", JSON.stringify({
		user: userInput.value,
		password: passwordInput.value,
		server: serverInput.value,
		identityaddress: identityaddress.value,
		autoLogoff: autologoffInput.checked,
		action: actionSelect.value,
		number: nr || rnrtxt.value,
		printer: printerSelect.value,
		cancelprint: cancelcbx.checked,
		cashwamount: cashwamount.value,
		cashwreason: cashwreason.value,
		cashwprint: cashwprint.checked,
		cashdamount: cashdamount.value,
		cashdreason: cashdreason.value,
		cashdprint: cashdprint.checked,
	}));
}

function opendetail() {
	
	var nr = rnrtxt.value;


    saveCurrentSettings(nr);
	
	if(nr == null || nr == "")
		return;
	
	var api = createAPI();
	
	api.openDetails({
		access_token: null,
        user: userInput.value,
        password: passwordInput.value,
		number: nr
	});
}

function cancel() {

    var nr = crnrtxt.value;

    saveCurrentSettings(nr);
	
	if(nr == null || nr == "")
		return;

	var api = createAPI();
	
    api.cancel({
		access_token: null,
        user: userInput.value,
        password: passwordInput.value,
		printer: printerSelect.value,
		print: cancelcbx.checked,
		invoiceid: nr,
        reason: 'reason',
        internal_note: 'internal_note'
	}, function(result, err) {
		if(err) {
			alert("Error " + err.message)
			return;
		}

        alert("The invoice number is '" + result.number + "' with id " + result.id)
    });
}

function exec() {
	saveCurrentSettings();
	
    var val = editor.getValue();    
    var obj = null;

    try {
        obj = JSON.parse(val);
    }
    catch (err) {
        console.error(err);
        return;
    }

	var api = createAPI();

    api.create({
        access_token: null,
        user: userInput.value,
        password: passwordInput.value,
        action: actionSelect.value,
		printer: printerSelect.value,
		autoLogoff: autologoffInput.checked,
        data: obj
    }, function(result, err) {
		if(err) {
			alert("Error " + err.message)
			return;
		}

        alert("The invoice number is '" + result.number + "' with id " + result.id)
    });
}

function cashwithdrawal() {
	saveCurrentSettings();

	var api = createAPI();

	api.cashwithdrawal({
		access_token: null,
        user: userInput.value,
        password: passwordInput.value,
		printer: printerSelect.value,
		print: cashwprint.checked,
		amount: cashwamount.value,
        reason: cashwreason.value,
		autoLogoff: autologoffInput.checked
	}, function(result, err) {
		if(err) {
			alert("Error " + err.message)
			return;
		}

        alert("The invoice number is '" + result.number + "' with id " + result.id)
    });
}

function cashdeposit() {
	saveCurrentSettings();

		var api = createAPI();

	api.cashdeposit({
		access_token: null,
        user: userInput.value,
        password: passwordInput.value,
		printer: printerSelect.value,
		print: cashdprint.checked,
		amount: cashdamount.value,
        reason: cashdreason.value,
		autoLogoff: autologoffInput.checked
	}, function(result, err) {
		if(err) {
			alert("Error " + err.message)
			return;
		}

        alert("The invoice number is '" + result.number + "' with id " + result.id)
    });
}