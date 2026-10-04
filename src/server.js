const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// Sample disaster data
let disasters = [
  {
    id: 1,
    type: "Flood",
    location: "Delhi",
    severity: "High",
    affectedPeople: 250,
    status: "Active"
  },
  {
    id: 2,
    type: "Fire",
    location: "Noida",
    severity: "Medium",
    affectedPeople: 80,
    status: "Active"
  }
];

// Sample rescue teams
let rescueTeams = [
  {
    id: "R001",
    name: "Alpha Rescue Team",
    status: "Available"
  },
  {
    id: "R002",
    name: "Bravo Rescue Team",
    status: "Available"
  },
  {
    id: "R003",
    name: "Charlie Rescue Team",
    status: "Busy"
  }
];

// Sample emergency resources
let resources = {
  medicalKits: 100,
  firstAidKits: 150,
  oxygenCylinders: 50,
  ambulances: 10
};

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Disaster Coordination System is running"
  });
});

// Get all disasters
app.get("/api/disasters", (req, res) => {
  res.json(disasters);
});

// Create a new disaster
app.post("/api/disasters", (req, res) => {
  const {
    type,
    location,
    severity,
    affectedPeople
  } = req.body;

  if (!type || !location || !severity || !affectedPeople) {
    return res.status(400).json({
      message: "All disaster fields are required"
    });
  }

  const newDisaster = {
    id: disasters.length + 1,
    type,
    location,
    severity,
    affectedPeople,
    status: "Active"
  };

  disasters.push(newDisaster);

  res.status(201).json({
    message: "Disaster reported successfully",
    disaster: newDisaster
  });
});

// Get rescue teams
app.get("/api/rescue-teams", (req, res) => {
  res.json(rescueTeams);
});

// Assign an available rescue team
app.post("/api/disasters/:id/assign-team", (req, res) => {
  const disasterId = Number(req.params.id);

  const disaster = disasters.find(
    (d) => d.id === disasterId
  );

  if (!disaster) {
    return res.status(404).json({
      message: "Disaster not found"
    });
  }

  const team = rescueTeams.find(
    (team) => team.status === "Available"
  );

  if (!team) {
    return res.status(400).json({
      message: "No rescue team available"
    });
  }

  team.status = "Busy";
  disaster.rescueTeam = team.id;

  res.json({
    message: "Rescue team assigned successfully",
    team,
    disaster
  });
});

// Get available resources
app.get("/api/resources", (req, res) => {
  res.json(resources);
});

// Allocate emergency resources
app.post("/api/resources/allocate", (req, res) => {
  const {
    medicalKits = 0,
    firstAidKits = 0,
    oxygenCylinders = 0,
    ambulances = 0
  } = req.body;

  if (
    medicalKits > resources.medicalKits ||
    firstAidKits > resources.firstAidKits ||
    oxygenCylinders > resources.oxygenCylinders ||
    ambulances > resources.ambulances
  ) {
    return res.status(400).json({
      message: "Insufficient resources"
    });
  }

  resources.medicalKits -= medicalKits;
  resources.firstAidKits -= firstAidKits;
  resources.oxygenCylinders -= oxygenCylinders;
  resources.ambulances -= ambulances;

  res.json({
    message: "Resources allocated successfully",
    remainingResources: resources
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;