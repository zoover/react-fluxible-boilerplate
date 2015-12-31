import moment from 'moment';
import intlLocalesSupported from 'intl-locales-supported';
import IntlPolyfill from 'intl';

// import translation files
import nl from './locales/nl';

let locale = null;
let translations = null;

// function to set the locale
export function setLocale(loc) {
  locale = loc; // store the locale used
  moment.locale(loc); // set moment to the righ locale
  if (loc === 'nl') { translations = nl; } // set the translation file for the translate function
  if (!intlLocalesSupported(loc)) {
    // Browser doens't support locale, use polyfill instead
    require('intl/locale-data/jsonp/' + loc + '.js'); // load the translation file for NumberFormat polyfill
    Intl.NumberFormat = IntlPolyfill.NumberFormat; // Use polyfill functions instead of build-in ones
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat; // Use polyfill functions instead of build-in ones
  }
}

// translate function, translate a key to a string in a locale
export function t(key) {
  function _fetchFromObject(object, prop) {
    let _index;
    if (typeof object === 'undefined') {
      return false;
    }
    _index = prop.indexOf('.');
    if (_index > -1) {
      return _fetchFromObject(object[prop.substring(0, _index)], prop.substr(_index + 1));
    }
    return object[prop];
  }
  return _fetchFromObject(translations, key);
}

// localize function, localize a value to a string in a locale
export function l(value, options) {
  if (typeof value === 'number') {
    return new Intl.NumberFormat(locale, options).format(value);
  }
}

