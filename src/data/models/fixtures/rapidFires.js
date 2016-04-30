function rapidFires({ ships, defenses }) {
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
  } = defenses;

  SMALL_CARGO.rapidFires(ESPIONAGE_PROBE);
  SMALL_CARGO.rapidFires(SOLAR_SATELLITE);

  LARGE_CARGO.rapidFires(ESPIONAGE_PROBE);
  LARGE_CARGO.rapidFires(SOLAR_SATELLITE);

  LIGHT_FIGHTER.rapidFires(ESPIONAGE_PROBE);
  LIGHT_FIGHTER.rapidFires(SOLAR_SATELLITE);

  HEAVY_FIGHTER.rapidFires(ESPIONAGE_PROBE);
  HEAVY_FIGHTER.rapidFires(SOLAR_SATELLITE);
  HEAVY_FIGHTER.rapidFires(SMALL_CARGO, { value: 3 });

  CRUISER.rapidFires(ESPIONAGE_PROBE);
  CRUISER.rapidFires(SOLAR_SATELLITE);
  CRUISER.rapidFires(LIGHT_FIGHTER, { value: 6 });
  CRUISER.rapidFires(ROCKET_LAUNCHER, { value: 10 });

  BATTLESHIP.rapidFires(ESPIONAGE_PROBE);
  BATTLESHIP.rapidFires(SOLAR_SATELLITE);

  COLONY_SHIP.rapidFires(ESPIONAGE_PROBE);
  COLONY_SHIP.rapidFires(SOLAR_SATELLITE);

  RECYCLER.rapidFires(ESPIONAGE_PROBE);
  RECYCLER.rapidFires(SOLAR_SATELLITE);

  BOMBER.rapidFires(ESPIONAGE_PROBE);
  BOMBER.rapidFires(SOLAR_SATELLITE);
  BOMBER.rapidFires(ROCKET_LAUNCHER, { value: 20 });
  BOMBER.rapidFires(LIGHT_LASER, { value: 20 });
  BOMBER.rapidFires(HEAVY_LASER, { value: 10 });
  BOMBER.rapidFires(ION_CANNON, { value: 10 });

  DESTROYER.rapidFires(ESPIONAGE_PROBE);
  DESTROYER.rapidFires(SOLAR_SATELLITE);
  DESTROYER.rapidFires(LIGHT_LASER, { value: 10 });
  DESTROYER.rapidFires(BATTLE_CRUISER, { value: 2 });

  DEATH_STAR.rapidFires(SMALL_CARGO, { value: 250 });
  DEATH_STAR.rapidFires(LARGE_CARGO, { value: 250 });
  DEATH_STAR.rapidFires(LIGHT_FIGHTER, { value: 200 });
  DEATH_STAR.rapidFires(HEAVY_FIGHTER, { value: 100 });
  DEATH_STAR.rapidFires(CRUISER, { value: 33 });
  DEATH_STAR.rapidFires(BATTLESHIP, { value: 30 });
  DEATH_STAR.rapidFires(COLONY_SHIP, { value: 250 });
  DEATH_STAR.rapidFires(RECYCLER, { value: 250 });
  DEATH_STAR.rapidFires(ESPIONAGE_PROBE, { value: 1250 });
  DEATH_STAR.rapidFires(SOLAR_SATELLITE, { value: 1250 });
  DEATH_STAR.rapidFires(BOMBER, { value: 25 });
  DEATH_STAR.rapidFires(DESTROYER, { value: 5 });
  DEATH_STAR.rapidFires(ROCKET_LAUNCHER, { value: 200 });
  DEATH_STAR.rapidFires(LIGHT_LASER, { value: 200 });
  DEATH_STAR.rapidFires(HEAVY_LASER, { value: 100 });
  DEATH_STAR.rapidFires(GAUSS_CANNON, { value: 50 });
  DEATH_STAR.rapidFires(ION_CANNON, { value: 100 });
  DEATH_STAR.rapidFires(BATTLE_CRUISER, { value: 15 });

  BATTLE_CRUISER.rapidFires(ESPIONAGE_PROBE);
  BATTLE_CRUISER.rapidFires(SOLAR_SATELLITE);
  BATTLE_CRUISER.rapidFires(SMALL_CARGO, { value: 3 });
  BATTLE_CRUISER.rapidFires(LARGE_CARGO, { value: 3 });
  BATTLE_CRUISER.rapidFires(HEAVY_FIGHTER, { value: 4 });
  BATTLE_CRUISER.rapidFires(CRUISER, { value: 4 });
  BATTLE_CRUISER.rapidFires(BATTLESHIP, { value: 7 });
}

export default rapidFires;
