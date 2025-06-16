# Order Support Chatbot Backend

This is the backend for a Dialogflow CX chatbot that handles:
- 📦 Order Tracking
- ❌ Order Cancellation
- 💸 Refund Policy Inquiry

## 🛠 Tech Stack
- Node.js + Express
- MongoDB (via Mongoose)
- Dialogflow CX Webhook Integration

## 📂 Features
- Create, update, cancel, and track orders
- REST APIs for order management
- Webhook endpoint for Dialogflow fulfillment

## 🧪 How to Run
1. Clone repo
2. Install dependencies: `npm install`
3. Setup `.env` with your MongoDB URI
4. Run: `npm start`

## 🌐 Sample APIs
- `POST /create-order`
- `PATCH /cancel-order/:id`
- `GET /get-order/:id`

## 📡 Dialogflow Integration
Webhook is hosted on `/`, listening for `track-order`, `cancel-order`, and `refund-policy` tags.

## 🤖 Dialogflow CX Agent Backup

The `backup/exported_agent_SupportBot.blob` file contains the full export of the Dialogflow CX agent used in this project.

To import:
1. Go to Dialogflow CX Console.
2. Click your Agent name dropdown → **View all agents**.
3. Click the **⋮ menu** → **Import agent**.
4. Select the `.blob` file and upload it.
