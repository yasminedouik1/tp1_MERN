const User = require('../models/userModel');
const Article = require('../models/articleModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, age} = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Le nom, l\'email et le mot de passe sont obligatoires' });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
      role
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }
    // Comparaison securisee en temps constant
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// GET /api/users (Admin uniquement)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: 'old et new mot de passe requis'
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: 'Utilisateur introuvable'
      });
    }

    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );
    if (!isMatch) {
      return res.status(401).json({
        message: 'Ancien mot de passe incorrect'
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    return res.status(200).json({
      message: 'Mot de passe modifié avec succès'
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};

/*
const createUser = async (req, res) => {
  try {
    const { name, email, age, role } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Le nom et 1\'email sont requis' });
    }
 
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'Cet email est deja utilise' });
    }
 
    const user = await User.create({ name, email, age, role });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
 
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
 
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        message: 'Identifiant de ressource invalide (format ObjectId attendu)'
      });
    }
    res.status(500).json({ message: err.message });
  }
};
 
 
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
 
    if (!user) {
      return res.status(404).json({
        message: 'Utilisateur non trouvé'
      });
    }
    const article = await Article.findOne({
      author: req.params.id
    });
    if (article) {
      return res.status(400).json({
        message: 'Impossible de supprimer un utilisateur ayant des articles publies'
      });
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: 'Utilisateur supprimé avec succès',
      id: req.params.id
    });
 
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
 
*/

/*
 
const getAllUsers = (req, res) => {
  const { role } = req.query;
  let filteredUsers = users;
  if (role) {
    filteredUsers = users.filter(user => user.role === role);
  }
  res.json(filteredUsers);
}
 
 
const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: `Utilisateur ${id} introuvable` });
  }
  res.json(user);
}
 
const { estNonVide, estEmailValide } = require('../utils/validators');
 
const createUser = (req, res) => {
  const { name, email, role } = req.body;
 
  if (!estNonVide(name) || !estNonVide(email) || !estNonVide(role)) {
    return res.status(400).json({ error: "Le nom, l'email et le rôle ne peuvent pas être vides" });
  } else if (!estEmailValide(email)) {
    return res.status(400).json({ error: "L'email n'est pas valide" });
  }
 
  const newUser = { id: users.length + 1, name, email, role };
  users.push(newUser);
  res.status(201).json(newUser);
}
 
 
const deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.some(u => u.id === id);
  if (!userIndex) {
    return res.status(404).json({ error: `Utilisateur ${id} introuvable` });
  }
  users = users.filter(u => u.id !== id);
  res.status(200).json({ message: 'Utilisateur ${id} supprimé avec succès' });
}
 
*/

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  updatePassword
}
