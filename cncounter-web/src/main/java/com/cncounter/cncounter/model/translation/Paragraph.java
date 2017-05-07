package com.cncounter.cncounter.model.translation;

import com.cncounter.cncounter.model.translation.api.TranslationApi;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 段落
 */
public class Paragraph extends TranslationElement {
    //
    public static final ExecutorService threadPool = Executors.newFixedThreadPool(2, new ThreadFactory() {
        @Override
        public Thread newThread(Runnable r) {
            Thread thread = new Thread(r);
            thread.setDaemon(true);
            return thread;
        }
    });
    //
    public boolean isCode = false;

    public static int LEN_LIMIT = 200;
    // 问号，句号
    public static String SENTENCE_DEP_REGEX = ".";

    private List<TranslationElement> paraElementList = new ArrayList<TranslationElement>();

    public Paragraph(){
        super(TYPE_PARAGRAPH);
    }

    public void setOriginalContent(String originalContent) {
        this.originalContent = originalContent;
        // 处理拆分元素
        List<TranslationElement> elementList = splitPara2Sentence(originalContent);
        //
        this.paraElementList.addAll(elementList);
    }

    private static List<TranslationElement> splitPara2Sentence(String content){
        List<TranslationElement> elementList = new ArrayList<TranslationElement>();

        // 如果是空白
        if(content.trim().isEmpty()){
            // 当做分隔符号
            SentenceSep sep = new SentenceSep();
            sep.setOriginalContent(content);
            elementList.add(sep);
            return elementList;
        }
        // 处理 HTML 标签
        if(allAreHTML(content)){
            List<TranslationElement> sentenceList = content2SingleSentence(content);

            if(null != sentenceList){
                elementList.addAll(sentenceList);
            }
            //
            return elementList;
        }

        if(isPreCode(content)){
            List<TranslationElement> sentenceList = content2SingleSentence(content);

            if(null != sentenceList){
                elementList.addAll(sentenceList);
            }
            //
            return elementList;
        }
        // 处理 ol, ul
        if(isOL_UL(content)){
            List<TranslationElement> sentenceList = parseOL_UL(content);

            if(null != sentenceList){
                elementList.addAll(sentenceList);
            }
            //
            return elementList;
        } else if(isGT(content)){
            List<TranslationElement> sentenceList = parseOL_UL(content);

            if(null != sentenceList){
                elementList.addAll(sentenceList);
            }
            //
            return elementList;
        } else if(isGTStart(content)){
            // 不翻译,直接包装为符号
            // 当做分隔符号
            SentenceSep sep = new SentenceSep();
            sep.setOriginalContent(content);
            elementList.add(sep);
            return elementList;
        }
        // TODO 可能还有点问题
        // 拆分长内容
        List<TranslationElement> restList = parseLongContent(content);
        //
        elementList.addAll(restList);

        //
        return elementList;
    }

    private static List<TranslationElement> parseHasCodeContent(String content){

        List<TranslationElement> elementList = new ArrayList<TranslationElement>();
        // 包含源码符号...

        boolean prevNotIsCode = false;
        //
        String rest = content;
        while(rest.contains("`")){
            //
            int index = rest.indexOf("`");
            String preContent =rest.substring(0, index);
            rest = rest.substring(index + 1);

            // 增加分隔符
            SentenceSep sep = new SentenceSep();
            sep.setOriginalContent("`");
            //
            prevNotIsCode = !prevNotIsCode;
            //
            if(null == preContent || preContent.isEmpty()){
                elementList.add(sep);
                continue;
            }
            //
            if(prevNotIsCode){ // 之前的部分不是 code,
                // 递归
                List<TranslationElement> restList = parseLongContent(preContent);
                //
                elementList.addAll(restList);
            } else {
                // 是代码
                SentenceSep sentence = new SentenceSep();
                sentence.setOriginalContent(preContent);
                elementList.add(sentence);
            }
            elementList.add(sep);
        }
        // 最后的部分
        if(null != rest && !rest.isEmpty()){
            // 递归
            List<TranslationElement> restList = parseLongContent(rest);
            //
            elementList.addAll(restList);
        }
        //
        return elementList;

    }


