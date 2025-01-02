export const createCamValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: 'Name is required.'
        },
        isLength: {
            options: { max: 255 },
            errorMessage: 'Name cannot be longer than 255 characters.'
        },
    },
}
