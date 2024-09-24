import { test, expect } from '@playwright/test';
import { userMake } from '../src/generator/user.data';
import { articleMake } from '../src/generator/article.data';
import { MainPage, RegisterPage, SettingsPage, ArticlePage, ProfilePage, LoginPage } from '../src/pages/index';

const url = 'https://realworld.qa.guru/#/';
let newUser;
let newArticle;

test.describe('Page Object ',() => {
    test.beforeEach( async ({ page }) => {

    newUser = userMake();

    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
 
    await mainPage.open(url);
    await mainPage.goToRegister();
    await registerPage.register(newUser.userName, newUser.userEmail, newUser.userPassword);
      });     

test('Пользователь может изменить bio', async ({ page }) => {
    const mainPage = new MainPage(page);
    const settingsPage = new SettingsPage(page);

    await mainPage.goToSettings();
    await settingsPage.updateProfile(newUser.userBio);
    let profileInfo = await settingsPage.getProfile();
    await expect(profileInfo.bio).toHaveText(newUser.userBio);
        });


test('Пользователь может опубликовать статью', async ({ page }) => {

    const mainPage = new MainPage(page);        
    const articlePage = new ArticlePage(page);

    newArticle = articleMake();

    await mainPage.goToArticle();
    await articlePage.writeArticle(newArticle.articleTitle, newArticle.articleAbout, newArticle.articleCompose, newArticle.articleTags);
    await articlePage.publishArticle();
    await expect(page.getByText(newArticle.articleCompose, newArticle.articleTags)).toBeVisible();

});

test('Пользователь может посмотреть популярные теги', async ({ page }) => {

    const mainPage = new MainPage(page);

    await mainPage.goToGlobalFeed();
    await expect(page.getByRole('heading', { name: 'Popular Tags' })).toBeVisible();

});

test('Пользователь может разлогиниться', async ({ page }) => {

    const mainPage = new MainPage(page);
    const settingsPage = new SettingsPage(page);

    await mainPage.goToSettings();
    await settingsPage.goToLogout();
    await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();

});

test('Новый пользователь не имеет подписок на других авторов', async ({ page }) => {

    const mainPage = new MainPage(page);
    const profilePage = new ProfilePage(page);

    await mainPage.goToProfile();
    await profilePage.enterFavoritedArt();
    await expect(page.getByText((newUser.userName) + ' doesn\'t have favorites.')).toBeVisible();

});

test('Пользователь может авторизоваться с новым паролем', async ({ page }) => {

    const mainPage = new MainPage(page);
    const profilePage = new ProfilePage(page);
    const loginPage = new LoginPage(page);
    const settingsPage = new SettingsPage(page);

    await mainPage.goToProfile();
    await profilePage.editProfileSettings(); //поменял пароль
    await mainPage.goToSettings();
    await settingsPage.goToLogout(); //разлогинился

    await loginPage.linkLogin();
    await loginPage.login(); //авторизовался
    await expect(page.getByText(newUser.userName)).toBeVisible();
});
});
