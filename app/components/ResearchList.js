import Relay from 'react-relay';
import ContentBox from './ContentBox';
import React, {
  View,
} from 'react-native';

const ResearchList = ({ me }) => {
  const { energyTech, laserTech } = me;
  const basicResearch = [energyTech, laserTech];
  return (
    <View>
      <ContentBox title="Basic research" items={basicResearch} />
      <ContentBox title="Drive research" items={[]} />
      <ContentBox title="Advanced research" items={[]} />
      <ContentBox title="Combat research" items={[]} />
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
      }
    `,
  },
});
