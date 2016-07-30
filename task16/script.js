/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var cityInput = document.getElementById('aqi-city-input').value.trim(); 
    var valueInput = document.getElementById('aqi-value-input').value.trim(); 

    var flag = true;
    if(!/^[\u4e00-\u9fa5A-Za-z]+$/.test(cityInput)){
    	alert("城市名必须为中英文字符");
    	flag = false;
    }
    
    if(!/^-?[1-9]\d*$/.test(valueInput)){
    	alert("空气质量指数必须为整数");
    	flag = false; 
    }

    if(flag){
    	aqiData[cityInput] = valueInput;
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById('aqi-table');
	var dataList='<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
	for(var x in aqiData){
		dataList += '<tr><td>' + x + '</td><td>' + aqiData[x] + 
		'</td><td><button>删除</button></td></tr>';
	}

	table.innerHTML = x? dataList: ''; 
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  	delete aqiData[city];
    renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addBtnEle = document.getElementById('add-btn');
    addBtnEle.addEventListener('click', addBtnHandle); 

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	var table = document.getElementById('aqi-table');
    table.addEventListener('click', function(e){
    	if(e.target.nodeName == 'BUTTON'){
  			var city = e.target.parentElement.parentElement.firstChild.innerText; 
    		delBtnHandle(city);
    	}
    }); 

}

window.onload = init;