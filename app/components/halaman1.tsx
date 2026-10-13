"use client";

import { useState } from "react";

export default function Halaman1() {
  const [a, setA] = useState("1");
  const [b, setB] = useState("-5");
  const [c, setC] = useState("6");
  const [hasil, setHasil] = useState<{
    x1: string;
    x2: string;
    diskriminan: number;
    jumlah: number;
    kali: number;
    jenis: string;
  } | null>(null);

  const [error, setError] = useState("");

  function hitungAkar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setHasil(null);
    setError("");

    const A = Number(a);
    const B = Number(b);
    const C = Number(c);

    if (
      a.trim() === "" ||
      b.trim() === "" ||
      c.trim() === "" ||
      !Number.isFinite(A) ||
      !Number.isFinite(B) ||
      !Number.isFinite(C)
    ) {
      setError("Masukkan koefisien a, b, dan c yang valid.");
      return;
    }

    if (A === 0) {
      setError(
        "Koefisien a tidak boleh 0 karena persamaan harus berderajat dua.",
      );
      return;
    }

    const D = B * B - 4 * A * C;
    const jumlah = -B / A;
    const kali = C / A;

    if (D > 0) {
      const x1 = (-B + Math.sqrt(D)) / (2 * A);
      const x2 = (-B - Math.sqrt(D)) / (2 * A);

      setHasil({
        x1: formatAngka(x1),
        x2: formatAngka(x2),
        diskriminan: D,
        jumlah,
        kali,
        jenis: "Dua akar real berbeda",
      });
    } else if (D === 0) {
      const x = -B / (2 * A);

      setHasil({
        x1: formatAngka(x),
        x2: formatAngka(x),
        diskriminan: D,
        jumlah,
        kali,
        jenis: "Dua akar real kembar",
      });
    } else {
      const real = -B / (2 * A);
      const imajiner = Math.sqrt(-D) / Math.abs(2 * A);

      setHasil({
        x1: `${formatAngka(real)} + ${formatAngka(imajiner)}i`,
        x2: `${formatAngka(real)} - ${formatAngka(imajiner)}i`,
        diskriminan: D,
        jumlah,
        kali,
        jenis: "Dua akar kompleks",
      });
    }
  }

  function formatAngka(n: number) {
    if (Object.is(n, -0) || Math.abs(n) < 1e-12) return "0";

    return Number(n.toPrecision(10)).toString();
  }

  function formatKoefisien(n: number, variabel = "") {
    if (n === 0) return "";
    if (variabel && n === 1) return variabel;
    if (variabel && n === -1) return `-${variabel}`;

    return `${n}${variabel}`;
  }

  function persamaan() {
    const A = Number(a);
    const B = Number(b);
    const C = Number(c);

    if (
      a.trim() === "" ||
      b.trim() === "" ||
      c.trim() === "" ||
      !Number.isFinite(A) ||
      !Number.isFinite(B) ||
      !Number.isFinite(C)
    ) {
      return "ax² + bx + c = 0";
    }

    const suku = [
      { nilai: A, variabel: "x²" },
      { nilai: B, variabel: "x" },
      { nilai: C, variabel: "" },
    ].filter((item) => item.nilai !== 0);

    if (suku.length === 0) return "0 = 0";

    return (
      suku
        .map((item, index) => {
          const abs = Math.abs(item.nilai);
          const teks = formatKoefisien(abs, item.variabel);

          if (index === 0) {
            return item.nilai < 0 ? `-${teks}` : teks;
          }

          return item.nilai < 0 ? `− ${teks}` : `+ ${teks}`;
        })
        .join(" ") + " = 0"
    );
  }

  return (
    <section className="w-full space-y-6">
      {" "}
      <div className="text-center">
        {" "}
        <span className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-200">
          Halaman 1{" "}
        </span>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Generator Persamaan Kuadrat
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Masukkan nilai a, b, dan c untuk menemukan akar-akar persamaan.
        </p>
      </div>
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-800">
        <p className="mb-4 text-center text-xl font-semibold text-zinc-900 dark:text-white">
          ax² + bx + c = 0
        </p>

        <form onSubmit={hitungAkar} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Koefisien a
              <input
                type="number"
                step="any"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="mt-2 w-full rounded-lg border border-zinc-300 bg-white p-3 text-base text-zinc-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white"
                required
              />
            </label>

            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Koefisien b
              <input
                type="number"
                step="any"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="mt-2 w-full rounded-lg border border-zinc-300 bg-white p-3 text-base text-zinc-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white"
                required
              />
            </label>

            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Koefisien c
              <input
                type="number"
                step="any"
                value={c}
                onChange={(e) => setC(e.target.value)}
                className="mt-2 w-full rounded-lg border border-zinc-300 bg-white p-3 text-base text-zinc-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white"
                required
              />
            </label>
          </div>

          <div className="rounded-lg bg-white p-4 text-center dark:bg-zinc-900">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Persamaan yang dibentuk
            </p>

            <p className="mt-2 break-words text-xl font-bold text-blue-700 dark:text-blue-300">
              {persamaan()}
            </p>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Hitung Akar-Akar
          </button>
        </form>
      </div>
      {hasil && (
        <div className="space-y-5" aria-live="polite">
          <div className="rounded-xl border border-green-200 bg-green-50 p-5 dark:border-green-900 dark:bg-green-950">
            <h3 className="mb-3 text-lg font-bold text-green-800 dark:text-green-200">
              Hasil Akar Persamaan
            </h3>

            <p className="mb-3 text-sm text-green-800 dark:text-green-300">
              Jenis akar: {hasil.jenis}
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Akar pertama (x₁)
                </p>
                <p className="mt-1 break-words text-xl font-bold text-zinc-900 dark:text-white">
                  {hasil.x1}
                </p>
              </div>

              <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Akar kedua (x₂)
                </p>
                <p className="mt-1 break-words text-xl font-bold text-zinc-900 dark:text-white">
                  {hasil.x2}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
              Diskriminan (D) = b² − 4ac ={" "}
              <strong>{formatAngka(hasil.diskriminan)}</strong>
            </p>
          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950">
            <h3 className="mb-4 text-lg font-bold text-blue-800 dark:text-blue-200">
              Sifat-Sifat Akar Persamaan Kuadrat
            </h3>

            <div className="space-y-4">
              <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                <p className="font-semibold text-zinc-800 dark:text-zinc-100">
                  1. Jumlah akar
                </p>

                <p className="my-2 text-lg font-bold text-blue-700 dark:text-blue-300">
                  x₁ + x₂ = −b/a
                </p>

                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  Substitusi: −({b}) / ({a}) ={" "}
                  <strong>{formatAngka(hasil.jumlah)}</strong>
                </p>
              </div>

              <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                <p className="font-semibold text-zinc-800 dark:text-zinc-100">
                  2. Hasil kali akar
                </p>

                <p className="my-2 text-lg font-bold text-blue-700 dark:text-blue-300">
                  x₁ × x₂ = c/a
                </p>

                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  Substitusi: ({c}) / ({a}) ={" "}
                  <strong>{formatAngka(hasil.kali)}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
