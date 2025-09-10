// src/pages/RPGBazooka.jsx
import useArmouryData from "../hooks/useArmouryData";

export default function RPGBazooka() {
  const rpgs = useArmouryData("rpgBazooka");
  return (
    <div className="p-10">
      <h2 className="text-2xl mb-6">Armoury: RPG/Bazuka</h2>
      <ul>
        {rpgs.map((rpg, idx) => (
          <li key={idx} className="mb-4 bg-yellow-200 p-4 rounded shadow">
            <span className="text-xl font-semibold">{rpg.name}</span>
            <span className="ml-4 text-gray-700">Caliber: {rpg.caliber}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
