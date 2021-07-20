const moment = require('moment')
const Models = require('../database/models');
const {Op} =require("sequelize");

exports.getAccInfo = async(telephoneNumber, userId) => {
  let accInfo = await Models.Landlines.findOne({
  where: {telephone_number: telephoneNumber}
  });
  accInfo = accInfo.dataValues;
  let error = null;

  const canPay = await checkRangePaymentDate();
  if(canPay !== null) error = canPay;

  const paidBill = await findPaidBill(telephoneNumber);
  if (paidBill !== null) error = "Landline Service Already Paid";

  let period = [];
  let countMonth = await monthDiff(accInfo.period, new Date());
    if (countMonth !== 0) {
      for (let i = 0; i < (countMonth + 1); i++) {
        period.push(
          `${new Date().getFullYear()}-${new Date().getMonth() - i}-25`
        );
      }
    } if(countMonth === 0) period = moment(accInfo.period).format("YYYY-MM-DD");

  const activeStatus = await isActive(countMonth);
  if(activeStatus !== null) error = activeStatus;

  let fixBill = 0;
  (countMonth !== 0) ? fixBill = countMonth * accInfo.abonemen : fixBill = accInfo.abonemen ;
  
  const late_payment_fee = await calcPaymentFee(countMonth, accInfo.abonemen);
  const admin_fee = 2500;
  const total = parseInt(fixBill) + parseInt(admin_fee) + parseInt(late_payment_fee); 

  const pin = await findPin(userId);

  accInfo = {
    No_Telephone: telephoneNumber,
    Period: `${period}`,
    Bill: fixBill,
    Admin: admin_fee,
    Late_Payment_Fee: late_payment_fee,
    Total: total,
    PIN: `${pin.dataValues.pin}`
  };

  return {data: accInfo, error};
};

exports.createLandlineBill = async (obj, userId) => {
  let error = null;
  const user = await Models.Landlines.findOne({ where: {id: userId} });
  if(!user) error = "User not found";

  const bill = await Models.bills.create({
    user_id: userId,
    bill_type: "Landline"
  });

  let landline_bill_details = {};
  for (let i = 0; i < obj.data.Period.length; i++) {
    landline_bill_details = await Models.landline_bills.create({
      bill_id: bill.id,
      phone_number: obj.data.No_Telephone,
      bill_fee: obj.data.Bill,
      admin_fee: obj.data.Admin,
      late_payment_fee: obj.data.Late_Payment_Fee,
      total: obj.data.Total,
      period: new Date(obj.data.Period[i])
    });
  }

  landline_bill_details = {
    No_Telephone: obj.data.No_Telephone,
    Period: obj.data.Period,
    Bill: obj.data.Bill,
    Admin: obj.data.Admin,
    Late_Payment_Fee: obj.data.Late_Payment_Fee,
    Total: obj.data.Total,
    PIN: obj.data.PIN,
  }

  const transaction = await Models.transactions.create({
    bill_id: bill.id,
    transaction_date: new Date(),
    status: "Process",
  });

  if (obj.recurringBilling.status === true) {
    let date_billed = await getRecurringDate (obj.recurringBilling.period, obj.recurringBilling.dayOfWeek, obj.recurringBilling.recurringDate)
    const due_date = new Date(date_billed).setDate(25);

    const checkLastRecurring = await findLastRecurringBill(bill.id);
    if(checkLastRecurring === null) {
      const createRecurring = await Models.recurring_billings.create({
        bill_id: bill.id,
        period: obj.recurringBilling.period,
        date_billed,
        due_date,
        is_delete: false
      });
    } else {
      const updateRecurring = await Models.recurring_billings.update(
        {
          bill_id: bill.id,
          period: obj.recurringBilling.period,
          date_billed,
          due_date,
        },
        { where: {id: checkLastRecurring.id} }
      );
    }
  }

  const transactionPayment = await Models.transaction_payments.create({
    transaction_id: transaction.id,
    type: obj.payment.type,
  });

  let bankTransferDetails = await Models.bank_transfers.create({
    transaction_payment_id: transactionPayment.id,
    bank_destination_id: obj.payment.bank_destination_id,
  });

  const bankAccountDetails = await Models.biller_bank_accounts.findOne({where: {id: obj.payment.bank_destination_id}})

  bankTransferDetails = bankTransferDetails.dataValues;
  bankTransferDetails = {
    Total: 0,
    account_bank: bankAccountDetails.account_bank,
    account_name: bankAccountDetails.account_name,
    account_number: bankAccountDetails.account_number,
  };

  data = {
    bill_id: bill.id,
    transaction_id: transaction.id,
    landline_bill_details, 
    bankTransferDetails,
    notificationMessage: "Payment Created"
  }
  return data;
};

