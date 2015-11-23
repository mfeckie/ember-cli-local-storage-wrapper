export default function (ls, keys) {
  keys.forEach((key) => {
    window.localStorage.removeItem(ls._namespacedKey(key));
  });
}
