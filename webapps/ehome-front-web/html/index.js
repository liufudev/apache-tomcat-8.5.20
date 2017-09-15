var pageSize=5;
var pageNumber=1;
var tag = true;
var loadtag = false;
$(function() {
	ShowShade();
	// 加载轮播图
	loadLoop();
	// 加载资讯列表
	loadInfo();
	loadArea();
	layui.use('flow', function(){
		var flow = layui.flow;
		flow.load({
			elem: '#info' //流加载容器
				,isLazyimg: true
				,done: function(page, next){ //加载下一页
					setTimeout(function(){
						var lis = [];
						
						if (!tag) {
							return;
						}
						var data = getInfo();
						infoList=data;
						for (var i = 0; i < infoList.length; i++) {

							var time=moment(new Date(infoList[i].publishTime)).format("YYYY/MM/DD HH:mm");
							var top;
							if(infoList[i].infoOrd!=null)
							{
								top='<span class="fettleD " ><a href="#">置顶</a></span>'
							}
							else
								{
								top='';
								}
							if (infoList[i].tagNameShow !=null) {
								lis.push(
												'<a href="html/news/tagList.html?tagId='+ infoList[i].tagNameId+'"><div class="title">\
										<em></em><strong>'
														+ infoList[i].tagNameShow
														+ '</strong></a>\
									</div></a>')
							}
							if (infoList[i].showType == 1) {
								lis.push(
												'<ul class="Box">\
		        					<li>\
									<a onclick="toInfoDetail(\''+ infoList[i].infoId + '\')">\
											<div class="BoxB">\
												<div class="summary">\
												<h3>'
														+ infoList[i].infoTitle
														+ '</h3>\
												<p>'
														+ infoList[i].summary
														+ '</p>\
												</div>\
											</div>\
									</a>\
									<div class="authorBox">\
														'+top+'\
										<span class="See"><i class="icon iconSee"></i>'
														+ infoList[i].readNumber
														+ '</span> \
										<span class="Author"><a href="'
														+ getRootPath_web()
														+ '/html/news/author-list.html?reporterId='
														+ infoList[i].reporterId
														+ '">'
														+ infoList[i].resport
														+ '</a></span>\
										<span class="Time"><i class="icon iconTime"></i>'
														+ time
														+ '</span>\
									</div>\
								</li>\
							</ul>')
							}
							if (infoList[i].showType == 2) {
								lis.push(
												'<ul class="Box">\
		        					<li>\
									 <a onclick="toInfoDetail(\''+ infoList[i].infoId + '\')">\
										<div class="BoxB">\
											<div class="pictureB">\
												<img src="'
														+ infoList[i].infoCover
														+ '" alt="" />\
											</div>\
											<div class="summary">\
												<h3>'
														+ infoList[i].infoTitle
														+ '</h3>\
												<p>'
														+ infoList[i].summary
														+ '</p>\
											</div>\
										</div>\
									</a>\
									<div class="authorBox">\
														'+top+'\
										<span class="See"><i class="icon iconSee"></i>'
														+ infoList[i].readNumber
														+ '</span> \
										<span class="Author"><a href="'
														+ getRootPath_web()
														+ '/html/news/author-list.html?reporterId='
														+ infoList[i].reporterId
														+ '">'
														+ infoList[i].resport
														+ '</a></span>\
										<span class="Time"><i class="icon iconTime"></i>'
														+ time
														+ '</span>\
									</div>\
										</li>\
							</ul>')
							}
							if (infoList[i].showType == 3) {
								lis.push(
												'<ul class="Box">\
		        					<li>\
									<a onclick="toInfoDetail(\''+ infoList[i].infoId + '\')">\
									<div class="BoxA">\
										<div class="BoxA-lf">\
											<div class="summary">\
												<h3>'
														+ infoList[i].infoTitle
														+ '</h3>\
												<p>'
														+ infoList[i].summary
														+ '</p>\
											</div>\
										</div>\
										<div class="BoxA-rg">\
											<div class="pictureA">\
												<img src="'
														+ infoList[i].smallPic
														+ '" alt="" />\
											</div>\
										</div>\
									</div>\
								</a>\
								<div class="authorBox">\
														'+top+'\
									<span class="See"><i class="icon iconSee"></i>'
														+ infoList[i].readNumber
														+ '</span> \
									<span class="Author"><a href="'
														+ getRootPath_web()
														+ '/html/news/author-list.html?reporterId='
														+ infoList[i].reporterId
														+ '">'
														+ infoList[i].resport
														+ '</a></span>\
									<span class="Time"><i class="icon iconTime"></i>'
														+ time
														+ '</span>\
								</div>\
									</li>\
							</ul>')
							}
							//广告
							if (infoList[i].showType == 4) {
								lis.push(
												'<ul class="Box">\
		        					<li>\
									<a onclick="toInfoDetail(\''+ infoList[i].infoId + '\')">\
									<div class="BoxB">\
										<div class="summary">\
											<h3>'
														+ infoList[i].infoTitle
														+ '</h3>\
										</div>\
										<div class="pictureB mt10">\
											<img src="'
														+ infoList[i].smallPic
														+ '" alt="" />\
										</div>\
									</div>\
								</a>\
								<div class="summary">\
									<h3>\
										<span class="adtag fr">广告</span>\
									</h3>\
								</div>\
								</li>\
							</ul>')
							}
							//视频
							if (infoList[i].showType == 5) {
								lis.push(
												'<ul class="Box">\
		        					<li>\
									 <div class="videoBox">\
									<div class="video">\
												<iframe height="100%" width="100%" src="'+infoList[i].videoUrl+'" frameborder=0 allowfullscreen></iframe> 								</div>\
									</div>\
							<div class="summary mt10">\
								<h3>'+ infoList[i].infoTitle+ '<a onclick="toInfoDetail(\''+ infoList[i].infoId + '\')"></h3>\
							</div>\
							<div class="authorBox">\
										'+top+'\
								<span class="See"><i class="icon iconSee"></i>'
														+ infoList[i].readNumber
														+ '</span> \
								<span class="Author"><a href="'
														+ getRootPath_web()
														+ '/html/news/author-list.html?reporterId='
														+ infoList[i].reporterId
														+ '">'
														+ infoList[i].resport
														+ '</a></span>\
								<span class="Time"><i class="icon iconTime"></i>'
														+ time
														+ '</span>\
							</div>\
								</li>\
							</ul>')
							}
						}
						
						next(lis.join(''), !loadtag);
					}, 500);
				}
		});
		
	});
});
function loadArea() {
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web() + "/info/getArea",
		success : function(data) {
			if (data.data != null) {
				var result = data.data;
				$("#areaName").text(result.areaName);
			}
		},	error : function() {
        	layer.msg('加载失败');

		},complete : function () {
			//closeShade();
        }
	});
}
function loadLoop() {
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web() + "/info/getLoopList",
		success : function(data) {
			var loopList = data.data;
		if(loopList!=null)
			{
				for (var i = 0; i < loopList.length; i++) {
					var content;
					if(loopList[i].loopType=='2')
					{
						content=loopList[i].content+"<span class='advertisement'>广告</span>"
					}
					else
					{
						content=loopList[i].content
					}
					var fdStart = loopList[i].link.indexOf("http");
					var link;
					if(fdStart == 0){
						link=loopList[i].link;
					}else if(fdStart == -1){
						link=getRootPath_web()+loopList[i].link;
					}
					$("#loop").append(
							'<li>\
		    					<a class="pic" href="'
									+ link + '"><img src="'
									+ loopList[i].loopPic
									+ '" /></a> \
		    					<a class="tit" href="'
									+ link + '">' + content
									+ '\
		    					</a>\
		    					</li>');
				}
			}
		}
	});
}
function loadInfo() {
	$
			.ajax({
				type : "post",
				dataType : "json",
				async : false,
				url : getRootPath_web() + "/info/getInfoList",
				success : function(data) {
					var infoList = data.data;
				if(infoList!=null)
					{
						for (var i = 0; i < infoList.length; i++) {}
					}
				},	error : function() {
		        	layer.msg('加载失败');

				},complete : function () {
					closeShade();
		        }
			});
}
function getInfo() {
	var data
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web()
				+ "/info/getInfoList",
		beforeSend : function() {

		},
		data : {
			pageNum : pageNumber,
			pageSize : pageSize
		},
		success : function(resultMap) {
			if (resultMap.resultCode == 'Success') {
				if (pageNumber * pageSize < resultMap.total) {
					pageNumber = pageNumber + 1;

				} else {
					tag= false;
					loadtag = true;
				}
				data = resultMap.rows;

			} else {

				layer.msg("亲您的网络不太好")
			}

		}
	});
	return data;
}