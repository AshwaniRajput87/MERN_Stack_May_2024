const express = require('express');

const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const app = express();

app.use(express.json()); // express.json(): if want to get the json data from request body

const router = express.Router();

router.post('/', createUser);

router.get('/',  getAllUsers);

router.get('/:id', getUserById);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;