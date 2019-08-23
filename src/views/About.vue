<template>
  <div class="About">
    <!-- {{questions}} -->
    <h1>QUESTIONS</h1>
    <Question :question="question" v-if="question" :key="question.hash" />
    <!-- <div v-for="question of questions" :key="question.hash">
      <Question :question="question" />

    <div>{{question.data.question}}</div>-->
    <!--<div
        v-for="(answer, index) of answers(question.data)"
        :key="index"
        v-on:click="handleQuestionClick(answer.isCorrect)"
    >{{answer}}</div>-->
    <!--</div> -->
    <div>
      <strong v-on:click="handleClickNext">NEXT</strong>
    </div>
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
  name: 'About',
  async beforeCreate() {
    await this.$store.dispatch('fetchQuestions');
    console.log(this.$store);
    this.getQuestion();
  },
  data() {
    return { question: null };
  },
  components: {
    Question,
  },
  computed: {
    questions() {
      return Object.values(this.$store.state.questions);
    },
  },
  methods: {
    getQuestion() {
      let questions = Object.values(this.$store.state.questions);
      questions = questions.filter(question => {
        console.log('!', this.$store.state.answeredQuestions, question.hash);
        return !this.$store.state.answeredQuestions[question.hash];
      });
      console.log('q', questions);
      if (questions.length < 10) {
        this.$store.dispatch('fetchQuestions');
      }
      this.question = questions[Math.floor(questions.length * Math.random())];
    },
    handleClickNext() {
      this.getQuestion();
    },
  },
};
</script>
<style scoped>
.answer {
  padding: 5px;
}
</style>