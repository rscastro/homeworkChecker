SELECT * FROM assignments WHERE owner in (SELECT id from users where user_name=$1);