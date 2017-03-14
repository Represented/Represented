import csv
from datetime import datetime
#from pymongo import MongoClient
#
#client = MongoClient('mongodb://localhost:27017/wiscodb')
#
#db = client['wiscodb']
#
#coll = db['districts']

#for row in csv.reader(

with open('free-zipcode-database-Primary.csv') as infile:
    reader = csv.reader(infile)
    for line in reader:
        print(line[0]+" {}".format(type(line[0])))
