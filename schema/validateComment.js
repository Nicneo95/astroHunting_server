const { object, string, number } = require ("yup");

// validation for creating comment
const postCommentSchema = object ({
    body: object ({
        comment: string().required("invalid input")
    }),
})

module.exports = {
    postCommentSchema,
}