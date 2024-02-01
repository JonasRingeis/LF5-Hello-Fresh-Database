<template lang="">
    <div class="wrapper">
        <h2>Supplier Data</h2>

        <div class="center-wrapper">
            <div class="selector-wrapper">
                <select @input="setDropdownValue" ref="searchField" class="dropdown">
                    <option value="L.LIEFERANTEN_ID">Id</option>
                    <option value="L.LIEFERANTENNAME">Supplier Name</option>
                    <option value="L.STRASSE">Street</option>
                    <option value="L.HAUSNR">House Nr</option>
                    <option value="L.PLZ">Zip Code</option>
                    <option value="L.ORT">City</option>
                    <option value="L.TELEFON">Telephone</option>
                    <option value="L.EMAIL">Email</option>
                    <option value="B.BUND_NAME">State Name</option>
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
        
            <button class="query-button" @click="getFilteredSuppliers">
                Search Suppliers
            </button>
        
            <button class="query-button" @click="getAllSuppliers">
                Get All Suppliers
            </button>
        </div>

        <div class="result-table-wrapper">
            <table class="result-table" cellspacing="0">
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
                <tr v-for="(Supplier, index) in Suppliers" :key="index" :style="'background: ' + (index % 2 == 0 ? '#f2f2f2' : 'white')">
                  <td>{{ Supplier.LIEFERANTEN_ID }}</td>
                  <td>{{ Supplier.LIEFERANTENNAME }}</td>
                  <td>{{ Supplier.STRASSE }}</td>
                  <td>{{ Supplier.HAUSNR }}</td>
                  <td>{{ Supplier.PLZ }}</td>
                  <td>{{ Supplier.ORT }}</td>
                  <td>{{ Supplier.TELEFON }}</td>
                  <td>{{ Supplier.EMAIL }}</td>
                </tr>
            </table>
        </div>

        <div class="center-wrapper" v-if="querySending">
            <div class="loader"></div>
        </div>

        <div v-if="Suppliers.length == 0 && queryFinished">
            <h4 style="color: red;">
                No Suppliers Found
            </h4>
        </div>
        <h4 style="color: red;" v-if="error != ''">
            {{ error }}
        </h4>
    </div>
</template>

<script>
import '../../assets/css/QueryStyle.css';
import { getSupplierWithSearch, getAllSuppliers } from '../../assets/scripts/requester';

export default {
    data() {
        return {
            placeholderShown: true,
            Suppliers: [],
            queryFinished: false,
            querySending: false,
            error: ""
        }
    },
    methods: {
        checkPlaceholder() {
            this.placeholderShown = this.$refs.searchValue.value.length == 0;
        },
        async getFilteredSuppliers() {
            this.resetProps();
            this.querySending = true;

            const result = await getSupplierWithSearch(this.$refs.searchField.value,
                this.$refs.searchValue.value, this.$refs.operatorField.value);
            this.querySending = false;
            if (result.error != undefined) {
                this.error = result.error;
            } else {
                this.Suppliers = result;
                this.queryFinished = true;
            }
        },
        async getAllSuppliers() {
            this.resetProps();
            this.querySending = true;

            const result = await getAllSuppliers();
            this.querySending = false;
            if (result.error != undefined) {
                this.error = result.error;
            } else {
                this.Suppliers = result;
                this.queryFinished = true;
            }
        },
        resetProps() {
            this.Suppliers = [];
            this.error = "";
            this.queryFinished = false;
        }
    }
}
</script>

<style scoped></style>