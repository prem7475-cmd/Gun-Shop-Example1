// src/hooks/useArmouryData.js
import { useState, useEffect } from "react";

export default function useArmouryData(type) {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Enhanced armoury data with detailed specifications
    const dataMap = {
      rifles: [
        { name: "AK-47", caliber: "7.62mm", category: "Assault Rifle", image: "/images/AK-47.webp", range: "400m", fireRate: "600 RPM", magazine: "30 rounds", damage: "High", price: "₹4,95,000" },
        { name: "M4 Carbine", caliber: "5.56mm", category: "Assault Rifle", image: "/images/m4-carbine.jpg", range: "500m", fireRate: "700-950 RPM", magazine: "30 rounds", damage: "Medium", price: "₹7,45,000" },
        { name: "HK416", caliber: "5.56mm", category: "Assault Rifle", image: "/images/hk416.jpg", range: "600m", fireRate: "700-900 RPM", magazine: "30 rounds", damage: "Medium", price: "₹10,35,000" },
        { name: "SCAR-L", caliber: "5.56mm", category: "Assault Rifle", image: "/images/scar-l.jpg", range: "600m", fireRate: "550-650 RPM", magazine: "30 rounds", damage: "Medium", price: "₹11,60,000" },
        { name: "AK-12", caliber: "5.45mm / 7.62mm", category: "Assault Rifle", image: "/images/ak12.jpg", range: "800m", fireRate: "600-700 RPM", magazine: "30 rounds", damage: "High", price: "₹6,20,000" },
        { name: "Widow Maker", caliber: ".50 BMG", category: "Sniper Rifle", image: "/images/Widow-Maker sniper.jpg", range: "2000m", fireRate: "Semi-auto", magazine: "10 rounds", damage: "Extreme", price: "₹35,20,000" },
        { name: "AWP", caliber: ".338 Lapua Magnum", category: "Sniper Rifle", image: "/images/awp.jpg", range: "1500m", fireRate: "Bolt-action", magazine: "5 rounds", damage: "Extreme", price: "₹24,85,000" },
        { name: "Dragunov SVD", caliber: "7.62×54mmR", category: "Sniper Rifle", image: "/images/svd.jpg", range: "800m", fireRate: "Semi-auto", magazine: "10 rounds", damage: "High", price: "₹14,50,000" },
        { name: "MK14 EBR", caliber: "7.62×51mm NATO", category: "DMR", image: "/images/mk14.jpg", range: "800m", fireRate: "Semi-auto", magazine: "20 rounds", damage: "High", price: "₹17,40,000" },
        { name: "SKS", caliber: "7.62×39mm", category: "DMR", image: "/images/sks.jpg", range: "400m", fireRate: "Semi-auto", magazine: "10 rounds", damage: "Medium", price: "₹3,30,000" },
        { name: "MP5", caliber: "9×19mm Parabellum", category: "SMG", image: "/images/mp5.jpg", range: "200m", fireRate: "800 RPM", magazine: "30 rounds", damage: "Low", price: "₹9,10,000" },
        { name: "UMP-45", caliber: ".45 ACP", category: "SMG", image: "/images/ump45.jpg", range: "100m", fireRate: "600 RPM", magazine: "25 rounds", damage: "Medium", price: "₹7,45,000" },
        { name: "P90", caliber: "5.7×28mm", category: "SMG", image: "/images/p90.jpg", range: "200m", fireRate: "900 RPM", magazine: "50 rounds", damage: "Low", price: "₹9,95,000" },
        { name: "Vector", caliber: ".45 ACP / 9mm", category: "SMG", image: "/images/vector.jpg", range: "100m", fireRate: "1200 RPM", magazine: "25 rounds", damage: "Medium", price: "₹10,75,000" },
      ],
      pistols: [
        { name: "Glock 17", caliber: "9mm", category: "Semi-automatic Pistol", image: "/images/glock17.jpg", range: "50m", fireRate: "Semi-auto", magazine: "17 rounds", damage: "Medium", price: "₹85,000" },
        { name: "Desert Eagle", caliber: ".50 AE", category: "Semi-automatic Pistol", image: "/images/desert-eagle.jpg", range: "50m", fireRate: "Semi-auto", magazine: "7 rounds", damage: "High", price: "₹2,45,000" },
      ],
      protectionKits: [
        {
          name: "Death's Kevlar Vest",
          protection: "Level IIIA+",
          image: "https://source.unsplash.com/600x400/?armor,kevlar",
          level: "DEATH",
          material: "Reinforced Kevlar + Steel Plates",
          weight: "3.2kg",
          special: "Blood-stained from Death's previous victims. Enhanced with demonic runes for extra protection.",
          price: "₹6,22,500"
        },
        {
          name: "Skull Crusher Helmet",
          protection: "Level IIIA",
          image: "https://source.unsplash.com/600x400/?helmet,skull",
          level: "SKULL",
          material: "Ballistic Steel + Titanium",
          weight: "1.8kg",
          special: "Features skull engravings that strike fear into enemies. Night vision compatible.",
          price: "₹4,15,000"
        },
        {
          name: "Death's Shadow Armor",
          protection: "Level IV",
          image: "https://source.unsplash.com/600x400/?armor,shadow",
          level: "SHADOW",
          material: "Ceramic Plates + Kevlar Weave",
          weight: "4.5kg",
          special: "Black as Death's shadow. Makes wearer nearly invisible in darkness.",
          price: "₹10,37,500"
        },
        {
          name: "Blood Guard Shield",
          protection: "Level III+",
          image: "https://source.unsplash.com/600x400/?shield,blood",
          level: "GUARDIAN",
          material: "Reinforced Polymer + Steel Core",
          weight: "2.1kg",
          special: "Absorbs impact and channels Death's energy. Red glow intensifies under fire.",
          price: "₹7,47,000"
        },
        {
          name: "Demon Skin Suit",
          protection: "Level II+",
          image: "https://source.unsplash.com/600x400/?armor,demon",
          level: "DEMON",
          material: "Kevlar + Leather + Steel Mesh",
          weight: "2.8kg",
          special: "Flexible armor that moves like demonic skin. Resistant to blades and bullets.",
          price: "₹4,98,000"
        },
        {
          name: "Death's Final Guard",
          protection: "Level IV+",
          image: "https://source.unsplash.com/600x400/?armor,final",
          level: "FINAL",
          material: "Titanium + Ceramic + Kevlar",
          weight: "5.2kg",
          special: "Ultimate protection forged in Death's realm. Can stop armor-piercing rounds.",
          price: "₹14,52,500"
        }
      ],
      rpgBazooka: [
        { name: "RPG-7", caliber: "40mm", type: "Rocket-Propelled Grenade Launcher", range: "200-500m", damage: "Extreme", price: "₹10,35,000", image: "/images/rpg7.jpg", description: "The legendary Soviet RPG-7 is the world's most widely used anti-tank weapon." },
        { name: "M72 LAW", caliber: "66mm", type: "Light Anti-Tank Weapon", range: "200m", damage: "High", price: "₹4,95,000", image: "/images/m72-law.jpg", description: "American disposable anti-tank rocket launcher." },
        { name: "AT4", caliber: "84mm", type: "Anti-Tank Weapon", range: "200m", damage: "Extreme", price: "₹13,25,000", image: "/images/at4.jpg", description: "Swedish disposable anti-tank weapon with superior armor penetration." },
        { name: "Carl Gustaf M4", caliber: "84mm", type: "Recoilless Rifle", range: "400-1000m", damage: "Extreme", price: "₹18,65,000", image: "/images/carl-gustaf.jpg", description: "Swedish recoilless rifle with multiple ammunition types." },
        { name: "Panzerfaust 3", caliber: "110mm", type: "Anti-Tank Weapon", range: "300-600m", damage: "Extreme", price: "₹24,05,000", image: "/images/panzerfaust3.jpg", description: "German anti-tank weapon with tandem warhead." },
        { name: "NLAW", caliber: "150mm", type: "Next-Generation Light Anti-Tank Weapon", range: "20-800m", damage: "Extreme", price: "₹29,85,000", image: "/images/nlaw.jpg", description: "British-Swedish next-generation anti-tank weapon with predictive guidance." },
        { name: "FGM-148 Javelin", caliber: "127mm", type: "Fire-and-Forget Anti-Tank Missile", range: "2500-4750m", damage: "Extreme", price: "₹51,80,000", image: "/images/javelin.jpg", description: "American fire-and-forget anti-tank missile with top-attack capability." },
        { name: "SMAW", caliber: "83.5mm", type: "Shoulder-Launched Multipurpose Assault Weapon", range: "250m", damage: "High", price: "₹15,75,000", image: "/images/smaw.jpg", description: "American multipurpose assault weapon effective against armor, bunkers, and buildings." },
        { name: "RPG-29", caliber: "105mm", type: "Rocket-Propelled Grenade Launcher", range: "500m", damage: "Extreme", price: "₹17,40,000", image: "/images/rpg29.jpg", description: "Russian heavy RPG designed to defeat modern armor with reactive protection." },
        { name: "M3 MAAWS", caliber: "84mm", type: "Multi-Role Anti-Armor Anti-Personnel Weapon System", range: "400-1000m", damage: "Extreme", price: "₹20,75,000", image: "/images/m3-maaws.jpg", description: "American upgraded version of the Carl Gustaf recoilless rifle." }
      ],
    };
    setData(dataMap[type] || []);
  }, [type]);
  return data;
}
