const { Listener } = require('discord-akairo');

class ClientErrorListener extends Listener {
    constructor() {
        super('error', {
            emitter: 'client',
            eventName: 'error'
        });
    }

    exec()
    {
        console.log('Ahhh! Client Error!');
        //Lets just attempt to reconnect in 2 minutes
        retryTimer = setTimeout(function(){client.login(_TOKEN);}, 120000);
    }
}

module.exports = ClientErrorListener;