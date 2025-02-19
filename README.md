# DeepseekDiscordBot

### Making APIs Ready

1. Get Discord Bot API Key via : https://discord.com/developers/applications

After you create a API key then you will get to see a token once so you should copy that and keep it safely somewhere.

2. Get Deepseek API Key via: https://platform.deepseek.com/api_keys

And keep both the keys at `.env` file:-
```
DISCORD_API_KEY='your_discord_bot_token'
DEEPSEEK_API_KEY='your_deepseek_api_key'
```

After doing this:

### Setup Initial Coding Workspace
Execute this commands on your IDE on a directory you want to work on
1. ```npm init -y```
2. ```npm install discord.js```
3. ```npm install openai dotenv```

And finally
```js
node index.js
```
You will see this output if everthing is working fine:
```Deepseek Already Set Up```

