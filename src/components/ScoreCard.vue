<template>
    <div class="card-score" v-if="combinations.length">
        <h2>Combinations for {{ teamName }} with {{ score }} points:</h2>
        <ul class="card-score__list">
            <li
                class="card-score__item"
                v-for="(combination, index) in combinations"
                :key="index"
            >
                {{ combination }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import {defineProps} from 'vue';

defineProps({
    teamName: String,
    score: Number,
    combinations: Array,
});
</script>

<style scoped>
.card-score {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #f9f9f9;
    margin-top: 1rem;
}

.card-score__list {
    list-style-type: none;
    padding-left: 0;
}

.card-score__item {
    margin-bottom: 0.5rem;
}
</style>
