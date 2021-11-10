<template>
  <div class="mt-3 selectable">
    <!-- Add Parameters to router link with the 'params' object -->
    <router-link :to="{ name: 'JobDetails', params: { id: job.id } }">
      <div class="bg-light elevation-1 rounded">
        <img
          class="job-img rounded-top w-100"
          :src="job.imgUrl"
          alt="job image"
        />
        <div class="p-1 text-center">
          <p class="m-0">
            <b>{{ job.hours }} - {{ job.title }}</b>
          </p>
          <!-- <div class="text-end">
          <span
            title="edit car"
            class="justify-self-end selectable text-dark lighten-20"
            ><i class="mdi mdi-pencil"></i
          ></span>
          <span
            title="delete car"
            class="justify-self-end selectable text-danger lighten-20"
            ><i class="mdi mdi-delete"></i
          ></span>
        </div> -->
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
export default {
  props: {
    job: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>