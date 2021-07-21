const Models = require("../database/models");
const moment = require("moment");
const {Op} = require("sequelize");

exports.successPayment = async(userId) => {
  const bill = await findSuccessBill(userId);
  const billDetails = bill.map(x => x.dataValues);
  
  let notificationArr = [];
  for (let index = 0; index < billDetails.length; index++) {
    const notification = await findService(billDetails[index].bill_type, billDetails[index].id);
    notificationArr.push(notification)    
  }
  notificationArr = notificationArr.map(x => x.dataValues);  
  
  let data = await realMerge(billDetails, notificationArr);
  return data;
}  

exports.failedPayment = async(userId) => {
  const bill = await findFailedBill(userId);
  const billDetails = bill.map(x => x.dataValues);
  
  let notificationArr = [];
  for (let index = 0; index < billDetails.length; index++) {
    const notification = await findService(billDetails[index].bill_type, billDetails[index].id);
    notificationArr.push(notification)    
  }
  notificationArr = notificationArr.map(x => x.dataValues);  
  
  let data = await realMerge(billDetails, notificationArr);
  return data;
}  

exports.reminderDue = async(userId) => {
  const bill = await findBill(userId);

  const dateNow = moment().add(2, "days").format('DD-MM-YYYY'); 
  let result = [];   

  bill.forEach((val) => {
  const billDueDate = moment(val.recurring_billing.due_date).format('DD-MM-YYYY');
  if(billDueDate === dateNow) {
    result.push(val);
  } 
  });

  let notificationArr = [];
  for (let index = 0; index < result.length; index++) {
    const notification = await findService(result[index].bill_type, result[index].id);
    notificationArr.push(notification)    
  }

  let data = await realMerge(result, notificationArr);
  return data;  
}

const findBill = async(userId) => {
  const bill = await Models.bills.findAll({
    attributes: ["id", "bill_type"],
    where: {user_id: userId},  
    include: {
      model: Models.recurring_billings,
      attributes: ["due_date"],
      where: {is_delete: "false"}
      // where: {due_date: { [Op.eq]: due_date }}  
    }
  }); 
  return bill;
}

const findSuccessBill = async(userId) => {
  const bill = await Models.bills.findAll({
    attributes: ["id","bill_type"],
    where: {user_id: userId},
    include: [{
      model: Models.transactions,
      attributes: ["status"],
      where: { status: "Success" }  
    }]
  });
  return bill;
} 

const findFailedBill = async(userId) => {
  const bill = await Models.bills.findAll({
    attributes: ["id","bill_type"],
    where: {user_id: userId},
    include: [{
      model: Models.transactions,
      attributes: ["status"],
      where: { status: "Failed" }  
    }]
  });
  return bill;
}

const findService = async(type, billId) => {
  let service;
  if(type === "Listrik-Tagihan"){
    service = await Models.pln_tagihan_bills.findOne({
      where: { bill_id: billId },
      attributes: ["name", "total", "customer_number"],
      order: [["updatedAt","DESC"]]
    });
  }

  if(type === "Listrik-Token"){
    service = await Models.pln_token_bills.findOne({
      where: { bill_id: billId },
      attributes: ["name", "total", "customer_number"],
      order: [["updatedAt","DESC"]]
    });
  }

  if(type === "Mobile-Pulsa" || type === "Mobile-Internet" || type === "Mobile-Pasca" ){
    service = await Models.mobile_bills.findOne({
      where: { bill_id: billId },
      attributes: ["provider", "total", ["phone_number","customer_number"]],
      order: [["updatedAt","DESC"]]
    });
  }

  if(type === "Landline"){
    service = await Models.landline_bills.findOne({
      where: { bill_id: billId },
      attributes: [["phone_number","customer_number"], "total"],
      order: [["updatedAt","DESC"]]
    });
  }

  if(type === "Internet-TV"){
    service = await Models.landline_bills.findOne({
      where: { bill_id: billId },
      attributes: ["provider","customer_number", "total"],
      order: [["updatedAt","DESC"]]
    });
  }

  if(type === "PDAM"){
    service = await Models.pdam_bills.findOne({
      where: { bill_id: billId },
      attributes: ["name", "total", "customer_number"],
      order: [["updatedAt","DESC"]]
    });
  }
  
  if(type === "BPJS"){
    service = await Models.bpjs_bills.findOne({
      where: { bill_id: billId },
      attributes: [["full_name","name"], "total", ["va_number","customer_number"]],
      order: [["updatedAt","DESC"]]
    });
  }

  return service;
}

const realMerge = (to, from) => {
  for (key in from) {
      if (typeof to[key] != 'object') {
          to[key] = from[key];
      } else if (typeof from[key] == 'object') {
          to[key] = realMerge(to[key], from[key]);
      }
  }
  return to;
};
