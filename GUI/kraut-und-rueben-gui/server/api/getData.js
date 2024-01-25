import { defineEventHandler } from 'h3';
import { parseURL } from 'ufo'
import getConnection from '../databaseProvider';
  
export default defineEventHandler(async (event) => {
  try {
    const connection = await getConnection();
    
    const url = parseURL(event.node.req.url)
    const searchParams = new URLSearchParams(url.search)
    
    const table = searchParams.get('t')
    const query = searchParams.get('q');

    const [rows] = await connection.query('SELECT * FROM ' + table + (query == null ? null : " " + query));
    return rows;

  } catch (error) {
    console.error(error);
    event.node.res.statusCode = 500;
    return { error: 'Error fetching data, ' + error };
  }
})