import csv
from datetime import datetime
from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/wiscodb')

db = client['wiscodb']

coll = db['districts']

#for row in csv.reader(

with open('wisconsin_zips.txt') as infile:
    reader = csv.reader(infile)
    for zipcode in reader:
        if len(zipcode) == 3 and zipcode[0].isdigit():
            # for some reason, congress.gov says that Wisconsin is state 55
            # http://www2.census.gov/geo/relfiles/cdsld13/55/zc_cd_delim_55.txt
            if int(zipcode[0]) == 55: # is Wisconsin
                print zipcode
                result = db.district.insert_one(
                        {
                            "state": "WI",
                            "district": zipcode[2],
                            "zipcodes": [zipcode[1]]
                        }
                )

##result = db.districts.insert_one(
##    {
##        "address": {
##            "street": "2 Avenue",
##            "zipcode": "10075",
##            "building": "1480",
##            "coord": [-73.9557413, 40.7720266]
##        },
##        "borough": "Manhattan",
##        "cuisine": "Italian",
##        "grades": [
##            {
##                "date": datetime.strptime("2014-10-01", "%Y-%m-%d"),
##                "grade": "A",
##                "score": 11
##            },
##            {
##                "date": datetime.strptime("2014-01-16", "%Y-%m-%d"),
##                "grade": "B",
##                "score": 17
##            }
##        ],
##        "name": "Vella",
##        "restaurant_id": "41704620"
##    }
##)
##
