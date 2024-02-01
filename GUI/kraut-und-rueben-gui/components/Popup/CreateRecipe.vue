<template>
    <div class="popup-wrapper">
        <div class="popup">
            <img src="/img/close.svg" class="close-popup" @click="closeWindow">
            <h2>
                Create Recipe
            </h2>
            <form>
                <div class="inputfield-wrapper">
                    <input @input="checkNamePlaceholder" class="inputfield" name="Name" ref="name">
                    <label for="Name" v-if="namePlaceholder">Name</label>
                </div>
                <div class="inputfield-wrapper">
                    <input @input="checkInstructionsPlaceholder" class="inputfield" name="Instructions" ref="instructions">
                    <label for="Instructions" v-if="instructionsPlaceholder">Instructions</label>
                </div>
                <div class="inputfield-wrapper">
                    <input @input="checkPreparationTimePlaceholder" class="inputfield" name="Preparation Time"
                        ref="preparationtime">
                    <label for="Preparation Time" v-if="preparationTimePlaceholder">Preparation Time</label>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        checkNamePlaceholder() {
            this.namePlaceholder = this.$refs.name.value.length == 0;
        },
        checkInstructionsPlaceholder() {
            this.instructionsPlaceholder = this.$refs.instructions.value.length == 0;
        },
        checkPreparationTimePlaceholder() {
            this.preparationTimePlaceholder = this.$refs.preparationtime.value.length == 0;
        },
        closeWindow() {
            this.$emit("onWindowClose");
        }
    },
    data() {
        return {
            namePlaceholder: true,
            instructionsPlaceholder: true,
            preparationTimePlaceholder: true,
        }
    },
    emits: ["onWindowClose"]

}
</script>
<style lang="">
    
</style>