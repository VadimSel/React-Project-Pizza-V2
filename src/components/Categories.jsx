import React, { useState } from "react";

export function Categories() {
    const [activeIndex, setActiveIndex] = useState(0);

    const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

    return (
        <div className="categories">
            <ul>
                {categories.map((value, i) => {
                    return (
                        <li
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={activeIndex === i ? "active" : ""}
                        >
                            {value}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
