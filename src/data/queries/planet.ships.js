import {
  GraphQLList as ListType,
} from 'graphql';

import {
  ShipType,
  SmallCargoType,
  LargeCargoType,
  LightFighterType,
  HeavyFighterType,
  CruiserType,
  BattleshipType,
  ColonyShipType,
  RecyclerType,
  EspionageProbeType,
  BomberType,
  SolarSatelliteType,
  DestroyerType,
  DeathStarType,
  BattleCruiserType,
} from '../types/ships';
import { Ship } from '../models';


class ShipQuery {
  constructor({ type, techId, name, description, longDescription }) {
    return {
      type,
      async resolve({ id: PlanetId }) {
        const where = { PlanetId, techId };
        let ship = await Ship.findOne({ where });
        if (!ship) {
          ship = Ship.build(where);
        }
        return Object.assign(ship, { name, description, longDescription });
      },
    };
  }
}


const smallCargo = new ShipQuery({
  type: SmallCargoType,
  techId: Ship.SMALL_CARGO_ID,
  name: 'Small Cargo',
  description: 'The small cargo is an agile ship which ' +
  'can quickly transport resources to other planets.',
  longDescription: 'The first ship built by any emperor, ' +
  'the small cargo is an agile resource moving ship that ' +
  'has a cargo capacity of 5,000 resource units. ' +
  'This multi-use ship not only has the ability to ' +
  'quickly transport resources between your colonies, ' +
  'but also accompanies larger fleets on raiding missions on enemy targets. ' +
  '[Ship refitted with Impulse Drives once you reach level 5]',
});

const largeCargo = new ShipQuery({
  type: LargeCargoType,
  techId: Ship.LARGE_CARGO_ID,
  name: 'Large Cargo',
  description: 'This cargo ship has a much larger cargo capacity than the small cargo, ' +
  'and is generally faster thanks to an improved drive.',
  longDescription: 'As time evolved, ' +
  'the raids on colonies resulted in larger and larger amounts of resources being captured. ' +
  'As a result, ' +
  'Small Cargos were being sent out in mass numbers to compensate for the larger captures. ' +
  'It was quickly learned that a new class of ship was needed to ' +
  'maximize resources captured in raids, ' +
  'yet also be cost effective. ' +
  'After much development, the Large Cargo was born. ' +
  '' + // TODO new paragraph
  'To maximize the resources that can be stored in the holds, ' +
  'this ship has little in the way of weapons or armor. ' +
  'Thanks to the highly developed combustion engine installed, ' +
  'it serves as the most economical resource supplier between planets, ' +
  'and most effective in raids on hostile worlds.',
});

const lightFighter = new ShipQuery({
  type: LightFighterType,
  techId: Ship.LIGHT_FIGHTER_ID,
  name: 'Light Fighter',
  description: 'This is the first fighting ship all emperors will build. ' +
  'The light fighter is an agile ship, but vulnerable on its own. ' +
  'In mass numbers, they can become a great threat to any empire. ' +
  'They are the first to accompany small and large cargoes to ' +
  'hostile planets with minor defences.',
  longDescription: 'This is the first fighting ship all emperors will build. ' +
  'The light fighter is an agile ship, but vulnerable when it is on its own. ' +
  'In mass numbers, they can become a great threat to any empire. ' +
  'They are the first to accompany small and large cargoes to ' +
  'hostile planets with minor defences.',
});

const heavyFighter = new ShipQuery({
  type: HeavyFighterType,
  techId: Ship.HEAVY_FIGHTER_ID,
  name: 'Heavy Fighter',
  description: 'This fighter is better armoured and ' +
  'has a higher attack strength than the light fighter.',
  longDescription: 'In developing the heavy fighter, ' +
  'researchers reached a point at which conventional drives ' +
  'no longer provided sufficient performance. ' +
  'In order to move the ship optimally, the impulse drive was used for the first time. ' +
  'This increased the costs, but also opened new possibilities. ' +
  'By using this drive, there was more energy left for weapons and shields; ' +
  ' addition, high-quality materials were used for this new family of fighters. ' +
  'With these changes, ' +
  'the heavy fighter represents a new era in ship technology and ' +
  'is the basis for cruiser technology. ' +
  '' + // TODO new paragraph
  'Slightly larger than the light fighter, ' +
  'the heavy fighter has thicker hulls, providing more protection, and stronger weaponry.',
});

