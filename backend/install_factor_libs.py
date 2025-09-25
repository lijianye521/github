#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
因子分析环境安装脚本
自动安装 Alphalens 和相关依赖
"""

import subprocess
import sys
import os

def install_package(package):
    """安装单个包"""
    try:
        print(f"正在安装 {package}...")
        subprocess.run([sys.executable, '-m', 'pip', 'install', package], check=True)
        print(f"✓ {package} 安装成功")
        return True
    except subprocess.CalledProcessError as e:
        print(f"✗ {package} 安装失败")
        return False

def main():
    """主安装函数"""
    print("=== 量化因子分析环境安装器 ===\n")
    
    # 升级 pip
    print("升级 pip...")
    subprocess.run([sys.executable, '-m', 'pip', 'install', '--upgrade', 'pip'])
    
    # 核心数据处理包
    core_packages = [
        'pandas',
        'numpy',
        'scipy',
        'statsmodels',
        'matplotlib',
        'seaborn',
        'plotly',
        'openpyxl',
        'xlrd'
    ]
    
    # 因子分析包
    factor_packages = [
        'alphalens-reloaded',
        'pyfolio-reloaded',
        'empyrical-reloaded'
    ]
    
    # Jupyter 环境
    jupyter_packages = [
        'jupyter',
        'notebook',
        'jupyterlab',
        'ipykernel'
    ]
    
    # 金融数据源
    data_packages = [
        'yfinance',
        'tushare',
        'akshare',
        'baostock'
    ]
    
    # 安装核心包
    print("\n--- 安装核心数据处理包 ---")
    for package in core_packages:
        install_package(package)
    
    # 安装因子分析包
    print("\n--- 安装因子分析包 ---")
    for package in factor_packages:
        install_package(package)
    
    # 安装 Jupyter 环境
    print("\n--- 安装 Jupyter 环境 ---")
    for package in jupyter_packages:
        install_package(package)
    
    # 安装金融数据源（可选）
    print("\n--- 安装金融数据源（可选） ---")
    for package in data_packages:
        install_package(package)
    
    print("\n=== 安装完成 ===")
    print("\n下一步:")
    print("1. 准备好您的 Excel 数据文件，放在 ./data/ 目录下")
    print("2. 启动 Jupyter: jupyter notebook")
    print("3. 打开 factor_analysis_example.ipynb 文件")
    print("4. 修改 excel_file_path 变量指向您的数据文件")
    print("5. 运行笔记本进行因子分析")

if __name__ == "__main__":
    main() 