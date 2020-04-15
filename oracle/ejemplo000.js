const oracledb = require('oracledb')
// const config = {
//   user: 'U73147678',
//   password: 'KmyIva57',
//   connectString: '190.248.29.148:1521/coaceded'
// }
let conexion = oracledb.getConnection(
    {
      user          : "U73147678",
      password      : "KmyIva57",
      connectString : "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = 190.248.29.148)(PORT = 1521))(CONNECT_DATA =(SID= coaceded)))"
    })


async function getEmployee (empId) {
  let conn
   console.log("Pasa x Aqui!") 
  try {
    console.log("Pasa x Aqui!1")  
 //   conn = await oracledb.getConnection(config)
    conn = await conexion
    const result = await conn.execute(

      'select * from employees where employee_id = :id',
      [empId]
      
    )

    console.log(result.rows[0])
  } catch (err) {
    console.log('Ouch!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
}

getEmployee(101)