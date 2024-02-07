<template>
    <div class="popup-wrapper">
        <div class="popup" style="width:auto !important">
            <img src="/img/close.svg" class="close-popup" @click="closeWindow">
            <h2>
                Create Ingredient
            </h2>
            <form @submit.prevent="onSubmit">
                <div class="row-wrapper" style="gap: 5px;">
                    <div class="column-wrapper">
                        <input placeholder="Name" class="inputfield" v-model="name" type="text" required />
                        <input placeholder="Quantity" class="inputfield" v-model="quantity" type="number" step="0.01" required />
                        <input placeholder="Unit (g, ml, kg)" class="inputfield" v-model="unit" type="text" required />
                        <input placeholder="Price (X.xx)" class="inputfield" v-model="price" type="number" step="0.01" required />
                        <input placeholder="Stock" class="inputfield" v-model="stock" type="number" required />

                        <select class="dropdown" ref="foodCategory" required>
                            <option value="none" hidden>Select a Food Category</option>
                            <option value="1">Omnivor</option>
                            <option value="2">Pescetarian</option>
                            <option value="3">Vegetarian</option>
                            <option value="4">Vegan</option>
                            <option value="5">Frutar</option>
                        </select>

                        <DropdownMultiSelector ref="nutritionTrend" placeholder="Select a Nutrition Trend" :values="allINutritionTrends" idKey="ERNÄHRUNGSTREND_ID" nameKey="NAME" :quantityChangeable="false" @submit.prevent />
                    </div>
                    <div class="column-wrapper">
                        <input placeholder="Calories" class="inputfield" v-model="calories" type="number" step="0.01" required />
                        <input placeholder="Carbohydrates" class="inputfield" v-model="carbohydrates" type="number" step="0.01" required />
                        <input placeholder="Proteins" class="inputfield" v-model="proteins" type="number" step="0.01" required />
                        <input placeholder="Diatary Fiber" class="inputfield" v-model="diataryFiber" type="number" step="0.01" required />
                        <input placeholder="Fat" class="inputfield" v-model="fat" type="number" step="0.01" required />
                        <input placeholder="Sodium" class="inputfield" v-model="sodium" type="number" step="0.01" required />
                        
                        <DropdownMultiSelector ref="extra" placeholder="Select an Extra Tag" :values="allExtras" idKey="EXTRA_ID" nameKey="NAME" :quantityChangeable="false" @submit.prevent />
                    </div>
                </div>
                <select class="dropdown" ref="supplier">
                    <option value="none" selected hidden>
                        Select a Supplier
                    </option>
                    <option v-for="(supplier, index) in suppliers" :key="index" :value="supplier.LIEFERANTEN_ID">
                        {{ supplier.LIEFERANTENNAME }}
                    </option>
                </select>

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
import { getAllNutritionTrends, createIngredient, getAllSuppliers, getAllExtras } from '../../assets/scripts/requester';
export default {
    methods: {
        closeWindow() {
            this.$emit("onWindowClose");
        },
        async getAllData() {
            this.allINutritionTrends = await getAllNutritionTrends();
            this.suppliers = await getAllSuppliers();
            this.allExtras = await getAllExtras();
            this.allExtras = this.allExtras.map(extra => {
                return { NAME: extra.NAME.replace("Haltungsform", extra.ART), EXTRA_ID: extra.EXTRA_ID } 
            });
        },
        async createIngredient() {
            if (this.name == "" || this.quantity == "" || this.unit == "" || this.price == "" ||
                 this.stock == "" || this.calories == "" || this.carbohydrates == "" || this.proteins == "" ||
                 this.diataryFiber == "" || this.fat == "" || this.sodium == "") {
                return;
            }
            const foodCategory = this.$refs.foodCategory.value;
            if (foodCategory == "none") {
                alert("No Food Category Selected!");
                return;
            }
            const selectedNutritionTrend = this.$refs.nutritionTrend.getSelectedValues();
            const extraTags = this.$refs.extra.getSelectedValues();
            const supplier = this.$refs.supplier.value;
            if (supplier == "none") {
                alert("No Supplier Selected");
                return;
            }
            this.querySending = true;
            this.error = await createIngredient(this.name, this.quantity, this.unit, 
                    this.price, this.stock, this.calories, this.carbohydrates,
                    this.proteins, this.diataryFiber, this.fat, this.sodium,
                    foodCategory, selectedNutritionTrend, supplier, extraTags);
            this.querySending = false;
            if (this.error == "") {
                this.closeWindow();
            }
        }
    },
    data() {
        return {
            allINutritionTrends: [],
            suppliers: [],
            allExtras: [],

            error: "",
            querySending: false,

            name: "",
            quantity: "",
            unit: "",
            price: "",
            stock: "",
            calories: "",
            carbohydrates: "",
            proteins: "",
            diataryFiber: "",
            fat: "",
            sodium: "",
            
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