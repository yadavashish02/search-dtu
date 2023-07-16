import json
import traceback

from pdf2image import convert_from_bytes
from pymongo import MongoClient
import requests
from bs4 import BeautifulSoup as bs
from enum import Enum
import time
from datetime import datetime
import openai


class TabId(Enum):
    LATEST_NEWS = 'tab4'
    NOTICES = 'tab1'
    FIRST_YEAR_NOTICES = 'tab8'





class Notice:
    def __init__(self, title: str, link: list, publish_date: datetime, summary: str, content: str):
        self.summary = summary
        self.content = content
        self.title = title
        self.link = link
        self.date = time.mktime(publish_date.timetuple())

    def __str__(self):
        links = ''
        for l in self.link:
            links += l[0] + ': ' + l[1] + '\n'
        return f'title: {self.title}\n\ndate: \n{self.date}\n\nlinks: \n{links}\n\nsummary: \n{self.summary}'


def getMongoClient():
    return MongoClient('mongodb+srv://**')


CLIENT = getMongoClient()


def is_doc_exists(title: str, client: MongoClient):
    db = client['dtu-notices']
    col = db.notices

    col_filter = {
        'title': title
    }

    count = col.count_documents(col_filter)
    return count != 0


def insert_notices(notices: list, client: MongoClient):
    docs = [n.__dict__ for n in notices]
    print(client['dtu-notices'].notices.insert_many(docs))


def get_dtu_main(tab_id: TabId):
    url = 'http://dtu.ac.in'
    html = requests.get(url).text
    soup = bs(html, 'html.parser')
    notices = soup.find('div', class_='tab_content', id=tab_id.value).find('div').find('ul').find_all('li',
                                                                                                      recursive=False)
    return notices


def ocr(filename):
    payload = {
        'isOverlayRequired': False,
        'apikey': '**',
        'language': 'eng'
    }

    url = 'https://api.ocr.space/parse/image'

    with open(filename, 'rb') as f:
        r = requests.post(url, files={filename: f}, data=payload)

    return r.content.decode()


def get_content(url: str):
    r = requests.get(url)
    images = convert_from_bytes(r.content)
    text = ''

    i = 1
    for image in images:
        path = f'img{i}.jpg'
        image.save(path)
        response = json.loads(ocr(path))

        if 'ParsedResults' not in response.keys():
            raise Exception('ocr error')

        obj = response['ParsedResults'][0]
        if 'ParsedText' not in obj.keys():
            raise Exception('ocr error')

        text += obj['ParsedText']

        i = i + 1
        if i == 4:
            break

    return text


def get_summary(content: str):
    if len(content) > 1000:
        content = content[:1000]

    command = '\nwrite summary for the notice above\n'

    openai.api_key = '**'
    response = openai.Completion.create(
        model="text-curie-001",
        prompt=f"{content}{command}",
        temperature=0.3,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0.34
    )

    if 'choices' not in response.keys():
        raise Exception('openai error')

    obj = response['choices'][0]

    if 'text' not in obj.keys():
        raise Exception('openai error')

    return obj['text']


def make_from_single(notice_html):
    a = notice_html.find('h6').find('a')
    title = a.text

    if is_doc_exists(title, CLIENT):
        raise Exception('already in database')

    if a['href'][0] == 'h':
        raise Exception('link not valid')

    link = [['Notice', 'http://dtu.ac.in' + a['href'][1:]]]
    if not notice_html.find('small'):
        raise Exception('date not found')
    date_str = notice_html.find('small').find('em').find('i').text
    date = datetime.strptime(date_str, '%d.%m.%Y')
    content = get_content(link[0][1])
    summary = get_summary(content)

    return Notice(title, link, date, summary, content)


def make_notice(notice_html):
    a = notice_html.find('h6').find('a')
    title = a.text

    if is_doc_exists(title, CLIENT):
        raise Exception('already in database')

    if a.has_attr('href'):
        return make_from_single(notice_html)

    link_arr = []

    links = notice_html.find_all('a', recursive=False)
    for link in links:
        li = link['href']
        l: str
        if li[0] == 'h':
            l = li
        else:
            l = 'http://dtu.ac.in' + link['href'][1:]

        link_arr.append([link.find('small').text.replace('|', '').strip(), l])

    date_str = notice_html.find('small', recursive=False).find('em').find('i').text
    date = datetime.strptime(date_str, '%d.%m.%Y')
    content = get_content(link_arr[0][1])
    summary = get_summary(content)

    return Notice(title, link_arr, date, summary, content)


notices_html = get_dtu_main(TabId.NOTICES)
notices = []
for n_html in notices_html:
    try:
        nt = make_notice(n_html)
        print(nt)
        notices.append(nt)
    except Exception as e:
        traceback.print_exc()
        if str(e) == 'already in database':
            break
        continue

insert_notices(notices, CLIENT)
