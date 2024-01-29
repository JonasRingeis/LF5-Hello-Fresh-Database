<template lang="">
    <div class="wrapper">
        <h2>Customer Data</h2>

        <div class="button-wrapper">
            <div class="selector-wrapper">
                <select @input="setDropdownValue" ref="searchField" class="dropdown">
                    <option value="KUNDEN_ID">Id</option>
                    <option value="VORNAME">First Name</option>
                    <option value="NACHNAME">Last Name</option>
                    <option value="GEBURTSDATUM">Birth Date</option>
                    <option value="STRASSE">Street</option>
                    <option value="HAUSNR">House Nr</option>
                    <option value="PLZ">Zip Code</option>
                    <option value="ORT">City</option>
                    <option value="BUNDESLAND">State</option>
                    <option value="TELEFON">Telephone</option>
                    <option value="EMAIL">Email</option>
                </select>
            </div>
            <div class="inputfield-wrapper">
                <input type="text" ref="searchValue" class="inputfield" @input="checkPlaceholder" />
                <label v-if="placeholderShown">
                    Search Value
                </label>
            </div>
        
            <button class="query-button" @click="getFilteredCustomers">
                Search Customers
            </button>
        
            <button class="query-button" @click="getAllCustomers">
                Get All Customers
            </button>
        </div>

        <div class="result-table-wrapper">
            <table class="result-table">
                <tr>
                    <th> Id </th>
                    <th> First Name </th>
                    <th> Second Name </th>
                    <th> Birthdate </th>
                    <th> Street </th>
                    <th> Nr </th>
                    <th> Zip Code </th>
                    <th> City </th>
                    <th> State </th>
                    <th> Telephone </th>
                    <th> Email </th>
                </tr>
                <tr v-for="(customer, index) in customers" :key="index">
                    <td> {{ customer.KUNDEN_ID }} </td>
                    <td> {{ customer.VORNAME }} </td>
                    <td> {{ customer.NACHNAME }} </td>
                    <td> {{ new Date(customer.GEBURTSDATUM).toLocaleDateString() }} </td>
                    <td> {{ customer.STRASSE }} </td>
                    <td> {{ customer.HAUSNR }} </td>
                    <td> {{ customer.PLZ }} </td>
                    <td> {{ customer.ORT }} </td>
                    <td> {{ customer.BUND_NAME }} </td>
                    <td> {{ customer.TELEFON }} </td>
                    <td> {{ customer.EMAIL }} </td>
                </tr>
            </table>
        </div>
        <div v-if="customers.length == 0 && queryFinished">
            <h4 style="color:red;">
                No Customers Found
            </h4>
        </div>
        <h4 style="color:red;" v-if="error != ''">
            {{ this.error }}
        </h4>
    </div>
</template>

<script>
import '../../assets/css/QueryStyle.css';
import { getCustomerWithSearch, getAllCustomers } from '../../assets/scripts/requester';

export default {
    data() {
        return {
            placeholderShown: true,
            customers: [],
            queryFinished: false,
            error: "",
        }
    },
    methods: {
        checkPlaceholder() {
            this.placeholderShown = this.$refs.searchValue.value.length == 0;
        },
        async getFilteredCustomers() {
            this.resetProps();
            
            const result = await getCustomerWithSearch(this.$refs.searchField.value, this.$refs.searchValue.value);
            if (result.error != undefined) {
                this.error = result.error;
            } else {
                this.customers = result;
                this.queryFinished = true;
            }
        },
        async getAllCustomers() {
            this.resetProps();

            const result = await getAllCustomers();
            if (result.error != undefined) {
                this.error = result.error;
            } else {
                this.customers = result;
                this.queryFinished = true;
            }
        },
        resetProps() {
            this.customers = [];
            this.error = "";
            this.queryFinished = false;
        }
    }
}
</script>

<style scoped>

</style>