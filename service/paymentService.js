const Models = require("../database/models");
const storageService = require("../service/storageService");

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
  transactionId,
  bankTransferId,
  imageFile
) => {
  try {
    const uploadReceipt = await storageService.uploadFile(imageFile);

    const updateTransactionStatus = await Models.transactions.update(
      { status: "Success" },
      {
        where: { id: transactionId },
      }
    );

    const updateReceiptUrl = await Models.bank_transfers.update(
      { receipt_url: uploadReceipt },
      {
        where: { id: bankTransferId },
      }
    );

    return uploadReceipt;
  } catch (error) {
    return error.message;
  }
};
