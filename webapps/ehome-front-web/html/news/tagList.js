var pageSize=10;
var pageNumber=1;
var tag = true;
var loadtag = false;
var tagId;
$(function(){
	 tagId=getqueryString("tagId");
	 getTitle();
});
function getTitle()
{
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		 url:  getRootPath_web()+"/tag/getTag",
		data : {tagId:tagId},
		success : function(data) {
			if(data!=null)
			{
				$("#title").text(data.data.tagName);
			}
		}
	});
}
layui.use('flow', function(){
	var flow = layui.flow;
	flow.load({
		elem: '#info' //流加载容器
			,isLazyimg: true
			,done: function(page, next){ //加载下一页
				console.log(page);
				setTimeout(function(){
					var lis = [];
					
					if (!tag) {
						return;
					}
					var infoList = getInfoList();
					for (var i = 0; i < infoList.length; i++) {
						var time;
	        			if(infoList[i].publishTime==null)
        				{
	        				time=moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        				}
	        			else{
	        				time=moment().subtract(10, 'days').format("YYYY-MM-DD HH:mm:ss");
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
									<span class="See"><i class="icon iconSee"></i>'
													+ infoList[i].readNumber
													+ '</span> \
									<span class="Time"><i class="icon iconTime"></i>'
													+ time
													+ '</span>\
									<span class="Author"><a href="'
													+ getRootPath_web()
													+ '/html/news/author-list.html?reporterId='
													+ infoList[i].reporterId
													+ '">'
													+ infoList[i].resport
													+ '</a></span>\
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
									<span class="See"><i class="icon iconSee"></i>'
													+ infoList[i].readNumber
													+ '</span> \
									<span class="Time"><i class="icon iconTime"></i>'
													+ time
													+ '</span>\
									<span class="Author"><a href="'
													+ getRootPath_web()
													+ '/html/news/author-list.html?reporterId='
													+ infoList[i].reporterId
													+ '">'
													+ infoList[i].resport
													+ '</a></span>\
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
								<span class="See"><i class="icon iconSee"></i>'
													+ infoList[i].readNumber
													+ '</span> \
								<span class="Time"><i class="icon iconTime"></i>'
													+ time
													+ '</span>\
								<span class="Author"><a href="'
													+ getRootPath_web()
													+ '/html/news/author-list.html?reporterId='
													+ infoList[i].reporterId
													+ '">'
													+ infoList[i].resport
													+ '</a></span>\
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
							<h3><a onclick="toInfoDetail(\''+ infoList[i].infoId + '\')"></h3>\
						</div>\
						<div class="authorBox">\
							<span class="See"><i class="icon iconSee"></i>'
													+ infoList[i].readNumber
													+ '</span> \
							<span class="Time"><i class="icon iconTime"></i>'
													+ time
													+ '</span>\
							<span class="Author"><a href="'
													+ getRootPath_web()
													+ '/html/news/author-list.html?reporterId='
													+ infoList[i].reporterId
													+ '">'
													+ infoList[i].resport
													+ '</a></span>\
						</div>\
							</li>\
						</ul>')
						}
				/*		lis.push('<li><a href="'
								+ getRootPath_web()
								+ '/info/show/'
								+ infoList[i].infoId
								+ '">\
						<div class="BoxA">\
							<div class="BoxA-lf">\
								<div class="summary">\
	        					<h3>'+infoList[i].infoTitle+'</h3>\
								<p>'+infoList[i].summary+'</p>\
								</div>\
							</div>\
							<div class="BoxA-rg">\
								<div class="pictureA">\
									<img src="'+infoList[i].infoCover+'" alt="" />\
								</div>\
							</div>\
						</div>\
				</a>\
					<div class="authorBox">\
						<div class="hr"></div>\
    					<span class="See"><i class="icon iconSee"></i>'+infoList[i].readNumber+'</span> \
						<span class="Time"><i class="icon iconTime"></i>'+time+'</span>\
						<span class="Author">作者：<a href="author-list.html">'+infoList[i].resport+'</a></span>\
					</div>\
	        		</li>');*/
					}
					
					next(lis.join(''), !loadtag);
				}, 500);
			}
	});
	
});
function getInfoList() {
	var data
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		 url:  getRootPath_web()+"/tag/getByTagId",
		beforeSend : function() {

		},
		data : {
			tagId:tagId,
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