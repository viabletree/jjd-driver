import React from 'react';
import _ from 'lodash';
import {View, Switch, ScrollView} from 'react-native';
import {Text, Image, CustomNavbar, Fab} from '../../components';
import styles from './AdditionalVehicleInfoStyles';
import {Fonts, Colors, AppStyles, Images} from '../../theme';
import SwitchItem from './SwitchItem';
export default function AdditionalVehicleInfoView(props) {
  const {
    tailLift,
    lowLoader,
    sideCurtains,
    onSwitchChange,
    vehicles,
    wheelBase,
    lwb,
    xlwb,
    onSubmit,
    loading,
    lutonVanDisable,
    largeVanDisable,
  } = props;

  return (
    <View style={styles.container}>
      <CustomNavbar hasBorder={false} />

      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.content}>
          <Text size={Fonts.size.xxv}>A bit More Information</Text>
          <Text size={Fonts.size.xiv}>Almost done…</Text>
          <View style={styles.mainContainer}>
            <SwitchItem
              title="Tail Lift"
              subTitle="XL Van"
              image={Images.tail_lift}
              value={tailLift}
              onChange={onSwitchChange}
              slug="tailLift"
              disabled={lutonVanDisable}
            />
            <SwitchItem
              title="Lower Loader"
              subTitle="XL Van"
              image={Images.low_loader}
              value={lowLoader}
              onChange={onSwitchChange}
              slug="lowLoader"
              disabled={lutonVanDisable}
            />
            <SwitchItem
              title="Side Curtains"
              subTitle="XL Van"
              image={Images.side_curtain}
              value={sideCurtains}
              onChange={onSwitchChange}
              slug="sideCurtains"
              disabled={lutonVanDisable}
            />
            <SwitchItem
              title="LWB"
              subTitle="Large Van"
              image={Images.lwb}
              value={lwb}
              onChange={onSwitchChange}
              slug="lwb"
              disabled={largeVanDisable}
            />
            <SwitchItem
              title="XLWB"
              subTitle="Large Van"
              image={Images.xlwb}
              value={xlwb}
              onChange={onSwitchChange}
              slug="xlwb"
              disabled={largeVanDisable}
            />
          </View>
        </View>
      </ScrollView>
      <Fab onPress={onSubmit} loading={loading} />
    </View>
  );
}
