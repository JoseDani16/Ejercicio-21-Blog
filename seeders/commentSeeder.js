const { faker } = require("@faker-js/faker");
const { Comment, Article } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const article = await Article.findAll();
  const comments = [];

  for (let i = 0; i < 128; i++) {
    const randomArticle = article[Math.floor(Math.random() * article.length)];
    //console.log(randomArticle.id);

    comments.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      comment: faker.lorem.sentence(50),
      articleId: randomArticle.id,
    });
  }

  await Comment.bulkCreate(comments);
  console.log("[Database] Se corrió el seeder de comments.");
};
