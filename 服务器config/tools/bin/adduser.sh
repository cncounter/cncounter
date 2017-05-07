#! /bin/bash
groupadd dev 
for username in $(more users.list)
do 
if [ -n $username ]
then 
  useradd -g dev -G dev -m $username
  echo 
  echo $username"YiboShi@1102_Yhbj#1901" | passwd --stdin $username
  echo 
  echo "user $username 's password is changed "
else "The username is null"
fi
done
