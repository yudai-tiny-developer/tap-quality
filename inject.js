function _tap_quality_remove_class(selector, value) {
    for (const button of document.body.querySelectorAll(selector)) {
        button.classList.remove(value);
    }
}

function _tap_quality_add_class(selector, value) {
    for (const button of document.body.querySelectorAll(selector)) {
        button.classList.add(value);
    }
}

function _tap_quality_activate(value) {
    _tap_quality_remove_class('button._tap_quality_active', '_tap_quality_active');
    _tap_quality_add_class('button._tap_quality_button_' + value, '_tap_quality_active');

    if (!document.body.querySelector('button._tap_quality_active')) {
        _tap_quality_add_class('button._tap_quality_tap', '_tap_quality_active');
    }
}

document.addEventListener('_tap_quality', e => {
    _tap_quality_remove_class('button._tap_quality_tap', '_tap_quality_tap');
    _tap_quality_add_class('button._tap_quality_button_' + e.detail, '_tap_quality_tap');

    const player = document.body.querySelector('div#movie_player');
    player.setPlaybackQualityRange(e.detail, e.detail);
});

document.addEventListener('_tap_quality_init', e => {
    const player = document.body.querySelector('div#movie_player');
    player.addEventListener('onPlaybackQualityChange', value => {
        _tap_quality_activate(value);
    });
});

document.addEventListener('_tap_quality_update', e => {
    const player = document.body.querySelector('div#movie_player');
    _tap_quality_activate(player.getPlaybackQuality());
});