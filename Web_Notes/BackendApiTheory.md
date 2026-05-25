# Real Backend & API Theory Concepts

## 1. What Is the Internet Really?

The internet is simply:

> Millions of computers connected together and communicating using rules.

Those rules are called **protocols**.

Example:

* Your phone
* Google servers
* Instagram servers
* Your laptop

All talk using protocols like:

* HTTP
* HTTPS
* TCP/IP
* WebSocket

---

# 2. What Is a Server?

A **server** is just a computer that waits for requests.

Example:
You open Instagram.

Your phone sends:

> “Give me posts.”

Instagram server replies:

> “Here are the posts.”

So:

Client → Requests
Server → Responds

---

# 3. What Is HTTP?

HTTP means:

> HyperText Transfer Protocol

It is the language/rule used for communication between:

* browser ↔ server
* app ↔ backend
* frontend ↔ API

Example:

```http
GET /users
```

Means:

> “Hey server, give me users.”

---

# 4. What Is HTTPS?

HTTPS = Secure HTTP

It encrypts data.

Without HTTPS:

* passwords can be stolen
* data can be read

With HTTPS:

* data becomes encrypted

Modern websites always use HTTPS.

---

# 5. What Is IP Address?

Every device on the internet has an address.

Example:

```txt
142.250.183.14
```

Like a home address.

Without IP:

* computers cannot find each other.

---

# 6. What Is a Port?

One computer can run MANY services.

Example:

* Chrome
* MongoDB
* Node server
* VS Code Live Server

How does the computer know WHICH app should receive data?

Using PORTS.

Example:

```txt
localhost:3000
```

* localhost → your machine
* 3000 → specific application door

Think:

IP = Building address
Port = Room number

Common Ports:

* 80 → HTTP
* 443 → HTTPS
* 3000 → Node.js
* 5173 → Vite
* 27017 → MongoDB

---

# 7. Why Do We Connect With IP + Port?

Because:

* IP identifies the machine
* Port identifies the application

Example:

```txt
192.168.1.5:3000
```

Means:

> Connect to machine `192.168.1.5`
> and specifically application running on port `3000`

---

# 8. What Is localhost?

```txt
localhost
```

means:

> “My own computer”

Equivalent to:

```txt
127.0.0.1
```

Used during development.

---

# 9. What Is a URL?

Example:

```txt
https://google.com/search?q=cat
```

A URL contains multiple parts.

---

## URL Breakdown

### Protocol

```txt
https://
```

Defines communication rule.

---

### Domain

```txt
google.com
```

Human-readable website name.

---

### Path

```txt
/search
```

Tells server WHAT resource we want.

---

### Query Parameters

```txt
?q=cat
```

Extra information.

Means:

* q → query
* cat → value

---

# 10. Why Is Path Important?

Path tells the server WHAT to do.

Example:

```txt
/users
/products
/login
/posts
```

Different paths → different logic.

Example in backend:

```js
app.get("/users", ...)
app.get("/products", ...)
```

---

# 11. What Is an API?

API means:

> Application Programming Interface

Simple meaning:

> A way for software to communicate.

Example:
Frontend asks:

```txt
GET /users
```

Backend sends:

```json
[
  { "name": "Satyam" }
]
```

That communication system is API.

---

# 12. What Is REST API?

REST is a style of API design.

Common operations:

| Method | Meaning     |
| ------ | ----------- |
| GET    | Read data   |
| POST   | Create data |
| PUT    | Update data |
| DELETE | Remove data |

Example:

```http
GET /users
POST /users
DELETE /users/5
```

---

# 13. What Is JSON?

JSON means:

> JavaScript Object Notation

Used for sending data between systems.

Example:

```json
{
  "name": "Satyam",
  "age": 22
}
```

Why JSON became popular:

* lightweight
* readable
* language independent
* easy to parse

---

# 14. What Happens When You Open a Website?

Example:

```txt
youtube.com
```

Steps:

1. Browser finds IP of YouTube
2. Connects to server
3. Sends HTTP request
4. Server processes request
5. Server sends response
6. Browser renders UI

---

# 15. What Is DNS?

DNS converts:

```txt
google.com
```

into:

```txt
142.250.x.x
```

Because computers understand IPs, not names.

DNS is like:

> Internet phonebook

---

# 16. What Is Backend?

Backend is:

* business logic
* database operations
* authentication
* APIs
* server-side code

Common backend technologies:

* Node.js
* Java Spring Boot
* Django
* FastAPI

---

# 17. What Is Frontend?

Frontend is:

* UI
* buttons
* pages
* animations
* forms

Built using:

* HTML
* CSS
* JavaScript
* React

---

# 18. Frontend vs Backend

| Frontend        | Backend              |
| --------------- | -------------------- |
| User sees it    | User does not see it |
| Runs in browser | Runs on server       |
| UI              | Logic                |
| React           | Node.js              |

---

# 19. What Is a Database?

Database stores data.

Example:

* users
* passwords
* posts
* messages

Popular databases:

* MongoDB
* PostgreSQL
* MySQL

---

# 20. Full Flow Example

User logs into app.

### Step 1

Frontend sends:

```http
POST /login
```

with:

```json
{
  "email": "a@gmail.com",
  "password": "123"
}
```

---

### Step 2

Backend receives request.

---

### Step 3

Backend checks database.

---

### Step 4

Backend sends response:

```json
{
  "success": true,
  "token": "abc123"
}
```

---

### Step 5

Frontend stores token.

User logged in.

---

# 21. What Is TCP/IP?

These are core internet communication protocols.

TCP:

* reliable delivery
* ensures packets arrive correctly

IP:

* handles addressing/routing

Together they power internet communication.

---

# 22. What Is WebSocket?

HTTP:

* request → response → connection ends

WebSocket:

* connection stays alive

Used for:

* chats
* live games
* notifications
* stock updates

---

# 23. What Is Stateless?

HTTP is stateless.

Meaning:

* server forgets previous request

So authentication uses:

* sessions
* JWT tokens
* cookies

---

# 24. What Is JWT?

JWT = JSON Web Token

Used for authentication.

After login:
server gives token.

Frontend sends token with future requests.

---

# 25. What Is Middleware?

Middleware sits between:

* request
* final response

Example:

* auth checking
* logging
* validation

Node.js example:

```js
app.use(express.json())
```

---

# 26. What Is CORS?

CORS controls:

> Which frontend can access backend.

Example:
Frontend:

```txt
localhost:5173
```

Backend:

```txt
localhost:3000
```

Browser blocks request unless backend allows it.

---

# 27. What Is Express.js?

Express.js is a backend framework for Node.js.

Used to:

* create APIs
* handle routes
* build servers

Example:

```js
app.get("/", (req, res) => {
   res.send("Hello")
})
```

---

# 28. What Is Node.js?

Node.js allows JavaScript to run outside browser.

Used for:

* backend
* APIs
* realtime apps

---

# 29. What Is ORM?

ORM:

> Object Relational Mapping

Lets you talk to DB using code instead of raw SQL.

Examples:

* Prisma
* Sequelize
* Hibernate

---

# 30. Big Picture

```txt
Frontend
   ↓
HTTP Request
   ↓
Backend/API
   ↓
Database
   ↓
Response (JSON)
   ↓
Frontend UI Updates
```

This is the core architecture of most modern apps.
