const roundRobin = (process, at, bt, quant) => {
  if (process.length == 0 || at.length == 0 || bt.length == 0 || !quant) {
    document.getElementById("ATAT").innerHTML = "";
    document.getElementById("AWT").innerHTML = "";
    return (document.getElementById("progress").innerHTML =
      "you must input processes,Arrival_time,Burst time or quantum");
  }
  const nop = process.length;
  let y = process.length;
  let i = 0;
  let count = 0,
    sum,
    wt = 0,
    tat = 0,
    temp = [...bt];

  document.getElementById(
    "progress"
  ).innerHTML = ` <tr><td>Processes Burst</td> <td> Burst Time </td> <td> Turn Around Time</td><td>Waiting Time</td> </tr>`;
  for (sum = 0, i = 0; y != 0; ) {
    if (temp[i] <= quant && temp[i] > 0) {
      sum = sum + temp[i];
      temp[i] = 0;
      count = 1;
    } else if (temp[i] > 0) {
      temp[i] = temp[i] - quant; //2
      sum = sum + quant; //6
    }

    if (temp[i] == 0 && count == 1) {
      y--;
      let result = document.createElement("tr");
      result.innerHTML = `<td>${process[i]}</td> <td>${bt[i]}</td> <td>${
        sum - at[i]
      }</td> <td>${sum - at[i] - bt[i]}</td>`;
      document.getElementById("progress").appendChild(result);
      wt = wt + sum - at[i] - bt[i];
      tat = tat + sum - at[i];
      count = 0;
    }
    if (i == nop - 1) {
      i = 0;
    } else if (at[i + 1] <= sum) {
      i++;
    } else {
      i = 0;
    }
  }
  document.getElementById("AWT").innerHTML = `Average waiting time = ${
    (wt * 1.0) / nop
  }`;
  console.log((tat * 1.0) / nop);
  document.getElementById("ATAT").innerHTML = `Average turn around time = ${
    (tat * 1.0) / nop
  }`;
};
const filterArray = (input) => {
  let result = [];
  input.forEach((i) => {
    result.push(+i);
  });
  return result;
};
// roundRobin(["p1", "p2", "p3", "p4"], [0, 1, 2, 3], [8, 5, 10, 11], 6);
