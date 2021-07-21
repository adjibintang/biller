const notificationService = require('../service/notificationService');

exports.getNotifications = async (req, res) => {
  try {
    const success = await notificationService.successPayment(req.user.id);
    const failed = await notificationService.failedPayment(req.user.id);
    const reminder = await notificationService.reminderDue(req.user.id); 
    
    return res.status(200).json({
      statusText: "Ok",
      message: "Success Get Receipt",
      data: {
        success,
        failed,
        reminder 
      }
    });
    
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  }
}
