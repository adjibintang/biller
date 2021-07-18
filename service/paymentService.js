const Models = require("../database/models");
const storageService = require("../service/storageService");
const receiptService = require("../service/receiptService");

exports.payNewBill = async (transactionId, type, bankDestinationId) => {
  try {
    const createTransactionPayment = await Models.transaction_payments.create({
      transaction_id: transactionId,
      type: type,
    });

    if (type === "Bank Transfer") {
      const payByBankTransfer = await Models.bank_transfers.create({
        transaction_payment_id: createTransactionPayment.dataValues.id,
        bank_destination_id: bankDestinationId,
      });

      const bankDestination = await Models.biller_bank_accounts.findByPk(
        bankDestinationId
      );

      return {
        bankTransferId: payByBankTransfer.id,
        bank: bankDestination.account_bank,
        accountName: bankDestination.account_name,
        accountNo: bankDestination.account_number,
      };
    }
  } catch (error) {
    return error.message;
  }
};

exports.bankTransferConfirmation = async (
  billId,
  transactionId,
  bankDestinationId,
  imageFile
) => {
  try {
    //const uploadReceipt = await storageService.uploadFile(imageFile);

    const updateTransactionStatus = await Models.transactions.update(
      { status: "Success" },
      {
        where: { id: transactionId },
      }
    );

    // const updateReceiptUrl = await Models.bank_transfers.update(
    //   { receipt_url: uploadReceipt },
    //   {
    //     where: { id: bankDestinationId },
    //   }
    // );

    const receipt = await receiptService.getReceipt(billId);
    let recurringMessage = null;
    if (receipt.hasOwnProperty("recurring") && receipt.recurring !== null)
      recurringMessage = "Recurring Is Created";

    return {
      ...receipt,
      paymentMessage: "Payment Is Successful",
      recurringMessage,
    };
  } catch (error) {
    return error.message;
  }
};

exports.billerBankAccounts = async () => {
  try {
    const bankList = await Models.biller_bank_accounts.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (bankList.length === 0) return 204;

    return bankList;
  } catch (error) {
    return error.message;
  }
};

exports.addNewPaymentCard = async (requestData, userId) => {
  try {
    const findCard = await Models.payment_cards.findOne({
      where: { card_number: requestData.cardNumber },
    });

    if (findCard) return 202;

    const addNewCard = await Models.payment_cards.create({
      user_id: userId,
      card_number: requestData.cardNumber,
      card_holder_name: requestData.cardHolderName,
      expire_date: requestData.expireDate,
      cvv: requestData.cvv,
      type: requestData.type,
    });

    return addNewCard;
  } catch (error) {
    return error.message;
  }
};

exports.getPaymentCard = async (userId) => {
  try {
    const allCards = await Models.payment_cards.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { user_id: userId },
    });

    if (allCards.length === 0) return 204;

    return allCards;
  } catch (error) {
    return error.message;
  }
};

exports.transactionFailed = async (billId, userId) => {
  try {
    const findBill = await Models.bills.findOne({
      where: { user_id: userId },
      include: {
        model: Models.transactions,
        attributes: [],
        where: { bill_id: billId },
      },
    });

    if (findBill === null) return 401;

    const updateTransactionStatus = await Models.transactions.update(
      { status: "Failed" },
      {
        where: { bill_id: billId },
      }
    );

    return updateTransactionStatus;
  } catch (error) {
    return error.message;
  }
};
