import { faker } from '@faker-js/faker';

export const articleMake = (articleTitle, articleAbout, articleCompose, articleTags) => {
    return {
        articleTitle : faker.lorem.words(),
        articleAbout : faker.music.songName(),
        articleCompose : faker.lorem.paragraph(),
        articleTags : faker.person.zodiacSign(),
    }
  }