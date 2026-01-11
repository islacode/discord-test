import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";

import {handleInteraction} from "./handleInteraction.js";

const { DISCORD_TOKEN: discordToken } = process.env;

if (!discordToken) {
  throw new Error("Missing DISCORD_TOKEN in .env");
}

// For slash commands, Guilds intent is sufficient.
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  await handleInteraction(interaction);
});

client.login(discordToken);
