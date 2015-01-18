package com.cncounter.test.bitree;

import java.util.Iterator;

/**
 * 二叉树
 * @param <T>
 */
public class BinaryTree<T> {
	
	// 中序优先
	public static final int ORDER_PRIOR_PARRENT = 1;
	// left
	public static final int ORDER_PRIOR_LEFT = 2;
	// right
	public static final int ORDER_PRIOR_RIGHT = 3;
	
	public static class BinaryTreeIterator<T> implements Iterator<TreeNode<T>>{
		// 所遍历的树
		private BinaryTree<T> tree ;
		// 遍历顺序
		private int iterorder;
		// next 后设置此节点
		private TreeNode<T> currentNode;
		
		public BinaryTreeIterator(BinaryTree<T> tree,int iterorder) {
			this.tree = tree;
			this.iterorder = iterorder;
		}
		//
		@Override
		public boolean hasNext() {
			// 
			if(null == tree){
				return false;
			}
			TreeNode<T> c = currentNode; // hasNext() can not change currentNode;
			if(null == c){
				return null != tree.getRoot(); // root must exists
			}
			//
			TreeNode<T> n = tree.getNext(currentNode, iterorder);
			//
			return null != n;
		}

		@Override
		public TreeNode<T> next() {
			//
			if(!hasNext()){
				throw new RuntimeException("Error: has not next Element!");
			}
			// 
			if(null == tree){
				return null;
			}
			TreeNode<T> n = tree.getNext(currentNode, iterorder);
			//
			if(null != n){
				currentNode = n;
			}
			//
			return n;
		}

		@Override
		public void remove() {
			
		}
		
	}

	private TreeNode<T> root;
	public TreeNode<T> getRoot() {
		return root;
	}
	public void setRoot(TreeNode<T> root) {
		this.root = root;
	}

	public TreeNode<T> getNext(TreeNode<T> current, int iterorder) {
		//
		if(null == current){
			// 获取 root?
		}
		TreeNode<T> n = null;
		//
		if(ORDER_PRIOR_PARRENT == iterorder){
			//
			if(null == current){
				n = root;
			} else {
				// by left / right
			}
			//
		} else if(ORDER_PRIOR_LEFT == iterorder){
			
		} else if(ORDER_PRIOR_RIGHT == iterorder){
			
		} else {
			
		}
		return n;
	}
	/**
	 * 默认遍历方法: 中序遍历
	 * @return
	 */
	public Iterator<T> iterator(){
		//
		return parentIterator();
	}
	/**
	 * 左序遍历
	 */
	public Iterator<T> leftIterator(){
		//
		//
		return null;
	}
	/**
	 * 中序遍历
	 * @return
	 */
	public Iterator<T> parentIterator(){
		//
		return null;
	}
	/**
	 * 右序遍历
	 * @return
	 */
	public Iterator<T> rightIterator(){
		//
		return null;
	}
}
