const CUSTOMER_TABLE = "kunde";
const CARRIER_TABLE = "lieferant";
const INGREDIENT_TABLE = "zutat";
const BOX_INGREDIENT_TABLE = "box_zutat";
const BOX_TABLE = "box";
const STATE_TABLE = "bundesland";

export async function getCustomerWithSearch(field, value) {
    const query = "SELECT * FROM KUNDE as K" 
    " JOIN BUNDESLAND as B ON K.BUND_ID = B.BUND_ID" + 
    " WHERE " + field + " = " + value;

    const response = await fetch("/api/getData?q=" + query);
    return await response.json();
}
export async function getAllCustomers() {
    const query = "SELECT * FROM KUNDE AS K" +
    " JOIN BUNDESLAND AS b ON K.BUND_ID=B.BUND_ID"
    
    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}

export async function getCarrierWithSearch(field, value) {
    const query = "SELECT * FROM LIEFERANT as L" +
    " JOIN BUNDESLAND AS B ON L.BUND_ID = B.BUND_ID" +
    " WHERE " + field + " = " + value;
    
    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
export async function getAllCarriers() {
    const query = "SELECT * FROM LIEFERANT AS L" +
    " JOIN BUNDESLAND AS B ON L.BUND_ID = B.BUND_ID"

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}

export async function getBoxWithSearch(field, value) {
    const query = "SELECT B.BOX_ID, B.NAME, B.BESCHREIBUNG, B.PREIS, GROUP_CONCAT(Z.BEZEICHNUNG SEPARATOR ', ') AS ZUTATEN" +
    " FROM BOX AS B" +
    " JOIN BOX_ZUTAT AS BZ ON B.BOX_ID = BZ.BOX_ID" +
    " JOIN ZUTAT AS Z ON BZ.ZUTAT_ID = Z.ZUTAT_ID" +
    " WHERE B." + field + " = " + value +
    " GROUP BY B.BOX_ID";
    
    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
export async function getAllBoxes() {
    const query = "SELECT B.BOX_ID, B.NAME, B.BESCHREIBUNG, B.PREIS, GROUP_CONCAT(Z.BEZEICHNUNG SEPARATOR ', ') AS ZUTATEN" +
    " FROM BOX AS B" +
    " JOIN BOX_ZUTAT AS BZ ON B.BOX_ID = BZ.BOX_ID" +
    " JOIN ZUTAT AS Z ON BZ.ZUTAT_ID = Z.ZUTAT_ID" +
    " GROUP BY B.BOX_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
