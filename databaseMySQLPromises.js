const mysql = require('promise-mysql');

function getConnection() {
    return mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "password",
        database: "twinships",
        multipleStatements: true
    });
}

exports.read = async function (tableName, primaryKey, id) {
    let connection;
    try {
        connection = await getConnection();
        let query = `SELECT * FROM ${tableName}` + (id ? ` WHERE ${primaryKey} = ${id}` : "");
        let result = await connection.query(query);
        return result.length === 0 ? await Promise.reject() : result;
    } catch (e) {
        throw e;
    } finally {
        if (connection)
            connection.end();
    }
};

exports.create = async function (navn, hjemhavn, kaldesignal, MMSI, anvendelse, BRT_BT, laengde, max_antal_om_bord) {
    let connection;
    try {
        connection = await getConnection();
        let query = `INSERT INTO skibsdata (navn, hjemhavn, kaldesignal, MMSI_nummer, anvendelse, BRT_BT, laengde, max_antal_om_bord) VALUES ('${navn}', '${hjemhavn}', '${kaldesignal}', '${MMSI}','${anvendelse}', '${BRT_BT}','${laengde}', '${max_antal_om_bord}')`;
        await connection.query(query);
        return MMSI;
    } catch (e) {
        throw e;
    } finally {
        if (connection)
            connection.end();
    }
};

exports.update = async function (navn, hjemhavn, kaldesignal, MMSI, anvendelse, BRT_BT, laengde, max_antal_om_bord) {
    let connection;
    try {
        connection = await getConnection();
        let query = `UPDATE skibsdata SET navn = '${navn}', hjemhavn = '${hjemhavn}', kaldesignal = '${kaldesignal}',anvendelse = '${anvendelse}',BRT_BT = '${BRT_BT}',laengde = '${laengde}',max_antal_om_bord = '${max_antal_om_bord}' WHERE MMSI_nummer = '${MMSI}'`;
        await connection.query(query);
        return MMSI;
    } catch (e) {
        throw e;
    } finally {
        if (connection)
            connection.end();
    }
};

exports.deleteSomething = async function (MMSI) {
    let connection;
    try {
        connection = await getConnection();
        let query = `DELETE FROM skibsdata WHERE MMSI_nummer = '${MMSI}'`;
        let result = await connection.query(query);
        return result.affectedRows === 0 ? await Promise.reject() : result;
    } catch (e) {
        throw e;
    } finally {
        if (connection)
            connection.end();
    }
};
