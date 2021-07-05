const faker = require('faker');
const moment = require('moment');
const {Electricities,pln_tagihan_bills, pln_token_bills, bills, recurring_billings, transactions, transaction_payments, biller_bank_accounts, bank_transfers, Options, Option_prices, Prices } = require('../database/models');

exports.getTagihanAccInfo = async(idPel, userId) => {
  let accInfo = await Electricities.findOne({
  where: {customer_number: idPel}
  });
  accInfo = accInfo.dataValues;

  // cek ada tunggakan atau ga
  const diffMonth = new Date().getMonth() - accInfo.period.getMonth();
  if(diffMonth >= 3) {
    error = "Aliran listrik diputus";
  } 

  // kalkulasi late payment fee (denda)
  let latePaymentFee = 0;
  if(diffMonth > 1){
    if(accInfo.power == "450V" || accInfo.power == "900V"){
      latePaymentFee = 3000;
    } else if(accInfo.power == "1300V"){
      latePaymentFee = 5000;
    } else if(accInfo.power == "2200V"){
      latePaymentFee = 10000;
    } 
  };

  const kwH = accInfo.this_month_stand_meter - accInfo.last_month_stand_meter;
  const bill = kwH * accInfo.cost_per_kwh;
  const fixBill = diffMonth * bill;
  const admin_fee = 3000;
  const denda = diffMonth * latePaymentFee; 
  const total = fixBill + admin_fee + denda; 

  accInfo = {
    IDPEL: accInfo.customer_number,
    Name: accInfo.name,
    Tarif_Daya: `${accInfo.rates}/${accInfo.power}`,
    // Bulan_Tahun: `${accInfo.period.toLocaleString('default',{month: 'long'})} ${accInfo.period.getFullYear()} - `,
    Bulan_Tahun: `${accInfo.period.toLocaleDateString()}`,  
    Stand_Meter: `${accInfo.this_month_stand_meter}-${accInfo.last_month_stand_meter}`,
    Bill: `Rp. ${new Intl.NumberFormat("id").format(fixBill)},00`,
    Admin: `Rp. ${new Intl.NumberFormat("id").format(admin_fee)},00`,
    Late_Payment_Fee: `Rp. ${new Intl.NumberFormat("id").format(denda)},00`,
    Total: `Rp. ${new Intl.NumberFormat("id").format(total)},00`
  };

  return accInfo;
};

exports.getElectricityOptions = async(serviceId) => {
  const electricityOptions = await Options.findAll({
    where: {service_id: serviceId},
    attributes: ['id', 'name', 'image_url']
  });
  return electricityOptions;
};

exports.getTokenPricelist = async(option_id) => {
  const tokenPricelist = await Option_prices.findAll({
    include: { model: Prices, attributes: ["id", "price"] },
    where: {option_id: option_id},
  });
  const prices = tokenPricelist.map((x) => x.dataValues.Price);

  return prices;
};

exports.getTokenAccInfo = async(nomorMeter, price) => {
  let accInfo = await Electricities.findOne({
    where: {meter_number: nomorMeter}
  });
  accInfo = accInfo.dataValues;
  accInfo.PPJ = 0.074 * price;
  const token = price - accInfo.PPJ;
  accInfo.Admin = 1500;
  accInfo.Total = token + parseInt(accInfo.Admin) + accInfo.PPJ;

  accInfo = {
    No_Meter: accInfo.meter_number,
    IDPEL: accInfo.customer_number,
    Name: accInfo.name,
    Tarif_Daya: `${accInfo.rates}/${accInfo.power}`,
    Token: `Rp. ${new Intl.NumberFormat("id").format(token)},00`,
    PPJ: `Rp. ${new Intl.NumberFormat("id").format(accInfo.PPJ)},00`,
    Admin: `Rp. ${new Intl.NumberFormat("id").format(accInfo.Admin)},00`,
    Total: `Rp. ${new Intl.NumberFormat("id").format(accInfo.Total)},00`
  };
  return accInfo;
}

exports.checkRangePaymentDate = async() => {
  let error = null;
  const now = new Date().getDate();
  if(now > 20){
    error = "User tidak sedang dalam rentang waktu pembayaran";
  }
  return error;
}

