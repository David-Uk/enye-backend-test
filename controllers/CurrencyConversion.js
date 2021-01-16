const fetch = require("node-fetch");

exports.getCurrencyValues = async (req, res, next) => {
    let {base, currency} = req.query;

    try {
        // The exchange api accepts only uppercase wrt base and currency

        base = base.toUpperCase();
        currency = currency.toUpperCase();

        //  The Api does not also accept strings

        base = base.replace(/['"]+/g, '');
        currency = currency.replace(/['"]+/g, '');

        const url = `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`;
        const request = await fetch(url);

        if ((request.status === 200 || 201, request.statusText === 'OK')) {
        const response = await request.json();
        return res.status(201).json({
            "results": {
                "base": response.base,
                "date": response.date,
                "rates": response.rates
            }
        });
        } else {
            if(request.status === 404 || 400 && !base && !currency) {
                return res.json({results: "You did not include the base and currency in your request"});
            }

            if(request.status === 404 || 400 && !base) {
                return res.json({results: "Please indicate the base currency value"});
            }

            if(request.status === 404 || 400 && !currency) {
                return res.json({results: "Please state the currency values to convert to"});
            }

            if(request.status === 404 || 400) {
                return res.json({results: "Non existent exchange rate"});
            }

            return res.json({results: `Error ${result.status} occurred`});


        }

    } catch(error) {
        next(error);
    }
}