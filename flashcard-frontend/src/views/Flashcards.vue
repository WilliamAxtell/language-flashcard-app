<script setup>
  import { wordStore } from '../../stores/words.js'
  import { ref } from 'vue'

  const store = wordStore()

  const sharedData = JSON.parse(store.sharedData)

  const workingWords = ref(sharedData);

  const updateData = () => {
    store.setSharedData('New Value')
  }
</script>

<template>
    <div class="about">
      <h1>Hei!</h1>
      <ul>
        <li v-for="item in workingWords">
          {{ item }}
        </li>
      </ul>
    </div>
</template>