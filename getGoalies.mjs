import { writeFile } from 'fs';

const deepMergeObjects = (...objects) => {
    const deepCopyObjects = objects.map(object => JSON.parse(JSON.stringify(object)));
    return deepCopyObjects.reduce((merged, current) => ({ ...merged, ...current }), {});
}


const summaryResults = await fetch("https://api.nhle.com/stats/rest/en/goalie/summary?isAggregate=false&isGame=false&sort=%5B%7B%22property%22:%22wins%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22savePct%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22playerId%22,%22direction%22:%22ASC%22%7D%5D&start=0&limit=50&cayenneExp=gameTypeId=2%20and%20seasonId%3C=20242025%20and%20seasonId%3E=20242025")
    .then((data) => {
        return data.json();
    }).catch(err => console.log);

writeFile("src/data/goalies.js", `const goalies = ${JSON.stringify(summaryResults)}; export default goalies;`, err => console.log);