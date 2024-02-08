const customerQuery = "SELECT * FROM KUNDE as K" +
    " JOIN ADRESSE AS A ON K.ADRESS_ID = A.ADRESS_ID" +
    " JOIN BUNDESLAND as B ON A.BUND_ID = B.BUND_ID";

export async function getCustomerWithSearch(field, value, operator) {
    const query = customerQuery +
        " " + buildSearchQuery(field, value, operator) +
        " AND K.KUNDEN_ID != 0";

    const response = await fetch("/api/getData?q=" + query);
    return await response.json();
}
export async function getAllCustomers() {
    const query = customerQuery +
    " WHERE K.KUNDEN_ID != 0";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}

const supplierQuery = "SELECT L.LIEFERANTEN_ID, " +
    " L.LIEFERANTENNAME, L.ADRESS_ID," +
    " L.TELEFON, L.EMAIL," +
    " L.BUND_ID, A.STRASSE," +
    " A.HAUSNR, A.PLZ," +
    " A.WOHNORT, B.BUND_NAME," +
    " GROUP_CONCAT(Z.BEZEICHNUNG SEPARATOR ', ') AS ZUTATEN" +
    " FROM LIEFERANT AS L" +
    " JOIN ADRESSE AS A ON L.ADRESS_ID = A.ADRESS_ID" +
    " JOIN BUNDESLAND AS B ON A.BUND_ID = B.BUND_ID" +
    " RIGHT JOIN ZUTAT AS Z ON Z.LIEFERANTEN_ID = L.LIEFERANTEN_ID";

