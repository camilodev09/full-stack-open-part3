# Phonebook Backend API

Production-ready RESTful API built for managing contacts, featuring a modular MVC architecture, persistent cloud storage with MongoDB Atlas, and strict schema validation. Built as part of the **Full Stack Open** curriculum (University of Helsinki).

---

##  Tech Stack & Architecture

- **Runtime:** Node.js
- **Framework:** Express.js (Modular Router & Controller architecture)
- **Database:** MongoDB Atlas via Mongoose ODM
- **Logging & Utilities:** Morgan, CORS, dotenv
- **Code Quality:** ESLint (`eslint.config.mjs` flat config)

---

##  Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas Cluster URI

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3001
MONGODB_URI=your_mongodb_atlas_connection_string
