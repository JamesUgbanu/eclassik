

class UserMiddleware {
  static checkRole(role) {
    return function(req, res, next) {
      const assignedRoles = req.user['http://localhost:3000/roles'];
      if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
        return next();
      }
      return res.status(401).json({
        status: 401,
        error: 'Insufficient role',
      });
    };
  }
}

export default UserMiddleware;