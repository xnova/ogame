import {
  MetalMineType,
  CrystalMineType,
  DeuteriumSynthesizerType,
  SolarPlantType,
  FusionReactorType,
  RoboticsFactoryType,
  NaniteFactoryType,
  ShipyardType,
  MetalStorageType,
  CrystalStorageType,
  DeuteriumTankType,
  ResearchLabType,
  TerraformerType,
  AllianceDepotType,
  MissileSiloType,
} from '../types/buildings';
import { Building } from '../models';


class BuildingQuery {
  constructor({ type, techId, name, description, longDescription }) {
    return {
      type,
      async resolve({ planet }) {
        const where = { PlanetId: 1, techId };
        let building = await Building.findOne({ where });
        if (!building) {
          building = Building.build(where);
        }
        return Object.assign(building, { name, description, longDescription });
      },
    };
  }
}

const metalMine = new BuildingQuery({
  type: MetalMineType,
  techId: Building.METAL_MINE_ID,
  name: 'Metal Mine',
  description: 'Used in the extraction of metal ore, ' +
  'metal mines are of primary importance to all emerging and established empires.',
  longDescription: 'Metal is the primary resource used in the foundation of your Empire. ' +
  'At greater depths, ' +
  'the mines can produce more output of viable metal for use in ' +
  'the construction of buildings, ships, defence systems, and research. ' +
  'As the mines drill deeper, more energy is required for maximum production. ' +
  'As metal is the most abundant of all resources available, ' +
  'its value is considered to be the lowest of all resources for trading.',
});

const crystalMine = new BuildingQuery({
  type: CrystalMineType,
  techId: Building.CRYSTAL_MINE_ID,
  name: 'Crystal Mine',
  description: 'Crystals are the main resource used ' +
  'to build electronic circuits and form certain alloy compounds.',
  longDescription: 'Crystal mines supply the main resource used ' +
  'to produce electronic circuits and from certain alloy compounds. ' +
  'Mining crystal consumes some one and half times more energy than a mining metal, ' +
  'making crystal more valuable. ' +
  'Almost all ships and all buildings require crystal. ' +
  'Most crystals required to build spaceships, however, are very rare, ' +
  'and like metal can only be found at a certain depth. ' +
  'Therefore, building mines in deeper strata will increase the amount of crystal produced.',
});

const deuteriumSynthesizer = new BuildingQuery({
  type: DeuteriumSynthesizerType,
  techId: Building.DEUTERIUM_SYNTHESIZER_ID,
  name: 'Deuterium Synthesizer',
  description: 'Deuterium Synthesizers draw the trace Deuterium content ' +
  'from the water on a planet.',
  longDescription: 'Deuterium is also called heavy hydrogen. ' +
  'It is a stable isotope of hydrogen with a natural abundance in the oceans of colonies ' +
  'of approximately one atom in 6500 of hydrogen (~154 PPM). ' +
  'Deuterium thus accounts for approximately 0.015% (on a weight basis, 0.030%) of all. ' +
  'Deuterium is processed by special synthesizers which can separate ' +
  'the water from the Deuterium using specially designed centrifuges. ' +
  'The upgrade of the synthesizer allows for increasing ' +
  'the amount of Deuterium deposits processed. ' +
  'Deuterium is used when carrying out sensor phalanx scans, viewing galaxies, ' +
  'as fuel for ships, and performing specialized research upgrades.',
});

const solarPlant = new BuildingQuery({
  type: SolarPlantType,
  techId: Building.SOLAR_PLANT_ID,
  name: 'Solar Plant',
  description: 'Solar power plants absorb energy from solar radiation. ' +
  'All mines need energy to operate.',
  longDescription: 'Gigantic solar arrays are used to generate power for ' +
  'the mines and the deuterium synthesizer. ' +
  'As the solar plant is upgraded, ' +
  'the surface area of the photovoltaic cells covering the planet increases, ' +
  'resulting in a higher energy output across the power grids of your planet.',
});

