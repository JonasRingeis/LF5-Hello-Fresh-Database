<template lang="">
    <div class="wrapper">
        <h2>Carrier Data</h2>

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
                <input type="text" ref="searchValue" class="inputfield" @input="checkPlaceholder"></input>
                <label v-if="placeholderShown">
                    Search Value
                </label>
            </div>
        
            <button class="query-button" @click="getFilteredCarriers">
                Search Carriers
            </button>
        
            <button class="query-button" @click="getAllCarriers">
                Get All Carriers
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
                <tr v-for="(Carrier, index) in Carriers" :key="index">
                  <td>{{ Carrier.LIEFERANTEN_ID }}</td>
                  <td>{{ Carrier.LIEFERANTENNAME }}</td>
                  <td>{{ Carrier.STRASSE }}</td>
                  <td>{{ Carrier.HAUSNR }}</td>
                  <td>{{ Carrier.PLZ }}</td>
                  <td>{{ Carrier.ORT }}</td>
                  <td>{{ Carrier.TELEFON }}</td>
                  <td>{{ Carrier.EMAIL }}</td>
                </tr>
            </table>
        </div>
        <div v-if="Carriers.length == 0 && queryFinished">
            <h4 style="color: red;">
                No Carriers Found
            </h4>
        </div>
        <h4 style="color: red;" v-if="error != ''">
            {{ error }}
        </h4>
    </div>
</template>

<script>
import '../../assets/css/QueryStyle.css';
import { getCarrierWithSearch, getAllCarriers } from '../../assets/scripts/requester';

export default {
    data() {
        return {
            placeholderShown: true,
            Carriers: [],
            queryFinished: false,
            error: ""
        }
    },
    methods: {
        checkPlaceholder() {
            this.placeholderShown = this.$refs.searchValue.value.length == 0;
        },
        async getFilteredCarriers() {
            this.resetProps();
            
            const result = await getCarrierWithSearch(this.$refs.searchField.value, this.$refs.searchValue.value);
            if (result.error != undefined) {
                this.error = result.error;
            } else {
                this.Carriers = result;
                this.queryFinished = true;
            }
        },
        async getAllCarriers() {
            this.resetProps();
            
            const result = await getAllCarriers();
            if (result.error != undefined) {
                this.error = result.error;
            } else {
                this.Carriers = result;
                this.queryFinished = true;
            }
        },
        resetProps() {
            this.Carriers = [];
            this.error = "";
            this.queryFinished = false;
        }
    }
}
</script>

<style scoped>

</style>