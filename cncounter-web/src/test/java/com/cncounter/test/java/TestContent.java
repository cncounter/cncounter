package com.cncounter.test.java;

//imports skipped for brevity
public class TestContent {

    public static void main(String[] args)
            throws Exception {
        String content = "###my name is xiaoming.";
        //
        if(content.matches("^(\\#+)\\B+.*")){
            //
            System.out.println("matches");
        } else {

            System.out.println("not matches!!!!");
        }
    }
}
