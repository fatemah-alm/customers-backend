# Customers Backend

This repo is a simple backend for managing customers using express with postgreSQL

## API References

### Users

#### Register

```http
  POST /api/auth/register
```

| Parameter   | Type     | Description  |
| :---------- | :------- | :----------- |
| `user_name` | `string` | **unique**   |
| `email`     | `string` | **unique**   |
| `password`  | `string` | **Required** |

#### Login

```http
  POST /api/auth/login
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

#### Get all users

```http
  GET /api/auth
```

### Customers

#### Get all Customers

```http
  GET /customers
```

#### Get Customer by id

```http
  GET /customers/:id
```

#### Create Customer

```http
  POST /customers
```

| Parameter | Type     | Description    |
| :-------- | :------- | :------------- |
| `name`    | `string` | **Required**   |
| `number`  | `Int`    | **9 digits**   |
| `dob`     | `Date`   | **yyyy-mm-dd** |
| `gender`  | `string` | **length 1**   |

#### Update Customer

```http
  PUT /customers/:id
```

#### Delete Customer

```http
  DELETE /customers/:id
```
