export const client: string = process.env.DB_DIALECT;
export const connection: object = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

export const pool = { min: 0, max: 8 }
