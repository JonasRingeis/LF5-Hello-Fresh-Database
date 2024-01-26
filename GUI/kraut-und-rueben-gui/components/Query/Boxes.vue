<template lang="">
    <div class="wrapper">
        <h2>Box Data</h2>

        <div class="button-wrapper">
            <div class="selector-wrapper">
                <select @input="setDropdownValue" ref="searchField" class="dropdown">
                    <option value="boxEN_ID">Id</option>
                    <option value="boxENNAME">Supplier Name</option>
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
                <input type="text" ref="searchValue" class="inputfield" @input="checkPlaceholder"></input>
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
                  <th>Supplier ID</th>
                  <th>Supplier Name</th>
                  <th>Street</th>
                  <th>Nr</th>
                  <th>Zip Code</th>
                  <th>City</th>
                  <th>Telephone</th>
                  <th>Email</th>
                </tr>
                <tr v-for="(Box, index) in Boxes" :key="index">
                  <td>{{ Box.boxEN_ID }}</td>
                  <td>{{ Box.boxENNAME }}</td>
                  <td>{{ Box.STRASSE }}</td>
                  <td>{{ Box.HAUSNR }}</td>
                  <td>{{ Box.PLZ }}</td>
                  <td>{{ Box.ORT }}</td>
                  <td>{{ Box.TELEFON }}</td>
                  <td>{{ Box.EMAIL }}</td>
                </tr>
            </table>
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
            error: ""
        }
    },
    methods: {
        checkPlaceholder() {
            this.placeholderShown = this.$refs.searchValue.value.length == 0;
        },
        async getFilteredBoxes() {
            this.resetProps();

            const result = await getBoxWithSearch(this.$refs.searchField.value, this.$refs.searchValue.value);
            if (result.error != undefined) {
                this.error = result.error;
            } else {
                this.Boxes = result;
                this.queryFinished = true;
            }
        },
        async getAllBoxes() {
            this.resetProps();
            
            const result = await getAllBoxes(this.$refs.searchField.value, this.$refs.searchValue.value);
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