const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube')

const token = '1311681376:AAHQCWezF_FBhJPhQc5Uc1GPC2ZUevRn5xU';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async function (msg) {
    const chatId = msg.chat.id;
    console.log(msg.text);

    const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);

    let responseText = dfResponse.text;
    if(dfResponse.intent == 'Treino específico') {
        responseText = await youtube.searchVideoUrl(responseText, dfResponse.fields.corpo.stringValue);
    }

    bot.sendMessage(chatId, responseText);
})