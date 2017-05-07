/**
 * 用户 form 
 */
Ext.define("ESSM.view.sys.UserForm",{
	extend:"Ext.form.Panel",
	alias:"widget.userForm",
	width:600,
	bodyPadding: '10',
	border : 0,
	fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 90,
        anchor : '80%'
    },
	items:[{
		xtype: 'fieldcontainer',
	    layout: 'column',
		fieldDefaults: {
            msgTarget: 'side',
            columnWidth : .5,
            labelWidth: 90
	    },
	    
	    items:[
			{
				name:'id',
				xtype: 'textfield',
				hidden:true
			},{
	    	xtype : 'fieldcontainer',
	    	items : [{
		    	xtype : 'textfield',
		    	fieldLabel: '<span style="color:red">*</span>用户名',
		    	name: 'name',
		    	id:'user_username',
		        allowBlank: false,
		        tooltip: '请输入用户名'
		    }]
	    },{
	    	xtype : 'fieldcontainer',
	    	items : [{
	    		xtype : 'textfield',
		    	fieldLabel: '<span style="color:red">*</span>真实姓名',
		    	name: 'realName',
		        allowBlank: false,
		        tooltip: '请输入真实姓名'
		    }]
	    }]
	},
	{
		xtype: 'fieldcontainer',
	    layout: 'column',
		fieldDefaults: {
            msgTarget: 'side',
            columnWidth : .5,
            labelWidth: 90
	    },
	    
//	    items:[{
////	    	xtype : fieldcontainer,
//	    	fieldLabel: '输入密码',
//	    	regex: /^([a-zA-Z0-9]{6,})$/i,
//	    	regexText: '密码必须同时包含字母和数字,且最少有6位'
//	    	},{
//	    	fieldLabel: '再次输入',
//	    	validator: function(value){
//	    	var pw = this.previousSibling().value;
//	    	if(value != pw){
//	    	return '两次输入的密码不一致';
//	    	}else{
//	    	return true;
//	    	}
//	    	}
//	    	}],
//	    
	    items:[{
	    	xtype : 'fieldcontainer',
	    	items : [{
	    		id : 'pass',
		    	xtype : 'textfield',
		    	fieldLabel: '<span style="color:red">*</span>密码',
		    	name: 'password',
		        allowBlank: false,
		        tooltip: '请输入密码',
                minLength : 6,
                maxWidth : 32,
                validator : function(value){
                    var securityLevelFlag = ESSM.passwordLevel(value);
                    if(securityLevelFlag < 2){
                        return "不能用纯数字或纯字母作为密码[6-32位]";
                    } else {
                        return true;
                    }
                }
		        
		    }]
	    },{
	    	xtype : 'fieldcontainer',
	    	items : [{
	    		id : 'pass1',
	    		xtype : 'textfield',
		    	fieldLabel: '<span style="color:red">*</span>确认密码',
		    	name: 'password',
		        allowBlank: false,
		        tooltip: '请确认密码',
                minLength : 6,
                maxWidth : 32,
                validator : function(value){
                    var psswordInput = this.up("form").query("textfield[name=password]")[0];
                    var pw =  psswordInput.value;
                    if(value != pw){
                        return '两次输入的密码不一致';
                    }
                    //
                    var securityLevelFlag = ESSM.passwordLevel(value);
                    if(securityLevelFlag < 2){
                        return "不能用纯数字或纯字母作为密码[6-32位]";
                    } else {
                        return true;
                    }
                }
		    }]
	    }]
	}, {
			xtype: 'fieldcontainer',
			layout: 'column',
			fieldDefaults: {
				msgTarget: 'side',
				columnWidth: .5,
				labelWidth: 90
			},
			items: [{
				xtype: 'fieldcontainer',
				items: [{
					xtype: 'textfield',
					fieldLabel: '联系电话',
					name: 'phone',
					regex : /^1[3|4|5|6|7|8][0-9]\d{8}/,
					regexText : "对不起，请输入11位手机号！"
					
				}]
			}, {
				xtype: 'fieldcontainer',
				items: [{
					xtype: 'textfield',
					fieldLabel: '电子邮箱',
					name: 'email',
					regex:/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
					regexText:"请输入格式正确的邮箱"
				}]
			}]
		},{
			xtype: 'fieldcontainer',
			layout: 'column',
			fieldDefaults: {
				msgTarget: 'side',
				columnWidth : .5,
				labelWidth: 90
			},
			items:[{
				xtype : 'fieldcontainer',
				items : [{
					fieldLabel: '是否有效',
					name: 'status',
					xtype: 'checkboxfield',
					uncheckedValue : 0,
					inputValue : 1,
					checked : true,
					boxLabel : '是'
				}]
			},{
				xtype : 'fieldcontainer',
				items : [{
					id:'combo',
					xtype:'combo',
					fieldLabel: '所属角色',
					 store: Ext.create('ESSM.store.sys.RoleStore', {
				        	model : 'ESSM.model.sys.Role',
				        	autoLoad:true,
						    proxy: {
						        type: 'ajax',
						        url: 'rest/sys/role/read.json',
						        extraParams: {
			                    	user: 'user'
			               		 },
						        reader: {
						            type: 'json',
						            root: 'data'
						        }
						    }
				        }),
					uncheckedValue : "",
					multiSelect: true,
					editable: false,
					displayField: 'name',
					valueField: 'id',
//					name:'roles',
					listeners:{
						change:function(t,nValue, oValue, e){
//							t.value = t.getValue().join(',');
							 Ext.getCmp("roles").setValue(t.getValue());
						}
					}
				}]
			},{
				xtype: 'fieldcontainer',
				items: [{
					xtype: 'textfield',
					name: 'roles',
					id:'roles',
					hidden:true
				}]
			}]
		},{
			xtype: 'fieldcontainer',
		    layout: 'column',
			fieldDefaults: {
	            msgTarget: 'side',
	            columnWidth : .5,
	            labelWidth: 90
		    },
		    items:[{
				xtype: 'fieldcontainer',
				id : 'departmentIdContent'
		    }]
		}]
});