const { Thought, User } = require("../models");


module.exports = {
    getUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
    },
    getOneUser(req, res) {
        User.findById({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "There is no user associated with that ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => {
                res.json(user)
            }
            )
            .catch((err) => res.status(500).json(err))
    },
    deleteUser(req, res) {
        User.findByIdAndDelete({ _id: req.params.id })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "There is no user associated with that ID" })
                    : Thought.deleteMany({ _id: { $in: User.thoughts } }
                    )
            )
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "There is no user associated with that ID" })
                    : res.json(user)
            )
            .catch((err) =>
                res.status(500).json(err));
    }
};
