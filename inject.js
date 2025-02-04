const _tap_quality_app = document.querySelector('ytd-app') ?? document.body;

function _tap_quality_update_class(remove_class, add_target_class, add_value) {
    for (const button of _tap_quality_app.querySelectorAll('button._tap_quality_button')) {
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

function _tap_quality_activate(playback_quality, preferred_quality) {
    _tap_quality_update_class('_tap_quality_active', '_tap_quality_button_' + playback_quality, '_tap_quality_active');

    if (preferred_quality === 'auto') {
        _tap_quality_update_class(undefined, '_tap_quality_button_auto', '_tap_quality_active');
    }
}

let _tap_quality_init = true;

document.addEventListener('_tap_quality_loaded', e => {
    const player = _tap_quality_app.querySelector('div#movie_player');
    if (player) {
        _tap_quality_activate(player.getPlaybackQuality(), player.getPreferredQuality());
        if (_tap_quality_init) {
            _tap_quality_init = false;
            player.addEventListener('onPlaybackQualityChange', e => {
                _tap_quality_activate(e, player.getPreferredQuality());
            });
        }
    }
});

document.addEventListener('_tap_quality', e => {
    _tap_quality_update_class('_tap_quality_tap', '_tap_quality_button_' + e.detail, '_tap_quality_tap');
    const player = _tap_quality_app.querySelector('div#movie_player');
    if (player) {
        player.setPlaybackQualityRange(e.detail);
        setTimeout(() => player.dispatchEvent(new MouseEvent('mouseout')), 500);
    }
});

document.dispatchEvent(new CustomEvent('_tap_quality_init'));