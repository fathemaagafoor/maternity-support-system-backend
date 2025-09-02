const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/signin", signIn);

export default authRoutes;
