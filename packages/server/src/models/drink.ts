export interface Drinks {
    title: string; //title "Drink Menu"
    drinkSections: Array<DrinkSection>; //will have 2 sections
}

export interface DrinkSection {
    title: string;
    icon: string;
    optionMenu: Array<Option>; // will have 5 options
}

export interface Option {
    name: string;
    price: string;
    desc: string;
}
