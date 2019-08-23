<template>
  <div class="About">
    <!-- {{questions}} -->
    <h1>This is results page {{correctPercent}}</h1>
    <div class="btn" v-on:click="handleResetClick">RESET</div>
    <div v-for="question of answeredQuestions" :key="question.hash">
      <div>{{question}}</div>
    </div>
    <!--<div
        v-for="(answer, index) of answers(question.data)"
        :key="index"
        v-on:click="handleQuestionClick(answer.isCorrect)"
    >{{answer}}</div>-->
    <!--</div> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import Question from '@/components/Question.vue';

// const shuffleArray = array => {
//   const order = array.map(() => Math.random());
//   const result = array.map((el, i) => [el, i]);
//   result.sort((a, b) => order[a[1]] - order[b[1]]);
//   return result.map(el => el[0]);
// };

export default {
  name: 'Results',
  async beforeCreate() {},
  data() {
    return {};
  },
  components: {
    Question,
  },
  computed: {
    answeredQuestions() {
      console.log('Results', this.$store.state);
      return Object.values(this.$store.state.answeredQuestions);
    },
    correctPercent() {
      const answeredQuestions = Object.values(
        this.$store.state.answeredQuestions,
      );
      const correctlyAnswerdQuestions = answeredQuestions.filter(
        question => question.isCorrect,
      );
      return correctlyAnswerdQuestions.length / (answeredQuestions.length || 1);
    },
  },
  methods: {
    handleResetClick() {
      this.$store.commit('RESET_ANSWERED_QUESTIONS');
      this.$store.commit('SAVE_ANSWERS');
    },
  },
};
</script>
