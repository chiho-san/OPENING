
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

const EmbedMeme = (imagen = 'NAN', message) =>{
    if(imagen === 'NAN'){
        message.channel.send('Error por parte de la imagen o no existe. Lamentamos este pequeño error, sería genial que nos avisaras de este error para arreglarlo de una vez por todas!');
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
        default:
            console.log('Error indefinido por parte de la variable "numero". Su contenido: ' + numero + "; espero que puedas arreglar el error");
    };
})

bot.on(`messageCreate`, msg=>{
    if(msg.content.startsWith(Config_JSON.Comandos.Comando)){
        const embeda = new MessageEmbed()
        .setTitle(Config_JSON.Embed.Embed_Comandos.Titulo)
        .setAuthor({
            name: msg.author.username + " — " + " comandos bot",
            iconURL: msg.author.avatarURL()
        })
        .setThumbnail(Config_JSON.imagenes.Embed_Imagen)
        .setColor('#1E8459')
        .setDescription(Config_JSON.Embed.Embed_Comandos.Descripcion)
        .addFields(
            {name: Config_JSON.Embed.Embed_Comandos.Fields.Comando1.Nombre, value: Config_JSON.Embed.Embed_Comandos.Fields.Comando1.Funcion},
            {name: Config_JSON.Embed.Embed_Comandos.Fields.Comando2.Nombre, value: Config_JSON.Embed.Embed_Comandos.Fields.Comando2.Funcion}
        )
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
    }else if(msg.content === Config_JSON.Comandos.Comando404){
        msg.reply('**Comando no reconocido** :sob:\nConsulta la lista de comandos con **"<<--_Ayuda"**');
    }else if(msg.content.startsWith(Config_JSON.Comandos.meme)){
        let numeroRandom_MemePro = RandNumber(5);
        switch(numeroRandom_MemePro){
            case 1:
                EmbedMeme('NAN', msg);
                break;
            case 2:
                EmbedMeme('NAN', msg);
                break;
            case 3:
                EmbedMeme('NAN', msg);
                break;
            case 4:
                EmbedMeme('NAN', msg);
                break;
            case 5:
                EmbedMeme('NAN', msg);
                break;
            default:
                EmbedMeme('NAN', msg);
                break;
            
        }
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
            autor.send("El rastreador de mensajes eliminados esta activado, por lo tanto eliminar un mensaje esta proibido y se mostrara publicamente el mensaje que eliminastes.");
            if(msg.content.includes('@everyone') || msg.content.includes('@here') || msg.mentions.everyone){
                msg.channel.send(Config_JSON.Comandos.Everyone_Error + "@" + msg.author.username + "#" + msg.author.discriminator);
            }else{
                if(msg.content.length >= 50){
                    msg.channel.send("\n\t\t\t\t**Se borro un mensaje**\nDe: **" + msg.author.username + "#" + msg.author.discriminator + "**;\nContenido:\n" + msg.content)
                }else{
                    msg.channel.send("\n\t\t\t\t**Se borro un mensaje**\nDe: **" + msg.author.username + "#" + msg.author.discriminator + "**;\nContenido: " + msg.content)
                }
            }
        }, 3000)
    }
})

bot.login(Config_JSON.Token);