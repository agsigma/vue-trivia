import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

const ADD_QUESTION = 'ADD_QUESTION';
const ANSWER_QUESTION = 'ANSWER_QUESTION';
const SAVE_ANSWERS = 'SAVE_ANSWERS';
const LOAD_ANSWERS = 'LOAD_ANSWERS';
const RESET_ANSWERED_QUESTIONS = 'RESET_ANSWERED_QUESTIONS';

const hashString = text => {
  return text;
};

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions: {},
    /*
    hash: {probability: double, isCorrect: boolean}
    */
    answeredQuestions: {},
  },
  mutations: {
    [SAVE_ANSWERS](state) {
      console.log(state);
      localStorage.setItem('answers', JSON.stringify(state.answeredQuestions));
    },
    [LOAD_ANSWERS](state) {
      console.log(state);
      var answeredQuestions = JSON.parse(localStorage.getItem('answers'));
      Vue.set(state, 'answeredQuestions', answeredQuestions);
    },
    [ADD_QUESTION](state, payload) {
      const myQuestion = {
        question: payload.data.question,
        answers: [
          payload.data.correct_answer,
          ...payload.data.incorrect_answers,
        ],
        hash: payload.questionHash,
      };
      Vue.set(state.questions, payload.questionHash, {
        raw: payload.data,
        data: myQuestion,
        // prob: null,
        // isCorrect: null,
        hash: payload.questionHash,
      });
    },
    [ANSWER_QUESTION](state, payload) {
      Vue.set(state.answeredQuestions, payload.hash, {
        probability: payload.probability,
        isCorrect: payload.isCorrect,
      });
    },
    [RESET_ANSWERED_QUESTIONS](state) {
      state.answeredQuestions = {};
    },
  },
  actions: {
    async fetchQuestions({ commit }) {
      const response = await axios
        .get('https://opentdb.com/api.php?amount=50')
        .catch(() => null);
      if (!response) {
        console.log('fetchQuestions no response');
        return null;
      }
      if (response.data.response_code !== 0) {
        console.log('fetchQuestions response error', response.data);
        return null;
      }
      // console.log(response);
      for (let question of response.data.results) {
        if (/Entertainment/.test(question.category)) {
          continue;
        }
        commit(ADD_QUESTION, {
          questionHash: hashString(question.question),
          data: question,
        });
      }
    },
    answerQuestion({ commit }, payload) {
      commit(ANSWER_QUESTION, payload);
      commit(SAVE_ANSWERS);
    },
  },
});