exports.createTagihanBill = async (
  userId,
  payment_type, period, dateBilled, bank_destination_id,
  IDPEL, Name, Tarif_Daya, Bulan_Tahun, Stand_Meter, Bill, Admin, Late_Payment_Fee, Total
  ) => {
  const bill = await bills.create({
    user_id: userId
  });

  let tagihan_bill_details = await pln_tagihan_bills.create({
    bill_id: bill.id,
    customer_number: IDPEL,
    name: Name,
    rates: Tarif_Daya.slice(0,2),
    power: Tarif_Daya.slice(-4),
    tagihan_date: Bulan_Tahun,
    last_month_stand_meter: Stand_Meter.slice(0,4),
    this_month_stand_meter: Stand_Meter.slice(-4),
    bill_fee: Bill,
    admin_fee: Admin,
    late_payment_fee: Late_Payment_Fee,
    total: Total,
  }) 
  tagihan_bill_details = tagihan_bill_details.dataValues;
  tagihan_bill_details = {
    IDPEL,
    Name,
    Tarif_Daya,
    Bulan_Tahun,  
    Stand_Meter,
    Bill: `Rp. ${new Intl.NumberFormat("id").format(Bill)},00`,
    Admin: `Rp. ${new Intl.NumberFormat("id").format(Admin)},00`,
    Late_Payment_Fee: `Rp. ${new Intl.NumberFormat("id").format(Late_Payment_Fee)},00`,
    Total: `Rp. ${new Intl.NumberFormat("id").format(Total)},00`
  };

  // cek apakah sudah ada recurring billing. pasti ga ada sih, kan bill.id nya baru terus.
  const checkRecurring = await recurring_billings.findOne({
    where: {bill_id: bill.id}
  });

  const date_billed = moment(dateBilled).add(1, "M").calendar();
  const due_date = new Date().setDate(20);

  const recurringBilling = await recurring_billings.create({
    bill_id: bill.id,
    period: period,
    date_billed,
    due_date,
    is_delete: false
  });

  const transaction = await transactions.create({
    bill_id: bill.id,
    transaction_date: new Date(),
    status: "Process",
  });

  const transactionPayment = await transaction_payments.create({
    transaction_id: transaction.id,
    type: payment_type,
  });

  let bankTransferDetails = await bank_transfers.create({
      transaction_payment_id: transactionPayment.id,
      bank_destination_id,
    });
  
  const bankAccountDetails = await biller_bank_accounts.findOne({
    where: {id: bank_destination_id}
  })

  bankTransferDetails = bankTransferDetails.dataValues;
  bankTransferDetails = {
    Total: 0,
    account_bank: bankAccountDetails.account_bank,
    account_name: bankAccountDetails.account_name,
    account_number: bankAccountDetails.account_number,
    // receipt_url: ""
  };

  return {data: tagihan_bill_details, bankTransferDetails};
};

exports.createTokenBill = async (
  userId,
  payment_type, period, dateBilled, bank_destination_id,
  No_Meter, IDPEL, Name, Tarif_Daya, Token, PPJ, Admin, Total
) => {
  const bill = await bills.create({
    user_id: userId
  });

  // kalkulasi kwh
  const splitArr = Tarif_Daya.split('/');
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
  
  const stroomToken = Token - PPJ;
  const kwH = stroomToken/tarif_per_kwh;
  
  let token_bill_details = await pln_token_bills.create({
    bill_id: bill.id,
    meter_number: No_Meter,
    customer_number: IDPEL,
    name: Name,
    rates: Tarif_Daya.slice(0,2),
    power: Tarif_Daya.slice(-4),
    ref: faker.datatype.uuid(),
    kwh: kwH,
    stroom_per_token: stroomToken,
    token: Token,
    ppj: PPJ,
    admin_fee: Admin,
    total: Total,
    stroom_code: Math.floor(100000 + Math.random() * 90000000000000000000),
  });
  
  token_bill_details = token_bill_details.dataValues;
  token_bill_details = {
    No_Meter,
    IDPEL,
    Name,
    Tarif_Daya,
    Token:`Rp ${new Intl.NumberFormat("id").format(Token)},00`,
    PPJ: `Rp. ${new Intl.NumberFormat("id").format(PPJ)},00`,
    Admin: `Rp. ${new Intl.NumberFormat("id").format(Admin)},00`,
    Total: `Rp. ${new Intl.NumberFormat("id").format(Total)},00`
  };

  // cek apakah sudah ada recurring billing. pasti ga ada sih, kan bill.id nya baru terus.
  const checkRecurring = await recurring_billings.findOne({
    where: {bill_id: bill.id}
  });

  let date_billed = null;
  if(period === "Month") {
    date_billed = moment(dateBilled).add(1, "M").calendar();
  } else if(period === "Week"){
    date_billed = moment(dateBilled).add(7, "d").calendar();
  }
  
  const recurringBilling = await recurring_billings.create({
    bill_id: bill.id,
    period: period,
    date_billed,
    // due_date: "",
    is_delete: false
  });

  const transaction = await transactions.create({
    bill_id: bill.id,
    transaction_date: new Date(),
    status: "Process",
  });

  const transactionPayment = await transaction_payments.create({
    transaction_id: transaction.id,
    type: payment_type,
  });

  let bankTransferDetails = await bank_transfers.create({
      transaction_payment_id: transactionPayment.id,
      bank_destination_id,
    });
  
  const bankAccountDetails = await biller_bank_accounts.findOne({
    where: {id: bank_destination_id}
  })

  bankTransferDetails = bankTransferDetails.dataValues;
  bankTransferDetails = {
    Total: 0,
    account_bank: bankAccountDetails.account_bank,
    account_name: bankAccountDetails.account_name,
    account_number: bankAccountDetails.account_number,
    // receipt_url: ""
  };

  return {data: token_bill_details, bankTransferDetails};
}

