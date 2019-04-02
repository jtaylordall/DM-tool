const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

let items = [];
let id = 0;

app.post('/api2/items', (req, res) => {
  id = id + 1;
  let item = {
    id: id,
    name: req.body.name,
    type: req.body.type,
    class: req.body.class,
    ac: req.body.ac,
    maxhp: req.body.maxhp,
    hp: req.body.hp,
    initiative: req.body.initiative,
    sidequest: req.body.sidequest,
    condition: req.body.condition,
    comments: req.body.comments,
    race: req.body.race,
    strength: req.body.strength,
    dexterity: req.body.dexterity,
    constitution: req.body.constitution,
    intelligence: req.body.intelligence,
    wisdom: req.body.wisdom,
    charisma: req.body.charisma,
    strength_modifier: req.body.strength_modifier,
    dexterity_modifier: req.body.dexterity_modifier,
    constitution_modifier: req.body.constitution_modifier,
    intelligence_modifier: req.body.intelligence_modifier,
    wisdom_modifier: req.body.wisdom_modifier,
    charisma_modifier: req.body.charisma_modifier,
    battle: req.body.battle,
    level: req.body.level,
    profbonus: req.body.profbonus,
  };
  console.log(item.name);
  items.push(item);
  res.send(item);
});

app.get('/api2/items', (req, res) => {
  res.send(items);
});

app.put('/api2/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let itemsMap = items.map(item => {
    return item.id;
  });
  let index = itemsMap.indexOf(id);
  if (index === -1) {
    res.status(404)
      .send("Sorry, that item doesn't exist");
    return;
  }
  let item = items[index];
  item.name = req.body.name;
  item.type = req.body.type;
  item.class = req.body.class;
  item.ac = req.body.ac;
  item.maxhp = req.body.maxhp;
  item.hp = req.body.hp;
  item.initiative = req.body.initiative;
  item.sidequest = req.body.sidequest;
  item.condition = req.body.condition;
  item.comments = req.body.comments;
  item.race = req.body.race;
  item.strength = req.body.strength;
  item.dexterity = req.body.dexterity;
  item.constitution = req.body.constitution;
  item.intelligence = req.body.intelligence;
  item.wisdom = req.body.wisdom;
  item.charisma = req.body.charisma;
  item.strength_modifier = req.body.strength_modifier;
  item.dexterity_modifier = req.body.dexterity_modifier;
  item.constitution_modifier = req.body.constitution_modifier;
  item.intelligence_modifier = req.body.intelligence_modifier;
  item.wisdom_modifier = req.body.wisdom_modifier;
  item.charisma_modifier = req.body.charisma_modifier;
  item.battle = req.body.battle;
  item.level = req.body.level;
  item.profbonus = req.body.profbonus;
  res.send(item);
});

app.delete('/api2/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = items.map(item => {
      return item.id;
    })
    .indexOf(id);
  if (removeIndex === -1) {
    res.status(404)
      .send("Sorry, that item doesn't exist");
    return;
  }
  items.splice(removeIndex, 1);
  res.sendStatus(200);
});

app.listen(3001, () => console.log('Server listening on port 3001!'));
