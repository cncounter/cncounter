Ext.define('ESSM.model.sys.Department',{
	extend: 'Ext.data.Model',
	fields: ['id', 'deptCode', 'deptName', 'parentCode',
		'province', 'city', 'area', 'provinceCode', 'cityCode','areaCode',
		'sort', 'deptInfo', 'status', 'delflag', 'createTime', 'updateTime',
		'createUser', 'updateUser', 'createId', 'updateId',
		'text', 'leaf', 'expanded'
	]
});