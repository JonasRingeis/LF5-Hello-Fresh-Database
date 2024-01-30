export async function getCustomerWithSearch(field, value, operator) {
    const query = "SELECT * FROM KUNDE as K" +
    " JOIN BUNDESLAND as B ON K.BUND_ID = B.BUND_ID" + 
    " " + buildSearchQuery(field, value, operator);

    const response = await fetch("/api/getData?q=" + query);
    return await response.json();
}
export async function getAllCustomers() {
    const query = "SELECT * FROM KUNDE AS K" +
    " JOIN BUNDESLAND AS b ON K.BUND_ID=B.BUND_ID"
    
    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}

export async function getSupplierWithSearch(field, value, operator) {
    const query = "SELECT * FROM LIEFERANT as L" +
    " JOIN BUNDESLAND AS B ON L.BUND_ID = B.BUND_ID" +
    " " + buildSearchQuery(field, value, operator);
    
    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
export async function getAllSuppliers() {
    const query = "SELECT * FROM LIEFERANT AS L" +
    " JOIN BUNDESLAND AS B ON L.BUND_ID = B.BUND_ID"

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}

export async function getBoxWithSearch(field, value, operator) {
    const query = "SELECT B.BOX_ID, B.NAME, B.BESCHREIBUNG, B.PREIS, GROUP_CONCAT(Z.BEZEICHNUNG SEPARATOR ', ') AS ZUTATEN" +
    " FROM BOX AS B" +
    " JOIN BOX_ZUTAT AS BZ ON B.BOX_ID = BZ.BOX_ID" +
    " JOIN ZUTAT AS Z ON BZ.ZUTAT_ID = Z.ZUTAT_ID" +
    " " + buildSearchQuery(field, value, operator) +
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
export async function getIngredientWithSearch(field, value, operator) {
    
    const query = "SELECT * FROM ZUTAT AS Z" +
    " JOIN NÄHRWERTE AS N ON Z.NÄHRWERTE_ID = N.NÄHRWERTE_ID" +
    " JOIN LIEFERANT AS L ON Z.LIEFERANTEN_ID = L.LIEFERANTEN_ID" +
    " " + buildSearchQuery(field, value, operator, "Z");

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
export async function getAllIngredients() {
    const query = "SELECT * FROM ZUTAT AS Z" +
    " JOIN NÄHRWERTE AS N ON Z.NÄHRWERTE_ID = N.NÄHRWERTE_ID" + 
    " JOIN LIEFERANT AS L ON Z.LIEFERANTEN_ID = L.LIEFERANTEN_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}

export async function getAllRecepies() {
    const query = "SELECT * FROM REZEPT AS R";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}

function buildSearchQuery(field, value, operator) {
    if (operator == "LIKE") {
        value = "**" + value + "**";
    }
    return "WHERE " + field + " " + operator + " " + value;
}



//✨ Special Queries ✨
export async function getCheapestBox() {
    const query = "SELECT * FROM BOX B" + 
    " WHERE PREIS = (SELECT MIN(PREIS) FROM BOX B2)";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
export async function getFullCustomerData(id) {
    const query = "SELECT * FROM KUNDE K" +
    " JOIN BUNDESLAND B ON B.BUND_ID = K.BUND_ID" + 
    " JOIN BESTELLUNG B2 ON B2.KUNDEN_ID = K.KUNDEN_ID" + 
    " WHERE K.KUNDEN_ID  = " + id;
    
    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}