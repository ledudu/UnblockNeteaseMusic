'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _common = require('../common');

var common = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Kugou = function () {
  function Kugou() {
    (0, _classCallCheck3.default)(this, Kugou);

    this.name = 'Kugou';
    this.order = 2;
    this.baseUrl = 'fs.web.kugou.com';
  }

  (0, _createClass3.default)(Kugou, [{
    key: 'getPluginInfo',
    value: function getPluginInfo() {
      return {
        name: this.name,
        order: this.order
      };
    }
  }, {
    key: 'search',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(keyword) {
        var options, data, _result, result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, e, filesize, hash, bitrate;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = {
                  url: 'http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=' + encodeURIComponent(keyword) + '&page=1&pagesize=1&showtype=1'
                };
                data = void 0;
                _context.prev = 2;
                _context.next = 5;
                return common.sendRequest(options);

              case 5:
                _result = _context.sent;

                data = JSON.parse(_result.body);
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](2);
                throw new Error(_context.t0);

              case 12:
                result = [];

                if (!(data.status === 1 && data.data.info.length > 0)) {
                  _context.next = 55;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 17;
                _iterator = (0, _getIterator3.default)(data.data.info);

              case 19:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 41;
                  break;
                }

                e = _step.value;
                filesize = void 0;
                hash = void 0;
                bitrate = void 0;
                // if (Object.prototype.hasOwnProperty.call(e, 'sqhash')) {
                //   bitrate = '999000';
                //   filesize = e.sqfilesize;
                //   hash = e.sqhash;
                //   type = 'flac';
                // } else if (Object.prototype.hasOwnProperty.call(e, '320hash')) {

                if (!(Object.prototype.hasOwnProperty.call(e, '320hash') && e['320hash'].lenght > 0)) {
                  _context.next = 30;
                  break;
                }

                bitrate = '320000';
                filesize = e['320filesize'];
                hash = e['320hash'];
                _context.next = 37;
                break;

              case 30:
                if (!(Object.prototype.hasOwnProperty.call(e, 'hash') && e.hash.lenght > 0)) {
                  _context.next = 36;
                  break;
                }

                bitrate = '128000';
                filesize = e.filesize;
                hash = e.hash;
                _context.next = 37;
                break;

              case 36:
                return _context.abrupt('continue', 38);

              case 37:
                result.push({
                  name: e.filename,
                  artist: e.singername,
                  type: 'mp3',
                  filesize: filesize,
                  bitrate: bitrate,
                  hash: hash
                });

              case 38:
                _iteratorNormalCompletion = true;
                _context.next = 19;
                break;

              case 41:
                _context.next = 47;
                break;

              case 43:
                _context.prev = 43;
                _context.t1 = _context['catch'](17);
                _didIteratorError = true;
                _iteratorError = _context.t1;

              case 47:
                _context.prev = 47;
                _context.prev = 48;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 50:
                _context.prev = 50;

                if (!_didIteratorError) {
                  _context.next = 53;
                  break;
                }

                throw _iteratorError;

              case 53:
                return _context.finish(50);

              case 54:
                return _context.finish(47);

              case 55:
                return _context.abrupt('return', result);

              case 56:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 9], [17, 43, 47, 55], [48,, 50, 54]]);
      }));

      function search(_x) {
        return _ref.apply(this, arguments);
      }

      return search;
    }()
  }, {
    key: 'getUrl',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(searchResult) {
        var hash, key, options, data, result, url;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                hash = searchResult.hash;
                key = (0, _md2.default)(hash + 'kgcloud');
                options = {
                  url: 'http://trackercdn.kugou.com/i/?acceptMp3=1&cmd=4&pid=6&hash=' + hash + '&key=' + key
                };
                data = void 0;
                _context2.prev = 4;
                _context2.next = 7;
                return common.sendRequest(options);

              case 7:
                result = _context2.sent;

                data = JSON.parse(result.body);
                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2['catch'](4);
                throw new Error(_context2.t0);

              case 14:
                url = void 0;

                if (data.error || data.status !== 1) {
                  url = null;
                } else {
                  url = data.url;
                }
                return _context2.abrupt('return', url);

              case 17:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 11]]);
      }));

      function getUrl(_x2) {
        return _ref2.apply(this, arguments);
      }

      return getUrl;
    }()
  }]);
  return Kugou;
}();

module.exports = Kugou;