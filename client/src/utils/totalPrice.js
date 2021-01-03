export default function (array) {
  return array.reduce((acc, item) => acc + item.price * item.quantity, 0);
}
