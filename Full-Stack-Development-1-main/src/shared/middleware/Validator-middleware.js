
const message = require('./schemas/contact.Schema');

const validationInfos  = require('express-validator');
const validatePhoneNumber = require('validate-phone-number-node-js');

const validate =() =>{
    validationInfos.isEmail (email);
    const result = validatePhoneNumber.validate(phone);
    
}

module.exports(validate);

