import { config } from "mssql";

export const sqlConfig: config = {
    user: 'sa',
    password: '1234',
    database: 'SACP',
    server: 'localhost',
    port:1433,  
    options: {
        trustServerCertificate: true,
        encrypt: true
    }
}