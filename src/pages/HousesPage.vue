<template>
  <div class="houses container-fluid">
    <div class="row">
      <div class="col d-flex justify-content-between p-3">
        <h2>Houses</h2>
        <button
          class="btn btn-outline-success"
          data-bs-toggle="modal"
          data-bs-target="#house-modal"
        >
          <i class="mdi mdi-plus"></i>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4" v-for="h in houses" :key="h.id">
        <House :house="h" />
      </div>
    </div>
  </div>
  <HouseFormModal />
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { housesService } from "../services/HousesService";
import { AppState } from "../AppState";

export default {
  setup() {
    onMounted(async () => {
      try {
        await housesService.getAll();
      } catch (error) {
        logger.log(error);
        Pop.toast("Something went wrong", "error");
      }
    });
    return {
      houses: computed(() => AppState.houses),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>