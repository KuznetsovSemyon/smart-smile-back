const { body } = require('express-validator');

exports.signup = [
    body('name')
        .exists()
        .withMessage('is required')
        .bail()

        .isLength({ min: 2, max: 50 })
        .withMessage('must be between 2 and 180 characters long')
        .bail()

        .matches(/^[A-Za-zА-Яа-я\s]*$/)
        .withMessage('is invalid')
        .bail(),
    body('surname')
        .exists()
        .withMessage('is required')
        .bail()

        .isLength({ min: 2, max: 50 })
        .withMessage('must be between 2 and 180 characters long')
        .bail()

        .matches(/^[A-Za-zА-Яа-я\s]*$/)
        .withMessage('is invalid')
        .bail(),
    body('password')
        .exists()
        .withMessage('is required')
        .bail()

        .isLength({ min: 6, max: 180 })
        .withMessage('must be between 6 and 180 characters long')
        .bail()

        .isString()
        .withMessage('is invalid')
        .bail()

        .custom((password) => !/\s/.test(password))
        .withMessage('spaces are not allowed')
        .bail(),
    body('confirmPassword')
        .exists()
        .withMessage('is required')
        .bail()

        .isLength({ min: 6, max: 180 })
        .withMessage('must be between 6 and 180 characters long')
        .bail()

        .isString()
        .withMessage('is invalid')
        .bail()

        .custom((confirmPassword) => !/\s/.test(confirmPassword))
        .withMessage('spaces are not allowed')
        .bail(),
    body('email')
        .exists()
        .withMessage('is required')
        .bail()

        .isEmail()
        .withMessage('is invalid')
        .bail(),
    body('gender')
        .exists()
        .withMessage('is required')
        .bail()

        .isIn(['Mr', 'Mrs'])
        .withMessage('does not exist')
        .bail(),
    body('role')
        .exists()
        .withMessage('is required')
        .bail()

        .isString()
        .withMessage('is invalid')
        .bail(),
    body('country')
        .exists()
        .withMessage('is required')
        .bail()

        .isLength({ min: 2, max: 180 })
        .withMessage()
        .bail()

        .matches(/^[А-Яа-я\s]*$/)
        .withMessage('is invalid')
        .bail(),
    body('city')
        .exists()
        .withMessage('is required')
        .bail()

        .isLength({ min: 2, max: 180 })
        .withMessage('must be between 2 and 180 characters long')
        .bail()

        .matches(/^[А-Яа-я\s\d]*$/)
        .withMessage('is invalid')
        .bail(),
    body('educationInstitution')
        .exists()
        .withMessage('is required')
        .bail()

        .isLength({ min: 2, max: 180 })
        .withMessage('must be between 2 and 180 characters long')
        .bail()

        .matches(/^[А-Яа-я№"\s\d]*$/)
        .withMessage('is invalid')
        .bail(),
    body('birthday')
        .exists()
        .withMessage('is required')
        .bail()

        .isInt()
        .withMessage('is invalid')
        .bail()

        .isInt({ min: 0 })
        .withMessage('must be greater than 0')
        .bail(),
    body('isTermsAccepted')
        .exists()
        .withMessage('is required')
        .bail()

        .isBoolean()
        .withMessage('is invalid')
        .bail(),
]