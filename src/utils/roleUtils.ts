export interface MenuItem {
  name: string;
  path: string;
  roles: string[];
  icon: string;
}
export const menuItems: MenuItem[] = [{
  name: 'Dashboard',
  path: '/dashboard',
  roles: ['Manager'],
  icon: '📊'
}, {
  name: 'Products',
  path: '/products',
  roles: ['Manager', 'StoreKeeper'],
  icon: '📦'
}, {
  name: 'Settings',
  path: '/settings',
  roles: ['Manager'],
  icon: '⚙️'
}];
export const filterMenuByRole = (role: string): MenuItem[] => {
  return menuItems.filter(item => item.roles.includes(role));
};
export const hasAccess = (role: string, allowedRoles: string[]): boolean => {
  return allowedRoles.includes(role);
};