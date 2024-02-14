import React from 'react';
import {View, TouchableOpacity, Modal} from 'react-native';
import {Text, Image, BottomSheetAlert} from '../../components';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImageViewer from 'react-native-image-zoom-viewer';
import styles from './JobActivityItemStyles';
import {Fonts, Colors, AppStyles, Images, Metrics} from '../../theme';
import MapAlertView from './MapAlertView';
import Instructions from './Instructions';
import NotFound from './NotFound';
import Found from './Found';
import FailJob from './FailJob';
import FormOne from './FormOne';
import FormTwo from './FormTwo';
import Complete from './Complete';
import moment from 'moment';
export default function JobActivityItemView(props) {
  const {
    location,
    index,
    showListingDetail,
    startClick,
    mapSheetRef,
    orderNumber,
    locationSheetRef,
    mapClick,
    findLocationClick,
    finalFail,
    revertInitialFail,
    hideMainSheet,
    resetFlags,
    failLoading,
    setDeliveredTo,
    stopComplete,
    passLoading,
    jobInProgress,
    finalSheetRef,
  } = props;
  const {
    postcode,
    internal_order,
    contact_name,
    description,
    qty_items,
    stairs,
    full_address,
    instructions,
    is_delivery,
    images,
    showFind,
    instructionsRead,
    foundLocation,
    failed,
    initialFail,
    deliveryForm,
    dest_id,
    eta,
  } = location;
  //   id: 277
  // postcode: "SL2 3SP"
  // qty_items: "0"
  // full_address: "Three Ways, Green Ln, Farnham Common, Slough SL2 3SP, UK"
  // start: true
  // end: false
  // stairs: "HasLift"
  // instructions: "-"
  // contact_name: "-"
  // contact_phone: ""
  // contact_email: ""
  // images: [keys: ƒ, map: ƒ, filter: ƒ, slice: ƒ, concat: ƒ, …]
  // distance_miles: "19.3"
  // duration_seconds: "2202"
  // internal_order: ""
  // description: ""
  // is_delivery: false
  // is_collection: true
  // dest_id

  const label = is_delivery ? 'Delivery' : 'Collection';

  return (
    <View>
      {/* section  */}

      <View style={styles.acceptJobListSection}>
        {/* detail start */}
        {/* Expanded */}
        {showListingDetail && (
          <View style={styles.collectionBox}>
            <View style={styles.collectionBoxWrapper}>
              <View>
                <Text size={Fonts.size.xiv} color={Colors.lightGrey}>
                  {`Stop#${index + 1}: ${label} Details`}
                </Text>
                <Text size={Fonts.size.xiv} color={Colors.lightGrey}>
                  {`ETA : ${moment(eta).format('HH:mm')}`}
                </Text>
              </View>
              <View style={AppStyles.flexRow}>
                <TouchableOpacity
                  style={styles.startButton}
                  onPress={() => startClick()}>
                  <Text
                    size={Fonts.size.xxi}
                    color={Colors.linkBlue}
                    style={AppStyles.mRight10}>
                    Start
                  </Text>
                  <Image
                    source={Images.navigate_arrow}
                    style={styles.mapIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.nameRow}>
              <Image
                source={Images.phone_icon}
                resizeMode="contain"
                style={styles.phoneIcon}
              />
              <Text
                style={AppStyles.mLeft15}
                size={Fonts.size.xx}
                type="bold"
                color={Colors.alto}>
                {contact_name}
              </Text>
            </View>
            <View>
              <View style={styles.descriptionRow}>
                <View style={AppStyles.flex}>
                  <Text
                    style={AppStyles.textAlignRight}
                    size={Fonts.size.xii}
                    color={Colors.boulder}>
                    Internal Order#
                  </Text>
                </View>
                <View style={[AppStyles.mLeft20, AppStyles.flex3]}>
                  <Text size={Fonts.size.xii} color={Colors.black}>
                    {internal_order === '' ? '--' : internal_order}
                  </Text>
                </View>
              </View>
              <View style={styles.descriptionRow}>
                <View style={AppStyles.flex}>
                  <Text
                    style={AppStyles.textAlignRight}
                    size={Fonts.size.xii}
                    color={Colors.boulder}>
                    # of items:
                  </Text>
                </View>
                <View style={[AppStyles.mLeft20, AppStyles.flex3]}>
                  <Text size={Fonts.size.xii} color={Colors.black}>
                    {qty_items}
                  </Text>
                </View>
              </View>
              <View style={styles.descriptionRow}>
                <View style={AppStyles.flex}>
                  <Text
                    style={AppStyles.textAlignRight}
                    size={Fonts.size.xii}
                    color={Colors.boulder}>
                    Item Description:
                  </Text>
                </View>
                <View style={[AppStyles.mLeft20, AppStyles.flex3]}>
                  <Text size={Fonts.size.xii} color={Colors.black}>
                    {description === '' ? '--' : description}
                  </Text>
                </View>
              </View>
              <View style={styles.descriptionRow}>
                <View style={AppStyles.flex}>
                  <Text
                    style={AppStyles.textAlignRight}
                    size={Fonts.size.xii}
                    color={Colors.boulder}>
                    Floor description:
                  </Text>
                </View>
                <View style={[AppStyles.mLeft20, AppStyles.flex3]}>
                  <Text size={Fonts.size.xii} color={Colors.black}>
                    {stairs}
                  </Text>
                </View>
              </View>
              <View style={styles.descriptionRow}>
                <View style={AppStyles.flex}>
                  <Text
                    style={AppStyles.textAlignRight}
                    size={Fonts.size.xii}
                    color={Colors.boulder}>
                    Full Address:
                  </Text>
                </View>
                <View style={[AppStyles.mLeft20, AppStyles.flex3]}>
                  <Text size={Fonts.size.xii} color={Colors.black}>
                    {full_address}
                  </Text>
                </View>
              </View>
              <View style={styles.descriptionRow}>
                <View style={AppStyles.flex}>
                  <Text
                    style={AppStyles.textAlignRight}
                    size={Fonts.size.xii}
                    color={Colors.boulder}>
                    Instruction:
                  </Text>
                </View>
                <View style={[AppStyles.mLeft20, AppStyles.flex3]}>
                  <Text size={Fonts.size.xii} color={Colors.black}>
                    {instructions === '' ? '--' : instructions}
                  </Text>
                </View>
              </View>
            </View>
            {/* images listing  start */}
            <View style={[AppStyles.mTop40, AppStyles.flexRow]}>
              {images.map((item, index) => {
                return (
                  <View key={index} style={styles.imageItem}>
                    <TouchableOpacity
                      onPress={() => {
                        props.handlePressShowImageModal(index);
                      }}>
                      <Image
                        source={{uri: item.url}}
                        style={styles.sliderSize}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            {/* images listing  end */}
            {/* zoom images modal start */}
            <View>
              <Modal visible={props.isImageModalShow} transparent={true}>
                <ImageViewer
                  imageUrls={images}
                  enableSwipeDown={true}
                  onSwipeDown={() => {
                    props.handlePressHideImageModal();
                  }}
                  index={props.selectedImgIndex}
                />
              </Modal>
            </View>
            {/* zoom images modal end */}
            <View>
              <Text color={showFind ? Colors.black : Colors.border}>
                Have you find the location?
              </Text>
            </View>
            <View style={AppStyles.mTop10}>
              <View
                style={[
                  AppStyles.flexRow,
                  AppStyles.pRight15,
                  AppStyles.pLeft15,
                  {opacity: showFind ? 1 : 0.5},
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    if (showFind) findLocationClick(false);
                  }}
                  activeOpacity={showFind ? 0.5 : 1}
                  style={[
                    styles.findLocationButton,
                    {borderColor: Colors.bitterSweet1},
                  ]}>
                  <Image source={Images.sad} style={styles.sadIcon} />
                  <Text
                    type="bold"
                    size={Fonts.size.xvi}
                    color={Colors.bitterSweet1}
                    style={AppStyles.mLeft15}>
                    No
                  </Text>
                </TouchableOpacity>
                <View style={styles.spacer} />
                <TouchableOpacity
                  onPress={() => {
                    if (showFind) findLocationClick(true);
                  }}
                  activeOpacity={showFind ? 0.5 : 1}
                  style={[
                    styles.findLocationButton,
                    {borderColor: Colors.accent},
                  ]}>
                  <Image source={Images.happy} style={styles.sadIcon} />
                  <Text
                    type="bold"
                    size={Fonts.size.xvi}
                    color={Colors.accent}
                    style={AppStyles.mLeft10}>
                    Yes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        {/* Expanded end */}
        {/* detail end */}
        {/* listing start*/}
        {/* Collapsed */}
        {!showListingDetail && (
          <View style={styles.acceptJobListWrap}>
            <View>
              <View style={styles.acceptJobList}>
                <Text color={Colors.lightGrey} size={Fonts.size.xiv}>
                  {`Stop#${index + 1} ${label}`}
                </Text>
                <Text
                  size={Fonts.size.xiv}
                  color={Colors.lightGrey}>{`ETA :  ${moment(eta).format(
                  'HH:mm',
                )}`}</Text>
              </View>
              <View style={[styles.acceptJobList, AppStyles.mTop10]}>
                <Text size={Fonts.size.xiv}>Postcode: {postcode}</Text>
                <Text size={Fonts.size.xiv} color={Colors.lightGrey}>
                  Internal Order#
                  <Text size={Fonts.size.xiv} color={Colors.black}>
                    {internal_order === '' ? '--' : internal_order}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Collapsed end*/}

        {/* listing end */}
      </View>
      {showListingDetail && (
        <View>
          <RBSheet
            animationType="fade"
            ref={ref => {
              mapSheetRef(ref);
            }}
            closeOnDragDown={true}
            height={Metrics.screenHeight / 1.5}
            duration={250}
            customStyles={{
              container: styles.bottomSheetContainer,
            }}>
            <MapAlertView
              item={location}
              index={index}
              orderNumber={orderNumber}
              mapOnClick={mapClick}
            />
          </RBSheet>
          <RBSheet
            animationType="fade"
            closeOnPressBack={false}
            closeOnPressMask={false}
            ref={ref => {
              locationSheetRef(ref);
            }}
            height={Metrics.screenHeight / 1.5}
            duration={250}
            customStyles={{
              container: styles.bottomSheetContainer,
            }}>
            <View style={AppStyles.flex}>
              {!instructionsRead && (
                <Instructions
                  item={location}
                  index={index}
                  orderNumber={orderNumber}
                />
              )}
              {instructionsRead &&
                foundLocation &&
                !initialFail &&
                deliveryForm < 0 && (
                  <Found
                    item={location}
                    initialFail={props.initialFail}
                    setDeliveredTo={setDeliveredTo}
                  />
                )}
              {instructionsRead && !foundLocation && !initialFail && (
                <NotFound
                  item={location}
                  initialFail={props.initialFail}
                  resetFlags={resetFlags}
                  hideMainSheet={hideMainSheet}
                />
              )}
              {initialFail && (
                <FailJob
                  item={location}
                  revertInitialFail={revertInitialFail}
                  finalFail={finalFail}
                  failLoading={failLoading}
                />
              )}
              {deliveryForm === 0 && <FormOne item={location} />}
              {deliveryForm === 1 && (
                <FormTwo
                  item={location}
                  stopComplete={stopComplete}
                  passLoading={passLoading}
                />
              )}
            </View>
          </RBSheet>
        </View>
      )}
      {jobInProgress.completed && (
        <RBSheet
          animationType="fade"
          ref={ref => {
            finalSheetRef(ref);
          }}
          closeOnDragDown={false}
          closeOnPressBack={false}
          closeOnPressMask={false}
          height={Metrics.screenHeight / 1.5}
          duration={250}
          customStyles={{
            container: styles.bottomSheetContainer,
          }}>
          <Complete delivery_id={jobInProgress.delivery} />
        </RBSheet>
      )}
      {/* section end*/}
    </View>
  );
}
