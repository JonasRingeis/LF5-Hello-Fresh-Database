const CUSTOMER_TABLE = "kunde";
const CARRIER_TABLE = "lieferant";
const BOX_TABLE = "box";

export async function getCustomerWithSearch(field, value) {
    const query = "SELECT * FROM " + CUSTOMER_TABLE + " JOIN bundesland ON kunde.BUND_ID=bundesland.BUND_ID WHERE " + field + " = " + value;

    const response = await fetch("/api/getData?q=" + query);
    return await response.json();
}
export async function getAllCustomers() {
    const query = "SELECT * FROM " + CUSTOMER_TABLE + " JOIN bundesland ON kunde.BUND_ID=bundesland.BUND_ID"
    
    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}

export async function getCarrierWithSearch(field, value) {
    const query = "SELECT * FROM " + CARRIER_TABLE + " JOIN bundesland ON lieferant.BUND_ID=bundesland.BUND_ID WHERE " + field + " = " + value;
    
    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
export async function getAllCarriers() {
    const query = "SELECT * FROM " + CARRIER_TABLE + " JOIN bundesland ON lieferant.BUND_ID=bundesland.BUND_ID"

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}

export async function getBoxWithSearch(field, value) {
    const query = "SELECT * FROM " + BOX_TABLE + " AS B JOIN BESTELLUNG_BOX AS BB ON B.BOX_ID = BB.BOX_ID JOIN ZUTAT AS Z ON BB.ZUTAT_ID = Z.ZUTAT_ID WHERE" + field + " = " + value;
    
    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
export async function getAllBoxes() {
    const query = "SELECT * FROM " + BOX_TABLE + " AS B JOIN BESTELLUNG_BOX AS BB ON B.BOX_ID = BB.BOX_ID JOIN ZUTAT AS Z ON BB.ZUTAT_ID = Z.ZUTAT_ID"

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
