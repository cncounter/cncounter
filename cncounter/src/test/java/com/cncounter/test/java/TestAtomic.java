package com.cncounter.test.java;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicInteger;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

/**
 * 测试AtomicInteger与普通int值在多线程下的递增操作
 */
public class TestAtomic {

	// 原子Integer递增对象
	public static AtomicInteger counter_integer;// = new AtomicInteger(0);
	// 一个int类型的变量
	public static int count_int = 0;

	@Before
	public void setUp() {
		// 所有测试开始之前执行初始设置工作
		counter_integer = new AtomicInteger(0);
	}

	@Test
	public void testAtomic() throws InterruptedException {
		// 创建的线程数量
		int threadCount = 100;
		// 其他附属线程内部循环多少次
		int loopCount = 10000600;
		// 控制附属线程的辅助对象;(其他await的线程先等着主线程喊开始)
		CountDownLatch latch_1 = new CountDownLatch(1);
		// 控制主线程的辅助对象;(主线程等着所有附属线程都运行完毕再继续)
		CountDownLatch latch_n = new CountDownLatch(threadCount);
		// 创建并启动其他附属线程
		for (int i = 0; i < threadCount; i++) {
			Thread thread = new AtomicIntegerThread(latch_1, latch_n, loopCount);
			thread.start();
		}
		long startNano = System.nanoTime();
		// 让其他等待的线程统一开始
		latch_1.countDown();
		// 等待其他线程执行完
		latch_n.await();
		//

		long endNano = System.nanoTime();
		int sum = counter_integer.get();
		//
		Assert.assertEquals("sum 不等于 threadCount * loopCount,测试失败",
				sum, threadCount * loopCount);
		System.out.println("--------testAtomic(); 预期两者相等------------");
		System.out.println("耗时: " + ((endNano - startNano) / (1000 * 1000)) + "ms");
		System.out.println("threadCount = " + (threadCount) + ";");
		System.out.println("loopCount = " + (loopCount) + ";");
		System.out.println("sum = " + (sum) + ";");
	}

	@Test
	public void testIntAdd() throws InterruptedException {
		// 创建的线程数量
		int threadCount = 100;
		// 其他附属线程内部循环多少次
		int loopCount = 10000600;
		// 控制附属线程的辅助对象;(其他await的线程先等着主线程喊开始)
		CountDownLatch latch_1 = new CountDownLatch(1);
		// 控制主线程的辅助对象;(主线程等着所有附属线程都运行完毕再继续)
		CountDownLatch latch_n = new CountDownLatch(threadCount);
		// 创建并启动其他附属线程
		for (int i = 0; i < threadCount; i++) {
			Thread thread = new IntegerThread(latch_1, latch_n, loopCount);
			thread.start();
		}
		long startNano = System.nanoTime();
		// 让其他等待的线程统一开始
		latch_1.countDown();
		// 等待其他线程执行完
		latch_n.await();
		//
		long endNano = System.nanoTime();
		int sum = count_int;
		//
		Assert.assertNotEquals(
				"sum 等于 threadCount * loopCount,testIntAdd()测试失败", 
				sum, threadCount * loopCount);
		System.out.println("-------testIntAdd(); 预期两者不相等---------");
		System.out.println("耗时: " + ((endNano - startNano) / (1000*1000))+ "ms");
		System.out.println("threadCount = " + (threadCount) + ";");
		System.out.println("loopCount = " + (loopCount) + ";");
		System.out.println("sum = " + (sum) + ";");
	}

	// 线程
	class AtomicIntegerThread extends Thread {
		private CountDownLatch latch = null;
		private CountDownLatch latchdown = null;
		private int loopCount;

		public AtomicIntegerThread(CountDownLatch latch,
				CountDownLatch latchdown, int loopCount) {
			this.latch = latch;
			this.latchdown = latchdown;
			this.loopCount = loopCount;
		}

		@Override
		public void run() {
			// 等待信号同步
			try {
				this.latch.await();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			//
			for (int i = 0; i < loopCount; i++) {
				counter_integer.getAndIncrement();
			}
			// 通知递减1次
			latchdown.countDown();
		}
	}

	// 线程
	class IntegerThread extends Thread {
		private CountDownLatch latch = null;
		private CountDownLatch latchdown = null;
		private int loopCount;

		public IntegerThread(CountDownLatch latch, 
				CountDownLatch latchdown, int loopCount) {
			this.latch = latch;
			this.latchdown = latchdown;
			this.loopCount = loopCount;
		}

		@Override
		public void run() {
			// 等待信号同步
			try {
				this.latch.await();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			//
			for (int i = 0; i < loopCount; i++) {
				count_int++;
			}
			// 通知递减1次
			latchdown.countDown();
		}
	}
}