    private static List<TranslationElement> parseLongContent(String content){

        List<TranslationElement> elementList = new ArrayList<TranslationElement>();
        // 包含源码符号...
        if(content.contains("`")){
            elementList = parseHasCodeContent(content);
            //
            return elementList;
        }

        // 长度
        int len = content.length();
        if(len <= LEN_LIMIT){ // 小于限值，不再拆分
            // 特殊情况,以 n 个#号开头
            //
            List<TranslationElement> sentenceList = content2SingleSentence(content);

            if(null != sentenceList){
                elementList.addAll(sentenceList);
            }
            //
            return elementList;
        }

        String text = content.substring(0, LEN_LIMIT);
        //int lastIndex = text.lastIndexOf("\n");
        int lastIndex = getLastParaSepratorIndex(text);
        if(lastIndex > -1){
            // 找到,则构造元素
            String left_str = content.substring(0, lastIndex);
            if(null != left_str && false== left_str.trim().isEmpty()){
                //
                Sentence sentence = new Sentence();
                sentence.setOriginalContent(left_str);
                elementList.add(sentence);
            } else {
                // 当做分隔符号
                SentenceSep sep = new SentenceSep();
                sep.setOriginalContent(content);
                elementList.add(sep);
            }
            //
            if(lastIndex < len - 2){
                // 摘出符号
                String symbol = content.substring(lastIndex, lastIndex+1);
                SentenceSep sep2 = new SentenceSep();
                sep2.setOriginalContent(symbol); //
                elementList.add(sep2);
                //
                // 接着继续往下 + 1
                String rest = content.substring(lastIndex+1);
                // 递归
                List<TranslationElement> restList = parseLongContent(rest);
                //
                elementList.addAll(restList);
            }
        }

        //
        return elementList;
    }


    private static List<TranslationElement> parseOL_UL(String origContent){
        List<TranslationElement> elementList = new ArrayList<TranslationElement>();

        origContent = origContent.replace("\r\n", "\n");
        //
        String[] linesArray = origContent.split("\n");
        int lineNum = linesArray.length;
        //
        String regUL = "^(\\s*\\-\\s).*";
        String regOL = "^(\\s*\\d+\\.\\s).*";
        String regGT = "^(\\s*>\\s+).*";
        //
        Pattern patternUL = Pattern.compile(regUL);
        Pattern patternOL = Pattern.compile(regOL);
        Pattern patternGT = Pattern.compile(regGT);
        //
        for(String line : linesArray){
            //
            Matcher matcherUL = patternUL.matcher(line);
            Matcher matcherOL = patternOL.matcher(line);
            Matcher matcherGT = patternGT.matcher(line);
            //
            String prefix = "";
            // 只找第一个
            if (matcherUL.find()){
                prefix = matcherUL.group(1);
            } else if (matcherOL.find()){
                prefix = matcherOL.group(1);
            } else if (matcherGT.find()){
                prefix = matcherGT.group(1);
            }
            // 分隔符号
            SentenceSep sep = new SentenceSep();
            sep.setOriginalContent(prefix);
            elementList.add(sep);
            //
            int len = prefix.length();
            String content = line.substring(len);
            //

            List<TranslationElement> restList = parseLongContent(content);
            //
            elementList.addAll(restList);
            //
            // 换行符号
            SentenceSep sep2 = new SentenceSep();
            sep2.setOriginalContent("\n"); //
            elementList.add(sep2);
        }
        return elementList;
    }

