require(['jsx.UILunarCalendar','UILayerList','react','react-dom'],function(UILunarCalendar,UILayerList,React,ReactDOM){
	var options = {
		date:new Date,
		currentDate:new Date,
		body:{
			select:function(date,dateStyle,item){
				alert(JSON.stringify(item));
				//更改日历属性
				this.setState({
					//如果选择的日期超出了本月份，会自动渲染当月日历
					date:dateStyle,
					//选中当前日期
					currentDate:dateStyle
				});
			}
		}
	};

	//
	var Calendar = UILayerList.extend({
		createElement:function(){
			return React.createElement('div',{style:{background:"#fff",padding:"15px"}},
						React.createElement(UILunarCalendar,options)
					);
		}
	});

	//instance
	var calendar = new Calendar();

	//dispose
	calendar.on('hidden',function(){
		this.destroy();
	});

	//show
	calendar.show();
});