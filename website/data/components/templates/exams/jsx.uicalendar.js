require(['jsx.UICalendar','UILayerList','react','react-dom'],function(UICalendar,UILayerList,React,ReactDOM){
	//calendar的配置项
	var options = {
		header:{
			format:function(date){
				return date.getFullYear() + '年'+(date.getMonth()+1)+'月'
			}
		},
		body:{
			//日期数据格式化
			itemFormat:function(item){
				//设置item.disabled = true，以实现单个日期禁用
				//@example 下面的代码实现了禁用周末
				var date = new Date(item.year,item.month-1,item.day);
				if(date.getDay() == 0 || date.getDay() == 6){
					item.disabled = true;
				}

				//@warning：一定要return item
				return item;
			},
			//渲染日期cell的回调函数
			renderItem:function(item){
				var now = new Date,		
					yesterday = new Date(new Date(now).setDate(now.getDate()-1)),
					tomorrow = new Date(new Date(now).setDate(now.getDate()+1));
				if(item.year == yesterday.getFullYear() && item.month == yesterday.getMonth()+1 && item.day == yesterday.getDate()){
					return React.createElement('span',null,
							React.createElement('span',null,item.day),
							React.createElement('br'),
							React.createElement('small',{className:'text-danger'},'昨天')
						);
				}else if(item.year == now.getFullYear() && item.month == now.getMonth()+1 && item.day == now.getDate()){
					return React.createElement('span',null,
							React.createElement('span',null,item.day),
							React.createElement('br'),
							React.createElement('small',{className:'text-success'},'今天')
						);
				}else if(item.year == tomorrow.getFullYear() && item.month == tomorrow.getMonth()+1 && item.day == tomorrow.getDate()){
					return React.createElement('span',null,
							React.createElement('span',null,item.day),
							React.createElement('br'),
							React.createElement('small',{className:'text-danger'},'明天')
						);
				}

				return item.text || item.day;
			},
			//日期选择回调函数
			select:function(date,dateStyle,item){
				alert(date);
				this.setState({
					date:dateStyle,
					currentDate:dateStyle
				});
			}
		}
	};

	//
	var Calendar = UILayerList.extend({
		createElement:function(){
			return React.createElement('div',{style:{background:"#fff",padding:"15px"}},React.createElement(UICalendar,options));
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