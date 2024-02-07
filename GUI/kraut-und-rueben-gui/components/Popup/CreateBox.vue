<template>
    <div class="popup-wrapper">
        <div class="popup">
            <img src="/img/close.svg" class="close-popup" @click="closeWindow">
            <h2>
                Create Box
            </h2>
            <form @submit.prevent="onSubmit">
                <input placeholder="Name" class="inputfield" v-model="name" type="text" required />
                <input placeholder="Price (X.xx)" class="inputfield" v-model="price" type="number" step="0.01" required />
                <textarea placeholder="Description" class="textarea" v-model="description" rows="4" required></textarea>

                <DropdownMultiSelector ref="ingredients" placeholder="Select an Ingredient" :values="allIngredients"
                    idKey="ZUTAT_ID" nameKey="BEZEICHNUNG" quantityKey="MENGE" @submit.prevent />
                <p>
                    {{ error }}
                </p>
                <div class="center-wrapper" v-if="querySending">
                    <div class="loader"></div>
                </div>
                <input type="submit" value="Create" class="query-button" @click="createBoxes" />
            </form>
        </div>
    </div>
</template>

<script>
import { getAllIngredients, createBox } from '../../assets/scripts/requester';
export default {
    methods: {
        closeWindow() {
            this.$emit("onWindowClose");
        },
        async getAllIngredients() {
            this.allIngredients = [];
            const result = await getAllIngredients();
            this.allIngredients = this.allIngredients.concat(result);
        },
        async createBoxes() {
            if (this.name == "" || this.description == "" || this.price == "") {
                return;
            }
            const ingredientsSelected = this.$refs.ingredients.getSelectedValues();
            if (ingredientsSelected.length == 0) {
                alert("No Ingredients Selected!");
                return;
            }
            this.querySending = true;
            this.error = await createBox(this.name, this.description, this.price, ingredientsSelected);
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
            description: "",
            price: "",
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

input {
    margin-block: 3px;
}
</style>