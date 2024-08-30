<script setup>
  import { wordStore } from '../../stores/words.js'
  import { onMounted, ref} from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  const store = wordStore()
  const sharedData = JSON.parse(store.sharedData)
  const workingWords = ref(sharedData);
  const cardDisplay = ref("Loading...");
  const warning = ref(false);
  const formShow = ref(true);
  const buttonOption = ref(1);
  const router = useRouter();
  const route = useRoute();
  let randomNum;
  let totalWords;
  let score = 0;

  const updateData = () => {
    store.setSharedData('New Value')
  }

  onMounted(() => {
    setWord();
    totalWords = sharedData.length;
  })

  const setWord = () =>{
    buttonOption.value = 1;
    formShow.value = true;
    randomNum = Math.floor(Math.random() * sharedData.length);
    workingWords.value = sharedData[randomNum];
    cardDisplay.value = workingWords.value.word;
  }
  
  const checkAnswer = () => {
    if (document.getElementById('card-answer').value === '') {
      warning.value = true;
      return;
    }
    buttonOption.value = 2;
    formShow.value = false;
    warning.value = false;
    const answer = workingWords.value.meaning;
    const transRegex = new RegExp(document.getElementById('card-answer').value, 'i');

    if(transRegex.test(answer)) {
      cardDisplay.value = `Correct Answer: ${workingWords.value.meaning}`;
      score++;
    } else {
      cardDisplay.value = `Incorrect Answer: ${workingWords.value.meaning}`;
    }
    
    sharedData.splice(randomNum, 1);
    if (sharedData.length === 0) {
      cardDisplay.value = `You have completed all the words! Your score is ${score}/${totalWords}`;
      buttonOption.value = 3;
    } else {
      randomNum = Math.floor(Math.random() * sharedData.length);
      workingWords.value = sharedData[randomNum];
    }

    document.getElementById('card-answer').value = '';
  }

  const backHome = () => {
    router.push({name: 'home'});
  }

</script>

<template>
    <div class="card">
      <h1>{{ cardDisplay }}</h1>
      <p v-if="warning" class="card-warning">Please enter the answer below</p>
      <input v-if="formShow" type="text" id="card-answer"/>
      <button v-if="buttonOption === 1" @click="checkAnswer">Check Answer</button>
      <button v-if="buttonOption === 2" @click="setWord">Next Word</button>
      <button v-if="buttonOption === 3" @click="backHome">Back To Start</button>
    </div>
</template>

<style scoped>
  h1 {
    margin-top: 1rem;
    margin-bottom: 0rem;
  }

  button {
    margin-bottom: 1rem;
  }

  .card {
    display: flex;
    flex-direction: column; 
    gap: 1rem;
    margin: 0 auto;
    width: 80%;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .card > * {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  
  .card-warning {
    color: red;
    font-style: italic;
  }

  #card-answer {
    height: 2rem;
    font-size: 1rem;
  }
</style>