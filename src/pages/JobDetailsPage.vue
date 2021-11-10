<template>
  <div class="job-details container-fluid">
    <div class="row mt-5">
      <div class="col text-center fixer">
        <img class="fixer" :src="job.imgUrl" alt="" />
      </div>
      <div class="row mt-3 justify-content-center">
        <div class="col-md-8">
          <div class="bg-white rounded elevation-1 p-3">
            <h4>{{ job.hours }} - {{ job.title }}</h4>
            <div class="d-flex align-items-center">
              <p class="m-0">
                <b>${{ job.pay }}</b>
              </p>
              <div class="color-swatch mx-2"></div>
            </div>
            <p>{{ job.description }}</p>
            <!-- adding the v-if prevents the content from trying to load before creator is defined -->
            <div class="user-tag d-flex align-items-center" v-if="job.creator">
              <img class="rounded-pill" :src="job.creator.picture" alt="" />
              <p class="m-0 ps-3">{{ job.creator.name }}</p>
            </div>
            <!-- only render if the creatorId of the car is the person logged in -->
            <div
              v-if="job.creatorId === account.id"
              class="job-controls d-flex justify-content-end"
            >
              <button
                class="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#job-modal"
              >
                edit
              </button>
              <button class="btn btn-danger mx-3" @click="remove">
                delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- by passing the prop the car details should be filled in -->
  <JobFormModal :job="job" />
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";
import { jobsService } from "../services/JobsService";
import Pop from "../utils/Pop";
export default {
  setup() {
    // NOTE the 'route' is the details object
    const route = useRoute();
    // NOTE the 'router' is the object with the functionality of the router
    const router = useRouter();
    onMounted(async () => {
      logger.log("JOB ID", route.params.id);
      try {
        // when this component loads get the id from the params and set that car as the active car
        await jobsService.getById(route.params.id);
      } catch (error) {
        logger.error(error);
        Pop.toast("Could not get that job", "error");
        // change the route back to the main cars page
        router.push({ name: "Jobs" });
      }
    });
    return {
      job: computed(() => AppState.activeJob),
      account: computed(() => AppState.account),

      async remove() {
        try {
          if (await Pop.confirm()) {
            await jobsService.remove();
            // change the route back to the main cars page
            router.push({ name: "Jobs" });
          }
        } catch (error) {
          logger.error(error);
          Pop.toast("Failed to Delete", "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.user-tag {
  & img {
    height: 50px;
  }
}

.fixer {
  max-width: 500px;
}
</style>