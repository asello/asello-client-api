# asello ClientApi
asello client api - a library to control asello within an iframe

More information about asello and the asello clientapi could be found on the website: https://asello.at/entwickler-api/

# Getting started

1) Create an iframe in your web application.

2) Create an asello client with the iframe selector.

```javascript
var api = new AselloClientAPIClient("#aselloframe", "https://kassa.asello.at")
```

3) Get an access token from the webserver

OAuth Token Endpoint: `https://kassa.asello.at/token`

# API Description

The asello client api offers following methods:

## Create Invoice 
Create a new invoice in asello

Example: 
```javascript

api.create({
        access_token: token,
        action: 'print',
        data: {
            "items": [{
                "name": "Produkt 1",
                "description": "Meine Beschreibung",
                "netprice": 20,
                "vatcode": "A",
                "quantity": 2
            }]

        }
    }, function(result) {
        // alert("The invoice number is '" + result.number + "'")
    });

```


## Open Details
Example:
```javascript

api.openDetails({
    access_token: token,
    number: 123456789
});

```

## Cancel Invoice

Example:
```javascript
api.cancel({
    access_token: token,
    print: true,
    invoiceid: 123456789,
    reason: 'reason',
    internal_note: 'internal_note'
}, function(result, err) {
    /*
    if(err) {
        alert("Error " + err.message)
        return;
    }

    alert("The invoice number is '" + result.number + "' with id " + result.id)
    */
});
```


    For more examples please visit `https://asello.at/entwickler-api/entwickler-playground/` or contact `support@asello.at`. 

# Start the sample

## Prerequirement

* nodejs (https://nodejs.org/) 
* bower (https://bower.io/) 

Install the dependencies and start the webserver (execute following commands in a terminal window).
```
npm install
bower install
npm start
```

Start a webbrowser to `http://localhost:8080`

# Need Help?

Get in touch with the asello team (support@asello.at).