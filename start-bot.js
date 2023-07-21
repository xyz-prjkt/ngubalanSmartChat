const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const dotenv = require('dotenv');

const PDFLib = require('pdf-lib');
const PDFDocument = PDFLib.PDFDocument;

dotenv.config();

async function createSK(filename, name, work, address){

    const pdfData = await fs.readFileSync('./templates/SKLurahCamat.pdf');
    const pdfDoc = await PDFDocument.load(pdfData);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    firstPage.drawText(name, { x: 300, y: height / 2 + 300, size: 10 });
    firstPage.drawText(work, { x: 300, y: height / 2 + 310, size: 10 });
    firstPage.drawText(address, { x: 300, y: height / 2 + 320, size: 10 });

    fs.writeFileSync(process.env.DATA_DIR + 'SK/' + filename + '.pdf', await pdfDoc.save());
}

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
    } else if (msg.body === '1'){
        client.sendMessage(msg.from, 'Masukkan Data dibawah sesuai format dibawah ini, \n.REGSK NAMA_LENGKAP,PEKERJAAN,ALAMAT\nKirim data tersebut dengan me-reply pesan ini.');
    } else if (msg.body.includes('.REGSK')){
        const regexSK = /\.REGSK\s+(.*?),(.*?),(.*?)$/;
        const userData = regexSK.exec(msg.body); 
        if (userData){
            const filename = 'SK_' + userData[1] + '_' + dateFormatSK();
            await createSK(
                filename,
                userData[1],
                userData[2],
                userData[3]
            );
            const getDoc = MessageMedia.fromFilePath(process.env.DATA_DIR + 'SK/' + filename + '.pdf');
            client.sendMessage(msg.from, getDoc, {
                caption: 'Ini Surat Keterangannya.'
            });
        } else {
            client.sendMessage(msg.from, "Perintah .REGSK: Tidak Sesuai Format")
        }
    } else {
        client.sendMessage(msg.from, "Selamat Datang di Ngubalan SmartChat\n1. Buat Surat Keterangan")
    }
});

client.on('call', async (call) => {
    console.log('Call received, rejecting. GOTO Line 261 to disable', call);
    if (rejectCalls) await call.reject();
});

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});

function dateFormatSK() {
    const currentDate = new Date();
  
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  
    const customFormat = `${hours}${minutes}${day}${month}${year}${seconds}`;
  
    return customFormat;
}