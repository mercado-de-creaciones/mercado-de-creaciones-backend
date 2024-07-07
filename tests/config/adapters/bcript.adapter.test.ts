import { BcriptAdapter } from "../../../netlify/config/adapters/bcript.adapter";

describe("Probar bcript.adapter.ts", () => {
  describe("hash", () => {
    test("Debe generar un hash de un password", () => {
      const password = "testPassword";
      const hash = BcriptAdapter.hash(password);

      expect(hash).not.toBe(password);
    });
  });

  describe("compare", () => {
    test("Debe devolver 'true' si la contraseña coincide con el hash", () => {
      const password = "testPassword";
      const hash = BcriptAdapter.hash(password);

      const result = BcriptAdapter.compare(password, hash);

      expect(result).toBe(true);
    });

    test("Debe devolver 'false' si la contraseña no coincide con el hash", () => {
      const password = "testPassword";
      const wrongPassword = "wrongPassword";
      const hash = BcriptAdapter.hash(password);

      const result = BcriptAdapter.compare(wrongPassword, hash);

      expect(result).toBe(false);
    });
  });
});
