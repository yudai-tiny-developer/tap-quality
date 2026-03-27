(() => {
    function update_class(remove_class, add_target_class, add_value) {
        for (const button of document.getElementsByClassName('_tap_quality_button')) {
            const oldToken = button.classList.contains(remove_class) ? remove_class : undefined;
            const newToken = button.classList.contains(add_target_class) ? add_value : undefined;
            if (oldToken && newToken) {
                button.classList.replace(oldToken, newToken);
            } else if (oldToken) {
                button.classList.remove(oldToken);
            } else if (newToken) {
                button.classList.add(newToken);
            }
        }
    }

    function activate(playback_quality, preferred_quality) {
        update_class('_tap_quality_active', '_tap_quality_button_' + playback_quality, '_tap_quality_active');

        if (preferred_quality === 'auto') {
            update_class(undefined, '_tap_quality_button_auto', '_tap_quality_active');
        }
    }

    function onPlaybackQualityChange(e) {
        activate(e, player.getPreferredQuality());
    }

    let player;

    document.addEventListener('_tap_quality_loaded', () => {
        activate(player.getPlaybackQuality(), player.getPreferredQuality());
    });

    document.addEventListener('_tap_quality', e => {
        player.setPlaybackQualityRange(e.detail);
        setTimeout(() => player.dispatchEvent(new MouseEvent('mouseout')), 500);
    });

    const detect_interval = setInterval(() => {
        player = document.getElementById("movie_player");
        if (!player) return;

        clearInterval(detect_interval);

        player.addEventListener('onPlaybackQualityChange', onPlaybackQualityChange);

        document.dispatchEvent(new CustomEvent('_tap_quality_init'));
    }, 500);
})();