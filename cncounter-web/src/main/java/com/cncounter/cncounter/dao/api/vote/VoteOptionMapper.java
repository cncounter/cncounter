package com.cncounter.cncounter.dao.api.vote;

import com.cncounter.cncounter.model.vote.VoteOption;

public interface VoteOptionMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(VoteOption record);

    int insertSelective(VoteOption record);

    VoteOption selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(VoteOption record);

    int updateByPrimaryKeyWithBLOBs(VoteOption record);

    int updateByPrimaryKey(VoteOption record);
}