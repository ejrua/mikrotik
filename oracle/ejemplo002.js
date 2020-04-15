const oracledb = require('oracledb')

oracledb.getConnection(
    {
      user          : "U73147678",
      password      : "KmyIva57",
      connectString : "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = 190.248.29.149)(PORT = 1521))(CONNECT_DATA =(SID= coaceded)))"
    })
.then(function(conn) {
    return conn.execute(
    //   "SELECT department_id, department_name " +
    //     "FROM departments " +
    //     "WHERE manager_id < :id",
    //   [110]  // bind value for :id
    `SELECT  to_date(FECHASOLICITUD,'yyyy-mm-dd'),estado,count(1)
    FROM solicitudcred
    WHERE FECHASOLICITUD > to_date('2020/04/01','yyyy-mm-dd')
    GROUP BY  to_date(FECHASOLICITUD,'yyyy-mm-dd'),estado`
    )
      .then(function(result) {
        console.log(result.rows);
        return conn.close();
      })
      .catch(function(err) {
        console.error(err);
        return conn.close();
      });
  })
  .catch(function(err) {
    console.error(err);
  });