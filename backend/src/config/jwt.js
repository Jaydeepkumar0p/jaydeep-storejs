import jwt from 'jsonwebtoken';

export const genrateToken = (res, userId) => {
    // 1. JWT Signature
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    // 2. Cookie Settings (Corrected for Production)
    res.cookie('jwt', token, {
        // FIX: Corrected typo from 'httponly' to 'httpOnly'
        httpOnly: true, 
        
        // Use 'secure: true' in production (Render uses HTTPS)
        secure: process.env.NODE_ENV !== 'development', 
        
        // Changed to 'Lax' to allow cookies to be sent back 
        // when frontend and backend are on different domains (subdomains)
        sameSite: 'Lax', 
        
        // 30 days in milliseconds
        maxAge: 30 * 24 * 60 * 60 * 1000, 
    });

    return token;
};
