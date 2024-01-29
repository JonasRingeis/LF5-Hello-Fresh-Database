<template>
    <div class="wrapper">
        <h2>Ingredient Data</h2>

        <div class="button-wrapper">
            <div class="selector-wrapper">
                <select @input="setDropdownValue" ref="searchField" class="dropdown">
                    <option value="LIEFERANTEN_ID">Id</option>
                    <option value="LIEFERANTENNAME">Supplier Name</option>
                    <option value="STRASSE">Street</option>
                    <option value="HAUSNR">House Nr</option>
                    <option value="PLZ">Zip Code</option>
                    <option value="ORT">City</option>
                    <option value="TELEFON">Telephone</option>
                    <option value="EMAIL">Email</option>
                    <option value="BUND_NAME">State Name</option>
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
            <table class="result-table">
              <tr>
                <th>ZUTAT ID</th>
                <th>Bezeichnung</th>
                <th>Einheit</th>
                <th>Nettopreis</th>
                <th>Bestand</th>
                <th>Lieferanten ID</th>
                <th>Haltungsform ID</th>
                <th>Kalorien</th>
                <th>Kohlenhydrate</th>
                <th>Proteine</th>
                <th>Ballaststoffe</th>
                <th>Fett</th>
                <th>Natrium</th>
              </tr>
              <tr v-for="(Ingredient, index) in Ingredients" :key="index">
                <td>{{ Ingredient.ZUTAT_ID }}</td>
                <td>{{ Ingredient.BEZEICHNUNG }}</td>
                <td>{{ Ingredient.EINHEIT }}</td>
                <td>{{ Ingredient.NETTOPREIS }}</td>
                <td>{{ Ingredient.BESTAND }}</td>
                <td>{{ Ingredient.LIEFERANTEN_ID }}</td>
                <td>{{ Ingredient.HALTUNGSFORM_ID }}</td>
                <td>{{ Ingredient.KALORIEN }}</td>
                <td>{{ Ingredient.KOHLENHYDRATE }}</td>
                <td>{{ Ingredient.PROTEINE }}</td>
                <td>{{ Ingredient.BALLASTSTOFFE }}</td>
                <td>{{ Ingredient.FETT }}</td>
                <td>{{ Ingredient.NATRIUM }}</td>
              </tr>
            </table>
        </div>
        <div v-if="Ingredients.length == 0 && queryFinished">
            <h4 style="color: red;">
                No Ingredients Found
            </h4>
        </div>
        <h4 style="color: red;" v-if="error != ''">
            {{ error }}
        </h4>
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
            error: ""
        }
    },
    methods: {
        checkPlaceholder() {
            this.placeholderShown = this.$refs.searchValue.value.length == 0;
        },
        async getFilteredIngredients() {
            this.resetProps();
            
            const result = await getIngredientWithSearch(this.$refs.searchField.value, this.$refs.searchValue.value);
            if (result.error != undefined) {
                this.error = result.error;
            } else {
                this.Ingredients = result;
                this.queryFinished = true;
            }
        },
        async getAllIngredients() {
            this.resetProps();
            
            const result = await getAllIngredients();
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