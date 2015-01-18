package com.cncounter.test.bitree;

/**
 * 三元组
 */
public class TripleStore {

	// 主语树
	private BinaryTree<Record> entityTree = new BinaryTree<Record>();
	// 谓语树
	private BinaryTree<Record> relationTree = new BinaryTree<Record>();
	// 宾语树
	private BinaryTree<Record> propertyTree = new BinaryTree<Record>();
	
	//
	
	
	public String wild = "*";

	public TripleStore() {
		
	}
	
	//
	public String getWild() {
		return wild;
	}
	public void setWild(String wild) {
		this.wild = wild;
	}
	//
	public boolean add(String entity, String relation, String property) {
		Record record = Record.makeRecord(entity, relation, property);
		// 加到3颗二叉树中
		// 类似于加索引
		// add
		//
		return true;
	}
}
