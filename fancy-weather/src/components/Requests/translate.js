export default function translate(txt, newL, oldL) {
  const word = txt;
  const oldLang = oldL;
  const newLang = newL;
  const key = 'trnsl.1.1.20190419T144929Z.9a7ce55bcbc0ab3a.7b061e1931fe57955befd67ab7151772bed63f0f';
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${word}&lang=${oldLang}-${newLang}`;
  return fetch(url)
    .then((response) => {
      if (response.ok) return response;
      throw new Error('Word not found');
    })
    .then((response) => response.json())
    .then((data) => data.text);
}
