var MikroNode = require('mikronode2');
 
var device = new MikroNode('200.116.207.26');
device.connect().then(([login])=>login('api','Ejrua2517')).then(function(conn) {
    console.log("Logged in."); 
   conn.closeOnDone(true); // when all channels are "done" the connection should close.
    

   var chan1=conn.openChannel("interface_listener");
   chan1.write('/interface/listen');
   console.log("/user/active/listen");
   chan1.data.subscribe(function(item) {
       var packet=MikroNode.resultsToObj(item.data);
       console.log('Interface change: '+JSON.stringify(packet));
   });

   // This should be called when the cancel is called below. (trap occurs first, then done)
   chan1.done.subscribe(function(packet) {
       // This should output everything that the above outputted.
       packet.data.forEach(function(data) {
           var packets=MikroNode.resultsToObj(data);
           console.log('Interface: '+JSON.stringify(packet));
       });
   });

   var chan2=conn.openChannel('config_interface');

   // added closeOnDone option to this call
   var chan3=conn.openChannel('enable_interface'); // We'll use this later.

   var chan4=conn.openChannel('getall_interfaces'); 

   chan2.write('/interface/set',{'disabled':'yes','.id':'ether3'});
   console.log("/interface/set");
   chan2.done.subscribe(function(items) {
       // We do this here, 'cause we want channel 4 to write after channel 3 is done.
       // No need to listen for channel3 to complete if we don't care.
       chan3.write('/interface/set',{'disabled':'no','.id':'ether3'});

       chan4.write('/interface/getall');
       console.log("/interface/getall");
       // Alternative (legacy) way of caturing when chan4 is done.
       chan4.on('done',function(packet) {
           packet.data.forEach(function(data) {
               var packets=MikroNode.resultsToObj(data);
               console.log('Interface: '+JSON.stringify(packet));
           });
           chan1.close(); // This should call the /cancel command to stop the listen.
       });
   });
});