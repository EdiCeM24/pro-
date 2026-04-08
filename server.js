import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import { PORT } from './config/env.js';
import sequelize from './database/dbConnect.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';



// IMPORT ROUTES
import authRoute from'./routes/auth.route.js';
import productsRouter from './routes/pro.route.js';
import adminRouter from './routes/admin.route.js';
import dashboardRouter from './routes/dashboard.route.js';
import cateRoute from './routes/category.route.js';



const app = express();
const port = PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join('public')));


app.set('views', path.join('views'));
app.set('view engine', 'ejs');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 3 * 1024 * 1024 // 3MB in bytes
    },
});


app.post('/uploads', upload.single('image'), (req, res) => {
    const image = req.body.image
    res.send('Image upload successfully!', { image });
});

app.get('/home', (req, res) => {
    res.send('Hello World!');
})

app.use('/api/v2/auth', authRoute);
app.use('/api/v2/product', productsRouter);
app.use('/api/v2/admin', adminRouter);
app.use('/api/v2/dash', dashboardRouter);
app.use('/api/v2/category', cateRoute);
//app.use('/api/v2/users', usersRoute);
//app.use('/api/v2/pay', payRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


sequelize.sync({ alter: true })
.then(() => {
    console.log('Database synced!');
    app.listen(port, () => {
       console.log(`Server running on port localhost:${port}`);
    });
}).catch((err) => {
    console.error(`Error syncing database: ${err}`);
})

// export default server;