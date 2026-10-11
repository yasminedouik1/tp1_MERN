let users = [
  { id: 1, name: 'Aya', email: 'aya@example.com' , role: 'user'},
  { id: 2, name: 'Omar', email: 'omar@example.com' , role: 'user'},
];

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
    if (!userIndex ) {
      return res.status(404).json({ error: `Utilisateur ${id} introuvable` });
    }   
    users = users.filter(u => u.id !== id);
  res.status(200).json({ message: 'Utilisateur ${id} supprimé avec succès' });
}



module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser
}
