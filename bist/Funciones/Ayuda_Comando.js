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
            {name: config.Comandos.aBan, value: "Esta tarea tiene dos parametros, el primero es la mencion a la persona quien recibira el Ban y el segundo es una razón por la cual sera baneado"},
            {name: config.Comandos.meme, value: "Tiene un total de " + config.imagenes.memes.length + " memes guardados en el comando. Disfruta de esos " + config.imagenes.memes.length + "!"}
        )

        /// Se acaba lo pro
        .setThumbnail('https://media.discordapp.net/attachments/930226948083441695/930960837030588416/Comando_Imagen.png?width=722&height=406')
        .setColor(config.Alertas.Ayuda.Color);

        msg.channel.send({ embeds: [Embed] });
    }
}