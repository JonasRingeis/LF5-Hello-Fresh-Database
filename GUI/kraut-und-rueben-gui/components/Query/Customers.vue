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
                <input type="text" ref="searchValue" class="inputfield" @input="checkPlaceholder"></input>
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
                <td> {{ customer.BUNDESLAND }} </td>
                <td> {{ customer.TELEFON }} </td>
                <td> {{ customer.EMAIL }} </td>
            </tr>
        </table>
        </div>
    </div>
</template>

<script>
import '../../assets/css/QueryStyle.css';

export default {
    data() {
        return {
            placeholderShown: true,
            customers: []
        }
    },
    methods: {
        checkPlaceholder() {
            this.placeholderShown = this.$refs.searchValue.value.length == 0;
        },
        async getFilteredCustomers() {
            try {
                const table = "kunde";
                const field = this.$refs.searchField.value;
                const value = this.$refs.searchValue.value;
                const response = await fetch("/api/getData?t=" + table + "&f=" + field + "&v=" + value);
                this.customers = await response.json();
            } catch (err) { console.log("Error fetching customers: " + err); }
        },
        async getAllCustomers() {
            try {
                const table = "kunde";
                const response = await fetch('/api/getData?t=' + table);
                this.customers = await response.json();
            } catch (err) { console.log("Error fetching customers: " + err); }
        }
    }
}
</script>

<style scoped>
.button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}
.result-table-wrapper {
    display: block;
    overflow-x: scroll;
    overflow-y: visible;

    scrollbar-width: thin;
}
.result-table {
    background: white;
    border-radius: 5px;
    width: 100%;
    text-align: left;
}
.result-table th, .result-table td {
    padding: 3px 6px;
    white-space: nowrap;
}
</style>