// For hyperledger
// enroll admin
const CA_CLIENT_URL = 'http://54.255.177.68:7054'
const CA_NAME = 'ca.example.com'
const ADMIN_NAME = 'admin'
const ADMIN_PASSWORD = 'adminpw'
const MSP_ID = 'Org1MSP'

// register user
const ENROLL_USER_ID = 'user4'
const AFFILIATION = 'org1.department1'
const ROLE = 'client'

// query
const CHANNEL_NAME = 'mychannel'
const PEER_URL = 'grpc://54.255.177.68:7051'
const CHAIN_CODE_ID = 'fabcar'

// invoke
const ORDERER_URL = 'grpc://54.255.177.68:7050'

// For akachain
// enroll admin
// const CA_CLIENT_URL = 'http://13.250.29.233:7054'
// const CA_NAME = 'ca.akc.com'
// const ADMIN_NAME = 'admin'
// const ADMIN_PASSWORD = 'adminpw'
// const MSP_ID = 'akcMSP'

// // register user
// const ENROLL_USER_ID = 'user4'
// const AFFILIATION = 'akc.department1'
// const ROLE = 'client'

// // query
// const CHANNEL_NAME = 'ctcchannel'
// const PEER_URL = 'grpc://13.229.109.23:7051'
// const CHAIN_CODE_ID = 'ctc_cc'

// // invoke
// const ORDERER_URL = 'grpc://54.169.135.15:7050'

// Node server
const NODEJS_URL = '13.229.109.23:8081'

// Socket
const CHANGE_CAR_OWNER_EVENT = 'changeCarOwner'
const REGISTER_CAR_EVENT = 'registerCar'
const UPDATE_CAR_EVENT = 'updateCar'

module.exports = {
    CA_CLIENT_URL,
    CA_NAME,
    ADMIN_NAME,
    ADMIN_PASSWORD,
    MSP_ID,
    ENROLL_USER_ID,
    AFFILIATION,
    ROLE,
    CHANNEL_NAME,
    PEER_URL,
    CHAIN_CODE_ID,
    ORDERER_URL,
    NODEJS_URL,
    CHANGE_CAR_OWNER_EVENT,
    UPDATE_CAR_EVENT,
    REGISTER_CAR_EVENT
}