import Player from '@vimeo/player/dist/player.es.js';

import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function() {
    console.log('played the video!');
});

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});

player.on('timeupdate', throttle(function(data) {
    const currentTime = data.seconds;
    localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000));

const storedTime = localStorage.getItem('videoplayer-current-time');
if (storedTime !== null) {
    player.setCurrentTime(storedTime).then(function(seconds) {
        console.log('seeked to', seconds, 'seconds');
    }).catch(function(error) {
        switch (error.name) {
            case 'RangeError':
                console.log('The time was less than 0 or greater than the video’s duration.');
        }
    });
}
