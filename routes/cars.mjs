import { Router } from 'express'
import CarController from '../controllers/car.mjs'
import UploadManager from '../utils/UploadManager.mjs'
import CarValidator from '../utils/CarValidator.mjs'
import { checkSchema } from 'express-validator'

const router = Router()

router.get('/', CarController.carsList)

router.get('/create/:id?', CarController.carCreationForm)

router.post('/create/:id?', UploadManager.getUploadStorage().single('imgSrc'), checkSchema(CarValidator.carSchema), CarController.createCar)

router.get('/:id', CarController.carsDetails)

router.delete('/', CarController.deleteCar)

export default router
