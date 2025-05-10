import mongoose from 'mongoose';

const menuCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem'
      }
    ],
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const MenuCategory = mongoose.models.MenuCategory || mongoose.model('MenuCategory', menuCategorySchema);

export default MenuCategory; 