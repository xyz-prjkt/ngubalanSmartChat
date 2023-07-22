import { MessageMedia } from '../../mainClient.js';
import { dateTimeFormat } from '../utils/commonUtils.js';
import { createSK } from '../utils/docsUtils.js'

export default function clientHandler(client){
    client.on('message', async msg => {
        
        let chat = await msg.getChat();
        const mainMenu = "*Selamat Datang " + chat.name + ", di Ngubalan SmartChat*\n\n1. Informasi Alur Berkas Surat Nikah\n2. Informasi Alur Surat Keterangan Tidak Mampu\n3. Informasi Permohonan Kartu Keluarga\n4. Informasi Permohonan Akte Kelahiran\n5. Buat Surat Keterangan\n6. Live Chat\n\nPilih menu dengan cara membalas pesan ini dengan no menu yang diinginkan";

        if (process.env.TYPE = 'debug'){
            console.log('Pesan Masuk: ', msg);
        }

        if (msg.body === '.menu') {
            client.sendMessage(msg.from, mainMenu);
        } else if (msg.body === '1'){
            client.sendMessage(msg.from, MessageMedia.fromFilePath('./images/ALUR_SURATNIKAH.jpg'));
        } else if (msg.body === '2'){
            client.sendMessage(msg.from, MessageMedia.fromFilePath('./images/ALUR_SKTM.jpeg'));
        } else if (msg.body === '3'){
            client.sendMessage(msg.from, MessageMedia.fromFilePath('./images/ALUR_PENERBITANKK.jpg'));
        } else if (msg.body === '4'){
            client.sendMessage(msg.from, MessageMedia.fromFilePath('./images/ALUR_AKTE.jpg'));
        } else if (msg.body === '5'){
            client.sendMessage(msg.from, 'Ketik, \n.```REGSK NAMA_LENGKAP,PEKERJAAN,ALAMAT```\nIsi data sesuai format tersebut, lalu kirim pesan tersebut di nomor ini');
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
            const chat = await msg.getChat();
            if(!chat.isGroup){
                client.sendMessage(msg.from, mainMenu);
            }
        }
    });
    
    client.on('call', async (call) => {
        console.log('Call received, rejecting.', call);
        await call.reject();
        await client.sendMessage(call.from, "Mohon maaf, Ngubalan smartChat tidak dapat melayani anda melalui panggilan telepon")
    });
}