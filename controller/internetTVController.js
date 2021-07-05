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
      const lastPaymentDeadline = new Date(
        account.payment_due.getFullYear(),
        account.payment_due.getMonth() - 1,
        account.payment_due.getDate()
      );

      if (account.period - lastPaymentDeadline < 0) {
        return res.status(200).send({
          statusCode: 200,
          statusText: "Succes",
          message: "Success to Get Account Info",
          data: {
            name: account.name,
            customer_number: account.customer_number,
            provider: account.provider,
            bill: `Rp ${new Intl.NumberFormat("id").format(
              parseInt(account.abonemen)
            )},00`,
            address: account.address,
            bill: `Rp ${new Intl.NumberFormat("id").format(
              parseInt(account.bill_fee)
            )},00`,
            admin_fee: "Rp 2.500,00",
            total: `Rp ${new Intl.NumberFormat("id").format(
              parseInt(account.bill_fee) + 2500
            )},00`,
          },
        });
      } else {
        return res.send("Already paid for this month fee");
      }
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
      req.body.customer_number
    );

    const lastPaymentDeadline = new Date(
      account.payment_due.getFullYear(),
      account.payment_due.getMonth() - 1,
      account.payment_due.getDate()
    );

    if (account.period - account.payment_due < 0) {
      const checklatePayment = await internetTVService.latePaymentcheck(
        account.period
      );

      if (checklatePayment >= 3) {
        return res.send(
          "Your service is inactive. Please contact your provider for further information"
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

        const { type, account_name, account_number, account_bank } =
          req.body.payment;

        const transactionPayment =
          await internetTVService.createTransactionPayment(
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

        // const updatePeriodAndPaymentDue = await internetTVService.updatePeriod(
        //   bill.id,
        //   account.provider,
        //   account.payment_due
        // );

        // const updatedAccount = await internetTVService.getAccountInfo(
        //   req.body.customer_number
        // );

        let recurringBilling;

        if (req.body.recurring_billing.status === true) {
          recurringBilling = await internetTVService.findRecurringBilling(
            bill.id
          );

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
            bill: `Rp ${new Intl.NumberFormat("id").format(
              parseInt(internetTVBill.bill_fee)
            )},00`,
            no_customer: account.customer_number,
            name: account.name,
            period: `${moment(recurringBilling.due_date).format("M")}/${moment(
              recurringBilling.due_date
            ).format("YYYY")}`,
            provider: internetTVBill.provider,
            bill: `Rp ${new Intl.NumberFormat("id").format(
              parseInt(internetTVBill.bill_fee)
            )},00`,
            admin: `Rp ${new Intl.NumberFormat("id").format(
              parseInt(internetTVBill.admin_fee)
            )},00`,
            late_payment: `Rp ${new Intl.NumberFormat("id").format(
              parseInt(internetTVBill.late_payment_fee) * (checklatePayment + 1)
            )},00`,
            total: `Rp ${new Intl.NumberFormat("id").format(
              parseInt(internetTVBill.bill_fee) * (checklatePayment + 1) +
                parseInt(internetTVBill.late_payment_fee) *
                  (checklatePayment + 1) +
                parseInt(internetTVBill.admin_fee)
            )},00`,
          },
        });
      }
    } else {
      return res.send("Already paid for this month fee");
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
