<template>
    <div>
        <select class="ingredient-dropdown dropdown" @input="addValue" ref="selector" >
            <option value="none" selected>
                {{ placeholder }}
            </option>
            <option v-for="(ingredient, index) in values" :value="ingredient[idKey]" :key="index">
                {{ ingredient[nameKey] }}
            </option>
        </select>
        <div class="popup-value-selector-result-wrapper">
            <div v-for="(value, index) in valuesSelected" :key="index" class="popup-value-selector-result">
                <p>{{ value.MENGE + "x " + value[nameKey] }}</p>
                <button class="add" @click="incrementValue(value[idKey])" @submit.prevent>
                    +
                </button>
                <button class="remove" @click="removeValue(value[idKey])" @submit.prevent>
                    -
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        placeholder: String,
        values: Array,
        idKey: String,
        nameKey: String,
        quantityKey: String
    },
    data() {
        return {
            valuesSelected: [],
        }
    },
    methods: {
        addValue() {
            const valueToAdd = this.values.filter((value) => 
                    value[this.idKey] == this.$refs.selector.value)[0];
            valueToAdd[this.quantityKey] = 1;
            this.valuesSelected.push(valueToAdd);
            this.$refs.selector.value = "none";
        },
        removeValue(id) {
            const valueToRemove = this.valuesSelected.filter((value) => value[this.idKey] == id)[0];
            if (valueToRemove[this.quantityKey] == 1) {
                this.valuesSelected.pop(valueToRemove);
            }
            else {
                valueToRemove[this.quantityKey] -= 1;
            }
        },
        incrementValue(id) {
            const valueToIncrement = this.valuesSelected.filter((value) => value[this.idKey] == id)[0];
            valueToIncrement[this.quantityKey] += 1;
        },
        getSelectedValues() {
            return this.valuesSelected;
        }
    },
    mounted() {
        this.$refs.selector.value = "none";
    }
}
</script>
<style>
    
</style>