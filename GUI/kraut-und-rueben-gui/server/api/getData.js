import { defineEventHandler } from 'h3';
import { parseURL } from 'ufo'
import getConnection from '../databaseProvider';
  
export default defineEventHandler(async (event) => {
  try {
    const connection = await getConnection();
    
    const url = parseURL(event.node.req.url)
    const searchParams = new URLSearchParams(url.search)
    
    let query = searchParams.get('q');
    query = query.replace("**", "\"%").replace("**", "%\"");

    const [rows] = await connection.query(query);
    return rows;

  } catch (error) {
    console.error(error);
    event.node.res.statusCode = 500;
    return { error: 'Error fetching data, ' + error };
  }
})