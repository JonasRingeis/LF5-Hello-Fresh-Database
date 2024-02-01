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
                    <option value="K.STRASSE">Street</option>
                    <option value="K.HAUSNR">Nr</option>
                    <option value="K.PLZ">ZipCode </option>
                    <option value="K.ORT">City</option>
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
                <tr v-for="(Order, index) in Orders" :key="index"
                    :style="'background: ' + (index % 2 == 0 ? '#f2f2f2' : 'white')">
                    <td>{{ Order.BESTELL_ID }}</td>
                    <td>{{ new Date(Order.BESTELLDATUM).toLocaleDateString() }}</td>
                    <td>{{ Order.RECHNUNGSBETRAG }} €</td>
                    <td v-if="boxes"> {{ Order.BOXEN == null ? "-" : Order.BOXEN }} </td>
                    <td v-if="recipe"> {{ Order.REZEPTE == null ? "-" : Order.REZEPTE }} </td>
                    <td v-if="ingredients">
                        {{ Order.ZUTATEN == null ? "-" : null }}

                        <table v-if="Order.ZUTATEN != null">
                            <tr>
                                <th>
                                    Menge
                                </th>
                                <th>
                                    Name
                                </th>
                            </tr>
                            <tr v-for="(ingredient, index) in Order.ZUTATEN.split(', ')" :key="index">
                                <td style="text-align: center;">
                                    {{ ingredient.split("_")[1] }}
                                </td>
                                <td>
                                    {{ ingredient.split("_")[0] }}
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td v-if="customerData"> {{ Order.VORNAME }} </td>
                    <td v-if="customerData"> {{ Order.NACHNAME }} </td>
                    <td v-if="customerData"> {{ new Date(Order.GEBURTSDATUM).toLocaleDateString() }} </td>
                    <td v-if="customerData"> {{ Order.STRASSE }} </td>
                    <td v-if="customerData"> {{ Order.HAUSNR }} </td>
                    <td v-if="customerData"> {{ Order.PLZ }} </td>
                    <td v-if="customerData"> {{ Order.ORT }} </td>
                    <td v-if="customerData"> {{ Order.BUND_NAME }} </td>
                    <td v-if="customerData"> {{ Order.TELEFON }} </td>
                    <td v-if="customerData"> {{ Order.EMAIL }} </td>
                </tr>
            </table>
        </div>

        <div class="center-wrapper" v-if="querySending">
            <div class="loader"></div>
        </div>

        <div v-if="Orders.length == 0 && queryFinished">
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
            Orders: [],
            queryFinished: false,
            querySending: false,
            error: "",

            //filter
            boxes: true,
            recipe: true,
            ingredients: true,
            customerData: true,
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
                this.Orders = result;
                this.queryFinished = true;
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
                this.Orders = result;
                this.queryFinished = true;
            }
        },
        resetProps() {
            this.Orders = [];
            this.error = "";
            this.queryFinished = false;
        }
    }
}
</script>
<style lang="">
    
</style>