// const list = [2, 3, 4, 6];
// list.map((x) => x * x).forEach((x) => console.log(x));

class Color {
  getRandomColor() {
    const randomValue = () => Math.floor(Math.random() * 256);
    return `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`;
  }
}
