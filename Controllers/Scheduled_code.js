const cron = require("node-cron");
const order_model = require("../Modals/order_model");

const updateOrderStatus = async () => {
  try {
    const orders = await order_model.find({ isDelivered: false });
    const currentDate = new Date();

    if (orders.isCancelled != true) {
      orders.forEach(async (order) => {
        const creationTime = new Date(order.createdAt);
        const deliveryTime = new Date(creationTime.getTime() + 2 * 60 * 1000);
        if (currentDate >= deliveryTime) {
          await order_model.findByIdAndUpdate(order._id, { isDelivered: true });
        }
      });
    }
    console.log("Orders updated successfully.");
  } catch (error) {
    console.error("Error updating orders:", error);
  }
};

const setupCronJob = () => {
  const job = cron.schedule("*/2 * * * *", updateOrderStatus); 
  job.start();
};

module.exports = { setupCronJob };
