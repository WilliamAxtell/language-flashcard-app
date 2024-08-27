<script setup>
  import { wordStore } from '../../stores/words.js'
  import { onMounted, ref } from 'vue'

  const store = wordStore()
  const sharedData = JSON.parse(store.sharedData)
  const workingWords = ref(sharedData);
  const cardDisplay = ref("Loading...");
  const warning = ref(false);
  const buttonOption = ref(true);
  let randomNum;

  const updateData = () => {
    store.setSharedData('New Value')
  }

  onMounted(() => {
    setWord();
  })

  const setWord = () =>{
    buttonOption.value = true;
    randomNum = Math.floor(Math.random() * sharedData.length);
    workingWords.value = sharedData[randomNum];
    cardDisplay.value = workingWords.value.word;
  }
  
  const checkAnswer = () => {
    if (document.getElementById('card-answer').value === '') {
      warning.value = true;
      return;
    }
    buttonOption.value = false;
    warning.value = false;
    const answer = workingWords.value.meaning;
    const transRegex = new RegExp(document.getElementById('card-answer').value, 'i');

    if(transRegex.test(answer)) {
      cardDisplay.value = `Correct Answer: ${workingWords.value.meaning}`;
    } else {
      cardDisplay.value = `Incorrect Answer: ${workingWords.value.meaning}`;
    }
    
    sharedData.splice(randomNum, 1);
    if (sharedData.length === 0) {
      cardDisplay.value = `You have completed all the words!`;
    } else {
      randomNum = Math.floor(Math.random() * sharedData.length);
      workingWords.value = sharedData[randomNum];
    }

    document.getElementById('card-answer').value = '';
  }

</script>

<template>
    <div class="card">
      <h1>{{ cardDisplay }}</h1>
      <p v-if="warning" class="card-warning">Please enter the answer below</p>
      <input v-if="buttonOption" type="text" id="card-answer"/>
      <div>
        <button v-if="buttonOption" @click="checkAnswer">Check Answer</button>
        <button v-else @click="setWord">Next Word</button>
      </div>
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

.card-warning {
  color: red;
  font-style: italic;
}

</style>