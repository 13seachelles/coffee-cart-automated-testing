
import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.getByRole('link', {
      name: 'Cart page',
    });
  }

  async navigate() {
    await this.page.goto('/');
  }

  coffee(name: string): Locator {
    return this.page.locator(`[data-test="${name}"]`);
  }

  async addCoffee(name: string) {
    await this.coffee(name).click();
  }

  async addCoffeeMultipleTimes(
    name: string,
    quantity: number
  ) {
    for (let i = 0; i < quantity; i++) {
      await this.addCoffee(name);
    }
  }

  async openCart() {
    await this.cartLink.click();
  }

  async expectCartCount(count: number) {
    await expect(this.cartLink).toContainText(
      `cart (${count})`
    );
  }

  async translateCoffee(name: string) {
    await this.coffee(name).dblclick();
  }

    async handlePromoIfVisible() {
  const promo = this.page.locator('div.promo');

  if (await promo.isVisible()) {
    await promo.locator('button.no').click();
    }
    }

  async openAddToCartDialog(name: string) {
    await this.coffee(name).click({
      button: 'right',
    });
  }
}
