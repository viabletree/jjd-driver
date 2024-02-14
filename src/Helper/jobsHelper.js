import _ from 'lodash';
import moment from 'moment';
import {CHANGE_TEXT} from '../constants';
import util from '../util';

const getManipulatedAvailableJobsData = data => {
  const finalArray = [];

  data.forEach((element, index) => {
    let itemData = {
      collectionRange: element.collectionRange,
      liftingpower: element.liftingpower || 0,
      inventory: element.inventory || '[]',
      id: util.generateGuid(),
      pickup: element.pickup || 0,
      name: element.name || CHANGE_TEXT,
      delivery: element.delivery || CHANGE_TEXT,
      required_time: element.required_time || 0,
      size: element.size || CHANGE_TEXT,
      stairs: element.stairs || 0,
      ride_along: element.ride_along || 0,
      distance_meter: element.distance_meter || 0,
      route_id: element.route_id || 0,
      client_id: element.client_id || 0,
      duration_minutes: element.duration_minutes || 0,
      booking_number: element.booking_number || 0,
      service_id: element.service_id || 0,
      vehicle_id: element.vehicle_id || 0,
      note_driver: element.note_driver || 0,
      loading_time_minutes: element.loading_time_minutes || 0,
      unloading_time_minutes: element.unloading_time_minutes || 0,
      reward_pence: element.reward_pence || 0,
      extra_charge_value: element.extra_charge_value || 0,
      extra_charge_mins: element.extra_charge_mins || 0,
      driver_overtime_fee_fraction: element.driver_overtime_fee_fraction || 0,
      inital_total_pence: element.inital_total_pence || 0,
      user: {
        id: element?.user?.id || 0,
        email: element?.user?.email || CHANGE_TEXT,
        firstName: element?.user?.firstName || CHANGE_TEXT,
        lastName: element?.user?.lastName || CHANGE_TEXT,
        admin: element?.user?.admin || 0,
        phone: element?.user?.phone || 0,
        business_name: element?.user?.business_name || CHANGE_TEXT,
      },
      accepted: element.accepted || false,
      grace_time_minutes: element.grace_time_minutes || 0,
      location: element.location || [],
      numberOfStops: element.location || 0,
      vehicle: {
        createdAt: element.createdAt || 0,
        updatedAt: element.updatedAt || 0,
        id: element.id || 0,
        title: element.vehicle.title || CHANGE_TEXT,
        order: element.order || 0,
        slug: element.slug || 0,
        sub_title: element.vehicle.sub_title || CHANGE_TEXT,
        description: element.vehicle.description || CHANGE_TEXT,
        min_price: element.vehicle.min_price || 0,
        two_hour_price: element.vehicle.two_hour_price || 0,
        min_time: element.vehicle.min_time || 0,
        prebooked_overtime_hour: element.vehicle.prebooked_overtime_hour || 0,
        nonbooked_overtime_hour: element.vehicle.nonbooked_overtime_hour || 0,
        prebooked_overtime_minutes: element.vehicle.prebooked_overtime_minutes,
        nonbooked_overtime_minutes: element.vehicle.nonbooked_overtime_minutes,
        included_mileage: element.vehicle.included_mileage,
        short_mileage: element.vehicle.short_mileage || 0,
        long_mileage: element.vehicle.long_mileage || 0,
        full_day_mileage: element.vehicle.full_day_mileage || 0,
        full_day_helper: element.vehicle.full_day_helper || 0,
        max_helper: element.vehicle.max_helper || 0,
        min_loading_unloading_time_minutes:
          element.min_loading_unloading_time_minutes || 0,
        is_beta: element.is_beta || 0,
        image: element.vehicle.mobile_image.secure_url || '',

        mobile_image: {
          secure_url: element.vehicle.mobile_image.secure_url,
        },
      },
      numberOfItems: element.numberOfItems || 0,
    };

    finalArray[index] = itemData;
  });

  return finalArray;
};

