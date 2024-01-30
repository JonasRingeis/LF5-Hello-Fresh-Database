<template>
    <div class="background">
        <div class="title-logo-wrapper">
            <img src="/Kraut_und_Rueben.png" class="logo-img">
            <h1 class="title">
                Kraut und Rüben SQL Database Showcase
            </h1>
        </div>

        <div class="selector-wrapper">
            <select @input="setDropdownValue" ref="query" class="query-selector">
                <option value="0">No Query</option>
                <option value="1">Extras</option>
                <option value="2">Custumers</option>
                <option value="3">Suppliers</option>
                <option value="4">Boxes</option>
                <option value="5">Ingredients</option>
            </select>
        </div>

        
        <div class="query-wrapper" v-if="querySelected == 0">
            <h2>You have no query selected!</h2>
            <p>
                To request data from the database,
                simply choose a query at the dropdown above,
                enter your data and send it. 
            </p>
        </div>

        <div class="query-wrapper" v-if="querySelected == 1">
            <QueryExtra />
        </div>
        <div class="query-wrapper" v-if="querySelected == 2">
            <QueryCustomers />
        </div>
        <div class="query-wrapper" v-if="querySelected == 3">
            <QuerySuppliers />
        </div>
        <div class="query-wrapper" v-if="querySelected == 4">
            <QueryBoxes />
        </div>
        <div class="query-wrapper" v-if="querySelected == 5">
            <QueryIngredients />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            querySelected: 0,
        }
    },
    methods: {
        setDropdownValue() {
            this.querySelected = this.$refs['query'].value;
        },
    },
    mounted() {
        this.setDropdownValue();
    }
}
</script>

<script setup>
useHead({
    title: "Kraut & Rüben Database Showcase"
})
</script>

<style scoped>
.background {
    background-image: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%);
    min-height: 100vh;
    height: 100%;
}
.title-logo-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
}
.logo-img {
    margin-inline: auto;
    height: 100px;
    width: auto;
}
.title {
    font-weight: 900;
    text-align: center;
    color: rgb(94, 59, 109);
}
.selector-wrapper {
    display: flex;
    justify-content: center;
}
.query-selector {
    border-radius: 5px;
    border: none;
    
    padding: 10px;
    
    background: #008552;
    color: white;
    transition: 0.3s;
    
    text-align: center;
    font-weight: 900;
    font-size: medium;
}
.query-selector:hover { background: #006b42; }
.query-selector option {
    font-weight: 600;
    background: rgb(0, 159, 45);
}
.query-wrapper {
    padding: 20px;
    text-align: center;
}
.button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>