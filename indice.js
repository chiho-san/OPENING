
/// Requerir de aquellos documentos
const { Client, MessageEmbed  } = require("discord.js");
const Config_JSON = require('./config.json');

/// Variables y Variables tipo funciones
const bot = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
let Termino = false;
let confirmacion = false;
const RandNumber = number =>{
    return Math.floor(Math.random() * number);
};
const VerificarRol = (message, fn)=>{
    if (message.member.roles.cache.some(role => role.name === "Owner" ) || message.member.roles.cache.some(role => role.name === "Admin" ) || message.member.roles.cache.some(role => role.name === "Moderador" )) {
        Termino = true
        fn(Termino);
    }else{
        Termino = false
        fn(Termino);
    }
};

/// Eventos de los archivos requeridos
bot.on(`ready`, ()=>{
    console.log(`Se conecto ${bot.user.tag}`);
    const numero = RandNumber(5);
    switch(numero){
        case 1:
            bot.user.setStatus('dnd');break;
        case 2:
            bot.user.setStatus('idle');break;
        case 3:
            bot.user.setStatus('online');break;
        case 4:
            bot.user.setStatus('invisible');break;
        case 5:
            console.log("No ps dinosaurio");break;
    };
})

bot.on(`messageCreate`, msg=>{
    console.log(msg.author)
    if(msg.content.includes(Config_JSON.Comandos.Comando)){
        const embeda = new MessageEmbed()
        .setTitle(`Comandos disponibles`)
        .setAuthor({
            name: msg.author.username + " — " + " comandos bot",
            iconURL: 'https://cdn.discordapp.com/avatars/' + msg.author.id + '/' + msg.author.avatar + 'webp?size=80',
            url: 'https://discord.js.org'
        })
        .setThumbnail('https://openingsgods.netlify.app/Comando_Imagen.png')
        .setColor('#1E8459')
        ;
        msg.channel.send({ embeds: [embeda] });
    }else if (msg.content.startsWith(Config_JSON.Comandos.DEL)) {
        VerificarRol(msg, (awita)=>{
            if(awita === true){
                if(confirmacion === true){
                    setTimeout(()=>{
                        confirmacion = false;
                        msg.reply("Se desactivo el rastreador de mensajes eliminados.");
                    }, 3000);
                }else if (confirmacion === false) {
                    confirmacion = true;
                    setTimeout(()=>{
                        confirmacion = true;
                        msg.reply("Se activo el rastreador de mensajes eliminados.");
                    }, 3000);
                }else{
                    msg.channel.send("\nError.")
                }
            }else{
                msg.reply('Este comando no esta disponible para tu rol, solo se encuentra disponible para\n```CSS\n.Owner\n.Admin\n.Moderador```')
            };
        });
    }
});
let numero = 0
bot.on(`messageDelete`, msg=>{
    if(confirmacion === true){
        numero = numero + 1
        console.log("-------------------------------------------- Objeto " + numero + " ------------------------------------")
        console.log(msg)
        setTimeout(()=>{
            const autor = msg.author;
            autor.send("El rastreador de mensajes eliminados esta activado, por lo tanto eliminar un mensaje esta proibido y se mostraría el mensaje que eliminastes.");
            if(msg.content.lenght >= 50){
                msg.channel.send("\n\t\t\t\t**Se borro un mensaje**\nDe: **" + msg.author.username + "#" + msg.author.discriminator + "**;\nContenido:\n" + msg.content)
            }else{
                msg.channel.send("\n\t\t\t\t**Se borro un mensaje**\nDe: **" + msg.author.username + "#" + msg.author.discriminator + "**;\nContenido: " + msg.content)
            }
        }, 3000)
    }
})

bot.login(Config_JSON.Token);