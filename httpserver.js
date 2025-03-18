const express = require('express');
const kafkaProducer = require('./producer');
const app = express();
let orderCount = 0;
const PORT = 3000;

app.use(express.json());

app.post('/pizza', (req, res) => {
    const { street, pizza } = req.body;

    console.log('Получен запрос на /pizza');
    console.log('Тело запроса:', req.body);

    if (!street || !pizza) {
        console.log('Ответ: 400 - Параметры не заполнены');
        return res.status(400).json({ message: 'Укажите улицу и пиццу' });
    }

    orderCount++;
    kafkaProducer.init({ id: orderCount, street: street, pizza: pizza }).then((data) => {
        console.log('Ответ: 200 - Заказ принят, номер заказа:', orderCount);
        res.status(200).json({ message: 'Заказ принят!', orderNumber: orderCount });
    })

});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
