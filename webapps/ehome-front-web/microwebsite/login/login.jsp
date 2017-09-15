<%@page pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>

<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta
	content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no"
	name="viewport" id="viewport" />
<meta name="renderer" content="webkit">
<title>jplan</title>
<meta name="description" content="">
<meta name="keywords" content="">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/uplan1.1.1.min.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/uskin1.1.1.min.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/login1.1.1.min.css">
<script src="${pageContext.request.contextPath}/js/require2.1.11.min.js"></script>
<script src="${pageContext.request.contextPath}/js/main1.1.1.js"></script>
<script src="${pageContext.request.contextPath}/microwebsite/login/login.js"></script>
</head>

<body>
	<div class="login_head">
		<div class="up-container">
			<div class='up-pull-left login_logo'>
				<img src="${pageContext.request.contextPath}/images/login_logo.png" alt="" class="inlbk"> <span></span>
				<h3>khala-jplan演示</h3>
			</div>
			<div class="up-pull-right">
				<span class="up-text-muted">欢迎来使用(Welcome to use)</span>
			</div>
		</div>
	</div>
	<div class="login_main">
		<div class="up-container">
			<div class="up-pull-right login_con">

				<div class="login_con_head">
					<a href="javascript:void(0);" class="active">本地工号</a>
				</div>


				<div class="login_con_body">
					<form class="u_form u_form_block"
						action="${pageContext.request.contextPath}/microwebsite/login/register" method="post">

						<div class="up-form-group up-form-group-lg up-col-sm-24">
							<div class="up-col-sm-24">
								<div class="up-input-group">
									<span class="up-input-group-addon" id=""><i
										class="icon-u-user"></i></span> <input type="text" name="mobile"
										class="up-form-control" placeholder="请输入用户名"
										aria-describedby="basic-addon1">
								</div>
							</div>
						</div>


						<div class="up-form-group up-form-group-lg up-col-sm-24">
							<div class="up-col-sm-24">
								<div class="up-input-group">
									<span class="up-input-group-addon" id=""><i
										class="icon-u-lock"></i></span> <input type="text" name="identifyingCode"
										class="up-form-control" placeholder="请输入验证码"
										aria-describedby="basic-addon1">
								</div>
							</div>
						</div>


						<div class="up-form-group up-clearfix">
							<c:if test="${tips != null}">
								<label style="color:red">${tips}</label>
							</c:if>
						</div>
						<button type="button"
							class="up-btn up-btn-primary up-btn-lg up-btn-block">登陆</button>
					</form>
				</div>
			</div>
		</div>
	</div>
	<div class="login_foot up-text-center">版权信息 广东亿迅科技有限公司
		中国电信股份公司广东分公司</div>
</body>
<script type="text/javascript">
$(function() {
	$(".up-btn-primary").css({
		"color": "#fff",
		"background-color": "#3787dd",
		"border-color": "#3787dd"})
	
	$(".login_con .login_con_head a.active").css({
		"color": "#3787dd"
		})
	$(".u_check i").css({
	    "-webkit-user-select": "none",
	    "-moz-user-select": "none",
	    "-ms-user-select": "none",
	    "user-select": "none",
	    "color": "#3787dd"
    })
})
</script>
</html>
<script>
	require(
			[ "common" ],
			function() {
				$(document)
						.on(
								"focus click",
								".login_con_body .city_select,.login_con_body .icon-u-down-dir",
								function(event) {
									$(".primary_option").show();
									event.stopPropagation();
								});
				$(document).on("click", ".login_main,.login_foot", function() {
					$(".primary_option").hide();
				});
				$(document).on("click", ".primary_option dd", function(event) {
					$(".primary_option").hide();
					$('.login_con_body .city_select').val($(this).html());
					$(".primary_option .active").removeClass('active');
					$(this).addClass("active");
					event.stopPropagation();
				});
				$(document).on(
						"click",
						".login_con_head a",
						function(event) {
							$(".login_con_head .active").removeClass('active');
							$(this).addClass("active");
							$(".login_con_head span").toggleClass(
									'login_con_head_border_right')
						});
				$(document).on("click", ".primary_option", function(event) {
					event.stopPropagation();
				});
				$(document).on("click", ".primary_option dt a",
						function(event) {
							$(".primary_option").hide();
						});

				$("button[type='button']").click(function() {
				$("form").submit();
				//	load();
					//alert(window.location.href );
					//toLogin(window.location.href);
					//LoginCheck();
				});
			});
	
   function load(){
	   
		 $.ajax({
		        type: "post",
		        dataType: "json",
		        async: false,
		        url:  getRootPath_web()+"/microwebsite/ValidateCode/test2",
		        beforeSend: function () {
		        	LoginCheck();
		          },
		        data:{
		       
		        },
		        success: function (resultMap) {
		            alert(resultMap.resultReason);
		        }
		    });
	   
   }
   function getRootPath_web() {//获取当前工程的根目录
	    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
	    var curWwwPath = window.document.location.href;
	    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
	    var pathName = window.document.location.pathname;
	    var pos = curWwwPath.indexOf(pathName);
	    //获取主机地址，如： http://localhost:8083
	    var localhostPaht = curWwwPath.substring(0, pos);
	    //获取带"/"的项目名，如：/uimcardprj
	    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	    return (localhostPaht + projectName);
	}
 
</script>
