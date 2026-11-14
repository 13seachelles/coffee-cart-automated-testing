
import { test, expect } from '../src/fixtures/test-fixtures';

test.describe('Coffee Cart - Special Features', () => {

  test('should translate coffee title into Chinese', async ({
    homePage,
  }) => {

    const coffee = homePage.coffee('Espresso');

    const originalText = await coffee.innerText();

    await homePage.translateCoffee('Espresso');

    await expect.poll(
      () => coffee.innerText()
    ).not.toBe(originalText);

  });

test('should open add-to-cart dialog using right-click', async ({
  homePage,
}) => {

  await homePage.openAddToCartDialog(
    'Espresso_Macchiato'
  );

  const dialog = homePage.page.getByRole('dialog');

  await expect(dialog).toBeVisible();

  await dialog.getByRole('button', {
    name: 'Yes',
  }).click();

  await homePage.expectCartCount(1);

});


test('should display promotional popup after adding the third item', async ({
  homePage,
}) => {

  await homePage.addCoffee('Espresso');

  await homePage.addCoffee('Americano');

  await homePage.addCoffee('Cafe_Latte');

  await homePage.expectCartCount(3);

  await homePage.expectPromoVisible();

  // Decline the promotional coffee
  await homePage.handlePromoIfVisible();

  await homePage.expectCartCount(3);

});

});
