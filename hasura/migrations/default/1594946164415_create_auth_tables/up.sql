CREATE TABLE "public"."users"
(
    "id"             serial NOT NULL,
    "name"           varchar,
    "email"          varchar,
    "email_verified" timestamptz,
    "image"          varchar,
    "created_at"     timestamptz NOT NULL DEFAULT now(),
    "updated_at"     timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    UNIQUE ("email")
);

CREATE TABLE "public"."accounts"
(
    "id"                   serial NOT NULL,
    "compound_id"          varchar NOT NULL,
    "user_id"              integer NOT NULL,
    "provider_type"        varchar NOT NULL,
    "provider_id"          varchar NOT NULL,
    "provider_account_id"  varchar NOT NULL,
    "refresh_token"        text,
    "access_token"         text,
    "access_token_expires" timestamptz,
    "created_at"           timestamptz NOT NULL DEFAULT now(),
    "updated_at"           timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE
    restrict ON DELETE cascade
);

CREATE TABLE "public"."sessions"
(
    "id"            serial NOT NULL,
    "user_id"       integer NOT NULL,
    "expires"       timestamptz NOT NULL,
    "session_token" varchar NOT NULL,
    "access_token"  varchar NOT NULL,
    "created_at"    timestamptz NOT NULL DEFAULT now(),
    "updated_at"    timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE
    restrict ON DELETE cascade
);

CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
    _new record;
BEGIN
    _new := NEW;
    _new."updated_at" = NOW();
    RETURN _new;
END;

$$ LANGUAGE plpgsql;

CREATE TRIGGER "set_public_users_updated_at"
BEFORE UPDATE ON "public"."users"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_users_updated_at" ON "public"."users"
IS 'trigger to update "users.updated_at" on row update';

CREATE TRIGGER "set_public_accounts_updated_at"
BEFORE UPDATE ON "public"."accounts"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_accounts_updated_at" ON "public"."accounts"
IS 'trigger to update "accounts.updated_at" on row update';

CREATE TRIGGER "set_public_sessions_updated_at"
BEFORE UPDATE ON "public"."sessions"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_sessions_updated_at" ON "public"."sessions"
IS 'trigger to update "sessions.updated_at" on row update';
