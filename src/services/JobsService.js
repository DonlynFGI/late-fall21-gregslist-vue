import { AppState } from "../AppState"
import { Job } from '../Models/Job'
import { logger } from "../utils/Logger"
import { api } from './AxiosService'

class JobsService {
  async getAll(jobQuery = "") {
    const res = await api.get('api/jobs' + jobQuery)
    logger.log(res.data)
    AppState.jobs = res.data.map(j => new Job(j))
  }

  async getById(id) {
    const res = await api.get('api/jobs/' + id)
    logger.log(res.data)
    AppState.activeJob = new Job(res.data)
  }

  async create(job) {
    const res = await api.post('api/jobs', job)
    logger.log(res.data)
    AppState.jobs.push(new Job(res.data))
    AppState.activeJob = new Job(res.data)
  }

  async edit(job) {
    const res = await api.put('api/jobs/' + job.id, job)
    logger.log(res.data)
    const updatedJob = new Job(res.data)
    AppState.activeJob = updatedJob
    const index = AppState.jobs.findIndex(j => j.id === updatedJob.id)
    if (index === -1) {
      AppState.jobs.push(updatedJob)
      return
    }
    AppState.jobs.splice(index, 1, updatedJob)

  }
  async remove() {
    const res = await api.delete('api/jobs/' + AppState.activeJob.id)
    logger.log(res.data)
    AppState.jobs = AppState.jobs.filter(j => j.id !== AppState.activeJob.id)
    AppState.activeJob = new Job()
  }
}

export const jobsService = new JobsService()