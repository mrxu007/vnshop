const isProdMode = Object.is(process.env.NODE_ENV,'production');
// 判断是开发环境还是上线环境
module.exports = {
  baseUrl: isProdMode ? 'https://jsone.xyz/api/' : 'api/'
}
