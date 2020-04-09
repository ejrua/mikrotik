var MikroNode = require('mikronode-ng2');

var connection = MikroNode.getConnection('200.116.207.26','api','Ejrua2517');
connection.closeOnDone = true;

connection.connect(function(conn) {
	var chan=conn.openChannel("firewall_connections",true);
	chan.closeOnDone = true;
    chan.write('/ip/firewall/print', function(c) {
       c.on('trap',function(data) {
          console.log('Error setting IP: '+data);
       });
       c.on('done',function(data) {
          console.log('IP Set.');
       });
    });
//  });

// connection.getConnectPromise().then(function(conn) {
// 	conn.getCommandPromise('/interface/monitor-traffic',{
//       'interface':'ether1',
//       'once':true
//       })
//       .then(function resolved(values) {
// 		   console.log('Addreses: ' + JSON.stringify(values));
// 	      }  , function rejected(reason) {
// 		         console.log('Oops: ' + JSON.stringify(reason));
// 	      });
//       })