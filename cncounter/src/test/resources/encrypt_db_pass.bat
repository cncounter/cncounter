@rem 生成Druid使用的加密密码,要求配置了JAVA对应的Path
@rem 请在部署后的classes文件夹中执行,然后替换对应的记录即可.
@rem cd 的目的是跳到有druid-xxx.jar的 lib 目录执行
@echo 正在生成Druid使用的加密密码......
cd ..\lib
java -cp druid-1.0.14.jar com.alibaba.druid.filter.config.ConfigTools eoNRNBgRk397mVyu66MHYuZDsepCeZ8A	> ..\classes\pass.txt

pause