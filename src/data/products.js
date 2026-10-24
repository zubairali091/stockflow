
export const initialProducts = [
  {
    id: "PRD-1001",
    name: "Wireless Mouse",
    category: "Electronics",
    price: 1850,
    quantity: 42,
    supplier: "TechZone",
    initials: "WM",
    color: "blue",
  },
  {
    id: "PRD-1002",
    name: "Office Notebook",
    category: "Stationery",
    price: 250,
    quantity: 4,
    supplier: "Paper World",
    initials: "ON",
    color: "orange",
  },
  {
    id: "PRD-1003",
    name: "USB-C Cable",
    category: "Accessories",
    price: 650,
    quantity: 0,
    supplier: "TechZone",
    initials: "UC",
    color: "purple",
  },
  {
    id: "PRD-1004",
    name: "Keyboard",
    category: "Electronics",
    price: 3200,
    quantity: 18,
    supplier: "Digital Store",
    initials: "KB",
    color: "green",
  },
  {
    id: "PRD-1005",
    name: "Water Bottle",
    category: "General",
    price: 900,
    quantity: 3,
    supplier: "Daily Goods",
    initials: "WB",
    color: "pink",
  },
  {
    id: "PRD-1006",
    name: "Laptop Stand",
    category: "Accessories",
    price: 2800,
    quantity: 25,
    supplier: "TechZone",
    initials: "LS",
    color: "blue",
  },
  {
    id: "PRD-1007",
    name: "Ballpoint Pens",
    category: "Stationery",
    price: 450,
    quantity: 60,
    supplier: "Paper World",
    initials: "BP",
    color: "orange",
  },
  {
    id: "PRD-1008",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 4500,
    quantity: 2,
    supplier: "Digital Store",
    initials: "BS",
    color: "purple",
  },
  {
    id: "PRD-1009",
    name: "Desk Organizer",
    category: "General",
    price: 1200,
    quantity: 15,
    supplier: "Daily Goods",
    initials: "DO",
    color: "green",
  },
  {
    id: "PRD-1010",
    name: "HDMI Cable",
    category: "Accessories",
    price: 1100,
    quantity: 0,
    supplier: "TechZone",
    initials: "HC",
    color: "pink",
  },
  {
    id: "PRD-1011",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 6500,
    quantity: 12,
    supplier: "Digital Store",
    initials: "WH",
    color: "blue",
  },
  {
    id: "PRD-1012",
    name: "Sticky Notes",
    category: "Stationery",
    price: 180,
    quantity: 35,
    supplier: "Paper World",
    initials: "SN",
    color: "orange",
  },
];

export const formatMoney = (amount) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(amount);

export function getStockStatus(quantity) {
  if (quantity === 0) {
    return { label: "Out of Stock", className: "out" };
  }

  if (quantity <= 5) {
    return { label: "Low Stock", className: "low" };
  }

  return { label: "In Stock", className: "in" };
}
