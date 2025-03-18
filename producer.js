const { kafka } = require("./client");


async function init(order, topic) {
  const producer = kafka.producer();

  console.log("Connecting Producer");
  await producer.connect();
  console.log("Producer Connected Successfully");


  const kitchenValue = JSON.stringify({ id: order.id, pizza: order.pizza })


  const deliveryValue = JSON.stringify({ id: order.id, street: order.street })

  const topicMessages = [
    {
      topic: "delivery",
      messages: [
        {

          key: "order-update",
          value: deliveryValue
        },
      ],
    }, {
      topic: 'kitchen',
      messages: [
        {

          key: "order-update",
          value: kitchenValue
        },
      ],
    }
  ]

  const produced = await producer.sendBatch({ topicMessages });
  
  //await producer.disconnect();
}

module.exports.init = init;