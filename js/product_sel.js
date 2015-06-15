(function() {

	var G_CONST_CONTAINER = {
		WATERCONTAINER_DIV: "watersContainer",
		PRICESHOW_DIV: "priceShowContainer",
		BUYNOW_BUTTON: "btnBuyNow",
		MESSAGE_DIV: "messageContainer",
		MESSAGE_INFO_DIV: "messageInfo"
	};

	//水价格项单击事件
	var priceItemClick = function($container) {
		//查找容器
		if ($container == undefined || $container == null) {
			$container = $("#" + G_CONST_CONTAINER.WATERCONTAINER_DIV);
		}
		//找到之前选中的
		var $beforeSelItem = $container.find("[tag='water'][sel=1]");

		//目前选中的
		var $target = $(this);

		//更改之前选中的样式
		if ($beforeSelItem.length > 0) {
			$beforeSelItem.removeClass("price-sel");
		}
		//当前单击的项添加相应的样式
		$target.addClass("price-sel").attr("sel", 1);
		//当前选择项价格
		var str_price = $target.attr("price");
		//价格显示信息层
		var $showPriceContainer = $container.find("#" + G_CONST_CONTAINER.PRICESHOW_DIV);

		$showPriceContainer.text("售价：" + str_price + "元");
	};

	//显示消息信息
	var showMessageInfo = function(msg, type) {
		msg = msg == undefined || msg == null || $.trim(msg) == "" ? "" : msg;
		type = type == undefined || type == null ? 0 : type;


		var $container = $("#" + G_CONST_CONTAINER.WATERCONTAINER_DIV);
		var $messageContainer = $container.find("#" + G_CONST_CONTAINER.MESSAGE_DIV);
		var $messageInfoContainer = $messageContainer.find("#" + G_CONST_CONTAINER.MESSAGE_INFO_DIV);

		var str_display = "none";

		if (msg != "") {
			str_display = "block";
		}
		var str_class = type == 0 ? "alert alert-error message" : "alert alert-info message"

		$messageContainer.attr("class", str_class).css("display", str_display);
		$messageInfoContainer.text(msg);

	};

	//提交数据
	var buyNowEvent = function($container) {
		//查找容器
		if ($container == undefined || $container == null) {
			$container = $("#" + G_CONST_CONTAINER.WATERCONTAINER_DIV);
		}

		//找到选中的水
		var $priceItem = $container.find("[tag='water'][sel=1]");

		if ($priceItem.length <= 0) {
			showMessageInfo("请选购要购买的水。")
			return;
		}

		showMessageInfo("提交中,请稍后....",1);

		//提交数据
		$.ajax({
			type:"post",
			url:"../",
			async:true,
			data:{},
			dataType:"json",
			success:function(data){
				
			}
			,
			error:function(data){
				showMessageInfo("连接超时，请重新提交。");
			}
		});



	};


	$(function() {
		var $container = $("#" + G_CONST_CONTAINER.WATERCONTAINER_DIV);

		//找到所有可选的价格标签并绑定单击事件
		$container.find("[tag='water']").unbind("click.water").bind("click.water", function() {
			priceItemClick.call(this, $container);
		});

		//找到下订单按钮
		var $buyButton = $container.find("#" + G_CONST_CONTAINER.BUYNOW_BUTTON);
		$buyButton.unbind("click.buy").bind("click.buy", function() {
			buyNowEvent.call(this, $container);
		});

	});


}())