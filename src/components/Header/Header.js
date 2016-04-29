/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.scss';
import Link from '../Link';
import Navigation from '../Navigation';
import LanguageSwitcher from '../LanguageSwitcher';

const messages = defineMessages({
  brand: {
    id: 'header.brand',
    defaultMessage: 'Your Company Brand',
    description: 'Brand name displayed in header',
  },
  bannerTitle: {
    id: 'header.banner.title',
    defaultMessage: 'React',
    description: 'Title in page header',
  },
  bannerDesc: {
    id: 'header.banner.desc',
    defaultMessage: 'Complex web apps made easy',
    description: 'Description in header',
  },
  tech: {
    id: 'tech',
    defaultMessage: 'Technologies',
    description: 'Description in header',
    metalMine: {
      id: 'tech.metalMine',
      defaultMessage: 'Metal Mine',
      description: 'name',
      desc: {
        id: 'tech.metalMine.desc',
        defaultMessage: 'Lorem ipsum', // TODO
        description: 'description',
      },
      longDesc: {
        id: 'tech.metalMine.longDesc',
        defaultMessage: 'Dolor sit amet', // TODO
        description: 'long description',
      },
    },
    smallCargo: {
      id: 'tech.smallCargo',
      defaultMessage: 'Small Cargo',
      description: 'name',
      desc: {
        id: 'tech.smallCargo.desc',
        defaultMessage: 'The small cargo is an agile ship which ' +
        'can quickly transport resources to other planets.',
        description: 'description',
      },
      longDesc: {
        id: 'tech.smallCargo.longDesc',
        defaultMessage: 'Dolor sit amet', // TODO
        description: 'The first ship built by any emperor, ' +
        'the small cargo is an agile resource moving ship that ' +
        'has a cargo capacity of 5,000 resource units. ' +
        'This multi-use ship not only has the ability to ' +
        'quickly transport resources between your colonies, ' +
        'but also accompanies larger fleets on raiding missions on enemy targets. ' +
        '[Ship refitted with Impulse Drives once you reach level 5]',
      },
    },
    largeCargo: {
      id: 'tech.largeCargo',
      defaultMessage: 'Large Cargo',
      description: 'name',
      desc: {
        id: 'tech.largeCargo.desc',
        defaultMessage: 'This cargo ship has a much larger cargo capacity than the small cargo, ' +
        'and is generally faster thanks to an improved drive.',
        description: 'description',
      },
      longDesc: {
        id: 'tech.largeCargo.longDesc',
        defaultMessage: 'As time evolved, ' +
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
        description: 'long description',
      },
    },
    lightFighter: {
      id: 'tech.lightFighter',
      defaultMessage: 'Light Fighter',
      description: 'name',
      desc: {
        id: 'tech.lightFighter.desc',
        defaultMessage: 'This is the first fighting ship all emperors will build. ' +
        'The light fighter is an agile ship, but vulnerable on its own. ' +
        'In mass numbers, they can become a great threat to any empire. ' +
        'They are the first to accompany small and large cargoes to ' +
        'hostile planets with minor defences.',
        description: 'description',
      },
      longDesc: {
        id: 'tech.lightFighter.longDesc',
        defaultMessage: 'This is the first fighting ship all emperors will build. ' +
        'The light fighter is an agile ship, but vulnerable when it is on its own. ' +
        'In mass numbers, they can become a great threat to any empire. ' +
        'They are the first to accompany small and large cargoes to ' +
        'hostile planets with minor defences.',
        description: 'long description',
      },
    },
    heavyFighter: {
      id: 'tech.heavyFighter',
      defaultMessage: 'Heavy Fighter',
      description: 'name',
      desc: {
        id: 'tech.heavyFighter.desc',
        defaultMessage: 'This fighter is better armoured and ' +
        'has a higher attack strength than the light fighter.',
        description: 'description',
      },
      longDesc: {
        id: 'tech.heavyFighter.longDesc',
        defaultMessage: 'In developing the heavy fighter, ' +
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
        description: 'long description',
      },
    },
    cruiser: {
      id: 'tech.cruiser',
      defaultMessage: 'Cruiser',
      description: 'name',
      desc: {
        id: 'tech.cruiser.desc',
        defaultMessage: 'Cruisers are armoured almost three times as heavily as heavy fighters and ' +
        'have more than twice the firepower. ' +
        'In addition, they are very fast.',
        description: 'description',
      },
      longDesc: {
        id: 'tech.cruiser.longDesc',
        defaultMessage: 'With the development of the heavy laser and the ion cannon, ' +
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
        description: 'long description',
      },
    },
    battleship: {
      id: 'tech.battleship',
      defaultMessage: 'Battleship',
      description: 'name',
      desc: {
        id: 'tech.battleship.desc',
        defaultMessage: 'Battleships form the backbone of a fleet. ' +
        'Their heavy cannons, ' +
        'high speed, and large cargo holds make them opponents to be taken seriously.',
        description: 'description',
      },
      longDesc: {
        id: 'tech.battleship.longDesc',
        defaultMessage: 'Once it became apparent that the cruiser was losing ground ' +
        'to the increasing number of defence structures it was facing, ' +
        'and with the loss of ships on missions at unacceptable levels, ' +
        'it was decided to build a ship that could face those same type ' +
        'of defence structures with as little loss as possible. ' +
        'After extensive development, the Battleship was born. ' +
        'Built to withstand the largest of battles, the Battleship features large cargo spaces, ' +
        'heavy cannons, and high hyperdrive speed. ' +
        'Once developed, ' +
        'it eventually turned out to be the backbone of every raiding Emperors fleet.',
        description: 'long description',
      },
    },
    colonyShip: {
      id: 'tech.colonyShip',
      defaultMessage: 'Colony Ship',
      description: 'name',
      desc: {
        id: 'tech.colonyShip.desc',
        defaultMessage: 'Vacant planets can be colonised with this ship.',
        description: 'description',
      },
      longDesc: {
        id: 'tech.colonyShip.longDesc',
        defaultMessage: 'In the 20th Century, Man decided to go for the stars. ' +
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
        description: 'long description',
      },
    },
    recycler: {
      id: 'tech.recycler',
      defaultMessage: 'Recycler',
      description: 'name',
      desc: {
        id: 'tech.recycler.desc',
        defaultMessage: 'Recyclers are the only ships able to ' +
        'harvest debris fields floating in a planet\'s orbit after combat.',
        description: 'description',
      },
      longDesc: {
        id: 'tech.recycler.longDesc',
        defaultMessage: 'Space battles became ever larger, ' +
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
        description: 'long description',
      },
    },
    espionageProbe: {
      id: 'tech.espionageProbe',
      defaultMessage: 'Espionage Probe',
      description: 'name',
      desc: {
        id: 'tech.espionageProbe.desc',
        defaultMessage: 'Espionage probes are small, ' +
        'agile drones that provide data on fleets and planets over great distances.',
        description: 'description',
      },
      longDesc: {
        id: 'tech.espionageProbe.longDesc',
        defaultMessage: 'Espionage probes are small, ' +
        'agile drones that provide data on fleets and planets. ' +
        'Fitted with specially designed engines, ' +
        'it allows them to cover vast distances in only a few minutes. ' +
        'Once in orbit around the target planet, ' +
        'they quickly collect data and transmit the report back via ' +
        'your Deep Space Network for evaluation. ' +
        'But there is a risk to the intelligent gathering aspect. ' +
        'During the time the report is transmitted back to your network, ' +
        'the signal can be detected by the target and the probes can be destroyed.',
        description: 'long description',
      },
    },
    bomber: {
      id: 'tech.bomber',
      defaultMessage: 'Bomber',
      description: 'name',
      desc: {
        id: 'tech.bomber.desc',
        defaultMessage: 'The bomber was developed especially to ' +
        'destroy the planetary defences of a world.',
        description: 'description',
      },
      longDesc: {
        id: 'tech.bomber.longDesc',
        defaultMessage: 'Over the centuries, ' +
        'as defences were starting to get larger and more sophisticated, ' +
        'fleets were starting to be destroyed at an alarming rate. ' +
        'It was decided that a new ship was needed to break defences to ensure maximum results. ' +
        'After years of research and development, the Bomber was created. ' +
        '' + // TODO check new paragraph
        'Using laser-guided targeting equipment and Plasma Bombs, ' +
        'the Bomber seeks out and destroys any defence mechanism it can find. ' +
        'As soon as the hyperspace drive is developed to Level 8, ' +
        'the Bomber is retrofitted with the hyperspace engine and can fly at higher speeds.',
        description: 'long description',
      },
    },
    solarSatellite: {
      id: 'tech.solarSatellite',
      defaultMessage: 'Solar Satellite',
      description: 'name',
      desc: {
        id: 'tech.solarSatellite.desc',
        defaultMessage: 'Solar satellites are simple platforms of solar cells, ' +
        'located in a high, stationary orbit. ' +
        'They gather sunlight and transmit it to the ground station via laser. ' +
        'A solar satellite produces 26 energy on this planet.',
        description: 'description',
      },
      longDesc: {
        id: 'tech.solarSatellite.longDesc',
        defaultMessage: 'Scientists discovered a method of transmitting electrical energy to ' +
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
        description: 'long description',
      },
    },
    destroyer: {
      id: 'tech.destroyer',
      defaultMessage: 'Destroyer',
      description: 'name',
      desc: {
        id: 'tech.destroyer.desc',
        defaultMessage: 'The destroyer is the king of the warships.',
        description: 'description',
      },
      longDesc: {
        id: 'tech.destroyer.longDesc',
        defaultMessage: 'The Destroyer is the result of years of work and development. ' +
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
        description: 'long description',
      },
    },
    deathStar: {
      id: 'tech.deathStar',
      defaultMessage: 'Death Star',
      description: 'name',
      desc: {
        id: 'tech.deathStar.desc',
        defaultMessage: 'The destructive power of the deathstar is unsurpassed.',
        description: 'description',
      },
      longDesc: {
        id: 'tech.deathStar.longDesc',
        defaultMessage: 'The Deathstar is the most powerful ship ever created. ' +
        'This moon sized ship is the only ship that can be seen with the naked eye on the ground. ' +
        'By the time you spot it, unfortunately, it is too late to do anything. ' +
        '' + // TODO new paragraph
        'Armed with a gigantic graviton cannon, ' +
        'the most advanced weapons system ever created in the Universe, ' +
        'this massive ship has not only the capability of destroying entire fleets and defences, ' +
        'but also has the capability of destroying entire moons. ' +
        'Only the most advanced empires have the capability to build a ship of this mammoth size.',
        description: 'long description',
      },
    },
    battleCruiser: {
      id: 'tech.battleCruiser',
      defaultMessage: 'Battlecruiser',
      description: 'name',
      desc: {
        id: 'tech.battleCruiser.desc',
        defaultMessage: 'The Battlecruiser is highly specialized in the interception of hostile fleets.',
        description: 'description',
      },
      longDesc: {
        id: 'tech.battleCruiser.longDesc',
        defaultMessage: 'This ship is one of the most advanced fighting ships ever ' +
        'to be developed, ' +
        'and is particularly deadly when it comes to destroying attacking fleets. ' +
        'With its improved laser cannons on board and advanced Hyperspace engine, ' +
        'the Battlecruiser is a serious force to be dealt with in any attack. ' +
        'Due to the ships design and its large weapons system, the cargo holds had to be cut, ' +
        'but this is compensated for by the lowered fuel consumption.',
        description: 'long description',
      },
    },
  },
});

function Header() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Navigation className={s.nav} />
        <Link className={s.brand} to="/">
          <img src={require('./logo-small.png')} width="38" height="38" alt="React" />
          <span className={s.brandTxt}>
            <FormattedMessage {...messages.brand} />
          </span>
        </Link>
        <LanguageSwitcher />
        <div className={s.banner}>
          <h1 className={s.bannerTitle}>
            <FormattedMessage {...messages.bannerTitle} />
          </h1>
          <FormattedMessage tagName="p" {...messages.bannerDesc} />
        </div>
      </div>
    </div>
  );
}

export default injectIntl(withStyles(s)(Header));
