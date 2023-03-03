const Insta = require('./insta.js');
const client = new Insta.Client();
const { Configuration, OpenAIApi } = require("openai");
var reply = "";
const config = new Configuration({
    apiKey: process.env.API_KEY,
  });

const openai = new OpenAIApi(config);

client.on('connected', () => {
    console.log(`${client.user.username} Is Ready Now For Chats`);
});

client.on('messageCreate', async(message) => {
    if (message.author.id === client.user.id) return
    message.markSeen();

    if(message.content.toLowerCase().includes('hi') || message.content.toLowerCase().includes('hello')){ 
        return message.chat.sendMessage('VENOM IS MY DEVELOPER CHECK OUT HIS CHANNEL :- https://youtube.com/c/VenomExE');
    } else
    reply = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{role: "user", content: message}],
});
message.chat.sendMessage(reply.data.choices[0].message);
});

client.login(process.env.USERNAME, process.env.PASSWORD);
