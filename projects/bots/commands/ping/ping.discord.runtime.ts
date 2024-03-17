import { DiscordjsAspect, type DiscordjsDiscord , DiscordJsModule, type Event, type Command, type Resources} from '@eventiva/bots.aspects.discordjs';
import type { PingConfig } from './ping-config.js';


export class PingDiscord extends DiscordJsModule<PingConfig> {
  constructor(
    protected config: PingConfig,
    discordjsDiscord: DiscordjsDiscord,
  ) {super(config, discordjsDiscord)}
  public resources: Resources = {};

  public registerEvents(reload?: true) {
    this.discord.registerEvent(this, [
    // add any events here
    ] as Event<any>[])
    return this
  }

  public registerCommands(reload?: true) {
    this.discord.registerCommand(this, [
    // add any commands here
    ] as Command[])
    return this;
  }

  static dependencies = [DiscordjsAspect];

  static defaultConfig: PingConfig = {name: "PingModule",
    logger: {
      level: "info",
    }
  };

  static async provider(
    [discordjs]: [DiscordjsDiscord],
    config: PingConfig,
  ) {
    const ping = new PingDiscord(config, discordjs);
    ping.log.trace(ping.discord.i18n.t("discord:modules.registering", { name: ping.name }))
    ping.discord.registerModule(ping)
    ping.log.trace(ping.discord.i18n.t("discord:modules.registered", { name: ping.name }))
    return ping;
  }
}

export default PingDiscord;
