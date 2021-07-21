const subscriptionService = require("../service/subscriptionService");

exports.getSubscription = async (req, res) => {
  try {
    const getOngoingPurchase = await subscriptionService.getOngoingPurchase(
      req.user.id
    );

    return res.status(200).json({
      statusText: "Ok",
      message: "Success Get Subscription",
      data: getOngoingPurchase,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
