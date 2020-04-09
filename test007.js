var MikroNode = require('mikronode-ng2');

var connection = MikroNode.getConnection('200.116.207.26','api','Ejrua2517');
connection.closeOnDone = true;

connection.connect(function(conn) {
	var chan=conn.openChannel();
	chan.closeOnDone = true;
    chan.write(['/ip/address/add','=interface=ether3','=address=172.16.20.250'], function(c) {
       c.on('trap',function(data) {
          console.log('Error setting IP: '+data);
       });
       c.on('done',function(data) {
          console.log('IP Set.');
       });
    });
 });