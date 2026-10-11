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

