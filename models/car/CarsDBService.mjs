import Car from './Car.mjs'

class CarsDBService {
  static async getList() {
    try {
      const exists = await Car.checkCollectionExists()

      if (!exists) return []

      return await Car.find().populate('owner').exec()
    } catch (err) {
      console.error(err)
      return []
    }
  }

  static async create(data) {
    const car = new Car(data)
    return await car.save()
  }

  static async getById(id) {
    return await Car.findById(id)
  }

  static async update(id, data) {
    return await Car.findByIdAndUpdate(id, data, { new: true, runValidators: true })
  }

  static async deleteById(id) {
    return await Car.findByIdAndDelete(id)
  }
}

export default CarsDBService
