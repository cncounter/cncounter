package com.cncounter.cncounter.dao.api.vote;

import com.cncounter.cncounter.model.vote.VoteRecord;
import org.springframework.stereotype.Repository;

@Repository("oldVoteRecordMapper")
public interface VoteRecordMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(VoteRecord record);

    int insertSelective(VoteRecord record);

    VoteRecord selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(VoteRecord record);

    int updateByPrimaryKey(VoteRecord record);
}