import qrcode from 'qrcode-terminal';
import dotenv from 'dotenv';

export default function clientAuth(client){

    dotenv.config();

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
    
    client.initialize();

}