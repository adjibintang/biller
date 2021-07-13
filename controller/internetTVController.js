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

    if (!account) {
      return res.status(204).send({
        statusCode: 204,
        statusText: "No Content",
      });
    } else {
      const lastPaymentDeadline = await internetTVService.lastPaymentDeadline(
        account.dataValues.payment_due
      );

      if (account.period - lastPaymentDeadline > 0) {
        return res.send("Already paid for this month fee");
      }

      const checklatePayment = await internetTVService.latePaymentcheck(
        account.period
      );

      if (checklatePayment >= 3) {
        return res.send(
          "Your service is inactive. Please contact your provider for further information."
        );
      }

      const periodPayment = await internetTVService.periodPayment(
        account.dataValues,
        checklatePayment
      );

      const pin = await internetTVService.findPin(req.user.dataValues.id);

      res.status(200).send({
        statusCode: 200,
        statusText: "Succes",
        message: "Success to Get Account Info",
        data: {
          pin,
          name: account.name,
          customer_number: account.customer_number,
          provider: account.provider,
          address: account.address,
          payment_period: periodPayment.period_arr,
          bill: `Rp ${new Intl.NumberFormat("id").format(account.abonemen)},00`,
          late_payment: `Rp ${new Intl.NumberFormat("id").format(
            periodPayment.late_payment_arr.reduce(function (a, b) {
              return a + b;
            }, 0)
          )},00`,
          admin_fee: "Rp 2.500,00",
          total: `Rp ${new Intl.NumberFormat("id").format(
            periodPayment.total_arr.reduce(function (a, b) {
              return a + b;
            }, 0) +
              2500 +
              periodPayment.late_payment_arr.reduce(function (a, b) {
                return a + b;
              }, 0)
          )},00`,
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
    const account = await internetTVService.getAccountInfo(
      req.body.data.customer_number
    );

    if (!account) {
      return res.status(204).send({
        statusCode: 204,
        statusText: "No Content",
      });
    } else {
      const lastPaymentDeadline = await internetTVService.lastPaymentDeadline(
        account.dataValues.payment_due
      );

      if (account.period - lastPaymentDeadline > 0) {
        return res.send("Already paid for this month fee");
      }

      const checklatePayment = await internetTVService.latePaymentcheck(
        account.period
      );

      if (checklatePayment >= 3) {
        return res.send(
          "Your service is inactive. Please contact your provider for further information."
        );
      } else {
        const bill = await internetTVService.createBill(req.user.dataValues.id);

        const { customer_number, provider, abonemen } = account;

        const internetTVBill = await internetTVService.createInternetTVBill(
          bill.id,
          customer_number,
          provider,
          abonemen,
          checklatePayment
        );

        const transaction = await internetTVService.createTransaction(bill.id);

        const { type, bank_destination } = req.body.payment;

        const transactionPayment =
          await internetTVService.createTransactionPayment(
            transaction.id,
            type
          );

        let bankAccountInfo;
        if (transactionPayment.type === "Bank Transfer") {
          bankAccountInfo = await internetTVService.findBankAccountInfo(
            bank_destination
          );

          const bankTransfer = await internetTVService.createBankTransfer(
            transactionPayment.id,
            bankAccountInfo.id,
            bank_destination
          );
        }

        let recurring_billing;
        if (req.body.recurringBilling.status === true) {
          if (req.body.recurringBilling.period != "Month")
            return res.send(
              "Wrong input for period recurring billing. This service can only be paid once a month"
            );
          recurring_billing = await internetTVService.findRecurringBilling(
            bill.id
          );

          if (!recurring_billing) {
            recurringBilling = await internetTVService.createRecurringBilling(
              bill.id,
              req.body.recurringBilling.period,
              req.body.recurringBilling.date,
              account.payment_due.getDate()
            );
          } else {
            recurring_billing = await internetTVService.updateRecurringBilling(
              bill.id,
              req.body.recurringBilling.period,
              req.body.recurringBilling.date,
              account.payment_due.getDate()
            );
          }
        }

        res.send({
          payment_details: {
            total: `Rp ${new Intl.NumberFormat("id").format(
              parseInt(internetTVBill.bill_fee) +
                parseInt(internetTVBill.bill_fee) * checklatePayment +
                parseInt(internetTVBill.late_payment_fee) * checklatePayment +
                parseInt(internetTVBill.admin_fee)
            )},00`,
            bank: bankAccountInfo.account_bank,
            account_name: bankAccountInfo.account_name,
            account_number: bankAccountInfo.account_number,
          },
          bill_details: {
            bill: `Rp ${new Intl.NumberFormat("id").format(
              parseInt(internetTVBill.bill_fee)
            )},00`,
            no_customer: account.customer_number,
            name: account.name,
            address: account.address,
            provider: internetTVBill.provider,
            period: req.body.data.payment_period,
            bill: `Rp ${new Intl.NumberFormat("id").format(
              parseInt(internetTVBill.bill_fee)
            )},00`,
            admin: `Rp ${new Intl.NumberFormat("id").format(
              parseInt(internetTVBill.admin_fee)
            )},00`,
            late_payment: `Rp ${new Intl.NumberFormat("id").format(
              parseInt(internetTVBill.late_payment_fee) * checklatePayment
            )},00`,
            total: `Rp ${new Intl.NumberFormat("id").format(
              parseInt(internetTVBill.bill_fee) +
                parseInt(internetTVBill.bill_fee) * checklatePayment +
                parseInt(internetTVBill.late_payment_fee) * checklatePayment +
                parseInt(internetTVBill.admin_fee)
            )},00`,
          },
          pin: req.body.data.pin,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      statusCode: 500,
      statusText: "Internal Server Error",
      message: "Failed tp Create Bill",
    });
  }
};
