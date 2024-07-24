export const getQuestionsQuery = "SELECT * FROM random_questions($1)"

export const getQuestionsWithFilterQuery = `
    SELECT * FROM questions
    WHERE year_q = ($1)
    AND session_q = ($2)
    AND specialization = ($3)
`

export const addQuestionQuery = `
    INSERT INTO questions (
        question,
        options_q,
        answer,
        flag_q,
        year_q,
        session_q,
        specialization,
        image
    ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8 
    )
`
