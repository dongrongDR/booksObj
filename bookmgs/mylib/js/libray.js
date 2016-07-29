$(function(){
		
	var bookObj = {
		$tbody:$('#tableAll > tbody'),
		bolr:true,
		checkData:{},
		bookIdUp:{},
		datec: {
			1: '古代',
			2: '现代',
			3: '国外',
			4: '文学',
			5: '小说',
			6: '实记'
		},
		//书籍 操作 入口
		main: function() {
			this.fromVerifications();
			$('#dateUpBook').on('click',this.insertBooks);	//保存按钮事件 增加 事件
			this.selectBooks();								//显示 列表
			$('input[name=status]').trigger('onchange');		
			$('input[name=status]').on('change',this.yanzFrom);  //单选 改变事件
			$('#allBook').on('click', this.classObj);			//显示 增加界面
			this.updataMethodAllLisoner();
			$('#mohucha').on('click',this.selectBooks);
			$('#inputmohu').on('keyDown',function(e){
				console.log('224gfgsg');
				if (e.KeyValue == 13) {
					console.log('224gfgsg');
				}
				
			});
			// console.log($('#updateBook'));
			
			

		},
		// 修改
		updataMethodAllLisoner:function(){
			$('#upDataBook').on('click',this.upDataBookClick);
		},
		upDataBookClick:function(){
			var $checkonid=$('#tableAll tbody input[name=checkedall]:checked'),
				checkid=$checkonid[0].value,
				obj=bookObj.checkData[checkid];
				$('#hidenval').val(checkid);
				bookObj.selectclassify();		//显示 下拉列表 数据
			$('#allBookmodal')
			.find('#dateUpBook').html('修改图书').addClass('upbtncss')
			.end().modal('show');
			$('#bookName').val(obj.name);
			$('#author').val(obj.author);
			$('#publisher').val(obj.publisher);
			$('#price').val(obj.price);
			$('#p_date').val(obj.p_date.split(' ')[0]);
			$('#classify').val(obj.classify);
			$('input[name=status][value='+obj.status+']').trigger('click');
			$('input[name=borrow_status][value='+obj.borrow_status+']').trigger('click');
		},
		deletMethodLisoner:function(){
			$('#deletBook').on('click',this.deletBookClick);
		},
		deletBookClick:function(){
			var delid=[],
				$checkes=$('#tableAll tbody input[name=checkedall]:checked');
				if (!confirm('确定要删除吗？')) {
					return;
				}
				$checkes.each(function(index,elem){
					delid.push(elem.value);
				});
				$.get('backstagePhP/books_del.php',{ids:delid.join(',')},function(jsonobj){
					if (jsonobj.success) {
						bookObj.selectBooks();
						alert(jsonobj.message);
					}else{
						alert(jsonobj.message);
					}
				},'json');
		},
		// 增加方法 (保存按钮事件)
		insertBooks: function() {
			var url,data=bookObj.fromData();
			if ($(this).hasClass('upbtncss')) {	
				data['id']=$('#hidenval').val();
				url="backstagePhP/books_update.php";
				//TOGO
			}else{
				url="backstagePhP/selectlist.php";
			}
			var $btnload=$('#dateUpBook');
			if ($btnload.hasClass('btnload')) {		//如果在提交中 以下方法不执行
				return;
			}
			$btnload.addClass('btnload');
			
			//添加按钮样式  表示在 提交中

			bookObj.triggerFromVar();		//触发 验证事件
			console.log(!bookObj.bolr);		//判断 是否有不合法 输入
			if (!bookObj.bolr) {
				$btnload.removeClass('btnload'); //移除提交按钮的 样式
				console.log('未提交');
				return;
			}
			$('#dsabo').fadeOut(500);

			// 提交 录入信息
			$.get(url, data, function(resoult) {
				if (resoult.success) {
					
					bookObj.selectBooks();
					$btnload.removeClass('btnload'); //移除提交按钮的 样式
				
					$('#updateBook').trigger('reset');
					$('#allBookmodal').modal('hide');	
					alert(resoult.message);
				} else {
					alert(resoult.message);
				}
			}, 'json');
		},

		//查询 数据
		selectBooks: function() {
			var mohutext = $('#inputmohu').val();
			// console.log(mohutext);
			// return;
			$('#dsabo').fadeIn(500);
			// console.log($('#dsabo'));
			$.get('backstagePhP/books_list.php', {
				query: mohutext || ""
			}, function(respones) {
				if (respones.total == 0) {
					console.log('斤selse');
					alert('没有查到');
					$('#dsabo').fadeOut(500);
					return;
				}
				bookObj.selectBGo(respones.data); //传入数据  显示列表
			}, 'json');
		},
		//  显示 列表
		selectBGo:function(data){
			var trs=[];
			var elemsta,elembor,statext,bortext;
				$.each(data,function(i,obj){
					elemsta={
						0:'未上架',
						1:'已上架'
					};
					elembor={
						1:'未借出',
						0:'已借出'
					};
					statext=elemsta[obj.status];
					bortext=elembor[obj.borrow_status];
					trs.push(
						'<tr class="tronClick">',
							'<td><input type="checkbox"class="book-checkbox" name="checkedall" value="'+obj.id+'"></td>',
							'<td>',obj.name,'</td>',
							'<td>',obj.author,'</td>',
							'<td>',obj.publisher,'</td>',
							'<td>',obj.p_date.split(' ')[0],'</td>',
							'<td>',obj.price,'</td>',
							'<td>',bookObj.datec[obj.classify||0] ,'</td>',
							'<td>',statext,'</td>',
							'<td>',bortext,'</td>',
						'</tr>'
						);
					bookObj.checkData[obj.id]=obj;
				});
				bookObj.$tbody.html(trs.join(''));
				$('.tronClick').on('click',function(){
					var $inputchecked=$(this).find('.book-checkbox');
					$(this).find('.book-checkbox').trigger('click');
					if ($inputchecked.is(':checked')) {
						// console.log(44);
						$(this).closest('.tronClick').addClass('bctr');
					}else{
						$(this).closest('.tronClick').removeClass('bctr');
					}
				});
				$('.book-checkbox').on('click', function(edd) {
						edd.stopPropagation();
						// console.log('input');
						bookObj.tableClickInput();
				});
				bookObj.deletMethodLisoner();
				$('#dsabo').fadeOut(500);
		},

		// 列表 复选框 点击事件
		tableClickInput:function(){
			var $upDataButton = $('#upDataBook'),
				$deletButton = $('#deletBook'),
				$checke = $('#tableAll tbody input[name=checkedall]:checked');

			if ($checke.length > 0) {
				// console.log('大于0');
				if ($checke.length != 1) {
					$upDataButton.attr('disabled', 'disabled');
				} else {
					$upDataButton.removeAttr('disabled');
				}
				$deletButton.removeAttr('disabled');
			} else {
				console.log('等于0');
				$upDataButton.attr('disabled', 'disabled');
				$deletButton.attr('disabled', 'disabled');
			}
		},
		tableClicktr:function(){
			//TOGO
			console.log('tr');
			
			// var $inputcheck=$(this).find('.book-checkbox');

			$(this).find('.book-checkbox').trigger('click');
			// if (!$inputcheck[0].checked) {
			// 	$inputcheck[0].checked=true;
			// 	$(this).addClass('bctr');
			// }else{
			// 	$inputcheck[0].checked=false;
			// 	$(this).removeClass('bctr');
			// }
			// bookObj.tableClickInput();


			// $(this).on('click','.book-checkbox').trigger('click');
		},
		// 表单验证 提示颜色
		colorInput:function(clases,id,text){
			var $tishi=$('#'+id).siblings('.glyphicon'),
				$colorinputs=$('#'+id).parent().parent(),
				$showSpan=$('#'+id).parent().parent().find('span.inputtextspan');
				// $inputError2Status=$('#inputError2Status');
			if(clases=="success") {
				if($tishi.hasClass('glyphicon-remove')){
					$tishi.removeClass('glyphicon-remove');
				}else if ($tishi.hasClass('glyphicon-warning-sign')) {
					$tishi.removeClass('glyphicon-warning-sign');
				}
				$tishi.addClass('glyphicon-ok');
				if ($colorinputs.hasClass('has-error')) {
					$colorinputs.removeClass('has-error');
				}else if ($colorinputs.hasClass('has-warning')) {
					$colorinputs.removeClass('has-warning');
				}
				$colorinputs.addClass('has-success');
				$showSpan.hide();
			}else if (clases=="error") {

				if($tishi.hasClass('glyphicon-warning-sign')){
					$tishi.removeClass('glyphicon-warning-sign');
				}else if ($tishi.hasClass('glyphicon-ok')) {
					$tishi.removeClass('glyphicon-ok');
				}
				$tishi.addClass('glyphicon-remove');
				if ($colorinputs.hasClass('has-success')) {
					$colorinputs.removeClass('has-success');
				}else if ($colorinputs.hasClass('has-warning')) {
					$colorinputs.removeClass('has-warning');
				}
				$colorinputs.addClass('has-error');
				$showSpan.show().css('color','red').html(text);
			}else if (clases=='warning') {
				if($tishi.hasClass('glyphicon-remove')){
					$tishi.removeClass('glyphicon-remove');
				}else if ($tishi.hasClass('glyphicon-ok')) {
					$tishi.removeClass('glyphicon-ok');
				}
				$tishi.addClass('glyphicon-warning-sign');
				if ($colorinputs.hasClass('has-success')) {
					$colorinputs.removeClass('has-success');
				}else if ($colorinputs.hasClass('has-error')) {
					$colorinputs.removeClass('has-error');
				}
				$colorinputs.addClass('has-warning');
				$showSpan.show().css('color','#896C3B').html(text);
			}

		},
		fromData:function(){
			var sdata = {
				name: $('#bookName').val(),
				author: $('#author').val(),
				publisher: $('#publisher').val(),
				price: $('#price').val(),
				p_date: $('#p_date').val(),
				classify: $('#classify').val(),
				status: $('input[name=status]:checked').val(),
				borrow_status: $('input[name=borrow_status]:checked').val()
			};
			console.log(sdata.borrow_status);	
			return sdata;

		},
		
		triggerFromVar:function(){
			$('#bookName').trigger('keyup');
			$('#bookName').trigger('blur');
			$('#author').trigger('blur');
			$('#publisher').trigger('blur');
			$('#p_date').trigger('blur');
			$('#price').trigger('blur');
			$('#classify').trigger('blur');
		},
		fromVerifications:function(){
			var data;
			$('#bookName').on('keyup', bookObj.fromVerLisonerData.bookNameVerkeyup);
			$('#bookName').on('blur',bookObj.fromVerLisonerData.bookNameVerblur);
			$('#author').on('blur',bookObj.fromVerLisonerData.authorVerblur);
			$('#publisher').on('blur', bookObj.fromVerLisonerData.publisherVerblur);
			$('#p_date').on('blur', bookObj.fromVerLisonerData.p_dateVerblur);
			$('#price').on('blur', bookObj.fromVerLisonerData.priceVerblur);
			$('#classify').on('blur', bookObj.fromVerLisonerData.classifyVerblur);
		},
		fromVerLisonerData:{
			classifyVerblur:function(){
				var data = bookObj.fromData();
				if (data.classify==0) {
					bookObj.colorInput('error',this.id,"请选择类别");
					return bookObj.bolr = false;
				}else{
					bookObj.colorInput('success',this.id);
					bookObj.bolr = true;
				}
			},
			priceVerblur:function(){
				var data = bookObj.fromData();
				if (data.price != "") {
					var reg=/^[0-9]+(.[0-9]{1,1})?$/; 
					if (reg.test(data.price)) {
						// alert(bookObj.fromData().name);
						bookObj.colorInput('success',this.id);
						bookObj.bolr = true;
					} else {
						// alert("请输入正确的格式");
						bookObj.colorInput('error',this.id,"请输入正确的价格(n.0)");

						return bookObj.bolr = false;
					}
				} else {
					// alert('请输入价格');
						bookObj.colorInput('warning',this.id,"请输入价格");

					return bookObj.bolr = false;
				}
			},
			p_dateVerblur:function(){
				var data = bookObj.fromData();
				if (data.p_date != "") {
				var reg=/^(?:(?:(?:(?:(?:1[6-9]|[2-9][0-9])?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))([-/.])(?:0?2\1(?:29)))|(?:(?:(?:1[6-9]|[2-9][0-9])?[0-9]{2})([-/.])(?:(?:(?:0?[13578]|1[02])\2(?:31))|(?:(?:0?[13-9]|1[0-2])\2(?:29|30))|(?:(?:0?[1-9])|(?:1[0-2]))\2(?:0?[1-9]|1[0-9]|2[0-8]))))$/;
					
					if (reg.test(data.p_date)) {
						// alert(bookObj.fromData().name);
						bookObj.colorInput('success',this.id);
						bookObj.bolr = true;
					} else {
						// alert("输入的日期不正确");
						bookObj.colorInput('error',this.id,"输入的日期不正确");
						return bookObj.bolr = false;
					}
				} else {
					// alert('请输入日期');
					bookObj.colorInput('warning',this.id,"请输入日期");
					return bookObj.bolr = false;
				}
			},
			publisherVerblur: function() {
				var data = bookObj.fromData();
				if (data.publisher != "") {
					if (data.publisher.length < 5) {
						// alert('最少输入5个字符');
						bookObj.colorInput('error',this.id,"最少输入5个字符");
						return bookObj.bolr = false;
					}
					var regx = /^[\u4E00-\u9FA5A-Za-z]{5,50}$/;
					if (regx.test(data.publisher)) {
						// alert(bookObj.fromData().name);
						bookObj.colorInput('success',this.id);
						bookObj.bolr = true;
					} else {
						bookObj.colorInput('error',this.id,"输入的出版社不规范");
						// alert("输入的出版社不规范");
						return bookObj.bolr = false;
					}
				} else {
					bookObj.colorInput('warning',this.id,"请输入出版社");
					// alert('请输入出版社');
					return bookObj.bolr = false;
				}
			},
			authorVerblur:function(){
				var data=bookObj.fromData();
				if (data.author != "") {
					if (data.author.length < 3) {
						console.log(123123);
						bookObj.colorInput('error',this.id,"最少输入3个字符");
						return bookObj.bolr = false;
					}

					var regx = /^[\u4E00-\u9FA5A-Za-z]{3,50}$/;
					if (regx.test(data.author)) {
						// alert(bookObj.fromData().name);
						bookObj.colorInput('success',this.id);
						bookObj.bolr = true;
					} else {
						bookObj.colorInput('error',this.id,"作者书写不规范");
						return bookObj.bolr =false;
					}
				} else {
					bookObj.colorInput('warning',this.id,'请输入作者');
					// alert('请输入作者');
					return bookObj.bolr =false;
				}
			},
			bookNameVerblur: function() {
				var data = bookObj.fromData();
				if (data.name == "") {
					bookObj.colorInput('warning',this.id,'请输入书名');
					return bookObj.bolr = false;
				}else if (data.name.length<2) {
					bookObj.colorInput('error',this.id,'书名最少2个字符');
					return bookObj.bolr =false;
				}
			},
			bookNameVerkeyup:function(){
				var data=bookObj.fromData();
				if ( data.name != "") {
					var regx = /^[\u4E00-\u9FA5A-Za-z]{2,50}$/;
					if (regx.test(data.name)) {
						bookObj.colorInput('success',this.id);
						bookObj.bolr = true;
					}else if(data.name.length<length){
						bookObj.colorInput('error',this.id,'书名最少2个字符');
						return bookObj.bolr =false;
					}else{
						bookObj.colorInput('error',this.id,'书名不合法');
					}
				} else {
					bookObj.colorInput('warning',this.id,'请输入书名');
					return bookObj.bolr =false;
				}
			}
		},
		//判断单选按钮 禁用
		yanzFrom:function(){
			var $status_val=$('input[name=status]:checked').val();
			if ($status_val==0) {
				$('input[name=borrow_status]:eq(1)').prop('disabled',true);
				$('input[name=borrow_status]:eq(0)').trigger('click');
			}
			else{
				$('input[name=borrow_status]:eq(1)').prop('disabled',false);
			}
		},
		// 类别 类
		classObj:function(){
			// $('#allBookmodal').modal('show');
			bookObj.selectclassify();
		},
		selectclassify:function(){
			$('#allBookmodal')
			.find('#dateUpBook').html('保存入库').removeClass('upbtncss')
			.end().modal('show');
			$('#updateBook').trigger('reset');
			var data= [
				{"id":1,name:'古代'},
				{"id":2,name:'现代'},
				{"id":3,name:'国外'},
				{"id":4,name:'文学'},
				{"id":5,name:'小说'},
				{"id":6,name:'实记'}
			];
			var opData = data;
			opData.unshift({id: 0,name: '请选择'});
			opData = _.map(opData, function(elem) {
				return '<option value="' + elem.id + '">' + elem.name + '</option>'
			});
			$('#classify').html(opData);
		}
	};
	// 日期选择 设置
	function timeFun(){
		$('#p_date').datetimepicker({
			format: 'yyyy-mm-dd',	//日期格式
			autoclose: true,		// 选择完毕自动关闭 
			startView: 4,			
			minView: 2,			//显示到哪一级  day
			language: 'zh-CN'	//显示中文
		});
	}
	var checkBoxEvent = {	
		// 全选 和 取消 全选
		onclickAll: function() {
			var $checkAll_pne = $('#checks');
			$checkAll_pne.on('click', function() {
				if ($checkAll_pne.is(':checked')) {
					$('.book-checkbox').each(function(index,elem){
						if (!$(elem).is(':checked')) {
							 $(elem).trigger('click');
						}
					});
				}else{
					$('.book-checkbox').each(function(index,elem){
						if ($(elem).is(':checked')) {
							 $(elem).trigger('click');
						}
					});
				}
			});
		}
		
	};
	checkBoxEvent.onclickAll();
	bookObj.main();
	timeFun();
	
});