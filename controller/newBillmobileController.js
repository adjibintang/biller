const models = require("../database/models");
const moment = require ("moment");
const mobile_bills = require("../database/models/mobile_bills");



exports.createnewbillinternet = async (req , res ) => {
  console.log(req.body); 
  const { Phone_number, Provider, Bill, Admin, Total } = req.body.result;
  const { period, date, type_payment, bank } = req.body;
  

const createbill = await models.bills.create({user_id: req.user.dataValues.id});
  
  let date_billed = null
  if (period === "month") {
    date_billed = moment(date).add(1, 'months').calendar();
    
    } else if (period === "week") {
    date_billed = moment(date).add(7, 'days').calendar();
    }
    else if (period === "year") {
      date_billed = moment(date).add(1,'years').calendar();
    }

  const requiring_bill = await models.mobile_bills.create({
    bill_id: createbill.id,
    period ,
    date_billed,
    is_delete: false,
  });

  // const total_bill = await models.mo

  const transaction = await models.transactions.create({
    bill_id: createbill.id,
  })

  const transaction_payment = await models.transaction_payments.create({
    transaction_id: transaction.dataValues.id,
    type: type_payment

  });

  const bank_account = await models.biller_bank_accounts.findOne({
    where: {account_bank: bank}});

  // const account_name = await models.biller_bank_accounts.findOne({
  //   where: {}
  // }) 

  const bank_transfers = await models.bank_transfers.create({
    transaction_payment_id: transaction_payment.id,
    bank_destination_id: bank_account.id,
  })

  const recurringbilling = await models.recurring_billings.create({
    bill_id: createbill.id,
    period,
    date_billed,
    is_delete: false
  })

  console.log(bank_account)
  res.status(200).json({
    payment_details: {
      total: mobile_bills .total,
      bank: bank_account.account_bank,
      account_name: bank_account.account_name,
      account_number: bank_account.account_number
      


    }
  })


}


// exports.createnewbillpulsa = async (req , res ) => {
   
//   const {
//       Phone_number ,
//       Provider ,
//       Bill ,
//       Admin,
//       Total,
//       period,
//       date,
//       type_payment,
//       bank,
//     } = req.body

