let { MessageEmbed } = require("discord.js");

module.exports = async (client, member) => {
    client.db.ensure(member.guild.id, client.config.defaultSettings);
    let log = client.db.get(member.guild.id).settings.log;
    if(!log) return;
    let embed = new MessageEmbed()
        .setTitle("Member joined!")
        .setColor("#34a2eb")
        .setDescription(`${member.toString()} ${member.user.tag} (\`${member.id}\`)`)
        .setTimestamp();
    let logChannel = client.channels.cache.get(log);
    if(logChannel && logChannel.permissionsFor(client.user).has([ "SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL" ])) logChannel.send(embed);
};
