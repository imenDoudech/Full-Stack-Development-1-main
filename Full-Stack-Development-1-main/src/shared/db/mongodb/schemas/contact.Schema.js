const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: { 
        type: String,
        trim: true,
        required: true,
        
    },
    
    phone: {
        type: Number,
        required: true,
  
    },
    company_name: {
        type: String,
        trim: true,
        required: true
    },

    project_name: {
        type: String,
        trim: true,
        required: true
    },

    project_desc:{
        type: String,
        trim: true,
        required: true
    },

    department: {
        type: String,
        trim: true,
        required: true
    },

    message: {
        type: String,
        required: true
    },
    file: {
        type: String,
      
    }


}, { timestamps: true })





const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;