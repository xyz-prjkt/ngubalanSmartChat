import WhatsAppWeb from 'whatsapp-web.js';
import clientAuth from './lib/client/clientAuth.js';
import clientHandler from './lib/client/clientHandler.js';
import clientDebugger from './lib/client/clientDebugger.js';

export var {
    Client,
    LocalAuth,
    MessageMedia
} = WhatsAppWeb;

var client = new Client({
    authStrategy: new LocalAuth()
});    

clientAuth(client);
clientDebugger(client);
clientHandler(client);