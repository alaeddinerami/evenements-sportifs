export default()=>({
    jwt:{
        secret: process.env.JWT_SECRET,
    },
    db:{
        connectionString: process.env.MONGO_URL
    }
})