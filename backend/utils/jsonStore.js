import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export const isDbConnected = () => {
  return mongoose.connection && mongoose.connection.readyState === 1;
};

export const getJsonData = (file, fallback = []) => {
  const filePath = path.join(DATA_DIR, `${file}.json`);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), 'utf8');
      return fallback;
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${file}.json:`, err.message);
    return fallback;
  }
};

export const saveJsonData = (file, data) => {
  const filePath = path.join(DATA_DIR, `${file}.json`);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${file}.json:`, err.message);
    return false;
  }
};
