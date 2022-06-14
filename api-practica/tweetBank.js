const data = [];
let id = 0;

const list = () => {
  return data;
};

const findOne = (id) => {
  return data.find((tweet) => tweet.id === id);
};

const add = (name, content, imgURL) => {
  const tweet = { id: ++id, name, content, imgURL };
  data.push(tweet);
  return tweet;
};

const findAllMatch = (name) => {
  const newArr = data.filter((tweet) => tweet.name === name);
  return newArr;
};

const remove = (id) => {
  data.forEach((tweet, i) => {
    if (tweet.id === id) data.splice(i, 1);
  });
};

const update = (id, newContent) => {
  const tweet = findOne(id);
  tweet.content = newContent;
};

module.exports = { add, list, findOne, findAllMatch, remove, update };

const tweets = [
  {
    name: "Homero Simpson",
    content: "Vas a morir Moe. ¡Wiiiiii!",
    imgUrl: "https://64.media.tumblr.com/tumblr_m3804u7WRg1rqjc90o1_400.gifv",
  },
  {
    name: "Homero Simpson",
    content:
      "Oh Marge, mi reina, Lisa mi pequeña princesa… Y cómo olvidarme del niño rata.",
    imgUrl:
      "http://pa1.narvii.com/6699/6d31a954b613ee1dc8f13d3bf2d2e244fd59f295_00.gif",
  },
  {
    name: "Señora Alegria",
    content: "¡¿Alguien quiere pensar en los niños?!",
    imgUrl:
      "https://vagonettasblog.files.wordpress.com/2014/11/01c77-alguien-por-favor-quiere-pensar-en-los-nic3b1os-vagonettas-los-simpsons-gif-alegria-ss.gif",
  },
  {
    name: "Abuelo Simpson",
    content:
      "Mi Homero no es comunista. Podrá ser mentiroso, puerco, idiota, comunista, pero nunca una estrella porno",
    imgUrl:
      "http://3.bp.blogspot.com/-dZBcyr1hJeo/VIRWhK9mcWI/AAAAAAAAAq4/SPOfRzb4LvE/s1600/abuelo-simpson-mi-homero-no-es-comunista-podra-ser-los-simpsons-vagonettas-3.1m-CS.gif",
  },
  {
    name: "Homero Simpson",
    content:
      "Normalmente no rezo, pero si estás ahí, por favor ¡Sálvame Superman!",
    imgUrl:
      "https://3.bp.blogspot.com/-lcz_SiS577U/WHo9CDb7r0I/AAAAAAAA-vQ/_77f294XpJQXCPRkbaKHe6W82aGk8OwUQCLcB/s1600/s-88.gif",
  },
];

for (let i = 0; i < tweets.length; i++) {
  module.exports.add(tweets[i].name, tweets[i].content, tweets[i].imgUrl);
}
