<template>
    <div class="form-wrapper">
        <h2 class="form-wrapper__title">American Football</h2>
        <form class="form" @submit.prevent="getCombinations">
            <div class="form__button-wrapper">
                <Button
                    class="form__button"
                    label="Get Possibilities"
                    type="submit"
                    :bgColor="'#ca563c'"
                    :textColor="'#ffffff'"
                    :icon="ballIcon"
                ></Button>
            </div>

            <div v-if="errorMessage" class="form__error-message">
                <p>{{ errorMessage }}</p>
            </div>

            <div class="form__inputs">
                <div class="form__group">
                    <ScoreInput
                        class="form__input"
                        label="Team X"
                        v-model="form.score1"
                        :icon="teamX"
                        name="score1"
                    />
                    <div v-if="validScores.score1" class="form__error-message">
                        <p>{{ validScores.score1 }}</p>
                    </div>

                    <ScoreCard
                        v-if="combinations.team1.length"
                        class="form__score-card"
                        :teamName="'Team X '"
                        :score="form.score1"
                        :combinations="combinations.team1"
                    />
                </div>

                <div class="form__group">
                    <ScoreInput
                        class="form__input"
                        label="Team Y"
                        v-model="form.score2"
                        :icon="teamY"
                    />
                    <div v-if="validScores.score2" class="form__error-message">
                        <p>{{ validScores.score2 }}</p>
                    </div>

                    <ScoreCard
                        v-if="combinations.team2.length"
                        class="form__score-card"
                        :teamName="'Team Y'"
                        :score="form.score2"
                        :combinations="combinations.team2"
                    />
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import {ref, computed, watch} from 'vue';
import axios from 'axios';

import Button from '../components/Button.vue';
import ScoreCard from '../components/ScoreCard.vue';
import ScoreInput from '../components/ScoreInput.vue';

import teamX from '../assets/teamX.vue';
import teamY from '../assets/teamY.vue';
import ballIcon from '../assets/icons/ballIcon.svg';

const combinations = ref({
    team1: [],
    team2: [],
});

const form = ref({
    score1: 0,
    score2: 0,
});

const errorMessage = ref('');

//listen dynamically the changes to reinitialize the array combination: and not display ScoreCard if combination is empty
watch(
    () => ({score1: form.value.score1, score2: form.value.score2}),
    (newScores, oldScores) => {
        if (newScores.score1 !== oldScores.score1) {
            combinations.value.team1 = [];
        }
        if (newScores.score2 !== oldScores.score2) {
            combinations.value.team2 = [];
        }
    },
);

const validateScore = (score) => {
    const regex = /^\d+$/;
    return regex.test(score);
};

const errorPositiveNumber = 'Le score doit être un nombre entier positif.';

const validScores = computed(() => {
    const errorMessages = {
        score1: '',
        score2: '',
    };

    if (!validateScore(form.value.score1)) {
        errorMessages.score1 = errorPositiveNumber;
    }

    if (!validateScore(form.value.score2)) {
        errorMessages.score2 = errorPositiveNumber;
    }

    return errorMessages;
});

const getCombinations = async () => {
    errorMessage.value = '';

    if (validScores.value.score1 || validScores.value.score2) {
        return;
    }

    try {
        const response = await axios.get(
            `http://localhost:3000/combinations?team1=${form.value.score1}&team2=${form.value.score2}`,
        );
        combinations.value = response.data;
    } catch (error) {
        console.error('Error while fetch API combinations', error);
        errorMessage.value = error.response?.data?.error || 'An error occured';
    }
};
</script>

<style scoped>
.form-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    flex-direction: column;
}

.form-wrapper__title {
    margin-bottom: 20px;
}

.form {
    margin-bottom: 20px;
}

.form__inputs {
    display: flex;
    gap: 20px;
    width: 100%;
    flex-wrap: wrap;
}

.form__group {
    flex: 1;
    min-width: 300px;
}

.form__button {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
}

.form__button-wrapper {
    margin-bottom: 20px;
}

.form__error-message {
    color: red;
}

.form__input {
    margin-bottom: 10px;
}
</style>
