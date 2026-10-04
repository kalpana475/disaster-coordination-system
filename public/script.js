async function loadDashboard() {

  // Get disasters
  const disasterResponse =
    await fetch("/api/disasters");

  const disasters =
    await disasterResponse.json();

  document.getElementById("disasterCount").textContent =
    disasters.length;

  const disasterList =
    document.getElementById("disasterList");

  disasterList.innerHTML = "";

  disasters.forEach(disaster => {

    const div = document.createElement("div");

    div.className = "disaster";

    div.innerHTML = `
      <h3>🚨 ${disaster.type}</h3>
      <p><strong>Location:</strong> ${disaster.location}</p>
      <p><strong>Severity:</strong> ${disaster.severity}</p>
      <p><strong>Affected People:</strong> ${disaster.affectedPeople}</p>
      <p><strong>Status:</strong> ${disaster.status}</p>
      ${
        disaster.rescueTeam
          ? `<p><strong>Rescue Team:</strong> ${disaster.rescueTeam}</p>`
          : `<button onclick="assignTeam(${disaster.id})">
              Assign Rescue Team
             </button>`
      }
    `;

    disasterList.appendChild(div);

  });


  // Get rescue teams
  const teamResponse =
    await fetch("/api/rescue-teams");

  const teams =
    await teamResponse.json();

  document.getElementById("teamCount").textContent =
    teams.length;

  const teamList =
    document.getElementById("teamList");

  teamList.innerHTML = "";

  teams.forEach(team => {

    const div = document.createElement("div");

    div.className = "team";

    div.innerHTML = `
      <strong>${team.id}</strong> -
      ${team.name}
      <span class="${team.status.toLowerCase()}">
        ${team.status}
      </span>
    `;

    teamList.appendChild(div);

  });


  // Get resources
  const resourceResponse =
    await fetch("/api/resources");

  const resources =
    await resourceResponse.json();

  document.getElementById("medicalKits").textContent =
    resources.medicalKits;

  document.getElementById("ambulances").textContent =
    resources.ambulances;

  const resourceList =
    document.getElementById("resourceList");

  resourceList.innerHTML = `
    <div class="resource">
      🩺 Medical Kits:
      <strong>${resources.medicalKits}</strong>
    </div>

    <div class="resource">
      🩹 First Aid Kits:
      <strong>${resources.firstAidKits}</strong>
    </div>

    <div class="resource">
      🫁 Oxygen Cylinders:
      <strong>${resources.oxygenCylinders}</strong>
    </div>

    <div class="resource">
      🚑 Ambulances:
      <strong>${resources.ambulances}</strong>
    </div>
  `;
}


// Report disaster

document
  .getElementById("disasterForm")
  .addEventListener("submit", async (event) => {

    event.preventDefault();

    const disaster = {

      type:
        document.getElementById("type").value,

      location:
        document.getElementById("location").value,

      severity:
        document.getElementById("severity").value,

      affectedPeople:
        Number(
          document.getElementById("affectedPeople").value
        )
    };


    const response =
      await fetch("/api/disasters", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(disaster)

      });


    const result =
      await response.json();


    document.getElementById("formMessage").textContent =
      result.message;


    if (response.ok) {

      document
        .getElementById("disasterForm")
        .reset();

      loadDashboard();

    }

  });


// Assign rescue team

async function assignTeam(disasterId) {

  const response =
    await fetch(
      `/api/disasters/${disasterId}/assign-team`,
      {
        method: "POST"
      }
    );

  const result =
    await response.json();

  alert(result.message);

  loadDashboard();

}


// Load dashboard when page opens

loadDashboard();