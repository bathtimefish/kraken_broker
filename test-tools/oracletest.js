const oracledb = require('oracledb');

/*
 *  create table temperature (id NUMBER GENERATED by default on null as IDENTITY, name varchar(100), \
 *  internal int, external int, factory varchar(100), \
 *  created timestamp DEFAULT CURRENT_TIMESTAMP, primary key (id));
 * 
 *  insert into temperature (id, name, internal, external, factory, created) values (null, 'robot_arm', 80, 50, 'KOBE', sysdate);
 * 
 */

const main = async () => {
  try {
    oracledb.initOracleClient({libDir: '/Users/btf/.Oracle/instantclient_19_8'});
    const pool = await oracledb.createPool({
      events: true,
      user: "ADMIN",
      password: "1qaZxsw23edc",
      connectString: 'db202010251552_medium',
    });
    const conn = await pool.getConnection();
    const v = {
      name: 'robot_arm',
      internal: 85,
      external: 40,
      factory: 'KOBE',
    };
    const sqltext = `insert into temperature (id, name, internal, external, factory, created)
     values (null, '${v.name}', ${v.internal}, ${v.external}, '${v.factory}', sysdate)`;
    let result = await conn.execute(sqltext);
    console.log(result);
    await conn.commit();
    result = await conn.execute('select * from temperature');
    console.log(result);
    await conn.release();
  } catch (err) {
    console.error('Whoops!');
    console.error(err);
    process.exit(1);
  }
}

main();
