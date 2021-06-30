#! /Users/laiyiying/miniconda3/envs/selenium/bin/python
# coding=utf-8
from selenium import webdriver
from selenium.webdriver.support.ui import Select
import requests
import time
from bs4 import BeautifulSoup
import argparse
options = webdriver.ChromeOptions()
options.add_argument("headless")




def get_coordinate(addr):
    browser = webdriver.Chrome(executable_path=r"C:\Users\jimmy\Downloads\chromedriver_win32\chromedriver.exe",options=options)
    browser.get("http://www.map.com.tw/")
    search = browser.find_element_by_id("searchWord")
    search.clear()
    search.send_keys(addr)
    browser.find_element_by_xpath('//img[@onclick="search()"]').click() 
    time.sleep(2)
    iframe = browser.find_element_by_xpath('//iframe[@class="winfoIframe"]')
    #print(iframe)
    browser.switch_to.frame(iframe)
    #print(browser.find_element_by_xpath('//td[@class="highLightTxt"]').text)
    coor_btn = browser.find_element_by_xpath('//td[@onclick="showLocation()"]')
    coor_btn.click()
    #ipdb.set_trace() # IPDB
    coor = browser.find_element_by_xpath('//div[@id="location"]/table/tbody/tr[2]/td')
    coor = coor.text.strip().split(" ")
    lat = coor[-1].split("：")[-1]
    log = coor[0].split("：")[-1]
    browser.quit()
    print(lat,log)
    #return (lat, log)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("location",type=str, help="get the place to convert lat lng")
    args = parser.parse_args()
    get_coordinate(args.location)
