export interface Option{
    value: string;
    label: string;
    isDefault?:boolean;
}

export const activityTypeArr: Option[] = [
    { value: "", label: "בחר/י", isDefault: true },
    { value: "combat", label: "פעילות מבצעית/לחימה" },
    { value: "training", label: "אימון" },
    { value: "course", label: "הכשרה" },
    { value: "routine", label: "שגרה" },
    { value: "leisure", label: "פנאי" },
    { value: "vacation", label: "חופשה" }
    ];

export const categoryArr: Option[] = [
    { value: "", label: "בחר/י", isDefault: true},
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

export const eventSeverityArr: Option[] = [
    {value:"", label:"בחר/י", isDefault: true},
    {value:"low", label:"קל"},
    {value:"medium", label:"בינוני"},
    {value:"high", label:" חמור"}
    ];

export const locationArr: Option[] = [
    { value: "", label: "בחר/י", isDefault: true },
    { value: "base", label: "בסיס" },
    { value: "civilian_area", label: "שטח אזרחי" },
    { value: "firing_zone", label: "שטח אש" },
    { value: "dock", label: "רציף" }
    ];

export const resultsArr: Option[] = [
    { value: "", label: "בחר/י", isDefault: true },
    { value: "no_injury_no_damage", label: "(א.נ.א.נ) אין נפגעים, אין נזק" },
    { value: "no_injury_with_damage", label: "(א.נ.י.נ) אין נפגעים, יש נזק" },
    { value: "with_injury_no_damage", label: "(י.נ.א.נ) יש נפגעים, אין נזק" },
    { value: "with_injury_with_damage", label: "(י.נ.י.נ) יש נפגעים, יש נזק" }
    ];

export const injuriesLevelArr: Option[] = [
    { value: "", label: "בחר/י", isDefault: true },
    { value: "none", label: "ללא פגיעה" },
    { value: "minor_no_hospital", label: "(פגוע קל) ללא אשפוז" },
    { value: "minor_hospitalized", label: "(פגוע קל) שאושפז" },
    { value: "moderate", label: "פגוע בינוני" },
    { value: "severe", label: "פגוע קשה/אנוש" },
    { value: "fatal", label: "חלל" }
    ];

export const unitActivityTypeArr: Option[] = [
  { value: "", label: "בחר/י", isDefault: true },
  { value: "taam", label: "תע\"ם" },
  { value: "training", label: "אימונים" },
  { value: "course", label: "הכשרה" },
  { value: "rest_admin", label: "רגיעה / מנהלה" },
  { value: "war_operation", label: "מלחמה / מבצע צבאי נרחב" }
];

export const weatherArr: Option[] = [
    { value: "", label: "בחר/י", isDefault: true },
    { value: "heatwave", label: "שרב / עומס חום" },
    { value: "snow", label: "שלג" },
    { value: "sandstorm", label: "סופת חול" },
    { value: "rain", label: "גשם" },
    { value: "fog", label: "ערפל" },
    { value: "ice", label: "התקרחות" },
    { value: "hail", label: "ברד" },
    { value: "clear", label: "נאה" },
    { value: "wind", label: "רוח" },
    { value: "rough_sea", label: "ים סוער" },
    { value: "calm_water", label: "מים שקטים" }
    ];