const cruiser = new ShipQuery({
  type: CruiserType,
  techId: Ship.CRUISER_ID,
  name: 'Cruiser',
  description: 'Cruisers are armoured almost three times as heavily as heavy fighters and ' +
  'have more than twice the firepower. ' +
  'In addition, they are very fast.',
  longDescription: 'With the development of the heavy laser and the ion cannon, ' +
  'light and heavy fighters encountered an alarmingly high number ' +
  'of defeats that increased with each raid. ' +
  'Despite many modifications, weapons strength and armour changes, ' +
  'it could not be increased fast enough to ' +
  'effectively counter these new defensive measures. ' +
  'Therefore, ' +
  'it was decided to build a new class of ship that combined more armor and more firepower. ' +
  'As a result of years of research and development, the Cruiser was born. ' +
  '' + // TODO new paragraph
  'Cruisers are armored almost three times of that of the heavy fighters, ' +
  'and possess more than twice the firepower of any combat ship in existence. ' +
  'They also possess speeds that far surpassed any spacecraft ever made. ' +
  'For almost a century, cruisers dominated the universe. ' +
  'However, with the development of Gauss cannons and plasma turrets, ' +
  'their predominance ended. ' +
  'They are still used today against fighter groups, but not as predominantly as before.',
});

const battleship = new ShipQuery({
  type: BattleshipType,
  techId: Ship.BATTLESHIP_ID,
  name: 'Battleship',
  description: 'Battleships form the backbone of a fleet. ' +
  'Their heavy cannons, ' +
  'high speed, and large cargo holds make them opponents to be taken seriously.',
  longDescription: 'Once it became apparent that the cruiser was losing ground ' +
  'to the increasing number of defence structures it was facing, ' +
  'and with the loss of ships on missions at unacceptable levels, ' +
  'it was decided to build a ship that could face those same type ' +
  'of defence structures with as little loss as possible. ' +
  'After extensive development, the Battleship was born. ' +
  'Built to withstand the largest of battles, the Battleship features large cargo spaces, ' +
  'heavy cannons, and high hyperdrive speed. ' +
  'Once developed, ' +
  'it eventually turned out to be the backbone of every raiding Emperors fleet.',
});

const colonyShip = new ShipQuery({
  type: ColonyShipType,
  techId: Ship.COLONY_SHIP_ID,
  name: 'Colony Ship',
  description: 'Vacant planets can be colonised with this ship.',
  longDescription: 'In the 20th Century, Man decided to go for the stars. ' +
  'First, it was landing on the Moon. ' +
  'After that, a space station was built. ' +
  'Mars was colonized soon afterwards. ' +
  'It was soon determined that our growth depended on colonizing other worlds. ' +
  'Scientists and engineers all over the world gathered together ' +
  'to develop mans greatest achievement ever. ' +
  'The Colony Ship is born. ' +
  '' + // TODO new paragraph
  'This ship is used to prepare a newly discovered planet for colonization. ' +
  'Once it arrives at the destination, ' +
  'the ship is instantly transformed into habitual living space to assist in ' +
  'populating and mining the new world. ' +
  'The maximum number of planets is thereby determined by ' +
  'the progress in astrophysics research. ' +
  'Two new levels of Astrotechnology allow for the colonization of one additional planet.',
  // TODO wtf is Astrotechnology?
});

