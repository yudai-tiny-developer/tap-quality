import(chrome.runtime.getURL('common.js')).then(common => {
    if (!common.isLiveChat(location.href)) {
        main(document.querySelector('ytd-app') ?? document.body, common);
    }
});

function main(app, common) {
    function loadSettings() {
        chrome.storage.local.get(common.storage, data => {
            create_buttons(data);
            document.dispatchEvent(new CustomEvent('_tap_quality_loaded'));
        });
    }

    function create_buttons(data) {
        const area = app.querySelector('div.ytp-right-controls');
        if (area) {
            let panel = area.querySelector('button.ytp-settings-button');
            panel = update_button(data.v8, common.default_v8, area, panel, 'auto', data.v8_enabled, common.default_v8_enabled);
            panel = update_button(data.v9, common.default_v9, area, panel, '2160p', data.v9_enabled, common.default_v9_enabled);
            panel = update_button(data.v7, common.default_v7, area, panel, '1440p', data.v7_enabled, common.default_v7_enabled);
            panel = update_button(data.v6, common.default_v6, area, panel, '1080p', data.v6_enabled, common.default_v6_enabled);
            panel = update_button(data.v5, common.default_v5, area, panel, '720p', data.v5_enabled, common.default_v5_enabled);
            panel = update_button(data.v4, common.default_v4, area, panel, '480p', data.v4_enabled, common.default_v4_enabled);
            panel = update_button(data.v3, common.default_v3, area, panel, '360p', data.v3_enabled, common.default_v3_enabled);
            panel = update_button(data.v2, common.default_v2, area, panel, '240p', data.v2_enabled, common.default_v2_enabled);
            panel = update_button(data.v1, common.default_v1, area, panel, '144p', data.v1_enabled, common.default_v1_enabled);
        }
    }

    function update_button(data, default_value, area, panel, label, enabled, default_enabled) {
        const value = common.value(data, default_value);
        const button = area.querySelector('button._tap_quality_button_' + value) ?? create_button(common.value(data, default_value), area, panel, label);
        button.style.display = common.value(enabled, default_enabled) ? '' : 'none';
        return button;
    }

    function create_button(value, area, panel, label) {
        const button = document.createElement('button');
        button.style.display = 'none';
        button.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 72 72"><text font-size="20" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">${label}</text></svg>`;
        button.classList.add('_tap_quality_button', '_tap_quality_button_' + value, 'ytp-button');
        button.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('_tap_quality', { detail: value }));
            button.blur();
        });
        area.insertBefore(button, panel);
        return button;
    }

    document.addEventListener('_tap_quality_init', e => {
        new MutationObserver((mutations, observer) => {
            if (app.querySelector('div.ytp-right-controls')) {
                loadSettings();
            }
        }).observe(app, { childList: true, subtree: true });
        loadSettings();
    });

    chrome.storage.onChanged.addListener(() => {
        loadSettings();
    });

    const s = document.createElement('script');
    s.src = chrome.runtime.getURL('inject.js');
    s.onload = () => s.remove();
    (document.head || document.documentElement).append(s);
}