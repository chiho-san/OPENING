const { MessageEmbed } = require('discord.js');
const config = require('../ConfigJSON.json')
module.exports = {
    name: 'Quitar_Ban',
    category: 'moderacion',
    _init: (msg)=>{
        const Embed = new MessageEmbed()
        .setTitle(config.Alertas.Ayuda.Titulo)
        .setDescription(config.Alertas.Ayuda.Descripcion)

        /// Aqui viene lo pro

        .addFields(
            // Comando ">> Ban"
            {name:
                config.Comandos.aBan,
            value: "Esta tarea tiene dos parametros, el primero es la mencion a la persona quien recibira el Ban y el segundo es una razón por la cual sera baneado. Este comando solo esta disponible para los roles de **Owner**, **Moderador** y **Banw**."
            },
            // Comando ">> meme"
            {
                name: config.Comandos.meme,
                value: "Tiene un total de " + config.imagenes.memes.length + " memes guardados en el comando. Disfruta de esos " + config.imagenes.memes.length + " memes!"
            },
            // Acerca del "Rastreador de mensajes eliminados"
            {
                name: 'Detección de mensajes borrados',
                value: 'Este no es un comando, es un **Tarea** automatica que se dispara cuando un mensaje se elimina ( Solo funciona con los mensajes que son mandados despues de que este bot se haya unido al Servidor ), ejecuta la **Tarea** de mandar un mensaje al canal donde se a eliminado el mensaje y el mensaje lleva el Nombre del usuario que elimino el mensaje y tambien el contenido del mensaje. Esta **Tarea** solo funciona para los mensajes recientes despues de que este bot se haya unido al servidor.'
            },
            // Comando momos
            {
                name: '>> momos',
                value: 'Muestra el numero de memes que hay guardados en el comando **">> memes"**.'
            },
            // Comando de revision del "Rastreador de mensajes eliminados"
            {
                name: '^k',
                value: 'Este comando mostrara si el **"Rastreador de mensajes eliminados"** esta activada o desactivada. Si esta activada mandara un mensaje diciendo que esta opcion ya esta activada globalmente de lo contrario si no esta activada, mandara un mensaje dando instrucciones de como activar el "Rastreador de mensajes" y tambien mencionara que la opción esta desactivada.'
            },
            // Comando de reversion del "Rastreador de mensajes"
            {
                name: 'k^T',
                value: 'Si el **"Rastreador de mensajes eliminados"** esta desactivado, puedes activarla con este comando.'
            }
        )

        /// Se acaba lo pro
        .setThumbnail('https://media.discordapp.net/attachments/930226948083441695/930960837030588416/Comando_Imagen.png?width=722&height=406')
        .setColor(config.Alertas.Ayuda.Color);

        msg.channel.send({ embeds: [Embed] });
    }