export async function getSupplierWithSearch(field, value, operator) {
    const query = supplierQuery +
        " " + buildSearchQuery(field, value, operator) +
        " GROUP BY L.LIEFERANTEN_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
export async function getAllSuppliers() {
    const query = supplierQuery +
        " GROUP BY L.LIEFERANTEN_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}

const boxQuery = "SELECT B.BOX_ID, B.NAME, B.BESCHREIBUNG, B.PREIS," +
    " GROUP_CONCAT(Z.BEZEICHNUNG SEPARATOR ', ') AS ZUTATEN," +
    " MIN(E.ERNÄHRUNGSKATEGORIE_ID) AS ERNÄHRUNGSKATEGORIE," +
    " (SELECT EK.NAME FROM ERNÄHRUNGSKATEGORIE AS EK WHERE EK.ERNÄHRUNGSKATEGORIE_ID = MIN(E.ERNÄHRUNGSKATEGORIE_ID)) AS ERNÄHRUNGSKATEGORIE_NAME" +
    " FROM BOX AS B" +
    " JOIN BOX_ZUTAT AS BZ ON B.BOX_ID = BZ.BOX_ID" +
    " JOIN ZUTAT AS Z ON BZ.ZUTAT_ID = Z.ZUTAT_ID" +
    " JOIN ERNÄHRUNGSKATEGORIE AS E ON E.ERNÄHRUNGSKATEGORIE_ID = Z.ERNÄHRUNGSKATEGORIE_ID";

export async function getBoxWithSearch(field, value, operator) {
    const query = boxQuery +
        " " + buildSearchQuery(field, value, operator) +
        " GROUP BY B.BOX_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
export async function getAllBoxes() {
    const query = boxQuery +
        " GROUP BY B.BOX_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}

const ingredientQuery = "SELECT Z.ZUTAT_ID," +
    " Z.*, N.*, A.*, L.*," +
    " B.BUND_NAME," +
    " E.NAME AS ERNÄHRUNGSKATEGORIE," +
    " (" +
    " SELECT GROUP_CONCAT(ET.NAME SEPARATOR ', ')" +
    " FROM ZUTAT_ERNÄHRUNGSTRENDS AS ZE" +
    " JOIN ERNÄHRUNGSTRENDS AS ET ON ZE.ERNÄHRUNGSTREND_ID = ET.ERNÄHRUNGSTREND_ID" +
    " WHERE ZE.ZUTAT_ID = Z.ZUTAT_ID" +
    ") AS ERNÄHRUNGSTRENDS," +
    " (" +
    "SELECT GROUP_CONCAT(EX.NAME SEPARATOR ', ')" +
    " FROM ZUTAT_EXTRAS AS ZX" +
    " JOIN EXTRAS AS EX ON ZX.EXTRA_ID = EX.EXTRA_ID" +
    " WHERE ZX.ZUTAT_ID = Z.ZUTAT_ID" +
    ") AS EXTRAS, " +
    " (" +
    " SELECT GROUP_CONCAT(HF.ART SEPARATOR ', ')" +
    " FROM ZUTAT_EXTRAS AS ZX" +
    " JOIN EXTRAS AS EX ON ZX.EXTRA_ID = EX.EXTRA_ID" +
    " JOIN HALTUNGSFORM AS HF ON EX.HALTUNGSFORM_ID = HF.HALTUNGSFORM_ID" +
    " WHERE ZX.ZUTAT_ID = Z.ZUTAT_ID" +
    ") AS HALTUNGSFORM" +
    " FROM ZUTAT AS Z" +
    " JOIN NÄHRWERTE AS N ON Z.NÄHRWERTE_ID = N.NÄHRWERTE_ID" +
    " JOIN LIEFERANT AS L ON Z.LIEFERANTEN_ID = L.LIEFERANTEN_ID" +
    " JOIN ADRESSE AS A ON A.ADRESS_ID = L.ADRESS_ID" +
    " JOIN BUNDESLAND AS B ON B.BUND_ID = A.BUND_ID" +
    " JOIN ERNÄHRUNGSKATEGORIE AS E ON E.ERNÄHRUNGSKATEGORIE_ID = Z.ERNÄHRUNGSKATEGORIE_ID";

export async function getIngredientWithSearch(field, value, operator) {
    const query = ingredientQuery +
        " " + buildSearchQuery(field, value, operator) +
        " ORDER BY Z.ZUTAT_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
export async function getAllIngredients() {
    const query = ingredientQuery +
    " ORDER BY Z.ZUTAT_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}

const recipeQuery = "SELECT" +
    " R.*, " +
    " GROUP_CONCAT(Z.BEZEICHNUNG SEPARATOR ', ') AS ZUTATEN," +
    " SUM(Z.NETTOPREIS) AS PREIS," +
    " MIN(E.ERNÄHRUNGSKATEGORIE_ID) AS ERNÄHRUNGSKATEGORIE," +
    " (SELECT EK.NAME FROM ERNÄHRUNGSKATEGORIE AS EK WHERE EK.ERNÄHRUNGSKATEGORIE_ID = MIN(E.ERNÄHRUNGSKATEGORIE_ID)) AS ERNÄHRUNGSKATEGORIE_NAME" +
    " FROM REZEPT AS R" +
    " LEFT JOIN REZEPT_ZUTAT AS RZ ON R.REZEPT_ID = RZ.REZEPT_ID" +
    " LEFT JOIN ZUTAT AS Z ON RZ.ZUTAT_ID = Z.ZUTAT_ID" +
    " JOIN ERNÄHRUNGSKATEGORIE AS E ON E.ERNÄHRUNGSKATEGORIE_ID = Z.ERNÄHRUNGSKATEGORIE_ID";

export async function getRecipeWithSearch(field, value, operator) {
    const query = recipeQuery +
        " " + buildSearchQuery(field, value, operator) +
        " GROUP BY R.REZEPT_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
export async function getAllRecipies() {
    const query = recipeQuery +
        " GROUP BY R.REZEPT_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}

const orderQuery = "SELECT" +
    " B.*, K.*, A.*," +
    " BL.BUND_NAME, K.*, " +
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
    " JOIN BUNDESLAND AS BL ON A.BUND_ID = BL.BUND_ID";

export async function getOrderWithSearch(field, value, operator) {
    const query = orderQuery +
        " " + buildSearchQuery(field, value, operator) +
        " GROUP BY" +
        " B.BESTELL_ID"

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}
export async function getAllOrders() {
    const query = orderQuery +
        " GROUP BY" +
        " B.BESTELL_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}

const nutritionTrendQuery = "SELECT * FROM ERNÄHRUNGSTRENDS AS ET";

export async function getAllNutritionTrends() {
    const query = nutritionTrendQuery;

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}

const extraQuery = "SELECT E.NAME, H.ART, E.EXTRA_ID FROM EXTRAS AS E" +
    " LEFT JOIN HALTUNGSFORM AS H ON H.HALTUNGSFORM_ID = E.HALTUNGSFORM_ID";

export async function getAllExtras() {
    const query = extraQuery;

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
    if (createRecipeResult.status != "200") {
        return createRecipeResult;
    }

    const getNewRecipeIdQuery = "SELECT LAST_INSERT_ID() AS REZEPT_ID;"

    const recipeId = (await (await fetch('/api/getData?q=' + getNewRecipeIdQuery)).json())[0].REZEPT_ID;

    ingredients.forEach(async (Ingredient) => {
        const createRecipe = "INSERT INTO REZEPT_ZUTAT (MENGE, ZUTAT_ID, REZEPT_ID) VALUES " +
            "(" + Ingredient.MENGE + ", " + Ingredient.ZUTAT_ID + ", " + recipeId + ")";

        (await (await fetch('/api/getData?q=' + createRecipe)).json());
    });
    return "";
}
export async function createIngredient(name, quantity, unit,
    price, stock, calories, carbohydrates, proteins, diataryFiber, fat, sodium,
    foodCategory, selectedNutritionTrend, supplier, extras) {

    const getNewestId = "SELECT LAST_INSERT_ID() AS ID";

    const createNutritionQuery = "INSERT INTO NÄHRWERTE" +
        " (KALORIEN, KOHLENHYDRATE, PROTEINE, BALLASTSTOFFE, FETT, NATRIUM) VALUES" +
        " (" + calories + ", " + carbohydrates + ", " + proteins + ", " + diataryFiber + ", " + fat + ", " + sodium + ")";

    const nutritionResult = await fetch('/api/getData?q=' + createNutritionQuery);
    if (nutritionResult.status != "200") {
        return nutritionResult;
    }

    const nutritionId = (await (await fetch('/api/getData?q=' + getNewestId)).json())[0].ID;

    const createIngredientQuery = "INSERT INTO ZUTAT" +
        " (BEZEICHNUNG, MENGE, EINHEIT, NETTOPREIS, BESTAND, LIEFERANTEN_ID, NÄHRWERTE_ID, ERNÄHRUNGSKATEGORIE_ID) VALUES" +
        " (\"" + name + "\", " + quantity + ", \"" + unit + "\", " + price + ", " + stock + ", " + supplier + ", " + nutritionId + ", " + foodCategory + ")";

    const createIngredientResult = await fetch('/api/getData?q=' + createIngredientQuery);
    if (createIngredientResult.status != "200") {
        return createIngredientResult;
    }

    const ingredientId = (await (await fetch('/api/getData?q=' + getNewestId)).json())[0].ID;

    selectedNutritionTrend.forEach(async (trend) => {
        const nutritionTrendQuery = "INSERT INTO ZUTAT_ERNÄHRUNGSTRENDS" +
            " (ZUTAT_ID, ERNÄHRUNGSTREND_ID)" +
            " (" + ingredientId + ", " + trend.ERNÄHRUNGSTREND_ID + ")";

        await fetch('/api/getData?q=' + nutritionTrendQuery);
    });

    extras.forEach(async (extra) => {
        const extraQuery = "INSERT INTO ZUTAT_EXTRAS" +
            " (ZUTAT_ID, EXTRA_ID) VALUES" +
            " (" + ingredientId + ", " + extra.EXTRA_ID + ")";

        await fetch('/api/getData?q=' + extraQuery);
    });
    return "";
}

export async function createBox(name, description, price, ingredients) {
    const createBoxQuery = "INSERT INTO BOX (NAME, BESCHREIBUNG, PREIS) VALUES " +
        "(\"" + name + "\", \"" + description + "\", " + price + ")";

    const createBoxResult = await fetch('/api/getData?q=' + createBoxQuery);
    if (createBoxResult.status != "200") {
        return createBoxResult;
    }

    const getNewBoxIdQuery = "SELECT LAST_INSERT_ID() AS REZEPT_ID;"

    const boxId = (await (await fetch('/api/getData?q=' + getNewBoxIdQuery)).json())[0].REZEPT_ID;

    ingredients.forEach(async (Ingredient) => {
        const createBox = "INSERT INTO BOX_ZUTAT (MENGE, ZUTAT_ID, BOX_ID) VALUES " +
            "(" + Ingredient.MENGE + ", " + Ingredient.ZUTAT_ID + ", " + boxId + ")";

        (await (await fetch('/api/getData?q=' + createBox)).json());
    });
    return "";
}

// Delete Queries
export async function deleteCustomer(customerId) {
    const anonymiseCustomer = "UPDATE BESTELLUNG AS B" +
    " SET KUNDEN_ID = 0 " +
    " WHERE B.KUNDEN_ID = " + customerId;

    const anonymiseResult = await fetch('/api/getData?q=' + anonymiseCustomer);
    if (anonymiseResult.status != "200") {
        return anonymiseResult;
    }

    const deleteCustomer = "DELETE FROM KUNDE K" +
        " WHERE K.KUNDEN_ID = " + customerId;

    await fetch('/api/getData?q=' + deleteCustomer);
    return "";
}

//✨ Special Queries ✨
export async function getCheapestBox() {
    const query = "SELECT B.BOX_ID AS 'Box Id', B.NAME AS 'Name'," +
        " B.BESCHREIBUNG as 'Description', CONCAT(B.PREIS, ' €') AS 'Price' FROM BOX B" +
        " WHERE PREIS = (SELECT MIN(PREIS) FROM BOX B2)";

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
export async function getNutritionTrendsWithIngredients() {
    const query = "SELECT E.ERNÄHRUNGSTREND_ID AS Id, E.NAME AS Name," +
    " E.BESCHREIBUNG as Description," +
    " GROUP_CONCAT(Z.BEZEICHNUNG SEPARATOR ', ') AS Zutaten" +
    " FROM ERNÄHRUNGSTRENDS AS E" +
    " LEFT JOIN ZUTAT_ERNÄHRUNGSTRENDS AS ZE ON ZE.ERNÄHRUNGSTREND_ID = E.ERNÄHRUNGSTREND_ID" +
    " LEFT JOIN ZUTAT AS Z ON Z.ZUTAT_ID = ZE.ZUTAT_ID" +
    " GROUP BY E.ERNÄHRUNGSTREND_ID";

    const response = await fetch('/api/getData?q=' + query);
    return await response.json();
}