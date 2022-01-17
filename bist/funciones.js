class Comandos{
    constructor(msgObject){
        this.msgObject = msgObject;
        return {
            LlamarComando: (comando = "!HM", fn = ()=>{this.msgObject.channel.send('Hola mundo :D')}, bool = true)=>{
                if(bool === true){
                    if(this.msgObject.content.includes( comando )){
                        fn()
                    }
                }else{
                    if(this.msgObject.content.startsWith( comando )){
                        fn()
                    }
                }
            },
            EnviarMensaje: (msg)=>{
                this.msgObject.channel.send(msg);
            }
        }
    }
}

module.exports = {
    Comandos,
    Random: (numero)=>{return Math.floor(Math.random() * numero)}
}
