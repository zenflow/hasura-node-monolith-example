CREATE TABLE "public"."votes"("id" serial NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "user_id" Integer NOT NULL, "post_id" integer NOT NULL, "value" int2 NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("user_id", "post_id"));

CREATE TRIGGER "set_public_votes_updated_at"
BEFORE UPDATE ON "public"."votes"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_votes_updated_at" ON "public"."votes"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE OR REPLACE FUNCTION get_post_vote_total(post_row posts)
RETURNS bigint AS $$
SELECT COALESCE(sum(value), 0) FROM votes WHERE votes.post_id = post_row.id;
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION get_post_my_vote_value(post_row posts, hasura_session json)
RETURNS smallint AS $$
SELECT value
FROM votes
WHERE '' || votes.user_id = hasura_session ->> 'x-hasura-user-id'  AND votes.post_id = post_row.id;
$$ LANGUAGE sql STABLE;