const fusionReactor = new BuildingQuery({
  type: FusionReactorType,
  techId: Building.FUSION_REACTOR_ID,
  name: 'Fusion Reactor',
  description: 'The fusion reactor uses deuterium to produce energy.',
  longDescription: 'In fusion power plants, ' +
  'hydrogen nuclei are fused into helium nuclei under enormous temperature and pressure, ' +
  'releasing tremendous amounts of energy. ' +
  'For each gram of Deuterium consumed, up to 41,32*10^-13 Joule of energy can be produced; ' +
  'with 1 g you are able to produce 172 MWh energy.' +
  '' + // TODO new paragraph
  'Larger reactor complexes use more deuterium and can produce more energy per hour. ' +
  'The energy effect could be increased by researching energy technology. ' +
  '' + // TODO new paragraph
  'The energy production of the fusion plant is calculated like that: ' + // TODO newline
  '30 * [Level Fusion Plant] * ' +
  '(1,05 + [Level Energy Technology] * 0,01) ^ [Level Fusion Plant]',
});

const roboticsFactory = new BuildingQuery({
  type: RoboticsFactoryType,
  techId: Building.ROBOTICS_FACTORY_ID,
  name: 'Robotics Factory',
  description: 'Robotic factories provide construction robots to ' +
  'aid in the construction of buildings. ' +
  'Each level increases the speed of the upgrade of buildings.',
  longDescription: 'The Robotics Factory primary goal is the production of ' +
  'State of the Art construction robots. ' +
  'Each upgrade to the robotics factory results in the production of faster robots, ' +
  'which is used to reduce the time needed to construct buildings.',
});

const naniteFactory = new BuildingQuery({
  type: NaniteFactoryType,
  techId: Building.NANITE_FACTORY_ID,
  name: 'Nanite Factory',
  description: 'This is the ultimate in robotics technology. ' +
  'Each level cuts the construction time for buildings, ships, and defences.',
  longDescription: 'A nanomachine, also called a nanite, ' +
  'is a mechanical or electromechanical device whose dimensions are measured in nanometers ' +
  '(millionths of a millimeter, or units of 10^-9 meter). ' +
  'The microscopic size of nanomachines translates into higher operational speed. ' +
  'This factory produces nanomachines that are ' +
  'the ultimate evolution in robotics technology. ' +
  'Once constructed, ' +
  'each upgrade significantly decreases production time for buildings, ships, ' +
  'and defensive structures.',
});

const shipyard = new BuildingQuery({
  type: ShipyardType,
  techId: Building.SHIPYARD_ID,
  name: 'Shipyard',
  description: 'All types of ships and defensive facilities are built ' +
  'in the planetary shipyard.',
  longDescription: 'The planetary shipyard is responsible for ' +
  'the construction of spacecraft and defensive mechanisms. ' +
  'As the shipyard is upgraded, ' +
  'it can produce a wider variety of vehicles at a much greater rate of speed. ' +
  'If a nanite factory is present on the planet, ' +
  'the speed at which ships are constructed is massively increased.',
});

const metalStorage = new BuildingQuery({
  type: MetalStorageType,
  techId: Building.METAL_STORAGE_ID,
  name: 'Metal Storage',
  description: 'Provides storage for excess metal.',
  longDescription: 'This storage facility is used to store metal ore. ' +
  'Each level of upgrading increases the amount of metal ore that can be stored. ' +
  'If the storage capacity is exceeded, ' +
  'the metal mines are automatically shut down ' +
  'to prevent a catastrophic collapse in the metal mine shafts.',
});

