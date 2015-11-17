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
})();