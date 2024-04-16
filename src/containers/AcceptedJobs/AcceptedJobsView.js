import React from 'react';
import {
  View,
  Image as RnImage,
  StatusBar,
  SectionList,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  Text,
  Image,
  CustomNavbar,
  SubTabs,
  AvailableJobItem,
  Button,
  JobListEmptyComponent,
} from '../../components';
import styles from './AcceptedJobsStyles';
import {Colors, Fonts, AppStyles, Images} from '../../theme';
import {Actions} from 'react-native-router-flux';
import CompleteJobListing from './CompleteJobListing';
import LinearGradient from 'react-native-linear-gradient';

export default function AcceptedJobsView(props) {
  const {
    title,
    tabs,
    tabSelect,
    loading,
    upcomingData,
    getData,
    onJob,
    jobInProgress,
    jobCompleteItemClick,
  } = props;
  return (
    <View style={[styles.container, onJob && AppStyles.pBottom55]}>
      {onJob && (
        <TouchableOpacity
          onPress={() =>
            Actions.acceptedJobDetails({jobId: jobInProgress.delivery})
          }
          style={[AppStyles.boxShadow, styles.onJob]}>
          <LinearGradient
            colors={Colors.redGradient}
            style={[AppStyles.flex, AppStyles.centerInner]}>
            <Text size={Fonts.size.xx} color={Colors.white} numberOfLines={1}>
              Performing a job
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
      <CustomNavbar
        title={title}
        hasBack={false}
        titleColor={Colors.white}
        style={styles.navBar}
      />

      <SubTabs tabs={tabs} tabSelect={index => tabSelect(index)} />

      <View style={styles.content}>
        {tabs[0].selected && (
          <SectionList
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}
            sections={upcomingData}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, section}) => {
              let type =
                section.title === 'Today'
                  ? 'today'
                  : section.title === 'Tomorrow'
                  ? 'tomorrow'
                  : 'later';
              return <AvailableJobItem job={item} type={type} />;
            }}
            renderSectionHeader={({section: {title}}) => {
              return (
                <View style={styles.listSectionHeaderParent}>
                  <View style={styles.sectionHeaderLine} />
                  <Text
                    size={Fonts.size.xii}
                    style={styles.listSectionHeaderText}>
                    {title}
                  </Text>
                  <View style={styles.sectionHeaderLine} />
                </View>
              );
            }}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={getData}
                colors={[Colors.accent]}
                tintColor={Colors.accent}
              />
            }
            ListEmptyComponent={
              loading ? null : (
                <JobListEmptyComponent
                  title="No Jobs Accepted"
                  subTitle="Start earning today. Tap the search button below to search
                  open jobs for you."
                  buttonText="Search Jobs"
                  action={() => Actions.jump('available_jobs')}
                />
              )
            }
          />
        )}
        {/*start complete tab */}
        {tabs[1].selected && (
          <CompleteJobListing
            jobCompleteItemClick={jobCompleteItemClick}
            CompleteJob
          />
        )}
        {/*end complete tab */}
      </View>
    </View>
  );
}
