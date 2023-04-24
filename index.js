const Insta = require("@ber4tbey/insta.js");
const client = new Insta.Client();
const { Configuration, OpenAIApi } = require("openai");

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
  var reply = await openai.createCompletion({
   model: "text-davinci-003",
   prompt: message.content,
   temperature: 0.7,
   max_tokens: 3000,
   top_p: 1,
   frequency_penalty: 0,
   presence_penalty: 0,
});
message.chat.sendMessage(reply.data.choices[0].text);
});

client.login(process.env.USERNAME, process.env.PASSWORD);
