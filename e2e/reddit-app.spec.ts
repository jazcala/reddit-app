import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/reddit-app');
});

const Title = 'Reddit App';
const SearchBarPlaceHolder = 'Search Reddit';

test.describe('Reddit App', () => {
  test('should have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(Title);
  });
});

test.describe('Search Bar', () => {

  test('should have a search bar', async ({ page }) => {
    const searchBar = page.getByTestId('search-bar');
    await expect(searchBar).toBeVisible();
  });

  test('should have a search input', async ({ page }) => {
    const searchInput = page.getByTestId('search-input');
    await expect(searchInput).toBeVisible();
  });

  test('should have a search button', async ({ page }) => {
    const searchButton = page.getByTestId('search-button');
    await expect(searchButton).toBeVisible();
  });

  test('should have a clear search input button', async ({ page }) => {
    const clearSearchInput = page.getByTestId('clear-search-input');
    await expect(clearSearchInput).not.toBeVisible();
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('test');
    await expect(clearSearchInput).toBeVisible();
    await clearSearchInput.click();
    await expect(searchInput).toHaveValue('');
    await expect(clearSearchInput).not.toBeVisible();
  });

  test('should have a search input with the correct placeholder', async ({ page }) => {
    const searchInput = page.getByTestId('search-input');
    await expect(searchInput).toHaveAttribute('placeholder', SearchBarPlaceHolder);
  });

});
