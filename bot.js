global.DEBUG = true;
global.Version = 0.4;

const { AkairoClient } = require('discord-akairo');
const client = new AkairoClient({
    ownerID: '108758603258712064',
    prefix: '?',
    allowMention: false,
    handleEdits: true,
    blockBots: false,
    commandDirectory: './commands/',
    inhibitorDirectory: './inhibitors/',
    listenerDirectory: './listeners'
    },{
        disableEveryone: true
    },
);

//Discord bot token

var token;
//Prod Token
if(global.DEBUG)
{
    token = "NjU1NjQ5NjM4ODExOTU5MzA2.XfXLVg.ZfAmDtKESvdks-C9rb8Wtl3_-x0";
}
else
{
    token = "NjUzMjY4NDA4NjE5NDk5NTUz.Xe0i3g.jvwg8Y__9_7csjbFCl0Ei2leHAc";
}
client.login(token);

client.InviteLink = '';

client.DebugChannel = null;

global.InviteLink = null;


//Cleaup on exit.
process.stdin.resume();//so the program will not close instantly

async function exitHandler(options, exitCode)
{
    if (options.cleanup)
    {
        console.log("exiting");
        var statusEmbed =
        {
            embed:
            {
                color: 15158332,
                title: "OFFLINE",
                description: "I'm Dead!",
                fields: [{name:"Reason", value:options.reason}]
            }
        };
        await client.DebugChannel.send(statusEmbed);
        await client.destroy();
    }
    if (options.reason == "RELOAD")
    {
        client.commandHandler.reloadAll();
    }
    //if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
}

// //do something when app is closing
// process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {cleanup:true, exit:true, reason:"EXITED"}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:false, cleanup:false, reason:"RELOAD"}));
//process.on('SIGUSR2', exitHandler.bind(null, {exit:true, cleanup:true}));

// //catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));