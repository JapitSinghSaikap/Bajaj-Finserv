const axios = require('axios');
require('dotenv').config();

const CHITKARA_EMAIL = process.env.OFFICIAL_EMAIL;
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  for (let i = 3; i * i <= num; i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcmOfTwo(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

function hcfOfArray(nums) {
  if (nums.length === 0) return 0;
  let result = nums[0];
  for (let i = 1; i < nums.length; i++) {
    result = gcd(result, nums[i]);
  }
  return Math.abs(result);
}

function lcmOfArray(nums) {
  if (nums.length === 0) return 0;
  let result = nums[0];
  for (let i = 1; i < nums.length; i++) {
    result = lcmOfTwo(result, nums[i]);
  }
  return Math.abs(result);
}

function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  let result = [0, 1];
  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }
  return result;
}

function filterPrimes(arr) {
  return arr.filter(num => isPrime(num));
}

async function callOpenAI(question) {
  if (OPENAI_API_KEY) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'Answer in one word only, no punctuation.' },
            { role: 'user', content: question }
          ],
          max_tokens: 5,
          temperature: 0
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );
      let answer = response.data.choices[0].message.content.trim();
      answer = answer.replace(/[^\w]/g, '').toLowerCase();
      return answer;
    } catch (error) {
      return null;
    }
  }
  return null;
}


module.exports = {
  fibonacci,
  filterPrimes,
  lcmOfArray,
  hcfOfArray,
  callOpenAI,
  CHITKARA_EMAIL
};
