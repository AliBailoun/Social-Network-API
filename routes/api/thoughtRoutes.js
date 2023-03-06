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

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getOneThought).delete(deleteThought).put(updateThought);

router.route('/reactions/:thoughtId').post(addReaction);

router.route('/reactions/:thoughtId/:reactionId').delete(deleteReaction);

module.exports = router;