<template>
    <button
        class="btn"
        :style="{backgroundColor: bgColor, color: textColor}"
        @click="$emit('click')"
    >
        <span>{{ label }}</span>
        <img v-if="icon" :src="icon" alt="icon" class="button__icon" />
    </button>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        required: true,
    },
    bgColor: {
        type: String,
        default: '#faefd8',
    },
    textColor: {
        type: String,
        default: '#f5945c',
    },
    icon: {
        type: String,
        default: '', // Permet d'insérer du SVG via v-html
    },
});
</script>

<style>
.btn {
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    min-width: 200px;
    min-height: 60px;
}

.btn:hover {
    filter: brightness(0.9);
}

.button__icon {
    width: 20px;
    height: 20px;
    margin-left: 10px;
}
</style>
