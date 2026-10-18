const User = require('../models/userModel');
const Article = require('../models/articleModel');

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

const getUsers = async (req, res) => {
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
  getUserById,
  createUser,
  getUsers,
  deleteUser
}
