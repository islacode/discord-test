import { executePing } from "./commands/ping.js";

export async function handleInteraction(interaction) {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await executePing(interaction);
  }
}
