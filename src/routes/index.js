import { Router } from "express";

import movie from "./movie.routes.js";

const router = Router();

export default () => {
    movie(router);

    return router;
}