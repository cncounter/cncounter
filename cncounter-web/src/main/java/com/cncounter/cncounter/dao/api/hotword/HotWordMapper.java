package com.cncounter.cncounter.dao.api.hotword;

import com.cncounter.cncounter.model.hotword.HotWord;

public interface HotWordMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(HotWord record);

    int insertSelective(HotWord record);

    HotWord selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(HotWord record);

    int updateByPrimaryKeyWithBLOBs(HotWord record);

    int updateByPrimaryKey(HotWord record);
}