const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

describe('capitalizeWords', () => {

    test('capitalizes each word normally', () => {
        expect(capitalizeWords('hello world')).toBe('Hello World');
    });

    test('handles single word', () => {
        expect(capitalizeWords('javascript')).toBe('Javascript');
    });

    test('returns empty string when input is empty', () => {
        expect(capitalizeWords('')).toBe('');
    });

    test('returns the same value when input is not a string', () => {
        expect(capitalizeWords(123)).toBe(123);
    });

});

describe('filterActiveUsers', () => {

    const users = [
        { name: 'Alice', isActive: true },
        { name: 'Bob', isActive: false },
        { name: 'Eve', isActive: true }
    ];

    test('returns only active users', () => {
        const result = filterActiveUsers(users);
        expect(result).toEqual([
            { name: 'Alice', isActive: true },
            { name: 'Eve', isActive: true }
        ]);
    });

    test('returns an empty array when no users are active', () => {
        const inactive = [
            { name: 'Test1', isActive: false },
            { name: 'Test2', isActive: false },
        ];
        expect(filterActiveUsers(inactive)).toEqual([]);
    });

    test('returns empty array if input is empty', () => {
        expect(filterActiveUsers([])).toEqual([]);
    });

    test('handles missing isActive property', () => {
        const mixed = [
            { name: 'Sam' },
            { name: 'Lisa', isActive: true }
        ];
        expect(filterActiveUsers(mixed)).toEqual([{ name: 'Lisa', isActive: true }]);
    });

});

describe('logAction', () => {

    test('logs the correct string format', () => {
        const result = logAction('login', 'Alice');

        // Check general structure without matching exact timestamp
        expect(result).toMatch(/^User Alice performed login at .+Z$/);
    });

    test('returns an error message when action is missing', () => {
        expect(logAction('', 'Alice')).toBe('Error: Missing action or username.');
    });

    test('returns an error message when username is missing', () => {
        expect(logAction('logout', '')).toBe('Error: Missing action or username.');
    });

    test('returns error when both fields are missing', () => {
        expect(logAction('', '')).toBe('Error: Missing action or username.');
    });

});
