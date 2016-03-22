package com.cncounter.test.java;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

/**
 * Created by Administrator on 2016/3/16.
 */
public class GCTest {

    public static void main(String[] args) throws InterruptedException {
        A a = new A("white");
        a = null;
        //
        long start = System.nanoTime();
        Runtime.getRuntime().gc();
        long end = System.nanoTime();
        System.out.println("gc duration(ms):" + (end - start) / (1000 * 1000));

        TimeUnit.SECONDS.sleep(1);
    }

    public static void test(){
        //
        AtomicReference c;
        Thread t;
    }
    private static ReadWriteLock lock = new ReentrantReadWriteLock();

    static class A {
        private String color;

        public A(String color) {
            this.color = color;
        }

        @Override
        public void finalize() {
            System.out.println(this.color + " cleaned");
        }
    }
}


