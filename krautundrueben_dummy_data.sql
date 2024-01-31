-- BUNDESLAND
INSERT INTO BUNDESLAND (BUND_ID, BUND_NAME) VALUES (1, 'Baden-Württemberg'), (2, 'Bayern'), (3, 'Berlin'), (4, 'Brandenburg'), (5, 'Bremen'), (6, 'Hamburg'), (7, 'Hessen'), (8, 'Mecklenburg-Vorpommern'), (9, 'Niedersachsen'), (10, 'Nordrhein-Westfalen'), (11, 'Rheinland-Pfalz'), (12, 'Saarland'), (13, 'Sachsen'), (14, 'Sachsen-Anhalt'), (15, 'Schleswig-Holstein'), (16, 'Thüringen');

INSERT INTO ADRESSE (ADRESS_ID, STRASSE, HAUSNR, PLZ, WOHNORT, BUND_ID) VALUES (1, 'Musterstraße', '12', '12345', 'Hamburg', 1),
                                                                           (2, 'Hauptstraße', '5', '54321', 'Berlin',2),                                                                                                                  
                                                                          (3, 'Neue Gasse', '9', '98765', 'München',3),                                                                                                                  
                                                                          (4, 'Bachweg', '3', '67890', 'Stuttgart',4),                                                                                                                  
                                                                          (5, 'Sonnenallee', '15', '54321', 'Dresden',5),                                                                                                                  
                                                                          (6, 'Am Markt', '7', '34567', 'Hannover',6),                                                                                                                  
                                                                          (7, 'Hauptstraße', '10', '09876', 'Köln',7),                                                                                                                  
                                                                          (8, 'Rosenweg', '2', '76543', 'Leipzig',8),                                                                                                                  
                                                                          (9, 'Lindenstraße', '8', '23456', 'Düsseldorf',9),                                                                                                                  
                                                                          (10, 'Birkenweg', '6', '45678', 'Frankfurt',10);

-- KUNDE
INSERT INTO KUNDE (KUNDEN_ID, NACHNAME, VORNAME, GEBURTSDATUM, ADRESS_ID, TELEFON, EMAIL, BUND_ID) VALUES (1, 'Müller', 'Anna', '1990-05-15', 1, '0123456789', 'anna.mueller@example.com', 6), 
                                                                                                                        (2, 'Schmidt', 'Peter', '1985-09-20', 2, '0987654321', 'peter.schmidt@example.com', 3), 
                                                                                                                        (3, 'Schulz', 'Sabine', '1978-11-10', 3, '0765432109', 'sabine.schulz@example.com', 2), 
                                                                                                                        (4, 'Fischer', 'Michael', '1992-03-25', 4, '0654321098', 'michael.fischer@example.com', 1), 
                                                                                                                        (5, 'Koch', 'Julia', '1987-07-05', 5, '0543210987', 'julia.koch@example.com', 13), 
                                                                                                                        (6, 'Wagner', 'Thomas', '1980-02-12', 6, '0432109876', 'thomas.wagner@example.com', 9), 
                                                                                                                        (7, 'Becker', 'Laura', '1995-06-30', 7, '0321098765', 'laura.becker@example.com', 10), 
                                                                                                                        (8, 'Hoffmann', 'Daniel', '1983-09-18', 8, '0210987654', 'daniel.hoffmann@example.com', 14), 
                                                                                                                        (9, 'Schneider', 'Sarah', '1991-12-08', 9, '0109876543', 'sarah.schneider@example.com', 4), 
                                                                                                                        (10, 'Meyer', 'Markus', '1986-04-22', 10, '0987654321', 'markus.meyer@example.com', 7);

-- LIEFERANT
INSERT INTO LIEFERANT (LIEFERANTEN_ID, LIEFERANTENNAME, ADRESS_ID, TELEFON, EMAIL, BUND_ID) VALUES (1, 'Köstliche Köstlichkeiten GmbH', 1, '0123456789', 'info@koestlichekoestlichkeiten.de', 6), 
                                                                                                                (2, 'Leckere Leckerbissen AG', 2, '0987654321', 'kontakt@leckereleckerbissen.de', 3), 
                                                                                                                (3, 'Aromatische Fusion KG', 3, '0765432109', 'hallo@aromatischefusion.de', 2), 
                                                                                                                (4, 'Feinschmecker GmbH', 4, '0654321098', 'info@feinschmecker.de', 1), 
                                                                                                                (5, 'Herzhafte Genüsse GmbH', 5, '0543210987', 'kontakt@herzhaftegenuesse.de', 13), 
                                                                                                                (6, 'Kulinarische Kreationen AG', 6, '0432109876', 'info@kulinarischekreationen.de', 9), 
                                                                                                                (7, 'Frische Aromen GmbH', 7, '0321098765', 'hallo@frischaromen.de', 10), 
                                                                                                                (8, 'Geschmackvolle Versuchungen AG', 8, '0210987654', 'kontakt@geschmackvolleversuchungen.de', 14), 
                                                                                                                (9, 'Handwerkliche Köstlichkeiten GmbH', 9, '0109876543', 'info@handwerklichekoestlichkeiten.de', 4), 
                                                                                                                (10, 'Gastronomische Freuden GmbH', 10, '0987654321', 'hallo@gastronomischefreuden.de', 7);
                                                                                                             
