import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onPlay = function (data) {
  const value = data.seconds;
  const pauseTime = JSON.stringify(value);
  localStorage.setItem('videoplayer-current-time', pauseTime);
};

player.on('timeupdate', throttle(onPlay, 1000));
player.setCurrentTime(
  JSON.parse(localStorage.getItem('videoplayer-current-time') || 0)
);
