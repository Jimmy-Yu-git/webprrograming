# WPfinal
#  localhost 安裝之詳細步驟
* cd frontend yarn install
* cd backend yarn install
* 由於有額外用到python爬蟲故需安裝相關套件
* 下載 chromedriver
* pip install -r requirements.txt(已附在資料夾裡)
* windows 用戶需修改getGeocode.py,將chromedriver.exe導到正確位置
* 在backend/src/routes/api/ProductinfoRoute 輸入 python執行檔位置
![]('./img/im0.png')
* cd Finalshop yarn start
* cd Finalshop yarn server
* 即可正常執行
* 如執行出現錯誤可先執行python檔確認套件是否安裝齊全
* (python getGeocode.py +地址)
#這個服務在做什麼？
###有鑑於常常在便利商店看到打折商品但是卻往往還是沒有賣完,一旦超過當天12點食物即會被丟棄浪費,許多店家也為了保持食物的品質及各種法規浪費了許多食物資源,此舉不但造成浪費資源也使店家無法將進貨成本轉換成該有的獲利,殊不知其實有許多消費者虎視眈眈著那些打折商品但缺乏一個線上可查詢的系統造成資訊流通不良,往往造成消費者根本不知道有打折的商品以及還剩多少庫存或是抵達時才發現商品已經過期,這種不確定性也造成消費者購買即期商品的動力減少,故我們希望打造一個可以讓賣家上傳即期商品的網站,讓消費者跟商家間有一個及時而且透明的網站服務。

##使用之第三方套件、框架、程式碼
* FRONTEND 使用了react, react hooks, axio,Antd,matarialUI,react-icons,react-dom,Link,usehistory,redirect,react-multiple-image-input,@react-google-maps
* BACKEND 使用了  Express,Mongoose,Node.js 
* pyhton:selenium,BeautifulSoup,chromedriver
* DB: Mongodb
* other: babel
#  服務內容(即期商品賣場)
* yarn start 之後應該看到首頁如下
![]('./img/im1.png')
## 還未有帳號之商家可點選註冊以創建帳號,也可以在未登入狀態下瀏覽首頁
* 如註冊之Usernsme已有人使用過即會提醒已有人使用過並要求重新申請
* 如註冊成功即會自動導到登入頁面
![]('./img/im2.png')
## 未登入直接瀏覽首頁
*可以看到dashboard 除了首頁和地圖外不會有其他功能
![]('./img/im5.png')
## 註冊完成即可登入
* 登入時如果是Username錯誤會顯示找不到用戶並要求重新輸入
* 如果是密碼錯誤即會顯示密碼錯誤並要求重新輸入
* 如未有帳號可點選 底下"Don't have an account? Sign Up" 導到註冊頁面進行註冊
* 登入成功即會自動導到首頁
![]('./img/im3.png')
## 登入完成之首頁
* 可以看到dashboard出現我的賣場,代表可以開始建立自己的專屬商場!
* 右上角Appbar也會顯示現在用戶以及登出按鈕
* 按登出即可登出頁面並自動導向首頁
![]('./img/im4.png')

## 按下dashboard的地圖按鈕
* 即可看到已註冊商家所在位置
* 點選特定商家即可看到商品資訊
![]('./img/im6.png')

## 點選首頁每項商品右上角的button
* 即可看到商品詳細資訊
* 可自動計算原始與特價之折扣
* 按"點我看推薦可以看到"由相近商品名稱及地區之3項推薦
![]('./img/im7.png')
![]('./img/im8.png')
## 首頁點選搜尋框可選擇由(商品/商家/地址/ALL)搜尋相對應的商品
* 商品/商家/地址 由含有對應字串搜尋
* ALL為顯示所有商品

![]('./img/im9.png')
## 點選我的賣場可管理賣場
* 如未有商品及跳出 "未有上架商品之alert"
* ![]('./img/im10.png')
* 按右上角"+"號button可以進入新增商品頁面
* 點選商品照圖案即可放入對應之商品/商家照
* 按出送出之後及等待python檔依照輸入地址爬到之經緯度及所輸入之資訊存到mongo
* 儲存完成即會自動跳到我的賣場頁面
*  ![]('./img/im11.png')
## 修改或刪除特定商品
* 選取想要修改或刪除之商品後右上角會顯示出刪除或修改的button
* 選取刪除即刪除該品項
* 選取編輯之button集會導到編輯該品項之頁面
* 更正想修改之資料按下送出後即更新商品
* ps:若更改的是商品名稱即會將其視為新增一新商品並重複新增商品之步驟
* 新修改或新增之品項會放在list的最下面
* ![]('./img/im12.png')
## 搜尋我的賣場內之特定商品
* 同首頁之搜尋功能可以搜尋我的賣場之特定類別品項
![]('./img/im13.png')
## 按下登出即可導回主畫面
![]('./img/im14.png')