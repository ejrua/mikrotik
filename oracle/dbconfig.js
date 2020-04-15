// module.exports = {
//     user: "U73147678",
//     password: process.env.NODE_ORACLEDB_PASSWORD,
//     connectString:"172.16.20.3/coaceded"
// };
module.exports = {
    user : process.env.NODE_ORACLEDB_USER || "U73147678",
    
    password : process.env.NODE_ORACLEDB_PASSWORD || "KmyIva57",
    
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "190.248.29.148:1521/coaceded",
    
    externalAuth : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
    };