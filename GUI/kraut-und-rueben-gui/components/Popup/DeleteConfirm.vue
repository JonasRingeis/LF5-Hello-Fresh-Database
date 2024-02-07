<template>
    <div class="popup-wrapper">
        <div class="popup">
            <img src="/img/close.svg" class="close-popup" @click="closeWindow">
            <h2>
                Delete Customer
            </h2>
            <p>
                Are you sure, you want 
            </p>
            <form @submit.prevent="onSubmit">
                <input placeholder="Name" class="inputfield" v-model="name" type="text" required />
                <input placeholder="Price (X.xx)" class="inputfield" v-model="price" type="number" step="0.01" required />

                <select class="dropdown" ref="foodCategory" required>
                    <option value="none" hidden>Select a Food Category</option>
                    <option value="1">Omnivor</option>
                    <option value="2">Pescetarian</option>
                    <option value="3">Vegetarian</option>
                    <option value="4">Vegan</option>
                    <option value="5">Frutar</option>
                </select>

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
import { deleteCustomer } from '../../assets/scripts/requester';
export default {
    methods: {
        closeWindow() {
            this.$emit("onWindowClose");
        },
        delete() {

        }
    },
    props: {
        customerName: String,
        customerId: String
    },
    data() {
        return {
            error: "",
            querySending: false,
        }
    },
    emits: [
        "onWindowClose"
    ],
}
</script>
