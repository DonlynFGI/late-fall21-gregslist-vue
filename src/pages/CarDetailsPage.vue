<template>
  <div class="car-details container-fluid">
    <div class="row mt-5">
      <div class="col text-center fixer">
        <img class="fixer" :src="car.imgUrl" alt="" />
      </div>
      <div class="row mt-3 justify-content-center">
        <div class="col-md-8">
          <div class="bg-white rounded elevation-1 p-3">
            <h4>{{ car.make }} - {{ car.model }} - {{ car.year }}</h4>
            <div class="d-flex align-items-center">
              <p class="m-0">
                <b>${{ car.price }}</b>
              </p>
              <div class="color-swatch mx-2"></div>
            </div>
            <p>{{ car.description }}</p>
            <!-- adding the v-if prevents the content from trying to load before creator is defined -->
            <div class="user-tag d-flex align-items-center" v-if="car.creator">
              <img class="rounded-pill" :src="car.creator.picture" alt="" />
              <p class="m-0 ps-3">{{ car.creator.name }}</p>
            </div>
            <!-- only render if the creatorId of the car is the person logged in -->
            <div
              v-if="car.creatorId === account.id"
              class="car-controls d-flex justify-content-end"
            >
              <button
                class="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#car-modal"
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
  <CarFormModal :car="car" />
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";
import { carsService } from "../services/CarsService";
import Pop from "../utils/Pop";
export default {
  setup() {
    // NOTE the 'route' is the details object
    const route = useRoute();
    // NOTE the 'router' is the object with the functionality of the router
    const router = useRouter();
    onMounted(async () => {
      logger.log("CAR ID", route.params.id);
      try {
        // when this component loads get the id from the params and set that car as the active car
        await carsService.getById(route.params.id);
      } catch (error) {
        logger.error(error);
        Pop.toast("Could not get that car", "error");
        // change the route back to the main cars page
        router.push({ name: "Cars" });
      }
    });
    return {
      car: computed(() => AppState.activeCar),
      carColor: computed(() => AppState.activeCar.color || "#ffffff"),
      account: computed(() => AppState.account),

      async remove() {
        try {
          if (await Pop.confirm()) {
            await carsService.remove();
            // change the route back to the main cars page
            router.push({ name: "Cars" });
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
.color-swatch {
  background-color: v-bind(carColor);
}

.user-tag {
  & img {
    height: 50px;
  }
}

.fixer {
  max-width: 500px;
}
</style>