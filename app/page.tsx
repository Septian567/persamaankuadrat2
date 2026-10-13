"use client";

import { useState } from "react";
import Halaman1 from "./components/halaman1";
import Halaman2 from "./components/halaman2";

export default function Home() {
const [halamanAktif, setHalamanAktif] = useState(1);

const halaman = [
{
nomor: 1,
judul: "Halaman 1",
deskripsi: "Kalkulator persamaan kuadrat.",
},
{
nomor: 2,
judul: "Halaman 2",
deskripsi: "Materi tentang persamaan kuadrat.",
},

];

const halamanSekarang = halaman[halamanAktif - 1];

return ( <div className="min-h-screen bg-zinc-100 p-3 font-sans dark:bg-black sm:p-5 md:p-8"> <main className="mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-5xl flex-col items-center rounded-xl bg-white p-4 shadow-lg dark:bg-zinc-900 sm:min-h-[calc(100vh-2.5rem)] sm:rounded-2xl sm:p-6 md:p-8 lg:p-10">


    {/* Judul aplikasi */}
    <header className="mb-6 w-full text-center sm:mb-8">
      <h1 className="text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl md:text-3xl">
        Aplikasi Persamaan Kuadrat
      </h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
        Pelajari dan hitung persamaan kuadrat dengan mudah.
      </p>
    </header>

    {/* Navigasi halaman */}
    <nav
      aria-label="Navigasi halaman"
      className="mb-6 grid w-full grid-cols-2 gap-2 sm:mb-8 sm:grid-cols-4 sm:gap-3"
    >
      {halaman.map((item) => (
        <button
          key={item.nomor}
          onClick={() => setHalamanAktif(item.nomor)}
          aria-current={
            halamanAktif === item.nomor ? "page" : undefined
          }
          className={`min-h-11 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 sm:px-4 sm:text-base ${
            halamanAktif === item.nomor
              ? "bg-blue-600 text-white shadow-md"
              : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          }`}
        >
          Halaman {item.nomor}
        </button>
      ))}
    </nav>

    {/* Konten halaman aktif */}
    <div className="w-full min-w-0 flex-1">
      {halamanAktif === 1 ? (
        <Halaman1 />
      ) : halamanAktif === 2 ? (
        <Halaman2 />
      ) : (
        <section className="flex min-h-64 w-full flex-col items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-center dark:border-zinc-700 dark:bg-zinc-800 sm:p-8">
          <span className="mb-4 rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-200 sm:text-sm">
            Halaman {halamanSekarang.nomor} dari {halaman.length}
          </span>

          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-white sm:mb-4 sm:text-2xl">
            {halamanSekarang.judul}
          </h2>

          <p className="max-w-md text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base">
            {halamanSekarang.deskripsi}
          </p>
        </section>
      )}
    </div>

    {/* Tombol navigasi sebelumnya dan selanjutnya */}
    <div className="mt-6 flex w-full items-center justify-between gap-3 sm:mt-8 sm:gap-4">
      <button
        onClick={() =>
          setHalamanAktif((sebelumnya) =>
            Math.max(1, sebelumnya - 1)
          )
        }
        disabled={halamanAktif === 1}
        className="min-h-11 min-w-0 flex-1 rounded-lg border border-zinc-300 px-3 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800 sm:flex-none sm:px-5 sm:text-base"
      >
        <span className="sm:hidden">← Sebelumnya</span>
        <span className="hidden sm:inline">← Halaman Sebelumnya</span>
      </button>

      <button
        onClick={() =>
          setHalamanAktif((sebelumnya) =>
            Math.min(halaman.length, sebelumnya + 1)
          )
        }
        disabled={halamanAktif === halaman.length}
        className="min-h-11 min-w-0 flex-1 rounded-lg bg-blue-600 px-3 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none sm:px-5 sm:text-base"
      >
        <span className="sm:hidden">Selanjutnya →</span>
        <span className="hidden sm:inline">Halaman Selanjutnya →</span>
      </button>
    </div>

    {/* Indikator halaman aktif */}
    <div className="mt-5 flex items-center justify-center gap-2 sm:mt-6">
      <span className="text-sm text-zinc-500 dark:text-zinc-400">
        Halaman {halamanAktif} dari {halaman.length}
      </span>

      <div className="flex gap-1.5" aria-hidden="true">
        {halaman.map((item) => (
          <span
            key={item.nomor}
            className={`h-2 rounded-full transition-all duration-200 ${
              halamanAktif === item.nomor
                ? "w-5 bg-blue-600"
                : "w-2 bg-zinc-300 dark:bg-zinc-600"
            }`}
          />
        ))}
      </div>
    </div>
  </main>
</div>

);
}
