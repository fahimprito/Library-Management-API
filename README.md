
# 📚 Library Management API

A RESTful API for managing a library system — built with **Express**, **TypeScript**, and **MongoDB** using **Mongoose**.

---

## 🚀 Features

- 📘 Book management (Create, Read, Update, Delete)
- 🔒 Borrow books with quantity and availability control
- 📊 Aggregated borrow summary using MongoDB aggregation pipeline
- 🔎 Filtering and sorting for books
- ✅ Schema validation and error handling
- ⚙️ Custom instance method for book availability check

---

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**

---

## 📦 Installation

```bash
git clone https://github.com/fahimprito/Library-Management-API.git
cd library-management-api
npm install
```
## 🧪 Run the App
Development
```bash
npm run dev
```
Production
```bash
npm run build
npm start
```

## 🔗 API Endpoints

Deploy URL

https://library-management-api-ten-delta.vercel.app/


## 📘 Book Routes

➕ Create Book
```bash
POST /api/books
```
```bash
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780588380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}

```
📚 Get All Books
```bash
GET /api/books
```
Query Parameters:
- genre: Filter by genre
- sortBy: Sort field (e.g., createdAt)
- sort: Sort direction (asc or desc)
- limit: Number of results (default: 10)
```bash
GET /api/books?genre=SCIENCE&sortBy=createdAt&sort=desc&limit=5
```
📖 Get Book by ID
```bash
GET /api/books/:bookId
```
📝 Update Book
```bash
PATCH /api/books/:bookId
```
❌ Delete Book
```bash
DELETE /api/books/:bookId
```
## 📦 Borrow Routes
🔄 Borrow a Book
```bash
POST /api/borrow
```
```bash
{
  "book": "6857cf10dc42a1cad93b2b03",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```
📊 Borrow Summary
```bash
GET /api/borrow
```