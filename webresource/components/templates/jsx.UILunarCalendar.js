/*
	农历日历
*/
define('jsx.UILunarCalendar',['react','react-dom','date-util','jsx.UICalendar'],function(React,ReactDOM,dateUtil,UICalendar){
	var UILunarCalendar = React.createClass({displayName: "UILunarCalendar",
		defaults:function(){
			return {
				className:'calendar-holiday',
				body:{
					itemFormat:this._itemFormat,
					renderItem:this._renderItem,
					select:this._select
				}
			};
		},
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
		render:function(){
			var props = $.extend(true,{},this.props,this.defaults());
			_.extend(props,this.state);
			return React.createElement(UICalendar, React.__spread({},  props));
		},
		initParams:function(props){
			this.setState({
				date:props.date,
				currentDate:props.currentDate
			});
		},
		_itemFormat:function(item){			
				var date = new Date(item.year,item.month-1,item.day),
					lunar,
					festival;

				try{
					lunar = dateUtil.getLunarDate(date);
				}catch(e){}

				festival = dateUtil.getFestival(date);
				item.lunar=lunar;
				item.festival=festival;
				if (this.props.body && _.isFunction(this.props.body.itemFormat)) {
					item = this.props.body.itemFormat.apply(this,arguments);
				};
			

			return item;
		},
		_renderItem:function(item){
			if (this.props.body && _.isFunction(this.props.body.renderItem)) {
				return this.props.body.renderItem.apply(this,arguments);
			};
			var text,
				title = '',
				lunar = item.lunar,
				festival = item.festival;
			if (item.lunar) {
				text = lunar.date == 1 ? lunar.lunarMonth + '月' : lunar.lunarDate;
				title = lunar.gzYear + '年 '+lunar.gzMonth+'月 '+lunar.gzDate+'日'+'\n';
				title = title + lunar.year + '年 ' + lunar.lunarMonth + '月 '+lunar.lunarDate;
			};
			if (festival && festival.length > 0) {
				text = festival[0].name;
				title += title ? '\n' : '';
				var arr = [];
				for (var i = 0; i < festival.length; i++) {
					arr.push(festival[i].name);
				};
				title += arr.join(' ');
			};
			if (text) {
				return React.createElement("span", {title: title}, item.day, React.createElement("br", null), React.createElement("small", {className: "text-danger"}, text));	
			};
			return item.day;
		},
		_select:function(date,dateStyle,item){
			// this.initParams({
			// 	date:dateStyle,
			// 	currentDate:dateStyle
			// });
			if (_.isFunction(this.props.body.select)) {
				this.props.body.select.apply(this,arguments);
			};
		}
	});
	return UILunarCalendar;
});