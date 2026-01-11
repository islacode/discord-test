import { describe, it, expect, vi } from "vitest";
import * as ping from "../commands/ping.js";
import { handleInteraction } from "../handleInteraction.js";

describe("interaction router", () => {
  it("routes /ping to executePing", async () => {
    vi.spyOn(ping, "executePing").mockResolvedValue(undefined);

    const interaction = {
      isChatInputCommand: () => true,
      commandName: "ping",
      reply: vi.fn(),
    };

    await handleInteraction(interaction);

    expect(ping.executePing).toHaveBeenCalledTimes(1);
  });
});
