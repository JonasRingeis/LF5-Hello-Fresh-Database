export async function getCustomerWithSearch(field, value, operator) {
    const query = "SELECT * FROM KUNDE as K" +
        " JOIN ADRESSE AS A ON K.ADRESS_ID = A.ADRESS_ID" +
        " JOIN BUNDESLAND as B ON A.BUND_ID = B.BUND_ID" +
        " " + buildSearchQuery(field, value, operator);

    const response = await fetch("/api/getData?q=" + query);
    return await response.json();
}
export async function getAllCustomers() {
    const query = "SELECT * FROM KUNDE AS K" +
        " JOIN ADRESSE AS A ON K.ADRESS_ID = A.ADRESS_ID" +
        " JOIN BUNDESLAND AS b ON A.BUND_ID = B.BUND_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}

export async function getSupplierWithSearch(field, value, operator) {
    const query = "SELECT * FROM LIEFERANT as L" +
        " JOIN ADRESSE AS A ON L.ADRESS_ID = A.ADRESS_ID" +
        " JOIN BUNDESLAND AS B ON A.BUND_ID = B.BUND_ID" +
        " " + buildSearchQuery(field, value, operator);

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
export async function getAllSuppliers() {
    const query = "SELECT * FROM LIEFERANT AS L" +
        " JOIN ADRESSE AS A ON L.ADRESS_ID = A.ADRESS_ID" +
        " JOIN BUNDESLAND AS B ON A.BUND_ID = B.BUND_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}

export async function getBoxWithSearch(field, value, operator) {
    const query = "SELECT B.BOX_ID, B.NAME, B.BESCHREIBUNG, B.PREIS, GROUP_CONCAT(Z.BEZEICHNUNG SEPARATOR ', ') AS ZUTATEN" +
        " FROM BOX AS B" +
        " JOIN BOX_ZUTAT AS BZ ON B.BOX_ID = BZ.BOX_ID" +
        " JOIN ZUTAT AS Z ON BZ.ZUTAT_ID = Z.ZUTAT_ID" +
        "JOIN ZUTAT_ERNÄHRUNGSKATEGORIE AS ZE ON ZE.ZUTAT_ID = Z.ZUTAT_ID" +
        "JOIN ERNÄHRUNGSKATEGORIE AS E ON E.ERNÄHRUNGSKATEGORIE_ID = ZE.ERNÄHRUNGSKATEGORIE_ID" +
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
        "JOIN ZUTAT_ERNÄHRUNGSKATEGORIE AS ZE ON ZE.ZUTAT_ID = Z.ZUTAT_ID" +
        "JOIN ERNÄHRUNGSKATEGORIE AS E ON E.ERNÄHRUNGSKATEGORIE_ID = ZE.ERNÄHRUNGSKATEGORIE_ID" +
        " GROUP BY B.BOX_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
export async function getIngredientWithSearch(field, value, operator) {

    const query = "SELECT * FROM ZUTAT AS Z" +
        " JOIN NÄHRWERTE AS N ON Z.NÄHRWERTE_ID = N.NÄHRWERTE_ID" +
        " JOIN LIEFERANT AS L ON Z.LIEFERANTEN_ID = L.LIEFERANTEN_ID" +
        " JOIN ADRESSE AS A ON A.ADRESS_ID = L.ADRESS_ID" +
        " JOIN BUNDESLAND AS B ON B.BUND_ID = A.BUND_ID" +
        "JOIN ZUTAT_ERNÄHRUNGSKATEGORIE AS ZE ON ZE.ZUTAT_ID = Z.ZUTAT_ID" +
        "JOIN ERNÄHRUNGSKATEGORIE AS E ON E.ERNÄHRUNGSKATEGORIE_ID = ZE.ERNÄHRUNGSKATEGORIE_ID" +
        " " + buildSearchQuery(field, value, operator);

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
export async function getAllIngredients() {
    const query = "SELECT * FROM ZUTAT AS Z" +
        " JOIN NÄHRWERTE AS N ON Z.NÄHRWERTE_ID = N.NÄHRWERTE_ID" +
        " JOIN LIEFERANT AS L ON Z.LIEFERANTEN_ID = L.LIEFERANTEN_ID" +
        " JOIN ADRESSE AS A ON A.ADRESS_ID = L.ADRESS_ID" +
        "JOIN ZUTAT_ERNÄHRUNGSKATEGORIE AS ZE ON ZE.ZUTAT_ID = Z.ZUTAT_ID" +
        "JOIN ERNÄHRUNGSKATEGORIE AS E ON E.ERNÄHRUNGSKATEGORIE_ID = ZE.ERNÄHRUNGSKATEGORIE_ID" +
        " JOIN BUNDESLAND AS B ON B.BUND_ID = A.BUND_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}

export async function getRecipeWithSearch(field, value, operator) {
    const query = "SELECT R.REZEPT_ID, R.NAME, R.ANLEITUNG, R.DAUER, GROUP_CONCAT(Z.BEZEICHNUNG SEPARATOR ', ') AS ZUTATEN, SUM(Z.NETTOPREIS) AS PREIS" +
        " FROM REZEPT AS R" +
        " LEFT JOIN REZEPT_ZUTAT AS RZ ON R.REZEPT_ID = RZ.REZEPT_ID" +
        " LEFT JOIN ZUTAT AS Z ON RZ.ZUTAT_ID = Z.ZUTAT_ID" +
        "JOIN ZUTAT_ERNÄHRUNGSKATEGORIE AS ZE ON ZE.ZUTAT_ID = Z.ZUTAT_ID" +
        "JOIN ERNÄHRUNGSKATEGORIE AS E ON E.ERNÄHRUNGSKATEGORIE_ID = ZE.ERNÄHRUNGSKATEGORIE_ID" +
        " " + buildSearchQuery(field, value, operator) +
        " GROUP BY R.REZEPT_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
export async function getAllRecipies() {
    const query = "SELECT R.REZEPT_ID, R.NAME, R.ANLEITUNG, R.DAUER, GROUP_CONCAT(Z.BEZEICHNUNG SEPARATOR ', ') AS ZUTATEN, SUM(Z.NETTOPREIS) AS PREIS" +
        " FROM REZEPT AS R" +
        " LEFT JOIN REZEPT_ZUTAT AS RZ ON R.REZEPT_ID = RZ.REZEPT_ID" +
        " LEFT JOIN ZUTAT AS Z ON RZ.ZUTAT_ID = Z.ZUTAT_ID" +
        "JOIN ZUTAT_ERNÄHRUNGSKATEGORIE AS ZE ON ZE.ZUTAT_ID = Z.ZUTAT_ID" +
        "JOIN ERNÄHRUNGSKATEGORIE AS E ON E.ERNÄHRUNGSKATEGORIE_ID = ZE.ERNÄHRUNGSKATEGORIE_ID" +
        " GROUP BY R.REZEPT_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}

export async function getOrderWithSearch(field, value, operator) {
    const query = "SELECT" +
        " B.BESTELL_ID, B.BESTELLDATUM," +
        " B.RECHNUNGSBETRAG, K.VORNAME," +
        " K.NACHNAME, K.GEBURTSDATUM," +
        " A.STRASSE, A.HAUSNR," +
        " A.PLZ, A.WOHNORT, BL.BUND_NAME," +
        " K.TELEFON, K.EMAIL," +
        " (SELECT GROUP_CONCAT(DISTINCT CONCAT(Z.BEZEICHNUNG, '_', BZ.MENGE) SEPARATOR ', ')" +
        " FROM BESTELLUNG_ZUTAT AS BZ" +
        " JOIN ZUTAT AS Z ON BZ.ZUTAT_ID = Z.ZUTAT_ID" +
        " WHERE BZ.BESTELL_ID = B.BESTELL_ID) AS ZUTATEN," +
        " (SELECT GROUP_CONCAT(DISTINCT BX.NAME SEPARATOR ', ')" +
        " FROM BESTELLUNG_BOX AS BB" +
        " JOIN BOX AS BX ON BB.BOX_ID = BX.BOX_ID" +
        " WHERE BB.BESTELL_ID = B.BESTELL_ID) AS BOXEN," +
        " (SELECT GROUP_CONCAT(DISTINCT R.NAME SEPARATOR ', ')" +
        " FROM BESTELLUNG_REZEPT AS BR" +
        " JOIN REZEPT AS R ON BR.REZEPT_ID = R.REZEPT_ID" +
        " WHERE BR.BESTELL_ID = B.BESTELL_ID) AS REZEPTE" +
        " FROM BESTELLUNG AS B" +
        " JOIN KUNDE AS K ON B.KUNDEN_ID = K.KUNDEN_ID" +
        " JOIN ADRESSE AS A ON K.ADRESS_ID = A.ADRESS_ID" +
        " JOIN BUNDESLAND AS BL ON A.BUND_ID = BL.BUND_ID" +
        " " + buildSearchQuery(field, value, operator) +
        " GROUP BY" +
        " B.BESTELL_ID"

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
export async function getAllOrders() {
    const query = "SELECT" +
        " B.BESTELL_ID, B.BESTELLDATUM," +
        " B.RECHNUNGSBETRAG, K.VORNAME," +
        " K.NACHNAME, K.GEBURTSDATUM," +
        " A.STRASSE, A.HAUSNR," +
        " A.PLZ, A.WOHNORT, BL.BUND_NAME," +
        " K.TELEFON, K.EMAIL," +
        " (SELECT GROUP_CONCAT(DISTINCT CONCAT(Z.BEZEICHNUNG, '_', BZ.MENGE) SEPARATOR ', ')" +
        " FROM BESTELLUNG_ZUTAT AS BZ" +
        " JOIN ZUTAT AS Z ON BZ.ZUTAT_ID = Z.ZUTAT_ID" +
        " WHERE BZ.BESTELL_ID = B.BESTELL_ID) AS ZUTATEN," +
        " (SELECT GROUP_CONCAT(DISTINCT BX.NAME SEPARATOR ', ')" +
        " FROM BESTELLUNG_BOX AS BB" +
        " JOIN BOX AS BX ON BB.BOX_ID = BX.BOX_ID" +
        " WHERE BB.BESTELL_ID = B.BESTELL_ID) AS BOXEN," +
        " (SELECT GROUP_CONCAT(DISTINCT R.NAME SEPARATOR ', ')" +
        " FROM BESTELLUNG_REZEPT AS BR" +
        " JOIN REZEPT AS R ON BR.REZEPT_ID = R.REZEPT_ID" +
        " WHERE BR.BESTELL_ID = B.BESTELL_ID) AS REZEPTE" +
        " FROM BESTELLUNG AS B" +
        " JOIN KUNDE AS K ON B.KUNDEN_ID = K.KUNDEN_ID" +
        " JOIN ADRESSE AS A ON K.ADRESS_ID = A.ADRESS_ID" +
        " JOIN BUNDESLAND AS BL ON A.BUND_ID = BL.BUND_ID" +
        " GROUP BY" +
        " B.BESTELL_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}

function buildSearchQuery(field, value, operator) {
    if (operator == "LIKE") {
        value = "**" + value + "**";
    }
    return "WHERE " + field + " " + operator + " " + value;
}

// Creation Queries
export async function createRecipe(name, instructions, preperationTime, ingredients) {
    const createRecipeQuery = "INSERT INTO REZEPT (NAME, ANLEITUNG, DAUER) VALUES " +
        "(\"" + name + "\", \"" + instructions + "\", " + preperationTime + ")";

    const createRecipeResult = await fetch('/api/getData?q=' + createRecipeQuery);
    if (await createRecipeResult.status() != 200) {
        return createRecipeResult;
    }

    const getNewRecipeIdQuery = "SELECT LAST_INSERT_ID() AS REZEPT_ID;"

    const recipeId = (await (await fetch('/api/getData?q=' + getNewRecipeIdQuery)).json())[0].REZEPT_ID;

    ingredients.forEach(async (Ingredient) => {
        const createRecipe = "INSERT INTO REZEPT_ZUTAT (MENGE, ZUTAT_ID, REZEPT_ID) VALUES " +
            "(" + Ingredient.MENGE + ", " + Ingredient.ZUTAT_ID + ", " + recipeId + ")";

        (await (await fetch('/api/getData?q=' + createRecipe)).json());
    });
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
        " A.STRASSE AS 'Street', A.HAUSNR AS 'Nr', A.PLZ AS 'Zip Code'," +
        " A.WOHNORT AS 'Location', K.TELEFON AS 'Telephone', K.EMAIL AS 'Email'," +
        " B.BUND_NAME AS 'State' FROM KUNDE AS K" +

        " JOIN ADRESSE A ON K.ADRESS_ID = A.ADRESS_ID" +
        " JOIN BUNDESLAND B ON B.BUND_ID = A.BUND_ID" +

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