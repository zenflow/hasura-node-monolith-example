ALTER TABLE "public"."users" ADD COLUMN "is_moderator" bool;
ALTER TABLE "public"."users" ALTER COLUMN "is_moderator" DROP NOT NULL;
ALTER TABLE "public"."users" ALTER COLUMN "is_moderator" SET DEFAULT false;
