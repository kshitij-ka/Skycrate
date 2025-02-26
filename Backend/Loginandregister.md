# API Testing Instructions (Postman)

## Signup

**Endpoint:**
```
POST http://localhost:8081/api/signup
```

**Request Body (JSON):**
```json
{
    "firstname": "L",
    "lastname": "H10",
    "email": "exmaple@gmail.com",
    "password": "your_password_here"
}
```

**Expected Response:**
```json
{
    "id": 2,
    "username": "exmaple@gmail.com",
    "password": "hashed_password_here",
    "createdAt": "your_creation_date_here",
    "enabled": true,
    "authorities": [],
    "credentialsNonExpired": true,
    "accountNonExpired": true,
    "accountNonLocked": true
}
```

---

## Login

**Endpoint:**
```
POST http://localhost:8081/api/login
```

**Expected Response:**
```json
{
    "token": "your_token_here",
    "expiresIn": 3600000
}
```

### Notes:
- Ensure the server is running before making requests.
- Use Postman to send POST requests with the specified JSON body.
- The token received in the login response can be used for authenticated requests.
