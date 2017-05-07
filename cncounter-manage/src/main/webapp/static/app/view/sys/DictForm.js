/**
 * 字典
 */
Ext.define("ESSM.view.sys.DictForm",{
	extend:"Ext.form.Panel",
	alias:"widget.dictForm",
	width:600,
	bodyPadding: '10',
	border : 0,
	fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 90,
        anchor : '80%'
    },
    initComponent : function(){
		this.items =  [{
	    	name:'id',
			xtype: 'textfield',
			hidden:true
	    },{
	    	xtype : 'textfield',
	    	fieldLabel: '字典名称',
	    	name: 'dictName',
            allowBlank: false,
            tooltip: '请输入字典名称'
	    },
		{
	    	xtype : 'textfield',
	    	fieldLabel: '字典值',
	    	name: 'dictValue',
            allowBlank: false,
            tooltip: '字典值'
	    },
			{
	    	xtype : 'textfield',
	    	fieldLabel: '字典类型值',
	    	name: 'dictCatagoryCode',
            allowBlank: false,
            tooltip: '字典类型值'
	    },{
			xtype : 'textfield',
	    	fieldLabel : '字典类型',
	    	name : 'dictCatagoryName'
	    },
			{
				xtype : 'textfield',
				fieldLabel : '编号',
				name : 'dictSortNo',
				hidden:true
			},

			{
			fieldLabel: '是否有效',
			xtype: 'radiogroup',
			items: [
				{boxLabel: '是', name: 'dictStatus', inputValue: 0, checked: true},
				{boxLabel: '否', name: 'dictStatus', inputValue: 1}
			],
			inputValue:0,
			id:'dictdictStatus1'
		}],
		this.callParent();
	}
});