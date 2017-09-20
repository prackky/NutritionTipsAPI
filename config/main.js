module.exports = {  
    // Secret key for JWT signing and encryption
    'secret': 'super secret passphrase',
    // Database connection information
    'database': process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
    //youtube access token
    'YOUTUBE_ACCESS_TOKEN': process.env.YOUTUBE_ACCESS_TOKEN,
    // Setting port for server
    'port': process.env.PORT || 3000,
    //Setting port for REDIS
    'REDIS_PORT': process.env.REDIS_PORT || 6379,
    //Setting host for REDIS
    'REDIS_HOST': process.env.REDIS_HOST || '127.0.0.1'
  }