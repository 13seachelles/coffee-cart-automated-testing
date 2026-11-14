
import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;

    this.checkoutButton = page.locator(
      'button[data-test="checkout"]'
    );

    this.cartItems = page.locator('main');
  }

  async open() {
    await this.page.goto('/cart');
  }

  async expectCheckoutTotal(total: number) {
    await expect(this.checkoutButton)
      .toContainText(`$${total.toFixed(2)}`);
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async expectCartIsEmpty() {
    await expect(this.page.getByText(
      'No coffee, go add some.'
    )).toBeVisible();
  }
}
