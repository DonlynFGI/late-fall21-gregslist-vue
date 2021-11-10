<template>
  <div class="house-details container-fluid">
    <div class="row mt-5">
      <div class="col text-center fixer">
        <img class="fixer" :src="house.imgUrl" alt="" />
      </div>
      <div class="row mt-3 justify-content-center">
        <div class="col-md-8">
          <div class="bg-white rounded elevation-1 p-3">
            <h4>
              {{ house.address }} - {{ house.stories }} - {{ house.year }}
            </h4>
            <div class="d-flex align-items-center">
              <p class="m-0">
                <b>${{ house.price }}</b>
              </p>
              <div class="color-swatch mx-2"></div>
            </div>
            <p>{{ house.description }}</p>
            <!-- adding the v-if prevents the content from trying to load before creator is defined -->
            <div
              class="user-tag d-flex align-items-center"
              v-if="house.creator"
            >
              <img class="rounded-pill" :src="house.creator.picture" alt="" />
              <p class="m-0 ps-3">{{ house.creator.name }}</p>
            </div>
            <!-- only render if the creatorId of the car is the person logged in -->
            <div
              v-if="house.creatorId === account.id"
              class="house-controls d-flex justify-content-end"
            >
              <button
                class="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#house-modal"
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
  <HouseFormModal :house="house" />
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";
import { housesService } from "../services/HousesService";
import Pop from "../utils/Pop";
export default {
  setup() {
    // NOTE the 'route' is the details object
    const route = useRoute();
    // NOTE the 'router' is the object with the functionality of the router
    const router = useRouter();
    onMounted(async () => {
      logger.log("HOUSE ID", route.params.id);
      try {
        // when this component loads get the id from the params and set that car as the active car
        await housesService.getById(route.params.id);
      } catch (error) {
        logger.error(error);
        Pop.toast("Could not get that house", "error");
        // change the route back to the main cars page
        router.push({ name: "Houses" });
      }
    });
    return {
      house: computed(() => AppState.activeHouse),
      houseColor: computed(() => AppState.activeHouse.color || "#ffffff"),
      account: computed(() => AppState.account),

      async remove() {
        try {
          if (await Pop.confirm()) {
            await housesService.remove();
            // change the route back to the main cars page
            router.push({ name: "Houses" });
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
  background-color: v-bind(houseColor);
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