'use strict';
/*
* Copyright IBM Corp All Rights Reserved
*
* SPDX-License-Identifier: Apache-2.0
*/
/*
 * Chaincode query
 */

var Fabric_Client = require('fabric-client');
var path = require('path');
var util = require('util');
var os = require('os');

const CONFIGS = require('../../common/config');

function query(req, res) {
	//
	var fabric_client = new Fabric_Client();

	// setup the fabric network
	var channel = fabric_client.newChannel(CONFIGS.CHANNEL_NAME);
	var peer = fabric_client.newPeer(CONFIGS.PEER_URL);
	channel.addPeer(peer);

	//
	var member_user = null;
	var store_path = path.join(__dirname, '../../hfc-key-store');
	// console.log('Store path:'+store_path);
	var tx_id = null;

	// create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
	Fabric_Client.newDefaultKeyValueStore({ path: store_path
	}).then((state_store) => {
		// assign the store to the fabric client
		fabric_client.setStateStore(state_store);
		var crypto_suite = Fabric_Client.newCryptoSuite();
		// use the same location for the state store (where the users' certificate are kept)
		// and the crypto store (where the users' keys are kept)
		var crypto_store = Fabric_Client.newCryptoKeyStore({path: store_path});
		crypto_suite.setCryptoKeyStore(crypto_store);
		fabric_client.setCryptoSuite(crypto_suite);

		// get the enrolled user from persistence, this user will sign all requests
		return fabric_client.getUserContext(CONFIGS.ENROLL_USER_ID, true);
	}).then((user_from_store) => {
		if (user_from_store && user_from_store.isEnrolled()) {
			// console.log('Successfully loaded user2 from persistence');
			member_user = user_from_store;
		} else {
			throw new Error('Failed to get ' + CONFIGS.ENROLL_USER_ID + '.... run registerUser.js');
		}

		var request = null;

		if (req.params.id == "" || req.params.id == null || req.params.id == undefined ) {
			// queryCar chaincode function - requires 1 argument, ex: args: ['CAR4'],
			// queryAllCars chaincode function - requires no arguments , ex: args: [''],
			request = {
				//targets : --- letting this default to the peers assigned to the channel
				chaincodeId: CONFIGS.CHAIN_CODE_ID,
				fcn: 'queryAllCars',
				args: ['']
			};
		} else {
			request = {
				chaincodeId: CONFIGS.CHAIN_CODE_ID,
				fcn: 'queryCar',
				args: [req.params.id]
			};
		}

		// send the query proposal to the peer
		return channel.queryByChaincode(request);
	}).then((query_responses) => {
		// console.log("Query has completed, checking results");
		// query_responses could have more than one  results if there multiple peers were used as targets
		if (query_responses && query_responses.length == 1) {
			if (query_responses[0] instanceof Error) {
				console.error("error from query = ", query_responses[0]);
				res.send(query_responses[0]);
			} else {
				// console.log("Response is ", query_responses[0].toString());
				res.send(query_responses[0].toString());
			}
		} else {
			console.log("No payloads were returned from query");
			res.send("Empty data");
		}
	}).catch((err) => {
		console.error('Failed to query successfully :: ' + err);
		res.send("Error");
	});
}

module.exports = {
	query
}