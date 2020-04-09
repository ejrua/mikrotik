var MikroNode = require('mikronode');
var Device =new MikroNode('200.116.207.26');
console.log('Getting Packages1');
Device.connect().then(([login])=>login('api','Ejrua2517',{
    timeout : 4,
    closeOnDone : true,
    closeOnTimeout : true,
    tls:false
})).then(function(conn) { 
    var chan=conn.openChannel();
    console.log('Getting Packages');
});