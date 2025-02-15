<template>
    <div class="score-input">
        <label class="score-input__label">{{ label }}</label>
        <component :is="icon" class="score-input__icon" />
        <div class="score-input__input-wrapper">
            <input
                :value="modelValue"
                @input="updateValue"
                class="score-input__input"
            />
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue']);

defineProps({
    label: {
        type: String,
        required: true,
    },
    modelValue: [Number],
    icon: {
        type: Object,
        default: null,
    },
});

const updateValue = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>

<style scoped>
.score-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.score-input__label {
    font-weight: bold;
    text-align: center;
    font-size: 25px;
}

.score-input__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
}

.score-input__input-wrapper {
    display: flex;
    justify-content: center;
}

.score-input__input {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: auto;
    max-width: 300px;
    margin-top: 4px;
}
</style>
