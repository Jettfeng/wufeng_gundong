var g_bMoveLeft=true;
// 连续滚动
var g_oTimer=null;
// 断断续续滚动
var g_oTimerOut=null;

var g_bPause=true;
var g_iPauseTime=1000;
var g_iSpeed=2;

 window.onload=function (){
	var oDiv=document.getElementById('roll');
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=oUl.getElementsByTagName('li');
	var aA=oDiv.getElementsByTagName('a');
	var oChk=document.getElementById('chk_pause');
	//间隔时间
	var oPauseTime=document.getElementById('pause_time');
	//滚动速度
	var oSpeed=document.getElementById('sel_speed');
	var i=0;
	//让Ul宽度增加一倍
	var str=oUl.innerHTML+oUl.innerHTML;
	oUl.innerHTML=str;
	oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
	
	for(i=0;i<aLi.length;i++){
		// 鼠标移入，关闭定时器
		aLi[i].onmouseover=function ()
		{
			stopMove();
		};
		// 鼠标移除，开启定时器
		aLi[i].onmouseout=function ()
		{
			startMove(g_bMoveLeft);
		};
	}
	// 向左滚动
	aA[0].onmouseover=function ()
	{
		startMove(true);
	};
	// 向右滚动
	aA[1].onmouseover=function ()
	{
		startMove(false);
	};
	
	startMove(true);
	//是否选择间隔停顿
	oChk.onclick=function ()
	{
		g_bPause=oChk.getElementsByTagName('input')[0].checked;
		console.log(g_bPause)
	};
	// // 获取速度是慢，快，中
	oSpeed.onchange=function ()
	{
		g_iSpeed=parseInt(this.value);
	};
	// // 间隔时间
	oPauseTime.onchange=function ()
	{
		g_iPauseTime=parseInt(this.value);
	};
 };

function startMove(bLeft){
	g_bMoveLeft=bLeft;
	if(g_oTimer){
		clearInterval(g_oTimer);
	}
	g_oTimer=setInterval(doMove, 30);
}

function stopMove(){
	clearInterval(g_oTimer);
	g_oTimer=null;
}

function doMove(){
	var oDiv=document.getElementById('roll');
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=oUl.getElementsByTagName('li');
	var l=oUl.offsetLeft;
	if(g_bMoveLeft){
		l-=g_iSpeed;
		if(l<=-oUl.offsetWidth/2){
			l+=oUl.offsetWidth/2;
		}
	}
	else{
		l+=g_iSpeed;
		if(l>=0){
			l-=oUl.offsetWidth/2;
		}
	}
	// 断断续续滚动
	if(g_bPause){
		if(Math.abs(l-Math.round(l/aLi[0].offsetWidth)*aLi[0].offsetWidth)<Math.ceil(g_iSpeed/2)){
			// 先关闭循环性定时器在开启一次性定时器
			stopMove();
			g_oTimerOut=setTimeout(function (){
					startMove(g_bMoveLeft);
				}, g_iPauseTime);
			l=Math.round(l/aLi[0].offsetWidth)*aLi[0].offsetWidth;
		}
	}
	oUl.style.left=l+'px';
}