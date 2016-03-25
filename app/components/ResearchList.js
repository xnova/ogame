import Relay from 'react-relay';
import ContentBox from './ContentBox';
import React, {
  View,
} from 'react-native';

const ResearchList = ({ me }) => {
  const basic = [me.energyTech, me.laserTech, me.ionTech, me.hyperspaceTech, me.plasmaTech];
  const drives = [me.combustionDrive, me.impulseDrive, me.hyperspaceDrive];
  const advanced = [me.espionageTech, me.computerTech, me.astrophysics,
    me.intergalacticResearchNetwork, me.gravitonTech];
  const combat = [me.weaponsTech, me.shieldingTech, me.armourTech];
  return (
    <View>
      <ContentBox title="Basic research" items={basic} />
      <ContentBox title="Drive research" items={drives} />
      <ContentBox title="Advanced research" items={advanced} />
      <ContentBox title="Combat research" items={combat} />
    </View>
  );
};

ResearchList.propTypes = {
  me: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(ResearchList, {
  fragments: {
    me: () => Relay.QL`
      fragment on Player {
        energyTech { id, name, level }
        laserTech { id, name, level }
        ionTech { id, name, level }
        hyperspaceTech { id, name, level }
        plasmaTech { id, name, level }
        combustionDrive { id, name, level }
        impulseDrive { id, name, level }
        hyperspaceDrive { id, name, level }
        espionageTech { id, name, level }
        computerTech { id, name, level }
        astrophysics { id, name, level }
        intergalacticResearchNetwork { id, name, level }
        gravitonTech { id, name, level }
        weaponsTech { id, name, level }
        shieldingTech { id, name, level }
        armourTech { id, name, level }
      }
    `,
  },
});
