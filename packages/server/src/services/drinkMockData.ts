import { DrinksPageData } from "pages";

const drinks = {
    title: "Drink Menu",
    drinkSections: [
        {
            title: "Emotional",
            icon: "heart",
            optionMenu: [
                {
                    name: "Secret Paradise",
                    price: "3g",
                    desc: "Rum infused with fresh lime mint and sugar."
                },
                {
                    name: "Blueberry Bedtime",
                    price: "15g",
                    desc: "Rum infused with fresh lime mint and sugar."
                },
                {
                    name: "Sweetest Sin",
                    price: "10g",
                    desc: "Rum infused with fresh lime mint and sugar."
                },
                {
                    name: "Mulberry Madness",
                    price: "11g",
                    desc: "Rum infused with fresh lime mint and sugar."
                },
                {
                    name: "Dissociate",
                    price: "3g",
                    desc: "Rum infused with fresh lime mint and sugar."
                }
            ]
        },
        {
            title: "Mythical",
            icon: "mythical",
            optionMenu: [
                {
                    name: "Phoenix Ashes",
                    price: "3g",
                    desc: "Rum infused with fresh lime mint and sugar."
                },
                {
                    name: "Emperor's Tea",
                    price: "3g",
                    desc: "Rum infused with fresh lime mint and sugar."
                },
                {
                    name: "Tyranny of Dragons",
                    price: "3g",
                    desc: "Rum infused with fresh lime mint and sugar."
                },
                {
                    name: "Acidic Basilisk",
                    price: "3g",
                    desc: "Rum infused with fresh lime mint and sugar."
                },
                {
                    name: "Fairy?",
                    price: "3g",
                    desc: "Rum infused with fresh lime mint and sugar."
                }
            ]
        }
    ]
}

export function getDrinks(_: string): DrinksPageData {
    return drinks as DrinksPageData;
  }