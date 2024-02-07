<template>
    <div class="popup-wrapper">
        <div class="popup">
            <img src="/img/close.svg" class="close-popup" @click="closeWindow">
            <h2>
                Delete Customer
            </h2>
            <p>
                Are you sure, you want to delete the customer with the name
                <span style="color: rgb(0, 115, 27); font-weight: 700;">
                    {{ customerName }}
                </span>.
            </p>

            <div class="center-wrapper" v-if="deleting">
                <div class="loader"></div>
            </div>
            
            <div>
                <button @click="closeWindow" class="query-button">
                    Cancel
                </button>
                <button @click="confirmDelete" class="query-button">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { deleteCustomer } from '../../assets/scripts/requester';
export default {
    methods: {
        closeWindow() {
            this.$emit("onWindowClose");
        },
        async confirmDelete() {
            this.deleting = true;
            await deleteCustomer(this.customerId);
            this.deleting = false;
            this.closeWindow();
        }
    },
    props: {
        customerName: String,
        customerId: String
    },
    data() {
        return {
            error: "",
            deleting: false,
        }
    },
    emits: [
        "onWindowClose"
    ],
}
</script>
