import(chrome.runtime.getURL('common.js')).then(common => {
    if (!common.isLiveChat(location.href)) {
        main(document.querySelector('ytd-app') ?? document.body, common);
    }
});

function main(app, common) {
    function loadSettings() {
        chrome.storage.local.get(common.storage, data => {
            update_buttons(data);
            document.dispatchEvent(new CustomEvent('_tap_quality_loaded'));
        });
    }

    function update_buttons(data) {
        update_button(button_v1, '144p', data.v1, common.default_v1, data.v1_enabled, common.default_v1_enabled);
        update_button(button_v2, '240p', data.v2, common.default_v2, data.v2_enabled, common.default_v2_enabled);
        update_button(button_v3, '360p', data.v3, common.default_v3, data.v3_enabled, common.default_v3_enabled);
        update_button(button_v4, '480p', data.v4, common.default_v4, data.v4_enabled, common.default_v4_enabled);
        update_button(button_v5, '720p', data.v5, common.default_v5, data.v5_enabled, common.default_v5_enabled);
        update_button(button_v6, '1080p', data.v6, common.default_v6, data.v6_enabled, common.default_v6_enabled);
        update_button(button_v7, '1440p', data.v7, common.default_v7, data.v7_enabled, common.default_v7_enabled);
        update_button(button_v9, '2160p', data.v9, common.default_v9, data.v9_enabled, common.default_v9_enabled);
        update_button(button_v8, 'auto', data.v8, common.default_v8, data.v8_enabled, common.default_v8_enabled);
    }

    function update_button(button, label, value, default_value, enabled, default_enabled) {
        const detail = common.value(value, default_value);
        button.style.display = common.value(enabled, default_enabled) ? '' : 'none';
        button.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 72 72"><text font-size="20" x="50%" y="50%" dominant-baseline="central" text-anchor="middle">${label}</text></svg>`;
        button.classList.add('_tap_quality_button', '_tap_quality_button_' + detail, 'ytp-button');
        button.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('_tap_quality', { detail: detail }));
        });
    }

    function create_button() {
        const button = document.createElement('button');
        button.style.display = 'none';
        return button;
    }

    const shortcut_command = command => {
        if (data) {
            let value;
            switch (command) {
                case 'v1':
                    value = common.value(data.v1, common.default_v1);
                    break;
                case 'v2':
                    value = common.value(data.v2, common.default_v2);
                    break;
                case 'v3':
                    value = common.value(data.v3, common.default_v3);
                    break;
                case 'v4':
                    value = common.value(data.v4, common.default_v4);
                    break;
                case 'v5':
                    value = common.value(data.v5, common.default_v5);
                    break;
                case 'v6':
                    value = common.value(data.v6, common.default_v6);
                    break;
                case 'v7':
                    value = common.value(data.v7, common.default_v7);
                    break;
                case 'v8':
                    value = common.value(data.v9, common.default_v9);
                    break;
                case 'v9':
                    value = common.value(data.v8, common.default_v8);
                    break;
                default:
                    return;
            }
            document.dispatchEvent(new CustomEvent('_tap_quality', { detail: value }));
        }
    };

    const button_v1 = create_button();
    const button_v2 = create_button();
    const button_v3 = create_button();
    const button_v4 = create_button();
    const button_v5 = create_button();
    const button_v6 = create_button();
    const button_v7 = create_button();
    const button_v8 = create_button();
    const button_v9 = create_button();

    let data;
    let area;
    let panel;

    chrome.runtime.onMessage.addListener(command => {
        if (shortcut_command) {
            shortcut_command(command);
        }
    });

    chrome.storage.onChanged.addListener(loadSettings);

    document.addEventListener('_tap_quality_init', e => {
        const detect_interval = setInterval(() => {
            area = app.querySelector('div.ytp-right-controls');
            if (!area) {
                return false;
            }

            panel = area.querySelector('button.ytp-settings-button');
            if (!panel) {
                return false;
            }

            clearInterval(detect_interval);

            area.insertBefore(button_v8, panel);
            area.insertBefore(button_v9, button_v8);
            area.insertBefore(button_v7, button_v9);
            area.insertBefore(button_v6, button_v7);
            area.insertBefore(button_v5, button_v6);
            area.insertBefore(button_v4, button_v5);
            area.insertBefore(button_v3, button_v4);
            area.insertBefore(button_v2, button_v3);
            area.insertBefore(button_v1, button_v2);

            loadSettings();
        }, 200);
    });

    const s = document.createElement('script');
    s.src = chrome.runtime.getURL('inject.js');
    s.onload = () => s.remove();
    (document.head || document.documentElement).append(s);
}