<script setup>
import { ref } from 'vue';

const wordType = ref(null);



</script>

<template>
  <div class="home-form">
    <form>
      <h2>Pick how many words you would like to revise and start!</h2>
      <input type="radio" id="noun" name="word type" value="noun" v-model="wordType" checked="checked">
      <label for="noun">Noun</label>
      
      <input type="radio" id="verb" name="word type" value="verb" v-model="wordType">
      <label for="verb">Verb</label>
      
      <input type="radio" id="other" name="word type" value="other" v-model="wordType">
      <label for="other">Other</label><br><br>

      <label v-if="wordType == 'noun'" for="noun">Noun Gender</label><br>
      <select v-if="wordType == 'noun'" id="noun" name="noun">
        <option value="en">En</option>
        <option value="ei">Ei</option>
        <option value="et">Et</option>
      </select><br><br>

      <button type="submit" @click="startFlashcards">Start</button>
    </form> 
  </div>
</template>

<style scoped>

</style>