const recycler = new ShipQuery({
  type: RecyclerType,
  techId: Ship.RECYCLER_ID,
  name: 'Recycler',
  description: 'Recyclers are the only ships able to ' +
  'harvest debris fields floating in a planet\'s orbit after combat.',
  longDescription: 'Space battles became ever larger, ' +
  'ever fiercer, with thousands of ships being destroyed, ' +
  'the resources in the wreckage seemingly lost forever in giant debris fields. ' +
  'Normal cargo ships couldn\'t get close enough to these fields without ' +
  'risking substantial damage. ' +
  'Following the development of new shield technologies, ' +
  'it became possible to build a new class of ship capable of dealing with this problem: ' +
  'the Recycler was born. ' +
  'These new workhorses were able to gather up the resources so long believed lost, ' +
  'and allow them to be recycled. ' +
  'Thanks to their new shields, the wreckage no longer presented a danger, ' +
  'but the size of the generators reduced the size of the ship\'s hold such that ' +
  'each Recycler is limited to a capacity of 20,000. ' +
  '' + // TODO new paragraph
  'As soon as Impulse Drive research has reached level 17, ' +
  'Recyclers are refitted with Impulse Drives. ' +
  'As soon as Hyperspace Drive research has reached level 15, ' +
  'Recyclers are refitted with Hyperspace Drives.',
});

const espionageProbe = new ShipQuery({
  type: EspionageProbeType,
  techId: Ship.ESPIONAGE_PROBE_ID,
  name: 'Espionage Probe',
  description: 'Espionage probes are small, ' +
  'agile drones that provide data on fleets and planets over great distances.',
  longDescription: 'Espionage probes are small, ' +
  'agile drones that provide data on fleets and planets. ' +
  'Fitted with specially designed engines, ' +
  'it allows them to cover vast distances in only a few minutes. ' +
  'Once in orbit around the target planet, ' +
  'they quickly collect data and transmit the report back via ' +
  'your Deep Space Network for evaluation. ' +
  'But there is a risk to the intelligent gathering aspect. ' +
  'During the time the report is transmitted back to your network, ' +
  'the signal can be detected by the target and the probes can be destroyed.',
});

const bomber = new ShipQuery({
  type: BomberType,
  techId: Ship.BOMBER_ID,
  name: 'Bomber',
  description: 'The bomber was developed especially to ' +
  'destroy the planetary defences of a world.',
  longDescription: 'Over the centuries, ' +
  'as defences were starting to get larger and more sophisticated, ' +
  'fleets were starting to be destroyed at an alarming rate. ' +
  'It was decided that a new ship was needed to break defences to ensure maximum results. ' +
  'After years of research and development, the Bomber was created. ' +
  '' + // TODO check new paragraph
  'Using laser-guided targeting equipment and Plasma Bombs, ' +
  'the Bomber seeks out and destroys any defence mechanism it can find. ' +
  'As soon as the hyperspace drive is developed to Level 8, ' +
  'the Bomber is retrofitted with the hyperspace engine and can fly at higher speeds.',
});

const solarSatellite = new ShipQuery({
  type: SolarSatelliteType,
  techId: Ship.SOLAR_SATELLITE_ID,
  name: 'Solar Satellite',
  description: 'Solar satellites are simple platforms of solar cells, ' +
  'located in a high, stationary orbit. ' +
  'They gather sunlight and transmit it to the ground station via laser. ' +
  'A solar satellite produces 26 energy on this planet.',
  longDescription: 'Scientists discovered a method of transmitting electrical energy to ' +
  'the colony using specially designed satellites in a geosynchronous orbit. ' +
  'Solar Satellites gather solar energy and ' +
  'transmit it to a ground station using advanced laser technology. ' +
  'The efficiency of a solar satellite depends on the strength of ' +
  'the solar radiation it receives. ' +
  'In principle, ' +
  'energy production in orbits closer to the sun is greater than for ' +
  'planets in orbits distant from the sun. ' +
  'Due to their good cost/performance ratio solar satellites can ' +
  'solve a lot of energy problems. ' +
  'But beware: Solar satellites can be easily destroyed in battle.',
});

