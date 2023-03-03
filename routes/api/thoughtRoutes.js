const router = require('express').Router();

const {
    getThoughts,
    getOneThought,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought).put(updateThought);

router.route('/:thoughtId').get(getOneThought).delete(deleteThought);

router.route('/reactions/:thoughtId').post(addReaction).delete(deleteReaction);

router.route('/reactions/:thoughtId/:reactionId').delete(deleteReaction);

module.exports = router;