import fs from 'fs';
import path from 'path';

const filePath = './test-data/userData.json';

/**
 * Generates unique user credentials and saves to userData.json
 * @returns {Object} - { username, password }
 */
export function generateUserData() {
  try {
    const username = `user_${Math.random().toString(36).substring(2, 8)}`;
    const password = `pass_${Math.random().toString(36).substring(2, 8)}`;
    const userData = { username, password };

    // Ensure test-data directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(userData, null, 2), 'utf8');
    console.log(`📝 Generated new user: ${username}`);
    
    return userData;
  } catch (error) {
    throw new Error(`Failed to generate user data: ${error.message}`);
  }
}

/**
 * Reads user credentials from userData.json
 * @returns {Object} - { username, password }
 * @throws {Error} if file doesn't exist or is invalid
 */
export function readUserData() {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(
        'User data file not found!\n' +
        'Please run the registration test first:\n' +
        '  npx playwright test tests/register-test.js'
      );
    }

    const rawData = fs.readFileSync(filePath, 'utf8');
    const userData = JSON.parse(rawData);

    // Validate data structure
    if (!userData.username || !userData.password) {
      throw new Error('Invalid user data format. Missing username or password.');
    }

    return userData;
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(
        'User data file not found!\n' +
        'Please run the registration test first:\n' +
        '  npx playwright test tests/register-test.js'
      );
    }
    throw new Error(`Failed to read user data: ${error.message}`);
  }
}
