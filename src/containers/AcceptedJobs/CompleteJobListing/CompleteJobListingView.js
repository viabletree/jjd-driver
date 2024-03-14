import React from 'react';
import {
  View,
  Image as RnImage,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import CompleteJobItem from '../CompleteJobItem';
import styles from './CompleteJobListingStyles';
import {JobListEmptyComponent} from '../../../components';
import {Actions} from 'react-native-router-flux';
import {Colors, Metrics} from '../../../theme';
export default function CompleteJobListingView(props) {
  const {
    loadingData,
    completeJobsListing,
    loadMoreListData,
    hasLoadMore,
    itemClick,
    jobCompleteBackClick,
    onRefresh,
    isFetching,
  } = props;

  return (
    <View style={styles.completeContainer}>
      {loadingData ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator color={Colors.accent} />
        </View>
      ) : (
        <FlatList
          data={completeJobsListing}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <CompleteJobItem
                data={item}
                onBack={jobCompleteBackClick}
                onPress={() => itemClick(item.id)}
              />
            );
          }}
          onRefresh={() => onRefresh()}
          refreshing={isFetching}
          onEndReached={loadMoreListData}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => {
            if (hasLoadMore) return <ActivityIndicator />;
            return null;
          }}
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={() => {
            return (
              <JobListEmptyComponent
                title="No Jobs Completed"
                subTitle="Start earning today. Tap the search button below to search
            open jobs for you."
                buttonText="Search Jobs"
                action={() => Actions.jump('available_jobs')}
              />
            );
          }}
        />
      )}
    </View>
  );
}
