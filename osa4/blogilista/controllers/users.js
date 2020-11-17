const logger = require('../utils/logger')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password === undefined) {
    logger.error('Error: Password expected')
    return response.status(400).json({ error: 'Error: Password expected' })
  }

  if (body.password.length < 3) {
    logger.error('Error: Password needs to be at least 3 characters long')
    return response.status(400).json({ error: 'Error: Password needs to be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter