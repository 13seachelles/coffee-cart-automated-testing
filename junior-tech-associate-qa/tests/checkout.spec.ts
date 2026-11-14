
import { test, expect } from '../src/fixtures/test-fixtures';

import {
  coffeeData,
  customerData,
} from '../src/data/test-data';

test.describe('Coffee Cart - Checkout Flow', () => {

  test('should complete a successful coffee purchase', async ({
    homePage,
    cartPage,
    checkoutPage,
  }) => {

    // STEP 1: Add product to cart
    await homePage.addCoffee(
      coffeeData.cappuccino.name
    );

    // STEP 2: Verify cart count
    await homePage.expectCartCount(1);

    // STEP 3: Navigate to cart
    await homePage.openCart();

    // STEP 4: Verify cart total
    await cartPage.expectCheckoutTotal(
      coffeeData.cappuccino.price
    );

    // STEP 5: Proceed to checkout
    await cartPage.checkout();

    // STEP 6: Submit payment details
    await checkoutPage.submitPaymentDetails(
      customerData.name,
      customerData.email
    );

    // STEP 7: Verify successful purchase
    await checkoutPage.expectPurchaseSuccess();

    // STEP 8: Verify cart is cleared
    await homePage.expectCartCount(0);

  });

});
