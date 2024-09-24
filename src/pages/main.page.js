import {BasePage} from './base.page';

export class MainPage extends BasePage {
constructor (page) {
    super(page);
    this.menuButton = this.page.locator('.dropdown-toggle');
    this.settingsButton = this.page.getByRole('link', { name: 'Settings' });
    this.signupButton = this.page.getByRole('link', { name: 'Sign up' });
    this.articleButton = this.page.getByRole('link', { name: 'New Article' });
    this.feedButton = this.page.getByRole('button', 'Global Feed');
    this.popularTags = this.page.getByRole('heading', { name: 'Popular Tags' });
    this.profileButton = this.page.getByRole('link', { name: 'Profile' });
}

async goToRegister () {
    await this.signupButton.click();
}

async goToSettings () {
    //todo Вынести меню в компонент
    await this.menuButton.click();
    await this.settingsButton.click();
}

async goToArticle () {
    await this.articleButton.click()
}

async goToGlobalFeed() {
    await this.feedButton.click()
}

async goToProfile () {
    //todo Вынести меню в компонент
    await this.menuButton.click();
    await this.profileButton.click();
}

}
