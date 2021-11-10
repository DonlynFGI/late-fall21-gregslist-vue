<template>
  <nav class="bg-success px-3 h-100">
    <router-link class="d-flex" :to="{ name: 'Home' }">
      <img class="img-fluid" alt="logo" src="../assets/img/GregsList.svg" />
    </router-link>
    <div id="navbarText">
      <ul class="navbar-nav me-auto">
        <span>
          <button
            class="btn selectable text-success lighten-30 text-uppercase my-1"
            @click="login"
            v-if="!user.isAuthenticated"
          >
            Login
          </button>

          <div class="my-1" v-else>
            <div
              class="dropdown-toggle selectable"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="authDropdown"
            >
              <img
                :src="user.picture"
                alt="user photo"
                height="40"
                class="rounded"
              />
            </div>
            <div
              class="dropdown-menu p-0 list-group"
              aria-labelledby="authDropdown"
            >
              <router-link :to="{ name: 'Account' }">
                <div class="list-group-item list-group-item-action hoverable">
                  Manage Account
                </div>
              </router-link>
              <div
                class="
                  list-group-item list-group-item-action
                  hoverable
                  text-danger
                "
                @click="logout"
              >
                <i class="mdi mdi-logout"></i>
                logout
              </div>
            </div>
          </div>
        </span>
        <li class="d-flex flex-column">
          <router-link
            :to="{ name: 'Cars' }"
            class="btn selectable text-uppercase"
          >
            Cars
          </router-link>
          <!-- FIXME change to Houses -->
          <router-link
            :to="{ name: 'Houses' }"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            Houses
          </router-link>
          <!-- FIXME change to Jobs -->
          <router-link
            :to="{ name: 'Jobs' }"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            Jobs
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { AuthService } from "../services/AuthService";
import { AppState } from "../AppState";
import { computed } from "vue";
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    };
  },
};
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
