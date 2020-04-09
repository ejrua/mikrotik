var MikroNode = require('mikronode2');
 
var device = new MikroNode('200.116.207.26');
device.connect().then(([login])=>login('api','Ejrua2517')).then(function(conn) {
    console.log("Logged in."); 
   conn.closeOnDone(true); // when all channels are "done" the connection should close.
    

   var chan1=conn.openChannel();
  // chan1.write('/ip/firewall/connection/getall');
  // chan1.write('/tool/sniffer/quick',{'interface':'ether3','port':'420'});
   chan1.write('/tool/sniffer/quick',{'port':'420','ip-address':'172.16.20.250'});
   console.log("/user/active/listen");
   chan1.data.subscribe(function(item) {
       var packet=MikroNode.resultsToObj(item.data);
       dato = JSON.stringify(packet);
       
      
       if(packet.interface.substring(1,5) == 'l2tp'){
        console.log('Interface change: '+JSON.stringify(packet));
       }
       else{
        console.log(packet.interface,packet.interface.substring(1,5))
       }

      
   });

  // This should be called when the cancel is called below. (trap occurs first, then done)
   chan1.done.subscribe(function(packet) {
       // This should output everything that the above outputted.
       packet.data.forEach(function(data) {
           var packets=MikroNode.resultsToObj(data);
           console.log('Interface: '+JSON.stringify(packet));
       });
   });

//   var chan2=conn.openChannel("script");
  
//   // chan2.write('/interface/set',{'disabled':'yes','.id':'ether3'});
//   chan2.write('/system/script/scripts');
//   // console.log("/ip/address/print");
//    chan2.done.subscribe(function(items) {
//     var packet=MikroNode.resultsToObj(item.data);
//     console.log('firewall: '+JSON.stringify(packet));
//    });
});