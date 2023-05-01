const User = require('./models/user');

module.exports = {
    getUsers: async (req, res) => {
        const users = await User.find();
        res.json(users);
    },

    addUser: async (req, res) => {
        const { name, role } = req.body;
        const user = new User({ name, role });
        await user.save();
        res.json(user);
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(id, { role }, { new: true });
        res.json(user);
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted' });
    },
};
