$('.tabs input').on('change', function (e) {
    $(this).closest('.tabs').children('.graph').hide();
    $(this).closest('.tabs').children(`.${this.id.split('-')[1]}`).show();
});

const extractField = (stats, field) => {
    const x = [];

    Object.entries(stats).forEach(([key, value]) => {
        if (value[field]) x.push({ 'name': key, 'y': value[field] })
    });

    return x.sort((a, b) => b['y'] - a['y']);
}

const accumulate = arr => arr.map((sum => value => sum += value)(0));

const accumulateX = (stats, field) => {
    let series = [];

    Object.entries(stats).forEach(([name, xs]) => {
        const data = accumulate(xs.map(x => x[field]));
        if (data.at(-1) > 0) series.push({
            'name': name,
            'data': data
        });
    });

    return series.sort((a, b) => a.name.localeCompare(b.name));
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
                },
            },
        },
    });
}

const create2dGraph = (stats, title, field) => {
    const data = accumulateX(stats, field);

    Highcharts.chart(`line-${field}-container`, {
        title: {
            text: title
        },
        legend: {
            enabled: false,
        },
        series: data
    });
};

const create2dGraphs = (stats) => {
    create2dGraph(stats, 'Aantal doelpunten', 'goals');
    create2dGraph(stats, 'Aantal assists', 'assists');
    create2dGraph(stats, 'Aantal wedstrijden', 'games');
    create2dGraph(stats, 'Aantal basisplekken', 'starts');
    create2dGraph(stats, 'Aantal wisselbeurten', 'subbed');
    create2dGraph(stats, 'Aantal gespeelde Minuten', 'minutes');
    create2dGraph(stats, 'Aantal gele kaarten', 'yellow');
    create2dGraph(stats, 'Aantal rode kaarten', 'red');
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

    createGraph('pie', 'Aantal Gele Kaarten', stats, 'yellow');
    createGraph('bar', 'Aantal Gele Kaarten', stats, 'yellow');
    createGraph('column', 'Aantal Gele Kaarten', stats, 'yellow');

    createGraph('pie', 'Aantal Rode Kaarten', stats, 'red');
    createGraph('bar', 'Aantal Rode Kaarten', stats, 'red');
    createGraph('column', 'Aantal Rode Kaarten', stats, 'red');
}