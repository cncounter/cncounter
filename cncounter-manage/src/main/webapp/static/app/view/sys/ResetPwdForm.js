/**
 * 重置用户密码 form
 */
Ext.define("ESSM.view.sys.ResetPwdForm",{
	extend:"Ext.form.Panel",
	alias:"widget.resetPwdForm",
	width: '100%',
	bodyPadding: '10',
	border : 0,
	fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 90,
        anchor : '80%'
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
                fieldLabel: '用户名',
                name: 'name',
                readOnly : true
            }]
        },
        {
            xtype : 'fieldcontainer',
            items : [{
                xtype : 'textfield',
                fieldLabel: '真实姓名',
                name: 'realName',
                readOnly : true
            }]
        },
        {
            xtype : 'fieldcontainer',
            items : [{
                id : 'pass1',
                xtype : 'textfield',
                fieldLabel: '<span style="color:red">*</span>重置密码',
                name: 'newPassword',
                allowBlank: false,
                tooltip: '请输入新密码',
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
        }
    ]
});