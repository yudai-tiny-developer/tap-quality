import(chrome.runtime.getURL('common.js')).then(common =>
    import(chrome.runtime.getURL('settings.js')).then(settings =>
        import(chrome.runtime.getURL('progress.js')).then(progress =>
            chrome.storage.local.get(common.storage, data =>
                main(common, settings, progress, data)
            )
        )
    )
);

function main(common, settings, progress, data) {
    const row_class = 'row';
    const cell_class = 'cell';
    const toggle_class = 'toggle';
    const label_class = 'switch';
    const input_class = 'rate';
    const progress_class = 'progress';
    const done_class = 'done';

    const container = document.querySelector('div#container');
    const reset_button = document.querySelector('input#reset');
    const progress_div = document.querySelector('div#reset_progress');

    {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, '144p'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'v1_enabled', data.v1_enabled, common.default_v1_enabled, common.value));
        container.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, '240p'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'v2_enabled', data.v2_enabled, common.default_v2_enabled, common.value));
        container.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, '360p'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'v3_enabled', data.v3_enabled, common.default_v3_enabled, common.value));
        container.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, '480p'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'v4_enabled', data.v4_enabled, common.default_v4_enabled, common.value));
        container.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, '720p'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'v5_enabled', data.v5_enabled, common.default_v5_enabled, common.value));
        container.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, '1080p'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'v6_enabled', data.v6_enabled, common.default_v6_enabled, common.value));
        container.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, '1440p'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'v7_enabled', data.v7_enabled, common.default_v7_enabled, common.value));
        container.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, '2160p'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'v9_enabled', data.v9_enabled, common.default_v9_enabled, common.value));
        container.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, common.value(data.v8, common.default_v8)));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'v8_enabled', data.v8_enabled, common.default_v8_enabled, common.value));
        container.appendChild(row);
    }

    settings.registerResetButton(reset_button, progress_div, progress_class, done_class, toggle_class, input_class, progress);
}