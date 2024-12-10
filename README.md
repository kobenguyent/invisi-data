# `invisi-data`

The `invisi-data` is a utility designed to identify and mask sensitive information (e.g., API keys, tokens, passwords) in a given string. This is particularly useful for logging or debugging purposes to avoid exposing sensitive data in logs.

---

## Features
- **Regex-Based Masking:** Uses predefined patterns to detect and replace sensitive information.
- **Flexible Patterns:** Handles a variety of sensitive data types, including authorization headers, API keys, tokens, and passwords.
- **Reusable Utility:** Can be integrated into logging frameworks or used as a standalone tool.

---

## Installation

1. Clone the repository or copy the `invisi-data` function into your project.
2. If using ES modules:
    - Import the function using `import { maskSensitiveData } from 'invisi-data';`.
3. If using CommonJS:
    - Require the function after exporting it from a compatible `.cjs` file.

---

## Usage

### Example

```javascript
// Import the function
const { maskSensitiveData } = require('invisi-data'); // For CommonJS
// import { maskSensitiveData } from 'invisi-data'; // For ES modules

// Input containing sensitive data
const input = JSON.stringify({
    Authorization: "Bearer abc123",
    "api-key": "my-secret-api-key",
    password: "supersecretpassword"
});

// Mask sensitive data
const maskedOutput = maskSensitiveData(input);

// Output masked string
console.log(maskedOutput);
// Output: {"Authorization": "Bearer ****", "api-key": "****", "password": "****"}
```

---

## Parameters

### `input`
- **Type:** `string`
- **Description:** The input string that may contain sensitive data.
- **Requirements:** Must be a valid string. Non-string inputs will throw an error.

---

## Returns
- **Type:** `string`
- **Description:** A new string with sensitive data masked using `****`.

---

## Supported Sensitive Data Patterns
1. **Authorization Header**: `"Authorization": "Bearer <value>"`
2. **Authorization in cURL**: `"Authorization Bearer <value>"`
3. **API Key**: `"api-key": "<value>"` or `"api_key": "<value>"`
4. **Access Token**: `"access-token": "<value>"` or `"access_token": "<value>"`
5. **Refresh Token**: `"refresh-token": "<value>"` or `"refresh_token": "<value>"`
6. **Client ID**: `"client-id": "<value>"` or `"client_id": "<value>"`
7. **ID Token**: `"id-token": "<value>"` or `"id_token": "<value>"`
8. **Client Secret**: `"client-secret": "<value>"` or `"client_secret": "<value>"`
9. **Generic Token**: `"token": "<value>"`
10. **Password**: `"password": "<value>"`
11. **Basic Authorization**: `"Authorization": "Basic <value>"`

---

## Error Handling
- If the input is not a string or is empty, the function will throw an error:  
  **`Error: Input must be a valid string`**

---

## Tests

### Example Test Case

```javascript
const assert = require('assert');
const { maskSensitiveData } = require('invisi-data');

const input = JSON.stringify({
    "Authorization": "Bearer abc123",
    "api-key": "secretKey123",
    "password": "mypassword"
});

const expectedOutput = JSON.stringify({
    "Authorization": "Bearer ****",
    "api-key": "****",
    "password": "****"
});

assert.strictEqual(maskSensitiveData(input), expectedOutput);
console.log("Test passed!");
```

---

## License
This function is licensed under the MIT License. Feel free to use, modify, and distribute it as needed.

--- 

## Contribution
Contributions are welcome! Please submit a pull request or open an issue to suggest enhancements or report bugs.