const crystalStorage = new BuildingQuery({
  type: CrystalStorageType,
  techId: Building.CRYSTAL_STORAGE_ID,
  name: 'Crystal Storage',
  description: 'Provides storage for excess crystal.',
  longDescription: 'Raw crystal is stored in this building. ' +
  'With each level of upgrade, it increases the amount of crystal can be stored. ' +
  'Once the mines output exceeds the storage capacity, ' +
  'the crystal mines automatically shut down to prevent a collapse in the mines.',
});

const deuteriumTank = new BuildingQuery({
  type: DeuteriumTankType,
  techId: Building.DEUTERIUM_TANK_ID,
  name: 'Deuterium Tank',
  description: 'Giant tanks for storing newly-extracted deuterium.',
  longDescription: 'The Deuterium tank is for storing newly-synthesized deuterium. ' +
  'Once it is processed by the synthesizer, it is piped into this tank for later use. ' +
  'With each upgrade of the tank, the total storage capacity is increased. ' +
  'Once the capacity is reached, ' +
  'the Deuterium Synthesizer is shut down to prevent the tanks rupture.',
});

const researchLab = new BuildingQuery({
  type: ResearchLabType,
  techId: Building.RESEARCH_LAB_ID,
  name: 'Research Lab',
  description: 'A research lab is required in order to conduct research into new technologies.',
  longDescription: 'An essential part of any empire, ' +
  'Research Labs are where new technologies are discovered and ' +
  'older technologies are improved upon. ' +
  'With each level of the Research Lab constructed, ' +
  'the speed in which new technologies are researched is increased, ' +
  'while also unlocking newer technologies to research. ' +
  'In order to conduct research as quickly as possible, ' +
  'research scientists are immediately dispatched to ' +
  'the colony to begin work and development. ' +
  'In this way, ' +
  'knowledge about new technologies can easily be disseminated throughout the empire.',
});

const terraformer = new BuildingQuery({
  type: TerraformerType,
  techId: Building.TERRAFORMER_ID,
  name: 'Terraformer',
  description: 'The terraformer increases the usable surface of planets.',
  longDescription: 'With the ever increasing mining of a colony, a problem arose. ' +
  'How can we continue to operate at a planets capacity and still survive? ' +
  'The land is being mined out and the atmosphere is deteriorating. ' +
  'Mining a colony to capacity can not only destroy the planet, ' +
  'but may kill all life on it. ' +
  'Scientists working feverishly discovered a method of ' +
  'creating enormous land masses using nanomachines. ' +
  'The Terraformer was born.' +
  '' + // TODO check new paragraph
  ' Once built, the Terraformer cannot be torn down.',
});

const allianceDepot = new BuildingQuery({
  type: AllianceDepotType,
  techId: Building.ALLIANCE_DEPOT_ID,
  name: 'Alliance Depot',
  description: 'The alliance depot supplies fuel to friendly fleets ' +
  'in orbit helping with defence.',
  longDescription: 'The alliance depot supplies fuel to friendly fleets ' +
  'in orbit helping with defence. ' +
  'For each upgrade level of the alliance depot, ' +
  'a special demand of deuterium per hour can be sent to an orbiting fleet.',
});

const missileSilo = new BuildingQuery({
  type: MissileSiloType,
  techId: Building.MISSILE_SILO_ID,
  name: 'Missile Silo',
  description: 'Missile silos are used to store missiles.',
  longDescription: 'Missile silos are used to construct, ' +
  'store and launch interplanetary and anti-ballistic missiles. ' +
  'With each level of the silo, ' +
  'five interplanetary missiles or ten anti-ballistic missiles can be stored. ' +
  'Storage of both Interplanetary missiles and Anti-Ballistic missiles ' +
  'in the same silo is allowed.',
});

export default {
  allianceDepot,
  crystalMine,
  crystalStorage,
  deuteriumSynthesizer,
  deuteriumTank,
  fusionReactor,
  metalMine,
  metalStorage,
  missileSilo,
  naniteFactory,
  researchLab,
  roboticsFactory,
  shipyard,
  solarPlant,
  terraformer,
};
