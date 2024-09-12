<script setup>
import { RouterView, useRouter } from 'vue-router'

const router = useRouter();

const goHome = () => {
  router.push({name: 'home'});
};
</script>

<template>
  <header>
    <img @click="goHome" alt="Vue logo" class="logo" src="@/assets/Flag_of_Norway.png" width="154" height="112" />
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 10% 2rem 10%;
  cursor: pointer;
}

</style>
