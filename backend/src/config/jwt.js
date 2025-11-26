import jwt from 'jsonwebtoken';

export const genrateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    res.cookie('jwt', token, {
        // FIX 1: Corrected typo from 'httponly' to 'httpOnly'
        httpOnly: true, 
        
        // This is correct: sets 'secure' flag when not in local development
        secure: process.env.NODE_ENV !== 'development', 
        
        // FIX 2: Changed to 'Lax' for deployment stability (frontend/backend on different origins)
        sameSite: 'Lax', 
        
        // 30 days in milliseconds
        maxAge: 30 * 24 * 60 * 60 * 1000, 
    });

    return token;
}
