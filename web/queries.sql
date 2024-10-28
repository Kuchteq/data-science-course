SELECT
  neighborhoods.name AS neighborhood_name,
  Sum(census.popn_total) AS population,
  100.0 * Sum(census.popn_white) / (Sum(census.popn_total)+1) AS white_pct,
  100.0 * Sum(census.popn_black) / (Sum(census.popn_total)+1) AS black_pct,
  100.0 * Sum(census.popn_asian) / (Sum(census.popn_total)+1) AS asian_pct,
  100.0 * Sum(census.popn_nativ) / (Sum(census.popn_total)+1) AS nativ_pct,
  100.0 * Sum(census.popn_other) / (Sum(census.popn_total)+1) AS other_pct,
  ST_Transform(neighborhoods.geom, 4326) AS geom
FROM nyc_neighborhoods AS neighborhoods
JOIN nyc_census_blocks AS census
ON ST_Intersects(neighborhoods.geom, census.geom)
GROUP BY neighborhoods.name, neighborhoods.geom
ORDER BY asian_pct DESC;


SELECT boroct2020, sum(white) + sum(black) + sum(asian) + 
sum(hispanic)+ sum(am_indian) + sum(hawaiian) +
sum(other) as total_pop FROM nyct2020


SELECT sum(white) as white_pop, sum(black) as black_pop, sum(asian) as asian_pop, 
sum(hispanic) as hispanic_pop, sum(am_indian) as am_indian_pop, sum(hawaiian) as hawaiian_pop,
sum(other) as other_pop FROM nyct2020

-- Get total population
SELECT sum(white) + sum(black) + sum(asian) + 
sum(hispanic)+ sum(am_indian) + sum(hawaiian) +
sum(other) as total_pop FROM nyct2020

-- Get population details
SELECT boroct2020, sum(white) + sum(black) + sum(asian) + sum(hispanic)
+ sum(am_indian) + sum(hawaiian) + sum(other) as total_pop,
white, black, asian, hispanic, am_indian, hawaiian, other,
ST_Transform(ST_SetSRID(geom, 2263),4326) AS geom
FROM nyct2020 GROUP BY boroct2020, geom, white, black, asian, hispanic, am_indian, hawaiian, other


SELECT ST_Transform(ST_SetSRID(geom, 2263),4326) FROM public.nyct2020 ORDER BY gid ASC


 WITH cse AS (
         SELECT 
		 pullovers_raw.bct2020,
            sum(
                CASE
                    WHEN pullovers_raw.race_desc::text = 'WHITE'::text THEN 1
                    ELSE 0
                END) AS white_count,
            sum(
                CASE
                    WHEN pullovers_raw.race_desc::text = 'BLACK'::text THEN 1
                    ELSE 0
                END) AS black_count,
            sum(
                CASE
                    WHEN pullovers_raw.race_desc::text = 'HISPANIC'::text THEN 1
                    ELSE 0
                END) AS hispanic_count,
            sum(
                CASE
                    WHEN pullovers_raw.race_desc::text = 'ASIAN / PACIFIC ISLANDER'::text THEN 1
                    ELSE 0
                END) AS asian_count,
            sum(
                CASE
                    WHEN pullovers_raw.race_desc::text = 'AMERICAN INDIAN/ALASKAN NATIVE'::text THEN 1
                    ELSE 0
                END) AS am_indian_count,
            sum(
                CASE
                    WHEN pullovers_raw.race_desc::text = 'OTHER'::text THEN 1
                    ELSE 0
                END) AS other_count,
            count(*) AS total_pullovers
           FROM pullovers_raw
          GROUP BY pullovers_raw.bct2020
        )
 SELECT bct2020 AS boroct2020, 
    white_count::numeric / total_pullovers::numeric AS white_pct,
    black_count::numeric / total_pullovers::numeric AS black_pct,
    hispanic_count::numeric / total_pullovers::numeric AS hispanic_pct,
    asian_count::numeric / total_pullovers::numeric AS asian_pct,
    am_indian_count::numeric / total_pullovers::numeric AS am_indian_pct,
    other_count::numeric / total_pullovers::numeric AS other_pct,
	nyct2020.geom
   FROM cse JOIN nyct2020 ON cse.bct2020 = nyct2020.boroct2020;
			
