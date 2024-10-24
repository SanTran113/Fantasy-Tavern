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
                    name: "Secret Paradise",
                    price: "3g",
                    desc: "Rum infused with fresh lime mint and sugar."
                },
                {
                    name: "Secret Paradise",
                    price: "3g",
                    desc: "Rum infused with fresh lime mint and sugar."
                },
                {
                    name: "Secret Paradise",
                    price: "3g",
                    desc: "Rum infused with fresh lime mint and sugar."
                },
                {
                    name: "Secret Paradise",
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
                    name: "Secret Paradise",
                    price: "3g",
                    desc: "Rum infused with fresh lime mint and sugar."
                },
                {
                    name: "Secret Paradise",
                    price: "3g",
                    desc: "Rum infused with fresh lime mint and sugar."
                },
                {
                    name: "Secret Paradise",
                    price: "3g",
                    desc: "Rum infused with fresh lime mint and sugar."
                },
                {
                    name: "Secret Paradise",
                    price: "3g",
                    desc: "Rum infused with fresh lime mint and sugar."
                },
                {
                    name: "Secret Paradise",
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