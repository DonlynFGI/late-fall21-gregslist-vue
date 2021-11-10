export class House {
  constructor(houseData = {}) {
    this.id = houseData.id
    this.address = houseData.address
    this.stories = houseData.stories
    this.year = houseData.year
    this.description = houseData.description
    this.price = houseData.price
    this.color = houseData.color || '#ffffff'
    this.imgUrl = houseData.imgUrl
    this.creatorId = houseData.creatorId
    this.creator = houseData.creator || {}
  }
}