import { cn } from "../../lib/utils"
import { TrendingUp, ShoppingBag, Users, DollarSign, Plus, Edit, Package, BarChart3, Settings, Store, Home, Layout, Ticket, ClipboardList, LogOut, ExternalLink, ChevronDown } from "lucide-react"

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
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Products</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">48</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              {/* Customers */}
              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Customers</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">1,205</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Revenue Overview</h3>
                  <select className="text-sm border dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
              
                {/* Mock Chart */}
                <div className="h-32 bg-gradient-to-t from-blue-50 dark:from-blue-900/20 to-transparent rounded flex items-end space-x-2 px-4">
                  <div className="w-8 bg-blue-500 dark:bg-blue-400 rounded-t" style={{height: '40%'}}></div>
                  <div className="w-8 bg-blue-500 dark:bg-blue-400 rounded-t" style={{height: '60%'}}></div>
                  <div className="w-8 bg-blue-500 dark:bg-blue-400 rounded-t" style={{height: '80%'}}></div>
                  <div className="w-8 bg-blue-500 dark:bg-blue-400 rounded-t" style={{height: '90%'}}></div>
                  <div className="w-8 bg-blue-500 dark:bg-blue-400 rounded-t" style={{height: '70%'}}></div>
                  <div className="w-8 bg-blue-500 dark:bg-blue-400 rounded-t" style={{height: '85%'}}></div>
                  <div className="w-8 bg-blue-500 dark:bg-blue-400 rounded-t" style={{height: '95%'}}></div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
                  <button className="text-blue-600 dark:text-blue-400 text-sm hover:text-blue-800 dark:hover:text-blue-300">View all</button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">#ORD-001</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">John Doe</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">$89.99</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">#ORD-002</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Jane Smith</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">$124.50</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">#ORD-003</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Mike Johnson</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">$67.25</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { DashboardMockup }