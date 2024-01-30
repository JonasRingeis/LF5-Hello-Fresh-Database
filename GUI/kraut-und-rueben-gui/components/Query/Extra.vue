<template>
    <div class="wrapper">
        <h2>Extra Queries</h2>

        <div class="center-wrapper">     
            <button class="query-button" @click="findCheapestBox">
                Get Cheapest Box
            </button>
        
            <button class="query-button" @click="findFullCustomerData">
                Get Full Customer Data
            </button>
        </div>

        <div class="result-table-wrapper">
            <table class="result-table">
              <tr>
                <th v-for="(field, index) in resultFields" :key="index">
                    {{ field }}
                </th>
              </tr>
              <tr>
                <td v-for="(value, index) in resultValues" :key="index">
                    {{ value }}
                </td>
              </tr>
            </table>
        </div>

        <div class="center-wrapper" v-if="querySending">
            <div class="loader"></div>
        </div>

        <div v-if="resultValues.length == 0 && queryFinished">
            <h4 style="color: red;">
                No Data Found
            </h4>
        </div>
        <h4 style="color: red;" v-if="error != ''">
            {{ error }}
        </h4>
    </div>
</template>
<script>
import '../../assets/css/QueryStyle.css';
import { getCheapestBox, getFullCustomerData } from '../../assets/scripts/requester';

export default {
    data() {
        return {
            placeholderShown: true,
            resultFields: [],
            resultValues: [],
            queryFinished: false,
            querySending: false,
            error: "",
        }
    },
    methods: {
        checkPlaceholder() {
            this.placeholderShown = this.$refs.searchValue.value.length == 0;
        },
        async findCheapestBox() {
            this.resetProps();
            this.querySending = true;
            
            const result = await getCheapestBox();
            this.querySending = false;
            if (result.error != undefined) {
                this.error = result.error;
            } else {
                this.resultFields = Object.keys(result[0]);
                this.resultValues = Object.values(result[0]);
                this.queryFinished = true;
            }
        },
        async findFullCustomerData() {
            this.resetProps();
            this.querySending = true;
            
            const result = await getFullCustomerData(1);
            this.querySending = false;
            if (result.error != undefined) {
                this.error = result.error;
            } else {
                this.resultFields = Object.keys(result[0]);
                this.resultValues = Object.values(result[0]);
                this.queryFinished = true;
            }
        },
        resetProps() {
            this.resultFields = [];
            this.resultValues = [];
            this.error = "";
            this.queryFinished = false;
        }
    }
}
</script>
<style lang="">
    
</style>