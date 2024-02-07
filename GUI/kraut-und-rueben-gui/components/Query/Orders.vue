<template>
    <div class="wrapper">
        <h2>Order Data</h2>

        <div class="center-wrapper">
            <div class="selector-wrapper">
                <select @input="setDropdownValue" ref="searchField" class="dropdown">
                    <option value="B.BESTELL_ID">Order ID</option>
                    <option value="B.BESTELLDATUM">Order Date</option>
                    <option value="B.RECHNUNGSBETRAG">Order Price</option>
                    <option value="BX.NAME">Boxes</option>
                    <option value="Z.BEZEICHNUNG">Ingredients</option>
                    <option value="K.VORNAME">First Name</option>
                    <option value="K.NACHNAME">Second Name</option>
                    <option value="K.GEBURTSDATUM">Birthdate</option>
                    <option value="A.STRASSE">Street</option>
                    <option value="A.HAUSNR">Nr</option>
                    <option value="A.PLZ">ZipCode </option>
                    <option value="A.ORT">City</option>
                    <option value="BL.BUND_NAME">State</option>
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

            <button class="query-button" @click="getFilteredOrders">
                Search Orders
            </button>

            <button class="query-button" @click="getAllOrders">
                Get All Orders
            </button>
        </div>

        <div class="result-table-wrapper">
            <table class="result-table" cellspacing="0">
                <tr>
                    <th>Order ID</th>
                    <th>Order Date</th>
                    <th>Order Price</th>
                    <th v-if="boxes">Boxes</th>
                    <th v-if="recipe">Recipes</th>
                    <th v-if="ingredients">Ingredients</th>
                    <th v-if="customerData">First Name</th>
                    <th v-if="customerData">Second Name</th>
                    <th v-if="customerData">Birthdate</th>
                    <th v-if="customerData">Street</th>
                    <th v-if="customerData">Nr</th>
                    <th v-if="customerData">ZipCode </th>
                    <th v-if="customerData">City</th>
                    <th v-if="customerData">State</th>
                    <th v-if="customerData">Telephone</th>
                    <th v-if="customerData">Email</th>
                </tr>
                <tr v-for="(order, index) in filteredOrders" :key="index"
                    :style="'background: ' + (index % 2 == 0 ? '#f2f2f2' : 'white')">
                    <td>{{ order.BESTELL_ID }}</td>
                    <td>{{ new Date(order.BESTELLDATUM).toLocaleDateString() }}</td>
                    <td>{{ order.RECHNUNGSBETRAG }} €</td>
                    <td v-if="boxes"> {{ order.BOXEN == null ? "-" : order.BOXEN }} </td>
                    <td v-if="recipe"> {{ order.REZEPTE == null ? "-" : order.REZEPTE }} </td>
                    <td v-if="ingredients">
                        {{ order.ZUTATEN == null ? "-" : null }}
                        <button @click="ingredientsCollapsed[index] = true"
                            v-if="order.ZUTATEN != null && ingredientsCollapsed[index] != true" class="collapse-button">
                            Open
                            <i class="arrow-down"></i>
                        </button>
                        <table class="sub-result-table" v-if="order.ZUTATEN != null && ingredientsCollapsed[index]">
                            <tr style="position: relative;">
                                <th>
                                    Menge
                                </th>
                                <th>
                                    Name
                                </th>
                                <div style="position: absolute; right: 0;">
                                    <button @click="ingredientsCollapsed[index] = false" class="collapse-button">
                                        Close
                                        <i class="arrow-up"></i>
                                    </button>
                                </div>
                            </tr>
                            <tr v-for="(ingredient, index2) in order.ZUTATEN.split(', ')" :key="index2">
                                <td style="text-align: center;">
                                    {{ ingredient.split("_")[1] }}
                                </td>
                                <td>
                                    {{ ingredient.split("_")[0] }}
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td v-if="customerData"> {{ order.VORNAME }} </td>
                    <td v-if="customerData"> {{ order.NACHNAME }} </td>
                    <td v-if="customerData"> {{ new Date(order.GEBURTSDATUM).toLocaleDateString() }} </td>
                    <td v-if="customerData"> {{ order.STRASSE }} </td>
                    <td v-if="customerData"> {{ order.HAUSNR }} </td>
                    <td v-if="customerData"> {{ order.PLZ }} </td>
                    <td v-if="customerData"> {{ order.WOHNORT }} </td>
                    <td v-if="customerData"> {{ order.BUND_NAME }} </td>
                    <td v-if="customerData"> {{ order.TELEFON }} </td>
                    <td v-if="customerData"> {{ order.EMAIL }} </td>
                </tr>
            </table>
        </div>

        <div class="center-wrapper" v-if="querySending">
            <div class="loader"></div>
        </div>

        <div v-if="orders.length == 0 && queryFinished">
            <h4 style="color: red;">
                No Orders Found
            </h4>
        </div>
        <h4 style="color: red;" v-if="error != ''">
            {{ error }}
        </h4>

        <div class="center-wrapper">
            <div class="filter">
                <h2 style="margin-bottom: 5px; text-align: left;">
                    Filter
                </h2>
                <div class="filter-wrapper">
                    <label>
                        <input name="boxes" type="checkbox" checked @input="boxes = !boxes" />
                        Boxes
                    </label>
                    <label>
                        <input name="recipe" type="checkbox" checked @input="recipe = !recipe" />
                        Recipes
                    </label>
                    <label>
                        <input name="products" type="checkbox" checked @input="ingredients = !ingredients" />
                        Ingredients
                    </label>
                    <label>
                        <input name="customer" type="checkbox" checked @input="customerData = !customerData" />
                        Customer Data
                    </label>
                    <label>
                        <input name="customer" type="checkbox" @input="anonymCustomer = !anonymCustomer; filterCustomers();" />
                        Anonym Customer
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '../../assets/css/QueryStyle.css';
import { getOrderWithSearch, getAllOrders } from '../../assets/scripts/requester';

export default {
    data() {
        return {
            placeholderShown: true,
            orders: [],
            filteredOrders: [],
            queryFinished: false,
            querySending: false,
            error: "",

            ingredientsCollapsed: [],

            //filter
            boxes: true,
            recipe: true,
            ingredients: true,
            customerData: true,
            anonymCustomer: false,
        }
    },
    methods: {
        checkPlaceholder() {
            this.placeholderShown = this.$refs.searchValue.value.length == 0;
        },
        async getFilteredOrders() {
            this.resetProps();
            this.querySending = true;

            const result = await getOrderWithSearch(this.$refs.searchField.value,
                this.$refs.searchValue.value, this.$refs.operatorField.value);
            this.querySending = false;
            if (result.error != undefined) {
                this.error = result.error;
            } else {
                this.orders = result;
                this.queryFinished = true;
                this.filterCustomers();
            }
        },
        async getAllOrders() {
            this.resetProps();
            this.querySending = true;

            const result = await getAllOrders();
            this.querySending = false;
            if (result.error != undefined) {
                this.error = result.error;
            } else {
                this.orders = result;
                this.queryFinished = true;
                this.filterCustomers();
            }
        },
        filterCustomers() {
            if (!this.anonymCustomer) {
                this.filteredOrders = this.orders.filter(order => order.KUNDEN_ID != 0);
            }
            else {
                this.filteredOrders = this.orders;
            }
        },
        resetProps() {
            this.orders = [];
            this.error = "";
            this.queryFinished = false;
        }
    }
}
</script>
<style lang="">
    
</style>