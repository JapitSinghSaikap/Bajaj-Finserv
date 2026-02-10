# Bajaj-Finserv API

This is a Node.js + Express REST API.

## Endpoints

### 1. POST /bfhl

- Accepts one of: `fibonacci`, `prime`, `lcm`, `hcf`, `AI`
- Request body examples:
  - `{ "fibonacci": 7 }`
  - `{ "prime": [2, 4, 7, 9, 11] }`
  - `{ "lcm": [12, 18, 24] }`
  - `{ "hcf": [24, 36, 60] }`
  - `{ "AI": "What is the capital city of Maharashtra?" }`
- Returns:
  - `is_success: true` and result in `data` for valid input
  - `is_success: false` and error message for invalid input

### 2. GET /health

- Returns API health and official email
- Example response:
  ```json
  {
    "is_success": true,
    "official_email": "YOUR CHITKARA EMAIL"
  }
  ```

## AI Integration

- Uses OpenAI API for AI questions
- Requires `OPENAI_API_KEY` in environment variables

## Environment Variables

- `OPENAI_API_KEY` (required)
- `OFFICIAL_EMAIL` (required)
- `PORT` (optional, default 3000)

## How to Run Locally

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file with your keys and email
4. Run `npm start`

## Deployment

- Ready for Render, Railway, or Vercel
- Set environment variables in the hosting platform

## Repository

- Public: [https://github.com/JapitSinghSaikap/Bajaj-Finserv](https://github.com/JapitSinghSaikap/Bajaj-Finserv)

## Example Hosted URLs

- POST /bfhl: `https://bajaj-finserv-ur63.onrender.com/bfhl`
- GET /health: `https://bajaj-finserv-ur63.onrender.com/health`
