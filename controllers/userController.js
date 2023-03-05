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
        User.findByIdAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "There is no user associated with that ID" })
                    : res.status(200).json({ message: "User deleted successfully" })
            )
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
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
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: " Can't add a friend to a user that doesn't exist" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },
    deleteFriend(req, res) {
        User.findByIdAndDelete(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: " Can't delete a friend from a user that doesn't exist" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    }
};
