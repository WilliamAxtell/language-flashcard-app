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
    <img @click="goHome" class="logo" src="@/assets/Flag_of_Norway.png" />
    <div class="button-block">
      <button class="nav-btn" @click="goHome">Back Home</button>
      <button class="nav-btn" @click="addWord">Add a Word</button>
    </div>
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
  max-width: 154px;
  aspect-ratio: 11 / 8;
}

.button-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-btn {
  min-width: 120px;
  cursor: pointer;
}
</style>
