const db = require('./db'); // Importing db connection from server.js

const User = {
    getUserById: (userId, callback) => {
        const query = "SELECT id, name, email, role, phone, company, bio FROM users WHERE id = ?";
        db.query(query, [userId], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result[0]);
        });
    },

    updateUser: (userId, userData, callback) => {
        const query = "UPDATE users SET name = ?, email = ?, phone = ?, company = ?, bio = ? WHERE id = ?";
        const values = [userData.name, userData.email, userData.phone, userData.company, userData.bio, userId];

        db.query(query, values, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }
};

module.exports = User;
