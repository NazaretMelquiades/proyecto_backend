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
    SET username = $2, email = $3, password = $4
    WHERE email = $1`,
    deleteUser: `
    DELETE FROM users 
    WHERE email = $1`,
    logIn: `
    UPDATE users
    SET logged = true
    WHERE email =$1
    RETURNING *`,
    logOut: `
    UPDATE users
    SET logged = false
    WHERE email =$1
    RETURNING *`
}

module.exports = queries;