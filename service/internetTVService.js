const { Internet_tvs, Options } = require("../database/models");
const {
  bills,
  internet_tv_bills,
  recurring_billings,
  transactions,
  transaction_payments,
  biller_bank_accounts,
  bank_transfers,
} = require("../database/models");

exports.getOptions = async (service_id) => {
  let findOptions = await Options.findAll({ where: { service_id } });

  for (let i = 0; i < findOptions.length; i++) {
    findOptions[i] = {
      id: findOptions[i].id,
      option: findOptions[i].name,
      image: findOptions[i].image_url,
    };
  }

  return findOptions;
};

exports.getAccountInfo = async (customer_number) => {
  const accountInfo = await Internet_tvs.findOne({
    where: { customer_number },
  });

  return accountInfo;
};

exports.createBill = async (user_id) => {
  const bill = await bills.create({ user_id });
  return bill;
};

exports.createInternetTVBill = async (
  bill_id,
  customer_number,
  provider,
  bill_fee,
  latePaymentcheck
) => {
  bill_fee = bill_fee * (latePaymentcheck + 1);

  let late_payment;
  if (latePaymentcheck < 1) {
    late_payment = 0;
  } else if (latePaymentcheck == 1) {
    late_payment = parseInt(bill_fee) * 0.05;
  } else if (latePaymentcheck == 2) {
    late_payment = parseInt(bill_fee) * 0.1;
  }

  const internetTVBill = await internet_tv_bills.create({
    bill_id,
    customer_number,
    provider,
    bill_fee,
    late_payment_fee: late_payment,
    total: parseInt(bill_fee) + 2500 + late_payment,
  });

  return internetTVBill;
};

exports.createTransaction = async (bill_id) => {
  const transaction = await transactions.create({
    bill_id,
    transaction_date: new Date(),
    status: "Process",
  });
  return transaction;
};

exports.createTransactionPayment = async (transaction_id, type) => {
  const transactionPayment = await transaction_payments.create({
    transaction_id,
    type,
  });
  return transactionPayment;
};

exports.findBankAccountInfo = async (account_bank) => {
  const bankAccountInfo = await biller_bank_accounts.findOne({
    where: { account_bank },
  });

  return bankAccountInfo;
};

exports.createBankAccountInfo = async (
  account_name,
  account_number,
  account_bank
) => {
  const newBankAccountInfo = await biller_bank_accounts.create({
    account_name,
    account_number,
    account_bank,
  });

  return newBankAccountInfo;
};

exports.createBankTransfer = async (
  transaction_payment_id,
  bank_destination_id,
  account_name,
  account_number,
  account_bank
) => {
  const bankTransfer = await bank_transfers.create({
    transaction_payment_id,
    bank_destination_id,
    account_name,
    account_number,
    account_bank,
  });

  return bankTransfer;
};

exports.findRecurringBilling = async (bill_id) => {
  const recurringBilling = await recurring_billings.findOne({
    where: { bill_id },
  });

  return recurringBilling;
};

const moment = require("moment");

exports.createRecurringBilling = async (bill_id, period, date_billed) => {
  const newRecurringBilling = await recurring_billings.create({
    bill_id,
    period,
    date_billed,
    is_delete: false,
  });
  let due_date;
  if (period === "Week") {
    due_date = moment(date_billed).add(7, "days");
  } else if (period === "Month") {
    due_date = moment(date_billed).add(30, "days");
  } else if (period === "Year") {
    due_date = moment(date_billed).add(365, "days");
  }
  const recurringBilling = await recurring_billings.update(
    { due_date },
    { where: { bill_id }, returning: true, plain: true }
  );

  return recurringBilling[1];
};

exports.updateRecurringBilling = async (bill_id, period, date_billed) => {
  let due_date;
  if (period === "Week") {
    due_date = moment(date_billed).add(7, "days");
  } else if (period === "Month") {
    due_date = moment(date_billed).add(30, "days");
  } else if (period === "Year") {
    due_date = moment(date_billed).add(365, "days");
  }
  const recurringBilling = await recurring_billings.update(
    { period, due_date, date_billed },
    { where: { bill_id }, returning: true, plain: true }
  );

  return recurringBilling[1];
};

exports.latePaymentcheck = async (lastPayment) => {
  function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    // edit: increment months if d2 comes later in its month than d1 in its month
    if (d2.getDate() >= d1.getDate()) months++;
    // end edit
    return months <= 0 ? 0 : months;
  }
  const gap = await monthDiff(lastPayment, new Date());

  return gap;
};

exports.updatePeriod = async (provider, payment_due) => {
  if (provider === "Indihome") {
    const now = new Date();
    const updateInternetTV = await Internet_tvs.update({
      period: now,
      payment_due: new Date(now.getFullYear(), now.getMonth() + 1, 20),
    });
  } else {
    const now = new Date();
    const updateInternetTV = await Internet_tvs.update({
      period: now,
      payment_due: moment(payment_due).add(30, "days"),
    });
  }
};
