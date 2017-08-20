
var waterUtil = {
	getByClass:function (parent,clsName) {
		var classEle = new Array(),
			 oElements = parent.getElementsByTagName("*");
		for (var i = 0; i < oElements.length; i++) {
			  	if(oElements[i].className == clsName){
			  		classEle.push(oElements[i]);
			  	}
			  }	  
		return classEle;
	},

	getByID:function (idName) {
		return document.getElementById(idName) || document; 
	},

	getMinIndex:function (array,min) {
		 for(i in array) {
		 	if(array[i] == min){
		 		return i;
		 	}
		 }
	},

	//检测是否具备了滚动加载数据块的条件
	checkScrollSlide:function () {
		 var mainDiv = waterUtil.getByID("main") ;
		 var oBox = waterUtil.getByClass(mainDiv,"box");

		 var lastBox = oBox[oBox.length -1],
		 	 lastBoxTop = lastBox.offsetTop + Math.floor(lastBox.offsetHeight/2);
		 var scrollTop =  document.documentElement.scrollTop ||document.body.scrollTop;//滚动条滚走的距离
		 var docHeight = document.documentElement.clientHeight;
		 return lastBoxTop<(scrollTop+docHeight)?true:false;	
	}
}

function waterFall (parent,box) {
	var iParent = waterUtil.getByID(parent);
	var iBox = waterUtil.getByClass(iParent,box);
	
	//计算显示列数
	var docWidth = document.documentElement.clientWidth,
		oBoxW = iBox[0].offsetWidth;
	var cols = Math.floor(docWidth / oBoxW);

	iParent.style.cssText = "width:"+oBoxW*cols+"px; margin:0 auto;";

	var topArr = [];
	for (var i = 0; i < iBox.length; i++) {
		if(i<cols){
			topArr.push(iBox[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,topArr);
			var minIndex = waterUtil.getMinIndex(topArr,minH);

			iBox[i].style.position = "absolute";
			iBox[i].style.top = minH+"px";
			iBox[i].style.left = iBox[minIndex].offsetLeft+"px";

		 	topArr[minIndex] += iBox[i].offsetHeight;
		}
	}
}

window.onload = function () {
	waterFall("main","box"); 
	var dataInt = {
		"data":[
			{"src":"pic (30).jpg"},
			{"src":"pic (31).jpg"},
			{"src":"pic (32).jpg"},
			{"src":"pic (33).jpg"},
			{"src":"pic (34).jpg"},
			{"src":"pic (35).jpg"},
			{"src":"pic (36).jpg"},
			{"src":"pic (37).jpg"},
			{"src":"pic (38).jpg"},
			{"src":"pic (39).jpg"},
			{"src":"pic (40).jpg"},
			{"src":"pic (41).jpg"},
			{"src":"pic (42).jpg"},
			{"src":"pic (43).jpg"},
			{"src":"pic (44).jpg"},
			{"src":"pic (45).jpg"},
			{"src":"pic (46).jpg"},
			{"src":"pic (47).jpg"}
		]
	}
	window.onscroll  = function () {
		 if(waterUtil.checkScrollSlide()) {
		 	var oMain = waterUtil.getByID("main");
		 	var jsonData = dataInt.data;
		 	for(var i=0;i<jsonData.length;i++){
		 		var iBox = document.createElement("div");
		 		iBox.className = "box";
		 		oMain.appendChild(iBox);

		 		var iPic = document.createElement("div");
		 		iPic.className = "pic";
		 		iBox.appendChild(iPic);

		 		var iImg = document.createElement("img");
		 		iImg.src = "images/" +jsonData[i].src;
		 		iPic.appendChild(iImg);
		 	}
		 	waterFall("main","box");
		 }
	}
}

