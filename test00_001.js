const fetch = require("node-fetch");
const RosApi = require("node-routeros").RouterOSAPI;

const conn = new RosApi({
    host: '200.116.207.26',
    user: 'api',
    password: 'Ejrua2517',
});

url = "http://190.248.29.148:3334/api/v1/netmovimiento"

conn.connect().then(() => {
    // Counter to trigger pause/resume/stop
    let i = 0;
    let ip = 0;
    // The stream function returns a Stream object which can be used to pause/resume/stop the stream
    const addressStream = conn.stream(['/ip/firewall/connection/print','=dst-address=172.16.20.250 '], (error, packet) => {
        // If there is any error, the stream stops immediately
        if (!error) {
            console.log(packet);
            
            // if(packet[0]['src-port']=='420' || packet[0]['src-port'].substring(1,4)=='3389'){
            //         console.log(packet[0]['tx'],packet[0]['rx'],packet[0]['src-port'],packet[0]['dst-address']);
                
            //     if((!(parseInt(packet[0]['tx'])<550 && parseInt(packet[0]['rx'])<=528) && (parseInt(packet[0]['tx'])>0 && parseInt(packet[0]['rx'])>0) ) || (parseInt(packet[0]['tx'])==0 && parseInt(packet[0]['rx'])==0)){
                    
            //         const dato = JSON.stringify({
            //             'srcaddress':packet[0]['src-address'],
            //             'srcport': packet[0]['src-port'],
            //             'dstaddress': packet[0]['dst-address'],
            //             'dstport': packet[0]['dst-port'],
            //             'tx': packet[0]['tx'],
            //             'rx': packet[0]['rx']
            //             });
            //     // console.log(dato);
            //         fetch(url, {
            //             headers: {
            //             'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU4NTk3NDUzMX0.tT6YQETvFICna-3zRRn3T-d6GJlgbEgIJHf7FYqSz90',
            //             'Content-Type': 'application/json; charset=utf-8'
            //                 },
            //             //    credentials: 'include',
            //                 mode: 'cors',
            //                 method: 'post',
            //                 body: dato,
            //                 })
            //         .catch(function (err) {
            //             console.log('node-fetch error: ', err)
            //         });

            //     } 
          
            // }  
            // // Increment the counter
            // i++;

        }else{
            console.log(error);
        }
    });


}).catch((err) => {
    // Got an error while trying to connect
    console.log(err);
});