import fs from 'fs'
import settings from '../settings.mjs'

class FileManager {
  constructor(filePath) {
    this.filePath = filePath
  }

  saveData(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data), 'utf8')
    } catch (err) {
      throw new Error(`Failed to save data: ${err.message}`)
    }
  }

  loadData() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8')
      return JSON.parse(data)
    } catch (err) {
      if (err.code === 'ENOENT') {
        this.saveData([])
        return []
      } else {
        throw new Error(`Failed to load data: ${err.message}`)
      }
    }
  }

  addItem(item) {
    try {
      if (!item) throw new Error('The object was not transferred')
      const data = this.loadData()
      data.push(item)
      this.saveData(data)
    } catch (err) {
      throw new Error(`Failed to add item: ${err.message}`)
    }
  }

  getItemById(id) {
    try {
      const data = this.loadData()
      const item = data.find(item => item.id == id)
      if (!item) throw new Error(`Item with id ${id} not found`)
      return item
    } catch (err) {
      throw new Error(`Failed to load item by id ${id}: ${err.message}`)
    }
  }

  updateItemById(id, updatedProps) {
    try {
      const data = this.loadData()
      const index = data.findIndex(item => item.id == id)

      if (index !== -1) {
        data[index] = { ...data[index], ...updatedProps }
        this.saveData(data)
        return true
      } else {
        throw new Error(`Item with id ${id} not found`)
      }
    } catch (err) {
      throw new Error(`Failed to update item: ${err.message}`)
    }
  }

  deleteItemById(id) {
    try {
      const data = this.loadData()
      const newData = data.filter(item => item.id != id)

      if (data.length === newData.length) throw new Error(`Item with id ${id} not found`)

      this.saveData(newData)
    } catch (err) {
      throw new Error(`Failed to remove item: ${err.message}`)
    }
  }
}

export default new FileManager(settings.filePath)
