<script setup>
  import { useRouter, useRoute } from 'vue-router'
  import { wordStore } from '../../stores/words.js'

  const store = wordStore()

  const sharedData = store.sharedData

  const updateData = () => {
    store.setSharedData('New Value')
  }


  const router = useRouter()
  const route = useRoute()

  async function startFlashcards(e) {
    e.preventDefault();
    const dateLimit = Date.now();
    const numWords = document.querySelector('input[name="num words"]:checked').value;
    const response = await fetch(`http://localhost:3000/api/v1?num_words=${numWords}&date_limit=${dateLimit}`);
    const words = await response.json();
    console.log(words);
    store.setSharedData(JSON.stringify(words));
    router.push({name: 'flashcards'});
  }

</script>

<template>
  <h2>Pick how many words you would like to revise and start!</h2>
  <form>
    <input type="radio" id="10" name="num words" value="10" checked="checked">
    <label for="10">10</label><br>

    <input type="radio" id="25" name="num words" value="25">
    <label for="25">25</label><br>

    <input type="radio" id="50" name="num words" value="50">
    <label for="50">50</label><br>

    <input type="radio" id="100" name="num words" value="100">
    <label for="100">100</label><br><br>
    <button type="submit" @click="startFlashcards">Start</button>
  </form> 
</template>
