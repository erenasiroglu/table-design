const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const router = express.Router();
const User = require("../models/User.js");

// Kullanıcı kayıt (signup)
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    // E-posta adresinin benzersiz olduğunu kontrol et
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "This email is already registered" });
    }

    // Şifre hashleme
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error.", message: error.message });
  }
});

// Kullanıcı giriş (login)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error.", message: error.message });
  }
});

// Google OAuth2 stratejisi için yapılandırma
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Google'dan gelen profil bilgisini kullanarak kayıtlı bir kullanıcı var mı kontrol et
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Eğer kayıtlı bir kullanıcı yoksa, yeni bir kullanıcı oluştur
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value, // varsayılan olarak ilk e-posta adresini al
            // Diğer gerekli alanları doldurabilirsiniz
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Google ile kayıt ol
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google ile kayıt olma sonrası geri çağrı URL'si
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Başarılı girişten sonra yönlendirme işlemi burada yapılabilir
    res.redirect("/");
  }
);

module.exports = router;
