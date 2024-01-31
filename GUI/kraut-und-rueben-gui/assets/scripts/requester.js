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
        " " + buildSearchQuery(field, value, operator);

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

export async function getRecipeWithSearch(field, value, operator) {
    const query = "SELECT R.REZEPT_ID, R.NAME, R.ANLEITUNG, R.DAUER, GROUP_CONCAT(Z.BEZEICHNUNG SEPARATOR ', ') AS ZUTATEN, SUM(Z.NETTOPREIS) AS PREIS" +
        " FROM REZEPT AS R" +
        " JOIN REZEPT_ZUTAT AS RZ ON R.REZEPT_ID = RZ.REZEPT_ID" +
        " JOIN ZUTAT AS Z ON RZ.ZUTAT_ID = Z.ZUTAT_ID" +
        " " + buildSearchQuery(field, value, operator) +
        " GROUP BY R.REZEPT_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
export async function getAllRecipies() {
    const query = "SELECT R.REZEPT_ID, R.NAME, R.ANLEITUNG, R.DAUER, GROUP_CONCAT(Z.BEZEICHNUNG SEPARATOR ', ') AS ZUTATEN, SUM(Z.NETTOPREIS) AS PREIS" +
        " FROM REZEPT AS R" +
        " JOIN REZEPT_ZUTAT AS RZ ON R.REZEPT_ID = RZ.REZEPT_ID" +
        " JOIN ZUTAT AS Z ON RZ.ZUTAT_ID = Z.ZUTAT_ID" +
        " GROUP BY R.REZEPT_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}

export async function getOrderWithSearch(field, value, operator) {
    const query = "SELECT B.BESTELL_ID, B.BESTELLDATUM, B.RECHNUNGSBETRAG, " +
        "K.VORNAME, K.NACHNAME, K.GEBURTSDATUM, K.STRASSE, K.HAUSNR, K.PLZ, " +
        "K.ORT, BL.BUND_NAME, K.TELEFON, K.EMAIL, " +
        // "GROUP_CONCAT(Z.BEZEICHNUNG SEPARATOR ', ') AS ZUTATEN," +
        "GROUP_CONCAT(BX.NAME SEPARATOR ', ') AS BOXEN" +

        " FROM BESTELLUNG AS B" +

        " JOIN KUNDE AS K ON B.KUNDEN_ID = K.KUNDEN_ID" + 
        " JOIN BUNDESLAND AS BL ON K.BUND_ID = BL.BUND_ID" +

        
        " JOIN BESTELLUNG_BOX AS BB ON B.BESTELL_ID = BB.BESTELL_ID" +
        " JOIN BOX AS BX ON BB.BOX_ID = BX.BOX_ID" +
        
        " " + buildSearchQuery(field, value, operator) +
        " GROUP BY B.BESTELL_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
export async function getAllOrders() {
    const query = "SELECT B.BESTELL_ID, B.BESTELLDATUM, B.RECHNUNGSBETRAG, " +
            "K.VORNAME, K.NACHNAME, K.GEBURTSDATUM, K.STRASSE, K.HAUSNR, K.PLZ, " +
            "K.ORT, BL.BUND_NAME, K.TELEFON, K.EMAIL, " +
            "GROUP_CONCAT(Z.BEZEICHNUNG SEPARATOR ', ') AS ZUTATEN," +
            "GROUP_CONCAT(BX.NAME SEPARATOR ', ') AS BOXEN," +
            "GROUP_CONCAT(R.NAME SEPARATOR ', ') AS REZEPTE" +

        " FROM BESTELLUNG AS B" +
        
        " JOIN KUNDE AS K ON B.KUNDEN_ID = K.KUNDEN_ID" +
        " JOIN BUNDESLAND AS BL ON K.BUND_ID = BL.BUND_ID" +
        
        " LEFT JOIN BESTELLUNG_ZUTAT AS BZ ON B.BESTELL_ID = BZ.BESTELL_ID" +
        " LEFT JOIN ZUTAT AS Z ON BZ.ZUTAT_ID = Z.ZUTAT_ID" +

        " LEFT JOIN BESTELLUNG_BOX AS BB ON B.BESTELL_ID = BB.BESTELL_ID" +
        " LEFT JOIN BOX AS BX ON BB.BOX_ID = BX.BOX_ID" +

        " LEFT JOIN BESTELLUNG_REZEPT AS BR ON B.BESTELL_ID = BR.BESTELL_ID" +
        " LEFT JOIN REZEPT AS R ON BR.REZEPT_ID = R.REZEPT_ID" +

        " GROUP BY B.BESTELL_ID";

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
    const query = "SELECT B.BOX_ID AS 'Box Id', B.NAME AS 'Name'," +
    " B.BESCHREIBUNG as 'Description', CONCAT(B.PREIS, ' €') AS 'Price' FROM BOX B" +
        " WHERE PREIS = (SELECT MIN(PREIS) FROM BOX B2)";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
export async function getFullCustomerData(id) {
    const query = "SELECT K.KUNDEN_ID AS 'Id', K.VORNAME AS 'First Name'," +
        " K.NACHNAME AS 'Last Name', K.GEBURTSDATUM AS 'Birthdate'," +
        " K.STRASSE AS 'Street', K.HAUSNR AS 'Nr', K.PLZ AS 'Zip Code'," +
        " K.ORT AS 'Location', K.TELEFON AS 'Telephone', K.EMAIL AS 'Email'," +
        " B.BUND_NAME AS 'State', B2.RECHNUNGSBETRAG as 'Price'," +
        " B2.BESTELLDATUM AS 'Date' FROM KUNDE AS K" +

        " JOIN BUNDESLAND B ON B.BUND_ID = K.BUND_ID" +
        " JOIN BESTELLUNG B2 ON B2.KUNDEN_ID = K.KUNDEN_ID" +
        
        " WHERE K.KUNDEN_ID  = " + id;

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
export async function getIngredientsWithoutRecipe() {
    const query = "SELECT Z.ZUTAT_ID AS 'Ingredient Id', Z.BEZEICHNUNG AS 'Name', CONCAT(Z.NETTOPREIS, '€') AS 'Price', Z.BESTAND as Stock, CONCAT(Z.MENGE, ' ', Z.EINHEIT) AS Quantity FROM ZUTAT AS Z" +
        " LEFT JOIN REZEPT_ZUTAT AS RZ ON Z.ZUTAT_ID = RZ.ZUTAT_ID" +
        " WHERE RZ.REZEPT_ID is NULL";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}