export default function clientDebugger(client){
    client.on('ready', () => {
        console.log('Ngubalan SmartChat Siap.');
    });
    
    client.on('disconnected', (reason) => {
        console.log('Client was logged out', reason);
    });
}