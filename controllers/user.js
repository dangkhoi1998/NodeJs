const Deck = require('../models/Deck')
const User = require('../models/User')
const Joi = require('@hapi/joi')
const { ValidationError } = require('@hapi/joi')
const idSchame = Joi.object().keys({
  userID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
})

const getUser = async(req, res, next) => {
  const ValidatorResult = idSchame.validate(req.params)
  console.log('swwwwwww', ValidatorResult)
  const { userID } = req.params

  const user = await User.findById(userID)

  return res.status(200).json(user)
}

const index = async (req, res, next) => {
  const users = await User.find()
  return res.status(200).json({users})
}

const newUser = async (req, res, next) => {
  const newUser = new User(req.body)
  await newUser.save()
  return res.status(201).json({user: newUser})
}

const replaceUser = async (req, res, next) => {
  // enforce new user to old user
  const { userID } = req.params
  const newUser = req.body
  const result = await User.findByIdAndUpdate(userID, newUser)

  return res.status(200).json({success: true})
}
const updateUser = async (req, res, next) => {
  const { userID } = req.params
  const newUser = req.body
  const result = await User.findByIdAndUpdate(userID, newUser)

  return res.status(200).json({success: true})
}

const getUserDeck = async (req, res, next) => {
  const { userID } = req.params
  // Get user
  const user = await User.findById(userID).populate('decks')
  res.status(200).json({decks: user.decks})
}

const newUserDeck = async (req, res, next) => {
  const { userID } = req.params

  // create a new deck
  const newDeck = new Deck(req.body)

  // Get user
  const user = await User.findById(userID)

  // Assign user a deck owner
  newDeck.owner = user

  // Save the deck
  await newDeck.save()

  // Add deck to users decks array 'deck'
  user.decks.push(newDeck._id)

  // Save the user
  await user.save()

  res.status(201).json({decks: newDeck})

}
module.exports = {
  index,
  newUser,
  getUser,
  replaceUser,
  updateUser,
  getUserDeck,
  newUserDeck
}