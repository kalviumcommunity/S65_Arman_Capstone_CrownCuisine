import MenuCategory from '../models/MenuCategory.js';
import MenuItem from '../models/MenuItem.js';
import Restaurant from '../models/Restaurant.js';
import User from '../models/User.js';

// Create a new menu category
export const createMenuCategory = async (req, res) => {
  try {
    const { name, description, order } = req.body;

    // Find manager's restaurant
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Create category
    const category = await MenuCategory.create({
      name,
      description,
      order,
      restaurant: restaurant._id
    });

    // Add category to restaurant
    restaurant.menuCategories.push(category._id);
    await restaurant.save();

    res.status(201).json(category);
  } catch (error) {
    console.error('Create menu category error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all menu categories for a restaurant
export const getMenuCategories = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const categories = await MenuCategory.find({ restaurant: restaurantId })
      .sort({ order: 1 });

    res.status(200).json(categories);
  } catch (error) {
    console.error('Get menu categories error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update a menu category
export const updateMenuCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, order } = req.body;

    // Find manager's restaurant
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Find category
    const category = await MenuCategory.findOne({
      _id: id,
      restaurant: restaurant._id
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Update fields
    if (name) category.name = name;
    if (description) category.description = description;
    if (order !== undefined) category.order = order;

    const updatedCategory = await category.save();

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error('Update menu category error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a menu category
export const deleteMenuCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Find manager's restaurant
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Find category
    const category = await MenuCategory.findOne({
      _id: id,
      restaurant: restaurant._id
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if category has items
    const items = await MenuItem.find({ category: id });
    if (items.length > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete category with items. Remove all items first.' 
      });
    }

    // Remove category from restaurant
    restaurant.menuCategories = restaurant.menuCategories.filter(
      catId => catId.toString() !== id
    );
    await restaurant.save();

    // Delete category
    await category.remove();

    res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    console.error('Delete menu category error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create a new menu item
export const createMenuItem = async (req, res) => {
  try {
    const { 
      name, 
      description, 
      price, 
      categoryId, 
      image, 
      isAvailable,
      isPopular,
      preparationTime,
      ingredients,
      nutritionalInfo
    } = req.body;

    // Find manager's restaurant
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Verify category belongs to this restaurant
    const category = await MenuCategory.findOne({
      _id: categoryId,
      restaurant: restaurant._id
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Create item
    const item = await MenuItem.create({
      name,
      description,
      price,
      category: categoryId,
      restaurant: restaurant._id,
      image,
      isAvailable,
      isPopular,
      preparationTime,
      ingredients,
      nutritionalInfo
    });

    // Add item to category
    category.items.push(item._id);
    await category.save();

    res.status(201).json(item);
  } catch (error) {
    console.error('Create menu item error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all menu items for a category
export const getMenuItems = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const items = await MenuItem.find({ category: categoryId });

    res.status(200).json(items);
  } catch (error) {
    console.error('Get menu items error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update a menu item
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      description, 
      price, 
      categoryId, 
      image, 
      isAvailable,
      isPopular,
      preparationTime,
      ingredients,
      nutritionalInfo
    } = req.body;

    // Find manager's restaurant
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Find item
    const item = await MenuItem.findOne({
      _id: id,
      restaurant: restaurant._id
    });

    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // If changing category, verify new category belongs to this restaurant
    if (categoryId && categoryId !== item.category.toString()) {
      const newCategory = await MenuCategory.findOne({
        _id: categoryId,
        restaurant: restaurant._id
      });

      if (!newCategory) {
        return res.status(404).json({ message: 'New category not found' });
      }

      // Remove from old category
      const oldCategory = await MenuCategory.findById(item.category);
      if (oldCategory) {
        oldCategory.items = oldCategory.items.filter(
          itemId => itemId.toString() !== id
        );
        await oldCategory.save();
      }

      // Add to new category
      newCategory.items.push(item._id);
      await newCategory.save();
    }

    // Update fields
    if (name) item.name = name;
    if (description) item.description = description;
    if (price) item.price = price;
    if (categoryId) item.category = categoryId;
    if (image) item.image = image;
    if (isAvailable !== undefined) item.isAvailable = isAvailable;
    if (isPopular !== undefined) item.isPopular = isPopular;
    if (preparationTime) item.preparationTime = preparationTime;
    if (ingredients) item.ingredients = ingredients;
    if (nutritionalInfo) item.nutritionalInfo = nutritionalInfo;

    const updatedItem = await item.save();

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Update menu item error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a menu item
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Find manager's restaurant
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Find item
    const item = await MenuItem.findOne({
      _id: id,
      restaurant: restaurant._id
    });

    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Remove from category
    const category = await MenuCategory.findById(item.category);
    if (category) {
      category.items = category.items.filter(
        itemId => itemId.toString() !== id
      );
      await category.save();
    }

    // Remove from user favorites
    await User.updateMany(
      { 'favorites.menus': id },
      { $pull: { 'favorites.menus': id } }
    );

    // Delete item
    await item.remove();

    res.status(200).json({ message: 'Menu item deleted' });
  } catch (error) {
    console.error('Delete menu item error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get popular menu items
export const getPopularItems = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const items = await MenuItem.find({ 
      restaurant: restaurantId,
      isPopular: true,
      isAvailable: true
    }).limit(10);

    res.status(200).json(items);
  } catch (error) {
    console.error('Get popular items error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get complete menu with categories and items for a restaurant
export const getCompleteMenu = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // Get all categories
    const categories = await MenuCategory.find({ restaurant: restaurantId })
      .sort({ order: 1 });

    // Get all items
    const items = await MenuItem.find({ restaurant: restaurantId });

    // Organize items by category
    const menu = categories.map(category => {
      const categoryItems = items.filter(
        item => item.category.toString() === category._id.toString()
      );
      return {
        ...category.toObject(),
        items: categoryItems
      };
    });

    res.status(200).json(menu);
  } catch (error) {
    console.error('Get complete menu error:', error);
    res.status(500).json({ message: error.message });
  }
}; 