<template lang="">
    <div class="wrapper">
        <h2>Recipe Data</h2>

        <div class="center-wrapper">
            <div class="selector-wrapper">
                <select @input="setDropdownValue" ref="searchField" class="dropdown">
                    <option value="R.REZEPT_ID">Id</option>
                    <option value="R.NAME">Name</option>
                    <option value="R.DAUER">Preparation Time</option>
                    <option value="R.MENGE">Quantity</option>
                    <option value="R.ANLEITUNG">Instruction</option>
                    <option value="Z.BEZEICHNUNG">Ingredient</option>
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
        
            <button class="query-button" @click="getFilteredRecipies">
                Search Recipies
            </button>
        
            <button class="query-button" @click="getAllRecipies">
                Get All Recipies
            </button>
        </div>

        <div class="result-table-wrapper">
            <table class="result-table" cellspacing="0">
              <tr>
                <th>Recipe ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Preparation Time</th>
                <th>Food Category</th>
                <th>Instruction</th>
                <th>Ingredients</th>
              </tr>
              <tr v-for="(Recipe, index) in Recipies" :key="index" :style="'background: ' + (index % 2 == 0 ? '#f2f2f2' : 'white')">
                <td>{{ Recipe.REZEPT_ID }}</td>
                <td>{{ Recipe.NAME }}</td>
                <td>{{ Recipe.PREIS }} €</td>
                <td>{{ Recipe.DAUER }} Minuten</td>
                <td>{{ Recipe.ERNÄHRUNGSKATEGORIE_NAME }}</td>
                <td>{{ Recipe.ANLEITUNG }}</td>
                <td>{{ Recipe.ZUTATEN }}</td>
              </tr>
            </table>
        </div>

        <div class="center-wrapper" v-if="querySending">
            <div class="loader"></div>
        </div>

        <div v-if="Recipies.length == 0 && queryFinished">
            <h4 style="color:red;">
                No Recipies Found
            </h4>
        </div>
        <h4 style="color: red;" v-if="error != ''">
            {{ error }}
        </h4>
        <div class="center-wrapper">
            <button @click="PopupOpen=true" class="query-button">Create Recipe</button>
        </div>
        <div v-if="PopupOpen">
        <PopupCreateRecipe @onWindowClose="PopupOpen=false"/>
        </div>
    </div>
</template>

<script>
import '../../assets/css/QueryStyle.css';
import '../../assets/css/PopupStyle.css';
import { getRecipeWithSearch, getAllRecipies } from '../../assets/scripts/requester';

export default {
    data() {
        return {
            placeholderShown: true,
            Recipies: [],
            queryFinished: false,
            querySending: false,
            error: "",
            PopupOpen: false,
        }
    },
    methods: {
        checkPlaceholder() {
            this.placeholderShown = this.$refs.searchValue.value.length == 0;
        },
        async getFilteredRecipies() {
            this.resetProps();
            this.querySending = true;

            const result = await getRecipeWithSearch(this.$refs.searchField.value,
                this.$refs.searchValue.value, this.$refs.operatorField.value);
            this.querySending = false;
            if (result.error != undefined) {
                this.error = result.error;
            } else {
                this.Recipies = result;
                this.queryFinished = true;
            }
        },
        async getAllRecipies() {
            this.resetProps();
            this.querySending = true;

            const result = await getAllRecipies();
            this.querySending = false;
            if (result.error != undefined) {
                this.error = result.error;
            } else {
                this.Recipies = result;
                this.queryFinished = true;
            }
        },
        resetProps() {
            this.Recipies = [];
            this.error = "";
            this.queryFinished = false;
        }
    }
}
</script>

<style scoped></style>