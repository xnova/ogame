
function requirements({ buildings, technologies, ships, defenses }) {
  const {
    DEUTERIUM_SYNTHESIZER,
    FUSION_REACTOR,
    ROBOTICS_FACTORY,
    NANITE_FACTORY,
    SHIPYARD,
    RESEARCH_LAB,
    TERRAFORMER,
    SPACE_DOCK,
    LUNAR_BASE,
    SENSOR_PHALANX,
    JUMP_GATE,
    MISSILE_SILO,
  } = buildings;
  const {
    ESPIONAGE_TECH,
    COMPUTER_TECH,
    WEAPONS_TECH,
    SHIELDING_TECH,
    ARMOUR_TECH,
    ENERGY_TECH,
    HYPERSPACE_TECH,
    COMBUSTION_DRIVE,
    IMPULSE_DRIVE,
    HYPERSPACE_DRIVE,
    LASER_TECH,
    ION_TECH,
    PLASMA_TECH,
    INTERGALACTIC_RESEARCH_NETWORK,
    ASTROPHYSICS,
    GRAVITON_TECH,
  } = technologies;
  const {
    SMALL_CARGO,
    LARGE_CARGO,
    LIGHT_FIGHTER,
    HEAVY_FIGHTER,
    CRUISER,
    BATTLESHIP,
    COLONY_SHIP,
    RECYCLER,
    ESPIONAGE_PROBE,
    BOMBER,
    SOLAR_SATELLITE,
    DESTROYER,
    DEATH_STAR,
    BATTLE_CRUISER,
  } = ships;
  const {
    ROCKET_LAUNCHER,
    LIGHT_LASER,
    HEAVY_LASER,
    GAUSS_CANNON,
    ION_CANNON,
    PLASMA_TURRET,
    SMALL_SHIELD_DOME,
    LARGE_SHIELD_DOME,
  } = defenses;

  FUSION_REACTOR.requires(DEUTERIUM_SYNTHESIZER, { level: 5 });
  FUSION_REACTOR.requires(ENERGY_TECH, { level: 3 });

  NANITE_FACTORY.requires(ROBOTICS_FACTORY, { level: 10 });
  NANITE_FACTORY.requires(COMPUTER_TECH, { level: 10 });

  SHIPYARD.requires(ROBOTICS_FACTORY, { level: 2 });

  TERRAFORMER.requires(NANITE_FACTORY, { level: 1 });
  TERRAFORMER.requires(ENERGY_TECH, { level: 12 });

  SPACE_DOCK.requires(SHIPYARD, { level: 2 });

  SENSOR_PHALANX.requires(LUNAR_BASE, { level: 1 });

  JUMP_GATE.requires(LUNAR_BASE, { level: 1 });
  JUMP_GATE.requires(HYPERSPACE_TECH, { level: 7 });

  MISSILE_SILO.requires(SHIPYARD, { level: 1 });

  ESPIONAGE_TECH.requires(RESEARCH_LAB, { level: 3 });

  COMPUTER_TECH.requires(RESEARCH_LAB, { level: 1 });

  WEAPONS_TECH.requires(RESEARCH_LAB, { level: 4 });

  SHIELDING_TECH.requires(ENERGY_TECH, { level: 3 });
  SHIELDING_TECH.requires(RESEARCH_LAB, { level: 6 });

  ARMOUR_TECH.requires(RESEARCH_LAB, { level: 2 });

  ENERGY_TECH.requires(RESEARCH_LAB, { level: 1 });

  HYPERSPACE_TECH.requires(RESEARCH_LAB, { level: 7 });
  HYPERSPACE_TECH.requires(ENERGY_TECH, { level: 5 });
  HYPERSPACE_TECH.requires(SHIELDING_TECH, { level: 5 });

  COMBUSTION_DRIVE.requires(RESEARCH_LAB, { level: 1 });
  COMBUSTION_DRIVE.requires(ENERGY_TECH, { level: 1 });

  IMPULSE_DRIVE.requires(RESEARCH_LAB, { level: 2 });
  IMPULSE_DRIVE.requires(ENERGY_TECH, { level: 1 });

  HYPERSPACE_DRIVE.requires(RESEARCH_LAB, { level: 7 });
  HYPERSPACE_DRIVE.requires(HYPERSPACE_TECH, { level: 3 });

  LASER_TECH.requires(RESEARCH_LAB, { level: 1 });
  LASER_TECH.requires(ENERGY_TECH, { level: 2 });

  ION_TECH.requires(RESEARCH_LAB, { level: 4 });
  ION_TECH.requires(LASER_TECH, { level: 5 });
  ION_TECH.requires(ENERGY_TECH, { level: 4 });

  PLASMA_TECH.requires(RESEARCH_LAB, { level: 4 });
  PLASMA_TECH.requires(ENERGY_TECH, { level: 8 });
  PLASMA_TECH.requires(LASER_TECH, { level: 10 });
  PLASMA_TECH.requires(ION_TECH, { level: 5 });

  INTERGALACTIC_RESEARCH_NETWORK.requires(COMPUTER_TECH, { level: 8 });
  INTERGALACTIC_RESEARCH_NETWORK.requires(HYPERSPACE_TECH, { level: 8 });
  INTERGALACTIC_RESEARCH_NETWORK.requires(RESEARCH_LAB, { level: 10 });

  ASTROPHYSICS.requires(RESEARCH_LAB, { level: 3 });
  ASTROPHYSICS.requires(ESPIONAGE_TECH, { level: 4 });
  ASTROPHYSICS.requires(IMPULSE_DRIVE, { level: 3 });

  GRAVITON_TECH.requires(RESEARCH_LAB, { level: 12 });

  SMALL_CARGO.requires(SHIPYARD, { level: 2 });
  SMALL_CARGO.requires(COMBUSTION_DRIVE, { level: 2 });

  LARGE_CARGO.requires(SHIPYARD, { level: 4 });
  LARGE_CARGO.requires(COMBUSTION_DRIVE, { level: 6 });

  LIGHT_FIGHTER.requires(SHIPYARD, { level: 1 });
  LIGHT_FIGHTER.requires(COMBUSTION_DRIVE, { level: 1 });

  HEAVY_FIGHTER.requires(SHIPYARD, { level: 3 });
  HEAVY_FIGHTER.requires(ARMOUR_TECH, { level: 2 });
  HEAVY_FIGHTER.requires(IMPULSE_DRIVE, { level: 2 });

  CRUISER.requires(SHIPYARD, { level: 5 });
  CRUISER.requires(IMPULSE_DRIVE, { level: 4 });
  CRUISER.requires(ION_TECH, { level: 2 });

  BATTLESHIP.requires(SHIPYARD, { level: 7 });
  BATTLESHIP.requires(HYPERSPACE_DRIVE, { level: 4 });

  COLONY_SHIP.requires(SHIPYARD, { level: 4 });
  COLONY_SHIP.requires(IMPULSE_DRIVE, { level: 3 });

  RECYCLER.requires(SHIPYARD, { level: 4 });
  RECYCLER.requires(COMBUSTION_DRIVE, { level: 6 });
  RECYCLER.requires(SHIELDING_TECH, { level: 2 });

  ESPIONAGE_PROBE.requires(SHIPYARD, { level: 3 });
  ESPIONAGE_PROBE.requires(COMBUSTION_DRIVE, { level: 3 });
  ESPIONAGE_PROBE.requires(ESPIONAGE_TECH, { level: 2 });

  BOMBER.requires(IMPULSE_DRIVE, { level: 6 });
  BOMBER.requires(SHIPYARD, { level: 8 });
  BOMBER.requires(PLASMA_TECH, { level: 5 });

  SOLAR_SATELLITE.requires(SHIPYARD, { level: 1 });

  DESTROYER.requires(SHIPYARD, { level: 9 });
  DESTROYER.requires(HYPERSPACE_DRIVE, { level: 6 });
  DESTROYER.requires(HYPERSPACE_TECH, { level: 5 });

  DEATH_STAR.requires(SHIPYARD, { level: 12 });
  DEATH_STAR.requires(GRAVITON_TECH, { level: 1 });
  DEATH_STAR.requires(HYPERSPACE_DRIVE, { level: 7 });
  DEATH_STAR.requires(HYPERSPACE_TECH, { level: 6 });

  BATTLE_CRUISER.requires(HYPERSPACE_TECH, { level: 5 });
  BATTLE_CRUISER.requires(LASER_TECH, { level: 12 });
  BATTLE_CRUISER.requires(HYPERSPACE_DRIVE, { level: 5 });
  BATTLE_CRUISER.requires(SHIPYARD, { level: 8 });

  ROCKET_LAUNCHER.requires(SHIPYARD, { level: 1 });

  LIGHT_LASER.requires(ENERGY_TECH, { level: 1 });
  LIGHT_LASER.requires(SHIPYARD, { level: 2 });
  LIGHT_LASER.requires(LASER_TECH, { level: 3 });

  HEAVY_LASER.requires(ENERGY_TECH, { level: 3 });
  HEAVY_LASER.requires(SHIPYARD, { level: 4 });
  HEAVY_LASER.requires(LASER_TECH, { level: 6 });

  GAUSS_CANNON.requires(SHIPYARD, { level: 6 });
  GAUSS_CANNON.requires(ENERGY_TECH, { level: 6 });
  GAUSS_CANNON.requires(WEAPONS_TECH, { level: 3 });
  GAUSS_CANNON.requires(SHIELDING_TECH, { level: 1 });

  ION_CANNON.requires(SHIPYARD, { level: 4 });
  ION_CANNON.requires(ION_TECH, { level: 4 });

  PLASMA_TURRET.requires(SHIPYARD, { level: 8 });
  PLASMA_TURRET.requires(PLASMA_TECH, { level: 7 });

  SMALL_SHIELD_DOME.requires(SHIELDING_TECH, { level: 2 });
  SMALL_SHIELD_DOME.requires(SHIPYARD, { level: 1 });

  LARGE_SHIELD_DOME.requires(SHIELDING_TECH, { level: 6 });
  LARGE_SHIELD_DOME.requires(SHIPYARD, { level: 6 });
}

export default requirements;
