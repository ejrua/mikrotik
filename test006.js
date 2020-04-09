var MikroNode = require('mikronode');

var connection = new MikroNode.Connection('200.116.207.26', 'api', 'Ejrua2517', {
    timeout : 4,
    closeOnDone : true,
    closeOnTimeout : true,
});

connection.on('error', function(err) {
    console.error('Error: ', err);
});