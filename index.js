const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES
  ]
});

client.on('ready', () => {
  console.log(client.user.username + " Online")
})

const prefix = "."//بريفكس البوت
let channel2 = '957036016542294047'//الروم الي راح يروح لها الرفض والقبول
let roleprem = '953327633289064508'//ايدي الرتبة الي تقدر تسعمل امر الرفض والقبول
let roleaccept = '958414387830464563'//الرتبة الي راح ياخدها الشخص اول ما ينقبل
let applyroom = '957036069927391292'//ايدي الروم الي هيروح فيها التقديمكات
client.on('messageCreate', message => {
  if (message.content.startsWith(prefix + 'تقديم')) {
    var channel = client.channels.cache.get(applyroom)
    if (!channel) return
    let filter = m => m.author.id === message.author.id;
    const user = message.author
    var msg1;
    message.channel.send(`اسمك مع شيعار السيرفر [SS]`).then(message => {
      message.channel.awaitMessages({ filter, max: 1, time: 90000, errors: ['time'] })
        .then(collected => {
          collected.first().delete();
          msg1 = collected.first().content;
          var msg2;
          message.edit(`عمرك؟`).then(message => {
            message.channel.awaitMessages({ filter, max: 1, time: 90000, errors: ['time'] })
              .then(collected => {
                collected.first().delete();
                msg2 = collected.first().content;
                var msg3;
                message.edit(`متى دخلت الدسكورد؟`).then(message => {
                  message.channel.awaitMessages({ filter, max: 1, time: 90000, errors: ['time'] })
                    .then(collected => {
                      collected.first().delete();
                      msg3 = collected.first().content;
                      var msg4;
                      message.edit(`كم ساعة بتتفاعل بليوم؟`).then(message => {
                        message.channel.awaitMessages({ filter, max: 1, time: 90000, errors: ['time'] })
                          .then(collected => {
                            collected.first().delete();
                            msg4 = collected.first().content;
                            var msg5;
                            message.edit(`ب ايش راح تفيدنا؟`).then(message => {
                              message.channel.awaitMessages({ filter, max: 1, time: 90000, errors: ['time'] })
                                .then(collected => {
                                  collected.first().delete();
                                  msg5 = collected.first().content;
                                  message.edit(`قم بكتابة "نعم" ان كنت تريد ارسال التقديم او قم بكتابة "لا" ان كنت لا تريد ارسال التقديم ..`)
                                  message.channel.awaitMessages({ filter, max: 1, time: 90000, errors: ['time'] })
                                    .then(collected => {
                                      if (collected.first().content === 'لا') {
                                        message.delete();
                                        message.delete();
                                      }
                                      if (collected.first().content === 'نعم') {
                                        message.edit(`تم ارسال معلوماتك سوف يتم رد عليك في اقرب وقت ${channel}`);
                                        collected.first().delete();
                                        var em = new Discord.MessageEmbed()
                                          .addField(`الاسم`, `${msg1}`, true)
                                          .addField(`العمر`, `${msg2}`, true)
                                          .addField(`متى دخل الدسكورد`, `${msg3}`, true)
                                          .addField(`مدة التفاعل`, `${msg4}`, true)
                                          .addField(`الفائده`, `${msg5}`, true)
                                          .setThumbnail(user.avatarURL({ dynamic: true }))
                                          .setFooter(`Apply By: ${user.id}`, message.guild.iconURL({ dynamic: true }))
                                          .setAuthor(user.tag, user.avatarURL({ dynimc: true }))
                                          .setTimestamp()
                                          .setColor('#0075ff')
                                        channel.send({ content: `<@${user.id}>`, embeds: [em] })
                                      }
                                    })
                                })
                            })
                          })
                      })
                    })
                })
              })
          })
        })
    })
  }
})
client.on('messageCreate', message => {
  if (message.content.startsWith(prefix + "قبول")) {
    if (!message.member.roles.cache.some(r => r.id === roleprem)) return
    const channel = client.channels.cache.get(channel2)
    if (!channel) return message.channel.send(`Channel ??`)
    let user = message.mentions.members.first()
    if (!user) return message.channel.send(`Mention The User`)
    var role = message.guild.roles.cache.get(roleaccept);
    if (!role) return message.channel.send(`i can't find a role`)
    if (user.roles.cache.get(roleaccept)) return message.channel.send(`This person has already in the staff`)
    const em = new Discord.MessageEmbed()
      .setDescription(`
**${user} You have been accepted into the Staff**

**Admin:
${message.author}**`)
      .setTimestamp()
      .setColor('#ffe600')
      .setAuthor(user.user.tag, user.user.avatarURL({ dynimc: true }))
      .setThumbnail(user.user.avatarURL({ dynimc: true }))
      .setFooter(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
    message.channel.send(`Done Send in ${channel}`)
    channel.send({ content: `${user}`, embeds: [em] })
    user.send({ embeds: [em] })
    user.roles.add(role)
  }
})



client.on('messageCreate', message => {
  if (message.content.startsWith(prefix + "رفض")) {
    if (!message.member.roles.cache.some(r => r.id === roleprem)) return
    const channel = client.channels.cache.get(channel2)
    if (!channel) return message.channel.send(`Channel ??`)
    let user = message.mentions.members.first()
    if (!user) return message.channel.send(`Mention The User`)
    let reas = message.content.split(' ').slice(2).join(' ')
    if (!reas) return message.channel.send(`Type The Reason`)
    const em = new Discord.MessageEmbed()
      .setDescription(`
**${user} Unfortunately, you were rejected**
**Admin:**
${message.author}

**Reason:
${reas}**`)
      .setTimestamp()
      .setColor('#ff0000')
      .setAuthor(user.user.tag, user.user.avatarURL({ dynimc: true }))
      .setThumbnail(user.user.avatarURL({ dynimc: true }))
      .setFooter(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
    message.channel.send(`Done Send in ${channel}`)
    channel.send({ content: `${user}`, embeds: [em] })
    user.send({ embeds: [em] })
  }
})


client.login(process.env.token)