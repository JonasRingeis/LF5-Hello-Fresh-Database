<template>
    <div class="popup-wrapper">
        <div class="popup">
            <img src="/img/close.svg" class="close-popup" @click="closeWindow">
            <h2>
                Create Ingredient
            </h2>
            <form @submit.prevent="onSubmit">
                <input placeholder="Name" class="inputfield" v-model="name" type="text" required />
                <input placeholder="Quantity" class="inputfield" v-model="quantity" type="text" required />
                <input placeholder="Unit (g, ml, kg)" class="inputfield" v-model="unit" type="text" required />
                <input placeholder="Price (X.xx)" class="inputfield" v-model="price" type="text" required />
                <input placeholder="Stock" class="inputfield" v-model="stock" type="number" required />

                <select class="dropdown" ref="foodCategory">
                    <option value="none" hidden>Select a Food Category</option>
                    <option value="1">Omnivor</option>
                    <option value="2">Pescetarian</option>
                    <option value="3">Vegetarian</option>
                    <option value="4">Vegan</option>
                    <option value="5">Frutar</option>
                </select>

                <DropdownMultiSelector placeholder="Select a Nutrition Trend" :values="allINutritionTrends" idKey="ERNÄHRUNGSTREND_ID" nameKey="NAME" quantityChangeable="false" @submit.prevent />
                
                <h3>Nutrition Facts</h3>
                <input placeholder="Calories" class="inputfield" v-model="calories" type="text" required />
                <input placeholder="Carbohydrates" class="inputfield" v-model="carbohydrates" type="text" required />
                <input placeholder="Proteins" class="inputfield" v-model="proteins" type="text" required />
                <input placeholder="Diatary Fiber" class="inputfield" v-model="diataryFiber" type="text" required />
                <input placeholder="Fat" class="inputfield" v-model="fat" type="text" required />
                <input placeholder="Sodium" class="inputfield" v-model="sodium" type="text" required />

                <p>
                    {{ error }}
                </p>
                <div class="center-wrapper" v-if="querySending">
                    <div class="loader"></div>
                </div>
                <input type="submit" value="Create" class="query-button" @click="createIngredient" />
            </form>
        </div>
    </div>
</template>

<script>
import { getAllNutritionTrends, createIngredient } from '../../assets/scripts/requester';
export default {
    methods: {
        closeWindow() {
            this.$emit("onWindowClose");
        },
        async getAllData() {
            this.allIngredients = await getAllNutritionTrends();
        },
        async createIngredient() {
            if (this.name == "" || this.instructions == "" || this.preparationTime == "") {
                return;
            }
            if (this.ingredientsSelected.length == 0) {
                alert("No Ingredients Selected!");
                return;
            }
            this.querySending = true;
            this.error = await createIngredient(this.name, this.instructions, this.preparationTime, this.ingredientsSelected);
            this.querySending = false;
            if (this.error == "") {
                this.closeWindow();
            }
        }
    },
    data() {
        return {
            allINutritionTrends: [],
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
        this.getAllData();
    }
}
</script>
<style scoped>
input {
    margin-block: 3px;
}
</style>