const School = require("../models/school");

const createSchool = async (req, res) => {
  const { id, name, address, latitude, longitude } = req.body;

  try {
    const existing = await School.findOne({ where: { id } });
    if (existing) {
      return res.status(400).json({ error: "School already exists" });
    }

    const school = await School.create({
      id,
      name,
      address,
      latitude,
      longitude,
    });
    res.status(201).json({ message: "School added successfully", school });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error adding school", details: error.message });
  }
};

const getAllSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  try {
    const schools = await School.findAll();

    if (latitude && longitude) {
      const userLat = parseFloat(latitude);
      const userLon = parseFloat(longitude);

      const sortedSchools = schools
        .map((school) => {
          const dist = getDistance(
            userLat,
            userLon,
            school.latitude,
            school.longitude
          );
          return { ...school.toJSON(), distance: dist };
        })
        .sort((a, b) => a.distance - b.distance);

      return res.json(sortedSchools);
    }

    res.json(schools);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving schools", details: error.message });
  }
};

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in km
  const toRad = (angle) => (angle * Math.PI) // 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

module.exports = { createSchool, getAllSchools };
