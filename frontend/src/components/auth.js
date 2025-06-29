export const isAuthenticated = () => {
  try {
    const currentUser = localStorage.getItem('currentUser');
    return !!currentUser && !!JSON.parse(currentUser)?._id;
  } catch {
    return false;
  }
};

export const getCurrentUser = () => {
  try {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  } catch {
    return null;
  }
};
export const getWithdrawHistory = () => {
  try {
    const dashboardData = localStorage.getItem('dashboardData');
    if (!dashboardData) return null;

    const parsedData = JSON.parse(dashboardData);
    return parsedData?.data?.withdrawalHistory || null;
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('dashboardData')
};