import { MessageMedia } from '../../mainClient.js';
import { dateTimeFormat } from '../utils/commonUtils.js';
import { createSK } from '../utils/docsUtils.js'

export default function clientHandler(client){
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
}