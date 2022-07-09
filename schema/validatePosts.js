const { object, string , array, number } = require("yup");

// validation for creating new post
const postSchema = object ({
    body: object ({
        userName: string().min(2).max(70)
        .required("Username is required")
        .typeError("Username too short"),

        imageUrl: string().url("invalid url")
        .required("image url is required"),

        typeOfAstrography: string().min(5).max(9)
        .required("input is required"), 

        equipment: object({
            camera: string().required("input is required"),
            mount: string().required("input is required"),
            telescope: string().required("input is required"),
        }),

        processingData: array().of(string().required("input is required")),

        calibrationFrame: array().of(string().required("input is required")),
        
        location: object({
            latitude: number().required("please enter a number"),
            longitude: number().required("please enter a number"),
        }),
    })
})

// validation for updating new post
const updateSchema = object ({
    body: object ({
        userName: string().min(2).max(70)
        .required("Username is required")
        .typeError("Username too short"),

        imageUrl: string().url("invalid url")
        .required("image url is required"),

        typeOfAstrography: string().min(5).max(9)
        .required("input is required"), 

        equipment: object({
            camera: string().required("input is required"),
            mount: string().required("input is required"),
            telescope: string().required("input is required"),
        }),

        processingData: array().of(string().required("input is required")),

        calibrationFrame: array().of(string().required("input is required")),
        
        location: object({
            latitude: number().required("please enter a number"),
            longitude: number().required("please enter a number"),
        }),
    }),
    params: object({
        _id: string().required("_id is required")
        .typeError("invalid _id")
    })
})

module.exports = {
    postSchema,
    updateSchema,
}



