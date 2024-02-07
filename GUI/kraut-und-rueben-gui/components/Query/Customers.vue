<template lang="">
    <div class="wrapper">
        <h2>Customer Data</h2>

        <div class="center-wrapper">
            <div class="selector-wrapper">
                <select @input="setDropdownValue" ref="searchField" class="dropdown">
                    <option value="K.KUNDEN_ID">Id</option>
                    <option value="K.VORNAME">First Name</option>
                    <option value="K.NACHNAME">Last Name</option>
                    <option value="K.GEBURTSDATUM">Birth Date</option>
                    <option value="A.STRASSE">Street</option>
                    <option value="A.HAUSNR">House Nr</option>
                    <option value="A.PLZ">Zip Code</option>
                    <option value="A.ORT">City</option>
                    <option value="B.BUND_NAME">State</option>
                    <option value="K.TELEFON">Telephone</option>
                    <option value="K.EMAIL">Email</option>
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
        
            <button class="query-button" @click="getFilteredCustomers">
                Search Customers
            </button>
        
            <button class="query-button" @click="getAllCustomers">
                Get All Customers
            </button>
        </div>

        <div class="result-table-wrapper">
            <table class="result-table" cellspacing="0">
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
                <tr v-for="(customer, index) in customers" :key="index" :style="'background: ' + (index % 2 == 0 ? '#f2f2f2' : 'white' )"s>
                    <td> {{ customer.KUNDEN_ID }} </td>
                    <td> {{ customer.VORNAME }} </td>
                    <td> {{ customer.NACHNAME }} </td>
                    <td> {{ new Date(customer.GEBURTSDATUM).toLocaleDateString() }} </td>
                    <td> {{ customer.STRASSE }} </td>
                    <td> {{ customer.HAUSNR }} </td>
                    <td> {{ customer.PLZ }} </td>
                    <td> {{ customer.WOHNORT }} </td>
                    <td> {{ customer.BUND_NAME }} </td>
                    <td> {{ customer.TELEFON }} </td>
                    <td> {{ customer.EMAIL }} </td>
                    <div class="delete-button-wrapper">
                        <button class="delete-button" @click="deleteCustomer(customer.KUNDEN_ID)">
                            <img src="/img/delete.svg">
                        </button>
                    </div>
                </tr>
            </table>
        </div>

        <div class="center-wrapper" v-if="querySending">
            <div class="loader"></div>
        </div>

        <div v-if="customers.length == 0 && queryFinished">
            <h4 style="color:red;">
                No Customers Found
            </h4>
        </div>
        <h4 style="color:red;" v-if="error != ''">
            {{ this.error }}
        </h4>

        <div v-if="deletingCustomer">
            <PopupDeleteConfirm :customerId="customerToDelete.KUNDEN_ID"
                :customerName="customerToDelete.VORNAME + ' ' + customerToDelete.NACHNAME"
                @onWindowClose="deletingCustomer = false" />
        </div>
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
            querySending: false,
            error: "",
            
            deletingCustomer: false,
            customerToDelete: {},
        }
    },
    methods: {
        checkPlaceholder() {
            this.placeholderShown = this.$refs.searchValue.value.length == 0;
        },
        deleteCustomer(customerId) {
            this.customerToDelete = this.customers.filter(customer => customer.KUNDEN_ID == customerId)[0];
            this.deletingCustomer = true;
        },
        async getFilteredCustomers() {
            this.resetProps();
            this.querySending = true;

            const result = await getCustomerWithSearch(this.$refs.searchField.value,
                this.$refs.searchValue.value, this.$refs.operatorField.value);
            this.querySending = false;
            if (result.error != undefined) {
                this.error = result.error;
            } else {
                this.customers = result;
                this.queryFinished = true;
            }
        },
        async getAllCustomers() {
            this.resetProps();
            this.querySending = true;

            const result = await getAllCustomers();
            this.querySending = false;
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

<style scoped></style>