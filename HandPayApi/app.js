var express = require('express')
var cors = require('cors')
var app = express()
const bodyParser = require('body-parser');
const axios = require('axios')
const qs = require('querystring')
app.use(cors())
app.use(bodyParser.json())
app.use(express.json());


app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Accept')
	next()
});

app.post('/check/iban', function (req, res, next) {
    axios.post(
      'https://api.fusionfabric.cloud/login/v1/finastra-dev/oidc/token',
      qs.stringify({'grant_type': 'client_credentials', 'client_id': 'ef3cec09-4ffc-4227-a550-a7dd3a51f09f', 'client_secret': "af5e6232-aba8-4637-90d9-bd5b2ca4f4c5"}),
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }
    ).then(response_oauth => {
	axios.post(
            'https://api.fusionfabric.cloud/ibans/v1/validate',
            [{iban: req.body['iban']}],
            {headers: {
		'Content-type': 'application/json',
		Authorization: `Bearer ${response_oauth.data.access_token}`,
					'X-Request-ID': 'GMi2IiaOvX0jAdqw02hDORpyU178Ott3ZY4OVNJ3n24WwbUyRgmvKStaz0649dbR',

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

app.post('/account', function (req, res, next) {
	axios.post(
		'https://api.fusionfabric.cloud/login/v1/finastra-dev/oidc/token',
		qs.stringify({'grant_type': 'client_credentials', 'client_id': '3a0f77fe-84b0-4887-8bd5-b74daa3e0ec4', 'client_secret': "c7948256-d646-48a8-a63d-0513d756a12d"}),
		{
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		}
	).then(response_oauth => {
		console.log("HERE LOL")
		console.log(response_oauth.data.access_token)
		axios.get(
			`https://api.fusionfabric.cloud/retail-us/account/v1/consumers/10349004/accounts/extended`,
			{headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${response_oauth.data.access_token}`
				}}
		).then(response => {
			console.log("HERE LOL 2")
			if (response.data['valid']) {
				res.send({valid: true})
			}
		}).catch(err => {
			console.log("IN ERR ON GET /api/fusion/accounts")
			res.send(err)

		})
	}).catch(err => {
		console.log(err)
	})
})


app.post('/nationalID', function (req, res, next) {
	axios.post(
		'https://api.fusionfabric.cloud/login/v1/finastra-dev/oidc/token',
		qs.stringify({'grant_type': 'client_credentials', 'client_id': 'ef3cec09-4ffc-4227-a550-a7dd3a51f09f', 'client_secret': "af5e6232-aba8-4637-90d9-bd5b2ca4f4c5"}),
		{
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		}
	).then(response_oauth => {
		const bankID = req.body.bankID
		console.log("BANK ID : ", bankID)
		axios.get(
			`https://api.fusionfabric.cloud/bank-identifications/v1/national-ids/${bankID}?nationalIdScheme=USABA`,
			{headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${response_oauth.data.access_token}`
				}}
		).then(response => {
			res.status(200).send(response.data)
		}).catch(err => {
			console.log("IN ERR ON GET /api/fusion/accounts")
			res.status(400).send(err.response.data)

		})
	}).catch(err => {
		res.send(err.response.data)
	})
})


app.listen(4209, function () {
  console.log('CORS-enabled web server listening on port 4209')
})
