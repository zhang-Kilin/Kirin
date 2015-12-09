(function(){
	var root = this,
		//save the previous value
		prevDateUtil = root.dateUtil;

	//dateUtil object
	var dateUtil = {
		//版本号
		version:'0.0.1',
		//多库共存
		noConflict:function(){
			root.dateUtil = prevDateUtil;
			return dateUtil;
		}
	};

	//support nodejs
	if (typeof exports !== 'undefined') {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = dateUtil;
	    }
	    exports.dateUtil = dateUtil;
	} else {
	  root.dateUtil = dateUtil;
	}

	//support amd
	if (typeof define !== 'undefined' && define.amd) {
		define('date-util',[],function(){
			return dateUtil;
		});
	};

	//字符串格式化为固定长度，默认将占位符补到右侧
	//@param {string} str 源字符串
	//@param {int} length 固定长度
	//@param {string} place 占位符，默认为 "0"
	//@param {boolean} left 是否将占位符补到字符串左侧
	var fix = function(str,length,place,left){
		if (typeof str !== 'string') {
			return str;
		};
		length = length || 0;
		if (str.length >= length) {
			return str;
		};
		place = place || '0';
		var len = length - str.length,
			times = Math.floor(len / place.length),
			arr = [];
		for (var i = 0; i < times; i++) {
			arr.push(place);
		};
		if (left) {
			if (str.length + arr.length < length) {
				arr.push(place.substr(0,str.length - length));
			};
			str = arr.join('') + str;
		}else{
			str += arr.join('');
			if (str.length < length) {
				str += place.substr(0,str.length - length);
			};
		}

		return str;
	};

	//月份全称
	var MONTHNAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

	//所有的节假日、纪念日
	var holidayList = {
		//cn:中国节日，g:国际节日纪念日，a:西方(美国)节日纪念日，c:教会节日
		'cn0101': ["cn,春节"],
		'cn0115': ["cn,元宵节"],
		'cn0202': ["cn,龙头节"],
		'cn0505': ["cn,端午节"],
		'cn0707': ["cn,七夕节"],
		'cn0715': ["cn,中元节"],
		'cn0815': ["cn,中秋节"],
		'cn0909': ["cn,重阳节"],
		'cn1001': ["cn,寒衣节"],
		'cn1015': ["cn,下元节"],
		'cn1208': ["cn,腊八节"],
		'cn1223': ["cn,小年"],

		"0127": ["g,国际大屠杀纪念日,2005"],
		"0202": ["g,湿地日,1996"],
		"0210": ["g,国际气象节,1991"],
		"0301": ["g,国际海豹日,1983"],
		"0308": ["g,妇女节,1975"],
		"0315": ["g,消费者权益日,1983"],
		"0401": ["g,愚人节,1564"],
		"0422": ["g,地球日,1990"],
		"0501": ["g,劳动节,1889"],
		"0512": ["g,护士节,1912"],
		"0518": ["g,博物馆日,1977"],
		"0605": ["g,环境日,1972"],
		"0623": ["g,奥林匹克日,1948"],
		"0711": ["g,国际航海日,2005"],
		"1020": ["g,骨质疏松日,1998"],
		"1117": ["g,学生日,1942"],
		"1201": ["g,艾滋病日,1988"],
		"0101": ["cn,元旦"],
		"0312": ["cn,植树节,1979"],
		"0504": ["cn,五四青年节,1939"],
		"0601": ["cn,儿童节,1950"],
		"0701": ["cn,建党节,1941"],
		"0801": ["cn,建军节,1933"],
		"0903": ["cn,抗战胜利日,1945"],
		"0910": ["cn,教师节,1985"],
		"1001": ["cn,国庆节,1949"],
		"1224": ["c,平安夜"],
		"1225": ["c,圣诞节"],
		"0214": ["a,情人节,0270"],
		//按星期x推算的节日
		w: {
			//5月第二个周日
			"0520": "g,母亲节,1913",
			//6月第三个周日
			"0630": "a,父亲节,1972",
			//11月第四个周四
			"1144": "a,感恩节,1941"
		}
	};

	//农历计算辅助类
	var lunar = {
		//基础年份
		basicYears:[43856, 19416, 19168, 42352, 21717, 53856, 55632, 25940, 22191, 39632, 21970, 19168, 42422, 42192, 53840, 53845, 46415, 54944, 44450, 38320, 18807, 18815, 42160, 46261, 27216, 27968, 43860, 11119, 38256, 21234, 18800, 25958, 54432, 59984, 27285, 23263, 11104, 34531, 37615, 51415, 51551, 54432, 55462, 46431, 22176, 42420, 9695, 37584, 53938, 43344, 46423, 27808, 46416, 21333, 19887, 42416, 17779, 21183, 43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400, 46752, 38310, 38335, 18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 23232, 43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416, 20854, 21183, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208, 53856, 60005, 54576, 23200, 30371, 38608, 19195, 19152, 42192, 53430, 53855, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600, 45653, 27951, 44448, 19299, 37759, 18936, 18800, 25776, 26790, 59999, 27424, 42692, 43759, 37600, 53987, 51552, 54615, 54432, 55888, 23893, 22176, 42704, 21972, 21200, 43448, 43344, 46240, 46758, 44368, 21920, 43940, 42416, 21168, 45683, 26928, 29495, 27296, 44368, 19285, 19311, 42352, 21732, 53856, 59752, 54560, 55968, 27302, 22239, 19168, 43476, 42192, 53584, 62034, 54560],
		//基础农历数据
		basicData:["9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "9778397bd19801ec9210c965cc920e", "97b6b97bd19801ec95f8c965cc920f", "97bd09801d98082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd197c36c9210c9274c91aa", "97b6b97bd19801ec95f8c965cc920e", "97bd09801d98082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec95f8c965cc920e", "97bcf97c3598082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd07f595b0b6fc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "9778397bd19801ec9210c9274c920e", "97b6b97bd19801ec95f8c965cc920f", "97bd07f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c920e", "97b6b97bd19801ec95f8c965cc920f", "97bd07f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bd07f1487f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c9274c920e", "97bcf7f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c91aa", "97b6b97bd197c36c9210c9274c920e", "97bcf7f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c920e", "97b6b7f0e47f531b0723b0b6fb0722", "7f0e37f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36b0b70c9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0787b0721", "7f0e27f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c91aa", "97b6b7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "977837f0e37f149b0723b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f5307f595b0b0bc920fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "977837f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0723b06bd", "7f07e7f0e37f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e37f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e37f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0723b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0723b06bd", "7f07e7f0e37f14998083b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14898082b0723b02d5", "7f07e7f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e36665b66aa89801e9808297c35", "665f67f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e36665b66a449801e9808297c35", "665f67f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e36665b66a449801e9808297c35", "665f67f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e26665b66a449801e9808297c35", "665f67f0e37f1489801eb072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722"],
		//24节气
		terms:["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"],
		//天干
		zodiac:["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
		//地支
		branches:["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
		//12生肖
		animals:["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
		//农历日期的前缀
		lunarDayPrefixs:["初", "十", "廿", "三十"],
		//农历日期后半段表示
		lunarDays:["", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
		//农历12个月份的表示
		lunarMonths:["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "腊"],
		//缓存年份
		yearDataCache:{},
		//根据公历日期，查表找到农历日期
		getDate: function(date) {
			var day = Math.ceil((date - new Date(1899, 1, 10)) / 86400000),
				w = 1899,
				s,
				r,
				year,
				month,
				isLeap,
				isBigMonth;
			for (; w < 2100 && day > 0; w++) {
				s = this.getYearDays(w);
				day -= s
			}
			day < 0 && (day += s, w--);
			year = w;
			r = this.getLeapMonth(year) || false;
			for (month = 1; month <= 12; month++) {
				s = this.getMonthDays(year, month);
				if (r === true) {
					r = false;
					month--;
					s = this.getLeapDays(year);
					if (day < s) {
						isLeap = true
					}
				}
				if (r === month) {
					r = true
				}
				if (day < s) {
					isBigMonth = s === 30;
					break
				}
				day -= s
			}
			return {
				year: year,
				month: month,
				date: day + 1,
				isLeap: isLeap,
				isBigMonth: isBigMonth
			}
		},
		getYearDays: function(year) {
			var r;
			var t = this.yearDataCache;
			if (t[year]) {
				return t[year]
			}
			var s = 348;
			var u = this.basicYears[year - 1899];
			for (r = 32768; r > 8; r >>= 1) {
				s += r & u ? 1 : 0
			}
			s += this.getLeapDays(year);
			t[year] = s;
			return s
		},
		getLeapDays: function(year) {
			return this.getLeapMonth(year) ? (this.basicYears[year - 1899 + 1] & 15 === 15 ? 30 : 29) : 0
		},
		getLeapMonth: function(year) {
			var isLeap = this.basicYears[year - 1899] & 15;
			return isLeap == 15 ? 0 : isLeap;
		},
		getMonthDays: function(year, month) {
			return (this.basicYears[year - 1899] & (65536 >> month)) ? 30 : 29
		},

		//天干地支计算
		gzCalculate: function(q) {
			return this.zodiac[q % 10] + this.branches[q % 12]
		},
		getGzYear: function(year, lunarYear) {
			return this.gzCalculate(year - 1900 + 36 - (lunarYear === year ? 0 : 1))
		},
		getGzMonth: function(date,year, month) {
			var t = this.getLunarDate(year, date.getMonth() * 2);
			return this.gzCalculate((year - 1900) * 12 + month + 12 - (date < t ? 1 : 0));
		},
		getGzDay: function(date) {
			return this.gzCalculate(Math.ceil(date / 86400000 + 25567 + 10))
		},

		//获取农历日期表示，将农历用Date格式表示
		getLunarDate:function(year, monthDouble) {
			var v = this.basicData[year - 1900];
			var t = [];
			var s = 0;
			var q;
			for (; s < 30; s += 5) {
				q = (+("0x" + v.substr(s, 5))).toString();
				t.push(q.substr(0, 1));
				t.push(q.substr(1, 2));
				t.push(q.substr(3, 1));
				t.push(q.substr(4, 2))
			}
			return new Date(year, parseInt(monthDouble / 2, 10), t[monthDouble])
		}
	};

	/*
	 * 查找给定日期的节日
	 * @param {Date} date 给定的日期表示
	 * @param {Object} lunarDate 农历日期，查找农历日期
	 * @see dateUtil.getLunarDate
	 * @warning 
	 *		date不为空，查找公历节日纪念日
	 *		lunarDate不为空，查找农历节日
	 *		都不为空，则查找所有节假日
	 * @return {Array} 节假日、纪念日集合
	 * @example 
	 *		var holiday = dateUtil.getHoliday({year:2015,month:5,date:4})
	 *		//holiday = [
	 *						{
	 *							//节日名称
	 *							name:'五四青年节',
	 *							//起源年份，null：传统节日，不可考究
	 *							year:1954,
	 *							//受影响的范围，cn:中国节日，g:国际节日纪念日，a:西方(美国)节日纪念日，c:教会节日
	 *							scope:'cn'
	 *						}
	 *					]
	 */
	var getFestival = dateUtil.getFestival = function(date,lunarDate){
		var results = [],m;
		if (date) {
			results = _getFestival();
		}
		if (lunarDate) {
			results = results.concat(_getLunarFestival());
		};
		for (var i = 0; i < results.length; i++) {
			m = results[i].split(',');
			results[i] = {
				name:m[1],
				scope:m[0],
				year:m[2] ? parseInt(m[2]) : null
			}
		};
		return results;

		//获取农历节日
		function _getLunarFestival(){
			var m = date.month,
				d = date.date;
			return holidayList['cn' + (d>9?d:'0'+9)+''+(d>9?d:'0'+d)] || [];
		}

		//获取公历节日
		function _getFestival(){
			var m,d,w,h;
			m = date.getMonth() + 1;
			d = date.getDate();
			w = date.getDay();
			h = holidayList[(m>9?m:'0'+m)+''+(d>9?d:'0'+9)] || [];
			h = h.concat(holidayList.w[(m>9?m:'0'+m)+''+(Math.ceil(d/7))+''+w] || []);
			return h;
		}
	};

	/*
	 *	根据公历日期，获取农历日期
	 * @param {Date} date 公历日期
	 * @return {
	 *		animal:{string} 12生肖中的一个，表示当前年份的生肖：鼠、牛....
	 *		gzDate:{string} 用天干地支表示的日：己酉
	 * 		gzMonth:{string} 用天干地支表示的月：丁丑
	 *		gzYear:{string} 用天干地支表示的年份：甲午
	 *		isBigMonth:{boolean} 本月是否为大月
	 *		lunarDate:{string} 农历表示的日期：十四
	 *		lunarMonth:{string} 农历表示的月份：腊
	 *		term:{string} 表示农历节气：清明
	 *		date:{number} 数字形式的农历日期：14
	 *		month:{number} 数字形式的月份：12
	 *		year:{number} 数字形式的年份：2014
	 * }
	 */
	var getLunarDate = dateUtil.getLunarDate = function(date){
		var year = date.getFullYear(),
			month = date.getMonth() + 1,
			d = date.getDate(),
			monthDouble = (month - 1) * 2,
			lunarDate = lunar.getLunarDate(year,monthDouble),
			term,
			m;
		date = new Date(year,month-1,d);
		if (d != lunarDate.getDate()) {
			m = lunar.getLunarDate(year,monthDouble+1);
			if (d == m.getDate()) {
				term = lunar.terms[monthDouble+1];
			};
		}else{
			term = lunar.terms[monthDouble];
		}
		lunarDate = lunar.getDate(date);
		return {
			animal:lunar.animals[(lunarDate.year - 4) % 12],
			gzDate:lunar.getGzDay(date),
			gzMonth:lunar.getGzMonth(date,year,month),
			gzYear:lunar.getGzYear(year,lunarDate.year),
			isBigMonth:lunarDate.isBigMonth,
			lunarDate:lunarDate.date % 10 == 0 ? ["初十", "二十", "三十"][lunarDate.date / 10 - 1] : lunar.lunarDayPrefixs[parseInt(lunarDate.date / 10,10)] + lunar.lunarDays[parseInt(lunarDate.date % 10,10)],
			lunarMonth:(lunarDate.isLeap % 10 == 0 ? "闰" : "") + lunar.lunarMonths[lunarDate.month - 1],
			term:term || '',
			date:lunarDate.date,
			month:lunarDate.month,
			year:lunarDate.year
		};
	};

	/*
		将日期格式的对象格式化为字符串，如果不提供格式化器，将采用系统默认的Date.toString
		@see https://msdn.microsoft.com/zh-cn/library/8kb3ddd4(v=vs.100).aspx
		@warning 采用format格式化的日期字符串，如果还需要parse为日期格式，请使用完全格式化器，否则将导致解析失败
				For example:
					推荐 ：format(new Date(),'yyyy-MM-dd HH:mm:ss.fff')
					错误 ：format(new Date(),'yyyy-M-d H:m:s.f')，简化的格式化器转化出的字符串无法再被正确的parse

		格式说明符                  说明                              示例
		"d"             一个月中的某一天（1 到 31）。           6/1/2009 1:45:30 PM -> 1
                                                                6/15/2009 1:45:30 PM -> 15
        "dd"            一个月中的某一天（01 到 31）。          6/1/2009 1:45:30 PM -> 01
																6/15/2009 1:45:30 PM -> 15
		"f"             日期和时间值的十分之几秒。              6/15/2009 13:45:30.617 -> 6
																6/15/2009 13:45:30.050 -> 0
		"ff"            日期和时间值的百分之几秒。				6/15/2009 13:45:30.617 -> 61
																6/15/2009 13:45:30.005 -> 00
		"fff"     		日期和时间值的毫秒。					6/15/2009 13:45:30.617 -> 617
																6/15/2009 13:45:30.0005 -> 000
		"h"				采用 12 小时制的小时（从 1 到 12）。	6/15/2009 1:45:30 AM -> 1
																6/15/2009 1:45:30 PM -> 1
		"hh"			采用 12 小时制的小时（从 01 到 12）。	6/15/2009 1:45:30 AM -> 01
																6/15/2009 1:45:30 PM -> 01
		"H"				采用 24 小时制的小时（从 0 到 23）。	6/15/2009 1:45:30 AM -> 1
																6/15/2009 1:45:30 PM -> 13
		"HH"			采用 24 小时制的小时（从 00 到 23）。	6/15/2009 1:45:30 AM -> 01
																6/15/2009 1:45:30 PM -> 13
		"m"				分钟（0 到 59）。						6/15/2009 1:09:30 AM -> 9
																6/15/2009 1:09:30 PM -> 9
		"mm"			分钟（00 到 59）。						6/15/2009 1:09:30 AM -> 09
																6/15/2009 1:09:30 PM -> 09
		"M"				月份（1 到 12）。						6/15/2009 1:45:30 PM -> 6
		"MM"			月份（01 到 12）。						6/15/2009 1:45:30 PM -> 06
		"MMM"			月份的缩写名称。						6/15/2009 1:45:30 PM -> Jun
		"MMMM"			月份的完整名称。						6/15/2009 1:45:30 PM -> June
		"s"				秒（0 到 59）。							6/15/2009 1:45:09 PM -> 9
		"ss"			秒（00 到 59）。						6/15/2009 1:45:09 PM -> 09
		"t"				AM/PM 指示符的第一个字符。				6/15/2009 1:45:30 PM -> P
		"tt"			AM/PM 指示符。                          6/15/2009 1:45:30 PM -> PM
		"y"				年份（0 到 99）。						6/15/2009 1:45:30 PM -> 9
		"yy"			年份（00 到 99）。						1/1/1900 12:00:00 AM -> 00
																6/15/2009 1:45:30 PM -> 09
		"yyy"			年份（最少三位数字）。					1/1/0900 12:00:00 AM -> 900
																1/1/1900 12:00:00 AM -> 1900
																6/15/2009 1:45:30 PM -> 2009
		"yyyy"			由四位数字表示的年份。					6/15/2009 1:45:30 PM -> 2009
		"z"				相对于 UTC 的小时偏移量，无前导零。		6/15/2009 1:45:30 PM -07:00 -> -7
		"zz"			相对于 UTC 的小时偏移量，带有表示一		6/15/2009 1:45:30 PM -07:00 -> -07		
						位数值的前导零。
		"g"				公元纪年								6/15/0600 1:45:30 PM -07:00 -> -7
																6/15/2009 1:45:30 PM -07:00 -> -21
		"gg"			公元纪年（有前导0）						6/15/0600 1:45:30 PM -07:00 -> -07
																6/15/2009 1:45:30 PM -07:00 -> -21
	*/
	//@param {Date} date 要格式化的日期
	//@param {string} frm 格式化的字符串占位符
	var format = dateUtil.format = function(date,frm){
		if (!(date instanceof Date)) {
			return date;
		};
		if (!frm) {
			return date.toString();
		};
		var year = Math.abs(date.getFullYear()),
			n = date.getFullYear() < 0 ? '-' : '',
			offset = date.getTimezoneOffset() / 60,
			yearStr = n + fix(year.toString(),4,'0',true),
			y = parseInt(yearStr.substr(yearStr.length - 2)),
			month = date.getMonth() + 1,
			d = date.getDate(),
			H = date.getHours(),
			h = H != 12 ? H % 12 : H,
			m = date.getMinutes(),
			s = date.getSeconds(),
			f = date.getMilliseconds(),
			g = year % 100 == 0 ? (year / 100 + 1) : Math.ceil(year / 100);
		return frm.replace(/y+/g,function(match){
			var z = year < 0 ? '-' : '';
			switch(match.length){
				case 1:
					return y;
				case 2:
					return n+fix(y.toString(),2,'0',true);
				default:
					return n+fix(year.toString(),match.length,'0',true);
			}
		}).replace(/d{1,2}/g,function(match){
			if (match.length == 1) {
				return d;
			}
			return fix(d.toString(),match.length,'0',true);
		}).replace(/h{1,2}/g,function(match){
			if (match.length == 1) {
				return h;
			}
			return fix(h.toString(),match.length,'0',true);
		}).replace(/H{1,2}/g,function(match){
			if (match.length == 1) {
				return H;
			}
			return fix(H.toString(),match.length,'0',true);
		}).replace(/H{1,2}/g,function(match){
			if (match.length == 1) {
				return H;
			}
			return fix(H.toString(),match.length,'0',true);
		}).replace(/m{1,2}/g,function(match){
			if (match.length == 1) {
				return m;
			}
			return fix(m.toString(),match.length,'0',true);
		}).replace(/s{1,2}/g,function(match){
			if (match.length == 1) {
				return s;
			}
			return fix(s.toString(),match.length,'0',true);
		}).replace(/f+/g,function(match){
			var ms = f.toString();
			if (ms.length > match.length) {
				return ms.substr(0,match.length);
			};
			return fix(ms.toString(),match.length,'0',true);
		}).replace(/g{1,2}/g,function(match){
			if (match.length == 1) {
				return g;
			}
			return n+fix(g.toString(),match.length,'0',true);
		}).replace(/z{1,2}/g,function(match){
			if (match.length == 1) {
				return offset;
			}
			return (offset < 0 ? '-' : '') + fix(Math.abs(offset).toString(),match.length,'0',true);
		}).replace(/t{1,2}/g,function(match){
			if (match.length == 1) {
				return H >= 12 ? 'P' : 'A';
			}
			return H >= 12 ? 'P{#}' : 'A{#}';
		}).replace(/M{1,4}/g,function(match){
			switch(match.length){
				case 1:
					return month;
				case 2:
					return fix(month.toString(),match.length,'0',true);
				default:
					var M = MONTHNAMES[month-1];
					return match.length < 4 ? M.substr(0,3) : M;
			}
		}).replace(/\{\#\}/g,'M');
	};

	/*
		将字符串转换为日期格式，如果未提供格式化器，则采用系统默认的Date.parse
		格式化器见format
		@param {string} dateStr 字符串形式的日期
		@param {string} frm 自定义的日期格式化器
		@example 
					日期字符串													格式化器
			'2015-11-23 16:30:25.506'									'yyyy-MM-dd HH:mm:ss.fff'

			'-03世纪 -0200年December月01日 00时00分00秒000毫秒 AM -08'	'gg世纪 yyyy年MMMM月dd日 hh时mm分ss秒fff毫秒 tt zz'
		
	*/
	var parse = dateUtil.parse = function(dateStr,frm){
		if (!dateStr) {
			return null;
		};
		if (!frm) {
			return new Date(Date.parse(dateStr));
		};
		var place,
			last,
			FORMATS = 'yMdhHmsfztg',
			date = new Date(0,0,1),
			h,
			z,
			t,
			//format字符串占位符相对于日期字符串的偏移量
			//年份、世纪、时区 会出现负数，导致位移
			//月份全称长度不固定，导致位移
			p = 0,
			str;
		frm = frm.split('');
		//i <= frm.length 多取一位，在循环中完全处理掉日期替换
		for (var i = 0; i <= frm.length; i++) {
			if(frm[i]!==last){
				if (place) {
					place = place.join('');
					str = subDateStr(dateStr,place,i,p);
					p = str.p;
					set(str.str, place);
				};
				place = null;
				if (FORMATS.indexOf(frm[i]) >= 0) {
					place = [frm[i]];
				};
			}else{
				place && place.push(frm[i]);
			}
			last = frm[i];
		};

		if (h) {
			t == 'PM' && (h += 12);
			date.setHours(h);
		};

		if (z) {
			z = new Date().getTimezoneOffset() / 60 - z;
			date.setHours(date.getHours() + z);
		};

		return date;

		function subDateStr(dateStr,place,i,p){
			if (!place || !place.length) {
				return '';
			};
			var start = 0,str;
			if (place == 'MMMM') { //月份全称，长度不固定，特殊处理
				start = p + i - place.length;
				str = dateStr.substring(start,p + i - 1);
				for (var j = 0; j < MONTHNAMES.length; j++) {
					if(MONTHNAMES[j].indexOf(str) >= 0){
						str = MONTHNAMES[j];
						break;
					}
				};
				p+=(str.length - place.length);
			}else{
				start = p + i - place.length;
				str = dateStr.substring(start,p + i);
				if (place.indexOf('y') == 0 || place.indexOf('z') == 0 || place.indexOf('g') == 0) {
					if (str.indexOf('-') == 0) { //处理负数
						str = dateStr.substring(start,p + i+1);
						p++;
					};
				}
			}
			return {
				str:str || '',
				p:p
			};
		};

		function set(str,place){
			if (!place || !place.length || !str || !str.length) {
				return;
			};
			var v,c;
			if (/M{3,}/.test(place)) {
				for (var i = 0; i < MONTHNAMES.length; i++) {
					if(MONTHNAMES[i].indexOf(str) == 0){
						v = i;
						break;
					}
				};
				v != null && date.setMonth(v);
			}else if (place == 'yy' || place == 'y') {
				var Y = fix(new Date().getFullYear().toString(),4,'0',true);
				Y = Y.substr(0,Y.length-2);
				Y += fix(str,2,'0',true);
				v = parseInt(Y);
				date.setFullYear(v);
			}else{
				c = place.substr(0,1);
				if (c == 't') {
					t = place.length == 1 ? str + 'M' : str;
				}else{
					v = parseInt(str);
					switch(c){
						case 'h':
							h = v;
							break;
						case 'z':
							z = v;
							break;
						case 'y':
							date.setFullYear(v);
							break;
						case 'M':
							date.setMonth(v-1);
							break;
						case 'd':
							date.setDate(v);
							break;
						case 'H':
							date.setHours(v);
							break;
						case 'm':
							date.setMinutes(v);
							break;
						case 's':
							date.setSeconds(v);
							break;
						case 'f':
							date.setMilliseconds(v);
							break;
					}
				}				
			}
		}
	};
})();