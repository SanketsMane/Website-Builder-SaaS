import { cn } from "../../lib/utils"
import { TrendingUp, ShoppingBag, Package, DollarSign, Plus, BarChart3, Settings, Store, Home, Layout, Ticket, ClipboardList, LogOut, ExternalLink, ChevronDown } from "lucide-react"

const DashboardMockup = ({ className }) => {
  return (
    <div className={cn("w-full bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-300", className)}>
      {/* Browser Bar */}
      <div className="h-6 bg-gray-100 dark:bg-gray-800 flex items-center px-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white dark:bg-gray-700 px-3 py-0.5 rounded text-xs text-gray-600 dark:text-gray-300 font-mono border dark:border-gray-600">
            sellpoint.io/dashboard
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex h-[600px]">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="p-4">
            {/* Store Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                    <Store className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white text-sm">My Store</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="space-y-1">
              <div className="px-3 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center space-x-3 border border-indigo-200 dark:border-indigo-800">
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Home</span>
              </div>
              <div className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center space-x-3 transition-colors">
                <Layout className="w-4 h-4" />
                <span className="text-sm">Design</span>
              </div>
              <div className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center space-x-3 transition-colors">
                <Package className="w-4 h-4" />
                <span className="text-sm">Products</span>
              </div>
              <div className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center space-x-3 transition-colors">
                <Ticket className="w-4 h-4" />
                <span className="text-sm">Coupons</span>
              </div>
              <div className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center space-x-3 transition-colors">
                <ClipboardList className="w-4 h-4" />
                <span className="text-sm">Orders</span>
              </div>
              <div className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center space-x-3 transition-colors">
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm">Analytics</span>
              </div>
              <div className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center space-x-3 transition-colors">
                <Settings className="w-4 h-4" />
                <span className="text-sm">Settings</span>
              </div>
            </nav>
            
            {/* Bottom Actions */}
            <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-1">
                <div className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center space-x-3 transition-colors text-sm">
                  <ExternalLink className="w-4 h-4" />
                  <span>Visit Store</span>
                </div>
                <div className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center space-x-3 transition-colors text-sm">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white dark:bg-gray-900">
          {/* Top Navigation Bar */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening with your store.</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-full">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Total Revenue */}
              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DollarSign className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Revenue</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">$12,847.50</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              {/* Total Orders */}
              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ShoppingBag className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Orders</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">234</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Package className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Products</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">48</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              {/* Growth Rate */}
              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Growth Rate</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">+12.5%</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Recent Orders</h3>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">#ORD-001</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">John Doe - 2 items</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-900 dark:text-white font-medium">$89.99</div>
                    </div>
                  </li>
                  <li className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">#ORD-002</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Jane Smith - 1 item</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-900 dark:text-white font-medium">$124.50</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { DashboardMockup }