import { login, register, logout } from "#root/controllers/auth.js";

export default (router) => {
    router.post("/auth/login", login);
    router.post("/auth/register", register);
    router.post("/auth/logout", logout);
}