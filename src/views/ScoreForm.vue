<template>
    <div class="form-wrapper">
        <h2 class="form-wrapper__title">American Football</h2>
        <form class="form" @submit.prevent="getCombinations">
            <Button
                class="form__button"
                label="Get Possibilities"
                @submitForm="getCombinations"
                :bgColor="'#ca563c'"
                :textColor="'white'"
                :icon="ballIcon"
            ></Button>

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
                    <div
                        v-if="errors.errorMessage1"
                        class="form__error-message"
                    >
                        <p>{{ errors.errorMessage1 }}</p>
                    </div>

                    <ScoreCard
                        v-if="combinations.team1.length"
                        class="form__score-card"
                        :teamName="'Team X '"
                        :score="form.score1"
                        :combinations="combinations.team1"
                        name="score2"
                    />
                </div>

                <div class="form__group">
                    <ScoreInput
                        class="form__input"
                        label="Team Y"
                        v-model="form.score2"
                        :icon="teamY"
                    />
                    <div
                        v-if="errors.errorMessage2"
                        class="form__error-message"
                    >
                        <p>{{ errors.errorMessage2 }}</p>
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
import {ref, watch} from 'vue';
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

const errors = ref({
    errorMessage1: '',
    errorMessage2: '',
});

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

const validateFormData = (score1, score2) => {
    let hasError = false;

    if (!validateScore(score1)) {
        errors.value.errorMessage1 = errorPositiveNumber;
        hasError = true;
    } else {
        errors.value.errorMessage1 = '';
    }

    if (!validateScore(score2)) {
        errors.value.errorMessage2 = errorPositiveNumber;
        hasError = true;
    } else {
        errors.value.errorMessage2 = '';
    }

    return hasError;
};

const getCombinations = async () => {
    const hasError = validateFormData(form.value.score1, form.value.score2);

    if (hasError) {
        return;
    }

    try {
        const response = await axios.get(
            `http://localhost:3000/combinations?team1=${form.value.score1}&team2=${form.value.score2}`,
        );
        combinations.value = response.data;
    } catch (error) {
        console.error(
            'Erreur lors de la récupération des combinaisons:',
            error,
        );
        if (
            error.response.data.error ===
            "L'API ne peut supporter un score supérieur à 55"
        ) {
            alert(error.response?.data?.error);
        }
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

.form__error-message {
    color: red;
}

.form__input {
    margin-bottom: 10px;
}
</style>
