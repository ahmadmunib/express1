let arr = [1, 2, 3, 4, 5];

const getAboutPage = (req, res) => {
    res.render('about', { title: 'About', arr: arr });
};

const updateArray = (req, res) => {
    arr = req.body.newArray;
    res.send('Array updated');
    // Notify clients about the update using WebSockets
    req.app.get('io').emit('update', arr);
};

module.exports = {
    getAboutPage,
    updateArray
};
