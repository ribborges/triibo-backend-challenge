import { login, register, logout } from "#root/controllers/auth.js";
import { isAuth } from "#root/middleware/auth";

export default (router) => {
    /**
     * @api {post} /api/auth/login Login
     * @apiGroup Auth
     * @apiDescription Logs the user in
     * @apiVersion 1.0.0
     * 
     * @apiBody {String} email User email
     * @apiBody {String} password User password
     * 
     * @apiSuccess (Success 2xx) {String} status Status of the request
     * 
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "Login successful",
     *      "id": "abc123"
     * }
     * 
     * @apiError (Error 4xx) BadRequest The <code>email</code> or <code>password</code> was not provided
     * @apiError (Error 4xx) NotFound The user was not found
     * @apiError (Error 4xx) Unauthorized The password is incorrect
     * 
     * @apiErrorExample {json} Error: Bad Request
     * HTTP/1.1 400 Bad Request
     * {
     *      "status": "Bad request"
     * }
     * 
     * @apiErrorExample {json} Error: Not Found
     * HTTP/1.1 404 Not Found
     * {
     *      "status": "User not found"
     * }
     * 
     * @apiErrorExample {json} Error: Unauthorized
     * HTTP/1.1 401 Unauthorized
     * {
     *      "status": "Unauthorized"
     * }
     * 
     * @apiError (Error 5xx) InternalServerError An error occurred while processing the request
     * 
     * @apiErrorExample {json} Error: Internal Server Error
     * HTTP/1.1 500 Internal Server Error
     * {
     *      "status": "Internal server error"
     * }
     */
    router.post("/auth/login", login);

    /**
     * @api {post} /api/auth/register Register
     * @apiGroup Auth
     * @apiDescription Registers a new user and logs them in
     * @apiVersion 1.0.0
     * 
     * @apiBody {String} email User email
     * @apiBody {String} password User password
     * 
     * @apiSuccess (Success 2xx) {String} status Status of the request
     * 
     * @apiSuccessExample {json} Success
     * HTTP/1.1 201 Created
     * {
     *      "status": "User created successfully",
     *      "id": "abc123"
     * }
     * 
     * @apiError (Error 4xx) BadRequest The <code>email</code> or <code>password</code> was not provided, password must be at least 8 characters long, the email is invalid, or the email already exists
     * 
     * @apiErrorExample {json} Error: Bad Request
     * HTTP/1.1 400 Bad Request
     * {
     *      "status": "Bad request"
     * }
     * 
     * @apiErrorExample {json} Error: Bad Request
     * HTTP/1.1 400 Bad Request
     * {
     *      "status": "Password must be at least 8 characters long"
     * }
     * 
     * @apiErrorExample {json} Error: Bad Request
     * HTTP/1.1 400 Bad Request
     * {
     *      "status": "Invalid email"
     * }
     * 
     * @apiErrorExample {json} Error: Bad Request
     * HTTP/1.1 400 Bad Request
     * {
     *      "status": "Email already exists"
     * }
     * 
     * @apiError (Error 5xx) InternalServerError An error occurred while processing the request
     * 
     * @apiErrorExample {json} Error: Internal Server Error
     * HTTP/1.1 500 Internal Server Error
     * {
     *      "status": "Internal server error"
     * }
     */
    router.post("/auth/register", register);

    /**
     * @api {post} /api/auth/logout Logout
     * @apiGroup Auth
     * @apiDescription Logs the user out (clears the token)
     * @apiVersion 1.0.0
     * 
     * @apiSuccess (Success 2xx) {String} status Status of the request
     * 
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "Logout successful"
     * }
     * 
     * @apiError (Error 5xx) InternalServerError An error occurred while processing the request
     * 
     * @apiErrorExample {json} Error: Internal Server Error
     * HTTP/1.1 500 Internal Server Error
     * {
     *      "status": "Internal server error"
     * }
     */
    router.post("/auth/logout", isAuth, logout);
}