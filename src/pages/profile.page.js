import {BasePage} from './base.page';

export class ProfilePage extends BasePage {
constructor (page) {
    super(page);
    this.profileButton = this.page.getByRole('link', { name: 'Profile' });
    this.favoritedArt = this.page.getByRole('link', { name: 'Favorited Articles' })
    this.profileSettings = this.page.getByRole('link', { name: 'Edit Profile Settings' })
    this.passwordEdit = this.page.getByPlaceholder('Password');
    this.updateProfileSettings = this.page.getByRole('button', { name: 'Update Settings' })
}

async enterProfile () {
    await this.profileButton.click();
}

async enterFavoritedArt () {
    await this.favoritedArt.click();
}

async editProfileSettings (userPassword = '') {
    await this.profileSettings.click();
    await this.passwordEdit.fill(userPassword);
    await this.updateProfileSettings.click();
}
}