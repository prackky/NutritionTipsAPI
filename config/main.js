module.exports = {  
    // Secret key for JWT signing and encryption
    'secret': 'super secret passphrase',
    // Database connection information
    'database': process.env.MONGODB_URI,
    // Setting port for server
    'port': process.env.PORT || 3000,
    //Setting port for REDIS
    'REDIS_PORT': process.env.REDIS_PORT || 18315,
    //Setting host for REDIS
    'REDIS_HOST': process.env.REDIS_HOST || '127.0.0.1'
  }