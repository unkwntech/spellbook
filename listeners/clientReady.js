const { Listener } = require('discord-akairo');
const feats = require('../Data/Feats.js');
const items = require('../Data/Items.js');
const monsters = require('../Data/Monsters.js');
const spells = require('../Data/Spells.js');
const skills = require('../Data/Skills.js');

class ClientReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            eventName: 'ready'
        });
    }

    exec() {
        console.log('I\'m ready!');
        this.client.generateInvite(['SEND_MESSAGES', "READ_MESSAGES"]).then(link => this.client.InviteLink = link).catch(console.error);
        if(global.DEBUG)
        {
            this.client.DebugChannel = this.client.channels.get('657049087350145034'); //DEV BOT
            this.client.user.setPresence({game: {name: "Event Log", type: "WATCHING"}, status: "dnd"});
        }
        else
        {
            this.client.DebugChannel = this.client.channels.get('657049097643098115'); //PROD BOT
            this.client.user.setPresence({game: {name: "Scroll Organizer LIVE", type:"WATCHING"}, status: "online"});
        }

        var statusEmbed = {
            embed: {
                color: 3066993,
                title: "ONLINE",
                description: "I LIVE!",
                fields: [
                    { name: "Version", value:global.Version + (global.DEBUG?" DEBUG":"")},
                    { name: "Spells", value: spells.List.length, inline: true },
                    //{ name: "Feats", value: feats.List.length, inline: true },
                    { name: "Items", value: items.List.length, inline: true },
                    { name: "Monsters", value: monsters.List.length, inline: true },
                    { name: "Skills", value: skills.List.length, inline: true }
                ]
            }
            };
        this.client.DebugChannel.send(statusEmbed);
    }
}

module.exports = ClientReadyListener;