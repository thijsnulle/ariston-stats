$.get('https://docs.google.com/spreadsheets/d/1vZO66rp-nZ17niMLgcHLxLtAHpKs1j58secQkQQRYL4/gviz/tq')
    .done(function (body) {
        const regex = new RegExp(/google.visualization.Query.setResponse\((.*)\);/);
        const result = body.match(regex);

        const statsPerGameData = new Array(JSON.parse(result[1])['table']['rows'])[0].slice(8, 34);

        const names = new Array(JSON.parse(result[1])['table']['cols'])[0]
            .map(e => e['label'])
            .filter(e => e.length > 0).slice(1);

        const statsPerGame = {};
        names.forEach(n => {
            statsPerGame[n] = [];
        });


        statsPerGameData.forEach(row => {
            const game = row['c'][1]['v'];

            names.forEach(function (name, i) {
                statsPerGame[name].push({
                    'game': game,
                    'goals': row['c'][i * 8 + 3] === null ? 0 : parseInt(row['c'][i * 8 + 3]['v']),
                    'assists': row['c'][i * 8 + 4] === null ? 0 : parseInt(row['c'][i * 8 + 4]['v']),
                    'games': row['c'][i * 8 + 5] === null ? 0 : parseInt(row['c'][i * 8 + 5]['v']),
                    'starts': row['c'][i * 8 + 6] === null ? 0 : parseInt(row['c'][i * 8 + 6]['v']),
                    'subbed': row['c'][i * 8 + 7] === null ? 0 : parseInt(row['c'][i * 8 + 7]['v']),
                    'minutes': row['c'][i * 8 + 8] === null ? 0 : parseInt(row['c'][i * 8 + 8]['v']),
                    'yellow': row['c'][i * 8 + 9] === null ? 0 : parseInt(row['c'][i * 8 + 9]['v']),
                    'red': row['c'][i * 8 + 10] === null ? 0 : parseInt(row['c'][i * 8 + 10]['v']),
                });
            });
        });

        create2dGraphs(statsPerGame, 'Aantal doelpunten', 'goals');

        const statsInTotalData = new Array(JSON.parse(result[1])['table']['rows'])[0]
            .map(r => r['c'].filter(e => e != null)
                .map(e => e['v'])).slice(0, 8);

        const statsInTotal = {};
        for (let i = 0; i < names.length; i++) {
            statsInTotal[names[i]] = {
                'goals': statsInTotalData[0][i + 1],
                'assists': statsInTotalData[1][i + 1],
                'games': statsInTotalData[2][i + 1],
                'starts': statsInTotalData[3][i + 1],
                'subbed': statsInTotalData[4][i + 1],
                'minutes': statsInTotalData[5][i + 1],
                'yellow': statsInTotalData[6][i + 1],
                'red': statsInTotalData[7][i + 1],
            };
        }

        createGraphs(statsInTotal);
    });