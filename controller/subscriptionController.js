const subscriptionService = require("../service/subscriptionService");

exports.getSubscription = async (req, res) => {
  try {
    const getOngoingPurchase = await subscriptionService.getOngoingPurchase(
      req.user.id
    );

    const getActiveSubscription =
      await subscriptionService.getActiveSubscription(req.user.id);

    return res.status(200).json({
      statusText: "Ok",
      message: "Success Get Subscription",
      data: {
        ongoingPurchace: getOngoingPurchase,
        activeSubscription: getActiveSubscription,
      },
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
