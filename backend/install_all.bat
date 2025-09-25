@echo off
echo ===================================
echo 股票因子分析环境安装脚本
echo ===================================
echo.

echo 升级 pip...
python -m pip install --upgrade pip

echo.
echo 安装核心数据处理包...
python -m pip install pandas numpy scipy statsmodels matplotlib seaborn plotly openpyxl xlrd

echo.
echo 安装因子分析包...
python -m pip install alphalens-reloaded pyfolio-reloaded empyrical-reloaded

echo.
echo 安装 Jupyter 环境...
python -m pip install jupyter notebook jupyterlab ipykernel

echo.
echo 安装金融数据源（可选）...
python -m pip install yfinance tushare akshare baostock

echo.
echo ===================================
echo 安装完成！
echo ===================================
echo.
echo 下一步:
echo 1. 准备好您的 Excel 数据文件，放在 ./data/ 目录下
echo 2. 启动 Jupyter: jupyter notebook
echo 3. 打开 factor_analysis_example.ipynb 文件
echo 4. 修改 excel_file_path 变量指向您的数据文件
echo 5. 运行笔记本进行因子分析
echo.
pause 