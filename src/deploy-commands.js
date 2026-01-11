import "dotenv/config";
import { REST, Routes } from "discord.js";

const { DISCORD_TOKEN: discordToken, APP_ID: appId, GUILD_ID: guildId } = process.env;

if (!discordToken || !appId || !guildId) {
  throw new Error("Missing DISCORD_TOKEN, APP_ID, or GUILD_ID in .env");
}

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

const rest = new REST({ version: "10" }).setToken(discordToken);

try {
  console.log("Deploying guild slash commands...");
  await rest.put(Routes.applicationGuildCommands(appId, guildId), { body: commands });
  console.log("Deployed successfully.");
} catch (error) {
  console.error("Failed to deploy commands:", error);
  process.exitCode = 1;
}
