const Discord = require("discord.js")
exports.execute = async (client, message, args) => {
        if(!args[0]) return message.channel.send("You must give me the custom emoji to download duh!");
        let result = args[0].match(/<(a)?:(.+):(\d+)>/)
        if(result==null) {
            return message.channel.send("Not a valid emoji! (Or non custom)")
        }
        let animated = result[1] ? true : false;
        let name = result[2]
        let id = result[3]

        message.channel.send(new Discord.MessageAttachment(`https://cdn.discordapp.com/emojis/${id}.${animated?"gif":"png"}`, `${name}.${animated?"gif":"png"}`))
};
  
exports.data = {
    guildOnly: false,
    aliases: ["steal", "stealemoji"],
    category: "fun",
    name: "emoji",
    desc: "turns custom emoji into a downloadable file",
    usage: "emoji <emoji>",
    perm: 0
};