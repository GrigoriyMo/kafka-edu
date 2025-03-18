# kafka-edu
1. Запуск http сервера с api node httpserver.js
2. Запуск слушателя кухни node consumer.js 1 kitchen
3. Запуск слушателя доставки node consumer.js 2 delivery

curl --location "http://localhost:3000/pizza" \
--header "Content-Type: application/json" \
--data "{\"street\":\"Moscow\", \"pizza\":\"mushrooms&hum\"}"
