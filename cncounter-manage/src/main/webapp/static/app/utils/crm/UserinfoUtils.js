Ext.define('ESSM.utils.crm.UserinfoUtils',{
	config:{},
	requires : [
		'ESSM.utils.sys.DictUtils'
	],
	getUserinfoForm:function(){
		var leftdiv={
			rowspan:18,//合并行  
			colspan:1,
			height:350,
			autoScroll: false,
			width:300 ,
			align:"center",
			border : false,
			items : [{
				layout : 'column',
				border : false,
				align:"center",
				labelSeparator : '：',
				items : [{
					columnWidth : .9,
					layout : 'form',
					id : 'dragload',
					buttonAlign : 'center',
					textAlign: 'center',
					labelAlign: 'center',
					border : false,
					items : [
						Ext.create('Ext.form.Panel', {
							width: 298,
							height: 198,
							border : false,
							items:[ Ext.create('Ext.form.field.File', {
								buttonText: '选择文件',
								id:'fileuploadfieldnameid',
								name:'fileuploadfieldname',
								buttonOnly: true,
								hideLabel: true,
								permitted_extensions:[ "JPG" , "jpg", "jpeg" , "JPEG" , "GIF" , "gif" , "png" , "PNG" ],
								listeners: {
									'change': function(fb, v){
										//	var target={};
										var el = Ext.get('fi-button-msg');
										var arr=fb.permitted_extensions;
										var flag='false';
										if(wr.isEmpty(v)){
											wr.msg('选择文件', '只允许上传JPEG|JPG|GIF|PNG文件!');
											return
										}
										var suffix=v.substring(v.lastIndexOf(".") + 1).toLowerCase();
										for(var i=0;i<arr.length-1;i++){
											if( suffix== arr[i].toLowerCase()){
												flag='true';
												break;
											}
										}
										/* el.update('<b>路径:</b> '+v);*/
										if(!el.isVisible()){
											el.slideIn('t', {
												duration: 200,
												easing: 'easeIn',
												listeners: {
													afteranimate: function() {
														el.highlight();
														el.setWidth(null);
													}
												}
											});
										}else{
											el.highlight();
										}
										if(flag!='true'){
											wr.msg('选择文件', '只允许上传JPEG|JPG|GIF|PNG文件!');
										}else{
											fb.setValue(null);
											var form1 = this.up('form').getForm();
											/*var filesizeflagObject = Ext.get('filesizeflag');
											 var  files= Ext.dom.Query.select('.x-form-file-input');
											 target['filesizeflagObject']=filesizeflagObject;
											 target['files']=files;
											 target['value']=v;
											 Ext.create('ESSM.utils.sys.DictUtils',{}).isUpload(target);*/
											if(form1.isValid()){
												form1.submit({
													url: 'rest/crm/userinfo/uploadHeadPhoto.json',
													method : 'post',
													async: false,
													waitMsg: '正在处理请等待。。。',
													success: function(fp1, o1) {

														if(!wr.isEmpty(o1)&&!wr.isEmpty(o1.result)&&!wr.isEmpty(o1.result.data)){
															Ext.getCmp('headPhotoUrl').setValue(o1.result.data);
															Ext.getCmp('imageBrowsebox').getEl().dom.src=wr.path.staticPath+o1.result.data;
														}else{
															Ext.getCmp('imageBrowsebox').getEl().dom.src=wr.DEFAULTPHOTO;
														}
													},
													failure: function(form, action) {
														switch (action.failureType) {
															case Ext.form.action.Action.CLIENT_INVALID:
																//Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
																break;
															case Ext.form.action.Action.CONNECT_FAILURE:
																//Ext.Msg.alert('Failure', 'Ajax communication failed');
																break;
															case Ext.form.action.Action.SERVER_INVALID:
																var respText =Ext.JSON.decode(action.response.responseText);
																Ext.Msg.alert('提示', respText.message);
														}
														var response=action.response;
														var status = response.status;
														var msg = '' + response.responseText ;
														var fn = function(){};
														if(401 == status){
															// 未授权
															msg = "没有权限执行此操作!";
															showMsg(msg,fn);
														} else if(433 == status){
															// 未登录
															msg = "请重新登录!";
															fn = toLoginFn;
															showMsg(msg,fn);
														}else if(413 == status){
															msg = "上传文件太大!";
															showMsg(msg,fn);
														}
														function showMsg(msg,fn){
															Ext.Msg.show({
																title : '系统异常',
																msg : msg,
																//width : 200,
																icon : Ext.MessageBox.ERROR,
																buttons : Ext.MessageBox.OK,
																fn : fn
															});
														}

														//
														function toLoginFn(){
															window.location.href = "rest/login/logout.do";
														};
													}

												});
											}
										}

									}
								}
							}),   {
								xtype : 'box',
								id:'imageBrowsebox',
								name:'imageBrowse',
								fieldLabel : "预览",
								width : 190,
								autoEl : {
									width :140,
									height : 160,
									tag : 'img',
									src : wr.DEFAULTPHOTO,
									style : 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);',
									complete : 'off',
									id : 'imageBrowse1'
								}
							},{xtype:'label',	id:"fi-button-msg",hidden:true},{xtype:'textfield',	id:"filesizeflag",hidden:true}]

						})
					]

				},{
					columnWidth : .95,
					layout : 'form',
					align:"center",
					border : false,
					items : [{xtype:'textfield',	id:"headPhotoUrl",name:"headPhotoUrl",hidden:true},
						{
							xtype : 'textfield',
							name : 'createEmpName',
							readName:'userReadNames',
							fieldLabel:'创建人',
							labelWidth:110,
							readOnly:true,
							align:"left"
						}]},{
					columnWidth : .95,
					layout : 'form',
					align:"center",
					border : false,
					items : [
						{
							xtype : 'textfield',
							name : 'createTimeStr',
							fieldLabel:'创建时间',
							labelWidth: 110,
							readName:'userReadNames',
							readOnly:true,
							align:"left"
						}]},{

					columnWidth : .95,
					layout : 'form',
					align:"center",
					border : false,

					items : [{
						xtype : 'textfield',
						name : 'updateTimeStr',
						readName:'userReadNames',
						fieldLabel:'最后修改时间',
						labelWidth: 110,
						readOnly:true,
						align:"left"
					}]
				},{

					columnWidth : .95,

					layout : 'form',
					align:"center",
					border : false,

					items : [
						{
							xtype : 'textfield',
							name : 'operatorName',
							fieldLabel:'最后修改人',
							readName:'userReadNames',
							labelWidth:110,
							readOnly:true,
							align:"left"
						}]},{
					columnWidth : .95,
					layout : 'form',
					align:"center",
					border : false,

					items : [{
						xtype : 'textfield',
						name : 'managerName',
						readName:'userReadNames',
						fieldLabel:'客户资料归属人',
						labelWidth: 110,
						readOnly:true,
						align:"left"
					}]
				}]
			}]
		};
		var panelJCXX= {
			xtype: 'panel',
			title: '基本信息',
			anchor: '100% 5%',
			bodyPadding: '5',
			layout: {
				type: 'table',
				columns:3
			},
			fieldDefaults: {
				msgTarget: 'side',
				columnWidth: 1,
				labelWidth: 110
			},
			border :false,
			items:[
				{
					xtype: 'fieldcontainer',
					items: [{
						name:'id',
						 id:'userInfoId',
						xtype: 'textfield',
						hidden:true
					},{
						xtype : 'textfield',
						fieldLabel: '<span style="color:red">&nbsp;</span>客户编号',//TODO 自动生成及规则
						name: 'userCode',
						id:'userCode',
						readName:'userReadNames',
						readOnly:true
					},{
						xtype : 'textfield',
						name: 'userId',
						hidden:true,
						id:'userId'
					}]
				},
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype : 'textfield',
						fieldLabel: '<span style="color:red">*</span>客户姓名',
						name: 'userName',
						readName:'userReadNames',
						maxLength:30,
						maxLengthText:'长度超过30个字符',
						allowBlank: false,
						tooltip: '客户姓名不能为空',
						validator:function(value){
							var pattern = new RegExp("^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$");
							if(!pattern.test(value)){
								return true;
							}else{
								return true;
							}
						}
					}]
				},
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype: 'combo',
						fieldLabel: '<span style="color:red">&nbsp;</span>性别',
						//emptyText       : '选择来源途径...',
						readName:'userReadNames',
						name: 'userSex',
						store: Ext.create('ESSM.utils.sys.DictUtils',{}).getDictStore('user_sex'),
						queryMode: 'local',
						editable: false,
						//readOnly:true,
						value :null,
						displayField: 'dictName',
						valueField: 'value',
						listeners: {
							change:function(t,nValue, oValue, e){
								t.setValue(t.getValue());
							}
						}
					}]
				},
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype: 'textfield',
						readName:'userReadNames',
						allowBlank: true,
						maxLength:20,
						maxLengthText:'长度超过20个字符',
						fieldLabel: '<span style="color:red">&nbsp;</span>身份证号',
						name:'userCardNo',
						validator:function(value){
							if(!value){
								return true;
							}
							if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)){
								return "请检查身份证号的正确性";
							}else{
								return true;
							}
						},
						listeners: {
							change:function(t,nValue, oValue, e){
							}
						}
					}]
				}
				,
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype: 'combo',
						fieldLabel: '<span style="color:red">&nbsp;</span>客户来源',
						//emptyText       : '选择来源途径...',
						readName:'userReadNames',
						name: 'userSource',
						store: Ext.create('ESSM.utils.sys.DictUtils',{}).getDictStore('user_source'),
						queryMode: 'local',
						editable: false,
						readOnly:true,
						value :null,
						displayField: 'dictName',
						valueField: 'value',
						listeners: {
							change:function(t,nValue, oValue, e){
								t.setValue(t.getValue());
							}
						}
					}]
				},
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype : 'textfield',
						fieldLabel: '<span style="color:red">&nbsp;</span>职业',
						name: 'userJob',
						allowBlank: true,
						maxLength:20,
						maxLengthText: "长度最长为20！",
						readName:'userReadNames',
						validator:function(value){
							var pattern = new RegExp("^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$");
							if(!pattern.test(value)){
								return true;
							}else{
								return true;
							}
						}
					}]
				},
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype: 'combo',
						fieldLabel: '<span style="color:red">&nbsp;</span>客户分组',
						name: 'groupId',
						readName:'userReadNames',
						queryMode: 'local',
						//emptyText       : '选择客户分组...',
						editable: false,
						// allowBlank: false,
						tooltip: '请选择',
						value :null,
						displayField: 'groupName',
						valueField: 'id',
						listeners: {
							select :function(combo, records, eOpts){
							},
							change:function(t,nValue, oValue, e){
								t.setValue(t.getValue());
							}
						},
						store: Ext.create('Ext.data.Store', {
							fields: ['id','groupName'],
							proxy : {
								type: 'ajax',
								api : {
									read : 'rest/crm/userGroup/read.json'
								},
								actionMethods: {
									read   : 'POST'
								},
								reader: {
									type: 'json',
									root:'data',
									totalProperty: 'totalCount'
								}
							},
							autoLoad: true  //即时加载数据
						})

					}]
				}
				,
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype: 'combo',
						fieldLabel: '<span style="color:red">&nbsp;</span>活跃度',
						readName:'userReadNames',
						name: 'userLiveness',
						// allowBlank: false,
						// emptyText       : '选择活跃度...',
						tooltip: '请选择' ,
						readOnly:true,
						store: Ext.create('ESSM.utils.sys.DictUtils',{}).getDictStore('user_liveness'),
						queryMode: 'local',
						editable: false,
						value :null,
						displayField: 'dictName',
						valueField: 'value',
						listeners: {
							change:function(t,nValue, oValue, e){
								t.setValue(t.getValue());
							}
						}
					}]
				}  ,
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype: 'combo',
						fieldLabel: '<span style="color:red">&nbsp;</span>客户级别',
						//   emptyText       : '选择客户级别...',
						name: 'levelId',
						readName:'userReadNames',
						queryMode: 'local',
						editable: false,
						// allowBlank: false,
						tooltip: '请选择',
						value :null,
						displayField: 'levelName',
						valueField: 'id',
						listeners: {
							select :function(combo, records, eOpts){
							},
							change:function(t,nValue, oValue, e){
								t.setValue(t.getValue());
							}
						},
						store: Ext.create('Ext.data.Store', {
							fields: ['id','levelName'],
							proxy : {
								type: 'ajax',
								api : {
									read : 'rest/crm/userLevel/read.json'
								},
								actionMethods: {
									read   : 'POST'
								},
								reader: {
									type: 'json',
									root:'data',
									totalProperty: 'totalCount'
								}
							},
							autoLoad: true  //即时加载数据
						})

					}]
				}  ,
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype: 'datefield',
						editable: true,
						//allowBlank: false,
						tooltip: '请填写生日',
						readName:'userReadNames',
						fieldLabel: '<span style="color:red">&nbsp;</span>生日',
						name: 'userBirthdayStr',
						value :null,
						format: 'Y-m-d'
					}]
				},{
					xtype: 'combo',
					fieldLabel: '<span style="color:red">&nbsp;</span>认证状态',
					readName:'userReadNames',
					name: 'authenticationStatus',
					// allowBlank: false,
					//emptyText       : '选择开户状态...',
					readOnly:true,
					tooltip: '请选择' ,
					store: Ext.create('ESSM.utils.sys.DictUtils',{}).getDictStore('authentication_status'),
					queryMode: 'local',
					editable: false,
					//value :2,
					displayField: 'dictName',
					valueField: 'value',
					listeners: {
						change:function(t,nValue, oValue, e){
							t.setValue(t.getValue());
						}
					}
				}


			]};
		var panelKHLXXX= {
			xtype: 'panel',
			title: '客户联系信息',
			anchor: '100% 25%',
			bodyPadding: '10',
			layout: {
				type: 'table',
				columns:3
			},
			fieldDefaults: {
				msgTarget: 'side',
				columnWidth: 1,
				labelWidth: 110
			},
			border :false,
			items:[
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype : 'textfield',
						fieldLabel: '<span style="color:red">&nbsp;</span>联系方式',
						name: 'userPhoneNo',
						readName:'userReadNames',
                        readOnly:true,
						tooltip: '请输入联系方式' ,
						//allowBlank: false,
						validateOnBlur:true,
						validateOnChange:false/*,
						validator : function(thisText) {
							if(!/^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/i.test(thisText)){
								return "请输入正确的电话号码格式！";
							}
							var id ;
							if(Ext.getCmp('userInfoId')){
								id = Ext.getCmp('userInfoId').value;
							}
							var isNameOK;
							Ext.Ajax.request({
								async:false,
								url : 'rest/crm/userinfo/checkMoblieExist.json',
								method : 'post',
								params : {
									id:id,
									mobile : thisText
								},
								success : function(response, options) {
									var data = response.responseText;
									var obj = eval("(" + data + ")");
									if (obj.success) {
										isNameOK =  true;
									}else{
										isNameOK = "此电话号码有重复，请重新输入！";
									}
								}
							});
							return isNameOK;
						}*/
					}]
				},
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype: 'textfield',
						fieldLabel: '固话1',
						readName:'userReadNames',
						allowBlank: true,
						name: 'telephoneOne',
						maxLength:20,
						maxLengthText: "固话1长度最长为20！"
					}]
				},
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype: 'textfield',
						fieldLabel: '固话2',
						readName:'userReadNames',
						name: 'telephoneTwo',
						allowBlank: true,
						maxLength:20,
						maxLengthText: "固话2长度最长为20！"
					}]
				},
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype: 'textfield',
						fieldLabel: '<span style="color:red">&nbsp;</span>电子邮箱',
						readName:'userReadNames',
						name: 'userEmail',
						regex:/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
						regexText:"请输入格式正确的邮箱"
					}]
				}
				,
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype : 'textfield',
						readName:'userReadNames',
						fieldLabel: '<span style="color:red">&nbsp;</span>邮编',
						name: 'userZipCode',
						validator:function(value){
							var pattern = /^\d{6}$/;
							if(value == ""){
								return true
							}else  if(pattern.test(value)){
								return true;
							}else{
								return "邮编为6位数字";
							}
						}
					}]
				},
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype : 'textfield',
						fieldLabel: '<span style="color:red">&nbsp;</span>QQ',
						name: 'userQq',
						readName:'userReadNames'
					}]
				},
				{
					xtype: 'fieldcontainer',
					items: [{
						id:'provinceCombo1',
						xtype: 'combo',
						forceSelection: true,
						editable : false,
						fieldLabel: '<span style="color:red">*</span>省',
						//emptyText       : '选择省份...',
						readName:'userReadNames',
						queryMode: 'local',
						displayField: 'areaName',
						valueField: 'areaCode',
						name:'provinceId',
						initOk:false,
						allowBlank: false,
						tooltip: '请选择',
						store: Ext.create('ESSM.store.crm.AreaStore', {
							id : 'provinceStore'
						}),
						listeners : {
							//   change: function(combo, nv, ov){
							//   if(nv!=ov){
							//	   var cityCombo = Ext.getCmp("cityCombo1");
							//	   cityCombo.clearValue();
							//	   cityCombo.setReadOnly(false);
							//	   cityCombo.setDisabled(false);
							//	   var areaCombo = Ext.getCmp("areaCombo1");
							//	   areaCombo.clearValue();
							//	   areaCombo.setDisabled(false);
							//	   var parentCode = nv;
							//	   var cityStore=cityCombo.getStore();
							//	   cityStore.load({
							//		   params : {
							//		   parentAreaCode : parentCode
							//	   }
							//	   });
							//   }
							//}
							select : function(combo,record,opts){
								var parentCode = record[0].data.areaCode;
								var cityCombo = Ext
									.getCmp("cityCombo1");
								cityCombo.clearValue();
								cityCombo.setReadOnly(false);
								cityCombo.setDisabled(false);
								var areaCombo = Ext
									.getCmp("areaCombo1");
								areaCombo.clearValue();
								areaCombo.setDisabled(false);
								var cityStore = cityCombo.getStore();
								cityStore.load({
									params : {
										parentAreaCode : parentCode
									}
								});
							}
						}
					}]
				}
				,
				{
					xtype: 'fieldcontainer',
					items: [{
						id:'cityCombo1',

						xtype: 'combo',
						forceSelection: true,
						fieldLabel: '<span style="color:red">*</span>市',
						//emptyText       : '市/州...',
						readName:'userReadNames',
						queryMode: 'local',
						displayField: 'areaName',
						valueField: 'areaCode',
						name:'cityId',
						allowBlank: false,
						tooltip: '请选择',
						initOk:false,
						maskOnDisable : true,
						editable : false,
						readOnly:true,
						store: Ext.create('ESSM.store.crm.AreaStore', {
							id : 'cityStore'
						}),
						listeners: {
							//   change: function(combo, nv, ov){
							//   if(nv!=ov){
							//	   var areaCombo = Ext.getCmp("areaCombo1");
							//	   areaCombo.clearValue();
							//	   areaCombo.setReadOnly(false);
							//	   areaCombo.setDisabled(false);
							//	   var parentCode = nv;
							//	   var areaStore=areaCombo.getStore();
							//	   areaStore.load({
							//		   params : {
							//		   parentAreaCode : parentCode
							//	   }
							//	   });
							//   }
							//}
							select : function(combo,record,opts){
								console.dir(record[0].data.areaCode);
								var parentCode = record[0].data.areaCode;
								var areaCombo = Ext
									.getCmp("areaCombo1");
								areaCombo.clearValue();
								areaCombo.setReadOnly(false);
								areaCombo.setDisabled(false);
								var areaStore = areaCombo.getStore();
								areaStore.load({
									params : {
										parentAreaCode : parentCode
									}
								});
							}
						}
					}]
				}, {
					xtype: 'fieldcontainer',
					items: [{
						id:'areaCombo1',
						displayField: 'areaName',
						valueField: 'areaCode',
						//allowBlank: false,
						readName:'userReadNames',
						tooltip: '请选择',
						xtype: 'combo',
						forceSelection: true,
						editable : false,
						fieldLabel: '<span style="color:red">&nbsp;</span>县',
						//emptyText       : '区/县...',
						queryMode: 'local',
						initOk:false,
						name:'districtId',
						//readOnly:true,
						maskOnDisable : true,
						store: Ext.create('ESSM.store.crm.AreaStore', {
							id : 'areaStore'
						})
					}]
				},{
					xtype : 'textfield',
					fieldLabel: '<span style="color:red">&nbsp;</span>微信号',
					name: 'wechatNo',
					readName:'userReadNames',
					maxLength:50,
					maxLengthText:'超过50个字符',
					allowBlank: true,
					tooltip: '请输入微信号',
					validator:function(value){
						var pattern = new RegExp("^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$");
						if(!pattern.test(value)){
							return true;
						}else{
							return true;
						}
					}
				},
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype : 'textfield',
						readName:'userReadNames',
						fieldLabel : '<span style="color:red">&nbsp;</span>详细地址',
						name : 'userAddress'
					}]
				}
			]};


		var panelZCXX= {
			xtype: 'panel',
			title: '资产信息',
			anchor: '100% 25%',
			bodyPadding: '10',
			layout: {
				type: 'table',
				columns:1
			},
			fieldDefaults: {
				msgTarget: 'side',
				labelWidth: 110
			},
			border :false,
			items:[
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype: 'combo',
						fieldLabel: '<span style="color:red">&nbsp;</span>年收入',
						readName:'userReadNames',
						name: 'userSalary',
						width:780,
						//emptyText       : '选择年收入...',
						// allowBlank: false,
						tooltip: '请选择',
						store: Ext.create('ESSM.utils.sys.DictUtils',{}).getDictStore('user_salary'),
						queryMode: 'local',
						editable: false,
						value :null,
						displayField: 'dictName',
						valueField: 'value',
						listeners: {
							change:function(t,nValue, oValue, e){
								t.setValue(t.getValue());
							}
						}
					}]
				},
				{
					xtype: 'fieldcontainer',
					items: [{
						readName:'userReadNames',
						xtype : 'textfield',
						fieldLabel : '房屋情况',
						width:780,
						name : 'houseInfo',
						anchor : '90%'
					}]
				},
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype : 'textfield',
						readName:'userReadNames',
						fieldLabel : '<span style="color:red">&nbsp;</span>车辆情况',
						width:780,
						name : 'carInfo'
					}]
				}
			]};

		var panelKZXX= {
			xtype: 'panel',
			title: '扩展信息',
			anchor: '100% 25%',
			bodyPadding: '10',
			layout: {
				type: 'table',
				columns:3
			},
			fieldDefaults: {
				msgTarget: 'side',
				columnWidth:1,
				labelWidth: 110
			},
			border :false,
			items:[
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype: 'combo',
						fieldLabel: '<span style="color:red">&nbsp;</span>婚姻状况',
						//emptyText       : '选择婚姻状况...',
						tooltip: '请选择',
						readName:'userReadNames',
						name: 'userMarriageStatus',
						//  allowBlank: false,
						store: Ext.create('ESSM.utils.sys.DictUtils',{}).getDictStore('user_marriage_status'),
						queryMode: 'local',
						value :null,
						displayField : 'dictName',
						valueField : 'value',
						editable: false,
						listeners: {
							change:function(t,nValue, oValue, e){
								t.setValue(t.getValue());
							}
						}
					}]
				},
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype: 'combo',
						readName:'userReadNames',
						fieldLabel: '<span style="color:red">&nbsp;</span>学历',
						// emptyText       : '选择学历...',
						tooltip: '请选择',
						name: 'userEducation',
						//allowBlank: false,
						store: Ext.create('ESSM.utils.sys.DictUtils',{}).getDictStore('user_education'),
						queryMode: 'local',
						editable: false,
						value :null,
						displayField: 'dictName',
						valueField: 'value',
						listeners: {
							change:function(t,nValue, oValue, e){
								t.setValue(t.getValue());
							}
						}
					}]
				},
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype : 'textfield',
						fieldLabel: '<span style="color:red">&nbsp;</span>行业',
						name: 'userIndustry',
						readName:'userReadNames',
						allowBlank: true,
						maxLength:30,
						maxLengthText: "长度最长为30！",
						validator:function(value){
							var pattern = new RegExp("^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$");
							if(!pattern.test(value)){
								return true;
							}else{
								return true;
							}
						}
					}]
				}
			]};
		var panelBGXX= {
			xtype: 'panel',
			title: '变更信息',
			anchor: '100% 25%',
			bodyPadding: '10',
			id:'bgxxPanel',
			layout: {
				type: 'table',
				columns:1
			},
			fieldDefaults: {
				msgTarget: 'side',
				labelWidth: 110
			},
			border :false,
			items:[
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype:"textarea",
						readOnly:true,
						readName:'userReadNames',
						width:780,
						autoScroll: true,
						editable: false,
						fieldLabel:'<span style="color:red">&nbsp;</span>变更内容',
						name:'changeReason',
						height:100
					}]
				},
				{
					xtype: 'fieldcontainer',
					items: [{
						xtype: 'combo',
						fieldLabel: '<span style="color:red">&nbsp;</span>审批状态',
						readOnly:true,
						width:780,
						hidden:true,
						readName:'userReadNames',
						name: 'changeStatus',
						store: Ext.create('ESSM.utils.sys.DictUtils',{}).getDictStore('change_status'),
						queryMode: 'local',
						value :1,
						displayField: 'dictName',
						valueField: 'value',
						listeners: {
							change:function(t,nValue, oValue, e){
								t.setValue(t.getValue());
							}
						}
					}]
				}
			]};
		var rightdiv={
			height:780,
			//autoScroll: true,
			width:900,
			items : [panelJCXX,panelKHLXXX,panelZCXX,
				panelKZXX,panelBGXX
			]
		};
		var tabpanel={
			xtype:"tabpanel",
			activeTab:1,
			//autoScroll: false,
			width:1200,
			//height:160,
			items:[
				{
					xtype:"panel",
					title:"销售记录",
					border : false,
					autoScroll :false,
					items:[
						{
							xtype:"grid",
							id:'salesGrid',
							autoScroll: true,
							height : 200,

							viewConfig : {
								loadMask : true
							},
							store: Ext.create('Ext.data.Store', {

								fields: ['id','managerId','managerName','userId','userRealName','investTime','investAmount','projectCode','projectName','investSuppliers','projectType','projectTypeName','createTime','updateTime','tradingType','orderNo'],
								pageSize: 200,  //页容量5条数据
								//是否在服务端排序 （true的话，在客户端就不能排序）
								remoteSort: false,
								remoteFilter: true,
								proxy: {
									type: 'ajax',
									url: 'rest/reportsm/investm/detailRead.json',//+this..getAgreeuserinfoForm().query('textfield[name=userCode]').getValue(),//Ext.query('#userCode'), //Ext.getCmp('userCode').getValue() this.queryField("d").getval
									reader: {   //这里的reader为数据存储组织的地方，下面的配置是为json格式的数据，例如：[{"total":50,"rows":[{"a":"3","b":"4"}]}]
										type: 'json', //返回数据类型为json格式
										root: 'data',  //数据
										totalProperty: 'totalCount' //数据总条数
									},
									actionMethods: {
										read   : 'POST'
									}
								},
								autoLoad: false  //即时加载数据
							}),
							columns: [

								{header: '订单号', dataIndex: 'orderNo',  align: 'center',width: 150},
								{header: '交易日期', dataIndex: 'investTime',  align: 'center',width: 150,
									renderer : function(value) {
										if(value && value!=null) {
											return Ext.Date.format(new Date(value),"Y-m-d");
										}
									}
								},
								{header: '交易金额(元)', dataIndex: 'investAmount',  align: 'center',width: 150},
								{header: '产品名称', dataIndex: 'projectName',  align: 'center',width: 150},
								{header: '产品编码', dataIndex: 'projectCode',  align: 'center',width: 150}
							]

						}
					]
				},
				{
					xtype:"panel",
					title:"回访记录",
					autoScroll :false,
					border : false,
					items:[
						{
							xtype:"grid",
							id :"revisitGrid",
							autoScroll: true,
							height : 200,
							viewConfig : {
								loadMask : true
							},
							store: Ext.create('Ext.data.Store', {
								fields: ['id', 'userName','userPhoneNo','userCardNo','userSource','realName','dictName',
									'createTime', 'operatorName','currVisitTime','userIntentId','areaName','telephoneOne','userSex','visitInfo','userInfoId','recodeCode'],
								pageSize: 1000,  //页容量5条数据
								remoteSort: false,
								remoteFilter: true,
								proxy: {
									type: 'ajax',
									url: 'rest/revisit/rinfo/read.json',
									reader: {
										type: 'json', //返回数据类型为json格式
										root: 'data',  //数据
										totalProperty: 'totalCount' //数据总条数
									},
									actionMethods: {
										read   : 'POST'
									}
								},
								autoLoad: false  //即时加载数据
							}),
							columns:[
								{ header: '咨询编号', dataIndex: 'recodeCode',align : 'center',width:'10%'},
								{ header: '客户名称', dataIndex: 'userName',align : 'center',width:'10%'},
								{ header: '来源途径', dataIndex: 'userSource',align : 'center',width:'10%', renderer:function(value) {
									return  Ext.create('ESSM.utils.sys.DictUtils',{}).getDictName('user_source',value);
								}},
								{ header: '客户意向', dataIndex: 'dictName',align : 'center',width:'10%'},
								{ header: '管辖城市', dataIndex: 'areaName',align : 'center',width:'10%'},
								{ header: '咨询创建时间', dataIndex: 'createTime',align : 'center',width:'10%' , renderer:function(value) {
									if(value && value!=null) {
										return Ext.Date.format(new Date(value),"Y-m-d");
									}
								}
								},
								{ header: '拜访时间', dataIndex: 'currVisitTime',align : 'center',width:'10%' , renderer:function(value) {
									if(value && value!=null) {
										return Ext.Date.format(new Date(value),"Y-m-d");
									}
								}
								},
								{ header: '客户经理', dataIndex: 'realName',align : 'center',width:'10%'}

							]
						}
					]
				},
				{
					xtype:"panel",
					title:"信息变更记录",
					border : false,
					autoScroll :false,
					items:[
						{
							xtype:"grid",
							id:"changeGrid",
							autoScroll: true,
							height : 200,
							viewConfig : {
								loadMask : true
							},
							store: Ext.create('Ext.data.Store', {
								fields: ['changeReason','updateEmpName','hisTime','approverName','changeStatus'],
								pageSize: 1000,
								remoteSort: false,
								remoteFilter: true,
								proxy: {
									type: 'ajax',
									url: 'rest/crm/userinfo/readhis.json',
									reader: {
										type: 'json', //返回数据类型为json格式
										root: 'data',  //数据
										totalProperty: 'totalCount' //数据总条数
									}
								},
								autoLoad: false  //即时加载数据
							}),
							columns:[
								{header: '序号',xtype: 'rownumberer',width: 70,sortable: false},
								{
									header:"变更时间",
									sortable:true,
									resizable:true,
									dataIndex:"hisTime",
									width:110,
									renderer : function(value) {
										if(value && value!=null) {
											return Ext.Date.format(new Date(value),"Y-m-d");
										}
									}
								},
								{
									header:"变更内容",
									sortable:true,

									resizable:true,
									dataIndex:"changeReason",
									width:800,
									renderer: function(value, meta, record) {
										meta.style = 'overflow:auto;padding: 3px 6px;text-overflow: ellipsis;white-space: nowrap;white-space:normal;line-height:20px;';
										return value;
									}
								},

								{header :'审批状态',sortable: false,dataIndex : 'changeStatus',align:'center',width:'15%',
									renderer : function(value) {
										if(value==1) {
											return '待提交';
										}else if(value==2) {
											return '待审核';
										}else if(value==3) {
											return '已拒绝';
										}else if(value==4) {
											return '已审核 ';
										}
									},
									width:110
								},
								{
									header:"审批人",
										sortable:true,

									resizable:true,
									dataIndex:"approverName",
									width:110
								}
							]
						}
					]
				},
				{
					xtype:"panel",
					title:"附件浏览",
					autoScroll :false,
					border : false,
					items : [{
						xtype : "grid",
						autoScroll : true,
						id : "uploadFileGrid",
						height : 200,
						viewConfig : {
							loadMask : true
						},
						store : Ext.create('Ext.data.Store', {
							fields : ['attachName', 'attachType', 'createTime'],
							pageSize : 1000, // 页容量5条数据
							remoteSort : false,
							remoteFilter : true,
							proxy : {
								type : 'ajax',
								url : 'rest/crm/potential/downloadUserInfoList.json',
								reader : {
									type : 'json', // 返回数据类型为json格式
									root : 'data', // 数据
									method : "POST",
									totalProperty : 'totalCount' // 数据总条数
								}
							},
							autoLoad : false
							// 即时加载数据
						}),
						columns : [{
							header : '序号',
							xtype : 'rownumberer',
							width : 70,
							sortable : false
						}, {
							header : "名称",
							sortable : true,
							resizable : true,
							dataIndex : "attachName",
							width : 200
						}, {
							header : "上传时间",
							sortable : true,
							resizable : true,
							dataIndex : "createTime",
							width : 200,
							renderer : function(value) {
								if (value && value != null) {
									return Ext.Date.format(new Date(value),
										"Y-m-d");
								}
							}
						}, {
							header : "类型",
							sortable : true,
							resizable : true,
							dataIndex : "attachType",
							width : 200,
							renderer : function(value) {
								if (value && value != null) {
									if (1 == value) {
										return "图片";
									} else if (value == 2) {
										return "文档";
									} else if (value == 3) {
										return "压缩包（zip）";
									}
								}
							}
						}, {
							text : '操作',
							xtype : 'textactioncolumn',
							sortable : false,
							dataIndex : 'id',
							width : 150,
							items : [{
								text : '下载',
								eventName : "downloadclick",
								handler : function(grid, rowIndex,
												   colIndex, item, e, record) {
									window
										.open('rest/crm/potential/downloadUserInfo.json?id='
										+ record.data.id);
								}
							}, {
								text : '删除',
								eventName : "deleteclick",
								handler : function(grid, rowIndex,
												   colIndex, item, e, record) {
									var me = this;
									Ext.MessageBox.confirm('提示',
										'您确认删除上传的附件吗？', function(btn) {
											if (btn == 'yes') {
												Ext.Ajax.request({
													url : 'rest/crm/potential/deleteFileByAId.json',
													params : {
														id : record.data.id
													},
													success : function(
														response) {
														var data = response.responseText;
														var obj = eval("("
															+ data
															+ ")");
														if (obj.success) {
															me.up().grid.store
																.reload()
														} else {
															Ext.MessageBox
																.alert(
																"失败",
																"删除资源失败！");
														}
													}
												});
											} else {
												return;
											}
										});
								}
							}]
						}

						]
					}]
				},

				{
					xtype : "panel",
					title : "跟踪记录",
					border : false,
					autoScroll :false,
					items : [{
						xtype : "grid",
						id : 'trackGrid',
						autoScroll : true,
						height : 200,
						viewConfig : {
							loadMask : true
						},
						store : Ext.create('Ext.data.Store', {
							fields : ['userId', 'userName', 'currContactDate',
								'projectName', 'intentAmount', 'intentInvestTime',
								'managerName'],
							pageSize : 1000, // 页容量5条数据
							// 是否在服务端排序 （true的话，在客户端就不能排序）
							remoteSort : false,
							remoteFilter : true,
							proxy : {
								type : 'ajax',
								url : 'rest/ctr/trackrecord/read.json',// +this..getAgreeuserinfoForm().query('textfield[name=userCode]').getValue(),//Ext.query('#userCode'),
								// //Ext.getCmp('userCode').getValue()
								// this.queryField("d").getval
								reader : { // 这里的reader为数据存储组织的地方，下面的配置是为json格式的数据，例如：[{"total":50,"rows":[{"a":"3","b":"4"}]}]
									type : 'json', // 返回数据类型为json格式
									root : 'data', // 数据
									totalProperty : 'totalCount' // 数据总条数
								},
								actionMethods : {
									read : 'POST'
								}
							},
							autoLoad : false
							// 即时加载数据
						}),
						columns : [

							{
								header : '客户编号',
								dataIndex : 'userId',
								align : 'center',
								width : '15%'
							}, {
								header : '客户名称',
								dataIndex : 'userName',
								align : 'center',
								width : '10%'
							}, {
								header : '联系日期',
								dataIndex : 'currContactDate',
								align : 'center',
								width : '10%',
								renderer : function(value) {
									if (value && value != null) {
										return Ext.Date.format(new Date(value),
											"Y-m-d");
									}
								}
							},
							{ header: '意向产品名称', dataIndex: 'projectName',align:'center',sortable:false,width:'15%'},
							{ header: '客户经理', dataIndex: 'managerName',align:'center',sortable:false,width:'15%'}
						]
					}]
				},{
					xtype : "panel",
					title : "预约记录",
					border : false,
					autoScroll :false,
					items : [{
						xtype : "grid",
						id : "appointmentRecord",
						autoScroll : true,
						height : 200,
						viewConfig : {
							loadMask : true
						},
						store : Ext.create('Ext.data.Store', {
							fields : ['projectCode','projectType','projectName','bookTime'],
							pageSize : 1000,
							remoteSort : false,
							remoteFilter : true,
							proxy : {
								type : 'ajax',
								url : 'rest/crm/projectBookInfo/read.json',
								reader : {
									type : 'json', // 返回数据类型为json格式
									root : 'data', // 数据
									totalProperty : 'totalCount' // 数据总条数
								}
							},
							autoLoad : false
							// 即时加载数据
						}),
						columns : [{
							header : '产品编码',
							dataIndex : 'projectCode',
							width : 200,
							align : 'center'
						},

							{
								header : '产品类型',
								sortable : false,
								dataIndex : 'projectType',
								width : 200,
								align : 'center',
								renderer : function(value) {
									return Ext.create('ESSM.utils.sys.DictUtils', {})
										.getDictName('product_type', value);
								}
							}, {
								header : '产品名称',
								dataIndex : 'projectName',
								width : 400,
								align : 'center',
								sortable : false
							}, {
								header : '预约时间',
								dataIndex : 'bookTime',
								align : 'center',
								width : 150,
								renderer : function(value) {
									if (value && value != null) {
										return Ext.Date.format(new Date(value),
											"Y-m-d");
									}
								}
							}]
					}]
				}, {
					xtype : "panel",
					title : "咨询记录",
					autoScroll :false,
					border : false,
					items : [{
						xtype : "grid",
						id : "consultRecord",
						autoScroll : true,
						height : 200,
						viewConfig : {
							loadMask : true
						},
						store : Ext.create('Ext.data.Store', {
							fields : ['id', 'displayText', 'userId'],
							pageSize : 1000, // 页容量5条数据
							remoteSort : false,
							remoteFilter : true,
							proxy : {
								type : 'ajax',
								url : 'rest/crm/potential/consultRecordRead.json',
								reader : {
									type : 'json', // 返回数据类型为json格式
									root : 'data', // 数据
									totalProperty : 'totalCount' // 数据总条数
								},
								actionMethods : {
									read : 'POST'
								}
							},
							autoLoad : false
							// 即时加载数据
						}),
						columns : [{
							header: '咨询者姓名',
							dataIndex: 'displayText',
							align: 'center',
							width: '15%'
						},{
							header: '咨询时间',
							dataIndex: 'consultTime',
							align: 'center',
							width: '15%'
						}, {
							header: '意向产品类型',
							dataIndex: 'projectType',
							align: 'center',
							width: '15%'
						}, {
							header: '有无意向',
							dataIndex: 'hasIntrest',
							align: 'center',
							width: '15%'
						},{
							header: '是否预约',
							dataIndex: 'hasRegister ',
							align: 'center',
							width: '10%'
						}
						]
					}]
				}, {
					xtype : "panel",
					title : "投诉记录",
					autoScroll :false,
					border : false,
					items : [{
						xtype : "grid",
						id : "complainGrid",
						height : 200,
						autoScroll : true,
						viewConfig : {
							loadMask : true
						},
						store : Ext.create('Ext.data.Store', {
							fields : ['id', 'displayText', 'userId'],
							pageSize : 1000, // 页容量5条数据
							remoteSort : false,
							remoteFilter : true,
							proxy : {
								type : 'ajax',
								url : 'rest/crm/potential/consultRecordRead.json',
								reader : {
									type : 'json', // 返回数据类型为json格式
									root : 'data', // 数据
									totalProperty : 'totalCount' // 数据总条数
								},
								actionMethods : {
									read : 'POST'
								}
							},
							autoLoad : false
							// 即时加载数据
						}),
						columns : [{
							header : '投诉人',
							dataIndex : 'displayText',
							align : 'center',
							width : '10%'
						},{
							header : '投诉时间',
							dataIndex : 'displayText',
							align : 'center',
							width : '10%'
						},{
							header : '投诉原因',
							dataIndex : 'displayText',
							align : 'center',
							width : '10%'
						}

						]
					}]
				}, {

					xtype : "panel",
					title : "行为统计",
					autoScroll : false,
					border : false,
					items : [{
						xtype : "grid",
						id : "actionGrid",
						autoScroll : true,
						height : 200,
						viewConfig : {
							loadMask : true
						},
						store : Ext.create('Ext.data.Store', {
							fields: [
								"id","userId","userCode","realName","mobile",
								"projectTypeCode","projectTypeName","projectCode","projectName",
								"userActionType","userActionName","projectAttentionDegree"
							],
							pageSize : 20, // 页容量5条数据
							remoteSort : false,
							remoteFilter : true,
							proxy : {
								type : 'ajax',
								url : 'rest/configm/useractiondata/listBy.json',
								reader : {
									type : 'json', // 返回数据类型为json格式
									root : 'data', // 数据
									totalProperty : 'totalCount' // 数据总条数
								},
                                limitParam : 'pageSize',
                                pageParam :'page',
								actionMethods : {
									read : 'POST'
								}
							},
							autoLoad : false
							// 即时加载数据
						}),
						columns: [
							{header: 'id', dataIndex: 'id', hidden: true},
							{header: '用户编号', dataIndex: 'userCode', align:'center', width: 155},
							{header: '用户姓名', dataIndex: 'realName', align:'center', width: 95},
							{header: '联系方式', dataIndex: 'mobile', align:'center', width: 155},
							{header: '产品关注度', dataIndex: 'projectAttentionDegree', align:'center', width: 95},
							{header: '意向产品', dataIndex: 'projectTypeName', align:'center', width: 95},
							{
								text: '操作',
								xtype : 'textactioncolumn',
								sortable: false,
								dataIndex: 'id',
								align:'center',
								width : 150,
								items : [
									{
										text : '详情',
										eventName : "lookstat"
									}
								]
							}
						]
					}]
				}]
		};
		var bottomdiv={
			//height:160,

			width:1200 ,
			align:"center",
			border : false,
			items : [{
				layout : 'column',
				border : false,
				align:"center",
				labelSeparator : '：',
				autoScroll :false,
				items : [tabpanel]
			}]
		};
		var box=	Ext.create('Ext.form.Panel', {
			layout: 'border',
			width:1200,
			height:520,
			border : false,
			bodyCls : ["iScroll"],
			autoScroll : true,
			defaults: {
				split: false,                 //是否有分割线
				collapsible: false,           //是否可以折叠
				autoScroll : true,
				bodyStyle: 'padding:0px'
			},
			items: [ {
				region: 'west',
				border : false,
				xtype: "panel",
				width: 305,
				items:[leftdiv]

			}, {
				region: 'center',
				border : false,
				xtype: "panel",
				items:[rightdiv]
			}, {
				region: 'south',
				xtype: "panel",
				border : false,
				height: 240,
				autoScroll : false,
				items:[bottomdiv]
			}]
		});
		return box;
	},
	getHeaders:function(){
		return  [

			{ header: '客户编号', dataIndex: 'userCode',align : 'center',width:'15%'},
			{ header: '客户姓名', dataIndex: 'userName',align : 'center',width:'10%'},
			{ header: '客户等级', dataIndex: 'levelName',align:'center',sortable:false,width:'10%'},
			{header :'客户来源',sortable: false,dataIndex : 'userSource',align:'center',xtype:'dictcolumn',dictCatagoryCode:'user_source',width:'10%'},
			{header :'客户分组',sortable: false,dataIndex : 'groupName',align:'center',width:'10%'

			},
			{header :'认证状态',sortable: false,dataIndex : 'authenticationStatus',align:'center',width:'10%',
				renderer : function(value) {
					return    Ext.create('ESSM.utils.sys.DictUtils',{}).getDictName('authentication_status',value);

				}
			},
			{ xtype:'mobilecolumn',header: '联系方式', dataIndex: 'userPhoneNo',align:'center',sortable:false,width:'10%'},
			{ header: '客户经理', dataIndex: 'managerName',align:'center',sortable:false,width:'10%'},

			{ header: '客户创建时间', dataIndex: 'createTime',align : 'center',width:'10%',
				renderer : function(value) {
					if(value && value!=null) {
						return Ext.Date.format(new Date(value),"Y-m-d");
					}
				}
			},

			{header :'活跃度',sortable: false,dataIndex : 'userLiveness',align:'center',width:'10%',
				renderer : function(value) {
					return    Ext.create('ESSM.utils.sys.DictUtils',{}).getDictName('user_liveness',value);

				}
			},
			/* {header :'审批状态',sortable: false,dataIndex : 'changeStatus',align:'center',width:'10%',
			 renderer : function(value) {
			 if(value===1) {
			 return "新增";
			 }else if(value===2) {
			 return "申请中";
			 }else if(value===3) {
			 return "拒绝";
			 }else if(value===4) {
			 return "已保存";
			 }else if(value===44) {
			 return "未审核";
			 }else if(value===22) {
			 return "变更申请";
			 }
			 }
			 },*/
			{header :'操作',sortable: false,dataIndex : 'userId',align:'center',width:'10%',
				renderer : function(value,r) {
					return '<input type="button" onclick="onUserInfoUploadwin(' + value + ')" value="上传附件"> ';
				}

			}/*,
			{header :' 预约记录 ',sortable: false,dataIndex : 'id',align:'center',width:'10%',
				renderer : function(value,r,record,rowIndex,colIndex,store) {
					var data=record.data;
					if(data.userSourceType=='3')//门户预约
						return  '<a href="javascript:void(0)">查看预约记录</a>';
					else
						return  '';
				},
				listeners:{
					click:function(grid, item, index, colIndex, e, record){
						var data=record.data;
						win= Ext.create('Ext.window.Window', {
							title: '预约记录',
							header: {
								titlePosition: 0,
								titleAlign: 'center'
							},
							modal:true,
							closable: true,
							width: 1000,
							height: 650,
							layout : 'fit',
							items:[{
								xtype : "crmProjectBookInfoView"
							}],
							init :  function(){
								this.control({
									'crmProjectBookInfoView': {
										'selectionchange' : function(view,records,eOpts) {
										},
										'itemdblclick':function (grid,row){
										}
									}
								});
							}
						});
						var initquery=function(record){
							var values = win.down("#crmProjectBookInfoForm").getValues();
							values['bParam.userInfoId']=data.id;
							//查询
							win.down("crmProjectBookInfoGridView").getStore().loadPage(1, {
								params: values
							});
						};
						win.down("crmProjectBookInfoForm").down('button[action=query]').on("click",function(){
							var values = win.down("#crmProjectBookInfoForm").getValues();

							//查询
							win.down("crmProjectBookInfoGridView").getStore().loadPage(1, {
								params: values
							});
						});
						initquery(record);

						if (win.isVisible()) {
							win.hide(this, function() {
							});
						}else {
							win.show(this, function() {
							});
						}
					}

				}
			}*/

		];
	},

	querySalesGrid:function(thiso,userCode){
		var grid = Ext.getCmp('salesGrid');
		var params ={'user_id': userCode,
			'start' : 0,
			'page' : 1,
			'pageSize' : 500
		};
		grid.store.proxy.extraParams = params;
		grid.store.load();
	},
	queryChangeGrid:function(thiso,userInfoId){
		var grid = Ext.getCmp('changeGrid');
		var params ={'bParam.userInfoId': userInfoId,
			'pParam.page':1,
			'pParam.pageSize':500
		};
		grid.store.proxy.extraParams = params;
		grid.store.load();
	},
	queryTrackGrid : function(thiso, userCode) {
		var grid = Ext.getCmp('trackGrid');//跟踪记录
		var params = {
			'bParam.userId' : userCode
		};
		grid.store.proxy.extraParams = params;
		grid.store.load();
	},
	queryAppointmentRecord : function(thiso, userInfoId) {
		var grid = Ext.getCmp('appointmentRecord');//预约记录
		var params = {
			'bParam.userInfoId' : userInfoId,
			'pParam.page' : 1,
			'pParam.pageSize' : 500
		};
		grid.store.proxy.extraParams = params;
		grid.store.load();
	},
	queryConsultRecord : function(thiso, userInfoId) {
		var grid = Ext.getCmp('consultRecord');//咨询记录
		var params = {
			'userInfoId' : userInfoId
		};
		grid.store.proxy.extraParams = params;
		grid.store.load();
	},


	queryRevisitGrid: function(thiso, userInfoId) {
		var grid = Ext.getCmp('revisitGrid');//回访记录
		var params = {
			'userId' : userInfoId
		};
		grid.store.proxy.extraParams = params;
		grid.store.load();
	},
	queryActionGrid: function(thiso, userInfoId) {

		var gridAction = Ext.getCmp('actionGrid');//行为统计
		var paramsAction = {
			'userId' : userInfoId
		};
		gridAction.store.proxy.extraParams = paramsAction;
		gridAction.store.load();
	},
	uploadFileGrid : function(thiso, userInfoId) {

		var grid = Ext.getCmp('uploadFileGrid');//附件浏览
		var params = {
			'userId' : userInfoId
		};
		grid.store.proxy.extraParams = params;
		grid.store.load();
	},
	queryComplainGrid: function(thiso, userInfoId) {
		var grid = Ext.getCmp('complainGrid');
		var params = {
			'userId' : userInfoId
		};
		grid.store.proxy.extraParams = params;
		grid.store.load();
	},
	readOnlyReadNames:function(form){
		var userReadNames=form.query('combo[readName=userReadNames]');
		Ext.each(userReadNames,function(item){
			item.setReadOnly(true);
			//item.disable();
		});
		var userReadNames1=form.query('textfield[readName=userReadNames]');
		Ext.each(userReadNames1,function(item){
			item.setReadOnly(true);
			//item.disable();
		});
		var userReadNames2=form.query('radiogroup[readName=userReadNames]');
		Ext.each(userReadNames2,function(item){
			item.setReadOnly(true);
			//item.disable();
		});
		var userReadNames3=form.query('checkbox[readName=userReadNames]');
		Ext.each(userReadNames3,function(item){
			item.setReadOnly(true);
			//item.disable();
		});
	},
	initReadOnlyAuthenticationStatus:function(editForm){
	var authenticationStatusObj=editForm.query('combo[name=authenticationStatus]')[0];
	var userCardNoObj=editForm.query('textfield[name=userCardNo]')[0];
	var userNameObj=editForm.query('textfield[name=userName]')[0];
	userCardNoObj.readOnly=true;
	userNameObj.readOnly=true;
    },

	constructor:function(config){
		var me = this;
		for(var attr in config){
			alert(attr + ':' + config[attr]);
		}
		me.initConfig(config);
	}
});

