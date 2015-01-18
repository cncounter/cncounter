package com.cncounter.test.bitree;

/**
 * 记录
 */
public class Record {

	private static final boolean DEBUG_MODE = false;
	private static volatile int ID_Value = 1;
	private int id; // 唯一标识
	private String wild = "*"; // 通配符
	private String entity;//主语，
	private String relation;//谓语
	private String property;//宾语
	
	
	
	private Record(String entity, String relation, String property) {
		super();
		this.id = ID_Value++;
		this.entity = entity;
		this.relation = relation;
		this.property = property;
	}
	
	public static int nextID(){
		return ID_Value;
	}

	public static Record makeRecord(String entity, String relation, String property) {
		Record record = new Record(entity, relation, property);
		//
		return record;
	}

	public static Record makeQuery(String wild, String entity, String relation, String property) {
		Record record = new Record(entity, relation, property);
		record.wild = wild;
		//
		return record;
	}

	public boolean entity(){
		if("*".equals(entity)){
			return false;
		}
		return true;
	}
	public boolean relation(){
		if("*".equals(relation)){
			return false;
		}
		return true;
	}
	public boolean property(){
		if("*".equals(property)){
			return false;
		}
		return true;
	}
	
	public int getId() {
		return id;
	}
	public String getWild() {
		return wild;
	}
	public void setWild(String wild) {
		this.wild = wild;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEntity() {
		return entity;
	}
	public void setEntity(String entity) {
		this.entity = entity;
	}
	public String getRelation() {
		return relation;
	}
	public void setRelation(String relation) {
		this.relation = relation;
	}
	public String getProperty() {
		return property;
	}
	public void setProperty(String property) {
		this.property = property;
	}
	@Override
	public String toString() {
		//
		int len = 8;
		//
		return "" + alignRight(entity,len) + "" + alignRight(relation,len) + "" + alignRight(property,len) ;
	}
	
	public boolean matches(Record other){
		boolean result = false;
		//
		if(null == other){
			return result;
		}
		//
		String wildcard = other.wild;//"*"; // 通配符
		String e = other.entity;
		String r = other.relation;
		String p = other.property;
		//
		if(null == e || null==e || null == p){
			return result;
		}
		//
		e = e.trim();
		r = r.trim();
		p = p.trim();
		//
		if(e.equals(wildcard)){
			// 直接进入下一项
		} else if(e.equalsIgnoreCase(entity)){
			// 相等,继续
		} else {
			debug("主语项 "+ e + " 不匹配" + entity);
			return result;
		}
		//
		if(r.equals(wildcard)){
			// 直接进入下一项
		} else if(r.equalsIgnoreCase(relation)){
			// 相等,继续
		} else {
			debug("谓语项 "+ r + " 不匹配" + relation);
			return result;
		}
		//
		if(p.equals(wildcard)){
			// 直接进入下一项
		} else if(p.equalsIgnoreCase(property)){
			// 相等,继续
		} else {
			debug("宾语项 "+ p + " 不匹配" + property);
			return result;
		}
		// 执行到此,没有校验失败
		result = true;
		//
		return result;
	}
	
	private void debug(Object info){
		if(DEBUG_MODE){
			System.out.println(info);
		}
	}
	// 向右对齐
	private String alignRight(String str, int targetLen) {
		return align(str, targetLen, false);
	}
	private String align(String str, int targetLen,  boolean isleft){
		String result = "";
		//
		if(null == str){
			str = "";
		}
		//
		String	placeHolder = " ";
		//
		int len = str.length();
		int lenP = placeHolder.length();
		//
		for (int i = len; i < targetLen; i+=lenP) {
			if(isleft){
				result = placeHolder + result;
			} else {
				result = result + placeHolder;
			}
		}
		// 先加,后截
		//
		int lenN = result.length();
		if(targetLen < lenN){
			//
			return isleft ? str.substring(0, targetLen-1) : str.substring(lenN - targetLen, lenN-1);
		}
		//
		return result;
	}
}
