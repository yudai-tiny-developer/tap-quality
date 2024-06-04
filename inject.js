document.addEventListener('_tap_quality', e => {
    const player = document.body.querySelector('div#movie_player');
    player.setPlaybackQualityRange(e.detail, e.detail);
});