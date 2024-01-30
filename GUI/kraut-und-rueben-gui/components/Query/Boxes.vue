<template lang="">
    <div class="wrapper">
        <h2>Box Data</h2>

        <div class="center-wrapper">
            <div class="selector-wrapper">
                <select @input="setDropdownValue" ref="searchField" class="dropdown">
                    <option value="B.BOX_ID">Id</option>
                    <option value="B.NAME">Name</option>
                    <option value="B.BESCHREIBUNG">Description</option>
                    <option value="B.PREIS">Price</option>
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
        
            <button class="query-button" @click="getFilteredBoxes">
                Search Boxes
            </button>
        
            <button class="query-button" @click="getAllBoxes">
                Get All Boxes
            </button>
        </div>

        <div class="result-table-wrapper">
            <table class="result-table">
              <tr>
                <th>Box ID</th>
                <th>Name</th>
                <th>Beschreibung</th>
                <th>Preis</th>
                <th>Zutaten</th>
              </tr>
              <tr v-for="(box, index) in Boxes" :key="index">
                <td>{{ box.BOX_ID }}</td>
                <td>{{ box.NAME }}</td>
                <td>{{ box.BESCHREIBUNG }}</td>
                <td>{{ box.PREIS }}€</td>
                <td>{{ box.ZUTATEN }}</td>
              </tr>
            </table>
        </div>

        <div class="center-wrapper" v-if="querySending">
            <div class="loader"></div>
        </div>

        <div v-if="Boxes.length == 0 && queryFinished">
            <h4 style="color:red;">
                No Boxes Found
            </h4>
        </div>
        <h4 style="color: red;" v-if="error != ''">
            {{ error }}
        </h4>
    </div>
</template>

<script>
import '../../assets/css/QueryStyle.css';
import { getBoxWithSearch, getAllBoxes } from '../../assets/scripts/requester';

export default {
    data() {
        return {
            placeholderShown: true,
            Boxes: [],
            queryFinished: false,
            querySending: false,
            error: ""
        }
    },
    methods: {
        checkPlaceholder() {
            this.placeholderShown = this.$refs.searchValue.value.length == 0;
        },
        async getFilteredBoxes() {
            this.resetProps();
            this.querySending = true;

            const result = await getBoxWithSearch(this.$refs.searchField.value, 
                this.$refs.searchValue.value, this.$refs.operatorField.value);
            this.querySending = false;
            if (result.error != undefined) {
                this.error = result.error;
            } else {
                this.Boxes = result;
                this.queryFinished = true;
            }
        },
        async getAllBoxes() {
            this.resetProps();
            this.querySending = true;
            
            const result = await getAllBoxes(this.$refs.searchField.value, this.$refs.searchValue.value);
            this.querySending = false;
            if (result.error != undefined) {
                this.error = result.error;
            } else {
                this.Boxes = result;
                this.queryFinished = true;
            }
        },
        resetProps() {
            this.Boxes = [];
            this.error = "";
            this.queryFinished = false;
        }
    }
}
</script>

<style scoped>

</style>