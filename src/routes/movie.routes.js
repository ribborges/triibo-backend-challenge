import { getMovie, postMovie, putMovie, deleteMovie } from '#root/controllers/movie.js';

export default (router) => {
    /**
     * @api {get} /movies Get a movie by ID
     * @apiGroup Movies
     * 
     * @apiParam (Query) {String} id Movie ID
     * 
     * @apiSuccess (Success 2xx) {String} status Status of the request
     * 
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "id": "acd123",
     *      "title": "The Hunger Games",
     *      "description": "Katniss Everdeen voluntarily takes her younger sister's place in the Hunger Games: a televised competition in which two teenagers from each of the twelve Districts of Panem are chosen at random to fight to the death.",
     *      "year": "2012",
     *      "info": { *OMDB data excluding Title, Year, and Plot fields* }
     * }
     * 
     * @apiError (Error 4xx) BadRequest The <code>id</code> was not provided
     * @apiError (Error 4xx) MovieNotFound The <code>id</code> of the Movie was not found
     * 
     * @apiErrorExample {json} Error: Bad Request
     * HTTP/1.1 400 Bad Request
     * {
     *      "status": "Bad request"
     * }
     * 
     * @apiErrorExample {json} Error: Movie Not Found
     * HTTP/1.1 404 Not Found
     * {
     *      "status": "No movie found"
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
    router.get("/movies", getMovie);

    /**
     * @api {post} /movies Create a movie
     * @apiGroup Movies
     * 
     * @apiBody {String} title Movie title 
     * @apiBody {String} description Movie description
     * @apiBody {String} year Movie year
     * 
     * @apiSuccess (Success 2xx) {String} status Status of the request
     * 
     * @apiSuccessExample {json} Success
     * HTTP/1.1 201 Created
     * {
     *      "status": "New movie added successfully",
     *      "id": "acd123"
     * }
     * 
     * @apiError (Error 4xx) BadRequest The <code>title</code>, <code>description</code>, or <code>year</code> was not provided
     * 
     * @apiErrorExample {json} Error: Bad Request
     * HTTP/1.1 400 Bad Request
     * {
     *      "status": "Bad request"
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
    router.post("/movies", postMovie);

    /**
     * @api {put} /movies/:id Update a movie by ID
     * @apiGroup Movies
     * 
     * @apiParam (Query) {String} id Movie ID
     * 
     * @apiBody {String} title Movie title
     * @apiBody {String} description Movie description
     * @apiBody {String} year Movie year
     * 
     * @apiSuccess (Success 2xx) {String} status Status of the request
     * 
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "Movie updated successfully"
     * }
     * 
     * @apiError (Error 4xx) BadRequest The <code>id</code>, <code>title</code>, <code>description</code>, or <code>year</code> was not provided
     * 
     * @apiErrorExample {json} Error: Bad Request
     * HTTP/1.1 400 Bad Request
     * {
     *      "status": "Bad request"
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
    router.put("/movies", putMovie);

    /**
     * @api {delete} /movies/:id Delete a movie by ID
     * @apiGroup Movies
     * 
     * @apiParam (Query) {String} id Movie ID
     * 
     * @apiSuccess (Success 2xx) {String} status Status of the request
     * 
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "Movie "abc123" deleted successfully"
     * }
     * 
     * @apiError (Error 4xx) BadRequest The <code>id</code> was not provided
     * 
     * @apiErrorExample {json} Error: Bad Request
     * HTTP/1.1 400 Bad Request
     * {
     *      "status": "Bad request"
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
    router.delete("/movies", deleteMovie);
}