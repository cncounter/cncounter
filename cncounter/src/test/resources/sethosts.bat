set duapphosts=127.0.0.1        sqld.duapp.com
set redisduapphosts=127.0.0.1        redis.duapp.com
echo %duapphosts% >> C:\Windows\System32\drivers\etc\hosts
echo %redisduapphosts% >> C:\Windows\System32\drivers\etc\hosts