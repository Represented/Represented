# Quick N' Dirty Script to populate the DB with zipcodes
import csv, urllib2, json, time
from pymongo import MongoClient

start = time.time()

# establish connection to db
dbName = 'representedDB'
client = MongoClient('mongodb://localhost:27017/{}'.format(dbName))
db = client[dbName]
coll = db['districts']

# add zipcode to districts for each zipcode inside the csv
count = 0
with open('free-zipcode-database-Primary.csv') as infile:
    reader = csv.reader(infile)
    for line in reader:
        zipcode = line[0]
        req = urllib2.Request('http://congress.api.sunlightfoundation.com/districts/locate?zip={}'.format(zipcode))
        response = urllib2.urlopen(req)
        data = json.loads(response.read())
        if data['results']:
            count += 1
            zipDict = data['results'][0] # no zipcode included yet
            print("found: {}".format(db.districts.find_one(zipDict)))

            existingDistrict = db.districts.find_one(zipDict)
            # either district already exists or already contains zipcode
            if existingDistrict and not (zipcode in existingDistrict['zipcodes']):
                db.districts.update(zipDict, {"$addToSet": {"zipcodes": zipcode}})
            else: # district doesn't exist yet, so make a new document
                zipDict['zipcodes'] = [zipcode]
                print("{} count: {}".format(zipDict, count))
                result = db.districts.insert_one(zipDict)
        time.sleep(1)

print("this script took {} seconds to run".format(time.time()-start))