    // 处理 UL,OL
    private static boolean isOL_UL(String content) {
        //
        boolean match = false;
        int wholeMatchingNum = 0;
        //
        String origContent = content;
        if(null == origContent){
            origContent = "";
        }
        origContent = origContent.replace("\r\n", "\n");
        //
        String[] linesArray = origContent.split("\n");
        int lineNum = linesArray.length;
        //
        for(String line : linesArray){
            //
            if(line.matches("^\\s*\\-\\s+.*")){
                wholeMatchingNum += 1;
            } else if(line.matches("^\\s*\\d+\\.\\s.*")){
                wholeMatchingNum += 1;
            }else if(line.trim().isEmpty()){
                wholeMatchingNum += 1;
            }
        }
        // 匹配不需要翻译的code类型
        if(wholeMatchingNum == lineNum){
            match = true;
        }

        //
        return  match;
    }

    // 整个段落是代码
    private static boolean isPreCode(String content) {
        //
        content = content.trim().replace("\r\n", "\n");
        String codeWraper = "```";
        String singleCodeWraper = "`";
        String[] lineArray = content.split("\n");
        int lineSize = lineArray.length;
        if(1 == lineSize){
            if(content.startsWith(singleCodeWraper) && content.endsWith(singleCodeWraper)){
                return true;
            }
        } else if(lineSize > 1){
            //
            String startLine = lineArray[0];
            String endLine = lineArray[lineSize - 1];
            if(startLine.equals(codeWraper)){
                return true;
            } else if(endLine.equals(codeWraper)){
                return true;
            }
        }
        //
        //
        return false;
    }
    // 处理大于号GT
    private static boolean isGT(String content) {
        //
        boolean match = false;
        int wholeMatchingNum = 0;
        //
        String origContent = content;
        if(null == origContent){
            origContent = "";
        }
        origContent = origContent.replace("\r\n", "\n");
        //
        String[] linesArray = origContent.split("\n");
        int lineNum = linesArray.length;
        //
        for(String line : linesArray){
            //
            if(line.matches("^\\s*>\\s+.*")){
                wholeMatchingNum += 1;
            } else if(line.trim().isEmpty()){
                wholeMatchingNum += 1;
            }
        }
        // 匹配不需要翻译的code类型
        if(wholeMatchingNum == lineNum){
            match = true;
        }

        //
        return  match;
    }


    // 处理大于号GT,段落,不翻译
    private static boolean isGTStart(String content) {
        //
        boolean match = false;
        boolean isGTStart = false;
        int wholeMatchingNum = 0;
        //
        String origContent = content;
        if(null == origContent){
            origContent = "";
        }
        origContent = origContent.replace("\r\n", "\n");
        //
        origContent = origContent.trim();
        if(origContent.matches("^\\s*>\\s+.*")){
            isGTStart = true;
        }
        //
        String[] linesArray = origContent.split("\n");
        int lineNum = linesArray.length;
        //
        for(String line : linesArray){
            //
            if(line.matches("^\\s*>\\s+.*")){
                wholeMatchingNum += 1;
            } else if(line.trim().isEmpty()){
                wholeMatchingNum += 1;
            }
        }
        // 匹配不需要翻译的code类型
        if(wholeMatchingNum == lineNum){
            match = true;
        }

        // 以GT开头,却不匹配的情况
        return isGTStart  && !match;
    }

    private static boolean allAreHTML(String content) {
        //
        boolean match = false;
        int wholeMatchingNum = 0;
        //
        String origContent = content;
        if(null == origContent){
            origContent = "";
        }
        origContent = origContent.replace("\r\n", "\n");
        //
        String[] linesArray = origContent.split("\n");
        int lineNum = linesArray.length;
        //
        for(String line : linesArray){
            //
            if(line.matches("^\\s*<.*")){
                wholeMatchingNum += 1;
            }else if(line.trim().isEmpty()){
                wholeMatchingNum += 1;
            }
        }
        // 匹配不需要翻译的code类型
        if(wholeMatchingNum == lineNum){
            match = true;
        }

        //
        return  match;
    }


