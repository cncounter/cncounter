package com.cncounter.util.math;

import java.util.Random;

/**
 * 随机数工具
 * @author Administrator
 *
 */
public class RandomUtil {

	/**
	 * 下一个随机数
	 * @param max 一个最大值,建议为 int 正整数.
	 * @return 返回 [1～max]
	 */
	public static int nextRandom(int max){
		// 伪随机数
		Random random = new Random(System.nanoTime());
		//
		int next = random.nextInt(max);
		//
		Long mod = System.currentTimeMillis() % next;
		//
		int seed = mod.intValue();
		//
		Random realRandom = new Random(seed + random.nextInt());
		//
		int result = realRandom.nextInt(max);
		result = result + 1;
		//
		if(result > max){
			result = random.nextInt() % max;
		}
		//
		return result;
	}
}
