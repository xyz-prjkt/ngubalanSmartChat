import { createSK } from './lib/docsGenerator.js'
import { dateTimeFormat } from './lib/commonUtils.js';
import WhatsappWeb from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import dotenv from 'dotenv';

const { Client, LocalAuth, MessageMedia } = WhatsappWeb;

dotenv.config();

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
    
    if (msg.body === '.ping') {
        msg.getReactions();
    } else if (msg.body === '1'){
        client.sendMessage(msg.from, 'Masukkan Data dibawah sesuai format dibawah ini, \n.REGSK NAMA_LENGKAP,PEKERJAAN,ALAMAT\nKirim data tersebut dengan me-reply pesan ini.');
    } else if (msg.body.includes('.REGSK')){
        const regexSK = /\.REGSK\s+(.*?),(.*?),(.*?)$/;
        const userData = regexSK.exec(msg.body); 
        if (userData){
            await createSK(
                'SK_' + userData[1] + '_' + dateTimeFormat(),
                userData[1],
                userData[2],
                userData[3]
            );
            client.sendMessage(msg.from, MessageMedia.fromFilePath(process.env.DATA_DIR + 'SK/' + 'SK_' + userData[1] + '_' + dateTimeFormat() + '.pdf'), {
                caption: 'Ini Surat Keterangannya.'
            });
        } else {
            client.sendMessage(msg.from, "Perintah .REGSK: Tidak Sesuai Format");
            client.sendMessage(msg.from, MessageMedia.fromFilePath('./images/EXAMPLE_REGSK.png'),{
                caption: 'Berikut ini contoh penulisan format .REGSK yang benar.'
            });
        }
    } else {
        client.sendMessage(msg.from, "Selamat Datang di Ngubalan SmartChat\n1. Buat Surat Keterangan\nPilih menu dengan cara membalas pesan ini dengan no menu yang diinginkan")
    }
});

client.on('call', async (call) => {
    console.log('Call received, rejecting.', call);
    await call.reject();
});

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});