const RosApi = require('node-routeros').RouterOSAPI;

const conn = new RosApi({
    host: '200.116.207.26',
    user: 'api',
    password: 'Ejrua2517',
});

conn.connect()
    .then(() => {
        // Connection successful

        // Let's add an IP address to ether2
        conn.write('/ip/address/add', ['=interface=ether2', '=address=192.168.90.1'])
            .then(data => {
                console.log('192.168.90.1 added to ether2!', data);

                // Added the ip address, let's print it
                return conn.write('/ip/address/print', ['?.id=' + data[0].ret]);
            })
            .then(data => {
                console.log('Printing address info: ', data);

                // We got the address added, let's clean it up
                return conn.write('/ip/address/remove', ['=.id=' + data[0]['.id']]);
            })
            .then(data => {
                console.log('192.168.90.1 as removed from ether2!', data);

                // The address was removed! We are done, let's close the connection
                conn.close();
            })
            .catch(err => {
                // Oops, got an error
                console.log(err);
            });
    })
    .catch(err => {
        // Got an error while trying to connect
        console.log(err);
    });