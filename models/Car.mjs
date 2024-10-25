import fileManager from '../utils/FileManager.mjs'

class Car {
  static loadCarsList() {
    try {
      return fileManager.loadData()
    } catch (err) {
      throw new Error(`Failed to load cars list: ${err.message}`)
    }
  }

  static create(car) {
    try {
      fileManager.addItem({ id: new Date().getTime(), ...car })
    } catch (err) {
      throw new Error(`Failed to add car: ${err.message}`)
    }
  }

  static getCarById(id) {
    try {
      return fileManager.getItemById(id)
    } catch (err) {
      throw new Error(`Failed to load car by id: ${err.message}`)
    }
  }

  static updateCar(id, updatedProps) {
    try {
      fileManager.updateItemById(id, updatedProps)
    } catch (err) {
      throw new Error(`Failed to update car: ${err.message}`)
    }
  }

  static deleteCar(id) {
    try {
      fileManager.deleteItemById(id)
    } catch (err) {
      throw new Error(`Failed to remove car: ${err.message}`)
    }
  }
}

export default Car
