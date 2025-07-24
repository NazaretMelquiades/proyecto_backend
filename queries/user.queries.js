const queries = {
    signUpUser: `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3);`,
    getUserByEmail: `
    SELECT * FROM users 
    WHERE email = $1;`,
    getAllUser: `
    SELECT * FROM users;`,
    updateUser: `
    UPDATE users
    SET username = $1, email = $2, password = $3
    WHERE id = $4`,
    deleteUser: `
    DELETE FROM users 
    WHERE email = $1`,
    logIn: `
    UPDATE user 
    SET logged = true
    WHERE email =$1`,
    logOut: `
    UPDATE user
    SET logged = false
    WHERE email =$1`
}

module.exports = queries;