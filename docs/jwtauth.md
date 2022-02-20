# JWR Authentication

## Token Obtain
**URL**: [Get Token](https://chemstore.azurewebsites.net/api/token/)

**Method**: POST

**Body**:
```json
{
  "email": "admin@chemstore.com",
  "password": "12345678"
}
```
**Response Body**:
```json
{
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY0Nzk0NzcxNCwiaWF0IjoxNjQ1MzU1NzE0LCJqdGkiOiI5MjZkNzkzZWZmMjY0OThhYWViNTdhZjBjYmQxZmNiNSIsInVzZXJfaWQiOjF9.Hi9u0uJhmy4ZIWFW3PNF6AQk8veesYoSnZTUyUCGdMY",
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ1NDQyMTE0LCJpYXQiOjE2NDUzNTU3MTQsImp0aSI6ImIyMjYxZGJhYjc5MjQ2NmI4OTQ5NjU4OTQ1MWFhNjNiIiwidXNlcl9pZCI6MX0.PVQzlvzV8ewEHOCf5fZWx3FUiVuYlNBY_gUQJ9CJhKU",
    "id": 1,
    "email": "admin@chemstore.com"
}
```

## Refresh Token
**URl**: [Token Refresh](https://chemstore.azurewebsites.net/api/token/refresh/)

**Method**: POST

**Body**:
```json
{
  "refresh": "big text of refresh token"
}
```
**Response Body**:
```json
{
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY0Nzk0NzcxNCwiaWF0IjoxNjQ1MzU1NzE0LCJqdGkiOiI5MjZkNzkzZWZmMjY0OThhYWViNTdhZjBjYmQxZmNiNSIsInVzZXJfaWQiOjF9.Hi9u0uJhmy4ZIWFW3PNF6AQk8veesYoSnZTUyUCGdMY",
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ1NDQyMTE0LCJpYXQiOjE2NDUzNTU3MTQsImp0aSI6ImIyMjYxZGJhYjc5MjQ2NmI4OTQ5NjU4OTQ1MWFhNjNiIiwidXNlcl9pZCI6MX0.PVQzlvzV8ewEHOCf5fZWx3FUiVuYlNBY_gUQJ9CJhKU"
}
```