    private static List<TranslationElement> content2SingleSentence(String content) {
        List<TranslationElement> sentenceList = new ArrayList<TranslationElement>();

        if(null == content){
            return null;
        }
        // 匹配标题
        if(content.matches("^(\\#+)\\B+.*")){
            //
            String sharpStr = "";
            while(content.startsWith("#")){
                sharpStr += "#";
                content = content.substring(1);
            }
            while(content.startsWith(" ")){
                sharpStr += " ";
                content = content.substring(1);
            }
            //
            SentenceSep seps = new SentenceSep();
            seps.setOriginalContent(sharpStr); //
            sentenceList.add(seps);
        }


        Sentence sentence = new Sentence();
        sentence.setOriginalContent(content);
        sentenceList.add(sentence);
        //
        return sentenceList;
    }

    private static int getLastParaSepratorIndex(String text){
        // 取最大值
        int theLastIndex = -1;

        // \n 优先级高
        // 按优先级
        String[] seps = {"\n", ".", "?", ":", ",", " "};
        //
        for(int i = 0; i < seps.length; i++){
            String sep = seps[i];
            int lastIndex = text.lastIndexOf(sep);
            if(lastIndex > theLastIndex){
                theLastIndex = lastIndex;
                return theLastIndex; // 直接返回
            }
        }

//        if(theLastIndex < 0){
//            // 使用空格
//            int lastIndex = text.lastIndexOf(" ");
//            if(lastIndex > theLastIndex){
//                theLastIndex = lastIndex;
//            }
//        }

        return theLastIndex;

    }

    /**
     * 翻译
     *
     * @param translationApi
     */
    @Override
    public void translation(final TranslationApi translationApi) {
        //? 根据原内容,拆分到段落元素中
        if(this.isCode){
            this.setTranslationContent("");
            return;
        }
        // 依次遍历子元素，然后执行翻译， 接着写入译文内容
        // 如果符合不翻译规则, 则不翻译:
        if(matchSourceCodeType()){
            this.setTranslationContent("");
            return;
        }
        if(allAreHTML(this.originalContent)){
            this.setTranslationContent("");
            return;
        }
        if(null == paraElementList || paraElementList.isEmpty()){
            return;
        }
        //
        StringBuilder builder = new StringBuilder();
        // 栅栏
        final CountDownLatch latch = new CountDownLatch(paraElementList.size());
        //
        Iterator<TranslationElement> iteratorT = paraElementList.iterator();
        while(iteratorT.hasNext()){
            final TranslationElement element = iteratorT.next();

            Future future = threadPool.submit(new Runnable() {
                @Override
                public void run() {
                    element.translation(translationApi);
                    latch.countDown();
                }
            });
            // future.get(); // 等待
            // futureList.add(future);
        }
        // 最长等待3分钟
        try {
            latch.await(3, TimeUnit.MINUTES);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // 获取内容
        Iterator<TranslationElement> iteratorT2 = paraElementList.iterator();
        while(iteratorT2.hasNext()){
            final TranslationElement element = iteratorT2.next();
            String dest = element.getTranslationContent();
            builder.append(dest);
        }
        //
        this.setTranslationContent(builder.toString());
    }

    private boolean matchSourceCodeType() {
        //
        boolean match = false;
        int wholeMatchingNum = 0;
        //
        String origContent = this.originalContent;
        if(null == origContent){
            origContent = "";
        }
        origContent = origContent.replace("\r\n", "\n");
        //
        String[] linesArray = origContent.split("\n");
        int lineNum = linesArray.length;
        //
        for(String line : linesArray){
            //
            if(line.startsWith("\t")){
                wholeMatchingNum += 1;
            } else if(line.startsWith("    ")){
                wholeMatchingNum += 1;
            } else if(line.trim().isEmpty()){
                wholeMatchingNum += 1;
            }
        }
        // 匹配不需要翻译的code类型
        if(wholeMatchingNum == lineNum){
            match = true;
        }

        // 取反
        return  match;
    }
}
