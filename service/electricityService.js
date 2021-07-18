const faker = require('faker');
const moment = require('moment');
const { Op } = require('sequelize');
const Models = require('../database/models');

exports.getTagihanAccInfo = async(idPel, userId) => {
  let accInfo = await Models.Electricities.findOne({
  where: {customer_number: idPel}
  });
  accInfo = accInfo.dataValues;
  let error = null;

  const canPay = await checkRangePaymentDate();
  if(canPay !== null) error = canPay;

  const paidBill = await findPaidBill(idPel);
  if (paidBill !== null) error = "Electricity Service Already Paid";

  let period = [];
  let countMonth = await monthDiff(accInfo.period, new Date());
    if (countMonth !== 0) {
      for (let i = 0; i < (countMonth + 1); i++) {
        period.push(
          `${new Date().getFullYear()}-${new Date().getMonth() -i}-20`
        );
      }
    } if (countMonth === 0) period = moment(accInfo.period).format("YYYY-MM-DD");
    
  const activeStatus = await isActive(countMonth);
  if(activeStatus !== null) error = activeStatus;

  const late_payment_fee = await calcPaymentFee(countMonth, accInfo.power);

  const kwH = accInfo.this_month_stand_meter - accInfo.last_month_stand_meter;
  const bill = kwH * accInfo.cost_per_kwh;

  let fixBill = 0;
  (countMonth !== 0) ? fixBill = countMonth * bill : fixBill =  bill ;
  
  const admin_fee = 3000;
  const total = fixBill + admin_fee + late_payment_fee

  const pin = await findPin(userId);

  accInfo = {
    IDPEL: accInfo.customer_number,
    Name: accInfo.name,
    Tarif_Daya: `${accInfo.rates}/${accInfo.power}`,
    Bulan_Tahun: `${(period)}`,  
    Stand_Meter: `${accInfo.this_month_stand_meter}-${accInfo.last_month_stand_meter}`,
    Bill: fixBill,
    Admin: admin_fee,
    Late_Payment_Fee: late_payment_fee,
    Total: total,
    PIN: `${pin.dataValues.pin}`
  };

  return {data: accInfo, error};
};

exports.getElectricityOptions = async(serviceId) => {
  const electricityOptions = await Models.Options.findAll({
    where: {service_id: serviceId},
    attributes: ['id', 'name', 'image_url']
  });
  return electricityOptions;
};

exports.getTokenPricelist = async(option_id) => {
  const tokenPricelist = await Models.Option_prices.findAll({
    // attributes: [],
    include: { model: Models.Prices, attributes: ["id", "price"] },
    where: {option_id: option_id},
  });
  const prices = tokenPricelist.map((x) => x.dataValues.Price);

  return prices;
};

exports.getTokenAccInfo = async(nomorMeter, price, userId) => {
  let accInfo = await Models.Electricities.findOne({
    where: {meter_number: nomorMeter}
  });
  accInfo = accInfo.dataValues;
  const PPJ = 0.074 * price;
  const token = price - PPJ;
  const Admin = 1500;
  const Total = token + parseInt(Admin) + PPJ;

  // find pin user
  const pin = await findPin(userId);

  accInfo = {
    No_Meter: accInfo.meter_number,
    IDPEL: accInfo.customer_number,
    Name: accInfo.name,
    Tarif_Daya: `${accInfo.rates}/${accInfo.power}`,
    Token: token,
    PPJ,
    Admin,
    Total: Total,
    PIN: `${pin.dataValues.pin}`
  };
  return accInfo;
}

