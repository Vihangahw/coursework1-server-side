const express = require("express");
const session = require("express-session");
const apiLogger = require('./middleware/apiLogger');
const helmet = require("helmet");
const dotenv = require("dotenv");
const path = require("path");
const cors = require('cors');
const app = express();


// Load env var
dotenv.config({ path: path.resolve(__dirname, "../.env") });

app.use(cors({
    origin: 'http://localhost:5173', // port of the react app
    credentials: true,
}));


// Middleware setup
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(
    session({
        secret: process.env.SESSION_SECRET || "supdefkeyyo",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, 
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

app.use(apiLogger); 

// Import routes
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const countryRoutes = require("./routes/countryRoutes");



// Route use
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api", countryRoutes);

app.get("/", (req, res) => {
    res.send("CW1 Middleware API is running!");
});

module.exports = app;
