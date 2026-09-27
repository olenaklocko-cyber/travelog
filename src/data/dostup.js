const idVlasnyka = (import.meta.env.VITE_VLASYNYK_ID || "").trim().toLowerCase();
const emailVlasnyka = (import.meta.env.VITE_VLASYNYK_EMAIL || "")
  .trim()
  .toLowerCase();

export const uidKorystuvacha = (korystuvach) =>
  String(korystuvach?.id || "anonim");

/**
 * Чи це власник застосунку (я)?
 * Порівнюємо id, якщо заданий VITE_VLASYNYK_ID, інакше — email.
 * Якщо нічого не налаштовано — всі рівні (захист вимкнено, поведінка як раніше).
 */
export const ciToVlasnyk = (korystuvach) => {
  if (idVlasnyka) {
    return String(korystuvach?.id || "").toLowerCase() === idVlasnyka;
  }
  if (emailVlasnyka) {
    return String(korystuvach?.email || "").toLowerCase() === emailVlasnyka;
  }
  return true;
};

const chytaty = (klyuch) => {
  try {
    const ryadok = localStorage.getItem(klyuch);
    return ryadok === null ? undefined : JSON.parse(ryadok);
  } catch {
    return undefined;
  }
};

export const zberyhytyLokalne = (klyuch, znachennya) => {
  try {
    localStorage.setItem(klyuch, JSON.stringify(znachennya));
  } catch {
    /* сховище недоступне — дані лишаться лише в цій сесії */
  }
};

/**
 * Читає персональні дані користувача.
 * Старі спільні ключі (без id користувача) читаємо ЛИШЕ якщо це власник —
 * чужі акаунти ніколи не побачать мої збережені галочки/витрати.
 */
export const otrymatyLokalne = (klyuch, zamovchennya, korystuvach, staryyKlyuch) => {
  const seychas = chytaty(klyuch);
  if (seychas !== undefined) return seychas;
  if (
    staryyKlyuch &&
    staryyKlyuch !== klyuch &&
    ciToVlasnyk(korystuvach)
  ) {
    const stare = chytaty(staryyKlyuch);
    if (stare !== undefined) return stare;
  }
  return zamovchennya;
};
