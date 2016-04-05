Ext.define('ESSM.model.crm.Manager',{
	extend: 'Ext.data.Model',
	fields: ['id', 'name', 'realName', 'password',
		'type', 'phone', 'email', 'picUrl', 'status','sex',
		'birthday', 'officePhone', 'departCode', 'departName', 'superLeaderCode', 'superLeaderName',
		'empCode', 'createTime', 'updateTime','roles','isLeader','tel','isLeader', 'roleName'
		,'empInvitationCode','posPassword','jobNames'
	]
});