const destroyer = new ShipQuery({
  type: DestroyerType,
  techId: Ship.DESTROYER_ID,
  name: 'Destroyer',
  description: 'The destroyer is the king of the warships.',
  longDescription: 'The Destroyer is the result of years of work and development. ' +
  'With the development of Deathstars, ' +
  'it was decided that a class of ship was needed to defend against such a massive weapon. ' +
  'Thanks to its improved homing sensors, ' +
  'multi-phalanx Ion cannons, Gauss Cannons and Plasma Turrets, ' +
  'the Destroyer turned out to be one of the most fearsome ships created. ' +
  '' + // TODO new paragraph
  'Because the destroyer is very large, its manoeuvrability is severely limited, ' +
  'which makes it more of a battle station than a fighting ship. ' +
  'The lack of manoeuvrability is made up for by its sheer firepower, ' +
  'but it also costs significant amounts of deuterium to build and operate.',
});

const deathStar = new ShipQuery({
  type: DeathStarType,
  techId: Ship.DEATH_STAR_ID,
  name: 'Death Star',
  description: 'The destructive power of the deathstar is unsurpassed.',
  longDescription: 'The Deathstar is the most powerful ship ever created. ' +
  'This moon sized ship is the only ship that can be seen with the naked eye on the ground. ' +
  'By the time you spot it, unfortunately, it is too late to do anything. ' +
  '' + // TODO new paragraph
  'Armed with a gigantic graviton cannon, ' +
  'the most advanced weapons system ever created in the Universe, ' +
  'this massive ship has not only the capability of destroying entire fleets and defences, ' +
  'but also has the capability of destroying entire moons. ' +
  'Only the most advanced empires have the capability to build a ship of this mammoth size.',
});

const battleCruiser = new ShipQuery({
  type: BattleCruiserType,
  techId: Ship.BATTLE_CRUISER_ID,
  name: 'Battlecruiser',
  description: 'The Battlecruiser is highly specialized in the interception of hostile fleets.',
  longDescription: 'This ship is one of the most advanced fighting ships ever ' +
  'to be developed, ' +
  'and is particularly deadly when it comes to destroying attacking fleets. ' +
  'With its improved laser cannons on board and advanced Hyperspace engine, ' +
  'the Battlecruiser is a serious force to be dealt with in any attack. ' +
  'Due to the ships design and its large weapons system, the cargo holds had to be cut, ' +
  'but this is compensated for by the lowered fuel consumption.',
});

const KEY_MAP = new Map([
  ['smallCargo', Ship.SMALL_CARGO_ID],
  ['largeCargo', Ship.LARGE_CARGO_ID],
  ['lightFighter', Ship.LIGHT_FIGHTER_ID],
  ['heavyFighter', Ship.HEAVY_FIGHTER_ID],
  ['cruiser', Ship.CRUISER_ID],
  ['battleship', Ship.BATTLESHIP_ID],
  ['colonyShip', Ship.COLONY_SHIP_ID],
  ['recycler', Ship.RECYCLER_ID],
  ['espionageProbe', Ship.ESPIONAGE_PROBE_ID],
  ['bomber', Ship.BOMBER_ID],
  ['solarSatellite', Ship.SOLAR_SATELLITE_ID],
  ['destroyer', Ship.DESTROYER_ID],
  ['deathStar', Ship.DEATH_STAR_ID],
  ['battleCruiser', Ship.BATTLE_CRUISER_ID],
]);

const ships = {
  type: new ListType(ShipType),
  async resolve({ id: PlanetId }) {
    let where = { PlanetId };
    const planetShips = await Ship.findAll({ where }); // TODO
    let shipsList = [];
    for (let techId of KEY_MAP.values()) {
      where = { PlanetId, techId };
      shipsList.push(Ship.build(where));
    }
    return shipsList;
  },
};

const ship = {
  type: ShipType,
  resolve({ id: PlanetId }) {
    return null; // TODO
  },
};


export default {
  ships,
  ship,
  solarSatellite,
};
