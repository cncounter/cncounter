Ext.define("ESSM.view.sys.UserLogoffForm", {
    extend: "Ext.form.Panel",
    alias: "widget.userLogoffForm",
    //border: 1,
    title: "用户账户注销",
    requires : [
        'ESSM.view.base.DateTimeField'
    ],
    border: 0,
    //defaultType: 'textfield',
    items: [
        {
            //xtype: 'fieldcontainer',
            //layout: 'column',
            fieldDefaults: {
                msgTarget: 'side',
                columnWidth: .3,
                style: {
                    marginLeft: '25px'
                },
                labelWidth: 70
            },
            items: [
                {
                    style: {
                        labelWidth: 95,
                        marginTop: '20px'
                    },
                    xtype: 'fieldcontainer',
                    //anchor: '80%  5%',
                    items: [{
                            name: 'id',
                            xtype: 'hiddenfield',
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            name: "empCode",
                            width : 325,
                            allowBlank: false,
                            readOnly : false,
                            fieldLabel: "员工编号"
                        },
                        {
                            xtype: 'fieldcontainer',
                            items: [{
                                xtype: 'authcbutton',
                                msgTarget: 'side',
                                style : {
                                    marginLeft : '25px',
                                    marginTop:'10px'
                                },
                                action: 'query',
                                iconCls: 'find',
                                text: '查询'
                            },{
                                xtype: 'authcbutton',
                                msgTarget: 'side',
                                style : {
                                    marginLeft : '25px',
                                    marginTop:'10px'
                                },
                                action: 'reset',
                                iconCls: 'find',
                                text: '重置'
                            }]
                        }
                    ]
                }]
        }]

});