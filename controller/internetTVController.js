const internetTVService = require("../service/internetTVService");

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

    if (transactionPayment.type === "Bank Transfer") {
      let bankAccountInfo = await internetTVService.findBankAccountInfo(
        account_number
      );

      if (!bankAccountInfo) {
        bankAccountInfo = await internetTVService.createBankAccountInfo(
          account_name,
          account_number,
          account_bank
        );
      }

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

    res.send({ account, internetTVBill, recurringBilling });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      statusCode: 500,
      statusText: "Internal Server Error",
      message: "Failed tp Create Bill",
    });
  }
};
