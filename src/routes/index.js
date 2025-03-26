import { Router } from "express";

import movie from "./movie.routes.js";
import auth from "./auth.routes.js";

const router = Router();

export default () => {
    movie(router);
    auth(router);

    return router;
}