import React from 'react';
import _ from 'lodash';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Text, Image} from '../../components';
import styles from './MultipleImageCaptureStyles';
import {Images, Fonts, AppStyles, Colors} from '../../theme';
export default function MultipleImageCaptureView(props) {
  const {title} = props;
  const containerStyles = [styles.imageCaptureWrap, props.style];
  return (
    <View style={containerStyles}>
      {title && (
        <View style={[AppStyles.mTop15, AppStyles.mBottom20]}>
          <Text size={Fonts.size.xiv}>{title}</Text>
        </View>
      )}
      <View style={styles.imgSelectorWrapper}>
        {/* iteration */}
        {_.times(props.iteration, index => (
          <TouchableOpacity
            onPress={() => {
              index === props.imagePath.length &&
                props.handlePressImagePicker(index);
            }}
            style={[
              styles.imgSelectorCol,
              index === props.imagePath.length && styles.borderWidth,
            ]}>
            {/* check image path undefined or null */}
            {!_.isNil(props.imagePath[index]) ? (
              <>
                <Image
                  style={styles.uploadImg}
                  source={{uri: props.imagePath[index]}}
                />
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => {
                    props.removeImage(index);
                  }}>
                  <Image
                    style={styles.closeBtnIcon}
                    source={Images.close_icon}
                  />
                </TouchableOpacity>
              </>
            ) : index === props.imagePath.length ? (
              props.loading ? (
                <ActivityIndicator color={Colors.accent} />
              ) : (
                <Image style={styles.addImg} source={Images.add_icon} />
              )
            ) : (
              <Text></Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

/* <MultipleImageCapture title="Upload Image:" /> */
