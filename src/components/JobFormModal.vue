<template>
  <Modal id="job-modal">
    <template #modal-title class="bg-success">
      <h4>{{ job.id ? "Edit" : "Create" }} Job</h4>
    </template>
    <template #modal-body>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3 d-flex justify-content-between">
          <div>
            <label for="hours" class="form-label">Hours</label>
            <input
              type="text"
              class="form-control"
              name="hours"
              id="hours"
              aria-describedby="hours"
              placeholder="Hours..."
              required
              v-model="editable.hours"
            />
          </div>
          <div>
            <label for="title" class="form-label">Title</label>
            <input
              type="text"
              class="form-control"
              name="title"
              id="title"
              aria-describedby="title"
              placeholder="Title..."
              required
              v-model="editable.title"
            />
          </div>
        </div>
        <div>
          <label for="pay" class="form-label">Pay</label>
          <input
            type="number"
            class="form-control"
            name="pay"
            id="pay"
            aria-describedby="pay"
            placeholder="Pay..."
            min="1"
            required
            v-model="editable.pay"
          />
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
            {{ job.id ? "Save" : "Create" }}
          </button>
        </div>
      </form>
    </template>
  </Modal>
</template>


<script>
import { ref } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import { jobsService } from "../services/JobsService";
import Pop from "../utils/Pop";
import { Modal } from "bootstrap";
import { useRouter } from "vue-router";
import { AppState } from "../AppState";
import { Job } from "../Models/Job";
import { watchEffect } from "@vue/runtime-core";

export default {
  props: {
    job: {
      type: Job,
      default: () => new Job(),
    },
  },
  setup(props) {
    const router = useRouter();
    const editable = ref({});

    // watchEffect is a method that runs anytime any of its values change
    watchEffect(() => {
      editable.value = { ...props.job };
    });

    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            await jobsService.edit(editable.value);
          } else {
            await jobsService.create(editable.value);
          }
          // if successful close modal
          Modal.getOrCreateInstance(
            document.getElementById("job-modal")
          ).hide();
          router.push({
            name: "JobDetails",
            params: { id: AppState.activeJob.id },
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