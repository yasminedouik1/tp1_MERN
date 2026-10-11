let users = [
  { id: 1, name: 'Aya', email: 'aya@example.com' , role: 'user'},
  { id: 2, name: 'Omar', email: 'omar@example.com' , role: 'user'},
];

const getAllUsers = (req, res) => {
  res.json(users);
}


const getUserById = (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) {
      return res.status(404).json({ error: `Utilisateur ${id} introuvable` });
    }  
    res.json(user);
}

const createUser = (req, res) => {
    const { name, email, role } = req.body;
    if (!name || !email || !role) {
      return res.status(400).json({ error: "Le nom, l'email et le rôle sont obligatoires" });
    }
    const newUser = { id: users.length + 1, name, email, role };
    users.push(newUser);
    res.status(201).json(newUser);
}

const deleteUser = (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ error: `Utilisateur ${id} introuvable` });
    }   
    users.splice(userIndex, 1);
    res.status(204).send();
}



module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser
}
