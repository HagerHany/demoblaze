import fs from 'fs';

const filePath = './test-data/userData.json';

export function generateUserData() {
  const username = `user_${Math.random().toString(36).substring(2, 8)}`;
  const password = `pass_${Math.random().toString(36).substring(2, 8)}`;
  const userData = { username, password };

  fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));
  return userData;
}

export function readUserData() {
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
}
