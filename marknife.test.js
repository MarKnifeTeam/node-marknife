const marknife = require('./marknife.js');

describe('marknife', () =>
{
    it('should return Hello world!', () =>
    {
        expect(marknife()).toBe("Hello world!");
        
    });
});
