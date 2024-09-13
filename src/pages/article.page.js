import {BasePage} from './base.page';

export class ArticlePage extends BasePage {
constructor (page) {
    super(page);
    this.articleButton = page.getByRole('link', { name: 'New Article' });
    this.articleTitle = this.page.getByPlaceholder('Article Title');
    this.articleAbout = page.getByPlaceholder('What\'s this article about?');
    this.articleWrite = page.getByPlaceholder('Write your article (in');
    this.articleTags = page.getByPlaceholder('Enter tags');
    this.publishArt = page.getByRole('button', 'Publish Article');
}

async writeArticle (title = '', about = '', compose = '', tags = '') {
    await this.articleTitle.click();
    await this.articleTitle.fill(title);
    await this.articleAbout.click();
    await this.articleAbout.fill(about);
    await this.articleWrite.click();
    await this.articleWrite.fill(compose);
    await this.articleTags.click();
    await this.articleTags.fill(tags);
}

async publishArticle () {
    await this.publishArt.click();
}

}
