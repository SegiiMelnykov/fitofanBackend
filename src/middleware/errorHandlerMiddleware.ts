import ApiError from "../error/ApiError"; 

export default function errorHandlerMiddleware(err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message })
    }
    return res.status(500).json({ message: 'somthing went wrong, try again later :(' })
} 