rem --- get date ----
set yyyy=%DATE:~0,4%
set mm=%DATE:~5,2%
set dd=%DATE:~8,2%
set curdate=%yyyy%-%mm%-%dd%

set logFileName=generator_log_%curdate%.txt

echo -----------%curdate%:%time:~0,2%%time:~3,2%%time:~6,2%----------- >> %logFileName%

rem --- run generator ---
java -jar mybatis-generator-core-1.3.2.jar -configfile generatorConfig.xml -overwrite >> %logFileName%