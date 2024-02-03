const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

// router.post('/', async (req, res) => {
//     const user = await User.create(req.body)
//     res.json(user)
// })

router.post('/', async (req, res) => {
    try {
        const { password, ...rest } = req.body;
        const passwordDigest = await bcrypt.hash(password, 10)
        const user = await User.create({ 
            ...rest, 
            passwordDigest
        })
        res.json(user)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error"})
    }
})   

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Errror"})
    }

})



module.exports = router