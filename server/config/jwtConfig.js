const crypto = require('crypto')

//generate random key
const secretKey = crypto.randomBytes(32).toString('hex')

module.exports ={secretKey}