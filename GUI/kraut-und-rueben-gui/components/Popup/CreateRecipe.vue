<template>
    <div class="popup-wrapper">
        <div class="popup">
            <img src="/img/close.svg" class="close-popup" @click="closeWindow">
            <h2>
                Create Recipe
            </h2>
            <form @submit.prevent="onSubmit">
                <input placeholder="Name" class="inputfield" v-model="name" type="text" required />
                <textarea placeholder="Instructions" class="textarea" v-model="instructions" rows="4" required ></textarea>
                <input placeholder="Preparation Time (Min)" class="inputfield" v-model="preparationTime" type="number" required />

                <div>
                    <select class="ingredient-dropdown dropdown" @input="addIngredient" ref="ingredient">
                        <option v-for="(ingredient, index) in allIngredients" :value="ingredient.ZUTAT_ID" :key="index">
                            {{ ingredient.BEZEICHNUNG }}
                        </option>
                    </select>
                    <div class="popup-value-selector-result-wrapper">
                        <div v-for="(ingredient, index) in ingredientsSelected" :key="index" class="popup-value-selector-result">
                            <p>{{ ingredient.MENGE + "x " + ingredient.BEZEICHNUNG }}</p>
                            <button class="add" @click="incrementIngredient(ingredient.ZUTAT_ID)" @submit.prevent>
                                +
                            </button>
                            <button class="remove" @click="removeIngredient(ingredient.ZUTAT_ID)" @submit.prevent>
                                -
                            </button>
                        </div>
                    </div>
                </div>
                <p>
                    {{ error }}
                </p>
                <div class="center-wrapper" v-if="querySending">
                    <div class="loader"></div>
                </div>
                <input type="submit" value="Create" class="query-button" @click="createRecipe" />
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
            this.$refs.ingredient.value = "Choose an Ingredient";
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
            this.allIngredients = [];
            this.allIngredients.push({BEZEICHNUNG: "Choose an Ingredient"});
            const result = await getAllIngredients();
            this.allIngredients = this.allIngredients.concat(result);
        },
        async createRecipe() {
            if (this.name == "" || this.instructions == "" || this.preparationTime == "") {
                return;
            }
            if (this.ingredientsSelected.length == 0) {
                alert("No Ingredients Selected!");
                return;
            }
            this.querySending = true;
            this.error = await createRecipe(this.name, this.instructions, this.preparationTime, this.ingredientsSelected);
            this.querySending = false;
            if (this.error == "") {
                this.closeWindow();
            }
        }
    },
    data() {
        return {
            allIngredients: [],
            ingredientsSelected: [],
            error: "",
            querySending: false,

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
<style scoped>
.ingredient-dropdown {
    width: 100%;
    margin: 5px 0px;
}
</style>