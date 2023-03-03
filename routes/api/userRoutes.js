const router = require('express').Router();

const {
    getUsers,
    getOneUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser).put(updateUser);

router.route('/:userId').get(getOneUser).delete(deleteUser);

router.route('/:userId/friends').post(addFriend).delete(deleteFriend);

router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;