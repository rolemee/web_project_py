create schema "web_project";
CREATE EXTENSION citus;
SELECT citus_set_coordinator_host('127.0.0.1', 5432);
SELECT citus_add_node('192.168.0.222', 5500);
SELECT citus_add_node('192.168.0.236', 5432);
SELECT rebalance_table_shards();
CREATE TABLE companies (
    id bigint NOT NULL,
    name text NOT NULL,
    image_url text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);

CREATE TABLE campaigns (
    id bigint NOT NULL,
    company_id bigint NOT NULL,
    name text NOT NULL,
    cost_model text NOT NULL,
    state text NOT NULL,
    monthly_budget bigint,
    blacklisted_site_urls text[],
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);

CREATE TABLE ads (
    id bigint NOT NULL,
    company_id bigint NOT NULL,
    campaign_id bigint NOT NULL,
    name text NOT NULL,
    image_url text,
    target_url text,
    impressions_count bigint DEFAULT 0,
    clicks_count bigint DEFAULT 0,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
ALTER TABLE companies ADD PRIMARY KEY (id);
ALTER TABLE campaigns ADD PRIMARY KEY (id, company_id);
ALTER TABLE ads ADD PRIMARY KEY (id, company_id);
INSERT INTO companies VALUES (5000, 'New Company', 'https://randomurl/image.png', now(), now());
UPDATE campaigns
SET monthly_budget = monthly_budget*2
WHERE company_id = 5;
BEGIN ;
DELETE FROM campaigns WHERE id = 46 AND company_id = 5;
DELETE FROM ads WHERE campaign_id = 46 AND company_id = 5;
COMMIT;
CREATE OR REPLACE FUNCTION
  delete_campaign(company_id int, campaign_id int)
RETURNS void LANGUAGE plpgsql AS $fn$
BEGIN
  DELETE FROM campaigns
   WHERE id = $2 AND campaigns.company_id = $1;
  DELETE FROM ads
   WHERE ads.campaign_id = $2 AND ads.company_id = $1;
END;
$fn$;
-- SELECT create_distributed_function(
--   'delete_campaign(int, int)', 'company_id',
--   colocate_with := 'campaigns'
-- );
-- you can run the function as usual
SELECT delete_campaign(5, 46);
SELECT name, cost_model, state, monthly_budget
FROM campaigns
WHERE company_id = 5
ORDER BY monthly_budget DESC
LIMIT 10;
SELECT campaigns.id, campaigns.name, campaigns.monthly_budget,
       sum(impressions_count) as total_impressions, sum(clicks_count) as total_clicks
FROM ads, campaigns
WHERE ads.company_id = campaigns.company_id
AND campaigns.company_id = 5
AND campaigns.state = 'running'
GROUP BY campaigns.id, campaigns.name, campaigns.monthly_budget
ORDER BY total_impressions, total_clicks;
set citus.enable_repartition_joins = on;
SELECT create_distributed_table('campaigns', 'id');
SELECT create_distributed_table('companies', 'id');
SELECT create_distributed_table('ads', 'id');



