(() => {
    let player;
    let area;
    let onPlaybackQualityChange;

    function update_class(remove_class, add_target_class, add_value) {
        area = area ?? document.querySelector('div.ytp-right-controls');
        if (area) {
            for (const button of area.querySelectorAll('button._tap_quality_button')) {
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
    }

    function activate(playback_quality, preferred_quality) {
        update_class('_tap_quality_active', '_tap_quality_button_' + playback_quality, '_tap_quality_active');

        if (preferred_quality === 'auto') {
            update_class(undefined, '_tap_quality_button_auto', '_tap_quality_active');
        }
    }

    document.addEventListener('_tap_quality_loaded', e => {
        player = player ?? document.querySelector('div#movie_player');
        if (player) {
            activate(player.getPlaybackQuality(), player.getPreferredQuality());

            if (!onPlaybackQualityChange) {
                onPlaybackQualityChange = e => {
                    activate(e, player.getPreferredQuality());
                };
                player.addEventListener('onPlaybackQualityChange', onPlaybackQualityChange);
            }
        }
    });

    document.addEventListener('_tap_quality', e => {
        player = player ?? document.querySelector('div#movie_player');
        if (player) {
            player.setPlaybackQualityRange(e.detail);
            setTimeout(() => player.dispatchEvent(new MouseEvent('mouseout')), 500);
        }
    });

    document.dispatchEvent(new CustomEvent('_tap_quality_init'));
})();