exports.createTagihanBill = async(obj, userId) => {
    let error = null;
    const user = await Models.Electricities.findOne({where: {id: userId}});
    if(!user) error = "User not found";

    const bill = await Models.bills.create({
      user_id: userId,
      bill_type: "Listrik-Tagihan"
    });
    
    let tagihan_bill_details = {};
    for (let i = 0; i < obj.data.Bulan_Tahun.length; i++) {
        tagihan_bill_details = await Models.pln_tagihan_bills.create({
        bill_id: bill.id,
        customer_number: obj.data.IDPEL,
        name: obj.data.Name,
        rates: obj.data.Tarif_Daya.slice(0,2),
        power: obj.data.Tarif_Daya.slice(-4),
        tagihan_date: new Date(obj.data.Bulan_Tahun[i]),
        last_month_stand_meter: obj.data.Stand_Meter.slice(0,4),
        this_month_stand_meter: obj.data.Stand_Meter.slice(-4),
        bill_fee: obj.data.Bill,
        admin_fee: obj.data.Admin,
        late_payment_fee: obj.data.Late_Payment_Fee,
        total: obj.data.Total,
      });
    }

  tagihan_bill_details = {
    IDPEL: obj.data.IDPEL,
    Name: obj.data.Name,
    Tarif_Daya: obj.data.Tarif_Daya,
    Bulan_Tahun: obj.data.Bulan_Tahun,  
    Stand_Meter: obj.data.Stand_Meter,
    Bill: obj.data.Bill,
    Admin: obj.data.Admin,
    Late_Payment_Fee: obj.data.Late_Payment_Fee,
    Total: obj.data.Total,
    PIN: obj.data.PIN,
    // notificationMessage: "Payment Created",
  };

  const transaction = await Models.transactions.create({
    bill_id: bill.id,
    transaction_date: new Date(),
    status: "Process",
  });

  if (obj.recurringBilling.status === true) {
    let date_billed = await getRecurringDate (obj.recurringBilling.period, obj.recurringBilling.dayOfWeek, obj.recurringBilling.recurringDate)
    const due_date = new Date(date_billed).setDate(20);

    const checkLastRecurring = await findLastRecurringBill(bill.id);
    if(!checkLastRecurring) {
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
        {where: {id: checkLastRecurring.id}}
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

  const data = {
    bill_id: bill.id,
    transaction_id: transaction.id,
    tagihan_bill_details,
    bankTransferDetails,
    notificationMessage: "Payment Created"
  }

  return data;
};

exports.createTokenBill = async (obj, userId) => {
  let error = null;
  const user = await Models.Electricities.findOne({where: {id: userId}});
  if(!user) error = "User not found";

  const bill = await Models.bills.create({
    user_id: userId,
    bill_type: "Listrik-Token"
  });

  // kalkulasi kwh
  const splitArr = obj.data.Tarif_Daya.split('/');
  const power = splitArr[1].replace("V", "");
  let tarif_per_kwh = 0;
  if(power >= "200" && power <= "450") {
    tarif_per_kwh = 1114.74;
  } else if(power >= "451" && power <= "900"){
    tarif_per_kwh = 1352;
  } else if(power >= "901" && power <= "30000"){
    tarif_per_kwh = 1444.7;
  } else {
    tarif_per_kwh = 996.74;
  }
  
  const stroomToken = obj.data.Token - obj.data.PPJ;
  const kwH = stroomToken/tarif_per_kwh;
  
  let token_bill_details = await Models.pln_token_bills.create({
    bill_id: bill.id,
    meter_number: obj.data.No_Meter,
    customer_number: obj.data.IDPEL,
    name: obj.data.Name,
    rates: obj.data.Tarif_Daya.slice(0,2),
    power: obj.data.Tarif_Daya.slice(-4),
    ref: faker.datatype.uuid(),
    kwh: kwH,
    stroom_per_token: stroomToken,
    token: obj.data.Token,
    ppj: obj.data.PPJ,
    admin_fee: obj.data.Admin,
    total: obj.data.Total,
    stroom_code: Math.floor(100000 + Math.random() * 90000000000000000000),
  });
  
  if (obj.recurringBilling.status === true) {
    let date_billed = await getRecurringDate(obj.recurringBilling.period, obj.recurringBilling.dayOfWeek, obj.recurringBilling.recurringDate)

    const checkLastRecurring = await findLastRecurringBill(bill.id);
    if(!checkLastRecurring) {
      const createRecurring = await Models.recurring_billings.create({
        bill_id: bill.id,
        period: obj.recurringBilling.period,
        date_billed
      });
    } else {
      const updateRecurring = await Models.recurring_billings.update(
        {
          bill_id: bill.id,
          period: obj.recurringBilling.period,
          date_billed
        },
        { 
          where: {id: checkLastRecurring.id} 
        }
      );
    }
  }
  const transaction = await Models.transactions.create({
    bill_id: bill.id,
    transaction_date: new Date(),
    status: "Process",
  });

  const transactionPayment = await Models.transaction_payments.create({
    transaction_id: transaction.id,
    type: obj.payment.type,
  });

  let bankTransferDetails = await Models.bank_transfers.create({
      transaction_payment_id: transactionPayment.id,
      bank_destination_id: obj.payment.bank_destination_id
    });
  
  const bankAccountDetails = await Models.biller_bank_accounts.findOne({
    where: {id: obj.payment.bank_destination_id}
  })

  bankTransferDetails = bankTransferDetails.dataValues;
  bankTransferDetails = {
    Total: 0,
    account_bank: bankAccountDetails.account_bank,
    account_name: bankAccountDetails.account_name,
    account_number: bankAccountDetails.account_number,
  };

  token_bill_details = {
    No_Meter: obj.data.No_Meter,
    IDPEL: obj.data.IDPEL,
    Name: obj.data.Name,
    Tarif_Daya: obj.data.Tarif_Daya,
    Token: obj.data.Token,
    PPJ: obj.data.PPJ,
    Admin: obj.data.Admin,
    Total: obj.data.Total,
    PIN: obj.data.PIN,
  };

  const data = {
    bill_id: bill.id,
    transaction_id: transaction.id,
    token_bill_details,
    bankTransferDetails,
    notificationMessage: "Payment Created"
  }
  return data;
}

const checkRangePaymentDate = async() => {
  let message = null;
  const now = new Date().getDate();
  if(now > 20){
    message = "User tidak sedang dalam rentang waktu pembayaran";
  }
  return message;
}

const diffDays = async(lastPeriod) => {
  let message =  null;
  const now = new Date().getDate();
  const diff = now - lastPeriod;
  return diff 
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
  })
    if(recurringBills !== null) return recurringBills; 
  };

