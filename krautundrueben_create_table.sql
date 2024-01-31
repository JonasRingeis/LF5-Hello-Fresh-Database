DROP DATABASE IF EXISTS krautundrueben;
CREATE DATABASE IF NOT EXISTS krautundrueben;
USE krautundrueben;

CREATE TABLE BUNDESLAND (
	BUND_ID			INTEGER AUTO_INCREMENT NOT NULL,
    BUND_NAME		VARCHAR(50),
    PRIMARY KEY (BUND_ID)
);

CREATE TABLE ADRESSE (
    ADRESS_ID      INTEGER NOT NULL,
    STRASSE         VARCHAR(100),
    HAUSNR          VARCHAR(50),
    PLZ             INTEGER,
    WOHNORT         VARCHAR(100),
    BUND_ID         INTEGER NOT NULL,
    PRIMARY KEY     (ADRESS_ID),
    FOREIGN KEY (BUND_ID) REFERENCES BUNDESLAND (BUND_ID)
);

CREATE TABLE KUNDE (
    KUNDEN_ID       INTEGER AUTO_INCREMENT NOT NULL,
    NACHNAME        VARCHAR(50),
    VORNAME         VARCHAR(50),
    GEBURTSDATUM	DATE,
    ADRESS_ID       INTEGER NOT NULL,
    TELEFON         VARCHAR(25),
    EMAIL           VARCHAR(50),
    BUND_ID			INTEGER NOT NULL,
    PRIMARY KEY (KUNDEN_ID),
    FOREIGN KEY (ADRESS_ID) REFERENCES ADRESSE (ADRESS_ID)
);

CREATE TABLE LIEFERANT (
    LIEFERANTEN_ID   INTEGER AUTO_INCREMENT NOT NULL,
    LIEFERANTENNAME VARCHAR(50),
    ADRESS_ID       INTEGER NOT NULL,
    TELEFON			VARCHAR(25),
    EMAIL           VARCHAR(50),
    BUND_ID			INTEGER NOT NULL,
    PRIMARY KEY (LIEFERANTEN_ID),
    FOREIGN KEY (ADRESS_ID) REFERENCES ADRESSE (ADRESS_ID)
);

CREATE TABLE NÄHRWERTE (
	NÄHRWERTE_ID	INTEGER AUTO_INCREMENT NOT NULL,
	KALORIEN		FLOAT,
    KOHLENHYDRATE	FLOAT,
    PROTEINE		FLOAT,
    BALLASTSTOFFE	FLOAT,
    FETT			FLOAT,
    NATRIUM			FLOAT,
    PRIMARY KEY (NÄHRWERTE_ID)
);

CREATE TABLE ZUTAT(
    ZUTAT_ID			INTEGER AUTO_INCREMENT NOT NULL,
    BEZEICHNUNG         VARCHAR(50),
    MENGE				DECIMAL(10,2),
    EINHEIT             VARCHAR(50),
    NETTOPREIS       	DECIMAL(10,2),
    BESTAND             INTEGER,
    LIEFERANTEN_ID		INTEGER,
    NÄHRWERTE_ID		INTEGER NOT NULL,
	PRIMARY KEY (ZUTAT_ID),
	FOREIGN KEY (NÄHRWERTE_ID) REFERENCES NÄHRWERTE (NÄHRWERTE_ID),
	FOREIGN KEY (LIEFERANTEN_ID) REFERENCES LIEFERANT (LIEFERANTEN_ID)
);

CREATE TABLE BESTELLUNG (
    BESTELL_ID        INTEGER AUTO_INCREMENT NOT NULL,
    KUNDEN_ID         INTEGER NOT NULL,
    BESTELLDATUM     DATE,
    RECHNUNGSBETRAG  DECIMAL(10,2),
    PRIMARY KEY (BESTELL_ID),
    FOREIGN KEY (KUNDEN_ID) REFERENCES KUNDE (KUNDEN_ID)
);

CREATE TABLE BESTELLUNG_ZUTAT (
    BESTELL_ID              INTEGER NOT NULL,
    ZUTAT_ID                INTEGER NOT NULL,
    MENGE     		        INTEGER,
    PRIMARY KEY (BESTELL_ID,ZUTAT_ID),
    FOREIGN KEY (BESTELL_ID) REFERENCES BESTELLUNG (BESTELL_ID),
    FOREIGN KEY (ZUTAT_ID) REFERENCES ZUTAT (ZUTAT_ID)
);

CREATE TABLE BOX (
	BOX_ID				INTEGER AUTO_INCREMENT NOT NULL,
    NAME				VARCHAR(50),
    BESCHREIBUNG		VARCHAR(50),
    PREIS				DECIMAL(10,2),
    PRIMARY KEY (BOX_ID)
);

CREATE TABLE BESTELLUNG_BOX (
    BOX_ID              INTEGER NOT NULL,
    BESTELL_ID          INTEGER NOT NULL,
    MENGE               INTEGER,
    PRIMARY KEY (BOX_ID, BESTELL_ID),
    FOREIGN KEY (BOX_ID) REFERENCES BOX (BOX_ID),
    FOREIGN KEY (BESTELL_ID) REFERENCES BESTELLUNG (BESTELL_ID)
);

