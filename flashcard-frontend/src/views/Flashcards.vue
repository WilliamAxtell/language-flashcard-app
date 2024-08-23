<script setup>
  import { wordStore } from '../../stores/words.js'
  import { onMounted, ref } from 'vue'

  const store = wordStore()
  const sharedData = JSON.parse(store.sharedData)
  const workingWords = ref(sharedData);
  let randomNum;

  const updateData = () => {
    store.setSharedData('New Value')
  }

  onMounted(() => {
    randomNum = Math.floor(Math.random() * sharedData.length);
    workingWords.value = sharedData[randomNum];
  })

  const checkAnswer = () => {
    if (document.getElementById('card-answer').value === '') {
      alert('Please enter an answer');
      return;
    }
    const answer = workingWords.value.meaning;
    const transRegex = new RegExp(document.getElementById('card-answer').value, 'i');
    transRegex.test(answer) ? correctAnswer() : incorrectAnswer();
  }
  
  const correctAnswer = () => {
    alert('Correct!');
    sharedData.splice(randomNum, 1);
    if (sharedData.length === 0) {
      alert('You have completed all the words!');
    } else {
      randomNum = Math.floor(Math.random() * sharedData.length);
      workingWords.value = sharedData[randomNum];
    }
  }

  const incorrectAnswer = () => {
    alert('Incorrect!');
  }

</script>

<template>
    <div class="card">
      <h1>{{ workingWords.word }}</h1>
      <input type="text" id="card-answer"/>
      <button @click="checkAnswer">Update Data</button>
    </div>
</template>

<style>

.card {
  display: grid;

  margin: 0 auto;
  width: 80%;
  aspect-ratio: 3/2;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

</style>