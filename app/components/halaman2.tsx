"use client";

import { useState } from "react";

type Soal = {
  a: number;
  b: number;
  c: number;
};

function formatAngka(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return Number(n.toFixed(4)).toString();
}

function formatPolinom(soal: Soal): string {
  const { a, b, c } = soal;
  const bagian: string[] = [];

  bagian.push(
    a === 1 ? "x²" : a === -1 ? "-x²" : `${a}x²`
  );

  if (b !== 0) {
    const tanda = b > 0 ? " + " : " - ";
    const nilai = Math.abs(b);
    bagian.push(
      `${tanda}${nilai === 1 ? "" : nilai}x`
    );
  }

  if (c !== 0) {
    const tanda = c > 0 ? " + " : " - ";
    bagian.push(`${tanda}${Math.abs(c)}`);
  }

  return bagian.join("");
}


function buatSoal(): Soal
{
  // Membuat dua akar bilangan bulat yang berbeda dan tidak nol.
  let x1 = 0;
  let x2 = 0;

  while ( x1 === 0 || x2 === 0 || x1 === x2 )
  {
    x1 = Math.floor( Math.random() * 11 ) - 5;
    x2 = Math.floor( Math.random() * 11 ) - 5;
  }

  // Memilih koefisien x² secara acak: 1 sampai 5.
  const a = Math.floor( Math.random() * 5 ) + 1;

  // Persamaan: a(x - x1)(x - x2) = 0
  // Bentuk umum: ax² + bx + c = 0
  return {
    a,
    b: -a * ( x1 + x2 ),
    c: a * x1 * x2,
  };
}

function hitungAkar(soal: Soal) {
  const D = soal.b ** 2 - 4 * soal.a * soal.c;

  const x1 = (-soal.b + Math.sqrt(D)) / (2 * soal.a);
  const x2 = (-soal.b - Math.sqrt(D)) / (2 * soal.a);

  return { x1, x2, D };
}

function hitungJawaban(soal: Soal) {
  const { x1, x2, D } = hitungAkar(soal);
  const jumlah = x1 + x2;
  const hasilKali = x1 * x2;

  return {
    x1,
    x2,
    D,
    jumlah,
    hasilKali,
    a: x1 ** 2 + x2 ** 2,
    b: (x1 - x2) ** 2,
    c: 1 / x1 + 1 / x2,
    d: x1 / x2 + x2 / x1,
    e: (x1 - 1) ** 2 + (x2 - 1) ** 2,
  };
}

