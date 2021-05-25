
//Contract Configs

// Ropsten:
//export const COUNTRY_ADDRESS = '0x7f38B87C937fDE513616a78B37d3d4B10EB6cf6C'


//Ganache:

export const COUNTRY_ADDRESS = '0x3a211b6Df476b883a66BB298F75eCAab7aB5E9c7'


export const COUNTRY_ABI = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "total",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "perCap",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "EPI",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "EH",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "EV",
				"type": "uint256"
			}
		],
		"name": "addCountry",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "countries",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "country",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "totalCO2",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "perCapCO2",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "envPerfIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "envHealth",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ecoVitality",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "changes",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "editTime",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "countryCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "genesis",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "history",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "country",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "totalCO2",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "perCapCO2",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "envPerfIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "envHealth",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ecoVitality",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "changes",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "editTime",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "returnCountry",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "country",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "totalCO2",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "perCapCO2",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "envPerfIndex",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "envHealth",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ecoVitality",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "changes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "editTime",
						"type": "uint256"
					}
				],
				"internalType": "struct CountryData.Country",
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "returnCountryCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "total",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "perCap",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "EPI",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "EH",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "EV",
				"type": "uint256"
			}
		],
		"name": "updateCountry",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
