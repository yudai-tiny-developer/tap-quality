function _tap_quality_update_class(remove_class, add_target_class, add_value) {
    for (const button of document.body.querySelectorAll('button._tap_quality_button')) {
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

function _tap_quality_activate(value) {
    _tap_quality_update_class('_tap_quality_active', '_tap_quality_button_' + value, '_tap_quality_active');
}

function _tap_quality_onChange(e) {
    _tap_quality_activate(e);
}

document.addEventListener('_tap_quality_init', e => {
    const player = document.body.querySelector('div#movie_player');
    _tap_quality_activate(player.getPlaybackQuality());
    player.addEventListener('onPlaybackQualityChange', _tap_quality_onChange);
});

document.addEventListener('_tap_quality', e => {
    _tap_quality_update_class('_tap_quality_tap', '_tap_quality_button_' + e.detail, '_tap_quality_tap');
    const player = document.body.querySelector('div#movie_player');
    player.setPlaybackQualityRange(e.detail);
});