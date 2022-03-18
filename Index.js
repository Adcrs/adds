//by adcrs i am a inntermidiate scripter im good at lua in bad at js so dont ask why code is so messed and bad
const {
    Client,
    Intents,
    MessageEmbed
} = require("discord.js");
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    getVoiceConnection
} = require("@discordjs/voice");
const {
    addSpeechEvent
} = require("discord-speech-recognition");


const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
});
addSpeechEvent(client);

client.on("messageCreate", (msg) => {
    const content = msg.content.toLowerCase()
 
    if (!msg.channel.type === 'DM') return false

    if (content == "ben wanna talk?") {
        const voiceChannel = msg.member?.voice.channel;
        if (voiceChannel) {
            joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                selfDeaf: false,
            });

 				const connection = getVoiceConnection(msg.guild.id)
            const player = createAudioPlayer();
            const resource = createAudioResource(    "./Sounds/Ben.mp3",);
            async function play() {
                await player.play(resource)
                connection.subscribe(player);
            }


            play()

        } else {
            msg.channel.send("Ben cant work he grumy,join the voice channel")
        }
    }

    if (content == "ben help") {


        const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('TIP! ben takes 2-3 seconds to process your voice ')
            .setURL('https://discord.gg/jExcmbpw')
            .setAuthor({
                name: 'Ben',
                iconURL: 'https://cdn.discordapp.com/attachments/953998048537755658/954253812154122270/Z.png',
                url: 'https://www.google.com'
            })
            .setDescription('Ben helps')

            .addFields({
                name: 'ben help',
                value: 'sends help'
            }, {
                name: 'leave + "ur chat/question"',
                value: 'Ask him to leave vc',
                inline: true
            }, {
                name: 'ben wanna talk?',
                value: 'join a vc to talk with ben',
                inline: true
            }, {
                name: 'hello + "ur chat/question"',
                value: 'Ask him question',
                inline: true
            }, )


            .setTimestamp()
            .setFooter({
                text: 'Insert ben',
                iconURL: 'https://cdn.discordapp.com/attachments/953998048537755658/954253812154122270/Z.png'
            });

        msg.channel.send({
            embeds: [exampleEmbed]
        });

    }
});
var randoms = [
    "./Sounds/hoho.mp3",
   
    "./Sounds/yes.mp3",
    "./Sounds/no.mp3",
    "./Sounds/ugh.mp3"
]
client.on("speech", (msg) => {
    if (msg.content) {




        var msg1 = msg.content.toLowerCase();

        if (msg1.includes("hello")) {
            const Response = Math.floor(Math.random() * randoms.length);

            console.log("Got Prom")
            const connection = getVoiceConnection(msg.guild.id)
            const player = createAudioPlayer();
            const resource = createAudioResource(randoms[Response]);
            async function play() {
                await player.play(resource)
                connection.subscribe(player);
            }


            play()

        }
        if (msg1.includes("leave")) {

         const connection = getVoiceConnection(msg.guild.id)
            console.log("left")
     
 			 connection.destroy()

        }
    }



});

client.on("ready", () => {
    console.log("Ready!");
    client.user.setActivity('IShowSPEED and adcrs', { type: 'WATCHING' });
});

client.login("OTUzOTkzMTAwNzE4NjY5ODM0.YjMpTw.nxpJ9vPqrjrMS28Lci1FCIEaD_A");