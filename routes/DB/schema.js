var db = require('./config.js');


//Create a postgres db named 'wayd' prior to bringing server up - this file creates tables in this db


db.query(

  //Create users table
  "CREATE TABLE IF NOT EXISTS users (full_name VARCHAR(40),"
    + "user_name VARCHAR(40)," 
    + "id SERIAL PRIMARY KEY)"
  )
.then(function(){
   console.log('users created');

   //create events table
   return db.query("CREATE TABLE IF NOT EXISTS assignments (owner INTEGER,"
    + "question VARCHAR(1000),"
    + "due_date VARCHAR (100)," 
    + "category VARCHAR(40)," 
    + "FOREIGN KEY (owner) REFERENCES users(id),"
    + "id SERIAL PRIMARY KEY)"
   )
 })
.then(function(){
   console.log('assignments created');

   //create polls table
   return db.query("CREATE TABLE IF NOT EXISTS answers (student INTEGER,"
    + "assignment_id INTEGER,"
    + "answer VARCHAR(10000),"
    + "answer_date VARCHAR(100),"
    + "FOREIGN KEY (student) REFERENCES users(id),"
    + "FOREIGN KEY (assignment_id) REFERENCES assignments(id),"
    + "id SERIAL PRIMARY KEY)"
   )
 })
.then(function(){
   console.log('answers created');

   //create emails
   return db.query("CREATE TABLE IF NOT EXISTS stud_to_assign (student INTEGER,"
    + "assignment INTEGER,"
    + "FOREIGN KEY (student) REFERENCES users(id),"
    + "FOREIGN KEY (assignment) REFERENCES assignments(id)"
    + ")"
   )
 })
 
 .then(function(){
   console.log('connections created, database build completed');

 })

.catch(function(error){
  console.log('error creating tables');
  console.log(error);
});

