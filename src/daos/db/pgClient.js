//import { Pool } from 'pg';
import pkg from 'pg'
const { Pool } = pkg;
//import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    //host: '31.220.31.59',
    host: 'localhost',
    database: 'gestion_escuelas',
    //password: 'toba123*-a_postgres',
    password: 'postgres',
    port: 5432,
  })

  const getPersonas = async () => {
    console.log((await pool.query('select apellidos, nombres from persona')).rows);
  }

  getPersonas();