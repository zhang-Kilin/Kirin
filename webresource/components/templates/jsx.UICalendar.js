define('jsx.UICalendar',['react','react-dom'],function(React,ReactDOM){
	var Calendar = React.createClass({displayName: "Calendar",
		getDefaultProps:function(){
			return {
				date:new Date,
				currentDate:new Date,
				//预留className，方便扩展
				className:"",
				hasHeader:true,
				hasToolbar:true,
				hasBody:true,
				header:{},
				body:{},
				toolbar:{}
			};
		},
		DEFAULTS:{
			header:{
				format:null
			},
			body:{
				/*
					固定显示6行日历，不足的以前后月份补充
				*/
				fill:true,
				/*
					生成日期cell的函数
					function(item){}
				*/
				renderItem:null,
				/*
					生成月份日历的日期集合
					function(date){return data;}
					返回值格式如下，集合中每一个元素代表一个单元格，如果单元格不需要渲染，则给定占位符为null即可
					data = [null,
							null,
							{year:2015,month:11,day:1},
							{year:2015,month:11,day:2},
							...
							{year:2015,month:11,day:30}
							]
				*/
				createDates:null,
				/*
					渲染之前对tiem的格式化函数
					function(item){return item;}
				*/
				itemFormat:null,
				/*
					当日期被选中后的回调函数
					@param {string} date 日期字符串表示'2015-11-9'
					@param {Date} dateStyle Date格式的日期表示
					@param {object} item 当前选中的item，可使用itemFormat函数向item中注入自定义参数
					function(date,dateStyle,item){}
				*/
				select:null,
				/*
					不可选择的日期范围，仅限定到‘日’的判断，不支持时分秒的判断
					disabled:[[,'2015-11-5'],['2015-11-15','2015-11-20'],['2015-11-25',]...]
				*/
				disabled:[],
				/*
					表头，周表示
				*/
				weeks:[{
						text:'日',
						value:0,
						className:'text-danger bg-danger'
					},{
						text:'一',
						value:1
					},{
						text:'二',
						value:2
					}
					,{
						text:'三',
						value:3
					}
					,{
						text:'四',
						value:4
					}
					,{
						text:'五',
						value:5
					}
					,{
						text:'六',
						value:6,
						className:'text-danger bg-danger'
					}
				]
			},
			toolbar:{
				format:function(type,item){
					return item;
				},
				years:[1900,2050],
				hasToday:true,
				todayText:"返回今日"
			}
		},
		getInitialState:function(){
			return {};
		},
		componentWillMount:function(){
			this.setState({
				date:this.props.date,
				currentDate:this.props.currentDate
			});
		},
		componentDidMount:function(){
		},
		componentDidUpdate:function(prevProps,prevState){
		},
		componentWillReceiveProps:function(nextProps){
			this.setState({
				date:nextProps.date,
				currentDate:nextProps.currentDate
			});
		},
		render:function(){
			var self = this,
				cls = "container calendar " + (this.props.className||""),
				props = {
					date:this.state.date,
					currentDate:this.state.currentDate,
					calendar:this
				};
			return React.createElement("div", {className: cls}, 
						this.renderHeader(props), 
						this.renderToolbar(props), 
						this.renderBody(props)
					);
		},
		renderHeader:function(props){
			if (this.props.hasHeader) {
				props = _.extend({},this.DEFAULTS.header,this.props.header,props);
				return React.createElement(Calendar.Header, React.__spread({},  props, {ref: "Header"}));
			};
		},
		renderToolbar:function(props){
			if (this.props.hasToolbar) {
				props = _.extend({},this.DEFAULTS.toolbar,this.props.toolbar,props);
				return React.createElement(Calendar.Toolbar, React.__spread({},  props, {ref: "Toolbar"}));
			};
		},
		renderBody:function(props){
			if (this.props.hasBody) {
				props = _.extend({},this.DEFAULTS.body,this.props.body,props);
				return React.createElement(Calendar.Body, React.__spread({},  props, {ref: "Body"}));
			};
		}
	});

	//Header
	Calendar.Header = React.createClass({displayName: "Header",
		getDefaultProps:function(){
			return {};
		},
		getInitialState:function(){
			return {};
		},
		componentWillMount:function(){
			this.initParams(this.props);
		},
		componentWillReceiveProps:function(nextProps){
			this.initParams(nextProps);
		},
		initParams:function(props){
			this.setState({
				date:props.date,
				currentDate:props.currentDate
			});
		},
		render:function(){
			return React.createElement("div", {className: "calendar-header"}, 
						React.createElement("h4", null, this.currentDate())
					);
		},
		currentDate:function(){
			if (_.isFunction(this.props.format)) {
				return this.props.format.call(this,this.state.date);
			};
			var year = this.state.date.getFullYear(),
				month = this.state.date.getMonth() + 1;
			return year +" 年 "+ month + " 月 ";
		}
	});
	//body
	Calendar.Body = React.createClass({displayName: "Body",
		getInitialState:function(){
			return {
				//当前选中的日期
				selected:null
			};
		},
		getDefaultProps:function(){
			return {
				fill:true,
				weeks:null,
				renderItem:null,
				select:null,
				createDates:null,
				itemFormat:null,
				/*
					不可选择的日期范围
					disabled:[[,'2015-11-5'],['2015-11-15','2015-11-20'],['2015-11-25',]...]
				*/
				disabled:[]
			};
		},
		componentWillMount:function(){
			this.initParams(this.props);
			this._data = this.createDates(this.props.date);
		},
		componentWillReceiveProps:function(nextProps,nextState){
			this.initParams(nextProps);
		},
		componentWillUpdate:function(nextProps,nextState){
			var date = nextState.date,
				prevDate = this.state.date;
			if (date.getFullYear() != prevDate.getFullYear() || date.getMonth() != prevDate.getMonth()) {
				this._data = this.createDates(date);
			};
		},
		shouldComponentUpdate:function(nextProps, nextState){
			var curDate = this.state.currentDate,
				nextCurDate = nextState.currentDate,
				date = this.state.date;
				nextDate = nextState.date;
				curDiff = false
				dateDiff = false;

			if (curDate != nextCurDate) {
				if (curDate && nextCurDate) {
					curDiff = curDate.getFullYear() != nextCurDate.getFullYear()
							|| curDate.getMonth() != nextCurDate.getMonth()
							|| curDate.getDate() != nextCurDate.getDate();
				}else{
					curDiff = true;
				}
			};

			dateDiff = date.getFullYear() != nextDate.getFullYear() 
					|| date.getMonth() != nextDate.getMonth();
			if (!dateDiff) {
				date = this.props.date;
				nextDate = nextProps.date;
				dateDiff = date.getFullYear() != nextDate.getFullYear() 
					|| date.getMonth() != nextDate.getMonth();
			};

			return curDiff || dateDiff;
		},
		render:function(){
			return React.createElement("div", {className: "calendar-body", onClick: this._cellClick}, 
						this.createHeader(), 
						this.createItems()
					);
		},
		initParams:function(props){
			this.setState({
				date:props.date,
				currentDate:props.currentDate,
				disabled:this.initDisabledRange(props.disabled)
			});
		},
		//初始化不可用日期范围
		initDisabledRange:function(range){
			var results = null,
				start,
				end,
				date;
			if (range) {
				results = _.map(range,function(item){
					start = tran(item[0]),
					end = tran(item[1]);
					return [start,end];
				});
			};

			function tran(date){
				if (!date) {
					return date;
				};
				if (typeof date === "string") {
					date = new Date(date.replace("-","/"));
				}else if (_.has(date,'year') && _.has(date,'month') && _.has(date,'day')) {
					date = new Date(date.year,date.month-1,date.day);
				}
				if (date instanceof Date) {
					return date;
				};
				return null;
			};

			return results;
		},
		createDates:function(date){
			if (_.isFunction(this.props.createDates)) {
				return this.props.createDates(date);
			};

			if (this.props.fill) {
				return this.craeteFillDates(date);
			}

			date = new Date(date.getFullYear(),date.getMonth(),1);
			var results = [],
				year = date.getFullYear(),
				month = date.getMonth() + 1,
				w = date.getDay(),
				max = this.getMaxDays(year,month),
				i = w,
				item;
			while(i--){
				results[i] = null;
			}			
			i = 1;
			for(i = 1; i<= max ; i++){
				item = {
					year : year,
					month : month,
					day : i	
				};
				if (_.isFunction(this.props.itemFormat)) {
					item = this.props.itemFormat(item);
				};
				results.push(item);
			}
			return results;
		},
		craeteFillDates:function(date){
			date = new Date(date.getFullYear(),date.getMonth(),1);
			var results = [],
				year = date.getFullYear(),
				month = date.getMonth() + 1,
				w = date.getDay(),
				max = this.getMaxDays(year,month),
				i = w,
				item,
				rowCount,
				prevDate,
				start,
				cellCount;
			w = w == 0 ? 7 : w;
			rowCount = 6;
			cellCount = rowCount * 7 - w;
			cellCount = cellCount < max ? cellCount + 7 : cellCount;
			i = 1-w;
			while(i <= cellCount){
				if (i<=0) {
					if (!prevDate) {
						prevDate = new Date(date.setDate(-w));
						prevDate = {
							year:prevDate.getFullYear(),
							month:prevDate.getMonth() + 1,
							day:prevDate.getDate()
						};
					};
					prevDate.day++;
					item = _.extend({},prevDate);
				}else if (i > max){
					item = {
						year : month == 12 ? year + 1 : year,
						month : month == 12 ? 1 : month + 1,
						day : i - max
					};
				}else{
					item = {
						year : year,
						month : month,
						day : i	
					};
				}
				if (_.isFunction(this.props.itemFormat)) {
					item = this.props.itemFormat(item);
				};
				results.push(item);
				i++;
			}
			return results;
		},
		getMaxDays:function(year,month){
			switch(month){
				case 2:
					return year % 100 != 0 && year % 4 == 0 || year % 400 == 0 ? 29 : 28;
				case 4:
				case 6:
				case 9:
				case 11:
					return 30;
				default:
					return 31;
			}
		},
		createHeader:function(){
			if (this.props.weeks) {
				var items = _.map(this.props.weeks,function(item){
					if(typeof item === 'string'){
						return React.createElement("span", {className: "place"}, item);
					}
					return React.createElement("span", {className: "place "+(item.className || "")}, item.text);
				});
				return React.createElement("div", {className: "btn-group-justified calendar-body-header"}, items);
			};
		},
		createItems:function(){
			var results = [],
				data = this._data,
				cells,
				item,
				j,
				i = 0;
			while(i < data.length){
				cells = [];
				for (j = i + 7; i < j ; i++) {
					item = data[i];
					if (item) {
						item = this.formatRangeDisabled(item);
					}
					cells.push(this.oncreateitem(item));
				};
				results.push(React.createElement("div", {className: "btn-group-justified"}, cells));
			}

			return results;
		},
		_cellClick:function(e){
			var target = e.target,
				date,
				dateStyle,
				item;
			while (target && !(date = $(target).attr("data-date"))) {
				target = target.parentNode;
			};
			if(date && !$(target).attr('disabled')){
				dateStyle = new Date(date.replace(/\-/g,'/'));
				item = _.find(this._data,$.proxy(function(o){
					return this.diff(o,dateStyle);
				},this));

				this.onselect.call(this,date,dateStyle,item);
			}
		},
		/*
			item = {year:2015,month:11,day:7}
		*/
		oncreateitem:function(item){
			if (item) {
				var cls = this.diff(item,this.state.currentDate) && !item.disabled ? "btn btn-info active" : "btn btn-default",
					date = item.year + "-" + item.month + "-" + item.day,
					props = {
						"data-date":date,
						"className":cls + (item.month != this.state.date.getMonth() + 1 ? " gray" : ""),
						"href":"javascript:;"
					},
					text = item.text || item.day;					
					if(_.isFunction(this.props.renderItem)){
						text = this.props.renderItem.apply(this.props.calendar,arguments);
					}
					if(item.disabled){
						props.disabled="disabled";
					}
				return React.createElement("a", React.__spread({},  props), text);
			}else{
				return React.createElement("span", {className: "place"});
			}
		},
		onselect:function(date,dateStyle,item){
			// this.props.calendar.setState({
			// 	date:dateStyle
			// });
			// var args = arguments;
			// setTimeout($.proxy(function(){
				if(_.isFunction(this.props.select)){
					return this.props.select.apply(this.props.calendar,arguments);
				}
				this.props.calendar.setState({
					date:dateStyle,
					currentDate:dateStyle
				});
			// },this),0);
		},
		diff:function(item1,item2){			
			function format(date){
				if (date instanceof Date) {
					return {
						year:date.getFullYear(),
						month:date.getMonth() + 1,
						day:date.getDate()
					};
				}
				return date;
			};
			item1 = format(item1);
			item2 = format(item2);
			return item1 && item2 && item1.year == item2.year && item1.month == item2.month && item1.day == item2.day;
		},
		formatRangeDisabled:function(item){
			var range = this.state.disabled,
				dis,
				date = new Date(item.year,item.month - 1,item.day);
			if (range) {
				dis = _.find(range,function(r){
					if (r[0] && !r[1]) { //右开口，无上限
						return date >= r[0];
					};
					if (r[0] && r[1]) { //两端都闭口，取范围
						return date >= r[0] && date <= r[1];
					};
					if (!r[0] && r[1]) { //左开口，无下限
						return date <= r[1];
					};
					return false;
				});
				if (dis) {
					item.disabled = true;
				};
			};
			return item;
		}
	});

	Calendar.Toolbar = React.createClass({displayName: "Toolbar",
		getDefaultProps:function(){
			return {};
		},
		getInitialState:function(){
			return {};
		},
		componentWillReceiveProps:function(nextProps){

		},
		render:function(){
			return React.createElement("div", {className: "calendar-toolbar"}, 
						this.createItems()
					);
		},
		createItems:function(){
			var results = [];
			if (this.props.years) {
				results.push(React.createElement(Calendar.Toolbar.DateTool, React.__spread({},  this.props, {ref: "DateTool"})));
			};
			if (this.props.hasToday) {
				results.push(React.createElement(Calendar.Toolbar.TodayTool, React.__spread({},  this.props, {ref: "TodayTool"})));	
			};
			return results;
		}
	});

	Calendar.Toolbar.DateTool = React.createClass({displayName: "DateTool",
		getDefaultProps:function(){
			return {
				years:[1900,2050],
				currentDate:new Date,
				select:function(item){},
				format:function(type,item){
					// return type == "y" ? item + " 年" : item + " 月";
					return item;
				}
			};
		},
		getInitialState:function(){
			return {
				yearMenuShow:false,
				monthMenuShow:false
			};
		},
		componentWillMount:function(){
			this.initParams(this.props);
		},
		componentDidMount:function(){
			this.$hideMenus = $.proxy(this.hideMenus,this);
			$(document).on('click',this.$hideMenus);
			$(ReactDOM.findDOMNode(this.refs["slideYears"])).on("click",$.proxy(this.slideYears,this));
			$(ReactDOM.findDOMNode(this.refs["slideMonths"])).on("click",$.proxy(this.slideMonths,this));
		},
		componentWillUnmount:function(){
			$(document).off('click',this.$hideMenus);
		},
		componentWillReceiveProps:function(nextProps){
			this.initParams(nextProps);
		},
		componentDidUpdate:function(prevProps,prevState){
			if ((!prevState.yearMenuShow && this.state.yearMenuShow)
				|| (!prevState.monthMenuShow && this.state.monthMenuShow)) {
				this.setScroll();
			};
		},
		initParams:function(props){			
			this.setState({
				year:props.date.getFullYear(),
				month:props.date.getMonth() + 1,
				currentDate:props.currentDate,
				date:props.date
			});
		},
		setScroll:function(){
			if (this.isMounted()) {
				var year = this.state.year,
					start = this.props.years[0],
					scrollTop = (year - start - 3) * 26;
				scrollTop = scrollTop < 0 ? 0 : scrollTop;
				ReactDOM.findDOMNode(this.refs["year-menu"]).scrollTop = scrollTop ;

				var month = this.state.month;
				scrollTop = (month-3) * 26;
				scrollTop = scrollTop < 0 ? 0 : scrollTop;
				ReactDOM.findDOMNode(this.refs["month-menu"]).scrollTop = scrollTop ;				
			};
		},
		render:function(){
			return React.createElement("div", {className: "tool"}, 
						React.createElement("div", {className: "btn-group"}, 
							React.createElement("a", React.__spread({},  this.createButtonProps("prevYear")), 
								"<<"
							), 
							React.createElement("a", React.__spread({},  this.createButtonProps("prevMonth")), 
								"<"
							), 
							React.createElement("div", {className: "btn-group"}, 
								React.createElement("a", React.__spread({},  this.createButtonProps()), 
									this.format('y',this.state.year)
								), 
								React.createElement("a", React.__spread({},  this.createButtonProps(), {ref: "slideYears"}), 
									React.createElement("i", {className: "caret"})
								), 
								React.createElement("ul", {className: "dropdown-menu", ref: "year-menu", style: {
										display:this.state.yearMenuShow ? "block" : "none"
									}}, 
									this.createYearItems()
								)
							), 
							React.createElement("div", {className: "btn-group"}, 
								React.createElement("a", React.__spread({},  this.createButtonProps()), 
									this.format('M',this.state.month)
								), 
								React.createElement("a", React.__spread({},  this.createButtonProps(), {ref: "slideMonths"}), 
									React.createElement("i", {className: "caret"})
								), 
								React.createElement("ul", {className: "dropdown-menu", ref: "month-menu", style: {
										display:this.state.monthMenuShow ? "block" : "none"
									}}, 
									this.createMonthItems()
								)
							), 
							React.createElement("a", React.__spread({},  this.createButtonProps("nextMonth")), 
								">"
							), 
							React.createElement("a", React.__spread({},  this.createButtonProps("nextYear")), 
								">>"
							)
						)
					);
		},
		createButtonProps:function(type){
			var props = {
					"href":"javascript:;",
					"className":"btn btn-default"
				},
				disabled;
			switch(type){
				case "prevYear":
					disabled = this.state.year <= this.props.years[0] ? "disabled" : "";
					_.extend(props,{
						onClick: disabled ? null : this.prevYear,
						disabled:disabled
					});
					break;
				case "prevMonth":
					disabled = (this.state.year < this.props.years[0] || (this.state.year == this.props.years[0] && this.state.month == 1)) ? "disabled" : "";
					_.extend(props,{
						onClick:disabled ? null : this.prevMonth,
						disabled:disabled
					});
					break;
				case "nextYear":
					disabled = this.state.year >= this.props.years[1] ? "disabled" : "";
					_.extend(props,{
						onClick:disabled ? null : this.nextYear,
						disabled:disabled
					});
					break;
				case "nextMonth":
					disabled = (this.state.year > this.props.years[1] || (this.state.year == this.props.years[1] && this.state.month == 12)) ? "disabled" : "";
					_.extend(props,{
						onClick:disabled ? null : this.nextMonth,
						disabled:disabled
					});
					break;
				// case "slideYears":
				// 	_.extend(props,{
				// 		onClick:this.slideYears
				// 	});
				// 	break;
				// case "slideMonths":
				// 	_.extend(props,{
				// 		onClick:this.slideMonths
				// 	});
				// 	break;
			}
			return props;
		},
		createYearItems:function(){
			var start = this.props.years[0],
				end = this.props.years[1],
				results = [],
				year = this.state.year,
				props;
			for(var i = start; i <= end; i++){
				props = {
					"className": i == this.state.year ? "active" : "",
					"data-year":i,
					"onClick":this.select
				};
				results.push(React.createElement("li", React.__spread({},  props), 
								React.createElement("a", {href: "javascript:;"}, this.format('y',i))
							));
			}
			return results;
		},
		createMonthItems:function(){
			var items = [];
			for(var i = 1; i<=12; i++){
				items.push(React.createElement("li", {className: i == this.state.month ? "active" : "", "data-month": i, onClick: this.selecte}, 
								React.createElement("a", {href: "javascript:;"}, this.format('M',i))
							));
			}
			return items;
		},
		slideYears:function(e){
			e.preventDefault();
			e.stopPropagation();
			this.setState({
				yearMenuShow:!this.state.yearMenuShow
			});
		},
		slideMonths:function(e){
			e.preventDefault();
			e.stopPropagation();
			this.setState({
				monthMenuShow:!this.state.monthMenuShow
			});
		},
		hideMenus:function(){
			this.setState({
				yearMenuShow:false,
				monthMenuShow:false
			});
		},
		format:function(type,item){
			if (_.isFunction(this.props.format)) {
				return this.props.format.apply(this.props.calendar,arguments);
			};
			return item;
		},
		select:function(e){
			var month = parseInt($(e.currentTarget).attr("data-month")),
				year = parseInt($(e.currentTarget).attr("data-year"));
			month = month || this.state.month;
			year = year || this.state.year;
			this.hideMenus();
			this._select({
				year:year,
				month:month
			});
		},
		_select:function(item){
			var date = new Date(this.state.date);
			date.setFullYear(item.year);
			date.setMonth(item.month-1);
			this.props.calendar.setState({
				date:date
			});
		},
		prevYear:function(e){
			this._select(this.addYear(-1));
		},
		prevMonth:function(e){
			this._select(this.addMonth(-1));
		},
		nextYear:function(e){
			this._select(this.addYear(1));
		},
		nextMonth:function(e){
			this._select(this.addMonth(1));
		},
		addYear:function(diff){
			var year = this.state.year + diff;
			year = year < this.props.years[0] ? this.props.years[0] : year;
			year = year > this.props.years[1] ? this.props.years[1] : year;
			return {year:year,month:this.state.month};
		},
		addMonth:function(diff){
			var month = this.state.month + diff,
				year = this.state.year;
			if (month < 1) {
				year = this.addYear(-1).year;
				if (year < this.state.year) {
					month += 12;
				}else{
					month -= diff;
				}
			}else if (month > 12) {
				year = this.addYear(1).year;
				if (year > this.state.year) {
					month -= 12;
				}else{
					month -= diff;
				}
			};
			return {year:year,month:month};
		}
	});

	Calendar.Toolbar.TodayTool = React.createClass({displayName: "TodayTool",
		getDefaultProps:function(){
			return {
				todayText:"返回今日"
			};
		},
		render:function(){
			return React.createElement("div", {className: "tool"}, 
						React.createElement("div", {className: "btn-group"}, 
							React.createElement("a", {href: "javascript:;", className: "btn btn-default", onClick: this.prev}, 
								this.props.todayText
							)
						)
					);
		},
		prev:function(){
			var now = new Date;
			this.props.calendar.setState({
				date:now,
				currentDate:now
			});
		}
	});
	return Calendar;
});