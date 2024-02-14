// @flow
import _ from 'lodash';
import {create} from 'apisauce';
import {Actions} from 'react-native-router-flux';
import {
  API_LOG,
  BASE_URL,
  API_TIMEOUT,
  ERROR_SOMETHING_WENT_WRONG,
  ERROR_NETWORK_NOT_AVAILABLE,
  ERROR_TIMEOUT,
} from '../config/WebService';

import Util from '../util';

const api = create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
});

const onForbidden = async () => {
  const newToken = await Util.independentLogin();

  if (newToken) {
    return newToken;
  }

  await Util.resetGenericPassword();
  Actions.welcome();
  return false;
};

class ApiSauce {
  async post(url, data, headers, baseUrl) {
    console.log({url, data, headers, baseUrl});
    api.setBaseURL(baseUrl);
    // ;
    if (baseUrl === 'https://kiffgo-development.herokuapp.com/') {
      console.log('here as well');
      if (_.isEmpty(data._csrf)) {
        try {
          // Below function will store new CSRF token
          const newToken = await Util.getCsrfToken();
          data._csrf = newToken;
        } catch (err) {
          Util.topAlertError('Network error');
        }
      }
    }
    // if (_.isEmpty(data._csrf)) {
    //   try {
    //     // Below function will store new CSRF token
    //     const newToken = await Util.getCsrfToken();
    //     data._csrf = newToken;
    //   } catch (err) {
    //     Util.topAlertError('Network error');
    //   }
    // }
    const response = await api.post(url, data, {
      headers: {
        ...headers,
        ...{
          'X-CSRF-Token': data._csrf,
        },
      },
    });

    if (__DEV__ && API_LOG) {
      console.log('url', url);
      console.log('data', data);
      console.log('headers', headers);
      console.log(response);
    }

    if (response.status === 403) {
      try {
        // Below function will store new CSRF token
        const newToken = await onForbidden();
        console.log({newToken});
        if (newToken) {
          data._csrf = newToken;
        } else {
          return false;
        }
      } catch (err) {
        Util.topAlertError('Network error');
      }

      const responseNew = await api.post(url, data, {
        headers,
      });
      console.log({responseNew});
      return this.manipulateResponse(responseNew);
    } else {
      return this.manipulateResponse(response);
    }
  }

  async get(url, data, headers, baseUrl) {
    api.setBaseURL(baseUrl);
    const response = await api.get(url, data, {
      headers,
    });

    if (__DEV__ && API_LOG) {
      console.log('url', url);
      console.log('headers', headers);
      console.log(response);
    }

    return this.manipulateResponse(response);
  }

  async delete(url, data, headers, baseUrl) {
    api.setBaseURL(baseUrl);
    const response = await api.delete(
      url,
      {},
      {
        headers,
      },
    );

    if (__DEV__ && API_LOG) {
      console.log('url', url);
      console.log('headers', headers);
      console.log(response);
    }

    return this.manipulateResponse(response);
  }

  async put(url, data, headers, baseUrl) {
    api.setBaseURL(baseUrl);
    if (_.isEmpty(data._csrf)) {
      try {
        // Below function will store new CSRF token
        const newToken = await Util.getCsrfToken();
        data._csrf = newToken;
      } catch (err) {
        Util.topAlertError('Network error');
      }
    }
    const response = await api.put(url, data, {
      headers: {
        ...headers,
        ...{
          'X-CSRF-Token': data._csrf,
        },
      },
    });

    if (__DEV__ && API_LOG) {
      console.log('url', url);
      console.log('data', data);
      console.log('headers', headers);
      console.log(response);
    }

    return this.manipulateResponse(response);
  }

  manipulateResponse(response) {
    return new Promise((resolve, reject) => {
      if (response.ok && response.data && !response.data.error) {
        resolve(response.data);
      } else {
        if (response.status === 500) {
          reject(ERROR_SOMETHING_WENT_WRONG);
        }
        console.log({response});
        if (response.problem === 'NETWORK_ERROR') {
          reject(ERROR_NETWORK_NOT_AVAILABLE);
        }

        if (response.problem === 'TIMEOUT_ERROR') {
          reject(ERROR_TIMEOUT);
        }

        reject(response.data || ERROR_SOMETHING_WENT_WRONG);
      }
    });
  }
}

export default new ApiSauce();
