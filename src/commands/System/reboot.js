exports.execute = async (client, message) => {
    await client.handleClose();
};
  
exports.data = {
    permissions: 2048,
    guildOnly: false,
    aliases: ["restart", "stop"],
    name: "reboot",
    desc: "Reboots the bot",
    usage: "reboot",
    perm: 5
};