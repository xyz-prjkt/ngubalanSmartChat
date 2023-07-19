const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

let rejectCalls = true;

const client = new Client({
    authStrategy: new LocalAuth()
});

client.initialize();

client.on('loading_screen', (percent) => {
    console.log('Tunggu Sebentar...', percent,'%');
});

client.on('qr', (qr) => {
    console.log('Auth QR di Whatsapp App');
    qrcode.generate(qr, {small:true})
});

client.on('authenticated', () => {
    console.log('Berhasil di Authentikasi');
});

client.on('auth_failure', msg => {
    console.error('Authentikasi Gagal', msg);
});

client.on('ready', () => {
    console.log('Ngubalan SmartChat Siap.');
});

client.on('message', async msg => {

    if (process.env.TYPE = 'debug'){
        console.log('Pesan Masuk: ', msg);
    }

    if (msg.body === '.tes') {
        client.sendMessage(msg.from, 'aman...')
    } else {
        client.sendMessage(msg.from, "Selamat Datang di Ngubalan SmartChat")
    }
});

client.on('call', async (call) => {
    console.log('Call received, rejecting. GOTO Line 261 to disable', call);
    if (rejectCalls) await call.reject();
});

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});