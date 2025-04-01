import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ClipboardList,
    Coffee,
    Clock,
    Calendar,
    Users,
    UtensilsCrossed,
} from "lucide-react";

const OwnerDashboard = () => {
    const [tables, setTables] = useState([
        { id: 1, number: 1, capacity: 4, status: "available" },
        { id: 2, number: 2, capacity: 2, status: "occupied" },
        { id: 3, number: 3, capacity: 6, status: "reserved" },
        { id: 4, number: 4, capacity: 4, status: "available" },
    ]);
    const [newTable, setNewTable] = useState({ number: "", capacity: "" });
    const [tableDialogOpen, setTableDialogOpen] = useState(false);

    const [menuItems, setMenuItems] = useState([
        {
            id: 1,
            name: "Grilled Salmon",
            category: "Main",
            price: 24.99,
            description: "Fresh salmon fillet with seasonal vegetables",
        },
        {
            id: 2,
            name: "Caesar Salad",
            category: "Starter",
            price: 12.99,
            description:
                "Romaine lettuce, croutons, parmesan cheese, and Caesar dressing",
        },
        {
            id: 3,
            name: "Chocolate Cake",
            category: "Dessert",
            price: 8.99,
            description: "Rich chocolate cake with vanilla ice cream",
        },
    ]);
    const [newMenuItem, setNewMenuItem] = useState({
        name: "",
        category: "",
        price: "",
        description: "",
    });
    const [menuDialogOpen, setMenuDialogOpen] = useState(false);

    const handleAddTable = () => {
        if (newTable.number && newTable.capacity) {
            setTables([
                ...tables,
                {
                    id: tables.length + 1,
                    number: parseInt(newTable.number),
                    capacity: parseInt(newTable.capacity),
                    status: "available",
                },
            ]);
            setNewTable({ number: "", capacity: "" });
            setTableDialogOpen(false);
        }
    };

    const handleAddMenuItem = () => {
        if (newMenuItem.name && newMenuItem.category && newMenuItem.price) {
            setMenuItems([
                ...menuItems,
                {
                    id: menuItems.length + 1,
                    name: newMenuItem.name,
                    category: newMenuItem.category,
                    price: parseFloat(newMenuItem.price),
                    description: newMenuItem.description,
                },
            ]);
            setNewMenuItem({
                name: "",
                category: "",
                price: "",
                description: "",
            });
            setMenuDialogOpen(false);
        }
    };

    const handleChangeTableStatus = (tableId, newStatus) => {
        setTables(
            tables.map((table) =>
                table.id === tableId ? { ...table, status: newStatus } : table
            )
        );
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-2">Owner Dashboard</h1>
            <p className="text-muted-foreground mb-6">
                Manage your restaurant's operations efficiently
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Table Management Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Calendar className="mr-2 h-6 w-6" />
                            Table Management
                        </CardTitle>
                        <CardDescription>
                            Manage restaurant tables and reservations
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="h-64 overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Table</TableHead>
                                    <TableHead>Capacity</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tables.map((table) => (
                                    <TableRow key={table.id}>
                                        <TableCell>{table.number}</TableCell>
                                        <TableCell>{table.capacity}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                                    table.status === "available"
                                                        ? "bg-green-100 text-green-800"
                                                        : table.status ===
                                                            "occupied"
                                                          ? "bg-red-100 text-red-800"
                                                          : "bg-blue-100 text-blue-800"
                                                }`}
                                            >
                                                {table.status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    table.status.slice(1)}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                defaultValue={table.status}
                                                onValueChange={(value) =>
                                                    handleChangeTableStatus(
                                                        table.id,
                                                        value
                                                    )
                                                }
                                            >
                                                <SelectTrigger className="w-[130px] cursor-pointer">
                                                    <SelectValue placeholder="Change status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem
                                                        className="cursor-pointer"
                                                        value="available"
                                                    >
                                                        Available
                                                    </SelectItem>
                                                    <SelectItem
                                                        className="cursor-pointer"
                                                        value="occupied"
                                                    >
                                                        Occupied
                                                    </SelectItem>
                                                    <SelectItem
                                                        className="cursor-pointer"
                                                        value="reserved"
                                                    >
                                                        Reserved
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <Dialog
                            open={tableDialogOpen}
                            onOpenChange={setTableDialogOpen}
                        >
                            <DialogTrigger asChild>
                                <Button className="w-full cursor-pointer">
                                    Add New Table
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Table</DialogTitle>
                                    <DialogDescription>
                                        Enter the details for the new table.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="tableNumber"
                                            className="text-right"
                                        >
                                            Table Number
                                        </Label>
                                        <Input
                                            id="tableNumber"
                                            className="col-span-3"
                                            type="number"
                                            value={newTable.number}
                                            onChange={(e) =>
                                                setNewTable({
                                                    ...newTable,
                                                    number: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="capacity"
                                            className="text-right"
                                        >
                                            Capacity
                                        </Label>
                                        <Input
                                            id="capacity"
                                            className="col-span-3"
                                            type="number"
                                            value={newTable.capacity}
                                            onChange={(e) =>
                                                setNewTable({
                                                    ...newTable,
                                                    capacity: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        className="cursor-pointer"
                                        onClick={handleAddTable}
                                    >
                                        Add Table
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>

                {/* Menu Management Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <UtensilsCrossed className="mr-2 h-6 w-6" />
                            Menu Management
                        </CardTitle>
                        <CardDescription>
                            Update and manage your restaurant's menu
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="h-64 overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {menuItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">
                                            {item.name}
                                        </TableCell>
                                        <TableCell>{item.category}</TableCell>
                                        <TableCell>
                                            ${item.price.toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <Dialog
                            open={menuDialogOpen}
                            onOpenChange={setMenuDialogOpen}
                        >
                            <DialogTrigger asChild>
                                <Button className="w-full cursor-pointer">
                                    Add Menu Item
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Menu Item</DialogTitle>
                                    <DialogDescription>
                                        Enter the details for the new menu item.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="itemName"
                                            className="text-right"
                                        >
                                            Name
                                        </Label>
                                        <Input
                                            id="itemName"
                                            className="col-span-3"
                                            value={newMenuItem.name}
                                            onChange={(e) =>
                                                setNewMenuItem({
                                                    ...newMenuItem,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="category"
                                            className="text-right"
                                        >
                                            Category
                                        </Label>
                                        <Select
                                            onValueChange={(value) =>
                                                setNewMenuItem({
                                                    ...newMenuItem,
                                                    category: value,
                                                })
                                            }
                                        >
                                            <SelectTrigger className="col-span-3 cursor-pointer">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem
                                                    className="cursor-pointer"
                                                    value="Starter"
                                                >
                                                    Starter
                                                </SelectItem>
                                                <SelectItem
                                                    className="cursor-pointer"
                                                    value="Main"
                                                >
                                                    Main
                                                </SelectItem>
                                                <SelectItem
                                                    className="cursor-pointer"
                                                    value="Side"
                                                >
                                                    Side
                                                </SelectItem>
                                                <SelectItem
                                                    className="cursor-pointer"
                                                    value="Dessert"
                                                >
                                                    Dessert
                                                </SelectItem>
                                                <SelectItem
                                                    className="cursor-pointer"
                                                    value="Drink"
                                                >
                                                    Drink
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="price"
                                            className="text-right"
                                        >
                                            Price
                                        </Label>
                                        <Input
                                            id="price"
                                            className="col-span-3"
                                            type="number"
                                            step="0.01"
                                            value={newMenuItem.price}
                                            onChange={(e) =>
                                                setNewMenuItem({
                                                    ...newMenuItem,
                                                    price: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="description"
                                            className="text-right"
                                        >
                                            Description
                                        </Label>
                                        <Input
                                            id="description"
                                            className="col-span-3"
                                            value={newMenuItem.description}
                                            onChange={(e) =>
                                                setNewMenuItem({
                                                    ...newMenuItem,
                                                    description: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        className="cursor-pointer"
                                        onClick={handleAddMenuItem}
                                    >
                                        Add Item
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>

                {/* Inventory Management Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <ClipboardList className="mr-2 h-6 w-6" />
                            Inventory Management
                        </CardTitle>
                        <CardDescription>
                            Track and manage your restaurant's inventory
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="h-64 flex items-center justify-center">
                        <div className="text-center">
                            <Coffee className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">
                                Under Construction
                            </h3>
                            <p className="text-muted-foreground">
                                This feature is coming soon!
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button disabled className="w-full">
                            Manage Inventory
                        </Button>
                    </CardFooter>
                </Card>

                {/* Staff Scheduling Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Users className="mr-2 h-6 w-6" />
                            Staff Scheduling
                        </CardTitle>
                        <CardDescription>
                            Manage employee schedules and shifts
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="h-64 flex items-center justify-center">
                        <div className="text-center">
                            <Clock className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">
                                Under Construction
                            </h3>
                            <p className="text-muted-foreground">
                                This feature is coming soon!
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button disabled className="w-full">
                            Manage Staff
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default OwnerDashboard;
