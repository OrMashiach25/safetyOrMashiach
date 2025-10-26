import { useState } from "react";

function category () {
    const categoryArr = [
    ,"בחר/י", "נשק ומקלעים ","דרכים","תחמושת",`ירי דו" צ`,"מזג-אוויר",`רק"מ וצמ"ה קרביים`,`שת"פ אוויר`,"עבודה"
    ,"אוויר","בטיחות ימי","ספורט ואקסטרים","נפילות/חבלות","חריגות ירי או תנועה של כוחות בשטחי אימונים",`חומ"ס`
    ,`(אמל"ח ) לא נשק /מקלעים`,"אש",`טג"ח קרבי`,`שת"פ ים `,"ייעודי עורף /חילוץ והצלה","אמצעי רום קרוב לקרקע"
    ,"כושר גופני/ קרבי"];

    const [category, setCategory] = useState(categoryArr[0]);

    return (
        <label>
        מאפיין תחומי:
        
         <select
            value = {category}
            onChange ={(e) => setCategory(e.target.value)}>
          
            {categoryArr.map((level, index) =>(
                <option 
                    key={index} 
                    value={level}
                    disabled={index==0}
                    hidden={index==0}
                >
                 {level}
                </option>
            ))}
          </select>
        </label>
    );
}

export default category;