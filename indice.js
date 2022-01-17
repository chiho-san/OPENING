
/// Requerir de aquellos documentos y funciones xdxdxd
const { Client, MessageEmbed } = require('discord.js');
const bot = new Client(
    { intents: ["GUILDS", "GUILD_MESSAGES"] }
);
const Help_Command = require('./bist/Funciones/Ayuda_Comando.js')
const Datos = require("./bist/ConfigJSON.json");
const { Comandos, Random } = require('./bist/funciones.js');
const Ban = require('./bist/Funciones/ban.js');
const RichMeme = (img, msgObject, Color = 'BLUE') =>{
    const Embeda = new MessageEmbed()
    .setTitle(`${msgObject.author.username} - invoco un meme`)
    .setThumbnail(msgObject.author.avatarURL())
    .setDescription('Aquí tienes tu meme random!')
    .setColor(Color || 'AQUA')
    .setImage(img)
    ;
    msgObject.channel.send(
        { embeds: [Embeda] }
    )
}
/// Evento que se dispara cuando el bot este listo para conectarse xdxdxd
bot.on('ready', ()=>{
    console.log(`El bot ${bot.user.tag} esta activo`);
});
let Switch_Numero
/// Evento que se dispara cuando el/la usuario/persona persona cree un mensaje
bot.on('messageCreate', (msg)=>{
    
    /// Funciones ( Clases )
    const ClaseCMD = new Comandos(msg);
    const SetCommands = (A, B, C) => ClaseCMD.LlamarComando(   A   , B ,  C    ),
        Send = A => ClaseCMD.EnviarMensaje(A);
    
    /// Comando de la funcion global de "Rastrear mensajes eliminados"
    SetCommands(Datos.Comandos["^k2"], ()=>{
        if(Datos.Comandos["^k"] === true){
            Send('Esta opcion ya esta activada globalmente');
        }else if(Datos.Comandos["^k"] === false){
            Datos.Comandos["^k"] = true;
            setTimeout(()=>{
                Send('Esta en "verdadero" la opcion de "Rastrear mensajes eliminados"');
            }, 3000);
        }else{
            setTimeout(()=>{
                Send(Datos.Alertas.Error_Desconocido_VariableGlobal + Datos.Autor.Programador + '; enviale este mensaje: **dato perdido ["' + typeof Datos.Comandos["^k"] + '"] -- contenido: ' + Datos.Comandos["^k"] + '**');
            }, 3000);
        }
    }, false);

    /// Comando de memes randoms xdxd
    SetCommands(Datos.Comandos.meme, ()=>{
        Switch_Numero = Random(Datos.imagenes.memes.length)
        switch(Switch_Numero){case 0:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#33FFD7');break;case 1:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#4361C4');break;case 2:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#43BCC4');break;case 3:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#C70039');break;case 4:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#900C3F');break;case 5:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#566573');break;case 6:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#2589E6');break;case 7:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#B825E6');break;case 8:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#06529F');break;case 9:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#29292A');break;case 10:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#E5C306');break;default:msg.channel.send(`No hay meme:sob:${Switch_Numero}`);break;
    }
    });

    //// Llamando funciones de otros archivos .js

    // Comando del Ban
    SetCommands(Datos.Comandos.aBan, ()=>{
        const init = Ban.init(bot, msg, msg.content);
        init.Ban()
    }, false);

    // Comando de "Ayuda"
    SetCommands(Datos.Comandos.Aydua, ()=>{
        Help_Command._init(msg);
    }, false);
});
/// Numero de objetos eliminados
let numero = 0

// Evento que se dispara cuando el usuario borra algun mensaje
bot.on('messageDelete', msg=>{
    const ClaseCMD = new Comandos(msg);
    const Send = A => ClaseCMD.EnviarMensaje(A);
    setTimeout(()=>{

        ///// Aumentando y mostrando el numero de objetos eliminados en la consola
        numero++;
        console.log(`-------------------------- Objeto ${numero} -----------------------------------`);
        console.log(`\nContenido: ${msg.content}\nDe: @${msg.author.tag}\nServidor ID: ${msg.guild.id}\nCanal ID: ${msg.channel.id}`)
        /// Evitando ping internacional en todo el servidor :D
        if(Datos.Comandos["^k"] === true){
            if(msg.content.includes(Datos.Errores.here.firma)){
                Send(`\t\nSe borro un mensaje por parte del usuario **${msg.author.username}** y incluia un **"@ here"**. No se podra mostrar el mensaje publicamente :sob:`);
            }else if(msg.content.includes(Datos.Errores.everyone.firma)){
                Send(`\t\nSe borro un mensaje por parte del usuario **${msg.author.username}** y incluia un **"@ everyone"**. No se podra mostrar el mensaje publicamente :sob:`);
            }else{
                Send(`**Se borro una mensaje**\n-\nDe: [" **@${msg.author.tag}** "]\n-\nContenido: ${msg.content}`)
            }
        }else{
            Send('Error. Los mensajes eliminados actualmente, no podran ser mostrados en pantalla. Puedes reiniciar este sistema con el comando `"^k"`')
        }
    }, 3000);

});

/// Token del bot
bot.login(Datos.Token);
