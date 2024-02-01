<template>
    <div class="wrapper">
        <h2>Ingredient Data</h2>

        <div class="center-wrapper">
            <div class="selector-wrapper">
                <select @input="setDropdownValue" ref="searchField" class="dropdown">
                    <option value="Z.ZUTAT_ID">Id</option>
                    <option value="Z.BEZEICHNUNG">Name</option>
                    <option value="Z.EINHEIT">Unit</option>
                    <option value="Z.NETTOPREIS">Net Price</option>
                    <option value="Z.BESTAND">Stock</option>
                    <option value="Z.LIEFERANTEN_ID">Supplier Id</option>
                    <option value="N.KALORIEN">Calories</option>
                    <option value="N.KOHLENHYDRATE">Carbohydrates</option>
                    <option value="N.PROTEINE">Proteins</option>
                    <option value="N.BALLASTSTOFFE">Fiber</option>
                    <option value="N.FETT">Fat</option>
                    <option value="N.NATRIUM">Sodium</option>
                    <option value="L.LIEFERANTENNAME">Supplier Name</option>
                    <option value="A.STRASSE">Supplier Street</option>
                    <option value="A.HAUSNR">Supplier House Nr</option>
                    <option value="A.PLZ">Supplier Zip Code</option>
                    <option value="A.WOHNORT">Supplier City</option>
                    <option value="B.BUND_NAME">State</option>
                    <option value="L.TELEFON">Supplier Telephone</option>
                    <option value="L.EMAIL">Supplier Email</option>
                </select>
            </div>
            <div class="selector-wrapper">
                <select @input="setDropdownValue" ref="operatorField" class="dropdown">
                    <option value="=">=</option>
                    <option value="<">&lt;</option>
                    <option value=">">&gt;</option>
                    <option value="LIKE">Contains</option>
                </select>
            </div>
            <div class="inputfield-wrapper">
                <input type="text" ref="searchValue" class="inputfield" @input="checkPlaceholder" />
                <label v-if="placeholderShown">
                    Search Value
                </label>
            </div>

            <button class="query-button" @click="getFilteredIngredients">
                Search Ingredients
            </button>

            <button class="query-button" @click="getAllIngredients">
                Get All Ingredients
            </button>
        </div>

        <div class="result-table-wrapper">
            <table class="result-table" cellspacing="0">
                <tr>
                    <th>Ingredient ID</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Net Price</th>
                    <th>Stock</th>
                    <th v-if="nutritionFacts">Calories</th>
                    <th v-if="nutritionFacts">Carbohydrates</th>
                    <th v-if="nutritionFacts">Proteins</th>
                    <th v-if="nutritionFacts">Dietary Fiber</th>
                    <th v-if="nutritionFacts">Fat</th>
                    <th v-if="nutritionFacts">Sodium</th>
                    <th v-if="supplierData">Supplier Name</th>
                    <th v-if="supplierData">Supplier Street</th>
                    <th v-if="supplierData">Supplier Nr</th>
                    <th v-if="supplierData">Supplier Zip Code</th>
                    <th v-if="supplierData">Supplier City</th>
                    <th v-if="supplierData">Supplier State</th>
                    <th v-if="supplierData">Supplier Telephone</th>
                    <th v-if="supplierData">Supplier Email</th>
                </tr>
                <tr v-for="(Ingredient, index) in Ingredients" :key="index"
                    :style="'background: ' + (index % 2 == 0 ? '#f2f2f2' : 'white')">
                    <td>{{ Ingredient.ZUTAT_ID }}</td>
                    <td>{{ Ingredient.BEZEICHNUNG }}</td>
                    <td>{{ parseFloat(Ingredient.MENGE) }}{{ (Ingredient.EINHEIT == "Stück" ? " " : "") + Ingredient.EINHEIT
                    }}</td>
                    <td>{{ Ingredient.NETTOPREIS }}€</td>
                    <td>{{ Ingredient.BESTAND }}</td>
                    <td v-if="nutritionFacts">{{ Ingredient.KALORIEN }}kcal</td>
                    <td v-if="nutritionFacts">{{ Ingredient.KOHLENHYDRATE }}g</td>
                    <td v-if="nutritionFacts">{{ Ingredient.PROTEINE }}g</td>
                    <td v-if="nutritionFacts">{{ Ingredient.BALLASTSTOFFE }}g</td>
                    <td v-if="nutritionFacts">{{ Ingredient.FETT }}g</td>
                    <td v-if="nutritionFacts">{{ Ingredient.NATRIUM }}g</td>
                    <td v-if="supplierData">{{ Ingredient.LIEFERANTENNAME }}</td>
                    <td v-if="supplierData">{{ Ingredient.STRASSE }}</td>
                    <td v-if="supplierData">{{ Ingredient.HAUSNR }}</td>
                    <td v-if="supplierData">{{ Ingredient.PLZ }}</td>
                    <td v-if="supplierData">{{ Ingredient.WOHNORT }}</td>
                    <td v-if="supplierData">{{ Ingredient.BUND_NAME }}</td>
                    <td v-if="supplierData">{{ Ingredient.TELEFON }}</td>
                    <td v-if="supplierData">{{ Ingredient.EMAIL }}</td>
                </tr>
            </table>
        </div>

        <div class="center-wrapper" v-if="querySending">
            <div class="loader"></div>
        </div>

        <div v-if="Ingredients.length == 0 && queryFinished">
            <h4 style="color: red;">
                No Ingredients Found
            </h4>
        </div>
        <h4 style="color: red;" v-if="error != ''">
            {{ error }}
        </h4>

        <div class="center-wrapper">
            <div class="filter">
                <h2 style="margin-bottom: 5px; text-align: left;">
                    Filter
                </h2>
                <div class="filter-wrapper">
                    <label>
                        <input name="nutrition" type="checkbox" checked @input="nutritionFacts = !nutritionFacts" />
                        Nutrition Facts
                    </label>
                    <label>
                        <input name="supplier" type="checkbox" checked @input="supplierData = !supplierData" />
                        Supplier Data
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '../../assets/css/QueryStyle.css';
import { getIngredientWithSearch, getAllIngredients } from '../../assets/scripts/requester';

export default {
    data() {
        return {
            placeholderShown: true,
            Ingredients: [],
            queryFinished: false,
            querySending: false,
            error: "",

            //filter
            nutritionFacts: true,
            supplierData: true,
        }
    },
    methods: {
        checkPlaceholder() {
            this.placeholderShown = this.$refs.searchValue.value.length == 0;
        },
        async getFilteredIngredients() {
            this.resetProps();
            this.querySending = true;

            const result = await getIngredientWithSearch(this.$refs.searchField.value,
                this.$refs.searchValue.value, this.$refs.operatorField.value);
            this.querySending = false;
            if (result.error != undefined) {
                this.error = result.error;
            } else {
                this.Ingredients = result;
                this.queryFinished = true;
            }
        },
        async getAllIngredients() {
            this.resetProps();
            this.querySending = true;

            const result = await getAllIngredients();
            this.querySending = false;
            if (result.error != undefined) {
                this.error = result.error;
            } else {
                this.Ingredients = result;
                this.queryFinished = true;
            }
        },
        resetProps() {
            this.Ingredients = [];
            this.error = "";
            this.queryFinished = false;
        }
    }
}
</script>
<style lang="">
    
</style>