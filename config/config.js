module.exports = {
    BASE_URL : 'http://localhost:5000/',
    HOST : 'localhost',
    USER : 'root',
    PASSWORD : '',
    DBNAME : 'store_db',
    dialect : 'mysql',
    DBPORT : 3306, 
    pool : {
        max : 5,
        min: 0,
        acquire : 30000,
        idle : 10000
    }
}