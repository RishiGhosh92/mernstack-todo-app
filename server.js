//Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

//MongoDB connection
//const CLOUD_MONGODB_URI = 'mongodb+srv://rg258:todoApp@tododb.hjaiq.mongodb.net/todoDB?retryWrites=true&w=majority';
const LOCAL_MONGODB_URI = 'mongodb://localhost/todoDB';

mongoose.connect(process.env.MONGODB_URI || LOCAL_MONGODB_URI , {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
	console.log('Mongoose is connected');
});

// //Saving data to out Mongo Database
// const data = {
// 	title: 'Welcome to toDo App',
// 	body: 'I help manage tasks and schedules'
// };
// const newBlogPost = new BlogPost(data); //instance of model
// newBlogPost.save(error => {
// 	if(error) {
// 		console.log('Something wrong happened');
// 	} else {
// 		console.log('Data has been saved');
// 	}
// });

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//HTTP request logger
app.use(morgan('tiny'));
app.use('/api/', routes);

if(process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.listen(PORT, console.log(`Server is listening at ${PORT}`));