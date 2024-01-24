<template lang="">
    <div class="wrapper">
        <h2>Customer Data</h2>

        <div class="button-wrapper">
            <div class="selector-wrapper">
                <select @input="setDropdownValue" ref="field" class="dropdown">
                    <option value="0">Id</option>
                    <option value="1">First Name</option>
                    <option value="2">Last Name</option>
                    <option value="3">Birth Date</option>
                    <option value="3">Street</option>
                    <option value="3">House Nr</option>
                    <option value="3">Zip Code</option>
                    <option value="3">City</option>
                    <option value="3">State</option>
                    <option value="3">Telephone</option>
                    <option value="3">Email</option>
                </select>
            </div>
            <div class="inputfield-wrapper">
                <input type="text" ref="searchValue" class="inputfield"></input>
                <label>
                    Search Value
                </label>
            </div>
        
            <!-- TODO add dropdown for all fields to be searchable through the query so we only need one input field -->
            <button class="query-button">
                Get Customer
            </button>
        
            <button class="query-button" @click="getAllCustomers">
                Get All Customers
            </button>
        </div>

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
                <th> Emal </th>
            </tr>
            <tr v-for="(customer, index) in customers" :key="index">
                <td> {{ customer.KUNDENNR }} </td>
                <td> {{ customer.NACHNAME }} </td>
                <td> {{ customer.VORNAME }} </td>
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
</template>

<script lang="ts">
import '../../assets/css/QueryStyle.css';

export default {
    props: {
        dbConnection: Object
    },
    data() {
        return {
            customers: []
        }
    },
    methods: {
        async getAllCustomers() {
            try {
                const response = await fetch('/api/customers');
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
.result-table {
    background: white;
    border-radius: 5px;
    width: 100%;
    text-align: left;

    display: block;
    overflow-x: scroll;
    overflow-y: visible;

    scrollbar-width: thin;
}
.result-table th, .result-table td {
    padding: 6px;
    white-space: nowrap;
}
</style>