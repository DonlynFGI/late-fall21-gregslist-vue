<template>
  <Modal id="house-modal">
    <template #modal-title class="bg-success">
      <h4>{{ house.id ? "Edit" : "Create" }} House</h4>
    </template>
    <template #modal-body>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3 d-flex justify-content-between">
          <div>
            <label for="address" class="form-label">Address</label>
            <input
              type="text"
              class="form-control"
              name="address"
              id="address"
              aria-describedby="address"
              placeholder="Address..."
              required
              v-model="editable.address"
            />
          </div>
          <div>
            <label for="stories" class="form-label">Stories</label>
            <input
              type="number"
              class="form-control"
              name="stories"
              id="stories"
              aria-describedby="stories"
              placeholder="Stories..."
              required
              v-model="editable.stories"
            />
          </div>
        </div>
        <div class="mb-3 d-flex justify-content-between">
          <div>
            <label for="year" class="form-label">Year</label>
            <input
              type="number"
              class="form-control"
              name="year"
              id="year"
              aria-describedby="year"
              placeholder="Year..."
              min="1500"
              max="2022"
              required
              v-model="editable.year"
            />
          </div>
          <div>
            <label for="color" class="form-label">Color</label>
            <input
              type="color"
              v-model="editable.color"
              class="form-control"
              name="color"
              id="color"
              aria-describedby="color"
              required
            />
          </div>
          <div>
            <label for="price" class="form-label">Price</label>
            <input
              type="number"
              class="form-control"
              name="price"
              id="price"
              aria-describedby="price"
              placeholder="Price..."
              min="1"
              required
              v-model="editable.price"
            />
          </div>
        </div>
        <div class="mb-3">
          <div>
            <label for="imgUrl" class="form-label">Image Url</label>
            <input
              type="url"
              class="form-control"
              name="imgUrl"
              id="imgUrl"
              aria-describedby="imgUrl"
              placeholder="Image Url..."
              required
              v-model="editable.imgUrl"
            />
          </div>
        </div>
        <div class="mb-3">
          <div>
            <label for="description" class="form-label">Description</label>
            <textarea
              type="text"
              class="form-control"
              name="description"
              id="description"
              aria-describedby="description"
              placeholder="Description..."
              min="5"
              max="250"
              required
              v-model="editable.description"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" class="btn btn-primary">
            {{ house.id ? "Save" : "Create" }}
          </button>
        </div>
      </form>
    </template>
  </Modal>
</template>


<script>
import { ref } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import { housesService } from "../services/HousesService";
import Pop from "../utils/Pop";
import { Modal } from "bootstrap";
import { useRouter } from "vue-router";
import { AppState } from "../AppState";
import { House } from "../Models/House";
import { watchEffect } from "@vue/runtime-core";

export default {
  props: {
    house: {
      type: House,
      default: () => new House(),
    },
  },
  setup(props) {
    const router = useRouter();
    const editable = ref({});

    // watchEffect is a method that runs anytime any of its values change
    watchEffect(() => {
      editable.value = { ...props.house };
    });

    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            await housesService.edit(editable.value);
          } else {
            await housesService.create(editable.value);
          }
          // if successful close modal
          Modal.getOrCreateInstance(
            document.getElementById("house-modal")
          ).hide();
          router.push({
            name: "HouseDetails",
            params: { id: AppState.activeHouse.id },
          });
          // change route to car details for this new car
        } catch (error) {
          logger.error(error);
          Pop.toast("Failed to Create", "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>