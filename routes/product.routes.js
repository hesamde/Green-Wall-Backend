const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const saltRounds = 10;

// POST /auth/signup  - Creates a new user in the database
router.post("/signup", (req, res, next) => {
    const {name, email, password } = req.body;

// Check if name or password or name are provided as empty strings
if (name === "" || email === "" || password === "" ) {
    res.status(400).json({ message: "Provide name, email, password" });
    return;
}

    // This regular expression checks password for special characters and minimum length
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
if (!passwordRegex.test(password)) {
    res.status(400).json({
    message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
}
//if the user already exist
User.findOne({ name })
    .then((foundUser) => {
// If the user with the same email already exists, send an error response
    if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
    }

    // If email is unique, proceed to hash the password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create the new user in the database
    // We return a pending promise, which allows us to chain another `then`
    return User.create({ name , email , password: hashedPassword  });
    })
    .then((createdUser) => {
    // Deconstruct the newly created user object to omit the password
    // We should never expose passwords publicly
    const { name, email, password, _id } = createdUser;

    // Create a new object that doesn't expose the password
    const user = { name, email, password, _id };

    // Send a json response containing the user object
    res.status(201).json({ user: user });
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/signin", (req, res, next) => {
const { email, password } = req.body;

// Check if name or password are provided as empty string
if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
}

// Check the users collection if a user with the same name exists
User.findOne({ email })
    .then((foundUser) => {
    if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." });
        return;
    }

    // Compare the provided password with the one saved in the database
    const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

    if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, name, email, password, image } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, name, email, password, image  };

        // Create a JSON Web Token and sign it
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
        });

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
    } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
    }
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
// If JWT token is valid the payload gets decoded by the
// isAuthenticated middleware and is made available on `req.payload`
console.log(`req.payload`, req.payload);

// Send back the token payload object containing the user data
res.status(200).json(req.payload);
});

module.exports = router;