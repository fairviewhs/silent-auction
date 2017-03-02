###
# entry-parser.py
# used to convert a google doc with the NHS items into insert commands that can be executed on the server,
# takes the file in the same directory named 'FinalPackagingList.txt' and outputs to std out. Tries to
# cleverly pull the price out of the description, sets it -1 otherwise.
###

import re

currentItem = {}
day = 1

regex = re.compile(r"\[([a-z])\]", re.IGNORECASE)

def PrintSQL(currentItem, day):
    if '$' in currentItem['description']:
        currentItem['price'] = re.findall(r'\$(\d{1,3})',currentItem['description'])
        if len(currentItem['price']) == 0:
            currentItem['price'] = "-1"
        else:
            currentItem['price'] = currentItem['price'][0]
    else:
        currentItem['price'] = "-1"
    print 'Insert into `Items` (`name`,`price`,`description`,`AuctionId`, `createdAt`, `updatedAt`) values ("'+\
        currentItem['name']+'",'+currentItem['price']+',"'+currentItem['description'].replace("\"","\\\"")+'",'+\
        str(day)+', now(), now());'+ '\n'

with open('./FinalPackagingList.txt') as f:
    for line in f:
        line = regex.sub('', line).replace('\n','').replace('\r','')
        if line == 'Thursday':
            day = 2
        if ":" in line:
            if 'name' in currentItem:
                PrintSQL(currentItem, day)
                currentItem={}
            currentItem['name'] = line.split(':')[0].replace('*', '')
            currentItem['description'] = line.split(':')[1][1:]
        elif 'name' in currentItem:
            currentItem['description'] = currentItem['description'] + line
            PrintSQL(currentItem, day)
            currentItem={}
