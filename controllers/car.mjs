import Car from '../models/Car.mjs'
import fs from 'fs'
import path from 'path'
import settings from '../settings.mjs'
import { validationResult } from 'express-validator'

class CarController {
  static carsList(req, res) {
    const carsList = Car.loadCarsList()

    res.render('cars/carsList', {
      cars: carsList,
    })
  }

  static carsDetails(req, res) {
    const car = Car.getCarById(req.params.id)
    res.render('cars/details', { car })
  }

  static carCreationForm(req, res) {
    const id = req.params.id
    let car = null

    if (id) car = Car.getCarById(id)

    res.render('cars/form', { car, errors: null })
  }

  static createCar(req, res) {
    const errors = validationResult(req)
    console.log('errors')
    console.log(errors)

    if (!errors.isEmpty()) {
      const car = req.body
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
      })
    }

    const { brand, year, number } = req.body

    if (req.params.id) {
      const updatedProps = { brand, year, number }
      if (req.file?.filename) updatedProps.imgSrc = req.file.filename
      Car.updateCar(req.params.id, updatedProps)
    } else {
      Car.create({ brand, year, number, imgSrc: req.file.filename })
    }

    res.redirect('/cars')
  }

  static async deleteCar(req, res) {
    try {
      const car = Car.getCarById(req.body.id)

      if (car.imgSrc) {
        fs.unlinkSync(path.join(settings.rootDir, `uploads\\${car.imgSrc}`))
      }

      await Car.deleteCar(req.body.id)
      res.json({ success: true })
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to delete car' })
    }
  }
}

export default CarController
