// var serverurl = "https://kassa.asello.at";
var serverurl = "http://localhost:50306/";

var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/json");

var select = document.querySelector(".main .left .left-header select.example");
var actionSelect = document.querySelector(".main .left .left-header select.action");
var printerSelect = document.querySelector(".main .left .left-header select.printer");
var iframe = document.querySelector(".main .right iframe");
var userInput = document.querySelector("#userName");
var passwordInput = document.querySelector("#password");
var rnrtxt = document.querySelector("#rnrtxt");
var cancelcbx = document.querySelector('#cancelcbx');

// load last settings
if(window.localStorage != null) {
	var obj = window.localStorage.getItem("demo-settings");
	
	if(obj) {
		try {
			obj = JSON.parse(obj);
			
			userInput.value = obj.user;
			passwordInput.value = obj.password;
			actionSelect.value = obj.action;
			rnrtxt.value = obj.number;
			printerSelect.value = obj.printer;
			cancelcbx.checked = obj.cancelprint;
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

var api = new AselloClientAPIClient("#aselloframe", serverurl)

function saveCurrentSettings() {
	window.localStorage.setItem("demo-settings", JSON.stringify({
		user: userInput.value,
		password: passwordInput.value,
		action: actionSelect.value,
		number: rnrtxt.value,
		printer: printerSelect.value,
		cancelprint: cancelcbx.checked
	}));
}

function opendetail() {
    saveCurrentSettings();
	
	var nr = rnrtxt.value;
	
	if(nr == null || nr == "")
		return;
	
	api.openDetails({
		access_token: null,
        user: userInput.value,
        password: passwordInput.value,
		number: nr
	});
}

function cancel() {
    saveCurrentSettings();

    var nr = rnrtxt.value;
	
	if(nr == null || nr == "")
		return;

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


    api.create({
        access_token: null,
        user: userInput.value,
        password: passwordInput.value,
        action: actionSelect.value,
		printer: printerSelect.value,
        data: obj
    }, function(result, err) {
		if(err) {
			alert("Error " + err.message)
			return;
		}

        alert("The invoice number is '" + result.number + "' with id " + result.id)
    });
}