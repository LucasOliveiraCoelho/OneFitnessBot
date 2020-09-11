const YouTube = require('youtube-node');
const config = require('./yt-config');

const youtube = new YouTube();
youtube.setKey(config.key);

function searchVideoUrl(message, queryText) {
    return new Promise((resolve, reject) => {
        youtube.search(`Exercício em casa para ${queryText}`, 2, function(error, result) {
            if(!error){
                const videoIds = result.items.map((item) => item.id.videoId).filter(item => item);
                const youtubeLinks = videoIds.map(videoId=> `https://www.youtube.com/watch?v=${videoId}`);
                resolve(`${message} ${youtubeLinks.join(`, `)}`)
            } else {
                reject('Erro!')
            }
            
        })
    })
}

module.exports.searchVideoUrl = searchVideoUrl;