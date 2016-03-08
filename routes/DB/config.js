//create connection here
var bluebird = require('bluebird');
var pgp = require('pg-promise')({promiseLib: bluebird});
var pg = require('pg');
if(process.env.DEPLOYED){
	var connectionString = {
    host: 'postgres', // server name or IP address; 
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'mysecretpassword'
};
}
else if(process.env.DATABASE_URL){
	pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});
}
else{
var connectionString = process.env.DATABASE_URL||"postgres://localhost:5432/edmodo";

}

//create new db instance
var db = pgp(connectionString);
module.exports = db;

//to test locally you must create a database 'wayd' in postgres

