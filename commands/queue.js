const Discord = require("discord.js") 
exports.execute = async (client, message, args) => {
    let resultPerPage = 10
    if(!args[0]) args[0] = 1;
    args[0] = parseInt(args[0])
    if(isNaN(args[0]) || Math.ceil((client.db.get(message.guild.id).queue.length?client.db.get(message.guild.id).queue.length:1)/resultPerPage)<args[0] || parseInt(args[0])<1) return message.channel.send("Not valid page number")
    let moment = require("moment");
    require("moment-duration-format")(moment)
    let txt = ""
    client.db.get(message.guild.id).queue.forEach((s, i)=>{
        let length = moment.duration(parseInt(s.length), "seconds").format("HH:mm:ss", { trim:false })
        if(length[0] === "0" && length[1] === "0") length = length.substring(3)
        if(message.guild.me.voice.connection.dispatcher === null) message.guild.me.voice.connection.dispatcher = {streamTime: s.length}
        let current
        try{
            current = moment.duration(message.guild.me.voice.connection.dispatcher.streamTime, "milliseconds").format("HH:mm:ss", { trim:false })
        } catch(e){
            current = "00:00"
        }
        if(current[0] === "0" && current[1] === "0") current = current.substring(3)
        

        if(i==0) return txt += `**Now playing** [${s.name}](${s.url}) \`[${current}/${length}]\`\n\n`
        txt += `${i}. [${s.name}](${s.url}) \`[${length}]\` queued by \`${client.users.cache.get(s.user).tag}\`\n\n`
    })
    let lines = txt.split("\n\n")
    txt = ""
    for(let i = resultPerPage*args[0]-resultPerPage; i<resultPerPage*args[0]; i++){
        if(lines[i]) {
            txt += lines[i] + "\n\n"
        }
    }
    if(txt==="") txt = "No songs queued."
    let embed = new Discord.MessageEmbed()
    .setTitle("Queue")
    .setColor("BLUE")
    .setDescription(txt)
    .setTimestamp()
    .setFooter(`Page ${args[0]} out of ${Math.ceil(lines.length/resultPerPage)} | Total lenght: ${client.db.get(message.guild.id, "queue").length>0?moment.duration(client.db.get(message.guild.id, "queue").map(v=>parseInt(v.length)).reduce((a,c)=>a+c), "seconds").format("HH:mm:ss", { trim:true }):"0s"}`)
    message.channel.send(embed)
};
  
exports.data = {
    guildOnly: true,
    aliases: ["q"],
    category: "music",
    name: "queue",
    desc: "Shows music queue",
    usage: "queue",
    perm: 0
};