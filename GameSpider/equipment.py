# 王者荣耀 装备信息爬取
#coding=utf-8
import time, re
import requests
from openpyxl import Workbook
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver import ActionChains

def do_spider():
    url = "https://pvp.qq.com/web201605/item.shtml#none"
    browser = webdriver.Chrome()
    browser.get(url)
    browser.implicitly_wait(3)
    actions = ActionChains(browser)

    soup = BeautifulSoup(browser.page_source, "html.parser")
    ul = soup.find(id="Jlist-details");
    li_list = ul.findAll('li')
    print('total li is ', len(li_list))
    index = 1
    data_lists = []
    for item in li_list:
        print('read row ', index)
        icon_url = item.find('img')['src']
        #//game.gtimg.cn/images/yxzj/img201606/itemimg/1121.jpg
        start = icon_url.find('itemimg/')
        imageName = icon_url[start+8:]
        data_id = imageName[0:-4]
        data_Category = data_id[1:2]
        data_Thumbnail = '..\\assets\\images\\kinghonour\\zhuangbei\\' + imageName
        downloadImage(icon_url, imageName)
        xpath = '//*[@id="Jlist-details"]/li[' + str(index) + ']/a'
        ele = browser.find_element_by_xpath(xpath)
        actions.move_to_element(ele).perform()

        time.sleep(1)
        soup = BeautifulSoup(browser.page_source, "html.parser")
        pop = soup.find(id="itemFromTop");
        data_Name = pop.find(id="Jname").text;
        data_SellPrice = pop.find(id="Jprice").text[3:];
        data_BuyPrice = pop.find(id="Jtprice").text[3:];
        data_Desc1 = pop.find(id="Jitem-desc1").text;
        data_Desc2 = pop.find(id="Jitem-desc2").text;
        data_Index = index

        index = index+1
        time.sleep(1)
        data_lists.append([data_id,data_Category,data_Name,data_Thumbnail,data_BuyPrice,data_SellPrice,data_Desc1,data_Desc2,data_Index])
    print_data_lists_excel(data_lists)

def downloadImage(url, name):
    response = requests.get('http:'+ url)
    img = response.content

    img_path = "C:\\ProjectMy\\GameDisplay\\GameDisplayWeb\\src\\assets\\images\\kinghonour\\zhuangbei\\" + name

    with open(img_path, 'wb') as f:
        f.write(img)

def print_data_lists_excel(data_lists):
    wb = Workbook()
    ws = wb.create_sheet(title="sheet1")
    for bl in data_lists:
        ws.append([bl[0], float(bl[1]), bl[2], bl[3], bl[4], bl[5], bl[6], bl[7], bl[8]])

    save_path = 'C:\\ProjectMy\\GameDisplay\\GameDisplayWeb\\src\\assets\\images\\kinghonour\\zhuangbei\\zhuangbei.xlsx'
    wb.save(save_path)


if __name__ == '__main__':
    do_spider()