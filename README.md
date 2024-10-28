# Data science project

This is your interactive journey into understanding systematic racism through a dynamic map visualization of pullover statistics in New York.

See [technical report](/technical-report.md) for details.

# Development

- **web** subdirectory contains code for the actual website.
- **nb** contains annotated notebook files for data analysis and generating the machine learning model.
- **ml_server** contains the code for the prediction service using python bottles.

To launch the project locally, you'd need to download [maptiler's New York background tiles](https://data.maptiler.com/downloads/north-america/us/new-york/), cross reference census data with tract's geometry, import it to postgis along with pullovers and run `./martin 'postgresql://postgres:password@localhost/nyall?sslmode=disable' ./nymap.mbtiles --default-srid 4326` to start it. Alternatively, you can run `pg_restore -d nyall data/nyall.dump` to get all the necessary data to run the aforementioned.
