<template>
  <div class="Question">
    <div>
      <strong>{{decodeURI(question.data.question)}}</strong>
      <div class="anwersWrapper">
        <div class="answer"
          v-for="(answer, index) of answers"
          :key="index"
          v-on:click="handleQuestionClick($event, answer.isCorrect)"
        >
          <!-- <span>{{answer}}</span> -->
          <span>{{answer.answer}}</span>
          <span v-if="isAnwered && answer.isCorrect">OK</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
const shuffleArray = array => {
  const order = array.map(() => Math.random());
  const result = array.map((el, i) => [el, i]);
  result.sort((a, b) => order[a[1]] - order[b[1]]);
  return result.map(el => el[0]);
};

export default {
  name: 'Question',
  props: {
    question: Object,
  },
  data() {
    return {
      isAnwered: false,
    };
  },
  beforeCreate() {
    // alert('1');
    shuffleArray([1]);
  },
  destroyed() {
    console.log('destroyed');
  },
  computed: {
    answers() {
      return shuffleArray(
        this.question.data.answers.map((answer, index) => ({
          answer: answer,
          isCorrect: index === 0,
        })),
      );
    },
  },
  methods: {
    handleQuestionClick($event, isCorrect) {
      if (this.isAnwered) {
        return;
      }
      this.isAnwered = true;
      this.$store.dispatch('answerQuestion', {
        hash: this.question.hash,
        isCorrect: isCorrect,
        probability: 0.5,
      });
      if (isCorrect) {
        // alert('ok');
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.answer {
  padding: 5px;
}
</style>
