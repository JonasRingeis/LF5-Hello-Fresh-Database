<template lang="">
    <div class="wrapper">
        <h2>Customer Data</h2>
        <div class="input-wrapper">
            <input type="text">
                CustomerId
            </input>           
        </div>

        <!-- TODO add dropdown for all fields to be searchable through the query so we only need one input field -->
        <button class="query-button">
            Get Customer
        </button>

        <button class="query-button">
            Get All Customers
        </button>

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
            </tr>
            <tr v-for="(customer, index) in customers" :key="index">
                <td> {{ customer.KdNr }} </td>
                <td> {{ customer.Vorname }} </td>
                <td> {{ customer.Name }} </td>
                <td> {{ customer.Geburtsdatum }} </td>
                <td> {{ customer.Straße }} </td>
                <td> {{ customer.Hausnr }} </td>
                <td> {{ customer.PLZ }} </td>
                <td> {{ customer.Stadt }} </td>
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
            customers: [{
                KdNr            : "1",
                Vorname         : "Jonas",
                Name            : "Ringeis",
                Geburtsdatum    : "10.06.2007",
                Straße          : "Am Rathausmarkt",
                Hausnr          : "27",
                PLZ             : "22110",
                Stadt           : "Hamburg",
            },
            {
                KdNr            : "2",
                Vorname         : "Tjark",
                Name            : "Fischer",
                Geburtsdatum    : "05.11.2001",
                Straße          : "Zikadenweg",
                Hausnr          : "99",
                PLZ             : "22117",
                Stadt           : "Hamburg",
            }]
        }
    },
}
</script>

<style scoped>
.result-table {
    background: white;
    border-radius: 5px;
    width: 100%;
    text-align: left;
}
</style>