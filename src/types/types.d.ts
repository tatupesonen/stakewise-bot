declare namespace NodeJS {
  interface ProcessEnv {
    OWNER: string;
    DISCORD_TOKEN: string;
    PREFIX?: string;
    GUILD: string;
  }
}
