var MikroNode = require('mikronode2');
    
var device = new MikroNode('200.116.207.26');

device.connect()
  .then(([login])=>{
    return login('api','Ejrua2517');
  })
  .then(function(conn) {

    var chan=conn.openChannel("addresses"); // open a named channel
    var chan2=conn.openChannel("firewall_connections",true); // open a named channel, turn on "closeOnDone"

    chan.write('/ip/address/print');

    chan.on('done',function(data) {

         // data is all of the sentences in an array.
         data.forEach(function(item) {
            console.log('Interface/IP: '+item.data.interface+"/"+item.data.address);
         });

         chan.close(); // close the channel. It is not autoclosed by default.
         conn.close(); // when closing connection, the socket is closed and program ends.

    });

    chan2.write('/ip/firewall/print');

    // chan2.done.subscribe(function(data){

    //      // data is all of the sentences in an array.
    //      data.forEach(function(item) {
    //         var data = MikroNode.resultsToObj(item.data); // convert array of field items to object.
    //         console.log('Interface/IP: '+data.interface+"/"+data.address);
    //      });

    // });

});