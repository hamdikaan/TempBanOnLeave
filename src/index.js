import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";

config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
  ],
});
client.login(process.env.TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("guildMemberRemove", (member) => {
  member.ban();
  console.log(`Member ${member.displayName} got banned.`);
  setTimeout(() => {
    member.guild.members.unban(member.id);
    console.log(`Member ${member.displayName} got unbanned.`);
  }, 1000 * 60 * 60 * 24 * 7);
});
