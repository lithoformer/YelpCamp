const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp').then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
}).catch(err => {
    console.log("ON NO MONGO CONNECTION ERROR!!!");
    console.log(err);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '669fe63fa5c62c93cbd5f17a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dulcja67m/image/upload/v1722006647/YelpCamp/xik8qdbqvyrfcnoc6vfd.png',
                    filename: 'YelpCamp/xik8qdbqvyrfcnoc6vfd',
                },
                {
                    url: 'https://res.cloudinary.com/dulcja67m/image/upload/v1722006647/YelpCamp/t5fk34pwfceibaswsjb8.png',
                    filename: 'YelpCamp/t5fk34pwfceibaswsjb8',
                }
            ],
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti dolore pariatur, ipsam commodi quasi repellendus, fuga eum sed libero quisquam expedita dolores cumque sapiente placeat recusandae porro mollitia cupiditate quia?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude,cities[random1000].latitude]
            }
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})