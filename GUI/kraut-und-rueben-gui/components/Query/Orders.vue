<template>
    <div class="wrapper">
        <h2>Order Data</h2>

        <div class="center-wrapper">
            <div class="selector-wrapper">
                <select @input="setDropdownValue" ref="searchField" class="dropdown">
                    <option value="Z.ZUTAT_ID">Id</option>
                    <option value="Z.BEZEICHNUNG">Name</option>
                    <option value="Z.EINHEIT">Unit</option>
                    <option value="Z.NETTOPREIS">Net Price</option>
                    <option value="Z.BESTAND">Stock</option>
                    <option value="Z.LIEFERANTEN_ID">Supplier Id</option>
                    <option value="N.KALORIEN">Calories</option>
                    <option value="N.KOHLENHYDRATE">Carbohydrates</option>
                    <option value="N.PROTEINE">Proteins</option>
                    <option value="N.BALLASTSTOFFE">Fiber</option>
                    <option value="N.FETT">Fat</option>
                    <option value="N.NATRIUM">Sodium</option>
                    <option value="L.LIEFERANTENNAME">Supplier Name</option>
                    <option value="L.STRASSE">Supplier Street</option>
                    <option value="L.HAUSNR">Supplier House Nr</option>
                    <option value="L.PLZ">Supplier Zip Code</option>
                    <option value="L.ORT">Supplier City</option>
                    <option value="L.TELEFON">Supplier Telephone</option>
                    <option value="L.EMAIL">Supplier Email</option>
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
            <table class="result-table">
              <tr>
                <th>Order ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Net Price</th>
                <th>Stock</th>
                <th v-if="nutritionFacts">Calories</th>
                <th v-if="nutritionFacts">Carbohydrates</th>
                <th v-if="nutritionFacts">Proteins</th>
                <th v-if="nutritionFacts">Dietary Fiber</th>
                <th v-if="nutritionFacts">Fat</th>
                <th v-if="nutritionFacts">Sodium</th>
                <th v-if="supplierData">Supplier Name</th>
                <th v-if="supplierData">Supplier Street</th>
                <th v-if="supplierData">Supplier Nr</th>
                <th v-if="supplierData">Supplier Zip Code</th>
                <th v-if="supplierData">Supplier City</th>
                <th v-if="supplierData">Supplier Telephone</th>
                <th v-if="supplierData">Supplier Email</th>
              </tr>
              <tr v-for="(Order, index) in Orders" :key="index">
                <td>{{ Order.ZUTAT_ID }}</td>
                <td>{{ Order.BEZEICHNUNG }}</td>
                <td>{{ parseFloat(Order.MENGE) }}{{ (Order.EINHEIT == "Stück" ? " " : "") + Order.EINHEIT }}</td>
                <td>{{ Order.NETTOPREIS }}€</td>
                <td>{{ Order.BESTAND }}</td>
                <td v-if="nutritionFacts">{{ Order.KALORIEN }}kcal</td>
                <td v-if="nutritionFacts">{{ Order.KOHLENHYDRATE }}g</td>
                <td v-if="nutritionFacts">{{ Order.PROTEINE }}g</td>
                <td v-if="nutritionFacts">{{ Order.BALLASTSTOFFE }}g</td>
                <td v-if="nutritionFacts">{{ Order.FETT }}g</td>
                <td v-if="nutritionFacts">{{ Order.NATRIUM }}g</td>
                <td v-if="supplierData">{{ Order.LIEFERANTENNAME }}</td>
                <td v-if="supplierData">{{ Order.STRASSE }}</td>
                <td v-if="supplierData">{{ Order.HAUSNR }}</td>
                <td v-if="supplierData">{{ Order.PLZ }}</td>
                <td v-if="supplierData">{{ Order.ORT }}</td>
                <td v-if="supplierData">{{ Order.TELEFON }}</td>
                <td v-if="supplierData">{{ Order.EMAIL }}</td>
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
                        <input name="nutrition" type="checkbox" checked @input="nutritionFacts = !nutritionFacts" />
                        Nutrition Facts
                    </label>
                    <label>
                        <input name="supplier" type="checkbox" checked @input="supplierData = !supplierData" />
                        Supplier Data
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
            nutritionFacts: true,
            supplierData: true,
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