const dao = require("./tweet-dao");
module.exports = (app) => {

    const findAllTweets = (req, res) =>
        dao.findAllTweets()
            .then(tweets => res.json(tweets));

    const postNewTweet = (req, res) => {
        const newTweet = {
            "topic": "Web Development",
            "userName": "ReactJS",
            "verified": false,
            "handle": "ReactJS",
            "time": "2h",
            "avatar-image": "/images/p7.jpeg",
            "logo-image": "/images/p7.jpeg",
            "stats": {
                "comments": 123,
                "retweets": 234,
                "likes": 345
            },
            ...req.body,
        }
        dao.createTweet(newTweet)
            .then((insertedTweet) => res.json(insertedTweet));
    }

    const deleteTweet = (req, res) => {
        dao.deleteTweet(req.params.id)
            .then((status) => res.send(status));
    }

    const likeTweet = (req, res) => {
        const id = req.params.id;
        const tweet = dao.findTweetById(id)
            .then((tweet) => {
                if (tweet.liked === true) {
                    tweet.liked = false;
                    tweet.stats.likes--;
                } else {
                    tweet.liked = true;
                    tweet.stats.likes++;
                }
                dao.updateTweet(id, tweet)
                    .then(status => res.send(status));
            });
    }

    app.get('/api/tweets', findAllTweets);
    app.post('/api/tweets', postNewTweet);
    app.delete('/api/tweets/:id', deleteTweet);
    app.put('/api/tweets/:id/like', likeTweet);
};