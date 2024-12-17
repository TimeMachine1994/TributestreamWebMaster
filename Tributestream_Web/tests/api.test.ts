 
  
describe('JWT Authentication', () => {
    it('should authenticate admin user', async () => {
        const result = await getJWTToken('admin', 'password');
        console.log('Authentication successful:', result);
        expect(result.token).toBeDefined();
        expect(result.user).toBeDefined();
    });
});
