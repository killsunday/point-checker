import { writeFile } from 'fs';

const deepMergeObjects = (...objects) => {
    const deepCopyObjects = objects.map(object => JSON.parse(JSON.stringify(object)));
    return deepCopyObjects.reduce((merged, current) => ({ ...merged, ...current }), {});
}


const summaryResults = await fetch("https://api.nhle.com/stats/rest/en/skater/summary?limit=-1&cayenneExp=seasonId=20252026")
    .then((data) => {
        return data.json();
    }).catch(err => console.log);

const miscResults = await fetch("https://api.nhle.com/stats/rest/en/skater/realtime?limit=-1&cayenneExp=seasonId=20252026")
    .then(data => {
        return data.json();
    }).catch(err => console.log);

const results = summaryResults.data.map((val) => {
    const miscResult = miscResults.data.filter(key => {
        return key.playerId === val.playerId;
    });
    return deepMergeObjects(val, miscResult[0]);
});

writeFile("src/data/players.js", `const players = ${JSON.stringify(results)}; export default players;`, err => console.log);
