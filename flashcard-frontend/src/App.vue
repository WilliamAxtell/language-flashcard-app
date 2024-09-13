<script setup>
import { RouterView, useRouter } from 'vue-router'

const router = useRouter();

const goHome = () => {
  router.push({name: 'home'});
};

const addWord = () => {
  router.push({name: 'word-form'});
};

</script>

<template>
  <header>
    <img @click="goHome" alt="Vue logo" class="logo" src="@/assets/Flag_of_Norway.png" width="154" height="112" />
    <button @click="addWord">Add a Word</button>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10% 2rem 10%;
}

.logo {
  display: block;
  cursor: pointer;
}

</style>
