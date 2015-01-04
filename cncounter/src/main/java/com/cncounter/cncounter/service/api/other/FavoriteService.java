package com.cncounter.cncounter.service.api.other;

import java.util.List;

import com.cncounter.cncounter.model.other.Favorite;

public interface FavoriteService {

	public int add(Favorite favorite);
    
	public int deleteById(Integer id);

	public int update(Favorite favorite);

	public Favorite getById(Integer id);
    /**
     * 根据类别取出数据
     * @param id
     * @return
     */
	public List<Favorite> listByType(Integer type);
}
