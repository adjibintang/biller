const internetTVService = require("../service/internetTVService");
const moment = require("moment");

exports.getInternetTVOptions = async (req, res) => {
  try {
    const options = await internetTVService.getOptions(req.params.service_id);

    if (options.length <= 0) {
      return res.status(204).send({
        statusCode: 204,
        statusText: "No Content",
      });
    } else {
      res.status(200).send({
        statusCode: 200,
        statusText: "Succes",
        message: "Success to Get Internet & TV Options",
        data: options,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      statusCode: 500,
      statusText: "Internal Server Error",
      message: "Failed to Get Internet TV Options",
    });
  }
};

exports.getInternetAccountInfo = async (req, res) => {
  try {
    const account = await internetTVService.getAccountInfo(
      req.body.customer_number
    );
    console.log(account);

    if (!account) {
      return res.status(204).send({
        statusCode: 204,
        statusText: "No Content",
      });
    } else {
      res.status(200).send({
        statusCode: 200,
        statusText: "Succes",
        message: "Success to Get Account Info",
        data: {
          name: account.name,
          customer_number: account.customer_number,
          provider: account.provider,
          abonemen: account.abonemen,
          address: account.address,
          admin_fee: 2500,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      statusCode: 500,
      statusText: "Internal Server Error",
      message: "Failed to Get Internet Account Info",
    });
  }
};

exports.createInternetTVBill = async (req, res) => {
  try {
    const bill = await internetTVService.createBill(req.user.dataValues.id);

    const account = await internetTVService.getAccountInfo(
      req.body.customer_number
    );

    const { customer_number, provider, abonemen } = account;

    const internetTVBill = await internetTVService.createInternetTVBill(
      bill.id,
      customer_number,
      provider,
      abonemen
    );

    const transaction = await internetTVService.createTransaction(bill.id);

    const { type, account_name, account_number, account_bank } =
      req.body.payment;

    const transactionPayment = await internetTVService.createTransactionPayment(
      transaction.id,
      type
    );

    let bankAccountInfo;
    if (transactionPayment.type === "Bank Transfer") {
      bankAccountInfo = await internetTVService.findBankAccountInfo(
        account_bank
      );

      const bankTransfer = await internetTVService.createBankTransfer(
        transactionPayment.id,
        bankAccountInfo.id,
        account_name,
        account_number,
        account_bank
      );
    }

    let recurringBilling;

    if (req.body.recurring_billing.status === true) {
      recurringBilling = await internetTVService.findRecurringBilling(bill.id);

      if (!recurringBilling) {
        recurringBilling = await internetTVService.createRecurringBilling(
          bill.id,
          req.body.recurring_billing.period,
          req.body.recurring_billing.date
        );
      } else {
        recurringBilling = await internetTVService.updateRecurringBilling(
          bill.id,
          req.body.recurring_billing.period,
          req.body.recurring_billing.date
        );
      }
    }

    res.send({
      payment_details: {
        total: internetTVBill.total,
        bank: bankAccountInfo.account_bank,
        account_name: bankAccountInfo.account_name,
        account_number: bankAccountInfo.account_number,
      },
      bill_details: {
        no_customer: account.customer_number,
        name: account.name,
        period: `${moment(recurringBilling.due_date).format("M")}/${moment(
          recurringBilling.due_date
        ).format("YYYY")}`,
        provider: internetTVBill.provider,
        bill: internetTVBill.bill_fee,
        admin: internetTVBill.admin_fee,
        total: internetTVBill.total,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      statusCode: 500,
      statusText: "Internal Server Error",
      message: "Failed tp Create Bill",
    });
  }
};