const getManipulatedCompleteJob = data => {
  const finalArray = [];
  data.forEach((element, index) => {
    // console.log({element: gify(element)});

    let itemData = {
      //createdAt: '2020-02-17T11:48:02.145Z',
      //updatedAt: '2020-02-17T11:48:02.254Z',
      id: element.id || 0,
      name: element.name || 0,
      description: element.description || CHANGE_TEXT,
      deliverByDate: element.deliverByDate,
      uniqueurl: element.uniqueurl || 0,
      singleItem: element.singleItem || 0,
      extraMan: element.extraMan || 0,
      lutonVanAnd2men: element.lutonVanAnd2men || 0,
      liftingpower: element.liftingpower || 1,
      ride_along: element.ride_along || 0,
      stairs: element.stairs || 0,
      requiredTime: element.requiredTime || 0,
      extraChargeValue: element.extraChargeValue || 0,
      extraChargeMins: element.extraChargeMins || 0,
      pickupName: element.pickupName || 0,
      pickupPhone: element.pickupPhone || 0,
      dropoffName: element.dropoffName || 0,
      dropoffPhone: element.dropoffPhone || 0,
      isBusiness: element.isBusiness || 0,
      source_ref: element.source_ref || 0,
      client: element.client || 0,
      booking_number: element.booking_number || 0,
      quote: {
        original_reward: element.original_reward || 0,
      },

      delivery: {
        createdAt: element.createdAt || 0,
        updatedAt: element.updatedAt || 0,
        end_time: element.end_time || '2020-02-17T11:48:02.145Z',
      },
    };
    finalArray[index] = itemData;
  });

  return finalArray;
};

const getManipulatedCompleteJobDetail = data => {
  const finalArray = [];
  data.forEach((element, index) => {
    let itemData = {
      collectionRange: element.collectionRange,
      liftingpower: element.liftingpower || 0,
      inventory: element.inventory || '[]',
      pickup: element.pickup || 0,
      name: element.name || CHANGE_TEXT,
      delivery: element.delivery || 0,
      required_time: element.required_time || 0,
      size: element.size || 0,
      stairs: element.stairs || 0,
      ride_along: element.ride_along || 0,
      distance_meter: element.distance_meter || 0,
      route_id: element.route_id || 0,
      client_id: element.client_id || 0,
      duration_minutes: element.duration_minutes || 0,
      booking_number: element.booking_number || 0,
      service_id: element.service_id || 0,
      vehicle_id: element.vehicle_id || 0,
      note_driver: element.note_driver || 0,
      loading_time_minutes: element.loading_time_minutes || 0,
      unloading_time_minutes: element.unloading_time_minutes || 0,
      reward_pence: element.reward_pence || 0,
      extra_charge_value: element.extra_charge_value || 0,
      original_reward_pence: element.original_reward_pence || 0,
      extra_charge_mins: element.extra_charge_mins || 0,
      driver_overtime_fee_fraction: element.driver_overtime_fee_fraction || 0,
      inital_total_pence: element.inital_total_pence || 0,
      user: {
        id: element.id || 0,
        email: element.email || CHANGE_TEXT,
        firstName: element.firstName || CHANGE_TEXT,
        lastName: element.lastName || CHANGE_TEXT,
        admin: element.admin || 0,
        phone: element.phone || 0,
        business_name: element.business_name || CHANGE_TEXT,
      },
      quote: {
        createdAt: element.createdAt || 0,
        updatedAt: element.updatedAt || 0,
        id: element.id || 0,
        type: element.type || 0,
        extra_charge_value: element.extra_charge_value || 0,
        extra_charge_mins: element.extra_charge_mins || 0,
        driver_overtime_fee_fraction: element.driver_overtime_fee_fraction || 0,
        initial_total: element.initial_total || 0,
        deposit: element.deposit || 0,
        reward: element.reward || 0,
        original_reward: element.original_reward || 0,
        overtime: element.overtime || 0,
        applied_code_id: element.applied_code_id || 0,
      },
      accepted: element.accepted || false,
      grace_time_minutes: element.grace_time_minutes || 0,
      location: element.location || [],
      numberOfStops: element.numberOfStops || 0,
      vehicle: element.vehicle || {},
      numberOfItems: element.numberOfItems || 0,
    };
    finalArray[index] = itemData;
  });

  return finalArray;
};

export {
  getManipulatedAvailableJobsData,
  getManipulatedCompleteJob,
  getManipulatedCompleteJobDetail,
};
