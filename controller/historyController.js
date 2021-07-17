const Models = require("../database/models");
const moment = require("moment");

exports.getAllHistory = async (req, res) => {
  const findAllBillId = await Models.bills.findAll({
    attributes: ["id", "bill_type"],
    where: { user_id: 1 },
    include: {
      model: Models.transactions,
      attributes: [],
      where: { status: "Success" },
    },
  });

  const result = [];

  for (let i = 0; i < findAllBillId.length; i++) {
    if (findAllBillId[i].bill_type === "Listrik-Token") {
      const listrikTokenBill = await Models.pln_token_bills.findOne({
        where: { bill_id: findAllBillId[i].id },
      });

      result.push(listrikTokenBill);
    }

    if (findAllBillId[i].bill_type === "Listrik-Tagihan") {
      const listrikTagihanBill = await Models.pln_tagihan_bills.findOne({
        where: { bill_id: findAllBillId[i].id },
      });

      result.push(listrikTagihanBill);
    }

    if (findAllBillId[i].bill_type === "Mobile") {
      const mobileBill = await Models.mobile_bills.findOne({
        where: { bill_id: findAllBillId[i].id },
      });

      result.push(mobileBill);
    }

    if (findAllBillId[i].bill_type === "Internet-TV") {
      const internetTVBill = await Models.bills.findOne({
        where: { id: findAllBillId[i].id },
        attributes: ["id", "bill_type"],
        include: [
          {
            model: Models.internet_tv_bills,
            attributes: ["customer_number", "provider", "total"],
          },
          { model: Models.transactions, attributes: ["updatedAt"] },
        ],
      });

      result.push({
        bill_id: internetTVBill.id,
        bill_type: internetTVBill.bill_type,
        customer_number: internetTVBill.internet_tv_bills[0].customer_number,
        provider: internetTVBill.internet_tv_bills[0].provider,
        total: internetTVBill.internet_tv_bills[0].total,
        transaction_date: moment(internetTVBill.transaction.updatedAt).format(
          "ll"
        ),
      });
    }

    if (findAllBillId[i].bill_type === "Landline") {
      const landlineBill = await Models.landline_bills.findOne({
        where: { bill_id: findAllBillId[i].id },
      });

      result.push(landlineBill);
    }

    if (findAllBillId[i].bill_type === "PDAM") {
      const pdamBill = await Models.pdam_bills.findOne({
        where: { bill_id: findAllBillId[i].id },
      });

      result.push(pdamBill);
    }

    if (findAllBillId[i].bill_type === "BPJS") {
      const bpjsBill = await Models.bpjs_bills.findOne({
        where: { bill_id: findAllBillId[i].id },
      });

      result.push(bpjsBill);
    }
  }

  res.send({ result });
};
