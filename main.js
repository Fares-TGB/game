class Board {
  constructor() {
    this.time = document.getElementById("time");
    this.score_made = document.getElementById("score");
    this.level = document.querySelector("#level");
    this.container = document.getElementById(`container`);
    this.visibility_input = document.getElementById("visibility");
    this.timers = 30;
    this.timers_interval;
    // @ts-ignore
    this.visibility_time = Number(this.visibility_input.value) * 1000;
    this.interval;
    this.button_id = "easy";
    this.score = 0;
  }

  random_numbers = () => {
    return Math.floor(Math.random() * 9 + 1);
  };
  get_mode() {
    if (this.button_id === "easy") {
      return 1;
    }
    if (this.button_id === "medium") {
      return 2;
    }
    if (this.button_id === "difficult") {
      return 3;
    } else {
      return 1;
    }
  }
  nettoyer_case() {
    for (let j = 1; j < 10; j++) {
      let current_case = document.getElementById(`case${j}`);
      // @ts-ignore
      current_case.innerHTML = "";
    }
  }

  Event_Listener() {
    // @ts-ignore
    Array.from(this.container.children).forEach((child) => {
      child.removeEventListener("click", this.point);
    });
    // @ts-ignore
    Array.from(this.container.children).forEach((child) => {
      child.addEventListener("click", this.point);
    });
  }

  choose_visibility() {
    // @ts-ignore
    this.visibility_input.addEventListener("click", () => {
      // @ts-ignore
      this.visibility_time = Number(this.visibility_input.value) * 1000;
      console.log(this.visibility_time);
    });
  }

  timer() {
    clearInterval(this.timers_interval);
    this.timers = 30;
    // @ts-ignore
    this.time.innerHTML = `Time : ${this.timers}`;

    this.timers_interval = setInterval(() => {
      if (this.timers === 0) {
        clearInterval(this.timers_interval);
        clearInterval(this.interval);
        this.timers = 0;

        // @ts-ignore
        this.time.innerHTML = `<br>Votre Temps est ecoule 
        <br>si vous voulez rejouer, cliquez sur un des Niveau de difficulé`;

        this.nettoyer_case();
      }

      if (this.timers > 0) {
        this.timers -= 1;
        // @ts-ignore
        this.time.innerHTML = `Time : ${this.timers}`;
      }
    }, 1000);
  }

  appear_disappear() {
    clearInterval(this.interval);
    this.grid();
    // @ts-ignore
    this.visibility_time = Number(this.visibility_input.value) * 1000;

    this.interval = setInterval(() => {
      if (this.visibility_time === 1000) {
        if (this.timers === 0) {
          this.nettoyer_case();
          clearInterval(this.interval);
          // @ts-ignore
          Array.from(this.container.children).forEach((child) => {
            child.removeEventListener("click", this.point);
          });
        }
        if (this.timers > 0) {
          this.nettoyer_case();
          let interval = setTimeout(() => {
            this.appear_disappear();
          }, 2000);
        }
      }
      this.visibility_time -= 1000;
    }, 1000);
  }

  choose_mode() {
    // @ts-ignore
    this.level.addEventListener("click", (event) => {
      // @ts-ignore
      if (event.target.tagName === "BUTTON") {
        // @ts-ignore
        this.button_id = event.target.id;
        console.log(this.button_id);
        this.nettoyer_case();
        this.Event_Listener();
        this.game();
      }
    });
  }

  grid() {
    // @ts-ignore
    const mode = this.get_mode();
    this.nettoyer_case();

    for (let i = 0; i < mode; i++) {
      const souris = document.createElement("div");
      souris.id = `souris${i}`;
      souris.classList.add("souris");
      souris;

      // @ts-ignore
      document
        .getElementById(`case${this.random_numbers()}`)
        .appendChild(souris);

      console.log(souris.id);
      // @ts-ignore
    }
  }

  point = (event) => {
    const box = event.currentTarget.id;
    const current_box = document.getElementById(box);
    // @ts-ignore
    if (current_box.children.length > 0) {
      // @ts-ignore
      this.score += current_box.children.length;
      // @ts-ignore
      this.score_made.innerHTML = `Score : ${this.score}`;
      // @ts-ignore
      current_box.innerHTML = "";
    } else {
      this.score -= 1;
      // @ts-ignore
      this.score_made.innerHTML = `Score : ${this.score}`;
      // @ts-ignore
      current_box.innerHTML = "";
    }

    // @ts-ignore
    console.log(current_box.children.length);
    // @ts-ignore
    console.log(current_box.id);
    // @ts-ignore
    console.log(current_box.children.id);
  };

  game() {
    clearInterval(this.interval);
    this.timer();
    this.score = 0;
    // @ts-ignore
    this.score_made.innerHTML = `Score : ${this.score}`;

    this.appear_disappear();
  }
}

let start = new Board();
start.choose_mode();
start.choose_visibility();
