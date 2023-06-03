export function fetchCharacters() {
  return fetch(
    `https://disney_api.nomadcoders.workers.dev/characters`
  ).then((response) => response.json());
}

export function fetchCharacterDetail(id: number) {
  return fetch(
    `https://disney_api.nomadcoders.workers.dev/characters/${id}`
  ).then((response) => response.json());
}
