<template>
  <div class="jobs container-fluid">
    <div class="row">
      <div class="col d-flex justify-content-between p-3">
        <h2>Jobs</h2>
        <button
          class="btn btn-outline-success"
          data-bs-toggle="modal"
          data-bs-target="#job-modal"
        >
          <i class="mdi mdi-plus"></i>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4" v-for="j in jobs" :key="j.id">
        <Job :job="j" />
      </div>
    </div>
  </div>
  <JobFormModal />
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { jobsService } from "../services/JobsService";
import { AppState } from "../AppState";

export default {
  setup() {
    onMounted(async () => {
      try {
        await jobsService.getAll();
      } catch (error) {
        logger.log(error);
        Pop.toast("Something went wrong", "error");
      }
    });
    return {
      jobs: computed(() => AppState.jobs),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>