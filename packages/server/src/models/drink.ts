export interface Drinks {
    title: String; //title "Drink Menu"
    drinkSections: Array<DrinkSection>; //will have 2 sections
}

export interface DrinkSection {
    title: String;
    icon: String;
    optionMenu: Array<Option>; // will have 5 options
}

export interface Option {
    name: String;
    price: String;
    desc: String;
}