-- NÄHRWERTE
INSERT INTO NÄHRWERTE (NÄHRWERTE_ID, KALORIEN, KOHLENHYDRATE, PROTEINE, BALLASTSTOFFE, FETT, NATRIUM) VALUES (1, 250, 0, 20, 0, 20, 50), 
                                                                                                            (2, 70, 0.5, 6, 0, 5, 70), 
                                                                                                            (3, 350, 70, 12, 9, 2, 0), 
                                                                                                            (4, 150, 3, 18, 2, 8, 5), 
                                                                                                            (5, 20, 5, 1, 1, 0, 10), 
                                                                                                            (6, 120, 0, 0, 0, 14, 0), 
                                                                                                            (7, 380, 62, 13, 10, 7, 0), 
                                                                                                            (8, 30, 6, 1, 2, 0, 5), 
                                                                                                            (9, 320, 80, 0, 0, 0, 2), 
                                                                                                            (10, 40, 10, 1, 2, 0, 0);

-- ZUTAT
INSERT INTO ZUTAT (ZUTAT_ID, BEZEICHNUNG, MENGE, EINHEIT, NETTOPREIS, BESTAND, LIEFERANTEN_ID, NÄHRWERTE_ID) VALUES (1, 'Bio-Rinderhackfleisch', 250, 'g', 3.99, 100, 1, 1), 
                                                                                                                            (2, 'Frische Hühnereier', 1, 'Stück', 0.25, 500, 2, 2), 
                                                                                                                            (3, 'Vollkornnudeln', 500, 'g', 1.99, 250, 3, 3), 
                                                                                                                            (4, 'Bio-Tofu', 200, 'g', 2.49, 200, 4, 4), 
                                                                                                                            (5, 'Frische Tomaten', 1, 'Stück', 0.50, 1000, 5, 5), 
                                                                                                                            (6, 'Extra natives Olivenöl', 500, 'ml', 4.99, 500, 6, 6), 
                                                                                                                            (7, 'Bio-Haferflocken', 250, 'g', 1.49, 1000, 7, 7), 
                                                                                                                            (8, 'Frische Paprika', 1, 'Stück', 0.75, 800, 8, 8),
                                                                                                                            (9, 'Bio-Honig', 300, 'g', 3.49, 300, 9, 9), 
                                                                                                                            (10, 'Frische Zwiebeln', 1, 'Stück', 0.30, 1200, 10, 10);

-- BESTELLUNG
INSERT INTO BESTELLUNG (BESTELL_ID, KUNDEN_ID, BESTELLDATUM, RECHNUNGSBETRAG) VALUES (1, 1, '2022-01-15', 50.99), 
                                                                                    (2, 3, '2022-02-02', 25.49), 
                                                                                    (3, 2, '2022-03-10', 75.80), 
                                                                                    (4, 4, '2022-04-05', 12.99), 
                                                                                    (5, 1, '2022-05-20', 35.50), 
                                                                                    (6, 5, '2022-06-08', 18.75), 
                                                                                    (7, 3, '2022-07-17', 42.30), 
                                                                                    (8, 2, '2022-08-22', 65.25), 
                                                                                    (9, 4, '2022-09-14', 30.00), 
                                                                                    (10, 1, '2022-10-30', 55.99),
                                                                                    (11, 4, '2022-09-14', 9.99), 
                                                                                    (12, 1, '2022-10-30', 14.99),
                                                                                    (13, 1, '2022-10-30', 10.00),
                                                                                    (14, 1, '2022-10-30', 10.00);

