const Discord = require("discord.js");
const client = new Discord.Client();
let ch = null;
const { token, membercount, questions, ads, tz } = require("./config");
client.login(token);
client.on("ready", () => {
    ch = client.channels.get(membercount);
    setName(ch.guild);
});
client.on("guildMemberRemove", (member) => {
    setName(member.guild);
});
client.on("guildMemberAdd", (member) => {
    setName(member.guild)
});
client.on("message", (m) => {
    if(m.content === "utils update plz"){
        setName(m.guild);
    } else if(m.content === "utils ads plz"){
        sendAd();
    }
});
function setName(guild){
    ch.setName("〖👥〗Members : "+guild.members.filter((m) => !m.user.bot).size);
};
function sendAd(){
    client.channels.get(questions).send(ads);
};
var CronJob = require("cron").CronJob;
new CronJob("* 30 16 * * *", sendAd, null, true, tz);