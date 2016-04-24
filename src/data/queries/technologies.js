import {
  EspionageTechType,
  ComputerTechType,
  WeaponsTechType,
  ShieldingTechType,
  ArmourTechType,
  EnergyTechType,
  HyperspaceTechType,
  CombustionDriveType,
  ImpulseDriveType,
  HyperspaceDriveType,
  LaserTechType,
  IonTechType,
  PlasmaTechType,
  IntergalacticResearchNetworkType,
  AstrophysicsType,
  GravitonTechType,
} from '../types/technologies';
import { Technology } from '../models';


class TechnologyQuery {
  constructor({ type, techId, name, description, longDescription }) {
    return {
      type,
      async resolve({ id: UserId }) {
        const where = { UserId, techId };
        let technology = await Technology.findOne({ where });
        if (!technology) {
          technology = Technology.build(where);
        }
        return Object.assign(technology, { name, description, longDescription });
      },
    };
  }
}

const espionageTech = new TechnologyQuery({
  type: EspionageTechType,
  techId: Technology.ESPIONAGE_TECH_ID,
  name: 'Energy Technology',
  description: 'The command of different types of energy is necessary ' +
  'for many new technologies.',
  longDescription: 'As various fields of research advanced, ' +
  'it was discovered that the current technology of energy distribution was not sufficient ' +
  'enough to begin certain specialized research. ' +
  'With each upgrade of your Energy Technology, ' +
  'new research can be conducted which unlocks development of ' +
  'more sophisticated ships and defences.',
});

const computerTech = new TechnologyQuery({
  type: ComputerTechType,
  techId: Technology.COMPUTER_TECH_ID,
  name: 'Computer Technology',
  description: 'More fleets can be commanded by increasing computer capacities. ' +
  'Each level of computer technology increases the maximum number of fleets by one.',
  longDescription: 'Once launched on any mission, fleets are controlled primarily by ' +
  'a series of computers located on the originating planet. ' +
  'These massive computers calculate the exact time of arrival, ' +
  'controls course corrections as needed, calculates trajectories, ' +
  'and regulates flight speeds.' +
  '' + // TODO check newline
  'With each level researched, the flight computer is upgraded to allow an additional ' +
  'slot to be launched. ' +
  'Computer technology should be continuously developed throughout the building of ' +
  'your empire.',
});

const weaponsTech = new TechnologyQuery({
  type: WeaponsTechType,
  techId: Technology.WEAPONS_TECH_ID,
  name: 'Weapons Technology',
  description: 'Weapons technology makes weapons systems more efficient. ' +
  'Each level of weapons technology increases the weapon strength ' +
  'of units by 10% of the base value.',
  longDescription: 'Weapons Technology is a key research technology and is critical to ' +
  'your survival against enemy Empires. ' +
  'With each level of Weapons Technology researched, ' +
  'the weapons systems on ships and your defence mechanisms ' +
  'become increasingly more efficient. ' +
  'Each level increases the base strength of your weapons by 10% of the base value.',
});

const shieldingTech = new TechnologyQuery({
  type: ShieldingTechType,
  techId: Technology.SHIELDING_TECH_ID,
  name: 'Shielding Technology',
  description: 'Shielding technology makes the shields on ships and defensive facilities ' +
  'more efficient. ' +
  'Each level of shield technology increases the strength of the shields by 10% of ' +
  'the base value.',
  longDescription: 'With the invention of the magnetosphere generator, scientists learned ' +
  'that an artificial shield could be produced to protect the crew in space ships not only ' +
  'from the harsh solar radiation environment in deep space, ' +
  'but also provide protection from enemy fire during an attack. ' +
  'Once scientists finally perfected the technology, a magnetosphere generator was installed ' +
  'on all ships and defence systems. ' +
  '' + // TODO check newline
  'As the technology is advanced to each level, ' +
  'the magnetosphere generator is upgraded which provides an additional 10% strength to ' +
  'the shields base value.',
});

const armourTech = new TechnologyQuery({
  type: ArmourTechType,
  techId: Technology.ARMOUR_TECH_ID,
  name: 'Armour Technology',
  description: 'Special alloys improve the armour on ships and defensive structures. ' +
  'The effectiveness of the armour can be increased by 10% per level.',
  longDescription: 'The environment of deep space is harsh. ' +
  'Pilots and crew on various missions not only faced intense solar radiation, ' +
  'they also faced the prospect of being hit by space debris, ' +
  'or destroyed by enemy fire in an attack. ' +
  'With the discovery of an aluminum-lithium titanium carbide alloy, ' +
  'which was found to be both light weight and durable, ' +
  'this afforded the crew a certain degree of protection. ' +
  'With each level of Armour Technology developed, a higher quality alloy is produced, ' +
  'which increases the armours strength by 10%.',
});

