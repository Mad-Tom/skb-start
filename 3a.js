const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const fetch = require('isomorphic-fetch');


const app = express();
app.use(cors());
app.use(bodyParser.json());

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(pcUrl)
	.then((res) => res.json())
	.then(res => pc = res)
	.catch(err => console.log(err));

app.get('/*', (req, res) => {
	const query = req.url.split('/').slice(1).filter(t => t !== '');
	const r = query.reduce((x, y) => {
		if (x && x.hasOwnProperty(y) && !(y === 'length' && (x instanceof Array || typeof x === 'string'))) return x[y];
		else return undefined;
	}, pc);
	if (query[0] === 'volumes') {
		const x = pc.hdd.reduce((arr, y) => {
			if (arr.hasOwnProperty(y.volume)) {
				arr[y.volume] = arr[y.volume] + y.size;
			} else {
				arr[y.volume] = y.size;
			}
			return arr;
		}, {});
		Object.keys(x).forEach(t => x[t] = x[t] + "B");
		return res.send(JSON.stringify(x));
	}
	if (query[0] === '') return res.send(JSON.stringify(pc));
	if (r === undefined) return res.sendStatus(404);
	res.send(JSON.stringify(r));
});

app.listen(3000, () => console.log(`open localhost:3000`));
