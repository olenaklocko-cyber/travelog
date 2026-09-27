import { uidKorystuvacha, otrymatyLokalne, zberyhytyLokalne } from "./dostup";

const klyuchApi = "travelog-api-trips";
const klyuchApiDlya = (korystuvach) =>
  `${klyuchApi}-${uidKorystuvacha(korystuvach)}`;

export const zavantazhPodorozhiAPI = (korystuvach) => {
  const spysok = otrymatyLokalne(
    klyuchApiDlya(korystuvach),
    [],
    korystuvach,
    klyuchApi
  );
  return Array.isArray(spysok) ? spysok : [];
};

export const zberezhytyPodorozhAPI = (korystuvach, podorozh) => {
  const spysok = [podorozh, ...zavantazhPodorozhiAPI(korystuvach)];
  zberyhytyLokalne(klyuchApiDlya(korystuvach), spysok);
  return spysok;
};

export const vydalytyPodorozhAPI = (korystuvach, id) => {
  const spysok = zavantazhPodorozhiAPI(korystuvach).filter(
    (p) => String(p.id) !== String(id)
  );
  zberyhytyLokalne(klyuchApiDlya(korystuvach), spysok);
  return spysok;
};

const klyuchPryhovan = "travelog-pryhovani-mock";

const klyuchPryhovanDlya = (korystuvach) =>
  `travelog-pryhovani-${uidKorystuvacha(korystuvach)}`;

export const prykhovaniMock = (korystuvach) => {
  const spysok = otrymatyLokalne(
    klyuchPryhovanDlya(korystuvach),
    [],
    korystuvach,
    klyuchPryhovan
  );
  return Array.isArray(spysok) ? spysok : [];
};

export const prykhovatyMock = (korystuvach, id) => {
  const spysok = [
    ...new Set([...prykhovaniMock(korystuvach), String(id)]),
  ];
  zberyhytyLokalne(klyuchPryhovanDlya(korystuvach), spysok);
  return spysok;
};
