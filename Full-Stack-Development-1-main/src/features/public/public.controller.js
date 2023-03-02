const express = require ('express');
const Data = require('../../shared/resources/data');
const Contact = require('../../shared/db/mongodb/schemas/contact.Schema');
const { response } = require('express');
const validator =require ('validator');






const contactUs = async(req,res) => {
  //Creation d'un nouvel contact
  try{

  
  const newContact = new Contact({
  name :req.body.name,
  email : req.body.email,
  phone : req.body.phone,
  company_name : req.body.company_name,
  project_name : req.body.project_name,
  project_desc:req.body.project_desc,
  department :req.body.department,
  message :req.body.message,
  file : null,

});

//const responseMessage = `Message received from ${first_name}`;

//console.log(message);

await newContact.save();
res.send ("effectue avec success")

  } catch (err){
    console.log(err);
  };


};





const calculateQuote = (req,res) => {

  // define constants
  const apts = +req.query.apts;
  const floors = +req.query.floors;
  const tier = req.query.tier.toLowerCase();
  const typeBuilding = req.query.typeBuilding;
  const maxOccupancy = req.query.maxOccupancy;




  // validate request object
  if(!Object.keys(Data.unitPrices).includes(tier)){
    res.status(400);
    res.send(`Error: invalid tier`);
    return;
  }
  
  if(isNaN(floors) || isNaN(apts)){
    res.status(400);
    res.send(`Error: apts and floors must be specified as numbers`);
    return;
  }

  if(!Number.isInteger(floors) || !Number.isInteger(apts)){
    res.status(400);
    res.send(`Error: apts and floors must be integers`);
    return;
  }

  if(floors < 1 || apts < 1){
    res.status(400);
    res.send(`apts and floors must be greater than zero`);
    return;
  }

  // business logic

  let numElevators;
    if (validator.equals(typeBuilding.toLowerCase(), "residencial"))
    numElevators =  calcResidentialElev(floors,apts);

    else if (validator.equals(typeBuilding.toLowerCase(), "commercial"))
    numElevators = calcCommercialElev (floors, maxOccupancy);

  
 const totalCost = calcInstallFee(numElevators,tier);

  // format response
  res.send({
    elevators_required:numElevators,
    cost: totalCost
  });

}

const calcResidentialElev = (numFloors, numApts) => {
  const elevatorsRequired = Math.ceil(numApts / numFloors / 6)*Math.ceil(numFloors / 20);
  return elevatorsRequired;
};

const calcCommercialElev = (numFloors, maxOccupancy) => {
  const elevatorsRequired = Math.ceil((maxOccupancy * numFloors) / 200)*Math.ceil(numFloors / 10);
  const freighElevatorsRequired = Math.ceil(numFloors / 10);
  return freighElevatorsRequired + elevatorsRequired;
};

const calcInstallFee = (numElvs, tier) => {
  const unitPrice = Data.unitPrices[tier];
  const installPercentFees = Data.installPercentFees[tier];
  const total = numElvs * unitPrice * installPercentFees;
  return total;
};


  module.exports = {contactUs,calculateQuote}