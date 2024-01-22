const { Client, GatewayIntentBits} = require('discord.js');
const fs = require('fs');
const {token} = require('./config.json');

const client = new Client({ intents: 
  [GatewayIntentBits.Guilds, 
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildIntegrations,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.AutoModerationExecution,
  GatewayIntentBits.GuildIntegrations

] });

// Global error handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Additional error handling logic
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Additional error handling logic
});

// Dynamically read event files
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.on(event.name, (...args) => event.execute(...args, client));
}

client.login(token);