const energyTech = new TechnologyQuery({
  type: EnergyTechType,
  techId: Technology.ENERGY_TECH_ID,
  name: 'Energy Technology',
  description: 'The command of different types of energy is necessary ' +
  'for many new technologies.',
  longDescription: 'As various fields of research advanced, ' +
  'it was discovered that the current technology of energy distribution was not sufficient ' +
  'enough to begin certain specialized research. ' +
  'With each upgrade of your Energy Technology, ' +
  'new research can be conducted which unlocks development of ' +
  'more sophisticated ships and defences.',
});

const hyperspaceTech = new TechnologyQuery({
  type: HyperspaceTechType,
  techId: Technology.HYPERSPACE_TECH_ID,
  name: 'Hyperspace Technology',
  description: 'By integrating the 4th and 5th dimensions it is now possible ' +
  'to research a new kind of drive that is more economical and efficient.',
  longDescription: 'In theory, the idea of hyperspace travel relies on the existence of ' +
  'a separate and adjacent dimension. ' +
  'When activated, a hyperspace drive shunts the starship into this other dimension, ' +
  'where it can cover vast distances in an amount of time greatly reduced from the time ' +
  'it would take in "normal" space. ' +
  'Once it reaches the point in hyperspace that corresponds to ' +
  'its destination in real space, it re-emerges. ' +
  '' + // TODO check newline?
  'Once a sufficient level of Hyperspace Technology is researched, ' +
  'the Hyperspace Drive is no longer just a theory.',
});

const combustionDrive = new TechnologyQuery({
  type: CombustionDriveType,
  techId: Technology.COMBUSTION_DRIVE_ID,
  name: 'Combustion Drive',
  description: 'The development of this drive makes some ships faster, ' +
  'although each level increases speed by only 10% of the base value.',
  longDescription: 'The Combustion Drive is the oldest of technologies, ' +
  'but is still in use. With the Combustion Drive, ' +
  'exhaust is formed from propellants carried within the ship prior to use. ' +
  'In a closed chamber, ' +
  'the pressures are equal in each direction and no acceleration occurs. ' +
  'If an opening is provided at the bottom of the chamber then the pressure is no longer ' +
  'opposed on that side. ' +
  'The remaining pressure gives a resultant thrust in the side opposite the opening, ' +
  'which propels the ship forward by expelling the exhaust rearwards at extreme high speed.' +
  '' + // TODO check is newline
  'With each level of the Combustion Drive developed, ' +
  'the speed of small and large cargo ships, ' +
  'light fighters, recyclers, and espionage probes are increased by 10%.',
});

const impulseDrive = new TechnologyQuery({
  type: ImpulseDriveType,
  techId: Technology.IMPULSE_DRIVE_ID,
  name: 'Impulse Drive',
  description: 'The impulse drive is based on the reaction principle. ' +
  'Further development of this drive makes some ships faster, ' +
  'although each level increases speed by only 20% of the base value.',
  longDescription: 'The impulse drive is based on the recoil principle, by which ' +
  'the stimulated emission of radiation is mainly produced as a waste product from ' +
  'the core fusion to gain energy. ' +
  'Additionally, other masses can be injected. ' +
  'With each level of the Impulse Drive developed, ' +
  'the speed of bombers, cruisers, heavy fighters, and colony ships are increased by ' +
  '20% of the base value. ' +
  'The small transporter is also equipped with an impulse drive, as soon as the research ' +
  'reaches level 5. ' +
  'Recyclers will be equipped with an impulse drive once researched to level 17. ' +
  '' + // TODO check newline
  'Interplanetary missiles also travel farther with each level.',
});

const hyperspaceDrive = new TechnologyQuery({
  type: HyperspaceDriveType,
  techId: Technology.HYPERSPACE_DRIVE_ID,
  name: 'Hyperspace Drive',
  description: 'Hyperspace drive warps space around a ship. ' +
  'The development of this drive makes some ships faster, although each level ' +
  'increases speed by only 30% of the base value.',
  longDescription: 'In the immediate vicinity of the ship the space is warped so ' +
  'that long distances can be covered very quickly. ' +
  'The more the HyperSpace Drive is developed, the stronger the warped nature of the space, ' +
  'whereby the speed of the ships equipped with it (Battlecruiser, Battleships, Destroyer, ' +
  'Deathstar) increase by 30% per level. ' +
  'The bomber is also provided with a HyperSpace Drive as soon as ' +
  'the research level reaches 8. ' +
  'Recyclers will be upgraded to HyperSpace Drives once research gains level 15.',
});

