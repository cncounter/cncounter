Ext.define('ESSM.model.case.ProcessCase', {
    extend: 'Ext.data.Model',
    fields: [
        "id", "caseId", "caseType", "caseCategory", "incomingType", "saleChannel", "projectTypeCode", "projectTypeName",
        "createTime", "complaintType", "complaintUser", "complaintUserId", "processUser", "processUserId", "processDeptName",
        "processDeptCode", "processStatus", "promptStatus", "isrevisitStatus", "revisitStatus", "urgencyStatus", "processTimeLimit",
        "caseContent", "processContent",
        "userName", "userCode", "userPhoneNo", "telephoneOne", "telephoneTwo", "userSource", "userClass",
        "potentialUserStatus", "provinceId", "cityId", "districtId", "userAddress", "managerName",

        "kv.processUser","kv.processDeptName","kv.processUserId","kv.processDeptCode"
    ]
});