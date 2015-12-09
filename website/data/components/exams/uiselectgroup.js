require(['UISelectGroup'],function(UISelectGroup){
	//模拟一个生日选择控件
	//日期需要做联动效果

	var year,month,day;

	year = [
		{text:'1990年',value:1990},
		{text:'1991年',value:1991},
		{text:'1992年',value:1992},
		{text:'1993年',value:1993,selected:true},
		{text:'1994年',value:1994},
		{text:'1995年',value:1995},
		{text:'1996年',value:1996},
		{text:'1997年',value:1997},
		{text:'1998年',value:1998},
		{text:'1999年',value:1999},
		{text:'2001年',value:2001},
		{text:'2002年',value:2002},
		{text:'2003年',value:2003},
		{text:'2004年',value:2004},
		{text:'2005年',value:2005},
		{text:'2006年',value:2006},
		{text:'2007年',value:2007},
		{text:'2008年',value:2008},
		{text:'2009年',value:2009},
		{text:'2010年',value:2010},
		{text:'2011年',value:2011},
		{text:'2012年',value:2012},
		{text:'2013年',value:2013},
		{text:'2014年',value:2014},
		{text:'2015年',value:2015},
	];
	month = [
		{text:'1月',value:1},
		{text:'2月',value:2},
		{text:'3月',value:3},
		{text:'4月',value:4,selected:true},
		{text:'5月',value:5},
		{text:'6月',value:6},
		{text:'7月',value:7},
		{text:'8月',value:8},
		{text:'9月',value:9},
		{text:'10月',value:10},
		{text:'11月',value:11},
		{text:'12月',value:12}
	];

	//实例化
	var selectGroup = new UISelectGroup({
		children:{
			year:year,
			month:month,
			day:getDaysOfMonth(1993,4,30)
		}
	});

	//事件监听
	selectGroup.on('change',function(items){
		console.log(items);
	});

	//监听itemchange，实现联动刷新
	selectGroup.on('itemchange',function(item,name){
		if(name == 'year' || name == 'month'){
			var results = this.value(),
				y = results['year'].value,
				m = results['month'].value,
				d = results['day'].value;
			var days = getDaysOfMonth(y,m,d);
			//局部数据刷新
			this.refresh('day',days);
		}
	});

	//
	selectGroup.on('hidden',function(){
		this.destroy();
	});

	//获取value
	//output:{year:{text:'1993年',value:1993},month:{text:'4月',value:4},day{text:'30',value:30}}
	console.log(selectGroup.value());

	//show
	selectGroup.show();

	//获取每个月的天数
	function getDaysOfMonth(year,month,selectedDay){
		var max = 31;
		switch(month){
			case 2:
				max = year % 4 == 0 && year % 100 != 0 ? 29 : 28;
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				max = 30;
				break;
		}
		var results = [],
			item,
			flag = false;
		for(var i = 1; i <= max; i++){
			item = {
				text:i.toString(),
				value:i
			};
			if(i === selectedDay){
				flag = true;
				item.selected = true;
			}
			results.push(item);
		}
		if(!flag){
			results[results.length-1].selected = true;
		}
		return results;
	}
});