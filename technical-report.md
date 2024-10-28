---
title: Technical report for the datascience project
subtitle: datascience.kuchta.dev
author: Mariusz Kuchta, Alexei Zverev, Yusuf Ünlü
---

## Visualization technology stack and machine learning
We knew that highlighting the issue of systematic racism - a topic of great importance, adequately, in a novel way would require us to adopt various ways of data visualization. We wanted something interactive and novel. We set on creating an interactive "guide" that would involve the user going through multiple steps to have a look on the issue from various angles. This is exactly what we have done and it is available at https://datascience.kuchta.dev.

Our visualization step 1 through step 4 contains a map. There are three key elements that come at play that makes this visualization possible. First, the **client** which is a browser running our website written with the help of html, css and javascript (no fancy react-like frameworks there). JavaScript creates an instance of MapLibre map which is part of MapLibre GL JS vector-based map rendering library offering superb performance and fairly straightforward API. On its own, it cannot really do anything useful. We needed to have some *tile source* which would send out data about the layers/geography we want to display. This is exactly what [martin](https://martin.maplibre.org/) **tile-server** provides us with. It takes geographical **data sources** and transforms them into tile data that MapLibre understands and renders based on the provided [style.json](https://maplibre.org/maplibre-style-spec/) schema. Martin can handle multiple data sources and expose them as separate *tile sources*. The NewYork's background data seen in all the steps is provided by an mbtiles file obtained from [maptiler](https://data.maptiler.com/downloads/north-america/us/new-york/). 

The data in step 2 is the raw pullover data obtained from [New York police](https://data.cityofnewyork.us/Public-Safety/NYPD-Vehicle-Stop-Reports/hn9i-dwpr/about_data) imported into a postgresql [postgis-enabled](https://postgis.net/) database. We then did coordinate conversion for where the pullover has happened from the csv's coordinate system to postgis's geom type column. This conversion enabled martin to understand the underlying geometry behind the pullovers - i.e. the exact points where they happen and having added the postgres/postgis datasource to martin, it was ready to serve tiles about the individual pullovers - all 910711 of them.

Similarly to step 3, we imported [New York's census data](https://www.nyc.gov/assets/planning/download/office/planning-level/nyc-population/census2020/nyc_detailed-race-and-ethnicity-data_2020_core-geographies.xlsx) with race details and the [NY's tracts geometry in the form of shape files](https://www.nyc.gov/site/planning/data-maps/open-data/census-download-metadata.page). The first dataset required a bit of excel transformations to fit all the races into [US's officially recognized census racial categories](https://en.wikipedia.org/wiki/Race_and_ethnicity_in_the_United_States#Racial_categories) and a csv conversion. The latter got imported using postgis's shp2pgql. A census tract is a small area distinguished for the purpose of census-keeping. We have then ran a couple Postgis transformations *(see queries.sql file)* to match the census's per tract race-divided population with the tract's geometry. As Martin pulls data from postgres/postgis the new geometry along with its metadata is now exposed, ready to be consumed by MapLibre. We wanted to visualize the population distribution in a multidimensional way, so we set on population gradient where each of the races get assigned to one of the rgb channels except the black population which is missing an assignment which is basically our 4th dimension *(for detail-curious index.js is the file where this is defined)*. Us also denotes Hawaiian, American Indian and Other as additional races, but they their contributions to the map's color would be negligible.   Furthermore clicking on a tract reveals exact numbers of the race distribution with a nice graph visualization using the [uPlot](https://github.com/leeoniya/uPlot) library.

Step 4 introduces a new component. An ml model that predicts the chances of getting searched during a pullover. We initially developed a classifier using the Random Forest algorithm. Despite an initial accuracy of 97%, the model’s precision and recall were poor due to severe class imbalance.  Vehicle search events were a small minority (around 21,000 cases compared to 800,000 non-search cases). To address this, we used the Synthetic Minority Over-sampling Technique  [SMOTE](https://machinelearningmastery.com/smote-oversampling-for-imbalanced-classification/) to balance the dataset. Our preprocessing pipeline included StandardScaler to normalize continuous features, such as racial demographics, and LabelEncoder for categorical features. 

Initial Model after SMOTE:

    Classification Report After Applying SMOTE:
    
              precision    recall  f1-score   support

       False       0.97      0.90      0.93    159707
        True       0.91      0.97      0.94    160184

    accuracy                           0.93    319891
    macro avg      0.94      0.93      0.93    319891
    weighted avg   0.94      0.93      0.93    319891

    AUC-ROC Score: 0.99

The initial Random Forest model was trained on the full, SMOTE-balanced dataset. It achieved high metrics with an AUC-ROC score of 0.98. The classification report showed strong precision (0.97 for False, 0.90 for True) and recall (0.90 for False, 0.97 for True), with an overall accuracy of 0.93. However, this model required nearly 2GB of memory, where it was impractical for deployment on our memory-constrained server.

Final Model for Server Deployment: 

    Classification Report After Applying SMOTE on Sampled Data:
              precision    recall  f1-score   support

       False       0.92      0.80      0.86     48042
        True       0.82      0.93      0.87     47952

    accuracy                           0.86     95994
    macro avg      0.87      0.86      0.86     95994
    weighted avg   0.87      0.86      0.86     95994

    AUC-ROC Score: 0.93

Due to server limitations, we created a reduced model using a 30% sample of the original dataset, with SMOTE applied to maintain balance. We optimized the Random Forest configuration with 50 estimators and a maximum depth of 15. This final model achieved an AUC-ROC score of 0.93, with a precision of 0.92 for False and 0.82 for True, and an accuracy of 0.86. To save even more resources, the model was compressed and saved using joblib. The following lists the importance of each feature  making the contribution to the output:

- **0.31180598** race of the driver
- **0.27903468** time when one gets pulled over
- **0.18968762** reported age of the driver
- **0.16471222** neighborhood they get pulled over in
- **0.03338845** type of a vehicle one gets pulled over in
- **0.02137105** sex of the driver

As one can see, even the model has picked up on the blatantly obvious racial inequality.

## Data Analysis

Step number 5 goes over the results of the analysis we did on traffic stop disparities. 

The dataset used in this study included variables such as EVNT_KEY (unique event id numer), OCCUR_DT (occurence date), OCCUR_TM (occurence time), RACE_DESC (race of individual), and ARREST_MADE_FLG (remark if arrest was made), among others. To provide context for analyzing traffic stop rates by racial group, more demographic data was acquired from the New York City Department of City Planning.

As it was discussed in our project canvas, the data analysis process included several steps, such as:

- Preliminary exploration of the data sets. This step was done in order to understand the structure of the data using tools of the python Pandas library. 
- After the raw data was visualised and analysed, we did data cleaning and preparation. We performed value imputation for columns reporting age (RPTED_AGE) and sex (SEX_CD).
- It was especially important to handle missing values of column indicating race description as this feature is central in our research. We eliminated raws with missing values of race (RACE_DESC), because imputations could give rise to errors and skew the results.
- Data cleaning and preparation was not necessary for the columns related to vehicle searches (VEH_SEARCHED_FLG), arrests (ARREST_MADE_FLG), vehicle seizures (VEH_SEIZED_FLG), checkpoint flag (VEH_CHECKPOINT_FLG), consent for search (VEH_SEARCH_CONSENT_FLG), force used (FORCE_USED_FLG), or summons issued (SUMMON_ISSUED_FLG). Moreover, there were no duplicate entries in the data.
- Latitude, longitude, and X/Y coordinates of the pullover point on the map were included in the pullover data. To guarantee accurate geographic assignment and statistics, these coordinates were subsequently cross-referenced with borough locations (boroct2020) from the NYC Department of City Planning Census data.
- The main metrics and correlations, such as pullovers and consent distribution distribution by race, are visualised and presented using Pandas and Seaborn libraries. Results can be found on the [webpage](https://datascience.kuchta.dev/), Step 5.
- Moreover, map visualisation descibed in the "technology" part allowed us to further understand the race and pullover distribution around the city in detail.

## Conclusion
This project is intended to highlight the problem of racism for authorities as well as for community in general. Interactive journey throughout the pullover statistics in the New York city serves is a powerful tool for understanding the complexities of systematic racism within law enforcement practices. As one can see from our research, there exists disproportionate impact of traffic stops on certain groups of minorities. Our analysis outlines the disparities in pullover rates of individuals who refer themselves as "Black" or "Hispanic". Based on our data, we can conlude that the justice system of the New York city has to experience urgent reformations and and corrections. We have put a lot of effort into making the visualization and data analysis as compelling as possible. Everything is publicly available as a GitHub repository https://github.com/Kuchteq/data-science-course.
