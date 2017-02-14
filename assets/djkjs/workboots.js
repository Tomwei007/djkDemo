// JavaScript Document

function test(){
	
	}
function append(obj){
	
	
	var s = $("#add").parents(".add").siblings("div.tr-hidden").first().removeClass("tr-hidden");
	
	//s.before(getitem());
	 FormComponents.init();
	$(function(){
	
	$(".companyName").change(function(){
		
		var text = $(this).find("option:selected");
		var s = $(this).parents(".portlet-body").siblings(".portlet-title").find(".caption");
		s.empty()
		
		var txt = "<i class='fa fa-reorder'></i>" + text.html();
		s.append(txt);
		
		});
	
	});
	}
	

	
function AppendTd(obj){
	
	var s = $(obj).parents(".pull-right").siblings(".table");
	s = s.find("tbody").children(".tr-hidden").first().removeClass("tr-hidden");
	
	
	
	//s.append(getTR())
	
	}
	
$(function(){
	
	$(".companyName").change(function(){
		
		var text = $(this).find("option:selected");
		var s = $(this).parents(".portlet-body").siblings(".portlet-title").find(".caption");
		s.empty()
		
		var txt = "<i class='fa fa-reorder'></i>" + text.html();
		s.append(txt);
		
		});
	
	});
	
function saveTile(obj){
	var text =$(obj).find("option:selected");
	$(obj).siblings("a").empty();
	$(obj).siblings("a").append(text.html());
	$(obj).addClass("tr-hidden");
	$(obj).siblings("a").removeClass("tr-hidden");
	}

function savecont(obj){
	var text = $(".xingzhi").find("option:selected").html();
	text = text + "/" + $(".fangshi").find("option:selected").html();
	text = text + "/" + $(obj).find("option:selected").html();
	$(".allfanwei").empty();
	$(".allfanwei").append(text);
	$(".allfanwei").removeClass("tr-hidden");
	$(".title-3").addClass("tr-hidden"); 
	
	}	
	
function chengTime(){
	var time = "时间：";
	time = time+$(".startime").val();
	time = time + "--" + "2015/08/01";
	$(".timess").empty();
	$(".timess").append(time);
	$(".timesi").removeClass("tr-hidden");
	$(".sleTime").addClass("tr-hidden");
	$(".tabstat").css("min-height","80px");
	}
$(function(){
	
	$(".tb-title").blur(function(){
		
		var text = $(this).val();
		$(this).siblings("a").empty();
		if("" == $(this).val()){
			text = "点击输入标题..."
			}
		$(this).siblings("a").append(text);
		$(this).addClass("tr-hidden");
		$(this).siblings("a").removeClass("tr-hidden");
		
		});
	})
	
function hiddenText(obj){
	
	
	
	$(obj).siblings(".tb-title").removeClass("tr-hidden");
	$(obj).addClass("tr-hidden");
	
	$(".tabstat").css("min-height","120px");
	}
function hiddenText1(obj){
	$(".timesi").addClass("tr-hidden");
	$(".sleTime").removeClass("tr-hidden");
	$(".tabstat").css("min-height","120px");
	
	
	
	
	}
	
	function getitem(){
		return '<div class="row"><div class="col-md-12"><div class="portlet box purple"><div class="portlet-title"><div class="caption"></div><div class="tools"><a href="javascript:;" class="collapse"></a><a href="javascript:;" class="reload"></a><a href="javascript:;" class="remove"></a></div></div><div class="portlet-body form"><form action="#" class="horizontal-form"><div class="form-body"><div class="row"><div class="col-md-4"><div class="form-group"><label class="control-label">编号-公司名称</label><select  class="form-control select2me companyName" data-placeholder="请选择企业..."><option value="AL">00012 - 伊泰煤制油有限公司</option><option value="WY">00012 - 伊泰煤制油有限公司</option></select> </div></div><div class="col-md-4"><div class="form-group"><label class="control-label">接洽人</label> <select class="form-control select2me" data-placeholder="请选择负责人..."><option value=""></option><option value="">刘光德</option><option value="">张思远</option> <option value="">李鹏飞</option></select></div></div><div class="col-md-4"><div class="form-group"><label class="control-label">检查时间</label><div class="input-group input-large date-picker input-daterange" data-date="10/11/2012" data-date-format="mm/dd/yyyy"><input type="text" class="form-control" name="from"><span class="input-group-addon">--</span><input type="text" class="form-control" name="to"></div></div></div></div></div><div class="row"><div class="col-md-12"><div class="table-responsive" style="padding: 10px;"><ul class="pull-right" style="margin:0px; padding:0px"><a  href="#" class="btn btn-sm blue" style="margin-left:3px;" onClick="AppendTd(this)"> <i class="fa fa-caret-square-o-down"></i></a><a data-toggle="modal" href="#responsive" class="btn btn-sm dark" style="margin-left:3px"> <i class="fa fa-pencil"></i></a></ul><table class="table  table-bordered  table-hover"><thead> <tr><th>编号-检查项目</th><th class="hidden-xs">检查方式</th><th>检查标准</th><th>操作</th> </tr></thead><tbody></tbody> </table><div class="row"><div class="col-md-5 col-sm-5"><div aria-live="polite" role="status" id="sample_2_info" class=	"dataTables_info"> 显示0 到 1 页  共 0 条记录</div></div> <div class="col-md-7 col-sm-7"><div id="sample_2_paginate" class="dataTables_paginate paging_simple_numbers"> <ul class="pagination"> <li id="sample_2_previous" tabindex="0" aria-controls="sample_2" class="paginate_button previous disabled"><a href="#"><i class="fa fa-angle-left"></i></a></li><li tabindex="0" aria-controls="sample_2" class="paginate_button active"><a href="#">1</a></li><li id="sample_2_next" tabindex="0" aria-controls="sample_2" class="paginate_button next"><a href="#"><i class="fa fa-angle-right"></i></a> </li> </ul></div></div> </div></div></div></div></form></div></div></div> </div>';
		}
		
		function getTR(){
			return '<tr><td><select  class="form-control select2me" data-placeholder="Select..."><option value="AL">Alabama</option><option value="WY">Wyoming</option></select></td><td></td><td></td></tr>';
			}