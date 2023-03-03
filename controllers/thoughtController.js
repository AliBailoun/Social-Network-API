const { Thought, User } = require("../models");


module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    getOneThought(req, res) {
        Thought.findById({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "There is no thought associated with that ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) => {
                !user
                    ? res.status(404).json({ message: "There is no user associated with that ID" })
                    : res.status(200).json({ message: "Thought successfully created" })
            })
            .catch((err) =>
                res.json(err)
            )
    },

    deleteThought(req, res) {
        Thought.findByIdAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "There is no thought associated with that ID" })
                    : res.status(200).json({ message: "Thought successfully deleted" })
            )
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "There is no thought associated with that ID" })
                    : res.json(thought)
            )
            .catch((err) =>
                res.status(500).json(err));
    }
};