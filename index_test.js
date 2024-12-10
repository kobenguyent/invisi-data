import { expect } from 'chai';
import { maskSensitiveData } from './index.js';

describe('maskSensitiveData', () => {
    it('should throw an error when input is null', () => {
        expect(() => maskSensitiveData(null)).to.throw('Input must be a valid string');
    });

    it('should throw an error when input is not a string', () => {
        expect(() => maskSensitiveData(123)).to.throw('Input must be a valid string');
    });

    it('should return input unchanged when no sensitive data is found', () => {
        const input = '{"name": "John Doe", "email": "john@example.com"}';
        const result = maskSensitiveData(input);
        expect(result).to.equal(input);
    });

    it('should mask Authorization header with Bearer token', () => {
        const input = '{"Authorization": "Bearer abc123"}';
        const expected = '{"Authorization": "Bearer ****"}';
        const result = maskSensitiveData(input);
        expect(result).to.equal(expected);
    });

    it('should mask API key', () => {
        const input = '{"api-key": "12345"}';
        const expected = '{"api-key": "****"}';
        const result = maskSensitiveData(input);
        expect(result).to.equal(expected);
    });

    it('should mask Access Token', () => {
        const input = '{"access-token": "token123"}';
        const expected = '{"access-token": "****"}';
        const result = maskSensitiveData(input);
        expect(result).to.equal(expected);
    });

    it('should mask Refresh Token', () => {
        const input = '{"refresh-token": "refresh123"}';
        const expected = '{"refresh-token": "****"}';
        const result = maskSensitiveData(input);
        expect(result).to.equal(expected);
    });

    it('should mask Client ID', () => {
        const input = '{"client-id": "client123"}';
        const expected = '{"client-id": "****"}';
        const result = maskSensitiveData(input);
        expect(result).to.equal(expected);
    });

    it('should mask Client Secret', () => {
        const input = '{"client-secret": "secret123"}';
        const expected = '{"client-secret": "****"}';
        const result = maskSensitiveData(input);
        expect(result).to.equal(expected);
    });

    it('should mask Basic Authorization header', () => {
        const input = '{"Authorization": "Basic dXNlcjpwYXNzd29yZA=="}';
        const expected = '{"Authorization": "Basic ****"}';
        const result = maskSensitiveData(input);
        expect(result).to.equal(expected);
    });

    it('should mask multiple sensitive fields in the same input', () => {
        const input = '{"Authorization": "Bearer abc123", "api-key": "12345", "password": "mypassword"}';
        const expected = '{"Authorization": "Bearer ****", "api-key": "****", "password": "****"}';
        const result = maskSensitiveData(input);
        expect(result).to.equal(expected);
    });

    it('should be case insensitive for sensitive field names', () => {
        const input = '{"Authorization": "Bearer abc123", "API-Key": "keyValue"}';
        const expected = '{"Authorization": "Bearer ****", "api-key": "****"}';
        const result = maskSensitiveData(input);
        expect(result).to.equal(expected);
    });

    it('should handle input with no sensitive fields gracefully', () => {
        const input = '{"name": "John", "email": "john@example.com"}';
        const result = maskSensitiveData(input);
        expect(result).to.equal(input);
    });
});
