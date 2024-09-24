import {BasePage} from './base.page';

export class ArticlePage extends BasePage {
constructor (page) {
    super(page);
    this.articleButton = this.page.getByRole('link', { name: 'New Article' });
    this.articleTitle = this.page.getByPlaceholder('Article Title');
    this.articleAbout = this.page.getByPlaceholder('What\'s this article about?');
    this.articleWrite = this.page.getByPlaceholder('Write your article (in');
    this.articleTags = this.page.getByPlaceholder('Enter tags');
    this.publishArt = this.page.getByRole('button', 'Publish Article');
}

async writeArticle (articleTitle = '', articleAbout = '', articleCompose = '', articleTags = '') {
    await this.articleTitle.click();
    await this.articleTitle.fill(articleTitle);
    await this.articleAbout.click();
    await this.articleAbout.fill(articleAbout);
    await this.articleWrite.click();
    await this.articleWrite.fill(articleCompose);
    await this.articleTags.click();
    await this.articleTags.fill(articleTags);
}

async publishArticle () {
    await this.publishArt.click();
}

}
