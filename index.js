require("dotenv").config();
const { Client, GatewayIntentBits, ActivityType } = require("discord.js"); // <-- Tambahkan ActivityType
const OpenAI = require("openai");

const deepseek = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});


client.on("error", (error) => {
  console.error("Unhandled error in Discord client:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception thrown:", error);
});

// Message Handler
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.mentions.has(client.user)) {
    const userMessage = message.content.replace(`<@!${client.user.id}>`, "").trim();

    try {
      const completion = await deepseek.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage },
        ],
        temperature: 0.9,
        max_tokens: 2000,
      });

      const reply = completion.choices[0].message.content;
      if (reply.length > 2000) {
        const replyChunks = reply.match(/[\s\S]{1,2000}/g);
        for (const chunk of replyChunks) {
          await message.reply(chunk);
        }
      } else {
        await message.reply(reply);
      }
    } catch (error) {
      console.error("Error:", error);
      message.reply("Terjadi kesalahan. Silakan coba lagi.");
    }
  }
});

// Discord Login
client.login(process.env.DISCORD_API_KEY);
