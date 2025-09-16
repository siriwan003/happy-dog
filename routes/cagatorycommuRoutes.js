import express from 'express'
import { cagatorycommu } from '../controllers/cagatorycommuController.js'

const route = express.Router()


route.post('/ctgycommuname', cagatorycommu)


export default route