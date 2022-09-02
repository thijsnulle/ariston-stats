$.get('https://docs.google.com/spreadsheets/d/1vZO66rp-nZ17niMLgcHLxLtAHpKs1j58secQkQQRYL4/gviz/tq')
    .done(function (body) {
        const regex = new RegExp(/google.visualization.Query.setResponse\((.*)\);/)
        const result = body.match(regex);

        const rows = new Array(JSON.parse(result[1])['table']['rows'])[0];

        const data = rows.map(r => r['c'].filter(e => e != null).map(e => e['v']));
        const names = new Array(JSON.parse(result[1])['table']['cols'])[0]
            .map(e => e['label'])
            .filter(e => e.length > 0).slice(1);

        const statistics = {};
        for (let i = 0; i < names.length; i++) {
            statistics[names[i]] = {
                'goals': data[0][i + 1],
                'assists': data[1][i + 1],
                'games': data[2][i + 1],
                'starts': data[3][i + 1],
                'subbed': data[4][i + 1],
                'minutes': data[5][i + 1],
                'yellow-cards': data[6][i + 1],
                'red-cards': data[7][i + 1],
            };
        }

        createGraphs(statistics);
    });