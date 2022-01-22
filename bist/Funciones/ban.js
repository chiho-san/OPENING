const { MessageEmbed } = require('discord.js');
const Config = require('../ConfigJSON.json');
module.exports = {
    name: "ban",
    desc: "Comando para el bot 'Tareas!'",
    usage: "ban",
    aliases: [],
    isPrivate: false,
    guildOnly: false,
    category: 'test',
    isOwner: true,
    init: (bot, msg, args)=>{
        return {
            Ban: ()=>{
                const permisos = (msg.member.roles.cache.some(r=>Config.Ban_Roles.includes(r.name)) )
                if(!permisos) return msg.reply('No tienes los permisos necesarios para utilizar este comando!\nSolo los usuarios con los roles: **' + Config.Ban_Roles[0] + '**, **' + Config.Ban_Roles[1] + '** y **' + Config.Ban_Roles[2] + '** tienen permitido usar este comando');
                let usuario = msg.mentions.members.first();
                if(!usuario) return msg.reply('Debes de mencionar a alguien');
                if(usuario.id === msg.guild.ownerId) return msg.reply('No se puede banear al Owner de servidor');
                if(usuario.id === bot.user.id) return msg.reply('no puedes banear al bot desde un comando!');
                let Razon_Ban = args.slice(Config.Errores.Ban.Caracteres_Maximos);
                if(!Razon_Ban) return msg.reply('Es necesario una razón para proceder con el ban');
                if(usuario === msg.author) return msg.reply('No te puedes banear a ti mismo');

                // Mandando mensaje a la victima
                let ARS = bot.users.cache.get(`${usuario.id}`);
                ARS.send(`**------------------ La razón por la cual fuistes baneado del servidor ------------------**\nBaneado por: **@${msg.author.username}${msg.author.discriminator}**\nRazon: ${Razon_Ban}` )

                msg.channel.send(`Quedan 10 segundos para el baneo del usuario ${usuario}`);
                setTimeout(()=>{
                    msg.channel.send(`Quedan 5 segundos para el baneo del usuario ${usuario}`);
                    setTimeout(()=>{

                        // Procediendo al ban
                        usuario.ban({ reason: Razon_Ban });

                        // Creando un mensaje decorado para dar razón al "Ban"
                        const baneo_Pro_EMBED = new MessageEmbed()
                        .setTitle(Config.Errores.Ban.Titulo)
                        .setDescription(`${Config.Errores.Ban.Descripcion} ${usuario}\nLa razón de su ban se le sera mostrada tanto al usuario ${usuario} como en este mensaje.\nRazón: ${Razon_Ban}`)
                        .setColor(Config.Errores.Ban.Color);

                        // Mandando el mensaje al canal
                        msg.channel.send({ embeds: [baneo_Pro_EMBED] });
                    }, 5000)
                }, 5000);

            }
        }
    }
