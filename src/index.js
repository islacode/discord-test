import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";

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

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
      await interaction.reply("Pong!");
    }
  } catch (error) {
    console.error("Interaction handler error:", error);

    // If something failed after Discord expects a reply, try to notify safely.
    if (interaction.isRepliable() && !interaction.replied && !interaction.deferred) {
      await interaction.reply({ content: "An error occurred.", ephemeral: true }).catch(() => {});
    }
  }
});

client.login(discordToken);
