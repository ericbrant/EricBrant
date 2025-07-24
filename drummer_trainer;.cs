using System;
using System.Collections.Generic;

class DrumRhythmToolkit
{
    static Random rng = new Random();

    static void Main()
    {
        Console.WriteLine("🎵 Ultimate Drummer's Console 🔥");
        Console.WriteLine("Choose Tala (Rupak / Jhaptal / Teen Tal):");
        string tala = Console.ReadLine();

        Console.WriteLine("Choose Polymeter (e.g. 5/4 + 7/8 + 3/4):");
        string polymeterInput = Console.ReadLine();

        Console.WriteLine("Choose Nested Polyrhythm (e.g. 3:2:5):");
        string polyrhythmInput = Console.ReadLine();

        Console.WriteLine("Choose Hybrid Rudiment (e.g. flam drag paradiddle):");
        string hybrid = Console.ReadLine();

        Console.WriteLine("Enable D
