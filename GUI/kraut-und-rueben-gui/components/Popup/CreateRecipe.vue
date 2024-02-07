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

                <DropdownMultiSelector ref="ingredients" placeholder="Select an Ingredient" :values="allIngredients" idKey="ZUTAT_ID" nameKey="BEZEICHNUNG" quantityKey="MENGE" @submit.prevent />
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
        async getAllIngredients() {
            this.allIngredients = await getAllIngredients();
        },
        async createRecipe() {
            if (this.name == "" || this.instructions == "" || this.preparationTime == "") {
                return;
            }
            const ingredientsSelected = this.$refs.ingredients.getSelectedValues();
            if (ingredientsSelected.length == 0) {
                alert("No Ingredients Selected!");
                return;
            }
            this.querySending = true;
            this.error = await createRecipe(this.name, this.instructions, this.preparationTime, ingredientsSelected);
            this.querySending = false;
            if (this.error == "") {
                this.closeWindow();
            }
        }
    },
    data() {
        return {
            allIngredients: [],
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