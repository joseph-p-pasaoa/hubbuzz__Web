// Joseph P. Pasaoa
// HubBuzz Access
//

const g = {
  days: [
    "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"
  ]
}

const wipe = () => {
  const list = document.querySelector('#ord');
  while (list.firstChild) {
    list.removeChild(list.lastChild);
  }
}

const motherMayI = async (input1, input2) => {
  try {
    return await axios.get(`https://api${input1}.com/users/${input2}/events/public?per_page=100`);
  } catch(err) {
    console.log(err);
  }
}

const heatAndChill = (input, array) => {
  const oven = document.querySelector('#ord');
  let num = 1;
  for (let obj of array) {
    let d = new Date(obj.created_at).toISOString().slice(2, 16).replace('T', '  ');
    let e = new Date(obj.created_at);
    d += `  ${g.days[e.getDay()]}`;
    let type = obj.type;
    if (type.slice(-5) === 'Event') {
      type = '- ' + type.slice(0, -5);
    }
    let loc = obj.repo.name;
    if (loc.slice(0, input.length) === input) {
      loc = '.. ' + loc.slice(input.length);
    }
    let msg = '';
    if (obj.payload.commits) {
      msg = "' " + obj.payload.commits[0].message;
    }
    num % 2 === 0
      ? oven.innerHTML += `<div class='num'>${num}.</div> <div class='date'>${d}</div> <div class='type'>${type}</div> <div class='loc'>${loc}</div> <div class='msg'>${msg}</div>`
      : oven.innerHTML += `<div class='num gray'>${num}.</div> <div class='date gray'>${d}</div> <div class='type gray'>${type}</div> <div class='loc gray'>${loc}</div> <div class='msg gray'>${msg}</div>`;
    num += 1;
  }
}

const moldOven = () => {
  let timer = document.createElement('div');
  timer.setAttribute("style", "position: absolute; top: 0; right: 0; width: 100px; height: 100px;");
  timer.addEventListener("click", bakeDrops);
  let oven = document.createElement('div');
  oven.id = 'ord';
  document.body.append(oven, timer);
}

const bakeDrops = async () => {
  const entry1 = document.querySelector('#query1').value;
  const entry2 = document.querySelector('#query2').value;
  const data = await motherMayI(entry1, entry2);
  wipe();
  heatAndChill(entry2, data.data);
}

document.addEventListener("DOMContentLoaded", () => {
    moldOven();
});