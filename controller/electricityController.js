exports.postTagihanBill = async (req, res) => {
  try {
    const {
      IDPEL,
      Name,
      Tarif_Daya,
      Bulan_Tahun,
      Stand_Meter,
      Bill,
      Admin,
      Late_Payment_Fee,
      Total,
      payment_type,
      period,
      date_billed,
      bank_destination_id,
    } = req.body;
    const user_id = req.user.id;

    if (!IDPEL) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Failed to Get Electricity Account Info",
      });
    }

    if (period !== "Month") {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Failed to Get Electricity Account Info",
      });
    }

    let error = await electricityService.checkRangePaymentDate();
    if (error !== null) {
      res.status(500).json({
        statusText: "Internal Server Error",
        message: error,
      });
    }

    let { data: accInfo, bankTransferDetails } =
      await electricityService.createTagihanBill(
        user_id,
        payment_type,
        period,
        date_billed,
        bank_destination_id,
        IDPEL,
        Name,
        Tarif_Daya,
        Bulan_Tahun,
        Stand_Meter,
        Bill,
        Admin,
        Late_Payment_Fee,
        Total
      );

    bankTransferDetails.Total = accInfo.Total;

    if (accInfo === null || bankTransferDetails === null) {
      res.status(204).json({
        statusText: "No Content",
      });
    } else {
      res.status(200).json({
        statusText: "OK",
        message: "Success to Get Electricity Account Info",
        data: { accInfo, bankTransferDetails },
      });
    }
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message,
    });
    console.log(error);
  }
};
