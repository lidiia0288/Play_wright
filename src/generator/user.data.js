import { faker } from '@faker-js/faker';

export const userMake = (userBio, userName, userEmail, userPassword) => {
    return {
    userBio: faker.music.genre(),  
    userName: faker.person.firstName('female'),
    userEmail: faker.internet.email(),
    userPassword: faker.internet.password(),
    }
  }