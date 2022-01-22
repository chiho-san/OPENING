
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
    .setColor(Color || 'AQUA');

    // .PNG .JPG .GIF

    if(img.endsWith('.png') || img.endsWith('.PNG')){
        Embeda.setDescription('Aquí tienes tu meme random! PNG');
        Embeda.setImage(img);
    }else if(img.endsWith('gif') || img.endsWith('.GIF')){
        Embeda.setTitle(`${msgObject.author.username} - invoco un meme || .GIF`)
        Embeda.setDescription(img);
    }else if(img.endsWith('.jpg') || img.endsWith('.JPG')){
        Embeda.setDescription('Aquí tienes tu meme random! JPG');
        Embeda.setImage(img);
    }

    msgObject.channel.send(
        { embeds: [Embeda] }
    )
};
// Avatar funcion
const Avatar_Jugador = msg => {
    let usuario = msg.mentions.members.first();
    if(!usuario) return msg.channel.send('Debes de mencionar a alguien');
    if(usuario.id === bot.user.id) return msg.channel.send('No se puede visualizar el avatar del bot')
    let ARS = bot.users.cache.get(`${usuario.id}`);
    const Embeda = new MessageEmbed()
    .setTitle(`Avatar de ${ARS.username}`)
    .setImage(ARS.avatarURL());
    msg.channel.send({ embeds: [Embeda] });
};

/// Evento que se dispara cuando el bot este listo para conectarse xdxdxd
bot.on('ready', ()=>{
    console.log(`El bot ${bot.user.tag} esta activo`);
    // console.log(bot.user)
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
            // Datos.Comandos["^k"] = true;
            setTimeout(()=>{
                Send('La **Tarea** rastreadora de mensajes eliminados dejo de buscar ya que la opcion esta en "falso" y no en "verdadero". Puedes ponerlo en "verdadero" con el comando "k^T"');
            }, 3000);
        }else{
            setTimeout(()=>{
                Send(Datos.Alertas.Error_Desconocido_VariableGlobal + Datos.Autor.Programador + '; enviale este mensaje: **dato perdido ["' + typeof Datos.Comandos["^k"] + '"] -- contenido: ' + Datos.Comandos["^k"] + '**');
            }, 3000);
        }
    }, false);

    SetCommands('k^T', ()=>{
        if(Datos.Comandos["^k"] === false){
            Datos.Comandos["^k"] = true;
            Send('Se reactivo la opcion rastreadora de mensajes!\nLos mensajes eliminados seran volver a ser mostrados en pantalla de ahora en adelante');
        }else if(Datos.Comandos["^k"]){
            Send('Esta ')
        }
    }, false)

    /// Comando de memes randoms xdxd
    SetCommands(Datos.Comandos.meme, ()=>{
        Switch_Numero = Random(Datos.imagenes.memes.length)
        switch(Switch_Numero){case 0:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#33FFD7');break;case 1:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#4361C4');break;case 2:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#43BCC4');break;case 3:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#C70039');break;case 4:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#900C3F');break;case 5:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#566573');break;case 6:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#2589E6');break;case 7:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#B825E6');break;case 8:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#06529F');break;case 9:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#29292A');break;case 10:RichMeme(Datos.imagenes.memes[Switch_Numero],msg,'#E5C306');break;
        case 11: case 12: case 13: case 14: case 15: case 16: case 17: case 18: case 19: case 20: case 21: case 22: case 23: case 24: case 25: case 26: case 27: case 28: case 29: case 30: case 31: case 32: case 33: case 34: case 35: case 36: case 37: case 38: case 39: case 40: case 41: case 42: case 43: case 44: case 45: case 46: case 47: case 48: case 49: case 50: RichMeme(Datos.imagenes.memes[Switch_Numero], msg,'#2980B9');
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

    // Comando del numero de momos disponibles xd

    SetCommands(Datos.Comandos.momos, ()=>{
        msg.channel.send('Hay un total de ' + (Datos.imagenes.memes.length) + ' memes disponibles');
    });
    
    SetCommands('>> Avatar', ()=>{
        Avatar_Jugador(msg)
    });

    SetCommands('.nepes', ()=>{
        msg.author.user.ban({ reason: "por ser poto" })
    }, false)

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
                msg.content.length === 1780 ? Send(`El mensaje enviado por ${msg.author.tag} no podra ser mostrado en el canal ya que el mensaje supera los 1780 caracteres, los maximos que soporta este bot.`) : Send(`**--------- Se borro un mensaje ---------**\n-\nDe: [" **@${msg.author.tag}** "]\n-\nContenido: ${msg.content.substring(0, 1780)}`);
                
            }
        }else if(Datos.Comandos["^k"] === false){
            Send('Error. Los mensajes eliminados actualmente, no podran ser mostrados en pantalla. Puedes reiniciar este sistema con el comando `"k^T"`')
        }else{
            Send('Error desconocido. No se podra mostrar en pantalla el mensaje eliminado por el usuario **' + msg.author.tag + '**')
        }
    }, 3000);

});

/// Token del bot
bot.login(Datos.Token);
