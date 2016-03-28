package com.cncounter.cncounter.dao.api.vote;

import com.cncounter.cncounter.model.vote.Vote;
import org.springframework.stereotype.Repository;

@Repository("oldVoteMapper")
public interface VoteMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Vote record);

    int insertSelective(Vote record);

    Vote selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Vote record);

    int updateByPrimaryKeyWithBLOBs(Vote record);

    int updateByPrimaryKey(Vote record);
}