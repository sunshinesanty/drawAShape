

cd %1\FrontEnd

rmdir build\static /q

WHERE yarn
IF %ERRORLEVEL% NEQ 0 goto installYarnAndRun
IF %ERRORLEVEL% EQU 0 goto run

:installYarnAndRun
cmd.exe /k "npm install -g yarn & yarn & npm run build"
goto commonexit

:run
cmd.exe /k "yarn & npm run build"
goto commonexit

:commonexit
ren build\static\js\main*.js main.js
ren build\static\js\main*.js.map main.js.map
ren build\static\css\main*.css main.css
ren build\static\css\main*.css.map main.css.map

cd %1
cd "OtherExcercise\Fibonacci"
cmd.exe /k "yarn & npm run build"

