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

      if (account.period - lastPaymentDeadline > 0) {
        return res.send("Already paid for this month fee");
      }

      const checklatePayment = await internetTVService.latePaymentcheck(
        account.period
      );

      if (checklatePayment >= 3) {
        return res.send({
          name: account.name,
          customer_number: account.customer_number,
          provider: account.provider,
          address: account.address,
          message:
            "Your service is inactive. Please contact your provider for further information.",
        });
      }

      let late_payment = 0;
      if (checklatePayment == 1) {
        late_payment = parseInt(account.abonemen) * 0.05;
      }
      if (checklatePayment == 2) {
        late_payment = parseInt(account.abonemen) * 0.1;
      }

      let result = [];
      for (let i = 0; i <= checklatePayment; i++) {
        if (i == checklatePayment) {
          result.push({
            month: account.payment_due.getMonth() + i + 1,
            amount: parseInt(account.abonemen),
            late_payment: 0,
          });
        } else {
          result.push({
            month: account.payment_due.getMonth() + i + 1,
            amount: parseInt(account.abonemen),
            late_payment: parseInt(late_payment),
          });
        }
      }

      const late_payment_arr = result.map((x) => x.late_payment);
      const total_arr = result.map((x) => x.amount);

      for (let i = 0; i < result.length; i++) {
        result[i] = {
          month: result[i].month,
          amount: result[i].amount,
          late_payment: result[i].late_payment,
        };
      }
      res.status(200).send({
        statusCode: 200,
        statusText: "Succes",
        message: "Success to Get Account Info",
        data: {
          name: account.name,
          customer_number: account.customer_number,
          provider: account.provider,
          address: account.address,
          last_payment: account.period,
          payment_due: account.payment_due,
          bill: [...result],
          total_late_payment: `Rp ${new Intl.NumberFormat("id").format(
            late_payment_arr.reduce(function (a, b) {
              return a + b;
            }, 0)
          )},00`,
          admin_fee: "Rp 2.500,00",
          total: `Rp ${new Intl.NumberFormat("id").format(
            total_arr.reduce(function (a, b) {
              return a + b;
            }, 0) +
              2500 +
              late_payment_arr.reduce(function (a, b) {
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
      const lastPaymentDeadline = new Date(
        account.payment_due.getFullYear(),
        account.payment_due.getMonth() - 1,
        account.payment_due.getDate()
      );

      if (account.period - lastPaymentDeadline > 0) {
        return res.send("Already paid for this month fee");
      }

      const checklatePayment = await internetTVService.latePaymentcheck(
        account.period
      );

      if (checklatePayment >= 3) {
        return res.send({
          name: account.name,
          customer_number: account.customer_number,
          provider: account.provider,
          address: account.address,
          message:
            "Your service is inactive. Please contact your provider for further information.",
        });
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
            return res.send({
              message:
                "Wrong input for period recurring billing. This service can only be paid once a month",
            });
          recurring_billing = await internetTVService.findRecurringBilling(
            bill.id
          );
          // console.log(req.body.recurringBilling.date.getDate());

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
              parseInt(internetTVBill.late_payment_fee) * checklatePayment
            )},00`,
            total: `Rp ${new Intl.NumberFormat("id").format(
              parseInt(internetTVBill.bill_fee) +
                parseInt(internetTVBill.bill_fee) * checklatePayment +
                parseInt(internetTVBill.late_payment_fee) * checklatePayment +
                parseInt(internetTVBill.admin_fee)
            )},00`,
          },
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