CREATE TABLE BOX_ZUTAT (
	MENGE				INTEGER,
    BOX_ID				INTEGER NOT NULL,
    ZUTAT_ID			INTEGER NOT NULL,
    PRIMARY KEY (BOX_ID, ZUTAT_ID),
    FOREIGN KEY (BOX_ID) REFERENCES BOX (BOX_ID),
    FOREIGN KEY (ZUTAT_ID) REFERENCES ZUTAT (ZUTAT_ID)
);

CREATE TABLE REZEPT (
	REZEPT_ID 			INTEGER AUTO_INCREMENT NOT NULL,
    NAME 				VARCHAR(50),
    ANLEITUNG			VARCHAR(1000),
    DAUER               INTEGER,
    PRIMARY KEY (REZEPT_ID)
);

CREATE TABLE REZEPT_ZUTAT (
	MENGE			INTEGER,
    ZUTAT_ID		INTEGER NOT NULL,
    REZEPT_ID		INTEGER NOT NULL,
    PRIMARY KEY (REZEPT_ID, ZUTAT_ID),
    FOREIGN KEY (ZUTAT_ID) REFERENCES ZUTAT (ZUTAT_ID),
    FOREIGN KEY (REZEPT_ID) REFERENCES REZEPT (REZEPT_ID)
);

CREATE TABLE BESTELLUNG_REZEPT (
	BESTELL_ID		INTEGER NOT NULL,
    REZEPT_ID		INTEGER NOT NULL,
    MENGE           INTEGER NOT NULL,
    PRIMARY KEY (BESTELL_ID, REZEPT_ID),
    FOREIGN KEY (BESTELL_ID) REFERENCES BESTELLUNG (BESTELL_ID),
    FOREIGN KEY (REZEPT_ID) REFERENCES REZEPT (REZEPT_ID)
);

CREATE TABLE ERNÄHRUNGSKATEGORIEN (
	ERNÄHRUNGSKATEGORIE_ID	INTEGER AUTO_INCREMENT NOT NULL,
    NAME			VARCHAR(100),
    BESCHREIBUNG	VARCHAR(1000),
    PRIMARY KEY (ERNÄHRUNGSKATEGORIE_ID)
);

CREATE TABLE ZUTAT_ERNÄHRUNGSKATEGORIEN (
	ZUTAT_ID		            INTEGER NOT NULL,
    ERNÄHRUNGSKATEGORIE_ID 	    INTEGER NOT NULL,
    PRIMARY KEY (ZUTAT_ID, ERNÄHRUNGSKATEGORIE_ID),
    FOREIGN KEY (ZUTAT_ID) REFERENCES ZUTAT (ZUTAT_ID),
    FOREIGN KEY (ERNÄHRUNGSKATEGORIE_ID) REFERENCES ERNÄHRUNGSKATEGORIEN (ERNÄHRUNGSKATEGORIE_ID)
);

CREATE TABLE ERNÄHRUNGSTRENDS (
	ERNÄHRUNGSTREND_ID		INTEGER AUTO_INCREMENT, 
    NAME			        VARCHAR(50),
    BESCHREIBUNG	        VARCHAR(250),
    PRIMARY KEY (ERNÄHRUNGSTREND_ID)
);

CREATE TABLE ZUTAT_ERNÄHRUNGSTRENDS (
	ZUTAT_ID			INTEGER,
    ERNÄHRUNGSTREND_ID 	INTEGER,
    PRIMARY KEY (ZUTAT_ID, ERNÄHRUNGSTREND_ID),
    FOREIGN KEY (ZUTAT_ID) REFERENCES ZUTAT (ZUTAT_ID),
    FOREIGN KEY (ERNÄHRUNGSTREND_ID) REFERENCES ERNÄHRUNGSTRENDS (ERNÄHRUNGSTREND_ID)
);

CREATE TABLE HALTUNGSFORM (
    HALTUNGSFORM_ID     INTEGER AUTO_INCREMENT,
    ART                 VARCHAR(75),
    PRIMARY KEY (HALTUNGSFORM_ID)
);

CREATE TABLE EXTRAS (
    EXTRA_ID            INTEGER AUTO_INCREMENT,
    NAME                VARCHAR(100),
    HALTUNGSFORM_ID     INTEGER,
    PRIMARY KEY (EXTRA_ID),
    FOREIGN KEY (HALTUNGSFORM_ID) REFERENCES HALTUNGSFORM (HALTUNGSFORM_ID)
);

CREATE TABLE ZUTAT_EXTRAS (
    ZUTAT_ID            INTEGER,
    EXTRA_ID            INTEGER,
    PRIMARY KEY (ZUTAT_ID, EXTRA_ID),
    FOREIGN KEY (ZUTAT_ID) REFERENCES ZUTAT (ZUTAT_ID),
    FOREIGN KEY (EXTRA_ID) REFERENCES EXTRAS (EXTRA_ID)
);