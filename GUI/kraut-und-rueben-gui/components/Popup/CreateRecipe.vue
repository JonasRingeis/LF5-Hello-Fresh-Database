<template>
    <div class="popup-wrapper">
        <div class="popup">
            <img src="/img/close.svg" class="close-popup" @click="closeWindow">
            <h2>
                Create Recipe
            </h2>
            <form @submit.prevent="onSubmit">
                <input placeholder="Name" class="inputfield" v-model="name" type="text" />
                <textarea placeholder="Instructions" class="textarea" v-model="instructions" rows="4"></textarea>
                <input placeholder="Preparation Time (Min)" class="inputfield" v-model="preparationTime" type="number" />

                <div>
                    <select class="dropdown" @input="addIngredient" ref="ingredient">
                        <option v-for="(ingredient, index) in allIngredients" :value="ingredient.ZUTAT_ID" :key="index">
                            {{ ingredient.BEZEICHNUNG }}
                        </option>
                    </select>
                    <div class="popup-value-selector-result-wrapper">
                        <div v-for="(ingredient, index) in ingredientsSelected" :key="index" class="popup-value-selector-result">
                            <p>{{ ingredient.BEZEICHNUNG }}</p>
                            <button class="add" @click="incrementIngredient(ingredient.ZUTAT_ID)">+</button>
                            <button class="remove" @click="removeIngredient(ingredient.ZUTAT_ID)">X</button>
                        </div>
                    </div>
                </div>

                <input type="submit" value=""/>
                <button class="query-button" @click="createRecipe">
                    Create
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { getAllIngredients, createRecipe } from '../../assets/scripts/requester';
export default {
    methods: {
        closeWindow() {
            this.$emit("onWindowClose");
        },
        addIngredient() {
            const ingredientToAdd = this.allIngredients.filter((ingredient) => 
                    ingredient.ZUTAT_ID == this.$refs.ingredient.value)[0];
            ingredientToAdd.MENGE = 1;
            this.ingredientsSelected.push(ingredientToAdd);
        },
        removeIngredient(ingredientId) {
            const ingredientToRemove = this.ingredientsSelected.filter((ingredient) => ingredient.ZUTAT_ID == ingredientId)[0];
            if (ingredientToRemove.MENGE == 1) {
                this.ingredientsSelected.pop(ingredientToRemove);
            }
            else {
                ingredientToRemove.MENGE -= 1;
            }
        },
        incrementIngredient(ingredientId) {
            const ingredientToIncrement = this.ingredientsSelected.filter((ingredient) => ingredient.ZUTAT_ID == ingredientId)[0];
            ingredientToIncrement.MENGE += 1;
        },
        async getAllIngredients() {
            console.log("Getting all ingredients");
            const result = await getAllIngredients();
            this.allIngredients = result;
        },
        async createRecipe() {
            
            await createRecipe(this.name, this.instructions, this.preparationTime, this.ingredientsSelected);
        }
    },
    data() {
        return {
            allIngredients: [],
            ingredientsSelected: [],

            name: "",
            instructions: "",
            preparationTime: "",
        }
    },
    emits: [
        "onWindowClose"
    ],
    mounted() {
        this.getAllIngredients();
    }
}
</script>
<style lang="">
    
</style>