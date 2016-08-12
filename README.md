# asello ClientApi
asello client api - library to control asello within an iframe

More information about asello and the asello clientapi could be found on our website: https://asello.at/entwickler-api/

# Getting started

1) Create an iframe in your web application.

2) Create an asello client with the iframe query.

```javascript
var api = new AselloClientAPIClient("#aselloframe", "https://kassa.asello.at")
```

3) Get an access token from the webserver

OAuth Token Endpoint: `https://kassa.asello.at/token`

4) Call the asello client api

```javascript

api.call({
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

For more examples please visit `https://asello.at/entwickler-api/entwickler-playground/` or contact `support@asello.at`. 

# Start the sample

Install the dependencies and start the webserver.
```
npm install
bower install
npm start
```

Start a webbrowser to `http://localhost:8080`
