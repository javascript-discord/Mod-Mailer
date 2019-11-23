config = require("./config.json")
discord = require("discord.js")
prefix = config.prefix
client = new discord.Client()
client.on("ready",()=>{
    console.log(`Signed in as ${client.user.tag}`)
    modChannel = client.channels.get("640652322417934347")
})
client.on("message",(message)=>{
    if(message.author.bot){
        return
    }
    if(message.channel.type == "dm"){
        user = client.users.get(message.author.id)
        if(user.isBanned == true){
            message.channel.send("You were banned from this bot! If you think this is a mistake ping ONE staff that is ONLINE in the server and tell them you think it is a mistake")
            return
        }
        if(user.message != undefined){
            user.message = message.content
            if(user.isBanned == true){
                retur
            }
            modChannel.send(`New message from ${user.tag} (${user.id})! Message: ${user.message}`)
            return
        }
        user.message = message
        message.channel.send("You're about to create a thread with Javascript staff. Do you want to continue?").then((msg)=>{
            msg.react("👍")
            msg.react("👎")
        })
    }
})
client.on("message",(message)=>{
    if(message.author.bot){
        return
    }
    if(message.channel.type == "dm"){
        return
    }
    if(message.channel.id == modChannel.id){
        if(message.content.startsWith(prefix + "reply")){
            args = message.content.slice(prefix.length).split(' ');
            suser = client.users.get(args[1])
            if(suser == undefined){
                message.channel.send(`User ${args[1]} not found`)
                return
            }
            if(args[2] == undefined){
                message.channel.send("You didn't write what you wanted to say")
                return
            }
            finalMessage = args.join(" ")
            finalMessage = finalMessage.replace("reply","")
            finalMessage = finalMessage.replace(args[1],"")
            if(suser.message == undefined){
                message.channel.send("That user doesn't have a thread open")
                return
            }
            suser.send(finalMessage)
            message.channel.send(`Sent ${finalMessage} to ${suser.tag}`)
        }
    }
})
client.on("message",(message)=>{
    if(message.author.bot){
        return
    }
    if(message.channel.type == "dm"){
        return
    }
    if(message.channel.id == modChannel.id){
        if(message.content.startsWith(prefix + "close")){
            args = message.content.slice(prefix.length).split(' ');
            suser = client.users.get(args[1])
            if(suser == undefined){
                message.channel.send(`User ${args[1]} not found`)
                return
            }
            finalMessage = new discord.RichEmbed()
            finalMessage.setTitle("Thread close")
            finalMessage.setDescription("This thread has been close. To start a new thread enter another message")
            if(suser.message == undefined){
                message.channel.send("That user doesn't have a thread open")
                return
            }
            suser.send(finalMessage)
            suser.message = undefined
            message.channel.send(`Closed thread for ${suser.tag}`)
        }
    }
})
client.on("message",(message)=>{
    if(message.author.bot){
        return
    }
    if(message.channel == "dm"){
        return
    }
    if(message.channel.id != modChannel.id){
        return
    }
    if(message.content.startsWith(prefix + "restrict")){
        args = message.content.slice(prefix.length)
        args = args.split(" ")
        user = args[1]
        user = client.users.get(user)
        if(user == undefined){
            message.channel.send("User not found")
            return
            
    }
    user.isBanned = true
    message.channel.send("Banned user sucessfully!")
    }
})
client.on("messageReactionAdd",(reaction,user)=>{
    if(user.id == client.user.id){
        return
    }
    if(!reaction.message.author.bot){
        return
    }
    if(reaction.message.channel.type != "dm"){
        return
    }
    if(reaction.emoji.name == "👍"){
        user = client.users.get(user.id)
        if(user.message == undefined){
            return
        }
        reaction.message.channel.send("Thread created")
        modChannel.send(`New message from ${user.tag} (${user.id})! Message: ${user.message}`).then((msg)=>{
            user.botMessage = msg
        })
    }else if(reaction.emoji.name == "👎"){
        reaction.message.channel.send("I will not send a message to staff")
        user = client.users.get(user.id)
        user.message = undefined
    }
})
client.login(process.env.TOKEN)
