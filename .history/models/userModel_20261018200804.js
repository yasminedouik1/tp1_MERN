const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Le nom est obligatoire'],
            trim: true
        },

        email: {
            type: String,
            required: [true, "L'email est obligatoire"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Format d'email invalide (ex: aya@polytechnique.tn)"]
        },
        age: {
            type: Number,
            min: [4, "L'age minimum autorise est de 4 ans"]
        },
        role: {
            type: String,
            enum: {
                values: ['user', 'admin'],
                message: '{VALUE} n\'est pas un role autorise'
            },
            default: 'user'
        }
    },
    { timestamps: true } // Ajoute automatiquement createdAt et updatedAt
);
module.exports = mongoose.model('User', userSchema);