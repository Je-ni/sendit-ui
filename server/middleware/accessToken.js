import jwt from 'jsonwebtoken';

export const setToken = (payload) => {
  const tokenTime = 60 * 60 * 24 * 30; // expires in 30 days
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: tokenTime
  });
  return token;
};

// eslint-disable-next-line consistent-return
export const authorize = (roles = []) => (req, res, next) => {
  try {
    const accessToken = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = jwt.verify(accessToken, process.env.SECRET);
    req.userData = data;
    if (!roles.includes('user') && !data.admin) return res.status(401).json({ status: 401, error: 'user auth failed' });
    next();
  } catch (error) {
    return res.status(401).json({ status: 401, error: 'user auth failed' });
  }
};