export default function Halaman2() {
  const [soal, setSoal] = useState<Soal>(() => buatSoal());
  const [tampilkanPembahasan, setTampilkanPembahasan] =
    useState(false);

  const jawaban = hitungJawaban(soal);
  const persamaan = formatPolinom(soal);

  function gantiSoal() {
    setSoal(buatSoal());
    setTampilkanPembahasan(false);
  }

  return (
    <section className="w-full space-y-6">
      {/* Judul */}
      <div className="text-center">
        <span className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-200">
          Halaman 2
        </span>

        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Generator Soal Persamaan Kuadrat
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          Buat soal secara acak, lalu lihat jawaban dan
          pembahasan lengkap untuk setiap pertanyaan.
        </p>
      </div>

      {/* Soal */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950">
        <h3 className="mb-3 text-lg font-bold text-blue-900 dark:text-blue-200">
          Soal
        </h3>

        <p className="text-center text-2xl font-bold text-zinc-900 dark:text-white">
          {persamaan} = 0
        </p>

        <p className="mt-3 text-center text-sm text-zinc-600 dark:text-zinc-300">
          Jika akar-akarnya adalah x₁ dan x₂, tentukan:
        </p>

        <ol className="mt-5 list-[lower-alpha] space-y-3 pl-6 text-zinc-800 dark:text-zinc-200">
          <li>x₁² + x₂²</li>
          <li>(x₁ − x₂)²</li>
          <li>1/x₁ + 1/x₂</li>
          <li>x₁/x₂ + x₂/x₁</li>
          <li>(x₁ − 1)² + (x₂ − 1)²</li>
        </ol>
      </div>

      {/* Tombol */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => setTampilkanPembahasan((nilai) => !nilai)}
          className="flex-1 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          {tampilkanPembahasan
            ? "Sembunyikan Pembahasan"
            : "Lihat Jawaban & Pembahasan"}
        </button>

        <button
          onClick={gantiSoal}
          className="flex-1 rounded-lg border border-zinc-300 px-5 py-3 font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
        >
          Buat Soal Baru ↻
        </button>
      </div>

      {/* Pembahasan */}
      {tampilkanPembahasan && (
        <div className="space-y-5">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
            <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">
              Langkah 1: Tentukan akar-akar
            </h3>

            <p className="mb-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              Persamaan kuadrat:
            </p>

            <p className="mb-3 text-center text-lg font-bold text-blue-700 dark:text-blue-300">
              {persamaan} = 0
            </p>

            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              Dengan rumus kuadrat:
            </p>

            <p className="my-3 text-center font-semibold text-zinc-900 dark:text-white">
              x = (−b ± √(b² − 4ac)) / 2a
            </p>

            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              Diskriminan:
            </p>

            <p className="my-2 text-center font-semibold text-zinc-900 dark:text-white">
              D = b² − 4ac = {formatAngka(jawaban.D)}
            </p>

            <div className="mt-4 rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
              <p className="font-semibold text-zinc-900 dark:text-white">
                Hasil:
              </p>
              <p className="mt-2 text-zinc-700 dark:text-zinc-200">
                x₁ = {formatAngka(jawaban.x1)}
              </p>
              <p className="text-zinc-700 dark:text-zinc-200">
                x₂ = {formatAngka(jawaban.x2)}
              </p>
            </div>
          </div>

          {/* Rumus dasar */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
            <h3 className="mb-3 text-lg font-bold text-zinc-900 dark:text-white">
              Langkah 2: Gunakan jumlah dan hasil kali akar
            </h3>

            <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-300">
              Untuk persamaan ax² + bx + c = 0, berlaku:
            </p>

            <div className="space-y-3">
              <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  Jumlah akar
                </p>
                <p className="mt-1 font-bold text-blue-700 dark:text-blue-300">
                  x₁ + x₂ = −b/a = {formatAngka(jawaban.jumlah)}
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  Hasil kali akar
                </p>
                <p className="mt-1 font-bold text-blue-700 dark:text-blue-300">
                  x₁x₂ = c/a = {formatAngka(jawaban.hasilKali)}
                </p>
              </div>
            </div>
          </div>

          {/* Jawaban A */}
          <Pembahasan
            judul="a. x₁² + x₂²"
            rumus="x₁² + x₂² = (x₁ + x₂)² − 2x₁x₂"
            langkah={`${formatAngka(jawaban.jumlah)}² − 2(${formatAngka(jawaban.hasilKali)})`}
            hasil={jawaban.a}
          />

          {/* Jawaban B */}
          <Pembahasan
            judul="b. (x₁ − x₂)²"
            rumus="(x₁ − x₂)² = (x₁ + x₂)² − 4x₁x₂"
            langkah={`${formatAngka(jawaban.jumlah)}² − 4(${formatAngka(jawaban.hasilKali)})`}
            hasil={jawaban.b}
          />

          {/* Jawaban C */}
          <Pembahasan
            judul="c. 1/x₁ + 1/x₂"
            rumus="1/x₁ + 1/x₂ = (x₁ + x₂)/(x₁x₂)"
            langkah={`${formatAngka(jawaban.jumlah)} / (${formatAngka(jawaban.hasilKali)})`}
            hasil={jawaban.c}
          />

          {/* Jawaban D */}
          <Pembahasan
            judul="d. x₁/x₂ + x₂/x₁"
            rumus="x₁/x₂ + x₂/x₁ = (x₁² + x₂²)/(x₁x₂)"
            langkah={`${formatAngka(jawaban.a)} / (${formatAngka(jawaban.hasilKali)})`}
            hasil={jawaban.d}
          />

          {/* Jawaban E */}
          <Pembahasan
            judul="e. (x₁ − 1)² + (x₂ − 1)²"
            rumus="(x₁ − 1)² + (x₂ − 1)² = x₁² + x₂² − 2(x₁ + x₂) + 2"
            langkah={`${formatAngka(jawaban.a)} − 2(${formatAngka(jawaban.jumlah)}) + 2`}
            hasil={jawaban.e}
          />

          <div className="rounded-xl border border-green-200 bg-green-50 p-5 dark:border-green-900 dark:bg-green-950">
            <h3 className="mb-3 text-lg font-bold text-green-900 dark:text-green-200">
              Ringkasan Jawaban
            </h3>

            <ol className="list-[lower-alpha] space-y-2 pl-6 text-green-900 dark:text-green-200">
              <li>x₁² + x₂² = {formatAngka(jawaban.a)}</li>
              <li>(x₁ − x₂)² = {formatAngka(jawaban.b)}</li>
              <li>1/x₁ + 1/x₂ = {formatAngka(jawaban.c)}</li>
              <li>x₁/x₂ + x₂/x₁ = {formatAngka(jawaban.d)}</li>
              <li>(x₁ − 1)² + (x₂ − 1)² = {formatAngka(jawaban.e)}</li>
            </ol>
          </div>
        </div>
      )}
    </section>
  );
}

function Pembahasan({
  judul,
  rumus,
  langkah,
  hasil,
}: {
  judul: string;
  rumus: string;
  langkah: string;
  hasil: number;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-bold text-zinc-900 dark:text-white">
        {judul}
      </h3>

      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        Rumus:
      </p>

      <p className="my-3 rounded-lg bg-zinc-100 p-3 text-center font-semibold text-blue-700 dark:bg-zinc-800 dark:text-blue-300">
        {rumus}
      </p>

      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        Substitusi:
      </p>

      <p className="my-3 text-center font-medium text-zinc-900 dark:text-white">
        {langkah}
      </p>

      <div className="rounded-lg bg-green-50 p-3 dark:bg-green-950">
        <p className="text-sm text-green-800 dark:text-green-200">
          Jawaban:
        </p>

        <p className="mt-1 text-xl font-bold text-green-700 dark:text-green-300">
          {formatAngka(hasil)}
        </p>
      </div>
    </div>
  );
}