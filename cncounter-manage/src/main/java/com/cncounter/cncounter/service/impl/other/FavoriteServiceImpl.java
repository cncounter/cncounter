package com.cncounter.cncounter.service.impl.other;

import com.cncounter.cncounter.dao.api.other.FavoriteMapper;
import com.cncounter.cncounter.model.other.Favorite;
import com.cncounter.cncounter.service.api.other.FavoriteService;
import com.cncounter.cncounter.service.impl.base.ServiceImplBase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("oldFavoriteServiceImpl")
public class FavoriteServiceImpl extends ServiceImplBase implements FavoriteService {

	@Autowired
	private FavoriteMapper favoriteMapper;
	
	
	@Override
	public int add(Favorite favorite) {
		int rows = favoriteMapper.insertSelective(favorite);
		return rows;
	}

	@Override
	public int deleteById(Integer id) {
		int rows = favoriteMapper.deleteById(id);
		return rows;
	}

	@Override
	public Favorite getById(Integer id) {
		Favorite favorite = favoriteMapper.getById(id);
		return favorite;
	}

	@Override
	public List<Favorite> listByType(Integer type) {
		//
		// 此处,可以使用Redis缓存进行优化处理
		//
		List<Favorite> favorites = favoriteMapper.listByType(type);
		return favorites;
	}

	@Override
	public int update(Favorite favorite) {
		int rows = favoriteMapper.updateSelective(favorite);
		return rows;
	}

}
