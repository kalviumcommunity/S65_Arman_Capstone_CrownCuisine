"use client";

import { instrumentSerif } from "@/app/fonts";
import { List, Plus, MagnifyingGlass, Pencil } from "@phosphor-icons/react";

const menuCategories = [
  { id: 1, name: "Appetizers" },
  { id: 2, name: "Main Courses" },
  { id: 3, name: "Desserts" },
  { id: 4, name: "Beverages" },
];

const menuItems = [
  { 
    id: 1, 
    name: "Crispy Calamari", 
    category: "Appetizers",
    price: 12.99,
    description: "Lightly fried calamari served with lemon aioli",
    popular: true,
  },
  { 
    id: 2, 
    name: "Bruschetta", 
    category: "Appetizers",
    price: 9.99,
    description: "Toasted bread topped with tomatoes, basil, and olive oil",
    popular: false,
  },
  { 
    id: 3, 
    name: "Grilled Salmon", 
    category: "Main Courses",
    price: 24.99,
    description: "Fresh Atlantic salmon with roasted vegetables",
    popular: true,
  },
  { 
    id: 4, 
    name: "Beef Tenderloin", 
    category: "Main Courses",
    price: 32.99,
    description: "8oz tenderloin with mashed potatoes and seasonal vegetables",
    popular: true,
  },
  { 
    id: 5, 
    name: "Tiramisu", 
    category: "Desserts",
    price: 8.99,
    description: "Classic Italian dessert with espresso-soaked ladyfingers",
    popular: false,
  },
];

export default function Menu() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`${instrumentSerif.className} text-2xl font-medium flex items-center gap-2`}>
          <List size={24} weight="fill" className="text-stone-700" />
          Menu Management
        </h2>
        <div className="flex gap-4">
          <div className="relative">
            <MagnifyingGlass size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search menu items..." 
              className="pl-9 pr-4 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-stone-500"
            />
          </div>
          <button className="bg-stone-800 hover:bg-stone-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus size={18} />
            Add Item
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-48 shrink-0">
          <h3 className="font-medium text-stone-900 mb-3">Categories</h3>
          <div className="space-y-2">
            {menuCategories.map(category => (
              <button 
                key={category.id}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-stone-100 text-stone-700 text-sm font-medium transition-colors"
              >
                {category.name}
              </button>
            ))}
            <button className="w-full text-left px-4 py-2 rounded-lg bg-stone-100 text-stone-800 text-sm font-medium border border-dashed border-stone-300 flex items-center justify-center gap-1">
              <Plus size={14} />
              Add Category
            </button>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="bg-stone-50 rounded-lg border border-stone-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-stone-100">
                  <th className="text-left py-3 px-4 text-sm font-medium text-stone-600 border-b border-stone-200">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-stone-600 border-b border-stone-200">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-stone-600 border-b border-stone-200">Price</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-stone-600 border-b border-stone-200">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-stone-600 border-b border-stone-200"></th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50 border-b border-stone-200 last:border-b-0">
                    <td className="py-3 px-4 font-medium">{item.name}</td>
                    <td className="py-3 px-4 text-stone-600">{item.category}</td>
                    <td className="py-3 px-4">${item.price.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      {item.popular && (
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          Popular
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-stone-500 hover:text-stone-800">
                        <Pencil size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 