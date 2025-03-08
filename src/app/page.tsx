"use client";

import { useState } from 'react';
import type { FormEvent } from 'react';
import Image from 'next/image'

type LengthUnit = 'giga' | 'mega' | 'kilo' | 'hekto' | 'deko' | 'meter' | 'dezi' | 'zenti' | 'milli' | 'mikro' | 'nano';
type VolumeUnit = 'm3' | 'l' | 'cm3' | 'ml' | 'hl' | 'cl';

const lengthFactors: Record<LengthUnit, number> = {
  giga: 1e9,
  mega: 1e6,
  kilo: 1e3,
  hekto: 1e2,
  deko: 1e1,
  meter: 1,
  dezi: 1e-1,
  zenti: 1e-2,
  milli: 1e-3,
  mikro: 1e-6,
  nano: 1e-9,
};

const lengthDisplayNames: Record<LengthUnit, string> = {
  giga: 'Gm',
  mega: 'Mm',
  kilo: 'km',
  hekto: 'hm',
  deko: 'dam',
  meter: 'm',
  dezi: 'dm',
  zenti: 'cm',
  milli: 'mm',
  mikro: 'µm',
  nano: 'nm',
};

function convertLength(value: number, from: LengthUnit, to: LengthUnit): number {
  return (value * lengthFactors[from]) / lengthFactors[to];
}

const volumeFactors: Record<VolumeUnit, number> = {
  m3: 1000,    // 1 m³ = 1000 Liter
  l: 1,
  cm3: 0.001,  // 1 cm³ = 0.001 Liter
  ml: 0.001,   // 1 ml = 0.001 Liter (gleich wie cm³)
  hl: 100,     // 1 hl = 100 Liter
  cl: 0.01,    // 1 cl = 0.01 Liter
};

const volumeDisplayNames: Record<VolumeUnit, string> = {
  m3: 'm³',
  l: 'l',
  cm3: 'cm³',
  ml: 'ml',
  hl: 'hl',
  cl: 'cl',
};

function convertVolume(value: number, from: VolumeUnit, to: VolumeUnit): number {
  return (value * volumeFactors[from]) / volumeFactors[to];
}

export default function Page() {
  const [lengthValue, setLengthValue] = useState<string>('');
  const [fromLengthUnit, setFromLengthUnit] = useState<LengthUnit>('meter');
  const [toLengthUnit, setToLengthUnit] = useState<LengthUnit>('zenti');
  const [lengthResult, setLengthResult] = useState<number | null>(null);

  const [volumeValue, setVolumeValue] = useState<string>('');
  const [fromVolumeUnit, setFromVolumeUnit] = useState<VolumeUnit>('m3');
  const [toVolumeUnit, setToVolumeUnit] = useState<VolumeUnit>('l');
  const [volumeResult, setVolumeResult] = useState<number | null>(null);

  const lengthUnits: LengthUnit[] = ['giga', 'mega', 'kilo', 'hekto', 'deko', 'meter', 'dezi', 'zenti', 'milli', 'mikro', 'nano'];
  const volumeUnits: VolumeUnit[] = ['m3', 'l', 'cm3', 'ml', 'hl', 'cl'];

  const handleLengthSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = Number.parseFloat(lengthValue);
    if (!Number.isNaN(value)) {
      // Optionally, add additional check to avoid negative values
      if (value < 0) {
        setLengthResult(null);
        alert("Bitte geben Sie eine positive Zahl ein.");
        return;
      }
      const result = convertLength(value, fromLengthUnit, toLengthUnit);
      setLengthResult(result);
    } else {
      setLengthResult(null);
    }
  };

  const handleVolumeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = Number.parseFloat(volumeValue);
    if (!Number.isNaN(value)) {
      if (value < 0) {
        setVolumeResult(null);
        alert("Bitte geben Sie eine positive Zahl ein.");
        return;
      }
      const result = convertVolume(value, fromVolumeUnit, toVolumeUnit);
      setVolumeResult(result);
    } else {
      setVolumeResult(null);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Avis Metric Umrechner</h1>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Längenumrechnung</h2>
        <form onSubmit={handleLengthSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Wert eingeben:</label>
            <input
              type="number"
              min="0"
              value={lengthValue}
              onChange={(e) => setLengthValue(e.target.value)}
              placeholder="Zahl eingeben"
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Von Einheit:</label>
            <select
              value={fromLengthUnit}
              onChange={(e) => setFromLengthUnit(e.target.value as LengthUnit)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              {lengthUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {lengthDisplayNames[unit]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Zu Einheit:</label>
            <select
              value={toLengthUnit}
              onChange={(e) => setToLengthUnit(e.target.value as LengthUnit)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              {lengthUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {lengthDisplayNames[unit]}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full">
            Umrechnen
          </button>
        </form>
        {lengthResult !== null && (
          <p className="mt-4 text-lg">
            Ergebnis: {lengthResult} {lengthDisplayNames[toLengthUnit]}
          </p>
        )}
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Volumenumrechnung</h2>
        <form onSubmit={handleVolumeSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Volumen eingeben:</label>
            <input
              type="number"
              min="0"
              value={volumeValue}
              onChange={(e) => setVolumeValue(e.target.value)}
              placeholder="Zahl eingeben"
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Von Einheit:</label>
            <select
              value={fromVolumeUnit}
              onChange={(e) => setFromVolumeUnit(e.target.value as VolumeUnit)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              {volumeUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {volumeDisplayNames[unit]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Zu Einheit:</label>
            <select
              value={toVolumeUnit}
              onChange={(e) => setToVolumeUnit(e.target.value as VolumeUnit)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              {volumeUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {volumeDisplayNames[unit]}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full">
            Umrechnen
          </button>
        </form>
        {volumeResult !== null && (
          <p className="mt-4 text-lg">
            Ergebnis: {volumeResult} {volumeDisplayNames[toVolumeUnit]}
          </p>
        )}
      </section>
        <footer className="mt-10 text-center text-gray-400 text-sm">
          <small className="inline-flex items-center">
            Diese Website wurde mit
            <Image 
              src="/copilot.png" 
              alt="copilot" 
              width={25} 
              height={25} 
              className="mx-1"
            /> 
            <a href="https://github.com/features/copilot" target="_blank" rel="noopener noreferrer">
            GitHub Copilot
            </a>
            <span className="ml-1">{' '}</span> 
            erstellt!
          </small>
    </footer>

    </main>
  );
}
