$('#stat-select').on('change', function (e) {
    const clazz = $('#stat-select option:selected').prop('value');

    $('.graph-container').hide();
    $(`.${clazz}`).show();
});

const extractField = (stats, field) => {
    const x = [];

    Object.entries(stats).forEach(([key, value]) => {
        if (value[field]) x.push({ 'name': key, 'y': value[field] })
    });

    return x.sort((a, b) => b['y'] - a['y']);
}

const createGraph = (type, desc, stats, field) => {
    const data = extractField(stats, field);

    Highcharts.chart(`${type}-${field}-container`, {
        chart: { type },
        title: { text: '' },
        series: [{
            colorByPoint: true,
            data
        }],
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
    });
}

const createGraphs = (stats) => {
    createGraph('pie', 'Aantal Doelpunten', stats, 'goals');
    createGraph('bar', 'Aantal Doelpunten', stats, 'goals');
    createGraph('column', 'Aantal Doelpunten', stats, 'goals');

    createGraph('pie', 'Aantal Assists', stats, 'assists');
    createGraph('bar', 'Aantal Assists', stats, 'assists');
    createGraph('column', 'Aantal Assists', stats, 'assists');

    createGraph('pie', 'Aantal Wedstrijden', stats, 'games');
    createGraph('bar', 'Aantal Wedstrijden', stats, 'games');
    createGraph('column', 'Aantal Wedstrijden', stats, 'games');

    createGraph('pie', 'Aantal Basisplekken', stats, 'starts');
    createGraph('bar', 'Aantal Basisplekken', stats, 'starts');
    createGraph('column', 'Aantal Basisplekken', stats, 'starts');

    createGraph('pie', 'Aantal Wisselbeurten', stats, 'subbed');
    createGraph('bar', 'Aantal Wisselbeurten', stats, 'subbed');
    createGraph('column', 'Aantal Wisselbeurten', stats, 'subbed');

    createGraph('pie', 'Gespeelde Minuten', stats, 'minutes');
    createGraph('bar', 'Gespeelde Minuten', stats, 'minutes');
    createGraph('column', 'Gespeelde Minuten', stats, 'minutes');

    createGraph('pie', 'Aantal Gele Kaarten', stats, 'yellow-cards');
    createGraph('bar', 'Aantal Gele Kaarten', stats, 'yellow-cards');
    createGraph('column', 'Aantal Gele Kaarten', stats, 'yellow-cards');

    createGraph('pie', 'Aantal Rode Kaarten', stats, 'red-cards');
    createGraph('bar', 'Aantal Rode Kaarten', stats, 'red-cards');
    createGraph('column', 'Aantal Rode Kaarten', stats, 'red-cards');
}