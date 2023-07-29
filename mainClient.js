import WhatsAppWeb from "whatsapp-web.js";
import clientAuth from "./lib/client/clientAuth.js";
import clientHandler from "./lib/client/clientHandler.js";
import clientDebugger from "./lib/client/clientDebugger.js";
import clientAPI from "./lib/client/clientAPI.js";

export var { Client, LocalAuth, MessageMedia } = WhatsAppWeb;

export var client = new Client({
  authStrategy: new LocalAuth(),
});

clientAPI();
clientAuth(client);
clientDebugger(client);
clientHandler(client);
