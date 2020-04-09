var api = require('mikronode2');

var connection = new api('200.116.207.26','api','Ejrua2517');
connection.connect(function(conn) {

   conn.closeOnDone(true); // All channels need to complete before the connection will close.
   var listenChannel=conn.openChannel();
   listenChannel.write('[/tool/sniffer/quick',function(chan) {
      chan.on('read',function(data) {
         packet=api.parseItems([data])[0];
         console.log('Interface change: '+JSON.stringify(packet));
      });
   });

   var actionChannel=conn.openChannel();
   // These will run synchronsously
   actionChannel.write(['/tool/sniffer/quick','=port=420','=disabled=yes']); // don't care to do anything after it's done.
   actionChannel.write(['/tool/sniffer/quick','=port=420','=disabled=no']); // don't care to do anything after it's done.
   actionChannel.write('/tool/sniffer/quick',function(chan) {
      chan.on('done',function(data) {
         packets=api.parseItems(data);
         packets.forEach(function(packet) {
             console.log('Interface: '+JSON.stringify(packet));
         });
         listenChannel.close(); // This should call the /cancel command to stop the listen.
      });
   });
   actionChannel.close(); // The above commands will complete before this is closed.
});