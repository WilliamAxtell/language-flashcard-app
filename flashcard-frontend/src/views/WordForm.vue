<script setup>
import { ref } from 'vue';

const wordType = ref("noun");

const createWord = async (e) => {
  e.preventDefault();
  const wordTypeFunc = document.querySelector('input[name="word type"]:checked').value;
  const builtWord = [];
  const translation = document.getElementById("translation").value;
  builtWord.unshift(translation.toLowerCase().trim());

  if(wordTypeFunc == "noun") {
    const nounGender = document.getElementById("noun-gender").value;
    const norskWord = document.getElementById("word").value;
    const completeNoun = nounGender + " " + norskWord.toLowerCase().trim();
    builtWord.unshift(completeNoun);
  } else if(wordTypeFunc == "verb") {
    let verbInfinitive = document.getElementById("infinitive").value;
    const verbPresent = document.getElementById("present").value;
    const verbPreteritum = document.getElementById("preteritum").value;
    let verbPerfektum = document.getElementById("perfektum").value;
    
    const infinitiveRegex = new RegExp("^" + String.fromCharCode(229) + " ", "i");
    if (!infinitiveRegex.test(verbInfinitive)) {
      verbInfinitive = String.fromCharCode(229) + " " + verbInfinitive;
    };
    
    const perfektumRegex = new RegExp("^har ", "i");
    if (!perfektumRegex.test(verbPerfektum)) {
      verbPerfektum = "har " + verbPerfektum;
    };
    
    const completeVerb = verbInfinitive.toLowerCase().trim() + ", " +
                         verbPresent.toLowerCase().trim() + ", " +
                         verbPreteritum.toLowerCase().trim() + ", " + 
                         verbPerfektum.toLowerCase().trim();
    
    builtWord.unshift(completeVerb);
  } else {
    const otherWord = document.getElementById("word").value;;
    builtWord.unshift(otherWord.toLowerCase().trim());
  }
  console.log(builtWord);

  await fetch(`http://localhost:3000/api/v1`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(builtWord)
    }).then((response) => response.json()
  );

  window.location.reload();
}


</script>

<template>
  <div class="home-form">
    <form>
      <h2 class="standard-margin">Pick how many words you would like to revise and start!</h2>

      <div class="radio-block standard-margin">
        <input type="radio" id="noun" name="word type" value="noun" v-model="wordType" checked="checked">
        <label for="noun">Noun</label>
        
        <input type="radio" id="verb" name="word type" value="verb" v-model="wordType">
        <label for="verb">Verb</label>
        
        <input type="radio" id="other" name="word type" value="other" v-model="wordType">
        <label for="other">Other</label>
      </div>

      <div v-if="wordType == 'noun'">
        <label for="noun-gender" class="standard-margin">Noun Gender
          <select id="noun-gender" name="noun-gender">
            <option value="en">En</option>
            <option value="ei">Ei</option>
            <option value="et">Et</option>
          </select>
        </label>
      </div>

      <div v-if="wordType == 'verb'" class="standard-margin verb-block">
        <p class="standard-margin">Verb Parts</p>
        <label for="infinitive" class="standard-margin">Infinitive
          <input type="text" id="infinitive" name="infinitive" required>
        </label>

        <label for="present" class="standard-margin">Present
         <input type="text" id="present" name="present" required>
        </label>

        <label for="preteritum" class="standard-margin">Preteritum
         <input type="text" id="preteritum" name="preteritum" required>
        </label>

        <label for="perfektum" class="standard-margin">Perfektum
         <input type="text" id="perfektum" name="perfektum" required>
        </label>
      </div>

      <div v-if="wordType == 'noun' || wordType == 'other'">
        <label for="word" class="standard-margin">Norwegian Word
          <input type="text" id="word" name="word" required>
        </label>
      </div>

      <div>
        <label for="translation" class="standard-margin">Translation
          <input type="text" id="translation" name="translation" required>
        </label>
      </div>

      <button type="submit" @click="createWord" class="standard-margin">Add Word</button>
    </form> 
  </div>
</template>

<style scoped>

form * {
  display: block;
}

.radio-block {
  display: flex;
  align-items: center;
}

.radio-block label {
  margin-right: 1rem;
  margin-top: 0.3rem;
}

.standard-margin {
  margin: 1rem;
}

.verb-block {
  border: 1px solid black;
  border-radius: 5px;
}

#noun {
  margin-left: 0;
}

input[type="radio"] {
  height: 1rem;
  width: 1rem;
}
</style>