-- BESTELLUNG_ZUTAT
INSERT INTO BESTELLUNG_ZUTAT (BESTELL_ID, ZUTAT_ID, MENGE) VALUES (1, 1, 2), (1, 5, 5), (1, 9, 1), (1, 10, 1), (1, 7, 1), (1, 3, 1), (1, 6, 1), (1, 8, 1), (1, 2, 1),
                                                                (2, 4, 3), (2, 7, 2), (2, 10, 1), (2, 1, 1), (2, 3, 1), (2, 6, 1), (2, 9, 1), (2, 5, 1), (2, 8, 1), (2, 2, 1),
                                                                (3, 3, 4), (3, 6, 3), (3, 9, 2), (3, 2, 1), (3, 5, 1), (3, 8, 1), (3, 1, 1), (3, 4, 1), (3, 7, 1), (3, 10, 1),
                                                              (4, 10, 6), (4, 7, 4), (4, 4, 3), (4, 1, 2), (4, 8, 1), (4, 2, 1), (4, 3, 1), (4, 5, 1), (4, 6, 1), (4, 9, 1),
                                                              (5, 5, 10), (5, 3, 5), (5, 8, 2), (5, 1, 1), (5, 4, 1), (5, 6, 1), (5, 7, 1), (5, 9, 1), (5, 10, 1), (5, 2, 1),
                                                              (6, 2, 7), (6, 9, 6), (6, 6, 5), (6, 3, 2), (6, 5, 1), (6, 8, 1), (6, 1, 1), (6, 4, 1), (6, 7, 1), (6, 10, 1),
                                                              (7, 6, 8), (7, 1, 4), (7, 4, 3), (7, 7, 2), (7, 10, 2), (7, 2, 1), (7, 3, 1), (7, 5, 1), (7, 8, 1), (7, 9, 1),
                                                              (8, 8, 10), (8, 5, 5), (8, 2, 3), (8, 9, 2), (8, 1, 1), (8, 4, 1), (8, 6, 1), (8, 7, 1), (8, 10, 1), (8, 3, 1),
                                                              (9, 3, 8), (9, 6, 6), (9, 9, 4), (9, 1, 2), (9, 4, 1), (9, 7, 1), (9, 10, 1), (9, 2, 1), (9, 5, 1), (9, 8, 1),
                                                              (10, 4, 10), (10, 1, 5), (10, 8, 3), (10, 2, 2), (10, 5, 1), (10, 7, 1), (10, 10, 1), (10, 3, 1), (10, 6, 1), (10, 9, 1);


-- BOX
INSERT INTO BOX (BOX_ID, NAME, BESCHREIBUNG, PREIS) VALUES (1, 'Pasta Box', 'Unsere leckere Pasta Box', 9.99), (2, 'Veggie Box', 'Unsere leckere Veggie Box', 14.99);

-- BOX_ZUTAT
INSERT INTO BOX_ZUTAT (MENGE, BOX_ID, ZUTAT_ID) VALUES (1, 1, 1), (1, 1, 3), (5, 1, 5), (1, 1, 6), (2, 1, 10),
                                                        (4, 2, 8), (5, 2, 5), (4, 2, 4), (5, 2, 10);

-- BESTELLUNG_BOX
INSERT INTO BESTELLUNG_BOX(BOX_ID, BESTELL_ID, MENGE) VALUES (1, 11, 1),
                                                            (2, 12, 1);


-- REZEPT
INSERT INTO REZEPT (REZEPT_ID, NAME, ANLEITUNG, DAUER) VALUES (1, 'Bolognese', 'Hier könnte Ihr Rezept stehen', 30), (2, 'Rührei', 'Hier könnte dein Rührei Rezept stehen', 15);

-- BESTELLUNG REZEPT
INSERT INTO BESTELLUNG_REZEPT (REZEPT_ID, BESTELL_ID, MENGE) VALUES (2, 4, 1), (1, 7, 2), (1, 12, 1);

-- REZEPT_ZUTAT
INSERT INTO REZEPT_ZUTAT (MENGE, ZUTAT_ID, REZEPT_ID) VALUES (1, 1, 1), (1, 3, 1), (5, 5, 1), (1, 6, 1),
                                                            (6, 2, 2), (1, 6, 2), (3, 5, 2), (2, 10, 2);

-- BESTELLUNG_REZEPT
INSERT INTO BESTELLUNG_REZEPT (BESTELL_ID, REZEPT_ID, MENGE) VALUES (13, 1, 7), (13, 2, 7), (14, 1, 7), (14, 2, 7);

