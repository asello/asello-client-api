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


var sampleRef =
'{\n\
    "items": [{\n\
        "name": "Produkt 1",\n\
        "description": "Meine Beschreibung",\n\
        "netprice": 20,\n\
        "vatcode": "A",\n\
        "quantity": 2\n\
    }],\n\
    "reference": "R001"\n\
\n\
}';
var sampleCHF =
'{\n\
    "items": [{\n\
        "name": "Produkt 1",\n\
        "description": "Meine Beschreibung",\n\
        "netprice": 20,\n\
        "vatcode": "M",\n\
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
        "vatcode": "A",\n\
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
var sampleWithMixedVATCHF =
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
		},\n\
    }]\n\
\n\
}';
var sampleWithSpecialCharacters =
'{\n\
    "items": [{\n\
        "name": "Produkt 1 äöüÖÄÜß",\n\
        "description": "Meine Beschreibung",\n\
        "netprice": 20,\n\
        "vatcode": "A",\n\
        "quantity": 2\n\
    }]\n\
\n\
}';

var sampleComplex = 
'{  \n\
    "items":[  \n\
       {  \n\
          "name":"",\n\
          "articlenumber":"1003",\n\
          "netprice":7.1818,\n\
          "vatcode":"D",\n\
          "quantity":1\n\
       },\n\
       {  \n\
          "name":"",\n\
          "articlenumber":"2002",\n\
          "netprice":2.6364,\n\
          "vatcode":"D",\n\
          "quantity":1\n\
       }\n\
    ],\n\
    "payment_type":"Cash",\n\
    "type":"Invoice",\n\
    "annotation":"Barcelona",\n\
    "reference":"E45T13614U2D6N726"\n\
 }';