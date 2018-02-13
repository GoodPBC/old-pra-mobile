describe('Login', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show login screen', async () => {
    await expect(element(by.id('LoginScreen'))).toBeVisible();
    await expect(element(by.text('Login'))).toBeVisible();
  });

  it('should log user in successfully', async () => {
    await element(by.id('Username')).replaceText('dhs\\TestUser_MOC3');
    await element(by.id('Password')).replaceText('Welcome&1');
    await element(by.text('Login')).tap();
    await waitFor(element(by.id('LoginScreen'))).toBeNotVisible().withTimeout(5000);
    await waitFor(element(by.id('TeamModal'))).toBeVisible().withTimeout(5000);
  })
})
