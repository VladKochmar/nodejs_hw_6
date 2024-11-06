import CarsDBService from '../models/car/CarsDBService.mjs'
import OwnerDBService from '../models/owner/OwnersDBService.mjs'
import { validationResult } from 'express-validator'
import config from '../config/default.mjs'
import fs from 'fs'
import path from 'path'

class CarController {
  static async carsList(req, res) {
    try {
      const dataList = await CarsDBService.getList()

      res.render('cars/carsList', { cars: dataList })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async carsDetails(req, res) {
    try {
      const car = await CarsDBService.getById(req.params.id)
      res.render('cars/details', { car })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async carCreationForm(req, res) {
    try {
      const id = req.params.id
      let car = null

      if (id) car = await CarsDBService.getById(id)
      const owners = await OwnerDBService.getList()

      res.render('cars/form', { car, owners, errors: null })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async createCar(req, res) {
    const errors = validationResult(req)
    const car = req.body
    const owners = await OwnerDBService.getList()

    if (!errors.isEmpty()) {
      if (req.params.id) car.id = req.params.id

      const formattedErrors = {}
      errors.array().forEach(error => {
        formattedErrors[error.path] = error.msg
      })

      if (!req.file) {
        formattedErrors.imgSrc = 'Car image is required'
      }

      return res.status(400).render('cars/form', {
        errors: formattedErrors,
        car,
        owners,
      })
    }

    try {
      const { brand, year, number, owner } = req.body

      if (req.params.id) {
        const updatedProps = { brand, year, number, owner }
        if (req.file?.filename) updatedProps.imgSrc = req.file.filename
        await CarsDBService.update(req.params.id, updatedProps)
      } else {
        CarsDBService.create({ brand, year, number, owner, imgSrc: req.file.filename })
      }

      res.redirect('/cars')
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async deleteCar(req, res) {
    try {
      const car = await CarsDBService.getById(req.body.id)

      if (car.imgSrc) {
        fs.unlinkSync(path.join(config.rootDir, `uploads\\${car.imgSrc}`))
      }

      await CarsDBService.deleteById(req.body.id)
      res.json({ success: true })
    } catch (err) {
      console.error(err)

      res.status(500).json({ success: false, message: 'Failed to delete user' })
    }
  }
}

export default CarController
