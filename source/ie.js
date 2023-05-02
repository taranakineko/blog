if (navigator.userAgent.indexOf('compatible') > -1 && navigator.userAgent.indexOf('MSIE') > -1) {
  window.location.replace('/ie.html')
} else if (!!window.ActiveXObject || 'ActiveXObject' in window) {
  window.location.replace('/ie.html')
}