const checkRangePaymentDate = async() => {
  let message = null
  const now = new Date().getDate();
  if(now > 25 || now < 5){
    message = "User tidak sedang dalam rentang waktu pembayaran";
  }
  return message;
}

const findLastRecurringBill = async(billId) => {
  const recurringBills = await Models.recurring_billings.findOne({
    where: {bill_id: billId},
    include: {
      model: Models.bills,
      attributes: [],
      include: {
        model: Models.transactions,
        attributes: [],
        where: {status: "Success"}
      },
    },
  });
    if(recurringBills == null) return null;
    if(recurringBills !== null) return recurringBills; 
  };

const findLastBill = async(phone_number) => {
  let lastBill = await Models.landline_bills.findOne({
    attributes: ["period"],
    where: {phone_number: phone_number},
    order: [["period","DESC"]],
    include: {
      model: Models.bills,
      attributes: [],
      include: {
        model: Models.transactions,
        attributes: [],
        where: { status: "Success"}
      }
    }
  });
  if (lastBill === null) return null;
  return lastBill;
}

const monthDiff = async(d1, d2) => {
  let date1 = moment(d1);
  let date2 = moment(d2);
  let diff = date2.diff(date1, 'months');

  return diff;
}

const isActive = async(diffMonth) => {
  let message = null
  if(diffMonth >= 3) {
    message = "Landline Service Not Active. Please Contact The Office For Further Information";
  } 
  return message;
}

const calcPaymentFee = async(diffMonth, abonemen) => {
  let latePaymentFee = 0;
  if(diffMonth >= 1){
    latePaymentFee = 0.05 * abonemen * diffMonth;
    return latePaymentFee;
  };
  return latePaymentFee;
}

const diffDays = async(lastPeriod) => {
  const now = new Date().getDate();
  const diff = now - lastPeriod;
  return diff 
}

const findPin = async(userId) => {
  const pin = await Models.Users.findOne({
    attributes: ["pin"],
    where: {id: userId}
  })
  if(pin === null) return null;
  return pin;
}

const getRecurringDate = async(period, day, recurringDate) => {
  let date_billed = null;
  if(period === "Year") date_billed = recurringDate;
  if(period === "Month") date_billed = recurringDate;
  if(period === "Week") {
    let dayNow = new Date().getDay();
    let diff = 0;
    let calcDate;
    if(dayNow > day) {
      diff = dayNow - day;
      calcDate = 7 - diff;
    } 
    if(dayNow < day) { 
      diff = day - dayNow;
      calcDate = 7 + diff;
    }
    if(dayNow == day) calcDate = 7;
  date_billed = moment(new Date()).add(calcDate, "d").format("YYYY/MM/DD") 
  };
  return date_billed;
}

const findPaidBill = async (customer_number) => {
  const lastBill = await Models.landline_bills.findOne({
    where: {phone_number: customer_number},
    order: [["period", "DESC"]]
  });
  if(!lastBill) return null
  const paidBill = await Models.transactions.findOne({
    attributes: ["bill_id", "status"],
    where: {
      [Op.and]: [
        { bill_id: lastBill.id },
        { status: "Success" }
      ]
    },
    order: [["transaction_date", "DESC"]],
  }) 
  return paidBill;
}
