import express from "express";
const router = express.Router();

// Hardcoded login credentials
const userCredentials = {
    email: "laura.heisenberg@polizei-friedrichshain21.de",
    password: "gr3t@07102012MAIL"
};



// Routes
router.get("/", (req, res) => {
    res.render("login", { error: null });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    if (email === userCredentials.email && password === userCredentials.password) {
      res.render("emails", { emails });
    } else {
      res.render("login", { error: "Invalid email or password." });
    }
  });
  

export default router;
