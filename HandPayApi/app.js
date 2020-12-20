var express = require('express')
var cors = require('cors')
var app = express()
const bodyParser = require('body-parser');
const axios = require('axios')
const qs = require('querystring')
app.use(cors())
app.use(bodyParser.json())

console.log(process.env)
app.post('/check/iban', function (req, res, next) {
    axios.post(
      'https://api.fusionfabric.cloud/login/v1/finastra-dev/oidc/token',
      qs.stringify({'grant_type': 'client_credentials', 'client_id': 'ef3cec09-4ffc-4227-a550-a7dd3a51f09f', 'client_secret': process.env.FINASTRA_SECRET}),
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }
    ).then(response_oauth => {
	axios.post(
            'https://api.fusionfabric.cloud/ibans/v1/validate',
            [{iban: req.body['iban']}],
            {headers: {
		'Content-type': 'application/json',
		'X-Request-ID': 'GMi2IiaOvX0jAdqw02hDORpyU178Ott3ZY4OVNJ3n24WwbUyRgmvKStaz0649dbR',
		Authorization: `Bearer ${response_oauth.data.access_token}`
            }}
	).then(response => {
	    if (response.data['valid']) {
		res.send({valid: true})
	    } else {
		res.send({valid: false})
	    }
	})
    })
})

app.listen(4209, function () {
  console.log('CORS-enabled web server listening on port 4209')
})
