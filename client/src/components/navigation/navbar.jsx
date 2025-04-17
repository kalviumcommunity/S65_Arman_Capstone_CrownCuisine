import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-stone-200/80 backdrop-blur-md border-none shadow-none rounded-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <NavigationMenu className="flex items-center justify-center rounded-md">
          <NavigationMenuList className="space-x-2 rounded-md">
            <NavigationMenuItem className="rounded-md">
              <NavigationMenuTrigger className="text-stone-900 transition-colors font-medium text-base bg-stone-200 rounded-md">
                Restaurants
              </NavigationMenuTrigger>
              <NavigationMenuContent className="rounded-md">
                <div className="grid grid-cols-2 w-[500px] gap-2 p-1 rounded-md">
                  <Link
                    href="/restaurants"
                    className="block select-none space-y-1 rounded-md p-3 hover:bg-stone-100"
                  >
                    <div className="font-medium">Nearby Restaurants</div>
                    <div className="text-sm text-stone-500">
                      Find great nearby places to eat based on your current location and
                      preferences.
                    </div>
                  </Link>
                  <Link
                    href="/restaurants"
                    className="block select-none space-y-1 rounded-md p-3 hover:bg-stone-100"
                  >
                    <div className="font-medium">Popular Restaurants</div>
                    <div className="text-sm text-stone-500">
                      Check out the most popular restaurants people are visiting and loving right
                      now.
                    </div>
                  </Link>
                  <Link
                    href="/restaurants"
                    className="block select-none space-y-1 rounded-md p-3 hover:bg-stone-100"
                  >
                    <div className="font-medium">All Restaurants</div>
                    <div className="text-sm text-stone-500">
                      Browse every restaurant listed in our directory, with filters to narrow
                      down results.
                    </div>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="rounded-md">
              <NavigationMenuTrigger className="text-stone-900 transition-colors font-medium text-base bg-transparent hover:bg-transparent rounded-md">
                Customers
              </NavigationMenuTrigger>
              <NavigationMenuContent className="rounded-md">
                <div className="grid grid-cols-2 w-[500px] gap-2 p-1 rounded-md">
                  <Link
                    href="/customer/profile"
                    className="block select-none space-y-1 rounded-md p-3 hover:bg-stone-100"
                  >
                    <div className="font-medium">Dashboard</div>
                    <div className="text-sm text-stone-500">
                      View and update your personal information quickly and easily from your
                      dashboard here.
                    </div>
                  </Link>
                  <Link
                    href="/customer/reservations"
                    className="block select-none space-y-1 rounded-md p-3 hover:bg-stone-100"
                  >
                    <div className="font-medium">Reservations</div>
                    <div className="text-sm text-stone-500">
                      See your table bookings and make changes to your reservations whenever you
                      want.
                    </div>
                  </Link>
                  <Link
                    href="/customer/favorites"
                    className="block select-none space-y-1 rounded-md p-3 hover:bg-stone-100"
                  >
                    <div className="font-medium">Favorites</div>
                    <div className="text-sm text-stone-500">
                      Check your saved restaurants and dishes that you like the most for easy
                      access.
                    </div>
                  </Link>
                  <Link
                    href="/customer/favorites"
                    className="block select-none space-y-1 rounded-md p-3 hover:bg-stone-100"
                  >
                    <div className="font-medium">Coupons</div>
                    <div className="text-sm text-stone-500">
                      Find and use your available discount coupons for your favorite restaurants
                      and dishes.
                    </div>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="rounded-md">
              <NavigationMenuTrigger className="text-stone-900 transition-colors font-medium text-base bg-transparent hover:bg-transparent rounded-md">
                Operations
              </NavigationMenuTrigger>
              <NavigationMenuContent className="rounded-md">
                <div className="grid grid-cols-2 w-[500px] gap-2 p-1 rounded-md">
                  <Link
                    href="/owner/dashboard"
                    className="block select-none space-y-1 rounded-md p-3 hover:bg-stone-100"
                  >
                    <div className="font-medium">Dashboard</div>
                    <div className="text-sm text-stone-500">
                      View and track your restaurant's key metrics and performance in one place.
                    </div>
                  </Link>
                  <Link
                    href="/owner"
                    className="block select-none space-y-1 rounded-md p-3 hover:bg-stone-100"
                  >
                    <div className="font-medium">Menu Management</div>
                    <div className="text-sm text-stone-500">
                      Easily add, update, or remove menu items to keep your offerings current.
                    </div>
                  </Link>
                  <Link
                    href="/owner/restaurant"
                    className="block select-none space-y-1 rounded-md p-3 hover:bg-stone-100"
                  >
                    <div className="font-medium">Restaurant Settings</div>
                    <div className="text-sm text-stone-500">
                      Update your restaurant's profile, contact information, and other important
                      settings.
                    </div>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="rounded-md">
              <NavigationMenuTrigger className="text-stone-900 transition-colors font-medium text-base bg-transparent hover:bg-transparent rounded-md">
                Donations
              </NavigationMenuTrigger>
              <NavigationMenuContent className="rounded-md">
                <div className="grid grid-cols-2 w-[500px] gap-2 p-1 rounded-md">
                  <div className="relative col-span-1 h-[232px] rounded-md">
                    <Image 
                      src="/images/donations.jpg" 
                      alt="Food donation campaign"
                      fill
                      className="object-cover rounded-md"
                      priority
                    />
                  </div>
                  <div className="col-span-1 flex flex-col space-y-2">
                    <Link
                      href="/donations/current"
                      className="block select-none space-y-1 rounded-md p-3 hover:bg-stone-100"
                    >
                      <div className="font-medium">Current Campaigns</div>
                      <div className="text-sm text-stone-500">
                      See ongoing donation events and easily give help to people who really need it.
                      </div>
                    </Link>
                    <Link
                      href="/donations/start"
                      className="block select-none space-y-1 rounded-md p-3 hover:bg-stone-100"
                    >
                      <div className="font-medium">Start Campaign</div>
                      <div className="text-sm text-stone-500">
                      Make your own food drive and provide assistance to hungry members in your neighborhood.
                      </div>
                    </Link>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}