onUserInfoUploadwin = function (id) {
	var index_input=100;
	Ext.create('Ext.window.Window', {
		title: '上传附件',
		width: 700,
		height: 350,
		layout: 'fit',
		tbar:[
			{
				text:'新增',
				handler:function(v){
					index_input = index_input + 1;
					var me = this;
					var form =me.up().up().down("form");
					var fileInput= new Ext.Panel({
						id: 'org_fieldSet_' + index_input,
						layout: 'column',
						width:590,
						border: false,
						autoScroll :true,
						items: [
							{    width:400,
								layout: 'form',
								border: false,
								autoScroll :true,
								items: [
									{
										xtype: 'filefield',
										name: 'upload',
										fieldLabel: '文件',
										labelWidth: 50,
										msgTarget: 'side',
										allowBlank: false,
										buttonText: '选择文件...'
									}
								]
							} ,
							{
								width:100,
								layout: 'form',
								border: false,
								items: [{
									xtype: 'button',
									text: '删除',
									msgTarget: 'side',
									style : {
										marginLeft : '5px'
									},
									width:40,
									value: index_input,
									scope: this,
									handler: function(obj){
										var del_id = obj.value;
										var fieldSet_1 = Ext.getCmp('org_fieldSet_' + del_id);
										form.remove(fieldSet_1, true);
									}
								}]
							}
						]
					});
					//添加fieldSet
					form.add(fileInput);
					form.doLayout();
				}
			},
			{
				text: '开始上传',
				handler: function () {
					var me = this;
					var form =me.up().up().down("form").getForm();
					var fileValue= me.up().up().down("form").query("[name=upload]");
					for(var i=0;i<fileValue.length;i++){
						var values=fileValue[i].value;
						if(values.indexOf(".png")<0&&values.indexOf(".jpg")<0&&values.indexOf(".doc")<0&&values.indexOf(".ppt")<0&&values.indexOf(".xlsx")<0&&values.indexOf(".zip")<0){
							Ext.MessageBox.alert("失败", '上传格式允许jpg|.png|.doc|.ppt|.xlsx|.zip');
							return false
						}
					}
					if (form.isValid()) {
						form.submit({
							url: 'rest/crm/userinfo/uploadUserInfoFile.json',
							params:{userId: id},
							waitMsg: '文件上传中...',
							success: function (form, action) {
								Ext.Msg.alert('成功', '文件上传完成。');
								me.up().up().close();
							},
							failure: function (form, action) {
								Ext.MessageBox.alert("失败", ' ' + action.result.message + ' 上传失败。');
							}
						});
					}
				}
			}
		],
		modal : true,
		border: false,
		buttonAlign: 'center',
		items: [{
			xtype: 'form',
			width: 600,
			bodyPadding: 10,
			frame: true,
			autoScroll :true,
			renderTo: Ext.getBody(),
			items: [{
				xtype: 'filefield',
				name: 'upload',
				fieldLabel: '文件',
				labelWidth: 50,
				msgTarget: 'side',
				allowBlank: false,
				width:400,
				buttonText: '选择文件...'
			}],
			buttons: []
		}]
	}).show();
}
onUserInfoDownloadwin = function(id,flag) {
	filewinp=  Ext.create('Ext.window.Window', {
		title: '下载附件',
		width: 600,
		height: 300,
		layout: 'fit',
		modal : true,
		border: false,
		buttonAlign: 'center',
		items: [{
			xtype: 'grid',
			id:"fileUploadGrid001",
			columns: [
				{header: '文件名称', dataIndex: 'attachName', width: '50%'},
				{header: '操作', dataIndex: 'id', width: 100,
					renderer: function (value) {
						var id = value;
						if(1==flag){
							return '<input type="button" onclick="onUserInfoDownload(' + id + ')" value="下载"> ';
						}
						return '<input type="button" onclick="onUserInfoDownload(' + id + ')" value="下载"> <input type="button" onclick="onUserInfoDownloadDelte(' + id+')" value="删除">';
					}
				}
			],
			store: Ext.create('ESSM.store.crm.UserInfoAttachStore', {
				proxy: {
					type: 'ajax',
					url: 'rest/crm/userinfo/downloadUserInfoList.json',
					actionMethods: {
						read   : 'POST'
					},
					reader: {
						type: 'json',
						root: 'data',
						totalProperty: 'totalCount'
					},
					extraParams: {
						userId: id
					}
				},
				autoLoad: true
			})
		}],
		buttons: [{
			text: '取消',
			handler: function (btn) {
				var w;
				w = btn.up('window');
				w.close();
			}
		}]
	}).show();

	Ext.Ajax.request({
		url: 'rest/crm/userinfo/downloadUserInfoList.json',
		params: {userId: id},
		success: function (response) {
			var data = response.responseText;
			var obj = eval("(" + data + ")");
			if (obj.success) {

			} else {
				Ext.MessageBox.alert("失败", "下载资源失败！");
			}
		}
	});
}

onUserInfoDownload = function(id) {
	window.open('rest/crm/userinfo/downloadUserInfo.json?id=' + id);
};
onUserInfoDownloadDelte = function(id) {

	Ext.MessageBox.confirm('提示','您确认删除上传的附件吗？', function(btn){
		if(btn=='yes'){
			Ext.Ajax.request({
				url: 'rest/crm/userinfo/deleteFileByAId.json',
				params: {id:id},
				success: function (response) {
					var data = response.responseText;
					var obj = eval("(" + data + ")");
					if (obj.success) {
						Ext.getCmp("uploadFileGrid").store.reload();
					} else {
						Ext.MessageBox.alert("失败", "删除资源失败！");
					}
				}
			});
		} else{
			return;
		}
	});
};





