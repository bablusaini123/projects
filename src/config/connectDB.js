import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'bktbnwcreyneunro51tz-mysql.services.clever-cloud.com',
    user: 'uybeyzpoagkwjqz6',
    password: 'i09EKR8NDSEVFDhvnAl1',
    database: 'bktbnwcreyneunro51tz'
});

export default pool;