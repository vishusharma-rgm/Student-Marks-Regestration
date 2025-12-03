document.addEventListener("DOMContentLoaded", () => {
  let students = JSON.parse(localStorage.getItem("students")) || [];

  const tableBody = document.getElementById("tableBody");
  const totalStudents = document.getElementById("totalStudents");
  const avgPercent = document.getElementById("avgPercent");
  const form = document.getElementById("form");

  function render() {
    tableBody.innerHTML = "";
    let percentSum = 0;

    students.forEach(s => {
      percentSum += s.percent;
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${s.name}</td>
        <td>${s.roll}</td>
        <td>${s.branch}</td>
        <td>${s.total}</td>
        <td>${s.percent}%</td>
      `;

      tableBody.appendChild(row);
    });

    totalStudents.textContent = students.length;
    avgPercent.textContent =
      students.length ? (percentSum / students.length).toFixed(1) + "%" : "0%";

    localStorage.setItem("students", JSON.stringify(students));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // ✅ Read inputs
    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const branch = document.getElementById("branch").value.trim();
    const m1 = Number(document.getElementById("m1").value);
    const m2 = Number(document.getElementById("m2").value);
    const m3 = Number(document.getElementById("m3").value);

    if (!name || !roll || !branch) {
      alert("Please fill all fields");
      return;
    }

    const total = m1 + m2 + m3;
    const percent = Number(((total / 300) * 100).toFixed(1));

    students.push({ name, roll, branch, total, percent });

    form.reset();
    render();
  });

  render();
});
