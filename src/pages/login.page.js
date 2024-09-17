import {BasePage} from './base.page';

export class LoginPage extends BasePage {
constructor (page) {
    super(page);
    this.emailWrite = page.getByPlaceholder('Email');
    this.passwordWrite = this.page.getByPlaceholder('Password');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.loginLink = page.getByRole('link', { name: 'Login' });
}
// todo нейминг
async linkLogin () {
    await this.loginLink.click();
}

async login (userEmail = '', userPassword = '') {
    await this.emailWrite.click();
    await this.emailWrite.fill(userEmail);
    await this.passwordWrite.click();
    await this.passwordWrite.fill(userPassword);
    await this.loginButton.click();

}
}