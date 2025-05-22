// Define roles
const ROLES = {
  ADMIN: 1,      // Can access all routes
  MANAGER: 2,    // Can access crew, certificates, contracts, documents
  FINANCE: 3     // Can only access payroll
};

// Define route permissions map
const routePermissions = {
  // Dashboard route accessible by all authenticated users
  '/': [ROLES.ADMIN, ROLES.MANAGER, ROLES.FINANCE],
  
  // Admin-only routes
  '/danh-sach-user': [ROLES.ADMIN],
  
  // Manager routes (crew, certificates, contracts, documents)
  '/danh-sach-thuyen-vien': [ROLES.ADMIN, ROLES.MANAGER],
  '/them-thuyen-vien': [ROLES.ADMIN, ROLES.MANAGER],
  '/thuyen-vien': [ROLES.ADMIN, ROLES.MANAGER],
  '/cer-expiring': [ROLES.ADMIN, ROLES.MANAGER],
  '/cer-expired': [ROLES.ADMIN, ROLES.MANAGER],
  '/con-list': [ROLES.ADMIN, ROLES.MANAGER],
  '/con-expiring': [ROLES.ADMIN, ROLES.MANAGER],
  '/con-expired': [ROLES.ADMIN, ROLES.MANAGER],
  '/list-job': [ROLES.ADMIN, ROLES.MANAGER],
  '/list-ship': [ROLES.ADMIN, ROLES.MANAGER],
  '/list-cer': [ROLES.ADMIN, ROLES.MANAGER],

  '/api/chung-chi': [ROLES.ADMIN, ROLES.MANAGER],
  
  // Finance routes
  '/payroll': [ROLES.ADMIN, ROLES.FINANCE],
};

// Helper function to check if a role has access to a route
const hasAccess = (role, path) => {
  // Admin can access everything
  if (Number(role) === ROLES.ADMIN) return true;
  
  // For specific paths like /thuyen-vien/{id}, we need to check the base route
  const basePath = '/' + path.split('/')[1];
  
  console.log('Base Path:', basePath);
  console.log('Role:', role);
  console.log('Path:', path);
  console.log('Route Permissions:', routePermissions);

  // Check if the route is defined in permissions
  if (routePermissions[path]) {
    return routePermissions[path].includes(Number(role));
  }
  
  // Check if the base path is defined in permissions
  if (routePermissions[basePath]) {
    return routePermissions[basePath].includes(Number(role));
  }
  
  // Default: deny access
  return false;
};

module.exports = {
  ROLES,
  hasAccess
};
