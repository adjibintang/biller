const {Electricities,Pln_tagihan_bills, Bills, Recurring_billings, Transactions, Transaction_payments, Biller_bank_accounts, Bank_transfers } = require('../database/models');

exports.getTagihanAccInfo = async(idPel) => {
  const accInfo = await Electricities.findOne({
  where: {customer_number: idPel}
  });
  accInfo = accInfo.dataValues;
  accInfo = {
    IDPEL: accInfo.customer_number,
    Name: accInfo.name,
    Tarif_Daya: `${accInfo.rates}/${accInfo.power}`,
    Bulan_Tahun: accInfo.tagihan_date.toLocaleString('default',{month: 'long'}) + " " + accInfo.tagihan_date.getFullYear(), 
    Stand_Meter: accInfo.this_month_stand_meter,
    Bill: `Rp. ${accInfo.bill}`,
    Admin: `Rp. ${accInfo.admin_fee}`,
    Total: `Rp. ${accInfo.total}`
  };
  return accInfo;
};

exports.getElectricityOptions = async(serviceId, price) => {
  const electricityOptions = await Options.findAll({
    where: {service_id: serviceId},
    attributes: ['id', 'name']
  });
  return electricityOptions;
};

exports.getTokenPricelist = async(option_id) => {
  const tokenPricelist = await Option_prices.findAll({
    include: Prices,
    where: {option_id: option_id}
  });
  const prices = tokenPricelist.map((x) => x.dataValues.Price);
  for (let i= 0; i < prices.length; i++) {
    prices[i] = { id: prices[i].id, price: prices[i].price};
    };

  return prices;
};

exports.getTokenAccInfo = async(nomorMeter, price) => {
  let accInfo = await Electricities.findOne({
    where: {meter_number: nomorMeter}
  });
  accInfo = accInfo.dataValues;
  accInfo.PPJ = 0.074 * price;
  accInfo.Admin = 1500;
  accInfo.Total = parseInt(price) + parseInt(accInfo.Admin);

  accInfo = {
    No_Meter: accInfo.meter_number,
    IDPEL: accInfo.customer_number,
    Name: accInfo.name,
    Tarif_Daya: `${accInfo.rates}/${accInfo.power}`,
    Token: `Rp. ${price}`,
    PPJ: `Rp. ${accInfo.PPJ}`,
    Admin: `Rp. ${accInfo.Admin}`,
    Total: `Rp. ${accInfo.Total}`
  };
  return accInfo;
}

exports.findTagihanBill = async (idPel) => {
  let accInfo = await Pln_tagihan_bills.findOne({
    where: { customer_number: idPel }
  });
  accInfo = accInfo.dataValues;
  accInfo = {
    IDPEL: accInfo.customer_number,
    Name: accInfo.name,
    Tarif_Daya: `${accInfo.rates}/${accInfo.power}`,
    Bulan_Tahun: accInfo.tagihan_date.toLocaleString('default',{month: 'long'}) + " " + accInfo.tagihan_date.getFullYear(), 
    Stand_Meter: accInfo.this_month_stand_meter,
    Bill: `Rp. ${accInfo.bill}`,
    Admin: `Rp. ${accInfo.admin_fee}`,
    Total: `Rp. ${accInfo.total}`
  };

  return accInfo;
}

exports.createTagihanBill = async (userId, payment_type, period, dateBilled, bankAccName, bankAccNumber, bankName, url) => {
  const billId = await Bills.findOne({
    where: {user_id: userId}
  });

  const recurringBilling = await Recurring_billings.create({
    bill_id: billId.id,
    period: period,
    date_billed: dateBilled,
    is_delete: false
  });

  const transaction = await Transactions.create({
    bill_id: billId.id,
    transaction_date: new Date(),
    status: "Process",
  });

  const transactionPayment = await Transaction_payments.create({
    transaction_id: transaction.id,
    type: payment_type,
  });

  const bankAccountInfo = await Biller_bank_accounts.create({
    account_name: bankAccName,
    account_number: bankAccNumber,
    account_bank: bankName,
  })

  let bankTransfer = await Bank_transfers.create({
    transaction_payment_id: transactionPayment.id,
    bank_destination_id: bankAccountInfo.id,
    account_name: bankAccountInfo.account_name,
    account_number: bankAccountInfo.account_number,
    account_bank: bankAccountInfo.account_bank,
    receipt_url: url
  });

  bankTransfer = bankTransfer.dataValues;
  bankTransfer = {
    Total: 0,
    account_bank: bankTransfer.account_bank,
    account_name: bankTransfer.account_name,
    account_number: bankTransfer.account_number,
    receipt_url: url
  };

  return bankTransfer;
};


