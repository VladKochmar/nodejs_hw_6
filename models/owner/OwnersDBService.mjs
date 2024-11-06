import Owner from './Owner.mjs'

class OwnersDBService {
  static async getList() {
    try {
      const res = await Owner.find().exec()
      return res
    } catch (err) {
      console.error(err)
      return []
    }
  }
}

export default OwnersDBService
