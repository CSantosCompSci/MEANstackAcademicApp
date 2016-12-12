To import new csv file go to Mongo terminal and enter following code:

mongoimport -d mydatab -c colstudents --type csv --file MajorCourses.csv(1) --headerline


To export a new csv file enter following command:

mongoexport --host localhost --db dbname --collection name --csv --out text.csv --fields ........,.....,......
# MEANstackAcademicApp
