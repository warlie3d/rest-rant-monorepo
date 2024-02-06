const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')

const { User } = db

  
  
router.post('/', async (req, res) => {
    try {
        let user = await User.findOne({
            where: { email: req.body.email }
        })

        if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
            res.status(404).json({
                message: `Could not find a user with the provided username and password`
            })
        } else {
            const tokenPayload = { id: user.userId }
            const result = await jwt.encode(process.env.JWT_SECRET, tokenPayload)

            res.json({ user, token: result.value })
        }
    } catch (error) {
        console.error('Error', error)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
    
})

router.get('/profile', async (req, res) => {
  try {
    // Split the authorization header into [ "Bearer", "TOKEN" ]:
    const [authenticationMethod, token] = req.headers.authorization.split(' ');

    // Only handle "Bearer" authorization for now 
    //  (we could add other authorization strategies later):
    if (authenticationMethod == 'Bearer') {

      // Decode the JWT
      const result = await jwt.decode(process.env.JWT_SECRET, token);

      // Get the logged in user's id from the payload
      const { id } = result.value;

      // Find the user object using their id:
      let user = await User.findOne({
        where: {
          userId: id,
        },
      });
      res.json(user);
    }
  } catch (error) {
    console.error('Error during profile fetch:', error);
    res.json(null);
  }
});
  


module.exports = router
