import { test, expect } from '@playwright/test';

test('should be able to login, navigate to dashboard and change font size', async ({ page }) => {
  const email = 'test@test.com';
  const password = '12345678';

  await page.goto('http://localhost:3000/');
  const emailInput = page.getByRole('textbox', { name: 'Endereço de email' });
  await emailInput.fill(email);

  const passwordInput = page.getByLabel('Senha');
  await passwordInput.fill(password);

  const submitButton = page.getByRole('button', { name: 'Login' });
  await expect(submitButton).toBeEnabled();
  await submitButton.click();

  await expect(page).toHaveURL('http://localhost:3000/dashboard');
  
  const profileButton = page.getByRole('button', { name: 'Meu Perfil' });
  await profileButton.click();

  await expect(page).toHaveURL('http://localhost:3000/profile');

  const textSizePriorToChange = page.getByText('Escolha o tamanho de texto');
  const sizePriorToChange = await textSizePriorToChange.evaluate((element) => {
    return window.getComputedStyle(element).fontSize;
  });

  const bigSizeButton = page.getByRole('button', { name: 'Aa Grande' });
  await bigSizeButton.click();

  await page.waitForTimeout(1000);

  const textSizeAfterChange = page.getByText('Escolha o tamanho de texto');
  const sizeAfterChange = await textSizeAfterChange.evaluate((element) => {
    return window.getComputedStyle(element).fontSize;
  });

  expect(sizePriorToChange).not.toEqual(sizeAfterChange);
});
