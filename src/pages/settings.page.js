import {BasePage} from './base.page';

export class SettingsPage extends BasePage {
constructor (page) {
    super(page);
    this.updateButton = this.page.getByRole('button','Update Settings');
    this.bioField = this.page.getByPlaceholder('Short bio about you');
    this.logoutButton = this.page.getByRole('link', { name: 'Logout' });
}

async enterUserBio (bio) {
    await this.bioField.click();
    await this.bioField.fill(bio);
}

async updateProfileSimple () {
    await this.updateButton.click();
}
async getProfile () {
    const user = {
        bio: await this.bioField
    }
  return user;
}

async updateProfile (bio = '') {
    await this.bioField.click();
    await this.bioField.fill(bio);
    await this.updateButton.click();
}

async goToLogout() {
    await this.logoutButton.click()
}
}


