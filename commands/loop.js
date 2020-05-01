exports.execute = async (client, message, args) => {
    if(message.guild.me.voice.channel && message.guild.me.voice.channel !== message.member.voice.channel) return message.channel.send("You must be in my voice channel to use this command!")
    client.db.set(message.guild.id, !client.db.get(message.guild.id, "settings.loop"), "settings.loop")
    message.channel.send("Looping status is now " + client.db.get(message.guild.id, "settings.loop"))
};
  
exports.data = {
    guildOnly: true,
    aliases: ["luup", "lööp"],
    category: "music",
    name: "loop",
    desc: "Makes the queue loop",
    usage: "loop",
    perm: 0
};