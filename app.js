const express = require('express');

const app = express();
let port = process.env.port || 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('lending');
});

app.get('/campgrounds', (req, res) => {
    let campgrounds = [{
        name: 'Sinanitsa',
        image: "http://www.bulgarian-mountains.com/Huts/Pirin/Sinanica/picture_three.jpg"
    }, {
        name: 'Tevno ezero',
        image: "http://www.bulgarian-mountains.com/Huts/Pirin/TevnoEzero/picture.jpg"

    }, {
        name: 'Spano pole',
        image: "http://www.bulgarian-mountains.com/Huts/Pirin/SpanoPole/picture_two.jpg"

    }, {
        name: 'Vihren',
        image: "http://www.bulgarian-mountains.com/Huts/Pirin/Vihren/picture_two.jpg"

    }, {
        name: 'Banderitsa',
        image: "http://www.bulgarian-mountains.com/Huts/Pirin/Bunderica/picture.jpg"

    }, {
        name: 'Yavorov',
        image: "http://www.bulgarian-mountains.com/Huts/Pirin/Iavorov/picture.jpg"
    }
    ]
    res.render('campgrounds',{campgrounds:campgrounds});
});

app.listen(port, () => {
    console.log('Yelp Camp is listening on port:' + port)
})