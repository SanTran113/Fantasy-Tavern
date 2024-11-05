import { InventoryPageData } from "pages";

const inventory = {
  name: "Naga",
  userClass: "SpirtMaster",
  inventory: ["Item 1", "Item 2", "Item 3", "Item 4"],
};

export function getInventory(_: string): InventoryPageData {
  return inventory as InventoryPageData;
}
