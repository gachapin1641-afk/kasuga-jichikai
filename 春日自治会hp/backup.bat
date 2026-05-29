@echo off
chcp 65001 > nul

if exist bk3\style.css del bk3\style.css
if exist bk3\index.html del bk3\index.html

if exist bk2\style.css move /Y bk2\style.css bk3\style.css
if exist bk2\index.html move /Y bk2\index.html bk3\index.html

if exist bk1\style.css move /Y bk1\style.css bk2\style.css
if exist bk1\index.html move /Y bk1\index.html bk2\index.html

if exist style.css copy /Y style.css bk1\style.css
if exist index.html copy /Y index.html bk1\index.html

echo Backup done! bk1=1 bk2=2 bk3=3
pause
