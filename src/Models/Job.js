export class Job {
  constructor(jobData = {}) {
    this.id = jobData.id
    this.hours = jobData.hours
    this.title = jobData.title
    this.description = jobData.description
    this.pay = jobData.pay
    this.imgUrl = jobData.imgUrl
    this.creatorId = jobData.creatorId
    this.creator = jobData.creator || {}
  }
}