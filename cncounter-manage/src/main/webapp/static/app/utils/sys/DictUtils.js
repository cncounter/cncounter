Ext.define('ESSM.utils.sys.DictUtils',{

	config:{},
	getDictName:function(dictCatagoryCode,value) {
		var dictName='';
		if(!wr.isEmpty(wr.dict[dictCatagoryCode])){
			var data=wr.dict[dictCatagoryCode];
			Ext.Array.each(data,  function(item){
				if(item['dictValue']==value){
					dictName=item['dictName'];
				}

			});
		}else{
			Ext.Ajax.request({
				async: false,
				url:'rest/achieve/dict/list.json',
				method:'post',
				params:{'bParam.dictCatagoryCode':dictCatagoryCode,addall:'all'},
				success: function(resp,opts) {
					var datas=Ext.JSON.decode(resp.responseText);
					wr.dict[dictCatagoryCode]=datas.data;
					Ext.Array.each(datas.data,  function(item){
						if(item['dictValue']==value){
							dictName=item['dictName'];
						}
					});
				}
			});

		}
		return  dictName;
	},
	getValueDictName:function(dictCatagoryCode,value) {
		var dictName='';
		if(!wr.isEmpty(wr.dict[dictCatagoryCode])){
			var data=wr.dict[dictCatagoryCode];
			Ext.Array.each(data,  function(item){
				if(item['value']==value){
					dictName=item['dictName'];
				}

			});
		}else{
			Ext.Ajax.request({
				async: false,
				url:'rest/achieve/dict/list.json',
				method:'post',
				//params:{'bParam.dictCatagoryCode':dictCatagoryCode,addall:'all','bParam.dictStatus':1},
				params:{'bParam.dictCatagoryCode':dictCatagoryCode,addall:'all'},
				success: function(resp,opts) {
					var datas=Ext.JSON.decode(resp.responseText);
					wr.dict[dictCatagoryCode]=datas.data;
					Ext.Array.each(datas.data,  function(item){
						if(item['value']==value){
							dictName=item['dictName'];
						}
					});
				}
			});

		}
		return  dictName;
	},
	getDictStore:function(dictCatagoryCode){
		var store=Ext.create('Ext.data.Store', {
			autoLoad : true,
			remoteSort : true,
			fields: [
				{name: 'value', type: 'int'},
				{name: 'dictValue', type: 'string'},
				{name: 'dictName', type: 'string'}
			],
			proxy : {
				type: 'ajax',
				api : {
					read : 'rest/achieve/dict/list.json'
				},
				extraParams:{'bParam.dictCatagoryCode':dictCatagoryCode},
				actionMethods: {
					read   : 'POST'
				},
				reader: {
					type: 'json',
					root:'data',
					messageProperty:'message'
				}
			}
		});


		return store;
	},
	getExcludeDictStore:function(dictCatagoryCode,arrs){
		var arrstemp=[];
		var store=Ext.create('Ext.data.Store', {
			autoLoad : true,
			remoteSort : true,
			fields: [
				{name: 'value', type: 'int'},
				{name: 'dictValue', type: 'string'},
				{name: 'dictName', type: 'string'}
			],
			proxy : {
				type: 'ajax',
				api : {
					read : 'rest/achieve/dict/list.json'
				},
				extraParams:{'bParam.dictCatagoryCode':dictCatagoryCode},
				actionMethods: {
					read   : 'POST'
				},
				reader: {
					type: 'json',
					root:'data',
					messageProperty:'message'
				}
			},
			listeners : {
				datachanged:function(store,opts){
					var  array= store.data.items;
					var arr=  Ext.Array.clone(array);
					Ext.Array.forEach(arr,function(item,index,arr){
						var dictName= item.data.dictName;
						if(!Ext.Array.contains(arrs,dictName)){
							Ext.Array.include(arrstemp,item);
						}
					});
					store.data.items=arrstemp;
				}
			}
		});
		return store;
	},
	getExcludeDictStoreWithAll:function(dictCatagoryCode,arrs){
		var arrstemp=[];
		var store=Ext.create('Ext.data.Store', {
			autoLoad : true,
			remoteSort : true,
			fields: [
				{name: 'value', type: 'int'},
				{name: 'dictValue', type: 'string'},
				{name: 'dictName', type: 'string'}
			],
			proxy : {
				type: 'ajax',
				api : {
					read : 'rest/achieve/dict/list.json'
				},
				extraParams:{'bParam.dictCatagoryCode':dictCatagoryCode,addall:'all'},
				actionMethods: {
					read   : 'POST'
				},
				reader: {
					type: 'json',
					root:'data',
					messageProperty:'message'
				}
			},
			listeners : {
				datachanged:function(store,opts){
					var  array= store.data.items;
					var arr=  Ext.Array.clone(array);
					Ext.Array.forEach(arr,function(item,index,arr){
						var dictName= item.data.dictName;
						if(!Ext.Array.contains(arrs,dictName)){
							Ext.Array.include(arrstemp,item);
						}
					});
					store.data.items=arrstemp;
				}
			}
		});
		return store;
	},
	getDictStoreByInt:function(dictCatagoryCode){
		return Ext.create('Ext.data.Store', {
			autoLoad : true,
			remoteSort : true,
			fields: [
				{name: 'value', type: 'int'},
				{name: 'dictValue', type: 'string'},
				{name: 'dictName', type: 'string'}
			],
			proxy : {
				type: 'ajax',
				api : {
					read : 'rest/achieve/dict/list.json'
				},
				extraParams:{'bParam.dictCatagoryCode':dictCatagoryCode},
				actionMethods: {
					read   : 'POST'
				},
				reader: {
					type: 'json',
					root:'data',
					messageProperty:'message'
				}
			}
		});
	},
	getDictStoreWithAll:function(dictCatagoryCode){
		var store= Ext.create('ESSM.store.sys.DictStore', {
			autoLoad : true,
			remoteSort : true,
			fields: [
				{name: 'value', type: 'int'},
				{name: 'dictValue', type: 'string'},
				{name: 'dictName', type: 'string'}
			],
			proxy : {
				type: 'ajax',
				api : {
					read : 'rest/achieve/dict/list.json'
				},
				extraParams:{'bParam.dictCatagoryCode':dictCatagoryCode,addall:'all'},
				actionMethods: {
					read   : 'POST'
				},
				reader: {
					type: 'json',
					root:'data',
					messageProperty:'message'
				}
			}
		});
		return store;
	},
	readOnlyReadNames:function(form){
		var userReadNames=form.query('combo[readName=userReadNames]');
		Ext.each(userReadNames,function(item){
			item.setReadOnly(true);
		});
		var userReadNames1=form.query('textfield[readName=userReadNames]');
		Ext.each(userReadNames1,function(item){
			item.setReadOnly(true);
		});
		var userReadNames2=form.query('radiogroup[readName=userReadNames]');
		Ext.each(userReadNames2,function(item){
			item.setReadOnly(true);
		});
		var userReadNames3=form.query('checkbox[readName=userReadNames]');
		Ext.each(userReadNames3,function(item){
			item.setReadOnly(true);
		});
	},
	isUpload:function(target){

		var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
		var sizeLabel = ["B", "KB", "MB", "GB"];
		function fileChange(target) {

			var fileSize = 0;
			if (isIE && !target.files) {
				var filePath = target.value;
				var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
				var file = fileSystem.GetFile (filePath);
				fileSize = file.Size;
			} else {
				fileSize = target.files[0].size;
			}
			displayFileSize(fileSize);
		}

		function displayFileSize(size) {
			var fileSize = target.filesizeflagObject;
			var s=calFileSize(size);
			console.info(s);
			fileSize.innerHTML = s;

		}

		function calFileSize(size) {
			for (var index = 0; index < sizeLabel.length; index++) {
				if (size < 1024) {
					return round(size, 2) + sizeLabel[index];
				}
				size = size / 1024;
			}
			return round(size, 2) + sizeLabel[index];
		}

		function round(number, count) {
			return Math.round(number * Math.pow(10, count)) / Math.pow(10, count);
		}
		fileChange(target);
	}
});
