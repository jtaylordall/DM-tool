var app = new Vue({
  el: '#app',
  data: {
    items: [],
    addedName: '',
    addedRace: 'Race',
    addedMaxHP: '',
    addedClass: 'Class',
    addedType: 'Type',
    addedLevel: '',
    show: 'all',
    displaymessage: '',
    showBattle: 'By Battle',
  },

  computed: {
    filteredItems() {
      if (this.show === 'players')
      return this.items.filter(item => {
        return item.type == 'Player';
      });
      if (this.show === 'npcs')
      return this.items.filter(item => {
        return item.type == 'Party NPC' || item.type == 'Non-Party NPC';
      });
      if (this.show === 'enemies')
      return this.items.filter(item => {
        return item.type == 'Enemy';
      });
      if (this.show === 'other')
      return this.items.filter(item => {
        return item.type == 'Other';
      });
      if (this.show === 'party')
      return this.items.filter(item => {
        return item.type == 'Party NPC' || item.type == 'Player';
      });
      if (this.show === 'sidequest')
      return this.items.filter(item => {
        return item.sidequest;
      });
      if (this.showBattle === 'Battle 1')
      return this.items.filter(item => {
        return item.battle === "Battle 1" || item.battle === "All Battles";
      });
      if (this.showBattle === 'Battle 2')
      return this.items.filter(item => {
        return item.battle === "Battle 2" || item.battle === "All Battles";
      });
      if (this.showBattle === 'Battle 3')
      return this.items.filter(item => {
        return item.battle === "Battle 3" || item.battle === "All Battles";
      });
      if (this.showBattle === 'Battle 4')
      return this.items.filter(item => {
        return item.battle === "Battle 4" || item.battle === "All Battles";
      });
      if (this.showBattle === 'Battle 5')
      return this.items.filter(item => {
        return item.battle === "Battle 5" || item.battle === "All Battles";
      });

      return this.items;
    },
  },

  created: function() {
    this.getItems();
  },

  methods: {
    async addItem() {
      if(this.addedMaxHP === ''){
        this.addedMaxHP = 1;
      }
      if(this.addedAC === ''){
        this.addedAC = 0;
      }
      if(this.addedName === ''){
        this.addedName = "Character";
      }
      if(this.addedType === 'Type'){
        this.addedType = "Other";
      }
      if(this.addedClass === 'Class'){
        this.addedClass = "Other";
      }
      if(this.addedRace === 'Race'){
        this.addedRace = "Other";
      }
      if(this.addedLevel === ''){
        this.addedLevel = 1;
      }
      else if(this.addedLevel > 20){
        this.addedLevel = 20;
      }
      else if(this.addedLevel <= 0){
        this.addedLevel = 1;
      }
      let profbonus = this.calculateProfBonus(this.addedLevel);
      try {
        const response = await axios.post("/api2/items", {
          name: this.addedName,
          type: this.addedType,
          class: this.addedClass,
          ac: 0,
          maxhp: this.addedMaxHP,
          hp: this.addedMaxHP,
          initiative: 0,
          sidequest: false,
          condition: 'Normal',
          comments: '',
          race: this.addedRace,
          strength: 0,
          dexterity: 0,
          constitution: 0,
          intelligence: 0,
          wisdom: 0,
          charisma: 0,
          strength_modifier: '--',
          dexterity_modifier: '--',
          constitution_modifier: '--',
          intelligence_modifier: '--',
          wisdom_modifier: '--',
          charisma_modifier: '--',
          battle: 'All Battles',
          level: Number(this.addedLevel),
          profbonus: profbonus,
        });
        this.addedName = '';
        this.addedType = "Type";
        this.addedClass = "Class";
        this.addedMaxHP = '';
        this.addedRace = "Race";
        this.addedLevel = '';

        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        const response = await axios.delete("/api2/items/" + item.id);
        console.log("deleted " + item.name);
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
    async marksidequest(item){
      try {
        const response = axios.put("/api2/items/" + item.id, {
          name: item.name,
          type: item.type,
          class: item.class,
          ac: item.ac,
          maxhp: item.maxhp,
          hp: item.hp,
          initiative: item.initiative,
          sidequest: !item.sidequest,
          condition: item.condition,
          comments: item.comments,
          race: item.race,
          strength: item.strength,
          dexterity: item.dexterity,
          constitution: item.constitution,
          intelligence: item.intelligence,
          wisdom: item. wisdom,
          charisma: item.charisma,
          strength_modifier: item.strength_modifier,
          dexterity_modifier: item.dexterity_modifier,
          constitution_modifier: item.constitution_modifier,
          intelligence_modifier: item.intelligence_modifier,
          wisdom_modifier: item.wisdom_modifier,
          charisma_modifier: item.charisma_modifier,
          battle: item.battle,
          level: item.level,
          profbonus: item.profbonus,
        });
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      let strength_modifier = this.calculateModifier(item.strength);
      let dexterity_modifier = this.calculateModifier(item.dexterity);
      let constitution_modifier = this.calculateModifier(item.constitution);
      let wisdom_modifier = this.calculateModifier(item.wisdom);
      let intelligence_modifier = this.calculateModifier(item.intelligence);
      let charisma_modifier = this.calculateModifier(item.charisma);

      try {
        const response = axios.put("/api2/items/" + item.id, {
          name: item.name,
          type: item.type,
          class: item.class,
          ac: item.ac,
          maxhp: item.maxhp,
          hp: item.hp,
          initiative: item.initiative,
          sidequest: item.sidequest,
          condition: item.condition,
          comments: item.comments,
          race: item.race,
          strength: item.strength,
          dexterity: item.dexterity,
          constitution: item.constitution,
          intelligence: item.intelligence,
          wisdom: item. wisdom,
          charisma: item.charisma,
          strength_modifier: strength_modifier,
          dexterity_modifier: dexterity_modifier,
          constitution_modifier: constitution_modifier,
          intelligence_modifier: intelligence_modifier,
          wisdom_modifier: wisdom_modifier,
          charisma_modifier: charisma_modifier,
          battle: item.battle,
          level: item.level,
          profbonus: item.profbonus,
        });
        this.getItems();
        console.log("edited " + item.name);
      } catch (error) {
        console.log(error);
      }
    },
    async duplicateItem(item) {
      try {
        const response = await axios.post("/api2/items", {
          name: item.name,
          type: item.type,
          class: item.class,
          ac: item.ac,
          maxhp: item.maxhp,
          hp: item.hp,
          initiative: item.initiative,
          sidequest: item.sidequest,
          condition: item.condition,
          comments: item.comments,
          race: item.race,
          strength: item.strength,
          dexterity: item.dexterity,
          constitution: item.constitution,
          intelligence: item.intelligence,
          wisdom: item. wisdom,
          charisma: item.charisma,
          strength_modifier: item.strength_modifier,
          dexterity_modifier: item.dexterity_modifier,
          constitution_modifier: item.constitution_modifier,
          intelligence_modifier: item.intelligence_modifier,
          wisdom_modifier: item.wisdom_modifier,
          charisma_modifier: item.charisma_modifier,
          battle: item.battle,
          level:item.level,
          profbonus: item.profbonus,
        });
        this.getItems();
        console.log("duplicated " + item.name);
      } catch (error) {
        console.log(error);
      }
    },

    async getItems() {
      try {
        const response = await axios.get("/api2/items");
        this.items = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    showAll() {
      this.show = 'all';
    },
    showPlayers() {
      this.show = 'players';
    },
    showNPCs() {
      this.show = 'npcs';
    },
    showParty() {
      this.show = 'party';
    },
    showEnemies() {
      this.show = 'enemies';
    },
    showOther() {
      this.show = 'other';
    },
    showSideQuest() {
      this.show = 'sidequest';
    },

    sortName() {
      function compare(a,b) {
        if (a.name < b.name)
        return -1;
        if (a.name > b.name)
        return 1;
        return 0;
      }
      this.items.sort(compare);
    },
    sortType() {
      function compare(a,b) {
        if (a.type < b.type)
        return -1;
        if (a.type > b.type)
        return 1;
        return 0;
      }
      this.items.sort(compare);
    },
    sortInitiative() {
      function compare(a,b) {
        if ((a.initiative - b.initiative) > 0)
        return -1;
        if ((a.initiative - b.initiative) < 0)
        return 1;
        return 0;
      }
      this.items.sort(compare);
    },
    sortLevel() {
      function compare(a,b) {
        if ((a.level - b.level) > 0)
        return -1;
        if ((a.level - b.level) < 0)
        return 1;
        return 0;
      }
      this.items.sort(compare);
    },


    incrementLevel(item){
      var itemlevel = Number(item.level);
      if(itemlevel < 20){
        itemlevel += 1;
        console.log(itemlevel);
      }
      let profbonus = this.calculateProfBonus(itemlevel);
      try {
        const response = axios.put("/api2/items/" + item.id, {
          name: item.name,
          type: item.type,
          class: item.class,
          ac: item.ac,
          maxhp: item.maxhp,
          hp: item.hp,
          initiative: item.initiative,
          sidequest: item.sidequest,
          condition: item.condition,
          comments: item.comments,
          race: item.race,
          strength: item.strength,
          dexterity: item.dexterity,
          constitution: item.constitution,
          intelligence: item.intelligence,
          wisdom: item. wisdom,
          charisma: item.charisma,
          strength_modifier: item.strength_modifier,
          dexterity_modifier: item.dexterity_modifier,
          constitution_modifier: item.constitution_modifier,
          intelligence_modifier: item.intelligence_modifier,
          wisdom_modifier: item.wisdom_modifier,
          charisma_modifier: item.charisma_modifier,
          battle: item.battle,
          level:itemlevel,
          profbonus: profbonus,
        });
        this.getItems();
        console.log("incremented level of " + item.name);
      } catch (error) {
        console.log(error);
      }
    },
    decrementLevel(item){
      var itemlevel = Number(item.level);
      console.log(itemlevel);
      if(itemlevel > 1){
        itemlevel -= 1;
        console.log(itemlevel);
      }
      let profbonus = this.calculateProfBonus(itemlevel);
      try {
        const response = axios.put("/api2/items/" + item.id, {
          name: item.name,
          type: item.type,
          class: item.class,
          ac: item.ac,
          maxhp: item.maxhp,
          hp: item.hp,
          initiative: item.initiative,
          sidequest: item.sidequest,
          condition: item.condition,
          comments: item.comments,
          race: item.race,
          strength: item.strength,
          dexterity: item.dexterity,
          constitution: item.constitution,
          intelligence: item.intelligence,
          wisdom: item. wisdom,
          charisma: item.charisma,
          strength_modifier: item.strength_modifier,
          dexterity_modifier: item.dexterity_modifier,
          constitution_modifier: item.constitution_modifier,
          intelligence_modifier: item.intelligence_modifier,
          wisdom_modifier: item.wisdom_modifier,
          charisma_modifier: item.charisma_modifier,
          battle: item.battle,
          level:itemlevel,
          profbonus: profbonus,
        });
        this.getItems();
        console.log("decremented level of " + item.name);
      } catch (error) {
        console.log(error);
      }
    },

    calculateModifier(instat){
      var stat = Number(instat);
      var modifier = Math.floor((stat - 10)/2);
      let modifierout;
      if (stat >= 10) {
        modifierout = '+' + modifier;
      }
      else if (stat === 0) {
        return '--';
      }
      else if(stat < 10){
        modifierout = String(modifier);
      }
      else{
        return '+0';
      }
      return modifierout;
    },
    calculateProfBonus(inlevel){
      var level = Number(inlevel);
      let profbonus;
      if(level <= 4){
        profbonus = "+2";
      }
      else if(level >= 5 && level <= 8){
        profbonus = "+3";
      }
      else if(level >= 9 && level <= 12){
        profbonus = "+4";
      }
      else if(level >= 13 && level < 17){
        profbonus = "+5";
      }
      else{
        profbonus = "+6";
      }
      return profbonus;
    },
  },
});
