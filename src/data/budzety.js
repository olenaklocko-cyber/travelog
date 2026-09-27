import { uidKorystuvacha, otrymatyLokalne, zberyhytyLokalne } from "./dostup";

const bazovyyKlyuch = "travelog-budzety";

const klyuchDlya = (korystuvach) =>
  `${bazovyyKlyuch}-${uidKorystuvacha(korystuvach)}`;

const zavantazhBudzety = (korystuvach) => {
  const map = otrymatyLokalne(
    klyuchDlya(korystuvach),
    {},
    korystuvach,
    bazovyyKlyuch
  );
  return map && typeof map === "object" && !Array.isArray(map) ? map : {};
};

export const otrymatyBudzet = (id, baza, korystuvach) => {
  const map = zavantazhBudzety(korystuvach);
  const znachennya = map[String(id)];
  if (znachennya !== undefined && Number.isFinite(Number(znachennya))) {
    return Number(znachennya);
  }
  return Number(baza) || 0;
};

export const zminytyBudzet = (id, znachennya, korystuvach) => {
  const map = zavantazhBudzety(korystuvach);
  map[String(id)] = Number(znachennya) || 0;
  zberyhytyLokalne(klyuchDlya(korystuvach), map);
  return map;
};

export const zastosuvatyBudzety = (spysok, korystuvach) =>
  spysok.map((p) => ({
    ...p,
    budget: otrymatyBudzet(p.id, p.budget, korystuvach),
  }));