-- ERNÄHRUNGSKATEGORIEN
INSERT INTO ERNÄHRUNGSKATEGORIEN (ERNÄHRUNGSKATEGORIE_ID, NAME, BESCHREIBUNG) VALUES (1, 'Omnivor', 'Die Bezeichnung klingt nur exotisch: Der Omnivor ist ein Allesesser. Der Begriff stammt aus dem Lateinischen – “Omnivore” verbindet die beiden Wörter “omnis” (alles) und “vorare” (fressen). Tierische Produkte kommen bei diesem Ernährungstypen ebenso auf den Speiseplan wie pflanzliche. Bei dieser gemischten Ernährungsweise gilt hier das Motto: Gegessen wird, was schmeckt. Genussmomente sind daher ohne Einschränkungen und Verzicht möglich.'),
                                                                                     (2, 'Vegetarisch', 'Die vegetarische Ernährung ist allen ein Begriff – im Fokus steht dabei der Verzicht auf Fleisch und in der Regel genauso auf Fisch. Es dürfen nur pflanzliche Produkte sowie Produkte von lebenden Tieren verzehrt werden. Das heißt, neben Milch, Käse oder Eiern wird zum Beispiel auch Joghurt oder Butter konsumiert. Übrigens: Vegetarisch zu essen ist keine Erscheinung unserer modernen Zeit und somit kein Trend unter den Ernährungsformen – denn dieser Ernährungstyp hat seine Ursprünge in der Antike.'),
                                                                                     (3, 'Vegan', 'Keine Produkte tierischen Ursprungs: Das ist für die vegane Ernährungsform das höchste Gebot. Butter und Eier, Käse und Quark, Milch und Kefir – alles tabu. Bei der Auswahl der Lebensmittel gilt es daher, auf eine ausreichende Zufuhr von Vitaminen, Nährstoffen und Mineralien zu achten. Als Ersatz für tierische Zutaten dienen vor allem pflanzliche Alternativen, darunter zum Beispiel milcheiweißfreie Margarine, Sojamilch oder veganer Quark auf Basis von Mandeln oder Kokos. Wichtig zu wissen: Es gibt Lebensabschnitte und -phasen, in denen insgesamt von einer veganen Ernährungsform abgeraten wird: So ist die vegane Küche zum Beispiel für Babys und Kinder sowie in der Schwangerschaft und Stillzeit ungeeignet.'),
                                                                                    (4, 'Frutar', 'Vor allem Früchte essen? Ja! Das ist der Ansatz der Frutarier, die eine Randgruppe innerhalb der Veganer bilden. Die Pflanzen, Früchte und Nüsse dürfen durch die Ernte zudem nicht beschädigt werden. Daher gibt es bei dieser radikalen Ernährungsform auch Frutarier, die nur Lebensmittel essen, die bereits vom Baum gefallen sind. Mangelerscheinungen vorzubeugen ist bei diesem Ernährungstypen nachweislich sehr schwierig, da die Auswahl verzehrbarer Lebensmittel eng gesteckt ist. Weil zum Beispiel Gemüse wie Möhren oder Kartoffeln geerntet werden müssen, dürfen auch diese nicht auf dem Speiseplan stehen.');                                                       

-- ZUTAT_ERNÄHRUNGSKATEGORIEN
INSERT INTO ZUTAT_ERNÄHRUNGSKATEGORIEN (ZUTAT_ID, ERNÄHRUNGSKATEGORIE_ID) VALUES (1, 1), (2, 2), (3, 3), (4, 3), (5, 3), (6, 3), (7, 3), (8, 3), (9, 2), (10, 3);

-- ERNÄHRUNGSTRENDS
INSERT INTO ERNÄHRUNGSTRENDS (ERNÄHRUNGSTREND_ID, NAME, BESCHREIBUNG) VALUES (1, 'Paleo', 'Lebensmittel aus der Steinzeit'), (2, 'Low-Carb', 'Ernährung ohne Kohlenhydrate');

-- ZUTAT_ERNÄHRUNGSTRENDS
INSERT INTO ZUTAT_ERNÄHRUNGSTRENDS (ZUTAT_ID, ERNÄHRUNGSTREND_ID) VALUES (5, 1), (5, 2), (8, 2), (10, 2);

-- HALTUNGSFORM
INSERT INTO HALTUNGSFORM (HALTUNGSFORM_ID, ART) VALUES (1, 'Haltungsform 1, Stallhaltung'), 
                                                        (2, 'Haltungsform 2, StallhaltungPlus'),
                                                        (3, 'Haltungsform 3, Außenklima'),
                                                        (4, 'Haltungsform 4, Premium'),
                                                        (5, 'Kleingruppen'),
                                                        (6, 'Bodenhaltung'),
                                                        (7, 'Freilandhaltung'),
                                                        (8, 'Öke-Haltung');

-- EXTRAS
INSERT INTO EXTRAS (EXTRA_ID, NAME, HALTUNGSFORM_ID) VALUES (1, 'Biosiegel', NULL), 
                                                            (2, 'FairTrade', NULL), 
                                                            (3, 'Haltungsform', 1), 
                                                            (4, 'Haltungsform', 2), 
                                                            (5, 'Haltungsform', 3), 
                                                            (6, 'Haltungsform', 4),
                                                            (7, 'Haltungsform', 5),
                                                            (8, 'Haltungsform', 6),
                                                            (9, 'Haltungsform', 7),
                                                            (10, 'Haltungsform', 8);

-- ZUTAT_EXTRAS
INSERT INTO ZUTAT_EXTRAS (ZUTAT_ID, EXTRA_ID) VALUES (1, 1), 
                                                    (2, 10), 
                                                    (3, 1),
                                                    (4, 4),
                                                    (6, 1),
                                                    (7, 1),
                                                    (9, 1);

