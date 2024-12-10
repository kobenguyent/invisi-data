export function maskSensitiveData(input, customPatterns = []) {
    if (!input || typeof input !== 'string') {
        throw new Error('Input must be a valid string');
    }

    // Reusable regex for sensitive data values
    const sensitiveValuePattern = '([a-zA-Z0-9\\-._~+!/]+=*)';
    const obsfucatedString = '****';

    // Predefined patterns for sensitive data
    const predefinedPatterns = [
        {
            name: 'Authorization Header',
            regex: new RegExp(`"Authorization"\\s*:\\s*"Bearer\\s+${sensitiveValuePattern}"`, 'gi'),
            mask: `"Authorization": "Bearer ${obsfucatedString}"`,
        },
        {
            name: 'Authorization Header in cURL',
            regex: new RegExp(`"Authorization\\s*Bearer\\s+${sensitiveValuePattern}"`, 'gi'),
            mask: `"Authorization Bearer ${obsfucatedString}"`,
        },
        {
            name: 'API Key',
            regex: new RegExp(`"api[-_]?key"\\s*:\\s*"${sensitiveValuePattern}"`, 'gi'),
            mask: `"api-key": "${obsfucatedString}"`,
        },
        {
            name: 'Access Token',
            regex: new RegExp(`"access[-_]?token"\\s*:\\s*"${sensitiveValuePattern}"`, 'gi'),
            mask: `"access-token": "${obsfucatedString}"`,
        },
        {
            name: 'Refresh Token',
            regex: new RegExp(`"refresh[-_]?token"\\s*:\\s*"${sensitiveValuePattern}"`, 'gi'),
            mask: `"refresh-token": "${obsfucatedString}"`,
        },
        {
            name: 'Client ID',
            regex: new RegExp(`"client[-_]?id"\\s*:\\s*"${sensitiveValuePattern}"`, 'gi'),
            mask: `"client-id": "${obsfucatedString}"`,
        },
        {
            name: 'ID Token',
            regex: new RegExp(`"id[-_]?token"\\s*:\\s*"${sensitiveValuePattern}"`, 'gi'),
            mask: `"id-token": "${obsfucatedString}"`,
        },
        {
            name: 'Client Secret',
            regex: new RegExp(`"client[-_]?secret"\\s*:\\s*"${sensitiveValuePattern}"`, 'gi'),
            mask: `"client-secret": "${obsfucatedString}"`,
        },
        {
            name: 'Token',
            regex: new RegExp(`"token"\\s*:\\s*"${sensitiveValuePattern}"`, 'gi'),
            mask: `"token": "${obsfucatedString}"`,
        },
        {
            name: 'Password',
            regex: new RegExp(`"password"\\s*:\\s*"${sensitiveValuePattern}"`, 'gi'),
            mask: `"password": "${obsfucatedString}"`,
        },
        {
            name: 'Basic Authorization',
            regex: new RegExp(`"Authorization"\\s*:\\s*"Basic\\s+${sensitiveValuePattern}"`, 'gi'),
            mask: `"Authorization": "Basic ${obsfucatedString}"`,
        },
    ];

    // Combine predefined patterns with custom patterns
    const patterns = [...predefinedPatterns, ...customPatterns];

    let maskedString = input;

    patterns.forEach(({ regex, mask }) => {
        maskedString = maskedString.replace(regex, mask);
    });

    return maskedString;
}
