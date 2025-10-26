import { useState } from "react";

function category () {
    const categoryArr = [
    { value: "", label: "בחר/י" },
    { value: "weapons", label: "נשק ומקלעים" },
    { value: "roads", label: "דרכים" },
    { value: "ammo", label: "תחמושת" },
    { value: "friendly_fire", label: `ירי דו"צ` },
    { value: "weather", label: "מזג-אוויר" },
    { value: "armored_vehicles", label: `רק"מ וצמ"ה קרביים` },
    { value: "air_cooperation", label: `שת"פ אוויר` },
    { value: "work", label: "עבודה" },
    { value: "air", label: "אוויר" },
    { value: "marine_safety", label: "בטיחות ימי" },
    { value: "sports_extreme", label: "ספורט ואקסטרים" },
    { value: "injuries", label: "נפילות/חבלות" },
    { value: "fire_or_movement", label: "חריגות ירי או תנועה של כוחות בשטחי אימונים" },
    { value: "hazmat", label: `חומ"ס` },
    { value: "non_weapon_ammunition", label: `(אמל"ח) לא נשק /מקלעים` },
    { value: "fire", label: "אש" },
    { value: "combat_training", label: `טג"ח קרבי` },
    { value: "naval_cooperation", label: `שת"פ ים` },
    { value: "rescue_operations", label: "ייעודי עורף /חילוץ והצלה" },
    { value: "low_altitude_equipment", label: "אמצעי רום קרוב לקרקע" },
    { value: "fitness", label: "כושר גופני/קרבי" }
    ];


    const [category, setCategory] = useState(categoryArr[0].value);

    return (
        <label>
        מאפיין תחומי:
        
         <select
            value = {category}
            onChange ={(e) => setCategory(e.target.value)}>
          
            {categoryArr.map((item, index) =>(
                <option 
                    key={index} 
                    value={item.value}
                    disabled={index==0}
                    hidden={index==0}
                >
                 {item.label}
                </option>
            ))}
          </select>
        </label>
    );
}

export default category;