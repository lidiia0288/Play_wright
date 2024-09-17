import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage, RegisterPage, SettingsPage, ArticlePage, ProfilePage, LoginPage } from '../src/pages/index';

const url = 'https://realworld.qa.guru/#/';
let newUser;
let newArticle;

test.describe('Page Object ',() => {
    test.beforeEach( async ({ page }) => {

newUser = {
    bio : faker.music.genre(),
    email: faker.internet.email(),
    name : faker.person.firstName('female'),
    password : faker.internet.password(),
 };

    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
 
    await mainPage.open(url);
    await mainPage.goToRegister();
    await registerPage.register(newUser.name, newUser.email, newUser.password);
      });     

test('Пользователь может изменить bio. Page Object - middle version', async ({ page }) => {
    const mainPage = new MainPage(page);
    const settingsPage = new SettingsPage(page);

    await mainPage.goToSettings();
    await settingsPage.updateProfile(newUser.bio);
    let profileInfo = await settingsPage.getProfile();
    await expect(profileInfo.bio).toHaveText(newUser.bio);
        });


test('Пользователь может опубликовать статью', async ({ page }) => {

newArticle = {
        title : faker.lorem.words(),
        about : faker.music.songName(),
        compose : faker.lorem.paragraph(),
        tags : faker.person.zodiacSign(),
    };

    const mainPage = new MainPage(page);        
    const articlePage = new ArticlePage(page);

    await mainPage.goToArticle();
    await articlePage.writeArticle(newArticle.title, newArticle.about, newArticle.compose, newArticle.tags);
    await articlePage.publishArticle();
    await expect(page.getByText(newArticle.compose, newArticle.tags)).toBeVisible();

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
    await expect(page.getByText((newUser.name) + ' doesn\'t have favorites.')).toBeVisible();

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
    await expect(page.getByText(newUser.name)).toBeVisible();
});
});
