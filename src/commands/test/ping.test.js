import { describe, it, expect, vi } from "vitest";
import { executePing } from "../ping.js";

describe("ping command", () => {
  it("replies with Pong!", async () => {
    const interaction = {
      reply: vi.fn().mockResolvedValue(undefined),
    };

    await executePing(interaction);

    expect(interaction.reply).toHaveBeenCalledWith("Pong!");
  });
});
