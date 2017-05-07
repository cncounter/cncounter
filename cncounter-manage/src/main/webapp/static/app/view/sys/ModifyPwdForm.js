Ext.define("ESSM.view.sys.ModifyPwdForm", {
    extend: "Ext.form.Panel",
    alias: "widget.modifyPwdForm",
    border: 0,
    defaultType: 'textfield',
    items: [
        {
            xtype: 'fieldcontainer',
            layout: 'column',
            fieldDefaults: {
                msgTarget: 'side',
                columnWidth: .3,
                style : {
                    marginLeft : '35px'
                },
                labelWidth: 90
            },
            items: [
                {
                    style : {
                        marginTop : '20px'
                    },
                    xtype: 'fieldcontainer',
                    anchor: '60%  5%',
                    items: [
                        {
                        border: 0,
                        width: 525,
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'password',
                                inputType: 'password',
                                fieldLabel: '<span style="color:red">*</span>当前密码',
                                allowBlank: false
                            },
                            {
                                xtype: 'textfield',
                                name: 'newPassword',
                                inputType: 'password',
                                fieldLabel: '<span style="color:red">*</span>输入新密码',
                                allowBlank: false,
                                minLength : 6,
                                maxWidth : 32,
                                validator : function(value){
                                    //
                                    var securityLevelFlag = ESSM.passwordLevel(value);
                                    if(securityLevelFlag < 2){
                                        return "不能用纯数字或纯字母作为密码[6-32位]";
                                    } else {
                                        return true;
                                    }
                                }
                            },
                            {
                                xtype: 'textfield',
                                name: 'rePassword',
                                inputType: 'password',
                                fieldLabel: '<span style="color:red">*</span>重复新密码',
                                allowBlank: false,
                                minLength : 6,
                                maxWidth : 32,
                                validator : function(value){
                                    var psswordInput = this.up("form").query("textfield[name=newPassword]")[0];
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
                            },
                            {
                                xtype: 'button',
                                width: 60,
                                margin: '0 0 0 50',
                                name: 'save',
                                allowBlank: false,
                                action:'save',
                                iconCls : 'edit',
                                text: '修改',
                                handler : function(btn, e){
                                    var configMasterForm = this.up("form") || {};
                                    var saveFn = configMasterForm.saveFn;
                                    var saveFnContext = configMasterForm.saveFnContext || configMasterForm;
                                    saveFn && saveFn.call(saveFnContext, configMasterForm);
                                }
                            }
                            ,
                            {
                                xtype: 'button',
                                width: 60,
                                margin: '0 0 0 50',
                                name: 'cancel',
                                allowBlank: false,
                                action:'query',
                                iconCls : 'cancel',
                                text: '取消',
                                listeners : {
                                    'click' : function(){
                                        this.up("window").close();
                                    }
                                }
                            }
                        ]
                    }]
                }]
        }]

});