export const addUserQuery = `
    INSERT INTO users (
        firstName,
        lastName,
        email,
        password
    ) VALUES (
        $1,
        $2,
        $3,
        $4 
    )
`

export const findUserByEmailQuery = `
    SELECT * FROM users WHERE email = $1
`

export const changePasswordQuery = `
    UPDATE users
    SET password = $2
    WHERE email = $1
`