const findLastPeriod = async(customer_number) => {
  let tagihanBills = await Models.pln_tagihan_bills.findOne({
    attributes: ["tagihan_date"],
    where: {customer_number: customer_number},
    order: [["tagihan_date","DESC"]]
  });
  if (tagihanBills === null) return null;
  return tagihanBills;
}

const monthDiff = async(d1, d2) => {
  let date1 = moment(d1);
  let date2 = moment(d2);
  let diff = date2.diff(date1, 'months');

  return diff;
}

const isActive = async(diffMonth) => {
  let message = null
  if(diffMonth > 2) {
    message = "Your Electricity Service Not Active. Please Contact The Office For Further Information";
  } 
  return message;
}

const calcPaymentFee = async(diffMonth, power) => {
  let latePaymentFee = 0;
  if(diffMonth >= 1){
    if(power == "450V" || power == "900V") return latePaymentFee = 3000 * diffMonth;
    if(power == "1300V") return latePaymentFee = 5000 * diffMonth;
    if(power == "2200V") return latePaymentFee = 10000 * diffMonth;
    if(power == "3500V" || power == "5500V") return latePaymentFee = 50000 * diffMonth;
    if(power == "6600V" || power == "14000V") return latePaymentFee = 75000 * diffMonth;
    return latePaymentFee = 100000 * diffMonth;
  };
  return latePaymentFee;
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
  const lastBill = await Models.pln_tagihan_bills.findOne({
    where: {customer_number},
    order: [["tagihan_date", "DESC"]]
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

