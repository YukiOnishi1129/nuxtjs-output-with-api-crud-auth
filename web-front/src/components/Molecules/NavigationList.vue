<script setup lang="ts">
import { inject } from "vue";
import { useRouter } from "vue-router";
import { signOutInjectionKey } from "../../providers/AuthProviderInjectionKey";
import NavigationLink from "../Atoms/NavigationLink.vue";
import { NAVIGATION_PATH } from "../../constants/navigation";

const router = useRouter();
const signOut = inject(signOutInjectionKey);

const top = NAVIGATION_PATH.TOP;
const create = NAVIGATION_PATH.CREATE;

const handleLogout = () => {
  if (signOut) {
    localStorage.removeItem("access_token");
    signOut();
    router.push(NAVIGATION_PATH.SIGNIN);
  }
};
</script>

<template>
  <nav>
    <ul class="ul">
      <NavigationLink title="Top" :path="top" />
      <NavigationLink title="Create" :path="create" />
      <li class="li">
        <button class="button" type="button" @click="handleLogout">
          SignOut
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.ul {
  width: 100%;
  padding-left: 0;
  display: flex;
  justify-content: space-around;
}

.li {
  list-style-type: none;
}

.button {
  font-family: "Times New Roman", Times, serif;
  width: 100%;
  border: none;
  cursor: pointer;
  outline: none;
  appearance: none;
  transition: 0.3s;
  display: block;
  background-color: #fff;
  text-decoration: none;
  color: #008080;
  font-size: 20px;
  font-weight: bold;
  padding: 12px 20px;
  border-radius: 10px;
}

.button:hover {
  background-color: #d8d8d8;
}
</style>
