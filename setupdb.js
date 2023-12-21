const sqlite3 = require('sqlite3').verbose();

// Open a connection to the database
const db = new sqlite3.Database('databasenew.db');

const setUpQuery = `
CREATE TABLE mytable(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	DateRptd     DATE  NOT NULL PRIMARY KEY
   ,DATEOCC      DATE  NOT NULL
   ,TIMEOCC      VARCHAR(19) NOT NULL
   ,AREANAME     VARCHAR(11) NOT NULL
   ,RptDistNo    INTEGER  NOT NULL
   ,Part12       INTEGER  NOT NULL
   ,CrmCd        INTEGER  NOT NULL
   ,CrmCdDesc    VARCHAR(40) NOT NULL
   ,Mocodes      VARCHAR(19) NOT NULL
   ,VictAge      INTEGER  NOT NULL
   ,VictSex      VARCHAR(1) NOT NULL
   ,VictDescent  VARCHAR(1) NOT NULL
   ,PremisCd     NUMERIC(5,1) NOT NULL
   ,PremisDesc   VARCHAR(44) NOT NULL
   ,WeaponUsedCd NUMERIC(5,1) NOT NULL
   ,WeaponDesc   VARCHAR(46) NOT NULL
   ,StatusDesc   VARCHAR(11) NOT NULL
   ,CrmCd2       NUMERIC(5,1) NOT NULL
   ,LOCATION     VARCHAR(39) NOT NULL
   ,LAT          NUMERIC(7,4) NOT NULL
   ,LON          NUMERIC(9,4) NOT NULL
   ,Year         INTEGER  NOT NULL
   ,Time         VARCHAR(8) NOT NULL
   ,TimeInterval VARCHAR(11) NOT NULL
 );
`;

const indexQuery = `
CREATE INDEX idx_crmcd ON mytable (CrmCd);
CREATE INDEX idx_dateocc ON mytable (DATEOCC);
`;

db.all(setUpQuery, (err, rows) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Created table');
		db.all(indexQuery, (err, rows) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Created index');
			}
		});
	}
});
