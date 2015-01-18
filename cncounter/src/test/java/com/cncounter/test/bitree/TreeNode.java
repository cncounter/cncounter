package com.cncounter.test.bitree;

/**
 * 二叉树节点
 * @param <T>
 */
public class TreeNode<T> {
	//
	private T current = null; // 当前内容
	//
	private TreeNode<T> parentNode; // 父节点. 可选
	private TreeNode<T> leftNode;	// 左节点 
	private TreeNode<T> rightNode;	// 右节点
	
	public T getCurrent() {
		return current;
	}
	public void setCurrent(T current) {
		this.current = current;
	}
	
	public TreeNode<T> getParentNode() {
		return parentNode;
	}
	public void setParentNode(TreeNode<T> parentNode) {
		this.parentNode = parentNode;
	}
	public TreeNode<T> getLeftNode() {
		return leftNode;
	}
	public void setLeftNode(TreeNode<T> leftNode) {
		this.leftNode = leftNode;
	}
	public TreeNode<T> getRightNode() {
		return rightNode;
	}
	public void setRightNode(TreeNode<T> rightNode) {
		this.rightNode = rightNode;
	}
}