const laserTech = new TechnologyQuery({
  type: LaserTechType,
  techId: Technology.LASER_TECH_ID,
  name: 'Laser Technology',
  description: 'Focusing light produces a beam that causes damage when it strikes an object.',
  longDescription: 'Lasers (light amplification by stimulated emission of radiation) produce ' +
  'an intense, energy rich emission of coherent light. ' +
  'These devices can be used in all sorts of areas, ' +
  'from optical computers to heavy laser weapons, ' +
  'which effortlessly cut through armour technology. ' +
  'The laser technology provides an important basis for research of other weapon technologies.',
});

const ionTech = new TechnologyQuery({
  type: IonTechType,
  techId: Technology.ION_TECH_ID,
  name: 'Ion Technology',
  description: 'The concentration of ions allows for the construction of cannons, ' +
  'which can inflict enormous damage and reduce the deconstruction costs per level by 4%.',
  longDescription: 'Ions can be concentrated and accelerated into a deadly beam. ' +
  'These beams can then inflict enormous damage. ' +
  'Our scientists have also developed a technique that will clearly reduce ' +
  'the deconstruction costs for buildings and systems. ' +
  'For each research level, the deconstruction costs will sink by 4%.',
});

const plasmaTech = new TechnologyQuery({
  type: PlasmaTechType,
  techId: Technology.PLASMA_TECH_ID,
  name: 'Plasma Technology',
  description: 'A further development of ion technology ' +
  'which accelerates high-energy plasma, ' +
  'which then inflicts devastating damage and additionally optimises the production of ' +
  'metal and crystal (1%/0.66% per level).',
  longDescription: 'A further development of ion technology that doesn\'t speed up ions ' +
  'but high-energy plasma instead, ' +
  'which can then inflict devastating damage on impact with an object. ' +
  'Our scientists have also found a way to noticeably improve the mining of ' +
  'metal and crystal using this technology. ' +
  '' + // TODO check new paragraph
  'Metal production increases by 1% and crystal production by 0.66% ' +
  'per construction level of the plasma technology.',
});

const intergalacticResearchNetwork = new TechnologyQuery({
  type: IntergalacticResearchNetworkType,
  techId: Technology.INTERGALACTIC_RESEARCH_NETWORK_ID,
  name: 'Intergalactic Research Network',
  description: 'Researchers on different planets communicate via this network.',
  longDescription: 'This is your deep space network to communicate research results to ' +
  'your colonies. ' +
  'With the IRN, ' +
  'faster research times can be achieved by linking the highest level research labs equal ' +
  'to the level of the IRN developed. ' +
  '' + // TODO check new paragraph
  'In order to function, each colony must be able to conduct the research independently.',
});

const astrophysics = new TechnologyQuery({
  type: AstrophysicsType,
  techId: Technology.ASTROPHYSICS_ID,
  name: 'Astrophysics',
  description: 'With an astrophysics research module, ships can undertake long expeditions. ' +
  'Every second level of this technology will allow you to colonise an extra planet.',
  longDescription: 'Further findings in the field of astrophysics allow for the construction ' +
  'of laboratories that can be fitted on more and more ships. ' +
  'This makes long expeditions far into unexplored areas of space possible. ' +
  'In addition these advancements can be used to further colonise the universe. ' +
  'For every two levels of this technology an additional planet can be made usable.',
});

const gravitonTech = new TechnologyQuery({
  type: GravitonTechType,
  techId: Technology.GRAVITON_TECH_ID,
  name: 'Graviton Technology',
  description: 'Firing a concentrated charge of graviton particles can create an ' +
  'artificial gravity field, which can destroy ships or even moons.',
  longDescription: 'A graviton is an elementary particle that is massless and has no cargo. ' +
  'It determines the gravitational power. ' +
  'By firing a concentrated load of gravitons, ' +
  'an artificial gravitational field can be constructed. ' +
  'Not unlike a black hole, it draws mass into itself. ' +
  'Thus it can destroy ships and even entire moons. ' +
  'To produce a sufficient amount of gravitons, huge amounts of energy are required.',
});


export default {
  // basic research
  energyTech,
  laserTech,
  ionTech,
  hyperspaceTech,
  plasmaTech,
  // drive research
  combustionDrive,
  impulseDrive,
  hyperspaceDrive,
  // advanced research
  espionageTech,
  computerTech,
  astrophysics,
  intergalacticResearchNetwork,
  gravitonTech,
  // combat research
  weaponsTech,
  shieldingTech,
  armourTech,
};
