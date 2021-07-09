const models = require("../database/models");
const moment = require("moment");
const mobile_bills = require("../database/models/mobile_bills");

exports.createnewbillinternet = async (req, res) => {
  try {
    const { Phone_number, Provider, Bill, Admin, Total } = req.body.data;
    const { period, date } = req.body.recurringBilling;
    const { type_payment, bank } = req.body.payment;

    const createbill = await models.bills.create({
      user_id: req.user.dataValues.id,
    });

    const mobile_bill = await models.mobile_bills.create({
      bill_id: createbill.id,
      phone_number: Phone_number,
      provider: Provider,
      bill_fee: Bill,
      admin_fee: Admin,
      total: Total,
    });

    const transaction = await models.transactions.create({
      bill_id: createbill.id,
      transaction_date: new Date(),
    });

    const transaction_payment = await models.transaction_payments.create({
      transaction_id: transaction.dataValues.id,
      type: type_payment,
    });

    const bankAccountInfo = await models.biller_bank_accounts.findOne({
      where: { account_bank: bank },
    });

    const bankTransfer = await models.bank_transfers.create({
      transaction_payment_id: transaction_payment.id,
      bank_destination_id: bankAccountInfo.id,
    });

    if (req.body.recurringBilling.status == true) {
      const recurringbilling = await models.recurring_billings.create({
        bill_id: createbill.id,
        period,
        date_billed: date,
        due_date: date,
        is_delete: false,
      });
    }

    //   let date_billed = null
    //   if (period === "month") {
    //     date_billed = moment(date).add(1, 'months').calendar();

    //     } else if (period === "week") {
    //     date_billed = moment(date).add(7, 'days').calendar();
    //     }
    //     else if (period === "year") {
    //       date_billed = moment(date).add(1,'years').calendar();
    //     }

    //   const bank_account = await models.biller_bank_accounts.findOne({
    //     where: {account_bank: bank}});

    //   // const account_name = await models.biller_bank_accounts.findOne({
    //   //   where: {}
    //   // })

    //   const bank_transfers = await models.bank_transfers.create({
    //     transaction_payment_id: transaction_payment.id,
    //     bank_destination_id: bank_account.id,
    //   })

    //   console.log(bank_account)
    //   res.status(200).json({
    //     payment_details: {
    //       total: mobile_bills .total,
    //       bank: bank_account.account_bank,
    //       account_name: bank_account.account_name,
    //       account_number: bank_account.account_number

    //     }
    //   })
    res.send("OK");
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};

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
