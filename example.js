var serverurl = "https://kassa.asello.at";

var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/json");

var sample =
'{\n\
    "items": [{\n\
        "name": "Produkt 1",\n\
        "description": "Meine Beschreibung",\n\
        "netprice": 20,\n\
        "vatcode": "A",\n\
        "quantity": 2\n\
    }]\n\
\n\
}';
var sampleWithExistingProduct =
'{\n\
    "items": [{\n\
        "quantity": 3,\n\
        "articlenumber": "ART00001"\n\
    }]\n\
\n\
}';
var sampleWithCustomer =
'{\n\
    "items": [{\n\
        "name": "Produkt 1",\n\
        "description": "Meine Beschreibung",\n\
        "netprice": 20,\n\
        "vatcode": "A",\n\
        "quantity": 2\n\
    }],\n\
    "customer": {\n\
        "name": "Müller",\n\
        "firstname": "Max",\n\
        "street": "Straße 12",\n\
        "zip": "8150",\n\
        "email": "max.mustermann@example.com",\n\
        "phone": "01234 / 567890",\n\
        "country": "Österreich",\n\
        "city": "Graz"\n\
    }\n\
\n\
}';
var sampleWithExistingCustomer =
'{\n\
    "items": [{\n\
        "name": "Produkt 1",\n\
        "description": "Meine Beschreibung",\n\
        "netprice": 20,\n\
        "vatcode": "A",\n\
        "quantity": 2\n\
    }],\n\
    "customer": {\n\
        "customerid": "KN000001"\n\
    }\n\
\n\
}';
var sampleNote =
'{\n\
    "items": [{\n\
        "name": "Produkt 1",\n\
        "description": "Meine Beschreibung",\n\
        "netprice": 20,\n\
        "vatcode": "A",\n\
        "quantity": 2\n\
    }],\n\
    "annotation": "Meine Anmerkung auf dieser Rechnung",\n\
    "internal_note": "Meine interne Notiz zu dieser Rechnung"\n\
\n\
}';
var sampleDiscount =
'{\n\
    "items": [{\n\
        "name": "Produkt 1",\n\
        "description": "Meine Beschreibung",\n\
        "netprice": 20,\n\
        "vatcode": "A",\n\
        "quantity": 2\n\
    }],\n\
    "discount": 20.0\n\
\n\
}';

var sampleWithMixedVATItem =
'{\n\
    "items": [{\n\
        "name": "Produkt mit Mischsteuersatz",\n\
        "quantity": 4,\n\
        "type": "Bundle",\n\
		"printItems": "ItemAndPrice",\n\
        "children": [{\n\
			"name": "Produkt mit 20%",\n\
			"netprice": 10,\n\
			"vatcode": "A",\n\
			"quantity": 2\n\
		},{\n\
			"name": "Produkt mit 10%",\n\
			"netprice": 10,\n\
			"vatcode": "D",\n\
			"quantity": 2\n\
		},{\n\
			"name": "Produkt mit 0%",\n\
			"netprice": 10,\n\
			"vatcode": "E",\n\
			"quantity": 2\n\
		}]\n\
    }]\n\
\n\
}';
var sampleWithMixedVATItemOnlyItem =
'{\n\
    "items": [{\n\
        "name": "Produkt mit Mischsteuersatz",\n\
        "quantity": 4,\n\
        "type": "Bundle",\n\
		"printItems": "OnlyItem",\n\
        "children": [{\n\
			"name": "Produkt mit 20%",\n\
			"netprice": 10,\n\
			"vatcode": "A",\n\
			"quantity": 2\n\
		},{\n\
			"name": "Produkt mit 10%",\n\
			"netprice": 10,\n\
			"vatcode": "D",\n\
			"quantity": 2\n\
		},{\n\
			"name": "Produkt mit 0%",\n\
			"netprice": 10,\n\
			"vatcode": "E",\n\
			"quantity": 2\n\
		}]\n\
    }]\n\
\n\
}';
var sampleWithMixedVATItemNothing =
'{\n\
    "items": [{\n\
        "name": "Produkt mit Mischsteuersatz",\n\
        "quantity": 4,\n\
        "type": "Bundle",\n\
		"printItems": "Nothing",\n\
        "children": [{\n\
			"name": "Produkt mit 20%",\n\
			"netprice": 10,\n\
			"vatcode": "A",\n\
			"quantity": 2\n\
		},{\n\
			"name": "Produkt mit 10%",\n\
			"netprice": 10,\n\
			"vatcode": "D",\n\
			"quantity": 2\n\
		},{\n\
			"name": "Produkt mit 0%",\n\
			"netprice": 10,\n\
			"vatcode": "E",\n\
			"quantity": 2\n\
		}]\n\
    }]\n\
\n\
}';

var select = document.querySelector(".main .left .left-header select.example");
var actionSelect = document.querySelector(".main .left .left-header select.action");
var printerSelect = document.querySelector(".main .left .left-header select.printer");
var iframe = document.querySelector(".main .right iframe");
var userInput = document.querySelector("#userName");
var passwordInput = document.querySelector("#password");
var rnrtxt = document.querySelector("#rnrtxt");

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

function opendetail() {
	window.localStorage.setItem("demo-settings", JSON.stringify({
		user: userInput.value,
		password: passwordInput.value,
		action: actionSelect.value,
		number: rnrtxt.value,
		printer: printerSelect.value
	}));
	
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

function exec() {
	window.localStorage.setItem("demo-settings", JSON.stringify({
		user: userInput.value,
		password: passwordInput.value,
		action: actionSelect.value,
		number: rnrtxt.value,
		printer: printerSelect.value
	}));
	
    var val = editor.getValue();    
    var obj = null;

    try {
        obj = JSON.parse(val);
    }
    catch (err) {
        console.error(err);
        return;
    }


    api.call({
        access_token: null,
        user: userInput.value,
        password: passwordInput.value,
        action: actionSelect.value,
		printer: printerSelect.value,
        data: obj
    }, function(result) {
        alert("The invoice number is '" + result.number + "' with id " + result.id)
    });
}