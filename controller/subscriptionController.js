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
        subscription: getActiveSubscription,
      },
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.cancelSubscription = async (req, res) => {
  try {
    const cancelSubscriptionResult =
      await subscriptionService.cancelSubscription(req.body.billsId);

    if (cancelSubscriptionResult == 404) return res.sendStatus(404);

    return res.status(201).json({
      statusText: "Created",
      message: "Success Cancel Subscription",
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};
