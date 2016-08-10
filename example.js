var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
// editor.getSession().setMode("ace/mode/javascript");
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

var select = document.querySelector(".main .left .left-header select.example");
var actionSelect = document.querySelector(".main .left .left-header select.action");
var iframe = document.querySelector(".main .right iframe");
var userInput = document.querySelector("#userName");
var passwordInput = document.querySelector("#password");

function selectionChanged() {
    var template = window[select.value];

    if (template != null) {
        editor.setValue(template);
        editor.selection.moveCursorToPosition({ row: 0, column: 0 });
    }
}
select.addEventListener("change", selectionChanged);

selectionChanged();

var api = new AselloClientAPIClient("#aselloframe", "http://localhost:50306")

function exec() {
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
        data: obj
    }, function(result) {
        alert("The invoice number is '" + result.number + "'")
    });
}