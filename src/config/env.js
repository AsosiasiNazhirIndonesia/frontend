import dotenv from 'dotenv';
dotenv.config();
const env = { 
    FACTORY_ADDRESS: process.env.FACTORY_ADDRESS,
    REACT_APP_MAGIC_PUBLISHABLE_KEY: process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY,
    REACT_APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
}

export default env;