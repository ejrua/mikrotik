const RosApi = require("node-routeros").RouterOSAPI;

const conn = new RosApi({
    host: '200.116.207.26',
    user: 'api',
    password: 'Ejrua2517',
});


conn.connect().then(() => {
    // Counter to trigger pause/resume/stop
    let i = 0;

    // The stream function returns a Stream object which can be used to pause/resume/stop the stream
    const addressStream = conn.stream(['/tool/torch', '=interface=ether3','=src-address=172.16.20.250', '=dst-address=0.0.0.0/0','=port=0'], (error, packet) => {
        // If there is any error, the stream stops immediately
        if (!error) {
            if(packet[0]['src-port']==420 || packet[0]['src-port']==3389){
                console.log(packet[0]);
            } 
            

            // Increment the counter
            i++;

            // if the counter hits 30, we stop the stream
            // if (i === 30) {

            //     // Stopping the stream will return a promise
            //     addressStream.stop().then(() => {
            //         console.log('should stop');
            //         // Once stopped, you can't start it again
            //         conn.close();
            //     }).catch((err) => {
            //         console.log(err);
            //     });

            // } else 
            // if (i % 5 === 0) {

            //     // If the counter is multiple of 5, we will pause it
            //     addressStream.pause().then(() => {
            //         console.log('should be paused');

            //         // And after it is paused, we resume after 3 seconds
            //         setTimeout(() => {
            //             // addressStream.resume().then(() => {
            //             //     console.log('should resume');
            //             // }).catch((err) => {
            //             //     console.log(err);
            //             // });
            //         }, 3000);

            //     }).catch((err) => {
            //         console.log(err);
            //     });

            // }

        }else{
            console.log(error);
        }
    });

}).catch((err) => {
    // Got an error while trying to connect
    console.log(err);
});